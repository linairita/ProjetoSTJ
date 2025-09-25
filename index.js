const express = require('express');
const app = express();

app.use(express.static('public')); 

app.get('/', (req, res) => {
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});





import express from "express";

import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/src/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/pages/index.html");
});

app.get("sobre", (req, res) => {
    res.sendFile(__dirname + "/src/pages/sobre.html");
});

app.get("contato", (req, res) => {
    res.sendFile(__dirname + "/src/pages/contato.html");
});

app.get("produtos", (req, res) => {
    res.sendFile(__dirname + "/src/pages/produtos.html");
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
