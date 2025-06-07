import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCityMap = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'San Francisco', 'Chicago'],
  UK: ['London', 'Manchester', 'Liverpool'],
};

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!formData.username.trim()) errs.username = 'Username is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email';
    if (formData.password.length < 6) errs.password = 'Min 6 characters required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) errs.phoneNumber = '10-digit phone required';
    if (!formData.country) errs.country = 'Select a country';
    if (!formData.city) errs.city = 'Select a city';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) errs.pan = 'Invalid PAN (ABCDE1234F)';
    if (!/^\d{12}$/.test(formData.aadhar)) errs.aadhar = '12-digit Aadhar required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/submitted', { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['First Name', 'firstName'],
          ['Last Name', 'lastName'],
          ['Username', 'username'],
          ['Email', 'email'],
        ].map(([label, name]) => (
          <div key={name}>
            <label>{label}</label><br />
            <input name={name} value={formData[name]} onChange={handleChange} />
            <div style={{ color: 'red' }}>{errors[name]}</div>
          </div>
        ))}

        <div>
          <label>Password</label><br />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(p => !p)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <div style={{ color: 'red' }}>{errors.password}</div>
        </div>

        <div>
          <label>Phone Number</label><br />
          <input
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            style={{ width: '50px' }}
          />
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="1234567890"
          />
          <div style={{ color: 'red' }}>{errors.phoneNumber}</div>
        </div>

        <div>
          <label>Country</label><br />
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countryCityMap).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <div style={{ color: 'red' }}>{errors.country}</div>
        </div>

        <div>
          <label>City</label><br />
          <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
            <option value="">Select City</option>
            {(countryCityMap[formData.country] || []).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div style={{ color: 'red' }}>{errors.city}</div>
        </div>

        <div>
          <label>PAN Number</label><br />
          <input name="pan" value={formData.pan} onChange={handleChange} />
          <div style={{ color: 'red' }}>{errors.pan}</div>
        </div>

        <div>
          <label>Aadhar Number</label><br />
          <input name="aadhar" value={formData.aadhar} onChange={handleChange} />
          <div style={{ color: 'red' }}>{errors.aadhar}</div>
        </div>

        <br />
        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
