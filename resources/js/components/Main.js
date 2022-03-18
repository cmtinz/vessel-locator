import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Filters } from './Filters';
import { Map } from './Map';
import { ShipEdit } from './ShipEdit';
import { Ships } from './Ships';

function reducer(currentState, action) {
    console.debug('Reducer', action)

    switch (action.type) {
        case 'SET_SHIPS':
            return {
                ...currentState, 
                ships: action.payload.data,
                pagination: {
                    prev: action.payload.links.prev,
                    next: action.payload.links.next,
                    current: action.payload.meta.current_page,
                    last: action.payload.meta.last_page,
                }
            };
        case 'SELECT_SHIP':
            return {
                ...currentState,
                selectedShip: action.payload
            };
        case 'UPDATE_SHIP':
            return {
                ...currentState,
                ships: currentState.ships.map(s => s.id === action.payload.id ? action.payload : s)
            };
        case 'PUSH_DRAFT_SHIP':
            const newId = 'draft-' + Math.random().toString(36).slice(2);
            return {
                ...currentState,
                ships: [...currentState.ships, {
                    "id": newId,
                    "name": "",
                    "latitude": 0,
                    "longitude": 0,
                    "destination_id": currentState.destinations[0].id,
                    "direction": 0
                }],
                selectedShip: newId,
            };
        case 'UPDATE_DRAFT_SHIP':
            return {
                ...currentState,
                ships: currentState.ships.map(s => s.id === action.payload.oldId ? action.payload.newShip : s),
                selectedShip: action.payload.newShip.id,
            }
        case 'DELETE_SHIP':
            return {
                ...currentState,
                ships: currentState.ships.filter(s => s.id != action.payload),
                selectedShip: currentState.selectedShip === action.payload? null : selectShip
            };
        case 'SET_DESTINATIONS':
            return {
                ...currentState,
                destinations: action.payload
            };
        case 'UPDATE_FILTERS':
            return {
                ...currentState,
                filters: action.payload
            }
        default:
            return {...currentState};
    }
}

function Main() {
    const [state, dispatch] = useReducer(reducer, {
        ships: [],
        selectedShip: false,
        pagination: false,
        destinations: [],
        filters: {
            destinationId: '',
            shipName: ''
        }
    });
    
    const actions = {
        loadPage: (page, params) => {
            axios.get(page, {params})
                .then(r => {dispatch({type: 'SET_SHIPS', payload: r.data})})
                .catch(e => {console.error('loadPage', e)}) 
        },
        selectShip: shipId => dispatch({type: 'SELECT_SHIP', payload: shipId}),
        updateShip: data => {
            dispatch({type: 'UPDATE_SHIP', payload: data})
        },
        saveShip: data => {
            axios.put('/api/ships/' + data.id, data)
                .then(r => {dispatch({type: 'UPDATE_SHIP', payload: r.data.data})})
                .catch(e => {console.error('saveShip', e)})
        },
        deleteShip: shipId => {
            axios.delete('/api/ships/' + shipId)
                .then(r => {dispatch({type: 'DELETE_SHIP', payload: shipId})})
                .catch(e => {console.error('deleteShip', e)})
        },
        createNewShip: () => {
            dispatch({type: 'PUSH_DRAFT_SHIP'})
        },
        deleteDraftShip: shipId => {
            dispatch({type: 'DELETE_SHIP', payload: shipId})
        },
        saveDraftShip: data => {
            axios.post('/api/ships/', data)
                .then(r => {
                    dispatch({type: 'UPDATE_DRAFT_SHIP', payload: {newShip: r.data.data, oldId: data.id}})
                })
                .catch(e => {console.error('saveDraftShip', e)})
        },
        updateFilters: filters => {
            dispatch({type: 'UPDATE_FILTERS', payload: filters})
        }
    };

    useEffect(() => {actions.loadPage('/api/ships')}, []);
    useEffect(() => {
        axios.get('/api/destinations')
            .then(r => {dispatch({type: 'SET_DESTINATIONS', payload: r.data})})
            .catch(e => {console.error('loadPage', e)}) 
    }, []);
    

    console.debug('State', state)
    return (
        <React.StrictMode>
            <>
                <div className='row'>
                    <div className='col-12 col-lg-9' id='map'>
                        <Map dispatch={dispatch} state={state} actions={actions} />
                    </div>
                    <div className='col-12 col-lg-3 bg-light' id='sidebar'>
                        
                        {
                            state.selectedShip ?
                            <ShipEdit dispatch={dispatch} state={state} actions={actions}/> :
                            <>
                                <Filters state={state} actions={actions}/>
                                <Ships dispatch={dispatch} state={state} actions={actions}/>
                            </>
                        }
                    </div>
                </div>
            </>
        </React.StrictMode>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
