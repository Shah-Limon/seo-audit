// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const ContactPageEdit = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [contact, setContact] = useState([]);
//   const [imgUrl, setImgUrl] = useState(contact.img || "");
//   const [imageFile, setImageFile] = useState(null);


//   const handleEditContactPage = (event) => {
//     event.preventDefault();
//     const titleOne = event.target.titleOne.value;
//     const titleDescription = event.target.titleDescription.value;
//     const address = event.target.address.value;
//     const phone = event.target.phone.value;
//     const email = event.target.email.value;

//     const contact = {
//       titleOne,
//       titleDescription,
//       address,
//       phone,
//       email,
//       img: imgUrl,
//     };

//     const url = `http://localhost:5000/contact/${id}`;
//     fetch(url, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(contact),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         navigate("/admin/setting");
//       });
//   };
//   const handleImageUpload = async (event) => {
//     const formData = new FormData();
//     formData.append("image", event.target.files[0]);

//     try {
//       const response = await axios.post("https://api.imgbb.com/1/upload?key=9b9a8d0dcddf9fdbc0d69db3ef376eac", formData);
//       setImgUrl(response.data.data.url);
//     } catch (error) {
//       console.error("Image upload failed: ", error);
//     }
//   };


//   useEffect(() => {
//     fetch(`http://localhost:5000/contact/${id}`)
//       .then((res) => res.json())
//       .then((info) => {
//         setContact(info);
//         setImgUrl(info.img || "");
//       });
//   }, [id]);

//   return (
//     <div>
//       <form class="form mt-5" onSubmit={handleEditContactPage}>
//         <div class="container">
//           <div class="justify-content-center align-items-baseline">

//             <div class="col-sm">
//               <label className="mt-1">Contact Title</label>
//               <div class="form-group mb-3">
//                 <input
//                   type="text"
//                   class="form-control"
//                   placeholder="Type Title"
//                   name="titleOne"
//                   defaultValue={contact.titleOne}
//                 />
//               </div>
//             </div>
//             <div class="col-sm">
//               <label className="mt-1">Title Description</label>
//               <div class="form-group mb-3">
//                 <input
//                   type="text"
//                   class="form-control"
//                   placeholder="Type Title Description"
//                   name="titleDescription"
//                   defaultValue={contact.titleDescription}
//                 />
//               </div>
//             </div>
//             <div class="col-sm">
//               <label className="mt-1">Enter Address</label>
//               <div class="form-group mb-3">
//                 <input
//                   type="text"
//                   class="form-control"
//                   placeholder="Type Your Address"
//                   name="address"
//                   defaultValue={contact.address}
//                 />
//               </div>
//             </div>
//             <div class="col-sm">
//               <label className="mt-1">Enter Phone Number</label>
//               <div class="form-group mb-3">
//                 <input
//                   type="text"
//                   class="form-control"
//                   placeholder="Type Phone Number"
//                   name="phone"
//                   defaultValue={contact.phone}
//                 />
//               </div>
//             </div>
//             <div class="col-sm">
//               <label className="mt-1">Enter Email</label>
//               <div class="form-group mb-3">
//                 <input
//                   type="text"
//                   class="form-control"
//                   placeholder="Type Email"
//                   name="email"
//                   defaultValue={contact.email}
//                 />
//               </div>
//             </div>


//             <div class="col-sm">
//               <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mb-5 mt-5">
//                 <span>Update Contact</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactPageEdit;




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ContactPageEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const [imgUrl, setImgUrl] = useState(contact.img || "");
  const [imageFile, setImageFile] = useState(null);

  const handleEditContactPage = (event) => {
    event.preventDefault();
    const titleOne = event.target.titleOne.value;
    const titleDescription = event.target.titleDescription.value;
    const address = event.target.address.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    const contact = {
      titleOne,
      titleDescription,
      address,
      phone,
      email,
      img: imgUrl,
    };

    const url = `http://localhost:5000/contact/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post("https://api.imgbb.com/1/upload?key=9b9a8d0dcddf9fdbc0d69db3ef376eac", formData);
      setImgUrl(response.data.data.url);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/contact/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setContact(info);
        setImgUrl(info.img || "");
      });
  }, [id]);

  return (
    <div style={{
      backgroundColor: '#f4f6f9', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem 0'
    }}>
      <div style={{
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
        padding: '2.5rem', 
        width: '100%', 
        maxWidth: '600px'
      }}>
        <h2 style={{
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: '#333', 
          fontWeight: '600'
        }}>
          Edit Contact Information
        </h2>
        <form onSubmit={handleEditContactPage}>
          <div style={{display: 'grid', gap: '1.5rem'}}>
            <div>
              <label style={{
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#555', 
                fontWeight: '500'
              }}>
                Contact Title
              </label>
              <input
                type="text"
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  backgroundColor: '#f8f9fa'
                }}
                placeholder="Type Title"
                name="titleOne"
                defaultValue={contact.titleOne}
              />
            </div>

            <div>
              <label style={{
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#555', 
                fontWeight: '500'
              }}>
                Title Description
              </label>
              <input
                type="text"
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  backgroundColor: '#f8f9fa'
                }}
                placeholder="Type Title Description"
                name="titleDescription"
                defaultValue={contact.titleDescription}
              />
            </div>

            <div>
              <label style={{
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#555', 
                fontWeight: '500'
              }}>
                Address
              </label>
              <input
                type="text"
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  backgroundColor: '#f8f9fa'
                }}
                placeholder="Type Your Address"
                name="address"
                defaultValue={contact.address}
              />
            </div>

            <div>
              <label style={{
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#555', 
                fontWeight: '500'
              }}>
                Phone Number
              </label>
              <input
                type="text"
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  backgroundColor: '#f8f9fa'
                }}
                placeholder="Type Phone Number"
                name="phone"
                defaultValue={contact.phone}
              />
            </div>

            <div>
              <label style={{
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#555', 
                fontWeight: '500'
              }}>
                Email
              </label>
              <input
                type="email"
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  backgroundColor: '#f8f9fa'
                }}
                placeholder="Type Email"
                name="email"
                defaultValue={contact.email}
              />
            </div>

            <div style={{
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '1.5rem'
            }}>
              <button 
                type="submit"
                style={{
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.75rem 2rem', 
                  borderRadius: '50px', 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  transition: 'background-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Update Contact
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPageEdit;