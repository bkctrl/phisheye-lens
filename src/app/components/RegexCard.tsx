import React, { useState, useEffect } from 'react';
import { globals } from '@/api/api';

const RegexCard = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Client-side check for window object
    useEffect(() => {
        // Check if window is defined to avoid SSR issues
        if (typeof window !== "undefined") {
            setPosition({
                x: 0,
                y: window.innerHeight - 200,
            });
        }
    }, []); // Only run on the client side (after component mounts)

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent text selection
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
            const newX = e.clientX - offset.x;
            const newY = e.clientY - offset.y;

            const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 250));
            const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 200));

            setPosition({
                x: constrainedX,
                y: constrainedY
            });
        }
    };

    useEffect(() => {
        if (isDragging) {
            // Add global event listeners when dragging starts
            const handleGlobalMouseMove = (e: MouseEvent) => {
                const mouseEvent = e as unknown as React.MouseEvent;
                handleMouseMove(mouseEvent);
            };
            
            const handleGlobalMouseUp = () => {
                setIsDragging(false);
            };

            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                document.removeEventListener('mouseup', handleGlobalMouseUp);
            };
        }
    }, [isDragging]); // Only re-run when isDragging changes

    return (
        <div
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 50, // Higher z-index to ensure it's above other elements
                userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
            className="shadow-lg rounded-lg overflow-hidden cursor-move bg-beige"
        >
            <div className="px-6 py-4">
                <div className="font-bold text-xl font-mono text-simple-dark">
                    Instructions
                </div>
            </div>
            <div className="text-base font-mono text-simple-dark px-6">
                1. Victim Username: badAtPasswords2025
            </div>
            <div className="text-base font-mono text-simple-dark px-6">
                2. Open Messages & Emails for RBC.
            </div>
            <div className="text-base font-mono text-simple-dark px-6">
                3. Ignore Spaces in Password Data.
            </div>
            <div className="text-base font-mono font-bold text-simple-dark px-6 mb-1">
                4. Password Pattern (Regex):
            </div>
            <div className="px-6 mb-4">
                <div className="w-full bg-gray-600 rounded-lg shadow-lg border-4 border-gray-800">
                    <p className="text-simple-light text-base font-mono break-words p-2">
                        {globals.correctRegex}
                    </p>
                </div>
            </div>
        </div>
        
    );
};

export default RegexCard;
