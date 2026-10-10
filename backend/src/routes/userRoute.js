const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const vereficarToken = require('../middlewares/verificarToken');
const soloAdmin = require('../middlewares/soloAdmin');

//GET
//----------------------------------------------
router.get('/' , vereficarToken ,userController.getAllUser);
router.get('/profile', vereficarToken, userController.getProfile);
//----------------------------------------------
//POST
router.post('/register', userController.signUp);
router.post('/login', userController.login);
//----------------------------------------------
//PATCH
router.patch('/:id' , vereficarToken, userController.updateUser);
//----------------------------------------------
//DELETE
router.delete('/:id', vereficarToken,soloAdmin, userController.deleteUser);


module.exports = router;