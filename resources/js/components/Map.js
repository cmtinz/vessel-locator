import React from 'react';
import { 
    ComposableMap, 
    ZoomableGroup, 
    Geographies, 
    Geography,
    Marker
} from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


export function Map({ dispatch, state, actions }) {
    const selectedShip = state.ships.find(s => s.id === state.selectedShip);
    return (
        <div id='map'>
            <ComposableMap>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {
                            ({ geographies }) => geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                        }
                    </Geographies>
                    {
                        state.destinations
                            .filter(d => state.selectedShip? d.id === selectedShip.destination_id : true)
                            .map(d => 
                                <Marker coordinates={[d.longitude, d.latitude]} key={d.id}>
                                    <circle r={2} fill="#F53" />
                                </Marker>
                        )
                    }
                    {
                        state.ships
                            .filter(s => state.selectedShip? s.id === selectedShip.id : true)
                            .map(d => 
                                <Marker coordinates={[d.longitude, d.latitude]} key={d.id}>
                                    <rect width="5" height="10" stroke="black" fill="#33BCFF" strokeWidth="0" transform={`rotate(${d.direction} 2.5 5)`}/>
                                </Marker>
                        )
                    }
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}
