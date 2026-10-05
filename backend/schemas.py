
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


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

    model_config = ConfigDict(from_attributes=True)


class OrcamentoListResponse(BaseModel):
    total: int
    items: list[OrcamentoResponse]


class OrcamentoCreateResponse(BaseModel):
    message: str
    id: int

