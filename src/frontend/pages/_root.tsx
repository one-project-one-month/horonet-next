import { Card } from "@/components/ui/card";
import { trpc } from "@/trpc/clitent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star } from "lucide-react";

const RootPage = () => {
  const today = new Date();
  const { data } = trpc.compatibility.getCurrentUserSign.useQuery();

  const { data: dailyData, isLoading: isDailyLoading } = trpc.horoscope.daily.useQuery({ sign: data as string, day: today ? 'TODAY' : "YESTERDAY" });
  const { data: weeklyData, isLoading: isWeeklyLoading } = trpc.horoscope.weekly.useQuery({ sign: data as string });
  const { data: monthlyData, isLoading: isMonthlyLoading } = trpc.horoscope.monthly.useQuery({ sign: data as string });

  return (
    <div className={"px-4 py-6 md:px-6 lg:px-10"}>
      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20 backdrop-blur-lg">
          <TabsTrigger value="daily" className="text-white hover:text-white hover:cursor-pointer data-[state=active]:bg-cosmic-gold">
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="text-white hover:text-white hover:cursor-pointer data-[state=active]:text-white data-[state=active]:bg-cosmic-gold">
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="text-white hover:text-white hover:cursor-pointer data-[state=active]:text-white data-[state=active]:bg-cosmic-gold">
            Monthly
          </TabsTrigger>
        </TabsList>
        <Card className="bg-white/10 border-white/20 backdrop-blur-lg rounded-md mt-5 p-6">
          <TabsContent value="daily">
            {
              isDailyLoading ? <span className="text-white">Loading....</span> :
                <div>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-cosmic-gold mb-2">
                      {data}
                    </h2>
                    <span className="text-slate-400">Today's Horoscope</span>
                  </div>
                  <p className="text-purple-100 leading-relaxed">
                    {dailyData.data.horoscope_data}
                  </p>
                </div>
            }
          </TabsContent>
          <TabsContent value="weekly">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Weekly Horoscope
              </h2>
              {
                isWeeklyLoading ? <span className="text-white">Loading....</span> :
                  <p className="text-purple-100 leading-relaxed">
                    {weeklyData.data.horoscope_data}
                  </p>
              }
            </div>
          </TabsContent>
          <TabsContent value="monthly">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Monthly Horoscope
              </h2>
              {
                isMonthlyLoading ? <span className="text-white">Loading....</span> :
                  <>
                    <div className="flex gap-10 mb-2">
                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">Standout Days</h3>
                        <div className="flex flex-wrap gap-2">
                          {monthlyData.data.standout_days.split(',').map((day: string, index: number) => (
                            <span
                              key={index}
                              className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-purple-300 font-semibold mb-2">Challenging Days</h3>
                        <div className="flex flex-wrap gap-2">
                          {monthlyData.data.challenging_days.split(',').map((day: string, index: number) => (
                            <span
                              key={index}
                              className="w-8 h-8 bg-gradient-to-br from-bg-cosmic-gold to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-purple-100 leading-relaxed">
                      {monthlyData.data.horoscope_data}
                    </p>
                  </>
              }
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
};

export default RootPage;
