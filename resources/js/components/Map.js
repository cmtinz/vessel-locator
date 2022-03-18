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
        <div>
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
                            .map(s => 
                                <Marker coordinates={[s.longitude, s.latitude]} key={s.id}>
                                    <path 
                                        d="M 0 4.073 C 0.626 1.353 1.562 -0.007 2.5 0 C 3.437 0.006 4.374 1.381 5 4.127 L 5 12.773 L 4.719 14.981 L 2.5 15 L 0.336 14.981 L 0 12.769 L 0 4.073 Z"
                                        transform={`rotate(${s.direction} 2.5 7.5)`}
                                        className='ship-icon'
                                        onClick={() => actions.selectShip(s.id)}
                                    />
                                </Marker>
                        )
                    }
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}
