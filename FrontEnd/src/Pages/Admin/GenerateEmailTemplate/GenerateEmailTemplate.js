// import axios from "axios";
// import React, { useState, useRef, useEffect } from "react";

// const GenerateEmailTemplate = () => {
//     const [htmlCode, setHtmlCode] = useState("");
//     const [message, setMessage] = useState("");
//     const [isEditing, setIsEditing] = useState(false);
//     const iframeRef = useRef(null);
//     const [showCodePreview, setShowCodePreview] = useState(false);

//     // Update iframe content whenever htmlCode changes
//     useEffect(() => {
//         const iframe = iframeRef.current;
//         if (iframe) {
//             const document = iframe.contentWindow.document;
//             if (document) {
//                 document.open();
//                 document.write(htmlCode);
//                 document.close();
//             }
//         }
//     }, [htmlCode]);

//     // Handle changes in the textarea
//     const handleCodeChange = (event) => {
//         setHtmlCode(event.target.value);
//     };

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const url = "http://localhost:5000/add-generate-email-template";
    
//             const response = await axios.post(url, { generateEmailTemplate: htmlCode }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
    
//             if (response.status === 200) {
//                 setMessage("Template saved successfully!");
//             } else {
//                 setMessage("Failed to save the template.");
//             }
//         } catch (error) {
//             console.error("Error saving the template:", error);
//             if (error.response) {
//                 console.error("Error response data:", error.response.data);
//             }
//             setMessage("Failed to save the template.");
//         }
//     };
    


//     // Copy HTML code to clipboard
//     const handleCopyCode = () => {
//         navigator.clipboard.writeText(htmlCode)
//             .then(() => setMessage("HTML code copied!"))
//             .catch((error) => {
//                 console.error("Error copying HTML code:", error);
//                 setMessage("Failed to copy HTML code.");
//             });
//     };

//     // Toggle code preview modal
//     const handleViewCodePreview = () => {
//         setShowCodePreview(!showCodePreview);
//     };

//     return (
//         <div className="contact-2_form-section padding-bottom-100 container">
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: "20px" }}>
//                     <h2 className="mb-2">{isEditing ? "Edit Your Template" : "Create a Template"}</h2>
//                     <textarea
//                         value={htmlCode}
//                         onChange={handleCodeChange}
//                         rows="10"
//                         style={{ width: "100%", padding: "10px", fontFamily: "monospace", borderRadius: "4px", border: "1px solid #ccc" }}
//                     />
//                 </div>
//                 <div>
//                     <h2>Live Preview (Editable)</h2>
//                     <iframe
//                         ref={iframeRef}
//                         style={{ width: "100%", height: "400px", border: "none", borderRadius: "4px" }}
//                         title="Live Preview"
//                     />
//                 </div>
//                 <div className="form-box-style__form-input-button d-flex justify-content-center" style={{ marginTop: "20px" }}>
//                     <button type="submit" className="btn-masco rounded-pill">
//                         {isEditing ? "Update Email Template" : "Save Email Template"}
//                     </button>
//                     <button
//                         type="button"
//                         className="btn-masco rounded-pill"
//                         onClick={handleCopyCode}
//                         style={{ marginLeft: "10px" }}
//                     >
//                         Copy HTML Code
//                     </button>
//                     <button
//                         type="button"
//                         className="btn-masco rounded-pill"
//                         onClick={handleViewCodePreview}
//                         style={{ marginLeft: "10px" }}
//                     >
//                         {showCodePreview ? "Hide Template Preview" : "View Template Preview"}
//                     </button>
//                 </div>
//             </form>
//             {message && <p>{message}</p>}

//             {/* Modal for code preview */}
//             {showCodePreview && (
//                 <div className="code-preview-modal" style={modalStyle}>
//                     <button
//                         onClick={handleViewCodePreview}
//                         style={closeButtonStyle}
//                     >
//                         Close
//                     </button>
//                     <h2>Live Preview</h2>
//                     <iframe
//                         style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
//                         title="Live Preview"
//                         srcDoc={htmlCode}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// // Modal styling
// const modalStyle = {
//     position: "fixed",
//     top: "10%",
//     left: "10%",
//     width: "80%",
//     height: "80%",
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//     zIndex: 1000,
//     overflow: "auto"
// };

// // Close button styling
// const closeButtonStyle = {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "red",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     padding: "5px 10px",
// };

// export default GenerateEmailTemplate;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const GenerateEmailTemplate = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const iframeRef = useRef(null);
    const [showCodePreview, setShowCodePreview] = useState(false);

    // Update iframe content whenever htmlCode changes
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const document = iframe.contentWindow.document;
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

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = "http://localhost:5000/add-generate-email-template";
    
            const response = await axios.post(url, { generateEmailTemplate: htmlCode }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                setMessage("Template saved successfully!");
            } else {
                setMessage("Failed to save the template.");
            }
        } catch (error) {
            console.error("Error saving the template:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
            }
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

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '1rem',
                        borderBottom: '2px solid #e5e7eb',
                        paddingBottom: '0.5rem'
                    }}>
                        {isEditing ? "Edit Your Template" : "Create a Template"}
                    </h2>
                    <textarea
                        value={htmlCode}
                        onChange={handleCodeChange}
                        rows="10"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontFamily: 'monospace',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            backgroundColor: 'white',
                            fontSize: '0.875rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                            transition: 'border-color 0.2s ease-in-out'
                        }}
                        placeholder="Enter your HTML email template here..."
                    />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '1rem'
                    }}>
                        Live Preview (Editable)
                    </h2>
                    <iframe
                        ref={iframeRef}
                        style={{
                            width: '100%',
                            height: '400px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}
                        title="Live Preview"
                    />
                </div>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '1.5rem'
                }}>
                    <button 
                        type="submit" 
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#2563eb';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#3b82f6';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        {isEditing ? "Update Email Template" : "Save Email Template"}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleCopyCode}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#059669';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#10b981';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Copy HTML Code
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleViewCodePreview}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6366f1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#4f46e5';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#6366f1';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        {showCodePreview ? "Hide Template Preview" : "View Template Preview"}
                    </button>
                </div>
            </form>

            {message && (
                <p style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: message.includes('successfully') ? '#d1fae5' : '#fee2e2',
                    color: message.includes('successfully') ? '#065f46' : '#991b1b',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '500'
                }}>
                    {message}
                </p>
            )}

            {/* Modal for code preview */}
            {showCodePreview && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        width: '90%',
                        maxWidth: '1200px',
                        height: '80%',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button 
                            onClick={handleViewCodePreview}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease-in-out'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#dc2626';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#ef4444';
                            }}
                        >
                            ✕
                        </button>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: '#374151'
                        }}>
                            Live Preview
                        </h2>
                        <iframe
                            style={{
                                width: '100%',
                                height: 'calc(100% - 60px)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}
                            title="Live Preview"
                            srcDoc={htmlCode}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateEmailTemplate;