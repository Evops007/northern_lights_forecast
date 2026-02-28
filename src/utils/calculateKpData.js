import weatherData from "@/services/weatherData";
import getNoaaForecast from "../services/kpData";
import getNightCloudCover from "@/services/getNightCloudCover";

export default async function calculateKpData() {
    const kpData = await getNoaaForecast(); //kp for i dag, i morgen og overimorgen
    const sunData = await weatherData(); //data for dagslys
    const weatherForecast = await getNightCloudCover(); //værmelding for 3 dager

    const kpArray = [];
    const darkHours = [];
    

    const locations = [ //legg inn alle lokasjoner som vises på kartet
        {place: "Tromsø", lat: "69.6489", lon: "18.95508"},
        {place: "Alta", lat: "69.96887", lon: "23.27165"},
        {place: "Narvik", lat: "68.43838", lon: "17.4272"},
        {place: "Lyngen", lat: "69.57621", lon: "20.21702"},
        {place: "Nordkapp", lat: "71.164932", lon: "25.786972"},
        {place: "Lofoten", lat: "68.23417", lon: "14.56834"},
        {place: "Bodø", lat: "67.280357", lon: "14.404916"},
        {place: "Kirkenes", lat: "69.72706", lon: "30.04578"},
        {place: "Senja", lat: "69.333332", lon: "17.499998"}
    ]

    for (let i = 0; i < kpData.length; i++) {  //gjør om unyttig dato og tid fra kpData til nyttig dato samt kalkulerer auroraLimit
        for (let j = 0; j < kpData[i].intervals.length; j++) {
            const kpYear = new Date().getFullYear()
            const kpDate = new Date(kpData[i].date).getDate()
            const kpMonth = new Date(kpData[i].date).getMonth()
            const kpTime = Number(kpData[i].intervals[j].time.split("-")[0]) 
            const date = new Date(kpYear, kpMonth, kpDate, kpTime)
            const aurotaLimit = 75 - (kpData[i].intervals[j].kp * 3)

            kpArray.push({date: date, kp: kpData[i].intervals[j].kp, auroraLimit: aurotaLimit})
        }
    }

    for (let i = 0; i < weatherForecast.length; i++) {
        for (let j = 0; j < weatherForecast[i].weatherForecast.length; j++) {
            const checkDate = new Date(weatherForecast[i].weatherForecast[j].time)
            let foundDate = kpArray.find(value => value.date > checkDate)
            // if we couldn't find a matching kp entry, log and fall back to last available
            if (!foundDate) {
                // console.warn("No kp entry found after", checkDate, "for place", weatherForecast[i].place, "; using last available data instead.")
                if (kpArray.length > 0) {
                    foundDate = kpArray[kpArray.length - 1];
                }
            }

            if (!foundDate) {
                // still nothing to work with (kpArray may be empty); skip
                continue;
            }

            darkHours.push({
                place: weatherForecast[i].place,
                date: weatherForecast[i].weatherForecast[j].time,
                forecast: {
                    auroraForecast: {
                        kp: {
                            date: foundDate.date,
                            kpValue: foundDate.kp,
                            auroraLimit: foundDate.auroraLimit
                        }
                    },
                    weatherForecast: weatherForecast[i].weatherForecast[j].data.instant.details,
                    auroraScore: 5
                }
            })
            
        }
        
    }

    function mergeByPlaceAndDate(darkHours) {
        const merged = {};

        for (const item of darkHours) {
            const place = item.place;
            const date = item.date;
            const kpDate = item.forecast.auroraForecast.kp.date;

            // Opprett place-nivå hvis det ikke finnes
            if (!merged[place]) {
            merged[place] = { place, dates: {} };
            }

            // Opprett dato-nivå hvis det ikke finnes
            if (!merged[place].dates[date]) {
            merged[place].dates[date] = { date, forecasts: {} };
            }

            // Bruk kp.date som unik nøkkel for å unngå duplikater
            const timeKey = kpDate.toISOString();
            if (!merged[place].dates[date].forecasts[timeKey]) {
            merged[place].dates[date].forecasts[timeKey] = {
                time: kpDate,
                auroraForecast: item.forecast.auroraForecast,
                weatherForecast: item.forecast.weatherForecast,
                auroraScore: item.forecast.auroraScore
            };
            }
        }

        // Konverter objekter til arrays
        return Object.values(merged).map(placeObj => ({
            place: placeObj.place,
            dates: Object.values(placeObj.dates).map(dateObj => ({
            date: dateObj.date,
            forecasts: Object.values(dateObj.forecasts),
            })),
        }));
    }

    const mergedData = mergeByPlaceAndDate(darkHours);
    // console.log(mergedData[0])
    // console.log(darkHours)
    // console.log(mergedData)

    function calculateAuroraScore(mergedData) {
        const auroraForecastArray = structuredClone(mergedData);

        for (let i = 0; i < mergedData.length; i++) {
            for (let j = 0; j < mergedData[i].dates.length; j++) {
                for (let k = 0; k < locations.length; k++) {
                    if(locations[k].lat > mergedData[i].dates[j].forecasts[0].auroraForecast.kp.auroraLimit){
                        if(auroraForecastArray[i].dates[j].forecasts[0].weatherForecast.cloud_area_fraction < 25){
                            auroraForecastArray[i].dates[j].forecasts[0].auroraScore = 95
                        } else if(auroraForecastArray[i].dates[j].forecasts[0].weatherForecast.cloud_area_fraction < 40){
                            auroraForecastArray[i].dates[j].forecasts[0].auroraScore = 60
                        } else if(auroraForecastArray[i].dates[j].forecasts[0].weatherForecast.cloud_area_fraction < 60){
                            auroraForecastArray[i].dates[j].forecasts[0].auroraScore = 30
                        }
                    } 
                }
            }
        } 
        return auroraForecastArray  
    }
    const threeDayAuroraForecast = calculateAuroraScore(mergedData)
    // console.log(threeDayAuroraForecast[0].dates)
    

    return threeDayAuroraForecast
}