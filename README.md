# POKEMON FULL STACK PERN CRUD APP

## Features
- a simplified UI
- ability to create accounts and change usernames
- ability to display user suggestions of all the pokemons
- ability to authenticate users
- ability to show users notifications for success and errors
- ability to remove pokemons from pokeball using double click
- ability to display images of pokemons

## Tech stack
### Frontend
- React
- React hot toast
- React router

## Backend
- Node.js
- Express
- JSON web token (JWT) authentication

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
- ideally create two .env files one for production and other for development with key VITE_API_URL which should point to root and local backend respectively

### Build Frontend so that it can be served by Backend
```
npm run build
```
### Now we move to Backend
```
cd ..
cd pokemon-app/backend
```
### Install Backend dependencies
```
npm install
```
### Create .env file for Backend
- create a .env file in backend folder with keys DB_PASSWORD and JWT_SECRET_KEY

### Start Backend
```
npm start
```
### Visit http://localhost:3000/ on your browser