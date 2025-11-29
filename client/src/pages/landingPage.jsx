import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";
import LandingFooter from "../components/LandingFooter";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingNavbar showMenuButton={false}/>
      <LandingHero />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
