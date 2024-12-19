import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState({});
  const [footer, setFooter] = useState({});
  const [social, setSocial] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-links`)
      .then((res) => res.json())
      .then((info) => setFooter(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-social`)
      .then((res) => res.json())
      .then((info) => setSocial(info[0]));
  }, []);

  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info[0]));
  }, []);

  return (
    <>
      <footer className="starta-footer pt-5">
        <div className="container py-5">
          <div className="row">
            {/* block 1 */}
            <div className="col-md-5 border-end">
              <h1 className="starta-h1">Let's Connect.</h1>
              <p className="starta-desc">
                Quisquam est, qui dolorem ipsum quia dolor sit amet, consecte adipisci
                velit, sed quia non numquam eius modi tempora incidu labore et dolore
                magnam voluptatem.
              </p>
              <ul className="starta-social list-unstyled">
                <li>
                  <a href="#">
                    <i className="fa-brands fa-youtube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-google-plus" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-square-facebook" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 lap-sm-50 tab-100 mt-sm-4">
              <div className="row mx-auto">
                {/* block 2 */}
                <div className="col-md-6 col-sm-6">
                  <h4 className="starta-h4 mb-4">Services</h4>
                  <ul className="footer-list list-unstyled">
                    <li>
                      <a className="menu-animation" href="#">
                        Instructions
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Style guide
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Licenses
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        404 Not found
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Password protected
                      </a>
                    </li>
                  </ul>
                </div>
                {/* block 3 */}
                <div className="col-md-6 col-sm-6">
                  <h4 className="starta-h4 mb-4">Links</h4>
                  <ul className="footer-list list-unstyled">
                    <li>
                      <a className="menu-animation" href="#">
                        Support
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Privacy policy
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Strategic finance{" "}
                      </a>
                    </li>
                    <li>
                      <a className="menu-animation" href="#">
                        Video guide
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* block 4 */}
            <div className="col-md-3 lap-sm-100">
              <h4 className="starta-h4 mb-4 lap-sm-none">Subscribe</h4>
              <div className="newsLetter">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                />
                <button className="starta-button submit">
                  <span className="position-relative">Subscribe</span>
                  <span className="starta-button-hover" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="copyright pt-5 pb-5">© copyright 2024 by userthemes.com</div>
      </footer>


    </>
  );
};

export default Footer;
