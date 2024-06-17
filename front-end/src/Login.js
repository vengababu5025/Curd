import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [values,setValues]=useState({
        username:'',
        password:''
    })
    const naviagte=useNavigate()
    const handlesubmit=(e)=>{
        e.preventDefault();
        axios.get('http://localhost:3001/login',values)
        .then(res=>{
            console.log(res.data)
            naviagte('/')
        })
        .then(err=>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handlesubmit}>
            <h2>Login</h2>
            <div className='mb-4'>
                <label>Username</label>
                <input type='text' placeholder='Enter Username' className='form-control'
                onChange={e=>setValues({...values, username:e.target.value})}></input>
            </div>
            <div className='mb-4'>
                <label>Password</label>
                <input type='mail' placeholder='Enter Password' className='form-control'
                onChange={e=>setValues({...values, password:e.target.value})}></input>
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
    </div>
</div>
  )
}

export default Login