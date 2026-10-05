from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


# ==========================================
# OPÇÕES VÁLIDAS
# ==========================================

class TipoProjeto(str, Enum):
    RESIDENCIAL = "Residencial"
    COMERCIAL = "Comercial"
    CLINICAS_SAUDE = "Clínicas e Saúde"
    REFORMAS = "Reformas"
    GERENCIAMENTO = "Gerenciamento de Obras"
    PROJETOS_CONSULTORIA = "Projetos e Consultoria"


class CidadeObra(str, Enum):
    COTIA = "Cotia"
    CARAPICUIBA = "Carapicuíba"
    BARUERI = "Barueri"
    ITAPEVI = "Itapevi"
    JANDIRA = "Jandira"
    OSASCO = "Osasco"
    VARGEM_GRANDE = "Vargem Grande Paulista"
    EMBU = "Embu das Artes"
    SAO_PAULO = "São Paulo"
    OUTRA = "Outra cidade"


# ==========================================
# CRIAÇÃO DE ORÇAMENTO
# ==========================================

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
        max_length=15,
        description="Telefone para contato"
    )

    email: EmailStr | None = Field(
        default=None,
        description="E-mail do cliente"
    )

    tipo: TipoProjeto = Field(
        ...,
        description="Tipo do projeto"
    )

    cidade: CidadeObra | None = Field(
        default=None,
        description="Cidade da obra"
    )

    descricao: str | None = Field(
        default=None,
        max_length=1000,
        description="Descrição do orçamento"
    )

    @field_validator("telefone")
    @classmethod
    def validar_telefone(cls, valor: str) -> str:
        numeros = "".join(
            caractere
            for caractere in valor
            if caractere.isdigit()
        )

        if len(numeros) not in (10, 11):
            raise ValueError(
                "O telefone deve conter 10 ou 11 dígitos."
            )

        return numeros


# ==========================================
# RESPOSTA DE ORÇAMENTO
# ==========================================

class OrcamentoResponse(OrcamentoCreate):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================
# LISTAGEM
# ==========================================

class OrcamentoListResponse(BaseModel):
    total: int
    items: list[OrcamentoResponse]


# ==========================================
# RESPOSTA DE CRIAÇÃO
# ==========================================

class OrcamentoCreateResponse(BaseModel):
    message: str
    id: int