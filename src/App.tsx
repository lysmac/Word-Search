import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Searchbar from "./Searchbar";
import Words from "./Words";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <div id="wrapper" className={darkMode ? "dark" : ""}>
        <Header />

        <Searchbar />
        <Words />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleDarkMode}
        >
          Toggle Darkmode
        </button>
      </div>
    </>
  );
}
