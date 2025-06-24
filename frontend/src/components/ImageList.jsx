import axios from "axios";
import { useState } from "react";

function ImageList({ images, editable = false, onDeleteLocal }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("წავშალოთ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/upload/${id}`);
      onDeleteLocal && onDeleteLocal(id);
    } catch (err) {
      console.error("წაშლის შეცდომა:", err);
    }
  };

  const handleEdit = (id, currentTitle, currentDescription) => {
    setEditId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription || "");
    setEditImage(null);
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    if (editImage) formData.append("image", editImage);

    try {
      await axios.put(`http://localhost:5000/api/upload/${id}`, formData);
      setEditId(null);
      window.location.reload();
    } catch (err) {
      console.error("რედაქტირების შეცდომა:", err);
    }
  };

  return (
    <div className="max-w-[90%] my-16 mx-auto " >
      <h3 className="text-5xl">Product</h3>
      <div className="grid py-8 gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {images.length > 0 ? (
          images.map((item) => (
            <div className="grid gap-2" key={item._id}>
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.title}
                className="w-full"
              />

              {editId === item._id ? (
                editable && (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <input
                      type="file"
                      onChange={(e) => setEditImage(e.target.files[0])}
                    />
                    <button onClick={() => handleSave(item._id)}>
                      💾 შენახვა
                    </button>
                  </>
                )
              ) : (
                <>
                  <h4 className="text-2xl">{item.title}</h4>
                  <p>{item.description}</p>
                  {editable && (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(item._id, item.title, item.description)
                        }
                        className="border-2"
                      >
                        EDIT
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="border-2 border-red-500">
                        DELETE
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <>
            <h5 className="text-center p-10 text-4xl">nothing is here</h5>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageList;
