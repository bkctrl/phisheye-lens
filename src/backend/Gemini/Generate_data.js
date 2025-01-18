
const data = require('./fake_details.json'); // Load the JSON file

// Function to get a random property value from an object or array
function getRandomDetail(category) {
  const keys = Array.isArray(category) ? category : Object.keys(category);
  if (keys.length === 0) return null;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return Array.isArray(category) ? randomKey : category[randomKey];
}
const people=[];
const email_communicators=[];
// Iterate over each record in the JSON data
data.forEach((person, index) => {
  const selectedDetails = [];
  const email_list =[];
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
    // Push the names of possible relatives
    if (category === "family_details") {
      const familyDetails = person[category];
      
      // Add children, parents, and siblings to the email list
      if (Array.isArray(familyDetails.children_names)) {
        email_list.push(...familyDetails.children_names);
      }
      if (Array.isArray(familyDetails.parent_names)) {
        email_list.push(...familyDetails.parent_names);
      }
      if (Array.isArray(familyDetails.sibling_names)) {
        email_list.push(...familyDetails.sibling_names);
      }
      email_list.push("RBC Bank")
    }

    if (person.hasOwnProperty(category)) {
      
      const randomDetail = getRandomDetail(person[category]);
      // console.log({ category, detail: randomDetail });
      selectedDetails.push({ category, detail: randomDetail });
    }
    email_communicators.push(email_list);
  }

  // console.log(`--- Random Details for Person ${index + 1} ---`);
  // console.log(selectedDetails);
});
// console.log(people)

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateResponse(prompt) {
  try {
    const genAI = new GoogleGenerativeAI("");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

function generate_email(){

}

function generate_text(){
  
}

