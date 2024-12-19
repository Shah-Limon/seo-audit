// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import auth from "../../firebase.init";
// import { useAuthState } from "react-firebase-hooks/auth";

// const NavBar = () => {
//   const [user] = useAuthState(auth);
//   const [admin, setAdmin] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     fetch(`http://localhost:5000/users`)
//       .then((res) => res.json())
//       .then((info) => setAdmin(info));
//   }, []);

//   const isAdmin = user && admin.some((adm) => adm.userEmail === user.email);
//   const isHomePage = location.pathname === "/";
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleSmoothScroll = (targetId) => {
//     const targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       targetElement.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//       // Close mobile menu after scrolling
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     website: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Create request data with pending status
//       const requestData = {
//         ...formData,
//         status: 'Pending', // Add pending status
//         date: new Date().toISOString(), // Add submission date
//       };

//       const response = await fetch('http://localhost:5000/add-audit-request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData)
//       });

//       if (response.ok) {
//         // Clear form
//         setFormData({
//           name: '',
//           email: '',
//           website: ''
//         });
//         // Redirect to thank you page
//         window.location.href = '/thank-you';
//       } else {
//         console.error('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <>
//       <header id="top" className="d-flex flex-column">
//         {/* Desktop Menu */}
//         <nav className="starta-nav">
//           <div className="container d-flex justify-content-between align-items-center">
//             <Link to="/">
//               <div className="logo">
//                 <img src="/assets/images/hero/icon.png" alt="Icon" />
//                 1SeoAudit<span>.</span>
//               </div>
//             </Link>
//             <ul className="list-unstyled-menu starta-menu">
//               <li>
//                 <a className="menu-animation active" href="/">Home</a>
//               </li>
//               <li>
//                 <a className="menu-animation"
//                   href="#about" onClick={(e) => {
//                     e.preventDefault();
//                     handleSmoothScroll('about');
//                   }}
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a className="menu-animation" href="/premium-plan" >Premium Plan</a>
//               </li>
//               <li>
//                 <Link
//                   className="starta-button starta-button-2" style={{ padding: '10px 40px' }}
//                   href="submit" onClick={(e) => { e.preventDefault(); handleSmoothScroll('submit'); }}>
//                   Submit
//                 </Link>
//               </li>
//               {isAdmin && (
//                 <li><a href="/admin/dashboard" className="menu-animation">Dashboard</a></li>
//               )}
//             </ul>
//             <a href="#" className="starta-helpline">
//               <i className="fa-solid fa-phone-volume" />
//               <article>
//                 <h4>Help Line</h4>
//                 <p>+21 ( 933-938-843 )</p>
//               </article>
//             </a>
//           </div>
//         </nav>
//         {/* Mobile Menu Icon */}
//         <button
//           className={`menuIcon ${isMobileMenuOpen ? 'active' : ''}`}
//           onClick={toggleMobileMenu}
//           aria-label="Toggle mobile menu">
//           <span />
//           <span />
//           <span />
//         </button>
//         {/* Mobile Menu */}
//         <nav className={`starta-mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
//           <ul className="list-unstyled starta-menu">
//             <li>
//               <a
//                 className="menu-animation active"
//                 href="#top"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleSmoothScroll('top');
//                 }}
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 className="menu-animation"
//                 href="#about"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleSmoothScroll('about');
//                 }}
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <Link
//                 className="starta-button starta-button-2"
//                 style={{ padding: '10px 40px' }}
//                 href="submit"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleSmoothScroll('submit');
//                 }}
//               >
//                 Submit
//               </Link>
//             </li>
//             {isAdmin && (
//               <li><a href="/admin/dashboard" className="menu-animation">Dashboard</a></li>
//             )}
//             <li>
//               <a className="menu-animation" href="/premium-plan" >Premium Plan</a>
//             </li>
//           </ul>
//         </nav>
//         {isHomePage &&
//           <div className="container d-flex flex-column flex-grow-1 position-relative z-index-3">
//             <section className="starta-hero my-5 d-flex flex-column justify-content-center flex-grow-1">
//               <div className="row mt-5 pt-4">
//                 <div className="col-md-7 order_c_2">
//                   <h1 className="heroHeading">
//                     Awesome Template To Promote Your Services
//                   </h1>
//                   <p className="heroDesc">
//                     Every pleasure is to be welcomed and every pain atvoided. But in
//                     certain circumstances and owing to the claims of duty obligations of
//                     business it will frequently occur that.
//                   </p>
//                   <div className="col-md-8 mt-5">
//                     <div className="row">
//                       <div className="col-md-3 col-sm-3 col-3">
//                         <img
//                           src="/assets/images/hero/services/1.png"
//                           alt="Services"
//                           className="hero-service"
//                         />
//                       </div>
//                       <div className="col-md-3 col-sm-3 col-3">
//                         <img
//                           src="/assets/images/hero/services/2.png"
//                           alt="Services"
//                           className="hero-service"
//                         />
//                       </div>
//                       <div className="col-md-3 col-sm-3 col-3">
//                         <img
//                           src="/assets/images/hero/services/3.png"
//                           alt="Services"
//                           className="hero-service"
//                         />
//                       </div>
//                       <div className="col-md-3 col-sm-3 col-3">
//                         <img
//                           src="/assets/images/hero/services/4.png"
//                           alt="Services"
//                           className="hero-service"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <button className="starta-button">
//                     <span className="position-relative">Get Quote Now</span>
//                     <span className="starta-button-hover" />
//                   </button>
//                 </div>
//                 <div className="col-md-5 position-relative">
//                   <form className="heroForm" onSubmit={handleFormSubmit}>
//                     <article className="formContent">
//                       <h2 className="starta-h2">Request Seo Audit</h2>
//                       <p className="starta-desc">Comprehensive SEO Audit</p>
//                     </article>
//                     <div className="inputField">
//                       <input
//                         className="starta-desc"
//                         type="text"
//                         name="name"
//                         id="name"
//                         placeholder="Full Name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       <i className="fa-solid fa-user" />
//                     </div>
//                     <div className="inputField">
//                       <input
//                         className="starta-desc"
//                         type="email"
//                         name="email"
//                         id="email"
//                         placeholder="Email Address"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       <i className="fa-solid fa-envelope" />
//                     </div>
//                     <div className="inputField">
//                       <input
//                         className="starta-desc"
//                         type="text"
//                         name="website"
//                         id="website"
//                         placeholder="Enter Website"
//                         value={formData.website}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       <i className="fa-solid fa-globe"></i>
//                     </div>
//                     <button type="submit" className="starta-button">
//                       <span className="position-relative">Submit Request</span>
//                       <span className="starta-button-hover" />
//                     </button>
//                   </form>
//                   <div className="shapes">
//                     <img src="/assets/images/hero/shape1.svg" alt="shape" />
//                     <img src="/assets/images/hero/shape2.svg" alt="shape" />
//                     <img src="/assets/images/hero/shape3.svg" alt="shape" />
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>}
//         {/* Hero Background */}
//         <div className="heroBG">
//           <img src="/assets/images/hero/bg.jpg" alt="Background" />
//         </div>
//       </header>
//     </>
//   );
// };

