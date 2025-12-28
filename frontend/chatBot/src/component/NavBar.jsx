import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Context } from "../auth/AuthContext";
import SideBar from "./SideBar";

const NavBar = () => {
    const { user, logout, accessToken, fetchWithAuth } = useContext(Context);
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (!accessToken) return;

        const fetchConversations = async () => {
            const res = await fetchWithAuth(
                "http://127.0.0.1:8000/api/conversations/"
            );
            const data = await res.json();
            setConversations(Array.isArray(data) ? data : data.results || []);
        };

        fetchConversations();
    }, [accessToken]);

    const handleNewChat = async () => {
        navigate("/chat");

    };



    const handleSelectConversation = (conversationId) => {
        navigate(`/chat/${conversationId}`);
    };

    return (
        <div className="h-screen flex flex-col bg-slate-900">
            <nav className="h-14 flex items-center justify-between bg-linear-to-r from-indigo-500 to-indigo-400 text-white px-8 border-b border-white/10 ">
                <h2 className="text-lg font-semibold tracking-wide">ChatGPT</h2>
                <div className="flex items-center gap-8">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-300 font-medium" : "text-white/80 hover:text-white"}>Home</NavLink>
                    {
                        user ? (
                            <>
                                <NavLink to="/profile" className={({ isActive }) => isActive ? "text-cyan-300 font-medium" : "text-white/80 hover:text-white"}>Profile</NavLink>
                                <button onClick={logout} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-1.5 rounded-md text-black font-medium transition">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-1.5 rounded-md text-black font-medium transition ">
                                    Login
                                </NavLink>
                                <NavLink to="/register" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-1.5 rounded-md text-black font-medium transition ">
                                    Register
                                </NavLink>
                            </>
                        )
                    }
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                <SideBar
                    onSelectConversation={handleSelectConversation}
                    conversations={conversations}
                    setConversations={setConversations}
                    onNewChat={handleNewChat}
                />
                <main className="flex-1 overflow-y-auto bg-slate-900 p-6 flex justify-center ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default NavBar;
