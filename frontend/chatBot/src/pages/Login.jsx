import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../auth/AuthContext";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useContext(Context);
    const navigate = useNavigate();
    const { username, password } = formData;
    const [eye, setEye] = useState(false)

    function HandleEye() {
        setEye(!eye)
    }

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(data?.data);
            }
            const access = data?.data?.token?.access;
            const refresh = data?.data?.token?.refresh;
            const user = data?.data?.user;
            console.log("access", access);
            console.log("refresh", refresh);
            console.log("user", user);
            if (!access || !refresh || !user) {
                throw new Error("Invalid login response from server");
            }
            login(access, refresh, user);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md bg-linear-to-b from-slate-900 to-slate-800 border border-white/10 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Login to ChatGPT</h2>
                {
                    error && (<p className="mb-4 text-sm text-red-400 text-center">{error}</p>)
                }
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleForm}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-white/10 outline-no placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/40 "
                        />
                    </div>
                    <div className="relative" >
                        <label className="block text-sm mb-1 text-gray-300">Password</label>
                        <input
                            type={eye ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleForm}
                            required
                            disabled={loading}
                            className="  w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500/40 "
                        />
                        <span className="absolute right-4 top-8"  onClick={HandleEye} >{eye ? <Eye /> : <EyeOff />}</span>
                    </div>

                    <div className="text-right">
                        <NavLink to="#" className="text-sm text-cyan-400 hover:underline">Forgot password?</NavLink>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-medium transition ">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-300">
                    Don’t have an account?{" "}
                    <NavLink to="/register" className="text-cyan-400 hover:underline">Register</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
