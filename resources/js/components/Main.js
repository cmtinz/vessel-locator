import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Ships } from './Ships';

function reducer(currentState, action) {
    console.debug('Reducer', action)

    switch (action.type) {
        case 'SET_SHIPS':
            return {
                ...currentState, 
                ships: action.payload.data,
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
    });
    useEffect(() => {
        axios.get('/api/ships')
            /* .then(r => dispatch({type: 'SET_USER', payload: r.data.data})) */
            .then(r => {dispatch({type: 'SET_SHIPS', payload: r.data})})
            .catch(e => {console.error('User', e)}) 
    }, []);
    return (
        <div className="container-fluid">
            <Ships dispatch={dispatch} state={state}/>
        </div>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
