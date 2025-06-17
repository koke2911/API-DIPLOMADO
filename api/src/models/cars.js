const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.postgressql'); // asegúrate que la conexión esté exportada

const Cars = sequelize.define('Cars', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'cars',
    timestamps: false
});



module.exports = Cars;
