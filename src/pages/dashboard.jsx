import React, { useState, useRef } from "react";
import { doc,collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { categories } from "../constants";

export default function Dashboard() {
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState("");

  const notes = useRef("");
  const cost = useRef(0);
  const [category, setCategory] = useState("Choose category");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await addDoc(collection(db, "transactions"), {
        notes: notes.current.value,
        amount: Number(cost.current.value),
        category: category,
        user: auth.currentUser.uid,
      });

      const valRef=doc(db,"users", auth.currentUser.uid)

      //get current value
      const valSnap=await getDoc(valRef);

      if(valSnap.exists()){
        console.log("value: ", valSnap.data());
      }else{
        console.log("no value found");
      }

      const data=valSnap.data();
      const prevVal=data[category] || 0;
      console.log("prev: ", prevVal);
      const newVal=prevVal+Number(cost.current.value);
      console.log(newVal);

      //increment it 
      await updateDoc(valRef,{
        [category]:newVal
      })

      console.log("updated value")

    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto max-w-[80%] min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-2">
        <label className="font-medium">Transaction</label>
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

        <button
          type="submit"
          className="hover:cursor-pointer bg-slate-300 font-bold rounded-xl p-2 w-fit"
        >
          Log Transaction
        </button>
        {error && <p className="text-red-900">{error}</p>}
      </form>
    </div>
  );
}
