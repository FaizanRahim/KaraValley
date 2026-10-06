import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Avatar, Page } from '../components/shared';

export default function AboutPage({ site }) {
  return (
    <Page title="About Us" subtitle="The idea behind KaraValley.">
      <section className="mission-grid">
        <div className="mission-photo">
          <Avatar name={site.ownerName} image="/faizan.png" size="xl" />
          <div>
            <strong>{site.ownerName}</strong>
            <span>{site.ownerRole}</span>
          </div>
        </div>
        <div>
          <div className="eyebrow">Founder message</div>
          <h2>{site.missionTitle}</h2>
          <p className="lead">{site.missionText}</p>
          <a className="text-link" href="#/contact">Talk to us <ChevronRight size={16} /></a>
        </div>
      </section>

      <div className="about-grid">
        <div>
          <div className="eyebrow">Our purpose</div>
          <h2>{site.aboutTitle}</h2>
          <p className="lead">{site.aboutText}</p>
          <div className="values">
            {[
              ['Trust', 'Profiles go live only after admin approval.'],
              ['Opportunity', 'Freelancers can create a professional presence without bidding chaos.'],
              ['Access', 'Clients can discover services across technical, creative and business categories.'],
            ].map(([title, description]) => (
              <div key={title}>
                <ShieldCheck />
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="founder-card">
          <Avatar name={site.ownerName} image="/faizan.png" size="xl" />
          <h3>{site.ownerName}</h3>
          <p>{site.ownerRole}</p>
          <hr />
          <h4>{site.missionTitle}</h4>
          <p>{site.missionText}</p>
        </div>
      </div>
    </Page>
  );
}
