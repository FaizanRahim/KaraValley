import { useEffect, useState } from 'react';
import { Check, LogOut, Mail, Palette, Users, XCircle } from 'lucide-react';
import { Avatar, Button, Empty, FileImage, Protected } from '../components/shared';
import { services, store } from '../store';

function AdminFreelancersTab({ freelancers, updateStatus, remove }) {
  return <div className="admin-list">{freelancers.map((freelancer) => <article key={freelancer.id} className="admin-card"><Avatar name={freelancer.name} image={freelancer.image} size="sm" /><div className="admin-card-copy"><div className="admin-card-title"><strong>{freelancer.name}</strong><span className={`status-chip ${freelancer.status}`}>{freelancer.status}</span></div><span>{freelancer.title} · {freelancer.category}</span><small>{freelancer.email} · {freelancer.location} · ${freelancer.rate || '—'}/hr</small><p>{freelancer.bio}</p><div className="tags">{String(freelancer.skills).split(',').slice(0, 5).map((skill) => <span key={skill}>{skill.trim()}</span>)}</div></div><div className="admin-actions">{freelancer.status !== 'approved' && <Button onClick={() => updateStatus(freelancer.id, 'approved')}><Check size={16} /> Accept</Button>}{freelancer.status !== 'rejected' && <Button variant="secondary" onClick={() => updateStatus(freelancer.id, 'rejected')}><XCircle size={16} /> Reject</Button>}<button className="danger" onClick={() => remove(freelancer.id)}>Delete</button></div></article>)}</div>;
}

function AdminContentTab({ draft, setDraft, saveSite }) {
  return <form className="settings" onSubmit={saveSite}><div className="admin-head"><div><h1>Theme & website content</h1><p>Changes save to this browser and update the public website immediately.</p></div><Button type="submit">Save Changes</Button></div><section><h2>Brand & hero</h2><div className="form-grid"><label>Brand name<input className="field" value={draft.brand} onChange={(event) => setDraft({...draft, brand: event.target.value})} /></label><label>Founder name<input className="field" value={draft.ownerName} onChange={(event) => setDraft({...draft, ownerName: event.target.value})} /></label></div><label>Hero headline<textarea className="field" rows="2" value={draft.heroTitle} onChange={(event) => setDraft({...draft, heroTitle: event.target.value})} /></label><label>Hero text<textarea className="field" rows="3" value={draft.heroText} onChange={(event) => setDraft({...draft, heroText: event.target.value})} /></label></section><section><h2>Founder mission & photo</h2><label>Founder role<input className="field" value={draft.ownerRole} onChange={(event) => setDraft({...draft, ownerRole: event.target.value})} /></label><label>Mission title<input className="field" value={draft.missionTitle} onChange={(event) => setDraft({...draft, missionTitle: event.target.value})} /></label><label>Mission text<textarea className="field" rows="5" value={draft.missionText} onChange={(event) => setDraft({...draft, missionText: event.target.value})} /></label><label>Founder image<FileImage value={draft.ownerImage} onChange={(ownerImage) => setDraft({...draft, ownerImage})} /></label></section><section><h2>About & contact</h2><label>About heading<input className="field" value={draft.aboutTitle} onChange={(event) => setDraft({...draft, aboutTitle: event.target.value})} /></label><label>About text<textarea className="field" rows="5" value={draft.aboutText} onChange={(event) => setDraft({...draft, aboutText: event.target.value})} /></label><div className="form-grid"><label>Phone<input className="field" value={draft.phone} onChange={(event) => setDraft({...draft, phone: event.target.value})} /></label><label>Email<input className="field" type="email" value={draft.email} onChange={(event) => setDraft({...draft, email: event.target.value})} /></label></div></section><section><h2>Theme colors</h2><div className="color-grid">{[['primary', 'Primary'], ['accent', 'Accent'], ['background', 'Background'], ['surface', 'Surface'], ['text', 'Text']].map(([key, label]) => <label key={key}>{label}<div className="color-field"><input type="color" value={draft[key]} onChange={(event) => setDraft({...draft, [key]: event.target.value})} /><input className="field" value={draft[key]} onChange={(event) => setDraft({...draft, [key]: event.target.value})} /></div></label>)}</div></section><Button type="submit">Save All Changes</Button></form>;
}

function AdminMessagesTab({ messages }) {
  return <div className="message-list">{messages.length ? messages.map((message) => <article key={message.id}><div><strong>{message.name}</strong><a href={`mailto:${message.email}`}>{message.email}</a></div><p>{message.message}</p><small>{new Date(message.createdAt).toLocaleString()}</small></article>) : <Empty text="No contact messages yet." />}</div>;
}

export default function AdminDashboardPage({ session, site, setSite, freelancers, setFreelancers, messages, setSession }) {
  const [tab, setTab] = useState('freelancers');
  const [draft, setDraft] = useState(site);

  useEffect(() => setDraft(site), [site]);

  if (!session || session.role !== 'admin') {
    return <Protected title="Admin area" href="#/admin-login" />;
  }

  const updateStatus = (id, status) => setFreelancers(freelancers.map((freelancer) => freelancer.id === id ? { ...freelancer, status } : freelancer));
  const remove = (id) => {
    if (confirm('Delete this freelancer account?')) setFreelancers(freelancers.filter((freelancer) => freelancer.id !== id));
  };
  const saveSite = (event) => {
    event.preventDefault();
    setSite(draft);
    alert('Website settings saved.');
  };
  const logout = () => {
    store.logout();
    setSession(null);
    window.location.hash = '/home';
  };
  const pending = freelancers.filter((freelancer) => freelancer.status === 'pending').length;

  return <main className="admin-page"><aside className="admin-side"><a className="brand" href="#/home"><span className="brand-mark">FK</span><span>Admin</span></a><button className={tab === 'freelancers' ? 'active' : ''} onClick={() => setTab('freelancers')}><Users /> Freelancers {pending > 0 && <b>{pending}</b>}</button><button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}><Palette /> Theme & Content</button><button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}><Mail /> Messages</button><button onClick={logout}><LogOut /> Logout</button></aside><section className="admin-main"><div className="admin-mobile-head"><strong>Admin Dashboard</strong><select className="field" value={tab} onChange={(event) => setTab(event.target.value)}><option value="freelancers">Freelancers</option><option value="content">Theme & Content</option><option value="messages">Messages</option></select></div>{tab === 'freelancers' && <><div className="admin-head"><div><h1>Freelancer approvals</h1><p>Accept a profile to publish it on the public site.</p></div><div className="admin-stats"><span><b>{pending}</b> Pending</span><span><b>{freelancers.filter((freelancer) => freelancer.status === 'approved').length}</b> Live</span></div></div><AdminFreelancersTab freelancers={freelancers} updateStatus={updateStatus} remove={remove} /></>}{tab === 'content' && <AdminContentTab draft={draft} setDraft={setDraft} saveSite={saveSite} />}{tab === 'messages' && <><div className="admin-head"><div><h1>Contact messages</h1><p>Messages submitted from the public contact form.</p></div></div><AdminMessagesTab messages={messages} /></>}</section></main>;
}
