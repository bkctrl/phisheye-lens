import React, { useState, useEffect } from 'react';

const RegexCard = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Client-side check for window object
    useEffect(() => {
        // Check if window is defined to avoid SSR issues
        if (typeof window !== "undefined") {
            setPosition({
                x: window.innerWidth - 300,
                y: window.innerHeight - 200,
            });

            const handleResize = () => {
                setPosition(prev => ({
                    x: Math.min(prev.x, window.innerWidth - 250),
                    y: Math.min(prev.y, window.innerHeight - 150)
                }));
            };

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
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
            const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 150));

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
                    Password Regex
                </div>
            </div>
            <div className="px-6 py-4">
                <p className="text-simple-dark text-base font-mono break-words">
                    1. Book + Play + Lasdfasdfasdfasol
                </p>
                <p className="text-simple-dark text-base font-mono break-words">
                    2. Game + Number + Lol
                </p>
                <p className="text-simple-dark text-base font-mono break-words">
                    3. Favourite Food + Haters
                </p>
                <p className="text-simple-dark text-base font-mono break-words">
                    4. Favourite Food + Haters
                </p>
            </div>
        </div>
    );
};

export default RegexCard;
