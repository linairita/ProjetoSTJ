import express from 'express';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.use(express.static(join(__dirname, 'src', 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'src','pages','index.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(join(__dirname, 'src','pages','sobre.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(join(__dirname, 'src' ,'pages','contato.html'));
});

app.get('/produtos', (req, res) => {
    res.sendFile(join(__dirname, 'src','pages','produtos.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});