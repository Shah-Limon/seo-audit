import React from 'react';

const Features = () => {
    return (
        <>
            <section className="startaFeatures" id="about">
                <div className="container">
                    <div className="row my-5 pb-4 justify-content-between align-items-center">
                        {/* Feature single */}
                        <div className="col-md-4 col-sm-6">
                            <div className="row align-items-center featureSingle">
                                <div className="col-md-4">
                                    <i className="starta-icon featureIcon fa-regular fa-lightbulb" />
                                </div>
                                <div className="col-md-7">
                                    <article>
                                        <h4 className="starta-h4">Quiqtue</h4>
                                        <p className="starta-desc">
                                            free trial plan to give a new start to your business,
                                        </p>
                                    </article>
                                </div>
                            </div>
                        </div>
                        {/* feature single */}
                        <div className="col-md-4 col-sm-6">
                            <div className="row align-items-center featureSingle">
                                <div className="col-md-4">
                                    <i className="starta-icon featureIcon fa-regular fa-lightbulb" />
                                </div>
                                <div className="col-md-7">
                                    <article>
                                        <h4 className="starta-h4">Quiqtue</h4>
                                        <p className="starta-desc">
                                            free trial plan to give a new start to your business,
                                        </p>
                                    </article>
                                </div>
                            </div>
                        </div>
                        {/* feature single */}
                        <div className="col-md-4 col-sm-6">
                            <div className="row align-items-center featureSingle">
                                <div className="col-md-4">
                                    <i className="starta-icon featureIcon fa-regular fa-lightbulb" />
                                </div>
                                <div className="col-md-7">
                                    <article>
                                        <h4 className="starta-h4">Quiqtue</h4>
                                        <p className="starta-desc">
                                            free trial plan to give a new start to your business,
                                        </p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* gap */}
                    <div className="lineGap my-4" />
                    <div className="row my-5 py-md-4">
                        {/* Starta BLock */}
                        <div className="col-md-6 position-relative">
                            <img
                                className="starta-block-img animate-img"
                                src="assets/images/main/block1.png"
                                alt="Block"
                            />
                            {/* block Performance */}
                            <div className="starta-performance">
                                <h4 className="starta-h4 fw-normal mb-3">Performance</h4>
                                <div className="row pb-3 border-bottom">
                                    <div className="col-md-6 col-sm-6 col-6">
                                        <div className="row">
                                            <div className="col-md-4 pe-0">
                                                <i className="performance-icon fa-solid fa-display" />
                                            </div>
                                            <div className="col-md-8 ps-1">
                                                <article>
                                                    <h4 className="starta-h4 d-flex align-items-center fw-normal mb-0">
                                                        2584+
                                                        <i className="fa-solid fa-arrow-up" />
                                                    </h4>
                                                    <p className="starta-desc">Customers</p>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-6">
                                        <div className="row">
                                            <div className="col-md-4 pe-0">
                                                <i className="performance-icon fa-solid fa-signal" />
                                            </div>
                                            <div className="col-md-8 ps-1">
                                                <article>
                                                    <h4 className="starta-h4 d-flex align-items-center fw-normal mb-0">
                                                        150K
                                                        <i className="fa-solid text-warning fa-arrow-down" />
                                                    </h4>
                                                    <p className="starta-desc">Income</p>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="starta-h5 my-3">
                                    New Business innovation<span>75%</span>
                                </h5>
                                <div className="bar">
                                    <div className="fill" />
                                </div>
                            </div>
                        </div>
                        {/* About Content */}
                        <div className="col-md-6 mt-3">
                            <h2 className="starta-heading">
                                <i className="fa-solid fa-star" />
                                Top Rated Company
                            </h2>
                            <h1 className="starta-h1">We Develop &amp; Create Digital Future</h1>
                            <p className="starta-desc">
                                Every pleasure is to be welcomed and every pain avoided. But in
                                certain circumstances and owing to the
                                <a href="">claims of duty obligations of business</a> it will
                                frequently occur Contact us today.
                            </p>
                            <div className="row my-3">
                                <div className="col-md-5">
                                    <h1 className="starta-h1 my-0">
                                        <span>4.7</span>+
                                    </h1>
                                    <div className="stars mx-0">
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </div>
                                    <h5 className="starta-h5 fw-bold mt-4">Review customer</h5>
                                </div>
                                <div className="col-md-7">
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
                                    </ul>
                                </div>
                            </div>
                            <button className="starta-button mt-4">
                                <span className="position-relative">Get Quote Now</span>
                                <span className="starta-button-hover" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Features;