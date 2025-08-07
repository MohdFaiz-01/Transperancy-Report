import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

const ReportsList = () => {
  const [reports, setReports] = useState([]);

  const backendUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/forms/`)
      .then((res) => res.json())
      .then((data) => setReports(data.reports))
      .catch((err) => console.error("Error fetching reports", err));
  }, []);

  const downloadEnhancedReport = async (reportId) => {
    try {
      const res = await fetch(
        `${backendUrl}/api/forms/report/${reportId}`
      );
      const { report } = await res.json();

      // Group answers by section and parent
      const sectionMap = {};
      report.answers.forEach((ans) => {
        const section = ans.section || "General";
        if (!sectionMap[section]) sectionMap[section] = [];
        sectionMap[section].push({ ...ans, followUps: [] });
      });

      Object.keys(sectionMap).forEach((section) => {
        const sectionAnswers = sectionMap[section];

        sectionAnswers.forEach((a) => {
          if (a.parent) {
            const parent = sectionAnswers.find(
              (p) => p.questionId === a.parent
            );
            if (parent) {
              parent.followUps = parent.followUps || [];
              parent.followUps.push(a);
            }
          }
        });

        sectionMap[section] = sectionAnswers.filter((a) => !a.parent);
      });

      const element = document.createElement("div");

      element.innerHTML = `
        <div style="padding: 40px; font-family: 'Segoe UI', sans-serif; color: #333; max-width: 800px; margin: auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #1a73e8; margin-bottom: 4px;">Altibbe Verified Report</h1>
            <p style="font-size: 14px; color: #666;">Empowering Product Transparency</p>
            <hr style="margin-top: 24px;" />
          </div>

          <!-- Product Overview -->
          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 20px; color: #444; border-bottom: 2px solid #eee; padding-bottom: 6px;">📦 Product Overview</h2>
            <table style="width: 100%; font-size: 14px; margin-top: 10px;">
              <tr><td style="padding: 6px;"><strong>Product Name</strong></td><td style="padding: 6px;">${
                report.productName || "-"
              }</td></tr>
              <tr><td style="padding: 6px;"><strong>Company Name</strong></td><td style="padding: 6px;">${
                report.companyName
              }</td></tr>
              <tr><td style="padding: 6px;"><strong>Submitted At</strong></td><td style="padding: 6px;">${new Date(
                report.submittedAt
              ).toLocaleString()}</td></tr>
            </table>
          </div>

          <!-- Sections -->
          ${Object.entries(sectionMap)
            .map(
              ([sectionTitle, questions]) => `
                <div style="margin-bottom: 30px; page-break-inside: avoid;">
                  <h3 style="font-size: 18px; color: #1a73e8; border-left: 4px solid #1a73e8; padding-left: 12px; margin-bottom: 16px;">${sectionTitle}</h3>
                  <ul style="list-style-type: none; padding-left: 0;">
                    ${questions
                      .map(
                        (q) => `
                          <li style="background: #f9f9f9; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 12px; page-break-inside: avoid;">
                            <div style="font-weight: 500; margin-bottom: 4px;">${
                              q.questionText
                            }</div>
                            <div style="color: #555;">${q.answer || "-"}</div>
                            ${
                              q.followUps?.length
                                ? `
                                  <ul style="margin-top: 10px; padding-left: 16px;">
                                    ${q.followUps
                                      .map(
                                        (f) => `
                                        <li style="margin-top: 4px;">
                                          <div style="font-weight: 500;">${f.questionText}</div>
                                          <div style="color: #555;">${f.answer}</div>
                                        </li>
                                      `
                                      )
                                      .join("")}
                                  </ul>
                                `
                                : ""
                            }
                          </li>
                        `
                      )
                      .join("")}
                  </ul>
                </div>
              `
            )
            .join("")}

          <!-- Footer -->
          <hr style="margin-top: 40px;" />
          <p style="text-align: center; font-size: 12px; color: #888; margin-top: 10px;">
            This report was generated by <strong>Altibbe</strong> to promote product ingredient and packaging transparency.
            Visit <a href="https://altibbe.com" target="_blank" style="color: #1a73e8; text-decoration: none;">altibbe.com</a> for more information.
          </p>
        </div>
      `;

      const opt = {
        margin: 0.5,
        filename: `${report.productName || "Altibbe"}_Verified_Report.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Failed to download enhanced report", err);
    }
  };

  const viewReport = async (reportId) => {
    try {
      const res = await fetch(
        `${backendUrl}/api/forms/report/${reportId}`
      );
      const { report } = await res.json();

      // Group answers by section and parent
      const sectionMap = {};
      report.answers.forEach((ans) => {
        const section = ans.section || "General";
        if (!sectionMap[section]) sectionMap[section] = [];
        sectionMap[section].push({ ...ans, followUps: [] });
      });

      Object.keys(sectionMap).forEach((section) => {
        const sectionAnswers = sectionMap[section];

        sectionAnswers.forEach((a) => {
          if (a.parent) {
            const parent = sectionAnswers.find(
              (p) => p.questionId === a.parent
            );
            if (parent) {
              parent.followUps = parent.followUps || [];
              parent.followUps.push(a);
            }
          }
        });

        sectionMap[section] = sectionAnswers.filter((a) => !a.parent);
      });

      // Open a new tab
      const reportWindow = window.open("", "_blank");

      // Set the HTML structure of the report
      reportWindow.document.write(`
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${report.productName} - Verified Report</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 20px; color: #333; }
            h1 { color: #1a73e8; }
            h2 { font-size: 20px; color: #444; }
            .section { margin-bottom: 30px; }
            .follow-up { margin-left: 20px; color: #555; }
            .header { text-align: center; margin-bottom: 40px; }
            .product-table { width: 100%; font-size: 14px; margin-top: 10px; }
            .product-table td { padding: 6px; }
            .section-title { font-size: 18px; color: #1a73e8; padding-left: 12px; margin-bottom: 16px; }
            .question-item { background: #f9f9f9; padding: 12px 16px; border: 1px solid #e0e0e0; margin-bottom: 12px; border-radius: 6px; }
            .question-text { font-weight: 500; margin-bottom: 4px; }
            .question-answer { color: #555; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Altibbe Verified Report</h1>
            <p style="font-size: 14px; color: #666;">Empowering Product Transparency</p>
            <hr />
          </div>

          <!-- Product Overview -->
          <h2>📦 Product Overview</h2>
          <table class="product-table">
            <tr><td><strong>Product Name</strong></td><td>${
              report.productName || "-"
            }</td></tr>
            <tr><td><strong>Company Name</strong></td><td>${
              report.companyName
            }</td></tr>
            <tr><td><strong>Submitted At</strong></td><td>${new Date(
              report.submittedAt
            ).toLocaleString()}</td></tr>
          </table>

          <!-- Sections -->
          ${Object.entries(sectionMap)
            .map(
              ([sectionTitle, questions]) => `
              <div class="section">
                <h3 class="section-title">${sectionTitle}</h3>
                <ul style="list-style-type: none; padding-left: 0;">
                  ${questions
                    .map(
                      (q, idx) => `
                    <li class="question-item">
                      <div class="question-text">${idx + 1}. ${
                        q.questionText
                      }</div>
                      <div class="question-answer">${q.answer || "-"}</div>
                      ${
                        q.followUps?.length
                          ? `
                        <ul class="follow-up">
                          ${q.followUps
                            .map(
                              (f) => `
                            <li><strong>• ${f.questionText}</strong>: ${f.answer}</li>
                          `
                            )
                            .join("")}
                        </ul>
                      `
                          : ""
                      }
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            `
            )
            .join("")}

            <!-- Footer -->
            <hr style="margin-top: 40px;" />
            <p style="text-align: center; font-size: 12px; color: #888; margin-top: 10px;">
              This report was generated by <strong>Altibbe</strong> to promote product ingredient and packaging transparency.
              Visit <a href="https://altibbe.com" target="_blank" style="color: #1a73e8; text-decoration: none;">altibbe.com</a> for more information.
            </p>
        </body>
      </html>
    `);

      // Close the document to ensure the content is rendered properly
      reportWindow.document.close();
    } catch (err) {
      console.error("Error opening the report:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Submitted Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Company Name</th>
              <th>Category</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, index) => (
              <tr key={r._id}>
                <td>{index + 1}</td>
                <td>{r.productName}</td>
                <td>{r.companyName}</td>
                <td>{r.productCategory}</td>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => viewReport(r._id)}
                    className="btn btn-sm btn-primary me-2"
                  >
                    View Report
                  </button>
                  <button
                    onClick={() => downloadEnhancedReport(r._id)}
                    className="btn btn-sm btn-success"
                  >
                    Download Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsList;
