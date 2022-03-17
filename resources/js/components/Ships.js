import React from 'react';

function Ship ({state, reducer, ship}) {
    return (
        <div className=''>
            <h2>{ship.name || '(Sin nombre)'}</h2>
            <div>
                <span className='pr-2'>Destino: {ship.destination.name}</span>
                <span>Posición: {ship.latitude}, {ship.longitude}</span>
            </div>
        </div>
    )
}

export function Ships({ state, reducer }) {
    return (
        <div>
            {state.ships.length ?
                state.ships.map(s => <Ship key={s.id} state={state} reducer={reducer} ship={s}/>) :
                <div>No hay que mostrar.</div>}
        </div>
    );
}
