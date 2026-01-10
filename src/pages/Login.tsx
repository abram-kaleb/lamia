import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Lock, User } from "lucide-react";

export default function Login() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {

            localStorage.setItem("isLoggedIn", "true");


            navigate("/dashboard");
        }
    };


    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                        <Anchor size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                </div>


                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-900"
                                placeholder="Enter your username"

                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-900"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}