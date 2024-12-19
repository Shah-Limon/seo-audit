import React from "react";

const TermsPage = () => {
  const currentDomain = window.location.origin;
  return (
    <div className="terms-page">
      {/* Hero Section */}
      <div 
        className="bg-dark text-white py-5 mb-4 position-relative" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">Terms & Conditions</h1>
          <p className="lead text-white-50">Last Updated: December 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {/* Terms Image */}
            <div className="text-center mb-4">
              <img 
                src="https://img.freepik.com/free-vector/terms-conditions-abstract-concept-illustration_335657-4920.jpg" 
                alt="Terms Illustration" 
                className="img-fluid rounded shadow-lg mb-4"
                style={{ 
                  maxHeight: '300px', 
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
              
              <h2 className="mb-4 fw-semibold">Terms of Service for {currentDomain}</h2>
            </div>

            {/* Terms Content */}
            <div className="terms-content">
              {[
                {
                  title: "1. Acceptance of Terms",
                  content: "\"Account Information\" refers to the details you furnish for the purpose of establishing, facilitating, and managing an account that grants access to the Service."
                },
                {
                  title: "2. Output Data",
                  content: "\"Output Data\" means the information and other content or materials that are included in the Contributor Database or otherwise made available to you through the our Platform. Output Data is exclusive of the Submitted Data."
                },
                {
                  title: "3. Order Form",
                  content: "\"Order Form\" refers to an ordering document, which may include an order receipt, associated with your procurement of the Service. It outlines the specifics of your subscription and any corresponding fees to be remitted by you."
                },
                {
                  title: "4. Personal Information",
                  content: "\"Personal Information\" encompasses terms substantially similar to \"personal information,\" including phrases like \"personal data\" or \"personally identifiable information.\" In each case, the meaning of these terms corresponds to the definition provided under applicable law."
                },
                {
                  title: "5. Service Metadata",
                  content: "\"Service Metadata\" pertains to information gathered or deduced by us during the delivery of emails, including details about deliverability and system operations, or in the broader context of providing the Service."
                },
                {
                  title: "6. Submitted Data",
                  content: "\"Submitted Data\" encompasses all data, information, text, recordings, and other content and materials collected, submitted, provided, or transmitted by you in relation to your use of the Service. The nature of Submitted Data may differ based on the products or features utilized and your specific usage thereof."
                },
                {
                  title: "7. Account Security",
                  content: "While we make no assurances about the security of the Service, you acknowledge the possibility of unauthorized access to your information. You accept liability for any activities conducted through your account and agree to maintain account security, including:"
                }
              ].map((section, index) => (
                <div 
                  key={index} 
                  className="card mb-3 border-0 shadow-sm"
                  style={{ 
                    backgroundColor: 'rgba(248, 249, 250, 0.5)',
                    borderRadius: '10px'
                  }}
                >
                  <div className="card-body p-4">
                    <h4 className="card-title text-primary mb-3">{section.title}</h4>
                    <p className="card-text text-muted">{section.content}</p>
                    {section.title === "7. Account Security" && (
                      <ul className="list-unstyled ps-3">
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Maintain confidentiality of account credentials
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Use encrypted connections
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Keep devices updated and secure
                        </li>
                        <li>
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Promptly notify of any security incidents
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="alert alert-secondary mt-4" role="alert">
              <p className="mb-0 text-center">
                <small>
                  By using our service, you agree to these terms. 
                  We reserve the right to modify these terms at any time.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;