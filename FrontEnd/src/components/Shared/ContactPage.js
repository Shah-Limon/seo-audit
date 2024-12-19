// import React, { useState } from 'react';
// import { MapPin, Phone, Mail, Send, User, MessageSquare } from 'lucide-react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//     date: new Date().toISOString().split('T')[0],
//     messageStatus: 'pending'
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="position-relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="position-absolute" style={{
//         top: '10%',
//         left: '5%',
//         width: '200px',
//         height: '200px',
//         background: 'radial-gradient(circle, rgba(66,138,255,0.1) 0%, rgba(66,138,255,0) 70%)',
//         borderRadius: '50%',
//         zIndex: 0
//       }} />
//       <div className="position-absolute" style={{
//         bottom: '10%',
//         right: '5%',
//         width: '300px',
//         height: '300px',
//         background: 'radial-gradient(circle, rgba(66,138,255,0.1) 0%, rgba(66,138,255,0) 70%)',
//         borderRadius: '50%',
//         zIndex: 0
//       }} />

//       <div className="container mt-5 pt-5 position-relative" style={{ zIndex: 1 }}>
//         {/* Header Section */}
//         <div className="row justify-content-center mb-5">
//           <div className="col-md-10 text-center">
//             <h1 className="display-4 fw-bold mb-4" style={{ 
//               background: 'linear-gradient(45deg, #2b2b2b, #428aff)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               marginBottom: '1.5rem'
//             }}>
//               Let's Start a Conversation
//             </h1>
//             <p className="lead text-muted" style={{ 
//               fontSize: '1.2rem', 
//               maxWidth: '700px', 
//               margin: '0 auto',
//               lineHeight: '1.8'
//             }}>
//               Have questions about our SEO services? We're here to help you optimize 
//               your digital presence and achieve better search rankings.
//             </p>
//           </div>
//         </div>

//         {/* Contact Cards */}
//         <div className="row g-4 mb-5">
//           <div className="col-md-4">
//             <div className="card h-100 border-0 rounded-4 shadow-sm" style={{
//               background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
//               transition: 'all 0.3s ease'
//             }}>
//               <div className="card-body text-center p-5" style={{
//                 '&:hover': {
//                   transform: 'translateY(-10px)',
//                   boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
//                 }
//               }}>
//                 <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
//                   width: '80px',
//                   height: '80px',
//                   background: 'linear-gradient(135deg, #428aff, #3b7de5)'
//                 }}>
//                   <MapPin className="text-white" size={32} />
//                 </div>
//                 <h3 className="h4 mb-3">Visit Our Office</h3>
//                 <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
//                   123 Business Avenue, Suite 100
//                   <br/>New York, NY 10001
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card h-100 border-0 rounded-4 shadow-sm" style={{
//               background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
//               transition: 'all 0.3s ease'
//             }}>
//               <div className="card-body text-center p-5">
//                 <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
//                   width: '80px',
//                   height: '80px',
//                   background: 'linear-gradient(135deg, #428aff, #3b7de5)'
//                 }}>
//                   <Phone className="text-white" size={32} />
//                 </div>
//                 <h3 className="h4 mb-3">Call Us Anytime</h3>
//                 <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
//                   +1 (933) 938-843
//                   <br/>Mon-Fri: 9:00 AM - 6:00 PM
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card h-100 border-0 rounded-4 shadow-sm" style={{
//               background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
//               transition: 'all 0.3s ease'
//             }}>
//               <div className="card-body text-center p-5">
//                 <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
//                   width: '80px',
//                   height: '80px',
//                   background: 'linear-gradient(135deg, #428aff, #3b7de5)'
//                 }}>
//                   <Mail className="text-white" size={32} />
//                 </div>
//                 <h3 className="h4 mb-3">Email Us</h3>
//                 <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
//                   info@1seoaudit.com
//                   <br/>support@1seoaudit.com
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form Section */}
//         <div className="row justify-content-center mb-5">
//           <div className="col-md-10">
//             <div className="card border-0 shadow-lg rounded-4" style={{
//               background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
//             }}>
//               <div className="card-body p-5">
//                 <h2 className="text-center mb-4" style={{
//                   fontSize: '2.5rem',
//                   fontWeight: 'bold',
//                   background: 'linear-gradient(45deg, #2b2b2b, #428aff)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent'
//                 }}>Send Us a Message</h2>

