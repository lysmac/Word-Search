import { useContext } from "react";
import Header from "./Header";
import Searchbar from "./Searchbar";
import Words from "./Words";
import { SearchContext } from "./resultContext";

export default function App() {
  const { toggleDarkMode } = useContext(SearchContext);

  return (
    <>
      <div className="flex h-screen flex-col items-center bg-floral text-dark-purple dark:bg-dark-purple dark:text-floral ">
        <div
          id="container"
          className=" flex w-full max-w-xl flex-col items-center  "
        >
          <Header />
          <Searchbar />
          <Words />
        </div>
      </div>
    </>
  );
}
