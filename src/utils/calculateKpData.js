import weatherData from "@/services/weatherData";
import getNoaaForecast from "../services/kpData";
import getNightCloudCover from "@/services/getNightCloudCover";

export default async function calculateKpData() {
    const kpData = await getNoaaForecast(); //kp for i dag, i morgen og overimorgen
    const sunData = await weatherData(); //data for dagslys
    const weatherForecast = await getNightCloudCover(); //værmelding for 3 dager

    const kpArray = [];
    const darkHours = [];
    const auroraForecast = [];

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
            const foundDate = kpArray.find(value => value.date > checkDate)
            // console.log(foundDate, weatherForecast[i].place)
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
                    weatherForecast: weatherForecast[i].weatherForecast[j].data.instant.details
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
    // console.log(mergedData)
    // console.log(darkHours)
    console.log(mergedData[0])

    return mergedData
}