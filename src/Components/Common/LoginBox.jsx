import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants/constants'
//import Home from '../Pages/home';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, setUserRole } from '../../toolkit/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import ToastContainer from './ToastContainr';
import { toastError, toastSuccess } from '../../Constants/Pluggins';
// Then use <ToastContainer /> in your JSX where you want to display toast notifications

//import Footer from './Footer';
import './LoBox.css';

  const LoginBox = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  //const[userDetails,setUserDetails]=useState({});
  const navigate = useNavigate(); 
  const{userDetails,userRole}=useSelector((state)=>state.user)
  const dispatch=useDispatch()



  const validateForm = () => {
    let errors = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin =async  (e) => {
    
      e.preventDefault(); // <-- prevent default form action
    
    if (!validateForm()) {
      return;
    }

    try {
    debugger;
      if (email && password) {
        
      await axios.post(`${BASE_URL}/auth/login`,{ email,password }).then((res)=>{
        toastSuccess("success" )

        console.log('Login response:', res.data)

        if (res.data.message === 'Login successful' && res.data.token) {

          localStorage.setItem('token', res.data.token)
          const parsedToken=parseJwt(res.data.token)
          localStorage.setItem('user', JSON.stringify(parsedToken))
          dispatch(setUserDetails(parsedToken))
          navigate('/Home');

        } 
        if(res.data.message==="invalid credentials "){
          toastError('sorry')
        }
        })
      }
        else {
          alert("invalid credential")
        }
    } catch (err) {
      console.log(err)
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

return (
  <div className="container">
    <div className='container col-4 login-box '>
      <form>
      
        <div className='input'>
          <label htmlFor="email">enter your Email-id</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}

          {errors.general && <p>{errors.general}</p>}
        </div>
        <button className='but1' type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
    <ToastContainer />
  </div>
 );
  };
   

export default LoginBox;