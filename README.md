# Wealth Management Query Nexus Agent

A modern, AI-powered wealth management analytics platform that enables natural language querying across client portfolios, transactions, and relationship manager data. Built with FastAPI, LangChain, MongoDB, MySQL, and a React + Vite frontend.

---

## 🚀 Features

- **Natural Language Querying:** Ask business questions in plain English and get structured, insightful responses.
- **AI-Powered Analytics:** Uses OpenAI and LangChain for query understanding and response generation.
- **Multi-Database Support:** Integrates MongoDB (client/portfolio data) and MySQL (transactions/holdings).
- **Rich Visualizations:** Returns text, tables, and charts (bar, pie, line) for business intelligence.
- **Modular & Extensible:** Easily add new data sources or analytics modules.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn-ui
- **Backend:** FastAPI, LangChain, OpenAI, MongoDB, MySQL
- **AI/ML:** OpenAI GPT (via LangChain)
- **Visualization:** Chart.js (or similar, via frontend)
- **Other:** Python 3.10+, Node.js 18+

---

## ⚡ Quick Start

### 1. Clone the Repository

```sh
git clone <YOUR_GIT_URL>
cd query-nexus-agent-main
```

### 2. Backend Setup

```sh
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
cp .env.example .env   # Or edit .env directly with your keys and DB info
```

- Make sure MongoDB and MySQL are running and accessible.
- Add your OpenAI API key and DB credentials in `backend/.env`.

**Start the backend:**
```sh
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
- API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend Setup

```sh
cd ../
npm install
npm run dev
```
- App runs at [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 How It Works

- **User** enters a business question (e.g., "Show me the top 5 portfolios by value").
- **Backend** classifies the query, fetches relevant data from MongoDB/MySQL, and uses LangChain + OpenAI to generate a structured response.
- **Frontend** displays the answer as text, tables, and charts.

---

## 📂 Project Structure

```
query-nexus-agent-main/
│
├── backend/
│   ├── main.py
│   ├── langchain_service/
│   │   └── query_processor.py
│   ├── models/
│   ├── requirements.txt
│   └── .env
│
├── src/           # Frontend React app
│   ├── App.tsx
│   ├── components/
│   └── ...
├── package.json
└── README.md
```

---

## 🌐 Deployment

- Deploy backend (FastAPI) to any cloud (Azure, AWS, GCP, etc.).
- Deploy frontend (Vite/React) to Vercel, Netlify, or your preferred host.
- Set environment variables for production in `.env`.

---

## 🙋 About Me

**Sai Hemanth**  
Aspiring software engineer passionate about AI, data engineering, and building scalable business solutions.  
[LinkedIn](https://www.linkedin.com/) | [GitHub](https://github.com/)

---

## 📞 Contact

Feel free to reach out for any queries or collaboration opportunities!

---

**Thank you for reviewing my project!**