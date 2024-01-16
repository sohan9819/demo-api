# Demo api project

### Project Setup

1. Clone Repo

```
git clone https://github.com/sohan9819/demo-api.git

```

2. Install packages

```
pnpm install


```

### Setup `.env` file

```
cp .env.example .env
```

### Docker Postgresql Database

```
docker-compose up -d
# or
docker compose up -d
```

### Start the app

1. Push to db from prisma schema

```
pnpm db:push
```

2. Start the prisma studio [optional]

```
pnpm db:studio
```

3. Start the dev server

```
pnpm dev
```
