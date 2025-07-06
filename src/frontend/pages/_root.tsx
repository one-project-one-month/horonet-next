import HoroscopeDaily from "@/components/horoscope/horoscope-daily";
import HoroscopeMonthly from "@/components/horoscope/horoscope-monthly";
import HoroscopeWeekly from "@/components/horoscope/horoscope-weekly";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RootPage = () => {
  // const query = trpc.compatibility.getCurrentUserSign.useQuery();

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
        <Card className="bg-white/10 border-white/20 backdrop-blur-lg rounded-md mt-5 p-6">
          <TabsContent value="daily">
            <HoroscopeDaily />
          </TabsContent>
          <TabsContent value="weekly">
            <HoroscopeWeekly />
          </TabsContent>
          <TabsContent value="monthly">
            <HoroscopeMonthly />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default RootPage;
