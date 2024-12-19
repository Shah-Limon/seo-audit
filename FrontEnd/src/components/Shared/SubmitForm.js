import React, { useState } from 'react';

const SubmitForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                ...formData,
                status: 'Pending', 
                date: new Date().toISOString(), 
            };

            const response = await fetch('http://localhost:5000/add-audit-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                // Clear form
                setFormData({
                    name: '',
                    email: '',
                    website: ''
                });
                // Redirect to thank you page
                window.location.href = '/thank-you';
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <header id="submit" className="d-flex flex-column mt-5 mb-5">
                <div className="container d-flex flex-column flex-grow-1 position-relative z-index-3">
                    <section className="starta-hero my-5 d-flex flex-column justify-content-center flex-grow-1">
                        <div className="row mt-5 pt-4">
                            <div className="col-md-12 position-relative">
                                <form className="heroForm" onSubmit={handleFormSubmit}>
                                    <article className="formContent text-center">
                                        <h2 className="starta-h2">Request Seo Audit</h2>
                                        <p className="starta-desc">Comprehensive SEO Audit</p>
                                    </article>
                                    <div className="inputField">
                                        <input
                                            className="starta-desc"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <i className="fa-solid fa-user" />
                                    </div>
                                    <div className="inputField">
                                        <input
                                            className="starta-desc"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <i className="fa-solid fa-envelope" />
                                    </div>
                                    <div className="inputField">
                                        <input
                                            className="starta-desc"
                                            type="text"
                                            name="website"
                                            id="website"
                                            placeholder="Enter Website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <i className="fa-solid fa-globe"></i>
                                    </div>
                                    <button type="submit" className="starta-button">
                                        <span className="position-relative">Submit Request</span>
                                        <span className="starta-button-hover" />
                                    </button>
                                </form>
                                <div className="shapes">
                                    <img src="/assets/images/hero/shape1.svg" alt="shape" />
                                    <img src="/assets/images/hero/shape2.svg" alt="shape" />
                                    <img src="/assets/images/hero/shape3.svg" alt="shape" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="heroBG">
                    <img src="/assets/images/hero/bg.jpg" alt="Background" />
                </div>
            </header>

        </>
    );
};

export default SubmitForm;