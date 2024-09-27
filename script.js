// // Variable to track if welcome message has been displayed
// var welcomeMessageDisplayed = false;

// // Function to toggle chatbot window visibility
// function toggleChatbot() {
//     var chatbotWindow = document.getElementById("chatbot-window");
//     chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "block" : "none";

//     // Display welcome message only once when chatbot window is opened
//     if (chatbotWindow.style.display === "block" && !welcomeMessageDisplayed) {
//         displayMessage("Welcome! I am Liza, how can I help you?", true); // Display welcome message
//         displayMessage("You can ask me about tools for phone number investigation, image decoding, phishing attacks, and more!", true); // User guidance message
//         welcomeMessageDisplayed = true; // Update flag to indicate welcome message has been displayed
//     }
// }


// // Function to send a message when the user presses send
// function sendMessage() {
//     const inputField = document.getElementById('message-input');
//     const message = inputField.value.toLowerCase().trim();
//     inputField.value = ''; // Clear input field after sending

//     if (message !== "") {
//         addMessageToChat('User', message);

//         // Call function to handle tool category detection and suggestions
//         handleUserInput(message);
//     }
// }

// // Function to add messages to the chat window
// function addMessageToChat(sender, message) {
//     const chatBody = document.getElementById('chat-body');
//     const messageDiv = document.createElement('div');
//     messageDiv.classList.add(sender === 'User' ? 'user-message' : 'bot-message');
//     messageDiv.innerText = `${sender}: ${message}`;
//     chatBody.appendChild(messageDiv);
//     chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to the latest message
// }

// // Tool keyword detection and response
// function handleUserInput(message) {
//     var matchedCategory = matchToolCategory(message);
//     if (matchedCategory) {
//         displayToolSuggestions(matchedCategory);
//     } else {
//         addMessageToChat('Liza', "I couldn’t find a match. Can you try again with more specific terms?");
//     }
// }

// // Function to match tool categories based on user query
// function matchToolCategory(query) {
//     const toolCategories = {
//         "investigate phone number": "Phone Number Investigation",
//         "image decoder": "Image Decoder",
//         "hide message in image": "Image Decoder",
//         "stegno": "Image Decoder",
//         "phishing": "Phishing Attacks",
//         "hack username and password": "Phishing Attacks",
//         "hack password": "Phishing Attacks",
//         "hack instagram": "Phishing Attacks",
//         "whatsapp info": "Social-Media OSINT",
//         "social media information": "Social-Media OSINT",
//         "location finder": "Geo-Int",
//         "location": "Geo-Int",
//         "get information about target": "Reconniance",
//         "website info": "Reconniance",
//         "ip tracker": "IP Logger"
//     };

//     console.log("Searching for matches in: ", query); // Debugging line

//     for (var keyword in toolCategories) {
//         if (query.includes(keyword)) {
//             console.log("Matched category: ", toolCategories[keyword]); // Debugging line
//             return toolCategories[keyword];
//         }
//     }

//     // Split keywords into words and check each one
//     for (var keyword in toolCategories) {
//         var keywordWords = keyword.split(" ");
//         for (var i = 0; i < keywordWords.length; i++) {
//             if (query.includes(keywordWords[i])) {
//                 console.log("Matched category by word: ", toolCategories[keyword]); // Debugging line
//                 return toolCategories[keyword];
//             }
//         }
//     }
//     return null; // No match found
// }

// // Function to display tool suggestions based on matched category
// function displayToolSuggestions(category) {
//     const tools = getToolsForCategory(category);

//     if (tools.length > 0) {
//         tools.sort((a, b) => b.rating - a.rating); // Sort tools by rating

//         // Get top 3 tools
//         const topTools = tools.slice(0, 3);

//         let suggestionMessage = "Here are some top tools related to " + category + ":\n";
//         suggestionMessage += topTools.map(tool => `${tool.name} (${tool.rating}) - [Link](${tool.link})`).join("\n");
//         addMessageToChat('Liza', suggestionMessage);
//     } else {
//         addMessageToChat('Liza', "Sorry, no tools found for " + category + ".");
//     }
// }

