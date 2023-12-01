import { useContext, useState } from "react";
import WordCard from "./WordCard";
import { SearchContext, SearchResult } from "./resultContext";

export default function Content() {
  // Hämtar funktioner/variabler från min context som behövs
  const {
    searchResult,
    saveWord,
    removeWord,
    savedWords,
    validWord,
    toggleDarkMode,
  } = useContext(SearchContext);

  // State för att visa sökresultat eller sparade ord
  const [showSavedWords, setShowSavedWords] = useState(false);

  // Variabler för att styla knappar för menyn
  const baseClasses =
    "text-dark-purple font-bold border-emerald-900 dark:border-emerald-500  inline-flex h-12 items-center whitespace-nowrap p-2 text-center focus:outline-none dark:text-floral ";
  const activeClasses = "rounded-t-md border-2 border-b-0 ";
  const passiveClasses =
    "bg-transparent cursor-base hover:border-emerald-400 dark:hover:border-emerald-300 border-b-2 ";

  return (
    <>
      {/* Menyn med knappar för att välja mellan sökresultat och sparade ord, svgs och byta tema */}
      <div className="flex w-full ">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setShowSavedWords(false)}
            className={`${baseClasses} ${
              showSavedWords ? passiveClasses : activeClasses
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`mx-1 h-5 w-5  ${
                !showSavedWords
                  ? "stroke-emerald-600 dark:stroke-emerald-500"
                  : "stroke-dark-purple dark:stroke-floral"
              }`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              />
            </svg>

            <span className="mx-1 text-sm">Search</span>
          </button>

          <button
            onClick={() => setShowSavedWords(true)}
            className={`${baseClasses} ${
              !showSavedWords ? passiveClasses : activeClasses
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`mx-1 h-6 w-6  ${
                showSavedWords
                  ? "stroke-emerald-600 dark:stroke-emerald-500"
                  : "stroke-dark-purple dark:stroke-floral"
              }`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span className="mx-1 text-sm ">Saved words</span>
          </button>
        </div>
        <div className="flex flex-1 justify-end border-b-2 border-emerald-900 dark:border-emerald-500">
          <button
            className="text-md rounded  py-2 font-bold text-emerald-900 dark:text-emerald-300"
            onClick={toggleDarkMode}
          >
            Switch theme
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col items-center border-2 border-t-0 border-emerald-900 p-2 dark:border-emerald-500">
        {/* Kontrollerar om ordet finns i API:et, om inte så visas ett felmeddelande
        Om ordet finns mappas det till en komponent som visar ordet och dess definitioner 
        Kollar också vilken "sida" som ska visas, sökresultat eller sparade ord */}
        {!validWord ? (
          <h1 className="py-4 text-5xl font-extrabold capitalize">
            No Definitions Found
          </h1>
        ) : (
          <>
            {!showSavedWords &&
              searchResult &&
              searchResult.map((word: SearchResult) => (
                <>
                  <div className="flex w-full flex-col items-center pb-16">
                    <WordCard key={word.id} {...word} />
                    <button
                      className="w-1/2 rounded-md border-2 border-emerald-950 bg-emerald-500 p-2 hover:bg-emerald-600"
                      onClick={() => saveWord(word)}
                    >
                      {" "}
                      Add to favourites
                    </button>
                  </div>
                </>
              ))}
            {showSavedWords && savedWords && (
              <div className="flex flex-col items-center">
                <h1 className="py-4 text-5xl font-extrabold capitalize text-emerald-900 dark:text-emerald-300">
                  Saved words
                </h1>
                {savedWords.map((word: SearchResult) => (
                  <>
                    <div className="flex w-full flex-col items-center pb-16">
                      <WordCard key={word.id} {...word} />
                      <button
                        className="w-1/2 rounded-md  border-2 border-dark-purple bg-dark-purple p-2 text-floral hover:bg-red-950 dark:border-floral"
                        onClick={() => removeWord(word.id!)}
                      >
                        Remove Word
                      </button>
                    </div>
                  </>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
