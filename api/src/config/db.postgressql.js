const { Sequelize } = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();

const POSTGRES_URI = process.env.POSTGRES_URI;
// console.log(POSTGRES_URI);
const sequelize = new Sequelize(POSTGRES_URI,{
    dialect: 'postgres',
    logging:false
});

async function connectPG(){
    try {
        await sequelize.authenticate();
        console.log('coonectado a PG');
    } catch (error) {
        console.log('No se pudo conectar', error);
        process.exit(1);
    }
}


module.exports ={connectPG, sequelize};