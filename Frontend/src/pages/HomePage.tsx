import { NotificationsNone, MoreHoriz } from "@mui/icons-material";
import LinksByUser from "./LinksPage";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export const HomePage = () => {
    const { username } = useParams();
    const { user } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(`/`);
        }
        else if (user.username) {
            navigate(`/user/${user.username}`);
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Evita renderizar contenido antes de redirigir
    }
    return (
        <main className="w-full min-h-screen flex bg-teal-100">
            <div className="w-[90%] md:w-[33%] mx-auto py-8">
                <div className="flex flex-col">
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
                    <LinksByUser username={username} />
                </div>
            </div>
        </main>
    );
}