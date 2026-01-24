# POKEMON FULL STACK PERN CRUD APP WITH JWT AUTHENTICTION AND POKEMON AUTO SUGGESTIONS FROM POKE API

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
### Move to Frontend, it will be served by Backend
```
cd frontend
```
### Install Frontend dependencies
```
npm install
```
### Create .env file for Frontend
- ideally create two .env files one for production and other for development with key VITE_API_URL which should point to root and local backend respectively, for simplicity you can create a config file which imports using these two and simplifies it to simply BASE_URL

### Build Frontend so that it can be served by Backend
```
npm run build
```
### Now we move to Backend
```
cd ..
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
### Visit http://localhost:3000/ on your browser