import { mockData } from "./mockdata";

export default function Words() {
  return (
    <>
      {mockData.map((word) => (
        <div className="border-2 border-emerald-950 rounded-md p-2 w-96">
          <h2>{word.word}</h2>
          <p>{word.phonetic}</p>
          <audio controls>
            <source src={word.phonetics[0].audio} type="audio/mpeg" />
          </audio>{" "}
        </div>
      ))}
    </>
  );
}
