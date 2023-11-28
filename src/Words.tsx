import { useContext } from "react";
import { SearchContext } from "./resultContext";

export default function Words() {
  const { searchResult } = useContext(SearchContext);
  return (
    <div>
      {searchResult === null ? (
        <p>You haven't searched for anything</p>
      ) : (
        searchResult.map((word: any) => (
          <div
            className="border-2 border-emerald-950 rounded-md p-2 w-96"
            key={word.word}
          >
            <h2>{word.word}</h2>
            <p>{word.phonetic}</p>
            {word.phonetics[0].audio ? (
              <>
                <button>AUDIO</button>
                <audio controls>
                  <source src={word.phonetics[0].audio} type="audio/mpeg" />
                </audio>
              </>
            ) : (
              <p>No audio available</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
