import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const WhyChooseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [choose, SetChoose] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/why-choose/`)
      .then((res) => res.json())
      .then((info) => SetChoose(info[0]));
  }, []);

  const handleWhyEdit = async (event) => {
    event.preventDefault();
    const titleTop = event.target.titleTop.value;
    const title = event.target.title.value;
    const image = event.target.image.value;
    const desc = event.target.desc.value;

    const TitleBoxOne = event.target.TitleBoxOne.value;
    const ParaBoxOne = event.target.ParaBoxOne.value;

    const TitleBoxTwo = event.target.TitleBoxTwo.value;
    const ParaBoxTwo = event.target.ParaBoxTwo.value;

    const TitleBoxThree = event.target.TitleBoxThree.value;
    const ParaBoxThree = event.target.ParaBoxThree.value;

    const chooseData = {
      titleTop,
      desc,
      title,
      image,
      TitleBoxOne,
      ParaBoxOne,
      TitleBoxTwo,
      ParaBoxTwo,
      TitleBoxThree,
      ParaBoxThree,
    };

    const url = `http://localhost:5000/edit-why-choose/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(chooseData),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div
      className="container-fluid px-4 py-5"
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}
    >
      <BackToAdminDashboard />

      <form
        className="bg-white shadow-sm rounded-3 p-5"
        onSubmit={handleWhyEdit}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          border: '1px solid #e9ecef'
        }}
      >
        <h2
          className="text-center mb-4 text-primary"
          style={{ fontWeight: 600 }}
        >
          Edit Why Choose Section
        </h2>

        <div className="row g-4">
          <div className="col-md-12">
            <label className="form-label">Title Text Top</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Title Text"
              name="titleTop"
              defaultValue={choose.titleTop}
              style={{
                backgroundColor: '#f1f3f5',
                border: '1px solid #ced4da'
              }}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Title Text</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Banner Text"
              name="title"
              defaultValue={choose.title}
              style={{
                backgroundColor: '#f1f3f5',
                border: '1px solid #ced4da'
              }}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Image URL"
              name="image"
              defaultValue={choose.image}
              style={{
                backgroundColor: '#f1f3f5',
                border: '1px solid #ced4da'
              }}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Description"
              name="desc"
              defaultValue={choose.desc}
              style={{
                backgroundColor: '#f1f3f5',
                border: '1px solid #ced4da'
              }}
            />
          </div>
        </div>

        {[
          {
            title: 'Point One',
            titleName: 'TitleBoxOne',
            paraName: 'ParaBoxOne',
            defaultTitle: choose.TitleBoxOne,
            defaultPara: choose.ParaBoxOne
          },
          {
            title: 'Point Two',
            titleName: 'TitleBoxTwo',
            paraName: 'ParaBoxTwo',
            defaultTitle: choose.TitleBoxTwo,
            defaultPara: choose.ParaBoxTwo
          },
          {
            title: 'Point Three',
            titleName: 'TitleBoxThree',
            paraName: 'ParaBoxThree',
            defaultTitle: choose.TitleBoxThree,
            defaultPara: choose.ParaBoxThree
          }
        ].map((point, index) => (
          <div
            key={index}
            className="card mt-4 shadow-sm"
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '10px'
            }}
          >
            <div className="card-body p-4">
              <h5
                className="card-title text-primary mb-3"
                style={{ fontWeight: 600 }}
              >
                {point.title}
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Box Banner Title</label>
                  <input
                    type="text"
                    name={point.titleName}
                    defaultValue={point.defaultTitle}
                    className="form-control"
                    placeholder="Enter Banner Title"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #ced4da'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Box Banner Paragraph</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Box Banner Paragraph"
                    name={point.paraName}
                    defaultValue={point.defaultPara}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #ced4da'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600
            }}
          >
            Update Why Choose
          </button>
        </div>
      </form>
    </div>
  );
};

export default WhyChooseEdit;