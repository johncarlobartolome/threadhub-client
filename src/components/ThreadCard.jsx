export default function ThreadCard({ thread }) {
  const { content, mediaUrls, createdAt, userId } = thread;
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <div className="text-sm text-gray-500 mb-1">Posted by: {userId}</div>
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
