"use client";
import { useState } from "react";

export default function StartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-950">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-6xl font-bold text-center text-gray-100">CATCH THE PHISH</h1>
      </header>

      {/* Main Content */}
      <main className="text-center space-y-8">
        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition">
            Start
          </button>
          <button
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition"
            onClick={openModal}
          >
            How to Play
          </button>
        </div>

        {/* About Section */}
        <div className="max-w-3xl bg-gray-300 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            About the Game
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam odit
            impedit dolorum sed odio, natus, nam deleniti dolorem atque nihil amet aspernatur
            aliquid dolor cum eligendi beatae? Modi, tenetur incidunt.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ratione exercitationem illo mollitia consectetur saepe rerum delectus facere assumenda repellat quo numquam, quibusdam tempora aspernatur cupiditate nam officia totam amet.
            Cupiditate corrupti dolorem quo officia reiciendis sequi porro, earum tempora excepturi nisi soluta omnis, est sapiente. Temporibus dolorum nesciunt id possimus aliquam! Ad architecto labore excepturi, voluptatum iste perferendis perspiciatis!
            Dicta modi, vel voluptatum quasi, ipsam ea molestiae quos cum at eos repellendus nobis. Aliquam quibusdam alias, recusandae libero ipsum in voluptatem temporibus possimus, quaerat soluta, voluptate molestias quia enim?
            Blanditiis magnam qui aspernatur repellat, ipsam quae officia beatae officiis perferendis unde necessitatibus, aut ullam debitis voluptates iure. Natus exercitationem tempore, incidunt vero cum officiis illo vel aliquam odio ut!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-gray-600">UofT Hacks 2025</footer>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal} // Close when clicking outside the modal
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Game Rules</h2>
            <p className="text-gray-700 mb-4">
              1. Rule one: Lorem ipsum dolor sit amet.<br />
              2. Rule two: Consectetur adipiscing elit.<br />
              3. Rule three: Integer nec odio. Praesent libero.
            </p>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
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
