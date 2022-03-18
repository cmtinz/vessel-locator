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
            <h2>
                Editando {selectedShip.name || '(Sin nombre)'}
            </h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input name='name' id='name' value={selectedShip.name} onChange={handleChange} className='form-control'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="latitude" className="form-label">Latitud</label>
                    <input type='number' name='latitude' id='latitude' value={selectedShip.latitude} onChange={handleChange} className='form-control'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="longitude" className="form-label">Longitud</label>
                    <input type='number' name='longitude' id='longitude' value={selectedShip.longitude} onChange={handleChange} className='form-control'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="direction" className="form-label">Dirección</label>
                    <input type='number' name='direction' id='direction' value={selectedShip.direction} onChange={handleChange} className='form-control'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="direction" className="form-label">Destino</label>
                    <select value={selectedShip.destination_id} name='destination_id' onChange={handleChange} className='form-select'>
                        {
                            state.destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                        }
                    </select>
                </div>
                <div className='d-flex gy-2'>
                    {
                        Number.isInteger(selectedShip.id) ?
                        <>
                            <button type='button' className='btn btn-outline-primary' onClick={() => actions.selectShip(null)}>Atrás</button>
                            <button type='button' className='btn btn-outline-danger ms-2' onClick={() => actions.deleteShip(selectedShip.id)}>Eliminar</button>
                        </> :
                        <>
                            <button type='button' className='btn btn-outline-primary' onClick={() => actions.deleteDraftShip(selectedShip.id)}>Cancelar</button>
                        </>
                    }
                    <button className='btn btn-primary ms-auto'>
                        {Number.isInteger(selectedShip.id)? 'Guardar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
}
