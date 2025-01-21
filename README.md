<!-- PROJECT LOGO -->

<div align="center" id="readme-top">
  <a href="https://github.com/bkctrl/uwmun">
    <br /><br />
    <img src="https://github.com/user-attachments/assets/0a5e8949-6b98-4968-92f8-3687c1e2dfc3" alt="Logo" width="120" height="110" style="border-radius: 50%;">
  </a>

<h3 align="center">Phish-Eye Lens</h3>

<p align="center"><b>UofTHacks 12 Winner 🏆</b></p>

  <p align="center">
    Understand the qualms of password selection and phishing tactics through a hacker's lens - <br> deducing a victim's password through their personal data.
<br /><br />

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
<br />
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
    
<br />
    
   <a href="https://phisheyelens.co" target="_blank"><strong>🔗 VISIT ACTIVE WEBSITE »</strong></a>
    <br />
    <a href="https://dorahacks.io/buidl/21693" target="_blank"><strong>🧑‍💻 DORAHACKS LINK »</strong></a>
    <br />
<br />
  </p>
</div> 



## Overview
Try to remember some of your first passwords. Most likely, they were passwords that were built around something memorable in your life, like your school, family, pet names, hobbies, and more. Ah, how naive and unassuming you were. Unfortunately, your very own passwords that you thought you grew and nurtured so well might as well be heaps of gold, piles of treasures for any reasonably skilled hacker around the globe. At a first glance, you may not imagine that a password above 8 characters could be easily cracked. After all, you can't even figure out a reasonable combination in the wardrobe. However, millions of users are phished for their personal data every year, lying defenseless as hackers prey down upon their data and finances.

Now you might wonder, what do these chronically online hackers do with their day? How long do they struggle in your emails, texts, and calls just to glean a morsel of information? Why don't they touch grass? Well, we'll say that these are completely valid questions. Sometimes, you just have to see the other side - what it's truly like to phish for information and what tactics phishers employ in their daily activities. Only when you view the world in a different lens do you truly learn what's behind the Phish-Eye.


## Our Idea 0_0

By playing the role of the sneaky phisher, you explore a victim's device and examine their personal data, finding key information that could lead you to cracking their RBC Bank password. Using generative AI and some very clever prompt engineering, we designed intricate, logical puzzles with key information that slowly leads you towards breaking bad. Keep your magnifying glasses peeled folks, dive deep into the world of phishing and develop a new perspective.

## Contributors
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bkctrl"><img src="https://avatars.githubusercontent.com/u/112859636?v=4?s=100" width="100px;" alt="BK Kang"/><br /><sub><b>BK Kang</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fuselierr"><img src="https://avatars.githubusercontent.com/u/73967207?v=4" width="100px;" alt="Mike Gao"/><br /><sub><b>Mike Gao</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GabeYou"><img src="https://avatars.githubusercontent.com/u/85317995?v=4" width="100px;" alt="Gabriel You"/><br /><sub><b>Gabriel You</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/karanjot-gaidu"><img src="https://avatars.githubusercontent.com/u/90838376?v=4" width="100px;" alt="Karanjot Gaidu"/><br /><sub><b>Karanjot Gaidu</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## Screenshots
![uofthacks-screenshots](https://github.com/user-attachments/assets/52b81361-a3b9-4959-94d8-97818d5e7924)


## Key Features

- Interactive chat simulation with AI-generated responses
- Email and text message simulation
- Realistic RBC Online Banking login page
- Password attempt history
- Note taking feature for collecting clues


## Getting Started
To set up the project locally and get a local copy up and running:


### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository: <br />
   ```sh
   git clone https://github.com/bkctrl/phisheye-lens
   ```
2. Navigate to the project directory & install the dependencies: <br />
   ```sh
   cd phisheyelens && npm install
   ```
3. Install the dependencies for the backend API: <br />
   ```sh
   cd src/backend && npm install
   ```

### API Setup & Usage
You could test the backend both locally or by using a deployed API. The following is on testing locally. 
1. Navigate to `src/backend/apis/server.js` and run the server. Assuming you are at the root directory:
   ```sh
   cd src/backend/apis/server.js && nodemon server.js
   ```
3. Open a new terminal and run the frontend. On the new terminal:
   ```sh
   npm run dev
   ```
4. Navigate to `localhost:3000` on your browser and see the project demo!


## How to Play

1. Start the game by clicking on the "Start Game" button.
2. You will have access to three main interfaces:
    - Text messages
    - Emails
    - RBC Online Banking login page
3. Interact with the character by sending messages to the character. The character will respond to the user's messages.
4. Collect personal information from the character's messages and emails to help you guess the password.
5. Use the note-taking feature to record potential clues and personal information.
6. Open the RBC Online Banking login page and enter the correct password to win the game.
7. Store the previous guesses in a history and use it to guess the password.
9. Utilize the regex feature to help you guess the password.
10. You can end the game at any time by clicking on the "End Game" button.
