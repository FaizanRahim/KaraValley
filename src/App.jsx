import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, BriefcaseBusiness, Check, CheckCircle2, ChevronRight, Code2, LogIn, LogOut,
  Mail, Menu, Palette, Phone, ShieldCheck, Sparkles, UserCheck, Users, X, XCircle,
} from 'lucide-react';
import { ADMIN, services, store } from './store';

const cx = (...v) => v.filter(Boolean).join(' ');
const routeFromHash = () => window.location.hash.replace(/^#\/?/, '') || 'home';
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);

function useAppData() {
  const [site, setSiteState] = useState(store.getSite());
  const [freelancers, setFreelancersState] = useState(store.getFreelancers());
  const [session, setSessionState] = useState(store.getSession());
  const [messages, setMessages] = useState(store.getMessages());
  useEffect(() => {
    const sync = () => {
      setSiteState(store.getSite());
      setFreelancersState(store.getFreelancers());
      setSessionState(store.getSession());
      setMessages(store.getMessages());
    };
    window.addEventListener('storage', sync);
    window.addEventListener('fkv-change', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('fkv-change', sync); };
  }, []);
  return {
    site, freelancers, session, messages,
    setSite: (v) => { store.setSite(v); setSiteState(v); },
    setFreelancers: (v) => { store.setFreelancers(v); setFreelancersState(v); },
    setSession: (v) => { store.setSession(v); setSessionState(v); },
  };
}

function Avatar({ name, image, size = 'lg' }) {
  const initials = name?.split(' ').map(p => p[0]).slice(0, 2).join('') || 'FK';
  const dims = size === 'sm' ? 'h-11 w-11 text-sm' : size === 'xl' ? 'h-40 w-40 text-4xl' : 'h-20 w-20 text-xl';
  if (image) return <img src={image} alt={name} className={`${dims} rounded-3xl object-cover border border-white/10`} />;
  return <div className={`${dims} avatar-fallback grid place-items-center rounded-3xl font-bold`}>{initials}</div>;
}

function Button({ children, className = '', variant = 'primary', ...props }) {
  return <button className={cx('btn', variant === 'secondary' && 'btn-secondary', variant === 'ghost' && 'btn-ghost', className)} {...props}>{children}</button>;
}

function Header({ site, session }) {
  const [open, setOpen] = useState(false);
  const links = [['home','Home'],['about','About Us'],['services','Services'],['freelancers','Freelancers'],['contact','Contact']];
  return <header className="nav-wrap">
    <div className="nav shell">
      <a href="#/home" className="brand" aria-label={site.brand}>
        <img src="/karavalley.png" alt="KaraValley logo" style={{ width: '38px', height: '38px', objectFit: 'contain', display: 'block' }} />
        <span>{site.brand}</span>
      </a>
      <nav className="desktop-nav">{links.map(([r,l]) => <a key={r} href={`#/${r}`}>{l}</a>)}</nav>
      <div className="desktop-actions">
        <a className="small-link" href="#/freelancer-login">Freelancer Login</a>
        <a className="small-link" href="#/admin-login">Admin</a>
      </div>
      <button className="icon-btn mobile-only" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="mobile-menu">{links.map(([r,l]) => <a key={r} href={`#/${r}`} onClick={()=>setOpen(false)}>{l}</a>)}<a href="#/freelancer-login">Freelancer Login</a><a href="#/admin-login">Admin Login</a></div>}
  </header>;
}

