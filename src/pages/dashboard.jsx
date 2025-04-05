import React, { useState, useRef } from "react";

export default function Dashboard() {
  const [dropDown, setDropDown] = useState(false);
  const categories = ["Groceries", "Education", "Fun", "Travel"];
  const purchase = useRef("");
  const cost = useRef(0);
  const [category, setCategory] = useState("Choose category");

  const handleSubmit = () => {
    console.log(purchase.current.value, cost.current.value, category);
  };

  return (
    <div className="flex justify-center items-center mx-auto max-w-[80%] min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-2">
        <label className="font-medium">Transaction</label>
        <input
          type="text"
          ref={purchase}
          className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
          placeholder="Purchase"
          required
        />
        <input
          type="number"
          ref={cost}
          className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
          placeholder="Cost"
          required
        />
        <div class="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => setDropDown(!dropDown)}
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Category: {category}
            </button>
          </div>

          <div
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
            hidden={dropDown}
          >
            <div class="py-1" role="none">
              {categories.map((categoryName) => (
                <p
                  onClick={() => {
                    setDropDown(!dropDown);
                    setCategory(categoryName);
                  }}
                  class="px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
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
      </form>
    </div>
  );
}
