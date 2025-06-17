const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectPG, sequelize } = require('./config/db.postgressql');
const app = require('./app');

const Usuario = require('./models/user'); 
const Cars = require('./models/cars'); 
// const Autos = require('./models/cars'); 

dotenv.config();

// console.log( process.env.PUERTO)
const port = process.env.PUERTO;

// const app = express();
// app.use(express.json());
// app.use(cors());

(async ()=>{

    await connectPG();
    await sequelize.sync({ alter: true });
    
    app.listen(port,()=>{
        console.log('ARRIBA en el puerto'+port);
    })    
    
})();


