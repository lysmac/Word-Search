import { useContext, useState } from "react";
import { SearchContext } from "./resultContext";

export default function Words() {
  const { searchResult, saveWord, removeWord, savedWords } =
    useContext(SearchContext);

  const { toggleDarkMode } = useContext(SearchContext);

  const [showSavedWords, setShowSavedWords] = useState(false);

  const baseClasses =
    "text-emerald-700 border-emerald-900 dark:border-emerald-500 -px-1 inline-flex h-12 items-center whitespace-nowrap px-2 py-2 text-center focus:outline-none dark:text-white sm:px-4";
  const activeClasses = "rounded-t-md border-2 border-b-0";
  const passiveClasses =
    "bg-transparent cursor-base hover:border-emerald-400 dark:hover:border-emerald-300 border-b-2";

  return (
    <>
      <div className="flex w-full pt-2">
        <div className="2 flex overflow-x-auto whitespace-nowrap ">
          <button
            onClick={() => setShowSavedWords(false)}
            className={`${baseClasses} ${
              showSavedWords ? passiveClasses : activeClasses
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 h-4 w-4 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              />
            </svg>

            <span className="mx-1 text-sm sm:text-base">Search</span>
          </button>

          <button
            onClick={() => setShowSavedWords(true)}
            className={`${baseClasses} ${
              !showSavedWords ? passiveClasses : activeClasses
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 h-4 w-4 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span className="mx-1 text-sm sm:text-base">Saved words</span>
          </button>
        </div>
        <div className="flex flex-1 border-b-2 border-emerald-900">
          <button
            className="rounded bg-dark-purple px-4 py-2 text-xs font-bold text-floral dark:bg-floral dark:text-dark-purple"
            onClick={toggleDarkMode}
          >
            Switch theme
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col items-center border-2 border-t-0 border-emerald-900 p-2">
        {" "}
        {!showSavedWords &&
          searchResult &&
          searchResult.map((word: any, index: number) => (
            <div
              className="w-96 rounded-md border-2 border-emerald-950 p-2"
              key={index}
            >
              <h2>{word.word}</h2>
              <p>{word.phonetic}</p>
              <button
                className="rounded-md border-2 border-emerald-950 bg-emerald-500 p-2 "
                onClick={() => saveWord(word)}
              >
                {" "}
                SAVE WORD TO FAVS
              </button>
              {word.phonetics[0].audio ? (
                <>
                  <audio controls data-testid="audio-element">
                    <source src={word.phonetics[0].audio} type="audio/mpeg" />
                  </audio>
                </>
              ) : (
                <p>No audio available</p>
              )}
            </div>
          ))}
        {showSavedWords && savedWords && (
          <div>
            <ul>
              {savedWords.map((word: any, index: number) => (
                <li
                  className="w-96 rounded-md border-2 border-emerald-950 p-2"
                  key={index}
                >
                  {word.word}
                  <button
                    className="rounded-md border-2 border-emerald-950 bg-emerald-500 p-2 "
                    onClick={() => removeWord(word)}
                  >
                    Remove Word
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
