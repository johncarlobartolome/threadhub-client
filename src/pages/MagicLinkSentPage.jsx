import { useLocation, useNavigate } from "react-router-dom";

export default function MagicLinkSentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="mx-w-lg w-full bg-white p-8 rounded-xl shadow-md text-center">
        <div className="text-4xl mb-4">📬</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Magic Link Sent!
        </h1>
        <p className="text-gray-600 mb-4">
          We've sent a login link to{" "}
          <span className="font-semibold">{email}</span>. Please check your
          inbox and click the link to log in.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
