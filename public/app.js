const form = document.querySelector('#movie-form');
const movieList = document.querySelector('#movie-list');
const emptyState = document.querySelector('#empty-state');
const formMessage = document.querySelector('#form-message');
const loadMessage = document.querySelector('#load-message');
const reloadButton = document.querySelector('#reload-button');
const apiBase = window.location.port === '3000'
  ? ''
  : 'http://localhost:3000';

function showMessage(element, text, isError = false) {
  element.textContent = text;
  element.classList.toggle('error', isError);
}

function renderMovies(movies) {
  movieList.replaceChildren();
  emptyState.hidden = movies.length > 0;

  movies.forEach((movie) => {
    const row = document.createElement('tr');
    [movie.id, movie.title, movie.genre, movie.year].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    movieList.appendChild(row);
  });
}

async function loadMovies() {
  showMessage(loadMessage, 'Loading collection...');

  try {
    const response = await fetch(`${apiBase}/api/movies`);
    if (!response.ok) throw new Error('Could not load movies');
    renderMovies(await response.json());
    showMessage(loadMessage, 'Collection up to date');
  } catch (error) {
    showMessage(loadMessage, error.message, true);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const movie = Object.fromEntries(formData.entries());

  showMessage(formMessage, 'Adding movie...');

  try {
    const response = await fetch(`${apiBase}/api/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not add movie');

    form.reset();
    showMessage(formMessage, `${result.title} added successfully`);
    await loadMovies();
  } catch (error) {
    showMessage(formMessage, error.message, true);
  }
});

reloadButton.addEventListener('click', loadMovies);
loadMovies();
