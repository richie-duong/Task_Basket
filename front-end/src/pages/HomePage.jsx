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
          className="rounded-5 overflow-hidden mx-3 mx-lg-4 mb-5 shadow-lg"
          style={{
            backgroundImage: `linear-gradient(rgba(15,23,42,0.25), rgba(30,41,59,0.68)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "720px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-7 text-white">
                <span
                  className="badge rounded-pill px-4 py-2 mb-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    fontSize: "0.95rem",
                  }}
                >
                  Smart Productivity Platform
                </span>

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
                  Organize tasks, monitor deadlines, adapt to weather
                  conditions, and stay productive with a smarter dashboard
                  experience built for real-world planning.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/register"
                    className="btn btn-warning btn-lg px-5 py-3 fw-semibold shadow-sm"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="https://github.com/richie-duong/Task_Basket.git"
                    target="_blank"
                    className="hero-button btn btn-outline-light btn-lg px-5 py-3 text-decoration-none"
                  >
                    View Repository
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-5"
          style={{
            background: "linear-gradient(to bottom, #f8fafc, #ffffff)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-primary fw-semibold text-uppercase small">
                Included Features
              </span>

              <h2 className="fw-bold display-5 mt-2 mb-3">
                Built For Smarter Productivity
              </h2>

              <p
                className="text-muted mx-auto"
                style={{
                  maxWidth: "720px",
                  lineHeight: "1.8",
                }}
              >
                Task Basket combines productivity tools, contextual insights,
                and responsive experiences to help users stay organized and
                ahead of their schedule.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 h-100 shadow-sm"
                  style={{
                    transition: "0.25s ease",
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#dbeafe",
                        }}
                      >
                        <i className="bi bi-check2-square display-5 text-primary"></i>
                      </div>
                    </div>

                    <h5 className="fw-bold mb-3">Smart Task Tracking</h5>

                    <p
                      className="text-muted mb-0"
                      style={{
                        lineHeight: "1.7",
                      }}
                    >
                      Organize responsibilities with deadlines, scheduling, and
                      completion tracking tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 h-100 shadow-sm"
                  style={{
                    transition: "0.25s ease",
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#dcfce7",
                        }}
                      >
                        <i className="bi bi-speedometer2 display-5 text-success"></i>
                      </div>
                    </div>

                    <h5 className="fw-bold mb-3">Productivity Dashboard</h5>

                    <p
                      className="text-muted mb-0"
                      style={{
                        lineHeight: "1.7",
                      }}
                    >
                      Visualize overdue tasks, priorities, progress, and work
                      insights in real time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 h-100 shadow-sm"
                  style={{
                    transition: "0.25s ease",
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#fef3c7",
                        }}
                      >
                        <i className="bi bi-cloud-sun display-5 text-warning"></i>
                      </div>
                    </div>

                    <h5 className="fw-bold mb-3">Weather Integration</h5>

                    <p
                      className="text-muted mb-0"
                      style={{
                        lineHeight: "1.7",
                      }}
                    >
                      Stay informed about weather conditions and severe alerts
                      that may impact plans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 h-100 shadow-sm"
                  style={{
                    transition: "0.25s ease",
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#cffafe",
                        }}
                      >
                        <i className="bi bi-phone display-5 text-info"></i>
                      </div>
                    </div>

                    <h5 className="fw-bold mb-3">Responsive Design</h5>

                    <p
                      className="text-muted mb-0"
                      style={{
                        lineHeight: "1.7",
                      }}
                    >
                      Access Task Basket seamlessly across desktop, tablet, and
                      mobile devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-5"
          style={{
            backgroundColor: "#f8fbff",
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-primary fw-semibold text-uppercase small">
                Frequently Asked Questions
              </span>

              <h2 className="fw-bold display-5 mt-2 mb-3">
                Everything You Need To Know
              </h2>

              <p
                className="text-muted mx-auto"
                style={{
                  maxWidth: "720px",
                  lineHeight: "1.8",
                }}
              >
                Learn more about Task Basket and how it helps users stay
                organized, productive, and informed throughout their day.
              </p>
            </div>

            <div className="accordion" id="faqAccordion">
              <div className="accordion-item rounded-4 mb-3 border overflow-hidden shadow-sm">
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

              <div className="accordion-item rounded-4 mb-3 border overflow-hidden shadow-sm">
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

              <div className="accordion-item rounded-4 mb-3 border overflow-hidden shadow-sm">
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
                    for desktops, tablets, and mobile devices.
                  </div>
                </div>
              </div>

              <div className="accordion-item rounded-4 mb-3 border overflow-hidden shadow-sm">
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
                    postal code to display forecasts, current conditions, and
                    severe weather alerts that may impact your tasks.
                  </div>
                </div>
              </div>

              <div className="accordion-item rounded-4 mb-3 border overflow-hidden shadow-sm">
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
                    Yes. Task Basket uses Firebase Authentication and protected
                    backend APIs to help ensure user accounts and personal data
                    remain secure.
                  </div>
                </div>
              </div>

              <div className="accordion-item rounded-4 border overflow-hidden shadow-sm">
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
                    Yes. Planned future updates include reminders,
                    notifications, traffic integration, intelligent task
                    recommendations, and advanced productivity analytics.
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
