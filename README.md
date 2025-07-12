# 📊 Dashboard de Análise de Dados em Saúde Pública

Este projeto tem como objetivo a construção de uma solução de visualização interativa de dados, com foco na análise de informações de óbitos no estado de Mato Grosso do Sul. Utiliza ferramentas modernas como **React** no frontend e **FastAPI** no backend, além de um banco de dados relacional **PostgreSQL** com dados extraídos do **DATASUS**.

A proposta é transformar grandes volumes de dados brutos em visualizações compreensíveis e úteis, contribuindo com a tomada de decisão estratégica na área da saúde pública.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React + ApexCharts
- **Backend**: FastAPI + Uvicorn
- **Banco de Dados**: PostgreSQL
- **Linguagem principal**: Python

---

## 📁 Estrutura do Projeto

.
├── cliente/ # Frontend em React
│ └── react/
├── server/ # Backend com FastAPI
│ └── app/
├── dump.sql # Dump do banco de dados PostgreSQL
├── README.md
.


---

## ⚙️ Como Executar o Projeto Localmente

### 🔽 Pré-requisitos

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git

---

### 🔧 1. Clone o repositório

```bash
git clone https://github.com/CauanDev/Dashboard-Inicia-o-Cient-fica.git
cd Dashboard-Inicia-o-Cient-fica
```

### 🛠️ 2. Configure o banco de dados PostgreSQL

1. Crie um banco de dados chamado `dashboard_saude` (ou outro nome de sua preferência):

```sql
CREATE DATABASE dashboard_saude;
```

2. Importe os dados do arquivo `dump.sql`:
   
```sql
psql -U seu_usuario -d dashboard_saude -f dump.sql
```

### ⚙️ 3. Configuração do backend (FastAPI)

```bash
cd server/app
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 🚀 Inicie o servidor FastAPI

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 🌐 4. Configuração do frontend (React)

```bash
cd ../../cliente/react
npm install
npm run dev

```
## 📚 Objetivo do Projeto

> Este projeto foi desenvolvido com o objetivo de representar dados públicos de forma visual e acessível, promovendo apoio à pesquisa e à tomada de decisões estratégicas na área da saúde pública, com foco em óbitos no estado de Mato Grosso do Sul.



