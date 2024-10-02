// server.js
const express = require('express');
const cors = require('cors'); // Importa o middleware CORS
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Usar CORS
app.use(cors({
    origin: 'http://localhost:3000' // Certifique-se de fechar a chave aqui
}));

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/clashroyale', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

// Definir modelo de batalha (ajuste conforme suas necessidades)
const battleSchema = new mongoose.Schema({
    battleId: String,
    winner: String,
    loser: String,
    duration: Number,
    trophies: {
        winner: Number,
        loser: Number,
    },
    towersDestroyed: {
        winner: Number,
        loser: Number,
    },
    deck: [String],
});

const Battle = mongoose.model('Battle', battleSchema);

// Rota para obter estatísticas
app.get('/api/stats', async (req, res) => {
    try {
        const battles = await Battle.find();
        res.json(battles);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
