const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Rutas 
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);



module.exports = app;
