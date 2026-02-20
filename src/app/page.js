import ForecastCard from "@/components/ForecastCard";
import SimpleMap from "@/components/SimpleMap";
import TestKpData from "@/components/testKpData";

export default function Home() {
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-200 text-center">
      <div className="w-full max-w-11/12 space-y-8">

        <header>
          <h1 className="leading-tight">
            <span className="block">Northern Lights</span>
            <span className="block">Forecast</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral/80 font-light max-w-lg mx-auto">
            Finn de beste forholdene for å se nordlyset i kveld.
          </p>
        </header>
         <div className="min-h-screen flex items-center justify-center">
          <SimpleMap />
        </div>
        <div>
          <ForecastCard />
        </div>
        <div>
          <TestKpData />
        </div>
      </div>
    </main>
  );
}
