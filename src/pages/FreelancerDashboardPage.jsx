import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { Avatar, Button, FileImage, Page, Protected } from '../components/shared';
import { services, store } from '../store';

export default function FreelancerDashboardPage({ session, freelancers, setFreelancers, setSession }) {
  const currentFreelancer = session ? freelancers.find((freelancer) => freelancer.id === session.id) : null;
  const [draft, setDraft] = useState(currentFreelancer || {});

  useEffect(() => {
    if (currentFreelancer) {
      setDraft(currentFreelancer);
    }
  }, [currentFreelancer?.id, currentFreelancer?.status]);

  if (!session || session.role !== 'freelancer') {
    return <Protected title="Freelancer area" href="#/freelancer-login" />;
  }

  if (!currentFreelancer) {
    return <Protected title="Account not found" href="#/freelancer-login" />;
  }

  const save = (event) => {
    event.preventDefault();
    setFreelancers(freelancers.map((freelancer) => freelancer.id === currentFreelancer.id ? { ...draft, status: freelancer.status } : freelancer));
    alert('Profile saved.');
  };

  const logout = () => {
    store.logout();
    setSession(null);
    window.location.hash = '/home';
  };

  return <Page title="Freelancer Dashboard" subtitle="Edit your profile and check approval status."><div className={`status-banner ${currentFreelancer.status}`}><strong>Status: {currentFreelancer.status.toUpperCase()}</strong><span>{currentFreelancer.status === 'pending' ? 'Your profile is waiting for admin approval.' : currentFreelancer.status === 'approved' ? 'Your profile is live on the website.' : 'Your profile is not currently public. Edit it and contact the admin.'}</span></div><form className="form-card wide" onSubmit={save}><div className="dashboard-title"><div className="inline-user"><Avatar name={draft.name} image={draft.image} size="sm" /><div><strong>{draft.name}</strong><span>{draft.email}</span></div></div><Button type="button" variant="ghost" onClick={logout}><LogOut size={16} /> Logout</Button></div><div className="form-grid"><label>Full name<input className="field" value={draft.name || ''} onChange={(event) => setDraft({...draft, name: event.target.value})} /></label><label>Title<input className="field" value={draft.title || ''} onChange={(event) => setDraft({...draft, title: event.target.value})} /></label><label>Category<select className="field" value={draft.category || services[0]} onChange={(event) => setDraft({...draft, category: event.target.value})}>{services.map((service) => <option key={service}>{service}</option>)}</select></label><label>Hourly rate<input className="field" type="number" value={draft.rate || ''} onChange={(event) => setDraft({...draft, rate: event.target.value})} /></label><label>Location<input className="field" value={draft.location || ''} onChange={(event) => setDraft({...draft, location: event.target.value})} /></label><label>Portfolio<input className="field" value={draft.portfolio || ''} onChange={(event) => setDraft({...draft, portfolio: event.target.value})} /></label></div><label>Skills<input className="field" value={draft.skills || ''} onChange={(event) => setDraft({...draft, skills: event.target.value})} /></label><label>Bio<textarea className="field" rows="5" value={draft.bio || ''} onChange={(event) => setDraft({...draft, bio: event.target.value})} /></label><label>Profile image<FileImage value={draft.image || ''} onChange={(image) => setDraft({...draft, image})} /></label><Button type="submit">Save Profile</Button></form></Page>;
}
