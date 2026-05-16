import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container py-5">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          minHeight: "70vh",
        }}
      >
        <div className="mb-4">
          <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
        </div>

        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "5rem",
          }}
        >
          404
        </h1>

        <h2 className="fw-bold mb-3">Page Not Found</h2>

        <p
          className="text-muted mb-4"
          style={{
            maxWidth: "500px",
          }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="d-flex gap-3">
          <Link to="/" className="btn btn-dark px-4">
            <i className="bi bi-house-fill me-2"></i>
            Return Home
          </Link>

          <Link to="/dashboard" className="btn btn-outline-dark px-4">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
