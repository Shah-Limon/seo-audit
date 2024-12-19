import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import MyAllLeads from "./MyAllLeads";
import { CirclePlusIcon, ListCheck } from "lucide-react";

const UserDashboard = () => {
  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);
  const [myLeads, setMyLeads] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/lists/`)
      .then((res) => res.json())
      .then((info) => setLists(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => {
        const filteredLeads = info.filter(
          (lead) => lead.leadAdded === user?.email
        );
        setMyLeads(filteredLeads);
      });
  }, [user]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard</h2>

      {profile.filter((pro) => pro.userEmail === user?.email).length === 1 ? (
        <>

          <div className="card border-0" style={{
            padding: '3rem 2rem',
            marginBottom: '2rem',
            borderRadius: '30px',
            background: '#ffffff',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="position-absolute" style={{
              top: '0',
              left: '0',
              width: '100%',
              height: '6px',
              background: 'linear-gradient(90deg, #4a90e2, #63b3ed, #76c7f3, #63b3ed, #4a90e2)',
              backgroundSize: '200% 100%',
              animation: 'gradient 3s linear infinite'
            }}></div>

            <div className="text-center">
              <div className="mb-3" style={{
                fontSize: '1.1rem',
                color: '#4a5568',
                fontWeight: '500'
              }}>
                Ready to expand your network?
              </div>
              <Link
                to="/find-leads"
                className="btn btn-lg position-relative d-inline-flex align-items-center justify-content-center"
                style={{
                  padding: '1.2rem 3.5rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  borderRadius: '15px',
                  color: 'white',
                  background: '#4a90e2',
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(74, 144, 226, 0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <i className="fas fa-rocket mb-1" style={{ fontSize: '1.4rem' }}></i>
                  <span>Find Leads</span>
                </div>
              </Link>

              <div className="mt-3">
                <small className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Discover high-quality leads in seconds
                </small>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <img
                    src="/assets/img/icon/dollar.png"
                    alt="Credits"
                    width={40}
                    className="mb-3"
                  />
                  <h5>
                    {profile.map(
                      (pro) =>
                        pro.userEmail === user?.email && <>{pro.userPoint}</>
                    )}
                  </h5>
                  <p>Available Credits</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <ListCheck size={50} className="mb-3" />
                  <h5>
                    {lists.filter(list => list.listCreatedBy === user?.email).length === 0
                      ? "No list created yet"
                      : `My List: ${lists.filter(list => list.listCreatedBy === user?.email).length}`}
                  </h5>
                  <p>Created Lists</p>
                </div>
              </div>
            </div>


            <div className="col-lg-3 col-md-6">
              <Link to="/my-leads" className="text-decoration-none">
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body">
                    <img
                      src="/assets/img/icon/h02-feature-2.svg"
                      alt="Leads"
                      width={40}
                      className="mb-3"
                    />
                    <h5>{myLeads.filter(lead => lead.leadAdded === user?.email).length}</h5>
                    <p>My Collected Leads</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-lg-3 col-md-6">
              <Link to="/deposit" className="text-decoration-none">
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F8829889.png?alt=media&token=7ce5142f-5040-4730-a791-28a21e9394bf"
                      alt="Credits"
                      width={40}
                      className="mb-3"
                    />
                    <h5>Buy Credit</h5>
                    <p>Want to buy Credit</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <MyAllLeads />
        </>
      ) : (
        <div className="card shadow text-center p-4" style={{
          borderRadius: '20px',
          height: '100vh',
          background: '#fff',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          margin: '2rem 0'
        }}>
          <Link to="/update-profile" className="btn btn-warning btn-lg" style={{
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0 5px 10px rgba(255, 193, 7, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            Please Update Your Profile First
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
