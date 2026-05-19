import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import logo from "../assets/logo-white.svg";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      await signOut(auth);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link
          to="/"
          className="
            navbar-brand
            fw-bold
            d-flex
            align-items-center
            gap-2
            text-white
          "
        >
          <img
            src={logo}
            alt="Task Basket Logo"
            style={{
              width: "38px",
              height: "38px",
              objectFit: "contain",

              // THIS controls SVG color
              color: "white",
            }}
          />
          Task Basket
        </Link>

        {currentUser ? (
          <div className="d-flex align-items-center gap-4">
            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Overview
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/tasks" className="nav-link">
                  <i className="bi bi-check2-square me-2"></i>
                  All Tasks
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <i className="bi bi-gear-fill me-2"></i>
                  Settings
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <span className="text-light small">
                <i className="bi bi-person-circle me-2"></i>

                {currentUser.email}
              </span>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={logoutUser}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <Link to="/login" className="btn btn-outline-light btn-sm">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </Link>

            <Link to="/register" className="btn btn-light btn-sm">
              <i className="bi bi-person-plus-fill me-2"></i>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
