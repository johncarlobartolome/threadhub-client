import FriendsPanel from "../components/FriendsPanel";
import Feed from "../components/Feed";

export default function HomePage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-indigo-600 mb-6">ThreadHub</h2>
        <nav className="space-y-3 text-gray-700 font-medium">
          <a href="#" className="block hover:text-indigo-600">
            🏠 Friends
          </a>
          <a href="/settings" className="block hover:text-indigo-600">
            ⚙️ Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 px-60 py-10">
        <Feed />
      </main>
    </div>
  );
}
