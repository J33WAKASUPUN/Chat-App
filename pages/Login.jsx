import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"; // Add this line

function Login() {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg('Login successful!');
      navigate('/'); // Assuming you want to navigate to the home page after login
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className='logo'>Space Chat</span>
        <span className='title'>Login</span>
        {successMsg && <p className="success-message">{successMsg}</p>}
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          <button disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p>Don't you have an account? <Link to="/register" className="signup-link">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login