//                 <form onSubmit={handleSubmit}>
//                   <div className="row g-4">
//                     <div className="col-md-6">
//                       <div className="form-group position-relative">
//                         <User className="position-absolute text-muted" size={20} style={{ top: '20px', left: '15px' }} />
//                         <input
//                           type="text"
//                           className="form-control form-control-lg ps-5"
//                           placeholder="Your Name"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleChange}
//                           required
//                           style={{
//                             padding: '1rem 1rem 1rem 3rem',
//                             fontSize: '1rem',
//                             borderRadius: '12px',
//                             border: '2px solid #e9ecef',
//                             transition: 'all 0.3s ease',
//                             backgroundColor: '#ffffff',
//                             '&:focus': {
//                               borderColor: '#428aff',
//                               boxShadow: '0 0 0 0.2rem rgba(66,138,255,0.25)'
//                             }
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="form-group position-relative">
//                         <Mail className="position-absolute text-muted" size={20} style={{ top: '20px', left: '15px' }} />
//                         <input
//                           type="email"
//                           className="form-control form-control-lg ps-5"
//                           placeholder="Your Email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                           style={{
//                             padding: '1rem 1rem 1rem 3rem',
//                             fontSize: '1rem',
//                             borderRadius: '12px',
//                             border: '2px solid #e9ecef',
//                             transition: 'all 0.3s ease',
//                             backgroundColor: '#ffffff',
//                             '&:focus': {
//                               borderColor: '#428aff',
//                               boxShadow: '0 0 0 0.2rem rgba(66,138,255,0.25)'
//                             }
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-12">
//                       <div className="form-group position-relative">
//                         <MessageSquare className="position-absolute text-muted" size={20} style={{ top: '20px', left: '15px' }} />
//                         <input
//                           type="text"
//                           className="form-control form-control-lg ps-5"
//                           placeholder="Subject"
//                           name="subject"
//                           value={formData.subject}
//                           onChange={handleChange}
//                           required
//                           style={{
//                             padding: '1rem 1rem 1rem 3rem',
//                             fontSize: '1rem',
//                             borderRadius: '12px',
//                             border: '2px solid #e9ecef',
//                             transition: 'all 0.3s ease',
//                             backgroundColor: '#ffffff',
//                             '&:focus': {
//                               borderColor: '#428aff',
//                               boxShadow: '0 0 0 0.2rem rgba(66,138,255,0.25)'
//                             }
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-12">
//                       <div className="form-group">
//                         <textarea
//                           className="form-control form-control-lg"
//                           rows="6"
//                           placeholder="Your Message"
//                           name="message"
//                           value={formData.message}
//                           onChange={handleChange}
//                           required
//                           style={{
//                             padding: '1rem',
//                             fontSize: '1rem',
//                             borderRadius: '12px',
//                             border: '2px solid #e9ecef',
//                             transition: 'all 0.3s ease',
//                             backgroundColor: '#ffffff',
//                             resize: 'vertical',
//                             '&:focus': {
//                               borderColor: '#428aff',
//                               boxShadow: '0 0 0 0.2rem rgba(66,138,255,0.25)'
//                             }
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-12 text-center">
//                       <button 
//                         type="submit" 
//                         className="btn btn-primary btn-lg"
//                         style={{
//                           background: 'linear-gradient(135deg, #428aff, #3b7de5)',
//                           border: 'none',
//                           padding: '1rem 3rem',
//                           fontSize: '1.1rem',
//                           borderRadius: '12px',
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             transform: 'translateY(-2px)',
//                             boxShadow: '0 5px 15px rgba(66,138,255,0.4)'
//                           }
//                         }}
//                       >
//                         <Send className="me-2" size={20} />
//                         Send Message
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    date: new Date().toISOString().split('T')[0],
    messageStatus: 'pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/add-contact-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          date: new Date().toISOString().split('T')[0],
          messageStatus: 'pending'
        });
        toast('Message sent successfully!');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="position-relative overflow-hidden">
      {/* Background Elements */}
      <div className="position-absolute" style={{
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(66,138,255,0.1) 0%, rgba(66,138,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      <div className="position-absolute" style={{
        bottom: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(66,138,255,0.1) 0%, rgba(66,138,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      <div className="container mt-5 pt-5 position-relative" style={{ zIndex: 1 }}>
        {/* Header Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-10 text-center">
            <h1 className="display-4 fw-bold mb-4" style={{
              background: 'linear-gradient(45deg, #2b2b2b, #428aff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              Let's Start a Conversation
            </h1>
            <p className="lead text-muted" style={{
              fontSize: '1.2rem',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              Have questions about our SEO services? We're here to help you optimize
              your digital presence and achieve better search rankings.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 rounded-4 shadow-sm" style={{
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-body text-center p-5">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #428aff, #3b7de5)'
                }}>
                  <MapPin className="text-white" size={32} />
                </div>
                <h3 className="h4 mb-3">Visit Our Office</h3>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                  123 Business Avenue, Suite 100
                  <br />New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 rounded-4 shadow-sm" style={{
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-body text-center p-5">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #428aff, #3b7de5)'
                }}>
                  <Phone className="text-white" size={32} />
                </div>
                <h3 className="h4 mb-3">Call Us Anytime</h3>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                  +1 (933) 938-843
                  <br />Mon-Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 rounded-4 shadow-sm" style={{
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-body text-center p-5">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #428aff, #3b7de5)'
                }}>
                  <Mail className="text-white" size={32} />
                </div>
                <h3 className="h4 mb-3">Email Us</h3>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                  info@1seoaudit.com
                  <br />support@1seoaudit.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <div className="card border-0 shadow-lg rounded-4" style={{
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
            }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-4" style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2b2b2b, #428aff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Send Us a Message</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <User className="position-absolute text-muted" size={20} style={{ top: '20px', left: '15px' }} />
                        <input
                          type="text"
                          className="form-control form-control-lg ps-5"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          style={{
                            padding: '1rem 1rem 1rem 3rem',
                            fontSize: '1rem',
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#ffffff'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <Mail className="position-absolute text-muted" size={20} style={{ top: '20px', left: '15px' }} />
                        <input
                          type="email"
                          className="form-control form-control-lg ps-5"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            padding: '1rem 1rem 1rem 3rem',
                            fontSize: '1rem',
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#ffffff'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group position-relative">
                        <MessageSquare className="position-absolute text-muted" size={20} style={{ top: '20px', left: '15px' }} />
                        <input
                          type="text"
                          className="form-control form-control-lg ps-5"
                          placeholder="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          style={{
                            padding: '1rem 1rem 1rem 3rem',
                            fontSize: '1rem',
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#ffffff'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group position-relative">

                        <input
                          hidden
                          type="date"
                          className="form-control form-control-lg ps-5"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          style={{
                            padding: '1rem 1rem 1rem 3rem',
                            fontSize: '1rem',
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#ffffff'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control form-control-lg"
                          rows="6"
                          placeholder="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          style={{
                            padding: '1rem',
                            fontSize: '1rem',
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#ffffff',
                            resize: 'vertical'
                          }}
                        />
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="messageStatus"
                      value={formData.messageStatus}
                    />
                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{
                          background: 'linear-gradient(135deg, #428aff, #3b7de5)',
                          border: 'none',
                          padding: '1rem 3rem',
                          fontSize: '1.1rem',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 5px 15px rgba(66,138,255,0.4)'
                          }
                        }}
                      >
                        <Send className="me-2" size={20} />
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;