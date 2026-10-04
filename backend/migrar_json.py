from pathlib import Path
import json
from datetime import datetime

from database import SessionLocal, engine
from models import Base, Orcamento


# Garante que a tabela exista
Base.metadata.create_all(bind=engine)


# Local dos arquivos
DATA = Path(__file__).parent / "data"
JSON_FILE = DATA / "orcamentos.json"


# Verifica se o arquivo JSON existe
if not JSON_FILE.exists():
    print("Arquivo orcamentos.json não encontrado.")
    raise SystemExit(1)


# Lê os dados antigos
items = json.loads(
    JSON_FILE.read_text(encoding="utf-8")
)


db = SessionLocal()

try:
    adicionados = 0
    ignorados = 0

    for item in items:

        # Verifica se o ID já existe no banco
        existente = db.get(Orcamento, item["id"])

        if existente:
            ignorados += 1
            continue

        created_at = None

        if item.get("created_at"):
            created_at = datetime.fromisoformat(
                item["created_at"]
            )

        updated_at = None

        if item.get("updated_at"):
            updated_at = datetime.fromisoformat(
                item["updated_at"]
            )

        novo_orcamento = Orcamento(
            id=item["id"],
            nome=item["nome"],
            telefone=item["telefone"],
            email=item.get("email"),
            tipo=item["tipo"],
            cidade=item.get("cidade"),
            descricao=item.get("descricao"),
            created_at=created_at,
            updated_at=updated_at
        )

        db.add(novo_orcamento)
        adicionados += 1

    db.commit()

    print(f"Registros adicionados: {adicionados}")
    print(f"Registros já existentes: {ignorados}")
    print("Migração concluída com sucesso!")

finally:
    db.close()