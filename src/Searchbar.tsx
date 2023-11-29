import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { SearchContext } from "./resultContext";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const { fetchSearchResult } = useContext(SearchContext);
  const [error, setError] = useState("");
  const targetDiv = document.getElementById("container");

  function onSubmit(text: string) {
    if (text.trim() === "") {
      setError("Please enter a search term");
    } else {
      setError("");
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
        className="my-12"
      >
        {" "}
        <input
          className="w-96 rounded-md border-2 border-emerald-950 p-2 dark:text-dark-purple"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search for something"}
          value={searchValue}
        />
        <button
          type="submit"
          className="ml-4 h-full rounded bg-emerald-700 px-4  font-bold text-floral hover:bg-emerald-800"
        >
          {" "}
          Search!
        </button>
      </form>

      {targetDiv &&
        createPortal(
          error && (
            <div className="dark:bg-gray-800 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
              <div className="flex w-12 items-center justify-center bg-red-500">
                <svg
                  className="fill-current h-6 w-6 text-white"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>

              <div className="-mx-3 px-4 py-2">
                <div className="mx-3">
                  <span className="font-semibold text-red-500 dark:text-red-400">
                    Error
                  </span>
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          ),
          targetDiv,
        )}
    </>
  );
}
