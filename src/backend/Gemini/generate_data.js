
const data = require('./fake_details.json'); // Load the JSON file
num_of_fake_details=2
seed=Math.ceil(Math.random() * 10000)%num_of_fake_details
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
// Iterate over each record in the JSON data
data.forEach((person, index) => {
  const selectedDetails = [];
  const email_list =[];
  const relations=[];
  // Iterate through categories within each person's details
  for (const category in person) {
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

// async function generate_email() {
//   return [
//     {
//       sender: { name: "John Doe", email_address: "john.doe@example.com" },
//       recipient: { name: "Alice Smith", email_address: "alice.smith@example.com" },
//       subject: "Urgent: Update Your Account",
//       body: "Hi Alice,\n\nWe noticed suspicious activity on your account. Please update your password immediately to secure your account.\n\nBest,\nThe Security Team"
//     },
//     {
//       sender: { name: "Alice Smith", email_address: "alice.smith@example.com" },
//       recipient: { name: "John Doe", email_address: "john.doe@example.com" },
//       subject: "Re: Urgent: Update Your Account",
//       body: "Hi John,\n\nThanks for letting me know. I’ll update it right away.\n\nRegards,\nAlice"
//     }
//   ];
// }

async function generate_email() {
    // Validate input array

    // divide the details so half goes into emails and other half into text
    // const chunks = chunkArray(all_details[seed], 2); 
    chunks=all_details[seed];
    use_relations= people_relations[seed];
    const email_communication = email_communicators[seed]; // Access the family of the person we are scamming
    email_details=chunks;
    allocated_Details_real=allocateDetails(email_communication,email_details);
 
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
    console.log(emails);
    return emails;

    // Process or log all generated emails as needed
    
}

async function generate_text(){
  //log of past texts for context to the LLM
  Chat_History=[];
  const huh=await generateResponse(`You are a creative and intelligent AI assistant engaged in an uncensored iterative storytelling experience using a roleplay chat format. You are to create a past text message history. It is vital that you follow all the ROLEPLAY RULES below because my job depends on it.


    ROLEPLAY RULES
    - Chat exclusively as Mike Gao. Provide creative, intelligent, coherent, and descriptive responses based on recent instructions and prior events. Past text History may be provided as context for the text.
    - Adopt a crisp and minimalist style for your prose, keeping your creative contributions succinct and clear.
    - Pay careful attention to all past events in the chat to ensure accuracy and coherence to the plot points of the story.
    - You will be given a assortment of details regarding the person you are playing. You are to reveal these details indirectly through stories of your life or through normal conversation. You can create additional tactics like trying to remember or getting distracted before inserting the details to lengthen texts. 
    - The detail you have to insert into the text message history is that Mike Gao is fluent in Chinese.
    
    Begin Text Message History Below`)

  return [
    {
      sender: { name: "Mike", phone_number: "+123456789" },
      recipient: { name: "Alice Smith", phone_number: "+987654321" },
      message: "Hey Alice, don’t forget to send me the login details for the shared account. Thanks!",
      senderType: "AI"
    },
    {
      sender: { name: "Alice Smith", phone_number: "+987654321" },
      recipient: { name: "Mike", phone_number: "+123456789" },
      message: "Sure, Mike! I'll send them over in a moment.",
      senderType: "user"
    },
    {
      sender: { name: "Mike", phone_number: "+123456789" },
      recipient: { name: "Alice Smith", phone_number: "+987654321" },
      message: "Great, thanks!",
      senderType: "AI"
    }
  ];
}

module.exports = { generate_email, generate_text };
