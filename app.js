const express = require("express"); // Asegúrate de importar Express
const app = express();
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
const connection = require('./conexion')
const saltRounds = 10;
const MySQLStore = require('express-mysql-session')(session);

mysql://root:YioqinwcCdoAzjnxPFbxrSmgeXsXfJoE@monorail.proxy.rlwy.net:13027/railway
app.use(cors({
    origin: process.env.URLFRONTEND || 'http://localhost:5174',
    credentials: true
  }))
  const sessionStore = new MySQLStore({}/* session store options */, connection);

app.use(session({
  secret: process.env.SECRETSESSION || 'asjdajkhekjhfakjhkajec23enh',
  proxy: process.env.NODE_ENV === 'production',
  cookie:{
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  },
  store: sessionStore
}))

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.get('/login', login)

app.get('/validar', validar)

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuarios)

app.delete('/usuarios', eliminarUsuario)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});