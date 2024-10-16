import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './Loginsignup.css';

const Loginsignup = ({ setIsAuthenticated, setShowLogin }) => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    referralcode: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Login") {
        // Login user
        const response = await axios.post('http://localhost:4000/api/user/login', {
          email: data.email,
          password: data.password
        });

        if (response.data.success) {
          // Store user details and navigate to MainPage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', response.data.name);
          localStorage.setItem('referralcode', response.data.referralCode);
          localStorage.setItem('Totaldonation', response.data.Totaldonation);
          if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(true);
          } else {
            console.error("setIsAuthenticated is not a function");
          }
          navigate('/main'); // Navigate to MainPage
        } else {
          alert(response.data.message);
        }
      } else {
        // Register user
        const response = await axios.post('http://localhost:4000/api/user/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          referralcode: data.referralcode
        });

        if (response.data.success) {
          alert("Registration successful! Please log in.");
          setCurrentState("Login"); // Switch to login view
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error during the request:", error);
      alert("Something went wrong! Check the console for details.");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === 'Login' ? null : (
            <>
              <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                type='text'
                placeholder='Your Name'
                required
              />
              <input
                name='referralcode'
                onChange={onChangeHandler}
                value={data.referralcode}
                type='text'
                placeholder='Your referral code'
              />
            </>
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your Email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Your Password'
            required
          />
        </div>
        <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        {currentState === 'Login' ? (
          <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default Loginsignup;
