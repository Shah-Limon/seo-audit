import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [contact, setContact] = useState({});
    const [currentDate, setCurrentDate] = useState(getCurrentDate());


    useEffect(() => {
        fetch(`http://localhost:5000/contact/`)
            .then((res) => res.json())
            .then((info) => setContact(info[0]));
    }, []);

    const UserContactMessage = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const message = event.target.message.value;
        const subject = event.target.subject.value;
        const date = event.target.date.value;
        const messageStatus = event.target.messageStatus.value;

        const contact = {
            name,
            email,
            message,
            subject,
            date,
            messageStatus,
        };

        const url = `http://localhost:5000/add-contact-message`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(contact),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success("Message sent successfully!");
                event.target.reset();
            });
    };

    // Function to get the current date in yyyy-MM-dd format
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <>
                <div
                    className="contact-area overflow-hidden default-padding"
                    style={{ backgroundImage: "url(assets/img/shape/map.png)" }}
                >
                    <div className="container">
                        <div className="contact-box">
                            <div className="row align-center">
                                <div className="col-tact-stye-one col-lg-5">
                                    <div className="contact-style-one-info">
                                        <div className="mb-40">
                                            <h2>{contact.titleOne}</h2>
                                            <p>
                                                {contact.titleDescription}
                                            </p>
                                        </div>
                                        <ul className="contact-address">
                                            <li className="animate" data-animate="fadeInUp">
                                                <div className="content">
                                                    <h4 className="title">Phone</h4>
                                                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                                </div>
                                            </li>
                                            <li
                                                className="animate"
                                                data-animate="fadeInUp"
                                                data-delay="300ms"
                                            >
                                                <div className="info">
                                                    <h4 className="title">Location</h4>
                                                    <p>
                                                        {contact.address}
                                                    </p>
                                                </div>
                                            </li>
                                            <li
                                                className="animate"
                                                data-animate="fadeInUp"
                                                data-delay="600ms"
                                            >
                                                <div className="info">
                                                    <h4 className="title">Official Email</h4>
                                                    <a href={`mailto:${contact.email}`}>
                                                        {contact.email}
                                                    </a>
                                                </div>
                                            </li>
                                            <li
                                                className="animate"
                                                data-animate="fadeInUp"
                                                data-delay="600ms"
                                            >
                                                <div className="info">
                                                    <h4 className="title">Follow Us</h4>
                                                    <ul className="social-link">
                                                        <li>
                                                            <a className="facebook" href="#" target="_blank">
                                                                <i className="fab fa-facebook-f" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="twitter" href="#" target="_blank">
                                                                <i className="fab fa-twitter" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="pinterest" href="#" target="_blank">
                                                                <i className="fab fa-pinterest-p" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="linkedin" href="#" target="_blank">
                                                                <i className="fab fa-linkedin-in" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-tact-stye-one col-lg-6 offset-lg-1">
                                    <div className="contact-form-style-one">
                                        <h4 className="sub-title">Have Questions?</h4>
                                        <h2 className="title">Send us a Massage</h2>
                                        <form
                                            onSubmit={UserContactMessage}
                                            className="contact-form contact-form">
                                            <input
                                                type="date"
                                                hidden
                                                className="form-control"
                                                name="date"
                                                value={currentDate}
                                                onChange={(e) => setCurrentDate(e.target.value)}
                                            />
                                            <input
                                                hidden
                                                type="text"
                                                className="form-control"
                                                name="messageStatus"
                                                value="UnRead"
                                            />
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <input
                                                            required
                                                            className="form-control"
                                                            id="name"
                                                            name="name"
                                                            placeholder="Name"
                                                            type="text"
                                                        />
                                                        <span className="alert-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <input
                                                            className="form-control"
                                                            required
                                                            id="email"
                                                            name="email"
                                                            placeholder="Email*"
                                                            type="email"
                                                        />
                                                        <span className="alert-error" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <input
                                                            className="form-control"
                                                            id="phone"
                                                            name="subject"
                                                            placeholder="Subject"
                                                            type="text"
                                                        />
                                                        <span className="alert-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group comments">
                                                        <textarea
                                                            required
                                                            className="form-control"
                                                            id="comments"
                                                            name="message"
                                                            placeholder="Tell Us About Project *"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button type="submit" name="submit" id="submit">
                                                        <i className="fa fa-paper-plane" /> Get in Touch
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Alert Message */}
                                            <div className="col-lg-12 alert-notification">
                                                <div id="message" className="alert-msg" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default ContactUs;