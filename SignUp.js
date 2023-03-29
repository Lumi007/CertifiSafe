// Front-end implementation using React

import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/signup", formData);
      console.log(response.data);
      // Redirect to user dashboard based on user type
      if (formData.userType === "issuer") {
        // Redirect to issuer dashboard
      } else if (formData.userType === "student") {
        // Redirect to student dashboard
      } else if (formData.userType === "verifier") {
        // Redirect to verifier dashboard
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="userType">User Type:</label>
        <select name="userType" onChange={handleInputChange} required>
          <option value="">Select user type</option>
          <option value="issuer">Issuer</option>
          <option value="student">Student</option>
          <option value="verifier">Verifier</option>
        </select>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
