import { useContext } from "react";
import { SearchContext } from "./resultContext";

export default function Words() {
  const { searchResult, saveWord, removeWord, savedWords } =
    useContext(SearchContext);
  return (
    <div>
      {" "}
      {searchResult === null ? (
        <p>You haven't searched for anything</p>
      ) : (
        searchResult.map((word: any, index: number) => (
          <div
            className="border-2 border-emerald-950 rounded-md p-2 w-96"
            key={index}
          >
            <h2>{word.word}</h2>
            <p>{word.phonetic}</p>
            <button
              className="border-2 border-emerald-950 bg-emerald-500 rounded-md p-2 "
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
        ))
      )}
      {savedWords === null ? (
        <p>No saved words</p>
      ) : (
        <div>
          <ul>
            {savedWords.map((word: any, index: number) => (
              <li
                className="border-2 border-emerald-950 rounded-md p-2 w-96"
                key={index}
              >
                {word.word}
                <button
                  className="border-2 border-emerald-950 bg-emerald-500 rounded-md p-2 "
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
  );
}
