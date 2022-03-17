import React from 'react';

export function ShipEdit({ state, reducer, actions }) {
    const handleSubmit = e => {
        e.preventDefault();
        if (Number.isInteger(selectedShip.id)) {
            actions.saveShip(selectedShip);
        } else {
            actions.saveDraftShip(selectedShip)
        }
    }
    const handleChange = e => {
        const { value, name } = e.target;
        actions.updateShip({...selectedShip, [name]: value});
    }
    const selectedShip = state.ships.find(s => s.id === state.selectedShip);
    return (
        <div>
            <h2>{selectedShip.name || '(Sin nombre)'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre <input name='name' value={selectedShip.name} onChange={handleChange}/></label>
                <label>Latitud <input name='latitude' value={selectedShip.latitude} type='number' onChange={handleChange}/></label>
                <label>Longitud <input name='longitude' value={selectedShip.longitude} type='number' onChange={handleChange}/></label>
                <label>Dirección <input name='direction' value={selectedShip.direction} type='number' onChange={handleChange}/></label>
                <label>
                    Destino
                    <select value={selectedShip.destination_id} name='destination_id' onChange={handleChange}>
                        {
                            state.destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                        }
                    </select>
                </label>
                <button>
                    {Number.isInteger(selectedShip.id)? 'Guardar' : 'Crear'}
                </button>
            </form>
            {
                Number.isInteger(selectedShip.id) ?
                <>
                    <button onClick={() => actions.selectShip(null)}>Atrás</button>
                    <button onClick={() => actions.deleteShip(selectedShip.id)}>Eliminar</button>
                </> :
                <>
                    <button onClick={() => actions.deleteDraftShip(selectedShip.id)}>Cancelar</button>
                </>
            }
        </div>
    );
}
