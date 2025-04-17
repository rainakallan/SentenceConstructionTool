import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SentenceProvider } from "./Context/SentenceContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <SentenceProvider>
        <App />
      </SentenceProvider>
    </StrictMode>
  </BrowserRouter>
);
