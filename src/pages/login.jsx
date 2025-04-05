import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Login =() => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
     })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

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

    
                  {error && <p className="error-message">{error}</p>}
    
                  <div>
                    <button type="submit" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </div>
                </form>
    
              </div>
            </div>
          </section>
        </main>
      );

}






export default Login;
