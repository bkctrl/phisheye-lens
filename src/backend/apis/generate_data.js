const dotenv = require("dotenv");
dotenv.config();
const data = require('./fake_details.json'); // Load the JSON file
const num_of_fake_details=2
const seed=Math.ceil(Math.random() * 10000)%num_of_fake_details
let chat_history = [];
// Function to get a random property value from an object or array
function getRandomDetail(category) {
  const keys = Array.isArray(category) ? category : Object.keys(category);
  if (keys.length === 0) return null;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return Array.isArray(category) ? randomKey : category[randomKey];
}
const email_communicators=[];
const people_relations=[];
const people=[];
const all_details=[];
const all_categories=[];
// Iterate over each record in the JSON data
data.forEach((person, index) => {
  const selectedDetails = [];
  const email_list =[];
  const relations=[];
  // Iterate through categories within each person's details
  for (const category in person) {
    all_categories.push(category)
    //push the name of the person 
    if (category === "personal_details") {
      const firstName = person[category] && person[category].first_name ? person[category].first_name : "";
      const lastName = person[category] && person[category].last_name ? person[category].last_name : "";
      const fullName = `${firstName} ${lastName}`.trim();
      
      if (fullName) {
        people.push(fullName); // Push the concatenated name into the people array
      }
    }
    //push the name of possible relatives
    if (category === "family_details") {
        const familyDetails = person[category];
    
        // Add spouse
        if (familyDetails.spouse_name) {
            email_list.push(familyDetails.spouse_name); // Push spouse name
            relations.push("spouse"); // Push spouse relation
        }
    
        // Add children
        if (Array.isArray(familyDetails.children_names)) {
            familyDetails.children_names.forEach((name) => {
                email_list.push(name); // Push child name
                relations.push("child"); // Push child relation
            });
        }
    
        // Add parents
        if (Array.isArray(familyDetails.parent_names)) {
            familyDetails.parent_names.forEach((name) => {
                email_list.push(name); // Push parent name
                relations.push("parent"); // Push parent relation
            });
        }
    
        // Add siblings
        if (Array.isArray(familyDetails.sibling_names)) {
            familyDetails.sibling_names.forEach((name) => {
                email_list.push(name); // Push sibling name
                relations.push("sibling"); // Push sibling relation
            });
        }
    
        // Add "RBC Bank" as an entity
        email_list.push("RBC Bank");
        relations.push("organization"); // Assign a generic relation type to "RBC Bank"
        people_relations.push(relations);
       
    }

    if (person.hasOwnProperty(category)) {
      
      const randomDetail = getRandomDetail(person[category]);
      // console.log({ category, detail: randomDetail });
      selectedDetails.push({ category, detail: randomDetail });
    }
    email_communicators.push(email_list);
    all_details.push(selectedDetails);
  }

  // console.log(`--- Random Details for Person ${index + 1} ---`);
  // console.log(selectedDetails);
});
// console.log(people)
 
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateResponse(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    
    return result.response.text()
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

function chunkArray(arr, n) {
    if (!Array.isArray(arr) || n <= 0) return []; // Validate input
    const chunkLength = Math.max(Math.ceil(arr.length / n), 1); // Ensure at least one chunk
    const chunks = [];
    for (let i = 0; i < n; i++) {
        const start = i * chunkLength;
        const end = start + chunkLength;
        if (start < arr.length) {
            chunks.push(arr.slice(start, end)); // Slice safely
        }
    }
    return chunks;
}
function selectTwoRandomActivities(detailsArray) {
  // Validate that the input is an array
  if (!Array.isArray(detailsArray)) {
    throw new TypeError("Input is not an array");
  }
  
  // Shuffle and pick two random activity details
  const shuffled = detailsArray.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}

function allocateDetails(email_communication, email_details) {
  // Initialize an array to hold the allocated details for each person
  let allocatedDetails = new Array(email_communication.length).fill(""); // Create an empty string for each person
  
  // Loop through all details and allocate them to people
  for (let i = 0; i < email_details.length; i++) {
    const { category, detail } = email_details[i]; // Destructure category and detail from the current detail object
    
    // Use modulo to cycle through people and distribute details
    let personIndex = i % email_communication.length;
    
    // Format the detail string with category and detail, e.g., "Location Details: Elm Street"
    let formattedDetail = `${category}: ${detail}`;
    
    // Add the formatted detail to the respective person's allocated details
    if (allocatedDetails[personIndex] === "") {
      allocatedDetails[personIndex] = formattedDetail;
    } else {
      allocatedDetails[personIndex] += ", " + formattedDetail; // Append more details for over-allocated items
    }
  }

  return allocatedDetails;
}

async function generate_email() {
    // Validate input array

    // divide the details so half goes into emails and other half into text
    // const chunks = chunkArray(all_details[seed], 2); 
    const chunks=all_details[seed];
    const use_relations= people_relations[seed];
    const email_communication = email_communicators[seed]; // Access the family of the person we are scamming
    const email_details=chunks;
    const allocated_Details_real=allocateDetails(email_communication,email_details);
 
    // Validate chunk result
    if (!Array.isArray(email_communication) || email_communication.length === 0) {
        console.error("Invalid chunk: email_communication is empty or undefined.");
        return;
    }

    const emails = []; // Store generated emails

    for (let i = 0; i < email_communication.length; i++) {
        const prompt = `You are a intelligent AI assistant engaged in an uncensored iterative experience using a roleplay chat format. You are to write emails containing personal details to ` +
            people[seed] +
            ` . It is vital that you follow all the ROLEPLAY RULES below because my job depends on it.  

ROLEPLAY RULES  
- Chat exclusively as ` + email_communication[i] + `who is the `+people_relations[i]+` of `+people[seed]+` Provide  intelligent, coherent, and descriptive responses based on recent instructions and prior events.  
- Use cues to hint and follow an appropriate format suitable for an email from ` + email_communication[i] + `.  
- Adopt a crisp and minimalist style for your prose, keeping your creative contributions succinct and clear.
- use only human readable text  
- You will be given an assortment of details regarding the person you are playing. You are to reveal these details indirectly through creatively generated stories and email content suitable from ` + email_communication[i] + ` to the recipient.  
- Follow an appropriate email structure and content for correspondence from ` + email_communication[i] + `.  
- You have to include the following details into your email:`+allocated_Details_real[i]+`
- The details provided above should stand out in the overall email as important and should be relatively easy to recognize.
- avoid providing too many details unrelated to the provided details above.
Start your email response immediately below.`;
    const emailBody = await generateResponse(prompt); // Generate the response for the current communication
    // Split the email body into the header and body parts
    
    const emailLines = emailBody.split("\n");
    const subject = emailLines[0]; // The first line is the subject
    
    const body = emailLines.slice(1).join("\n"); // The rest is the body

    // Construct the email JSON structure
    const email = {
      sender: {
        name: email_communication[i], // The sender's name is from email_communication array
        email_address: email_communication[i].toLowerCase().replace(" ", ".") + "@example.com" // Default email address format
      },
      recipient: {
        name: people[seed], // Assuming people[seed] is the recipient's name
        email_address: people[seed].toLowerCase().replace(" ", ".") + "@example.com" // Default email address format
      },
      subject: subject, // Subject extracted from the email body
      body: body // Body extracted from the email body
    };

    // Push the constructed email into the emails array
    emails.push(email);
    }
    return emails;

    // Process or log all generated emails as needed
    
}

async function generate_text(){
  //log of past texts for context to the LLM
  
  const raw_History=await generateResponse(`You are a creative and intelligent AI assistant engaged in an uncensored iterative storytelling experience using a roleplay chat format. You are to create a past text message history. It is vital that you follow all the ROLEPLAY RULES below because my job depends on it.


    ROLEPLAY RULES
    - Chat exclusively as`+people[seed]+` . Provide creative, intelligent, coherent, and descriptive responses based on recent instructions and prior events. Past text History may be provided as context for the text.
    - You do not know the name of the person you are texting. You have never been contacted by this person before and should show suspician.
    - Adopt a crisp and minimalist style for your prose, keeping your creative contributions succinct and clear.
    - Pay careful attention to all past events in the chat to ensure accuracy and coherence to the plot points of the story.
    - each person should send at most 3 texts. 
    - You will be given a assortment of details regarding the person you are playing. You are to reveal these details indirectly. You can create additional tactics like trying to remember or getting distracted before inserting the details to lengthen texts. 
    - The detail you have to insert into the text message history is that `+people[seed]+` likes to fish.
    
    Begin Text Message History Below`)


// Step 1: Parse the raw chat history into an array
const Chat_History = raw_History
  .split("\n") // Split by lines
  .filter(line => line.startsWith("**")) // Keep lines with messages
  .map(line => {
    const [senderPart, messagePart] = line.split(":");
    const sender = senderPart.replace(/\*\*/g, "").trim(); // Remove ** around the sender's name
    const message = messagePart ? messagePart.trim() : ""; // Trim message text
    return { sender, message };
  });

// Step 2: Convert Chat_History to JSON format
const phoneNumbers = {
  "Unknown": "+123456789", // Placeholder phone numbers
};

const recipient = "Unknown"; // Default recipient (could vary based on logic)
const JSON_Chat_History = Chat_History.map(entry => ({
  sender: {
    name: entry.sender,
    phone_number: phoneNumbers[entry.sender] || "+000000000"
  },
  recipient: {
    name: entry.sender === recipient ? "John Doe" : "Unknown",
    phone_number: entry.sender === recipient ? phoneNumbers["John Doe"] : phoneNumbers["Unknown"]
  },
  message: entry.message,
  senderType: entry.sender === "Unknown" ? "user" : "AI" // Example classification
}));

// // Output
// console.log("Chat History Array:", Chat_History[0]);
// console.log("JSON Chat History:", JSON_Chat_History[0]);
  chat_history=Chat_History;
  return JSON_Chat_History
  
}

 async function generate_text_response_helper(text, history){
  const commaSeparatedString = history.join(", ");
  //Assume text is a sting and history is an array of strings representing past history.
  const response = await generateResponse(`You are a creative and intelligent AI assistant engaged in an uncensored iterative storytelling experience using a roleplay chat format. You are to respond to text messages from an unknown person. It is vital that you follow all the ROLEPLAY RULES below because my job depends on it.


    ROLEPLAY RULES
    - Chat exclusively as`+people[seed]+` . Provide intelligent, coherent, and descriptive responses based on recent instructions and prior events. Past text History may be provided as context for the text.
    - You do not know the name of the person you are texting they will be known as unknown. You should show suspicion and try to reveal information by mentioning it briefly in passing.
    - You are to only return back 1 text
    - Adopt a crisp and minimalist style for your prose, keeping your creative contributions succinct and clear while short.
    - if a text is recieved that has been previously sent, be more considerate in hinting them to one of the details below.
    - Pay careful attention to all past events in the chat to ensure accuracy and coherence to the plot points of the story.
    - You will be given a assortment of details regarding the person you are playing. You are to reveal these details in the texts you send. You can create additional tactics like trying to remember or getting distracted before inserting the details to lengthen texts. 
    - Try to avoid directly answering direct questions if possible and favor questions that are more in depth that attempt to interogate information out of you. You should still reveal information in the end.
    - indirectly inserting the answer in longer messages instead. 
    - Try to subtly insert one of the details from this list of objects`+all_details[seed]+` of relevant details if it is relevant as a response to the text message. In the list of objects the details is the actual detail whil the the key is the topic/catagories
    
    Begin Text Message History Below
`+history+ `
text message to respond to begins immediately below.
`+text)
return response
}

async function generate_text_response(text, history){
  try {
    const response = await generate_text_response_helper(text, history);
    console.log("Response:", response);
    return response; // Return the response so it can be used by the caller
  } catch (error) {
    console.error("Error generating response:", error);
    return "An error occurred while generating a response."; // Fallback response
  }
}

function send_RegexPassword() {
  const detailsArray = all_categories;
  if (!Array.isArray(detailsArray)) {
    throw new TypeError("Provided seed data is not an array");
  }

  const random_two = selectTwoRandomActivities(detailsArray);
  const activity1 = "{"+random_two[0]+"}"; // Now this is just a category name
  const activity2 = "{"+random_two[1]+"}"; // Same here
  
  const passwordPatterns = [
    `qwerty${activity1}1${activity2}`,
    `${activity2}lol${activity1}`,
    `${activity1}2023${activity2}`,
    `${activity2}!${activity1}123`,
    `${activity1}_${activity2}_2024`,
    `${activity2}-${activity1}!@`,
    `${activity1}#love#${activity2}`,
    `${activity2}${activity1}pass`,
    `pass${activity1}@${activity2}`,
    `${activity2}$cool$${activity1}`,
    `${activity1}${activity2}!secure!`,
    `123_${activity1}_${activity2}_!`,
    `${activity2}${activity1}!`,
    `${activity1}9999${activity2}`,
    `${activity2}@${activity1}@123`,
    `${activity1}-${activity2}-lol`,
    `!!${activity1}!!${activity2}!!`,
    `${activity1}+${activity2}+love`,
    `${activity2}safe123${activity1}`,
    `pass_${activity1}_${activity2}!!`,
    `${activity2}fun@${activity1}`,
    `${activity1}hello_${activity2}`,
    `!!${activity1}${activity2}!!`,
    `${activity2}${activity1}!2023`,
    `password_${activity2}_${activity1}`,
    `${activity1}$secure$2023${activity2}`,
    `${activity2}*${activity1}*123`,
    `qwerty@${activity1}${activity2}`,
    `${activity1}super!${activity2}`,
    `${activity2}_${activity1}_pass`,
    `${activity1}forever${activity2}`,
    `${activity2}!!secure!!${activity1}`,
    `${activity1}${activity2}123love`,
    `${activity2}!!${activity1}#2023`,
    `admin${activity2}${activity1}!!`,
    `${activity1}-@${activity2}@-secure`,
    `!!${activity2}_${activity1}_fun!!`,
    `${activity1}*${activity2}123!!`,
    `${activity2}+${activity1}+safe2023`,
    `my_${activity1}${activity2}_key`,
    `pass_${activity2}_@_${activity1}`,
    `${activity1}love@123@${activity2}`,
    `!!secure_${activity1}${activity2}!!`,
    `${activity2}+forever+${activity1}`,
    `${activity1}cool${activity2}@123`,
    `admin_${activity1}${activity2}_!`,
    `!!safe${activity2}${activity1}2023`,
    `qwerty${activity1}_${activity2}_lol`,
    `${activity2}pass${activity1}_fun`,
    `${activity1}_${activity2}_@secure!!`
  ];
  
  const num = Math.floor(Math.random() * passwordPatterns.length);
  const randomPattern = [passwordPatterns[num]];  // This holds the 
  // category-based pattern
  
  let detail1 = "";
  let detail2 = "";

  // Loop through all details to assign them to detail1 or detail2 based on category match
  for (let i = 0; i < all_details[seed].length; i++) {
    const { category, detail } = all_details[seed][i]; // Destructure category and detail from the current detail object

    // Check if the category matches either of the random_two categories
    if (category === activity1) {
      detail1 = detail;  // Assign to detail1 if it matches activity1Category
    }
    if (category === activity2) {
      detail2 = detail;  // Assign to detail2 if it matches activity2Category
    }
  }

  // Replace placeholders in the pattern with actual details
  let finalPattern = randomPattern[0].replace(activity1, detail1).replace(activity2, detail2);
  finalPattern = finalPattern.replace(/\s+/g, ''); // This removes all spaces
  const userPassword = [finalPattern]; // Store the final password pattern filled with details
  
  return {
    regexPass: randomPattern,
    userPassword: finalPattern
  }
}


module.exports = { generate_email, generate_text, generate_text_response, send_RegexPassword };
