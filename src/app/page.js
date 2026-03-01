import ForecastCard from "@/components/ForecastCard";
import SimpleMap from "@/components/SimpleMap";
import calculateKpData from "@/utils/calculateKpData";

export default async function Home() {
  const completeForecast = await calculateKpData()

  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-base-200">
      <div className="w-full max-w-[1400px] space-y-6">

        <header className="text-center">
          <h1>
            <span className="block">Northern Lights</span>
            <span className="block">Forecast</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-neutral/80 font-light max-w-lg mx-auto">
            Plan your trip with a northern light forecast
          </p>
        </header>

        <SimpleMap completeForecast={completeForecast} />

      </div>
    </main>
  );
}
