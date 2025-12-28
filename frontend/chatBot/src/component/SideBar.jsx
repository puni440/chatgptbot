import React, { useEffect, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../auth/AuthContext";
import { Trash } from "lucide-react";

const SideBar = ({ conversations, setConversations, onNewChat }) => {
    const { accessToken, fetchWithAuth } = useContext(Context);
    const navigate = useNavigate();

    const handleDeleteConversation = async (conversationId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this conversation?"
        );
        if (!confirmDelete) return;

        try {
            await fetchWithAuth(
                `http://127.0.0.1:8000/api/conversations/${conversationId}/`,
                { method: "DELETE" }
            );
            setConversations((prev) =>
                prev.filter((conv) => conv.id !== conversationId)
            );

            navigate("/chat");
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return (
        <aside className="w-64 h-full flex flex-col bg-linear-to-b from-slate-900 to-slate-800 text-white border-r border-white/10 p-4">
            <button
                onClick={onNewChat}
                className="w-full py-2 mb-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm font-medium transition"
            >
                + New Chat
            </button>

            <p className="text-sm text-gray-300 mb-3">Recent Chats</p>


            <div className="flex-1 overflow-y-auto space-y-3 text-sm">
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        onClick={() => navigate(`/chat/${conv.id}`)}
                        className={" p-3 rounded-lg cursor-pointer transition text-white relative bg-white/5 hover:bg-white/10"}
                    >
                        <p className="truncate font-medium">
                            {conv.title || "New Chat"}
                        </p>
                        <p className="truncate text-gray-400">
                            {new Date(conv.created_at).toLocaleDateString()}
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConversation(conv.id);
                            }}
                            className="absolute right-3 top-5 text-red-400 hover:text-red-500"
                            title="Delete conversation"
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 space-y-2">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `block w-full text-center py-2 rounded-lg text-sm bg-indigo-500 hover:bg-indigo-600 transition ${isActive ? "opacity-100" : "opacity-90"
                        }`
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/update"
                    className={({ isActive }) =>
                        `block w-full text-center py-2 rounded-lg text-sm bg-indigo-500 hover:bg-indigo-600 transition ${isActive ? "opacity-100" : "opacity-90"
                        }`
                    }
                >
                    Upgrades
                </NavLink>
            </div>
        </aside>
    );
};

export default SideBar;
