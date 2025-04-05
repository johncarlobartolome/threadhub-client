import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MagicLoginPage() {
  const calledRef = useRef(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying magic link...");

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    const verify = async () => {
      try {
        const res = await api.get(`/auth/magic-login/${token}`);
        localStorage.setItem("authToken", res.data.token);
        setStatus("Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } catch (err) {
        console.log(err);
        setStatus("Invalid or expired magic link.");
      }
    };
    verify();
  }, [token, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center text-xl text-gray-700">{status}</div>
    </div>
  );
}
