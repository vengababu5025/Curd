import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
function Data() {
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/')
        .then(res=>{
            setData(res.data.students)
            console.log(res.data.students.Name)
        })
        .catch(err=>console.log(err))
    },[])
    const handleDelete = async(id)=>{
        try{
            await axios.delete(`http://localhost:3001/delete/`+id)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <h1>Student Data</h1>
            <div className='d-flex justify-content-end'>
                <Link to='/Create' className="btn btn-success">Create+</Link>
            </div>
            <table className='table '>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='table'>
                {
                        data.map((students,index)=>{
                                return <tr key={index}>
                                    <td>{students.id}</td>
                                    <td>{students.Name}</td>
                                    <td>{students.Email}</td>
                                    <td>
                                        <Link to={`/Edit/${students.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                        <button className='btn btn-sm btn-danger' onClick={e=>handleDelete(students.id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                </tbody>
                
            </table>
            </div>
        </div>
    </div>
  )
}

export default Data