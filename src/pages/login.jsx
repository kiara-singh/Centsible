import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user=auth.currentUser;
      //store user info in local storage 
      localStorage.setItem('user',JSON.stringify(user));
      console.log("user:", userCredential.user);
      navigate("/home"); // Change this to wherever you want to redirect after login
    } catch (error) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <main>
      <section>
        <div className="flex bg-[#f9faf3] min-h-screen">
          <div>
          <h1 class="text-3xl font-bold font-Roboto absolute top-0 w-full py-4 bg-[#f9faf3] text-center text-[#012a57]"> Centsible </h1>
            <form onSubmit={onSubmit} className="absolute top-60 left-1/2 transform -translate-x-1/2 flex flex-col w-7/8 gap-5">
            <label className="font-medium text-center text-[#012a57] font-Roboto text-2xl">Welcome back!</label>
              <div>
                {/*<label htmlFor="email-address">Email</label>*/}
                <input
                  type="email"
                  id="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                {/*<label htmlFor="password">Password</label>*/}
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div>
                <button type="submit" className="hover:cursor-pointer bg-[#012a57] round-md font-bold rounded-xl p-2 w-99/100 text-[#f9faf3]" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;