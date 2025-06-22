import StatsCard from "@/components/landing/stats-card";
import { STATS } from "@/lib/constants";

const Stats = () => {
  return (
    <section className={"px-4 py-10  lg:px-40"}>
      <div className={"grid grid-cols-2 grid-row-2 gap-8 lg:grid-cols-4"}>
        {STATS.map(item => (
          <StatsCard {...item} key={item.title} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
