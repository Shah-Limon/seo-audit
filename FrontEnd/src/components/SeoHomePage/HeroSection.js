import React from 'react';

const HeroSection = () => {
    return (
        <>
            <div className="container d-flex flex-column flex-grow-1 position-relative z-index-3">
                {/* hero section */}
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
                        {/* Hero Side Image */}
                        <div className="col-md-5 position-relative">
                            <form className="heroForm">
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
                                    />
                                    <i className="fa-solid fa-envelope" />
                                </div>
                                <div className="inputField">
                                    <input
                                        className="starta-desc"
                                        type="tel"
                                        name="website"
                                        id="website"
                                        placeholder="Enter Website"
                                    />
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <button className="starta-button">
                                    <span className="position-relative">Submit Request</span>
                                    <span className="starta-button-hover" />
                                </button>
                            </form>
                            {/* Shapes */}
                            <div className="shapes">
                                <img src="/assets/images/hero/shape1.svg" alt="shape" />
                                <img src="/assets/images/hero/shape2.svg" alt="shape" />
                                <img src="/assets/images/hero/shape3.svg" alt="shape" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Hero Background */}
            <div className="heroBG">
                <img src="/assets/images/hero/bg.jpg" alt="Background" />
            </div>
        </>
    );
};

export default HeroSection;