// // Function to get tools based on the selected category
// function getToolsForCategory(category) {
//     const toolSuggestions = {
//         "Phone Number Investigation": [
//             { name: "Inspector", rating: 4.7, link: "https://github.com/N0rz3/Inspector" },
//             { name: "Number Info", rating: 4.2, link: "https://github.com/3022-2/numberinfo" },
//             { name: "PhoneInfoga", rating: 4.4, link: "https://github.com/sundowndev/PhoneInfoga" },
//             { name: "Numlookup", rating: 4.1, link: "https://www.numlookup.com/" }
//         ],
//         "Image Decoder": [
//             { name: "Image Decoder", rating: 4.8, link: "https://github.com/thenipunanand/ImgHide" }
//         ],
//         "Phishing Attacks": [
//             { name: "Z-Phisher", rating: 4.6, link: "https://github.com/htr-tech/zphisher" },
//             { name: "SocialFish", rating: 4.5, link: "https://github.com/UndeadSec/SocialFish" },
//             { name: "Blackeye", rating: 4.7, link: "https://github.com/EricksonAtHome/blackeye" },
//             { name: "Hidden-Eye", rating: 4.8, link: "https://github.com/Morsmalleo/HiddenEye_Legacy" },
//             { name: "Shell Fish", rating: 4.6, link: "https://github.com/AbirHasan2005/ShellPhish" },
//             { name: "GoPhish", rating: 4.4, link: "https://getgophish.com/" }
//         ],
//         "Social-Media OSINT": [
//             { name: "Lookup-id", rating: 4.4, link: "https://lookup-id.com/" },
//             { name: "Imginn", rating: 4.3, link: "https://imginn.io/" },
//             { name: "PhantomBuster", rating: 4.4, link: "https://phantombuster.com/phantombuster" },
//             { name: "Reverse Contact", rating: 4.2, link: "https://www.reversecontact.com/" },
//             { name: "Whatsapp Monitoring", rating: 4.5, link: "https://github.com/ErikTschierschke/WhatsappMonitor" }
//         ],
//         "Geo-Int": [
//             { name: "IP-Tracker", rating: 4.5, link: "https://github.com/rajkumardusad/IP-Tracer" },
//             { name: "Geo-Recon", rating: 4.7, link: "git clone https://github.com/radioactivetobi/geo-recon" },
//             { name: "Seeker", rating: 4.8, link: "git clone https://github.com/thewhiteh4t/seeker" }
//         ],
//         "Reconniance": [
//             { name: "Nmap", rating: 4.9, link: "https://github.com/nmap/nmap" },
//             { name: "Amaas", rating: 4.8, link: "https://github.com/owasp-amass/amass" },
//             { name: "Dirb", rating: 4.9, link: "https://github.com/v0re/dirb" },
//             { name: "Sublist3r", rating: 4.7, link: "https://github.com/aboul3la/Sublist3r" },
//             { name: "Dns-Recon", rating: 4.6, link: "https://github.com/darkoperator/dnsrecon" },
//             { name: "Shodan", rating: 4.7, link: "https://www.shodan.io/" },
//             { name: "Censys", rating: 4.5, link: "https://censys.io/" },
//             { name: "WaybackUrl's", rating: 4.6, link: "https://github.com/tomnomnom/waybackurls" }
//         ],
//         "IP Logger": [
//             { name: "IP-Logger", rating: 4.5, link: "https://iplogger.org/" },
//             { name: "Grabify", rating: 4.7, link: "https://grabify.link/" },
//             { name: "Stealer", rating: 4.8, link: "https://github.com/3022-2/stealer" }
//         ]
//     };

//     return toolSuggestions[category] || [];
// }

// // Function to display a message in the chat body
// function displayMessage(message, isChatbotMessage) {
//     const chatBody = document.getElementById("chat-body");
//     const messageElement = document.createElement("div");
//     messageElement.textContent = message;
//     messageElement.className = isChatbotMessage ? "chatbot-message" : "user-message";
//     chatBody.appendChild(messageElement);

//     // Automatically scroll to the bottom of the chat window
//     chatBody.scrollTop = chatBody.scrollHeight;
// }
