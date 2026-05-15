import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* LOGO / BRAND */}
        <Link to="/" className="navbar-brand fw-bold">
          <i className="bi bi-basket2-fill me-2"></i>
          Task Basket
        </Link>

        {/* NAVBAR LINKS */}
        <div className="d-flex">
          <ul className="navbar-nav ms-auto flex-row gap-3">
            {/* OVERVIEW */}
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="bi bi-speedometer2 me-2"></i>
                Overview
              </Link>
            </li>

            {/* TASKS */}
            <li className="nav-item">
              <Link to="/tasks" className="nav-link">
                <i className="bi bi-check2-square me-2"></i>
                All Tasks
              </Link>
            </li>

            {/* SETTINGS */}
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className="bi bi-gear-fill me-2"></i>
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
