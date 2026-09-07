# Expense Tracker

A full-stack expense tracking application for recording, organizing, and monitoring personal expenses through a responsive dashboard.

The project uses a Next.js frontend and a FastAPI backend, with PostgreSQL for persistent data storage.

> The frontend UI is currently not connected to the backend API.

## Features

- Responsive expense dashboard
- Expense summary cards
- Monthly budget overview
- Spending analytics
- Recent expenses table
- Add-expense form
- Expense categories
- PostgreSQL database integration
- FastAPI-generated API documentation

## Technologies

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- Supabase

## Project structure

```text
expenses-tracker/
├── backend/
│   ├── models/
│   │   └── expenses.py
│   ├── routers/
│   │   └── expenses.py
│   ├── schemas/
│   │   └── expenses.py
│   ├── database.py
│   └── main.py
│
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting started

### Prerequisites

Ensure you have the following installed:

- Python 3.10 or later
- Node.js 20 or later
- npm
- PostgreSQL database or Supabase project

## Backend setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on macOS or Linux:

```bash
source .venv/bin/activate
```

On Windows:

```bash
.venv\Scripts\activate
```

Install the backend dependencies:

```bash
python -m pip install fastapi uvicorn sqlalchemy psycopg python-dotenv
```

Create a `.env` file inside `backend`:

```env
DATABASE_URL=your_postgresql_connection_string
```

Do not commit the `.env` file because it contains private database credentials.

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

Interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Frontend setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Planned API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/expenses` | Retrieve all expenses |
| `GET` | `/api/expenses/{expense_id}` | Retrieve one expense |
| `POST` | `/api/expenses` | Create an expense |
| `PATCH` | `/api/expenses/{expense_id}` | Update an expense |
| `DELETE` | `/api/expenses/{expense_id}` | Delete an expense |

## Current status

- [x] FastAPI project setup
- [x] PostgreSQL database connection
- [x] Expense database model
- [x] Pydantic schemas
- [x] Expense dashboard UI
- [x] Add-expense modal
- [ ] Connect the frontend to FastAPI
- [ ] Implement expense editing
- [ ] Implement expense deletion
- [ ] Add user authentication
- [ ] Add automated tests
- [ ] Deploy the frontend and backend

## Environment variables

Environment variables should never be committed to GitHub.

```env
DATABASE_URL=your_postgresql_connection_string
```

Use `.env.example` to document required variables without exposing their real values.

## Author

**Olanrewaju Akinwalire**

Frontend developer building responsive and reliable web applications.
