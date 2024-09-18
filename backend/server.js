const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Permitir CORS
app.use(cors());
app.use(express.json());

let favorites = [];

// Rota para pegar os favoritos
app.get('/favorites', (req, res) => {
  res.json(favorites);
});

// Rota para adicionar uma imagem aos favoritos
app.post('/favorites', (req, res) => {
  const image = req.body;
  if (!favorites.find(fav => fav.id === image.id)) {
    favorites.push(image);
  }
  res.json(favorites);
});

// Rota para remover uma imagem dos favoritos
app.delete('/favorites/:id', (req, res) => {
  const id = req.params.id;
  favorites = favorites.filter(fav => fav.id !== id);
  res.json(favorites);
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
