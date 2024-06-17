import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/login`, values)
            .then(res => {
                console.log(res.data);
                navigate('/Data');
            })
            .catch(err => {
                console.error("Login error:", err);
                if (err.response && err.response.status === 401) {
                    setError("Invalid username or password. Please try again.");
                } else {
                    setError("An unexpected error occurred. Please try again later.");
                }
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className='mb-4'>
                        <label>Username</label>
                        <input type='text' placeholder='Enter Username' className='form-control'
                            onChange={e => setValues({ ...values, username: e.target.value })}></input>
                    </div>
                    <div className='mb-4'>
                        <label>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control'
                            onChange={e => setValues({ ...values, password: e.target.value })}></input>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
