# Archive of Archives

A digital archive platform for preserving and exploring historical photographs, documents, and field notes from Delhi's libraries.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT (Bearer tokens)
- **File Storage**: ImageKit

## Project Structure

```
/
├── server/          # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── layouts/
│   └── index.html
├── .env.example
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-name>
```

### 2. Configure environment variables

```bash
cp .env.example server/.env
# Fill in the values in server/.env
```

### 3. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

## Running Locally

### Start the backend

```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

### Start the frontend

```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

## Routes

| Path | Description |
|---|---|
| `/landing` | Landing page |
| `/` | Library listing |
| `/library/:id` | Library detail + documents |
| `/upload` | Submit a document (login required) |
| `/admin` | Admin review panel (admin login required) |
| `/login` | Sign in |

## API Base URL

```
http://localhost:5000/api
```
