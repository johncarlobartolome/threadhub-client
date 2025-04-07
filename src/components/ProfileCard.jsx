export default function ProfileCard({ user, position, onClose }) {
  if (!user) return null;
  return (
    <div
      className="absolute z-50 bg-white rounded-2xl shadow-lg p-6 w-80 text-center border border-gray-100"
      style={{ top: position.top, left: position.left }}
      onMouseLeave={onClose}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.avatar || "/blank-profile.png"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover bg-gray-200"
        />
        <div>
          {" "}
          <h2 className="text-lg font-bold">{user.username}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {user.followers} follower{user.followers !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
          Follow
        </button>
        <button className="border border-gray-400 py-2 rounded-lg font-medium hover:bg-gray-50">
          Message
        </button>
      </div>

      <div className="text-left">
        <h3 className="font-semibold text-sm mb-1">Bio</h3>
        <p className="text-sm text-gray-600">
          {user.bio || "This user hasn't added a bio yet."}
        </p>
      </div>
    </div>
  );
}
