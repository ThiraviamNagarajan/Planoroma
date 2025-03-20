import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [users, setUsers] = useState<Array<typeof formData>>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const validateEmail = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let validationErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      validationErrors.name = 'Name is required.';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      validationErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (users.some((user) => user.email === formData.email)) {
      validationErrors.email = 'This email is already registered.';
    }

    if (!formData.password || !validatePassword(formData.password)) {
      validationErrors.password =
        'Password must contain at least one uppercase letter and one special character.';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.phone ||
      validationErrors.password ||
      validationErrors.confirmPassword
    ) {
      setErrors(validationErrors);
      return;
    }

    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/LoginPage');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #d3d3d3',
          borderRadius: '10px',
          backgroundColor: 'white',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          gap: '25px',
          padding: '50px',
        }}
      >
        <div style={{ color: '#1E3A8A', fontSize: '20px' ,fontWeight:"700"}}>Sign Up</div>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.name && <div style={errorStyle}>{errors.name}</div>}

        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.email && <div style={errorStyle}>{errors.email}</div>}

        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.phone && <div style={errorStyle}>{errors.phone}</div>}

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.password && <div style={errorStyle}>{errors.password}</div>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.confirmPassword && (
          <div style={errorStyle}>{errors.confirmPassword}</div>
        )}
        <div style={{ display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'space-between', width: '100%',gap:'10px' }}>
         
          <button type="submit" onClick={handleSubmit} style={buttonStyle}>
            Sign Up
          </button>
        <div style={{color:"black"}}> or </div>
          <div
            style={{
              color: 'black',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
           
          >
            Already Registered?
          </div>
          <button type="submit"  onClick={() => navigate('/')} style={buttonStyle}>
            Login in
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '13px',
  backgroundColor: 'white',
  outline: 'none',
  width: '100%',
};

const errorStyle = {
  color: 'red',
  fontSize: '10px',
  fontWeight: '500',
};

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#1E3A8A',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
};

export default SignInPage;
