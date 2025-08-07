# Altibbe Verified Transparency Report

**Altibbe Verified Transparency Report** is a full-stack product transparency reporting tool designed for manufacturers to submit detailed product information and generate professional reports for consumers, regulators, or internal records. The platform emphasizes trust and clarity in the supply chain.

## 🛠️ Setup Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/MohdFaiz-01/Transperancy-Report.git
    cd altibbe-transparency
    ```

2. **Install dependencies**

    **Backend:**

    ```bash
    cd backend
    npm install
    ```

    **Frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

3. **Environment setup**

    Create a `.env` file in the `backend` folder:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    ```

4. **Run the app**

    **Backend:**

    ```bash
    node app.js
    ```

    **Frontend:**

    ```bash
    npm run dev
    ```

---

## ✨ Features

- Dynamic multi-step form with conditional follow-up questions  
- JSON-based config (`formConfig.js`) for flexible form structure  
- Progress tracker with bullet-point UI  
- “Edit section” in Preview before submission  
- Stores submitted reports in MongoDB  
- View list of reports & download professional PDF reports  
- Reports styled with headers, sections, submission date, and responses  
- Responsive design using Bootstrap and clean UX

## 📌 Sample Product Entry

To try it out:
- Choose a product category
- Answer all main and follow-up questions
- Review in preview section
- Submit and download the PDF report

## Conclusion
This project was a great experience that uses smart design with transparency. I used AI tools like ChatGPT to help improve the software’s structure, simplify complex parts, and create clear, professional reports in both web and PDF formats. Instead of hardcoding everything, I used a flexible JSON system to allow easy changes and growth. The design focused on modularity, keeping the frontend adaptable and the backend strong.
The reporting system was built to match real-world compliance needs, ensuring both direct and follow-up information was captured. The "Preview + Edit" feature adds ease of use. The final product helps manufacturers build trust with their customers through clear, reliable reporting.

## Suggestions?
Let's connect - faizuddin2296@gmail.com
