import React, { useState, useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Dashboard() {
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Groceries", "Education", "Fun", "Travel"];
  const notes = useRef("");
  const cost = useRef(0);
  const [category, setCategory] = useState("Choose category");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await setDoc(doc(db, "transactions", "transaction"), {
        notes: notes.current.value,
        amount: cost.current.value,
        category: category,
        user: auth.currentUser.uid,
      });
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="flex bg-[#f9faf3]">
      <div className="flex justify-center items-center mx-auto max-w-[80%] min-h-screen">
        <h1 class="text-3xl font-bold font-Roboto absolute top-0 w-full py-4 bg-[#f9faf3] text-center text-[#012a57]">
          Centsible
        </h1>
        <form
          onSubmit={handleSubmit}
          className="absolute top-50 left-1/2 transform -translate-x-1/2 flex flex-col w-7/8 gap-5"
        >
          <label className="font-medium text-center text-[#012a57] font-Roboto text-2xl">
            Add Your Transaction
          </label>
          <input
            type="number"
            ref={cost}
            className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
            placeholder="Cost"
            required
          />
          <input
            type="text"
            ref={notes}
            className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
            placeholder="Notes"
            required
          />
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setDropDown(!dropDown)}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Category: {category}
              </button>
            </div>

            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
              hidden={dropDown}
            >
              <div className="py-1" role="none">
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
          <div className="items-center justify-center min-h-screen">
            <center>
              <button
                type="submit"
                className="hover:cursor-pointer bg-[#012a57] font-bold rounded-xl p-2 w-fit text-[#f9faf3]"
              >
                Log Transaction
              </button>
            </center>
          </div>
          {error && <p className="text-red-900">{error}</p>}
        </form>
      </div>
    </div>
  );
}
