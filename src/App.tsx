import Content from "./Content";
import Header from "./Header";
import Searchbar from "./Searchbar";

export default function App() {
  return (
    <>
      <div className="flex h-screen flex-col items-center bg-floral text-dark-purple dark:bg-dark-purple dark:text-floral ">
        <div
          id="container"
          className=" flex w-full max-w-xl flex-col items-center  "
        >
          <Header />
          <Searchbar />
          <Content />
        </div>
      </div>
    </>
  );
}
