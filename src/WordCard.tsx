import { SearchResult } from "./resultContext";

// Renderar ut sökresultatet
export default function WordCard(props: SearchResult, index: number) {
  return (
    <>
      <div className="w-full p-2" key={index}>
        <div className="flex items-center">
          <h2 className="pr-2 text-4xl font-extrabold capitalize">
            {props.word}
          </h2>

          <span className="text-xl italic">
            {props.phonetics.map((phonetic) => phonetic.text).join(" - ")}
          </span>
        </div>
        {props.phonetics?.find((phonetic) => phonetic.audio) ? (
          <div className="flex justify-center py-2">
            <audio controls data-testid="audio-element">
              <source
                src={props.phonetics.find((phonetic) => phonetic.audio)?.audio}
                type="audio/mpeg"
              />
            </audio>
          </div>
        ) : (
          <div>No sound found</div>
        )}
        {props.meanings.map((meaning, meaningIndex) => (
          <div key={meaningIndex}>
            <h3 className="pt-4 text-2xl font-bold capitalize">
              {meaning.partOfSpeech}
            </h3>
            <div className="">
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="pb-2 text-sm">
                  <h4 className="text-lg font-bold">Synonyms:</h4>{" "}
                  {meaning.synonyms.join(", ")}
                </div>
              )}

              {meaning.definitions && meaning.definitions.length > 0 && (
                <>
                  <h4 className="text-lg font-bold">Definitions:</h4>
                  {meaning.definitions.map(
                    (definition, defIndex) =>
                      definition.definition && (
                        <ul className="pb-2 text-sm">
                          <li key={defIndex}>{definition.definition}</li>
                          {definition.example && (
                            <li>
                              <b>Example: </b>
                              {definition.example}
                            </li>
                          )}
                        </ul>
                      ),
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
