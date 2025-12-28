import React from "react";

const About = () => {
    return (
        <div className="min-h-full w-full flex justify-center items-center p-6">
            <div className="w-full max-w-3xl bg-white/25 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8 text-white">

                <h1 className="text-3xl font-semibold mb-6">
                    About
                </h1>

                <p className="text-gray-200 mb-4">
                    This application is a chatbot that allows users to ask questions and have conversations.
                </p>

                <p className="text-gray-200 mb-4">
                    Users can start new chats, continue previous conversations, and view their chat history.
                    The chatbot is designed to be simple, fast, and easy to use.
                </p>

                <p className="text-gray-200">
                    It helps users get answers and interact through a conversational interface.
                </p>

            </div>
        </div>
    );
};

export default About;
