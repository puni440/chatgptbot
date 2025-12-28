import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-full w-full flex justify-center items-center p-6">
            <div className="w-full max-w-3xl bg-white/25 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8 text-white">
                <h1 className="text-3xl font-semibold mb-4">Welcome to ChatGPT </h1>
                <p className="text-gray-200 mb-6">Ask questions, explore conversations.</p>

                <div className="grid gap-4">
                    <div onClick={() => navigate("/chat")} className="bg-black/30 p-4 rounded-lg cursor-pointer hover:bg-black/40 transition">
                        <h3 className="font-medium mb-2"> Chat</h3>
                        <p className="text-sm text-gray-300">Start a new conversation instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
