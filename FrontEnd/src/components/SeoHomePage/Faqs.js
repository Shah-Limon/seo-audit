import React from 'react';

const Faqs = () => {
    return (
        <>
            <section className="starta-faq my-5 pb-md-5" id="faqs">
                <div className="container pt-4">
                    <h1 className="starta-heading mx-auto">Top Rated Company</h1>
                    <h1 className="starta-h1 text-center">Meet Our Expert Team</h1>
                    {/* FAQs */}
                    <div className="accordion accordion-flush" id="startaFaq">
                        <div className="accordion-item">
                            {/* faq 1 header */}
                            <h2 className="accordion-header">
                                <button
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq1"
                                    aria-expanded="false"
                                    aria-controls="#faq1"
                                >
                                    Revisiting Your Investment &amp; Distribution Goals
                                </button>
                            </h2>
                            {/* faq 1 body */}
                            <div id="faq1" data-bs-parent="#startaFaq" className="collapse show">
                                <div className="accordion-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 col-sm-6 col-6">
                                            <img
                                                src="assets/images/main/about/faqs/f1.jpg"
                                                alt="Faq"
                                                className="starta-block-img"
                                            />
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-6">
                                            <img
                                                src="assets/images/main/about/faqs/f2.jpg"
                                                alt="Faq"
                                                className="starta-block-img"
                                            />
                                        </div>
                                        <div className="col-md-6 col-sm-12 mt-sm-4">
                                            <h3 className="starta-h3">
                                                Revisiting Your Investment Distribution Goals
                                            </h3>
                                            <p className="starta-desc">
                                                Every pleasure is to be welcomed and every pain avoided. But
                                                in certain circumstances and owing to the claims of duty
                                                obligations of business
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            {/* faq 2 header */}
                            <h2 className="accordion-header">
                                <button
                                    className="collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq2"
                                    aria-expanded="false"
                                    aria-controls="faq2"
                                >
                                    Revisiting Your Investment &amp; Distribution Goals
                                </button>
                            </h2>
                            {/* faq 2 body */}
                            <div id="faq2" data-bs-parent="#startaFaq" className="collapse">
                                <div className="accordion-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 col-sm-6 col-6">
                                            <img
                                                src="assets/images/main/about/faqs/f3.jpg"
                                                alt="Faq"
                                                className="starta-block-img"
                                            />
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-6">
                                            <img
                                                src="assets/images/main/about/faqs/f4.jpg"
                                                alt="Faq"
                                                className="starta-block-img"
                                            />
                                        </div>
                                        <div className="col-md-6 col-sm-12 mt-sm-4">
                                            <h3 className="starta-h3">
                                                Revisiting Your Investment Distribution Goals
                                            </h3>
                                            <p className="starta-desc">
                                                Every pleasure is to be welcomed and every pain avoided. But
                                                in certain circumstances and owing to the claims of duty
                                                obligations of business
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Faqs;