from datetime import date as Date
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ExpenseCreate(BaseModel):
    title: str = Field(min_length=2, max_length=100)
    amount: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    category: str = Field(min_length=2, max_length=50)
    date: Date
    description: str | None = Field(default=None, max_length=250)


class ExpenseUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=100)
    amount: float | None = Field(default=None, gt=0)
    category: str | None = Field(default=None, min_length=2, max_length=50)
    date: Date | None = None
    description: str | None = Field(default=None, max_length=250)


class ExpenseResponse(ExpenseCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
