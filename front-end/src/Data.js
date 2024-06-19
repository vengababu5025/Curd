import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Data() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({ id: '', Name: '', Email: '' });
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sortConfig, setSortConfig] = useState({
        field: '',
        direction: ''
    });

    useEffect(() => {
        fetchData();
    }, [currentPage, itemsPerPage, sortConfig]);

    const fetchData = () => {
        axios.get(`http://localhost:3001/?page=${currentPage}&limit=${itemsPerPage}&sort=${sortConfig.field}&order=${sortConfig.direction}`)
            .then(res => {
                setData(res.data.students || []);
                setTotalItems(res.data.total || 0);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleViewPopup = (id) => {
        axios.get(`http://localhost:3001/read/${id}`)
            .then(res => {
                const student = res.data.stud[0];
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);  // Reset to the first page whenever the items per page changes
    };

    const handleSort = (field) => {
        let direction = 'asc';
        if (sortConfig.field === field && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ field, direction });
    };

    const handleClearSort = () => {
        setSortConfig({ field: '', direction: '' });
    };

    const filteredData = data.filter(item =>
        search.toLowerCase() === '' || item.Name.toLowerCase().includes(search.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        const fieldA = typeof a[sortConfig.field] === 'string' ? a[sortConfig.field].toLowerCase() : a[sortConfig.field];
        const fieldB = typeof b[sortConfig.field] === 'string' ? b[sortConfig.field].toLowerCase() : b[sortConfig.field];

        if (fieldA < fieldB) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (fieldA > fieldB) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div>
            <div className='d-flex justify-content-end'>
                <Link to='/' className="btn btn-success">⏏ Logout</Link>
            </div>
            <h1>Student Data</h1>
            <div className='d-flex justify-content-between'>
                <input
                    className='form-control'
                    placeholder='Search here'
                    onChange={e => setSearch(e.target.value)}
                />
                <Link to='/Create' className="btn btn-success">Create+</Link>
            </div>
            <br />
            <div className='d-flex justify-content-between mb-3'>
                <div className="form-group">
                    <label>Items per page: </label>
                    <select className="form-control ml-2" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <SortableColumn
                                field="id"
                                label="ID"
                                sortConfig={sortConfig}
                                onSort={handleSort}
                            />
                            <SortableColumn
                                field="Name"
                                label="Name"
                                sortConfig={sortConfig}
                                onSort={handleSort}
                            />
                            <SortableColumn
                                field="Email"
                                label="Email"
                                sortConfig={sortConfig}
                                onSort={handleSort}
                            />
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.length > 0 ? (
                            sortedData.map((student, index) => (
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
                            <tr><td colSpan="4">No data</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modal for Viewing Student Details */}
            <Modal show={showModal} onHide={handleCloseModal} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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

function SortableColumn({ field, label, sortConfig, onSort }) {
    const isSorted = sortConfig.field === field;
    const sortIcon = isSorted ? (sortConfig.direction === 'asc' ? 'up' : 'down') : '';

    return (
        <th onClick={() => onSort(field)}>
            {label} {isSorted && <i className={`fas fa-sort-${sortIcon}`}></i>}
        </th>
    );
}

export default Data;
