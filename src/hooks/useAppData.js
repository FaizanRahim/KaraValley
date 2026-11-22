import { useEffect, useState } from 'react';
import { store } from '../store';
import { isSessionExpired } from '../utils/auth';

export function useAppData() {
  const [site, setSiteState] = useState(store.getSite());
  const [freelancers, setFreelancersState] = useState(store.getFreelancers());
  const [session, setSessionState] = useState(() => {
    const current = store.getSession();
    if (isSessionExpired(current)) {
      store.logout();
      return null;
    }
    return current;
  });
  const [messages, setMessages] = useState(store.getMessages());

  useEffect(() => {
    const sync = () => {
      setSiteState(store.getSite());
      setFreelancersState(store.getFreelancers());

      const current = store.getSession();
      if (isSessionExpired(current)) {
        store.logout();
        setSessionState(null);
      } else {
        setSessionState(current);
      }

      setMessages(store.getMessages());
    };

    window.addEventListener('storage', sync);
    window.addEventListener('fkv-change', sync);

    const timer = window.setInterval(() => {
      const current = store.getSession();
      if (isSessionExpired(current)) {
        store.logout();
        setSessionState(null);
      }
    }, 60 * 1000);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('storage', sync);
      window.removeEventListener('fkv-change', sync);
    };
  }, []);

  return {
    site,
    freelancers,
    session,
    messages,
    setSite: (value) => {
      store.setSite(value);
      setSiteState(value);
    },
    setFreelancers: (value) => {
      store.setFreelancers(value);
      setFreelancersState(value);
    },
    setSession: (value) => {
      store.setSession(value);
      setSessionState(value);
    },
  };
}
