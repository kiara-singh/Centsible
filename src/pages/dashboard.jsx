import React, { useState, useRef, useEffect } from "react";
import { addDoc, getDoc, updateDoc, collection, doc } from "firebase/firestore"; // Import the necessary functions from Firestore
import { auth, db } from "../firebase"; // Import your Firebase configuration
import { Navbar } from "../components/navbar";
import SpeechToText from "./voiceCommand";
import { categories } from "../constants";

export default function Dashboard() {
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioStatus, setAudioStatus] = useState("");
  const[usingVoice,setUsingVoice]=useState(false);


  const notes = useRef("");
  const cost = useRef(0);
  const voiceCategoryRef = useRef("Choose category");
  const [category, setCategory] = useState("Choose category");

  const [showPopup, setShowPopUp] = useState(false);

  useEffect(() => {
    setDropDown(false);
  }, []);

  useEffect(() => {
    if (category !== "Choose category" && usingVoice) {
      console.log("Category updated:", category);
      setTimeout(() => {
        console.log("Submitting the form after 2 seconds...");
        handleSubmit();
      }, 2000);
    }
  }, [category, usingVoice]); // Runs every time category changes

 
  const handleVoiceExtraction = ({
    cost: voiceCost,
    category: voiceCategory,
    note: voiceNote,
  }) => {
    cost.current.value = voiceCost;
    notes.current.value = voiceNote;
    voiceCategoryRef.current = voiceCategory;
    setCategory(voiceCategoryRef.current);
    setUsingVoice(true);

    console.log("Category set to:", voiceCategory);

    console.log("Fields populated:", {
      cost: cost.current.value,
      notes: notes.current.value,
      category: voiceCategory,
    });

  };

  const handleSubmit = async (e) => {
    //if e is null like when submitting after voice command, this won't run
    e?.preventDefault();
    setError("");
    setShowPopUp(false);


    try {
      console.log("Submitting to Firestore:", {
        notes: notes.current.value,
        amount: Number(cost.current.value),
        category: category,
        user: auth.currentUser.uid,
      });

      // Add transaction data to Firestore
      await addDoc(collection(db, "transactions"), {
        notes: notes.current.value,
        amount: Number(cost.current.value),
        category: category,
        user: auth.currentUser.uid,
      });

      console.log("Transaction added to Firestore.");

      const valRef = doc(db, "users", auth.currentUser.uid);

      // Get current user data
      const valSnap = await getDoc(valRef);

      if (valSnap.exists()) {
        console.log("value: ", valSnap.data());
      } else {
        console.log("no value found");
      }

      const data = valSnap.data();
      const prevVal = data[category] || 0;
      console.log("prev: ", prevVal);
      const newVal = prevVal + Number(cost.current.value);
      console.log("new value: ", newVal);

      // Increment the value for the category in the user's data
      await updateDoc(valRef, {
        [category]: newVal,
      });

      console.log("User's category value updated in Firestore.");

      setShowPopUp(true);

      setTimeout(() => setShowPopUp(false), 2000);
      notes.current.value = "";
      cost.current.value = "";
      setCategory("Choose category");
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-[#f9faf3] h-screen overflow-hidden">
        <div className="flex justify-center items-center mx-auto max-w-[80%] min-h-screen">
          <h1 className="text-3xl font-bold font-Roboto absolute top-0 w-full py-4 bg-[#f9faf3] text-center text-[#012a57]">
            Centsible
          </h1>
          <form
            onSubmit={handleSubmit}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-7/8 gap-5"
          >
            <label className="font-medium text-center text-[#012a57] font-Roboto text-2xl">
              Add your transaction
            </label>
            <input
              type="number"
              step="0.01"
              ref={cost}
              className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 placeholder:text-gray-400"
              placeholder="Cost"
              required
            />
            <input
              type="text"
              ref={notes}
              className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 placeholder:text-gray-400"
              placeholder="Notes"
            />
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={() => setDropDown(!dropDown)}
                  className="inline-flex w-full gap-x-1.5 rounded-md px-3 py-2 text-sm text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Category: {category}
                </button>
              </div>

              <div
                className="w-full z-10 mt-2 w-56 origin-top-right rounded-md ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                hidden={!dropDown}
              >
                <div className="py-1 max-h-35 overflow-y-auto" role="none">
                  {categories.map((categoryName) => (
                    <p
                      onClick={() => {
                        setDropDown(!dropDown);
                        setCategory(categoryName);
                      }}
                      key={categoryName}
                      className="px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                    >
                      {categoryName}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 mb-15" >
              <center>
                <button
                  type="submit"
                  className="hover:cursor-pointer bg-[#012a57] font-bold rounded-xl p-2 w-full text-[#f9faf3]"
                >
                  Log Transaction
                </button>
              </center>
              <SpeechToText className="m-3" onExtract={handleVoiceExtraction} />
            </div>
            <p >{audioStatus}</p>
            {error && <p className="text-red-900">{error}</p>}
            {showPopup && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-sky-800 text-white px-4 py-2 rounded-xl shadow-md animate-bounce z-10 mt-50">
                <p>Entered!</p>
              </div>
            )}
          </form>
  
        </div>
      </div>

      <div className="mt=200">
        <Navbar />
      </div>
    </>
  );
}
