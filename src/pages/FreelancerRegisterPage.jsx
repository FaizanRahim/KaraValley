import { useState } from 'react';
import { Button, FileImage, Page } from '../components/shared';
import { services, store } from '../store';
import { createSession } from '../utils/auth';

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);

export default function FreelancerRegisterPage({ freelancers, setFreelancers, setSession }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', title: '', category: services[0], skills: '', bio: '', rate: '', location: 'Pakistan', portfolio: '', image: '' });
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (freelancers.some((freelancer) => freelancer.email.toLowerCase() === form.email.toLowerCase())) {
      setError('An account with this email already exists.');
      return;
    }

    const item = { ...form, id: slug(form.name), status: 'pending', createdAt: new Date().toISOString() };
    const next = [item, ...freelancers];
    setFreelancers(next);
    const session = createSession('freelancer', { id: item.id, email: item.email });
    store.setSession(session);
    setSession(session);
    window.location.hash = '/freelancer-dashboard';
  };

  return <Page title="Create Freelancer Profile" subtitle="Submit your profile for admin review. It will appear publicly only after approval."><form className="form-card wide" onSubmit={submit}><div className="form-grid"><label>Full name<input className="field" required value={form.name} onChange={(event) => setForm({...form, name: event.target.value})} /></label><label>Email<input className="field" type="email" required value={form.email} onChange={(event) => setForm({...form, email: event.target.value})} /></label><label>Password<input className="field" type="password" minLength="6" required value={form.password} onChange={(event) => setForm({...form, password: event.target.value})} /></label><label>Professional title<input className="field" required value={form.title} onChange={(event) => setForm({...form, title: event.target.value})} /></label><label>Category<select className="field" value={form.category} onChange={(event) => setForm({...form, category: event.target.value})}>{services.map((service) => <option key={service}>{service}</option>)}</select></label><label>Hourly rate (USD)<input className="field" type="number" min="0" value={form.rate} onChange={(event) => setForm({...form, rate: event.target.value})} /></label><label>Location<input className="field" value={form.location} onChange={(event) => setForm({...form, location: event.target.value})} /></label><label>Portfolio URL<input className="field" type="url" value={form.portfolio} onChange={(event) => setForm({...form, portfolio: event.target.value})} /></label></div><label>Skills (comma separated)<input className="field" required value={form.skills} onChange={(event) => setForm({...form, skills: event.target.value})} /></label><label>Bio<textarea className="field" rows="5" required value={form.bio} onChange={(event) => setForm({...form, bio: event.target.value})} /></label><label>Profile image<FileImage value={form.image} onChange={(image) => setForm({...form, image})} /></label>{error && <p className="error">{error}</p>}<Button type="submit">Submit for Approval</Button></form></Page>;
}
