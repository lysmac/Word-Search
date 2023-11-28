import { useContext } from "react";
import Header from "./Header";
import Searchbar from "./Searchbar";
import Words from "./Words";
import { SearchContext } from "./resultContext";

export default function App() {
  const { toggleDarkMode } = useContext(SearchContext);

  return (
    <>
      <Header />
      <Searchbar />
      <Words />
      <button
        className="dark:text-dark-purple text-floral dark:bg-floral bg-dark-purple font-bold py-2 px-4 rounded"
        onClick={toggleDarkMode}
      >
        Switch theme
      </button>
      Hola
    </>
  );
}
