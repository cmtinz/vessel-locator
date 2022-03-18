import React from 'react';

function Ship ({state, dispatch, ship, actions}) {
    const destination = state.destinations.find(d => d.id === ship.destination_id);
    return (
        <div className='list-group-item'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='mr-2'>
                    <h2 className='fs-4'>
                        {ship.name || '(Sin nombre)'}
                    </h2>
                    <div>
                        Destino: {destination? destination.name : '-'}
                    </div>
                </div>
                <button onClick={() => actions.selectShip(ship.id)} className='btn btn-outline-secondary btn-sm'>
                    Editar
                </button>
            </div>
        </div>
    )
}

export function Ships({ state, dispatch, actions }) {
    return (
        <div>
            <div className='list-group my-4'>
                {
                    state.ships.length ?
                    state.ships.map(s => <Ship key={s.id} state={state} dispatch={dispatch} ship={s} actions={actions}/>) :
                    <div className='text-center fs-5 text-secondary'>
                        Sin resultados.
                    </div>
                }
            </div>
            <div className='d-flex justify-content-between'>
                {
                    state.pagination &&
                    <ul className='pagination mb-0'>
                        <li className={`page-item ${state.pagination.prev ? '' : 'disabled'}`}>
                            <a onClick={e => {actions.loadPage(state.pagination.prev)}} disabled={!state.pagination.prev} className='page-link'>←</a>
                        </li>
                        <li className='page-item disabled'>
                            <span class="page-link">
                                Página {state.pagination.current} de {state.pagination.last}
                            </span>
                        </li>
                        <li className={`page-item ${state.pagination.next ? '' : 'disabled'}`}>
                            <a onClick={e => {actions.loadPage(state.pagination.next)}} disabled={!state.pagination.next} className='page-link'>→</a>
                        </li>
                    </ul>
                }
                <button onClick={() => actions.createNewShip()} className='btn btn-primary'>
                    Nuevo
                </button>
            </div>
        </div>
    );
}
