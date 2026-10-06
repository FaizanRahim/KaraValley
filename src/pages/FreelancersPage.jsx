import { useState } from 'react';
import { Empty, FreelancerCard, Page } from '../components/shared';

export default function FreelancersPage({ freelancers }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const approved = freelancers.filter((freelancer) => freelancer.status === 'approved');
  const categories = ['All', ...new Set(approved.map((freelancer) => freelancer.category).filter(Boolean))];
  const list = approved.filter((freelancer) => (category === 'All' || freelancer.category === category) && `${freelancer.name} ${freelancer.title} ${freelancer.skills}`.toLowerCase().includes(query.toLowerCase()));

  return <Page title="Freelancers" subtitle="Only profiles accepted by the admin are displayed here."><div className="filters"><input className="field" placeholder="Search name, skill or role" value={query} onChange={(event) => setQuery(event.target.value)} /><select className="field" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((value) => <option key={value}>{value}</option>)}</select></div><div className="profile-grid">{list.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} />)}</div>{!list.length && <Empty text="No approved freelancers match this search." />}</Page>;
}
