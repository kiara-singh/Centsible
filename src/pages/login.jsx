import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user:', userCredential.user);
      navigate('/dashboard'); // Change this to wherever you want to redirect after login
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>Centsible - Login</h1>
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

              {error && <p className="error-message">{error}</p>}

              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Log In'}
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
