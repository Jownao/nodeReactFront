import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Função para buscar as imagens
  const searchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=WgU2tnukzLihmSS8Br08W2nNyDKRVW1G&q=${query}&limit=20`
      );
      setImages(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar imagens: ", error);
    }
  };

  // Função para carregar favoritos do backend
  const loadFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Erro ao carregar favoritos: ", error);
    }
  };

  // Carregar favoritos ao montar o componente
  useEffect(() => {
    loadFavorites();
  }, []);

  // Função para adicionar ou remover favoritos no backend
  const toggleFavorite = async (image) => {
    if (favorites.some(fav => fav.id === image.id)) {
      // Remover do backend
      await axios.delete(`http://localhost:5000/favorites/${image.id}`);
    } else {
      // Adicionar ao backend
      await axios.post("http://localhost:5000/favorites", image);
    }
    loadFavorites(); // Atualizar lista de favoritos
  };

  // Verifica se a imagem está nos favoritos
  const isFavorite = (image) => {
    return favorites.some(fav => fav.id === image.id);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Procurar GIFS..."
      />
      <button onClick={searchImages}>Search</button>

      <h2>Search Results</h2>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.images.fixed_height.url}
              alt={image.title}
              style={{ maxWidth: "200px", margin: "10px" }}
            />
            <button onClick={() => toggleFavorite(image)}>
              {isFavorite(image) ? "Remover dos favoritos" : "Adicionar aos Favoritos"}
            </button>
          </div>
        ))}
      </div>

      <h2>Favorites</h2>
      <div className="image-container">
        {favorites.length > 0 ? (
          favorites.map((image) => (
            <div key={image.id}>
              <img
                src={image.images.fixed_height.url}
                alt={image.title}
                style={{ maxWidth: "200px", margin: "10px" }}
              />
              <button onClick={() => toggleFavorite(image)}>
                Remover dos favoritos
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum favorito por enquanto!</p>
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
