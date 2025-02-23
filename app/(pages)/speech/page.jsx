"use client";

import { useState, useEffect, useRef } from "react";
import axios from "@/app/libs/axios"; // Ensure axios is properly imported
import { motion } from "framer-motion"
import { Mic, MicOff } from "lucide-react"

const Page = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [aiResponse, setAiResponse] = useState(""); // Store AI response

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const interimRef = useRef("");

  // Initialize Speech Recognition
  const initializeRecognition = () => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript + " ";
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        setTranscript((prev) => prev + final);
        setInterimText(interim);
        transcriptRef.current = final;
        interimRef.current = interim;
      };

      recognition.onspeechend = () => {
        console.log("Silence detected, stopping in 2s...");
        setTimeout(stopListening, 2000);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = async () => {
        console.log("Speech recognition stopped");
        setIsListening(false);

        // Send API request with latest transcript
        try {
          const ans = await axios.post("/giveAiAnswer", {
            question: transcriptRef.current,
          });
          console.log("API Response:", ans.data);

          setAiResponse(ans.data.answer); // Assuming API response has { answer: "some text" }

          // Speak the AI response
          speakText(ans.data.answer);
        } catch (error) {
          console.error("API Error:", error);
        }
      };
    } else {
      alert("Speech Recognition is not supported in this browser.");
    }
  };

  // Function to make the browser speak text
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1; // Adjust speed (1 is normal)
      utterance.pitch = 1; // Adjust pitch (1 is normal)
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  useEffect(() => {
    initializeRecognition();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setInterimText("");
      setAiResponse(""); // Clear previous AI response
      transcriptRef.current = "";
      interimRef.current = "";
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.button
          className="relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            background: isListening
              ? [
                  "linear-gradient(45deg, #60a5fa, #a78bfa)",
                  "linear-gradient(45deg, #818cf8, #c084fc)",
                  "linear-gradient(45deg, #60a5fa, #a78bfa)",
                ]
              : "linear-gradient(45deg, #60a5fa, #a78bfa)",
          }}
          transition={{
            duration: 3,
            repeat: isListening ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
          onClick={isListening ? stopListening : startListening}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-white opacity-20"
            animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
            transition={{
              duration: 2,
              repeat: isListening ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isListening ? (
              <Mic className="w-16 h-16 text-white" />
            ) : (
              <MicOff className="w-16 h-16 text-white" />
            )}
          </div>
        </motion.button>
      </div>
  );
};

export default Page;
