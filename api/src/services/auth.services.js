const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user');

const saltNumber = 10;

const AuthService = {
  async register({ nombre, email, contrasena }) {
    
    if (!nombre || !email || !contrasena) {
      throw new Error('Todos los campos son obligatorios: nombre, email y contrasena');
    }

    const userExist = await Usuario.findOne({ where: { email } });
    if (userExist) {
      throw new Error('Ese email ya existe, por favor ingrese uno diferente');
    }

    const hashed = await bcrypt.hash(contrasena, saltNumber);
    try {      
      await Usuario.create({ nombre, email, contrasena: hashed });
    } catch (error) {       
       throw new Error('Ha ocurrido un error en el registro');
    }
  },

  async login({ email, contrasena }) {
    
    if (!email || !contrasena) {
      throw new Error('El email y la contraseña son obligatorios');
    }

    const user = await Usuario.findOne({ where: { email } });
    if (!user) return null;

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return null;

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_IN || '1h' }
    );

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    };
  }
};

module.exports = { AuthService };
