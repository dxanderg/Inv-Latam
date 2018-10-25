$(document).ready(function() {

	$('#select2').prop('disabled', 'disabled');
	$('#select3').prop('disabled', 'disabled');
	$('#botonconsulta').hide();
	$('#botonconsulta2').hide();

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
	    	url: '/api-paisesComdata',
	    	contentType: 'application/json',
	    	success: function(response) {
	        	var selectItems = $('#select4');
        		selectItems.html('');
        		var opt3 = document.createElement('option');
	        	opt3.value = 'A';
	        	opt3.innerHTML = ('Seleccione el Pais')
	        	selectItems.append(opt3);
	        	for(i=0; i<response.data.length; i++){
	        		var opt = document.createElement('option');
	            	opt.value = response.data[i].cod_pais;
	            	opt.innerHTML = response.data[i].nombre_pais
	            	selectItems.append(opt);
	        	}
      		}
    	})

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

    	var selectPais = $('#select4')
    	selectPais.html('')
    	var opt4 = document.createElement('option');
    	var opt5 = document.createElement('option');
    	opt4.value = 'A';
	    opt4.innerHTML = ('Seleccione el Pais')
	    selectPais.append(opt4);
	    opt5.value = idPais
	    opt5.innerHTML = nombrePais
	    selectPais.append(opt5);
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

	if ( perfiluser == 'administrador'){
		$.get("/api-pais/"+ idPais).done(function(data) {
  		ciudades = data.data
		});
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

	$('#select4').on('change', function(){
		$('#botonconsulta2').show()
	})

	$('#botonconsulta').on('click', function(){
		
		if ($("#select2").val() == 'null'){
			alert('Por favor seleccione una opción para la consulta')	
		}
		else {
			if ($("#select3").val() == 'A' || $("#select3").val() == 'null'){
				var dato1 = $("#select2").val()
				var dato2 = $("#select3").val()

				window.location = "/reporte_sede/" + dato1
			}
			else{
				var dato1 = $("#select2").val()
				var dato2 = $("#select3").val()

				window.location = "/reporte_campana/" + dato1 + "/" + dato2
			}
		}
	})

	$('#botonconsulta2').on('click', function(){
		
		if ($("#select4").val() == 'A'){
			alert('Por favor seleccione una opción para la consulta')	
		}
		else {
			var dato = $("#select4").val()

			window.location = "/reporte_pais/" + dato
		}
	})

		var $j = jQuery.noConflict(true)

})


