import React, { useState, useRef } from "react";
import { categories } from "../constants";

const SpeechToText = () => {
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
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            setTranscript((prev) => prev + result[0].transcript + " ");
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const categoryPattern = categories.join("|");
        const pattern = new RegExp(
          `(\\d+(?:\\.\\d{1,2})?)\\s*(?:dollars?|bucks)?\\s*(?:on|for)?\\s*(${categoryPattern})\\b(?:.*?\\s(.+))?`,
          "i"
        );
        const match = interimTranscript.match(pattern);

        if (match) {
          const cost = parseFloat(match[1]);
          const category = match[2];
          const note = match[3] ? match[3].trim() : null;

          console.log(cost, category, note);
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
    }

    setIsListening((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>
        <strong>Transcript:</strong> {transcript}
      </p>
    </div>
  );
};

export default SpeechToText;
