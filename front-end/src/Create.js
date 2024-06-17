import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Create() {
    const [values,setValues]=useState({
        name:'',
        email:''
    })
    const naviagte=useNavigate()
    const handlesubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/student',values)
        .then(res=>{
            console.log(res)
            naviagte('/')
        })
        .then(err=>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handlesubmit}>
                <h2>Add Student</h2>
                <div className='mb-4'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter Name' className='form-control'
                    onChange={e=>setValues({...values, name:e.target.value})}></input>
                </div>
                <div className='mb-4'>
                    <label>Email</label>
                    <input type='mail' placeholder='Enter Mail' className='form-control'
                    onChange={e=>setValues({...values, email:e.target.value})}></input>
                </div>
                          
                <div className='d-flex justify-content-between'>
                <Link to={`/Data`} className='btn btn-sm btn-primary mx-2'>
                <i className='fas fa-arrow-left'></i> Back</Link> 
                <button className='btn btn-success'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create