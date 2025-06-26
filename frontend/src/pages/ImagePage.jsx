import { useEffect, useState } from "react";
import axios from "axios";
import ImageList from "../components/ImageList";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";

function ImagePage({ theme, toggleTheme }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const baseURL = import.meta.env.PROD
      ? "https://mern-app-6sjv.onrender.com"
      : "http://localhost:5000";

    axios.get(`${baseURL}/api/upload`).then((res) => {
      setImages(res.data);
    });
  }, []);

  return (
    <div>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <ImageList images={images} editable={false} />
    </div>
  );
}

export default ImagePage;
