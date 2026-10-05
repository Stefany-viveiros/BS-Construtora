from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
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


@router.post(
    "",
    response_model=OrcamentoCreateResponse,
    status_code=status.HTTP_201_CREATED
)
def criar_orcamento(
    dados: OrcamentoCreate,
    db: Session = Depends(get_db)
):
    novo_orcamento = Orcamento(
        nome=dados.nome,
        telefone=dados.telefone,
        email=dados.email,
        tipo=dados.tipo,
        cidade=dados.cidade,
        descricao=dados.descricao
    )

    try:
        db.add(novo_orcamento)
        db.commit()
        db.refresh(novo_orcamento)

        return {
            "message": "Orçamento enviado com sucesso.",
            "id": novo_orcamento.id
        }

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível salvar o orçamento."
        )


@router.get(
    "",
    response_model=OrcamentoListResponse
)
def listar_orcamentos(
    db: Session = Depends(get_db)
):
    try:
        itens = (
            db.query(Orcamento)
            .order_by(Orcamento.id.desc())
            .all()
        )

        return {
            "total": len(itens),
            "items": itens
        }

    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível consultar os orçamentos."
        )


@router.get(
    "/{orcamento_id}",
    response_model=OrcamentoResponse
)
def buscar_orcamento(
    orcamento_id: int,
    db: Session = Depends(get_db)
):
    try:
        orcamento = (
            db.query(Orcamento)
            .filter(Orcamento.id == orcamento_id)
            .first()
        )

        if not orcamento:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Orçamento não encontrado."
            )

        return orcamento

    except HTTPException:
        raise

    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível consultar o orçamento."
        )


@router.put(
    "/{orcamento_id}",
    response_model=OrcamentoResponse
)
def atualizar_orcamento(
    orcamento_id: int,
    dados: OrcamentoCreate,
    db: Session = Depends(get_db)
):
    try:
        orcamento = (
            db.query(Orcamento)
            .filter(Orcamento.id == orcamento_id)
            .first()
        )

        if not orcamento:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Orçamento não encontrado."
            )

        orcamento.nome = dados.nome
        orcamento.telefone = dados.telefone
        orcamento.email = dados.email
        orcamento.tipo = dados.tipo
        orcamento.cidade = dados.cidade
        orcamento.descricao = dados.descricao
        orcamento.updated_at = datetime.utcnow()

        db.commit()
        db.refresh(orcamento)

        return orcamento

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível atualizar o orçamento."
        )


@router.delete(
    "/{orcamento_id}"
)
def excluir_orcamento(
    orcamento_id: int,
    db: Session = Depends(get_db)
):
    try:
        orcamento = (
            db.query(Orcamento)
            .filter(Orcamento.id == orcamento_id)
            .first()
        )

        if not orcamento:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Orçamento não encontrado."
            )

        db.delete(orcamento)
        db.commit()

        return {
            "message": "Orçamento excluído com sucesso."
        }

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível excluir o orçamento."
        )