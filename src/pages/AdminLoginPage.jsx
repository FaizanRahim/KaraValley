import { LogIn } from 'lucide-react';
import { Button, AuthPage } from '../components/shared';
import { ADMIN, store } from '../store';
import { AUTH_KEYS, clearFailedAttempts, createSession, getLoginState, isLocked, registerFailedAttempt } from '../utils/auth';
import { useState } from 'react';

export default function AdminLoginPage({ setSession }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const locked = isLocked(AUTH_KEYS.adminFails);
  const lockNote = locked ? (() => {
    const state = getLoginState(AUTH_KEYS.adminFails);
    const remaining = Math.max(1, Math.ceil((state.lockedUntil - Date.now()) / 60000));
    return `Too many failed attempts. Try again in ${remaining} minute${remaining === 1 ? '' : 's'}.`;
  })() : '';

  const submit = (event) => {
    event.preventDefault();
    if (locked) {
      setError(lockNote);
      return;
    }
    if (form.email.toLowerCase() === ADMIN.email && form.password === ADMIN.password) {
      clearFailedAttempts(AUTH_KEYS.adminFails);
      const session = createSession('admin', { email: ADMIN.email });
      store.setSession(session);
      setSession(session);
      window.location.hash = '/admin';
      return;
    }
    const nextState = registerFailedAttempt(AUTH_KEYS.adminFails);
    const remaining = nextState.lockedUntil ? Math.max(1, Math.ceil((nextState.lockedUntil - Date.now()) / 60000)) : 0;
    setError(nextState.lockedUntil ? `Invalid admin email or password. Locked for ${remaining} minute${remaining === 1 ? '' : 's'}.` : 'Invalid admin email or password.');
  };

  return <AuthPage title="Admin Login" note="Manage freelancer approvals, content, theme and contact details."><form onSubmit={submit} className="auth-form"><label>Email<input className="field" type="email" required value={form.email} onChange={(event) => setForm({...form, email: event.target.value})} /></label><label>Password<input className="field" type="password" required value={form.password} onChange={(event) => setForm({...form, password: event.target.value})} /></label>{(error || lockNote) && <p className="error">{error || lockNote}</p>}<Button type="submit" disabled={locked}><LogIn size={17} /> Login as Admin</Button><div className="credentials"><strong>Default admin login</strong><span>{ADMIN.email}</span><span>{ADMIN.password}</span></div></form></AuthPage>;
}
