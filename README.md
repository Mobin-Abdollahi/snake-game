# Snake Game - Frontend Project

A modern Snake game built with HTML, CSS and JavaScript featuring user login and personal high scores.

## Features
- Classic Snake gameplay
- Modern neon gaming UI
- User login system (localStorage based)
- Personal best score per user
- Pause and Resume
- Game Over modal
- Logout system

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- Docker
- Nginx

## Run with Docker
docker build -t snake-game .
docker run -p 8080:80 snake-game

Open in browser:
http://localhost:8080

## Project Structure
snake-game/
│
├── index.html
├── login.html
├── style.css
├── script.js
├── auth.js
├── Dockerfile
└── README.md

## Notes
- This is a frontend-only project.
- User data and scores are stored using browser localStorage.
- Docker is used only to serve static files via Nginx.
