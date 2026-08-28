# StyleMarketplace - Squad Augus Team

Marketplace de moda desenvolvido como projeto para processo seletivo de 26.1 da EJCM (Squad 5/Augus Team Squad). O repositório é dividido em back e frontend:
- **`back/`** — API REST em Node.js + TypeScript + Express + Prisma + PostgreSQL
- **`front/`** — Interface web em React + TypeScript + Vite + Tailwind CSS

## Pré-requisitos

- **Node.js >= 20** (o Prisma 7 exige essa versão)
- **PostgreSQL** rodando localmente (ou acessível via `DATABASE_URL`)

## Estrutura do repositório

```
back/
  src/
    controllers/   # regras de cada entidade (User, Product, Sale, Cart, CartVariant, Variant...)
    routes/         # definição das rotas Express
    middlewares/    # auth, validação
    schemas/        # validação de payloads (zod)
    models/
      schema.prisma # schema do banco
      migrations/   # migrations do Prisma
      seed/         # script de seed (popula o catálogo com os produtos usados pelo front)
    config/         # prisma client, dotenv, geração de chaves JWT
front/
  src/
    pages/          # telas da aplicação
    components/     # componentes reutilizáveis
    contexts/       # estado global (ex: carrinho — backend se logado, localStorage se não)
    services/       # chamadas HTTP para a API (axios)
    data/           # dados mockados usados por algumas telas
```

## Configuração inicial

### 1. Instalar dependências

```bash
cd back && npm install
cd front && npm install
```

### 2. Variáveis de ambiente

**`back/.env`:**
```
PORT=3333
APP_NAME=StyleMarketplace
NODE_ENV=development
APP_URL=http://localhost:3333
DATABASE_URL="postgresql://usuario:senha@localhost:5432/StyleMarketplace?schema=public"
```

**`front/.env`:**
```
VITE_API_URL=http://localhost:3333
```

> É necessário ajustar os `.env` para configuração própria, uma vez que, por questões de segurança, os arquivos originais foram mantidos dentro do .gitignore.

### 3. Gerar as chaves de autenticação (JWT)

```bash
cd back
npm run keys
```

Gera o par de chaves RSA usado para assinar/verificar os tokens (`back/keys/`, também fora do controle de versão).

### 4. Banco de dados

Com o Postgres no ar e o banco (`DATABASE_URL`) criado:

```bash
cd back
npx prisma generate
npx prisma migrate dev
```

### 5. Popular o banco com dados de teste (seed)

```bash
cd back
npx prisma db seed
```

## Rodando o projeto

**Backend:**
```bash
cd back
npm start
```
Sobe em `http://localhost:PORT` (conforme `back/.env`).

**Frontend:**
```bash
cd front
npm run dev
```
Sobe via Vite, normalmente em `http://localhost:5173`.

## Ferramentas úteis durante o desenvolvimento

- **Prisma Studio** — Interface útil para consultar e gerar dados do banco com maior facilidade:
  ```bash
  cd back && npx prisma studio
  ```
- **Postman** — para testar rotas manualmente durante o desenvolvimento.

## Integrantes do Grupo

- Yago Pedro — Techlead do Grupo
- _Gabriel Lucas_
- _Guilherme Conceição_
- _Thales Aragão_
- _Arthur Amorim_
