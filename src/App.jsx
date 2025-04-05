import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MagicLinkSent from "./pages/MagicLinkSentPage";
import HomePage from "./pages/HomePage";
import MagicLoginPage from "./pages/MagicLoginPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/magic-link-sent" element={<MagicLinkSent />} />
        <Route path="/magic-login/:token" element={<MagicLoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
