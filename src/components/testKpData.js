import getNoaaForecast from "@/services/kpData"
import weatherData from "@/services/weatherData";



export default async function TestKpData() {
    const data = await getNoaaForecast();
    const sunData = await weatherData()
    const highestKp = data[0].intervals.map(item => item.kp);
    const maxKp = Math.max(...highestKp);
    
    const auroraLimit = 75 - (maxKp * 3);
    return (
        <div> 
            <p>
                Nordlys kan sees fra {auroraLimit}°N
            </p>
            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(data, null, 20)}
            </pre>

            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(sunData, null, 20)}
                <p>solen i {sunData[0].name} står opp {sunData[0].sunrise.time} og går ned {sunData[0].sunset.time} </p>
            </pre>

            
        </div>
    )
}