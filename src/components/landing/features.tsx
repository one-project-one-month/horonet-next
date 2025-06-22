import FeatureCard from "@/components/landing/feature-card";
import { FEATURES } from "@/lib/constants";

const Features = () => {
  return (
    <section className={"px-4 py-10  md:px-6 lg:px-20"}>
      <h2
        className={
          "max-w-[900px] mx-auto mb-4 text-4xl md:text-5xl  text-center  font-bold "
        }
      >
        Unlock the Power of the Stars
      </h2>
      <div className={"mt-8 md:mt-12 grid gap-8 lg:grid-cols-3"}>
        {FEATURES.map(feat => (
          <FeatureCard key={feat.title} {...feat} />
        ))}
      </div>
    </section>
  );
};

export default Features;
