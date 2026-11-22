import { useState } from 'react';
import { CheckCircle2, LogOut, Menu, ShieldCheck, Users, X } from 'lucide-react';

export const cx = (...values) => values.filter(Boolean).join(' ');

export function Avatar({ name, image, size = 'lg' }) {
  const initials = name?.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'FK';
  const dims = size === 'sm' ? 'h-11 w-11 text-sm' : size === 'xl' ? 'h-40 w-40 text-4xl' : 'h-20 w-20 text-xl';
  if (image) return <img src={image} alt={name} className={`${dims} rounded-3xl object-cover border border-white/10`} />;
  return <div className={`${dims} avatar-fallback grid place-items-center rounded-3xl font-bold`}>{initials}</div>;
}

export function Button({ children, className = '', variant = 'primary', ...props }) {
  return <button className={cx('btn', variant === 'secondary' && 'btn-secondary', variant === 'ghost' && 'btn-ghost', className)} {...props}>{children}</button>;
}

export function Header({ site, session }) {
  const [open, setOpen] = useState(false);
  const links = [['home', 'Home'], ['about', 'About Us'], ['services', 'Services'], ['freelancers', 'Freelancers'], ['contact', 'Contact']];

  return <header className="nav-wrap">
    <div className="nav shell">
      <a href="#/home" className="brand" aria-label={site.brand}>
        <img src="/karavalley.png" alt="KaraValley logo" style={{ width: '38px', height: '38px', objectFit: 'contain', display: 'block' }} />
        <span>{site.brand}</span>
      </a>
      <nav className="desktop-nav">{links.map(([route, label]) => <a key={route} href={`#/${route}`}>{label}</a>)}</nav>
      <div className="desktop-actions">
        <a className="small-link" href="#/freelancer-login">Freelancer Login</a>
        <a className="small-link" href="#/admin-login">Admin</a>
        {session && <a className="btn mini" href={session.role === 'admin' ? '#/admin' : '#/freelancer-dashboard'}>Dashboard</a>}
      </div>
      <button className="icon-btn mobile-only" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="mobile-menu">{links.map(([route, label]) => <a key={route} href={`#/${route}`} onClick={() => setOpen(false)}>{label}</a>)}<a href="#/freelancer-login">Freelancer Login</a><a href="#/admin-login">Admin Login</a></div>}
  </header>;
}

export function Footer({ site }) {
  return <footer><div className="shell footer-grid"><div><a className="brand" href="#/home"><span className="brand-mark">FK</span><span>{site.brand}</span></a><p>{site.heroText}</p></div><div><strong>Platform</strong><a href="#/freelancers">Freelancers</a><a href="#/services">Services</a><a href="#/freelancer-register">Join as Freelancer</a></div><div><strong>Company</strong><a href="#/about">About Us</a><a href="#/contact">Contact</a><a href="#/admin-login">Admin</a></div><div><strong>Contact</strong><a href={`tel:${site.phone}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a></div></div><div className="shell footer-bottom">© 2026 {site.brand}. All rights reserved.</div></footer>;
}

export function Page({ title, subtitle, eyebrow = 'KaraValley', children }) {
  return <main className="page shell"><div className="page-head"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{children}</main>;
}

export function Empty({ text }) {
  return <div className="empty"><Users /><p>{text}</p></div>;
}

export function AuthPage({ title, note, children }) {
  return <main className="auth-page"><div className="auth-box"><a className="brand center" href="#/home"><span className="brand-mark">FK</span><span>KaraValley</span></a><h1>{title}</h1><p>{note}</p>{children}</div></main>;
}

export function Protected({ title, href }) {
  return <main className="auth-page"><div className="auth-box"><ShieldCheck size={42} /><h1>{title}</h1><p>Please log in to access this section.</p><a className="btn" href={href}>Go to Login</a></div></main>;
}

export function FileImage({ value, onChange }) {
  const handle = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) {
      alert('Please choose an image smaller than 1.5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return <div className="image-field">{value && <img src={value} alt="Preview" />}<input className="field" type="file" accept="image/*" onChange={handle} />{value && <button type="button" className="text-link" onClick={() => onChange('')}>Remove image</button>}</div>;
}

export function FreelancerCard({ freelancer }) {
  return <article className="profile-card"><div className="profile-top"><Avatar name={freelancer.name} image={freelancer.image} /><span className="verified"><CheckCircle2 size={14} /> Verified</span></div><h3>{freelancer.name}</h3><p className="role">{freelancer.title}</p><p className="bio clamp">{freelancer.bio}</p><div className="tags">{String(freelancer.skills).split(',').slice(0, 4).map((skill) => <span key={skill}>{skill.trim()}</span>)}</div><div className="profile-foot"><span>{freelancer.location}</span><b>${freelancer.rate || '—'}/hr</b></div></article>;
}
