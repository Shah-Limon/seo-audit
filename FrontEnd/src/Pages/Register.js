import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import auth from "../firebase.init";
import Loading from "../components/Shared/Loading";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(data.email, data.password);

      if (userCredential.user) {
        await updateProfile({ displayName: data.name });

        const defaultImgUrl = "https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2Fpng-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png?alt=media&token=277b1fbd-04d1-4c8a-a749-f4c3d6c6d282";

        const userUpdate = {
          userName: data.name,
          userEmail: data.email,
          profileStatus: "Approved",
          profileImg: defaultImgUrl,
        };

        const url = `http://localhost:5000/add-profile-info`;
        await axios.post(url, userUpdate, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        navigate("/admin/dashboard");
        window.location.href = "/admin/dashboard";
      } else {
        throw new Error("User creation failed");
      }
    } catch (error) {
      console.error("Error during signup or data submission:", error);
    }
  };

  useEffect(() => {
    if (user || gUser) {
      navigate("/admin/dashboard");
    }
  }, [user, gUser, navigate]);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/operation-not-allowed":
        return "Email/Password accounts are not enabled.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      case "auth/popup-closed-by-user":
        return "The popup has been closed before completing the sign in.";
      case "auth/cancelled-popup-request":
        return "Popup request was canceled. Please try again.";
      case "auth/invalid-login-credentials":
        return "Invalid login credentials. Please check your email and password.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  if (loading || gLoading || updating) {
    return <Loading />;
  }

  const signInError = error || gError || updateError ?
    getErrorMessage(error?.code || gError?.code || updateError?.code) : null;

  return (
    <div className="account-section bg-light min-vh-100 py-5" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-9">
            <div className="card shadow-lg border-0" style={{
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.98)'
            }}>
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2" style={{
                    color: '#2c3e50',
                    fontSize: '2rem'
                  }}>Create an account</h2>
                  <p className="text-muted">Enter your information below to create your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-semibold">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
                      style={{
                        borderRadius: '10px',
                        padding: '12px 16px',
                        border: '1.5px solid #dee2e6',
                        transition: 'all 0.3s ease'
                      }}
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is Required",
                        },
                      })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                      style={{
                        borderRadius: '10px',
                        padding: '12px 16px',
                        border: '1.5px solid #dee2e6',
                        transition: 'all 0.3s ease'
                      }}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is Required",
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid Email",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                      style={{
                        borderRadius: '10px',
                        padding: '12px 16px',
                        border: '1.5px solid #dee2e6',
                        transition: 'all 0.3s ease'
                      }}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is Required",
                        },
                        minLength: {
                          value: 6,
                          message: "Must be 6 characters or longer",
                        },
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                  </div>

                  {signInError && (
                    <div className="alert alert-danger py-2 text-center mb-4" role="alert">
                      {signInError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-4 py-3"
                    style={{
                      borderRadius: '10px',
                      background: '#4a90e2',
                      border: 'none',
                      fontWeight: '500',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Create Account
                  </button>
                  <div className="text-center">
                    <span className="text-muted">Already have an account? </span>
                    <Link
                      to="/login"
                      className="text-decoration-none"
                      style={{ color: '#4a90e2' }}
                    >
                      Sign in now
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;