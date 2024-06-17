import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/read/${id}`)
            .then(res => {
                const student = res.data.stud[0]; // Ensure response is an array with one object
                setName(student.Name);
                setEmail(student.Email);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/update/${id}`, { Name, Email })
            .then(res => {
                console.log('Student updated successfully');
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Edit Student</h2>
                    <div className='mb-4'>
                        <label>Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            className='form-control' 
                            name='name'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label>Email</label>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            className='form-control' 
                            name='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
