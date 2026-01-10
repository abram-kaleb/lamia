import { Anchor, Ship, ShieldCheck, BarChart3, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <Anchor size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Lamia <span className="text-blue-600">v1_airn</span></span>
                </div>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                >
                    Login to Dashboard
                </button>
            </nav>


            <header className="relative pt-20 pb-32 px-8 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
                    The Operating System for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                        Modern Maritime Fleet
                    </span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
                    Optimize routes, manage crew certifications, and monitor fuel consumption in one integrated dashboard.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-xl shadow-blue-500/20"
                    >
                        Start Free Demo
                    </button>
                </div>
            </header>


            <section className="py-24 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<Ship className="text-blue-600" />}
                    title="Fleet Tracking"
                    desc="Real-time AIS tracking dengan data historis perjalanan kapal."
                />
                <FeatureCard
                    icon={<Users className="text-blue-600" />}
                    title="Crew Management"
                    desc="Pantau masa berlaku sertifikat dan rotasi kru secara otomatis."
                />
                <FeatureCard
                    icon={<BarChart3 className="text-blue-600" />}
                    title="Vessel Analytics"
                    desc="Optimasi bahan bakar menggunakan algoritma AI maritim."
                />
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}