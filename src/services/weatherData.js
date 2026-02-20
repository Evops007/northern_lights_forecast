

export default async function weatherData() {

    const base_URl = "https://api.met.no/weatherapi/"
    const sunrise = "sunrise/3.0/sun?"
    const weather = "locationforecast/2.0/compact?"
    const date = `&date=${new Date().toISOString().split("T")[0]}`; //lag denne lik som date2/3 og en egen formattering for url
    const date2 = new Date(); //dagen etter i dag
        date2.setDate(date2.getDate()+1);

    const date3 = new Date(); //i overimorgen
        date3.setDate(date3.getDate()+2)

    const offset = "&offset=+01:00"
    const fullURL = []
    
    
    const locations = [ //legg inn alle lokasjoner som vises på kartet
        {place: "Tromsø", lat: "69.6489", lon: "18.95508"},
        {place: "Alta", lat: "69.96887", lon: "23.27165"},
        {place: "Narvik", lat: "68.43838", lon: "17.4272"}
    ]

    const rawData = [] //array for data etter siste for-loop
    const locationsData = [] //array med ferdig data klar til videre kalkulering
    
    for (let i = 0; i < locations.length; i++) { //Denne loopen setter sammen fullURL fra locations og andre parameter
        const findLat = locations[i].lat;
        const findLon = locations[i].lon;

        fullURL.push({
            name: `${locations[i].place}`, 
            fetchURL: `${base_URl}${sunrise}lat=${findLat}&lon=${findLon}${date}${offset}`
        })
    }

    
    for (let i = 0; i < fullURL.length; i++) { //Denne loopen fetcher soloppgang og solnedgang for dagens dato
        const response = await fetch(fullURL[i].fetchURL, { 
            next: { revalidate: 3600 } 
        });
        if (!response.ok) {
            throw new Error("Kunne ikke hente data");
        } 
        
        rawData.push(await response.json())
        locationsData.push({
            name: `${locations[i].place}`, 
            sunrise: {
                date: `${rawData[i].properties.sunrise.time.split("T")[0]}`,
                time: `${rawData[i].properties.sunrise.time.split("T")[1].split("+")[0]}`,
                fulldate: `${rawData[i].properties.sunrise.time}`
            },
            sunset: {
                date: `${rawData[i].properties.sunset.time.split("T")[0]}`,
                time: `${rawData[i].properties.sunset.time.split("T")[1].split("+")[0]}`,
                fulldate: `${rawData[i].properties.sunset.time}`
            }
        })
        
    }
    

    return locationsData
}