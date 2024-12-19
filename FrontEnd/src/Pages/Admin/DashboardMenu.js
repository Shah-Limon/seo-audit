import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const DashboardMenu = () => {
  const [user] = useAuthState(auth);

  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <section className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-primary">Dashboard</h1>
          {user && (
            <button className="btn btn-danger btn-sm"
              onClick={handleSignout}>
              Sign Out
            </button>
          )}
        </div>

        <div className="row g-4">
          {[
            {
              icon: "https://cdn-icons-png.freepik.com/512/8293/8293546.png",
              title: "Audit Request",
              link: "/admin/audit-management",
            },
            {
              icon: "https://cdn-icons-png.freepik.com/512/8004/8004210.png",
              title: "Manage Users",
              link: "/admin/manage-users/",
            },
            {
              icon: "https://cdn-icons-png.freepik.com/512/11983/11983453.png",
              title: "Contact Message",
              link: "/admin/message-management/",
            },

          ].map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    width={75}
                    height={75}
                    className="mb-3"
                  />
                  <h5 className="card-title">
                    <Link to={item.link} className="stretched-link text-decoration-none">
                      {item.title}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardMenu;
