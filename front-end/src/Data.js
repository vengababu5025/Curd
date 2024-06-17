import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Data() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({ id: '', Name: '', Email: '' });

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data.students || []);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`);
            window.location.reload(); // Reload the page after delete (not recommended for production)
        } catch (err) {
            console.log(err);
        }
    };

    const handleViewPopup = (id) => {
        axios.get(`http://localhost:3001/read/${id}`)
            .then(res => {
                const student = res.data.stud[0]; // Ensure response is an array with one object
                setSelectedStudent({
                    id: student.id,
                    Name: student.Name,
                    Email: student.Email
                });
                setShowModal(true);
            })
            .catch(err => console.log(err));
    };

    const handleCloseModal = () => setShowModal(false);
    const navigate = useNavigate();



    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'
            style={{ backgroundColor: '#23E5DC', padding: '10px', marginBottom: '10px' }}>
                   
                                        
            <div className='w-50 bg-white rounded p-3'>
                <div className='d-flex justify-content-end '>
                <Link to='/' className="btn btn-success">⏏ Logout</Link>
                </div>
                <h1>Student Data</h1>
                <div className='d-flex justify-content-end'>
                    <Link to='/Create' className="btn btn-success">Create+</Link>
                </div>
                <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.id}</td>
                                        <td>{student.Name}</td>
                                        <td>{student.Email}</td>
                                        <td>
                                            <button className='btn btn-sm btn-success mx-2' onClick={() => handleViewPopup(student.id)}>View</button>
                                            <Link to={`/Edit/${student.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                            <button className='btn btn-sm btn-danger' onClick={() => handleDelete(student.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Loading...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Viewing Student Details */}
            <Modal show={showModal} onHide={handleCloseModal}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>ID:</strong> {selectedStudent.id}</p>
                    <p><strong>Name:</strong> {selectedStudent.Name}</p>
                    <p><strong>Email:</strong> {selectedStudent.Email}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Data;
