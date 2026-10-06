import { Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Button, Page } from '../components/shared';
import { store } from '../store';
import { useState } from 'react';

export default function ContactPage({ site }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (event) => {
    event.preventDefault();
    store.addMessage(form);
    setDone(true);
  };

  return <Page title="Contact" subtitle="Questions, partnerships, hiring or support — send a message."><div className="contact-grid"><div className="contact-info"><div><Phone /><span>Phone</span><a href={`tel:${site.phone}`}>{site.phone}</a></div><div><Mail /><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div></div>{done ? <div className="success-box"><CheckCircle2 /><h3>Message received</h3><p>Your message has been saved in the admin inbox.</p></div> : <form className="form-card" onSubmit={submit}><label>Name<input className="field" required value={form.name} onChange={(event) => setForm({...form, name: event.target.value})} /></label><label>Email<input className="field" type="email" required value={form.email} onChange={(event) => setForm({...form, email: event.target.value})} /></label><label>Message<textarea className="field" rows="6" required value={form.message} onChange={(event) => setForm({...form, message: event.target.value})} /></label><Button type="submit">Send Message</Button></form>}</div></Page>;
}
