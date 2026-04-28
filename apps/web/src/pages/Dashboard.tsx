import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { ShieldCheck, Activity, Database, TrendingUp, RefreshCcw, ExternalLink, Zap, Globe, AlertTriangle, Layers, Binary, Cpu, Wallet, ShieldAlert, Lock, Network, Eye } from 'lucide-react';

const securityPosture = [
  { name: 'Mon', score: 92 },
  { name: 'Tue', score: 94 },
  { name: 'Wed', score: 93 },
  { name: 'Thu', score: 96 },
  { name: 'Fri', score: 95 },
  { name: 'Sat', score: 98 },
  { name: 'Sun', score: 99 },
];

const ruleHygiene = [
  { name: 'Clean Rules', value: 1150, color: '#6366f1' },
  { name: 'Shadowed', value: 80, color: '#8b5cf6' },
  { name: 'Orphaned', value: 20, color: '#f43f5e' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">FWAC Dashboard</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Enterprise network security, automated policy orchestration, and zero-trust audit hub.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Trigger Policy Audit
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-indigo-900/40 flex items-center gap-2">
             <Zap size={18} /> Deploy Policy Updates
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Security Posture" value="99.2%" change="+4.1%" icon={<ShieldCheck className="text-indigo-400" />} />
        <StatCard title="Threats Blocked" value="4.5k" change="Verified" icon={<ShieldAlert className="text-rose-400" />} />
        <StatCard title="Compliance Score" value="100%" change="Stable" icon={<Lock className="text-emerald-400" />} />
        <StatCard title="Auto-Remediations" value="156" change="+12%" icon={<Zap className="text-blue-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Posture Trend */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Institutional Security Posture Score (%)
            </h2>
            <div className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-800/50">OPA Security Hub</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={securityPosture}>
                <defs>
                  <linearGradient id="colorPost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorPost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rule Hygiene */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Firewall Rule Hygiene & Health
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold italic">
               <Activity size={20} />
               Optimization ROI
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ruleHygiene}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {ruleHygiene.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Security Violations */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-rose-400 uppercase tracking-widest">
           <AlertTriangle size={28} />
           High-Impact Security Policy Deviations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ProjectCard name="Unrestricted-SSH-Access" status="Critical" score="Risk: 9.8" type="Access Governance" icon={<Network size={20} />} />
           <ProjectCard name="Outbound-Data-Exfiltration" status="Warning" score="Anomalous" type="Traffic Audit" icon={<Eye size={20} />} />
           <ProjectCard name="Missing-Microsegmentation" status="Critical" score="Compliance Gap" type="Zero Trust" icon={<Layers size={20} />} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('+') || change.startsWith('-') || change === 'Verified' || change === 'Stable' ? (change.startsWith('+') ? 'text-emerald-400' : 'text-slate-400') : 'text-rose-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ name, status, score, type, icon }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-indigo-400 transition">{icon}</div>
        <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border border-slate-700 uppercase tracking-tighter ${status === 'Critical' ? 'bg-rose-950/20 text-rose-400 border-rose-800/50' : 'bg-indigo-950/20 text-indigo-400 border-indigo-800/50'}`}>{status}</span>
    </div>
    <div className="flex justify-between items-center mt-8">
       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Impact: {score} | {type}</span>
       <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition" />
    </div>
  </div>
);

export default Dashboard;
