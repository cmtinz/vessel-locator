import React from 'react';

function Ship ({state, dispatch, ship, actions}) {
    return (
        <div>
            <h2>{ship.name || '(Sin nombre)'} <button onClick={() => actions.selectShip(ship.id)}>Ver</button></h2>
            <div>
                <span className='pr-2'>Destino: {ship.destination_id}</span>
                <span>Posición: {ship.latitude}, {ship.longitude}</span>
            </div>
        </div>
    )
}

export function Ships({ state, dispatch, actions }) {
    return (
        <div>
            <div>
                {
                    state.ships.length ?
                    state.ships.map(s => <Ship key={s.id} state={state} dispatch={dispatch} ship={s} actions={actions}/>) :
                    <div>No hay que mostrar.</div>
                }
            </div>
            {
                state.pagination &&
                <div>
                    <button onClick={e => {actions.loadPage(state.pagination.prev)}} disabled={!state.pagination.prev}>←</button>
                    Página {state.pagination.current} de {state.pagination.last}
                    <button onClick={e => {actions.loadPage(state.pagination.next)}} disabled={!state.pagination.next}>→</button>
                </div>
            }
            <button onClick={() => actions.createNewShip()}>Nuevo</button>
        </div>
    );
}
