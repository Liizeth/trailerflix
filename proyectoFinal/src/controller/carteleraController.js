const { Cartelera, Categoria, Resumen } = require("../models");
const { Op } = require("sequelize"); //importa operadores logicos 


const series = async (req,res)=>{
    try{
        const resultado = await Cartelera.findAll({
              where: {
                    temporada: {
                      [Op.gte]: 3
                    }
                  },
                  include: [{ //porque puede estr masl cargada
                    model: Categoria,
                    where: {
                      categorias: 'Serie'
                    }
                  }]
        });
        res.status(200).json(resultado);
    }catch{
        res.status(500).json({ error: "Error del servidor" });
    }
}

async function buscar (palabra){
  try {

    const palabraBuscar = `%${palabra}%`;

    const resultados = await Resumen.findAll({
      where: {
        texto: {
          [Op.like]: palabraBuscar  //busca la palabra
        }
      },
      attributes: ['id_cartelera']
    });

    return resultados.map(r => r.id_cartelera);//devuelve solo los id_cartelera
    //por que en resumenes estaria resumen {id_cartelera: 1} con map da solo 1
  }catch(error){
    console.error("Error al buscar categoría por nombre:", error);
    return 0;
  }
}

//no se porque no me toma esto da error al buscar 
const mision = async (req,res)=>{
  try {
    const palabra = req.params.palabra;

    if (!palabra || palabra.trim() === "") {
            return res.status(400).json({ error: "Debe ingresar una palabra a buscar" });
    }

    const idMatchs = await buscar(palabra);

    console.log ('log de conicidencias      ${idMatchs.length}');

    if (idMatchs.length === 0) {
            return res.status(404).json({ error: "no hay series/pelis que contengan la palabra ${palabra} en el resumen" });
    }

    const resultados = await Cartelera.findAll({
      where: {
        id: idMatchs
      },
      attributes: ['id', 'titulo'],
      include: {
        model: Categoria,
        attributes: ['nombre']
      }
    });

    console.log ('log de resultado      ${resultados.length}');

    const resul = resultados.map(r => ({
      //id: r.id,
      titulo: r.titulo,
      categoria: r.Categoria.nombre
    }));

    res.status(200).json(resul);
  }catch(error){
    res.status(500).json({ error: "Error del servidor misionnn" });
  }


}


module.exports = {
    series,
    mision
}