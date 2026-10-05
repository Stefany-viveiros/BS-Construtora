
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Orcamento
from schemas import (
    OrcamentoCreate,
    OrcamentoResponse,
    OrcamentoListResponse,
    OrcamentoCreateResponse,
)


router = APIRouter(
    prefix="/api/orcamentos",
    tags=["Orçamentos"]
)


# ==========================================
# CRIAR ORÇAMENTO
# ==========================================

@router.post(
    "",
    response_model=OrcamentoCreateResponse,
    status_code=201
)
def criar_orcamento(
    payload: OrcamentoCreate,
    db: Session = Depends(get_db)
):
    novo_orcamento = Orcamento(
        nome=payload.nome,
        telefone=payload.telefone,
        email=payload.email,
        tipo=payload.tipo,
        cidade=payload.cidade,
        descricao=payload.descricao
    )

    db.add(novo_orcamento)
    db.commit()
    db.refresh(novo_orcamento)

    return {
        "message": "Solicitação recebida com sucesso",
        "id": novo_orcamento.id
    }


# ==========================================
# LISTAR ORÇAMENTOS
# ==========================================

@router.get(
    "",
    response_model=OrcamentoListResponse
)
def listar_orcamentos(
    db: Session = Depends(get_db)
):
    items = (
        db.query(Orcamento)
        .order_by(Orcamento.id)
        .all()
    )

    return {
        "total": len(items),
        "items": items
    }


# ==========================================
# BUSCAR ORÇAMENTO PELO ID
# ==========================================

@router.get(
    "/{orcamento_id}",
    response_model=OrcamentoResponse
)
def buscar_orcamento(
    orcamento_id: int,
    db: Session = Depends(get_db)
):
    item = (
        db.query(Orcamento)
        .filter(Orcamento.id == orcamento_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Orçamento não encontrado"
        )

    return item


# ==========================================
# ATUALIZAR ORÇAMENTO
# ==========================================

@router.put(
    "/{orcamento_id}",
    response_model=OrcamentoResponse
)
def atualizar_orcamento(
    orcamento_id: int,
    payload: OrcamentoCreate,
    db: Session = Depends(get_db)
):
    item = (
        db.query(Orcamento)
        .filter(Orcamento.id == orcamento_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Orçamento não encontrado"
        )

    item.nome = payload.nome
    item.telefone = payload.telefone
    item.email = payload.email
    item.tipo = payload.tipo
    item.cidade = payload.cidade
    item.descricao = payload.descricao
    item.updated_at = datetime.now()

    db.commit()
    db.refresh(item)

    return item


# ==========================================
# EXCLUIR ORÇAMENTO
# ==========================================

@router.delete("/{orcamento_id}")
def excluir_orcamento(
    orcamento_id: int,
    db: Session = Depends(get_db)
):
    item = (
        db.query(Orcamento)
        .filter(Orcamento.id == orcamento_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Orçamento não encontrado"
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Orçamento excluído com sucesso",
        "id": orcamento_id
    }

