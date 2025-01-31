const connection = require("./conexion");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = async (req, res) => {const datos = req.query;
  try{
    const [results, fields] = await connection.query("SELECT * FROM `usuarios` WHERE `usuario` = ?", [datos.usuario]
    );
    console.log(bcrypt.hashSync(datos.clave, saltRounds));
    if (results.length >0 &&bcrypt.compareSync(datos.clave, results[0].clave)) {
    req.session.usuario = datos.usuario;
    res.status(200).send('Inicio de seión correcto')
    } else {
      res.status(401).send('Datos incorrectos')
    }

    console.log(results);
    console.log(fields);
  } catch (err) {
    console.log(err);
  }
}

function validar(req, res) {
  if (req.session.usuario) {
    res.status(200).json({ logueado: true })
  } else {
    res.status(401).json({ error: 'Usuario no logueado' })
  }
}

module.exports = login;