import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getAuthHeaders from "../utils/getAuthHeaders";

export default function SettingsPage() {

  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const config = await getAuthHeaders();

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/settings`,
          config,
        );
        setPostalCode(response.data.postalCode || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);


  async function saveSettings() {
    try {
      const config = await getAuthHeaders();
      await axios.put(
        `${import.meta.env.VITE_API_URL}/settings`,
        {
          postalCode,
        },
        config,
      );
      alert("Postal code updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );
  }


  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="fw-bold">Settings</h1>

        <p className="text-muted mb-0">
          Configure your location preferences for weather and traffic updates.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="mb-4">
                <h4 className="fw-bold">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Location Settings
                </h4>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Postal Code</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your postal code"
                  value={postalCode}
                  onChange={(event) => {
                    setPostalCode(event.target.value);
                  }}
                />

                <div className="form-text">
                  Used to retrieve local weather conditions and traffic data.
                </div>
              </div>

              <button
                className="btn btn-dark w-100 py-3"
                onClick={saveSettings}
              >
                <i className="bi bi-floppy-fill me-2"></i>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
