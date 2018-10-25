$(document).ready(function() {

	$('#select2').prop('disabled', 'disabled');
	$('#select3').prop('disabled', 'disabled');
	$('#botonconsulta').hide();

	var tabla = null
	var ruta = null

	var marcas = null
	var marcas1 = null
	var marcas2 = null
	var marcas3 = null
	var marcas4 = null
	var sistemaO = null
	var paqueteOffice = null
	var programas = null
	var modelos = null
	var modelosM = null
	var modelosT = null
	var modelosMo = null
	var propietarios = null
	var tipoEquipo = null
	var tipoEquipo1 = null
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
	var indicSoftware = null
	var indicSoftwareDel = null
	var indicPeriferico = null
	var indicPerifericoDel = null

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

	$.get("/api-marcas").done(function(data) {
		marcas = data.data
	});
	$.get("/api-marcas").done(function(data) {
		marcas1 = data.data
	});
	$.get("/api-marcas").done(function(data) {
		marcas2 = data.data
	});
	$.get("/api-marcas").done(function(data) {
		marcas3 = data.data
	});
	$.get("/api-marcas").done(function(data) {
		marcas4 = data.data
	});

	$.get("/api-propietarios").done(function(data) {
		propietarios = data.data
	});

	$.get("/api-tipoEquipo").done(function(data) {
		tipoEquipo = data.data
	});
	$.get("/api-tipoEquipo").done(function(data) {
		tipoEquipo1 = data.data
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

	$.get("/api-programas").done(function(data) {
		programas = data.data
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
			    { "data": "nombre_campana" },
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
			      	// var buttonID = "rollover_"+full.ceco;
			      	// var buttonID = "rollover_"+full.ceco;
			      	// var buttonID = "rollover_"+full.ceco;
			       	return `<div class="input-group-btn open">
							  <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">ACCIONES
								<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
							  <ul class="dropdown-menu">
									<li><a href="#" id="detalle">Ver detalle</a></li>
									<li><a href="#" id="editar">Editar</a></li>
									<li><a href="#" id="mover">Mover de ubicación</a></li>
									<li class="divider"></li>
									<li><a href="#" id="eliminar">Eliminar</a></li>
							  </ul>
							</div>`}
	        	}
		  	]
		} );
	}

	$('#example2 tbody').on( 'click', '#detalle', function () {
		
		var tablon = null
		var data = null

		tablon = $("#example2").DataTable()
		data = tablon.row( $(this).parents('tr') ).data()

	    $("#confirmTraslado").modal()
	    $("#confirmTraslado").on('shown.bs.modal', function(e) {
	    	$(this).off('shown.bs.modal');
	    	$('#tableModal').html('')
		    $('#tableModal').html(`<h2 class="text-center">DETALLE DEL ACTIVO</h2>
								    <div class="row">
								        <div class="col-md-12 mx-auto">
								            <form>
								            	<div class="nav-tabs-custom">
												  <ul class="nav nav-pills">
												    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">ARTICULO
												        <div class="ripple-container"></div></a></li>
												    <li><a href="#tab_4" data-toggle="tab" aria-expanded="false">HARDWARE
												        <div class="ripple-container"></div></a></li>
												    <li><a href="#tab_2" data-toggle="tab" aria-expanded="false">SOFTWARE
												        <div class="ripple-container"></div></a></li>
												    <li><a href="#tab_3" data-toggle="tab" aria-expanded="false">PERIFERICOS
												        <div class="ripple-container"></div></a></li>
												    <li><a href="#tab_5" data-toggle="tab" aria-expanded="false">UBICACION
												        <div class="ripple-container"></div></a></li>
												    <li><a href="#tab_6" data-toggle="tab" aria-expanded="false">INFORMACION
												        <div class="ripple-container"></div></a></li>
												  </ul>
												  <div style="height: 290px; margin-top: 10px;" class="tab-content">
												    <div id="tab_1" class="tab-pane active">
													    <div class="grupo">
						                                	<row>
							                                    <div class="col-sm-12">
							                                        <label class="titulos">Tipo de Activo :</label>
							                                        <label class="info">`+data.nombre_tipo_equip+`</label>
							                                    </div>
						                                  	</row>
						                              	</div>
						                              <div class="grupo">
						                                <row>
						                                  <div class="col-sm-6">
						                                          <label class="titulos">Marca :</label>
						                                          <label class="info">`+data.marca_equi+`</label>
						                                      </div>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Modelo :</label>
						                                          <label class="info">`+data.modelo_equi+`</label>
						                                      </div>
						                                  </row>
						                              </div>
						                              <div class="grupo">
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">plaqueta :</label>
						                                          <label class="info">`+data.num_activo_equi+`</label>
						                                      </div>
						                                       <div class="col-sm-6">
						                                          <label class="titulos">serial :</label>
						                                          <label class="info">`+data.serial_equipo+`</label>
						                                      </div>
						                                  </row>
						                              </div>
						                              <div class="grupo">
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Procesador :</label>
						                                          <label class="info">`+data.cpu+`</label>
						                                      </div>
						                                      <div class="col-sm-3">
						                                          <label class="titulos">RAM :</label>
						                                          <label class="info">`+data.ram+`</label>
						                                      </div>
						                                      <div class="col-sm-3">
						                                          <label class="titulos">HDD :</label>
						                                          <label class="info">`+data.hdd+`</label>
						                                      </div>
						                                  </row>
						                              </div>
						                              <div class="grupo">
								                      	<row class="col-sm-12">
								                      		<div class="progress">
																<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																	<span class="sr-only">100% Complete</span>
																</div>
															</div>
								                      	</row>
								                      </div>
						                              <div class="grupo">
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Marca Monitor :</label>
						                                          <label class="info">`+data.marca_mon+`</label>
						                                      </div>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Modelo Monitor: :</label>
						                                          <label class="info">`+data.modelo_mon+`</label>
						                                      </div>
						                                  </row>
						                              </div>
						                              <div class="grupo">
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Serial Monitor :</label>
						                                          <label class="info">`+data.serial_mon+`</label>
						                                      </div>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Plaqueta MOnitor: :</label>
						                                          <label class="info">`+data.num_activo_mon+`</label>
						                                      </div>
						                                  </row>
						                              </div>
												    </div>
												    <!-- /.tab-pane-->
												    <div id="tab_4" class="tab-pane">
						                              <div class="grupo">
						                              	  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Marca Teclado :</label>
						                                          <label class="info">`+data.marca_tec+`</label>
						                                      </div>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Modelo Teclado: :</label>
						                                          <label class="info">`+data.modelo_tec+`</label>
						                                      </div>
						                                  </row>
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Serial Teclado :</label>
						                                          <label class="info">`+data.serial_tec+`</label>
						                                      </div>
						                                  </row>
						                              </div>
						                              <div class="grupo">
								                      	<row class="col-sm-12">
								                      		<div class="progress">
																<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																	<span class="sr-only">100% Complete</span>
																</div>
															</div>
								                      	</row>
								                      </div>
								                      <div class="grupo">
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Marca Mouse :</label>
						                                          <label class="info">`+data.marca_mau+`</label>
						                                      </div>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Modelo Mouse: :</label>
						                                          <label class="info">`+data.modelo_mau+`</label>
						                                      </div>
						                                  </row>
						                                  <row>
						                                      <div class="col-sm-6">
						                                          <label class="titulos">Serial Mouse: :</label>
						                                          <label class="info">`+data.serial_mou+`</label>
						                                      </div>
						                                  </row>
						                              </div>
												    </div>
												    <!-- /.tab-pane-->
												    <div id="tab_2" class="tab-pane">
												      <div class="grupo">
														    <row class="col-sm-6">
											            		<row>
																	<div class="col-sm-9">
																	  <label class="titulos">Sistema Operativo :</label>
																	  <label class="info">`+data.nombre_os+`</label>
																	</div>
															    </row>
											                </row>
											                <row class="col-sm-6">
											            		<row>
															          <div class="col-sm-9">
															              <label class="titulos">Hostname :</label>
															              <label class="info">`+data.host_name+`</label>
															          </div>
															    </row>
											                </row>
														</div>
								                      	<div class="grupo">
								                      		<row class="col-sm-12">
											            		<row>
														          <div class="col-sm-9">
														              <label class="titulos">Direccion IP :</label>
														              <label class="info">`+data.ip+`</label>
														          </div>
														      </row>
											                </row>
								                      	</div>
								                      	<div class="grupo">
									                      	<row class="col-sm-12">
									                      		<div class="progress">
																	<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																		<span class="sr-only">100% Complete</span>
																	</div>
																</div>
									                      	</row>
									                    </div>
								                      	<table class="table table-bordered text-center" id="tabla_software">
												    		<thead>
												    		</thead>
												    		<tbody>
													    	</tbody>
												    	</table>
												    </div>
												    <!-- /.tab-pane-->
												    <div id="tab_3" class="tab-pane">
												    	<table class="table table-bordered text-center" id="tabla_periferico">
												    		<thead>
												    			<tr>
												    			<tr>
												    		</thead>
												    		<tbody>
													    		<tr>
													    		<tr>
													    	</tbody>
												    	</table>
												    </div>
												    <!-- /.tab-pane-->
												    <div id="tab_4" class="tab-pane">
												      <div class="grupo">
						                                <row>
						                                      <div class="col-sm-7">
						                                      	<label class="titulos">ceco :</label>
						                                        <label class="info">`+data.ceco+`</label>
						                                      </div>
						                                    </row>
						                              </div>
						                              <div class="grupo">
						                                <row>
						                                      <div class="col-sm-7">
						                                          <label class="titulos">campaña :</label>
						                                          <label class="info">`+data.nombre_campana+`</label>
						                                      </div>
						                                  </row>
						                              </div>
												    </div>
												    <!-- /.tab-pane-->
												    <div id="tab_5" class="tab-pane">
												    	<div class="grupo">
						                                <row>
						                                      <div class="col-sm-3">
						                                      	<label class="titulos">ceco :</label>
						                                        <label class="info">`+data.ceco+`</label>
						                                      </div>
						                                    </row>
						                              </div>
						                              <div class="grupo">
						                                <row>
						                                      <div class="col-sm-9">
						                                          <label class="titulos">campaña :</label>
						                                          <label class="info">`+data.nombre_campana+`</label>
						                                      </div>
						                                  </row>
						                              </div>
												      <div class="grupo">
						                                <row>
						                                      <div class="col-sm-7">
						                                          <label class="titulos">pais :</label>
						                                          <label class="info">`+data.nombre_pais+`</label>
						                                      </div>
						                                      <div class="col-sm-7">
						                                          <label class="titulos">ciudad :</label>
						                                          <label class="info">`+data.nombre_ciudad+`</label>
						                                      </div>
						                                       <div class="col-sm-7">
						                                          <label class="titulos">sede :</label>
						                                          <label class="info">`+data.nombre_sede+`</label>
						                                      </div>
						                                      <div class="col-sm-7">
						                                          <label class="titulos">piso :</label>
						                                          <label class="info">`+data.nombre_piso+`</label>
						                                      </div>
						                                       <div class="col-sm-7">
						                                          <label class="titulos">puesto :</label>
						                                          <label class="info">`+data.num_puesto+`</label>
						                                      </div>
						                                  </row>
						                              </div>
												    </div>
												    <!-- /.tab-pane-->
												    <div id="tab_6" class="tab-pane">
												   		<div class="grupo">
														    <row>
														        <div class="col-sm-7">
														            <label class="titulos">propietario :</label>
														            <label class="info">`+data.nombre_propietario+`</label>
														        </div>
														    </row>
														</div>
														<div class="grupo">
														    <row>
														        <div class="col-sm-7">
														            <label class="titulos">Nivel Impacto :</label>
														            <label class="info">`+data.nombre_nivel_imp+`</label>
														        </div>
														    </row>
														</div>
														<div class="grupo">
														    <row>
														        <div class="col-sm-7">
														            <label class="titulos">responsable :</label>
														            <label class="info">`+data.nombre_resp+`</label>
														        </div>
														    </row>
														</div>
														<div class="grupo">
														    <row>
														        <div class="col-sm-7">
														            <label class="titulos">asignado :</label>
														            <label class="info">`+data.nombre_asignado+`</label>
														        </div>
														    </row>
														</div>
														<div class="grupo">
														    <row>
														        <div class="col-sm-7">
														            <label class="titulos">ticket :</label>
														            <label class="info">`+data.tk+`</label>
														        </div>
														    </row>
														</div>
														<div class="grupo">
														    <row>
														        <div class="col-sm-7">
														            <label class="titulos">fecha modificacion :</label>
														            <label class="info">`+data.ultima_mod+`</label>
														        </div>
														    </row>
														</div>
													</div>
												  </div>
												</div>
							                <button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
								            </form>
								        </div>
								    </div>`
			);

			$.get("/api-software/"+data.cod_activo_hw).done(function(dataOff) {

				var tablaSoft = document.getElementById("tabla_software")
				if(tablaSoft.rows.length>1){
					tablaSoft.innerHTML = ""
				}
				
				var customers = new Array();

				if (dataOff.data.length == 0){
					customers.push(["N°", "Version Office", "Version Software"]);
					customers.push(["N/A", "N/A", "N/A"]);
				}
				else{
					customers.push(["N°", "Version Office", "Version Software"]);
				    for (var i = 0; i < dataOff.data.length; i++) {
				    	customers.push([
				    		dataOff.data[i].cod_activo_sw, 
				    		dataOff.data[i].nombre_office, 
				    		dataOff.data[i].nombre_programa
				    	]);
				    }
				}
			 
			    //Get the count of columns.
			    var columnCount = customers[0].length;
			 
			    //Add the header row.
			    var row = tablaSoft.insertRow(-1);
			    for (var i = 0; i < columnCount; i++) {
			        var headerCell = document.createElement("TH");
			        headerCell.innerHTML = customers[0][i];
			        row.appendChild(headerCell);
			    }
			 
			    //Add the data rows.
			    for (var i = 1; i < customers.length; i++) {
			        row = tablaSoft.insertRow(-1);
			        for (var j = 0; j < columnCount; j++) {
			            var cell = row.insertCell(-1);
			            cell.innerHTML = customers[i][j];
			        }
			    }
			});

			$.get("/api-perifericos/"+data.cod_activo_hw).done(function(dataPer) {

				var tablaPeri = document.getElementById("tabla_periferico")
				if(tablaPeri.rows.length>1){
					tablaPeri.innerHTML = ""
				}
				
				var perifericosDat = new Array();

				if (dataPer.data.length == 0){
					perifericosDat.push(["Tipo Periferico", "Modelo Periferico", "Serial Periferico", "Activo Periferico"]);
					perifericosDat.push(["N/A", "N/A", "N/A", "N/A"]);
				}
				else{
					perifericosDat.push(["Tipo Periferico", "Modelo Periferico", "Serial Periferico", "Activo Periferico"]);
				    for (var i = 0; i < dataPer.data.length; i++) {
				    	perifericosDat.push([
				    		dataPer.data[i].nombre_tipo_equip, 
				    		dataPer.data[i].nombre_modelo, 
				    		dataPer.data[i].serial_perif,
				    		dataPer.data[i].num_activo_perif
				    	]);
				    }
				}
			 
			    //Get the count of columns.
			    var columnCount = perifericosDat[0].length;
			 
			    //Add the header row.
			    var row = tablaPeri.insertRow(-1);
			    for (var i = 0; i < columnCount; i++) {
			        var headerCell = document.createElement("TH");
			        headerCell.innerHTML = perifericosDat[0][i];
			        row.appendChild(headerCell);
			    }
			 
			    //Add the data rows.
			    for (var i = 1; i < perifericosDat.length; i++) {
			        row = tablaPeri.insertRow(-1);
			        for (var j = 0; j < columnCount; j++) {
			            var cell = row.insertCell(-1);
			            cell.innerHTML = perifericosDat[i][j];
			        }
			    }
			});
		});
  	});

	$('#example2 tbody').on( 'click', '#editar', function () {
		
		var tablon = null
		var data = null
		tablon = $("#example2").DataTable()
		data = tablon.row( $(this).parents('tr') ).data()

	  $("#confirmTraslado").modal()
	  $("#confirmTraslado").on('shown.bs.modal', function(e) {
	  	$(this).off('shown.bs.modal');
	   	$('#tableModal').html('')

	   	if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
	   		if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
					$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTE ACTIVO</h2>
																<div class="row">
																	<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																</div>
						`)
		   	}
		   	else {
		   		$('#tableModal').html(`<h2 class="text-center">EDITAR ACTIVO</h2>
		   								<input type="text" class="form-control hidden" id="indiceA" placeholder="" value="`+data.cod_activo_hw+`" name="indiceA">
									    <div class="row">
									        <div class="col-md-12 mx-auto">
									            <form>
									            	<div class="nav-tabs-custom">
													  <ul class="nav nav-pills">
													    <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">ARTICULO
													        <div class="ripple-container"></div></a></li>
													    <li><a href="#tab_4" data-toggle="tab" aria-expanded="false">HARDWARE
													        <div class="ripple-container"></div></a></li>
													  	<li><a href="#tab_5" data-toggle="tab" aria-expanded="false">CARACTERISTICAS
													        <div class="ripple-container"></div></a></li>
													    <li><a href="#tab_2" data-toggle="tab" aria-expanded="false">SOFTWARE
													        <div class="ripple-container"></div></a></li>
													    <li><a href="#tab_3" data-toggle="tab" aria-expanded="false">PERIFERICOS
													        <div class="ripple-container"></div></a></li>
													    <li><a href="#tab_6" data-toggle="tab" aria-expanded="false">INFORMACION
													        <div class="ripple-container"></div></a></li>
													  </ul>
													  <div style="height: 300px; margin-top: 10px;" class="tab-content">
													    <div id="tab_1" class="tab-pane active">
														    <div class="grupo">
														    	<row class="col-sm-12">
										                        	<row class="form-group">
													                    <div class="col-sm-3">
													                        <label for="tipoactivo" class="titulos">Tipo de Activo :</label>
													                    </div>
													                    <div class="col-sm-6">
												                    		<select class="form-control" id="selectTipoE" name="cod_tipo_equip">
															                    <option value="`+data.cod_tipo_equipo+`">`+data.nombre_tipo_equip+`</option>
															                </select>
													                    </div>
													                </row>
													            </row>
									                      	</div>
									                      <div class="grupo">
									                        <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="marca" class="titulos">Marca :</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                    			<select class="form-control" id="selectMarcas" name="marca">
															                    <option value="`+data.cod_marca+`">`+data.marca_equi+`</option>
															                </select>
											                    	</div>
											                    </row>
											                </row>
											                <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label for="modelo" class="titulos">Modelo :</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                    			<select class="form-control" id="selectModelo" name="modelo_equi">
															                    <option value="`+data.cod_modelo_equi+`">`+data.modelo_equi+`</option>
															                  </select>
											                    	</div>
											                    </row>
											                </row>
									                      </div>
									                      <div class="grupo">
									                         <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="plaqueta" class="titulos">plaqueta :</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<input type="text" class="form-control" id="plaqueta" placeholder="" value="`+data.num_activo_equi+`" name="plaqueta">
											                    	</div>
											                    </row>
											                </row>
											                <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label for="serial" class="titulos">serial :</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<input type="text" class="form-control" id="serial" placeholder="" value="`+data.serial_equipo+`" name="serial">
											                    	</div>
											                    </row>
											                </row>
									                      </div>
									                      <div class="grupo">
									                      	<row class="col-sm-12">
									                      		<div class="progress">
																	<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																		<span class="sr-only">100% Complete</span>
																	</div>
																</div>
									                      	</row>
									                      </div>
									                      <div class="grupo">
									                      		<row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="hdd" class="titulos">Marca Monitor :</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                        	<select class="form-control" id="selectMarcasMon" name="marcaMon">
															                    <option value="`+data.cod_marca+`">`+data.marca_mon+`</option>
															                </select>
												                    	</div>
												                    </row>
												                </row>
									                      		<row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="hdd" class="titulos">Modelo Monitor :</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                        	<select class="form-control" id="selectModeloM" name="modeloMon">
															                    <option value="`+data.cod_modelo_mon+`">`+data.modelo_mon+`</option>
															                </select>
												                    	</div>
												                    </row>
												                </row>
									                          <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="hdd" class="titulos">Monitor S/N:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<input type="text" class="form-control" id="monitor" placeholder="" value="`+data.serial_mon+`" name="monitor">
											                    	</div>
											                    </row>
											                </row>
											                <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label for="ceco" class="titulos">Monitor Plaqueta:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<input type="text" class="form-control" id="monitorp" placeholder="" value="`+data.num_activo_mon+`" name="monitorp">
											                    	</div>
											                    </row>
											                </row>
									                      </div>
													    </div>
													    <!-- /.tab-pane-->
													    <div id="tab_4" class="tab-pane">
									                      <div class="grupo">
									                      	<row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="hdd" class="titulos">Marca Teclado:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<select class="form-control" id="selectMarcasTec" name="marcaTec">
															                    <option value="`+data.cod_marca+`">`+data.marca_tec+`</option>
															                </select>
											                    	</div>
											                   </row>
											                </row>
											                </row>
									                          <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="hdd" class="titulos">Modelo Teclado:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<select class="form-control" id="selectModeloT" name="modeloTec">
															                <option value="`+data.cod_modelo_tec+`">`+data.modelo_tec+`</option>
															            </select>
											                    	</div>
											                    </row>
											                </row>
											                <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="hdd" class="titulos">Teclado S/N:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<input type="text" class="form-control" id="teclado" placeholder="" value="`+data.serial_tec+`" name="teclado">
											                    	</div>
											                    </row>
											                </row>
									                      </div>
									                      <div class="grupo">
									                      	<row class="col-sm-12">
									                      		<div class="progress">
																	<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																		<span class="sr-only">100% Complete</span>
																	</div>
																</div>
									                      	</row>
									                      </div>
									                      <div class="grupo">
									                      	<row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="hdd" class="titulos">Marca Mouse:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<select class="form-control" id="selectMarcasMou" name="marcaMou">
															                    <option value="`+data.cod_marca+`">`+data.marca_mau+`</option>
															                </select>
											                    	</div>
											                   </row>
											                </row>
									                          <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label  for="hdd" class="titulos">Modelo Mouse:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<select class="form-control" id="selectModeloMo" name="modeloMou">
															                    <option value="`+data.cod_modelo_mou+`">`+data.modelo_mau+`</option>
															                </select>
											                    	</div>
											                    </row>
											                </row>
											                <row class="col-sm-6">
											            		<row class="form-group">
											            			<div class="col-sm-4">
											                        	<label for="ceco" class="titulos">Mouse S/N:</label>
											                    	</div>
											                    	<div class="col-sm-7">
											                        	<input type="text" class="form-control" id="mouse" placeholder="" value="`+data.serial_mou+`" name="mouse">
											                    	</div>
											                    </row>
											                </row>
									                      </div>
													    </div>
													    <!-- /.tab-pane-->
													    <div id="tab_5" class="tab-pane">
													    	<div class="grupo">
										                         <row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-2">
												                        	<label  for="cpu" class="titulos">CPU :</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                        	<input type="text" class="form-control" id="cpu" placeholder="" value="`+data.cpu+`" name="cpu">
												                    	</div>
												                    </row>
												                </row>
												              	<row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-2">
												                        	<label for="ram" class="titulos">RAM :</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                        	<input type="text" class="form-control" id="ram" placeholder="" value="`+data.ram+`" name="ram">
												                    	</div>
												                    </row>
												                </row>
												                <row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-2">
												                        	<label  for="hdd" class="titulos">HDD :</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                        	<input type="text" class="form-control" id="hdd" placeholder="" value="`+data.hdd+`" name="hdd">
												                    	</div>
												                    </row>
												                </row>
										                    </div>
													    </div>
													    <!-- /.tab-pane-->
													    <div id="tab_2" class="tab-pane">
													    	<div class="grupo">
															    <row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-6">
												                        	<label for="ceco" class="titulos">Direccion IP :</label>
												                    	</div>
												                    	<div class="col-sm-4">
												                        	<input type="text" class="form-control" id="dirIP" placeholder="" value="`+data.ip+`" name="dirIP">
												                    	</div>
												                    </row>
												                </row>
												                <row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-6">
												                        	<label for="ceco" class="titulos">Hostname :</label>
												                    	</div>
												                    	<div class="col-sm-4">
												                        	<input type="text" class="form-control" id="hostname" placeholder="" value="`+data.host_name+`" name="hostname">
												                    	</div>
												                    </row>
												                </row>
															</div>
									                      	<div class="grupo">
									                      		<row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-6">
												                        	<label  for="propietario" class="titulos">Sistema Operativo :</label>
												                    	</div>
												                    	<div class="col-sm-4">
												                    			<select class="form-control" id="selectsistemaO" name="sistemaO">
																                    <option value="`+data.id_os+`">`+data.nombre_os+`</option>
																                </select>
												                    	</div>
												                    </row>
												                </row>
									                      	</div>
									                      	<div class="grupo">
									                      	<row class="col-sm-12">
									                      		<div class="progress">
																	<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																		<span class="sr-only">100% Complete</span>
																	</div>
																</div>
									                      	</row>
									                      </div>
									                      <table class="table table-bordered table-striped" id="tabla_software_edit">
													    		<thead>
													    		</thead>
													    		<tbody>
														    	</tbody>
													    	</table>
													    </div>
													    <!-- /.tab-pane-->
													    <div id="tab_3" class="tab-pane">
													    	<table class="table table-bordered table-striped" id="tabla_periferico_edit">
													    		<thead>
													    			<tr>
													    			<tr>
													    		</thead>
													    		<tbody>
														    		<tr>
														    		<tr>
														    	</tbody>
													    	</table>
													    </div>
													    <!-- /.tab-pane-->
													    <div id="tab_6" class="tab-pane">
													   		<div class="grupo">
															    <row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="propietario" class="titulos">propietario</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                			<select class="form-control" id="selectPropietario" name="propietario">
															                    <option value="`+data.cod_propietario+`">`+data.nombre_propietario+`</option>
															                </select>
												                    	</div>
												                    </row>
												                </row>
															</div>
															<div class="grupo">
															    <row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="propietario" class="titulos">nivel de Impacto :</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                    			<select class="form-control" id="selectImpacto" name="impacto">
																                    <option value="`+data.cod_nivel_impacto+`">`+data.nombre_nivel_imp+`</option>
																                </select>
												                    	</div>
												                    </row>
												                </row>
															</div>
															<div class="grupo">
																<row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="hdd" class="titulos">responsable</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                    		<select class="form-control" id="selectResponsable" name="responsable">
																                <option value="`+data.cod_responsable+`">`+data.nombre_resp+`</option>
																            </select>
												                    	</div>
												                    </row>
												                </row>
															</div>
															<div class="grupo">
																<row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="hdd" class="titulos">asignado</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                    		<select class="form-control" id="selectAsignado" name="asignado">
																                <option value="`+data.cod_asignado+`">`+data.nombre_asignado+`</option>
																            </select>
												                    	</div>
												                    </row>
												                </row>
															</div>
															<div class="grupo">
															   <row class="col-sm-12">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label  for="hdd" class="titulos">ticket</label>
												                    	</div>
												                    	<div class="col-sm-7">
												                        	<input type="text" class="form-control" id="ticket" placeholder="" value="`+data.tk+`" name="ticket">
												                    	</div>
												                    </row>
												                </row>
															</div>
														</div>
													  </div>
													</div>
									            	<div class="grupo">
										        		<row class="col-sm-12  offset-sm-6">
											        		<row class="form-group">
											        			<row class="col-sm-4 offset-sm-2">
											        				<button id="submitButton" type="button" class="btn btn-primary">Confirmar</button>
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

						var newMarcas = document.querySelector('#selectMarcas')
						var newMarcasMon = document.querySelector('#selectMarcasMon')
						var newMarcasTec = document.querySelector('#selectMarcasTec')
						var newMarcasMou = document.querySelector('#selectMarcasMou')
						var newModelo = document.querySelector('#selectModelo')
						var newModeloMon = document.querySelector('#selectModeloM')
						var newModeloTec = document.querySelector('#selectModeloT')
						var newModeloMou = document.querySelector('#selectModeloMo')
						var newTipoE = document.querySelector('#selectTipoE')
						var newNivelI = document.querySelector('#selectImpacto')
						var newPropietario = document.querySelector('#selectPropietario')
						var newAsignado = document.querySelector('#selectAsignado')
						var newResponsable = document.querySelector('#selectResponsable')
						var newSistemaO = document.querySelector('#selectsistemaO')
						var newPaqueteO = document.querySelector('#selectpaqueteO')


						for (var i = 0; i < tipoEquipo.length; i++) {
							var opt = document.createElement('option');
				     		opt.value = tipoEquipo[i].cod_tipo_equipo;
				      		opt.innerHTML = tipoEquipo[i].nombre_tipo_equip;
				      		newTipoE.append(opt);
						}

						for (var i = 0; i < marcas.length; i++) {
							var opt = document.createElement('option');
					    	opt.value = marcas[i].cod_marca;
					    	opt.innerHTML = marcas[i].nombre_marca;
					    	newMarcas.append(opt);
						}

						for (var i = 0; i < marcas1.length; i++) {
							var opt1 = document.createElement('option');
					    	opt1.value = marcas1[i].cod_marca;
					    	opt1.innerHTML = marcas1[i].nombre_marca;
					    	newMarcasMon.append(opt1);
						}

						for (var i = 0; i < marcas2.length; i++) {
							var opt2 = document.createElement('option');
					    	opt2.value = marcas2[i].cod_marca;
					    	opt2.innerHTML = marcas2[i].nombre_marca;
					    	newMarcasTec.append(opt2);
						}

						for (var i = 0; i < marcas3.length; i++) {
							var opt3 = document.createElement('option');
					    	opt3.value = marcas3[i].cod_marca;
					    	opt3.innerHTML = marcas3[i].nombre_marca;
					    	newMarcasMou.append(opt3);
						}

						for (var i = 0; i < propietarios.length; i++) {
							var opt = document.createElement('option');
				        	opt.value = propietarios[i].cod_propietario;
				        	opt.innerHTML = propietarios[i].nombre_propietario;
				        	newPropietario.append(opt);
						}

						for (var i = 0; i < nivelI.length; i++) {
							var opt = document.createElement('option');
				        	opt.value = nivelI[i].cod_nivel_impacto;
				      		opt.innerHTML = nivelI[i].nombre_nivel_imp;
				      		newNivelI.append(opt);
						}

						for (var i = 0; i < responsable.length; i++) {
							var opt = document.createElement('option');
				     		opt.value = responsable[i].cod_responsable;
				      		opt.innerHTML = responsable[i].nombre_resp;
				      		newResponsable.append(opt);
						}

						for (var i = 0; i < asignado.length; i++) {
							var opt = document.createElement('option');
				     		opt.value = asignado[i].cod_asignado;
				      		opt.innerHTML = asignado[i].nombre_asignado;
				      		newAsignado.append(opt);
						}

						for (var i = 0; i < sistemaO.length; i++) {
							var opt = document.createElement('option');
				     		opt.value = sistemaO[i].cod_os;
				      		opt.innerHTML = sistemaO[i].nombre_os;
				      		newSistemaO.append(opt);
						}

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

						newMarcasMon.addEventListener('change', function(){
							newModeloMon.innerHTML = ''
							var idMarca = $( "#selectMarcasMon option:selected" ).val();
							$.get("/api-modelos/"+idMarca).done(function(data) {
					  			modelos = data.data
						  		for (var i = 0; i < modelos.length; i++) {
									var opt = document.createElement('option');
							      	opt.value = modelos[i].cod_modelo;
							      	opt.innerHTML = modelos[i].nombre_modelo;
							      	newModeloMon.append(opt);
								}
							});
						})

						newMarcasTec.addEventListener('change', function(){
							newModeloTec.innerHTML = ''
							var idMarca = $( "#selectMarcasTec option:selected" ).val();
							$.get("/api-modelos/"+idMarca).done(function(data) {
						  		modelos = data.data
						  		for (var i = 0; i < modelos.length; i++) {
									var opt = document.createElement('option');
							      	opt.value = modelos[i].cod_modelo;
							      	opt.innerHTML = modelos[i].nombre_modelo;
							      	newModeloTec.append(opt);
								}
							});
						})

						newMarcasMou.addEventListener('change', function(){
							newModeloMou.innerHTML = ''
							var idMarca = $( "#selectMarcasMou option:selected" ).val();
							$.get("/api-modelos/"+idMarca).done(function(data) {
					  			modelos = data.data
						  		for (var i = 0; i < modelos.length; i++) {
									var opt = document.createElement('option');
							      	opt.value = modelos[i].cod_modelo;
							      	opt.innerHTML = modelos[i].nombre_modelo;
							      	newModeloMou.append(opt);
								}
							});
						})

						$.get("/api-software/"+data.cod_activo_hw).done(function(dataOffDet) {
							var tablaSoft = document.getElementById("tabla_software_edit")
							if(tablaSoft.rows.length>1){
								tablaSoft.innerHTML = ""
							}
							
							var customers = new Array();

							if (dataOffDet.data.length == 0){
								customers.push(["Version Office", "Version Software", "ACCIONES"]);
								customers.push([
									"N/A", 
									"N/A",
									`<div class="input-group-btn">
									  		<button type="button" class="btn btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones
												<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
											  <ul class="dropdown-menu">
													<li><a href="#" id="nuevoOffice">Nuevo</a></li>
											  </ul>
										</div>`]);
							}
							else{
								customers.push(["Version Office", "Version Software", "Acciones"]);
							    for (var i = 0; i < dataOffDet.data.length; i++) {
							    	customers.push([
							    		dataOffDet.data[i].nombre_office, 
							    		dataOffDet.data[i].nombre_programa,
							    		`<div class="input-group-btn">
									  		<button type="button" class="btn btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones
												<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
											  <ul class="dropdown-menu">
													<li><a href="#" data-key="`+dataOffDet.data[i].cod_activo_sw+`" id="eliminarOffice">Eliminar</a></li>
													<li class="divider"></li>
													<li><a href="#" id="nuevoOffice">Nuevo</a></li>
											  </ul>
										</div>`
							    	]);
							    }
							}
						 
						    //Get the count of columns.
						    var columnCount = customers[0].length;
						 
						    //Add the header row.
						    var row = tablaSoft.insertRow(-1);
						    for (var i = 0; i < columnCount; i++) {
						        var headerCell = document.createElement("TH");
						        headerCell.innerHTML = customers[0][i];
						        row.appendChild(headerCell);
						    }
						 
						    //Add the data rows.
						    for (var i = 1; i < customers.length; i++) {
						        row = tablaSoft.insertRow(-1);
						        for (var j = 0; j < columnCount; j++) {
						            var cell = row.insertCell(-1);
						            cell.innerHTML = customers[i][j];
						        }
						    }
						});

						$.get("/api-perifericos/"+data.cod_activo_hw).done(function(dataPerDet) {
							var tablaPeri = document.getElementById("tabla_periferico_edit")
							if(tablaPeri.rows.length>1){
								tablaPeri.innerHTML = ""
							}
							
							var perifericosDat = new Array();

							if (dataPerDet.data.length == 0){
								perifericosDat.push(["Tipo Periferico", "Modelo Periferico", "Serial Periferico", "Activo Periferico", "ACCIONES"]);
								perifericosDat.push(["N/A", "N/A", "N/A", "N/A",
									`<div class="input-group-btn">
									  		<button type="button" class="btn btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones
												<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
											  <ul class="dropdown-menu">
													<li><a href="#" id="nuevoPeriferico">Insertar</a></li>
											  </ul>
										</div>`]);
							}
							else{
								perifericosDat.push(["Tipo Periferico", "Modelo Periferico", "Serial Periferico", "Activo Periferico", "ACCIONES"]);
							    for (var i = 0; i < dataPerDet.data.length; i++) {
							    	perifericosDat.push([
							    		dataPerDet.data[i].nombre_tipo_equip, 
							    		dataPerDet.data[i].nombre_modelo, 
							    		dataPerDet.data[i].serial_perif,
							    		dataPerDet.data[i].num_activo_perif,
							    		`<div class="input-group-btn">
									  		<button type="button" class="btn btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones
												<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
											  <ul class="dropdown-menu">
													<li><a href="#" data-Per="`+dataPerDet.data[i].cod_periferico+`" id="eliminarPeriferico">Eliminar</a></li>
													<li class="divider"></li>
													<li><a href="#" id="nuevoPeriferico">Insertar</a></li>
											  </ul>
										</div>`
							    	]);
							    }
							}
						 
						    //Get the count of columns.
						    var columnCount = perifericosDat[0].length;
						 
						    //Add the header row.
						    var row = tablaPeri.insertRow(-1);
						    for (var i = 0; i < columnCount; i++) {
						        var headerCell = document.createElement("TH");
						        headerCell.innerHTML = perifericosDat[0][i];
						        row.appendChild(headerCell);
						    }
						 
						    //Add the data rows.
						    for (var i = 1; i < perifericosDat.length; i++) {
						        row = tablaPeri.insertRow(-1);
						        for (var j = 0; j < columnCount; j++) {
						            var cell = row.insertCell(-1);
						            cell.innerHTML = perifericosDat[i][j];
						        }
						    }
						});
		   	}
	   	}
	   	else {
	   		$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTE ACTIVO</h2>
									<div class="row">
										<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
									</div>
						`)
	   	}

	   	

		});
  	});

	$('#example2 tbody').on( 'click', '#mover', function () {
		
		var tablon = $("#example2").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()
		 $("#sendTraslado").modal()
		    $("#sendTraslado").on('shown.bs.modal', function(e) {
		    	$(this).off('shown.bs.modal');
		    	$('#tableModalTraslado').html('')

		    	if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
			   		if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
							$('#tableModalTraslado').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTE ACTIVO</h2>
																		<div class="row">
																			<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																		</div>
								`)
				   	}
				   	else {

					    $('#tableModalTraslado').html(`<h2 class="text-center">TRASLADO DE ACTIVO</h2>
											    <div class="row">
											        <div class="col-md-12 mx-auto">
											            <form id="edit-form" method="post" action="/Traslado/`+data.cod_activo_hw+`"">
											            	<input type="text" class="form-control hidden" id="indiceB" placeholder="" value="`+data.cod_activo_hw+`" name="indiceA">
											            	<div class="row">
										        	<div class="col-md-12 mx-auto">
										            <form>
											            	<div class="grupo">
												            	<row>
												                    <div class="col-sm-12">
												                        <label class="titulos">Tipo de Activo :</label>
												                        <label class="info">`+data.nombre_tipo_equip+`</label>
												                    </div>
												                </row>
												            </div>
												            <div class="grupo">
												            	<row>
												            		<div class="col-sm-6">
												                        <label class="titulos">Marca :</label>
												                        <label class="info">`+data.marca_equi+`</label>
												                    </div>
												                    <div class="col-sm-6">
												                        <label class="titulos">Modelo :</label>
												                        <label class="info">`+data.modelo_equi+`</label>
												                    </div>
												                </row>
												            <div class="grupo">
												                <row>
												                    <div class="col-sm-6">
												                        <label class="titulos">plaqueta :</label>
												                        <label class="info">`+data.num_activo_equi+`</label>
												                    </div>
												                     <div class="col-sm-6">
												                        <label class="titulos">serial :</label>
												                        <label class="info">`+data.serial_equipo+`</label>
												                    </div>
												                </row>
												            </div>
												            <div class="grupo">
												                <row>
												                    <div class="col-sm-6">
												                        <label class="titulos">Serial Monitor :</label>
												                        <label class="info">`+data.serial_mon+`</label>
												                    </div>
												                    <div class="col-sm-6">
												                        <label class="titulos">Plaqueta MOnitor: :</label>
												                        <label class="info">`+data.num_activo_mon+`</label>
												                    </div>
												                </row>
												            </div>
												            <div class="grupo">
												                <row>
												                    <div class="col-sm-6">
												                        <label class="titulos">Serial Teclado :</label>
												                        <label class="info">`+data.serial_tec+`</label>
												                    </div>
												                    <div class="col-sm-6">
												                        <label class="titulos">Plaqueta Mouse: :</label>
												                        <label class="info">`+data.serial_mou+`</label>
												                    </div>
												                </row>
												            </div>
												            <div class="grupo">
										                      	<row class="col-sm-12">
										                      		<div class="progress">
																		<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
																			<span class="sr-only">100% Complete</span>
																		</div>
																	</div>
										                      	</row>
										                      </div>
												            <div class="grupo">
											            		<row class="col-sm-5">
												            		<row class="form-group">
												            			<div class="col-sm-3">
												                    <label  for="propietario" class="titulos">pais :</label>
												                  </div>
												                  <div class="col-sm-7">
												                    <input type="text" class="form-control" id="pais" placeholder="" value="`+data.nombre_pais+`" disabled>
												                  </div>
												                </row>
												              </row>
												              <row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label for="nombrearea" class="titulos">ciudad :</label>
												                    	</div>
												                    	<div class="col-sm-8">
													                    	<select class="form-control" id="selectCiudad" name="cod_ciudad">
															                    <option value="`+data.cod_ciudad+`">`+data.nombre_ciudad+`</option>
															                  </select>
												                    	</div>
												                    </row>
												                </row>
												            </div>
												            <div class="grupo">
												            	<row class="col-sm-5">
										            				<row class="form-group">
										            					<div class="col-sm-3">
										                        	<label for="nombrearea" class="titulos">sede :</label>
										                    	</div>
										                    	<div class="col-sm-7">
										                    		<select class="form-control" id="selectSede" name="cod_sede">
													                    <option value="`+data.cod_sede+`">`+data.nombre_sede+`</option>
													                  </select>
										                    	</div>
										                    </row>
												              </row>
												            	<row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                        	<label for="nombrearea" class="titulos">Campaña :</label>
												                    	</div>
												                    	<div class="col-sm-8">
												                    		<select class="form-control" id="selectCampana" name="cod_campana">
															                    <option value="`+data.cod_campana+`">`+data.nombre_campana+`</option>
															                  </select>
												                    	</div>
												                    </row>
												                </row>
												            </div>
												            <div class="grupo">
												                <row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-3">
												                        	<label for="nombrearea" class="titulos">puesto :</label>
												                    	</div>
												                    	<div class="col-sm-8">
												                    		<select class="form-control" id="selectPuesto" name="cod_puesto">
															                    <option value="`+data.cod_puesto+`">`+data.num_puesto+`</option>
															                  </select>
												                    	</div>
												                    </row>
												                </row>
												            </div>
													        	<div class="grupo">
													        		<row class="col-sm-12  offset-sm-6">
														        		<row class="form-group">
														        			<row class="col-sm-4 offset-sm-2">
														        				<button id="submitButton" type="button" class="btn btn-primary">Confirmar</button>
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

							var newCiudad = document.querySelector('#selectCiudad')
							var newSede = document.querySelector('#selectSede')
							var newCampana = document.querySelector('#selectCampana')
							var newPuesto = document.querySelector('#selectPuesto')

							if (ciudades != null){
								for (var i = 0; i < ciudades.length; i++) {
									var opt = document.createElement('option');
						      opt.value = ciudades[i].cod_ciudad;
						      opt.innerHTML = ciudades[i].nombre_ciudad;
						      newCiudad.append(opt);
								}
							}

							var opt4 = document.createElement('option');
				        opt4.value = 'A';
				        opt4.innerHTML = ('---------------')
				        opt4.disabled = true
				        newSede.append(opt4);

							for (var i = 0; i < sedes.length; i++) {
								var opt = document.createElement('option');
					      opt.value = sedes[i].cod_sede;
					      opt.innerHTML = sedes[i].nombre_sede;
					      newSede.append(opt);
							}

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
						}
					}
					else {
			   		$('#tableModalTraslado').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTE ACTIVO</h2>
																		<div class="row">
																			<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																		</div>
								`)
			   	}
			});
  	});

	$('#example2 tbody').on( 'click', '#eliminar', function () {
		
		var tablon = $("#example2").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()
		console.log(data)
	  $("#confirmTraslado").modal()
	  $("#confirmTraslado").on('shown.bs.modal', function(e) {
	  	$(this).off('shown.bs.modal');
	   	$('#tableModal').html('')

	   	if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
	   		if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
					$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA ELIMINAR ESTE ACTIVO</h2>
																<div class="row">
																	<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																</div>
						`)
		   	}
		   	else {
		   		$('#tableModal').html(`<h2 class="text-center">ELIMINAR ACTIVO</h2>
									    <div class="row">
									        <div class="col-md-10 mx-auto">
									            <form id="edit-form" method="post" action="/eliminarA/`+data.cod_activo_hw+`"">
									            	<input type="text" class="form-control hidden" id="indiceA" placeholder="" value="`+data.cod_activo_hw+`" name="indiceA">
									            	<h2>Esta seguro que desea eliminar este activo?</h2>
										        	<div class="grupo">
										        		<row class="col-sm-12">
											        		<row class="form-group">
											        			<row class="col-sm-4 offset-sm-2">
											        				<button id="submitButtonEliminar" type="button" class="btn btn-primary">Confirmar</button>
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
	   		$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTE ACTIVO</h2>
																<div class="row">
																	<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																</div>
						`)
	   	}

	   	

		});
  	});

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

	///// Boton Enviar Consulta
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

	////////////Boton Editar
	$('#confirmTraslado').on('click', '#submitButton',function(){
		var indic = $('#indiceA').val()
		var formData = {
            'id_tipo_equipo'          : $('select[name=cod_tipo_equip]').val(),
            'id_propietario'          : $('select[name=propietario]').val(),
            'id_responsable'		  : $('select[name=responsable]').val(),
            'id_asignado'			  : $('select[name=asignado]').val(),
            'id_os'			  		  : $('select[name=sistemaO]').val(),
            'host_name'               : $('input[name=hostname]').val(),
            'ip'              		  : $('input[name=dirIP]').val(),
            'modelo_equi'             : $('select[name=modelo_equi]').val(),
            'serial_equipo'           : $('input[name=serial]').val(),
            'num_activo_equi'         : $('input[name=plaqueta]').val(),
            'modelo_mon'			  : $('select[name=modeloMon]').val(),
            'serial_mon'              : $('input[name=monitor]').val(),
            'num_activo_mon'          : $('input[name=monitorp]').val(),
            'modelo_tec'			  : $('select[name=modeloTec]').val(),
            'serial_tec'              : $('input[name=teclado]').val(),
            'modelo_mau'			  : $('select[name=modeloMou]').val(),
            'serial_mou'              : $('input[name=mouse]').val(),
            'cpu'              				: $('input[name=cpu]').val(),
            'ram'              				: $('input[name=ram]').val(),
            'hdd'              				: $('input[name=hdd]').val(),
            'tk'              				: $('input[name=ticket]').val(),
            'id_nivel_imp'     				: $('select[name=impacto]').val()
        };

     $.ajax({
	      url: '/Editar/' + indic,
	      // contentType: 'application/json',
	      type: 'POST',	
	      data: formData,	
	      success: function(response) {
		      $('#confirmTraslado').modal('toggle')
		      $("#modalOK").modal()
		      // $("#mensajeModal").html('')
		    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
		    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
	      }
	    })
	})

	///////////Boton Eliminar
	$('#confirmTraslado').on('click', '#submitButtonEliminar',function(){
		var indic = $('#indiceA').val()
	    $.ajax({
		      url: '/eliminarA/' + indic,
		      // contentType: 'application/json',
		      type: 'POST',	
		      success: function(response) {
			      $('#confirmTraslado').modal('toggle')
			      $("#modalOK").modal()
			      // $("#mensajeModal").html('')
			    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
		      }
		    })
	})

	//////// Modal Nuevo Office
	$('#confirmTraslado').on('click', '#nuevoOffice',function(){

		indicSoftware = $('#indiceA').val()

		$("#insertarModal").modal()
		$("#insertarModal h2").html(`<h2 class="text-center">Ingreso de Software</h2>`)
		$("#insertarModal h4").html(`<h4 class="text-center">Seleccion el software a ingresar</h4>`)
		$("#insertarModal #tableofficeIn").html(`<table class="table table-bordered text-center" id="">
													<thead>
														<tr>
															<th>Version Office</th>
															<th>Version Software</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<select class="form-control" id="selectInsertOffice" name="newOffice">
																	<option value="null">Seleccion Version Office</option>
																</select>
															</td>
															<td>
																<select class="form-control" id="selectInsertPrograma" name="newPrograma">
																	<option value="null">Seleccion Version Programa</option>
																</select>
															</td>
														</tr>
													</tbody>
												</table>`)
		$("#insertarModal #footerOfice").html(`<row class="form-group">
								        			<row class="col-sm-4 offset-sm-2">
								        				<button id="nuevoOfficeInsert" type="button" class="btn btn-primary">Confirmar</button>
						                			</row>
								                	<row class="col-sm-4 offset-sm-2">
								                		<button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
								                	</row>
						                		</row>`)

		var newOfficeSelect = document.querySelector('#selectInsertOffice')
		var newProgramaSelect = document.querySelector('#selectInsertPrograma')

		for (var i = 0; i < paqueteOffice.length; i++) {
			var opt = document.createElement('option');
     		opt.value = paqueteOffice[i].cod_office;
      		opt.innerHTML = paqueteOffice[i].nombre_office;
      		newOfficeSelect.append(opt);
		}

		for (var i = 0; i < programas.length; i++) {
			var opt = document.createElement('option');
     		opt.value = programas[i].cod_programa;
      		opt.innerHTML = programas[i].nombre_programa;
      		newProgramaSelect.append(opt);
		}		
	})

	//////// Modal Nuevo Periferico
	$('#confirmTraslado').on('click', '#nuevoPeriferico',function(){

		indicPeriferico = $('#indiceA').val()

		$("#insertarModal").modal()
		$("#insertarModal h2").html(`<h2 class="text-center">Ingreso de Perifericos</h2>`)
		$("#insertarModal h4").html(`<h4 class="text-center">Seleccion el periferico a ingresar</h4>`)
		$("#insertarModal #tableofficeIn").html(`<table class="table table-bordered text-center" id="">
													<thead>
														<tr>
															<th>Tipo Periferico</th>
															<th>Marca</th>
															<th>Modelo</th>
															<th>Serial</th>
															<th>Plaqueta</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<select class="form-control" id="selectInsertTipoPer" name="newTipoPer">
																	<option value="null">Seleccione Tipo</option>
																</select>
															</td>
															<td>
																<select class="form-control" id="selectInsertMarcaPer" name="newMarcaPer">
																	<option value="null">Seleccion Marca</option>
																</select>
															</td>
															<td>
																<select class="form-control" id="selectInsertModeloPer" name="newModeloPer">
																	<option value="null">Seleccion Modelo</option>
																</select>
															</td>
															<td>
																<input type="text" class="form-control" id="inputInsertSerialPer" placeholder="" name="newSerialPer">
															</td>
															<td>
																<input type="text" class="form-control" id="inputInsertActivoPer" placeholder="" name="newActivoPer">
															</td>
														</tr>
													</tbody>
												</table>`)
		$("#insertarModal #footerOfice").html(`<row class="form-group">
								        			<row class="col-sm-4 offset-sm-2">
								        				<button id="nuevoPerifericoInsert" type="button" class="btn btn-primary">Confirmar</button>
						                			</row>
								                	<row class="col-sm-4 offset-sm-2">
								                		<button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
								                	</row>
						                		</row>`)

		var newTipoPerSelect = document.querySelector('#selectInsertTipoPer')
		var newMarcaPerSelect = document.querySelector('#selectInsertMarcaPer')
		var newModeloPerSelect = document.querySelector('#selectInsertModeloPer')
		

		for (var i = 0; i < tipoEquipo1.length; i++) {
			var opt = document.createElement('option');
     		opt.value = tipoEquipo1[i].cod_tipo_equipo;
      		opt.innerHTML = tipoEquipo1[i].nombre_tipo_equip;
      		newTipoPerSelect.append(opt);
		}

		for (var i = 0; i < marcas4.length; i++) {
			var opt = document.createElement('option');
     		opt.value = marcas4[i].cod_marca;
      		opt.innerHTML = marcas4[i].nombre_marca;
      		newMarcaPerSelect.append(opt);
		}

		newMarcaPerSelect.addEventListener('change', function(){
							newModeloPerSelect.innerHTML = ''
							var idMarca = $( "#selectInsertMarcaPer option:selected" ).val();
							$.get("/api-modelos/"+idMarca).done(function(data) {
					  			modelos = data.data
						  		for (var i = 0; i < modelos.length; i++) {
									var opt = document.createElement('option');
							      	opt.value = modelos[i].cod_modelo;
							      	opt.innerHTML = modelos[i].nombre_modelo;
							      	newModeloPerSelect.append(opt);
								}
							});
						})
	})

	//////// Modal Confirmar Delete Office
	$('#confirmTraslado').on('click', '#eliminarOffice', function () {

  		var tableData = $(this).closest('li')
  		indicSoftwareDel = null
			indicSoftwareDel = tableData.context.dataset.key

			$("#deleteModal").modal()
			$("#deleteModal h2").html(`<h2 class="text-center">ELIMINAR SOFTWARE</h2>`)
			$("#deleteModal h4").html(`<h4 class="text-center">Esta seguro que desea eliminar esta licencia?</h4>`)
			$("#deleteModal #footerOficeDelete").html(`<row class="form-group">
									        			<row class="col-sm-4 offset-sm-2">
									        				<button id="deleteOfficeInsert" type="button" class="btn btn-primary">Confirmar</button>
							                			</row>
									                	<row class="col-sm-4 offset-sm-2">
									                		<button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
									                	</row>
							                		</row>`)		
	})

	//////// Modal Confirmar Delete Periferico
	$('#confirmTraslado').on('click', '#eliminarPeriferico', function () {

  		var tableData = $(this).closest('li')
  		indicPerifericoDel = null
		indicPerifericoDel = tableData.context.dataset.per

			$("#deleteModal").modal()
			$("#deleteModal h2").html(`<h2 class="text-center">ELIMINAR PERIFERCIO</h2>`)
			$("#deleteModal h4").html(`<h4 class="text-center">Esta seguro que desea eliminar este Periferico?</h4>`)
			$("#deleteModal #footerOficeDelete").html(`<row class="form-group">
									        			<row class="col-sm-4 offset-sm-2">
									        				<button id="deletePerifericoInsert" type="button" class="btn btn-primary">Confirmar</button>
							                			</row>
									                	<row class="col-sm-4 offset-sm-2">
									                		<button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
									                	</row>
							                		</row>`)		
	})

	//////// Boton Enviar Traslado
	$('#sendTraslado').on('click', '#submitButton',function(){
		var indic2 = $('#indiceB').val()
		var puestoFin = $('select[name=cod_puesto]').val()
     $.ajax({
	      url: '/Traslado/' + indic2 + '/' + puestoFin,
	      // contentType: 'application/json',
	      type: 'POST',	
	      // data: formData2,	
	      success: function(response) {
		      $('#sendTraslado').modal('toggle')
		      $("#modalOK").modal()
		      // $("#mensajeModal").html('')
		    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
		    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
	      }
	    })
	})

	////////// Boton Eliminar Office
	$('#deleteModal').on('click', '#deleteOfficeInsert',function(){
		
			$.ajax({
		      url: '/eliminarSoftware/' + indicSoftwareDel,
		      // contentType: 'application/json',
		      type: 'POST',	
		      success: function(response) {
			      $('#deleteModal').modal('toggle')
			      $("#modalOK").modal()
			      // $("#mensajeModal").html('')
			    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
		      }
		    })
	})

	////////// Boton Eliminar Periferico
	$('#deleteModal').on('click', '#deletePerifericoInsert',function(){

	    $.ajax({
		      url: '/eliminarPerifericos/' + indicPerifericoDel,
		      // contentType: 'application/json',
		      type: 'POST',	
		      success: function(response) {
			      $('#deleteModal').modal('toggle')
			      $("#modalOK").modal()
			      // $("#mensajeModal").html('')
			    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
		      }
		    })
	})

	///////// Boton Nuevo Office
	$('#insertarModal').on('click', '#nuevoOfficeInsert',function(){

		var formDataInsert = {
	      'id_activo_hw'       : indicSoftware,
	      'id_office'          : $('select[name=newOffice]').val(),
	      'id_programa'        : $('select[name=newPrograma]').val()
  		};
	     $.ajax({
		      url: '/InsertarSoftware',
		      type: 'POST',	
		      data: formDataInsert,	
		      success: function(response) {
			      $('#insertarModal').modal('toggle')
			      $("#modalOK").modal()
			      // $("#mensajeModal").html('')
			    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    	$("#modalOK h4").html(`<h3 class="text-center">`+ response.error.code+`</h3>`)
			    	$("#modalOK p").html(`<p class="text-center">`+ response.error.sqlMessage+`</p>`)
		      }
		    })
	})

	///////// Boton Nuevo Periferico
	$('#insertarModal').on('click', '#nuevoPerifericoInsert',function(){

		var formDataInsert = {
	      'id_activo_hw'       	: indicPeriferico,
	      'id_model'          	: $('select[name=newModeloPer]').val(),
	      'nombre_periferico' 	: $('select[name=newTipoPer]').val(),
	      'serial_perif'        : $('input[name=newSerialPer]').val(),
	      'num_activo_perif'    : $('input[name=newActivoPer]').val()
  		};
	     $.ajax({
		      url: '/InsertarPeriferico',
		      type: 'POST',	
		      data: formDataInsert,	
		      success: function(response) {
			      $('#insertarModal').modal('toggle')
			      $("#modalOK").modal()
			      // $("#mensajeModal").html('')
			    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    	$("#modalOK h4").html(`<h3 class="text-center">`+ response.error.code+`</h3>`)
			    	$("#modalOK p").html(`<p class="text-center">`+ response.error.sqlMessage+`</p>`)
		      }
		    })
	})


	var $j = jQuery.noConflict(true)
})



