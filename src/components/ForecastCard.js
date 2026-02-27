"use client"
import { use, useState } from "react"
export default function ForecastCard({completeForecast, completeForecastIndex}) {

    // const highestAuroraScore = (array) => {  //Lag en funksjon som filtrerer og finner gitt dato med høyest auroraScore, returner det og vis i komponent
    //     const date = new Date()
    //     console.log(highestScore)
    // }
    // highestAuroraScore()

    const value = completeForecast[completeForecastIndex].dates[0].forecasts[0].auroraScore;
    const great = completeForecast[completeForecastIndex].dates[0].forecasts[0].auroraScore === 95;
    const good = completeForecast[completeForecastIndex].dates[0].forecasts[0].auroraScore === 60;
    const canTry = completeForecast[completeForecastIndex].dates[0].forecasts[0].auroraScore === 30;
    const wait = completeForecast[completeForecastIndex].dates[0].forecasts[0].auroraScore === 5;

    return (
        <div className="card card-border bg-base-100 w-110">
            
            <div className="card-body">
                <h2 className="card-title">{completeForecast[completeForecastIndex].place}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

                <div className="flex flex-row justify-center gap-15 pt-5">
                    <div className="flex flex-col gap-1 justify-center">
                        <h6>date</h6>
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
                        <h6>date</h6>
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
                        <h6>date</h6>
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
                </div>
            </div>

            
        </div>
    )
}