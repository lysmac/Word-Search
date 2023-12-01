import { useContext, useState } from "react";
import ErrorBanner from "./ErrorBanner";
import { SearchContext } from "./resultContext";

export default function Searchbar() {
  // Vad som är i sökfältet
  const [searchValue, setSearchValue] = useState("");
  const { fetchSearchResult } = useContext(SearchContext);

  // State för att visa felmeddelande
  const [error, setError] = useState(false);

  // Kollar så det finns något som inte är mellanslag i sökfältet, om det gör det timeoutar den setError till false efter 3 sekunder
  // Annars kör den fetchSearchResult
  function onSubmit(text: string) {
    if (text.trim() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setError(false);
      fetchSearchResult(text);
    }
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(searchValue);
        }}
        className="my-12 "
      >
        {" "}
        <input
          className="w-96 rounded-md border-2 border-emerald-950 p-2 dark:text-dark-purple "
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search for something"}
          value={searchValue}
        />
        <button
          type="submit"
          className="ml-4 h-full rounded bg-emerald-700 p-2  px-4 font-bold text-floral hover:bg-emerald-800"
        >
          {" "}
          Search!
        </button>
      </form>

      {error && <ErrorBanner />}
    </>
  );
}
