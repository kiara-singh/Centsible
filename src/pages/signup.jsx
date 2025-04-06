import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      // Save user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        Groceries:0,
        Education:0,
        Shopping:0,
        Fun:0,
        Transportation:0,
        Other:0,
      });

      
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <main>
      <section>
        <div className="flex bg-[#f9faf3]">
          <div className="flex justify-center items-center mx-auto max-w-[80%] min-h-screen">
            <h1 className="text-3xl font-bold font-Roboto absolute top-0 w-full py-4 bg-[#f9faf3] text-center text-[#012a57]">Centsible</h1>
            <form onSubmit={onSubmit} className="absolute top-40 left-1/2 transform -translate-x-1/2 flex flex-col w-7/8 gap-5">
            <label className="font-medium text-center text-[#012a57] font-Roboto text-2xl">Create a new account</label>
              <div>
                {/* <label htmlFor="email-address">Email</label> */}
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
                {/* <label htmlFor="name">Full Name</label> */}
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Name"
                  className="border border-gray-300 text-black text-sm rounded-md w-full p-2.5 y-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                {/* <label htmlFor="password">Password</label> */}
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
                <center>
                <button 
                type="submit" 
                className="hover:cursor-pointer bg-[#012a57] round-md font-bold rounded-xl p-2 w-99/100 text-[#f9faf3]"
                disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
                </center>
              </div>

              <p className="text-center">
                Already have an account? <a className="underline hover:text-black dark:hover:text-[#012a57]" href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
