const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let movies = [
  { id: 1, title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
  { id: 2, title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
  { id: 3, title: 'Coco', genre: 'Animation', year: 2017 }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find((item) => item.id === Number(req.params.id));

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body;

  if (!title || !genre || year === undefined || year === null || year === '') {
    return res.status(400).json({ error: 'title, genre, and year are required' });
  }

  const movie = {
    id: movies.length ? Math.max(...movies.map((item) => item.id)) + 1 : 1,
    title: String(title).trim(),
    genre: String(genre).trim(),
    year: Number(year)
  };

  if (!movie.title || !movie.genre || !Number.isInteger(movie.year)) {
    return res.status(400).json({ error: 'title, genre, and year must be valid values' });
  }

  movies.push(movie);
  res.status(201).json(movie);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Movie Collection API running at http://localhost:${PORT}`);
});
