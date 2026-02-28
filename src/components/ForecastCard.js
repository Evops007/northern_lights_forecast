"use client"
import { useState } from "react"
export default function ForecastCard({completeForecast, completeForecastIndex}) {

    const foundObjToday = []
    const highestAuroraScore = (completeForecast) => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        
        const nearestAndHighestKp = completeForecast[completeForecastIndex].dates.filter(obj => startDate < new Date (obj.date) && endDate > new Date (obj.date))
        
        foundObjToday.push(...nearestAndHighestKp)
    }
    highestAuroraScore(completeForecast)

    const objIndex = Math.max(...foundObjToday.map(obj => obj.forecasts[0].auroraScore))
    const indexOfFoundObj = foundObjToday.findIndex(obj => obj.forecasts[0].auroraScore === objIndex)
    
    const value = foundObjToday[indexOfFoundObj].forecasts[0].auroraScore;
    const great = value === 95;
    const good = value === 60;
    const canTry = value === 30;
    const wait = value === 5;
    const date = new Date(foundObjToday[indexOfFoundObj].date)
    const dayName = (date, locale) => {
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }


    const foundObjTomorrow = []
    const highestAuroraScoreTomorrow = (completeForecast) => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate()+1);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        
        const nearestAndHighestKp = completeForecast[completeForecastIndex].dates.filter(obj => startDate < new Date (obj.date) && endDate > new Date (obj.date))
        foundObjTomorrow.push(...nearestAndHighestKp)
    }
    highestAuroraScoreTomorrow(completeForecast)

    const objIndex1 = Math.max(...foundObjTomorrow.map(obj => obj.forecasts[0].auroraScore))
    const indexOfFoundObj1 = foundObjTomorrow.findIndex(obj => obj.forecasts[0].auroraScore === objIndex1)
    
    const value1 = foundObjTomorrow[indexOfFoundObj1].forecasts[0].auroraScore;
    const great1 = value1 === 95;
    const good1 = value1 === 60;
    const canTry1 = value1 === 30;
    const wait1 = value1 === 5;
    const date1 = new Date(foundObjTomorrow[indexOfFoundObj].date)


    const foundObjInTwoDays = []
    const highestAuroraScoreInTwoDays = (completeForecast) => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate()+2);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        
        const nearestAndHighestKp = completeForecast[completeForecastIndex].dates.filter(obj => startDate < new Date (obj.date) && endDate > new Date (obj.date))
        foundObjInTwoDays.push(...nearestAndHighestKp)
    }
    highestAuroraScoreInTwoDays(completeForecast)

    const objIndex2 = Math.max(...foundObjTomorrow.map(obj => obj.forecasts[0].auroraScore))
    const indexOfFoundObj2 = foundObjTomorrow.findIndex(obj => obj.forecasts[0].auroraScore === objIndex2)
    
    const value2 = foundObjTomorrow[indexOfFoundObj2].forecasts[0].auroraScore;
    const great2 = value2 === 95;
    const good2 = value2 === 60;
    const canTry2 = value2 === 30;
    const wait2 = value2 === 5;
    const date2 = new Date(foundObjInTwoDays[indexOfFoundObj].date)



    return (
        <div className="card card-border bg-base-100 w-110">
            
            <div className="card-body">
                <h2 className="card-title">{completeForecast[completeForecastIndex].place}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

                <div className="flex flex-row justify-center gap-15 pt-5">
                    <div className="flex flex-col gap-1 justify-center">
                        <h6>{dayName(date, "en-EN")}</h6>
                        <div
                            className="radial-progress bg-primary/60 text-primary-content border-primary/10 border-4 "
                            style={{ "--value": 200}} aria-valuenow={200} role="progressbar">
                                <div
                                    className="radial-progress font-medium bg-primary/60 text-primary-content border-primary/10 border-4 "
                                    style={{ "--value": value}} aria-valuenow={value} role="progressbar">
                                        {great ? "Great" : good ? "Good" : canTry ? "Try" : wait ? "Wait" : "Wait" }
                                </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 justify-center">
                        <h6> {dayName(date1, "en-EN")} </h6>
                        <div
                            className="radial-progress bg-primary/60 text-primary-content border-primary/10 border-4 "
                            style={{ "--value": 200}} aria-valuenow={200} role="progressbar">
                                <div
                                    className="radial-progress font-medium bg-primary/60 text-primary-content border-primary/10 border-4 "
                                    style={{ "--value": value1}} aria-valuenow={value1} role="progressbar">
                                        {great1 ? "Great" : good1 ? "Good" : canTry1 ? "Try" : wait1 ? "Wait" : "Wait" }
                                </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 justify-center">
                        <h6> {dayName(date2, "en-EN")} </h6>
                        <div
                            className="radial-progress bg-primary/60 text-primary-content border-primary/10 border-4 "
                            style={{ "--value": 200}} aria-valuenow={200} role="progressbar">
                                <div
                                    className="radial-progress font-medium bg-primary/60 text-primary-content border-primary/10 border-4 "
                                    style={{ "--value": value2}} aria-valuenow={value2} role="progressbar">
                                        {great2 ? "Great" : good2 ? "Good" : canTry2 ? "Try" : wait2 ? "Wait" : "Wait" }
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}