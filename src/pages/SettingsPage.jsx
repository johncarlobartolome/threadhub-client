import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import FormField from "../components/FormField";

export default function SettingsPage() {
  const calledRef = useRef(false);
  const [token] = useState(localStorage.getItem("authToken"));
  const [form, setForm] = useState({ name: "", username: "", bio: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.user;

        setForm((prevForm) => ({
          ...prevForm,
          name: data.name,
          username: data.username,
          bio: data.bio,
        }));
      } catch (err) {
        console.log(err);
        setStatus("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await api.put("/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus("Profile updated!");
    } catch {
      setStatus("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-64 bg-white shadow-md px-6 py-8 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Settings</h2>
        <div className="text-indigo-600 font-medium">Profile</div>
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold-mb-6">Edit Profile</h2>
          <div className="space-y-4">
            <FormField
              id="name"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <FormField
              id="username"
              label="Username"
              name="username"
              onChange={handleChange}
              value={form.username}
            />
            <FormField
              id="bio"
              label="Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              textarea
            />
            <button
              onClick={handleSave}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
            {status && (
              <p className="text-sm text-center mt-2 text-gray-600">{status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
