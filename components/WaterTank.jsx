"use client";

import { useState } from "react";
import Bubbles from "./Bubbles";

export default function WaterTank({ level }) {
  const tankHeight = 400; // pixels
  const waterHeight = (level/100)*tankHeight;

  return (
    <div className="">
      <section
        className="rounded-lg p-6"
        style={{ height: "calc(2 * 64px)" }}
      >
        <div className="flex justify-between  items-center h-full">
          <div className="shadow-md p-6 w-40 rounded-lg">
            <div className="text-xs font-semibold">Time Left</div>
            <div className="text-4xl font-bold text-blue-600">{timeLeft}</div>
          </div>
          <div className="shadow-md p-6 w-40 rounded-lg">
            <div className="text-xs font-semibold">Water Level</div>
            <div className="text-4xl font-bold text-blue-600">0%</div>
          </div>
        </div>
      </section>

      <div
        className="relative w-full flex"
        style={{ height: `${tankHeight}px` }}
      >
        <div className="inset-y-0 -left-10 w-10 flex flex-col-reverse justify-between py-2 ">
          {[0, 25, 50, 75, 100].map((percentage) => (
            <div key={percentage} className="flex items-center">
              <span className="mr-1 text-sm text-blue-800">{percentage}%</span>
              <div className="w-3 h-0.5 bg-blue-800"></div>
            </div>
          ))}
        </div>
        <div className="w-full inset-0 border-8 border-t-0 border-blue-800 rounded-3xl overflow-hidden relative">
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#3e9cf5] transition-all duration-1000 ease-in-out"
            style={{ height: `${waterHeight}px` }}
          >
           <Bubbles />
          </div>
        </div>
        
      </div>
    </div>
  );
}
