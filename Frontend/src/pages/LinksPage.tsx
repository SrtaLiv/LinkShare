import React, { useEffect, useState } from "react";
import axios from "axios";

const LinksByUser = ({ username }) => {
  const [links, setLinks] = useState<{ platform: string; link: string }[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/links/user/${username}`)
      .then((response) => setLinks(response.data))
      .catch((error) => console.error("Error fetching links:", error));
  }, [username]);

  return (
    <div>
      <ul className="flex flex-col gap-4">
            {links.map((link, index) => (
                <li key={index} className="flex justify-center">
                    <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 px-6 border border-teal-500 rounded-3xl hover:scale-105 transition-all duration-200 ease cursor-pointer w-full text-center text-teal-900 font-bold"
                    >
                        {link.platform}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default LinksByUser;
