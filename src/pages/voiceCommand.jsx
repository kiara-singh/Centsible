import React, { useState, useRef } from "react";
import { categories } from "../constants";
import { AudioOutlined } from "@ant-design/icons";
const SpeechToText = ({ onExtract }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let match = null;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            const finalText = result[0].transcript.trim();
            setTranscript((prev) => prev + result[0].transcript + " ");
            console.log("Final Transcript:", finalText);
            const categoryPattern = categories.join("|");
            console.log("Category pattern:", categoryPattern);

            const pattern = new RegExp(
              `(\\d+(?:\\.\\d{1,2})?)\\s*(?:dollars?|bucks)?\\s*(?:on|for)?\\s*(${categoryPattern})\\b(?:.*?\\s(.+))?`,
              "i"
            );
            match = finalText.match(pattern);
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (match) {
          const cost = parseFloat(match[1]);
          let category = match[2];
          category = category.charAt(0).toUpperCase() + category.slice(1);
          const note = match[3] ? match[3].trim() : null;

          console.log(
            "Matched values - Cost:",
            cost,
            "Category:",
            category,
            "Note:",
            note
          );

          if (onExtract) {
            onExtract({ cost, category, note });
          }

          console.log("inVC:", cost, category, note);
        }
      };

      recognitionRef.current.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
      };
    }

    if (!isListening) {
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      setTranscript("");
    }

    setIsListening((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <AudioOutlined style={{ fontSize: "25px" }} onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </AudioOutlined>
      {/* <p>
        <strong>Transcript:</strong> {transcript}
      </p> */}
    </div>
  );
};

export default SpeechToText;
