import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const UserEmailTemplate = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const iframeRef = useRef(null);
    const [emailTemplate, setEmailTemplate] = useState({});
    const [showCodePreview, setShowCodePreview] = useState(false);

    // Fetch email template on component mount
    useEffect(() => {
        const fetchEmailTemplate = async () => {
            try {
                const response = await fetch(`http://localhost:5000/generate-email-templates`);
                const data = await response.json();
                if (data.length > 0) {
                    setEmailTemplate(data[0]);
                    setHtmlCode(data[0].htmlCode);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error("Error fetching the email template:", error);
            }
        };

        fetchEmailTemplate();
    }, []);

    // Update iframe content whenever htmlCode changes
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentDocument;
            if (document) {
                document.open();
                document.write(htmlCode);
                document.close();
            }
        }
    }, [htmlCode]);

    // Handle changes in the textarea
    const handleCodeChange = (event) => {
        setHtmlCode(event.target.value);
    };

    // Handle iframe input changes
    const handleIframeInput = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentDocument;
            if (document) {
                setHtmlCode(document.documentElement.outerHTML);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = isEditing
                ? `http://localhost:5000/edit-generate-email-template/${emailTemplate._id}`
                : "http://localhost:5000/add-generate-email-template";

            const response = await axios.post(url, { generateEmailTemplate: htmlCode }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201 || response.status === 200) {
                setMessage("Template saved successfully!");
            } else {
                setMessage("Failed to save the template.");
            }
        } catch (error) {
            console.error("Error saving the template:", error);
            setMessage("Failed to save the template.");
        }
    };

    // Copy HTML code to clipboard
    const handleCopyCode = () => {
        navigator.clipboard.writeText(htmlCode)
            .then(() => setMessage("HTML code copied!"))
            .catch((error) => {
                console.error("Error copying HTML code:", error);
                setMessage("Failed to copy HTML code.");
            });
    };

    // Toggle code preview modal
    const handleViewCodePreview = () => {
        setShowCodePreview(!showCodePreview);
    };

    // Add contentEditable to the iframe body
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentDocument;
            if (document) {
                document.body.contentEditable = true;
                const handleInput = () => handleIframeInput();
                document.body.addEventListener('input', handleInput);
                return () => {
                    document.body.removeEventListener('input', handleInput);
                };
            }
        }
    }, [htmlCode]);
    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        marginBottom: '2rem'
    };

    const headerStyle = {
        marginBottom: '2rem',
        borderBottom: '1px solid #e9ecef',
        paddingBottom: '1rem'
    };

    const titleStyle = {
        fontSize: '1.75rem',
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: '0.5rem'
    };

    const previewContainerStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '1rem',
        border: '1px solid #e9ecef',
        marginBottom: '2rem'
    };

    const iframeStyle = {
        width: '100%',
        height: '600px',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '2rem'
    };

    const buttonStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#4361ee',
        color: 'white',
        ':hover': {
            backgroundColor: '#3730a3'
        }
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#e9ecef',
        color: '#2d3436',
        ':hover': {
            backgroundColor: '#dee2e6'
        }
    };

    const messageStyle = {
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem',
        backgroundColor: '#d1fae5',
        color: '#065f46',
        textAlign: 'center'
    };

    const enhancedModalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        zIndex: 1000,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "2rem"
    };

    const modalHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid #e9ecef"
    };

    const closeButtonStyle = {
        padding: "0.5rem 1rem",
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        ':hover': {
            backgroundColor: "#dc2626"
        }
    };

    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>Email Template Editor</h1>
                    <p style={{ color: '#64748b' }}>Edit your email template in real-time with live preview</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={previewContainerStyle}>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: '500',
                            marginBottom: '1rem',
                            color: '#4b5563'
                        }}>
                            Live Preview
                        </h2>
                        <iframe
                            ref={iframeRef}
                            style={iframeStyle}
                            title="Live Preview"
                        />
                    </div>

                    <div style={buttonContainerStyle}>
                        <button
                            type="button"
                            style={secondaryButtonStyle}
                            onClick={handleCopyCode}
                        >
                            <i className="fas fa-copy"></i>
                            Copy HTML
                        </button>
                        <button
                            type="button"
                            style={primaryButtonStyle}
                            onClick={handleViewCodePreview}
                        >
                            <i className={`fas fa-${showCodePreview ? 'eye-slash' : 'eye'}`}></i>
                            {showCodePreview ? "Hide Preview" : "View Preview"}
                        </button>
                       
                    </div>
                </form>

                {message && (
                    <div style={messageStyle}>
                        {message}
                    </div>
                )}
            </div>

            {showCodePreview && (
                <>
                    <div style={modalOverlayStyle} onClick={handleViewCodePreview} />
                    <div style={enhancedModalStyle}>
                        <div style={modalHeaderStyle}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
                                Template Preview
                            </h2>
                            <button
                                onClick={handleViewCodePreview}
                                style={closeButtonStyle}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <iframe
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid #e9ecef",
                                    borderRadius: "8px"
                                }}
                                title="Template Preview"
                                srcDoc={htmlCode}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Modal styling
const modalStyle = {
    position: "fixed",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    overflow: "auto"
};

// Close button styling
const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
};

export default UserEmailTemplate;