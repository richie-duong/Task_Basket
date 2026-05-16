import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h1 className="display-5 fw-bold mb-4">
            Everything on Your Plate,
            <br />
            All in One Basket
          </h1>

          <p className="text-muted mb-4">
            A smart task management platform built to help you plan, prioritize,
            and adapt in real time.
          </p>

          <div className="d-flex gap-3">
            <Link to="/register" className="btn btn-dark px-4 py-2">
              Get Started
            </Link>

            <button className="btn btn-outline-dark px-4 py-2">
              Learn More
            </button>
          </div>
        </div>

        <div className="col-lg-6 text-center">
          <div
            className="bg-light border rounded-4 d-flex align-items-center justify-content-center mx-auto"
            style={{
              height: "350px",
              maxWidth: "500px",
            }}
          >
            <h2 className="fw-bold text-dark">IMAGE</h2>
          </div>
        </div>
      </div>

      <section className="mb-5">
        <h2 className="text-center fw-bold mb-4">Included Features</h2>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-check2-square display-4"></i>
                </div>

                <h5 className="fw-bold">Smart Task Tracking</h5>

                <p className="text-muted small">
                  Organize your daily tasks with deadlines, categories, and
                  completion tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-speedometer2 display-4"></i>
                </div>

                <h5 className="fw-bold">Productivity Dashboard</h5>

                <p className="text-muted small">
                  Visualize overdue tasks, today’s priorities, and work progress
                  in real time.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-cloud-sun display-4"></i>
                </div>

                <h5 className="fw-bold">Weather Integration</h5>

                <p className="text-muted small">
                  Stay informed about weather conditions that may impact your
                  plans and schedule.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-phone display-4"></i>
                </div>

                <h5 className="fw-bold">Responsive Design</h5>

                <p className="text-muted small">
                  Access Task Basket seamlessly across desktop, tablet, and
                  mobile devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-center fw-bold mb-4">Frequently Asked Questions</h2>

        <div className="accordion" id="faqAccordion">
          <div className="accordion-item rounded-3 mb-3 border">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
              >
                What is Task Basket?
              </button>
            </h2>

            <div
              id="faq1"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Task Basket is a productivity platform that helps users manage
                tasks, deadlines, and schedules efficiently.
              </div>
            </div>
          </div>

          <div className="accordion-item rounded-3 mb-3 border">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
              >
                Is Task Basket free to use?
              </button>
            </h2>

            <div
              id="faq2"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes. Task Basket currently offers all core productivity features
                for free.
              </div>
            </div>
          </div>

          <div className="accordion-item rounded-3 mb-3 border">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
              >
                Can I access Task Basket on mobile?
              </button>
            </h2>

            <div
              id="faq3"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes. The platform is fully responsive and works across phones,
                tablets, and desktops.
              </div>
            </div>
          </div>

          <div className="accordion-item rounded-3 mb-3 border">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
              >
                Does Task Basket support reminders?
              </button>
            </h2>

            <div
              id="faq4"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Reminder and notification features are planned for future
                updates.
              </div>
            </div>
          </div>

          <div className="accordion-item rounded-3 border">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
              >
                How secure is my data?
              </button>
            </h2>

            <div
              id="faq5"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Task Basket uses Firebase Authentication and secure backend APIs
                to help protect user data.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
