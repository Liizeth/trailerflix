// src/routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Ruta principal funcionando!');
});

module.exports = router;
