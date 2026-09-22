from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from pathlib import Path
import json

app=FastAPI(title='BS Construtora API',version='1.0.0',description='API pública do site institucional da BS Construtora')
app.add_middleware(CORSMiddleware,allow_origins=['*'],allow_credentials=False,allow_methods=['*'],allow_headers=['*'])
DATA=Path(__file__).parent/'data'; DATA.mkdir(exist_ok=True); DB=DATA/'orcamentos.json'
if not DB.exists(): DB.write_text('[]',encoding='utf-8')
class Orcamento(BaseModel):
    nome:str
    telefone:str
    email:str|None=None
    tipo:str
    cidade:str|None=None
    descricao:str|None=None

@app.get('/api/health')
def health(): return {'status':'ok','service':'BS Construtora API','time':datetime.now().isoformat()}
@app.get('/api/servicos')
def servicos(): return {'items':['Construção residencial','Reformas','Clínicas odontológicas','Obras comerciais','Transformação de espaços']}
@app.post('/api/orcamentos',status_code=201)
def criar_orcamento(payload:Orcamento):
    items=json.loads(DB.read_text(encoding='utf-8'))
    item=payload.model_dump(); item['id']=len(items)+1; item['created_at']=datetime.now().isoformat(); items.append(item)
    DB.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
    return {'message':'Solicitação recebida com sucesso','id':item['id']}
