import React, { useEffect, useState } from 'react';
import './SignUpBox.css';
import axios from 'axios';
import { BASE_URL } from '../../Constants/constants';
import { createBrowserHistory } from 'history';

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
} from 'mdb-react-ui-kit';

const history = createBrowserHistory();

function SignUpBox({ setBoxName }) {
  const history = createBrowserHistory();

  const handleLogin = () => {
    setBoxName('login');
  };

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
      history.push(setBoxName);
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
    <MDBCol md="6"> {/* Increase column width */}
      <MDBCard className="my-5 bg-glass mt-0 SignUpBox" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <MDBCardBody className="p-5">
          <MDBRow>
            <MDBCol col="4">
              <MDBInput
                wrapperClass="mb-4"
                label="First name"
                id="form1"
                type="text"
                value={signUpData.fName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, fName: e.target.value })
                }
              />
            </MDBCol>

            <MDBCol col="4">
              <MDBInput
                wrapperClass="mb-4"
                label="Last name"
                id="form2"
                type="text"
                value={signUpData.lName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, lName: e.target.value })
                }
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="form3"
            type="email"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form4"
            type="password"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Confirm Password"
            id="form5"
            value={signUpData.confirmPassword}
            type="password"
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                confirmPassword: e.target.value,
              })
            }
          />

          <MDBBtn className="w-100 mb-4" size="md" onClick={handleRegister}>
            Sign Up
          </MDBBtn>

          <div className="text-center">
            <p>
              <span onClick={handleLogin}>Go to login</span>
            </p>

            <p>Or sign up with:</p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default SignUpBox;
