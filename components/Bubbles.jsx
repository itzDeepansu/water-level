"use client"; // Ensure it runs only on the client side

import { useEffect, useRef } from "react";

export default function Bubbles() {
  const bubblesRef = useRef(null);

  useEffect(() => {
    if (bubblesRef.current) {
      bubblesRef.current.querySelectorAll(".bubble").forEach((bubble) => {
        let delay = Math.random() * 5; // Random delay for a natural effect
        bubble.style.animationDelay = `${delay}s`;
      });
    }
  }, []);

  return (
    <div ref={bubblesRef} className="absolute bottom-0 w-full flex justify-center gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bubble w-4 h-4 bg-white/20 rounded-full absolute bottom-0"
          style={{
            left: `${Math.random() * 100}%`, // Random X position
            animation: `bubbleRise ${3 + Math.random() * 2}s infinite ease-in`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