function Home({ site, freelancers }) {
  const approved = freelancers
    .filter(f => f.status === 'approved')
    .slice(0, 6);

  return (
    <>
      <section
        className="hero shell"
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="hero-copy">
          <div className="pill">
            <ShieldCheck size={16}/>
            Certified Freelancer Profiles
          </div>

          <h1>{site.heroTitle}</h1>

          <p>{site.heroText}</p>

          <div className="hero-actions">
            <a className="btn" href="#/freelancers">
              Find Freelancers <ArrowRight size={17}/>
            </a>

            <a className="btn btn-secondary" href="#/freelancer-register">
              Join as Freelancer
            </a>
          </div>

          <div className="trust-row">
            <span><UserCheck/> Approved profiles</span>
            <span><BriefcaseBusiness/> Online services</span>
            <span><ShieldCheck/> Admin moderation</span>
          </div>
        </div>

        <div className="hero-panel">
          <div
            className="hero-image-card hero-portrait-card glass float-mid overflow-hidden rounded-3xl"
            style={{
              position: 'relative',
              minHeight: '390px',
            }}
          >
            <img
              src="/faizan.png"
              alt="Faizan"
              className="hero-portrait-image"
              style={{
                width: '100%',
                height: '390px',
                minHeight: '390px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '24px',
                background:
                  'linear-gradient(to top, rgba(5,6,7,.92), rgba(5,6,7,.05))',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                Faizan - Founder
              </h3>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,.75)',
                }}
              >
                KaraValley
              </p>
            </div>
          </div>

          <div className="metric-grid">
            <div>
              <b>{freelancers.filter(f => f.status === 'approved').length}</b>
              <span>Approved talent</span>
            </div>

            <div>
              <b>{services.length}+</b>
              <span>Service categories</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">What you can hire for</div>
              <h2>Online services for modern businesses.</h2>
            </div>

            <a className="text-link" href="#/services">
              View all services <ChevronRight size={16}/>
            </a>
          </div>

          <div className="service-grid">
            {services.slice(0, 8).map((s, i) => (
              <div className="service-card" key={s}>
                <Code2/>
                <span>{s}</span>
                <small>
                  {['Build', 'Create', 'Grow', 'Support'][i % 4]} your business online
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head">
          <div>
            <div className="eyebrow">Featured talent</div>
            <h2>Approved freelancers.</h2>
          </div>

          <a className="text-link" href="#/freelancers">
            See all <ChevronRight size={16}/>
          </a>
        </div>

        <div className="profile-grid">
          {approved.map(f => (
            <FreelancerCard key={f.id} f={f}/>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="cta">
          <div>
            <div className="eyebrow">For freelancers</div>
            <h2>Create your profile. Get reviewed. Go live.</h2>
            <p>
              Every new freelancer submits a profile to the admin. Once accepted,
              the profile automatically appears on the public marketplace.
            </p>
          </div>

          <a className="btn" href="#/freelancer-register">
            Create Freelancer Account
          </a>
        </div>
      </section>
    </>
  );
}

function FreelancerCard({ f }) {
  return <article className="profile-card"><div className="profile-top"><Avatar name={f.name} image={f.image}/><span className="verified"><CheckCircle2 size={14}/> Verified</span></div><h3>{f.name}</h3><p className="role">{f.title}</p><p className="bio clamp">{f.bio}</p><div className="tags">{String(f.skills).split(',').slice(0,4).map(s=><span key={s}>{s.trim()}</span>)}</div><div className="profile-foot"><span>{f.location}</span><b>${f.rate || '—'}/hr</b></div></article>;
}

function About({ site }) {
  return <Page title="About Us" subtitle="The idea behind KaraValley."><section className="mission-grid"><div className="mission-photo"><Avatar name={site.ownerName} image="/faizan.png" size="xl"/><div><strong>{site.ownerName}</strong><span>{site.ownerRole}</span></div></div><div><div className="eyebrow">Founder message</div><h2>{site.missionTitle}</h2><p className="lead">{site.missionText}</p><a className="text-link" href="#/contact">Talk to us <ChevronRight size={16}/></a></div></section><div className="about-grid"><div><div className="eyebrow">Our purpose</div><h2>{site.aboutTitle}</h2><p className="lead">{site.aboutText}</p><div className="values">{[['Trust','Profiles go live only after admin approval.'],['Opportunity','Freelancers can create a professional presence without bidding chaos.'],['Access','Clients can discover services across technical, creative and business categories.']].map(([a,b])=><div key={a}><ShieldCheck/><div><strong>{a}</strong><p>{b}</p></div></div>)}</div></div><div className="founder-card"><Avatar name={site.ownerName} image="/faizan.png" size="xl"/><h3>{site.ownerName}</h3><p>{site.ownerRole}</p><hr/><h4>{site.missionTitle}</h4><p>{site.missionText}</p></div></div></Page>;
}

function Services() { return <Page title="Services" subtitle="Browse the online services available through approved freelancers."><div className="all-services">{services.map((s,i)=><div key={s} className="service-row"><span>{String(i+1).padStart(2,'0')}</span><strong>{s}</strong><ChevronRight/></div>)}</div></Page>; }

function Freelancers({ freelancers }) {
  const [q,setQ]=useState(''); const [cat,setCat]=useState('All');
  const approved = freelancers.filter(f=>f.status==='approved');
  const cats=['All',...new Set(approved.map(f=>f.category).filter(Boolean))];
  const list=approved.filter(f=>(cat==='All'||f.category===cat)&&`${f.name} ${f.title} ${f.skills}`.toLowerCase().includes(q.toLowerCase()));
  return <Page title="Freelancers" subtitle="Only profiles accepted by the admin are displayed here."><div className="filters"><input className="field" placeholder="Search name, skill or role" value={q} onChange={e=>setQ(e.target.value)}/><select className="field" value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><div className="profile-grid">{list.map(f=><FreelancerCard key={f.id} f={f}/>)}</div>{!list.length&&<Empty text="No approved freelancers match this search."/>}</Page>;
}

function Contact({ site }) {
  const [done,setDone]=useState(false); const [form,setForm]=useState({name:'',email:'',message:''});
  const submit=e=>{e.preventDefault(); store.addMessage(form); setDone(true);};
  return <Page title="Contact" subtitle="Questions, partnerships, hiring or support — send a message."><div className="contact-grid"><div className="contact-info"><div><Phone/><span>Phone</span><a href={`tel:${site.phone}`}>{site.phone}</a></div><div><Mail/><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div></div>{done?<div className="success-box"><CheckCircle2/><h3>Message received</h3><p>Your message has been saved in the admin inbox.</p></div>:<form className="form-card" onSubmit={submit}><label>Name<input className="field" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input className="field" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Message<textarea className="field" rows="6" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label><Button type="submit">Send Message</Button></form>}</div></Page>;
}

function Page({ title, subtitle, children }) { return <main className="page shell"><div className="page-head"><div className="eyebrow"></div><h1>{title}</h1><p>{subtitle}</p></div>{children}</main>; }
function Empty({ text }) { return <div className="empty"><Users/><p>{text}</p></div>; }

function AdminLogin({ setSession }) {
  const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState('');
  const submit=e=>{e.preventDefault(); if(form.email.toLowerCase()===ADMIN.email&&form.password===ADMIN.password){const s={role:'admin',email:ADMIN.email};store.setSession(s);setSession(s);window.location.hash='/admin';}else setError('Invalid admin email or password.');};
  return <AuthPage title="Admin Login" note="Manage freelancer approvals, content, theme and contact details."><form onSubmit={submit} className="auth-form"><label>Email<input className="field" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input className="field" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{error&&<p className="error">{error}</p>}<Button type="submit"><LogIn size={17}/> Login as Admin</Button><div className="credentials"><strong>Default admin login</strong><span>{ADMIN.email}</span><span>{ADMIN.password}</span></div></form></AuthPage>;
}

function FreelancerLogin({ freelancers, setSession }) {
  const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState('');
  const submit=e=>{e.preventDefault();const f=freelancers.find(x=>x.email.toLowerCase()===form.email.toLowerCase()&&x.password===form.password);if(f){const s={role:'freelancer',id:f.id,email:f.email};store.setSession(s);setSession(s);window.location.hash='/freelancer-dashboard';}else setError('Email or password is incorrect.');};
  return <AuthPage title="Freelancer Login" note="Access your freelancer profile and approval status."><form onSubmit={submit} className="auth-form"><label>Email<input className="field" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input className="field" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{error&&<p className="error">{error}</p>}<Button type="submit"><LogIn size={17}/> Freelancer Login</Button><p>New freelancer? <a href="#/freelancer-register">Create an account</a></p></form></AuthPage>;
}

function AuthPage({title,note,children}){return <main className="auth-page"><div className="auth-box"><a className="brand center" href="#/home"><span className="brand-mark">FK</span><span></span></a><h1>{title}</h1><p>{note}</p>{children}</div></main>}

function FileImage({ value, onChange }) {
  const handle=e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>1_500_000){alert('Please choose an image smaller than 1.5 MB.');return;}const reader=new FileReader();reader.onload=()=>onChange(reader.result);reader.readAsDataURL(file)};
  return <div className="image-field">{value&&<img src={value} alt="Preview"/>}<input className="field" type="file" accept="image/*" onChange={handle}/>{value&&<button type="button" className="text-link" onClick={()=>onChange('')}>Remove image</button>}</div>;
}

function FreelancerRegister({ freelancers, setFreelancers, setSession }) {
  const [form,setForm]=useState({name:'',email:'',password:'',title:'',category:services[0],skills:'',bio:'',rate:'',location:'Pakistan',portfolio:'',image:''}); const [error,setError]=useState('');
  const submit=e=>{e.preventDefault();if(freelancers.some(f=>f.email.toLowerCase()===form.email.toLowerCase())){setError('An account with this email already exists.');return;}const item={...form,id:slug(form.name),status:'pending',createdAt:new Date().toISOString()};const next=[item,...freelancers];setFreelancers(next);const s={role:'freelancer',id:item.id,email:item.email};store.setSession(s);setSession(s);window.location.hash='/freelancer-dashboard';};
  return <Page title="Create Freelancer Profile" subtitle="Submit your profile for admin review. It will appear publicly only after approval."><form className="form-card wide" onSubmit={submit}><div className="form-grid"><label>Full name<input className="field" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input className="field" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input className="field" type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><label>Professional title<input className="field" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><label>Category<select className="field" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{services.map(s=><option key={s}>{s}</option>)}</select></label><label>Hourly rate (USD)<input className="field" type="number" min="0" value={form.rate} onChange={e=>setForm({...form,rate:e.target.value})}/></label><label>Location<input className="field" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label><label>Portfolio URL<input className="field" type="url" value={form.portfolio} onChange={e=>setForm({...form,portfolio:e.target.value})}/></label></div><label>Skills (comma separated)<input className="field" required value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></label><label>Bio<textarea className="field" rows="5" required value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></label><label>Profile image<FileImage value={form.image} onChange={image=>setForm({...form,image})}/></label>{error&&<p className="error">{error}</p>}<Button type="submit">Submit for Approval</Button></form></Page>;
}

function FreelancerDashboard({ session, freelancers, setFreelancers, setSession }) {
  const currentFreelancer = session
    ? freelancers.find(x => x.id === session.id)
    : null;

  const [draft, setDraft] = useState(currentFreelancer || {});

  useEffect(() => {
    if (currentFreelancer) {
      setDraft(currentFreelancer);
    }
  }, [currentFreelancer?.id, currentFreelancer?.status]);

  if (!session || session.role !== 'freelancer') {
    return <Protected title="Freelancer area" href="#/freelancer-login"/>;
  }

  if (!currentFreelancer) {
    return <Protected title="Account not found" href="#/freelancer-login"/>;
  }

  const save = e => {
    e.preventDefault();
    setFreelancers(
      freelancers.map(x =>
        x.id === currentFreelancer.id
          ? { ...draft, status: x.status }
          : x
      )
    );
    alert('Profile saved.');
  };

  const logout = () => {
    store.logout();
    setSession(null);
    window.location.hash = '/home';
  };

  return (
    <Page
      title="Freelancer Dashboard"
      subtitle="Edit your profile and check approval status."
    >
      <div className={`status-banner ${currentFreelancer.status}`}>
        <strong>Status: {currentFreelancer.status.toUpperCase()}</strong>
        <span>
          {currentFreelancer.status === 'pending'
            ? 'Your profile is waiting for admin approval.'
            : currentFreelancer.status === 'approved'
            ? 'Your profile is live on the website.'
            : 'Your profile is not currently public. Edit it and contact the admin.'}
        </span>
      </div>

      <form className="form-card wide" onSubmit={save}>
        <div className="dashboard-title">
          <div className="inline-user">
            <Avatar name={draft.name} image={draft.image} size="sm"/>
            <div>
              <strong>{draft.name}</strong>
              <span>{draft.email}</span>
            </div>
          </div>

          <Button type="button" variant="ghost" onClick={logout}>
            <LogOut size={16}/> Logout
          </Button>
        </div>

        <div className="form-grid">
          <label>
            Full name
            <input
              className="field"
              value={draft.name || ''}
              onChange={e => setDraft({...draft, name:e.target.value})}
            />
          </label>

          <label>
            Title
            <input
              className="field"
              value={draft.title || ''}
              onChange={e => setDraft({...draft, title:e.target.value})}
            />
          </label>

          <label>
            Category
            <select
              className="field"
              value={draft.category || services[0]}
              onChange={e => setDraft({...draft, category:e.target.value})}
            >
              {services.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>

          <label>
            Hourly rate
            <input
              className="field"
              type="number"
              value={draft.rate || ''}
              onChange={e => setDraft({...draft, rate:e.target.value})}
            />
          </label>

          <label>
            Location
            <input
              className="field"
              value={draft.location || ''}
              onChange={e => setDraft({...draft, location:e.target.value})}
            />
          </label>

          <label>
            Portfolio
            <input
              className="field"
              value={draft.portfolio || ''}
              onChange={e => setDraft({...draft, portfolio:e.target.value})}
            />
          </label>
        </div>

        <label>
          Skills
          <input
            className="field"
            value={draft.skills || ''}
            onChange={e => setDraft({...draft, skills:e.target.value})}
          />
        </label>

        <label>
          Bio
          <textarea
            className="field"
            rows="5"
            value={draft.bio || ''}
            onChange={e => setDraft({...draft, bio:e.target.value})}
          />
        </label>

        <label>
          Profile image
          <FileImage
            value={draft.image || ''}
            onChange={image => setDraft({...draft, image})}
          />
        </label>

        <Button type="submit">Save Profile</Button>
      </form>
    </Page>
  );
}

function Protected({title,href}){return <main className="auth-page"><div className="auth-box"><ShieldCheck size={42}/><h1>{title}</h1><p>Please log in to access this section.</p><a className="btn" href={href}>Go to Login</a></div></main>}

function AdminDashboard({ session, site, setSite, freelancers, setFreelancers, messages, setSession }) {
  const [tab,setTab]=useState('freelancers'); const [draft,setDraft]=useState(site); useEffect(()=>setDraft(site),[site]);
  if(!session||session.role!=='admin') return <Protected title="Admin area" href="#/admin-login"/>;
  const updateStatus=(id,status)=>setFreelancers(freelancers.map(f=>f.id===id?{...f,status}:f));
  const remove=id=>{if(confirm('Delete this freelancer account?'))setFreelancers(freelancers.filter(f=>f.id!==id));};
  const saveSite=e=>{e.preventDefault();setSite(draft);alert('Website settings saved.');};
  const logout=()=>{store.logout();setSession(null);window.location.hash='/home'};
  const pending=freelancers.filter(f=>f.status==='pending').length;
  return <main className="admin-page"><aside className="admin-side"><a className="brand" href="#/home"><span className="brand-mark">FK</span><span>Admin</span></a><button className={tab==='freelancers'?'active':''} onClick={()=>setTab('freelancers')}><Users/> Freelancers {pending>0&&<b>{pending}</b>}</button><button className={tab==='content'?'active':''} onClick={()=>setTab('content')}><Palette/> Theme & Content</button><button className={tab==='messages'?'active':''} onClick={()=>setTab('messages')}><Mail/> Messages</button><button onClick={logout}><LogOut/> Logout</button></aside><section className="admin-main"><div className="admin-mobile-head"><strong>Admin Dashboard</strong><select className="field" value={tab} onChange={e=>setTab(e.target.value)}><option value="freelancers">Freelancers</option><option value="content">Theme & Content</option><option value="messages">Messages</option></select></div>{tab==='freelancers'&&<><div className="admin-head"><div><h1>Freelancer approvals</h1><p>Accept a profile to publish it on the public site.</p></div><div className="admin-stats"><span><b>{pending}</b> Pending</span><span><b>{freelancers.filter(f=>f.status==='approved').length}</b> Live</span></div></div><div className="admin-list">{freelancers.map(f=><article key={f.id} className="admin-card"><Avatar name={f.name} image={f.image} size="sm"/><div className="admin-card-copy"><div className="admin-card-title"><strong>{f.name}</strong><span className={`status-chip ${f.status}`}>{f.status}</span></div><span>{f.title} · {f.category}</span><small>{f.email} · {f.location} · ${f.rate || '—'}/hr</small><p>{f.bio}</p><div className="tags">{String(f.skills).split(',').slice(0,5).map(s=><span key={s}>{s.trim()}</span>)}</div></div><div className="admin-actions">{f.status!=='approved'&&<Button onClick={()=>updateStatus(f.id,'approved')}><Check size={16}/> Accept</Button>}{f.status!=='rejected'&&<Button variant="secondary" onClick={()=>updateStatus(f.id,'rejected')}><XCircle size={16}/> Reject</Button>}<button className="danger" onClick={()=>remove(f.id)}>Delete</button></div></article>)}</div></>}{tab==='content'&&<form className="settings" onSubmit={saveSite}><div className="admin-head"><div><h1>Theme & website content</h1><p>Changes save to this browser and update the public website immediately.</p></div><Button type="submit">Save Changes</Button></div><section><h2>Brand & hero</h2><div className="form-grid"><label>Brand name<input className="field" value={draft.brand} onChange={e=>setDraft({...draft,brand:e.target.value})}/></label><label>Founder name<input className="field" value={draft.ownerName} onChange={e=>setDraft({...draft,ownerName:e.target.value})}/></label></div><label>Hero headline<textarea className="field" rows="2" value={draft.heroTitle} onChange={e=>setDraft({...draft,heroTitle:e.target.value})}/></label><label>Hero text<textarea className="field" rows="3" value={draft.heroText} onChange={e=>setDraft({...draft,heroText:e.target.value})}/></label></section><section><h2>Founder mission & photo</h2><label>Founder role<input className="field" value={draft.ownerRole} onChange={e=>setDraft({...draft,ownerRole:e.target.value})}/></label><label>Mission title<input className="field" value={draft.missionTitle} onChange={e=>setDraft({...draft,missionTitle:e.target.value})}/></label><label>Mission text<textarea className="field" rows="5" value={draft.missionText} onChange={e=>setDraft({...draft,missionText:e.target.value})}/></label><label>Founder image<FileImage value={draft.ownerImage} onChange={ownerImage=>setDraft({...draft,ownerImage})}/></label></section><section><h2>About & contact</h2><label>About heading<input className="field" value={draft.aboutTitle} onChange={e=>setDraft({...draft,aboutTitle:e.target.value})}/></label><label>About text<textarea className="field" rows="5" value={draft.aboutText} onChange={e=>setDraft({...draft,aboutText:e.target.value})}/></label><div className="form-grid"><label>Phone<input className="field" value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})}/></label><label>Email<input className="field" type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})}/></label></div></section><section><h2>Theme colors</h2><div className="color-grid">{[['primary','Primary'],['accent','Accent'],['background','Background'],['surface','Surface'],['text','Text']].map(([k,l])=><label key={k}>{l}<div className="color-field"><input type="color" value={draft[k]} onChange={e=>setDraft({...draft,[k]:e.target.value})}/><input className="field" value={draft[k]} onChange={e=>setDraft({...draft,[k]:e.target.value})}/></div></label>)}</div></section><Button type="submit">Save All Changes</Button></form>}{tab==='messages'&&<><div className="admin-head"><div><h1>Contact messages</h1><p>Messages submitted from the public contact form.</p></div></div><div className="message-list">{messages.length?messages.map(m=><article key={m.id}><div><strong>{m.name}</strong><a href={`mailto:${m.email}`}>{m.email}</a></div><p>{m.message}</p><small>{new Date(m.createdAt).toLocaleString()}</small></article>):<Empty text="No contact messages yet."/>}</div></>}</section></main>;
}

