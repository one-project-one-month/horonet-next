import { Badge } from "@/components/ui/badge";
import { parseToDate } from "@/lib/utils";
import { trpc } from "@/trpc/clitent";

const SignCard = ({ id }: { id: string }) => {
  const query = trpc.sign.selectById.useQuery({ id });
  if (!query.data || query.isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className={"mb-5"}>
        <h3 className={"text-2xl text-cosmic-gold font-bold"}>
          You are a {query.data.name}!
        </h3>
        <p className={"mt-2 tex-lg font-normal text-white"}>
          {parseToDate(query.data.periodStart)} -{" "}
          {parseToDate(query.data.periodEnd)}
        </p>
      </div>
      <div className={"p-8 bg-white/10 rounded-lg text-white"}>
        <ul className={"flex flex-col gap-y-3"}>
          <li className={"flex items-center justify-between"}>
            <span className={"text-white/60"}>Element:</span>
            <span className={"font-bold text-lg"}>{query.data.element}</span>
          </li>
          <li className={"flex items-center justify-between"}>
            <span className={"text-white/60"}>Ruling Planet:</span>
            <span className={"font-bold text-lg"}>
              {query.data.rulingPlanet}
            </span>
          </li>
        </ul>
        <div className={"mt-4"}>
          <p className={"text-center text-white/60"}>Your traits:</p>
          <div className={"mt-3 flex items-center justify-start gap-x-3"}>
            {query.data.traits.map(trait => (
              <Badge key={trait} className={"text-xs rounded-lg bg-cosmic-gold/40 text-white/60"}>{trait}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignCard;
