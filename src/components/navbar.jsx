import React from "react";
import { HomeOutlined, DollarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-3 left-0 right-0 mx-auto flex justify-between items-center my-auto px-12 py-2 border-t border-slate-500 w-[95%] gap-5">
      <HomeOutlined
        onClick={() => {
          navigate("/home");
        }}
        style={{ fontSize: "25px" }}
      />
      <DollarOutlined
        onClick={() => {
          navigate("/dashboard");
        }}
        style={{ fontSize: "25px" }}
      />
      <button className="font-normal text-[18px] text-amber-900">Logout</button>
    </div>
  );
};
