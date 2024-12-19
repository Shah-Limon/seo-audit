import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactMessageManagement = () => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('pending');
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [modalStatus, setModalStatus] = useState('');

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        filterMessages();
    }, [messages, searchTerm, statusFilter]);

    const fetchMessages = () => {
        fetch(`http://localhost:5000/contact-messages`)
            .then((res) => res.json())
            .then((info) => {
                setMessages(info);
                const pendingMessages = info.filter(message =>
                    message.messageStatus.toLowerCase() === 'pending'
                );
                setFilteredMessages(pendingMessages);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                toast.error('Failed to fetch messages');
            });
    };

    const filterMessages = () => {
        let result = messages;

        if (statusFilter) {
            result = result.filter(message =>
                message.messageStatus.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            result = result.filter(message =>
                message.subject.toLowerCase().includes(lowercasedTerm) ||
                message.email.toLowerCase().includes(lowercasedTerm) ||
                message.name.toLowerCase().includes(lowercasedTerm) ||
                message.messageStatus.toLowerCase().includes(lowercasedTerm)
            );
        }

        setFilteredMessages(result);
        setCurrentPage(1);
    };

    const getCurrentPageMessages = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredMessages.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleUpdateStatus = () => {
        if (!selectedMessage || !modalStatus) {
            toast.error('Please select a valid status');
            return;
        }

        fetch(`http://localhost:5000/contact-message/${selectedMessage._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messageStatus: modalStatus })
        })
            .then((res) => res.json())
            .then(() => {
                const updatedMessages = messages.map(message =>
                    message._id === selectedMessage._id
                        ? { ...message, messageStatus: modalStatus }
                        : message
                );
                setMessages(updatedMessages);
                toast.success("Status Updated Successfully!");
                setShowStatusModal(false);
            })
            .catch(error => {
                console.error('Error updating message status:', error);
                toast.error('Failed to update message status');
            });
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'badge bg-warning text-dark';
            case 'read':
                return 'badge bg-success';
            case 'replied':
                return 'badge bg-info';
            case 'archived':
                return 'badge bg-secondary';
            default:
                return 'badge bg-secondary';
        }
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);

        if (endPage - startPage < 2) {
            startPage = Math.max(1, endPage - 2);
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
                    {pageNumbers.slice(startPage - 1, endPage).map(number => (
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
            <Toaster position="top-right" />
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">Contact Message Management</h2>
                            <div className="d-flex">
                                <select
                                    className="form-select me-2"
                                    style={{ width: '150px' }}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="read">Read</option>
                                    <option value="">All Messages</option>
                                </select>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    style={{ width: '250px' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="card-body">
                            {filteredMessages.length > 0 ? (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Subject</th>
                                                   
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getCurrentPageMessages().map((message) => (
                                                    <tr key={message._id}>
                                                        <td>
                                                            {new Date(message.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </td>
                                                        <td>{message.name}</td>
                                                        <td>{message.email}</td>
                                                        <td>{message.subject}</td>
                                                       
                                                        <td>
                                                            <span className={getStatusStyle(message.messageStatus)}>
                                                                {message.messageStatus}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <button
                                                                    className="btn btn-info btn-sm me-1"
                                                                    onClick={() => {
                                                                        setSelectedMessage(message);
                                                                        setShowViewModal(true);
                                                                    }}
                                                                >
                                                                    View
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary btn-sm"
                                                                    onClick={() => {
                                                                        setSelectedMessage(message);
                                                                        setModalStatus(message.messageStatus);
                                                                        setShowStatusModal(true);
                                                                    }}
                                                                >
                                                                    Update Status
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {renderPagination()}
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-muted">No messages found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* View Message Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Message Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMessage && (
                        <div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Name:</strong> {selectedMessage.name}
                                </div>
                                <div className="col-md-6">
                                    <strong>Email:</strong> {selectedMessage.email}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}
                                </div>
                                <div className="col-md-6">
                                    <strong>Status:</strong> 
                                    <span className={`ms-2 ${getStatusStyle(selectedMessage.messageStatus)}`}>
                                        {selectedMessage.messageStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <strong>Subject:</strong> {selectedMessage.subject}
                            </div>
                            <div className="card bg-light p-3">
                                <strong>Message:</strong>
                                <p>{selectedMessage.message}</p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Status Modal */}
            <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Message Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={modalStatus}
                                onChange={(e) => setModalStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                                <option value="archived">Archived</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
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

export default ContactMessageManagement;