import React from 'react';

export function Filters({ state, actions }) {
    const handleChange = e => {
        const { value, name } = e.target;
        actions.updateFilters({...state.filters, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        actions.loadPage('/api/ships', state.filters)
    }
    return (
        <form onSubmit={handleSubmit} className='mt-2'>
            <div class="row gy-3 align-items-center">
                <div class="col-3">
                    <label for="inputPassword6" class="col-form-label">Nombre</label>
                </div>
                <div class="col-9">
                    <input type='text' name='shipName' value={state.filters.shipName} onChange={handleChange} class="form-control"/>
                </div>
            </div>
            <div class="row gt-1 align-items-center mt-1">
                <div class="col-3">
                    <label for="inputPassword6" class="col-form-label">Destino</label>
                </div>
                <div class="col-9">
                    <select value={state.filters.destinationId} name='destinationId' onChange={handleChange} className='form-select'>
                        <option value='' >Todos</option>
                        {
                            state.destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary ms-1 mt-2'>Filtrar</button>
            </div>
        </form>
    );
}
