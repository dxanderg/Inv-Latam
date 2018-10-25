$(document).ready(function() {

		var tabla = null
		var ruta = null

		var marcas = null
		var sistemaO = null
		var modelos = null
		var modelosM = null
		var modelosT = null
		var modelosMo = null
		var propietarios = null
		var tipoEquipo = null
		var ciudades = null
		var sedes = null
		var pisos = null
		var puestos = null

		if (perfiluser == 'lectura' || perfiluser == 'administrador'){
				$.ajax({
				url: '/api-paises/',
				contentType: 'application/json',
				success: function(response) {
					var selectItems = $('#select1');
							selectItems.html('');
							var opt3 = document.createElement('option');
							opt3.value = 'A';
							opt3.innerHTML = ('Seleccione la Ciudad')
							selectItems.append(opt3);
						for(i=0; i<response.data.length; i++){
							var opt = document.createElement('option');
							opt.value = response.data[i].cod_ciudad;
							opt.innerHTML = response.data[i].nombre_ciudad
							selectItems.append(opt);
						}
					}
				})
		}
		else{
				$.ajax({
				url: '/api-pais/'+ idPais,
				contentType: 'application/json',
				success: function(response) {
					var selectItems = $('#select1');
					selectItems.html('');
					var opt3 = document.createElement('option');
							opt3.value = 'A';
							opt3.innerHTML = ('Seleccione la Ciudad')
							selectItems.append(opt3);
					for(i=0; i<response.data.length; i++){
						var opt = document.createElement('option');
						opt.value = response.data[i].cod_ciudad;
						opt.innerHTML = response.data[i].nombre_ciudad
						selectItems.append(opt);
					}
				}
			})
		}

		// $.get("/api-marcas").done(function(data) {
		//  marcas = data.data
		// });

		// $.get("/api-propietarios").done(function(data) {
		//  propietarios = data.data
		// });

		// $.get("/api-tipoEquipo").done(function(data) {
		//  tipoEquipo = data.data
		// });

		// $.get("/api-ciudad/" + idCiudad).done(function(data) {
		//  sedes = data.data
		// });

		// $.get("/api-os").done(function(data) {
		//  sistemaO = data.data
		// });

		if ( perfiluser == 'administrador'){
				$.get("/api-pais/"+ idPais).done(function(data) {
				ciudades = data.data
				});
		}

		var newMarcas = document.querySelector('#selectMarcas')
		var newMarcasM = document.querySelector('#selectMarcasM')
		var newMarcasT = document.querySelector('#selectMarcasT')
		var newMarcasMo = document.querySelector('#selectMarcasMo')
		var newModelo = document.querySelector('#selectModelo')
		var newModeloM = document.querySelector('#selectModeloM')
		var newModeloT = document.querySelector('#selectModeloT')
		var newModeloMo = document.querySelector('#selectModeloMo')
		var newTipoE = document.querySelector('#selectTipoE')
		var newSistema = document.querySelector('#selectSistema')
		var newPropietario = document.querySelector('#selectPropietario')

		// for (var i = 0; i < tipoEquipo.length; i++) {
		//  var opt = document.createElement('option');
 //    opt.value = tipoEquipo[i].cod_tipo_equipo;
 //    opt.innerHTML = tipoEquipo[i].nombre_tipo_equip;
 //    newTipoE.append(opt);
		// }

		// for (var i = 0; i < sistemaO.length; i++) {
		//  var optOS = document.createElement('option');
 //    optOS.value = sistemaO[i].cod_os;
 //    optOS.innerHTML = sistemaO[i].nombre_os;
 //    newSistema.append(optOS);
		// }

		// for (var i = 0; i < marcas.length; i++) {
		//  var opt = document.createElement('option');
 //    opt.value = marcas[i].cod_marca;
 //    opt.innerHTML = marcas[i].nombre_marca;
 //    newMarcas.append(opt);
		// }

		// for (var i = 0; i < marcas.length; i++) {
		//  var optMM = document.createElement('option');
 //    optMM.value = marcas[i].cod_marca;
 //    optMM.innerHTML = marcas[i].nombre_marca;
 //    newMarcasM.append(optMM);
		// }

		// for (var i = 0; i < marcas.length; i++) {
		//  var optT = document.createElement('option');
 //    optT.value = marcas[i].cod_marca;
 //    optT.innerHTML = marcas[i].nombre_marca;
 //    newMarcasT.append(optT);
		// }

		// for (var i = 0; i < marcas.length; i++) {
		//  var optMo = document.createElement('option');
 //    optMo.value = marcas[i].cod_marca;
 //    optMo.innerHTML = marcas[i].nombre_marca;
 //    newMarcasMo.append(optMo);
		// }

		// for (var i = 0; i < propietarios.length; i++) {
		//  var opt = document.createElement('option');
 //    opt.value = propietarios[i].cod_propietario;
 //    opt.innerHTML = propietarios[i].nombre_propietario;
 //    newPropietario.append(opt);
		// }

		newMarcas.addEventListener('change', function(){
				newModelo.innerHTML = ''
				var idMarca = $( "#selectMarcas option:selected" ).val();
				$.get("/api-modelos/"+idMarca).done(function(data) {
				modelos = data.data
				for (var i = 0; i < modelos.length; i++) {
								var opt = document.createElement('option');
					opt.value = modelos[i].cod_modelo;
					opt.innerHTML = modelos[i].nombre_modelo;
					newModelo.append(opt);
						}
				});
		})

		newMarcasM.addEventListener('change', function(){
				newModeloM.innerHTML = ''
				var idMarcaM = $( "#selectMarcasM option:selected" ).val();
				$.get("/api-modelos/"+idMarcaM).done(function(data) {
				modelosM = data.data
				for (var i = 0; i < modelosM.length; i++) {
								var optM = document.createElement('option');
					optM.value = modelosM[i].cod_modelo;
					optM.innerHTML = modelosM[i].nombre_modelo;
					newModeloM.append(optM);
						}
				});
		})

		newMarcasT.addEventListener('change', function(){
				newModeloT.innerHTML = ''
				var idMarcaT = $( "#selectMarcasT option:selected" ).val();
				$.get("/api-modelos/"+idMarcaT).done(function(data) {
				modelosT = data.data
				for (var i = 0; i < modelosT.length; i++) {
								var optT = document.createElement('option');
					optT.value = modelosT[i].cod_modelo;
					optT.innerHTML = modelosT[i].nombre_modelo;
					newModeloT.append(optT);
						}
				});
		})

		newMarcasMo.addEventListener('change', function(){
				newModeloMo.innerHTML = ''
				var idMarcaMo = $( "#selectMarcasMo option:selected" ).val();
				$.get("/api-modelos/"+idMarcaMo).done(function(data) {
				modelosMo = data.data
				for (var i = 0; i < modelosMo.length; i++) {
								var optMo = document.createElement('option');
					optMo.value = modelosMo[i].cod_modelo;
					optMo.innerHTML = modelosMo[i].nombre_modelo;
					newModeloMo.append(optMo);
						}
				});
		})

		///////////////////////////////////////////////
		///////////////////////////////////////////////

		var newCiudad = document.querySelector('#selectCiudad')
		var newSede = document.querySelector('#selectSede')
		var newCampana = document.querySelector('#selectCampana')
		var newPuesto = document.querySelector('#selectPuesto')

		// if (ciudades != null){
		//  for (var i = 0; i < ciudades.length; i++) {
		//      var opt = document.createElement('option');
 //      opt.value = ciudades[i].cod_ciudad;
 //      opt.innerHTML = ciudades[i].nombre_ciudad;
 //      newCiudad.append(opt);
		//  }
		// }

		// var opt4 = document.createElement('option');
 //    opt4.value = 'A';
 //    opt4.innerHTML = ('---------------')
 //    opt4.disabled = true
 //    newSede.append(opt4);

		// for (var i = 0; i < sedes.length; i++) {
		//  var opt = document.createElement('option');
 //    opt.value = sedes[i].cod_sede;
 //    opt.innerHTML = sedes[i].nombre_sede;
 //    newSede.append(opt);
		// }

		newSede.addEventListener('change', function(){
				newCampana.innerHTML = ''
				newPuesto.innerHTML = ''
				var idSedeOpcion = $( "#selectSede option:selected" ).val();
				$.get("/api-sede/"+idSedeOpcion).done(function(data) {
				campanas = data.data
				var opt5 = document.createElement('option');
				opt5.value = 'A';
				opt5.innerHTML = ('Seleccione la Campaña')
				newCampana.append(opt5);
				for (var i = 0; i < campanas.length; i++) {
								var opt = document.createElement('option');
					opt.value = campanas[i].cod_campana;
					opt.innerHTML = campanas[i].nombre_campana;
					newCampana.append(opt);
						}
				});
		})

		newCampana.addEventListener('change', function(){
				newPuesto.innerHTML = ''
				var idCampaOpcion = $( "#selectCampana option:selected" ).val();
				$.get("/api-puesto/"+idCampaOpcion).done(function(data) {
				puestos = data.data
				for (var i = 0; i < puestos.length; i++) {
								var opt = document.createElement('option');
					opt.value = puestos[i].cod_ubicacion;
					opt.innerHTML = puestos[i].Ubicacion;
					newPuesto.append(opt);
						}
				});
		})

		

		$('#edit-form').on('click', '#submitButtonInsert',function(){
				var formDataInsert = {
					'id_tipo_equipo'          : $('select[name=cod_tipo_equip]').val(),
					'id_propietario'          : $('select[name=propietario]').val(),
					'id_ubicacion'            : $('select[name=cod_puesto]').val(),
					'id_os'                   : $('select[name=sistemaO]').val(),
					'host_name'               : $('input[name=hostnamepc]').val(),
					'ip'                      : $('input[name=direccionippc]').val(),
					'modelo_equi'             : $('select[name=modelo]').val(),
					'serial_equipo'           : $('input[name=serial]').val(),
					'num_activo_equi'         : $('input[name=plaqueta]').val(),
					'modelo_mon'              : $('select[name=modeloM]').val(),
					'serial_mon'              : $('input[name=monitor]').val(),
					'num_activo_mon'          : $('input[name=monitorp]').val(),
					'modelo_tec'              : $('select[name=modeloT]').val(),
					'serial_tec'              : $('input[name=teclado]').val(),
					'modelo_mou'              : $('select[name=modeloMo]').val(),
					'serial_mou'              : $('input[name=mouse]').val(),
					'cpu'                     : $('input[name=cpu]').val(),
					'ram'                     : $('input[name=ram]').val(),
					'hdd'                     : $('input[name=hdd]').val(),
					'tk'                      : $('input[name=ticket]').val(),
					'fecha_a'				  : $('input[name=fechaA]').val(),
					'id_nivel_imp'            : $('select[name=impacto]').val(),
					'id_responsable'          : $('select[name=responsable]').val(),
					'id_asignado'             : $('select[name=asignado]').val(),
					'estado'                  : 1
				};

		 $.ajax({
					url: '/Insertar',
					type: 'POST', 
					data: formDataInsert, 
					success: function(response) {
							// $('#insertarModal').modal('toggle')
							$("#modalOK").modal()
							// $("#mensajeModal").html('')
								$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
								$("#modalOK h4").html(`<h3 class="text-center">`+ response.error.code+`</h3>`)
								$("#modalOK p").html(`<p class="text-center">`+ response.error.sqlMessage+`</p>`)
					}
				})
				$('#modalOK').on('hidden.bs.modal', function () {
						location.reload()
				})
		})

		var $j = jQuery.noConflict(true)
})






