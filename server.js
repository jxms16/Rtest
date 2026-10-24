const express = require('express');
const os = require('os');

const app = express();
const PUERTO = process.env.PORT || 3000;
const iniciado = new Date().toISOString();
const mensajes = [];

app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => res.json({ estado: 'ok' }));

app.get('/info', (req, res) => res.json({
  servidor: os.hostname(),
  node: process.version,
  iniciado,
  entorno: process.env.NODE_ENV || 'desarrollo'
}));

app.get('/api/mensajes', (req, res) => res.json(mensajes));

app.post('/api/mensajes', (req, res) => {
  const { nombre, texto } = req.body;
  if (!nombre || !texto) return res.status(400).json({ error: 'Faltan datos' });
  mensajes.push({ nombre: String(nombre).slice(0, 30), texto: String(texto).slice(0, 140) });
  if (mensajes.length > 50) mensajes.shift();
  res.status(201).json({ ok: true });
});

app.listen(PUERTO, '0.0.0.0', () => console.log('Escuchando en el puerto ' + PUERTO));