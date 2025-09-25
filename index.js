import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define o caminho para o diretório atual usando `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Configura o Express para servir arquivos estáticos (CSS, JS, imagens)
// a partir da pasta 'src/public'. O caminho `__dirname` garante que a
// pasta seja encontrada, independentemente de onde o arquivo `server.js` esteja.
app.use(express.static(__dirname + "/src/public"));

// Define a rota raiz ('/') para servir a página inicial
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/pages/index.html");
});

// Define as rotas para as outras páginas, com o prefixo '/' corrigido
app.get("/sobre", (req, res) => {
  res.sendFile(__dirname + "/src/pages/sobre.html");
});

app.get("/contato", (req, res) => {
  res.sendFile(__dirname + "/src/pages/contato.html");
});

app.get("/produtos", (req, res) => {
  res.sendFile(__dirname + "/src/pages/produtos.html");
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
