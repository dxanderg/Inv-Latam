$(document).ready(function() {

	$('#select2').prop('disabled', 'disabled');
	$('#select3').prop('disabled', 'disabled');
	$('#botonconsulta').hide();

	var tabla = null
	var ruta = null
	var ciudades = null
	var sedes = null
	var pisos = null
	var puestos = null
	var campanas = null
	var sedeubica = null

	$.get("/api-campana/").done(function(data) {
		campanas = data.data
	});

	$.get("/api-ciudad/" + idCiudad).done(function(data) {
		sedes = data.data
	});

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


	if ( perfiluser == 'administrador'){
		$.get("/api-pais/"+ idPais).done(function(data) {
  		ciudades = data.data
		});
	}

	function renderTable(){
		var table= $('#example2').DataTable( {
    	"autoWidth": false,
    	"initComplete": setTimeout(function(settings, json) {$j('#select1').trigger("click")}, 500),
		  "ajaxSource": ruta,
		  "columns": [
		    { "data": "nombre_sede" },
		    { "data": "nombre_campana" },
		    { "data": "nombre_area" },
		    { "data": "nom_tp_ubicacion" },
		    { "data": "nombre_piso" },
		    { "data": "num_puesto" },
		    {
		      sortable: false,
		      "render": function ( data, type, full, meta ) {
		      	// var buttonID = "rollover_"+full.ceco;
		      	// var buttonID = "rollover_"+full.ceco;
		      	// var buttonID = "rollover_"+full.ceco;
		       	return `<div class="input-group-btn open">
										  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones
											<span class="fa fa-caret-down"></span><div class="ripple-container"></div></button>
										  <ul class="dropdown-menu">
												<li><a href="#" id="editar">Editar</a></li>
												<li class="divider"></li>
												<li><a href="#" id="eliminarU">Eliminar</a></li>
										  </ul>
										</div>`
		      }
        }
		  ]
		} );
	}

	$('#example2 tbody').on( 'click', '#editar', function () {

		var tablon = $("#example2").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()
	  $("#cambioUbicacion").modal()
	  $("#cambioUbicacion").on('shown.bs.modal', function(e) {
	   	$('#tableModal').html('')

	   	if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
	   		if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
					$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTA UBICACION</h2>
																<div class="row">
																	<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
																</div>
						`)
		   	}
		   	else {
		   		$('#tableModal').html(`<h2 class="text-center">EDITAR UBICACION</h2>
									    <div class="row">
									        <div class="col-md-12 mx-auto">
									            <form id="edit-form" method="post" action="/edit-ubicacion/`+data.cod_ubicacion+`"">
									            	<input type="text" class="form-control hidden" id="indiceA" placeholder="" value="`+data.cod_ubicacion+`" name="indiceA">
										            <div class="grupo">
									            		<row class="col-sm-6">
										            		<row class="form-group">
										            			<div class="col-sm-4">
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
										                    	<div class="col-sm-7">
										                        	<input type="text" class="form-control" id="ciudad" placeholder="" value="`+data.nombre_ciudad+`" disabled>
										                    	</div>
										                    </row>
										                </row>
										            </div>
										            <div class="grupo">
										            	<row class="col-sm-6">
										            		<row class="form-group">
										            			<div class="col-sm-4">
										                        	<label for="nombrearea" class="titulos">sede :</label>
										                    	</div>
										                    	<div class="col-sm-7">
										                        	<input type="text" class="form-control" id="sede" placeholder="" value="`+data.nombre_sede+`" disabled>
										                    	</div>
										                    </row>
										                </row>
									            		<row class="col-sm-6">
										            		<row class="form-group">
										            			<div class="col-sm-4">
										                        	<label  for="propietario" class="titulos">piso :</label>
										                    	</div>
										                    	<div class="col-sm-7">
										                        	<input type="text" class="form-control" id="piso" placeholder="" value="`+data.nombre_piso+`" disabled>
										                    	</div>
										                    </row>
										                </row>
										                <row class="col-sm-6">
										            		<row class="form-group">
										            			<div class="col-sm-4">
										                        	<label for="nombrearea" class="titulos">puesto :</label>
										                    	</div>
										                    	<div class="col-sm-7">
										                        	<input type="text" class="form-control" id="puesto" placeholder="" value="`+data.num_puesto+`" disabled>
										                    	</div>
										                    </row>
										                </row>
										                <div class="grupo">
												              <row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                    <label for="nombrearea" class="titulos">area :</label>
												                  </div>
												                  <div class="col-sm-7">
												                    <input type="text" class="form-control" id="area" placeholder="" value="`+data.nombre_area+`" name="" disabled>
												                  </div>
												                </row>
											              	</row>
											            	</div>
											            	<div class="grupo">
												              <row class="col-sm-6">
												            		<row class="form-group">
												            			<div class="col-sm-4">
												                    <label for="nombrearea" class="titulos">Campaña :</label>
												                  </div>
												                  <div class="col-sm-7">
												                    <select class="form-control" id="selectCampanaN" name="cod_campana">
													                    <option value="`+data.cod_campana+`">`+data.nombre_campana+`</option>
													                  </select>
												                  </div>
												                </row>
											              	</row>
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

						var newCampana = document.querySelector('#selectCampanaN')

						for (var i = 0; i < campanas.length; i++) {
							if (campanas[i].id_sede == data.cod_sede){
								var opt = document.createElement('option');
					      opt.value = campanas[i].cod_campana;
					      opt.innerHTML = campanas[i].nombre_campana;
					      newCampana.append(opt);
							}
						}
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

	$('#example2 tbody').on( 'click', '#eliminarU', function () {
		var tablon = $("#example2").DataTable()
		var data = tablon.row( $(this).parents('tr') ).data()
		$("#cambioUbicacion").modal()
		$("#cambioUbicacion").on('shown.bs.modal', function(e) {
			$('#tableModal').html('')

			if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
				if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
					$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA ELIMINAR ESTA UBICACION</h2>
											<div class="row">
												<button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
											</div>
						`)
				}
				else {
					$('#tableModal').html(`<h2 class="text-center">ELIMINAR UBICACION</h2>
									    <div class="row">
									        <div class="col-md-10 mx-auto">
									            <form id="edit-form" method="post" action="/eliminarU/`+data.cod_ubicacion+`"">
									            	<input type="text" class="form-control hidden" id="indiceA" placeholder="" value="`+data.cod_ubicacion+`" name="indiceA">
									            	<h2>Esta seguro que desea eliminar esta Ubicacion?</h2>
										        	<div class="grupo">
										        		<row class="col-sm-12">
											        		<row class="form-group">
											        			<row class="col-sm-4 offset-sm-2">
											        				<button id="submitButtonEliminarU" type="button" class="btn btn-primary">Confirmar</button>
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
				$('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA ELIMINAR ESTA UBICACION</h2>
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

	$('#botonconsulta').on('click', function(){
		
		
		if ($("#select2").val() == 'null'){
			alert('Por favor seleccione una opción para la consulta')	
		}
		else {
			if ($("#select3").val() == 'A' || $("#select3").val() == 'null'){
				var dato1 = $("#select2").val()
				var dato2 = $("#select3").val()

				ruta = "/api_query_sede_ubica/" + dato1
			}
			else{
				var dato1 = $("#select2").val()
				var dato2 = $("#select3").val()

				ruta = "/api_query_campana_ubica/" + dato1 + "/" + dato2
			}
			$("#example2").dataTable().fnDestroy();

			renderTable()
		}
	})

	$('#cambioUbicacion').on('click', '#submitButton',function(){
		var indic = $('#indiceA').val()
		var formData = {
            'id_campana' : $('select[name=cod_campana]').val()
        };
     $.ajax({
	      url: '/edit-ubicacion/' + indic,
	      // contentType: 'application/json',
	      type: 'POST',	
	      data: formData,	
	      success: function(response) {
		      $('#cambioUbicacion').modal('toggle')
		      $("#modalOK").modal()
		      // $("#mensajeModal").html('')
		    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
		    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
	      }
	    })
	})

	$('#cambioUbicacion').on('click', '#submitButtonEliminarU',function(){
		var indic = $('#indiceA').val()
	    $.ajax({
		      url: '/eliminarU/' + indic,
		      // contentType: 'application/json',
		      type: 'POST',	
		      success: function(response) {
			      $('#cambioUbicacion').modal('toggle')
			      $("#modalOK").modal()
			      // $("#mensajeModal").html('')
			    	$("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
			    	$("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
		      }
		    })
	})

	
	var $j = jQuery.noConflict(true)
})






