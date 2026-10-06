import { LogIn } from 'lucide-react';
import { Button, AuthPage } from '../components/shared';
import { store } from '../store';
import { AUTH_KEYS, clearFailedAttempts, createSession, getLoginState, isLocked, registerFailedAttempt } from '../utils/auth';
import { useState } from 'react';

export default function FreelancerLoginPage({ freelancers, setSession }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const locked = isLocked(AUTH_KEYS.freelancerFails);
  const lockNote = locked ? (() => {
    const state = getLoginState(AUTH_KEYS.freelancerFails);
    const remaining = Math.max(1, Math.ceil((state.lockedUntil - Date.now()) / 60000));
    return `Too many failed attempts. Try again in ${remaining} minute${remaining === 1 ? '' : 's'}.`;
  })() : '';

  const submit = (event) => {
    event.preventDefault();
    if (locked) {
      setError(lockNote);
      return;
    }
    const freelancer = freelancers.find((entry) => entry.email.toLowerCase() === form.email.toLowerCase() && entry.password === form.password);
    if (freelancer) {
      if (freelancer.status !== 'approved') {
        setError('This account is not approved yet. Please wait for admin approval.');
        return;
      }
      clearFailedAttempts(AUTH_KEYS.freelancerFails);
      const session = createSession('freelancer', { id: freelancer.id, email: freelancer.email });
      store.setSession(session);
      setSession(session);
      window.location.hash = '/freelancer-dashboard';
      return;
    }
    const nextState = registerFailedAttempt(AUTH_KEYS.freelancerFails);
    const remaining = nextState.lockedUntil ? Math.max(1, Math.ceil((nextState.lockedUntil - Date.now()) / 60000)) : 0;
    setError(nextState.lockedUntil ? `Email or password is incorrect. Locked for ${remaining} minute${remaining === 1 ? '' : 's'}.` : 'Email or password is incorrect.');
  };

  return <AuthPage title="Freelancer Login" note="Access your freelancer profile and approval status."><form onSubmit={submit} className="auth-form"><label>Email<input className="field" type="email" required value={form.email} onChange={(event) => setForm({...form, email: event.target.value})} /></label><label>Password<input className="field" type="password" required value={form.password} onChange={(event) => setForm({...form, password: event.target.value})} /></label>{(error || lockNote) && <p className="error">{error || lockNote}</p>}<Button type="submit" disabled={locked}><LogIn size={17} /> Freelancer Login</Button><p>New freelancer? <a href="#/freelancer-register">Create an account</a></p></form></AuthPage>;
}
