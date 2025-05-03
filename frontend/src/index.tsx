import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./store/store";
import './index.css';

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Context.Provider value={{
        store
    }}>
        <App />
    </Context.Provider>
);