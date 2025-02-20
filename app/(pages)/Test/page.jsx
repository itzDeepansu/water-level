"use client"; // Ensures it's a client-side component

import React from "react";
import Bubbles from "@/components/Bubbles";
import WaterBucket from "@/components/WaterTank";

const Test = () => {
  return (
    <div className="h-screen w-screen bg-blue flex items-center justify-center">
      <div className="relative h-80 w-80"> {/* Increased size to see bubbles */}
        <WaterBucket />
      </div>
    </div>
  );
};

export default Test;
