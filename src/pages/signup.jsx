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
        <div>
          <div>
            <h1>Centsible</h1>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="email-address">Email</label>
                <input
                  type="email"
                  id="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full Name"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </form>

            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
