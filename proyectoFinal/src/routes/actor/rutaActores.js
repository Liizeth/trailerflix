const express = require("express");
const router = express.Router();

const {
    contarRepartoAct,
    mostrarPeli} = require("../../controller/actoresController.js");

router.get("/contar/:nombre",contarRepartoAct);

router.get("/contar", (req, res) => {
    res.status(400).json({ error: "Falta el nombre del actor para contar" });
});

router.get("/mostrar",mostrarPeli);

//router.get("/:nombre",mostrarCategoria);

router.get("/", (req, res) => {
    res.send('Ruta principal actores de  funcionando!');
});



module.exports = router;