import { useEffect, useMemo, useState } from 'react';
import { Footer, Header } from './components/shared';
import { useAppData } from './hooks/useAppData';
import AboutPage from './pages/AboutPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ContactPage from './pages/ContactPage';
import FreelancerDashboardPage from './pages/FreelancerDashboardPage';
import FreelancerLoginPage from './pages/FreelancerLoginPage';
import FreelancerRegisterPage from './pages/FreelancerRegisterPage';
import FreelancersPage from './pages/FreelancersPage';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';

const routeFromHash = () => window.location.hash.replace(/^#\/?/, '') || 'home';

export default function App() {
  const [route, setRoute] = useState(routeFromHash());
  const data = useAppData();

  useEffect(() => {
    const syncRoute = () => {
      setRoute(routeFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    const { site } = data;
    document.documentElement.style.setProperty('--primary', site.primary);
    document.documentElement.style.setProperty('--accent', site.accent);
    document.documentElement.style.setProperty('--bg', site.background);
    document.documentElement.style.setProperty('--surface', site.surface);
    document.documentElement.style.setProperty('--text', site.text);
  }, [data.site]);

  const body = useMemo(() => {
    const common = {
      site: data.site,
      freelancers: data.freelancers,
      messages: data.messages,
      session: data.session,
      setFreelancers: data.setFreelancers,
      setSession: data.setSession,
      setSite: data.setSite,
    };

    switch (route) {
      case 'about':
        return <AboutPage {...common} />;
      case 'services':
        return <ServicesPage {...common} />;
      case 'freelancers':
        return <FreelancersPage {...common} />;
      case 'contact':
        return <ContactPage {...common} />;
      case 'admin-login':
        return <AdminLoginPage {...common} />;
      case 'admin':
        return <AdminDashboardPage {...common} />;
      case 'freelancer-login':
        return <FreelancerLoginPage {...common} />;
      case 'freelancer-register':
        return <FreelancerRegisterPage {...common} />;
      case 'freelancer-dashboard':
        return <FreelancerDashboardPage {...common} />;
      default:
        return <HomePage {...common} />;
    }
  }, [route, data.site, data.freelancers, data.messages, data.session, data.setFreelancers, data.setSession, data.setSite]);

  const dashboard = route === 'admin';

  return (
    <div className="app">
      {!dashboard && <Header site={data.site} session={data.session} />}
      {body}
      {!dashboard && <Footer site={data.site} />}
    </div>
  );
}
