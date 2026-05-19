import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import logo from "../assets/logo.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid email or password.");
    }
  }

  return (
    <>
      <title>Task Basket | Login</title>

      <div
        className="
          min-vh-100
          d-flex
          align-items-center
        "
        style={{
          background:
            "linear-gradient(135deg, #eff6ff 0%, #f8fafc 45%, #fff7ed 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div
                className="
                  card
                  border-0
                  shadow-lg
                  rounded-5
                  overflow-hidden
                "
                style={{
                  backdropFilter: "blur(16px)",

                  backgroundColor: "rgba(255,255,255,0.92)",
                }}
              >
                <div
                  style={{
                    height: "10px",

                    background:
                      "linear-gradient(90deg, #2563eb, #38bdf8, #f59e0b)",
                  }}
                ></div>

                <div className="card-body p-5">
                  <div className="text-center mb-5">
                    <div className="mb-4">
                      <div
                        className="
                          rounded-circle
                          d-inline-flex
                          align-items-center
                          justify-content-center
                        "
                        style={{
                          width: "110px",
                          height: "110px",
                          background:
                            "linear-gradient(135deg, #dbeafe, #eff6ff)",
                        }}
                      >
                        <img
                          src={logo}
                          alt="Task Basket Logo"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                            color: "#2563eb",
                          }}
                        />
                      </div>
                    </div>

                    <h1 className="fw-bold mb-3">Ready To Continue?</h1>

                    <p
                      className="text-muted mb-0"
                      style={{
                        lineHeight: "1.8",
                      }}
                    >
                      Login to Task Basket to continue organizing your
                      productivity, schedules, and tasks.
                    </p>
                  </div>

                  {errorMessage ? (
                    <div className="alert alert-danger rounded-4">
                      {errorMessage}
                    </div>
                  ) : null}

                  <form onSubmit={loginUser}>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Email Address
                      </label>

                      <div className="input-group input-group-lg">
                        <span
                          className="
                            input-group-text
                            bg-white
                            border-end-0
                          "
                        >
                          <i className="bi bi-envelope-fill text-primary"></i>
                        </span>

                        <input
                          type="email"
                          className="
                            form-control
                            border-start-0
                          "
                          placeholder="Enter your email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Password</label>

                      <div className="input-group input-group-lg">
                        <span
                          className="
                            input-group-text
                            bg-white
                            border-end-0
                          "
                        >
                          <i className="bi bi-lock-fill text-warning"></i>
                        </span>

                        <input
                          type="password"
                          className="
                            form-control
                            border-start-0
                          "
                          placeholder="Enter your password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="
                        btn
                        btn-primary
                        btn-lg
                        w-100
                        rounded-4
                        py-3
                        fw-semibold
                        shadow-sm
                      "
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </button>
                  </form>

                  <div className="text-center mt-5">
                    <p className="mb-0 text-muted">
                      Don't have an account?
                      <Link
                        to="/register"
                        className="
                          ms-2
                          text-decoration-none
                          fw-semibold
                          text-primary
                        "
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
