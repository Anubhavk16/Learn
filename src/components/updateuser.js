import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";

const Updateuser = () => {
  const navigate =useNavigate();
  const userId= useParams(); 
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

  useEffect(() => {
    console.log(userId.id);
    // Fetch user data and pre-fill the fields
    fetchUser(userId.id);
  }, []);

  const fetchUser = async (Id) => {
    console.log(Id);
    try {
      const response = await axios.get(`http://localhost:8000/databyId?`+ new URLSearchParams({
        id:Id
      }));
      const results= response.data
      results.map((result)=>{
        setUpdateEmail(result.email);
        setUpdatePassword(result.password);
  
      })
      // navigate()
    
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e) => {
    setUpdateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUpdatePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    // se.preventDefault();
    console.log(userId.id);
    try {
      await axios.post(`http://localhost:8000/update?`+ new URLSearchParams({
        id: userId.id
      }), {
        email: updateEmail,
        password: updatePassword,
      }).then((res)=>{
        console.log(res);
      })
       navigate('/home')
    // Refresh user data after update
      setUpdateEmail('');
      setUpdatePassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <Formik
      initialValues={{
        updateEmail:updateEmail,
        updatePassword:updatePassword
      }}
       onSubmit={handleSubmit}
       >
        {({values,handleSubmit,})=>(
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <Field
                type="email"
                name="updateEmail"
                value={updateEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div>
          <label>Password:</label>
          <input
            type="password"
            value={updatePassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Update</button>
          </form>
        )}

          </Formik>
        
        
      
    </div>
  );
};

export default Updateuser;




