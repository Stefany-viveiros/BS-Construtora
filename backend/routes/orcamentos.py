from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
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


# ==========================================
# CRIAR ORÇAMENTO
# ==========================================

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


# ==========================================
# LISTAR ORÇAMENTOS
# ==========================================

@router.get(
    "",
    response_model=OrcamentoListResponse
)
def listar_orcamentos(
    page: int = Query(
        1,
        ge=1,
        description="Número da página"
    ),
    limit: int = Query(
        10,
        ge=1,
        le=100,
        description="Quantidade de registros por página"
    ),
    busca: str | None = Query(
        None,
        description="Busca pelo nome do cliente"
    ),
    tipo: str | None = Query(
        None,
        description="Filtro pelo tipo de projeto"
    ),
    cidade: str | None = Query(
        None,
        description="Filtro pela cidade da obra"
    ),
    db: Session = Depends(get_db)
):
    try:
        query = db.query(Orcamento)

        # Busca pelo nome
        if busca:
            query = query.filter(
                Orcamento.nome.ilike(f"%{busca}%")
            )

        # Filtro por tipo
        if tipo:
            query = query.filter(
                Orcamento.tipo == tipo
            )

        # Filtro por cidade
        if cidade:
            query = query.filter(
                Orcamento.cidade == cidade
            )

        # Total de registros após os filtros
        total = query.count()

        # Paginação
        offset = (page - 1) * limit

        itens = (
            query
            .order_by(Orcamento.id.desc())
            .offset(offset)
            .limit(limit)
            .all()
        )

        return {
            "total": total,
            "items": itens
        }

    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Não foi possível consultar os orçamentos."
        )


# ==========================================
# BUSCAR ORÇAMENTO POR ID
# ==========================================

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


# ==========================================
# ATUALIZAR ORÇAMENTO
# ==========================================

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


# ==========================================
# EXCLUIR ORÇAMENTO
# ==========================================

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