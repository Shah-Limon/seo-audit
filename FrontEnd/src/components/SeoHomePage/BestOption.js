import React from 'react';

const BestOption = () => {
    return (
        <>
            <section className="starta-details py-5 my-5" id="best">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="starta-heading">Top Rating Company</h1>
                            <h1 className="starta-h1">Starting a Consulting Business With</h1>
                            <p className="starta-desc">
                                A custom logo design is a crucial part of your overall branding
                                Process. Your logo design is a sitgnificant. is a crucial part of your
                                overall branding part of your overall branding
                            </p>
                            <ul className="list-unstyled details-list">
                                <li>
                                    <img src="assets/images/main/services/details/1.png" alt="Icon" />
                                    Sync to Cloud
                                </li>
                                <li>
                                    <img src="assets/images/main/services/details/2.png" alt="Icon" />
                                    Create your own Playlist
                                </li>
                                <li>
                                    <img src="assets/images/main/services/details/3.png" alt="Icon" />
                                    Share instantly
                                </li>
                            </ul>
                            <button className="starta-button starta-button-2">
                                <span className="position-relative">Learn More</span>
                                <span className="starta-button-hover" />
                            </button>
                        </div>
                        <div className="col-md-6 position-relative">
                            <div className="details_img detail_img1">
                                <img
                                    src="assets/images/main/services/details/detail1.jpg"
                                    alt="Details"
                                />
                            </div>
                            <div className="details_img detail_img2">
                                <img
                                    src="assets/images/main/services/details/detail3.jpg"
                                    alt="Details"
                                />
                            </div>
                            <div className="details_img detail_img3">
                                <img
                                    src="assets/images/main/services/details/detail2.jpg"
                                    alt="Details"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default BestOption;