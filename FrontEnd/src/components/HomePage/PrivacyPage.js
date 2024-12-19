// import React from "react";

// const PrivacyPage = () => {
//   const currentDomain = window.location.origin;
//   return (
//     <>
//       <div
//         className="breadcrumb-area shadow dark bg-cover text-center text-light p-4"
//         style={{ backgroundImage: "url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg)" }}
//       >
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 col-md-12">
//               <h1>Privacy Policy</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="services-details-area default-padding">
//         <div className="container">
//           <div className="services-details-items">
//             <div className="row">
//               <div className="col-lg-12 services-single-content">
//                 <div className="thumb">
//                   <img src="https://img.freepik.com/free-vector/security-analysts-protect-internet-connected-systems-with-shield-cyber-security-data-protection-cyberattacks-concept_335657-1827.jpg" alt="Thumb" />
//                 </div>
//                 <h2> This Privacy Policy Of {currentDomain}</h2>
//                 <p>
//                   This Privacy Policy ("Policy") governs the relationship between you and Snovio Inc. ("Snovio," "Company," "we," "us," "our"), the proprietor and provider of the website {currentDomain} ("Site"), the web application, and API methods accessible via the {currentDomain} hostname (collectively referred to as the "Platform").
//                   <br></br>
//                   <br></br>
//                   It is applicable to the processing of any personal data by us in connection with the provision of our services and products, as well as your utilization of the Platform.
//                   <br></br>
//                   <br></br>

//                   In the context of processing your personal data, Snovio may assume different roles under the GDPR and other relevant laws and regulations. Depending on the specific circumstances of the processing, our roles may include acting as a data controller, joint controller, or data processor under the GDPR, and as a business and service provider under the CCPA.</p>
//                 <br></br>
//                 <br></br>

//                 <div className="features">
//                   <div className="row">
//                     <div className="col-lg-6 col-md-6">
//                       <div className="content">
//                         <h4>INTERPRETATION AND DEFINITIONS
//                         </h4>
//                         <p>We use the following definitions in this Policy:</p>
//                         <ul>
//                           <li>The term "data controller" refers to the individual or legal entity, whether independently or in collaboration with others, that establishes the purposes and methods for processing any personal data.</li>
//                           <li>The designation "data processor" pertains to the natural or legal entity responsible for handling personal data on behalf of the data controller.</li>
//                           <li>"Processing" refers to any operation or series of operations conducted on personal data or sets of personal data, irrespective of whether it is done by automated means. These operations include activities like collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment or combination, restriction, erasure, or destruction.</li>
//                           <li>"Services" denote the sourcing, lead generation, and sales automation services offered by the Company through its online platform and web application.</li>
//                         </ul>
//                       </div>
//                     </div>
//                     <div className="col-lg-6 col-md-6">
//                       <div className="content">
//                         <h4>TYPES OF PERSONAL DATA WE COLLECT</h4>
//                         <p>
//                           We gather information about you in connection with our services, categorizing it into three fundamental types: client and website visitor data, prospect data, and business data related to clients, website visitors, prospects, and related persons, respectively. Specifically, we collect:</p>
//                         <ul>
//                           <li> Automatically Collected Information:
//                             Upon the creation of an account, we automatically gather specific information about you and your device. This includes, but is not limited to, your IP address, referral link, registration date, account balance details, language preference, and browser type. Additionally, we may capture information related to your activities on the Platform, such as the timing of subscription purchases or plan renewals, progress in completing gamification tasks, and any other actions performed during the utilization of our services.</li>
//                           <li> Cookies Information. On our Site, we use cookies and other tracking technologies for a variety of purposes: for analytics, marketing activities, remembering your preferences, and other purposes. Such use may involve the transmission of information from us to you and from you to a third party website or us. To learn more regarding our use of cookies please see our Cookie Policy.</li>
                        

//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>


//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PrivacyPage;

import React from "react";

