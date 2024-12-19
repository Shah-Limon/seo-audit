import React from 'react';

const About = () => {
    return (
        <>
            <section className="starta-project my-5 py-md-5" id='features'>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-6 pe-md-5">
                            {/* Video BLock */}
                            <div className="video-block mb-4">
                                <img
                                    className="starta-block-img"
                                    src="https://templates.seekviral.com/starta/pages/landing2/assets/images/main/project/videoBG.jpg"
                                    alt="BG"
                                />
                               
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="starta-list list-unstyled">
                                        <li className="mb-3">
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                        <li className="mb-3">
                                            <i className="fa-solid fa-circle-check" />
                                            Virtual Private Server
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="starta-list list-unstyled">
                                        <li className="mb-3">
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                        <li className="mb-3">
                                            <i className="fa-solid fa-circle-check" />
                                            Virtual Private Server
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-space-between flex-wrap mt-5">
                                <button className="starta-button starta-button-2">
                                    <span className="position-relative">Learn More</span>
                                    <span className="starta-button-hover" />
                                </button>
                                <div className="communityNumbers">
                                    <div className="communityImgs">
                                        <img
                                            src="assets/images/communitymem.jpg"
                                            alt="Community Member"
                                        />
                                        <img
                                            src="assets/images/communitymem2.jpg"
                                            alt="Community Member"
                                        />
                                        <img
                                            src="assets/images/communitymem.jpg"
                                            alt="Community Member"
                                        />
                                    </div>
                                    <article className="communityContent">
                                        <h6>Joined Our Community</h6>
                                        <p>
                                            <span className="highlight">150k+</span> Creators
                                        </p>
                                    </article>
                                </div>
                            </div>
                            <div className="d-flex communityC flex-wrap mt-5">
                                <img src="assets/images/main/project/clients/1.png" alt="Community" />
                                <img src="assets/images/main/project/clients/2.png" alt="Community" />
                                <img src="assets/images/main/project/clients/3.png" alt="Community" />
                                <img src="assets/images/main/project/clients/1.png" alt="Community" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2 className="starta-heading">Top Rated Company</h2>
                            <h1 className="starta-h1">
                                Starting a Consulting Business With No Experience
                            </h1>
                            <p className="starta-desc">
                                A custom logo design is a crucial part of your overall branding
                                tprocess. Your logo design is a significant. is a crucial part of your
                                overall branding part of your overall branding
                            </p>
                            <img
                                className="starta-block-img mt-3 animate-img3"
                                src="assets/images/main/project/blockImg2.png"
                                alt="Block Img"
                            />
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default About;