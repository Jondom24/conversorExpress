const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// Get the client
const cors = require('cors')
const session = require('express-session')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const login = require('./login');
const registro = require('./registro');
const { obtenerUsuarios, eliminarUsuario } = require('./usuarios');
const validar = require('./validar');
const saltRounds = 10;
mysql://root:YioqinwcCdoAzjnxPFbxrSmgeXsXfJoE@monorail.proxy.rlwy.net:13027/railway
app.use(cors({
    origin: process.env.HOSTFRONTEND || 'http://localhost:5174',
    credentials: true
  }))

  app.use(session({
    secret: 'asjdajkhekjhfakjhkajec23enh',
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false } // Usa "true" en producción con HTTPS
  })) 

app.get('/login', login)

app.get('/validar', validar)

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuarios)

app.delete('/usuarios', eliminarUsuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 