const {Sequelize} =require('sequelize');
require('dotenv').config();

const sequelize =new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
{host: process.env.DB_HOST,
dialect: process.env.DB_DIALECT,
loging:false

}
);

// definir funciones de conectar y desconectar

//tambien se deberia poder testear que que se pudo conectar ??? 
async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log('conexion exitosa');
    }catch(error){
        console.log ('error en la conexion',error);
    }

}



async function disconnet() {
    try {
        await sequelize.close();
        console.log('Conexión cerrada correctamente');
    } catch (error) {
        console.error('Error al cerrar la conexión: ', error);
    }
}



testConnection();
//disconnet()
module.exports = sequelize;