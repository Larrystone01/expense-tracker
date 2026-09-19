from typing import Annotated

from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models.expenses import Expense
from schemas.expenses import ExpenseCreate, ExpenseResponse, ExpenseUpdate
from sqlalchemy import select
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/expenses", tags=["Expenses"])


DatabaseSession = Annotated[Session, Depends(get_db)]


@router.get("", response_model=list[ExpenseResponse])
def get_expenses(database_session: DatabaseSession):
    statement = select(Expense).order_by(Expense.id.asc())
    expenses = database_session.scalars(statement).all()
    return expenses


@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int, database_session: DatabaseSession):
    expense = database_session.get(Expense, expense_id)
    if expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Expense Not Found"
        )
    return expense


@router.post("", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
def create_expense(
    expense: ExpenseCreate,
    database_session: DatabaseSession,
):
    new_expense = Expense(**expense.model_dump())
    database_session.add(new_expense)
    database_session.commit()
    database_session.refresh(new_expense)
    return new_expense


@router.patch("/{expense_id}")
def update_expense(expense_id: int, expense: ExpenseUpdate):
    expense_data = expense.model_dump(exclude_unset=True)
    return {"message": f"Expense {expense_id} updated", "data": expense_data}


@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    return {"message": f"Expense {expense_id} Deleted"}
