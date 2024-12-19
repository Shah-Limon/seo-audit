import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../components/Shared/Loading";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [userMail] = useAuthState(auth);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (userMail) {
      navigate(from, { replace: true });
      window.location.reload();
    }
  }, [userMail, from, navigate]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const errorMessages = {
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled': 'This user has been disabled.',
    'auth/too-many-requests': 'Too many requests. Please try again later.',
    'auth/invalid-login-credentials': 'Invalid login credentials. Please check your email and password.',
    'default': 'An unexpected error occurred. Please try again.'
  };

  const getErrorMessage = (error) => {
    if (!error) return null;
    return errorMessages[error.code] || errorMessages['default'];
  };

  if (loading || gLoading) {
    return <Loading />;
  }

  const signInError = getErrorMessage(error) || getErrorMessage(gError);

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
                  }}>Welcome back</h2>
                  <p className="text-muted">Enter your account details below to sign in</p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
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
                    <div className="alert alert-danger py-2 text-center" role="alert">
                      <small>{signInError}</small>
                    </div>
                  )}

                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/reset" className="text-decoration-none" style={{ color: '#4a90e2' }}>
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3 py-3"
                    style={{
                      borderRadius: '10px',
                      background: '#4a90e2',
                      border: 'none',
                      fontWeight: '500',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Login Now
                  </button>

                

                  <div className="text-center">
                    <span className="text-muted">Don't have an account? </span>
                    <Link 
                      to="/register" 
                      className="text-decoration-none"
                      style={{ color: '#4a90e2' }}
                    >
                      Create an account
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

export default Login;