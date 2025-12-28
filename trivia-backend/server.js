const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;
const LEADERBOARD_FILE = './leaderboard.json';

app.use(cors());
app.use(express.json());

let questions = [];

// Asegurar que exista el archivo de ranking
if (!fs.existsSync(LEADERBOARD_FILE)) fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify([]));

function loadQuestions() {
    return new Promise((resolve) => {
        const rows = [];
        if (!fs.existsSync('preguntas.csv')) {
            console.error('❌ No se encontró preguntas.csv');
            return resolve([]);
        }
        
        fs.createReadStream('preguntas.csv')
            .pipe(csv())
            .on('data', (data) => rows.push(data))
            .on('end', () => {
                // Filtramos para evitar filas vacías y errores de trim()
                questions = rows
                    .filter(q => q.pregunta && q.respuesta_correcta) // Solo filas que tengan datos
                    .map((q, index) => {
                        const options = [q.opcion1, q.opcion2, q.opcion3, q.opcion4].filter(Boolean);

                        return {
                            id: index,
                            question: q.pregunta,
                            options: options,
                            // Usamos una validación antes del trim()
                            answer: q.respuesta_correcta ? q.respuesta_correcta.trim() : "",
                            category: q.categoria || "General"
                        };
                    });
                
                console.log(`✅ ${questions.length} preguntas cargadas correctamente.`);
                resolve(questions);
            });
    });
}

app.get('/api/questions', (req, res) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 20);
    res.json(shuffled);
});

app.get('/api/leaderboard', (req, res) => {
    const data = JSON.parse(fs.readFileSync(LEADERBOARD_FILE));
    res.json(data);
});

app.post('/api/leaderboard', (req, res) => {
    const { name, score, mode } = req.body;
    try {
        let leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE));
        leaderboard.push({ name, score: parseInt(score), mode, date: new Date().toISOString() });
        leaderboard = leaderboard
            .filter(e => e.mode === "single")
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboard, null, 2));
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

loadQuestions().then(() => app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`)));