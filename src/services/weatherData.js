

export default async function weatherData() {

    const base_URl = "https://api.met.no/weatherapi/"
    const sunrise = "sunrise/3.0/sun?"
    const datestring = "&date="
    const date = new Date(); //dagens dato
    const date2 = new Date(); //dagen etter i dag
        date2.setDate(date2.getDate()+1);

    const date3 = new Date(); //i overimorgen
        date3.setDate(date3.getDate()+2)

    const offset = "&offset=+01:00"
    const fullURL = []
    
    
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

    const rawData = [] //array for data etter siste for-loop
    const locationsData = [] //array med ferdig data klar til videre kalkulering
    
    for (let i = 0; i < locations.length; i++) { //Denne loopen setter sammen fullURL fra locations og andre parameter
        const findLat = locations[i].lat;
        const findLon = locations[i].lon;

        fullURL.push(
            {
                name: `${locations[i].place}`, 
                fetchURL: `${base_URl}${sunrise}lat=${findLat}&lon=${findLon}${datestring}${date.toISOString().split("T")[0]}${offset}`   
            },
            {
                name: `${locations[i].place}`, 
                fetchURL: `${base_URl}${sunrise}lat=${findLat}&lon=${findLon}${datestring}${date2.toISOString().split("T")[0]}${offset}`   
            },
            {
                name: `${locations[i].place}`, 
                fetchURL: `${base_URl}${sunrise}lat=${findLat}&lon=${findLon}${datestring}${date3.toISOString().split("T")[0]}${offset}`   
            }    
        )
    }
    
    for (let i = 0; i < fullURL.length; i++) { //Denne loopen fetcher soloppgang og solnedgang for dagens dato og legger det i rawData og videre i locationsData
        const response = await fetch(fullURL[i].fetchURL, { 
            next: { revalidate: 3600 } 
        });
        if (!response.ok) {
            throw new Error("Kunne ikke hente data");
        } 
        
        rawData.push(await response.json())
        locationsData.push({
            place: {
                name: `${fullURL[i].name}`, 
                forecast: [{
                    date: `${rawData[i].properties.sunrise.time.split("T")[0]}`,
                    sunrise: {
                        time: `${rawData[i].properties.sunrise.time.split("T")[1].split("+")[0]}`,
                        fullTimeDate: `${rawData[i].properties.sunrise.time}`
                    },
                    sunset: {
                        time: `${rawData[i].properties.sunset.time.split("T")[1].split("+")[0]}`,
                        fullTimeDate: `${rawData[i].properties.sunset.time}`
                    }
                }]
            }
        })
    }

    function mergeLocationData(locationData) {  //funksjon  for å samle forecast under samme name
    const merged = {};

    for (const item of locationData) {
        const name = item.place.name;

        if (merged[name]) {
        merged[name].place.forecast.push(...item.place.forecast);
        } else {
        merged[name] = structuredClone(item);
        }
    }

    return Object.values(merged);
    }

    const mergedData = mergeLocationData(locationsData);

    return mergedData
}