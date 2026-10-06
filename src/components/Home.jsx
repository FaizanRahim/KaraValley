import Categories from "./Categories";
import ClientCTA from "./ClientCTA";
import FeaturedTalent from "./FeaturedTalent";
import FinalCTA from "./FinalCTA";
import FreelancerCTA from "./FreelancerCTA";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import SearchTalent from "./SearchTalent";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";
import WhyKaraValley from "./WhyKaraValley";

export default function Home({ filters, people, onSearch, onFilters, onOpenProfile, onAuth }) {
  function join() {
    onAuth("signup", "freelancer");
  }

  function focusSearch() {
    window.setTimeout(() => {
      document.getElementById("talent-search")?.focus({ preventScroll: true });
    }, 450);
  }

  function findTalent() {
    if (window.location.hash === "#search") {
      document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "search";
    }
    focusSearch();
  }

  return (
    <>
      <Hero onOpenProfile={onOpenProfile} onJoin={join} />
      <SearchTalent
        key={`${filters.query}|${filters.skill}|${filters.category}|${filters.experience}|${filters.availability}`}
        filters={filters}
        onSearch={onSearch}
      />
      <FeaturedTalent people={people} filters={filters} onOpen={onOpenProfile} onFilters={onFilters} />
      <Categories
        active={filters.category}
        onSelect={(category) => {
          const next = filters.category === category ? "Any" : category;
          onFilters({ ...filters, category: next });
          if (window.location.hash === "#talent") {
            document.getElementById("talent")?.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            window.location.hash = "talent";
          }
        }}
      />
      <HowItWorks />
      <WhyKaraValley />
      <FreelancerCTA onCreate={join} />
      <ClientCTA onFind={findTalent} />
      <Testimonials />
      <Statistics />
      <FinalCTA onJoin={join} />
    </>
  );
}
