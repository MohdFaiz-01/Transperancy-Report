import { useState } from "react";
import MultiStepForm from "./components/MultiStepForm";
import ReportsList from "./components/ReportsList";

export default function App() {
  const [view, setView] = useState("form");

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Altibbe Product Transparency</h1>
        <div>
          <button
            className={`btn me-2 ${view === "form" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("form")}
          >
            Fill Transparency Form
          </button>
          <button
            className={`btn ${view === "reports" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("reports")}
          >
            View / Download Reports
          </button>
        </div>
      </div>

      {view === "form" && <MultiStepForm />}
      {view === "reports" && <ReportsList />}
    </div>
  );
}
