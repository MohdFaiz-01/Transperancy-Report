import React, { useState } from "react";
import { formConfig } from "../config/formConfig";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";

const StepBullet = ({ index, label, active, completed, onClick }) => {
  return (
    <div
      className="d-flex flex-column align-items-center me-3"
      style={{ cursor: onClick ? "pointer" : "default", minWidth: 80 }}
      onClick={onClick}
    >
      <div
        className={`rounded-circle d-flex justify-content-center align-items-center ${
          completed ? "bg-success text-white" : active ? "border border-2 border-success text-success" : "border border-2 text-muted"
        }`}
        style={{
          width: 32,
          height: 32,
          fontSize: 12,
          position: "relative",
        }}
      >
        {completed ? <FaCheck size={12} /> : index + 1}
      </div>
      <div
        className="text-center mt-1"
        style={{
          fontSize: 12,
          fontWeight: active ? 600 : 500,
          color: active ? "#2c7a7b" : "#6c757d",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default function MultiStepForm() {
  const [step, setStep] = useState(0); // 0 = category, 1..n = sections, last = preview
  const [category, setCategory] = useState("");
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const getVisibleQuestions = () => {
    const questions = formConfig.categories[category] || [];

    return questions.filter((q) => {
      if (!q.showIf) return true;
      const key = Object.keys(q.showIf)[0];
      const expected = q.showIf[key];
      if (!answers[key]) return false;
      return expected === "*" ? answers[key] !== "" : answers[key] === expected;
    });
  };

  const getSections = () => {
    const visible = getVisibleQuestions();
    const unique = [...new Set(visible.map((q) => q.section || "General"))];
    return unique;
  };

  const sections = getSections(); // ["Basic Info","Ingredients","Packaging"]
  const previewStepIndex = sections.length + 1; // last
  // const totalSteps = sections.length + 2; // including category and preview
  const isPreview = step === previewStepIndex;
  const visibleQuestions = getVisibleQuestions();
  const currentSection = sections[step - 1] || "";

  // Validation: require that all questions in current section are answered (non-empty)
  const currentSectionQuestions = visibleQuestions.filter((q) => q.section === currentSection);
  const isCurrentSectionComplete =
    currentSection === ""
      ? !!category
      : currentSectionQuestions.every((q) => {
          const val = answers[q.id];
          return val !== undefined && val !== "";
        });

  const canJumpTo = (targetStep) => {
    if (targetStep === 0) return true;
    if (targetStep === previewStepIndex) {
      // allow preview only if all sections completed
      return sections.every((sec) =>
        visibleQuestions
          .filter((q) => q.section === sec)
          .every((q) => answers[q.id] !== undefined && answers[q.id] !== "")
      );
    }
    // for intermediate section: all previous sections must be complete
    if (targetStep > 0 && targetStep <= sections.length) {
      for (let i = 1; i < targetStep; i++) {
        const sec = sections[i - 1];
        const qs = visibleQuestions.filter((q) => q.section === sec);
        if (!qs.every((q) => answers[q.id] !== undefined && answers[q.id] !== "")) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    const formData = {
      productCategory: category,
      productName:
        answers["food_product_name"] ||
        answers["clothing_product_name"] ||
        answers["electronics_product_name"] ||
        "",
      companyName: answers["company_name"] || "",
      answers: visibleQuestions.map((q) => ({
        questionId: q.id,
        questionText: q.question,
        answer: answers[q.id] || "",
        section: q.section || "General",
        parent: q.showIf ? Object.keys(q.showIf)[0] : null,
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Report submitted successfully!");
        setAnswers({});
        setStep(0);
        setCategory("");
      } else {
        alert("Submission failed: " + data.error);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Network Error");
    }
  };

  const renderQuestion = (q) => {
    const value = answers[q.id] || "";

    switch (q.type) {
      case "text":
        return (
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
          />
        );
      case "radio":
        return (
          <div className="d-flex gap-3 flex-wrap">
            {q.options.map((opt) => (
              <div className="form-check" key={opt}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  id={`${q.id}-${opt}`}
                />
                <label className="form-check-label" htmlFor={`${q.id}-${opt}`}>
                  {opt}
                </label>
              </div>
            ))}
          </div>
        );
      case "select":
        return (
          <select
            className="form-select"
            value={value}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
          >
            <option value="">-- Select --</option>
            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className="preview-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Preview Your Answers</h4>
          <span className="badge bg-info text-dark">Before submission</span>
        </div>
        {sections.map((sec, idx) => {
          const sectionQuestions = visibleQuestions.filter((q) => q.section === sec);
          if (sectionQuestions.length === 0) return null;
          return (
            <div className="mb-4" key={sec}>
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="text-primary">{sec}</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setStep(idx + 1)}
                >
                  Edit
                </button>
              </div>
              <ul className="list-group">
                {sectionQuestions.map((q) => (
                  <li className="list-group-item" key={q.id}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{q.question}</strong>
                        <div className="text-muted">{answers[q.id] || "-"}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const stepLabels = ["Category", ...sections, "Preview"];

  return (
    <div className="container my-5 p-4 border rounded bg-white shadow">
      <h2 className="mb-4 text-center">Product Transparency Form</h2>

      {/* Stepper */}
      <div className="d-flex align-items-start mb-4 flex-wrap">
        {stepLabels.map((label, idx) => {
          const isCompleted = idx < step;
          const isActive = idx === step;
          return (
            <React.Fragment key={label}>
              <StepBullet
                index={idx}
                label={label}
                active={isActive}
                completed={isCompleted}
                onClick={() => {
                  if (canJumpTo(idx)) setStep(idx);
                }}
              />
              {idx !== stepLabels.length - 1 && (
                <div
                  style={{
                    flex: "1 1 auto",
                    height: 2,
                    background:
                      idx < step
                        ? "linear-gradient(90deg, #28a745 0%, #28a745 100%)"
                        : "#e9ecef",
                    marginTop: 15,
                    marginRight: 12,
                    marginLeft: 4,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {step === 0 && (
          <div className="mb-4">
            <label className="form-label">Select Product Category:</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setAnswers({});
              }}
            >
              <option value="">-- Choose Category --</option>
              {Object.keys(formConfig.categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {step > 0 && !isPreview && (
          <>
            <div className="mb-2">
              <span className="badge bg-secondary">{currentSection}</span>
            </div>
            {visibleQuestions
              .filter((q) => q.section === currentSection)
              .map((q) => (
                <div className="mb-3" key={q.id}>
                  <label className="form-label">{q.question}</label>
                  {renderQuestion(q)}
                </div>
              ))}
          </>
        )}

        {isPreview && renderPreview()}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        {step > 0 && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            <FaArrowLeft /> Back
          </button>
        )}

        <div>
          {step < previewStepIndex && (
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                if (step === 0 && !category) return;
                if (step > 0 && !isCurrentSectionComplete) return;
                setStep((s) => s + 1);
              }}
              disabled={step === 0 ? !category : !isCurrentSectionComplete}
            >
              Next <FaArrowRight />
            </button>
          )}
          {isPreview && (
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
