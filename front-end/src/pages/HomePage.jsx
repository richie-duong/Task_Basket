import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.jpeg";

export default function HomePage() {
  return (
    <>
      <title>Task Basket | Home</title>

      <div
        style={{
          paddingTop: "3rem",
          paddingBottom: "5rem",
        }}
      >
        <section
          className="rounded-5 overflow-hidden mx-3 mx-lg-4 mb-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.50)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "700px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-7 text-white">
                <h1
                  className="display-2 fw-bold mb-4"
                  style={{
                    lineHeight: "1.1",
                  }}
                >
                  Everything on Your Plate,
                  <br />
                  All in One Basket
                </h1>

                <p
                  className="lead mb-5 text-light"
                  style={{
                    maxWidth: "650px",
                    lineHeight: "1.8",
                  }}
                >
                  A smart productivity platform designed to help you organize
                  tasks, monitor deadlines, adapt to weather conditions, and
                  stay ahead of your schedule in real time.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/register"
                    className="btn btn-light btn-lg px-5 py-3 fw-semibold"
                  >
                    Get Started
                  </Link>

                  <div>
                    <Link
                      to="https://github.com/richie-duong/Task_Basket.git"
                      target="_black"
                      className="hero-button btn btn-outline-light btn-lg px-5 py-3 text-decoration-none"
                    >
                      View Repository
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-6 mb-3">Included Features</h2>

              <p
                className="text-muted mx-auto"
                style={{
                  maxWidth: "700px",
                }}
              >
                Task Basket combines productivity tools, real-time insights, and
                responsive design to help you stay organized and focused.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <i className="bi bi-check2-square display-4"></i>
                    </div>

                    <h5 className="fw-bold mb-3">Smart Task Tracking</h5>

                    <p className="text-muted small mb-0">
                      Organize daily responsibilities with deadlines, completion
                      tracking, and scheduling tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <i className="bi bi-speedometer2 display-4"></i>
                    </div>

                    <h5 className="fw-bold mb-3">Productivity Dashboard</h5>

                    <p className="text-muted small mb-0">
                      Visualize overdue tasks, priorities, progress, and
                      upcoming work in real time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <i className="bi bi-cloud-sun display-4"></i>
                    </div>

                    <h5 className="fw-bold mb-3">Weather Integration</h5>

                    <p className="text-muted small mb-0">
                      Stay informed about weather conditions and alerts that may
                      impact your plans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <i className="bi bi-phone display-4"></i>
                    </div>

                    <h5 className="fw-bold mb-3">Responsive Design</h5>

                    <p className="text-muted small mb-0">
                      Seamlessly access Task Basket across desktop, tablet, and
                      mobile devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-6 mb-3">
                Frequently Asked Questions
              </h2>

              <p
                className="text-muted mx-auto"
                style={{
                  maxWidth: "700px",
                }}
              >
                Learn more about Task Basket and how it helps users stay
                organized and productive.
              </p>
            </div>

            <div className="accordion" id="faqAccordion">
              {/* FAQ 1 */}
              <div className="accordion-item rounded-4 mb-3 border overflow-hidden">
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
                    Task Basket is a smart productivity platform designed to
                    help users organize tasks, manage deadlines, monitor
                    productivity, and adapt to real-world conditions such as
                    weather alerts and upcoming schedules.
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="accordion-item rounded-4 mb-3 border overflow-hidden">
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
                    Yes. Task Basket currently offers all core features
                    completely free, including task management, productivity
                    tracking, dashboard insights, weather integration, and user
                    authentication.
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="accordion-item rounded-4 mb-3 border overflow-hidden">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                  >
                    Can I access Task Basket on mobile devices?
                  </button>
                </h2>

                <div
                  id="faq3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Absolutely. Task Basket is fully responsive and optimized
                    for desktops, tablets, and mobile devices, allowing you to
                    stay productive anywhere.
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="accordion-item rounded-4 mb-3 border overflow-hidden">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq4"
                  >
                    How does the weather integration work?
                  </button>
                </h2>

                <div
                  id="faq4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Task Basket uses real-time weather data based on your saved
                    postal code to display current conditions, forecasts, and
                    severe weather alerts that may impact your daily plans or
                    scheduled tasks.
                  </div>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="accordion-item rounded-4 mb-3 border overflow-hidden">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq5"
                  >
                    Is my data secure?
                  </button>
                </h2>

                <div
                  id="faq5"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes. Task Basket uses Firebase Authentication for secure
                    user sign-in and protected backend APIs to help ensure user
                    data and account information remain secure.
                  </div>
                </div>
              </div>

              {/* FAQ 6 */}
              <div className="accordion-item rounded-4 border overflow-hidden">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq6"
                  >
                    Are more features planned for the future?
                  </button>
                </h2>

                <div
                  id="faq6"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes. Planned future updates include reminders and
                    notifications, intelligent task recommendations, traffic
                    integration, calendar syncing, and advanced productivity
                    analytics.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
