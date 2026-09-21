# Movie Collection API

A small REST API and browser client built with Node.js and Express. Movies are kept in memory, so new records reset when the server restarts.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## API

- `GET /api/movies` returns all movies.
- `GET /api/movies/:id` returns one movie.
- `POST /api/movies` creates a movie from `{ "title": "...", "genre": "...", "year": 2024 }`.
