import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Canvas, Textbox, Image, FabricImage} from "fabric";


const key = "fKYzaTzA9UuM_Di1aWrXmzKzln4YMalW3qmnHThk9TI"; 

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=${key}`
        );
        setImage(response.data);
      } catch (error) {
        console.error("Error fetching image:", error);
        
      }
    };

    fetchImage();
  }, [id]);

  
  useEffect(() => {
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [canvas]);

  
  useEffect(() => {
    if (canvasRef.current) {
      if (canvas) {
        canvas.dispose(); 
      }
      const canvasInstance = new Canvas(canvasRef.current, {
        backgroundColor: "#fff",
      });
      setCanvas(canvasInstance);
    }
  }, [canvasRef]);

  
  useEffect(() => {
    if (image && canvas) {
      const loadImage = async () => {
        try {
          
          const img = await FabricImage.fromURL(image.urls.regular);
          img.scaleToWidth(400); 
          canvas.add(img);
          canvas.renderAll();
        } catch (error) {
          console.error("Error loading image:", error);
          
        }
      };
      loadImage();
    }
  }, [image, canvas]);

  
  const addText = () => {
    const text = new Textbox("Your Text Here", {
      left: 100,
      top: 100,
      fill: "#000",
    });
    canvas.add(text);
  };

  
  const downloadImage = () => {
    if (canvas) {
      try {
        const dataURL = canvas.toDataURL({
          format: "png",
          quality: 1,
        });
        const link = document.createElement("a");
        link.href = dataURL;
        link.download   
 = "edited-image.png";
        link.click();
      } catch (error) {
        console.error("Error downloading image:", error);
        
      }
    } else {
      console.error("Canvas not initialized yet!");
      
    }
  };

  return (
    <div className="image-detail">
      <h1>Image Detail</h1>
      <canvas ref={canvasRef} width="500" height="500"></canvas>
      <br />
      <button onClick={addText}>Add Text</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default ImageDetail;

