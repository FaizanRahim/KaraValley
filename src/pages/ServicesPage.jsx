import { ChevronRight } from 'lucide-react';
import { Page } from '../components/shared';
import { services } from '../store';

export default function ServicesPage() {
  return (
    <Page title="Services" subtitle="Browse the online services available through approved freelancers.">
      <div className="all-services">
        {services.map((service, index) => (
          <div key={service} className="service-row">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{service}</strong>
            <ChevronRight />
          </div>
        ))}
      </div>
    </Page>
  );
}
