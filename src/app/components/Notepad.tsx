import React, { useState, useEffect } from 'react';

const Notepad: React.FC = () => {
  const [notes, setNotes] = useState<string>('');
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Load notes from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('notes');
      setNotes(savedNotes || '');
      setPosition({ x: window.innerWidth - 250, y: 50 });
    }
  }, []);

  // Save notes to localStorage
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    localStorage.setItem('notepadNotes', e.target.value);
  };

  // Start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the window
      className="min-h-screen flex items-center justify-center"
    >
      <div
        className="absolute slide-in-from-right"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full max-w-2xl bg-yellow-200 shadow-xl rounded-md">
          <h1 className="text-md font-bold py-2 text-center text-gray-800">
            My Notes
          </h1>
          <div onMouseDown={(e) => e.stopPropagation()}>
            <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Write your notes here..."
                className="w-full h-96 px-2 text-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-100 font-mono text-sm"
                style={{
                    backgroundImage: 'linear-gradient(to bottom, transparent 95%, rgba(0, 0, 0, 0.1) 95%)',
                    backgroundSize: '100% 1.5em',
                    lineHeight: '1.5em',
                }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notepad;
