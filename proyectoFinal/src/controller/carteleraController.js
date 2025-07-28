const { Cartelera, Categoria, Resumen, Genero, Tag, Cartelera_Tag, Reparto } = require("../models");
const { Op, fn, col } = require("sequelize"); //importa operadores logicos 
const {sequelize} = require("../database.js");


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
        res.status(500).json({ error: "Error del servidor en /series" });
    }
}

async function buscarIdGenero (genero){
    const resultados = await Genero.findOne({
      where: {
        tipo_de_genero: genero
      }, 
      attributes: ['id_genero']//esto  no sirve para sacar solo el id
    });
  // porque no es nro literal no devuelve 7, devuelve el nombre el campo y su valor ejem {
  //                                                                                    id_gener: 7    
  //                                                                                          }

    //por eso se deveria acceder a el con . (es parecido a usar los campos de una clase)

    return resultados? resultados.id_genero : 0;
}

const pelisGenero = async (req,res)=>{
  try {
    const generoBuscar= req.params.genero;

    if (!generoBuscar || generoBuscar.trim() === "") {
        return res.status(400).json({ error: "Debe ingresar nombre del genero a buscar" });
    }

    const idGenero = await buscarIdGenero(generoBuscar);

    if (idGenero === 0) {
        return res.status(404).json({ error: "Genero no encontrado" });
    }
    console.log (`id del genero   ${idGenero}`);
    const resultados = await Cartelera.findAll({ where: { id_genero: idGenero } });

    res.status(200).json(resultados);

  } catch (error) {
    res.status(500).json({ error: "Error del servidor en /pelisGenero" });
  }

}



async function idsTag(tag1,tag2) {
  const idTag = await Tag.findAll({
    where: {
      tag: {
        [Op.in]: [tag1, tag2] // busca si el tag es igual a tag1 o tag2
      }
    },
    attributes:['id_tag']
  });
   // Si hay resultados, devolvés un array con los id_tag, si no, null
  return idTag.length > 0 ? idTag.map(t => t.id_tag) : null;
}

const peliTag = async (req,res)=>{
  try{

    const tag1=req.params.tag1;
    const tag2=req.params.tag2;

    if ((!tag1 || tag1.trim() === "") && (!tag2 || tag2.trim() === "")) {
      return res.status(400).json({ error: "Debe ingresar dos tag para realizar la busqueda" });
    }

    const ids = await idsTag(tag1,tag2);

    if (!ids || ids.length === 0) {
        return res.status(404).json({ error: "no se encontraron esos tags" });
    }else if (ids.length === 1) {
      console.log('Se encontró un solo tag:', ids[0]);
    }

    const peliculasConTag = await Cartelera.findAll({
        where: {
          id_categoria: 2 //solo se agarran peliculas 
        },
        include: [{
          model: Tag,
          where: {
            id_tag: {
              [Op.in]: ids // este es tu array, por ejemplo: [1, 3]
            }
          },
          attributes: ['tag'],
          through: { attributes: [] }
        }]
    });

    const resultados = peliculasConTag.map(item => ({
        
        ...item.dataValues,
        Tags:item.Tags.map(tag => tag.tag).join(', '),
    }));

    res.status(200).json(resultados);
  }catch(error){
    console.error("Error en la ruta /mision:", error);
    res.status(500).json({ error: "Error del servidor en /pelisTag" });
  }

}


/*  
esto nose porque no funciona.... PREGUNTAR A LA PROFE !!!!
encima ya intente de todo y NADAAA y ahora quiero saber porque no funcion awaaaaaaaaa


async function buscar (palabra){
  try {

    const palabraBuscar = `%${palabra}%`;

    const resultados = await Resumen.findAll({
      where: {
        texto: {
          [Op.like]: palabraBuscar  //busca la palabra
        }
      },
      attributes: ['id_cartelera'];
      //raw: true devuelve un json plano 
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
        id:{
          [Op.in] : idMatchs // agarra solo los que estan en el array de la busqueda 
        } 
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
      categoria: r.Categoria ? r.Categoria.categorias : "Sin categoría"
    }));

    res.status(200).json(resul);
  }catch(error){
    res.status(500).json({ error: "Error del servidor misionnn" });
  }


}*/


const mision = async (req, res) => {
  try {
    const palabra = req.params.palabra;

    if (!palabra || palabra.trim() === "") {
      return res.status(400).json({ error: "Debe ingresar una palabra a buscar" });
    }

    const resultados = await Cartelera.findAll({
      include: [
        {
          model: Resumen,
          where: {
            texto: {
              [Op.like]: `%${palabra}%`
            }
          },
          attributes: [] // no queremos devolver el resumen
        },
        {
          model: Categoria,
          attributes: ['categorias']
        }
      ],
      attributes: ['titulo']
    });

    if (resultados.length === 0) {
      return res.status(404).json({ error: `No hay series/películas con la palabra "${palabra}" en el resumen` });
    }

    const resul = resultados.map(r => ({
      titulo: r.titulo,
      //nose porque tengo que poner el caso de no tener categoria, si todas las pelis/series la tiene 
      //pero sino lo pongo me da error porque lo toma como vacio aveces (creoo)
      categoria: r.Categoria ? r.Categoria.categorias : "Sin categoría"
    }));

    res.status(200).json(resul);
  } catch (error) {
    console.error("Error en la ruta /mision:", error);
    res.status(500).json({ error: "Error del servidor en /mision" });
  }
};

