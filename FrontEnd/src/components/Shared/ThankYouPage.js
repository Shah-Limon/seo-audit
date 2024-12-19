import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" 
         style={{
          
           fontFamily: "'Inter', sans-serif"
         }}
    >
      <div className="card shadow-lg border-0" 
           style={{
             maxWidth: '600px', 
             borderRadius: '20px', 
             overflow: 'hidden'
           }}
      >
        <div className="card-body p-5 text-center">
          {/* Success Illustration */}
          <div className="mb-4 d-flex justify-content-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="100" 
              height="100" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#28a745" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          {/* Thank You Message */}
          <h2 
            className="card-title mb-3" 
            style={{
              color: '#333', 
              fontWeight: '700', 
              letterSpacing: '-0.5px'
            }}
          >
            Thank You for Your SEO Audit Request!
          </h2>

          <p 
            className="card-text mb-4 text-muted" 
            style={{
              lineHeight: '1.6',
              fontSize: '1rem'
            }}
          >
            We've received your SEO audit request. Our team will review your website 
            and provide a comprehensive analysis shortly. You'll receive a detailed 
            report via email within the next 2-3 business days.
          </p>

          {/* Additional Information */}
          <div 
            className="alert alert-info mb-4" 
            role="alert" 
            style={{
              backgroundColor: 'rgba(0, 123, 255, 0.1)', 
              border: '1px solid rgba(0, 123, 255, 0.2)',
              borderRadius: '10px'
            }}
          >
            <strong>Next Steps:</strong> Keep an eye on your email inbox for our 
            comprehensive SEO audit report.
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/" 
              className="btn btn-outline-primary btn-lg"
              style={{
                borderRadius: '50px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;