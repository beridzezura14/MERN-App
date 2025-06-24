import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function UploadAccess() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        password,
      });
      const token = res.data.token;

      sessionStorage.setItem("token", token);
      navigate("/upload");
    } catch (err) {
      toast.error("პაროლი არასწორია")

      
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-[100dvh] flex flex-col gap-8 justify-center items-center">
        <h2 className="text-2xl">Enter Admin Panel Password</h2>
      <div className="flex gap-2" >
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary" type="submit">ENTER</button>
      </div>
    </form>
  );
}

export default UploadAccess;
