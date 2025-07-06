import LoadingSpinner from "@/components/common/loading-spinner";
import HoroscopeDaily from "@/components/horoscope/horoscope-daily";
import HoroscopeMonthly from "@/components/horoscope/horoscope-monthly";
import HoroscopeWeekly from "@/components/horoscope/horoscope-weekly";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/trpc/clitent";

const RootPage = () => {
  const query = trpc.compatibility.getCurrentUserSign.useQuery();

  if (query.isLoading) {
    return (
      <div className={"w-full py-52 "}>
        <LoadingSpinner />
        <h2 className={"mt-16 text-2xl text-white font-bold text-center"}>
          Connecting to the Cosmos...
        </h2>
        <p className={"text-white/40 text-center"}>
          The stars are aligning your experience
        </p>
      </div>
    );
  }

  if (!query.data) {
    throw new Error("No data provided");
  }

  return (
    <div className={"px-4 py-6 md:px-6 lg:px-10"}>
      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20 backdrop-blur-lg">
          <TabsTrigger
            value="daily"
            className="text-white hover:text-white hover:cursor-pointer data-[state=active]:bg-cosmic-gold"
          >
            Daily
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="text-white hover:text-white hover:cursor-pointer data-[state=active]:text-white data-[state=active]:bg-cosmic-gold"
          >
            Weekly
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="text-white hover:text-white hover:cursor-pointer data-[state=active]:text-white data-[state=active]:bg-cosmic-gold"
          >
            Monthly
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <HoroscopeDaily sign={query.data?.signName} />
        </TabsContent>
        <TabsContent value="weekly">
          <HoroscopeWeekly sign={query.data?.signName} />
        </TabsContent>
        <TabsContent value="monthly">
          <HoroscopeMonthly sign={query.data?.signName} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RootPage;
