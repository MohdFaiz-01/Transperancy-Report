import { Report } from "../models/report.model.js";
import PDFDocument from "pdfkit";

export const submitForm = async (req, res) => {
  try {
    const reportData = req.body;

    const newReport = new Report(reportData);
    await newReport.save();

    res
      .status(201)
      .json({
        message: "Report submitted successfully.",
        reportId: newReport._id,
      });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const listReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ submittedAt: -1 });
    res.json({ reports });
  } catch (err) {
    console.error("List reports error:", err);
    res.status(500).json({ error: "Could not fetch reports." });
  }
};

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ error: "Report not found." });
    res.json({ report });
  } catch (err) {
    console.error("Get report error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

