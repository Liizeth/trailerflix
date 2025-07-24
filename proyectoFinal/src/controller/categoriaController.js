const { Cartelera,Categoria,Genero } = require("../database/models");
const { Op } = require("sequelize"); //importa operadores logicos 

async function categoriaId(nombreCategoria) {
    try {
        const categoria = await Categoria.findOne({
            where: { nombre: nombreCategoria }
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


async function carteleraConGeneroMAYUS() {
    try {
        const peliculasConGenero = await Cartelera.findAll({
            include: [{
                model: Genero,
                attributes: ['tipo_de_genero']
        }]
    });

        const resultadoMayusculas = peliculasConGenero.map(item => ({
            ...item.dataValues,
            titulo: item.titulo.toUpperCase(),
            tipo_de_genero: item.Genero.tipo_de_genero.toUpperCase()
        }));

        return async function carteleraConGeneroMAYUS() {
    try {
        const peliculasConGenero = await Cartelera.findAll({
            include: [{
                model: Genero,
                attributes: ['tipo_de_genero']
        }]
    });

        const resultadoMayusculas = peliculasConGenero.map(item => ({
            ...item.dataValues,
            titulo: item.titulo.toUpperCase(),
            tipo_de_genero: item.Genero.tipo_de_genero.toUpperCase()
        }));

        return resultadoMayusculas;
    } catch (error) {
        console.error("Error al obtener películas con género:", error);
        throw error;
    }
};
    } catch (error) {
        console.error("Error al obtener películas con género:", error);
        throw error;
    }
}





const mostrarCategoria = async (req, res) => {
    const resultado = await carteleraConGenero();
    const resultadoMayusculas = resultado.map(item => ({
        ...item.dataValues, // para copiar todos los campos originales
        titulo: item.titulo.toUpperCase(), // título en mayúsculas
        tipo_de_genero: item.tipo_de_genero.toUpperCase()
    }));

}



module.exports = {
    contarCategoria,
    mostrarCategoria

}