function Footer({site}){return <footer><div className="shell footer-grid"><div><a className="brand" href="#/home"><span className="brand-mark">FK</span><span>{site.brand}</span></a><p>{site.heroText}</p></div><div><strong>Platform</strong><a href="#/freelancers">Freelancers</a><a href="#/services">Services</a><a href="#/freelancer-register">Join as Freelancer</a></div><div><strong>Company</strong><a href="#/about">About Us</a><a href="#/contact">Contact</a><a href="#/admin-login">Admin</a></div><div><strong>Contact</strong><a href={`tel:${site.phone}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a></div></div><div className="shell footer-bottom">© 2026 {site.brand}. All rights reserved.</div></footer>}

export default function App(){
  const [route,setRoute]=useState(routeFromHash()); const data=useAppData();
  useEffect(()=>{const f=()=>{setRoute(routeFromHash());window.scrollTo(0,0)};window.addEventListener('hashchange',f);return()=>window.removeEventListener('hashchange',f)},[]);
  useEffect(()=>{const s=data.site;document.documentElement.style.setProperty('--primary',s.primary);document.documentElement.style.setProperty('--accent',s.accent);document.documentElement.style.setProperty('--bg',s.background);document.documentElement.style.setProperty('--surface',s.surface);document.documentElement.style.setProperty('--text',s.text);},[data.site]);
  const body=useMemo(()=>{
    const p={site:data.site,freelancers:data.freelancers,setFreelancers:data.setFreelancers,session:data.session,setSession:data.setSession,messages:data.messages,setSite:data.setSite};
    switch(route){case'about':return <About {...p}/>;case'services':return <Services/>;case'freelancers':return <Freelancers {...p}/>;case'contact':return <Contact {...p}/>;case'admin-login':return <AdminLogin {...p}/>;case'admin':return <AdminDashboard {...p}/>;case'freelancer-login':return <FreelancerLogin {...p}/>;case'freelancer-register':return <FreelancerRegister {...p}/>;case'freelancer-dashboard':return <FreelancerDashboard {...p}/>;default:return <Home {...p}/>}},[route,data.site,data.freelancers,data.session,data.messages]);
  const dashboard=route==='admin';
  return <div className="app">{!dashboard&&<Header site={data.site} session={data.session}/>} {body} {!dashboard&&<Footer site={data.site}/>}</div>;
}
