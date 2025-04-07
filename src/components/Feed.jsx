import { useEffect, useState } from "react";
import { getThreads } from "../services/api";
import CreateThread from "./CreateThread";
import ThreadCard from "./ThreadCard";

export default function Feed() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await getThreads();
        setThreads(res.data.threads);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
    console.log(threads);
  });

  return (
    <>
      <CreateThread />
      <div>
        {threads.map((thread) => (
          <ThreadCard key={thread._id} thread={thread} />
        ))}
      </div>
    </>
  );
}
