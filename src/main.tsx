import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SearchProvider from "./resultContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SearchProvider>
    <App />
  </SearchProvider>
  // </React.StrictMode>
);
