import { useContext, useState } from "react";
import { SearchContext } from "./resultContext";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const { fetchSearchResult } = useContext(SearchContext);
  const [error, setError] = useState("");

  function onSubmit(text: string) {
    if (text.trim() === "") {
      setError("Please enter a search term");
    } else {
      setError("");
      fetchSearchResult(text);
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(searchValue);
      }}
    >
      {" "}
      <input
        className="border-2 border-emerald-950 rounded-md p-2 w-96"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={"Search for something"}
        value={searchValue}
      />
      {error && <p>{error}</p>}
      <button
        type="submit"
        className="bg-emerald-700 hover:bg-emerald-800 text-floral font-bold py-2 px-4 rounded"
      >
        {" "}
        Search!
      </button>
    </form>
  );
}
