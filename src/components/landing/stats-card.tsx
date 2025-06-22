type StatsCardProps = {
  stats: string;
  title: string;
};
const StatsCard = ({ stats, title }: StatsCardProps) => {
  return (
    <div className={"text-center"}>
      <p className={"text-cosmic-gold font-bold text-3xl"}>{stats}</p>
      <p className={"mt-3 text-lg text-white/50"}>{title}</p>
    </div>
  );
};

export default StatsCard;
