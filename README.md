# To-Do App
 
Eine Full-Stack To-Do-Anwendung mit Projekten, Live-Zusammenarbeit und Push-Erinnerungen.
Als Web-App (React) und als Mobile-App (Expo / React Native).
 
## Features
 
- **Registrierung & Login** mit JWT-Authentifizierung
- **Projekte** mit eigenen To-Do-Listen, anlegen und löschen
- **To-Dos** erstellen, abhaken, bearbeiten und löschen, jeweils mit Deadline
- **Countdown** bis zur Fälligkeit und Filter-Fenster für die Ansicht
- **Projekte teilen** mit anderen Nutzern
- **Live-Synchronisation** zwischen Nutzern über WebSockets (Socket.IO)
- **Push-Benachrichtigungen** im Browser, sobald ein To-Do fällig ist (Web Push / VAPID)
- **Mobile App** (Expo) mit Login, Projekt- und To-Do-Ansicht
- **Docker-Setup** für die Entwicklung (Frontend, Backend, MongoDB)


## Tech-Stack
 
| Bereich  | Technologien |
|----------|--------------|
| Frontend | React 19, TypeScript, Vite, React Router, Axios, Socket.IO Client, Day.js |
| Backend  | Node.js, Express 5, TypeScript, MongoDB (Mongoose), Socket.IO, JWT, web-push |
| Mobile   | Expo 54, React Native, React Navigation, AsyncStorage |
| DevOps   | Docker, Docker Compose |

## Installation und Start
 
Voraussetzung: Docker Desktop
 
```bash
git clone https://github.com/Yassin1156/todoliste.git
cd todoliste/"to-do-liste react"
 
cp .env.example .env
cp backend/.env.example backend/.env
```
 
Trage danach in `backend/.env` ein `JWT_SECRET` ein (z. B. mit `openssl rand -hex 32`). Für Push-Benachrichtigungen erzeugst du ein Schlüsselpaar mit `npx web-push generate-vapid-keys`. Der **Public Key** kommt in beide `.env`-Dateien, der **Private Key** nur in `backend/.env`.
 
Starten:
 
```bash
docker compose -f docker-compose.dev.yml up --build
```
| Dienst   | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3001 |
| MongoDB  | localhost:27017       |
 
Beenden: `Ctrl+C`, dann `docker compose -f docker-compose.dev.yml down`.

## Mobile App
 
Das Backend muss laufen und dein Handy muss im selben WLAN sein.
 
```bash
cd todo-mobile
npm install
```
 
Trage in `src/config/env.ts` die IP-Adresse deines Rechners ein, z. B. `http://192.168.x.x:3001/api`. Dann:
 
```bash
npx expo start
```
 
Scanne den QR-Code mit der App **Expo Go**.

## Konfiguration
 
**`backend/.env`**
 
| Variable | Beschreibung |
|----------|--------------|
| `MONGO_URI` | MongoDB-Verbindung, mit Docker: `mongodb://mongo:27017/todo` |
| `PORT` | Port des Backends (Standard: 3001) |
| `JWT_SECRET` | Schlüssel zum Signieren der Tokens |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` | Schlüsselpaar für Web Push |
| `VAPID_SUBJECT` | Kontakt, z. B. `mailto:you@example.com` |
 
**`.env`** (Frontend)
 
| Variable | Beschreibung |
|----------|--------------|
| `VITE_VAPID_PUBLIC_KEY` | Öffentlicher VAPID-Key, derselbe wie im Backend |
 
`.env`-Dateien gehören nicht ins Repository. Eingecheckt werden nur die `.env.example`-Dateien.
 
## API-Überblick
 
| Methode | Route | Beschreibung |
|---------|-------|--------------|
| POST | `/api/auth/register` | Account erstellen |
| POST | `/api/auth/login` | Einloggen, liefert JWT |
| GET / POST | `/api/projects` | Projekte laden / erstellen |
| DELETE | `/api/projects/:projectId` | Projekt löschen |
| POST | `/api/projects/:id/share` | Projekt teilen |
| GET / POST | `/api/todos` | To-Dos laden / erstellen |
| PUT / DELETE | `/api/todos/:todoId` | To-Do ändern / löschen |
| POST | `/api/push/subscribe` | Push-Abo registrieren |
 
Alle Routen außer Login und Registrierung brauchen den Header `Authorization: Bearer <token>`.




