
const kp_URL = 'https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt'

export default async function getNoaaForecast() {
    const response = await fetch(kp_URL, { 
        next: { revalidate: 3600 } 
    });
    if (!response.ok) {
        throw new Error("Kunne ikke hente data");
    }

    const text = await response.text()
    const lines = text.split(/\r?\n/);
    const startIndex = lines.findIndex(line => line.includes("NOAA Kp index forecast"));
    const dateLine = lines[startIndex + 1].trim();
    const dates = dateLine.split(/\s+/)

    const result = [
        { date: "Feb 17", intervals: [] },
        { date: "Feb 18", intervals: [] },
        { date: "Feb 19", intervals: [] }
    ];

    for (let i = 0; i < 8; i++) {
        const line = lines[startIndex + 2 + i].trim();
        const parts = line.split(/\s+/)
        const time = parts[0];

        const kp1 = parseFloat(parts[1]);
        const kp2 = parseFloat(parts[2]);
        const kp3 = parseFloat(parts[3]);
        
        result[0].intervals.push({ time, kp: kp1 });
        result[1].intervals.push({ time, kp: kp2 });
        result[2].intervals.push({ time, kp: kp3 });
    }
    
    return result
}