import { BrowserRouter, Routes, Route } from "react-router-dom";

import ImagePage from "./pages/ImagePage";
import ImageUploadPage from "./pages/ImageUploadPage";
import UploadAccess from "./pages/UploadAccess";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    sessionStorage.removeItem("token");

    // ვამოწმებთ: არჩეულია თემა თუ არა
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // თუკი არჩეული არაა, ვაყენებთ დროის მიხედვით
      const hour = new Date().getHours();
      const isDay = hour >= 8 && hour < 20;
      setTheme(isDay ? "light" : "dark");
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };


  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImagePage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/access" element={<UploadAccess />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <ImageUploadPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
