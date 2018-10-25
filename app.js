var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.locals.currentuser = {}

app.use(function auth0(req, res, next) {
    var nodeSSPI = require('node-sspi')
    var nodeSSPIObj = new nodeSSPI({
      retrieveGroups: true
    })
    nodeSSPIObj.authenticate(req, res, function(err){
      res.finished || next()
    })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var str = req.connection.user
    var resto = str.split('\\')
    var usuarioIn = resto[1]

    var config = require('./database/config')
    var db = mysql.createConnection(config)
    db.connect()

    var consulta0 = null
    
    db.query(`SELECT cod_usuario, id_persona, id_perfile, nombre_usuario, cod_perfile, nombre_perfil, cod_persona, nombres, apellidos, nombre_sede, cod_pais, nombre_pais, dominio_pais, cod_ciudad, nombre_ciudad
              FROM inventario_latam.usuarios u
              INNER JOIN perfiles p ON u.id_perfile = p.cod_perfile
              INNER JOIN personas per ON u.id_persona = per.cod_persona
              INNER JOIN sedes s ON u.id_sede = s.cod_sede
              INNER JOIN ciudades c ON s.id_ciudad = c.cod_ciudad
              INNER JOIN paises pas ON c.id_pais = pas.cod_pais
              WHERE u.estado = 1
              AND nombre_usuario = ? `, usuarioIn, function(err, rows, fields){
      if(err) throw err

      db.end()

      if(rows.length > 0){
        var user = rows[0]
        var userD = {
          id: user.cod_usuario,
          usuario: user.nombre_usuario,
          nombre: user.nombres,
          apellido: user.apellidos,
          perfil: user.nombre_perfil,
          idPais: user.cod_pais,
          pais: user.nombre_pais,
          dominio: user.dominio_pais,
          idCiudad: user.cod_ciudad,
          ciudad: user.nombre_ciudad,
          sede: user.nombre_sede
        }
      
      res.locals.currentuser = userD
      req.user = userD
      return next()
      }
      else {
        // res.status(401).send({message: 'Acceso Denegado!'})
        res.render('acceso')
      }
    })
  })

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
