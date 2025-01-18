"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Get the router instance

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigateToGame = () => {
    router.push("/game"); // Navigate to the desired page (e.g., "/game")
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/assets/images/Image1.png')] bg-cover bg-center h-64 w-full">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-6xl font-bold text-center text-gray-100">Phish 'n' Chips</h1>
      </header>

      {/* Main Content */}
      <main className="text-center space-y-8">
        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-[#24cf79] text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition"
            onClick={navigateToGame} // Navigate on click
          >
            Start
          </button>
          <button
            className="bg-[#FF3B30] text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition"
            onClick={openModal}
          >
            How to Play
          </button>
        </div>

        {/* About Section */}
        <div className="max-w-3xl bg-[rgb(10,37,64,0.8)] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            About the Game
          </h2>
          <p className="text-white leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nostrum quasi quis nobis placeat libero, laudantium repellat consequatur eligendi eos adipisci iste reiciendis illo minus? Quam quaerat maiores cum fugit!
            Error, laborum corporis distinctio necessitatibus odit ab quisquam hic, aliquam velit quaerat iste facilis, perspiciatis quas ratione sunt molestiae! Obcaecati consectetur expedita suscipit nam commodi! Nisi, unde distinctio. Modi, laboriosam!
            Dolores optio hic nesciunt reprehenderit perspiciatis ratione corporis consequuntur corrupti similique quasi cupiditate rem id facilis, nulla dolor molestiae praesentium quia necessitatibus magnam nihil. Maxime voluptate reprehenderit dignissimos unde quis.
          </p>
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
            className="bg-[rgb(10,37,64)] rounded-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">Game Rules</h2>
            <p className="text-white mb-4">
              1. Rule one: Lorem ipsum dolor sit amet.<br />
              2. Rule two: Consectetur adipiscing elit.<br />
              3. Rule three: Integer nec odio. Praesent libero.
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
