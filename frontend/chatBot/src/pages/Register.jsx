import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "", cpassword: "", });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const { username, email, password, cpassword } = formData;

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 409) {
                    toast.error(data.data[0]);
                    return;
                }
                throw new Error("Something went wrong");
            }
            toast.success(data.data);
            navigate("/login");
        } catch (error) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md bg-linear-to-b from-slate-900 to-slate-800 border border-white/10 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Create Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleForm}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500/40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleForm}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500/40"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm mb-1 text-gray-300">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleForm}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500/40"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-white"
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </span>
                    </div>

                    <div className="relative">
                        <label className="block text-sm mb-1 text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type={showCPassword ? "text" : "password"}
                            name="cpassword"
                            value={cpassword}
                            onChange={handleForm}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500/40"
                        />
                        <span
                            onClick={() => setShowCPassword(!showCPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-white">
                            {showCPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-medium transition" >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-cyan-400 hover:underline">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;
