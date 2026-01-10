import { Anchor, Ship, Fuel, Activity, Search, Plus, LogOut, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


interface Vessel {
    id: string;
    name: string;
    type: string;
    status: "At Sea" | "In Port" | "Maintenance";
    fuel: number;
    location: string;
}

export default function Dashboard() {

    const fuelData = [
        { day: 'Mon', consumption: 45 },
        { day: 'Tue', consumption: 52 },
        { day: 'Wed', consumption: 38 },
        { day: 'Thu', consumption: 65 },
        { day: 'Fri', consumption: 48 },
        { day: 'Sat', consumption: 42 },
        { day: 'Sun', consumption: 50 },
    ];

    const navigate = useNavigate();

    const [vessels] = useState([
        { id: "V001", name: "Ever Glory", lat: 1.290270, lng: 103.851959, status: "At Sea" }, // Singapore
        { id: "V002", name: "Oceanic Star", lat: 25.276987, lng: 55.296249, status: "In Port" }, // Dubai
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    const addVessel = () => {
        const newShip: Vessel = {
            id: `V00${vessels.length + 1}`,
            name: "New Vessel",
            type: "Cargo",
            status: "In Port",
            fuel: 100,
            location: "Dock A"
        };
        setVessels([...vessels, newShip]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">

            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-2 mb-10 text-blue-400 font-bold text-xl">
                    <Anchor size={28} /> <span>Lamia</span>
                </div>

                <nav className="flex-1 space-y-2 text-sm">
                    <div className="flex items-center gap-3 bg-blue-600/20 text-blue-400 p-3 rounded-xl border border-blue-600/30 font-semibold cursor-pointer">
                        <Activity size={18} /> Dashboard
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 p-3 hover:bg-slate-800 rounded-xl cursor-pointer transition">
                        <Ship size={18} /> Fleet Management
                    </div>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-slate-400 p-3 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition mt-auto font-medium"
                >
                    <LogOut size={18} /> Sign Out
                </button>
            </aside>


            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-800">Fleet Overview</h1>
                        <p className="text-slate-500 text-sm">Monitoring {vessels.length} active vessels worldwide.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-blue-500/30 text-sm"
                    >
                        <Plus size={18} /> Register Vessel
                    </button>
                </header>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Active Fleet" value={vessels.length.toString()} icon={<Ship className="text-blue-600" />} />
                    <StatCard title="Avg. Fuel Level" value="62.5%" icon={<Fuel className="text-orange-500" />} />
                    <StatCard title="Operational Rate" value="98.2%" icon={<Activity className="text-green-500" />} />
                </div>


                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700">Live Fleet Position</h3>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase tracking-wider animate-pulse">Live Tracking Active</span>
                    </div>

                    <MapContainer center={[20, 80]} zoom={2} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {vessels.map((ship) => (
                            <Marker key={ship.id} position={[ship.lat, ship.lng]}>
                                <Popup>
                                    <div className="font-sans">
                                        <p className="font-bold border-b pb-1 mb-1">{ship.name}</p>
                                        <p className="text-xs text-slate-500">Status: {ship.status}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[300px]">
                        <h3 className="font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">Avg. Fuel Consumption (L/nm)</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fuelData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="consumption"
                                    stroke="#2563eb"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>


                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                        <h3 className="font-bold text-slate-700">Vessel Database</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Find vessel..."
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition bg-slate-50"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-slate-400">Vessel Details</th>
                                    <th className="px-6 py-4">Current Status</th>
                                    <th className="px-6 py-4 text-center">Fuel</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {vessels.map((ship) => (
                                    <tr key={ship.id} className="hover:bg-slate-50/80 transition-colors group text-sm">
                                        <td className="px-6 py-4 uppercase font-bold text-slate-700 italic">
                                            {ship.name} <span className="block text-[10px] font-normal text-slate-400 not-italic uppercase tracking-widest">{ship.type} • {ship.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${ship.status === 'At Sea' ? 'bg-emerald-100 text-emerald-700' :
                                                ship.status === 'In Port' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {ship.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 flex-col">
                                                <span className="font-bold text-xs">{ship.fuel}%</span>
                                                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${ship.fuel < 20 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${ship.fuel}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-500">{ship.location}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-blue-600 font-bold transition">Manage</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">New Vessel</h3>
                                <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
                            </div>
                            <p className="text-slate-500 mb-8 text-sm leading-relaxed text-center">
                                Do you want to automatically register new fleet units into the ShipMaster system?
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-sm">Cancel</button>
                                <button onClick={addVessel} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200">Confirm</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}


function StatCard({ title, value, icon }: { title: string, value: string, icon: any }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">{icon}</div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
            </div>
        </div>
    );
}