import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info[0]));
  }, []);

  return (
    <div className="pricing-area pricing-gird default-padding bg-gray bottom-less">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">Our Pricing</h4>
              <h2 className="title">{title.titleOne}</h2>
              <div className="devider" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pricing-style-one-items">
          <div className="row">
            {packages.map((pkg, index) => (
              <div key={index} className="col-xl-4 col-md-6 mb-30">
                <div className={`pricing-style-one ${index === 1 ? 'active' : ''} animate`} data-animate="fadeInUp" data-delay={`${index * 300}ms`}>
                  <div className="pricing-header">
                    <h4>{pkg.packageName}</h4>
                    <p>{pkg.description}</p>
                  </div>
                  <div className="pricing-content">
                    <div className="price">
                      <h2>
                        <sup>$</sup>
                        {pkg.price} <sub>/ {pkg.totalCredits} Credits</sub>
                      </h2>
                    </div>
                    <ul>
                      {pkg.pointOne && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointOne}
                        </li>
                      )}
                      {pkg.pointTwo && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointTwo}
                        </li>
                      )}
                      {pkg.pointThree && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointThree}
                        </li>
                      )}
                      {pkg.pointFour && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointFour}
                        </li>
                      )}
                      {pkg.pointFive && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointFive}
                        </li>
                      )}
                      {pkg.pointSix && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointSix}
                        </li>
                      )}
                      {pkg.pointSeven && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointSeven}
                        </li>
                      )}
                      {pkg.pointEight && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointEight}
                        </li>
                      )}
                      {pkg.pointNine && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointNine}
                        </li>
                      )}
                      {pkg.pointTen && (
                        <li>
                          <i className="fas fa-check-circle" /> {pkg.pointTen}
                        </li>
                      )}
                    </ul>

                    <Link to={`/package/${pkg._id}`} className="btn mt-30 btn-sm btn-dark animation">
                      Select Plan
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;