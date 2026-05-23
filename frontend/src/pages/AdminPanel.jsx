import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, MapPin, BarChart2, LogOut,
  Trash2, TrendingUp, Globe, Calendar, Wallet, Shield,
  AlertTriangle, ChevronRight, RefreshCw, Menu, X,
} from "lucide-react";

const API = "http://localhost:5000/api/admin";

function getToken() {
  return localStorage.getItem("travelToken") || "";
}

function authHeaders() {
  return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-3xl font-black text-slate-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ── Section Heading ────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return <h2 className="text-xl font-bold text-slate-800 mb-4">{children}</h2>;
}

// ── Confirm Dialog ─────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={22} className="text-red-500" />
          <h3 className="font-bold text-slate-800 text-lg">Confirm Delete</h3>
        </div>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── OVERVIEW ──────────────────────────────────────────────────────────────
function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API}/analytics`, { headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setData(json.data);
    } catch (e) {
      setError(e.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMsg msg={error} onRetry={load} />;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time platform statistics</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition text-sm font-medium">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={data.totalUsers} sub={`+${data.recentUsersCount} this week`} color="bg-blue-500" />
        <StatCard icon={MapPin} label="Total Trips" value={data.totalTrips} sub={`+${data.recentTripsCount} this week`} color="bg-cyan-500" />
        <StatCard icon={Wallet} label="Avg Budget" value={`₹${(data.avgBudget || 0).toLocaleString()}`} sub="Per trip average" color="bg-violet-500" />
        <StatCard icon={TrendingUp} label="Top Destination" value={data.topDestinations?.[0]?._id || "—"} sub={`${data.topDestinations?.[0]?.count || 0} trips planned`} color="bg-emerald-500" />
      </div>

      {/* Top Destinations */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <SectionTitle>🌍 Top Destinations</SectionTitle>
        <div className="space-y-3">
          {(data.topDestinations || []).map((d, i) => (
            <div key={d._id} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-cyan-50 text-cyan-600 text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700">{d._id}</span>
                  <span className="text-xs text-slate-500">{d.count} trips</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${Math.min(100, (d.count / (data.topDestinations[0]?.count || 1)) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <SectionTitle>👥 Recent Users</SectionTitle>
          <div className="space-y-3">
            {(data.recentUsers || []).map((u) => (
              <div key={u._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {u.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{u.name}</p>
                  <p className="text-xs text-slate-400 truncate">{u.email}</p>
                </div>
                {u.isAdmin && <span className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-semibold">Admin</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <SectionTitle>✈️ Recent Trips</SectionTitle>
          <div className="space-y-3">
            {(data.recentTrips || []).map((t) => (
              <div key={t._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white">
                  <Globe size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{t.destination}</p>
                  <p className="text-xs text-slate-400">{t.days} days · ₹{(t.budget || 0).toLocaleString()}</p>
                </div>
                <span className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── USER MANAGEMENT ────────────────────────────────────────────────────────
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API}/users`, { headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setUsers(json.data);
    } catch (e) {
      setError(e.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/users/${id}`, { method: "DELETE", headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    } finally {
      setConfirm(null);
    }
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMsg msg={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      {confirm && (
        <ConfirmDialog
          message={`Delete user "${confirm.name}"? This cannot be undone.`}
          onConfirm={() => handleDelete(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">{users.length} registered users</p>
        </div>
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-cyan-200 w-full sm:w-64"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">User</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Email</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Joined</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Role</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                        {u.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <span className="font-semibold text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {u.isAdmin ? (
                      <span className="px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold">Admin</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">User</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!u.isAdmin && (
                      <button
                        onClick={() => setConfirm({ id: u._id, name: u.name })}
                        className="p-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── PLANS MANAGEMENT ───────────────────────────────────────────────────────
function PlansManagement() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API}/trips`, { headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setTrips(json.data);
    } catch (e) {
      setError(e.message || "Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/trips/${id}`, { method: "DELETE", headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    } finally {
      setConfirm(null);
    }
  };

  const filtered = trips.filter((t) =>
    t.destination?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMsg msg={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      {confirm && (
        <ConfirmDialog
          message={`Delete trip to "${confirm.dest}"? This cannot be undone.`}
          onConfirm={() => handleDelete(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Plans Management</h1>
          <p className="text-slate-500 text-sm mt-1">{trips.length} total trip plans</p>
        </div>
        <input
          placeholder="Search by destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-cyan-200 w-full sm:w-64"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Destination</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Days</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Budget</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Created</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">User ID</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Globe size={15} className="text-cyan-500" />
                      <span className="font-semibold text-slate-800">{t.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{t.days} days</td>
                  <td className="px-6 py-4 text-slate-600">₹{(t.budget || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs truncate max-w-[120px]">{t.userId}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setConfirm({ id: t._id, dest: t.destination })}
                      className="p-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Delete trip"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">No trips found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────
function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API}/analytics`, { headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setData(json.data);
    } catch (e) {
      setError(e.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMsg msg={error} onRetry={load} />;
  if (!data) return null;

  const maxCount = Math.max(...(data.tripsByDay || []).map((d) => d.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Platform growth and usage insights</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Users" value={data.totalUsers} color="bg-blue-500" />
        <StatCard icon={MapPin} label="Total Trips" value={data.totalTrips} color="bg-cyan-500" />
        <StatCard icon={Wallet} label="Avg Trip Budget" value={`₹${(data.avgBudget || 0).toLocaleString()}`} color="bg-violet-500" />
      </div>

      {/* Trips last 7 days chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <SectionTitle>📈 Trips Generated (Last 7 Days)</SectionTitle>
        {data.tripsByDay?.length > 0 ? (
          <div className="flex items-end gap-3 h-40 mt-4">
            {data.tripsByDay.map((d) => (
              <div key={d._id} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-slate-600">{d.count}</span>
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg transition-all"
                  style={{ height: `${Math.max(8, (d.count / maxCount) * 120)}px` }}
                />
                <span className="text-[10px] text-slate-400 text-center">
                  {new Date(d._id).toLocaleDateString("en", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm mt-4">No trip data for the last 7 days.</p>
        )}
      </div>

      {/* Top Destinations */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <SectionTitle>🌍 Top Destinations</SectionTitle>
        <div className="space-y-4 mt-2">
          {(data.topDestinations || []).map((d, i) => (
            <div key={d._id} className="flex items-center gap-4">
              <span className="w-6 text-sm font-bold text-slate-400">{i + 1}.</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-700">{d._id}</span>
                  <span className="text-xs font-semibold text-cyan-600">{d.count} trips</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{ width: `${(d.count / (data.topDestinations[0]?.count || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-slate-500 text-sm font-medium">New Users (7d)</p>
          <p className="text-4xl font-black text-blue-500 mt-1">{data.recentUsersCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-slate-500 text-sm font-medium">New Trips (7d)</p>
          <p className="text-4xl font-black text-cyan-500 mt-1">{data.recentTripsCount}</p>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-10 h-10 rounded-full border-4 border-cyan-200 border-t-cyan-500 animate-spin" />
    </div>
  );
}

function ErrorMsg({ msg, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 py-20">
      <AlertTriangle size={32} className="text-red-400" />
      <p className="text-slate-600">{msg}</p>
      <button onClick={onRetry} className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition">
        Try Again
      </button>
    </div>
  );
}

// ── SIDEBAR NAV ────────────────────────────────────────────────────────────
const NAV = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "users", label: "User Management", icon: Users },
  { key: "plans", label: "Plans Management", icon: MapPin },
  { key: "analytics", label: "Analytics", icon: BarChart2 },
];

// ── MAIN ADMIN PANEL ──────────────────────────────────────────────────────
function AdminPanel({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Verify admin on mount
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("travelUser") || "{}");
      if (!user?.isAdmin) navigate("/home", { replace: true });
    } catch {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("travelToken");
    localStorage.removeItem("travelUser");
    onLogout?.();
    navigate("/", { replace: true });
  };

  const adminUser = (() => {
    try { return JSON.parse(localStorage.getItem("travelUser") || "{}"); } 
    catch { return {}; }
  })();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 shadow-lg flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
      `}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm">Romiz Admin</p>
              <p className="text-xs text-slate-400">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Admin info */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
              <span className="text-violet-700 text-sm font-black">{adminUser.name?.[0]?.toUpperCase() || "A"}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{adminUser.name || "Admin"}</p>
              <p className="text-[11px] text-slate-400 truncate">{adminUser.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                tab === key
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {label}
              {tab === key && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={18} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-slate-800 capitalize">
              {NAV.find((n) => n.key === tab)?.label || ""}
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Live</span>
          </div>
          <Calendar size={16} className="text-slate-400" />
          <span className="text-xs text-slate-400">{new Date().toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}</span>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">
          {tab === "overview" && <Overview />}
          {tab === "users" && <UserManagement />}
          {tab === "plans" && <PlansManagement />}
          {tab === "analytics" && <Analytics />}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
