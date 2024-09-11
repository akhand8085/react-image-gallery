// src/components/Gallery.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const key = "fKYzaTzA9UuM_Di1aWrXmzKzln4YMalW3qmnHThk9TI";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  const searchImages = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    try {
      
      
const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=16&client_id=${key}`);
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  return (
    <div className="gallery-container">
      <h1>Image Gallery</h1>
      <form onSubmit={searchImages} className="search-form">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="grid-container">
        {images.map((image) => (
          <div key={image.id} className="grid-item">
            <img src={image.urls.small} alt={image.alt_description} className="grid-image" />
            <Link to={`/image/${image.id}`}>
              <button className="caption-button">Caption</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
