const { Cartelera,Categoria,Genero,Resumen } = require("../models");
const { Op } = require("sequelize"); //importa operadores logicos 
const Tag = require("../models/tag");

async function categoriaId(nombreCategoria) {
    try {
        const categoria = await Categoria.findOne({
            where: { categorias: nombreCategoria }
        });
        if (categoria) {
            return categoria.id_categoria; // o categoria.id, según como lo definiste
        } else {
            return 0; // si no se encontró la categoría
        }
    } catch (error) {
        console.error("Error al buscar categoría por nombre:", error);
        return 0;
    }
}



const contarCategoria = async (req, res) => {
    try {
        const nombre = req.params.nombre;

        if (!nombre || nombre.trim() === "") {
            return res.status(400).json({ error: "Debe ingresar nombre de la categoría" });
        }

        const idCategoria = await categoriaId(nombre);

        if (idCategoria === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        //muestra todo el de esa categoria 
        //const resultados = await Cartelera.findAll({ where: { id_categoria: idCategoria } });
        const resultados = await Cartelera.count({ where: { id_categoria: idCategoria } });

        res.status(200).json(resultados);

    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
}

async function carteleraConGeneroMAYUSytag() {
    try {
        const peliculasConGenero = await Cartelera.findAll({
            include: [{
                model: Genero,
                attributes: ['tipo_de_genero']
            },
            {
                model: Tag,
                attributes: ['tag'],
                through: { attributes: [] } // omite columnas de la tabla intermedia
            },{
                model: Resumen,
                attributes: ['texto']
            }

            ]
        });

        const resultadoMayusculascontag = peliculasConGenero.map(item => ({
            
            ...item.dataValues,
            titulo: item.titulo.toUpperCase(),
            tipo_de_genero: item.Genero.tipo_de_genero.toUpperCase(),
            Tags:item.Tags.map(tag => tag.tag).join(', '),
            texto: item.Resumen?.texto || ""
        }));

        return resultadoMayusculascontag;
    } catch (error) {
        console.error("Error al obtener películas con género:", error);
        throw error;
    }
};






const mostrarCategoria = async (req, res) => {
    try {
        const nombre = req.params.nombre;

        if (!nombre || nombre.trim() === "") {
            return res.status(400).json({ error: "Debe ingresar nombre de la categoría" });
        }

        const idCategoria = await categoriaId(nombre);

        if (idCategoria === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const resultado = await carteleraConGeneroMAYUSytag();

        if (idCategoria === 1) { //es serie
            const series = resultado.filter(item => item.id_categoria && item.id_categoria === 1); //solo agarra las series

            const resul = series.map(({ titulo, tipo_de_genero, Tags,  temporada, trailer, texto }) => ({
                titulo,
                tipo_de_genero,
                Tags,
                temporada,
                trailer,
                texto
            }));

            res.status(200).json(resul);

        }

        if (idCategoria === 2) { // es pelicula 
          // Filtrar solo las que sean peliculas
            const series = resultado.filter(item => item.id_categoria && item.id_categoria === 2);

          // Luego devolver solo los campos que querés
            const resul = series.map(({ titulo, tipo_de_genero, Tags, duracion, trailer }) => ({
                titulo,
                tipo_de_genero,
                Tags,
                duracion,
                trailer
            }));
        
            res.status(200).json(resul);
        }
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
}

module.exports = {
    contarCategoria,
    mostrarCategoria

}
