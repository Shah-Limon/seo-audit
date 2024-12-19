import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [templatesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/generate-email-templates`)
      .then((res) => res.json())
      .then((info) => setTemplates(info))
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  const createIframeSrc = (htmlContent) => {
    return `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
  };

  // Get current templates
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate);

  // Handle pagination click
  // Update the handlePaginationClick function
  const handlePaginationClick = async (pageNumber) => {
    setIsLoading(true);

    // First scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Wait for scroll and then update page
    await new Promise((resolve) => setTimeout(resolve, 400));
    setCurrentPage(pageNumber);

    // Add small delay for loading state
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '4rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2d3436',
            marginBottom: '1rem',
            letterSpacing: '-0.5px'
          }}>
            Email Templates
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#636e72',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Choose the one that fits your brand best.
          </p>
        </div>

        {/* Templates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
          padding: '1rem',
          opacity: isLoading ? '0.5' : '1',
          transition: 'opacity 0.3s ease'
        }}>
          {currentTemplates.map((template, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {/* Template content remains the same */}
              <div style={{
                position: 'relative',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                padding: '1rem'
              }}>
                <iframe
                  src={createIframeSrc(template.htmlCode)}
                  style={{
                    width: '100%',
                    height: '300px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  title={`Preview of template ${template._id}`}
                />
              </div>

              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <Link
                  to={`/template/${template._id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#4361ee',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '500',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3730a3'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4361ee'}
                >
                  View Template
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {templates.length > templatesPerPage && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              {[...Array(Math.ceil(templates.length / templatesPerPage))]
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaginationClick(index + 1)}
                    disabled={isLoading}
                    style={{
                      padding: '0.5rem 1rem',
                      border: `1px solid ${currentPage === index + 1 ? '#4361ee' : '#e9ecef'}`,
                      backgroundColor: currentPage === index + 1 ? '#4361ee' : 'white',
                      color: currentPage === index + 1 ? 'white' : '#4b5563',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      minWidth: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {index + 1}
                  </button>
                ))
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(Math.ceil(templates.length / templatesPerPage), currentPage + 2)
                )}
            </div>
          </div>
        )}

        {/* No Templates Message */}
        {templates.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b',
            fontSize: '1.125rem'
          }}>
            No email templates available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplates;