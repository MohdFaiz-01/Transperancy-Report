import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  section: {type: String},
  parent: { type: String, default: null } // parent questionId if it's a follow-up
});

const reportSchema = new mongoose.Schema({
  productCategory: { type: String, required: true },
  productName: { type: String, default: "" },
  companyName: {type: String, default: ""},
  answers: [answerSchema],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// index commonly filtered fields
reportSchema.index({ productCategory: 1 });
reportSchema.index({ "answers.questionId": 1, "answers.answer": 1 });

export const Report = mongoose.model('Report', reportSchema);
