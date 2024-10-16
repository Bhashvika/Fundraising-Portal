import React, { useState } from 'react';
import Loginsignup from '../../components/Login/Loginsignup';
import './Home.css';
import { Routes,Route } from 'react-router-dom';
import Mainpage from '../../components/Main/Mainpage';
const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    <div className='body'>
    <div className='container'>
      {showLogin && <Loginsignup setShowLogin={setShowLogin} />}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
        <h1>Welcome to NayePankh Foundation</h1>
        <p>
          <span style={{ paddingLeft: '19vh' }}>
            At NayePankh Foundation, we believe in the power of community and the impact of collective efforts.
          </span><br />
          Join us in making a difference by supporting our fundraising campaigns aimed at improving lives and fostering sustainable change.
        </p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setShowLogin(true)}>Sign Up</button>
        </div>
      </div>
    </div>
    </div>
    
    </>
    
  );
}

export default Home;
