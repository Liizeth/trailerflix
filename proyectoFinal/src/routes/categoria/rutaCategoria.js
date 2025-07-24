const express = require("express");
const router = express.Router();

const {
    contarCategoria,
    mostrarCategoria} = require("../../controller/categoriaController.js");

router.get("/contar/:nombre",contarCategoria);

router.get("/contar", (req, res) => {
    res.status(400).json({ error: "Falta el nombre de la categoría para contar" });
});

router.get("/:nombre",mostrarCategoria);

router.get("/", (req, res) => {
    res.status(400).json({ error: "Falta el nombre de la categoría para mostar" });
});



module.exports = router;