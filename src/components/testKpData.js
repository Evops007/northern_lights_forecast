import getNightCloudCover from "@/services/getNightCloudCover";
import getNoaaForecast from "@/services/kpData"
import weatherData from "@/services/weatherData";
import calculateKpData from "@/utils/calculateKpData";



export default async function TestKpData() {
    const data = await getNoaaForecast();
    const sunData = await weatherData()
    const cloudCover = await getNightCloudCover();
    const calculatedAurora = await calculateKpData();

    const highestKp = data[1].intervals.map(item => item.kp);
    const maxKp = Math.max(...highestKp);
    const auroraLimit = 75 - (maxKp * 3);

    return (
        <div> 
            <p>
                Nordlys kan sees fra {auroraLimit}°N
            </p>
            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                <p>skydekket i {calculatedAurora[0].place} er {calculatedAurora[0].dates[0].forecasts[0].weatherForecast.cloud_area_fraction}% og kp er {calculatedAurora[0].dates[0].forecasts[0].auroraForecast.kp.kpValue} og {calculatedAurora[0].dates[0].forecasts[0].auroraScore}</p>
            </pre>
            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(data, null, 20)}
            </pre>

            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(sunData, null, 20)}
                <p>solen i {sunData[0].place.name} står opp {sunData[0].place.forecast[0].sunrise.time} og går ned {sunData[0].place.forecast[0].sunset.time} i dag {sunData[0].place.forecast[0].date} </p>
            </pre>

            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                <p>skydekket i tromsø kl {cloudCover[0]?.weatherForecast[0]?.time} er forventet å være {cloudCover[0]?.weatherForecast[0]?.data.instant.details.cloud_area_fraction}%</p>
            </pre>

            
        </div>
    )
}