"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import WaterTank from "@/components/WaterTank";
import axios from "./libs/axios";
import { getSupabaseClient } from "./libs/supabaseClient";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = getSupabaseClient();
  const handleUserTableChanges = (payload) => {
    if (payload.errors && payload.errors.length > 0) {
      console.error("Error:", payload.errors);
    } else {
      console.log("changes are done");
      setUserData(payload.new);
    }
  };
  useEffect(() => {
    axios.post("/getData", { username: "Deepansu" }).then((res) => {
      setUserData(res.data);
      setTimeout(() => {
        setLoading(false);
        console.log("done loading");
      }, 1000);
    });
  }, []);
  useEffect(() => {
    const subscription = supabase
      .channel("public:User")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "User" },
        handleUserTableChanges
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  function convertToIST(timeString) {
    if (!timeString) return "";
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
    <div className="bg-gray-100 max-w-[385px] mx-auto font-geist">
      <Navbar />
      <main className="container mx-auto">
        <section className="rounded-lg px-6 py-4">
          <div className="flex justify-between  items-center h-full ">
            <div className="p-6 w-40 rounded-lg realtive border border-gray-300 h-24">
            <div
                className={loading ? "animate-pulse h-[0.75rem] bg-gray-300 rounded-xl" : "text-xs font-semibold"}
              >{!loading && "Current Level : "}</div>
              <div
                className={
                  loading 
                    ? "animate-pulse h-[1.40rem] bg-gray-300 rounded-xl mt-2"
                    : "text-[1.40rem] font-bold"
                }
              >
                {!loading && <div className={
                  userData?.isactive
                    ? "text-green-600"
                    : "text-red-600"
                }> {userData?.currentwaterlevel * 10}%</div>}
               
              </div>
            </div>
            <div className="p-6 w-40 rounded-lg border border-gray-300 h-24">
              <div
                className={loading ? "animate-pulse h-[0.75rem] bg-gray-300 rounded-xl" : "text-xs font-semibold"}
              >
                {!loading && "Estimated FillTime:"}
              </div>
              <div
                className={
                  loading
                    ? "animate-pulse h-[1.40rem] bg-gray-300 rounded-xl mt-2"
                    : "text-[1.40rem] font-bold"
                }
              > { !loading && <div className={
                userData?.isactive
                  ? "text-green-600 "
                  : "text-red-600"
              }>{convertToIST(userData?.estimatedfilltime) || "Off"}</div> }
              </div>
            </div>
          </div>
        </section>
        <WaterTank
          level={userData?.currentwaterlevel * 10}
          timeleft={Math.floor(userData?.timeleft)}
          isactive={userData?.isactive}
          loading={loading}
        />
      </main>
    </div>
  );
}
