"use client"

export default function ForecastCard() {
    
    
    return (
        <div className="card card-border bg-base-100 w-110">
            <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

                <div className="flex flex-row justify-center gap-15 pt-5">
                    <div className="flex flex-col gap-1 justify-center">
                        <h6>date</h6>
                        <div
                            className="radial-progress bg-primary/60 text-primary-content border-primary/10 border-4"
                            style={{ "--value": 70 }} aria-valuenow={70} role="progressbar" >
                            Go
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 justify-center">
                        <h6>date</h6>
                        <div
                            className="radial-progress bg-primary/60 text-primary-content border-primary/10 border-4 "
                            style={{ "--value": 70 }} aria-valuenow={70} role="progressbar">
                            Go
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 justify-center">
                        <h6>date</h6>
                        <div
                            className="radial-progress bg-primary/60 text-primary-content border-primary/10 border-4 "
                            style={{ "--value": 70 }} aria-valuenow={70} role="progressbar">
                            Go
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}