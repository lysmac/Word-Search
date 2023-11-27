import { useContext, useState } from "react";
import { SearchContext } from "./resultContext";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const { fetchSearchResult } = useContext(SearchContext);

  function onSubmit(text: string) {
    event?.preventDefault();
    fetchSearchResult(text);
  }

  // async function fetchWord(word: string) {
  //   const response = await fetch(
  //     `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  //   );
  //   const data = await response.json();
  //   fetchSearchResult("hej");
  //   // setSearchResult(data);
  // }

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
