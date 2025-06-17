const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getAuthenticatedUser = (req, res) => {
    res.json({
        message: 'Usuario autenticado',
        user: req.user
    });
};



exports.getAllUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll({
            attributes: ['id', 'nombre', 'email','rol', 'creadoEn']
        });
        res.json({
            message: 'Usuarios encontrados',
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};


exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            message: 'El parametro id es requerido'
        });
    }

    if (id === req.user.id) {
        return res.status(403).json({
            message: 'No puedes eliminar tu propio usuario'
        });
    }
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        await usuario.destroy();
        res.json({
            message: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;

   
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const camposPermitidos = ['nombre', 'email', 'rol'];
        camposPermitidos.forEach(campo => {
            if (req.body[campo] !== undefined) {
                usuario[campo] = req.body[campo];
            }
        });

        await usuario.save();

        res.json({
            message: 'Usuario actualizado correctamente',
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol               
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { actualContrasena, nuevaContrasena } = req.body;

    if (!actualContrasena || !nuevaContrasena) {
        return res.status(400).json({ message: 'Se requieren actualContrasena y nuevaContrasena' });
    }

    if (req.user.id !== parseInt(id) ) {
        return res.status(403).json({ message: 'No autorizado para cambiar esta contraseña' });
    }

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const esValida = await bcrypt.compare(actualContrasena, usuario.contrasena);
        if (!esValida) {
            return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
        }

        const nuevaHash = await bcrypt.hash(nuevaContrasena, 10);
        usuario.contrasena = nuevaHash;
        await usuario.save();

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al actualizar la contraseña',
            error: error.message
        });
    }
};


