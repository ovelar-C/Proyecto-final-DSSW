const validarEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email.trim())){
           return false;
        }
        return true;
}
module.exports = validarEmail;