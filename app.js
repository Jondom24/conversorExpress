const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
const session = require('express-session')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const login = require('./login');
const registro = require('./registro');
const { obtenerUsuarios, eliminarUsuario } = require('./usuarios');
const validar = require('./validar');
const saltRounds = 10;
mysql://root:CGWQbZLEzeqwmkADikxwTJvCaaBhMPxl@viaduct.proxy.rlwy.net:26048/railway
app.use(cors(
  {
    origin: process.env.URLFRONTEND || 'http://localhost:5174',
    credentials: true,
  }
))

app.use(session({
  secret: process.env.SECRETSESSION || 'asjdajkhekjhfakjhkajec23enh',
  proxy: process.env.NODE_ENV === 'production',
  cookie:{
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'node'
  }
}))

app.get('/login', login)

app.get('/validar', validar)

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuarios)

app.delete('/usuarios', eliminarUsuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 