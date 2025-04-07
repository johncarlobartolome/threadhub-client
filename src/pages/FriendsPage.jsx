import { useState, useEffect } from "react";
import {
  getFriends,
  getFollowers,
  getFollowing,
} from "../services/userService";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("friends");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let res;
      if (activeTab === "friends") res = await getFriends();
      else if (activeTab === "followers") res = await getFollowers();
      else if (activeTab === "following") res = await getFollowing();
      setUsers(res.data);
      console.log(res.data);
    };

    fetchData();
  }, [activeTab]);

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <div className="flex gap-4 mb-4 justify-center">
        {["friends", "following", "followers"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer px-4 py-1 rounded-lg font-medium ${
              activeTab === tab
                ? "bg-blue-100 text-blue-600 border border-blue-500"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <input
        type="text"
        className="w-full border p-2 rounded-md mb-4"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((user) => (
            <p>${user}</p>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10">
          {activeTab === "friends" && "You don't have any friends yet."}
          {activeTab === "followers" && "No one is following you yet."}
          {activeTab === "following" && "You're not following anyone yet."}
        </div>
      )}
    </div>
  );
}
