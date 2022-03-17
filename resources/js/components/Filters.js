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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Nombre <input name='shipName' value={state.filters.shipName} onChange={handleChange}/></label>
                <label>
                    Destino
                    <select value={state.filters.destinationId} name='destinationId' onChange={handleChange}>
                        <option value='' >Todos</option>
                        {
                            state.destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                        }
                    </select>
                </label>
                <button>Filtrar</button>
            </form>
        </div>
    );
}
