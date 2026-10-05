from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class OrcamentoCreate(BaseModel):
    nome: str = Field(
        ...,
        min_length=3,
        max_length=150,
        description="Nome completo do cliente"
    )

    telefone: str = Field(
        ...,
        min_length=10,
        max_length=30,
        description="Telefone para contato"
    )

    email: EmailStr | None = Field(
        default=None,
        description="E-mail do cliente"
    )

    tipo: str = Field(
        ...,
        min_length=3,
        max_length=100,
        description="Tipo do serviço solicitado"
    )

    cidade: str | None = Field(
        default=None,
        max_length=100,
        description="Cidade da obra"
    )

    descricao: str | None = Field(
        default=None,
        max_length=1000,
        description="Descrição do orçamento"
    )


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

