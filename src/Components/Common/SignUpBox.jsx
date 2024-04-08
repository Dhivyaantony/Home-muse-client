import React, { useEffect, useState } from 'react';
import './SignUpBox.css';
import axios from 'axios';
import { BASE_URL } from '../../Constants/constants';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function SignUpBox({ setBoxName }) {
  const [signUpData, setSignUpData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(signUpData);
  }, [signUpData]);

  const validateForm = () => {
    let newErrors = {};

    // Add your validation logic here
    if (signUpData.fName.trim() === '') {
      // handle fName validation
    }

    if (signUpData.lName.trim() === '') {
      // handle lName validation
    }

    if (signUpData.email.trim() === '') {
      // handle email validation
    } else if (!/^\S+@\S+\.\S+$/.test(signUpData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (signUpData.password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 8) {
      // handle password validation
    }

    if (signUpData.confirmPassword.trim() === '') {
      // handle confirmPassword validation
    } else if (signUpData.confirmPassword !== signUpData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors({ ...newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/signUp`, signUpData);
      console.log(res);
      // Assuming you are using React Router for navigation
      setBoxName('login'); // Switch to the login view after successful signup
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('User with this email already exists!');
        setSignUpData({
          fName: '',
          lName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        console.error('Error during signup API call:', error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2 className="text-center mb-4">Sign Up</h2>
       
<div className="form-group input-group">
  <input
    className="form-control"
    placeholder="First name"
    type="text"
    value={signUpData.fName}
    onChange={(e) => setSignUpData({ ...signUpData, fName: e.target.value })}
  />
  <input
    className="form-control"
    placeholder="Last name"
    type="text"
    value={signUpData.lName}
    onChange={(e) => setSignUpData({ ...signUpData, lName: e.target.value })}
  />
</div>
<div className="form-group">
      <input
        className="form-control"
        placeholder="Email"
        type="email"
        value={signUpData.email}
        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
      />
    </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            value={signUpData.confirmPassword}
            onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={handleRegister}>Sign Up</button>
        <div className="text-center mt-3">
          <p>
            <span onClick={() => setBoxName('login')} className="link">Go to login</span>
          </p>
          <p>Or sign up with:</p>
        </div>
      </div>
    </div>
  );
}

export default SignUpBox;