const PrivacyPage = () => {
  const currentDomain = window.location.origin;
  return (
    <div className="privacy-page bg-light">
      <div
        className="breadcrumb-area position-relative text-center text-white py-6 shadow-sm"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 
                className="display-4 fw-bold text-uppercase" 
                style={{ 
                  letterSpacing: '1px', 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
                }}
              >
                Privacy Policy
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="services-details-area py-5">
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-lg-12 services-single-content">
                <div className="text-center mb-5">
                  <img 
                    src="https://img.freepik.com/free-vector/security-analysts-protect-internet-connected-systems-with-shield-cyber-security-data-protection-cyberattacks-concept_335657-1827.jpg" 
                    alt="Thumb" 
                    className="img-fluid rounded-4 shadow-lg mb-4"
                    style={{ 
                      maxHeight: '350px', 
                      width: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.9)'
                    }}
                  />
                </div>

                <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                  <div 
                    className="card-body p-4" 
                    style={{ 
                      borderLeft: '4px solid #007bff',
                      borderRadius: '12px'
                    }}
                  >
                    <h2 
                      className="card-title text-primary mb-3 fw-bold" 
                      style={{ 
                        fontSize: '1.5rem',
                        borderBottom: '1px solid rgba(0,123,255,0.2)',
                        paddingBottom: '10px'
                      }}
                    >
                      This Privacy Policy Of {currentDomain}
                    </h2>
                    <p 
                      className="card-text text-muted" 
                      style={{ 
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                      }}
                    >
                      This Privacy Policy ("Policy") governs the relationship between you and Snovio Inc. ("Snovio," "Company," "we," "us," "our"), the proprietor and provider of the website {currentDomain} ("Site"), the web application, and API methods accessible via the {currentDomain} hostname (collectively referred to as the "Platform").
                      <br></br>
                      <br></br>
                      It is applicable to the processing of any personal data by us in connection with the provision of our services and products, as well as your utilization of the Platform.
                      <br></br>
                      <br></br>
                      In the context of processing your personal data, Snovio may assume different roles under the GDPR and other relevant laws and regulations. Depending on the specific circumstances of the processing, our roles may include acting as a data controller, joint controller, or data processor under the GDPR, and as a business and service provider under the CCPA.
                    </p>
                  </div>
                </div>

                <div className="features">
                  <div className="row g-4">
                    <div className="col-lg-6 col-md-6">
                      <div 
                        className="card h-100 border-0 shadow-sm" 
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          transform: 'translateY(0)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <div 
                          className="card-body p-4" 
                          style={{ 
                            borderLeft: '4px solid #28a745',
                            borderRadius: '12px'
                          }}
                        >
                          <h4 
                            className="card-title text-success mb-3 fw-bold" 
                            style={{ 
                              fontSize: '1.25rem',
                              borderBottom: '1px solid rgba(40,167,69,0.2)',
                              paddingBottom: '10px'
                            }}
                          >
                            INTERPRETATION AND DEFINITIONS
                          </h4>
                          <p className="card-text text-muted mb-3">We use the following definitions in this Policy:</p>
                          <ul 
                            className="list-unstyled" 
                            style={{ 
                              backgroundColor: 'rgba(40,167,69,0.05)', 
                              padding: '15px',
                              borderRadius: '8px'
                            }}
                          >
                            <li className="mb-2">
                              <span className="text-success me-2">•</span>
                              The term "data controller" refers to the individual or legal entity, whether independently or in collaboration with others, that establishes the purposes and methods for processing any personal data.
                            </li>
                            <li className="mb-2">
                              <span className="text-success me-2">•</span>
                              The designation "data processor" pertains to the natural or legal entity responsible for handling personal data on behalf of the data controller.
                            </li>
                            <li className="mb-2">
                              <span className="text-success me-2">•</span>
                              "Processing" refers to any operation or series of operations conducted on personal data or sets of personal data, irrespective of whether it is done by automated means. These operations include activities like collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment or combination, restriction, erasure, or destruction.
                            </li>
                            <li>
                              <span className="text-success me-2">•</span>
                              "Services" denote the sourcing, lead generation, and sales automation services offered by the Company through its online platform and web application.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div 
                        className="card h-100 border-0 shadow-sm" 
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          transform: 'translateY(0)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <div 
                          className="card-body p-4" 
                          style={{ 
                            borderLeft: '4px solid #17a2b8',
                            borderRadius: '12px'
                          }}
                        >
                          <h4 
                            className="card-title text-info mb-3 fw-bold" 
                            style={{ 
                              fontSize: '1.25rem',
                              borderBottom: '1px solid rgba(23,162,184,0.2)',
                              paddingBottom: '10px'
                            }}
                          >
                            TYPES OF PERSONAL DATA WE COLLECT
                          </h4>
                          <p className="card-text text-muted mb-3">
                            We gather information about you in connection with our services, categorizing it into three fundamental types: client and website visitor data, prospect data, and business data related to clients, website visitors, prospects, and related persons, respectively. Specifically, we collect:
                          </p>
                          <ul 
                            className="list-unstyled" 
                            style={{ 
                              backgroundColor: 'rgba(23,162,184,0.05)', 
                              padding: '15px',
                              borderRadius: '8px'
                            }}
                          >
                            <li className="mb-2">
                              <span className="text-info me-2">•</span>
                              Automatically Collected Information:
                              Upon the creation of an account, we automatically gather specific information about you and your device. This includes, but is not limited to, your IP address, referral link, registration date, account balance details, language preference, and browser type. Additionally, we may capture information related to your activities on the Platform, such as the timing of subscription purchases or plan renewals, progress in completing gamification tasks, and any other actions performed during the utilization of our services.
                            </li>
                            <li>
                              <span className="text-info me-2">•</span>
                              Cookies Information. On our Site, we use cookies and other tracking technologies for a variety of purposes: for analytics, marketing activities, remembering your preferences, and other purposes. Such use may involve the transmission of information from us to you and from you to a third party website or us. To learn more regarding our use of cookies please see our Cookie Policy.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;