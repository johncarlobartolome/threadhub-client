import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MagicLinkSent from "./pages/MagicLinkSentPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/magic-link-sent" element={<MagicLinkSent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
