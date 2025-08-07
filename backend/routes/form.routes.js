import express from 'express';
import {
  submitForm,
  listReports,
  getReport,
} from '../controllers/form.controller.js';

const router = express.Router();

router.post('/submit', submitForm);
router.get('/', listReports); // list all reports
router.get('/report/:id', getReport); // fetch raw JSON

export default router;
