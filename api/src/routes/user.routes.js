const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.verifyToken');
const { getAuthenticatedUser, getAllUsers, deleteUser, updateUser, updatePassword } = require('../controllers/user.controller');


/**
 * @swagger
 * /usuarios/me:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario autenticado
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Juan Pérez
 *                     email:
 *                       type: string
 *                       example: juan@mail.com
 *       401:
 *         description: Token inválido o ausente
 */

/**
 * @swagger
 * /usuarios/all:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Listado de todos los usuarios
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       email:
 *                         type: string
 *                         example: juan@mail.com
 *       401:
 *         description: Token inválido o ausente
 */
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token inválido o ausente
 */
/**
 * @swagger
 * /usuarios/{id}:
 *   patch:
 *     summary: Actualizar datos de un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Pedro Gómez
 *               email:
 *                 type: string
 *                 example: pedro@mail.com
 *               rol:
 *                 type: string
 *                 enum: [admin, usuario]
 *                 example: usuario
 *              
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado correctamente
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *                     nacimeinto:
 *                       type: string
 *       400:
 *         description: Error en la solicitud
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
/**
 * @swagger
 * /usuarios/{id}/contrasena:
 *   put:
 *     summary: Cambiar contraseña del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - actualContrasena
 *               - nuevaContrasena
 *             properties:
 *               actualContrasena:
 *                 type: string
 *                 example: antigua123
 *               nuevaContrasena:
 *                 type: string
 *                 example: nuevaSegura456
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: Contraseña actual incorrecta
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */


router.use(verifyToken)
router.get('/me', getAuthenticatedUser);
router.put('/:id/contrasena', updatePassword);
router.get('/all', getAllUsers);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);


module.exports = router;
