var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var async = require('async')
var nodeExcel = require('excel-export');
var dateFormat = require('dateformat')


router.get('/', function(req, res, next) {
	res.render('index');
})

router.get('/Consultas', function(req, res, next) {
	res.render('consultas');
})

router.get('/Movimientos', function(req, res, next) {
	res.render('movimientos')
})

router.get('/Ingresar', function(req, res, next) {
	var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta0 = null
		var consulta1 = null
		var consulta2 = null
		var consulta3 = null
		var consulta4 = null
		var consulta5 = null
		var consulta6 = null
		var consulta7 = null
		var id = res.locals.currentuser.idCiudad
		var idPais = res.locals.currentuser.idPais

		async.parallel([
			function(callback) { db.query(`SELECT * FROM inventario_latam.tipos_equipo where estado = 1 ORDER BY nombre_tipo_equip`, function(err, rows, fields){
					if(err) throw err
					consulta0 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT cod_marca, nombre_marca FROM marcas WHERE estado = 1 order by nombre_marca`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT cod_propietario, nombre_propietario FROM propietarios WHERE estado = 1 order by nombre_propietario`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.os order by nombre_os`, function(err, rows, fields){
					if(err) throw err
					consulta3 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.nivel_impacto where estado = 1`, function(err, rows, fields){
					if(err) throw err
					consulta5 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.responsables where id_pais = ? AND estado = 1 ORDER BY nombre_resp`, idPais, function(err, rows, fields){
					if(err) throw err
					consulta6 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.asignados where id_pais = ? AND estado = 1 ORDER BY nombre_asignado`, idPais, function(err, rows, fields){
					if(err) throw err
					consulta7 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM sedes where id_ciudad = ? order by nombre_sede`, id, function(err, rows, fields){
					if(err) throw err
					consulta4 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('insertar', {consulta0 : consulta0, consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4 : consulta4, consulta5 : consulta5, consulta6 : consulta6, consulta7 : consulta7})
		})
})

router.get('/IngresarU', function(req, res, next) {
	var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta0 = null
		var consulta1 = null
		var consulta2 = null
		var consulta3 = null
		var consulta4 = null
		var id = res.locals.currentuser.idCiudad

		async.parallel([
			function(callback) { db.query(`SELECT * FROM inventario_latam.pisos  where estado = 1 order by nombre_piso`, function(err, rows, fields){
					if(err) throw err
					consulta0 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.puestos  where estado = 1 order by num_puesto`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.tipos_ubicaciones  where estado = 1 order by nom_tp_ubicacion`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_latam.areas  where estado = 1 order by nombre_area`, function(err, rows, fields){
					if(err) throw err
					consulta3 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM sedes where id_ciudad = ? order by nombre_sede`, id, function(err, rows, fields){
					if(err) throw err
					consulta4 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('insertarUbica', {consulta0 : consulta0, consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4 : consulta4})
		})
})

router.get('/Ubicaciones', function(req, res, next) {
	res.render('ubicaciones');
})

router.get('/Reportes', function(req, res, next) {
	res.render('reportes');
})

router.get('/api_query_sede/:id_sede', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var id_sede = req.params.id_sede
	var consulta1 = null

	var consulta = `SELECT cod_activo_hw, nombre_pais, nombre_ciudad, nombre_sede, nombre_campana, ceco, 
					nombre_area,id_ubicacion,       nom_tp_ubicacion, nombre_piso, num_puesto, modelo_equi, modelo_mon, nombre_tipo_equip, 
					cpu, ram, hdd,  CONCAT(nombre_piso, ' - Puesto ', num_puesto) AS ubica1, 
					me.nombre_modelo AS modelo_equi,
					mm.nombre_modelo AS modelo_mon, 
					mt.nombre_modelo AS modelo_tec, 
					mu.nombre_modelo AS modelo_mau, 
					re.nombre_marca AS marca_equi,
					rm.nombre_marca AS marca_mon, 
					rt.nombre_marca AS marca_tec, 
					ru.nombre_marca AS marca_mau, 
					host_name, ip, nombre_resp, nombre_asignado,
					serial_equipo, num_activo_equi, serial_mon, num_activo_mon, serial_tec, serial_mou, id_os, nombre_os, nombre_propietario,
					tk, ultima_mod, cod_nivel_impacto, nombre_nivel_imp, cod_tipo_equipo, me.cod_modelo AS cod_modelo_equi, mm.cod_modelo AS cod_modelo_mon, mt.cod_modelo AS cod_modelo_tec, mu.cod_modelo AS cod_modelo_mou,
					cod_propietario, cod_asignado, cod_responsable,
					hw.estado
					FROM   activos_hw hw   
					INNER JOIN propietarios pr ON hw.id_propietario= pr.cod_propietario	         
					INNER JOIN os ON hw.id_os=os.cod_os	         
					INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo	
					INNER JOIN modelos me ON hw.modelo_equi = me.cod_modelo
					INNER JOIN modelos mm ON hw.modelo_mon = mm.cod_modelo 
					INNER JOIN modelos mt ON hw.modelo_tec = mt.cod_modelo 
					INNER JOIN modelos mu ON hw.modelo_mau = mu.cod_modelo  
					INNER JOIN marcas re ON me.id_marca = re.cod_marca
					INNER JOIN marcas rm ON mm.id_marca = rm.cod_marca
					INNER JOIN marcas rt ON mt.id_marca = rt.cod_marca
					INNER JOIN marcas ru ON mu.id_marca = ru.cod_marca
					INNER JOIN nivel_impacto ni ON hw.id_nivel_imp = ni.cod_nivel_impacto	
					INNER JOIN responsables res ON hw.id_responsable= res.cod_responsable  
					INNER JOIN asignados asi ON hw.id_asignado= asi.cod_asignado          
					INNER JOIN ubicaciones ub ON hw.id_ubicacion = ub.cod_ubicacion	         
					INNER JOIN pisos pss ON ub.id_piso = pss.cod_piso	         
					INNER JOIN puestos pst ON ub.id_puesto= pst.cod_puesto          
					INNER JOIN areas ar ON ub.id_area= ar.cod_area	         
					INNER JOIN campanas cp ON ub.id_campana= cp.cod_campana           
					INNER JOIN tipos_ubicaciones tpu ON ub.id_tipo_ubicacion = tpu.cod_tipo_ubicacion	         
					INNER JOIN sedes sd ON cp.id_sede= sd.cod_sede	         
					INNER JOIN ciudades ci ON sd.id_ciudad= ci.cod_ciudad	         
					INNER JOIN paises pa ON ci.id_pais= pa.cod_pais	           
					WHERE cod_sede = ? AND hw.estado = 1
					order by nombre_campana, nombre_piso, num_puesto ASC`
	db.query(consulta, id_sede, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api_query_sede_ubica/:id_sede', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var id_sede = req.params.id_sede
	var consulta1 = null

	var consulta = `select nombre_pais, cod_sede, nombre_ciudad, nombre_sede, cod_campana, nombre_campana, nombre_area, nom_tp_ubicacion, nombre_piso, num_puesto, cod_ubicacion
									from ubicaciones ubs
									inner join pisos pi on ubs.id_piso= pi.cod_piso
									   inner join puestos pt on ubs.id_puesto= pt.cod_puesto
									   inner join campanas ca on ubs.id_campana= ca.cod_campana
									   inner join areas ar on ubs.id_area = ar.cod_area
									   inner join tipos_ubicaciones tu on ubs.id_tipo_ubicacion = tu.cod_tipo_ubicacion
									   inner join sedes sd on ca.id_sede = sd.cod_sede
									   inner join ciudades ci on sd.id_ciudad = ci.cod_ciudad
									   inner join paises pa on ci.id_pais = pa.cod_pais
									where cod_sede= ?  and ubs.estado = 1
									order by nombre_sede, nombre_campana, nombre_piso, num_puesto;`
	db.query(consulta, id_sede, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api_query_campana/:id_sede/:id_campana', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var params = [req.params.id_sede, req.params.id_campana]
	
	var consulta1 = null

	var consulta = `SELECT cod_activo_hw, nombre_pais, nombre_ciudad, nombre_sede, nombre_campana, ceco, 
					nombre_area,id_ubicacion,       nom_tp_ubicacion, nombre_piso, num_puesto, modelo_equi, modelo_mon, nombre_tipo_equip, 
					cpu, ram, hdd,  CONCAT(nombre_piso, ' - Puesto ', num_puesto) AS ubica1, 
					me.nombre_modelo AS modelo_equi,
					mm.nombre_modelo AS modelo_mon, 
					mt.nombre_modelo AS modelo_tec, 
					mu.nombre_modelo AS modelo_mau, 
					re.nombre_marca AS marca_equi,
					rm.nombre_marca AS marca_mon, 
					rt.nombre_marca AS marca_tec, 
					ru.nombre_marca AS marca_mau, 
					host_name, ip, nombre_resp, nombre_asignado,
					serial_equipo, num_activo_equi, serial_mon, num_activo_mon, serial_tec, serial_mou, id_os, nombre_os, nombre_propietario,
					tk, ultima_mod, cod_nivel_impacto, nombre_nivel_imp, cod_tipo_equipo, me.cod_modelo AS cod_modelo_equi, mm.cod_modelo AS cod_modelo_mon, mt.cod_modelo AS cod_modelo_tec, mu.cod_modelo AS cod_modelo_mou,
					cod_propietario, cod_asignado, cod_responsable,
					hw.estado
					FROM   activos_hw hw   INNER JOIN propietarios pr ON hw.id_propietario= pr.cod_propietario	         
					INNER JOIN os ON hw.id_os=os.cod_os	         
					INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo	
					INNER JOIN modelos me ON hw.modelo_equi = me.cod_modelo
					INNER JOIN modelos mm ON hw.modelo_mon = mm.cod_modelo 
					INNER JOIN modelos mt ON hw.modelo_tec = mt.cod_modelo 
					INNER JOIN modelos mu ON hw.modelo_mau = mu.cod_modelo  
					INNER JOIN marcas re ON me.id_marca = re.cod_marca
					INNER JOIN marcas rm ON mm.id_marca = rm.cod_marca
					INNER JOIN marcas rt ON mt.id_marca = rt.cod_marca
					INNER JOIN marcas ru ON mu.id_marca = ru.cod_marca
					INNER JOIN nivel_impacto ni ON hw.id_nivel_imp = ni.cod_nivel_impacto	
					INNER JOIN responsables res ON hw.id_responsable= res.cod_responsable  
					INNER JOIN asignados asi ON hw.id_asignado= asi.cod_asignado          
					INNER JOIN ubicaciones ub ON hw.id_ubicacion = ub.cod_ubicacion	         
					INNER JOIN pisos pss ON ub.id_piso = pss.cod_piso	         
					INNER JOIN puestos pst ON ub.id_puesto= pst.cod_puesto          
					INNER JOIN areas ar ON ub.id_area= ar.cod_area	         
					INNER JOIN campanas cp ON ub.id_campana= cp.cod_campana           
					INNER JOIN tipos_ubicaciones tpu ON ub.id_tipo_ubicacion = tpu.cod_tipo_ubicacion	         
					INNER JOIN sedes sd ON cp.id_sede= sd.cod_sede	         
					INNER JOIN ciudades ci ON sd.id_ciudad= ci.cod_ciudad	         
					INNER JOIN paises pa ON ci.id_pais= pa.cod_pais	 	          
					WHERE cod_sede = ? AND hw.estado = 1 AND cod_campana = ?`
	db.query(consulta, params, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api_query_campana_ubica/:id_sede/:id_campana', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var params = [req.params.id_sede, req.params.id_campana]
	
	var consulta1 = null

	var consulta = `select nombre_pais, cod_sede, nombre_ciudad, nombre_sede, cod_campana, nombre_campana, nombre_area, nom_tp_ubicacion, nombre_piso, num_puesto, cod_ubicacion
									from ubicaciones ubs
									inner join pisos pi on ubs.id_piso= pi.cod_piso
									   inner join puestos pt on ubs.id_puesto= pt.cod_puesto
									   inner join campanas ca on ubs.id_campana= ca.cod_campana
									   inner join areas ar on ubs.id_area = ar.cod_area
									   inner join tipos_ubicaciones tu on ubs.id_tipo_ubicacion = tu.cod_tipo_ubicacion
									   inner join sedes sd on ca.id_sede = sd.cod_sede
									   inner join ciudades ci on sd.id_ciudad = ci.cod_ciudad
									   inner join paises pa on ci.id_pais = pa.cod_pais
									where cod_sede= ?   
									and ubs.id_campana = ?
									and ubs.estado = 1
									order by nombre_campana, nombre_piso, nom_tp_ubicacion, num_puesto`
	db.query(consulta, params, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api_query_ciudad/:id_ciudad', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var id_ciudad = req.params.id_ciudad

	var consulta1 = null

	var consulta = `SELECT cod_activo_hw, nombre_pais, nombre_ciudad, nombre_sede, nombre_campana, ceco, 
					nombre_area,id_ubicacion,       nom_tp_ubicacion, nombre_piso, num_puesto, modelo_equi, modelo_mon, nombre_tipo_equip, 
					cpu, ram, hdd,  CONCAT(nombre_piso, ' - Puesto ', num_puesto) AS ubica1, 
					me.nombre_modelo AS modelo_equi,
					mm.nombre_modelo AS modelo_mon, 
					mt.nombre_modelo AS modelo_tec, 
					mu.nombre_modelo AS modelo_mau, 
					re.nombre_marca AS marca_equi,
					rm.nombre_marca AS marca_mon, 
					rt.nombre_marca AS marca_tec, 
					ru.nombre_marca AS marca_mau, 
					host_name, ip, nombre_resp, nombre_asignado,
					serial_equipo, num_activo_equi, serial_mon, num_activo_mon, serial_tec, serial_mou, id_os, nombre_os, nombre_propietario,
					tk, ultima_mod, cod_nivel_impacto, nombre_nivel_imp, cod_tipo_equipo, me.cod_modelo AS cod_modelo_equi, mm.cod_modelo AS cod_modelo_mon, mt.cod_modelo AS cod_modelo_tec, mu.cod_modelo AS cod_modelo_mou,
					cod_propietario, cod_asignado, cod_responsable,
					hw.estado
					FROM   activos_hw hw   INNER JOIN propietarios pr ON hw.id_propietario= pr.cod_propietario	         
					INNER JOIN os ON hw.id_os=os.cod_os	         
					INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo	
					INNER JOIN modelos me ON hw.modelo_equi = me.cod_modelo
					INNER JOIN modelos mm ON hw.modelo_mon = mm.cod_modelo 
					INNER JOIN modelos mt ON hw.modelo_tec = mt.cod_modelo 
					INNER JOIN modelos mu ON hw.modelo_mau = mu.cod_modelo  
					INNER JOIN marcas re ON me.id_marca = re.cod_marca
					INNER JOIN marcas rm ON mm.id_marca = rm.cod_marca
					INNER JOIN marcas rt ON mt.id_marca = rt.cod_marca
					INNER JOIN marcas ru ON mu.id_marca = ru.cod_marca
					INNER JOIN nivel_impacto ni ON hw.id_nivel_imp = ni.cod_nivel_impacto	
					INNER JOIN responsables res ON hw.id_responsable= res.cod_responsable  
					INNER JOIN asignados asi ON hw.id_asignado= asi.cod_asignado          
					INNER JOIN ubicaciones ub ON hw.id_ubicacion = ub.cod_ubicacion	         
					INNER JOIN pisos pss ON ub.id_piso = pss.cod_piso	         
					INNER JOIN puestos pst ON ub.id_puesto= pst.cod_puesto          
					INNER JOIN areas ar ON ub.id_area= ar.cod_area	         
					INNER JOIN campanas cp ON ub.id_campana= cp.cod_campana           
					INNER JOIN tipos_ubicaciones tpu ON ub.id_tipo_ubicacion = tpu.cod_tipo_ubicacion	         
					INNER JOIN sedes sd ON cp.id_sede= sd.cod_sede	         
					INNER JOIN ciudades ci ON sd.id_ciudad= ci.cod_ciudad	         
					INNER JOIN paises pa ON ci.id_pais= pa.cod_pais	           
					WHERE cod_ciudad = ? AND hw.estado = 1`
		db.query(consulta, id_ciudad, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api_query_ciudad_ubica/:id_ciudad', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var id_ciudad = req.params.id_ciudad
	var consulta1 = null

	var consulta = `select cod_ubicacion, nombre_pais, cod_sede, nombre_ciudad, nombre_sede, cod_campana, nombre_campana, nombre_area, nom_tp_ubicacion, nombre_piso, num_puesto, cod_ubicacion
									from ubicaciones ubs
									inner join pisos pi on ubs.id_piso= pi.cod_piso
									   inner join puestos pt on ubs.id_puesto= pt.cod_puesto
									   inner join campanas ca on ubs.id_campana= ca.cod_campana
									   inner join areas ar on ubs.id_area = ar.cod_area
									   inner join tipos_ubicaciones tu on ubs.id_tipo_ubicacion = tu.cod_tipo_ubicacion
									   inner join sedes sd on ca.id_sede = sd.cod_sede
									   inner join ciudades ci on sd.id_ciudad = ci.cod_ciudad
									   inner join paises pa on ci.id_pais = pa.cod_pais
									where ci.cod_ciudad = ?  and ubs.estado = 1
									order by nombre_sede, nombre_campana, nombre_piso, num_puesto;`
	db.query(consulta, id_ciudad, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-ciudad/:id_ciudad', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id = req.params.id_ciudad

	var consulta = "SELECT * FROM sedes where id_ciudad = ? and estado = 1 order by nombre_sede"
	db.query(consulta, id, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-sede/:id_sede', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id = req.params.id_sede

	var consulta = "SELECT * FROM campanas where id_sede = ? and estado = 1 order by nombre_campana"
	db.query(consulta, id, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-prod/:id_prod', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta = null
	var id = req.params.id_prod

	var consulta = "SELECT nombre_pais, nombre_ciudad, nombre_sede, nombre_campana, ceco, nombre_area, nombre_piso, 	cpu, ram, hdd, num_puesto, nombre_tipo_equip, nombre_marca, nombre_modelo, host_name, ip, serial_equipo, num_activo_equi, serial_mon, num_activo_mon,serial_tec, serial_mou, nombre_os, nombre_propietario FROM activos_hw hw INNER JOIN propietarios pr ON hw.`id_propietario`=pr.`cod_propietario` INNER JOIN os ON hw.`id_os`=os.`cod_os`	INNER JOIN tipos_equipo tpe ON hw.`id_tipo_equipo`= tpe.`cod_tipo_equipo` INNER JOIN modelos mdl ON hw.`modelo_equi` = mdl.`cod_modelo`	 INNER JOIN marcas mc ON mdl.`id_marca`=mc.`cod_marca`	INNER JOIN ubicaciones ub ON hw.`id_ubicacion` = ub.`cod_ubicacion` INNER JOIN puestos pst ON ub.`id_puesto`= pst.`cod_puesto`	 INNER JOIN pisos ps ON ub.`id_piso`= ps.`cod_piso` INNER JOIN areas ar ON ub.`id_area`= ar.`cod_area` INNER JOIN campanas cp ON ub.`id_campana`= cp.`cod_campana` INNER JOIN sedes sd ON cp.`id_sede`= sd.`cod_sede`	INNER JOIN ciudades ci ON sd.`id_ciudad`= ci.`cod_ciudad` INNER JOIN paises pa ON ci.`id_pais`= pa.`cod_pais` WHERE cod_activo_hw = ? and hw.estado = 1"
	db.query(consulta, id, function(err, rows, fields){
		if(err) throw err
		consulta = rows
		db.end()
  res.json( {data : consulta})
  })
})

router.get('/api-marcas', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT cod_marca, nombre_marca FROM marcas WHERE estado = 1 order by nombre_marca"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-pisos', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.pisos  where estado = 1 order by nombre_piso"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-puestos', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.puestos where estado = 1 order by num_puesto"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-tipoEquipo', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.tipos_equipo where estado = 1 order by nombre_tipo_equip"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-campana', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	// var idSede = req.params.id_sede

	var consulta = `SELECT  id_ciudad, nombre_ciudad, id_sede, nombre_sede, cod_campana, id_sede, nombre_campana, ceco FROM campanas cp
					inner join sedes sd ON cp.id_sede = sd.cod_sede
					inner join ciudades ci ON sd.id_ciudad = ci.cod_ciudad
					where cp.estado = 1
					order by nombre_ciudad, nombre_sede, nombre_campana`
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-modelos/:id_marca', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id = req.params.id_marca

	var consulta = "SELECT cod_modelo, id_marca, nombre_modelo FROM modelos WHERE estado = 1 AND id_marca = ? order by nombre_modelo"
	db.query(consulta, id, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-propietarios', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT cod_propietario, nombre_propietario FROM propietarios WHERE estado = 1 order by nombre_propietario"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-pais/:id_pais', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var id_pais = req.params.id_pais
	var consulta1 = null

	var consulta = "SELECT * from ciudades WHERE id_pais = ? and estado = 1 order by nombre_ciudad"
	db.query(consulta, id_pais, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-paises', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * from ciudades where estado = 1 order by nombre_ciudad"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-paisesComdata', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.paises WHERE estado = 1 order by nombre_pais"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-os', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.os where estado = 1 order by nombre_os"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-office', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.office where estado = 1 order by nombre_office"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-programas', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM programas where estado = 1 order by nombre_programa"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-nivelI', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null

	var consulta = "SELECT * FROM inventario_latam.nivel_impacto where estado = 1"
	db.query(consulta, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-puesto/:id_campana', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var id_campana = req.params.id_campana
	var consulta1 = null

	var consulta = `select CONCAT(nombre_piso, ' - ', num_puesto) as Ubicacion, cod_ubicacion
									from ubicaciones ub
									inner join campanas cp on ub.id_campana=cp.cod_campana
									inner join pisos pi on ub.id_piso = pi.cod_piso
									inner join puestos pt on ub.id_puesto = pt.cod_puesto    
									where ub.id_campana =  ?
									and ub.estado = 1
									order by ubicacion DESC`
	db.query(consulta, id_campana, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-tiposU/:id_area', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id_area = req.params.id_area

	var consulta = `SELECT * FROM inventario_latam.tipos_ubicaciones where id_area = ? and estado = 1 order by nom_tp_ubicacion`
	db.query(consulta, id_area, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-software/:id_activo_hw', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id_activo_hw = req.params.id_activo_hw

	var consulta = `SELECT sw.cod_activo_sw, sw.id_activo_hw, sw.id_office, of.nombre_office, sw.id_programa, pr.nombre_programa, sw.estado
					FROM activos_sw sw
					INNER JOIN office of ON sw.id_office = of.cod_office
					INNER JOIN programas pr ON  sw.id_programa = pr.cod_programa
					WHERE sw.estado = 1 AND id_activo_hw = ?`
	db.query(consulta, id_activo_hw, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-perifericos/:id_activo_hw', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id_activo_hw = req.params.id_activo_hw

	var consulta = `select cod_periferico, id_activo_hw, nombre_periferico, nombre_tipo_equip, id_model, nombre_modelo, serial_perif, num_activo_perif 
				from perifericos pr 
				inner join modelos md on pr.id_model = md.cod_modelo
				inner join tipos_equipo te on pr.nombre_periferico = te.cod_tipo_equipo
				inner join activos_hw hw on pr.id_activo_hw = hw.cod_activo_hw
				where id_activo_hw = ? and pr.estado = 1`
	db.query(consulta, id_activo_hw, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-asignados/:id_sede', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id_sede = req.params.id_sede

	var consulta = `SELECT * FROM asignados
					where id_pais = ? and estado = 1
					order by nombre_asignado`
	db.query(consulta, id_sede, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-responsable/:id_sede', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var id_sede = req.params.id_sede

	var consulta = `SELECT * FROM inventario_latam.responsables
					where id_pais = ? and estado = 1 
					order by nombre_resp`
	db.query(consulta, id_sede, function(err, rows, fields){
		if(err) throw err
		consulta1 = rows
		db.end()
  res.json( {data : consulta1})
  })
})

router.get('/api-movipendiente', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var consulta1 = null
	var ciudadUser = req.user.idCiudad
	var perfilUser = req.user.perfil

	if (perfilUser == 'administrador')
	{
		var consulta = `SELECT cod_movimiento, id_activo_hw, id_tpo_equipo, nombre_tipo_equip, id_propietario, id_responsable, id_asignado, id_nivel_impacto, id_os, 
					host_name, ip, nombre_marca, nombre_modelo, id_modelo, serial_equipo, num_activo_equi, cpu, ram, hdd, tk, ultima_mod, hw.estado, hw.id_ciudad, nombre_ciudad, nombre_sede
					FROM movimientos_hw hw
					INNER JOIN tipos_equipo tpe ON hw.id_tpo_equipo = tpe.cod_tipo_equipo
					INNER JOIN modelos md ON hw.id_modelo = md.cod_modelo
					INNER JOIN marcas mc ON md.id_marca = mc.cod_marca
					INNER JOIN ciudades ci ON hw.id_ciudad = ci.cod_ciudad
                    INNER JOIN ubicaciones ubi ON hw.id_ubicacion = ubi.cod_ubicacion
                    INNER JOIN campanas cam ON ubi.id_campana = cam.cod_campana
                    INNER JOIN sedes sed ON cam.id_sede = sed.cod_sede
					WHERE hw.estado = 1`
		db.query(consulta, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
	  		res.json( {data : consulta1})
	  	})
	}
	else
	{
		var consulta = `SELECT cod_movimiento, id_activo_hw, id_tpo_equipo, nombre_tipo_equip, id_propietario, id_responsable, id_asignado, id_nivel_impacto, id_os, 
					host_name, ip, nombre_marca, nombre_modelo, id_modelo, serial_equipo, num_activo_equi, cpu, ram, hdd, tk, ultima_mod, hw.estado, hw.id_ciudad, nombre_ciudad, nombre_sede
					FROM movimientos_hw hw
					INNER JOIN tipos_equipo tpe ON hw.id_tpo_equipo = tpe.cod_tipo_equipo
					INNER JOIN modelos md ON hw.id_modelo = md.cod_modelo
					INNER JOIN marcas mc ON md.id_marca = mc.cod_marca
					INNER JOIN ciudades ci ON hw.id_ciudad = ci.cod_ciudad
                    INNER JOIN ubicaciones ubi ON hw.id_ubicacion = ubi.cod_ubicacion
                    INNER JOIN campanas cam ON ubi.id_campana = cam.cod_campana
                    INNER JOIN sedes sed ON cam.id_sede = sed.cod_sede
					WHERE hw.id_ciudad = ` +  ciudadUser + ` AND hw.estado = 1`
		db.query(consulta, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
	  		res.json( {data : consulta1})
	  	})
	}
})

//////////////////////////////////////////////////////////

router.post('/traslado-cpu/:id_activo_hw/:id_activo_ori/:id_movimiento/:id_vacio', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var idHwDestino = req.params.id_activo_hw
	var idHwOrigen = req.params.id_activo_ori
	var idHwMovimiento = req.params.id_movimiento
	var idHwVacio = req.params.id_vacio
	var ciudadUser = req.user.idCiudad
	var ticket = req.body.tk
	console.log(ticket)
	
	var articuloEdit = {
		id_tipo_equipo : req.body.id_tipo_equipo ,  
		id_propietario : req.body.id_propietario ,  
		id_responsable : req.body.id_responsable ,  
		id_asignado : req.body.id_asignado , 
		id_nivel_imp : req.body.id_nivel_imp ,  
		id_os : req.body.id_os ,  
		host_name : req.body.host_name , 
		ip : req.body.ip , 
		modelo_equi : req.body.modelo_equi ,  
		serial_equipo : req.body.serial_equipo , 
		num_activo_equi : req.body.num_activo_equi , 
		cpu : req.body.cpu , 
		ram : req.body.ram , 
		hdd : req.body.hdd , 
		tk : req.body.tk , 
		ultima_mod : req.body.ultima_mod , 
		estado : req.body.estado
	}

	var clearorigen = {
		id_tipo_equipo : 76 ,  
		id_os : 7 ,  
		host_name : "N/A" , 
		ip : "N/A" , 
		modelo_equi : 508 ,  
		serial_equipo : "N/A" , 
		num_activo_equi : "N/A" , 
		cpu : "N/A" , 
		ram : "N/A" , 
		hdd : "N/A" 
	}


	if (idHwVacio == 'X')
	{
		console.log('Insert Movimientos')
		db.query(`INSERT INTO movimientos_hw (id_activo_hw, id_tpo_equipo, id_propietario, id_responsable, id_asignado, id_nivel_impacto, id_os,
					host_name, ip, id_modelo, serial_equipo, num_activo_equi, cpu, ram, hdd, tk, ultima_mod, estado, id_ciudad, id_ubicacion) 
					SELECT  hw.cod_activo_hw, tpe.cod_tipo_equipo, pr.cod_propietario, res.cod_responsable, asg.cod_asignado, nvi.cod_nivel_impacto,
					 os.cod_os,host_name, ip,mdl.cod_modelo, serial_equipo, num_activo_equi, cpu,
					 ram, hdd, '` + ticket + `', ultima_mod, 1,`+ ciudadUser +`, id_ubicacion
					FROM activos_hw hw
					INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo
					INNER JOIN propietarios pr ON hw.id_propietario= pr.cod_propietario
					INNER JOIN responsables res ON hw.id_responsable= res.cod_responsable
					INNER JOIN asignados asg ON hw.id_asignado= asg.cod_asignado
					INNER JOIN nivel_impacto nvi ON hw.id_nivel_imp= nvi.cod_nivel_impacto
					INNER JOIN os ON hw.id_os= os.cod_os
					INNER JOIN modelos mdl ON hw.modelo_equi= mdl.cod_modelo
					WHERE hw.cod_activo_hw = ? AND hw.estado = 1`, idHwDestino, function(err, rows, fields){
			if(err) {
				db.end()	
				console.log(err)
				var msg = 'Se produjo un error al realizar el traslado.(Insert movimientos_hw)'
				res.json({ data: msg, error: err})
			}
			else{
				console.log('Update Activos con PC Origen')
				db.query(`UPDATE  activos_hw SET ? WHERE ?`, [articuloEdit, {cod_activo_hw : req.params.id_activo_hw}], function(err, rows, fields){
					if(err) {
						db.end()	
						console.log(err)
						var msg = 'Se produjo un error al realizar el traslado. (Update activos_hw)'
						res.json({ data: msg, error: err})
					}
					else{
						console.log('Update Activos con Limpiar PC Origen')
						db.query(`UPDATE  activos_hw SET ? WHERE ?`, [clearorigen, {cod_activo_hw : req.params.id_activo_ori}], function(err, rows, fields){
							if(err) {
								db.end()	
								console.log(err)
								var msg = 'Se produjo un error al realizar el traslado. (Clear activos_hw Origen)'
								res.json({ data: msg, error: err})
							}
							else{
								if(idHwMovimiento != 'X')
								{
									console.log('Update movimientos con estado 0')
									db.query(`UPDATE movimientos_hw SET estado = 0 WHERE cod_movimiento = ?`, idHwMovimiento, function(err, rows, fields){
										if(err) {
											db.end()	
											console.log(err)
											var msg = 'Se produjo un error al realizar el traslado. (Delete Movimientos Temp )'
											res.json({ data: msg, error: err})
										}
										else{
											db.end()
											console.log('fin idHwMovimiento diferente de X')	
											var msg = 'Articulo Trasladado Correctamente.'
											var msg2 = {code : 'Exito', sqlMessage: ''}
											res.json({ data: msg, error: msg2})
										}
									})
								}
								else{
									db.end()	
									console.log('fin idHwMovimiento es X')	
									var msg = 'Articulo Trasladado Correctamente.'
									var msg2 = {code : 'Exito', sqlMessage: ''}
									res.json({ data: msg, error: msg2})
								}
							}
						})
					}
				})
			}
		})
	}
	else{
		console.log('No inserta en movimientos y hace update directamente')
		db.query(`UPDATE  activos_hw SET ? WHERE ?`, [articuloEdit, {cod_activo_hw : req.params.id_activo_hw}], function(err, rows, fields){
			if(err) {
				db.end()	
				console.log(err)
				var msg = 'Se produjo un error al realizar el traslado. (Update activos_hw)'
				res.json({ data: msg, error: err})
			}
			else{
				db.query(`UPDATE  activos_hw SET ? WHERE ?`, [clearorigen, {cod_activo_hw : req.params.id_activo_ori}], function(err, rows, fields){
					if(err) {
						db.end()	
						console.log(err)
						var msg = 'Se produjo un error al realizar el traslado. (Clear activos_hw Origen)'
						res.json({ data: msg, error: err})
					}
					else{
						if(idHwMovimiento != 'X')
						{
							db.query(`UPDATE movimientos_hw SET estado = 0 WHERE cod_movimiento = ?`, idHwMovimiento, function(err, rows, fields){
								if(err) {
									db.end()	
									console.log(err)
									var msg = 'Se produjo un error al realizar el traslado. (Delete Movimientos Temp )'
									res.json({ data: msg, error: err})
								}
								else{
									db.end()	
									var msg = 'Articulo Trasladado Correctamente.'
									var msg2 = {code : 'Exito', sqlMessage: ''}
									res.json({ data: msg, error: msg2})
								}
							})
						}
						else{
							db.end()	
							var msg = 'Articulo Trasladado Correctamente.'
							var msg2 = {code : 'Exito', sqlMessage: ''}
							res.json({ data: msg, error: msg2})
						}
					}
				})
			}
		})
	}
})

//////////////////////////////////////////////////////////

router.post('/Traslado/:id_activo_hw/:id_puesto', function(req, res, next) {
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var puesto = {id_ubicacion: req.params.id_puesto}

	db.query('UPDATE activos_hw SET ? WHERE ? ', [puesto, {cod_activo_hw : req.params.id_activo_hw}], function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al realizar el traslado.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Articulo Trasladado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/Editar/:id_activohw', function(req, res, next){
	var fechaActual = new Date()
	var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

	var articuloEdit = {
		id_tipo_equipo: req.body.id_tipo_equipo,
		id_propietario: req.body.id_propietario,
		id_responsable: req.body.id_responsable,
		id_asignado: req.body.id_asignado,
		id_os: req.body.id_os,
		host_name: req.body.host_name,
		ip: req.body.ip,
		modelo_equi: req.body.modelo_equi,  
		serial_equipo: req.body.serial_equipo,
		num_activo_equi: req.body.num_activo_equi,
		modelo_mon: req.body.modelo_mon,
		serial_mon: req.body.serial_mon,
		num_activo_mon: req.body.num_activo_mon,
		modelo_tec: req.body.modelo_tec,
		serial_tec: req.body.serial_tec,
		modelo_mau: req.body.modelo_mau,
		serial_mou: req.body.serial_mou,
		cpu: req.body.cpu,
		ram: req.body.ram,
		hdd: req.body.hdd,
		tk: req.body.tk,
		id_nivel_imp: req.body.id_nivel_imp,
		ultima_mod: fechaA
	}

	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	db.query('UPDATE activos_hw SET ? WHERE ? ', [articuloEdit, {cod_activo_hw : req.params.id_activohw}], function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al editar el articulo.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Articulo Modificado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/edit-ubicacion/:id_ubicacion', function(req, res, next){

	var articuloEdit = {
		id_campana: req.body.id_campana
	}

	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	db.query('UPDATE ubicaciones SET ? WHERE ? ', [articuloEdit, {cod_ubicacion : req.params.id_ubicacion}], function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al asignar la ubicacion.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Ubicacion Modificada Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/Insertar', function(req, res, next){
	var fechaActual = new Date()
	var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

	var articuloInsert = {
		id_tipo_equipo: req.body.id_tipo_equipo,
		id_propietario: req.body.id_propietario,
		id_responsable: req.body.id_responsable,
		id_asignado: req.body.id_asignado,
		id_ubicacion: req.body.id_ubicacion,
		id_nivel_imp: req.body.id_nivel_imp,
		id_os: req.body.id_os,
		host_name: req.body.host_name,
		ip: req.body.ip,
	  	modelo_equi: req.body.modelo_equi,  
		serial_equipo: req.body.serial_equipo,
		num_activo_equi: req.body.num_activo_equi,
		modelo_mon: req.body.modelo_mon,
		serial_mon: req.body.serial_mon,
		num_activo_mon: req.body.num_activo_mon,
		modelo_tec: req.body.modelo_tec,
		serial_tec: req.body.serial_tec,
		modelo_mau: req.body.modelo_mou,
		serial_mou: req.body.serial_mou,
		cpu: req.body.cpu,
		ram: req.body.ram,
		hdd: req.body.hdd,
		tk: req.body.tk,
		fecha_a: req.body.fecha_a,
		ultima_mod: fechaA,
		estado: 1
	}

	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	db.query('INSERT INTO activos_hw SET ?', articuloInsert, function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err.code)
			console.log(err.sqlMessage)
			var msg = 'Se produjo un error al Insertar el articulo.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Articulo Ingresado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/InsertarSoftware', function(req, res, next){
	var fechaActual = new Date()
	var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

	var softwareInsert = {
		id_activo_hw: req.body.id_activo_hw,
		id_office: req.body.id_office,
		id_programa: req.body.id_programa,
		estado: 1
	}

	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	db.query('INSERT INTO activos_sw SET ?', softwareInsert, function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err.code)
			console.log(err.sqlMessage)
			var msg = 'Se produjo un error al Ingresar el software.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Software Ingresado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/InsertarPeriferico', function(req, res, next){
	var fechaActual = new Date()
	var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

	var PerifericoInsert = {
		id_activo_hw: req.body.id_activo_hw,
		id_model: req.body.id_model,
		nombre_periferico: req.body.nombre_periferico,
		serial_perif: req.body.serial_perif,
		num_activo_perif: req.body.num_activo_perif,
		estado: 1
	}

	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	db.query('INSERT INTO perifericos SET ?', PerifericoInsert, function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err.code)
			console.log(err.sqlMessage)
			var msg = 'Se produjo un error al Ingresar el Periferico.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Periferico Ingresado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/InsertarUbica', function(req, res, next){

	var articuloInsert = {
		id_piso: req.body.id_piso,
		id_puesto: req.body.id_puesto,
		id_campana: req.body.id_campana,
		id_area: req.body.id_area,
		id_tipo_ubicacion: req.body.id_tipo_ubicacion,
		estado: req.body.estado
	}

	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	db.query('INSERT INTO ubicaciones SET ?', articuloInsert, function(err, rows, fields){
		if(err) {
			db.end()	
			console.log(err.code)
			console.log(err.sqlMessage)
			var msg = 'Se produjo un error al Insertar la ubicacion.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Ubicacion Ingresado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/eliminarA/:id_activohw', function(req, res, next){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var fechaActual = new Date()
	var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

	var params = [fechaA, req.params.id_activohw]

	db.query('UPDATE activos_hw SET estado = 0, fecha_b = ? WHERE cod_activo_hw = ?', params, function(err, rows, fields){
		console.log(this.sql)
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al eliminar el articulo.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Articulo Eliminado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/eliminarSoftware/:id_activosw', function(req, res, next){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var codigoEquipo =  req.params.id_activosw
	console.log(req.params)

	db.query('UPDATE activos_sw SET estado  = 0 WHERE cod_activo_sw = ?', codigoEquipo, function(err, rows, fields){
		console.log(this.sql)
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al eliminar el articulo.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Articulo Eliminado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/eliminarPerifericos/:id_activohw', function(req, res, next){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var codigoEquipo =  req.params.id_activohw

	db.query('UPDATE perifericos SET estado  = 0 WHERE cod_periferico = ?', codigoEquipo, function(err, rows, fields){
		console.log(this.sql)
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al eliminar el Periferico.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Periferico Eliminado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.post('/eliminarU/:cod_ubicacion', function(req, res, next){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var codigoUbicacion =  req.params.cod_ubicacion

	db.query('UPDATE ubicaciones SET estado  = 0 WHERE cod_ubicacion = ?', codigoUbicacion, function(err, rows, fields){
		console.log(this.sql)
		if(err) {
			db.end()	
			console.log(err)
			var msg = 'Se produjo un error al eliminar la ubicacion.'
			res.json({ data: msg, error: err})
		}
		else{
			db.end()	
			var msg = 'Ubicacion Eliminado Correctamente.'
			var msg2 = {code : 'Exito', sqlMessage: ''}
			res.json({ data: msg, error: msg2})

		}
	})
})

//////////////////////////////////////////////////////////

router.get('/reporte_sede/:id_sede',function(req,res){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()
	// console.log('in')
	// {	caption:'Codigo', type:'number', width:3 },

	var conf={}
  conf.cols=[
  	  {	caption:'Numero', type:'number', width:3 },
      {	caption:'Pais', type:'string', width:50 },
      { caption:'Ciudad', type:'string', width:15 },
      {	caption:'Sede', type:'string', width:3 },
      {	caption:'CECO', type:'string', width:3 },
      {	caption:'Campaña', type:'string', width:3 },
      {	caption:'Piso', type:'string', width:3 },
      {	caption:'Puesto', type:'string', width:3 },
      {	caption:'Tipo Equipo', type:'string', width:3 },
      {	caption:'Marca', type:'string', width:3 },
      {	caption:'CPU', type:'string', width:3 },
      {	caption:'RAM', type:'string', width:3 },
      {	caption:'HDD', type:'string', width:3 },
      {	caption:'Modelo', type:'string', width:3 },
      {	caption:'Serial Equipo', type:'string', width:3 },
      {	caption:'Numero Activo Equipos', type:'string', width:3 },
      {	caption:'Serial Monitor', type:'string', width:3 },
      {	caption:'Numero Activo Monitor', type:'string', width:3 },
      {	caption:'Serial Teclado', type:'string', width:3 },
      {	caption:'Serial Mouse', type:'string', width:3 },
      {	caption:'Sistema Operativo', type:'string', width:3 },
      {	caption:'Propietario', type:'string', width:3 },
      {	caption:'Asignado', type:'string', width:3 },
      {	caption:'Responsable', type:'string', width:3 }
  ];

  var idSede =  req.params.id_sede

	var consulta = `SELECT cod_activo_hw, nombre_pais, nombre_ciudad, nombre_sede, nombre_campana, ceco, nombre_area, nom_tp_ubicacion, nombre_piso, 
		num_puesto, nombre_tipo_equip, nombre_marca, cpu, ram, hdd, nombre_modelo, host_name, ip, serial_equipo, num_activo_equi, 
		serial_mon, num_activo_mon, serial_tec, serial_mou, nombre_os, nombre_propietario , nombre_asignado, nombre_resp
		FROM activos_hw hw 		   
		INNER JOIN propietarios pr ON hw.id_propietario = pr.cod_propietario	           
        INNER JOIN responsables rp ON hw.id_responsable = rp.cod_responsable
		INNER JOIN asignados asg ON hw.id_responsable = asg.cod_asignado
		INNER JOIN os ON hw.id_os=os.cod_os	           
		INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo	           
		INNER JOIN modelos mdl ON hw.modelo_equi = mdl.cod_modelo	           
		INNER JOIN marcas mc ON mdl.id_marca=mc.cod_marca	           
		INNER JOIN ubicaciones ub ON hw.id_ubicacion = ub.cod_ubicacion	           
		INNER JOIN pisos pss ON ub.id_piso = pss.cod_piso	           
		INNER JOIN puestos pst ON ub.id_puesto= pst.cod_puesto	           
		INNER JOIN areas ar ON ub.id_area= ar.cod_area	           
		INNER JOIN campanas cp ON ub.id_campana= cp.cod_campana 	           
		INNER JOIN tipos_ubicaciones tpu ON ub.id_tipo_ubicacion = tpu.cod_tipo_ubicacion	           
		INNER JOIN sedes sd ON cp.id_sede= sd.cod_sede	           
		INNER JOIN ciudades ci ON sd.id_ciudad= ci.cod_ciudad	           
		INNER JOIN paises pa ON ci.id_pais= pa.cod_pais	           
		WHERE cod_sede = ? AND hw.estado = 1`
	db.query(consulta, idSede, function(err, rows, fields){
		if(err) throw err
		var arr=[];
    for(i=0;i<rows.length;i++){
    	// job=rows[i].cod_persona;
      // a=[i+1,job,(dateFormat(rows[i].add_date*1000, "dd/mm/yyyy"))];
      a=[
      	i+1,
      	rows[i].nombre_pais,
      	rows[i].nombre_ciudad,
      	rows[i].nombre_sede,
      	rows[i].ceco,
      	rows[i].nombre_campana,
      	rows[i].nombre_piso,
      	rows[i].num_puesto,
      	rows[i].nombre_tipo_equip,
      	rows[i].nombre_marca,
      	rows[i].cpu,
      	rows[i].ram,
      	rows[i].hdd,
      	rows[i].nombre_modelo,
      	rows[i].serial_equipo,
      	rows[i].num_activo_equi,
      	rows[i].serial_mon,
      	rows[i].num_activo_mon,
      	rows[i].serial_tec,
      	rows[i].serial_mou,
      	rows[i].nombre_os,
      	rows[i].nombre_propietario,
      	rows[i].nombre_asignado,
      	rows[i].nombre_resp
      ];
      arr.push(a);
    }
		conf.rows=arr;

		db.end()
	  var result=nodeExcel.execute(conf);
	  res.setHeader('Content-Type','application/vnd.openxmlformates');
	  res.setHeader("Content-Disposition","attachment;filename="+"Reporte_Sede.xlsx");
	  res.end(result,'binary');
  })
});

//////////////////////////////////////////////////////////

router.get('/reporte_campana/:id_sede/:id_campana',function(req,res){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()
	// console.log('in')
	// {	caption:'Codigo', type:'number', width:3 },

	var conf={}
  conf.cols=[
  		{	caption:'Numero', type:'number', width:3 },
      {	caption:'Pais', type:'string', width:50 },
      { caption:'Ciudad', type:'string', width:15 },
      {	caption:'Sede', type:'string', width:3 },
      {	caption:'CECO', type:'string', width:3 },
      {	caption:'Campaña', type:'string', width:3 },
      {	caption:'Piso', type:'string', width:3 },
      {	caption:'Puesto', type:'string', width:3 },
      {	caption:'Tipo Equipo', type:'string', width:3 },
      {	caption:'Marca', type:'string', width:3 },
      {	caption:'CPU', type:'string', width:3 },
      {	caption:'RAM', type:'string', width:3 },
      {	caption:'HDD', type:'string', width:3 },
      {	caption:'Modelo', type:'string', width:3 },
      {	caption:'Serial Equipo', type:'string', width:3 },
      {	caption:'Numero Activo Equipos', type:'string', width:3 },
      {	caption:'Serial Monitor', type:'string', width:3 },
      {	caption:'Numero Activo Monitor', type:'string', width:3 },
      {	caption:'Serial Teclado', type:'string', width:3 },
      {	caption:'Serial Mouse', type:'string', width:3 },
      {	caption:'Sistema Operativo', type:'string', width:3 },
      {	caption:'Propietario', type:'string', width:3 },
      {	caption:'Asignado', type:'string', width:3 },
      {	caption:'Responsable', type:'string', width:3 }
  ];

  var params = [req.params.id_sede, req.params.id_campana]

	var consulta = `SELECT cod_activo_hw, nombre_pais, nombre_ciudad, nombre_sede, nombre_campana, ceco, nombre_area, nom_tp_ubicacion, nombre_piso, 
		num_puesto, nombre_tipo_equip, nombre_marca, cpu, ram, hdd, nombre_modelo, host_name, ip, serial_equipo, num_activo_equi, 
		serial_mon, num_activo_mon, serial_tec, serial_mou, nombre_os, nombre_propietario , nombre_asignado, nombre_resp
		FROM activos_hw hw 		   
		INNER JOIN propietarios pr ON hw.id_propietario = pr.cod_propietario	           
        INNER JOIN responsables rp ON hw.id_responsable = rp.cod_responsable
		INNER JOIN asignados asg ON hw.id_responsable = asg.cod_asignado
		INNER JOIN os ON hw.id_os=os.cod_os	           
		INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo	           
		INNER JOIN modelos mdl ON hw.modelo_equi = mdl.cod_modelo	           
		INNER JOIN marcas mc ON mdl.id_marca=mc.cod_marca	           
		INNER JOIN ubicaciones ub ON hw.id_ubicacion = ub.cod_ubicacion	           
		INNER JOIN pisos pss ON ub.id_piso = pss.cod_piso	           
		INNER JOIN puestos pst ON ub.id_puesto= pst.cod_puesto	           
		INNER JOIN areas ar ON ub.id_area= ar.cod_area	           
		INNER JOIN campanas cp ON ub.id_campana= cp.cod_campana 	           
		INNER JOIN tipos_ubicaciones tpu ON ub.id_tipo_ubicacion = tpu.cod_tipo_ubicacion	           
		INNER JOIN sedes sd ON cp.id_sede= sd.cod_sede	           
		INNER JOIN ciudades ci ON sd.id_ciudad= ci.cod_ciudad	           
		INNER JOIN paises pa ON ci.id_pais= pa.cod_pais	          
		WHERE cod_sede = ? AND cod_campana = ? AND hw.estado = 1`
	db.query(consulta, params, function(err, rows, fields){
		if(err) throw err
		var arr=[];
    for(i=0;i<rows.length;i++){
    	// job=rows[i].cod_persona;
      // a=[i+1,job,(dateFormat(rows[i].add_date*1000, "dd/mm/yyyy"))];
      a=[
      	i+1,
      	rows[i].nombre_pais,
      	rows[i].nombre_ciudad,
      	rows[i].nombre_sede,
      	rows[i].ceco,
      	rows[i].nombre_campana,
      	rows[i].nombre_piso,
      	rows[i].num_puesto,
      	rows[i].nombre_tipo_equip,
      	rows[i].nombre_marca,
      	rows[i].cpu,
      	rows[i].ram,
      	rows[i].hdd,
      	rows[i].nombre_modelo,
      	rows[i].serial_equipo,
      	rows[i].num_activo_equi,
      	rows[i].serial_mon,
      	rows[i].num_activo_mon,
      	rows[i].serial_tec,
      	rows[i].serial_mou,
      	rows[i].nombre_os,
      	rows[i].nombre_propietario,
      	rows[i].nombre_asignado,
      	rows[i].nombre_resp
      ];
      arr.push(a);
    }
		conf.rows=arr;

		db.end()
	  var result=nodeExcel.execute(conf);
	  res.setHeader('Content-Type','application/vnd.openxmlformates');
	  res.setHeader("Content-Disposition","attachment;filename="+"Reporte-Campaña.xlsx");
	  res.end(result,'binary');
  })
});

//////////////////////////////////////////////////////////

router.get('/reporte_pais/:id_pais',function(req,res){
	var config = require('.././database/config')
	var db = mysql.createConnection(config)
	db.connect()

	var conf={}
  	conf.cols=[
  		{ caption:'Numero', type:'number', width:3 },
      	{ caption:'Pais', type:'string', width:50 },
      	{ caption:'Ciudad', type:'string', width:15 },
      	{ caption:'Sede', type:'string', width:3 },
      	{ caption:'CECO', type:'string', width:3 },
      	{ caption:'Campaña', type:'string', width:3 },
      	{ caption:'Area', type:'string', width:3 },
      	{ caption:'Tipo Ubicacion', type:'string', width:3 },
      	{ caption:'Piso', type:'string', width:3 },
      	{ caption:'Puesto', type:'string', width:3 },
      	{ caption:'Tipo Equipo', type:'string', width:3 },
      	{ caption:'Marca', type:'string', width:3 },
      	{ caption:'Modelo', type:'string', width:3 },
	    { caption:'Serial Equipo', type:'string', width:3 },
	    { caption:'Numero Activo Equipos', type:'string', width:3 },
      	{ caption:'CPU', type:'string', width:3 },
      	{ caption:'RAM', type:'string', width:3 },
	    { caption:'HDD', type:'string', width:3 },
	    { caption:'HostName', type:'string', width:3 },
	    { caption:'IP', type:'string', width:3 },
	    { caption:'Responsable', type:'string', width:3 },
	    { caption:'Asignado', type:'string', width:3 },
	    { caption:'Serial Activo Monitor', type:'string', width:3 },
	    { caption:'Numero Activo Monitor', type:'string', width:3 },
	    { caption:'Serial Teclado', type:'string', width:3 },
	    { caption:'Serial Mouse', type:'string', width:3 },
	    { caption:'Sistema Operativo', type:'string', width:3 },
	    { caption:'Propietario', type:'string', width:3 },
	    { caption:'Ticket', type:'string', width:3 },
	    { caption:'Fecha Ultima Modificacion', type:'string', width:3 },
	    { caption:'Nivel Impacto', type:'string', width:3 }
  	];

  	var idSede =  req.params.id_pais

	var consulta = `SELECT cod_activo_hw, nombre_pais, nombre_ciudad, nombre_sede, ceco, nombre_campana, 
		nombre_area,nom_tp_ubicacion, nombre_piso, num_puesto, nombre_tipo_equip, 
		nombre_marca, nombre_modelo, serial_equipo, num_activo_equi, cpu, ram, hdd,  host_name, ip, nombre_resp, nombre_asignado, 
		serial_mon, num_activo_mon, serial_tec, serial_mou, nombre_os, nombre_propietario, tk, ultima_mod, nombre_nivel_imp
		FROM   activos_hw hw   
		INNER JOIN propietarios pr ON hw.id_propietario= pr.cod_propietario	     
		INNER JOIN os ON hw.id_os=os.cod_os	         
		INNER JOIN tipos_equipo tpe ON hw.id_tipo_equipo= tpe.cod_tipo_equipo	         
		INNER JOIN modelos mdl ON hw.modelo_equi = mdl.cod_modelo           
		INNER JOIN marcas mc ON mdl.id_marca=mc.cod_marca
		INNER JOIN nivel_impacto ni ON hw.id_nivel_imp = ni.cod_nivel_impacto	
		INNER JOIN responsables res ON hw.id_responsable= res.cod_responsable  
		INNER JOIN asignados asi ON hw.id_asignado= asi.cod_asignado          
		INNER JOIN ubicaciones ub ON hw.id_ubicacion = ub.cod_ubicacion           
		INNER JOIN pisos pss ON ub.id_piso = pss.cod_piso	         
		INNER JOIN puestos pst ON ub.id_puesto= pst.cod_puesto	         
		INNER JOIN areas ar ON ub.id_area= ar.cod_area	         
		INNER JOIN campanas cp ON ub.id_campana= cp.cod_campana           
		INNER JOIN tipos_ubicaciones tpu ON ub.id_tipo_ubicacion = tpu.cod_tipo_ubicacion	         
		INNER JOIN sedes sd ON cp.id_sede= sd.cod_sede	         
		INNER JOIN ciudades ci ON sd.id_ciudad= ci.cod_ciudad	         
		INNER JOIN paises pa ON ci.id_pais= pa.cod_pais
		WHERE pa.cod_pais = ? AND hw.estado = 1
		ORDER BY nombre_piso, num_puesto DESC`
	db.query(consulta, idSede, function(err, rows, fields){
		if(err) throw err
		var arr=[];
	    for(i=0;i<rows.length;i++){

	    	a=[
		      	i+1,
		      	rows[i].nombre_pais,
		      	rows[i].nombre_ciudad,
		      	rows[i].nombre_sede,
		      	rows[i].ceco,
		      	rows[i].nombre_campana,
		      	rows[i].nombre_area,
		      	rows[i].nom_tp_ubicacion,
		      	rows[i].nombre_piso,
		      	rows[i].num_puesto,
		      	rows[i].nombre_tipo_equip,
		      	rows[i].nombre_marca,
		      	rows[i].nombre_modelo,
		      	rows[i].serial_equipo,
		      	rows[i].num_activo_equi,
		      	rows[i].cpu,
		      	rows[i].ram,
		      	rows[i].hdd,
		      	rows[i].host_name,
		      	rows[i].ip,
		      	rows[i].nombre_resp,
		      	rows[i].nombre_asignado,
		      	rows[i].serial_mon,
		      	rows[i].num_activo_mon,
		      	rows[i].serial_tec,
		      	rows[i].serial_mou,
		      	rows[i].nombre_os,
		      	rows[i].nombre_propietario,
		      	rows[i].tk,
		      	rows[i].ultima_mod,
		      	rows[i].nombre_nivel_imp
	      	];
	      	arr.push(a);
	    }
		conf.rows=arr;

		db.end()
	  	var result=nodeExcel.execute(conf);
	  	res.setHeader('Content-Type','application/vnd.openxmlformates');
	  	res.setHeader("Content-Disposition","attachment;filename="+"Reporte_Sede.xlsx");
	  	res.end(result,'binary');
  	})
});

//////////////////////////////////////////////////////////


module.exports = router;