import React, { useState } from 'react';
import ToastContainr from '../Components/Common/ToastContainr';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import LoginBox from '../Components/Common/LoginBox';
import './Login.css';
import SignUpBox from '../Components/Common/SignUpBox';

const Login = () => {
  const [boxName, setBoxName] = useState('login');

  const handleSignUp = () => {
    setBoxName('signUp');
  };

  const handleLogin = () => {
    setBoxName('login');
  };

  return (
    <>
      <div className='background-radial-gradient login-page' style={{ minHeight: '100vh' }}>
        <MDBContainer fluid className='p-4 background-radial-gradient'>
          <MDBRow className='align-items-center'>
            <MDBCol md='6' className='p1 text-center'>
              <h1 className="my-5 display-2 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                The HomeMuse <br />
                <span style={{ color: 'hsl(218, 81%, 75%)' }}>  Elevating Everyday Living with Organized Harmony</span>
              </h1>
              <div className='but'>
                <button className='b1' onClick={handleSignUp}>Sign Up</button>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className='justify-content-center'> {/* Center the login or sign up box */}
            <MDBCol md='6' className='login-box-container'>
              {boxName === 'login' && <LoginBox setBoxName={setBoxName} />}
              {boxName === 'signUp' && <SignUpBox setBoxName={setBoxName} />}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <ToastContainr /> {/* Ensure it's placed here */}
    </>
  );
};

export default Login;
