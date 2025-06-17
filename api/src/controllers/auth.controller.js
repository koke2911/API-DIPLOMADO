const { AuthService } = require('../services/auth.services');

const AuthController = {
  async register(req, res) {
    try {
      await AuthService.register(req.body);
      res.status(201).json({
        message: "Usuario registrado correctamente"
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
,

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      if (!result) return res.status(400).json({ message: "Credenciales inválidas" });

      res.status(200).json(result);
    } catch (err) {
      if (err.message === 'El email y la contraseña son obligatorios') {
        return res.status(400).json({ message: err.message });
      }

      return res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
  }

};

module.exports = { AuthController };
