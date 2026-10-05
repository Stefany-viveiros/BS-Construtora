import os
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base
from routes.orcamentos import router as orcamentos_router


load_dotenv()


# ==========================================
# CRIA AS TABELAS DO BANCO DE DADOS
# ==========================================

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
    allow_origins=[
        os.getenv(
            "FRONTEND_URL",
            "http://localhost:5173"
        )
    ],
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
# ROTAS DE ORÇAMENTOS
# ==========================================

app.include_router(orcamentos_router)