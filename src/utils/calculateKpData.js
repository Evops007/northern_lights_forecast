import getNoaaForecast from "../services/kpData";

export default async function calculateKpData() {
    const data = await getNoaaForecast();
    const highestKp = data[0].intervals.map(item => item.kp);
    const maxKp = Math.max(...highestKp);
    
    const auroraLimit = 75 - (maxKp * 3);
    
    return auroraLimit
}