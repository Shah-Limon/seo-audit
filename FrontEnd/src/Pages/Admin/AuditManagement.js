import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AuditManagement = () => {
    // State management
    const [audits, setAudits] = useState([]);
    const [filteredAudits, setFilteredAudits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Pending');
    const [showModal, setShowModal] = useState(false);
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [modalStatus, setModalStatus] = useState('');
    const navigate = useNavigate();

    // Pagination settings
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);

    // Fetch audits on component mount
    useEffect(() => {
        fetchAudits();
    }, []);

    // Apply filters whenever search term or status filter changes
    useEffect(() => {
        filterAudits();
    }, [audits, searchTerm, statusFilter]);

    // Fetch audits from backend
    const fetchAudits = () => {
        fetch(`http://localhost:5000/audits`)
            .then((res) => res.json())
            .then((info) => {
                // Sort audits by date in descending order (latest first)
                const sortedAudits = info.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAudits(sortedAudits);
                
                // Initially filter to show pending audits
                const pendingAudits = sortedAudits.filter(audit => 
                    audit.status.toLowerCase() === 'Pending'
                );
                setFilteredAudits(pendingAudits);
            })
            .catch(error => {
                console.error('Error fetching audits:', error);
                toast.error('Failed to fetch audits');
            });
    };

    // Filter audits based on search term and status
    const filterAudits = () => {
        let result = audits;

        // Apply status filter
        if (statusFilter) {
            result = result.filter(audit => 
                audit.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        // Apply search filter
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            result = result.filter(audit => 
                audit.website.toLowerCase().includes(lowercasedTerm) ||
                audit.email.toLowerCase().includes(lowercasedTerm) ||
                audit.status.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredAudits(result);
        setCurrentPage(1);
    };

    // Pagination logic
    const getCurrentPageAudits = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAudits.slice(startIndex, startIndex + itemsPerPage);
    };

    // Delete audit handler
    const handleDeleteAudit = (auditId) => {
        fetch(`http://localhost:5000/audit/${auditId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedAudits = audits.filter((audit) => audit._id !== auditId);
                setAudits(updatedAudits);
                
                // Update filtered audits to reflect the deletion
                const updatedFilteredAudits = updatedAudits.filter(audit => 
                    !statusFilter || audit.status.toLowerCase() === statusFilter.toLowerCase()
                );
                setFilteredAudits(updatedFilteredAudits);
                
                toast.success("Deleted Successfully!");
            })
            .catch(error => {
                console.error('Error deleting audit:', error);
                toast.error('Failed to delete audit');
            });
    };

    // Update audit status
    const handleUpdateStatus = () => {
        if (!selectedAudit || !modalStatus) {
            toast.error('Please select a valid status');
            return;
        }

        fetch(`http://localhost:5000/audit/${selectedAudit._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: modalStatus })
        })
            .then((res) => res.json())
            .then((updatedAudit) => {
                // Update the audit in the local state
                const updatedAudits = audits.map(audit => 
                    audit._id === updatedAudit._id ? updatedAudit : audit
                );
                setAudits(updatedAudits);

                // Immediately update filtered audits based on current filter
                const updatedFilteredAudits = updatedAudits.filter(audit => 
                    (!statusFilter || audit.status.toLowerCase() === statusFilter.toLowerCase()) &&
                    (!searchTerm || 
                        audit.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        audit.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        audit.status.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
                setFilteredAudits(updatedFilteredAudits);
                toast.success("Status Updated Successfully!");
                navigate(0);
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating audit:', error);
                toast.error('Failed to update audit status');
            });
    };

    // Status color mapping
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'Pending':
                return 'badge bg-warning text-dark';
            case 'Approved':
                return 'badge bg-success';
            case 'Rejected':
                return 'badge bg-danger';
            case 'Completed':
                return 'badge bg-info';
            default:
                return 'badge bg-secondary';
        }
    };

    // Render pagination controls
    const renderPagination = () => {
        // If no pages, don't render pagination
        if (totalPages <= 1) return null;

        // Calculate page range
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);
        
        // Adjust start page if we're near the end
        if (endPage - startPage < 2) {
            startPage = Math.max(1, endPage - 2);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map(number => (
                        <li 
                            key={number} 
                            className={`page-item ${currentPage === number ? 'active' : ''}`}
                        >
                            <button 
                                className="page-link" 
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <div className="container-fluid bg-light py-4 min-vh-100">
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">Audit Management</h2>
                            <div className="d-flex">
                                {/* Status Filter Dropdown */}
                                <select 
                                    className="form-select me-2" 
                                    style={{width: '150px'}}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Completed">Completed</option>
                                    <option value="">All Statuses</option>
                                </select>

                                {/* Search Input */}
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search..." 
                                    style={{width: '250px'}}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="card-body">
                            {filteredAudits.length > 0 ? (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Website</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getCurrentPageAudits().map((audit) => (
                                                    <tr key={audit._id}>
                                                        <td>
                                                            {new Date(audit.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </td>
                                                        <td>{audit.name}</td>
                                                        <td>{audit.email}</td>
                                                        <td>{audit.website}</td>
                                                        <td>
                                                            <span className={getStatusStyle(audit.status)}>
                                                                {audit.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-primary btn-sm me-2"
                                                                onClick={() => {
                                                                    setSelectedAudit(audit);
                                                                    setModalStatus(audit.status);
                                                                    setShowModal(true);
                                                                }}
                                                            >
                                                                Update
                                                            </button>
                                                            <button 
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteAudit(audit._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {renderPagination()}
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-muted">No audit records found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Status Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Audit Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select 
                                value={modalStatus}
                                onChange={(e) => setModalStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateStatus}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AuditManagement;