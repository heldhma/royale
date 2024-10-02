// src/components/Cards.js
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Cards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Carregar o arquivo cardsInfo.csv
        Papa.parse('/data/cardsInfo.csv', {
            download: true,
            header: true,
            complete: (results) => {
                setCards(results.data);
            },
            error: (error) => {
                console.error('Erro ao carregar o CSV:', error);
            }
        });
    }, []);

    return (
        <div>
            <h2>Cartas do Clash Royale</h2>
            <ul>
                {cards.map((card, index) => (
                    <li key={index}>{card.name} - {card.type}</li>
                ))}
            </ul>
        </div>
    );
};

export default Cards;
