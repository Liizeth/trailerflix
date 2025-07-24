const Cartelera = require("./cartelera");
const Genero = require("./genero");
const Actores = require("./actores");
const Tag = require("./tag");
const Cartelera_Tag = require("./cartelera_tag");
const Categoria = require("./categoria");
const Resumen = require("./resumen");
const Reparto = require("./reparto");

//relacion entre cartelera y los id de genero y categoria
Cartelera.belongsTo(Genero, { foreignKey: 'id_genero' });
Cartelera.belongsTo(Categoria, { foreignKey: 'id_categoria' });

//relacion entre resumen y el id de cartelera
Resumen.belongsTo(Cartelera, { foreignKey: 'id_cartelera' });
Cartelera.hasOne(Resumen, { foreignKey: 'id_cartelera' });


//relacion entre la cartelera y el actor seria el reparto
Cartelera.belongsToMany(Actores, {
    through: Reparto,
    foreignKey: 'id_cartelera',
    otherKey: 'id_actor'
});

// se hace la relacion de actor y cartelera en ambos sentidos 
Actores.belongsToMany(Cartelera, {
    through: Reparto,
    foreignKey: 'id_actor',
    otherKey: 'id_cartelera'
});




module.exports = {
    Cartelera,
    Genero,
    Actores,
    Tag,
    Cartelera_Tag,
    Categoria,
    Resumen,
    Reparto
}