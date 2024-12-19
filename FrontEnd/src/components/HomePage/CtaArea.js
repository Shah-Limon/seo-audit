// import React, { useEffect, useState } from 'react';

// const CtaArea = () => {
//     const [road, SetRoad] = useState([]);

//     useEffect(() => {
//       fetch(`http://localhost:5000/road/`)
//         .then((res) => res.json())
//         .then((info) => SetRoad(info));
//     }, []);
//     return (
//         <>
//             <div className="fun-facts-area bg-gradient text-light default-padding">
//                 {/* Shape */}
//                 <div className="shape">
//                     <img src="assets/img/shape/map.png" alt="Image Not Found" />
//                 </div>
//                 {/* End Shape */}
//                 <div className="container">
//                     <div className="item-inner">
//                         <div className="row">
//                             <div className="col-lg-3 col-md-6 item">
//                                 <div className="fun-fact">
//                                     <div className="counter">
//                                         <div className="timer" data-to={18} data-speed={2000}>
//                                             18
//                                         </div>
//                                         <div className="operator">K</div>
//                                     </div>
//                                     <span className="medium">App Downloads</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-md-6 item">
//                                 <div className="fun-fact">
//                                     <div className="counter">
//                                         <div className="timer" data-to={98} data-speed={2000}>
//                                             98
//                                         </div>
//                                         <div className="operator">%</div>
//                                     </div>
//                                     <span className="medium">Positive Rating</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-md-6 item">
//                                 <div className="fun-fact">
//                                     <div className="counter">
//                                         <div className="timer" data-to={12} data-speed={2000}>
//                                             12
//                                         </div>
//                                         <div className="operator">M</div>
//                                     </div>
//                                     <span className="medium">Trusted Users</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-3 col-md-6 item">
//                                 <div className="fun-fact">
//                                     <div className="counter">
//                                         <div className="timer" data-to={5} data-speed={2000}>
//                                             5
//                                         </div>
//                                         <div className="operator">B</div>
//                                     </div>
//                                     <span className="medium">Active Accounts</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default CtaArea;
import React, { useEffect, useState } from 'react';

const CtaArea = () => {
    const [roadData, setRoadData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoadData = async () => {
            try {
                const response = await fetch('http://localhost:5000/road/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRoadData(data[0]); // Assuming the API returns an array with one object
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching road data:', error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchRoadData();
    }, []);

    // If still loading, show a loading state
    if (isLoading) {
        return (
            <div className="fun-facts-area bg-gradient text-light default-padding">
                <div className="container">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        );
    }

    // If there's an error, show an error message
    if (error) {
        return (
            <div className="fun-facts-area bg-gradient text-light default-padding">
                <div className="container">
                    <div className="text-center text-danger">Error loading data</div>
                </div>
            </div>
        );
    }

    return (
        <div className="fun-facts-area bg-gradient text-light default-padding">
            {/* Shape */}
            <div className="shape">
                <img src="assets/img/shape/map.png" alt="Image Not Found" />
            </div>
            {/* End Shape */}
            <div className="container">
                <div className="item-inner">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 item">
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer" data-to={roadData.cardNumberOne} data-speed={2000}>
                                        {roadData.cardNumberOne}
                                    </div>
                                    <div className="operator">+</div>
                                </div>
                                <span className="medium">{roadData.cardTitleOne}</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 item">
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer" data-to={roadData.cardNumberTwo} data-speed={2000}>
                                        {roadData.cardNumberTwo}
                                    </div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">{roadData.cardTitleTwo}</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 item">
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer" data-to={roadData.cardNumberThree} data-speed={2000}>
                                        {roadData.cardNumberThree}
                                    </div>
                                    <div className="operator">+</div>
                                </div>
                                <span className="medium">{roadData.cardTitleThree}</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 item">
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer" data-to={roadData.cardNumberFour} data-speed={2000}>
                                        {roadData.cardNumberFour}
                                    </div>
                                    <div className="operator">+</div>
                                </div>
                                <span className="medium">{roadData.cardTitleFour}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaArea;