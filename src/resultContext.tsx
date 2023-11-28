import { createContext, useState } from "react";

interface SearchResult {
  word: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
    }[];
  }[];
}

interface SearchContextValue {
  searchResult: SearchResult[] | null;
  fetchSearchResult: (word: string) => Promise<void>;
  toggleDarkMode: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const SearchContext = createContext<SearchContextValue>({
  searchResult: null,
  fetchSearchResult: () => Promise.resolve(),
  toggleDarkMode: () => {},
});

export default function SearchProvider({ children }: Props) {
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchSearchResult = async (word: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
    );
    const data = await response.json();
    setSearchResult(data);
  };

  return (
    <SearchContext.Provider
      value={{ searchResult, fetchSearchResult, toggleDarkMode }}
    >
      <div id="wrapper" className={darkMode ? "dark" : "light"}>
        {children}
      </div>
    </SearchContext.Provider>
  );
}
