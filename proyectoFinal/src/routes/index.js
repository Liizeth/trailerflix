// src/routes/index.js 

/// no es algo buen es lo para que funque la toodoo
const express = require('express');
const router = express.Router();

const categoriaRoutes = require("./categoria/rutaCategoria.js");
const actoresRoutes = require("./actor/rutaActores.js");
const carteleraRoutes = require("./cartelera/rutaCartelera.js");


router.use("/rutasCate",carteleraRoutes);

router.use("/rutasCat", categoriaRoutes);

router.use("/rutasAct", actoresRoutes);

router.get('/', (req, res) => {
    res.send('Ruta principal index de  funcionando!');
});


router.use((req, res) => {
    res.status(404).json({ error: "Ruta no definida en router" });
});

module.exports = router;
