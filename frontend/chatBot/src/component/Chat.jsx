import React, { useEffect, useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../auth/AuthContext";

const Chat = () => {
  const { accessToken, fetchWithAuth } = useContext(Context);
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const [activeConversation, setActiveConversation] = useState(conversationId || null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // reset on route change
  useEffect(() => {
    setMessages([]);
    setActiveConversation(conversationId || null);
  }, [conversationId]);

  // load messages
  useEffect(() => {
    if (!accessToken || !conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetchWithAuth(
          `http://127.0.0.1:8000/api/conversations/${conversationId}/messages/`
        );
        const data = await res.json();

        setMessages(
          data.map((msg) => ({
            id: msg.id,
            sender: msg.sender,
            text: msg.text,
          }))
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, [conversationId, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await fetchWithAuth("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversation_id: activeConversation,
        }),
      });

      const data = await res.json();

      // first message → conversation created
      if (!activeConversation) {
        setActiveConversation(data.conversation_id);
        navigate(`/chat/${data.conversation_id}`, { replace: true });
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "user", text: input },
        { id: crypto.randomUUID(), sender: "bot", text: data.bot_message },
      ]);

      setInput("");
    } catch (err) {
      console.error("Message send failed", err);
    }
  };

  return (
    <div className="w-full max-w-5xl h-full flex flex-col">
      <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${msg.sender === "user"
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-700 text-gray-200"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex gap-3 bg-slate-800 p-3 rounded-xl"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white outline-none"
          />
          <button className="px-6 py-2 rounded-lg bg-indigo-500 text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