//const maxMin = async (req, res) => {
//}

const temDescenciente = async (req, res) => {
  try{

    const resul = await Cartelera.findAll({
      where: {
        id_categoria: 1 //es serie
      },
      order: [['temporada', 'DESC']]
    })
    res.status(200).json(resul);
  }catch(error){
    console.error("Error en la ruta /temp3:", error);
    res.status(500).json({ error: "Error del servidor en /temDescendiente" });
  }

}


const buscarPalabra = async (req, res) => {
  try {
    const palabra = req.params.palabra;

    if (!palabra || palabra.trim() === "") {
      return res.status(400).json({ error: "Debe ingresar una palabra a buscar" });
    }

    const resultados = await Cartelera.findAll({
      include: [
        {
          model: Tag,
          attributes: ['tag'],
          through: { attributes: [] }
        },
        {
          model: Resumen, // <- incluís el modelo que tiene el campo "texto"
          attributes: [],
          required: false // si querés que sea opcional
        }
      ],
      where: {
        [Op.or]: [
          { titulo: { [Op.like]: `%${palabra}%` } },
          { '$Resumen.texto$': { [Op.like]: `%${palabra}%` } } // 💡 usa la ruta al campo asociado
        ]
      },
    
      attributes: ['titulo']
    });

    if (resultados.length === 0) {
      return res.status(404).json({ error: `No hay series/películas con la palabra " ${palabra} " en el titulo/resumen` });
    }

    res.status(200).json(resultados);
  }catch(error){
    console.error("Error en la ruta /buscar palabra:", error);
    res.status(500).json({ error: "Error del servidor en /bucarPalabra" });
  }



}

//async function idMin (){
//  const resultado = Reparto
//
//}
//
//async function idMax (){
//}
//
const actLanzamiento = async (req, res) => {
  try{
    const generoBuscar= req.params.genero;

    if (!generoBuscar || generoBuscar.trim() === "") {
        return res.status(400).json({ error: "Debe ingresar nombre del genero a buscar" });
    }

    const idGenero = await buscarIdGenero(generoBuscar); //reutiliza la funcion 

    if (!idGenero || typeof idGenero !== "number") {
        return res.status(404).json({ error: "Genero no encontrado" });
    }
    
    
    const hoy = new Date(); //toma la fecha de hoy para actualizar la fecha de lanzamiento
    //podria ser pasada (ingresada) por parametro 
    //const hoy = new Date(); con hora 
    hoy.setHours(0, 0, 0, 0);//sin hora

   // modifica
  const muestaModificados = await Cartelera.update(//en update se necesita dos parametro (campo a modificar) y (condicion)
    { fecha_lanzamiento: hoy }, // valores a modificar 
    {
      where: {
        id_genero: idGenero // condición
      }
    }
  );


    
    res.status(200).json(muestaModificados);
  }catch (error){
    console.error("Error en la ruta /fecha:", error);
    res.status(500).json({ error: "Error del servidor en /actLanzamiento" });
  }
}


const maxmin = async (req, res) => {
  try {
    // Más actores
    const maxActores = await Cartelera.findOne({
      attributes: [
        'id',
        'titulo',
        [sequelize.fn('COUNT', sequelize.col('Reparto.id_actor')), 'cantidad_actores']
      ],
      include: [{ model: Reparto, attributes: [] }],
      group: ['Cartelera.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('Reparto.id_actor')), 'DESC']],
      limit: 1
    });

    // Menos actores
    const minActores = await Cartelera.findOne({
      attributes: [
        'id',
        'titulo',
        [sequelize.fn('COUNT', sequelize.col('Reparto.id_actor')), 'cantidad_actores']
      ],
      include: [{ model: Reparto, attributes: [] }],
      group: ['Cartelera.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('Reparto.id_actor')), 'ASC']],
      limit: 1
    });

    res.status(200).json({
      peliculaConMasActores: maxActores,
      peliculaConMenosActores: minActores
    });
  } catch (error) {
    console.error('Error al obtener máximo y mínimo:', error);
    res.status(500).json({ error: 'Error interno del servidor /maxMin' });
  }
};



module.exports = {
    series,
    mision,
    pelisGenero,
    peliTag,
    maxmin,
    temDescenciente,
    buscarPalabra,
    actLanzamiento
}