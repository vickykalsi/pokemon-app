# POKEMON FULL STACK PERN CRUD APP WITH JWT AUTHENTICATION AND POKEMON AUTO SUGGESTIONS FROM POKE API

## Features
- a simplified UI
- users can create accounts and change usernames
- auto suggestions of all the pokemons whenever user tries to add a pokemon
- authentication for protected routes
- notifications for success and errors
- removal of pokemons from pokeball using double click
- ability to display images of pokemons

## Tech stack
### Frontend
- React
- React hot toast
- React router
- import.meta.env
- Vite

## Backend
- Node.js
- Express
- JSON Web Token (JWT) authentication
- Express Router
- pg
- dotenv

### Database
- PostgreSQL

### External API
- https://pokeapi.co/

## Installation and Setup

### Clone GitHub repo
```
git clone https://github.com/vickykalsi/pokemon-app.git
cd pokemon-app
```

### Database Setup
- make sure postgres is installed and create a database pokemon so that app can work
```
psql
```
then enter your password
```
CREATE DATABASE pokemon;
\q
```

### Move to Backend
```
cd backend
```

### Install Backend dependencies
```
npm install
```

### Create .env file for Backend
- create a .env file in backend folder with keys DB_PASSWORD, JWT_SECRET_KEY and DATABASE_URL which is just a connection string

### Start Backend
```
npm start
```

### Move to Frontend
```
cd frontend
```

### Install Frontend dependencies
```
npm install
```

### Create .env file for Frontend
- ideally create two .env files one for production and other for development with key VITE_API_URL which should point to production level root backend folder and development level root backend folder respectively, for simplicity you can create a config file which imports using these two and simplifies it to simply BASE_URL

### Start Frontend
```
npm run dev
```

### Visit http://localhost:5173/ on your browser