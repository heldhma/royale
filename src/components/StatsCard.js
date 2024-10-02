// src/components/StatsCard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatsCard({ playerTag }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.get(`https://proxy.royaleapi.dev/v1/players/${playerTag}/battlelog`, {
                    headers: {
                        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUwMTdmNzkwLTJiZGItNDAyYS1hOTliLWI5NmRhZGVmYmEyZSIsImlhdCI6MTcyNzY3MjQ2Niwic3ViIjoiZGV2ZWxvcGVyLzYyNjRiYzk2LWUyMDQtOWJkZC0xYjNmLTYzODEyNjFjNTVhOSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTEuMjQ0LjI0Ni41MyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.AkPLqu2vAMXSHQDSwmGSsY7h-wAsv-JSj18E9JIihp6HOBQZc7-NOyUoXBGPcns1GUkYIdijdhLmcLEp_x_vLg`
                    }
                });
                
                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerStats();
    }, [playerTag]); // Dependência para atualizar caso playerTag mude

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar dados</div>;
    }

    if (!data || !data[0]) {
        return <div>Dados não disponíveis</div>;
    }

    const battleData = data[0]; // Acessa o primeiro registro de batalha

    return (
        <div className="stats-card">
            <h2>Battle Time: {new Date(battleData.battleTime * 1000).toLocaleString()}</h2>
            <p>Winner: {battleData.isWinner ? 'Você' : battleData.opponent.name}</p>
            <p>Loser: {!battleData.isWinner ? 'Você' : battleData.opponent.name}</p>
            <p>Deck: {battleData.deck.join(', ')}</p>
        </div>
    );
}

export default StatsCard;
