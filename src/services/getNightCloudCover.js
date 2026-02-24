import weatherData from "./weatherData";


export default async function getNightCloudCover() {
    const sunData = await weatherData()
    
    const base_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact?";
    const fullURL = [];
    const rawData = [];
    const filteredData = [];

    const locations = [ //legg inn alle lokasjoner som vises på kartet
        {place: "Tromsø", lat: "69.6489", lon: "18.95508"},
        {place: "Alta", lat: "69.96887", lon: "23.27165"},
        {place: "Narvik", lat: "68.43838", lon: "17.4272"},
        {place: "Lyngen", lat: "69.57621", lon: "20.21702"},
        {place: "Nordkapp", lat: "71.164932", lon: "25.786972"},
        {place: "Lofoten", lat: "68.23417", lon: "14.56834"},
        {place: "Bodø", lat: "67.280357", lon: "14.404916"},
        {place: "Kirkenes", lat: "69.72706", lon: "30.04578"}
    ]

    for (let i = 0; i < locations.length; i++) {
        const findLat = locations[i].lat;
        const findLon = locations[i].lon;

        fullURL.push({
            name: `${locations[i].place}`,
            fetchURL: `${base_URL}lat=${findLat}&lon=${findLon}`
        })
    }

    for (let i = 0; i < fullURL.length; i++) {
        const response = await fetch(fullURL[i].fetchURL, {
            headers: { 'User-Agent': 'NorthernLightsForecast even.kr@hotmail.com' },
            next: { revalidate: 3600 }
        });
        if (!response.ok) {
            throw new Error("Kunne ikke hente data");
        }
        
        rawData.push(await response.json())
    }

    for (let i = 0; i < rawData.length; i++) {
        for (let j = 0; j < sunData[i].place.forecast.length; j++) {
            const sunriseTime = new Date(sunData[i].place.forecast[j].sunrise.fullTimeDate);
            const sunsetTime  = new Date(sunData[i].place.forecast[j].sunset.fullTimeDate);
            const dayStart = new Date(sunriseTime);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(sunriseTime);
            dayEnd.setHours(23, 59, 59, 999);
            const weatherForecast = rawData[i].properties.timeseries.filter(t => {
            const time = new Date(t.time);
            const isSameDay = time >= dayStart && time <= dayEnd;
            const isNight = time < sunriseTime || time > sunsetTime;

            return isSameDay && isNight;
            });

            filteredData.push({
            place: locations[i].place,
            date: sunriseTime.toISOString().slice(0, 10),
            weatherForecast
            });
        }
    }
    
    //samle data under samme navn - samme som i weatherData
    function mergeFilteredData(filteredData) {
        const merged = {};

        for (const item of filteredData) {
            const name = item.place;

            if(merged[name]) {
                merged[name].weatherForecast.push(...item.weatherForecast)
            } else {
                merged[name] = structuredClone(item)
            }
        }

        return Object.values(merged)
    }
    
    const mergedData = mergeFilteredData(filteredData)
    // console.log(mergedData)

    return mergedData
}