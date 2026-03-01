"use client"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import ForecastCard from "./ForecastCard";
import { useState } from "react";

// Marker config: [id, coordinates, label, isLarge]
const MARKERS = [
  { id: "Tromsø", coords: [18.95508, 69.6489], isLarge: true },
  { id: "Alta", coords: [23.27165, 69.96887], isLarge: false },
  { id: "Narvik", coords: [17.4272, 68.43838], isLarge: false },
  { id: "Senja", coords: [17.499998, 69.333332], isLarge: false },
  { id: "Lyngen", coords: [20.21702, 69.57621], isLarge: false },
  { id: "Nordkapp", coords: [25.786972, 71.164932], isLarge: false },
  { id: "Lofoten", coords: [14.56834, 68.23417], isLarge: false },
  { id: "Bodø", coords: [14.404916, 67.280357], isLarge: false },
  { id: "Kirkenes", coords: [30.04578, 69.72706], isLarge: false },
];

function MapMarker({ id, isLarge, activeId, onClick }) {
  const isActive = activeId === id;

  // Responsive size classes via CSS custom properties
  // Large marker (Tromsø): bigger pin
  // Small markers: smaller pin
  const pinSize = isLarge ? 30 : 20;
  const pinOffset = isLarge ? { y: -25, x: -12 } : { y: -16, x: -8 };
  const labelY = isLarge ? -27 : -18;
  const labelSize = isLarge ? "0.8rem" : "0.5rem";
  const circleR = isLarge ? 5 : 3;

  return (
    <g
      className="group"
      id={id}
      onClick={(e) => onClick(e.currentTarget.id)}
      style={{ cursor: "pointer" }}
    >
      <text
        textAnchor="middle"
        y={labelY}
        x={isLarge ? -3 : 0}
        fontSize={labelSize}
        className={`font-medium transition-colors duration-600 ${isActive ? "fill-accent" : "fill-white group-hover:fill-accent"
          }`}
      >
        {id}
      </text>

      <circle
        r={circleR}
        filter="url(#shadow)"
        className={`font-bold transition-colors duration-250 ${isActive ? "fill-accent/60" : "fill-neutral/0 group-hover:fill-accent/60"
          }`}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        y={pinOffset.y}
        x={pinOffset.x}
        height={pinSize}
        width={pinSize}
        viewBox="0 0 40 40"
        filter="url(#shadow)"
        className={`transition-colors duration-600 ${isActive ? "fill-primary" : "fill-[#747272] group-hover:fill-primary"
          }`}
      >
        <defs>
          <filter id="shadow" height="200%" width="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5" />
          </filter>
        </defs>
        <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none" />
      </svg>
    </g>
  );
}

export default function SimpleMap({ completeForecast }) {
  const [completeForecastIndex, setcompleteForecastIndex] = useState(0);
  const [activeMarkerId, setActiveMarkerId] = useState(MARKERS[0].id);

  const handleClick = (id) => {
    const indexOf = completeForecast.findIndex((element) => element.place === id);
    setcompleteForecastIndex(indexOf);
    setActiveMarkerId(id);
  };

  return (
    /*
     * Responsive layout wrapper:
     * - Mobile (default): flex-col  → map on top, card below
     * - Desktop (lg+):    flex-row  → card on left, map on right, aligned by top
     */
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6 w-full">

      {/* ── ForecastCard – left on desktop, bottom on mobile ───────────── */}
      <div className="order-2 lg:order-1 lg:w-85 lg:shrink-0 flex justify-center lg:justify-start lg:pt-4">
        <ForecastCard
          completeForecast={completeForecast}
          completeForecastIndex={completeForecastIndex}
        />
      </div>

      {/* ── Map – right on desktop, top (cropped at bottom) on mobile ───── */}
      {/*
        Mobile strategy:
        - Outer div: fixed height (~75vw) + overflow-hidden → clips the bottom
        - Inner div: scaled to 160% width, centred with -30% left margin
          → the SVG renders large and only the top (northern Norway) is visible
        - lg+: both divs reset to natural/full width
      */}
      <div
        className="order-1 lg:order-2 lg:flex-1 w-full overflow-hidden lg:overflow-visible"
        style={{ height: "clamp(240px, 69vw, 9999px)" }}
      >
        {/* Scale-up wrapper – mobile only */}
        <div className="w-[220%] -ml-[90%] lg:w-full lg:ml-0">
          <ComposableMap
            projection="geoMercator"
            style={{ width: "100%", height: "auto", background: "none" }}
            projectionConfig={{
              center: [12, 67],
              scale: 1200,
            }}
            viewBox="0 0 950 800"
          >
            <Geographies geography="/maps/Norge-S-simple.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#555"
                    stroke="#555"
                    strokeWidth={1.5}
                  />
                ))
              }
            </Geographies>

            {MARKERS.map(({ id, coords, isLarge }) => (
              <Marker key={id} coordinates={coords}>
                <MapMarker
                  id={id}
                  isLarge={isLarge}
                  activeId={activeMarkerId}
                  onClick={handleClick}
                />
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
