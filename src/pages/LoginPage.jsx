import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async () => {
    if (!email) {
      setStatus("Please enter your email.");
      return;
    }
    try {
      setLoading(true);
      setStatus(null);
      const res = await api.post("/auth/magic-link", { email });
      navigate("/magic-link-sent", { state: { email } });
      setStatus(res.data.message || "Magic link sent!");
    } catch (err) {
      setStatus(err.response?.data?.error || "Failed to send magic link");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-5xl min-h-[600px] bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex flex-col items-center justify-center p-10">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
              🔗
            </div>
            <h1 className="text-4xl font-extrabold mb-4">ThreadHub</h1>
            <p className="text-lg font-light max-w-sm mx-auto">
              Collaborate. Share. Build something amazing, one thread at a time.
            </p>
          </div>
        </div>
        {/* Right Panel */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Login to ThreadHub
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-600">Email address</span>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button
                onClick={handleMagicLink}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition"
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </button>
              {status && (
                <div className="text-sm text-gray-600 text-center">
                  {status}
                </div>
              )}
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => alert("Redirect to Google OAuth")}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium"
              >
                Google
              </button>
              <button
                onClick={() => alert("Redirect to Facebook OAuth")}
                className="w-full bg-blue-600 hover:bg-blue-700 text white py-2 rounded-md font-medium"
              >
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
