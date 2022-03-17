import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
        default:
            return {...currentState};
    }
}

function Main() {
    const [state, dispatch] = useReducer(reducer, {
        ships: [],
        selectedShip: false,
        pagination: false,
        destinations: []
    });
    const loadPage = (page) => {
        axios.get(page)
            .then(r => {dispatch({type: 'SET_SHIPS', payload: r.data})})
            .catch(e => {console.error('loadPage', e)}) 
    }
    const selectShip = shipId => dispatch({type: 'SELECT_SHIP', payload: shipId});
    const updateShip = data => {
        dispatch({type: 'UPDATE_SHIP', payload: data})
    }
    const saveShip = data => {
        axios.put('/api/ships/' + data.id, data)
            .then(r => {dispatch({type: 'UPDATE_SHIP', payload: r.data.data})})
            .catch(e => {console.error('saveShip', e)})
    }
    const deleteShip = shipId => {
        axios.delete('/api/ships/' + shipId)
            .then(r => {dispatch({type: 'DELETE_SHIP', payload: shipId})})
            .catch(e => {console.error('deleteShip', e)})
    }
    const createNewShip = () => {
        dispatch({type: 'PUSH_DRAFT_SHIP'})
    }
    const deleteDraftShip = shipId => {
        dispatch({type: 'DELETE_SHIP', payload: shipId})
    }
    const saveDraftShip =  data => {
        axios.post('/api/ships/', data)
            .then(r => {
                dispatch({type: 'UPDATE_DRAFT_SHIP', payload: {newShip: r.data.data, oldId: data.id}})
            })
            .catch(e => {console.error('saveDraftShip', e)})
    }
    useEffect(() => {loadPage('/api/ships')}, []);
    useEffect(() => {
        axios.get('/api/destinations')
            .then(r => {dispatch({type: 'SET_DESTINATIONS', payload: r.data})})
            .catch(e => {console.error('loadPage', e)}) 
    }, []);
    const actions = {loadPage, selectShip, updateShip, saveShip, deleteShip, createNewShip, deleteDraftShip, saveDraftShip};

    console.debug('State', state)
    return (
        <React.StrictMode>
            <div className="container-fluid">
                <Map dispatch={dispatch} state={state} actions={actions} />
                <div id='controls'>
                    {
                        state.selectedShip ?
                        <ShipEdit dispatch={dispatch} state={state} actions={actions}/> :
                        <Ships dispatch={dispatch} state={state} actions={actions}/>
                    }
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
