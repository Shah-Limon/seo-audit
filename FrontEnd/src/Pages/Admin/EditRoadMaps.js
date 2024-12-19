import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditRoadMaps = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [road, SetRoad] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/road/`)
      .then((res) => res.json())
      .then((info) => SetRoad(info));
  }, []);

  const handleWhyEdit = (event) => {
    event.preventDefault();

    const updateRoad = {
      cardTitleOne: event.target.cardTitleOne.value,
      cardNumberOne: event.target.cardNumberOne.value,
      cardTitleTwo: event.target.cardTitleTwo.value,
      cardNumberTwo: event.target.cardNumberTwo.value,
      cardTitleThree: event.target.cardTitleThree.value,
      cardNumberThree: event.target.cardNumberThree.value,
      cardTitleFour: event.target.cardTitleFour.value,
      cardNumberFour: event.target.cardNumberFour.value,
    };

    const url = `http://localhost:5000/edit-road/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateRoad),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  const formContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const inputStyle = {
    borderRadius: '8px',
    padding: '0.75rem',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    transition: 'all 0.3s ease',
  };

  const labelStyle = {
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#495057',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '50px',
    padding: '0.75rem 1.5rem',
    border: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f4f6f9' }}>
      <BackToAdminDashboard />
      <form 
        onSubmit={handleWhyEdit} 
        style={formContainerStyle}
        className="needs-validation mt-5 mb-5"
        noValidate
      >
        <h2 className="text-center mb-4 text-dark">Edit Cta Cards</h2>
        {road.map((e, index) => (
          <div key={index} className="row g-3">
            {[
              { title: 'One', key: 'One' },
              { title: 'Two', key: 'Two' },
              { title: 'Three', key: 'Three' },
              { title: 'Four', key: 'Four' }
            ].map((card) => (
              <React.Fragment key={card.key}>
                <div className="col-md-6 mb-3">
                  <label 
                    htmlFor={`cardTitle${card.key}`} 
                    className="form-label" 
                    style={labelStyle}
                  >
                    Card Title ({card.title})
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`cardTitle${card.key}`}
                    name={`cardTitle${card.key}`}
                    placeholder={`Enter Card Title (${card.title})`}
                    defaultValue={e[`cardTitle${card.key}`]}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label 
                    htmlFor={`cardNumber${card.key}`} 
                    className="form-label" 
                    style={labelStyle}
                  >
                    Card Number ({card.title})
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`cardNumber${card.key}`}
                    name={`cardNumber${card.key}`}
                    placeholder={`Enter Card Number (${card.title})`}
                    defaultValue={e[`cardNumber${card.key}`]}
                    style={inputStyle}
                    required
                  />
                </div>
              </React.Fragment>
            ))}
            
            <div className="col-12 text-center mt-4">
              <button 
                type="submit" 
                className="btn" 
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default EditRoadMaps;