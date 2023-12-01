import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SearchProvider from "./resultContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* // <SearchProvider> är min context som har globala states som ska kunnas nå från alla komponenter i <App/> */}
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
);
