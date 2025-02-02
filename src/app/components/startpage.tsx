"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Typewriter from 'typewriter-effect';
import { startNewGame, globals } from '@/api/api';
export default function StartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter(); // Get the router instance

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigateToGame = () => {
    router.push("/game"); // Navigate to the desired page (e.g., "/game")
  };

  useEffect(() => {
    const initializeGame = async () => {
      try {
        setIsLoading(true); // Set loading to true
        await startNewGame(); // Wait for data fetching
      } catch (error) {
        console.error("Error initializing game:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    initializeGame(); // Start data fetching on mount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/assets/images/Image1.png')] bg-cover bg-center h-64 w-full">
      {/* Header */}
      <div className="max-w-2xl w-full">
        <div className="text-simple-light font-semibold text-2xl p-2">
          Enter your password:
        </div>
        <div className="relative mb-8 p-4 bg-gray-600 rounded-xl shadow-2xl max-w-2xl w-full border-4 border-gray-300">
          <h1 className="text-6xl font-bold font-mono text-left text-simple-light">
          <header className="text-left">
            <Typewriter
              options={{
                strings: [
                  'Phish-Eye-Lens', 
                  'Phish_3y3_lens',
                  'phisheyelens',
                  'Ph1$h3y3L3n$!',
                  'phIshILenz',
                  'Phish_@uoftHacks',
                  'Phish?Eye!Lens$',
                  'fishEye-LENS',
                  'phishLens123456',
                  'PHISHEyePass',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </header>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="text-center space-y-8">
        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className={`bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition text-2xl ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            }`}
            onClick={() => {
              navigateToGame();
            }} // Navigate on click
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Start"}
          </button>
          <button
            className="bg-red-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition text-2xl"
            onClick={openModal}
          >
            How to Play
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-gray-500">UofT Hacks 2025</footer>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal} // Close when clicking outside the modal
        >
          <div
            className="bg-[rgb(10,37,64)] rounded-lg p-6 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">About the Game</h2>
            <p className="text-white mb-4">Phisheye-lens is an interactive web-based game that puts players in the role of a hacker trying to gain access to a bank's system through social engineering and careful observation, the player must piece together clues from various communication channels to discover the target's password.
              This game is designed to raise awareness about the importance of cybersecurity and the risks of phishing attacks. A lot of elderly people are victims of phishing attacks due to their lack of knowledge about cybersecurity. This game teaches them about the importance of cybersecurity and the risks of phishing attacks in a fun and interactive way.
            </p>
            <h2 className="text-xl font-bold mb-4 text-white">Game Rules</h2>
            <p className="text-white mb-4">
            1. Start the game by clicking on the "Start Game" button.<br/>
            2. You will have access to three main interfaces:<br/>
                - Text messages<br/>
                - Emails<br/>
                - RBC Online Banking login page<br/>
            3. Interact with the character by sending messages to the character. The character will respond to the user's messages.<br/>
            4. Collect personal information from the character's messages and emails to help you guess the password.<br/>
            5. Use the note-taking feature to record potential clues and personal information.<br/>
            6. Open the RBC Online Banking login page and enter the correct password to win the game.<br/>
            7. Store the previous guesses in a history and use it to guess the password.<br/>
            8. Utilize the regex feature to help you guess the password.<br/>
            9. You can end the game at any time by clicking on the "End Game" button.<br/>
            </p>
            <button
              className="bg-[#4A90E2] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              onClick={closeModal}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
