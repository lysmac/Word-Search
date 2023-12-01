import { createContext, useState } from "react";
import { useSessionStorageState } from "./useSessionStorage";

// Interfaces för att kunna använda datan från API:et
export interface SearchResult {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
  id?: number;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface Definition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

export interface Phonetic {
  text: string;
  audio?: string;
}

interface SearchContextValue {
  searchResult: SearchResult[] | null;
  fetchSearchResult: (word: string) => Promise<void>;
  toggleDarkMode: () => void;
  saveWord: (word: SearchResult) => void;
  removeWord: (wordId: number) => void;
  savedWords: SearchResult[];
  validWord: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const SearchContext = createContext<SearchContextValue>({
  searchResult: null,
  fetchSearchResult: () => Promise.resolve(),
  toggleDarkMode: () => {},
  saveWord: () => {},
  removeWord: () => {},
  savedWords: [],
  validWord: true,
});

export default function SearchProvider({ children }: Props) {
  // Sökresultat från API:et
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  // Boolean för darkmode
  const [darkMode, setDarkMode] = useState(false);
  // Sparade ord för favoriter, använder session-storage hook för att spara datan även där
  const [savedWords, setSavedWords] = useSessionStorageState<SearchResult[]>(
    [],
    "savedWords",
  );
  // Boolean för att kontrollera om ordet är giltigt eller inte
  const [validWord, setValidWord] = useState(true);

  // Sparar ordet som favorit, använder Date.now() för att få ett unikt id
  function saveWord(word: SearchResult) {
    const wordWithId = { ...word, id: Date.now() };
    setSavedWords([...savedWords, wordWithId]);
  }

  // Tar bort ordet från favoriter
  function removeWord(wordId: number) {
    const newSavedWords = savedWords.filter((w) => w.id !== wordId);
    setSavedWords(newSavedWords);
  }

  // Toggla darkmode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Hämtar sökresultat från API:et. Om ordet inte finns i API:et sätts validWord till false som triggar errorkomponenten
  const fetchSearchResult = async (word: string) => {
    setSearchResult(null);
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
    );
    const data = await response.json();
    if (data.title === "No Definitions Found") {
      setValidWord(false);
      return;
    }
    setValidWord(true);
    setSearchResult(data);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResult,
        fetchSearchResult,
        toggleDarkMode,
        saveWord,
        removeWord,
        savedWords,
        validWord,
      }}
    >
      <div id="wrapper" className={darkMode ? "dark" : "light"}>
        {children}
      </div>
    </SearchContext.Provider>
  );
}
