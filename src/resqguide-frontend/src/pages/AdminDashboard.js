import { useNavigate, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

// ─── Sidebar ───────────────────────────────────────────────
function Sidebar({ user, onLogout }) {
  const nav = [
    { path: "/admin",               label: "Dashboard",       icon: "⊞" },
    { path: "/admin/building-types",label: "Building Types",  icon: "🏗" },
    { path: "/admin/questions",     label: "Questions",       icon: "📋" },
    { path: "/admin/safe-places",   label: "Safe Places",     icon: "📍" },
    { path: "/admin/alerts",        label: "Alerts",          icon: "🚨" },
    { path: "/admin/recommendations",label:"Recommendations", icon: "✅" },
    { path: "/admin/risk-history",  label: "Risk History",    icon: "📊" },
  ];
  return (
    <aside style={{width:240,minHeight:"100vh",background:"#1e293b",display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"24px 20px 16px",borderBottom:"1px solid #334155"}}>
        <div style={{color:"#38bdf8",fontWeight:800,fontSize:20,letterSpacing:0.5}}>🛡 ResQGuide</div>
        <div style={{color:"#94a3b8",fontSize:12,marginTop:4}}>Admin Panel</div>
      </div>
      <nav style={{flex:1,padding:"12px 0"}}>
        {nav.map(n => (
          <NavLink key={n.path} to={n.path} end={n.path==="/admin"}
            style={({isActive})=>({
              display:"flex",alignItems:"center",gap:10,padding:"10px 20px",
              color: isActive?"#38bdf8":"#cbd5e1",
              background: isActive?"#0f172a":"transparent",
              borderLeft: isActive?"3px solid #38bdf8":"3px solid transparent",
              textDecoration:"none",fontSize:14,fontWeight: isActive?600:400,
              transition:"all .15s"
            })}>
            <span style={{fontSize:16}}>{n.icon}</span>{n.label}
          </NavLink>
        ))}
      </nav>
      <div style={{padding:"16px 20px",borderTop:"1px solid #334155"}}>
        <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600}}>{user?.name}</div>
        <div style={{color:"#64748b",fontSize:11,marginBottom:10}}>{user?.email}</div>
        <button onClick={onLogout}
          style={{width:"100%",background:"#ef4444",color:"#fff",border:"none",borderRadius:8,padding:"8px 0",cursor:"pointer",fontSize:13,fontWeight:600}}>
          Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Stat Card ─────────────────────────────────────────────
function StatCard({label, value, icon, color}) {
  return (
    <div style={{background:"#fff",borderRadius:12,padding:"20px 24px",boxShadow:"0 1px 4px rgba(0,0,0,.08)",display:"flex",alignItems:"center",gap:16}}>
      <div style={{width:48,height:48,borderRadius:12,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{icon}</div>
      <div>
        <div style={{fontSize:26,fontWeight:800,color:"#1e293b"}}>{value}</div>
        <div style={{fontSize:13,color:"#64748b"}}>{label}</div>
      </div>
    </div>
  );
}

// ─── Overview Page ─────────────────────────────────────────
function Overview() {
  const [stats, setStats] = useState({buildings:0,questions:0,places:0,alerts:0,assessments:0,recommendations:0});
  useEffect(()=>{
    Promise.all([
      api.get("/building-types"),
      api.get("/questions"),
      api.get("/safeplaces"),
      api.get("/alerts"),
      api.get("/risk/history"),
      api.get("/recommendations"),
    ]).then(([bt,q,sp,al,rh,rec])=>{
      setStats({buildings:bt.data.length,questions:q.data.length,places:sp.data.length,
        alerts:al.data.length,assessments:rh.data.length,recommendations:rec.data.length});
    }).catch(()=>{});
  },[]);
  return (
    <div>
      <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:6}}>Dashboard Overview</h2>
      <p style={{color:"#64748b",marginBottom:24,fontSize:14}}>Welcome back. Here's what's in your system.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16,marginBottom:32}}>
        <StatCard label="Building Types"    value={stats.buildings}      icon="🏗" color="#dbeafe"/>
        <StatCard label="Questions"         value={stats.questions}      icon="📋" color="#dcfce7"/>
        <StatCard label="Safe Places"       value={stats.places}         icon="📍" color="#fef9c3"/>
        <StatCard label="Alerts"            value={stats.alerts}         icon="🚨" color="#fee2e2"/>
        <StatCard label="Assessments"       value={stats.assessments}    icon="📊" color="#f3e8ff"/>
        <StatCard label="Recommendations"   value={stats.recommendations}icon="✅" color="#ccfbf1"/>
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.08)"}}>
        <div style={{fontWeight:600,color:"#1e293b",marginBottom:12}}>Quick Actions</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {[
            {label:"+ Building Type",path:"/admin/building-types"},
            {label:"+ Question",path:"/admin/questions"},
            {label:"+ Safe Place",path:"/admin/safe-places"},
            {label:"+ Alert",path:"/admin/alerts"},
          ].map(a=>(
            <NavLink key={a.path} to={a.path}
              style={{background:"#f1f5f9",color:"#334155",padding:"8px 16px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600,border:"1px solid #e2e8f0"}}>
              {a.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Building Types Page ───────────────────────────────────
function BuildingTypesPage() {
  const [types,setTypes]=useState([]);
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const fetch=()=>api.get("/building-types").then(r=>setTypes(r.data)).catch(()=>{});
  useEffect(()=>{fetch();},[]);
  const add=async()=>{
    if(!name.trim())return;
    setLoading(true);
    try{await api.post("/building-types",{name:name.trim().toLowerCase()});setName("");fetch();}
    catch(e){alert("Error: "+( e.response?.data?.message||e.message));}
    setLoading(false);
  };
  const del=async(id)=>{
    if(!window.confirm("Delete this building type?"))return;
    try{await api.delete(`/building-types/${id}`);fetch();}catch(e){alert("Error deleting");}
  };
  return (
    <div>
      <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:6}}>Building Types</h2>
      <p style={{color:"#64748b",marginBottom:24,fontSize:14}}>Manage what building categories users can assess.</p>
      <div style={{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.08)",marginBottom:20}}>
        <div style={{fontWeight:600,marginBottom:12,color:"#374151"}}>Add New Building Type</div>
        <div style={{display:"flex",gap:10}}>
          <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
            placeholder="e.g. hospital, mall, school"
            style={{flex:1,padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none"}}/>
          <button onClick={add} disabled={loading}
            style={{background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontWeight:600,fontSize:14,opacity:loading?.6:1}}>
            {loading?"Adding...":"Add"}
          </button>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(0,0,0,.08)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              <th style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>#</th>
              <th style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>Name</th>
              <th style={{padding:"12px 16px",textAlign:"right",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {types.length===0&&<tr><td colSpan={3} style={{padding:32,textAlign:"center",color:"#9ca3af"}}>No building types yet.</td></tr>}
            {types.map((t,i)=>(
              <tr key={t._id} style={{borderBottom:"1px solid #f1f5f9"}}>
                <td style={{padding:"12px 16px",color:"#94a3b8",fontSize:13}}>{i+1}</td>
                <td style={{padding:"12px 16px"}}>
                  <span style={{background:"#dbeafe",color:"#1d4ed8",padding:"4px 12px",borderRadius:20,fontSize:13,fontWeight:600,textTransform:"capitalize"}}>{t.name}</span>
                </td>
                <td style={{padding:"12px 16px",textAlign:"right"}}>
                  <button onClick={()=>del(t._id)}
                    style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Questions Page ────────────────────────────────────────
function QuestionsPage() {
  const [questions,setQuestions]=useState([]);
  const [types,setTypes]=useState([]);
  const [filterType,setFilterType]=useState("");
  const [form,setForm]=useState({questionText:"",buildingType:"",options:"None,Basic,Adequate,Advanced",weight:1});
  const [showForm,setShowForm]=useState(false);
  const [loading,setLoading]=useState(false);
  const fetch=()=>{
    const url=filterType?`/questions?buildingType=${filterType}`:"/questions";
    api.get(url).then(r=>setQuestions(r.data)).catch(()=>{});
  };
  useEffect(()=>{api.get("/building-types").then(r=>setTypes(r.data)).catch(()=>{});},[]);
  useEffect(()=>{fetch();},[filterType]);
  const add=async()=>{
    if(!form.questionText||!form.buildingType){alert("Fill question text and building type");return;}
    setLoading(true);
    try{
      await api.post("/questions",{...form,buildingType:form.buildingType.toLowerCase(),
        options:form.options.split(",").map(o=>o.trim()).filter(Boolean),weight:Number(form.weight)});
      setForm({questionText:"",buildingType:"",options:"None,Basic,Adequate,Advanced",weight:1});
      setShowForm(false);fetch();
    }catch(e){alert("Error: "+(e.response?.data?.message||e.message));}
    setLoading(false);
  };
  const del=async(id)=>{
    if(!window.confirm("Delete this question?"))return;
    try{await api.delete(`/questions/${id}`);fetch();}catch(e){alert("Error deleting");}
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:4}}>Questions</h2>
          <p style={{color:"#64748b",fontSize:14}}>Assessment questions shown to users by building type.</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)}
          style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:8,padding:"10px 18px",cursor:"pointer",fontWeight:600,fontSize:14}}>
          {showForm?"Cancel":"+ Add Question"}
        </button>
      </div>
      {showForm&&(
        <div style={{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.08)",marginBottom:20}}>
          <div style={{fontWeight:600,marginBottom:14,color:"#374151"}}>New Question</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div style={{gridColumn:"1/-1"}}>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Question Text</label>
              <textarea value={form.questionText} onChange={e=>setForm({...form,questionText:e.target.value})} rows={2}
                placeholder="e.g. What type of fire suppression system is installed?"
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
            </div>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Building Type</label>
              <select value={form.buildingType} onChange={e=>setForm({...form,buildingType:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none"}}>
                <option value="">Select type</option>
                {types.map(t=><option key={t._id} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Options (comma-separated)</label>
              <input value={form.options} onChange={e=>setForm({...form,options:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
            </div>
          </div>
          <button onClick={add} disabled={loading}
            style={{background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontWeight:600,fontSize:14,opacity:loading?.6:1}}>
            {loading?"Saving...":"Save Question"}
          </button>
        </div>
      )}
      <div style={{background:"#fff",borderRadius:12,padding:"16px 20px",boxShadow:"0 1px 4px rgba(0,0,0,.08)",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
        <label style={{fontSize:13,color:"#64748b",fontWeight:600}}>Filter by type:</label>
        <select value={filterType} onChange={e=>setFilterType(e.target.value)}
          style={{padding:"6px 12px",border:"1px solid #d1d5db",borderRadius:8,fontSize:13,outline:"none"}}>
          <option value="">All Types</option>
          {types.map(t=><option key={t._id} value={t.name}>{t.name}</option>)}
        </select>
        <span style={{marginLeft:"auto",fontSize:13,color:"#9ca3af"}}>{questions.length} questions</span>
      </div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(0,0,0,.08)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              {["#","Question","Type","Options",""].map((h,i)=>(
                <th key={i} style={{padding:"12px 16px",textAlign:i===4?"right":"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.length===0&&<tr><td colSpan={5} style={{padding:32,textAlign:"center",color:"#9ca3af"}}>No questions found.</td></tr>}
            {questions.map((q,i)=>(
              <tr key={q._id} style={{borderBottom:"1px solid #f1f5f9"}}>
                <td style={{padding:"12px 16px",color:"#94a3b8",fontSize:13,width:40}}>{i+1}</td>
                <td style={{padding:"12px 16px",fontSize:14,color:"#1e293b",maxWidth:300}}>{q.questionText}</td>
                <td style={{padding:"12px 16px"}}>
                  <span style={{background:"#dcfce7",color:"#15803d",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,textTransform:"capitalize"}}>{q.buildingType}</span>
                </td>
                <td style={{padding:"12px 16px",fontSize:12,color:"#64748b"}}>{(q.options||[]).join(", ")}</td>
                <td style={{padding:"12px 16px",textAlign:"right"}}>
                  <button onClick={()=>del(q._id)}
                    style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Safe Places Page ──────────────────────────────────────
function SafePlacesPage() {
  const [places,setPlaces]=useState([]);
  const [form,setForm]=useState({name:"",type:"",location:""});
  const [loading,setLoading]=useState(false);
  const fetch=()=>api.get("/safeplaces").then(r=>setPlaces(r.data)).catch(()=>{});
  useEffect(()=>{fetch();},[]);
  const add=async()=>{
    if(!form.name||!form.type||!form.location){alert("Fill all fields");return;}
    setLoading(true);
    try{await api.post("/safeplaces",form);setForm({name:"",type:"",location:""});fetch();}
    catch(e){alert("Error: "+(e.response?.data?.message||e.message));}
    setLoading(false);
  };
  const del=async(id)=>{
    if(!window.confirm("Delete?"))return;
    try{await api.delete(`/safeplaces/${id}`);fetch();}catch(e){alert("Error");}
  };
  const typeColors={"Hospital":"#dbeafe","Shelter":"#dcfce7","Evacuation Center":"#fef9c3","Relief Camp":"#f3e8ff","Fire Station":"#fee2e2","Emergency Services":"#ccfbf1"};
  return (
    <div>
      <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:6}}>Safe Places</h2>
      <p style={{color:"#64748b",marginBottom:24,fontSize:14}}>Manage shelters and evacuation centers shown to users after assessment.</p>
      <div style={{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.08)",marginBottom:20}}>
        <div style={{fontWeight:600,marginBottom:14,color:"#374151"}}>Add New Safe Place</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:10,alignItems:"end"}}>
          <div>
            <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Name</label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. City Hospital"
              style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div>
            <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Type</label>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}
              style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none"}}>
              <option value="">Select type</option>
              {Object.keys(typeColors).map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Location</label>
            <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Address"
              style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <button onClick={add} disabled={loading}
            style={{background:"#ca8a04",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontWeight:600,fontSize:14,height:42,opacity:loading?.6:1}}>
            {loading?"...":"Add"}
          </button>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(0,0,0,.08)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              {["Name","Type","Location",""].map((h,i)=>(
                <th key={i} style={{padding:"12px 16px",textAlign:i===3?"right":"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {places.length===0&&<tr><td colSpan={4} style={{padding:32,textAlign:"center",color:"#9ca3af"}}>No safe places yet.</td></tr>}
            {places.map(p=>(
              <tr key={p._id} style={{borderBottom:"1px solid #f1f5f9"}}>
                <td style={{padding:"12px 16px",fontWeight:600,color:"#1e293b",fontSize:14}}>{p.name}</td>
                <td style={{padding:"12px 16px"}}>
                  <span style={{background:typeColors[p.type]||"#f1f5f9",color:"#374151",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>{p.type}</span>
                </td>
                <td style={{padding:"12px 16px",fontSize:13,color:"#64748b"}}>📍 {p.location}</td>
                <td style={{padding:"12px 16px",textAlign:"right"}}>
                  <button onClick={()=>del(p._id)}
                    style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Alerts Page ───────────────────────────────────────────
function AlertsPage() {
  const [alerts,setAlerts]=useState([]);
  const [form,setForm]=useState({disasterType:"",location:"",message:"",severity:"Medium"});
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const fetch=()=>api.get("/alerts").then(r=>setAlerts(r.data)).catch(()=>{});
  useEffect(()=>{fetch();},[]);
  const add=async()=>{
    if(!form.disasterType||!form.location||!form.message){alert("Fill all fields");return;}
    setLoading(true);
    try{await api.post("/alerts",form);setForm({disasterType:"",location:"",message:"",severity:"Medium"});setShowForm(false);fetch();}
    catch(e){alert("Error: "+(e.response?.data?.message||e.message));}
    setLoading(false);
  };
  const del=async(id)=>{
    if(!window.confirm("Delete alert?"))return;
    try{await api.delete(`/alerts/${id}`);fetch();}catch(e){alert("Error");}
  };
  const sevColor={High:"#fee2e2",Medium:"#fef9c3",Low:"#dcfce7"};
  const sevText={High:"#dc2626",Medium:"#ca8a04",Low:"#16a34a"};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:4}}>Disaster Alerts</h2>
          <p style={{color:"#64748b",fontSize:14}}>Push emergency alerts visible to all users.</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)}
          style={{background:"#dc2626",color:"#fff",border:"none",borderRadius:8,padding:"10px 18px",cursor:"pointer",fontWeight:600,fontSize:14}}>
          {showForm?"Cancel":"🚨 New Alert"}
        </button>
      </div>
      {showForm&&(
        <div style={{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.08)",marginBottom:20,border:"2px solid #fca5a5"}}>
          <div style={{fontWeight:600,marginBottom:14,color:"#dc2626"}}>⚠ Create New Alert</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Disaster Type</label>
              <select value={form.disasterType} onChange={e=>setForm({...form,disasterType:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none"}}>
                <option value="">Select</option>
                {["Earthquake","Flood","Fire","Cyclone","Landslide","Tsunami","Other"].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Location</label>
              <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Affected area"
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Severity</label>
              <select value={form.severity} onChange={e=>setForm({...form,severity:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none"}}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
            <div style={{gridColumn:"1/-1"}}>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Message</label>
              <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={2}
                placeholder="Alert message to display to users..."
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
            </div>
          </div>
          <button onClick={add} disabled={loading}
            style={{background:"#dc2626",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontWeight:600,fontSize:14,opacity:loading?.6:1}}>
            {loading?"Publishing...":"Publish Alert"}
          </button>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {alerts.length===0&&<div style={{background:"#fff",borderRadius:12,padding:40,textAlign:"center",color:"#9ca3af",boxShadow:"0 1px 4px rgba(0,0,0,.08)"}}>No alerts yet.</div>}
        {alerts.map(a=>(
          <div key={a._id} style={{background:"#fff",borderRadius:12,padding:"16px 20px",boxShadow:"0 1px 4px rgba(0,0,0,.08)",display:"flex",gap:16,alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{fontWeight:700,color:"#1e293b",fontSize:15}}>🚨 {a.disasterType}</span>
                <span style={{background:sevColor[a.severity],color:sevText[a.severity],padding:"2px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>{a.severity}</span>
                <span style={{fontSize:12,color:"#94a3b8",marginLeft:"auto"}}>{new Date(a.createdAt).toLocaleString()}</span>
              </div>
              <div style={{fontSize:13,color:"#64748b",marginBottom:4}}>📍 {a.location}</div>
              <div style={{fontSize:14,color:"#374151"}}>{a.message}</div>
            </div>
            <button onClick={()=>del(a._id)}
              style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600,flexShrink:0}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Recommendations Page ──────────────────────────────────
function RecommendationsPage() {
  const [recs,setRecs]=useState([]);
  const [form,setForm]=useState({riskLevel:"Low",recommendation:"",category:""});
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const fetch=()=>api.get("/recommendations").then(r=>setRecs(r.data)).catch(()=>{});
  useEffect(()=>{fetch();},[]);
  const add=async()=>{
    if(!form.recommendation){alert("Enter recommendation text");return;}
    setLoading(true);
    try{await api.post("/recommendations",form);setForm({riskLevel:"Low",recommendation:"",category:""});setShowForm(false);fetch();}
    catch(e){alert("Error: "+(e.response?.data?.message||e.message));}
    setLoading(false);
  };
  const del=async(id)=>{
    if(!window.confirm("Delete?"))return;
    try{await api.delete(`/recommendations/${id}`);fetch();}catch(e){alert("Error");}
  };
  const lvlColor={Low:"#dcfce7",Medium:"#fef9c3",High:"#fee2e2"};
  const lvlText={Low:"#15803d",Medium:"#ca8a04",High:"#dc2626"};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:4}}>Safety Recommendations</h2>
          <p style={{color:"#64748b",fontSize:14}}>Manage tips shown to users based on their risk level result.</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)}
          style={{background:"#0d9488",color:"#fff",border:"none",borderRadius:8,padding:"10px 18px",cursor:"pointer",fontWeight:600,fontSize:14}}>
          {showForm?"Cancel":"+ Add Recommendation"}
        </button>
      </div>
      {showForm&&(
        <div style={{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.08)",marginBottom:20}}>
          <div style={{fontWeight:600,marginBottom:14,color:"#374151"}}>New Recommendation</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Risk Level</label>
              <select value={form.riskLevel} onChange={e=>setForm({...form,riskLevel:e.target.value})}
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none"}}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
            <div>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Category</label>
              <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Fire Safety, Electrical"
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div style={{gridColumn:"1/-1"}}>
              <label style={{fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:4}}>Recommendation Text</label>
              <textarea value={form.recommendation} onChange={e=>setForm({...form,recommendation:e.target.value})} rows={2}
                placeholder="e.g. Install fire extinguishers on every floor"
                style={{width:"100%",padding:"10px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
            </div>
          </div>
          <button onClick={add} disabled={loading}
            style={{background:"#0d9488",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontWeight:600,fontSize:14,opacity:loading?.6:1}}>
            {loading?"Saving...":"Save"}
          </button>
        </div>
      )}
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(0,0,0,.08)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              {["Risk Level","Category","Recommendation",""].map((h,i)=>(
                <th key={i} style={{padding:"12px 16px",textAlign:i===3?"right":"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recs.length===0&&<tr><td colSpan={4} style={{padding:32,textAlign:"center",color:"#9ca3af"}}>No recommendations yet.</td></tr>}
            {recs.map(r=>(
              <tr key={r._id} style={{borderBottom:"1px solid #f1f5f9"}}>
                <td style={{padding:"12px 16px"}}>
                  <span style={{background:lvlColor[r.riskLevel],color:lvlText[r.riskLevel],padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>{r.riskLevel}</span>
                </td>
                <td style={{padding:"12px 16px",fontSize:13,color:"#64748b"}}>{r.category||"—"}</td>
                <td style={{padding:"12px 16px",fontSize:14,color:"#374151"}}>{r.recommendation}</td>
                <td style={{padding:"12px 16px",textAlign:"right"}}>
                  <button onClick={()=>del(r._id)}
                    style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Risk History Page ─────────────────────────────────────
function RiskHistoryPage() {
  const [history,setHistory]=useState([]);
  useEffect(()=>{api.get("/risk/history").then(r=>setHistory(r.data)).catch(()=>{});},[]);
  const lvlColor={Low:"#dcfce7",Medium:"#fef9c3",High:"#fee2e2"};
  const lvlText={Low:"#15803d",Medium:"#ca8a04",High:"#dc2626"};
  return (
    <div>
      <h2 style={{fontSize:22,fontWeight:700,color:"#1e293b",marginBottom:6}}>Risk Assessment History</h2>
      <p style={{color:"#64748b",marginBottom:24,fontSize:14}}>All assessments submitted by users.</p>
      <div style={{background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(0,0,0,.08)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              {["#","Building","Risk Score","Risk Level","Date"].map((h,i)=>(
                <th key={i} style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.length===0&&<tr><td colSpan={5} style={{padding:32,textAlign:"center",color:"#9ca3af"}}>No assessments yet.</td></tr>}
            {history.map((h,i)=>(
              <tr key={h._id} style={{borderBottom:"1px solid #f1f5f9"}}>
                <td style={{padding:"12px 16px",color:"#94a3b8",fontSize:13}}>{i+1}</td>
                <td style={{padding:"12px 16px",fontSize:14,color:"#1e293b",fontWeight:600}}>{h.building?.name||"—"}</td>
                <td style={{padding:"12px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:80,height:8,background:"#e2e8f0",borderRadius:4,overflow:"hidden"}}>
                      <div style={{width:`${Math.min((h.riskScore/50)*100,100)}%`,height:"100%",background:lvlText[h.riskLevel]||"#2563eb",borderRadius:4}}/>
                    </div>
                    <span style={{fontSize:14,fontWeight:700,color:"#1e293b"}}>{h.riskScore}</span>
                  </div>
                </td>
                <td style={{padding:"12px 16px"}}>
                  <span style={{background:lvlColor[h.riskLevel],color:lvlText[h.riskLevel],padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>{h.riskLevel}</span>
                </td>
                <td style={{padding:"12px 16px",fontSize:13,color:"#64748b"}}>{new Date(h.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Admin Shell ──────────────────────────────────────
function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    if(!user||user.role!=="admin") navigate("/login");
  },[user,navigate]);

  const handleLogout=()=>{ localStorage.removeItem("user"); navigate("/login"); };

  return (
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}>
      <Sidebar user={user} onLogout={handleLogout}/>
      <main style={{flex:1,background:"#f8fafc",overflowY:"auto"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 28px"}}>
          <Routes>
            <Route index element={<Overview/>}/>
            <Route path="building-types" element={<BuildingTypesPage/>}/>
            <Route path="questions"      element={<QuestionsPage/>}/>
            <Route path="safe-places"    element={<SafePlacesPage/>}/>
            <Route path="alerts"         element={<AlertsPage/>}/>
            <Route path="recommendations"element={<RecommendationsPage/>}/>
            <Route path="risk-history"   element={<RiskHistoryPage/>}/>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
