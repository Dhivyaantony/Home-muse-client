import React, { useState } from 'react';
import ToastContainr from '../Components/Common/ToastContainr';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import LoginBox from '../Components/Common/LoginBox'
import './Login.css'
import SignUpBox from '../Components/Common/SignUpBox';
const Login=()=> {

  const[boxName,setBoxName]=useState('login')
 
  const handleSignUp=()=>
  {
    setBoxName('signUp')
  }
  
  const handleLogin=()=>
  {
    setBoxName('login')
  }
  
  return (
    
    <>
   
    <div className='background-radial-gradient login-page ' style={{minHeight:'100 vh'}}>

<div className='background-image '>

    <MDBContainer fluid className='p-4 background-radial-gradient min-vh-100'>
      <MDBRow>
<div className='s mt-5 '></div>
        <MDBCol md='6' className='p1 text-center d-flex flex-column mt-5 ml- '>

          <h1 className="my-5 display-2 fw-bold ls-tight px-3 " style={{color: 'hsl(218, 81%, 95%)'}}>
            The HomeMuse <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>  Elevating Everyday Living with Organized Harmony</span>
          </h1>
          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
          
</p>
          <div className='but'>
        <button className='b1' onClick={handleSignUp}>signup</button>
        </div>
        </MDBCol>
       {boxName==='login'&& <LoginBox setBoxName={setBoxName}/>}
        {boxName==='signUp'&& <SignUpBox setBoxName={setBoxName}/>}
        <MDBCol md="1"></MDBCol>
       </MDBRow>

    </MDBContainer>
    
    </div>

  </div>
  <ToastContainr /> {/* Ensure it's placed here */}

  </>
  );
}

export default Login;