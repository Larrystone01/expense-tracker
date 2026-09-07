from database import engine
from fastapi import FastAPI
from models import Expense
from routers.expenses import router as expense_router

Expense.metadata.create_all(bind=engine)

app = FastAPI(title="Expense Tracker API")

app = FastAPI()

app.include_router(expense_router)
