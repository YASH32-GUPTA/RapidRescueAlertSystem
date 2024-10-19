import React, { useState } from 'react';

// DB
import { States } from '../../Database/customSignUp';

// component 
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Header from '../../component/header';


// css 
import './SignUp.css'; 

// Navigation
import { useNavigate } from 'react-router-dom';

// image 
import logo from './logo.png';


function BasicExample() {
  const [formData, setFormData] = useState({
    deptId: '',
    pincode: ''
  });

   // Navigate
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
    if (States[formData.deptId] != undefined && States[formData.deptId] == formData.pincode) {
        // Redirect to home
        navigate('/home');

      } else {
        setFormData({
          deptId: '',
          pincode: ''
        });
      }
  };

  return (
    <div className="main">
      <header>
        <Header />
      </header>

      <div className="basic-example-form font white">
        <Form className="form-container" onSubmit={handleSubmit}>
          
          {/* logo */}
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="group-form">
            <div className="box">
              <Form.Group className="mb-3" controlId="formDeptId">
                <Form.Label className="form-label"><b>Dept ID</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Dept ID"
                  name="deptId"
                  value={formData.deptId}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
            </div>

            <div className="box">
              <Form.Group className="mb-3" controlId="formPincode">
                <Form.Label className="form-label"><b>Pincode</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
            </div>

            <div className="btnBox">
              <Button variant="outlined" type="submit" className="btn-primary">Login</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  
  );
}

export default BasicExample;
