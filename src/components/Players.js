// src/components/Players.js
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Carregar o arquivo players.csv
        Papa.parse('/data/players.csv', {
            download: true,
            header: true,
            complete: (results) => {
                setPlayers(results.data);
            },
            error: (error) => {
                console.error('Erro ao carregar o CSV:', error);
            }
        });
    }, []);

    return (
        <div>
            <h2>Jogadores do Clash Royale</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name} - {player.trophies} troféus</li>
                ))}
            </ul>
        </div>
    );
};

export default Players;
