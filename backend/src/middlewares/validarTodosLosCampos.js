const validarEmail = require('../services/validarEmail');

const validarTodosLosCampos = (req,res,next) =>{
    try {
        const {username, email, password} = req.body;
        const datos = [username, email, password];

        for (const element of datos) {
            if(
                element == null ||
                typeof element !== "string" ||
                element.trim() === ""
            ){
                return res.status(400).json({
                    success: false,
                    message: "Campos vacíos o invalidos"
                });
            }
        }
        if(!validarEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Formato del email invalido"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error del server"
        });
    }
}
module.exports = validarTodosLosCampos;