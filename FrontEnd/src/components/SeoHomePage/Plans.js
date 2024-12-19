import React from 'react';
import { Link } from 'react-router-dom';

const Plans = () => {
    return (
        <>
            <section className="starta-plans" id="plan">
                <div className="container">
                    <h1 className="starta-heading mx-auto">Top rated Company</h1>
                    <h1 className="starta-h1 text-center">
                        Choice The Right Pricing Plan That Suits your Need
                    </h1>
                    <div className="row justify-content-center">
                        <div className="col-md-4 lap-sm-50 tab-100">
                            {/* plan single */}
                            <div className="plan">
                                <div className="row align-items-center">
                                    <div className="col-md-5 col-sm-3 col-5">
                                        <i className="starta-icon featureIcon fa-regular fa-lightbulb" />
                                    </div>
                                    <div className="col-md-7 p-md-0 col-sm-9 col-7">
                                        <article className="plan-heading">
                                            <h3 className="starta-h2">Basic Plan</h3>
                                            <p className="starta-h2">
                                                <span>$</span>9/monthly
                                            </p>
                                        </article>
                                    </div>
                                    <p className="starta-desc fw-medium my-4">
                                        Every pleasure is to be welcomed and every pain avoided. is to be
                                        welcomed and every
                                    </p>
                                    <button className="starta-button">
                                        <a href="/contact">Get Started</a>
                                    </button>
                                    <ul className="starta-list list-unstyled">
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Virtual Private Server
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                    </ul>
                                </div>
                                <span className="discount">
                                    14-day free trial - No credit card Required
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4 lap-sm-50 tab-100">
                            {/* plan single */}
                            <div className="plan best">
                                <div className="row align-items-center">
                                    <div className="col-md-5 col-sm-3 col-5">
                                        <i className="starta-icon featureIcon fa-regular fa-lightbulb" />
                                    </div>
                                    <div className="col-md-7 p-md-0 col-sm-9 col-7">
                                        <article className="plan-heading">
                                            <h3 className="starta-h2">Standard Plan</h3>
                                            <p className="starta-h2">
                                                <span>$</span>19/monthly
                                            </p>
                                        </article>
                                    </div>
                                    <p className="starta-desc fw-medium my-4">
                                        Every pleasure is to be welcomed and every pain avoided. is to be
                                        welcomed and every
                                    </p>
                                    <ul className="starta-list list-unstyled">
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Virtual Private Server
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                    </ul>
                                    <button className="starta-button">
                                        <Link to="/contact" className="position-relative">
                                            Get Started
                                        </Link>
                                        <span className="starta-button-hover" />
                                    </button>
                                </div>
                                <span className="discount">
                                    14-day free trial - No credit card Required
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4 lap-sm-50 tab-100">
                            {/* plan single */}
                            <div className="plan">
                                <div className="row align-items-center">
                                    <div className="col-md-5 col-sm-3 col-5">
                                        <i className="starta-icon featureIcon fa-regular fa-lightbulb" />
                                    </div>
                                    <div className="col-md-7 p-md-0 col-sm-9 col-7">
                                        <article className="plan-heading">
                                            <h3 className="starta-h2">Advanced Plan</h3>
                                            <p className="starta-h2">
                                                <span>$</span>29/monthly
                                            </p>
                                        </article>
                                    </div>
                                    <p className="starta-desc fw-medium my-4">
                                        Every pleasure is to be welcomed and every pain avoided. is to be
                                        welcomed and every
                                    </p>
                                    <button className="starta-button">
                                        <a href="/contact">Get Started</a>
                                    </button>
                                    <ul className="starta-list list-unstyled">
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Virtual Private Server
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Get high conversion rates
                                        </li>
                                    </ul>
                                </div>
                                <span className="discount">
                                    14-day free trial - No credit card Required
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Plans;