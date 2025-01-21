import { AddLink, MoreHoriz, NotificationsNone } from "@mui/icons-material";
import LinksByUser from "./LinksPage";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddLinkBTN } from "./components/AddLink/AddLinks";
import { useAuth } from "./auth/AuthProvider";

export const HomePage = () => {
    const { username } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user && user.username) {
            navigate(`/user/${user.username}`);
        }
    }, [user, navigate]);

    useEffect(() => {
        if (username) {
            axios
                .get(`http://localhost:8081/api/links/user/${username}`)
                .then((response) => setUserData(response.data))
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, [username]);

    return (
        <main className="w-full min-h-screen flex bg-teal-100">

            <div className="w-[90%] md:w-[33%] mx-auto py-8">
                <AddLinkBTN />
                <div className="flex flex-col">

                    <div className="flex flex-row w-full justify-between">
                        <button className="size-10 bg-black/25 rounded-full"><NotificationsNone className="text-white" /></button>
                        <button className="size-10 bg-black/25 rounded-full"><MoreHoriz className="text-white" /></button>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">

                        <div className="rounded-full size-24 bg-slate-500 overflow-hidden">
                            <img src="https://ugc.production.linktr.ee/a85ceb97-98c0-4108-b0ee-b2b39fb606a8_WhatsApp-Image-2024-02-22-at-16.03.47.jpeg?io=true&size=avatar-v3_0" />
                        </div>

                        <div className="flex flex-col items-center gap-1 max-w-[75%]">
                            <h1 className="text-2xl text-center font-bold text-teal-900">{`@${username}`}</h1>

                            <p className="text-xl text-center text-teal-700">Hola! Soy Oli, me encanta la programación, la productividad y subir contenido :)</p>
                        </div>
                    </div>

                </div>


                <div className="flex flex-col gap-4 mt-8">
                  {/* Renderizar los links del usuario */}
                    <LinksByUser username={username} />

                </div>
            </div>

        </main>
    );
}