from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from database import Base


class Orcamento(Base):
    __tablename__ = "orcamentos"

    id = Column(Integer, primary_key=True, index=True)

    nome = Column(String(150), nullable=False)

    telefone = Column(String(30), nullable=False)

    email = Column(String(150), nullable=True)

    tipo = Column(String(100), nullable=False)

    cidade = Column(String(100), nullable=True)

    descricao = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = Column(
        DateTime,
        nullable=True
    )

    