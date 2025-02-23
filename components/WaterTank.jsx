"use client";

import Bubbles from "./Bubbles";
import { MdiBathroomTap } from "./Logos";

export default function WaterTank({ level, timeleft, isactive, loading }) {
  const tankHeight = 400; // pixels
  const waterHeight = (level / 100) * tankHeight;

  return (
    <div className="overflow-hidden">
      <section className="rounded-lg px-6 relative">
        <div className="flex justify-between  items-center">
          <div className="p-6 w-40 rounded-lg border border-gray-300 h-24">
            <div
              className={
                loading
                  ? "animate-pulse h-[0.75rem] bg-gray-300 rounded-xl"
                  : "text-[0.75rem] font-bold"
              }
            >
              {!loading && "Time Left : "}
            </div>
            <div
              className={
                loading
                  ? "animate-pulse h-[1.40rem] bg-gray-300 rounded-xl mt-2"
                  : "text-[1.40rem] font-bold"
              }
            >
              {!loading && (
                <div
                  className={
                    isactive
                      ? "text-green-600 text-2xl font-bold"
                      : "text-red-600 text-2xl font-bold"
                  }
                >
                  {timeleft ? timeleft : "0"} min
                </div>
              )}
            </div>
          </div>
          <MdiBathroomTap
            className=" h-60 w-60 scale-90 absolute right-[-25%] bottom-[-56.9%] z-10  scale-x-[-1]"
            style={isactive ? { color: "green" } : { color: "black" }}
          />
          {isactive && !loading && (
            <div className="bg-[#5F94F7] w-7 h-[500px] top-[70%] right-[16.8%] absolute animate-revealTopToBottom"></div>
          )}
        </div>
      </section>

      <div
        className="relative w-full flex "
        style={{ height: `${tankHeight}px` }}
      >
        <div className="inset-y-0 -left-10 w-10 flex flex-col-reverse justify-between py-2 ">
          {[10, 25, 50, 75, 100].map((percentage) => (
            <div key={percentage} className="flex items-center">
              <span className="mr-1 text-sm text-blue-800">{percentage}%</span>
              <div className="w-3 h-0.5 bg-blue-800"></div>
            </div>
          ))}
        </div>
        <div className="w-full inset-0 border-[4px] border-t-0 border-[#19181A] rounded-b-3xl overflow-hidden relative mt-4">
          <div style={{ height: `${tankHeight - waterHeight}px` }}></div>
          {!loading && (
            <div
              className="transition-all duration-1000 ease-in-out overflow-hidden"
              style={{ height: `${waterHeight}px` }}
            >
              <div className="relative h-[70px] overflow-hidden">
                <div className="wave1 wave "></div>
                <div className="wave2 wave "></div>
                <div className="wave3 wave "></div>
                <div className="wave4 wave "></div>
              </div>
              <div className="bg-[#5F94F7] h-full"></div>
              <Bubbles />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
