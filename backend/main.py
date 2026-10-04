from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
from pathlib import Path
import json


app = FastAPI(
    title="BS Construtora API",
    version="1.0.0",
    description="API REST do site institucional da BS Construtora"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Banco de dados em arquivo JSON
DATA = Path(__file__).parent / "data"
DATA.mkdir(exist_ok=True)

DB = DATA / "orcamentos.json"

if not DB.exists():
    DB.write_text("[]", encoding="utf-8")


# Modelo de dados
class Orcamento(BaseModel):
    nome: str
    telefone: str
    email: EmailStr | None = None
    tipo: str
    cidade: str | None = None
    descricao: str | None = None


# Função para carregar os orçamentos
def carregar_orcamentos():
    return json.loads(DB.read_text(encoding="utf-8"))


# Função para salvar os orçamentos
def salvar_orcamentos(items):
    DB.write_text(
        json.dumps(
            items,
            ensure_ascii=False,
            indent=2
        ),
        encoding="utf-8"
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
# Serviços
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
# Criar orçamento
# ==========================================

@app.post("/api/orcamentos", status_code=201)
def criar_orcamento(payload: Orcamento):

    items = carregar_orcamentos()

    novo_id = max(
        [item["id"] for item in items],
        default=0
    ) + 1

    item = payload.model_dump()

    item["id"] = novo_id
    item["created_at"] = datetime.now().isoformat()

    items.append(item)

    salvar_orcamentos(items)

    return {
        "message": "Solicitação recebida com sucesso",
        "id": item["id"]
    }


# ==========================================
# Listar orçamentos
# ==========================================

@app.get("/api/orcamentos")
def listar_orcamentos():

    items = carregar_orcamentos()

    return {
        "total": len(items),
        "items": items
    }


# ==========================================
# Buscar orçamentos pelo id
# ==========================================

@app.get("/api/orcamentos/{orcamento_id}")
def buscar_orcamento(orcamento_id: int):

    items = carregar_orcamentos()

    for item in items:
        if item["id"] == orcamento_id:
            return item

    raise HTTPException(
        status_code=404,
        detail="Orçamento não encontrado"
    )


# ==========================================
# Atualizar orçamento
# ==========================================

@app.put("/api/orcamentos/{orcamento_id}")
def atualizar_orcamento(
    orcamento_id: int,
    payload: Orcamento
):

    items = carregar_orcamentos()

    for index, item in enumerate(items):

        if item["id"] == orcamento_id:

            atualizado = payload.model_dump()

            atualizado["id"] = orcamento_id
            atualizado["created_at"] = item["created_at"]
            atualizado["updated_at"] = datetime.now().isoformat()

            items[index] = atualizado

            salvar_orcamentos(items)

            return {
                "message": "Orçamento atualizado com sucesso",
                "item": atualizado
            }

    raise HTTPException(
        status_code=404,
        detail="Orçamento não encontrado"
    )


# ==========================================
# Para excluir orçamento
# ==========================================

@app.delete("/api/orcamentos/{orcamento_id}")
def excluir_orcamento(orcamento_id: int):

    items = carregar_orcamentos()

    for index, item in enumerate(items):

        if item["id"] == orcamento_id:

            removido = items.pop(index)

            salvar_orcamentos(items)

            return {
                "message": "Orçamento excluído com sucesso",
                "id": removido["id"]
            }

    raise HTTPException(
        status_code=404,
        detail="Orçamento não encontrado"
    )