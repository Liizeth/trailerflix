const express = require("express");
const router = express.Router();

const {
    series,
    mision,
    pelisGenero,
    peliTag,
    temDescenciente,
    buscarPalabra,
    maxmin,
    actLanzamiento} = require("../../controller/carteleraController.js");

router.get("/seriesTem",series);

router.get("/mision/:palabra",mision);

router.get("/pelisGenero/:genero",pelisGenero);


router.get("/peliTags/:tag1/:tag2",peliTag);

router.get("/peliTags/:tag1",(req, res) => {
    res.status(404).json({ error: "se debe ingresae dos tag para la busqueda /tag1/tag2" });
});

router.get("/ordenDesc",temDescenciente);

router.get("/buscar/:palabra",buscarPalabra);

router.get("/maxMin",maxmin);

router.get("/actFechaL/:genero",actLanzamiento);

module.exports = router;
