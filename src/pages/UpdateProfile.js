import React, { useContext, useEffect, useState } from 'react'
import './update.css'
import AuthContext from '../context/AuthContext'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'


function UpdateProfile({ onClose, }) {
  const navigate = useNavigate()
  const [value,setValue]=useState()
  const {user,authToken} = useContext(AuthContext)
  //  console.log('user',user);
  const EditProfile = async (e) =>{
    e.preventDefault()     
          const response = await axios(`http://127.0.0.1:8000/userprofile/`,{
            method:'PATCH',
            headers:{
              'Content-Type':'application/json',
                  'Authorization':`Bearer ${authToken.access}`
                },
                data: {
                username: e.target.username.value,
                email: e.target.email.value,
                ...(e.target.firstname.value && { first_name: e.target.firstname.value }),
                ...(e.target.lastname.value && { last_name: e.target.lastname.value }),
                ...(user.is_doctor
                  ? {
                      ...(e.target.hospital.value && { hospital: e.target.hospital.value }),
                      ...(e.target.department.value && { department: e.target.department.value }),
                      ...(e.target.speciality.value && { speciality: e.target.speciality.value }),

                    }
                    : undefined
                ),
              }
              
              })
              
        let data = await response.data
        console.log(data);
        
        if (response.status===200){
          navigate('/home')
          onClose();

        }
      }
      
      useEffect(()=>{
        fetchData()
    },[])
      
      const fetchData =async ()=>{
   try {
    const response = await axios.get("http://127.0.0.1:8000/userprofile/",{
      
      headers :{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access),
      }
    })
    if (response.status ===200){
      const data=await response.data
      setValue(data)

    }
    else{
      console.log('error');
    }
    
  } catch (error) {
    console.log('error');
   }
}

console.log("value",value);

return (
        
        <div>
       
          <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button> 
          <form onSubmit={EditProfile} className="form update-form"  style={{ textAlign: 'center' }}>
            <div className="segment">
            {/* <h1 style={{ color: 'white' }}>Update</h1> */}
            </div>
            <label className="label">
            <input className='input' name="username" placeholder="Username" required type="text"  value={value && value.username}/>
            </label>
            <label className="label">
            <input className='input' name="firstname" placeholder="First Name" required type="text" defaultValue={value && value.first_name} />
            </label>
            <label className="label">
            <input className='input' name="lastname" placeholder="Last Name" required type="text" defaultValue={value && value.last_name} />
            </label>
            <label className="label">
            <input className='input' name="email" placeholder="Email" required type="email" defaultValue={value && value.email} />
            </label>
            {user.is_doctor ? (
              <>
                <label className='label'>
                <input className='input' name="hospital" placeholder="Hospital"   defaultValue={value && value.doctor_profile && value.doctor_profile.hospital ? value.doctor_profile.hospital : ''}
/>
                </label>
                <label className="label">
                <input className='input' name="department" placeholder="Department"  defaultValue={value && value.doctor_profile && value.doctor_profile.department ? value.doctor_profile.department : ''}
/>
                </label>
                <label className="label">
                <input className='input' name="speciality" placeholder="specialization"  defaultValue={value && value.doctor_profile && value.doctor_profile.speciality ? value.doctor_profile.speciality : ''}
/>
                </label>
              </>
            ) : null}
            <br/>
            <button className='button' type="submit" value="Update" >Update</button>
           
          </form>
          
          </div>
    </div>
        </div>
      );
}

export default UpdateProfile 
