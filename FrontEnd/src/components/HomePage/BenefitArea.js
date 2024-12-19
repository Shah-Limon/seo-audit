import React, { useEffect, useState } from 'react';

const BenefitArea = () => {
    const [choose, setChoose] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChooseData = async () => {
            try {
                const response = await fetch('http://localhost:5000/why-choose/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChoose(data[0]); // Assuming the API returns an array with one object
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching choose data:', error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchChooseData();
    }, []);

    // If still loading, show a loading state
    if (isLoading) {
        return (
            <div className="software-benifits-area overflow-hidden default-padding">
                <div className="container">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        );
    }

    // If there's an error, show an error message
    if (error) {
        return (
            <div className="software-benifits-area overflow-hidden default-padding">
                <div className="container">
                    <div className="text-center text-danger">Error loading data</div>
                </div>
            </div>
        );
    }

    return (
        <div className="software-benifits-area overflow-hidden default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-5">
                        <h4 className="sub-title">{choose.titleTop}</h4>
                        <h2 className="title mb-30 animation-text">
                            {choose.title.split(' animation-text')[0]} <br />
                            {choose.title.split(' animation-text')[1]}
                        </h2>
                        <p>{choose.desc}</p>
                        <ul className="list-double mt-40">
                            <li className="animate" data-animate="fadeInUp">
                                <h5>{choose.TitleBoxOne}</h5>
                                <p>{choose.ParaBoxOne}</p>
                            </li>
                            <li className="animate" data-animate="fadeInUp" data-delay="300ms">
                                <h5>{choose.TitleBoxTwo}</h5>
                                <p>{choose.ParaBoxTwo}</p>
                            </li>
                            <li className="animate" data-animate="fadeInUp" data-delay="600ms">
                                <h5>{choose.TitleBoxThree}</h5>
                                <p>{choose.ParaBoxThree}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6 offset-lg-1 col-xl-5 offset-xl-1">
                        <div className="soft-illustration">
                            <img
                                src={choose.image}
                                alt="Software Illustration"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/assets/img/illustration/14.png";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitArea;