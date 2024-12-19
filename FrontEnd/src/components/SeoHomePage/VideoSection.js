import React from 'react';

const VideoSection = () => {
    return (
        <>
            <section className="starta-about pb-5 my-5">
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="about-inner pt-4 position-relative">
                        {/* video Block */}
                        <div className="video-block animate-block">
                            <img
                                className="starta-block-img"
                                src="https://templates.seekviral.com/starta/pages/landing2/assets/images/main/about/videoBG2.jpg"
                                alt="BG"
                            />
                            {/* play button */}
                            <div className="play-btn">
                                <i className="startplay fa-solid fa-circle-play">
                                    <span className="glow" />
                                </i>
                            </div>
                            <h1 className="starta-h1 starta-h1-2 text-center mx-auto">
                                Expect Great things From your SEO Agency
                            </h1>
                            <ul className="d-flex flex-wrap starta-list list-unstyled position-relative">
                                <li className="me-3">
                                    <i className="fa-solid fa-circle-check" />
                                    Data Storage and Analysis
                                </li>
                                <li>
                                    <i className="fa-solid fa-circle-check" />
                                    International Online Support
                                </li>
                            </ul>
                            <button className="starta-button starta-button-2">
                                <span className="position-relative">Learn More</span>
                            </button>
                            {/* iframe */}
                            <iframe
                                src="https://www.youtube-nocookie.com/embed/O5O3yK8DJCc?si=JgM3-6Rmon62WHzq&controls=0"
                                title="Sample Video"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen=""
                            />
                            <i className="close fa-solid fa-circle-xmark" />
                        </div>
                        <div className="row align-items-center pt-5">
                            <div className="col-md-7 pt-3">
                                <h5 className="starta-semi">Connect our Software</h5>
                                <h1 className="starta-h1">Seamless integration With your Favorite</h1>
                                {/* clients  */}
                                <div className="clients">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c1.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c2.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c3.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c4.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c5.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c6.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c7.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-3">
                                            <div className="client">
                                                <img
                                                    src="assets/images/main/about/clients/c1.png"
                                                    alt="Client"
                                                />
                                            </div>
                                        </div>
                                        <button className="starta-button w-auto mx-auto starta-button-2">
                                            <span className="position-relative">Get Quote Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <p className="starta-desc mt-sm-4">
                                    A custom logo design is a crucial part of your overall branding
                                    Process. Your logo design is a sitgnificant. is a crucial part of
                                    your Overall branding part of your overall branding
                                </p>
                                <div className="row align-items-center">
                                    <div className="col-md-3 col-sm-2 col-3">
                                        <img
                                            className="check"
                                            src="assets/images/main/about/check.png"
                                            alt="Check"
                                        />
                                    </div>
                                    <div className="col-md-9 my-5 col-sm-10 col-9">
                                        <h5 className="starta-h3">Seamless integration</h5>
                                        <p className="starta-semi">$29 / Package</p>
                                    </div>
                                    <ul className="starta-list list-unstyled">
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Data Storage and Analysis
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            International Online Support
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Branding Project Development
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Data Storage and Analysis
                                        </li>
                                    </ul>
                                </div>
                                {/* Contact Box */}
                                <div className="contact-box mt-5">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 col-sm-2 col-2">
                                            <i className="fa-solid fa-envelope-open" />
                                        </div>
                                        <div className="col-md-10 col-sm-10 col-10">
                                            <article>
                                                Got questions? We've got answers
                                                <a href="#">Userthemes@gmail.com</a>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* starta about bg */}
                <div className="starta-about-bg">
                    <img src="assets/images/main/about/aboutBG.png" alt="" />
                </div>
            </section>


        </>
    );
};

export default VideoSection;