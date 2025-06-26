import { useEffect, useState } from "react";
import axios from "axios";
import ImageList from "../components/ImageList";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ImageUploadPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/upload", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(res.data);
    } catch (error) {
      console.error("სურათების წამოღების შეცდომა:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("token");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !description)
      // return alert("ყველა ველი აუცილებელია");
      return toast.error("ყველა ველი აუცილებელია");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description); // 🆕

    try {
      const token = sessionStorage.getItem("token");

      const baseURL = import.meta.env.VITE_API_URL
        ? "https://mern-app-6sjv.onrender.com"
        : "http://localhost:5000";
      await axios.post(`${baseURL}api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // alert("ატვირთვა შესრულდა ✅");
      toast.success("ატვირთვა შესრულდა");
      setTitle("");
      setImage(null);
      setDescription(""); // 🆕
      fetchImages();
    } catch (err) {
      console.error("ატვირთვის შეცდომა:", err);
    }
  };

  const handleDeleteLocal = (id) => {
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  return (
    <div>
      <Link className="btn btn-neutral ml-[5%] mt-2" to="/">
        HOME PAGE
      </Link>

      <form
        onSubmit={handleSubmit}
        className=" max-w-[90%] md:w-[500px] mx-auto flex gap-5 flex-col"
      >
        <input
          type="text"
          value={title}
          placeholder="სათაური"
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
        <textarea
          value={description}
          placeholder="აღწერა"
          onChange={(e) => setDescription(e.target.value)}
          className="input input-bordered w-full h-32"
        />
        <input
          type="file"
          className="border"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      <ImageList
        images={images}
        editable={true}
        onDeleteLocal={handleDeleteLocal}
      />
    </div>
  );
}

export default ImageUploadPage;
