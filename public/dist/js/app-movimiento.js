$(document).ready(function() {

	$('#select2').prop('disabled', 'disabled');
	$('#select22').prop('disabled', 'disabled');
	$('#select3').prop('disabled', 'disabled');
	$('#select33').prop('disabled', 'disabled');
	$('#botonconsulta').hide();
	$('#botonconsulta1').hide();

	var tabla = null
	var ruta = null
	var rutaM = "/api-movipendiente"
	var ticketMov = null

	var marcas = null
	var sistemaO = null
	var paqueteOffice = null
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
	var nivelI = null
	var software = null
	var softwareCod = null
	var office = null
	var perifericos = null
	var peri_tipo = null
	var peri_modelo = null
	var peri_serial = null
	var peri_activo = null
	var responsable = null
	var asignado = null

	var pcOrigen = null
	var idPcOrigin = null
	var idMovimiento = null
	var idVacio = null

	if (perfiluser == 'lectura' || perfiluser == 'administrador'){
		$.ajax({
      url: '/api-paises/',
      contentType: 'application/json',
      success: function(response) {
        var selectItems = $('#select1');
        var selectItems2 = $('#select11');
        	selectItems.html('');
        	selectItems2.html('');
        	var opt3 = document.createElement('option');
        	var opt33 = document.createElement('option');
	        opt3.value = 'A';
	        opt33.value = 'A';
	        opt3.innerHTML = ('Seleccione la Ciudad')
	        opt33.innerHTML = ('Seleccione la Ciudad')
	        selectItems.append(opt3);
	        selectItems2.append(opt33);
        for(i=0; i<response.data.length; i++){
          var opt = document.createElement('option');
          var opt2 = document.createElement('option');
          opt.value = response.data[i].cod_ciudad;
          opt2.value = response.data[i].cod_ciudad;
          opt.innerHTML = response.data[i].nombre_ciudad
          opt2.innerHTML = response.data[i].nombre_ciudad
          selectItems.append(opt);
          selectItems2.append(opt2);
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
        var selectItems2 = $('#select11');
        selectItems.html('');
        selectItems2.html('');
        var opt3 = document.createElement('option');
        var opt33 = document.createElement('option');
	        opt3.value = 'A';
	        opt33.value = 'A';
	        opt3.innerHTML = ('Seleccione la Ciudad')
	        opt33.innerHTML = ('Seleccione la Ciudad')
	        selectItems.append(opt3);
	        selectItems2.append(opt33);
        for(i=0; i<response.data.length; i++){
          var opt = document.createElement('option');
          var opt2 = document.createElement('option');
          opt.value = response.data[i].cod_ciudad;
          opt2.value = response.data[i].cod_ciudad;
          opt.innerHTML = response.data[i].nombre_ciudad
          opt2.innerHTML = response.data[i].nombre_ciudad
          selectItems.append(opt);
          selectItems2.append(opt2);
        }
      }
    })
	}

	$.get("/api-marcas").done(function(data) {
		marcas = data.data
	});

	$.get("/api-propietarios").done(function(data) {
		propietarios = data.data
	});

	$.get("/api-tipoEquipo").done(function(data) {
		tipoEquipo = data.data
	});

	$.get("/api-ciudad/" + idCiudad).done(function(data) {
		sedes = data.data
	});

	$.get("/api-os").done(function(data) {
		sistemaO = data.data
	});

	$.get("/api-office").done(function(data) {
		paqueteOffice = data.data
	});

	$.get("/api-nivelI").done(function(data) {
		nivelI = data.data
	});

	$.get("/api-asignados/" + idPais).done(function(data) {
		asignado = data.data
	});

	$.get("/api-responsable/" + idPais).done(function(data) {
		responsable = data.data
	});

	if ( perfiluser == 'administrador'){
		$.get("/api-pais/"+ idPais).done(function(data) {
  		ciudades = data.data
		});
	}

	function renderTable(){
		var table= $('#example2').DataTable( {
    	"autoWidth": false,
    	"initComplete": function() {var cliko = document.getElementById('botondummy').click()},
		  "ajaxSource": ruta,
		  "columns": [
		    { "data": "nombre_piso" },
		    { "data": "num_puesto" },
		    { "data": "nombre_tipo_equip" },
		    { "data": "marca_equi" },
		    { "data": "modelo_equi" },
		    { "data": "serial_equipo" },
		    { "data": "num_activo_equi" },
		    { "data": "serial_mon" },
		    { "data": "num_activo_mon" },
		    { "data": "nombre_asignado" },
		    {
		      sortable: false,
		      "render": function ( data, type, full, meta ) {

		       	return `<div class="input-group-btn open">
										  <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones
											<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
										  <ul class="dropdown-menu">
												<li><a href="#" id="moverPc">Mover Equipo</a></li>
										  </ul>
										</div>`
		      }
        }
		  ]
		} );
	}

	function renderTable2(){
		var table= $('#example3').DataTable( {
    	"autoWidth": false,
    	"initComplete": function() {var cliko = document.getElementById('botondummy').click()},
		  "ajaxSource": ruta,
		  "columns": [
		    { "data": "nombre_sede" },
		    { "data": "nombre_campana" },
		    { "data": "nombre_area" },
		    { "data": "nom_tp_ubicacion" },
		    { "data": "nombre_piso" },
		    { "data": "num_puesto" },
		    { "data": "nombre_asignado" },
		    {
		      sortable: false,
		      "render": function ( data, type, full, meta ) {
		      	// var buttonID = "rollover_"+full.ceco;
		      	// var buttonID = "rollover_"+full.ceco;
		      	// var buttonID = "rollover_"+full.ceco;
		       	return `<div class="input-group-btn open">
							<button type="button" class="btn btn-sm" id="botonDestino">SELECCIONAR
						</div>`
		      }
        }
		  ]
		} );
	}

	function renderTable3(){
		var table= $('#example4').DataTable( {
    	"autoWidth": false,
    	"initComplete": function() {var cliko = document.getElementById('botondummy').click()},
		  "ajaxSource": rutaM,
		  "columns": [
		    { "data": "nombre_ciudad" },
		    { "data": "nombre_sede" },
		    { "data": "nombre_tipo_equip" },
		    { "data": "nombre_marca" },
		    { "data": "nombre_modelo" },
		    { "data": "serial_equipo" },
		    { "data": "num_activo_equi" },
		    {
		      sortable: false,
		      "render": function ( data, type, full, meta ) {
		       	return `<div class="input-group-btn open">
							<button type="button" class="btn btn-default" id="botonDestinoMov">SELECCIONAR
						</div>`
		      }
        }
		  ]
		} );
	}

	$('#select1').on('change', function(){
		$('#select2').prop('disabled', false);
		$('#select3').html('')
		$('#select3').prop('disabled', 'disabled');
		$('#botonconsulta').hide()

		  var val = this.value;
		  $.ajax({
	      url: '/api-ciudad/' + val,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#select2');
	          selectItems.html('');
	          var opt1 = document.createElement('option')
	          opt1.innerHTML = ('Seleccione la Sede')
	          selectItems.append(opt1);
		          for(i=0; i<response.data.length; i++){
		            var opt = document.createElement('option');
		            opt.value = response.data[i].cod_sede;
		            opt.innerHTML = response.data[i].nombre_sede
		            selectItems.append(opt);
		          }
	      }
	    })
	})

	$('#select11').on('change', function(){
		$('#select22').prop('disabled', false);
		$('#select33').html('')
		$('#select33').prop('disabled', 'disabled');
		$('#botonconsulta1').hide()

		  var val = this.value;
		  $.ajax({
	      url: '/api-ciudad/' + val,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#select22');
	          selectItems.html('');
	          var opt1 = document.createElement('option')
	          opt1.innerHTML = ('Seleccione la Sede')
	          selectItems.append(opt1);
		          for(i=0; i<response.data.length; i++){
		            var opt = document.createElement('option');
		            opt.value = response.data[i].cod_sede;
		            opt.innerHTML = response.data[i].nombre_sede
		            selectItems.append(opt);
		          }
	      }
	    })
	})

	$('#select2').on('change', function(){
		$('#select3').prop('disabled', false);
		$('#botonconsulta').show()
		  var val = this.value;
		  $.ajax({
	      url: '/api-sede/' + val,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#select3');
	          selectItems.html('');
	          var opt2 = document.createElement('option');
		        opt2.value = 'A';
		        opt2.innerHTML = '**///Todas las Campañas///**'
		        selectItems.append(opt2);
		          for(i=0; i<response.data.length; i++){
		            var opt = document.createElement('option');
		            opt.value = response.data[i].cod_campana;
		            opt.innerHTML = response.data[i].nombre_campana
		            selectItems.append(opt);
		          }
	      }
	    })
	})

	$('#select22').on('change', function(){
		$('#select33').prop('disabled', false);
		$('#botonconsulta1').show()
		  var val = this.value;
		  $.ajax({
	      url: '/api-sede/' + val,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#select33');
	          selectItems.html('');
	          var opt2 = document.createElement('option');
		        opt2.value = 'A';
		        opt2.innerHTML = '**///Todas las Campañas///**'
		        selectItems.append(opt2);
		          for(i=0; i<response.data.length; i++){
		            var opt = document.createElement('option');
		            opt.value = response.data[i].cod_campana;
		            opt.innerHTML = response.data[i].nombre_campana
		            selectItems.append(opt);
		          }
	      }
	    })
	})

	$('#botonconsulta').on('click', function(){
		
		
		if ($("#select2").val() == 'null'){
			alert('Por favor seleccione una opción para la consulta')	
		}
		else {
			if ($("#select3").val() == 'A' || $("#select3").val() == 'null'){
				var dato1 = $("#select2").val()
				var dato2 = $("#select3").val()

				ruta = "/api_query_sede/" + dato1
			}
			else{
				var dato1 = $("#select2").val()
				var dato2 = $("#select3").val()

				ruta = "/api_query_campana/" + dato1 + "/" + dato2
			}
			$("#example2").dataTable().fnDestroy();

			renderTable()
		}
	})

	$('#botonconsulta1').on('click', function(){
		
		
		if ($("#select22").val() == 'null'){
			alert('Por favor seleccione una opción para la consulta')	
		}
		else {
			if ($("#select33").val() == 'A' || $("#select33").val() == 'null'){
				var dato1 = $("#select22").val()
				var dato2 = $("#select33").val()

				ruta = "/api_query_sede/" + dato1
			}
			else{
				var dato1 = $("#select22").val()
				var dato2 = $("#select33").val()

				ruta = "/api_query_campana/" + dato1 + "/" + dato2
			}
			$("#example3").dataTable().fnDestroy();

			renderTable2()
		}
	})

	$('#example2 tbody').on( 'click', '#moverPc', function () {
		var tablon = $("#example2").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()

		if (data.cod_modelo_equi == 508)
		{
			alert('El puesto no tiene equipo ')
		}
		else{

			document.getElementById("temporal2").value = 'X'

			var table = document.getElementById("tablaEquipoaMover")
			ticketMov = document.getElementById("inputTicket").value

			if(table.rows.length>1){
				table.deleteRow(1);
			}

			var row = table.insertRow(1)

			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			var cell4 = row.insertCell(4);
			var cell5 = row.insertCell(5);
			var cell6 = row.insertCell(6);
			var cell7 = row.insertCell(7);
			var cell8 = row.insertCell(8);
			var cell9 = row.insertCell(9);

			cell0.innerHTML = data.nombre_sede;
			cell1.innerHTML = data.nombre_campana;
			cell2.innerHTML = data.nombre_piso;
			cell3.innerHTML = data.num_puesto;
			cell4.innerHTML = data.nombre_tipo_equip;
			cell5.innerHTML = data.marca_equi;
			cell6.innerHTML = data.modelo_equi;
			cell7.innerHTML = data.serial_equipo;
			cell8.innerHTML = data.num_activo_equi;
			cell9.innerHTML = data.nombre_asignado;

			idPcOrigin = data.cod_activo_hw 

			console.log(data)

			pcOrigen = {
				'id_tipo_equipo' : data.cod_tipo_equipo ,  
				'id_propietario' : data.cod_propietario ,  
				'id_responsable' : data.cod_responsable ,  
				'id_asignado' : data.cod_asignado , 
				'id_ubicacion' : data. id_ubicacion,  
				'id_nivel_imp' : data.cod_nivel_impacto ,  
				'id_os' : data.id_os ,  
				'host_name' : data.host_name , 
				'ip' : data.ip , 
				'modelo_equi' : data.cod_modelo_equi ,  
				'serial_equipo' : data.serial_equipo , 
				'num_activo_equi' : data.num_activo_equi , 
				'cpu' : data.cpu , 
				'ram' : data.ram , 
				'hdd' : data.hdd , 
				'tk' : ticketMov , 
				'ultima_mod' : data.ultima_mod , 
				'estado' : data.estado
			}

			$('#mostrar2').click();
		}
  	});

	$('#example3 tbody').on( 'click', '#botonDestino', function () {
		var tablon = $("#example3").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()

		var table = document.getElementById("tablaEquipoaMover")

		if (data.cod_modelo_equi == 508)
		{
			document.getElementById("temporal2").value = 'Y'
		}
		
		$("#confirmTraslado").modal()
		$("#confirmTraslado").on('shown.bs.modal', function(e) {
		$('#tableModal').html('')

		   	if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
		   		if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
						$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA TRASLADAR ESTE ACTIVO</h2>
																	<div class="row">
																		<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																	</div>
							`)
			   	}
			   	else {
			   		$('#tableModal').html(`<h2 class="text-center">TRASLADAR ACTIVO</h2>
										    <div class="row">
										        <div class="col-md-12 mx-auto">
										            <form id="edit-form" method="post" action="">
										            	<input type="text" class="form-control hidden" id="indiceA" placeholder="" value="`+data.cod_activo_hw+`" name="indiceA">
										            	<div class="grupo">
										            		<row class="col-sm-12">
										            			<row class="form-group">
											            			<h3 class="col-md-9 col-md-offset-3">Equipo en la posicion de origen:</h3>
											            			<div class="row col-md-12">
																		<table id="tablaequipoorigen" class="table table-striped table-bordered">
																			<thead>
																				<tr>
																					<th>Sede</th>
																					<th>Campaña</th>
																					<th>Piso</th>
																					<th>Puesto</th>
																					<th>Tipo de Equipo</th>
																					<th>Marca</th>
																					<th>Modelo</th>
																					<th>Serial</th>
																					<th>Plaqueta</th>
																				</tr>
																				<tr>
																					<td>`+table.rows[1].cells[0].innerHTML+`</td>
																					<td>`+table.rows[1].cells[1].innerHTML+`</td>
																					<td>`+table.rows[1].cells[2].innerHTML+`</td>
																					<td>`+table.rows[1].cells[3].innerHTML+`</td>
																					<td>`+table.rows[1].cells[4].innerHTML+`</td>
																					<td>`+table.rows[1].cells[5].innerHTML+`</td>
																					<td>`+table.rows[1].cells[6].innerHTML+`</td>
																					<td>`+table.rows[1].cells[7].innerHTML+`</td>
																					<td>`+table.rows[1].cells[8].innerHTML+`</td>
																				</tr>
																			</thead>
																		</table>
																	</div>
										            			<row>
										            		</row>
										            	</div>
										            	<div class="grupo">
										            		<row class="col-sm-12">
										            			<row class="form-group">
											            			<h3 class="col-md-9 col-md-offset-3">Equipo en la posicion de destino:</h3>
											            			<div class="row col-md-12">
																		<table id="tablaequipodestino" class="table table-striped table-bordered">
																			<thead>
																				<tr>
																					<th>Sede</th>
																					<th>Campaña</th>
																					<th>Piso</th>
																					<th>Puesto</th>
																					<th>Tipo de Equipo</th>
																					<th>Marca</th>
																					<th>Modelo</th>
																					<th>Serial</th>
																					<th>Plaqueta</th>
																				</tr>
																				<tr>
																					<td>`+data.nombre_sede+`</td>
																					<td>`+data.nombre_campana+`</td>
																					<td>`+data.nombre_piso+`</td>
																					<td>`+data.num_puesto+`</td>
																					<td>`+data.nombre_tipo_equip+`</td>
																					<td>`+data.marca_equi+`</td>
																					<td>`+data.modelo_equi+`</td>
																					<td>`+data.serial_equipo+`</td>
																					<td>`+data.num_activo_equi+`</td>
																				</tr>
																			</thead>
																		</table>
																	</div>
										            			<row>
										            		</row>
										            	</div>
											        	<div class="grupo">
											        		<row class="col-sm-12">
												        		<row class="form-group">
												        			<row class="col-sm-4 offset-sm-2">
												        				<button id="submitButtonTrasladar" type="button" class="btn btn-primary">Confirmar</button>
											                		</row>
											                		<row class="col-sm-4 offset-sm-2">
											                			<button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
											                		</row>
										                		</row>
										              		</row>
									              		</div>
										            </form>
										        </div>
										    </div>`);	
			   	}
		   	}
		   	else {
		   		$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA TRASLADAR ESTE ACTIVO</h2>
																	<div class="row">
																		<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																	</div>
							`)
		   	}
		});
	})

	$('#example4 tbody').on( 'click', '#botonDestinoMov', function () {
		var tablon = $("#example4").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()

		var table = document.getElementById("tablaEquipoaMover")

		if(table.rows.length>1){
			table.deleteRow(1);
		}

		ticketMov = document.getElementById("inputTicket").value

		var row = table.insertRow(1)

		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		var cell5 = row.insertCell(5);
		var cell6 = row.insertCell(6);
		var cell7 = row.insertCell(7);
		var cell8 = row.insertCell(8);

		cell0.innerHTML = "-";
		cell1.innerHTML = "-";
		cell2.innerHTML = "-";
		cell3.innerHTML = "-";
		cell4.innerHTML = data.nombre_tipo_equip;
		cell5.innerHTML = data.nombre_marca;
		cell6.innerHTML = data.nombre_modelo;
		cell7.innerHTML = data.serial_equipo;
		cell8.innerHTML = data.num_activo_equi;

		document.getElementById("temporal").value = data.cod_movimiento

		pcOrigen = {
			'id_tipo_equipo' : data.id_tpo_equipo ,  
			'id_propietario' : data.id_propietario ,  
			'id_responsable' : data.id_responsable ,  
			'id_asignado' : data.id_asignado , 
			'id_nivel_imp' : data.id_nivel_impacto ,  
			'id_os' : data.id_os ,  
			'host_name' : data.host_name , 
			'ip' : data.ip , 
			'modelo_equi' : data.id_modelo ,  
			'serial_equipo' : data.serial_equipo , 
			'num_activo_equi' : data.num_activo_equi , 
			'cpu' : data.cpu , 
			'ram' : data.ram , 
			'hdd' : data.hdd , 
			'tk' : ticketMov , 
			'ultima_mod' : data.ultima_mod , 
			'estado' : 1
		}

		$('#mostrar2').click();
  	});

  	$('#confirmTraslado').on('click', '#submitButtonTrasladar',function(){
  		var checkTicket = document.getElementById("inputTicket").value
  		if (checkTicket == "")
  		{
  			alert("Digite el numero del ticket.")
  		}
  		else
  		{
  			pcOrigen.tk = checkTicket

  			var indic = $('#indiceA').val()

			idMovimiento = document.getElementById("temporal").value
			idVacio = document.getElementById("temporal2").value

	     	$.ajax({
		      url: '/traslado-cpu/' + indic + '/' + idPcOrigin + '/' + idMovimiento + '/' + idVacio,
		      type: 'POST',	
		      data: pcOrigen,	
		      success: function(response) {
			    $('#confirmTraslado').modal('toggle')
			    $("#modalOK").modal()
			    // $("#mensajeModal").html('')
			    $("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    $("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
		      }
		    })
  		}
	})

  	$('#botonmovipendiente').click(function () {
		$('#mostrar3').click();
		$("#example4").dataTable().fnDestroy();
		renderTable3()
  	});

	$('#modalOK').on('click', '#botondismiss', function () {
    	$('#mostrar3').click();

    	$('#select2').prop('disabled', 'disabled');
		$('#select22').prop('disabled', 'disabled');
		$('#select3').prop('disabled', 'disabled');
		$('#select33').prop('disabled', 'disabled');

		$('#select2').html("")
		$('#select22').html("")
		$('#select3').html("")
		$('#select33').html("")

		$('#select1').prop('selectedIndex', 0);
		$('#select11').prop('selectedIndex', 0);

		var table = document.getElementById("tablaEquipoaMover")
		
		if(table.rows.length>1){
			table.deleteRow(1);
		}

    	$('#botonconsulta').hide();
		$('#botonconsulta1').hide();

		$("#example2").dataTable().fnDestroy();
		$("#example3").dataTable().fnDestroy();

		// $("#example2").html("")
		// $("#example3").html("")

		$("#example2").dataTable().empty()
		$("#example3").dataTable().empty()

		$("#example4").dataTable().fnDestroy();

		renderTable3()

		location.reload();
	})

	var $j = jQuery.noConflict(true)
})



