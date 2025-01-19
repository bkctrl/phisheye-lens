# Phisheye-lens - UofTHacks 2025

A social engineering awareness game created for UofTHacks 2025 that teaches users about phishing attacks through the perspective of a hacker trying to break into a bank's system.

## Overview
Phisheye-lens is an interactive web-based game that puts players in the role of a hacker trying to gain access to a bank's system. Through social engineering and careful observation, theplayer must piece together clues from various communication channels to discover the target's password.


## Key Features

- Interactive chat simulation with AI-generated responses
- Email and text message simulation
- Realistic RBC Online Banking login page
- Password attempt history
- Note taking feature for collecting clues

## Link to the game

[Phisheye-lens](https://phisheyelens.co/)

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/bkctrl/phisheye-lens
```

2. Navigate to the project directory

```bash
cd phisheyelens
```

3. Install the dependencies

```bash
npm install
```

4. Run the development server

```bash
node src/backend/server.js
```

5. Run the frontend

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to start the game.

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

## Video Demo

Check out the video demo [here](ytlink)

## 👥 Team

| Name | GitHub |
|------|--------|
| BK Kang | [https://github.com/bkctrl] |
| Mike Gao | [https://github.com/fuselierr] |
| Gabriel You | [https://github.com/GabeYou] |
| Karanjot Gaidu | [https://github.com/karanjot-gaidu] |

## Built With
- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Gemini API](https://ai.google.dev/)

