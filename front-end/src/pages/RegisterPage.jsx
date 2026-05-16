import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");

      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Your account was created successfully!");
      navigate("/dashboard");

    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      setErrorMessage(error.message);
    }
  }


  return (
    <>
      <title>Task Basket | Register</title>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-basket2-fill display-3"></i>
                  </div>

                  <h1 className="fw-bold">Create Account</h1>

                  <p className="text-muted mb-0">Sign up for Task Basket</p>
                </div>

                {errorMessage ? (
                  <div className="alert alert-danger">{errorMessage}</div>
                ) : null}

                <form onSubmit={registerUser}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>

                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg w-100">
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Create Account
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Already have an account?
                    <Link
                      to="/login"
                      className="ms-2 text-decoration-none fw-semibold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
