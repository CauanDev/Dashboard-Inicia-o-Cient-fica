from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal


# Classe base com campos comuns
class RegistroMortalidadeBase(BaseModel):
    origem: Optional[str] = None
    tipo_bito: Optional[str] = None
    dtobito: Optional[date] = None
    horaobito: Optional[str] = None
    natural: Optional[str] = None
    codmunnatu: Optional[str] = None  # Mudança para str para corresponder ao modelo SQLAlchemy
    dtnasc: Optional[date] = None
    idade: Optional[int] = None
    sexo: Optional[str] = None
    racacor: Optional[str] = None
    estciv: Optional[str] = None
    esc: Optional[str] = None
    esc2010: Optional[str] = None
    seriescfal: Optional[str] = None
    ocup: Optional[str] = None
    codmunres: Optional[int] = None
    lococor: Optional[str] = None
    codestab: Optional[int] = None
    codmunocor: Optional[str] = None  # Mudança para str para corresponder ao modelo SQLAlchemy
    idademae: Optional[int] = None
    escmae: Optional[str] = None
    escmae2010: Optional[str] = None
    seriescmae: Optional[str] = None
    ocupmae: Optional[str] = None
    qtdfilvivo: Optional[int] = None
    qtdfilmort: Optional[int] = None
    gravidez: Optional[str] = None
    semagestac: Optional[int] = None
    gestacao: Optional[int] = None
    parto: Optional[str] = None
    obitoparto: Optional[str] = None
    peso: Optional[float] = None  # Mudança para float, que é mais adequado para Float no SQLAlchemy
    tp_morteoco: Optional[str] = None
    obitograv: Optional[str] = None
    obitopuerr: Optional[str] = None
    assistmed: Optional[str] = None
    exame: Optional[str] = None
    cirurgia: Optional[str] = None
    necropsia: Optional[str] = None
    linhaa: Optional[str] = None
    linhab: Optional[str] = None
    linhac: Optional[str] = None
    linhad: Optional[str] = None
    linhaii: Optional[str] = None
    causabas: Optional[str] = None
    cb_pre: Optional[str] = None
    comunsvoim: Optional[str] = None
    dtatestado: Optional[date] = None
    circobito: Optional[str] = None
    acidtrab: Optional[str] = None
    fonte: Optional[str] = None
    numerolote: Optional[str] = None
    dtinvestig: Optional[date] = None
    dtcadastro: Optional[date] = None
    atestante: Optional[str] = None
    stcodifica: Optional[str] = None
    codificado: Optional[str] = None
    versaosist: Optional[str] = None
    versaoscb: Optional[str] = None
    fonteinv: Optional[str] = None
    dtrecebim: Optional[date] = None
    atestado: Optional[str] = None
    dtrecoriga: Optional[date] = None
    opor_do: Optional[str] = None
    causamat: Optional[str] = None
    escmaeagr1: Optional[str] = None
    escfalagr1: Optional[str] = None
    stdoepidem: Optional[str] = None
    stdonova: Optional[str] = None
    difdata: Optional[int] = None
    nudiasobco: Optional[int] = None
    dtcadinv: Optional[date] = None
    tpobitocor: Optional[str] = None
    dtconinv: Optional[date] = None
    fontes: Optional[str] = None
    tpresginfo: Optional[str] = None
    tpnivelinv: Optional[str] = None
    dtcadinf: Optional[date] = None
    morteparto: Optional[str] = None
    dtconcaso: Optional[date] = None
    altcausa: Optional[str] = None
    causabas_o: Optional[str] = None
    tppos: Optional[str] = None
    tp_altera: Optional[str] = None
    cb_alt: Optional[str] = None

    class Config:
        orm_mode = True


# Schema de criação (para quando for criar um novo registro)
class RegistroMortalidadeCreate(RegistroMortalidadeBase):
    pass  # Pode adicionar qualquer lógica extra aqui, se necessário


# Schema de leitura (para quando for retornar um registro)
class RegistroMortalidade(RegistroMortalidadeBase):
    contador: int
    is_active: bool  # Remover ou ajustar se o campo is_active não for necessário

    class Config:
        orm_mode = True
