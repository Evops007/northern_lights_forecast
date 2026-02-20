import getNoaaForecast from "@/services/kpData"



export default async function TestKpData() {
    const data = await getNoaaForecast()
    return (
        <div> 
            <p>
                DETTE ER EN test
            </p>
            <pre className="bg-base-300 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(data, null, 20)}
            </pre>
        </div>
    )
}