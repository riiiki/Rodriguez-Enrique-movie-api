# Movie Collection API

Create a simple Movie Collection REST API using Node.js + Express.

Requirements
Use a JavaScript array as temporary data storage.

Create:

GET /api/movies — retrieve all movies

GET /api/movies/:id — retrieve one movie

POST /api/movies — add a new movie

Each movie must have: id, title, genre, year

Automatically assign the id for new movies.

Return an error if required fields are missing.

Frontend
Create index.html that:

displays the movie list

has a form for adding a movie

uses fetch() to communicate with the API

refreshes the list after adding a movie
