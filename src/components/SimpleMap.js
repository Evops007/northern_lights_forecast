"use client"


import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

export default function SimpleMap() {
  return (
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
      <Marker 
        coordinates={[18.95508, 69.6489]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-27" x="-3" fontSize="0.8rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Tromsø
        </text>
      
        <circle r={5} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-25" x="-12" 
          height="30"
          width="30"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[23.27165, 69.96887]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Alta
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[17.4272, 68.43838]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Narvik
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[17.499998, 69.333332]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Senja
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[20.21702, 69.57621]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Lyngen
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[25.786972, 71.164932]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Nordkapp
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[14.56834, 68.23417]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Lofoten
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[14.404916, 67.280357]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Bodø
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>

      <Marker 
        coordinates={[30.04578, 69.72706]} /*{[lon, lat]} !important! */
      > 
      <g className="group">
        <text textAnchor="middle" y="-18" x="" fontSize="0.5rem"  className="font-medium fill-neutral/80 group-hover:fill-accent transition-colors duration-600" > 
          Kirkenes
        </text>
      
        <circle r={3} filter="url(#shadow)" className="font-bold fill-neutral/0 group-hover:fill-accent/60 transition-colors duration-250"/>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          y="-16" x="-8" 
          height="20"
          width="20"
          viewBox="0 0 40 40"
          filter="url(#shadow)"
          className="fill-[#747272] group-hover:fill-primary transition-colors duration-600"
        >
          <defs>
            <filter id="shadow" heigth="200%" width="200%" >
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          <path d="M23.3475 7.7825C27.643 12.0779 27.643 19.0521 23.3475 23.3475L15.565 31.13L7.7825 23.3475C3.48705 19.0521 3.48705 12.0779 7.7825 7.7825C12.0779 3.48705 19.0521 3.48705 23.3475 7.7825Z" stroke="none"></path>
        </svg>
      </g>
      </Marker>
    </ComposableMap>
  );
}
