import Cta from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Nav from "@/components/landing/nav";
import Review from "@/components/landing/review";
import Stats from "@/components/landing/stats";

const LandingPage = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Stats />
      <Review />
      <Cta />
      <Footer />
    </>
  );
};

export default LandingPage;
