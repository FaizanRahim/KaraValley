import { ArrowRight, BriefcaseBusiness, ChevronRight, Code2, ShieldCheck, UserCheck } from 'lucide-react';
import { services } from '../store';
import { FreelancerCard } from '../components/shared';

export default function HomePage({ site, freelancers, onOpenProfile, onJoin }) {
  const approved = freelancers.filter((freelancer) => freelancer.status === 'approved').slice(0, 6);

  return (
    <>
      <section className="hero shell" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
        <div className="hero-copy">
          <div className="pill"><ShieldCheck size={16} /> Certified Freelancer Profiles</div>
          <h1>{site.heroTitle}</h1>
          <p>{site.heroText}</p>
          <div className="hero-actions">
            <a className="btn" href="#/freelancers">Find Freelancers <ArrowRight size={17} /></a>
            <a className="btn btn-secondary" href="#/freelancer-register">Join as Freelancer</a>
          </div>
          <div className="trust-row">
            <span><UserCheck /> Approved profiles</span>
            <span><BriefcaseBusiness /> Online services</span>
            <span><ShieldCheck /> Admin moderation</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-image-card hero-portrait-card glass float-mid overflow-hidden rounded-3xl" style={{ position: 'relative', minHeight: '390px' }}>
            <img src="/faizan.png" alt="Faizan" className="hero-portrait-image" style={{ width: '100%', height: '390px', minHeight: '390px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '24px', background: 'linear-gradient(to top, rgba(5,6,7,.92), rgba(5,6,7,.05))' }}>
              <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#fff' }}>Faizan - Founder</h3>
              <p style={{ margin: '5px 0 0', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,.75)' }}>KaraValley</p>
            </div>
          </div>

          <div className="metric-grid">
            <div><b>{freelancers.filter((freelancer) => freelancer.status === 'approved').length}</b><span>Approved talent</span></div>
            <div><b>{services.length}+</b><span>Service categories</span></div>
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
            <a className="text-link" href="#/services">View all services <ChevronRight size={16} /></a>
          </div>
          <div className="service-grid">
            {services.slice(0, 8).map((service, index) => (
              <div className="service-card" key={service}>
                <Code2 />
                <span>{service}</span>
                <small>{['Build', 'Create', 'Grow', 'Support'][index % 4]} your business online</small>
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
          <a className="text-link" href="#/freelancers">See all <ChevronRight size={16} /></a>
        </div>
        <div className="profile-grid">
          {approved.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} />)}
        </div>
      </section>

      <section className="section shell">
        <div className="cta">
          <div>
            <div className="eyebrow">For freelancers</div>
            <h2>Create your profile. Get reviewed. Go live.</h2>
            <p>Every new freelancer submits a profile to the admin. Once accepted, the profile automatically appears on the public marketplace.</p>
          </div>
          <a className="btn" href="#/freelancer-register">Create Freelancer Account</a>
        </div>
      </section>
    </>
  );
}
