import { useState } from 'react'
import './App.css'
import oktaAuth from './oktaConfig';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration with password
  const handleRegister = async () => {
    try {
      // const response = await axios.post('/api/register/password', formData);
      // console.log('Registration successful:', response.data);
      // Handle success - maybe redirect to login page
    } catch (error) {
      // console.error('Registration failed:', error.response.data);
      // Handle error - show error message to the user
    }
  };

  // Handle registration with Google
  const handleGoogleRegister = async () => {
    try {
      const token = await oktaAuth.signInWithRedirect(import.meta.env.VITE_GOOGLE_IDP)
      console.log('User information 1:', token);
    } catch (error) {
      console.error('Google login error:', error);
    }
   
  };

  // Handle registration with Facebook (to be implemented)
  const handleFacebookRegister = async () => {
    // Add Facebook registration logic here
  };
  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleRegister}>Register with Password</button>
      <button onClick={handleGoogleRegister}>Continue with Google</button>
      <button onClick={handleFacebookRegister}>Continue with Facebook</button>
    </div>
  )
}

export default App

