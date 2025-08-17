import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );


  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px",
        borderRadius: "50%",
        background: theme === "dark" ? "#333" : "#eee",
        border: "none",
        cursor: "pointer",
        transition: "background 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <SunIcon size={20} color="#FFD700" />
      ) : (
        <MoonIcon size={20} color="#222" />
      )}
    </button>
  );
};

export default ThemeToggle;
