"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import WaterTank from "@/components/WaterTank";
import axios from "./libs/axios";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [waterLevel, setWaterLevel] = useState(0);
  useEffect(() => {
    axios.post("/getData", { username: "Deepansu" }).then((res) => {
      setUserData(res.data);
      setWaterLevel(res.data.currentwaterlevel * 10);
    });
  }, []);
  function convertToIST(timeString) {
    if(!timeString) return '';
    const date = new Date(timeString);
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section
          className="rounded-lg p-6"
          style={{ height: "calc(2 * 64px)" }}
        >
          <div className="flex justify-between  items-center h-full">
            <div className="shadow-md p-6 w-40 rounded-lg realtive">
              <div className="text-xs font-semibold">Water Level</div>
              <div className="text-2xl font-bold text-blue-600">
                {waterLevel}%
              </div>
            </div>
            <div className="shadow-md p-6 w-40 rounded-lg">
              <div className="text-xs font-semibold">Estimated FillTime</div>
              <div className="text-2xl font-bold">{convertToIST(userData?.estimatedfilltime)}</div>
            </div>
          </div>
        </section>
        <WaterTank level={waterLevel} />
      </main>
    </div>
  );
}
