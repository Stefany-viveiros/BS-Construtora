from pydantic import BaseModel, EmailStr
from datetime import datetime


class OrcamentoCreate(BaseModel):
    nome: str
    telefone: str
    email: EmailStr | None = None
    tipo: str
    cidade: str | None = None
    descricao: str | None = None


class OrcamentoResponse(OrcamentoCreate):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True