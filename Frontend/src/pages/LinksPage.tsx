import React, { useEffect, useState } from "react";
import axios from "axios";

const LinksByUser = ({ username }) => {
  const [links, setLinks] = useState<{ platform: string; link: string; id: string }[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/links/user/${username}`)
      .then((response) => setLinks(response.data))
      .catch((error) => console.error("Error fetching links:", error));
  }, [username]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8081/api/links/${id}`);
      setLinks(links.filter(link => link.id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => (
          <li key={index} className="flex items-center gap-2">
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 border border-teal-500 rounded-3xl hover:scale-105 transition-all duration-200 ease cursor-pointer flex-1 text-center text-teal-900 font-bold"
            >
              {link.platform}
            </a>
            <button
              onClick={() => handleDelete(link.id)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => window.location.href = `/edit-link/${link.id}`}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksByUser;
