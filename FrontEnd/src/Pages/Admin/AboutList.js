import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const AboutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/about-services`)
      .then((res) => res.json())
      .then((info) => setAbouts(info));
  }, []);

  let rowNumber = 1;

  const handleSlider = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const img = event.target.img.value;
    const pointOne = event.target.pointOne.value;
    const pointTwo = event.target.pointTwo.value;
    const pointThree = event.target.pointThree.value;

    const footerSocial = {
      title,
      description,
      img,
      pointOne,
      pointTwo,
      pointThree
    };

    const url = `http://localhost:5000/add-about-service`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerSocial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage");
      });
  }

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    heading: {
      color: '#343a40',
      marginBottom: '1.5rem',
      fontWeight: '600',
      textAlign: 'center'
    },
    label: {
      fontWeight: '500',
      color: '#495057',
      marginBottom: '0.5rem'
    },
    input: {
      borderRadius: '8px',
      padding: '0.75rem',
      border: '1px solid #ced4da'
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '50px',
      padding: '0.75rem 2rem',
      fontWeight: '600',
      border: 'none',
      transition: 'all 0.3s ease'
    },
    submitButtonHover: {
      backgroundColor: '#0056b3'
    },
    table: {
      marginTop: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      border: '1px solid #e9ecef'
    },
    tableHeader: {
      backgroundColor: '#6a11cb',
      color: 'white',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderBottom: '3px solid #4911a3'
    },
    tableRow: {
      transition: 'background-color 0.3s ease',
    },
    tableRowHover: {
      backgroundColor: 'rgba(106, 17, 203, 0.05)'
    },
    editLink: {
      backgroundColor: '#6a11cb',
      color: 'white',
      borderRadius: '20px',
      padding: '5px 15px',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '0.8rem',
      transition: 'background-color 0.3s ease'
    },
    editLinkHover: {
      backgroundColor: '#4911a3'
    }
  };

  return (
    <div className="bg-light py-5">
      <BackToAdminDashboard />
      <div style={styles.container} className="shadow-sm mt-5">
        <form className="form" onSubmit={handleSlider}>
          <div className="row">
            <div className="col-12">
              <h4 style={styles.heading} className="mb-4">
                Add About Service
              </h4>
            </div>
            {[
              { name: 'title', label: 'Title', type: 'text', },
              { name: 'description', label: 'Description', type: 'textarea', },
              { name: 'img', label: 'Image URL (1322px × 764px)', type: 'text', },
              { name: 'pointOne', label: 'Point One', type: 'text' },
              { name: 'pointTwo', label: 'Point Two', type: 'text' },
              { name: 'pointThree', label: 'Point Three', type: 'text' }
            ].map(({ name, label, type, }) => (
              <div key={name} className="col-12 mb-3">
                <label
                  htmlFor={name}
                  style={styles.label}
                  className="form-label"
                >
                  {label}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    id={name}
                    required
                    name={name}
                    className="form-control"
                    placeholder={`Enter ${label}`}
                    style={styles.input}
                  />
                ) : (
                  <input
                    type={type}
                    required
                    id={name}
                    name={name}
                    className="form-control"
                    placeholder={`Enter ${label}`}
                    style={styles.input}
                  />
                )}
              </div>
            ))}

            <div className="col-12 text-center mt-4">
              <button
                type="submit"
                className="btn"
                style={styles.submitButton}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = styles.submitButton.backgroundColor;
                }}
              >
                Add Service
              </button>
            </div>
          </div>
        </form>

        <div style={styles.table} className="mt-5 table-responsive">
          <h5 style={styles.heading} className="pt-4 pb-3 text-center">
            About Services List
          </h5>
          <table className="table mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
            <thead style={styles.tableHeader}>
              <tr>
                <th className="text-center py-3" style={{ borderTopLeftRadius: '12px' }}>SL No.</th>
                <th className="py-3">Title</th>
                <th className="text-center py-3" style={{ borderTopRightRadius: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {abouts.map((item, index) => (
                <tr
                  key={item._id}
                  style={{
                    ...styles.tableRow,
                    ':hover': styles.tableRowHover
                  }}
                  className="shadow-sm"
                >
                  <td className="text-center fw-bold text-muted align-middle" style={{
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    backgroundColor: 'white',
                    padding: '15px'
                  }}>
                    {index + 1}
                  </td>
                  <td className="align-middle" style={{
                    backgroundColor: 'white',
                    padding: '15px'
                  }}>
                    {item.title}
                  </td>
                  <td className="text-center align-middle" style={{
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                    backgroundColor: 'white',
                    padding: '15px'
                  }}>
                    <Link
                      to={`/admin/edit-about-service/${item._id}`}
                      style={styles.editLink}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = styles.editLinkHover.backgroundColor;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = styles.editLink.backgroundColor;
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AboutList;