// export default NavBar;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState([]);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setAdmin(info));
  }, []);

  const isAdmin = user && admin.some((adm) => adm.userEmail === user.email);
  const isHomePage = location.pathname === "/";

  const toggleMobileMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (e.currentTarget.classList.contains('close')) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileNav = document.querySelector('.starta-mobile-nav');
      const menuIcon = document.querySelector('.menuIcon');
      
      if (isMobileMenuOpen && mobileNav && !mobileNav.contains(event.target) && !menuIcon.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleSmoothScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

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
        setFormData({
          name: '',
          email: '',
          website: ''
        });
        window.location.href = '/thank-you';
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header id="top" className="d-flex flex-column">
        {/* Desktop Menu */}
        <nav className="starta-nav">
          <div className="container d-flex justify-content-between align-items-center">
            <Link to="/">
              <div className="logo">
                <img src="/assets/images/hero/icon.png" alt="Icon" />
                1SeoAudit<span>.</span>
              </div>
            </Link>
            <ul className="list-unstyled-menu starta-menu">
              <li>
                <a className="menu-animation active" href="/">Home</a>
              </li>
              <li>
                <a 
                  className="menu-animation"
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll('about');
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a className="menu-animation" href="/premium-plan">Premium Plan</a>
              </li>
              <li>
                <Link
                  className="starta-button starta-button-2" 
                  style={{ padding: '10px 40px' }}
                  to="#submit" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll('submit');
                  }}
                >
                  Submit
                </Link>
              </li>
              {isAdmin && (
                <li><a href="/admin/dashboard" className="menu-animation">Dashboard</a></li>
              )}
            </ul>
            <a href="#" className="starta-helpline">
              <i className="fa-solid fa-phone-volume" />
              <article>
                <h4>Help Line</h4>
                <p>+21 ( 933-938-843 )</p>
              </article>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className={`menuIcon ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile Menu */}
        <nav className={`starta-mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="list-unstyled starta-menu">
            <li>
              <a
                className="menu-animation active"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="menu-animation"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll('about');
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                className="menu-animation"
                href="#submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll('submit');
                }}
              >
                Submit
              </a>
            </li>
            {isAdmin && (
              <li><a href="/admin/dashboard" className="menu-animation">Dashboard</a></li>
            )}
            <li>
              <a className="menu-animation" href="/premium-plan">Premium Plan</a>
            </li>
          </ul>
        </nav>

        {isHomePage && (
          <div className="container d-flex flex-column flex-grow-1 position-relative z-index-3">
            <section className="starta-hero my-5 d-flex flex-column justify-content-center flex-grow-1">
              <div className="row mt-5 pt-4">
                <div className="col-md-7 order_c_2">
                  <h1 className="heroHeading">
                    Awesome Template To Promote Your Services
                  </h1>
                  <p className="heroDesc">
                    Every pleasure is to be welcomed and every pain atvoided. But in
                    certain circumstances and owing to the claims of duty obligations of
                    business it will frequently occur that.
                  </p>
                  <div className="col-md-8 mt-5">
                    <div className="row">
                      <div className="col-md-3 col-sm-3 col-3">
                        <img
                          src="/assets/images/hero/services/1.png"
                          alt="Services"
                          className="hero-service"
                        />
                      </div>
                      <div className="col-md-3 col-sm-3 col-3">
                        <img
                          src="/assets/images/hero/services/2.png"
                          alt="Services"
                          className="hero-service"
                        />
                      </div>
                      <div className="col-md-3 col-sm-3 col-3">
                        <img
                          src="/assets/images/hero/services/3.png"
                          alt="Services"
                          className="hero-service"
                        />
                      </div>
                      <div className="col-md-3 col-sm-3 col-3">
                        <img
                          src="/assets/images/hero/services/4.png"
                          alt="Services"
                          className="hero-service"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="starta-button">
                    <span className="position-relative">Get Quote Now</span>
                    <span className="starta-button-hover" />
                  </button>
                </div>
                <div className="col-md-5 position-relative">
                  <form className="heroForm" onSubmit={handleFormSubmit}>
                    <article className="formContent">
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
        )}
        
        {/* Hero Background */}
        <div className="heroBG">
          <img src="/assets/images/hero/bg.jpg" alt="Background" />
        </div>
      </header>
    </>
  );
};

export default NavBar;