# Trailerflix
## Entrega Final Grupo 7

------
- Indice
  - [Tecnologías usadas](#-tecnologías-usadas)
  - [Diagrama](#-modelo-trailerflix)
  - [Variables de entorno](#-variables-de-entorno)
  - [Consultas SQL:](#-consultas-sql)
    - [Obtener una lista de películas por género](#-obtener-una-lista-de-películas-por-género)
    - [Obtener películas con los tags "Aventura" y "Ciencia Ficción", o "Aventura" y "Fantasía"](#-obtener-películas-con-tags)
    - [Visualizar títulos y categorías cuyo resumen contenga la palabra "misión"](#-resúmenes-con-misión)
    - [Listar las series con al menos 3 temporadas](#4-series-con-al-menos-3-temporadas)
    - [Contar cuántas películas/series trabajó el actor Chris Pratt](#5-trabajos-de-chris-pratt)
    - [Mostrar nombre completo de actrices/actores con título, categoría y género](#6-actores-con-datos-de-trabajos)
    - [Ver solo películas](#-ver-películas/series)
        - mostrar título en mayúsculas, género en mayúsculas, tags separados por coma, duración y enlace al tráiler.
    - [Ver solo series ](#-ver-películas/series)
        - mostrar título en mayúsculas, género en mayúsculas, tags separados por coma, cantidad de temporadas, tráiler y resumen.
    - [Película/serie con más y menos actores](#9-más-y-menos-actores)
        - indicando la cantidad en cada caso.
    - [Contar la cantidad total de películas](#-contar-la-cantidad-total-de-películas/series)
    - [Contar la cantidad total de series](#-contar-la-cantidad-total-de-películas/series)
    - [Listar las series en orden descendente por cantidad de temporadas]()
    - [Agregar el campo fecha_lanzamiento (tipo DATE) a la tabla de trabajos fílmicos]()
        - actualizar las fechas de los títulos del género "Aventura"
    - [Buscar películas por palabra clave en título o descripción ]()
    - [Agregar una tabla "Ranking"]()
        - con ID de película/serie, calificación y comentarios.
    - []()
    
        - [Listado de Titulos](#listado-de-titulos)
        - [Busqueda de Titulo](#busqueda-de-titulo)
        

------


## 🚀 Tecnologías usadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- [Node.js](https://nodejs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/) (usado junto con MySQL Workbench para administrar la base de datos)



## 📊 Modelo Trailerflix
<div style="text-align: center;">
  <img src="img/diagramadb.png" alt="Diagrama de base de datos" width="600"/>
</div>

## 🔐 Variables de entorno

Este proyecto utiliza un archivo `.env` para guardar información sensible o de configuración, como los datos de conexión a la base de datos.

Ejemplo de las variables necesarias:


| Variable       | Descripción                   | Ejemplo        |
|----------------|-------------------------------|----------------|
| `DB_HOST`      | Dirección del servidor         | `localhost`    |
| `DB_PORT`      | Puerto de conexión             | `3306`         |
| `DB_USER`      | Usuario de MySQL               | `root`         |
| `DB_PASSWORD`  | Contraseña de MySQL            | `totoro`       |
| `DB_NAME`      | Nombre de la base de datos     | `carteleradb`  |
| `DB_DIALECT`   | Dialecto utilizado por Sequelize | `mysql`     |


##🧮 Consultas SQL

###🎬Obtener una lista de películas por género
###🧭Obtener películas con los tags
###🕵️‍♀️Resúmenes con "misión"
###📺
###👤
###🎭
###🔠 Ver películas/series
7. Ver solo la categoría **"Películas"**:  
   mostrar título en mayúsculas, género en mayúsculas, tags separados por coma, duración y enlace al tráiler.
8. Ver solo la categoría **"Series"**: 
###👥
###🎞️ Contar la cantidad total de películas/series
10. Contar la cantidad total de **películas** registradas.
11. Contar la cantidad total de **series** registradas.
###🔢
###🗓️
###🔍
###🏆



## 👩‍💻 Autor
 [Lizeth](https://github.com/Liizeth/) 🦋<br> 
