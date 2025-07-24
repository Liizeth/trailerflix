const { Actores, Reparto, Cartelera, Genero, Categoria } = require("../models");
const { Op } = require("sequelize"); //importa operadores logicos 


async function buscarIdActor(nom,ape) {

  // Buscar el actor
    const actor = await Actores.findOne({
        where: {
            nombre: nom,
            apellido: ape
        }
    });
    console.log (`actor buscado  ${actor}`)
  // Si lo encuentra, devolvés el ID y no devuleve null
    return actor ? actor.id_actor : null;
}

const contarRepartoAct = async (req, res) => {
    try{

        const nombreCompleto = req.params.nombre;

        if (!nombreCompleto|| nombreCompleto.trim() === "") {
            return res.status(400).json({ error: "Debe ingresar nombre de la categoría" });
        }
        // Separar nombre y apellido
        const partes = nombreCompleto.trim().split(" ");
        const nombre = partes[0];
        const apellido = partes.slice(1).join(" ");

        console.log(`actor a buscar ${nombre}  ${apellido}`);
        const idActor = await buscarIdActor(nombre,apellido);

        if (idActor === null) {
            return res.status(404).json({ error: "Actor no encontrado" });
        }
        //
        console.log (`id el actor   ${idActor}`);
        const resultados = await Reparto.count({ where: { id_actor: idActor } });
        res.status(200).json(resultados);

    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }    
}

async function combinarTablas(){
    const resultados = await Actores.findAll({
  include: [
    {
      model: Cartelera,
      attributes: ['titulo'],
      through: { attributes: [] },
      include: [
        {
          model: Genero,
          attributes: ['tipo_de_genero']
        },
        {
          model: Categoria,
          attributes: ['categorias']
        }
      ]
    }
  ],
  attributes: ['nombre', 'apellido']
});

    //console.log(`${resultados}`);
    return resultados;
}

const mostrarPeli = async (req, res) => {
  try {
    const resultados = await combinarTablas();

    if (!resultados || resultados.length === 0) {
      return res.status(500).json({ error: "No se obtuvieron resultados" });
    }

    const camposPedidos = resultados.flatMap(actor => {
      //console.log(Object.keys(actor)); // para ver propiedades
      //console.log(actor);

      if (!actor.Carteleras) return [];

      return actor.Carteleras.map(cartelera => ({
        nombre_completo: `${actor.nombre} ${actor.apellido}`,
        titulo: cartelera.titulo,
        genero: cartelera.Genero ? cartelera.Genero.tipo_de_genero : 'Desconocido',
        categoria: cartelera.Categoria ? cartelera.Categoria.categorias : 'Desconocido',
      }));
    });

    res.status(200).json(camposPedidos);

  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
}


module.exports = {
    contarRepartoAct,
    mostrarPeli
}