const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//MIDDLEWARES
const vereficarToken = require('../middlewares/verificarToken');
const soloAdmin = require('../middlewares/soloAdmin');
const validarLogin = require('../middlewares/validarLogin');
const validarTodosLosCampos = require('../middlewares/validarTodosLosCampos');

//GET
//----------------------------------------------
router.get('/' , vereficarToken ,userController.getAllUser);
router.get('/profile', vereficarToken, userController.getProfile);
//----------------------------------------------
//POST
router.post('/register', validarTodosLosCampos, userController.signUp);
router.post('/login', validarLogin, userController.login);
//----------------------------------------------
//PATCH
router.patch('/:id' ,validarTodosLosCampos, vereficarToken, userController.updateUser);
//----------------------------------------------
//DELETE
router.delete('/:id', vereficarToken,soloAdmin, userController.deleteUser);


module.exports = router;