import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import auth from "../firebase.init";

const Package = () => {
 const [p, setPackage] = useState([]);
 const [orderDate, setOrderDate] = useState("");
 const { id } = useParams();
 const [user] = useAuthState(auth);
 const navigate = useNavigate();
 const [countries, setCountries] = useState([]);
 const [profile, setProfile] = useState([]);
 const [selectedCountry, setSelectedCountry] = useState("");

 useEffect(() => {
   fetch(`http://localhost:5000/package/${id}`)
     .then((res) => res.json())
     .then((info) => setPackage(info));
 }, [id]);

 useEffect(() => {
   fetch(`http://localhost:5000/profiles`)
     .then((res) => res.json())
     .then((info) => setProfile(info));
 }, [id]);

 const generateUniquePaymentId = () => {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let paymentId = "";
   for (let i = 0; i < 8; i++) {
     paymentId += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return paymentId;
 };

 const generateUniqueOrderId = () => {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let orderId = "";
   for (let i = 0; i < 8; i++) {
     orderId += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return orderId;
 };

 const handleOrder = (event) => {
   event.preventDefault();
   const order = {
     paymentId: generateUniquePaymentId(),
     orderId: generateUniqueOrderId(),
     packageId: event.target.packageId.value,
     packageName: event.target.packageName.value,
     packagePrice: event.target.packagePrice.value,
     totalCredits: event.target.totalCredits.value,
     paymentStatus: event.target.paymentStatus.value,
     orderStatus: event.target.orderStatus.value,
     customerEmail: event.target.customerEmail.value,
     customerName: event.target.customerName.value,
     address: event.target.address.value,
     countryName: event.target.countryName.value,
     cityName: event.target.cityName.value,
     orderDate: orderDate,
   };

   fetch(`http://localhost:5000/new-order`, {
     method: "POST",
     headers: {
       "content-type": "application/json",
     },
     body: JSON.stringify(order),
   })
     .then((res) => res.json())
     .then((result) => {
       navigate("/pending-payment/");
     });
 };

 useEffect(() => {
   const currentDate = new Date();
   setOrderDate(
     `${currentDate.getDate().toString().padStart(2, "0")}/${(
       currentDate.getMonth() + 1
     )
       .toString()
       .padStart(2, "0")}/${currentDate.getFullYear()}`
   );
 }, []);

 useEffect(() => {
  fetch("https://raw.githubusercontent.com/Shah-Limon/canva-related-new/main/country.json")
      .then((res) => res.json())
      .then((data) => {
          const sortedCountries = data.sort((a, b) => a.name.localeCompare(b.name));
          setCountries(sortedCountries);
      });
}, []);

 return (
   <>
     <style>
       {`
         .checkout-container {
           min-height: 100vh;
           padding: 3rem 1rem;
           background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
         }

         .order-summary {
           background: white;
           border-radius: 1rem;
           padding: 1.5rem;
           margin-bottom: 2rem;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
         }

         .summary-title {
           font-size: 1.25rem;
           font-weight: 600;
           color: #1e293b;
           margin-bottom: 1rem;
         }

         .summary-detail {
           display: flex;
           justify-content: space-between;
           padding: 0.5rem 0;
           border-bottom: 1px solid #e2e8f0;
         }

         .summary-label {
           color: #64748b;
           font-size: 0.875rem;
         }

         .summary-value {
           color: #1e293b;
           font-weight: 500;
         }

         .checkout-form {
           max-width: 800px;
           margin: 0 auto;
           background: white;
           padding: 2rem;
           border-radius: 1rem;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
         }

         .form-title {
           font-size: 1.5rem;
           font-weight: 600;
           color: #1e293b;
           margin-bottom: 2rem;
           text-align: center;
         }

         .form-section {
           display: grid;
           gap: 1rem;
           margin-bottom: 2rem;
         }

         .form-group {
           margin-bottom: 1.5rem;
         }

         .form-label {
           display: block;
           font-size: 0.875rem;
           font-weight: 500;
           color: #64748b;
           margin-bottom: 0.5rem;
         }

         .form-control {
           width: 100%;
           padding: 0.75rem 1rem;
           border: 1px solid #e2e8f0;
           border-radius: 0.5rem;
           background: #f8fafc;
           color: #1e293b;
           font-size: 0.875rem;
           transition: all 0.2s;
         }

         .form-control:focus {
           outline: none;
           border-color: #3b82f6;
           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
         }

         .form-select {
           appearance: none;
           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
           background-position: right 0.75rem center;
           background-repeat: no-repeat;
           background-size: 1rem;
           padding-right: 2.5rem;
         }

         .submit-button {
           display: inline-flex;
           align-items: center;
           justify-content: center;
           padding: 0.75rem 1.5rem;
           font-size: 0.875rem;
           font-weight: 500;
           color: white;
           background: linear-gradient(to right, #3b82f6, #2563eb);
           border: none;
           border-radius: 0.5rem;
           cursor: pointer;
           transition: all 0.2s;
           width: 100%;
           max-width: 300px;
           margin: 0 auto;
         }

         .submit-button:hover {
           transform: translateY(-1px);
           box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
         }

         @media (max-width: 768px) {
           .checkout-container {
             padding: 1rem;
           }

           .checkout-form {
             padding: 1.5rem;
           }
         }
       `}
     </style>

     <div className="checkout-container">
       <div className="checkout-form">
         <h1 className="form-title">Complete Your Order</h1>

         {p && (
           <div className="order-summary">
             <h2 className="summary-title">Order Summary</h2>
             <div className="summary-detail">
               <span className="summary-label">Package</span>
               <span className="summary-value">{p.packageName}</span>
             </div>
             <div className="summary-detail">
               <span className="summary-label">Price</span>
               <span className="summary-value">${p.price}</span>
             </div>
             <div className="summary-detail">
               <span className="summary-label">Credits</span>
               <span className="summary-value">{p.totalCredits} credits</span>
             </div>
           </div>
         )}

         <form onSubmit={handleOrder}>
           {/* Hidden inputs */}
           <input type="text" value={p._id} name="packageId" hidden />
           <input type="text" value={p.packageName} name="packageName" hidden />
           <input type="text" value={p.price} name="packagePrice" hidden />
           <input type="text" value="Pending" name="paymentStatus" hidden />
           <input type="text" value="Pending" name="orderStatus" hidden />
           <input type="number" value={p.totalCredits} name="totalCredits" hidden />
           <input type="text" hidden value={user?.email} name="customerEmail" />
           <input type="text" hidden name="orderDate" value={orderDate} />

           <div className="form-section">
             <div className="form-group">
               <label className="form-label">Full Name</label>
               {profile.map(
                 (e) =>
                   e.userEmail === user?.email && (
                     <input
                       required
                       type="text"
                       className="form-control"
                       name="customerName"
                       value={e.userName}
                       readOnly
                     />
                   )
               )}
             </div>

             <div className="form-group">
               <label className="form-label">Address</label>
               <input
                 required
                 type="text"
                 className="form-control"
                 name="address"
                 placeholder="Enter your address"
               />
             </div>

             <div className="form-group">
               <label className="form-label">City</label>
               <input
                 required
                 type="text"
                 className="form-control"
                 name="cityName"
                 placeholder="Enter your city"
               />
             </div>

             <div className="form-group">
               <label className="form-label">Country</label>
               <select
                 required
                 className="form-control form-select"
                 name="countryName"
                 value={selectedCountry}
                 onChange={(e) => setSelectedCountry(e.target.value)}
               >
                 <option value="" disabled>Select your country</option>
                 {countries.map((country) => (
                   <option key={country.name} value={country.name}>
                     {country.name}
                   </option>
                 ))}
               </select>
             </div>
           </div>
           <div className="text-center">
             <button type="submit" className="submit-button">
               Proceed to Payment
             </button>
           </div>
         </form>
       </div>
     </div>
   </>
 );
};

export default Package;