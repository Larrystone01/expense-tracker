from database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Expense
from routers.expenses import router as expense_router

Expense.metadata.create_all(bind=engine)

app = FastAPI(title="Expense Tracker API")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials="True",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expense_router)
