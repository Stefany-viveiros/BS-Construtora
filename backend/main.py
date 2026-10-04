
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from database import engine, get_db
from models import Base, Orcamento
from schemas import OrcamentoCreate, OrcamentoResponse


# Cria as tabelas do banco de dados
Base.metadata.create_all(bind=engine)


# ==========================================
# CONFIGURAÇÃO DA API
# ==========================================

app = FastAPI(
    title="BS Construtora API",
    version="1.0.0",
    description="API REST do site institucional da BS Construtora"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "BS Construtora API",
        "time": datetime.now().isoformat()
    }


# ==========================================
# SERVIÇOS
# ==========================================

@app.get("/api/servicos")
def servicos():
    return {
        "items": [
            "Construção residencial",
            "Reformas",
            "Clínicas odontológicas",
            "Obras comerciais",
            "Transformação de espaços"
        ]
    }


# ==========================================
# CRIAR ORÇAMENTO
# ==========================================

@app.post("/api/orcamentos", status_code=201)
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

@app.get("/api/orcamentos")
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
        "items": [
            {
                "id": item.id,
                "nome": item.nome,
                "telefone": item.telefone,
                "email": item.email,
                "tipo": item.tipo,
                "cidade": item.cidade,
                "descricao": item.descricao,
                "created_at": item.created_at,
                "updated_at": item.updated_at
            }
            for item in items
        ]
    }


# ==========================================
# BUSCAR ORÇAMENTO PELO ID
# ==========================================

@app.get(
    "/api/orcamentos/{orcamento_id}",
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

@app.put(
    "/api/orcamentos/{orcamento_id}",
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

@app.delete("/api/orcamentos/{orcamento_id}")
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