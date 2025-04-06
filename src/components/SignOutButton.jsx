import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase logout
      localStorage.removeItem("user"); // Remove user data from localStorage
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;