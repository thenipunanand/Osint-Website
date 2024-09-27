from PIL import Image
from os import path
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto import Random
import base64
import getpass

DEBUG = False
headerText = "M6nMjy5THr2J"

def encrypt(key, source, encode=True):
    key = SHA256.new(key).digest()
    IV = Random.new().read(AES.block_size)
    encryptor = AES.new(key, AES.MODE_CBC, IV)
    padding = AES.block_size - len(source) % AES.block_size
    source += bytes([padding]) * padding
    data = IV + encryptor.encrypt(source)
    return base64.b64encode(data).decode() if encode else data

def decrypt(key, source, decode=True):
    if decode:
        source = base64.b64decode(source.encode())
    key = SHA256.new(key).digest()
    IV = source[:AES.block_size]
    decryptor = AES.new(key, AES.MODE_CBC, IV)
    data = decryptor.decrypt(source[AES.block_size:])
    padding = data[-1]
    if padding < 1 or padding > AES.block_size:
        raise ValueError("Invalid padding")
    return data[:-padding].decode()

def convertToRGB(img):
    try:
        rgba_image = img
        rgba_image.load()
        background = Image.new("RGB", rgba_image.size, (255, 255, 255))
        background.paste(rgba_image, mask=rgba_image.split()[3])
        return background
    except Exception as e:
        raise Exception("Couldn't convert image to RGB - %s" % e)

def getPixelCount(img):
    width, height = Image.open(img).size
    return width * height

def encodeImage(image, message, filename):
    try:
        width, height = image.size
        pix = list(image.getdata())
        current_pixel = 0
        x = 0
        y = 0

        for ch in message:
            binary_value = format(ord(ch), '08b')
            p1 = list(pix[current_pixel])
            p2 = list(pix[current_pixel + 1])
            p3 = list(pix[current_pixel + 2])

            three_pixels = p1 + p2 + p3

            for i in range(8):
                current_bit = binary_value[i]
                if current_bit == '0':
                    if three_pixels[i] % 2 != 0:
                        three_pixels[i] -= 1
                else:
                    if three_pixels[i] % 2 == 0:
                        three_pixels[i] += 1

            pix[current_pixel] = tuple(three_pixels[0:3])
            pix[current_pixel + 1] = tuple(three_pixels[3:6])
            pix[current_pixel + 2] = tuple(three_pixels[6:9])

            current_pixel += 3
            if current_pixel >= len(pix) - 3:
                break

        image.putdata(pix)
        encoded_filename = filename.split('.')[0] + "-enc." + image.format.lower()
        image.save(encoded_filename, format=image.format, quality=image.info.get("quality", 95))
        print(f"Image encoded and saved as {encoded_filename}")

    except Exception as e:
        print(f"Error: {e}")

def decodeImage(image):
    pix = list(image.getdata())
    current_pixel = 0
    decoded = ""

    while current_pixel + 2 < len(pix):
        p1 = list(pix[current_pixel])
        p2 = list(pix[current_pixel + 1])
        p3 = list(pix[current_pixel + 2])

        three_pixels = p1 + p2 + p3
        binary_value = ""

        for i in range(8):
            if three_pixels[i] % 2 == 0:
                binary_value += "0"
            else:
                binary_value += "1"

        decoded += chr(int(binary_value, 2))
        current_pixel += 3

        if three_pixels[-1] % 2 != 0:
            break

    return decoded

def main():
    print("1. Encode\n2. Decode")
    op = int(input(">>"))

    if op == 1:
        img = input("Image path (with extension): ")
        if not path.exists(img):
            raise Exception("Image not found!")

        message = input("Message to be hidden: ")
        message = headerText + message
        if (len(message) + len(headerText)) * 3 > getPixelCount(img):
            raise Exception("Message is too long for the image")

        password = getpass.getpass("Password to encrypt (leave empty for no password): ")
        cipher = encrypt(password.encode(), message.encode()) if password else message

        image = Image.open(img)
        if image.mode != 'RGB':
            image = convertToRGB(image)
        encodeImage(image, cipher, img)

    elif op == 2:
        img = input("Image path (with extension): ")
        if not path.exists(img):
            raise Exception("Image not found!")

        password = getpass.getpass("Enter password (leave empty for no password): ")
        image = Image.open(img)
        cipher = decodeImage(image)

        # Debug output to check decoded message
        print(f"Decoded cipher (before decryption): {cipher}")

        if password:
            cipher = decrypt(password.encode(), cipher)

        # Check for header after decryption
        if cipher.startswith(headerText):
            print(f"Decoded Text: {cipher[len(headerText):]}")
        else:
            raise ValueError("Header not found, incorrect image or header mismatch")

if __name__ == "__main__":
    main()
