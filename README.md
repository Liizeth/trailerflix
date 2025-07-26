# Trailerflix
## Entrega Final Grupo 7

------
- Indice
  - [Tecnologías usadas](#-tecnologías-usadas)
  - [Diagrama](#-modelo-trailerflix)
  - [Variables de entorno](#-variables-de-entorno)
  - [Consultas SQL:](#-consultas-sql)
    - [Obtener una lista de películas por género](#-obtener-una-lista-de-películas-por-género)
    - [Obtener películas con los tags "Aventura" y "Ciencia Ficción", o "Aventura" y "Fantasía"](#-obtener-películas-con-los-tags)
    - [Visualizar títulos y categorías cuyo resumen contenga la palabra "misión"](#-resúmenes-con-misión)
    - [Listar las series con al menos 3 temporadas](#-series-con-al-menos-3-temporadas)
    - [Contar cuántas películas/series trabajó el actor Chris Pratt](#-contar-cuántas-películas/series-trabajó-el-actor)
    - [Mostrar nombre completo de actrices/actores con título, categoría y género](#-actores-con-datos-de-trabajos)
    - [Ver solo películas](#-ver-películas/series)
    - [Ver solo series ](#-ver-películas/series)
    - [Película/serie con más y menos actores](#-película/serie-con-más-y-menos-actores)
    - [Contar la cantidad total de películas](#-contar-la-cantidad-total-de-películas/series)
    - [Contar la cantidad total de series](#-contar-la-cantidad-total-de-películas/series)
    - [Listar las series en orden descendente](-listar-las-series-en-orden-descendente)
    - [Agregar el campo fecha de lanzamiento](-agregar-el-campo-fecha-de-lanzamiento)
    - [Buscar películas por palabra ](#-buscar-películas-por-palabra)
    - [Agregar una tabla Ranking](#-agregar-una-tabla-ranking)
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


## 🧮 Consultas SQL

### 🎬 Obtener una lista de películas por género
### 🧭 Obtener películas con los tags
### 🕵 Resúmenes con "misión"
### 📺 Series con al menos 3 temporadas
### 👤 Contar cuántas películas/series trabajó el actor
### 🎭 Actores con datos de trabajos
### 🔠 Ver películas/series
7. Ver solo la categoría **"Películas"**:  
   mostrar título en mayúsculas, género en mayúsculas, tags separados por coma, duración y enlace al tráiler.
8. Ver solo la categoría **"Series"**: 
### 👥 Película/serie con más y menos actores
### 🎞️ Contar la cantidad total de películas/series
10. Contar la cantidad total de **películas** registradas.
11. Contar la cantidad total de **series** registradas.
### 🔢 Listar las series en orden descendente
### 🗓️ Agregar el campo fecha de lanzamiento
### 🔍 Buscar películas por palabra
### 🏆 Agregar una tabla Ranking 



## 👩‍💻 Autor
 [Lizeth](https://github.com/Liizeth/) 🦋<br> 
