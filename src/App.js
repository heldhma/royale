// src/App.js
import React from 'react';
import Cards from './components/Cards';
import Players from './components/Players';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Estatísticas do Clash Royale</h1>
            <Cards />
            <Players />
        </div>
    );
}

export default App;
