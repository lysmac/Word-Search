import { SearchResult } from "./resultContext";

export default function WordCard(props: SearchResult, index: number) {
  return (
    <>
      <div
        className="w-96 rounded-md border-2 border-emerald-950 p-2"
        key={index}
      >
        <h2 className="text-3xl capitalize ">{props.word}</h2>

        {props.phonetics.map((phonetic) => (
          <span>{phonetic.text}</span>
        ))}
        {props.meanings.map((meaning) => (
          <div>
            <h3 className="text-xl capitalize">{meaning.partOfSpeech}</h3>
            {meaning.definitions.length > 0 && (
              <div>
                {meaning.definitions[0].definition && (
                  <p>
                    <b>Definition:</b> {meaning.definitions[0].definition}
                  </p>
                )}
                {meaning.definitions[0].example && (
                  <p>
                    <b>Example:</b> {meaning.definitions[0].example}
                  </p>
                )}
                {meaning.definitions[0].synonyms &&
                  meaning.definitions[0].synonyms.length > 0 && (
                    <p>
                      <b>Synonyms:</b>
                      {meaning.definitions[0].synonyms.join(", ")}
                    </p>
                  )}
                {meaning.definitions[0].antonyms &&
                  meaning.definitions[0].antonyms.length > 0 && (
                    <p>
                      <b>Antonyms: </b>
                      {meaning.definitions[0].antonyms.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </div>
        ))}
        {props.phonetics?.find((phonetic) => phonetic.audio) ? (
          <div>
            <audio controls data-testid={`audio-element-0`}>
              <source
                src={props.phonetics.find((phonetic) => phonetic.audio)?.audio}
                type="audio/mpeg"
              />
            </audio>
          </div>
        ) : (
          <div>No sound found</div>
        )}
      </div>
    </>
  );
}
