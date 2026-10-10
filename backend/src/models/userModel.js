const pool= require('../config/db');

const createUser = async (username,email, passwordHash) =>{
    const query = `
    INSERT INTO usuarios 
    (username, email, password) 
    VALUES ($1,$2,$3) RETURNING *`;
    const resultado = await pool.query(query,[username,email, passwordHash]);
    return resultado.rows[0];
};

const findEmail = async (email) =>{
    const query = `
    SELECT * 
    FROM usuarios 
    WHERE email =$1`;
    const usuario = await pool.query(query,[email]);
    //devolvemos el usuario fila 0
    return usuario.rows[0];
}
const findById = async(id)=>{
    const query = `
    SELECT *
    FROM usuarios
    WHERE id =$1`;
    const usuario = await pool.query(query,[id]);
    return usuario.rows[0];
}
const getAllUser = async ()=>{
    const query = `
    SELECT 
        u.id,
        u.username,
        u.email,
        r.rol AS rol
    FROM usuarios u
    INNER JOIN roles r
        ON u.rol_id = r.id`;
    const usuarios = await pool.query(query);
    return usuarios.rows;
}
const deleteUser = async (id)=>{
    const query = `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING *
    `;
    const resultado = await pool.query(query,[id]);
    return resultado.rows[0];
}
//incompleto
const updateUser = async (datos,id)=>{
    const {username, email, password} = datos;
    const query = `
    UPDATE usuarios
    SET
        username = COALESCE($1, usuarios.username),
        email = COALESCE($2, usuarios.email),
        password = COALESCE($3, usuarios,password)
        WHERE id = $4
        RETURNING id, username, email, password
    `;
    const values = [
        username ?? null,
        email ?? null,
        password ?? null,
        id
    ];
    const resultado = await pool.query(query, values);
    return resultado.rows[0] ?? null;
};



module.exports = {
    createUser,
    findEmail,
    findById,
    getAllUser,
    deleteUser,
    updateUser,
};