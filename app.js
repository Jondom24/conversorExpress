const express = require('express')
const app = express()
const port = 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
const session = require('express-session')

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
))

app.use(session({
  secret: 'asjdajkhekjhfakjhkajec23enh'
}))

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'servletlogin',
});

async function login(req, res) { //req peticion, re respuesta
  const datos = req.query;
  const [filas] = await connection.query("SELECT * FROM `usuarios` WHERE `usuario` = '" + datos.usuario + "' AND `contraseña` = '" + datos.clave + "'")
  
  if (filas.length ==1) {
    req.session.usuario = datos.usuario
    res.status(200).json({ logueado: true })
  } else {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
  }
}
app.get('/login', login)

function validar(req, res) {
  if (req.session.usuario) {
    res.status(200).json({ logueado: true })
  } else {
    res.status(401).json({ error: 'Usuario no logueado' })
  }
}

app.get('/validar', validar)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 