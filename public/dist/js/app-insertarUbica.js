$(document).ready(function() {

    var tabla = null
    var ruta = null
    var ciudades = null
    var sedes = null
    var pisos = null
    var puestos = null
    var tiposU = null

    ruta = "/api_query_ciudad_ubica/" + idCiudad
    rutaPiso = "/api-pisos"
    rutaPuesto = "/api-puestos"
    rutaCampana = "/api-campana"

    // if (perfiluser == 'lectura' || perfiluser == 'administrador'){    
    // }
    // else{
    // }

    // if ( perfiluser == 'administrador'){
    //     $.get("/api-pais/"+ idPais).done(function(data) {
    //     ciudades = data.data
    //     });
    // }

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////------TAB PISO--------//////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

        ///////FUNCION RENDER DE LA DATATABLE PISOS
        function renderTablePiso(){
            var table= $('#tabla-piso').DataTable({
                "autoWidth": false,
                // "initComplete": setTimeout(function(settings, json) {$j('#botondummy').trigger("click")}, 500),
                "initComplete": function() {var cliko = document.getElementById('botondummy').click()},
                "ajaxSource": rutaPiso,
                "columns": [
                    { "data": "cod_piso" },
                    { "data": "nombre_piso" },
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
                                                        <li><a href="#" id="editarPiso">Editar</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#" id="eliminarPiso">Eliminar</a></li>
                                                  </ul>
                                                </div>`
                      }
                    }
                ]
            });
        }

        //////////BOTON EJECUTAR CONSULTA DE PISOS
        $('#botonconsultapisos').click( function(){
            $("#tabla-piso").dataTable().fnDestroy();
            renderTablePiso()
        })

    ///////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////------TAB PUESTO--------/////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

        ///////FUNCION RENDER DE LA DATATABLE PUESTO
        function renderTablePuesto(){
            var table= $('#tabla-puesto').DataTable({
                "autoWidth": false,
                // "initComplete": setTimeout(function(settings, json) {$j('#botondummy').trigger("click")}, 500),
                "initComplete": function() {var cliko = document.getElementById('botondummy').click()},
                "ajaxSource": rutaPuesto,
                "columns": [
                    { "data": "cod_puesto" },
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
                                                        <li><a href="#" id="editarPuesto">Editar</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#" id="eliminarPuesto">Eliminar</a></li>
                                                  </ul>
                                                </div>`
                      }
                    }
                ]
            });
        }

        //////////BOTON EJECUTAR CONSULTA DE PUESTO
        $('#botonconsultapuesto').click( function(){
            $("#tabla-puesto").dataTable().fnDestroy();
            renderTablePuesto()
        })


    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////------TAB CAMPAÑA--------///////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

        ///////FUNCION RENDER DE LA DATATABLE CAMPAÑA
        function renderTableCampana(){
            var table= $('#tabla-campana').DataTable({
                "autoWidth": false,
                // "initComplete": setTimeout(function(settings, json) {$j('#botondummy').trigger("click")}, 500),
                "initComplete": function() {var cliko = document.getElementById('botondummy').click()},
                "ajaxSource": rutaCampana,
                "columns": [
                    { "data": "nombre_ciudad" },
                    { "data": "nombre_sede" },
                    { "data": "nombre_campana" },
                    { "data": "ceco" },
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
                                                        <li><a href="#" id="editarCampana">Editar</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#" id="eliminarCampana">Eliminar</a></li>
                                                  </ul>
                                                </div>`
                      }
                    }
                ]
            });
        }

        //////////BOTON EJECUTAR CONSULTA DE CAMPAÑA
        $('#botonconsultacampana').click( function(){
            $("#tabla-campana").dataTable().fnDestroy();
            renderTableCampana()
        })


    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////------TAB UBICACION--------/////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

        var newCiudad = document.querySelector('#selectCiudad')
        var newSede = document.querySelector('#selectSede')
        var newCampana = document.querySelector('#selectCampana')
        var newPuesto = document.querySelector('#selectPuesto')
        var newPiso = document.querySelector('#selectPiso')
        var newArea = document.querySelector('#selectArea')
        var newTipoU = document.querySelector('#selectTipoU')


        ///////FUNCION RENDER DE LA DATATABLE UBICACION
        function renderTableUbica(){
            var table= $('#tablaUbicacion').DataTable({
                "autoWidth": false,
                // "initComplete": setTimeout(function(settings, json) {$j('#botondummy').trigger("click")}, 500),
                "initComplete": function() {var cliko = document.getElementById('botondummy').click()},
                "ajaxSource": ruta,
                "columns": [
                    { "data": "nombre_pais" },
                    { "data": "nombre_ciudad" },
                    { "data": "nombre_sede" },
                    { "data": "nombre_campana" },
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
                                                        <li><a href="#" id="editarUbicacion">Editar</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#" id="eliminarUbicacion">Eliminar</a></li>
                                                  </ul>
                                                </div>`
                      }
                    }
                ]
            });
        }

        if (ciudades != null){
            for (var i = 0; i < ciudades.length; i++) {
                var opt = document.createElement('option');
                opt.value = ciudades[i].cod_ciudad;
                opt.innerHTML = ciudades[i].nombre_ciudad;
                newCiudad.append(opt);
            }
        }

        ///////////EVENT LISTENER SEDE
        newSede.addEventListener('change', function(){
            newCampana.innerHTML = ''
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

        ///////////////MODAL ELIMINAR UBICACION
        // $('#tablaUbicacion tbody').on( 'click', '#eliminarUbicacion', function () {
            
        //     var tablon = $("#tablaUbicacion").DataTable()
        //     var data = tablon.row( $(this).parents('tr') ).data()
            
        //     $("#confirmModal").modal()
        //     $("#confirmModal").on('shown.bs.modal', function(e) {
        //     $(this).off('shown.bs.modal');
        //     $('#tableModal').html('')

        //         if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
        //             if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
        //                     $('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA ELIMINAR ESTA UBICACION</h2>
        //                                                                 <div class="row">
        //                                                                     <button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
        //                                                                 </div>`)
        //             }
        //             else {
        //                 $('#tableModal').html(`<h2 class="text-center">ELIMINAR UBICACION</h2>
        //                                         <div class="row">
        //                                             <div class="col-md-10 mx-auto">
        //                                                 <form id="edit-form" method="post" action="">
        //                                                     <input type="text" class="form-control hidden" id="indiceUbicacion" placeholder="" value="`+data.cod_ubicacion+`" name="indiceA">
        //                                                     <h2>Esta seguro que desea eliminar este activo?</h2>
        //                                                     <div class="grupo">
        //                                                         <row class="col-sm-12">
        //                                                             <row class="form-group">
        //                                                                 <row class="col-sm-4 offset-sm-2">
        //                                                                     <button id="submitButtonEliminarUbicacion" type="button" class="btn btn-primary">Confirmar</button>
        //                                                                 </row>
        //                                                                 <row class="col-sm-4 offset-sm-2">
        //                                                                     <button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
        //                                                                 </row>
        //                                                             </row>
        //                                                         </row>
        //                                                     </div>
        //                                                 </form>
        //                                             </div>
        //                                         </div>`);   
        //             }
        //         }
        //         else {
        //             $('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTA UBICACION</h2>
        //                                                                 <div class="row">
        //                                                                     <button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
        //                                                                 </div>`)
        //         }
        //     });
        // });

        ///////////////MODAL EDITAR UBICACION
        // $('#tablaUbicacion tbody').on( 'click', '#editarUbicacion', function () {

        //         var tablon = $("#tablaUbicacion").DataTable()
        //         var data = tablon.row( $(this).parents('tr') ).data()
        //       $("#confirmModal").modal()
        //       $("#confirmModal").on('shown.bs.modal', function(e) {
        //         $('#tableModal').html('')

        //         if ( perfiluser == 'administrador' || perfiluser == 'avanzado'){
        //             if (ciudadUser != data.nombre_ciudad && perfiluser != 'administrador'){
        //                     $('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTA UBICACION</h2>
        //                                                                 <div class="row">
        //                                                                     <button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
        //                                                                 </div>
        //                         `)
        //             }
        //             else {
        //                 $('#tableModal').html(`<h2 class="text-center">EDITAR UBICACION</h2>
        //                                         <div class="row">
        //                                             <div class="col-md-12 mx-auto">
        //                                                 <form id="edit-form" method="post" action="/edit-ubicacion/`+data.cod_ubicacion+`"">
        //                                                     <input type="text" class="form-control hidden" id="indiceA" placeholder="" value="`+data.cod_ubicacion+`" name="indiceEditUbica">
        //                                                     <div class="grupo">
        //                                                         <row class="col-sm-6">
        //                                                             <row class="form-group">
        //                                                                 <div class="col-sm-4">
        //                                                                     <label  for="propietario" class="titulos">pais :</label>
        //                                                                 </div>
        //                                                                 <div class="col-sm-7">
        //                                                                     <input type="text" class="form-control" id="pais" placeholder="" value="`+data.nombre_pais+`" disabled>
        //                                                                 </div>
        //                                                             </row>
        //                                                         </row>
        //                                                         <row class="col-sm-6">
        //                                                             <row class="form-group">
        //                                                                 <div class="col-sm-4">
        //                                                                     <label for="nombrearea" class="titulos">ciudad :</label>
        //                                                                 </div>
        //                                                                 <div class="col-sm-7">
        //                                                                     <input type="text" class="form-control" id="ciudad" placeholder="" value="`+data.nombre_ciudad+`" disabled>
        //                                                                 </div>
        //                                                             </row>
        //                                                         </row>
        //                                                     </div>
        //                                                     <div class="grupo">
        //                                                         <row class="col-sm-6">
        //                                                             <row class="form-group">
        //                                                                 <div class="col-sm-4">
        //                                                                     <label for="nombrearea" class="titulos">sede :</label>
        //                                                                 </div>
        //                                                                 <div class="col-sm-7">
        //                                                                     <input type="text" class="form-control" id="sede" placeholder="" value="`+data.nombre_sede+`" disabled>
        //                                                                 </div>
        //                                                             </row>
        //                                                         </row>
        //                                                         <row class="col-sm-6">
        //                                                             <row class="form-group">
        //                                                                 <div class="col-sm-4">
        //                                                                     <label  for="propietario" class="titulos">piso :</label>
        //                                                                 </div>
        //                                                                 <div class="col-sm-7">
        //                                                                     <input type="text" class="form-control" id="piso" placeholder="" value="`+data.nombre_piso+`" disabled>
        //                                                                 </div>
        //                                                             </row>
        //                                                         </row>
        //                                                         <row class="col-sm-6">
        //                                                             <row class="form-group">
        //                                                                 <div class="col-sm-4">
        //                                                                     <label for="nombrearea" class="titulos">puesto :</label>
        //                                                                 </div>
        //                                                                 <div class="col-sm-7">
        //                                                                     <input type="text" class="form-control" id="puesto" placeholder="" value="`+data.num_puesto+`" disabled>
        //                                                                 </div>
        //                                                             </row>
        //                                                         </row>
        //                                                         <div class="grupo">
        //                                                               <row class="col-sm-6">
        //                                                                     <row class="form-group">
        //                                                                         <div class="col-sm-4">
        //                                                                     <label for="nombrearea" class="titulos">area :</label>
        //                                                                   </div>
        //                                                                   <div class="col-sm-7">
        //                                                                     <input type="text" class="form-control" id="area" placeholder="" value="`+data.nombre_area+`" name="" disabled>
        //                                                                   </div>
        //                                                                 </row>
        //                                                             </row>
        //                                                             </div>
        //                                                             <div class="grupo">
        //                                                               <row class="col-sm-6">
        //                                                                     <row class="form-group">
        //                                                                         <div class="col-sm-4">
        //                                                                     <label for="nombrearea" class="titulos">Campaña :</label>
        //                                                                   </div>
        //                                                                   <div class="col-sm-7">
        //                                                                     <select class="form-control" id="selectCampanaN" name="cod_campana">
        //                                                                         <option value="`+data.cod_campana+`">`+data.nombre_campana+`</option>
        //                                                                       </select>
        //                                                                   </div>
        //                                                                 </row>
        //                                                             </row>
        //                                                             </div>
        //                                                     </div>
        //                                                         <div class="grupo">
        //                                                             <row class="col-sm-12  offset-sm-6">
        //                                                                 <row class="form-group">
        //                                                                     <row class="col-sm-4 offset-sm-2">
        //                                                                         <button id="submitButtonEditarU" type="button" class="btn btn-primary">Confirmar</button>
        //                                                             </row>
        //                                                             <row class="col-sm-4 offset-sm-2">
        //                                                                 <button id="cancelButton" type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
        //                                                             </row>
        //                                                         </row>
        //                                                       </row>
        //                                                   </div>
        //                                                 </form>
        //                                             </div>
        //                                         </div>`);

        //                         var newCampana = document.querySelector('#selectCampanaN')

        //                         for (var i = 0; i < campanas.length; i++) {
        //                             if (campanas[i].id_sede == data.cod_sede){
        //                                 var opt = document.createElement('option');
        //                           opt.value = campanas[i].cod_campana;
        //                           opt.innerHTML = campanas[i].nombre_campana;
        //                           newCampana.append(opt);
        //                             }
        //                         }
        //             }
        //         }
        //         else {
        //             $('#tableModal').html(`<h2 class="text-center">NO TIENE PERMISOS PARA MODIFICAR ESTE ACTIVO</h2>
        //                                                                 <div class="row">
        //                                                                     <button id="cancel" type="button" data-dismiss="modal" class="btn btn-danger col-sm-12">Cancelar</button>
        //                                                                 </div>
        //                         `)
        //         }

                

        //         });
        // });

        // $('#confirmModal').on('click', '#submitButtonEditarU',function(){
        //     var indic = $('#indiceEditUbica').val()
        //     var formData = {
        //         'id_campana' : $('select[name=cod_campana]').val()
        //     };
        //      $.ajax({
        //         url: '/edit-ubicacion/' + indic,
        //         type: 'POST', 
        //         data: formData,   
        //         success: function(response) {
        //             $('#cambioUbicacion').modal('toggle')
        //             $("#modalOK").modal()
        //             // $("#mensajeModal").html('')
        //             $("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
        //             $("#modalOK p").html(`<p class="text-center">`+ response.error+`</p>`)
        //         }
        //     })
        // })

        //////////BOTON EJECUTAR CONSULTA DE UBICACIONES
        $('#botonconsultaubicaciones').click( function(){
            $("#tablaUbicacion").dataTable().fnDestroy();
            renderTableUbica()
        })

        //////// BOTON ELIMINAR UBICACION
        // $('#confirmModal').on('click', '#submitButtonEliminarUbicacion',function(){
        //     var indicUbica = $('#indiceUbicacion').val()
        //      $.ajax({
        //           url: '/eliminarU/' + indicUbica,
        //           type: 'POST', 
        //           success: function(response) {
        //               $('#confirmModal').modal('toggle')
        //               $("#modalOK").modal()
        //               // $("#mensajeModal").html('')
        //                 $("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
        //                 $("#modalOK p").html(`<p class="text-center">`+ response.error.code+`</p>`)
        //           }
        //     })

        //     $('#modalOK').on('hidden.bs.modal', function () {
        //         var fot = document.getElementById('botonconsultaubicaciones')
        //         fot.click()
        //     })
        // })
        
        //////////////INSERTAR UBICACION
        // $('#edit-form').on('click', '#submitButtonUbica',function(){
        //     var formDataInsert = {
        //         'id_piso'           : $('select[name=cod_piso]').val(),
        //         'id_puesto'         : $('select[name=cod_puesto]').val(),
        //         'id_campana'        : $('select[name=cod_campana]').val(),
        //         'id_area'           : '6',
        //         'id_tipo_ubicacion' : '29',
        //         'estado'            : 1
        //     };
        //     $.ajax({
        //         url: '/InsertarUbica',
        //         type: 'POST', 
        //         data: formDataInsert, 
        //         success: function(response) {
        //             // $('#insertarModal').modal('toggle')
        //             $("#modalOK").modal()
        //             // $("#mensajeModal").html('')
        //               $("#modalOK h2").html(`<h2 class="text-center">`+ response.data+`</h2>`)
        //               $("#modalOK h4").html(`<h3 class="text-center">`+ response.error.code+`</h3>`)
        //               $("#modalOK p").html(`<p class="text-center">`+ response.error.sqlMessage+`</p>`)
        //         }
        //     })
        //     $('#modalOK').on('hidden.bs.modal', function () {
        //         location.reload()
        //     })
        // })


    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    

    var $j = jQuery.noConflict(true)
})






