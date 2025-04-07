import { useState, useRef } from "react";

import { getUserData } from "../services/api";
import ProfileCard from "./ProfileCard";

export default function ThreadCard({ thread }) {
  const { content, mediaUrls, createdAt, userId } = thread;
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [cardPos, setCardPos] = useState({ top: 0, left: 0 });

  const userRef = useRef();
  let hideTimeout = null;

  const handleMouseEnter = async () => {
    clearTimeout(hideTimeout);
    const res = await getUserData(userId);
    const data = res.data;

    const rect = userRef.current.getBoundingClientRect();
    setCardPos({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX,
    });
    setProfileData(data);
    setShowProfile(true);
  };

  const handleMouseLeave = async () => {
    hideTimeout = setTimeout(() => {
      setShowProfile(false);
    }, 50);
  };
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <div className="text-sm inline-block">
        Posted by:{" "}
        <div
          ref={userRef}
          className="inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-blue-600 cursor-pointer">{userId}</span>
          {showProfile && <ProfileCard user={profileData} position={cardPos} />}
        </div>
      </div>
      {content && <p className="text-gray-800 mb-3">{content}</p>}
      {mediaUrls?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap03 mb-3">
          {mediaUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`thread-media-${idx}`}
              className="w-full h-40 object-cover rounded border"
            />
          ))}
        </div>
      )}
      <div className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleString()}
      </div>
    </div>
  );
}
