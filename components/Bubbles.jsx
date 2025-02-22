"use client";
import { useEffect, useRef, useState } from "react";

export default function Bubbles() {
  const bubblesRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const bubbleData = Array.from({ length: 10 }).map(() => ({
      left: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5,
    }));
    setBubbles(bubbleData);
  }, []);

  return (
    <div ref={bubblesRef} className="absolute bottom-0 w-full flex justify-center gap-4">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="bubble w-4 h-4 bg-white/20 rounded-full absolute bottom-0"
          style={{
            left: `${bubble.left}%`,
            animation: `bubbleRise ${bubble.duration}s infinite ease-in`,
            animationDelay: `${bubble.delay}s`,
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
            transform: translateY(-100dvh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
