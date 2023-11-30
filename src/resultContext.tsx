import { createContext, useState } from "react";

export interface SearchResult {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
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
  removeWord: (word: SearchResult) => void;
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
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [savedWords, setSavedWords] = useState<SearchResult[]>([]);
  const [validWord, setValidWord] = useState(true);

  function saveWord(word: SearchResult) {
    setSavedWords([...savedWords, word]);
  }

  function removeWord(word: SearchResult) {
    const newSavedWords = savedWords.filter((w) => w.word !== word.word);
    setSavedWords(newSavedWords);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
