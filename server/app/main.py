from fastapi import Depends, FastAPI, HTTPException, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from . import models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def interpretar_idade(codigo_idade: str) -> Optional[float]:
    if not codigo_idade or len(codigo_idade) != 3:
        return None
    unidade = int(codigo_idade[0])
    quantidade = int(codigo_idade[1:])
    if unidade == 0:
        return None
    elif unidade == 1:
        return quantidade / (24 * 365)
    elif unidade == 2:
        return quantidade / 365
    elif unidade == 3:
        return quantidade / 12
    elif unidade == 4:
        return quantidade
    elif unidade == 5:
        return 100 + quantidade
    return None

@app.post("/mortalidades", response_model=List[schemas.RegistroMortalidadeBase])
async def get_mortalidades(request: Request, db: Session = Depends(get_db)):
    filtros = await request.json()
    query = db.query(models.RegistroMortalidade)
    
    if 'cidades' in filtros:
        query = query.filter(models.RegistroMortalidade.codmunocor.in_(filtros['cidades']))

    if 'sexos' in filtros:
        query = query.filter(models.RegistroMortalidade.sexo.in_(filtros['sexos']))

    if 'racas' in filtros:
        query = query.filter(models.RegistroMortalidade.racacor.in_(filtros['racas']))

    if 'dataInicio' in filtros:
        data_inicio = datetime.strptime(filtros['dataInicio'], "%d/%m/%Y").date()
        query = query.filter(models.RegistroMortalidade.dtobito >= data_inicio)

    if 'dataFim' in filtros:
        data_fim = datetime.strptime(filtros['dataFim'], "%d/%m/%Y").date()
        query = query.filter(models.RegistroMortalidade.dtobito <= data_fim)

    if 'horaInicio' in filtros:
        horario_inicio = filtros['horaInicio']
        query = query.filter(models.RegistroMortalidade.horaobito >= horario_inicio)

    if 'horaFinal' in filtros:
        horario_final = filtros['horaFinal']
        query = query.filter(models.RegistroMortalidade.horaobito <= horario_final)

    if 'idadeMaeInicio' in filtros:
        idade_mae_inicio = filtros['idadeMaeInicio']
        query = query.filter(models.RegistroMortalidade.idademae >= idade_mae_inicio)

    if 'idadeMaeFinal' in filtros:
        idade_mae_final = filtros['idadeMaeFinal']
        query = query.filter(models.RegistroMortalidade.idademae <= idade_mae_final)

    if 'locais' in filtros:
        query = query.filter(models.RegistroMortalidade.lococor.in_(filtros['locais']))

    if 'idadeInicio' in filtros:
        begin_idade = filtros['idadeInicio']
        query = query.filter(
            interpretar_idade(models.RegistroMortalidade.idade) >= begin_idade
        )

    if 'idadeFinal' in filtros:
        end_idade = filtros['idadeFinal']
        query = query.filter(
            interpretar_idade(models.RegistroMortalidade.idade) <= end_idade
        )

    mortalidades = query.all()
    return mortalidades
