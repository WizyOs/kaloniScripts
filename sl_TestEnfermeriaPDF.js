/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/xml', 'N/file', 'N/log', 'N/search'],

    function (record, xmlMod, file, log, search) {

        function onRequest(context) {

            // MAIN VARS
            // Variables para crear los objetos principales
            var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
            var caso = record.load({ type: 'supportcase', id: recId }); // Variable que guarda el objeto Case
            var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente
            var cliente = record.load({ type: 'customer', id: companyId }); // Variable que guarda el objeto Customer

            //CUSTOMER
            // Variables Informacion General obtenidas del CLIENTE
            var sucursalId = cliente.getValue({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var nombreCliente = cliente.getText({ fieldId: 'altname' });
            var numeroExpediente = cliente.getText({ fieldId: 'entityid' });
            var sexoCliente = cliente.getText({ fieldId: 'custentity_sexo' });
            var fechNacCliente = cliente.getText({ fieldId: 'custentity4' });
            var identificacionCliente = cliente.getText({ fieldId: 'custentity251' });
            var telefonoCliente = cliente.getText({ fieldId: 'homephone' });
            var direccionCliente = cliente.getText({ fieldId: 'defaultaddress' });

            //CASE
            // Variables Informacion General obtenidads del Case
            var sucursalTextCaso = caso.getText({ fieldId: 'custevent2' }); // Variable que guarda el nombre de la sucursal en String del case
            var fechaCaso = caso.getText({ fieldId: 'startdate' }); // variable que guarda la fecha en la que se presenta el caso
            var hc_enfermeroExtraccion = caso.getText({ fieldId: 'custevent71' }); // variable que guarda el enfermero de extraccion del caso
            var hc_enfermeroImplantacion = caso.getText({ fieldId: 'custevent72' }); // variable que guarda el enfermero de implantacion del caso
            var medicoResponsableProcedimiento = caso.getText({ fieldId: 'custevent28' }); // variable que guarda el medico responsable del caso
            var enfermeroResponsableProcedimiento = caso.getText({ fieldId: 'custevent29' }); // variable que guarda el enfermeto responsable del caso
            var edoCivilCliente = caso.getText({ fieldId: 'custentity28' });

            //APOYOS
            // Variables obtenias desde funciones locales
            var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
            var sucReal = sucursalReal(sucursalTextCaso); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
            var edadCliente = calcYearInt(fechNacCliente, fechaCaso);

            //TAB DE ENFERMERIA
            // Grupo Estado de conciencia y físico
            var he_alerta = checado(caso.getText({ fieldId: 'custevent94' }));
            var he_orientado = checado(caso.getText({ fieldId: 'custevent95' }));
            var he_consiente = checado(caso.getText({ fieldId: 'custevent89' }));
            var he_tranquilo = checado(caso.getText({ fieldId: 'custevent90' }));
            var he_ansioso = checado(caso.getText({ fieldId: 'custevent91' }));
            var he_letargico = checado(caso.getText({ fieldId: 'custevent92' }));
            var he_nervioso = checado(caso.getText({ fieldId: 'custevent93' }));
            var he_otro = caso.getText({ fieldId: 'custevent96' });
            // Grupo Signos Vitales
            var he_TApre = caso.getText({ fieldId: 'custevent4' });
            var he_TAtrans = caso.getText({ fieldId: 'custevent5' });
            var he_TApost = caso.getText({ fieldId: 'custevent6' });
            var he_FCpre = caso.getText({ fieldId: 'custevent7' });
            var he_FCtrans = caso.getText({ fieldId: 'custevent8' });
            var he_FCpost = caso.getText({ fieldId: 'custevent9' });
            // Grupo toma de fotografías
            var he_PFinicio = caso.getText({ fieldId: 'custevent97' });
            var he_PFfinal = caso.getText({ fieldId: 'custevent98' });
            // Grupo Anestesia zona donadora
            var he_anzd_hInicio = caso.getText({ fieldId: 'custevent99' });
            var he_anzd_hTermino = caso.getText({ fieldId: 'custevent100' });
            var he_anzd_anestesico = caso.getText({ fieldId: 'custevent101' });
            var he_anzd_infiltro = caso.getText({ fieldId: 'custevent102' });
            // Grupo anestesia zona a implantar
            var he_anzi_hInicio = caso.getText({ fieldId: 'custevent105' });
            var he_anzi_hTermino = caso.getText({ fieldId: 'custevent106' });
            var he_anzi_anestesico = caso.getText({ fieldId: 'custevent103' });
            var he_anzi_infiltro = caso.getText({ fieldId: 'custevent104' });
            // Grupo Antisepsia zona donadora
            var he_atzd_realizo = caso.getText({ fieldId: 'custevent107' });
            var he_atzd_region = caso.getText({ fieldId: 'custevent108' });
            var he_atzd_antiseptico = caso.getText({ fieldId: 'custevent109' });
            // Grupo Antisepsia zona a implantar
            var he_atzi_realizo = caso.getText({ fieldId: 'custevent112' });
            var he_atzi_region = caso.getText({ fieldId: 'custevent111' });
            var he_atzi_antiseptico = caso.getText({ fieldId: 'custevent110' });
            // Grupo procedimiento
            var he_extInicio = caso.getText({ fieldId: 'custevent_inicio_extraccion' });
            var he_extTermino = caso.getText({ fieldId: 'custevent_termino_extraccion' });
            var he_corInicio = caso.getText({ fieldId: 'custevent_inicio_corte' });
            var he_corTermino = caso.getText({ fieldId: 'custevent_termino_corte' });
            var he_impInicio = caso.getText({ fieldId: 'custevent_inicio_implantacion' });
            var he_impTermino = caso.getText({ fieldId: 'custevent_termino_implantacion' });
            var he_responsableTricotomia = caso.getText({ fieldId: 'custevent75' });
            var he_tipoRT = caso.getText({ fieldId: 'custevent578' });
            // Grupo muestra de sangre y PRP
            var he_responsablePRP = caso.getText({ fieldId: 'custevent113' });
            var he_equipoUtilizado = caso.getText({ fieldId: 'custevent122' });
            var he_sitioPuncion = caso.getText({ fieldId: 'custevent121' });
            var he_numIntentos = caso.getText({ fieldId: 'custevent123' });
            var he_tubosObtenidos = caso.getText({ fieldId: 'custevent120' });
            var he_centrifugadosA = caso.getText({ fieldId: 'custevent119' });
            var he_tiempoPRP = caso.getText({ fieldId: 'custevent118' });
            var he_responsableAplicacionPRP = caso.getText({ fieldId: 'custevent117' });
            var he_regionPRP = caso.getText({ fieldId: 'custevent116' });
            var he_responsableAplicacionPRP2 = caso.getText({ fieldId: 'custevent115' });
            var he_regionPRP2 = caso.getText({ fieldId: 'custevent114' });
            // Grupo Observaciones
            var he_observaciones = caso.getText({ fieldId: 'custevent3' });
            // Grupo Medicamentos
            var he_medicamentos = caso.getText({ fieldId: 'custevent9' });
            // Grupo Medicamentos
            var table_Medicamentos = null;
            var conteoMedicamentos_lines = caso.getLineCount({ sublistId: 'recmachcustrecord_he_medicamentos' });
            //var prueba = caso.getSublistFields({ sublistId: 'recmachcustrecord_he_medicamentos' });
            if (conteoMedicamentos_lines > 0) {
                for (var i = 0; i < conteoMedicamentos_lines; i++) {
                    var parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';

                    var he_tmedicamentos_administro_display = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_administro_display', line: i });
                    var he_tmedicamentos_dosis = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_dosis', line: i }); //
                    var he_tmedicamentos_hora = caso.getSublistText({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_hora', line: i }); //
                    var he_tmedicamentos_indico_display = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_indico_display', line: i }); //
                    var he_tmedicamentos_medicamento = caso.getSublistText({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_medicamento', line: i }); //
                    var he_tmedicamentos_via = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_via', line: i }); //

                    table_Medicamentos += '<tr ' + parImpar + '>';
                    table_Medicamentos += '<td align="center">' + he_tmedicamentos_medicamento + '</td>';
                    table_Medicamentos += '<td align="center">' + he_tmedicamentos_dosis + '</td>';
                    table_Medicamentos += '<td align="center">' + he_tmedicamentos_via + '</td>';
                    table_Medicamentos += '<td align="center">' + he_tmedicamentos_hora + '</td>';
                    table_Medicamentos += '<td align="center">' + he_tmedicamentos_administro_display + '</td>';
                    table_Medicamentos += '<td align="center">' + he_tmedicamentos_indico_display + '</td>';
                    table_Medicamentos += '</tr>';
                }
            }

            //TAB PROCEDIMIENTO SEGURO
            // Grupo Antes Procedimiento
            var ps_identidad = checado(caso.getValue({ fieldId: 'custevent550' }));
            var ps_sitioCorrecto = checado(caso.getValue({ fieldId: 'custevent551' }));
            var ps_procedimientoCorrecto = checado(caso.getValue({ fieldId: 'custevent552' }));
            var ps_cuentaConsentimientoInf = checado(caso.getValue({ fieldId: 'custevent553' }));
            var ps_realizoMarcaje = checado((caso.getValue({ fieldId: 'custevent556' }) == true) ? 'SI' : 'NO');
            var ps_controlAnestesia = checado((caso.getValue({ fieldId: 'custevent557' }) == true) ? 'SI' : 'NO');
            // Grupo Iniciar Procedimiento            
            var ps_confirmarMiembros = checado(caso.getValue({ fieldId: 'custevent560' }));
            var ps_revisarInstrumental = checado(caso.getValue({ fieldId: 'custevent562' }));
            var ps_revisaEmic = checado(caso.getValue({ fieldId: 'custevent561' }));
            // Grupo Finalizar Procedimiento
            var ps_recuentoInstrumental = checado(caso.getValue({ fieldId: 'custevent565' }));
            var ps_nomrbeProcedimiento = checado(caso.getValue({ fieldId: 'custevent564' }));
            var ps_recuperacionTratamiento = checado(caso.getValue({ fieldId: 'custevent567' }));


            //TAB POST PROCEDIMIENTO
            // Grupo Detalles Procedimiento
            var pp_incidentesImportancia = caso.getValue({ fieldId: 'custevent567' });
            var pp_tipoAnestesia = caso.getValue({ fieldId: 'custevent567' });
            var pp_sangradoDuranteProcedimiento = caso.getValue({ fieldId: 'custevent567' });
            var pp_diagnosticoPostProcedimiento = caso.getValue({ fieldId: 'custevent567' });
            var pp_medicoProcedimiento = caso.getValue({ fieldId: 'custevent567' });
            var pp_enfermerosProcedimiento = caso.getValue({ fieldId: 'custevent567' });
            // Grupo Descripcion técnica y hallazgos
            var pp_descripcionTyH = caso.getText({ fieldId: 'custevent9' });


            //TAB CCONTROL DE CORTE VIABLES Y NO VIABLES
            var conteoFol_1hDoctorV = "";
            var conteoFol_1hDoctorNV = "";
            var conteoFol_1hViables = null;
            var conteoFol_1hNoViables = null;
            var conteoFol_1hTotal = 0;
            var conteoFol_1hPorcentaje = 0;
            var conteoFol_2hDoctorV = "";
            var conteoFol_2hDoctorNV = "";
            var conteoFol_2hViables = null;
            var conteoFol_2hNoViables = null;
            var conteoFol_2hTotal = 0;
            var conteoFol_2hPorcentaje = 0;
            var conteoFol_3hDoctorV = "";
            var conteoFol_3hDoctorNV = "";
            var conteoFol_3hViables = null;
            var conteoFol_3hNoViables = null;
            var conteoFol_3hTotal = 0;
            var conteoFol_3hPorcentaje = 0;
            var conteoFol_4hDoctorV = "";
            var conteoFol_4hDoctorNV = "";
            var conteoFol_4hViables = null;
            var conteoFol_4hNoViables = null;
            var conteoFol_4hTotal = 0;
            var conteoFol_4hPorcentaje = 0;
            var conteoFol_5hDoctorV = "";
            var conteoFol_5hDoctorNV = "";
            var conteoFol_5hViables = null;
            var conteoFol_5hNoViables = null;
            var conteoFol_5hTotal = 0;
            var conteoFol_5hPorcentaje = 0;
            var recmachcustrecord_nro_cfs_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_nro_cfs' });
            if (recmachcustrecord_nro_cfs_Lines > 0) {
                for (var i = 0; i < 1; i++) {
                    conteoFol_1hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_una_hora_cf', line: i });
                    conteoFol_2hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_dos_horas_cf', line: i });
                    conteoFol_3hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_tres_horas_cf', line: i });
                    conteoFol_4hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_cuatro_horas_cf', line: i });
                    conteoFol_5hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_cinco_horas_cf', line: i });
                }
            }
            var recmachcustrecord_nro_cfs_nv_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_nro_cfs_nv' });
            if (recmachcustrecord_nro_cfs_nv_Lines > 0) {
                for (var i = 0; i < 1; i++) {
                    conteoFol_1hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_una_hora_cf_nv', line: i });
                    conteoFol_2hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_dos_horas_cf_nv', line: i });
                    conteoFol_3hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_tres_horas_cf_nv', line: i });
                    conteoFol_4hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_cuatro_horas_cf_nv', line: i });
                    conteoFol_5hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_cinco_horas_cf_nv', line: i });
                    conteoFol_DoctorV = caso.getSublistText({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_doctor_viables', line: i });
                    conteoFol_DoctorNV = caso.getSublistText({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_doctor_noviables', line: i });
                }
            }
            conteoFol_1hTotal = conteoFol_1hViables + conteoFol_1hNoViables;
            conteoFol_2hTotal = conteoFol_2hViables + conteoFol_2hNoViables;
            conteoFol_3hTotal = conteoFol_3hViables + conteoFol_3hNoViables;
            conteoFol_4hTotal = conteoFol_4hViables + conteoFol_4hNoViables;
            conteoFol_5hTotal = conteoFol_5hViables + conteoFol_5hNoViables;

            conteoFol_1hPorcentaje = (conteoFol_1hViables * 100) / conteoFol_1hTotal;
            conteoFol_2hPorcentaje = (conteoFol_2hViables * 100) / conteoFol_2hTotal;
            conteoFol_3hPorcentaje = (conteoFol_3hViables * 100) / conteoFol_3hTotal;
            conteoFol_4hPorcentaje = (conteoFol_4hViables * 100) / conteoFol_4hTotal;
            conteoFol_5hPorcentaje = (conteoFol_5hViables * 100) / conteoFol_5hTotal;

            var totalNoViables = conteoFol_1hNoViables + conteoFol_2hNoViables + conteoFol_3hNoViables + conteoFol_4hNoViables + conteoFol_5hNoViables;

            conteoFol_1hDoctorV = conteoFol_DoctorV;
            conteoFol_2hDoctorV = conteoFol_DoctorV;
            conteoFol_3hDoctorV = conteoFol_DoctorV;
            conteoFol_4hDoctorV = conteoFol_DoctorV;
            conteoFol_5hDoctorV = conteoFol_DoctorV;
            
            conteoFol_1hDoctorNV = conteoFol_DoctorNV;
            conteoFol_1hDoctorNV = conteoFol_DoctorNV;
            conteoFol_1hDoctorNV = conteoFol_DoctorNV;
            conteoFol_1hDoctorNV = conteoFol_DoctorNV;
            conteoFol_1hDoctorNV = conteoFol_DoctorNV;



            // CONTEO DE UNIDADES FOLICULARES Y CONTEO DE FOLICULOS
            // Grupo Conteo Unidades Folículares
            var conteoFolicular = null;
            var conteoFolicular_xHora = null;
            var conteoFoliculos = null;
            var conteoFoliculos_xHora = null;
            var subtotalConteoUnidadFolicular = 0;
            var subtotal_1 = 0;
            var subtotal_2a3 = 0;
            var totalConteoUnidadFolicular = 0;
            var totalConteoUnidadFolicular_1hr = 0;
            var totalConteoUnidadFolicular_2hr = 0;
            var totalConteoUnidadFolicular_3hr = 0;
            var totalConteoUnidadFolicular_4hr = 0;
            var totalConteoUnidadFolicular_5hr = 0;
            var totalConteoFoliculos = 0;
            var totalConteoFoliculos_1hr = 0;
            var totalConteoFoliculos_2hr = 0;
            var totalConteoFoliculos_3hr = 0;
            var totalConteoFoliculos_4hr = 0;
            var totalConteoFoliculos_5hr = 0;
            var hoyosConteoUnidadFolicular = 0;
            var conteoUnidadFolicular_lines = caso.getLineCount({ sublistId: 'recmachcustrecord_conteo_foliculos' });
            if (conteoUnidadFolicular_lines > 0) {
                var counter = 0;
                (conteoUnidadFolicular_lines < 4) ? counter = conteoUnidadFolicular_lines : counter = 4;
                for (var i = 0; i < 4; i++) {
                    var parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var conteoUnidadFolicualr_unidadesFoliculares = caso.getSublistValue({ sublistId: 'recmachcustrecord_conteo_foliculos', fieldId: 'custrecord_nro_cuf_contfol', line: i });
                    var conteoUnidadFolicualr_sublist_hora1 = caso.getSublistValue({ sublistId: 'recmachcustrecord_conteo_foliculos', fieldId: 'custrecord_una_hora_contfol', line: i });
                    var conteoUnidadFolicualr_sublist_hora2 = caso.getSublistValue({ sublistId: 'recmachcustrecord_conteo_foliculos', fieldId: 'custrecord_dos_hora_contfol', line: i });
                    var conteoUnidadFolicualr_sublist_hora3 = caso.getSublistValue({ sublistId: 'recmachcustrecord_conteo_foliculos', fieldId: 'custrecord_tres_hora_contfol', line: i });
                    var conteoUnidadFolicualr_sublist_hora4 = caso.getSublistValue({ sublistId: 'recmachcustrecord_conteo_foliculos', fieldId: 'custrecord_cuatro_hora_contfol', line: i });
                    var conteoUnidadFolicualr_sublist_hora5 = caso.getSublistValue({ sublistId: 'recmachcustrecord_conteo_foliculos', fieldId: 'custrecord_cinco_hora_contfol', line: i });
                    subtotalConteoUnidadFolicular = ((conteoUnidadFolicualr_sublist_hora1 != undefined) ? conteoUnidadFolicualr_sublist_hora1 : 0) +
                        ((conteoUnidadFolicualr_sublist_hora2 != undefined) ? conteoUnidadFolicualr_sublist_hora2 : 0) +
                        ((conteoUnidadFolicualr_sublist_hora3 != undefined) ? conteoUnidadFolicualr_sublist_hora3 : 0) +
                        ((conteoUnidadFolicualr_sublist_hora4 != undefined) ? conteoUnidadFolicualr_sublist_hora4 : 0) +
                        ((conteoUnidadFolicualr_sublist_hora5 != undefined) ? conteoUnidadFolicualr_sublist_hora5 : 0);

                    if (i > 0 && i < 4) {
                        subtotal_2a3 += subtotalConteoUnidadFolicular;
                    } else if (i == 0) {
                        subtotal_1 = subtotalConteoUnidadFolicular;
                    }

                    totalConteoUnidadFolicular_1hr += ((conteoUnidadFolicualr_sublist_hora1 != undefined) ? conteoUnidadFolicualr_sublist_hora1 : 0);
                    totalConteoUnidadFolicular_2hr += ((conteoUnidadFolicualr_sublist_hora2 != undefined) ? conteoUnidadFolicualr_sublist_hora2 : 0);
                    totalConteoUnidadFolicular_3hr += ((conteoUnidadFolicualr_sublist_hora3 != undefined) ? conteoUnidadFolicualr_sublist_hora3 : 0);
                    totalConteoUnidadFolicular_4hr += ((conteoUnidadFolicualr_sublist_hora4 != undefined) ? conteoUnidadFolicualr_sublist_hora4 : 0);
                    totalConteoUnidadFolicular_5hr += ((conteoUnidadFolicualr_sublist_hora5 != undefined) ? conteoUnidadFolicualr_sublist_hora5 : 0);

                    conteoFolicular += '<tr ' + parImpar + '>';
                    conteoFolicular += '<td align="center">' + ((conteoUnidadFolicualr_unidadesFoliculares != undefined) ? conteoUnidadFolicualr_unidadesFoliculares : '') + '</td>';
                    conteoFolicular += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora1 != undefined) ? conteoUnidadFolicualr_sublist_hora1 : 0) + '</td>';
                    conteoFolicular += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora2 != undefined) ? conteoUnidadFolicualr_sublist_hora2 : 0) + '</td>';
                    conteoFolicular += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora3 != undefined) ? conteoUnidadFolicualr_sublist_hora3 : 0) + '</td>';
                    conteoFolicular += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora4 != undefined) ? conteoUnidadFolicualr_sublist_hora4 : 0) + '</td>';
                    conteoFolicular += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora5 != undefined) ? conteoUnidadFolicualr_sublist_hora5 : 0) + '</td>';
                    conteoFolicular += '<td align="center">' + subtotalConteoUnidadFolicular + '</td>';
                    conteoFolicular += '</tr>';

                    totalConteoFoliculos_1hr += ((conteoUnidadFolicualr_sublist_hora1 != undefined) ? (conteoUnidadFolicualr_sublist_hora1 * conteoUnidadFolicualr_unidadesFoliculares) : 0);
                    totalConteoFoliculos_2hr += ((conteoUnidadFolicualr_sublist_hora2 != undefined) ? (conteoUnidadFolicualr_sublist_hora2 * conteoUnidadFolicualr_unidadesFoliculares) : 0);
                    totalConteoFoliculos_3hr += ((conteoUnidadFolicualr_sublist_hora3 != undefined) ? (conteoUnidadFolicualr_sublist_hora3 * conteoUnidadFolicualr_unidadesFoliculares) : 0);
                    totalConteoFoliculos_4hr += ((conteoUnidadFolicualr_sublist_hora4 != undefined) ? (conteoUnidadFolicualr_sublist_hora4 * conteoUnidadFolicualr_unidadesFoliculares) : 0);
                    totalConteoFoliculos_5hr += ((conteoUnidadFolicualr_sublist_hora5 != undefined) ? (conteoUnidadFolicualr_sublist_hora5 * conteoUnidadFolicualr_unidadesFoliculares) : 0);

                    // Grupo Conteo de Foliculos
                    conteoFoliculos += '<tr ' + parImpar + '>';
                    conteoFoliculos += '<td align="center">' + ((conteoUnidadFolicualr_unidadesFoliculares != undefined) ? conteoUnidadFolicualr_unidadesFoliculares : '') + '</td>';
                    conteoFoliculos += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora1 != undefined) ? (conteoUnidadFolicualr_sublist_hora1 * conteoUnidadFolicualr_unidadesFoliculares) : 0) + '</td>';
                    conteoFoliculos += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora2 != undefined) ? (conteoUnidadFolicualr_sublist_hora2 * conteoUnidadFolicualr_unidadesFoliculares) : 0) + '</td>';
                    conteoFoliculos += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora3 != undefined) ? (conteoUnidadFolicualr_sublist_hora3 * conteoUnidadFolicualr_unidadesFoliculares) : 0) + '</td>';
                    conteoFoliculos += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora4 != undefined) ? (conteoUnidadFolicualr_sublist_hora4 * conteoUnidadFolicualr_unidadesFoliculares) : 0) + '</td>';
                    conteoFoliculos += '<td align="center">' + ((conteoUnidadFolicualr_sublist_hora5 != undefined) ? (conteoUnidadFolicualr_sublist_hora5 * conteoUnidadFolicualr_unidadesFoliculares) : 0) + '</td>';
                    conteoFoliculos += '</tr>';
                }
                totalConteoUnidadFolicular += totalConteoUnidadFolicular_1hr + totalConteoUnidadFolicular_2hr + totalConteoUnidadFolicular_3hr + totalConteoUnidadFolicular_4hr + totalConteoUnidadFolicular_5hr;
                conteoFolicular_xHora += '<tr>';
                conteoFolicular_xHora += '<td align="center"></td>';
                conteoFolicular_xHora += '<td align="center">' + totalConteoUnidadFolicular_1hr + '</td>';
                conteoFolicular_xHora += '<td align="center">' + totalConteoUnidadFolicular_2hr + '</td>';
                conteoFolicular_xHora += '<td align="center">' + totalConteoUnidadFolicular_3hr + '</td>';
                conteoFolicular_xHora += '<td align="center">' + totalConteoUnidadFolicular_4hr + '</td>';
                conteoFolicular_xHora += '<td align="center">' + totalConteoUnidadFolicular_5hr + '</td>';
                conteoFolicular_xHora += '<td></td>';
                conteoFolicular_xHora += '</tr>';

                totalConteoFoliculos += totalConteoFoliculos_1hr + totalConteoFoliculos_2hr + totalConteoFoliculos_3hr + totalConteoFoliculos_4hr + totalConteoFoliculos_5hr;
                conteoFoliculos_xHora += '<tr>';
                conteoFoliculos_xHora += '<td align="center"></td>';
                conteoFoliculos_xHora += '<td align="center">' + totalConteoFoliculos_1hr + '</td>';
                conteoFoliculos_xHora += '<td align="center">' + totalConteoFoliculos_2hr + '</td>';
                conteoFoliculos_xHora += '<td align="center">' + totalConteoFoliculos_3hr + '</td>';
                conteoFoliculos_xHora += '<td align="center">' + totalConteoFoliculos_4hr + '</td>';
                conteoFoliculos_xHora += '<td align="center">' + totalConteoFoliculos_5hr + '</td>';
                conteoFoliculos_xHora += '</tr>';
            }

            // CONTEO DE HOYOS Y PORCENTAJE DE EFECTIVIDAD EN HOYOS
            hoyosConteoUnidadFolicular = totalConteoUnidadFolicular + totalNoViables;
            var porcentajeHoyos = (totalConteoUnidadFolicular * 100) / hoyosConteoUnidadFolicular;

            // Grupo Temperatura
            var table_Temperatura = null;
            var conteoTemperatura_lines = caso.getLineCount({ sublistId: 'recmachcustrecord_he_temperatura' });
            if (conteoTemperatura_lines > 0) {
                for (var i = 0; i < conteoTemperatura_lines; i++) {
                    var parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var he_ttemperatura_typeOperatorio = caso.getSublistText({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_typeoperatorio', line: i });
                    var he_ttemperatura_menos4 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_menos4', line: i });
                    var he_ttemperatura_menos3 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_menos3', line: i });
                    var he_ttemperatura_menos2 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_menos2', line: i });
                    var he_ttemperatura_menos1 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_menos1', line: i });
                    var he_ttemperatura_cero = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_cero', line: i });
                    var he_ttemperatura_mas1 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_mas1', line: i });
                    var he_ttemperatura_mas2 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_mas2', line: i });
                    var he_ttemperatura_mas3 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_mas3', line: i });
                    var he_ttemperatura_mas4 = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_temperatura', fieldId: 'custrecord_he_ttemp_mas4', line: i });
                    he_ttemperatura_typeOperatorio = he_ttemperatura_typeOperatorio.toUpperCase();
                    table_Temperatura += '<tr ' + parImpar + '>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_typeOperatorio + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_menos4 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_menos3 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_menos2 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_menos1 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_cero + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_mas1 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_mas2 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_mas3 + '</td>';
                    table_Temperatura += '<td align="center">' + he_ttemperatura_mas4 + '</td>';
                    table_Temperatura += '</tr>';
                }

            }

            // Grupo Control de Corte
            var controlDeCorte = null;
            var totUnidadesFoliculares = 0;
            //var totUnidadesFoliculares = caso.getValue({ fieldId: 'custevent_ns_cuf_total' });
            var recmachcustrecord_control_corte_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_control_corte' });
            //log.debug('lineas control de corte', recmachcustrecord_control_corte_Lines);
            if (recmachcustrecord_control_corte_Lines > 0) {
                for (var i = 0; i < recmachcustrecord_control_corte_Lines; i++) {
                    var parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var sublist_enfermero = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_enfermera_display', line: i });
                    var sublist_hora1 = caso.getSublistText({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora1_cc', line: i });
                    var sublist_hora2 = caso.getSublistText({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora2_cc', line: i });
                    var sublist_hora3 = caso.getSublistText({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora3_cc', line: i });
                    var sublist_hora4 = caso.getSublistText({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora4_cc', line: i });
                    var sublist_hora5 = caso.getSublistText({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora5_cc', line: i });
                    //var sublist_subtotal = caso.getSublistText({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_subtotal_cc', line: i });
                    //totUnidadesFoliculares += (sublist_subtotal == "") ? 0 : parseInt(sublist_subtotal);
                    sublist_subtotal = parseInt(sublist_hora1) + parseInt(sublist_hora2) + parseInt(sublist_hora3) + parseInt(sublist_hora4) + parseInt(sublist_hora5);
                    totUnidadesFoliculares += parseInt(sublist_subtotal);
                    controlDeCorte += '<tr ' + parImpar + '>';
                    controlDeCorte += '<td align="center">' + sublist_enfermero + '</td>';
                    controlDeCorte += '<td align="center">' + sublist_hora1 + '</td>';
                    controlDeCorte += '<td align="center">' + sublist_hora2 + '</td>';
                    controlDeCorte += '<td align="center">' + sublist_hora3 + '</td>';
                    controlDeCorte += '<td align="center">' + sublist_hora4 + '</td>';
                    controlDeCorte += '<td align="center">' + sublist_hora5 + '</td>';
                    controlDeCorte += '<td align="center">' + sublist_subtotal + '</td>';
                    controlDeCorte += '</tr>';
                }
            }

            //TAB PREVENCION Y RIESGO DE CAIDAS
            // Grupo medidas preventivas
            var hMP_descripcionAcciones = caso.getText({ fieldId: 'custevent568' });
            // Grupo identificación del riesgo
            var identificacionRiesgo = null;
            var sublist_total = 0;
            var totalPuntajeIdentificaRiesgo = 0;
            var recmachcustrecord_identificacion_riesgo_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_identificacion_riesgo' });
            log.debug('log Identificacion Riesgos', recmachcustrecord_identificacion_riesgo_Lines);
            if (recmachcustrecord_identificacion_riesgo_Lines > 0) {
                for (var i = 0; i < recmachcustrecord_identificacion_riesgo_Lines; i++) {
                    var parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var sublist_criterio = caso.getSublistText({ sublistId: 'recmachcustrecord_identificacion_riesgo', fieldId: 'custrecord_criterioeva_ir', line: i });
                    var sublist_variables = caso.getSublistText({ sublistId: 'recmachcustrecord_identificacion_riesgo', fieldId: 'custrecord_variables_ir', line: i });
                    var sublist_puntaje = caso.getSublistText({ sublistId: 'recmachcustrecord_identificacion_riesgo', fieldId: 'custrecord_puntaje_ir', line: i });
                    sublist_total += parseInt(sublist_puntaje);
                    identificacionRiesgo += '<tr ' + parImpar + '>';
                    identificacionRiesgo += '<td style="border-right:1px solid #346094;">' + sublist_criterio + '</td>';
                    identificacionRiesgo += '<td style="border-right:1px solid #346094;">' + sublist_variables + '</td>';
                    identificacionRiesgo += '<td align="center" style="border-right:1px solid #346094;">' + sublist_puntaje + '</td>';
                    identificacionRiesgo += '<td align="center">' + '' + '</td>';
                    identificacionRiesgo += '</tr>';
                }
            }


            //TAB NOTA POST PROCEDIMIENTO
            // Grupo Descripción de la técnica y hallazgos encontrados
            var hPP_incidentesImportancia = caso.getText({ fieldId: 'custevent14' });
            var hPP_tipoAnestesia = caso.getText({ fieldId: 'custevent577' });
            var hPP_sangradoProcedimiento = caso.getText({ fieldId: 'custevent17' });
            var hPP_tecHallazgos = caso.getText({ fieldId: 'custevent569' });
            var hPP_diagnosticoPP = caso.getText({ fieldId: 'custevent576' });
            var hPP_zonaImplantada = caso.getText({ fieldId: 'custevent635' });
            var hPP_fechaProcedimiento = caso.getText({ fieldId: 'custevent276' });
            var hPP_diagnosticoPreOperatorio = caso.getValue({ fieldId: 'custevent281' });


            //TAB NOTA EGRESO Y ALTA
            // Grupo nota de egreso y alta
            var hNEA_fechaEgreso = caso.getText({ fieldId: 'custevent570' });
            var hNEA_diagnosticoEgreso = caso.getText({ fieldId: 'custevent573' });
            var hNEA_motivoEgreso = caso.getText({ fieldId: 'custevent574' });
            var hNEA_signosVitalesEgreso = caso.getText({ fieldId: 'custevent571' });
            var hNEA_resumenEvolucion = caso.getText({ fieldId: 'custevent572' });
            var hNEA_planManejo = caso.getText({ fieldId: 'custevent575' });

            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
            xml += '<pdf>\n';
            xml += '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
            xml += '<br/><br/><br/><br/><br/>';

            //HOJA DE ENFERMERIA
            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA</b></p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color:#346094;">1. FICHA DE IDENTIFICACIÓN:</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;">' +
                '<tr><td><b>No. de Expediente: </b> ' + numeroExpediente + '</td><td><b>Genero: </b> ' + sexoCliente + '</td></tr>' +
                '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
                '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
                '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
                '<tr><td><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="37%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 12px;font-weight:bold;color:#346094">2. ESTADO DE CONCIENCIA Y FISICO</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="40%">Alerta:</td>' +
                '<td width="60%">' + he_alerta + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Orientado:</td>' +
                '<td width="60%">' + he_orientado + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Consciente:</td>' +
                '<td width="60%">' + he_consiente + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Tranquilo:</td>' +
                '<td width="60%">' + he_tranquilo + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Ansioso:</td>' +
                '<td width="60%">' + he_ansioso + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Letárgico:</td>' +
                '<td width="60%">' + he_letargico + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Nervioso:</td>' +
                '<td width="60%">' + he_nervioso + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff" height="30px">' +
                '<td width="40%" style="border-bottom:1px solid #346094;vertical-align: top;">Otro:</td>' +
                '<td width="60%" style="border-bottom:1px solid #346094">' + he_otro + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="3%"></td>' +
                '<td width="60%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top">3. SIGNOS VITALES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" width="28%">Operatorio</td>' +
                '<td style="border:1px solid #346094;" width="24%" align="center">PRE</td>' +
                '<td style="border:1px solid #346094;" width="24%" align="center">TRANS</td>' +
                '<td style="border:1px solid #346094;" width="24%" align="center">POST</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF">F.C.</td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_FCpre + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_FCtrans + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_FCpost + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;">T/A mmHg</td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_TApre + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_TAtrans + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_TApost + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:bottom;">4. TOMA DE FOTOGRAFÍAS</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%" style="vertical-align:bottom;">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF" colspan="2">PROTOCOLO DE FOTOGRAFÍAS</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="15%" style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" >Inicio</td>' +
                '<td width="85%" style="border:1px solid #346094" align="center">' + he_PFinicio + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF">Final</td>' +
                '<td style="border:1px solid #346094" align="center">' + he_PFfinal + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">5. ANESTESIA</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">6. ANTISEPSIA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" colspan="2">Zona donadora</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Anestésico: <b>' + he_anzd_anestesico + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Infiltró: <b>' + he_anzd_infiltro + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>Hore de Inicio: <b>' + he_anzd_hInicio + '</b></td>' +
                '<td>Hora de término: <b>' + he_anzd_hTermino + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" colspan="2">Zona a implantar</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Anestésico: <b>' + he_anzi_anestesico + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Infiltró: <b>' + he_anzi_infiltro + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>Hora de Inicio: <b>' + he_anzi_hInicio + '</b></td>' +
                '<td>Hora de término: <b>' + he_anzi_hTermino + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" colspan="2">Zona donadora</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Realizó: <b>' + he_atzd_realizo + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>Región: <b>' + he_atzd_region + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>Antiséptico: <b>' + he_atzd_antiseptico + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" colspan="2">Zona a implantar</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Realizó: <b>' + he_atzi_realizo + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>Región: <b>' + he_atzi_region + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>Antiséptico: <b>' + he_atzi_antiseptico + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">7. PROCEDIMIENTO</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">8. MUESTRA DE SANGRE Y PRP</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td colspan="2">Médico responsable: <b>' + medicoResponsableProcedimiento + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Enfermero responsable:  <b>' + enfermeroResponsableProcedimiento + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Responsable Tricotomía: <b>' + he_responsableTricotomia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Tipo: <b>' + he_tipoRT + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Responsable de extracción: <b>' + hc_enfermeroExtraccion + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de Inicio: <b>' + he_extInicio + '</b></td>' +
                '<td width="50%">Hora de término: <b>' + he_extTermino + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Corte de unidades foliculares: <b>' + ' ' + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de Inicio: <b>' + he_corInicio + '</b></td>' +
                '<td width="50%">Hora de término: <b>' + he_corTermino + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Responsable de Implantación: <b>' + hc_enfermeroImplantacion + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de Inicio: <b>' + he_impInicio + '</b></td>' +
                '<td width="50%">Hora de término: <b>' + he_impTermino + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" valign="top">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td colspan="2">Responsable: <b>' + he_responsablePRP + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Equipo utilizado: <b>' + he_equipoUtilizado + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Sitio de punción: <b>' + he_sitioPuncion + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Número de intentos: <b>' + he_numIntentos + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Tubos obtenidos: <b>' + he_tubosObtenidos + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Centrifugados a: <b>' + he_centrifugadosA + '</b> rpm</td>' +
                '<td width="50%"> Tiempo: <b>' + he_tiempoPRP + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Responsable de aplicación de PRP: <b>' + he_responsableAplicacionPRP + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Región: <b>' + he_regionPRP + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Responsable de aplicación de PRP: <b>' + he_responsableAplicacionPRP2 + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Región: <b>' + he_regionPRP2 + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<div style="page-break-after:always;"></div>' +
                '<br/><br/><br/><br/><br/>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">9. MEDICAMENTOS</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td width="20%" align="center">Medicamento</td>' +
                '<td width="10%" align="center">Dósis</td>' +
                '<td width="10%" align="center">Vía</td>' +
                '<td width="10%" align="center">Hora</td>' +
                '<td width="25%" align="center">Administró</td>' +
                '<td width="25%" align="center">Indicó</td>' +
                '</tr>' + table_Medicamentos +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 12px;font-weight:bold;color:#346094">10. OBSERVACIONES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="100%" style="background-color:#FFFFFF;">' + he_observaciones + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina();

            //HOJA DE CONTEO
            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE CONTEO</b></p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top" colspan="3">SIGNOS VITALES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%" colspan="3">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td widht="4%" style="background-color: #346094;border:1px solid #346094;"></td>' +
                '<td width="32%" style="border:1px solid #346094;" align="center">PRE</td>' +
                '<td width="32%" style="border:1px solid #346094;" align="center">TRANS</td>' +
                '<td width="32%" style="border:1px solid #346094;" align="center">POST</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border:1px solid #346094" align="center">T/A</td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_TApre + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_TAtrans + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_TApost + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border:1px solid #346094" align="center">F.C.</td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_FCpre + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_FCtrans + '</b></td>' +
                '<td style="border:1px solid #346094" align="center"><b>' + he_FCpost + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="42%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td colspan="2">INFILTRACIÓN</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="35%">INICIÓ EXTRACCIÓN</td>' +
                '<td><b>' + he_extInicio + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>TERMINÓ EXTRACCIÓN</td>' +
                '<td><b>' + he_extTermino + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="38%"></td>' +
                '<td width="30%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="30%">INICIÓ CORTE</td>' +
                '<td width="70%"><b>' + he_corInicio + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="30%">TERMINÓ CORTE</td>' +
                '<td width="70%"><b>' + he_corTermino + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top" colspan="2" align="center">CONTEO UNIDADES FOLICULARES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="84%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td></td>' +
                '<td align="center">1 HR</td>' +
                '<td align="center">2 HR</td>' +
                '<td align="center">3 HR</td>' +
                '<td align="center">4 HR</td>' +
                '<td align="center">5 HR</td>' +
                '<td align="center">SUBTOTAL</td>' +
                '</tr>' + conteoFolicular + conteoFolicular_xHora +
                '</table>' +
                '</td>' +
                '<td width="16%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;" align="center"><td>TOTAL</td></tr>' +
                '<tr><td align="center"><span style="color: #eff5f5;">|</span>' + subtotal_1 + '</td></tr>' +
                '<tr style="background-color: #cadcff" rowspan="3" height="50px"><td align="center"><br />' + subtotal_2a3 + '</td></tr>' +
                '<tr><td align="center"><span style="color: #eff5f5;">|</span>' + totalConteoUnidadFolicular + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%" align="right" colspan="2">' +
                '<table style="width:30%;font-size:10px;font-family:Aria,sans-serif;" cellspacing="0">' +
                '<tr>' +
                '<td style="border-left:1px solid #346094;border-top:1px solid #346094;border-bottom:1px solid #346094;">&emsp;HOYOS</td>' +
                '<td style="border:1px solid #346094;" align="center">' + hoyosConteoUnidadFolicular + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td></td>' +
                '<td style="border-left:1px solid #346094;border-right:1px solid #346094;border-bottom:1px solid #346094;background-color: #cadcff" align="center">' + porcentajeHoyos.toFixed(2) + ' %</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="70%">' +
                '<table width="100%">' +
                '<tr>' +
                '<td style="font-size: 12px;font-weight:bold;color:#346094;" align="center" colspan="2">CONTEO FOLÍCULOS</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="85%" style="vertical-align: top;">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td></td>' +
                '<td align="center">1 HRS</td>' +
                '<td align="center">2 HRS</td>' +
                '<td align="center">3 HRS</td>' +
                '<td align="center">4 HRS</td>' +
                '<td align="center">5 HRS</td>' +
                '</tr>' + conteoFoliculos + conteoFoliculos_xHora +
                '</table>' +
                '</td>' +
                '<td width="15%" style="vertical-align: top;">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td><span style="color:#346094;">|</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td><span style="color:#FFFFFF;">|</span></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td><span style="color:#FFFFFF;">|</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td><span style="color:#FFFFFF;">|</span></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td align="center">TOTAL</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center"><span style="color:#FFFFFF;">|</span><b>' + totalConteoFoliculos + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="1%"></td>' +
                '<td width="29%" style="vertical-align: bottom">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr>' +
                '<td width="48%">INFILTRACIÓN</td>' +
                '<td></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="48%">INICIÓ IMPLANTACIÓN</td>' +
                '<td><b>' + he_impInicio + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="48%">TERMINÓ IMPLANTACIÓN</td>' +
                '<td><b>' + he_impTermino + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;text-align:center;" align="center">TEMPERATURA °C' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td width="10%"></td>' +
                '<td width="10%" align="center">-4</td>' +
                '<td width="10%" align="center">-3</td>' +
                '<td width="10%" align="center">-2</td>' +
                '<td width="10%" align="center">-1</td>' +
                '<td width="10%" align="center">0</td>' +
                '<td width="10%" align="center">1</td>' +
                '<td width="10%" align="center">2</td>' +
                '<td width="10%" align="center">3</td>' +
                '<td width="10%" align="center">4</td>' +
                '</tr>' + table_Temperatura +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="50%" style="font-size: 12px;font-weight:bold;color:#346094;">EQUIPO MÉDICO:</td>' +
                '<td width="1%"></td>' +
                '<td width="5%"></td>' +
                '<td width="44%"></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span><b>' + medicoResponsableProcedimiento + '</b></td>' +
                '<td></td>' +
                '<td>Extrajo:</td>' +
                '<td style="border-bottom:1px solid #346094;">' + hc_enfermeroExtraccion + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span><b>' + enfermeroResponsableProcedimiento + '</b></td>' +
                '<td></td>' +
                '<td>Implantó:</td>' +
                '<td style="border-bottom:1px solid #346094;">' + hc_enfermeroImplantacion + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span><b>' + he_responsableTricotomia + '</b></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina();

            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE CONTEO</b></p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align: center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td align="center">Hora</td>' +
                '<td align="center">Doctor</td>' +
                '<td align="center">Viables</td>' +
                '<td align="center">No viables</td>' +
                '<td align="center">Total</td>' +
                '<td align="center">Porcentaje</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center">1h</td>' +
                '<td align="center">' + conteoFol_1hDoctorV + ' / ' + conteoFol_1hDoctorNV + '</td>' +
                '<td align="center">' + conteoFol_1hViables + '</td>' +
                '<td align="center">' + conteoFol_1hNoViables + '</td>' +
                '<td align="center">' + conteoFol_1hTotal + '</td>' +
                '<td align="center">' + conteoFol_1hPorcentaje.toFixed(2) + ' %</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td align="center">2h</td>' +
                '<td align="center">' + conteoFol_2hDoctorV + ' / ' + conteoFol_2hDoctorNV + '</td>' +
                '<td align="center">' + conteoFol_2hViables + '</td>' +
                '<td align="center">' + conteoFol_2hNoViables + '</td>' +
                '<td align="center">' + conteoFol_2hTotal + '</td>' +
                '<td align="center">' + conteoFol_2hPorcentaje.toFixed(2) + ' %</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center">3h</td>' +
                '<td align="center">' + conteoFol_3hDoctorV + ' / ' + conteoFol_3hDoctorNV + '</td>' +
                '<td align="center">' + conteoFol_3hViables + '</td>' +
                '<td align="center">' + conteoFol_3hNoViables + '</td>' +
                '<td align="center">' + conteoFol_3hTotal + '</td>' +
                '<td align="center">' + conteoFol_3hPorcentaje.toFixed(2) + ' %</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td align="center">4h</td>' +
                '<td align="center">' + conteoFol_4hDoctorV + ' / ' + conteoFol_4hDoctorNV + '</td>' +
                '<td align="center">' + conteoFol_4hViables + '</td>' +
                '<td align="center">' + conteoFol_4hNoViables + '</td>' +
                '<td align="center">' + conteoFol_4hTotal + '</td>' +
                '<td align="center">' + conteoFol_4hPorcentaje.toFixed(2) + ' %</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center">5h</td>' +
                '<td align="center">' + conteoFol_5hDoctorV + ' / ' + conteoFol_5hDoctorNV + '</td>' +
                '<td align="center">' + conteoFol_5hViables + '</td>' +
                '<td align="center">' + conteoFol_5hNoViables + '</td>' +
                '<td align="center">' + conteoFol_5hTotal + '</td>' +
                '<td align="center">' + conteoFol_5hPorcentaje.toFixed(2) + ' %</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table><br />' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;text-align:left;">Control de corte </td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align: center;" align="center" cellspacing="0">' +
                '<tr style="background-color: #346094;color:#FFFFFF;">' +
                '<td align="center">Nombre</td>' +
                '<td align="center">1 hora</td>' +
                '<td align="center">2 hora</td>' +
                '<td align="center">3 hora</td>' +
                '<td align="center">4 hora</td>' +
                '<td align="center">5 hora</td>' +
                '<td align="center">Total</td>' +
                '</tr>' + controlDeCorte +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table><br />';

            xml += '<p style="font-size:12px;font-family:Aria,sans-serif;font-weight:bold;color:#346094;">TOTAL DE UNIDADES FOLICULARES: <span style="border-bottom: 2px solid #346094;"><b>' + totUnidadesFoliculares + '</b></span></p>';

            xml += saltoPagina();

            xml += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>PROCEDIMIENTO SEGURO</b><br /><span style="font-size:11px; ">CHECKLIST Y VERIFICACIÓN DE SITIO, PACIENTE Y PROCEDIMIENTO</span></p>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color:#346094;">1. FICHA DE IDENTIFICACIÓN:</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;">' +
                '<tr><td><b>No. de Expediente: </b> ' + numeroExpediente + '</td><td><b>Genero: </b> ' + sexoCliente + '</td></tr>' +
                '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
                '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
                '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
                '<tr><td><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">2. ANTES DE INICIAR EL PROCEDIMIENTO</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">3. AL INICIAR EL PROCEDIMIENTO</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>EL PACIENTE CONFIRMO:</b>' +
                '<ul style="list-style: none">' +
                '<li>' + ps_identidad + ' SU IDENTIDAD</li>' +
                '<li>' + ps_sitioCorrecto + ' SITIO CORRECTO</li>' +
                '<li>' + ps_procedimientoCorrecto + ' PROCEDIMIENTO CORRECTO</li>' +
                '<li>' + ps_cuentaConsentimientoInf + ' CUENTA CON SU CONSENTIMIENTO INFORMADO</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>SE REALIZO EL MARCAJE DEL SITIO QUIRÚRGICO</b>' +
                '<br/>' + ps_realizoMarcaje +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>VALORACIÓN PRE OPERATORIA</b>' +
                '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>SE COMPLETO EL CONTROL DE SEGURIDAD EN ANESTESIA</b>' +
                '<br/>' + ps_controlAnestesia +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>REFIERE ALERGIAS</b>' +
                '<br/>' +
                '<br/>CUALES' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="vertical-align: top">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;">' + ps_confirmarMiembros + ' CONFIRMAR QUE TODOS LOS MIEMBROS DEL EQUIPO SE HAYAN IDENTIFICADO POR NOMBRE Y FUNCIÓN</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>ESPECIALISTA EN MICRO INJERTO CAPILAR, ENFERMERO A Y ENFERMERO B CONFIRMAN VERBALMENTE</b>' +
                '<ul style="list-style: none">' +
                '<li>IDENTIDAD DEL PACIENTE</li>' +
                '<li>SITIO CORRECTO</li>' +
                '<li>PROCEDIMIENTO CORRECTO</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>PREVISIÓN DE EVENTOS CRÍTICOS</b>' +
                '<ul style="list-style: none">' +
                '<li>' + ps_revisaEmic + ' EL EMIC REVISA: LOS PASOS CRÍTICOS O IMPREVISTOS, LA DURACIÓN DE LA OPERACIÓN Y LA PÉRDIDA DE SANGRE PREVISTA</li>' +
                '<li>' + ps_revisarInstrumental + ' EL EQUIPO DE ENFERMERÍA REVISA: SI SE HA CONFIRMADO LA ESTERILIDAD Y SI EXISTEN DUDAS O PROBLEMAS RELACIONADOS CON EL INSTRUMENTAL Y LOS EQUIPOS</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td><b>¿SE HA ADMINISTRADO PROFILAXIS ANTIBIÓTICA EN LOS ULTIMOS 60 MINUTOS?</b>' +
                '<br/>SI' +
                '<br/>NO PROCEDE' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;vertical-align:bottom;">4. AL FINALIZAR EL PROCEDIMIENTO</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">5. EQUIPO MÉDICO RESPONSABLE DEL TRATAMIENTO</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="vertical-align: top">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>ENFERMERÍA CONFIRMA VERBALMENTE CON EL EQUIPO:</b>' +
                '<ul style="list-style: none">' +
                '<li>' + ps_nomrbeProcedimiento + ' NOMBRE DEL PROCEDIMIENTO REALIZADO</li>' +
                '<li>' + ps_recuentoInstrumental + ' RECUENTO DE INSTRUMENTOS, AGUJAS Y HOJAS DE BISTURÍ</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>' + ps_recuperacionTratamiento + ' ESPECIALISTA EN MICRO INJERTO CAPILAR, ENFERMERO A Y ENFERMERO B REVISAN LOS PRINCIPALES ASPECTOS DE LA RECUPERACIÓN Y EL TRATAMIENTO DEL PACIENTE' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td></td>' +
                '<td>' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr height="40px">' +
                '<td width="20%" style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>ESPECIALISTA EN<br />MICRO INJERTO<br />CAPILAR A CARGO:</b></td>' +
                '<td width="40%" style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + medicoResponsableProcedimiento + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr height="40px" style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>ENFERMERA(O) A:</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + enfermeroResponsableProcedimiento + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr height="40px">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>ENFERMERA(O) B:</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + '' + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr height="40px" style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>OTROS:</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + '' + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina();

            // HOJA DE PREVENCIÓN Y RIESGO DE CAÍDAS
            xml += '<p style="width:55%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>PREVENSIÓN Y RIESGO DE CAÍDAS</b></p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" border="0" cellspacing="0">' +
                '<tr>' +
                '<td width="58%" style="font-size: 13px;font-weight:bold;color:#346094;">1. IDENTIFICACIÓN DEL RIESGO</td>' +
                '<td width="2%"></td>' +
                '<td width="40%" style="font-size: 13px;font-weight:bold;color:#346094;">2. MEDIDAS PREVENTIVAS</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="30%" style="border-bottom:1px solid #346094;border-right:1px solid #346094;"><b>CRITERIO DE EVALUACIÓN</b></td>' +
                '<td width="30%" style="border-bottom:1px solid #346094;border-right:1px solid #346094;"><b>VARIABLES</b></td>' +
                '<td width="20%" style="border-bottom:1px solid #346094;border-right:1px solid #346094;"><b>PUNTAJE</b></td>' +
                '<td width="20%" style="border-bottom:1px solid #346094;"><b>TOTAL</b></td>' +
                '</tr>' + identificacionRiesgo +
                '<tr>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + sublist_total + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td></td>' +
                '<td style="vertical-align: top;">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;" cellspacing="0">' +
                '<tr>' +
                '<td><b>DESCRIPCIÓN DE ACCIONES:</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr>' +
                '<td style="font-size:10px;">' + hMP_descripcionAcciones + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina();

            // HOJA POST PROCEDIMIENTO
            xml += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA POST PROCEDIMIENTO</b><br />MICRO INJERTO CAPILAR</p>' +
                '<br/>' +
                '<table style="width:100%;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color:#346094;"> 1. DETALLES DEL PROCEDIMIENTO.</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">PROCEDIMIENTO REALIZADO: <b>' + fechaCaso + '</b></td>' +
                '<td></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">DIAGNÓSTICO POST-PROCEDIMIENTO: <b> ' + hPP_diagnosticoPP + '</b></td>' +
                '<td>ZONA IMPLANTADA: <b>' + hPP_zonaImplantada + '</b></td>' +
                '</tr>' +
                /*                 '<tr>' +
                                '<td>PROCEDIMIENTO REALIZADO:</td>' +
                                '<td></td>' +
                                '<td></td>' +
                                '</tr>' + */
                '<tr style="background-color: #cadcff">' +
                '<td>ANESTÉSICO Y TIPO DE ANESTESIA: <b>' + hPP_tipoAnestesia + '</b></td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>' +
                '<tr>' +
                '<td>INICIO DE EXTRACCIÓN: <b>' + he_extInicio + '</b></td>' +
                '<td>TÉRMINO DE EXTRACCIÓN: <b>' + he_extTermino + '</b></td>' +
                '<td></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>INICIO DE IMPLANTACIÓN: <b>' + he_impInicio + '</b></td>' +
                '<td>TÉRMINO DE IMPLANTACIÓN: <b>' + he_impTermino + '</b></td>' +
                '<td></td>' +
                '</tr>' +
                '<tr>' +
                '<td>FOLÍCULOS: <b>' + totalConteoFoliculos + '</b></td>' +
                '<td>UNIDADES FOLICULARES: <b>' + totalConteoUnidadFolicular + '</b></td>' +
                '<td></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>MÉDICO RESPONSABLE: <b>' + medicoResponsableProcedimiento + '</b></td>' +
                '<td></td>' +
                '<td>CÉDULA PROFESIONAL:</td>' +
                '</tr>' +
                '<tr>' +
                '<td>EQUIPO DE ENFERMERÍA: <b>' + enfermeroResponsableProcedimiento + '</b></td>' +
                '<td></td>' +
                '<td>CÉDULA PROFESIONAL:</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>OTROS: <b>' + hc_enfermeroExtraccion + ' y ' + hc_enfermeroImplantacion + '</b></td>' +
                '<td></td>' +
                '<td>CÉDULA PROFESIONAL:</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;" cellspacing="0">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color:#346094;"> 2. DESCRIPCIÓN DE LA TÉCNICA Y HALLAZGOS ENCONTRADOS.</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td>' + hPP_tecHallazgos + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina();

            // HOJA NOTA EGRESO Y ALTA
            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA EGRESO Y ALTA</b></p><br />' +
                '<table style="width:100%;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td width="25%" style="border-bottom: 1px solid #346094;">FECHA Y HORA DE EGRESO</td>' +
                '<td width="75%" style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_fechaEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">SIGNOS VITALES</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_signosVitalesEgreso + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;">DIAGNÓSTICO DE INGRESO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hPP_diagnosticoPreOperatorio + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">RESUMEN DE LA EVOLUCIÓN Y ESTADO ACTUAL</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_resumenEvolucion + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;">DIAGNÓSTICO DE EGRESO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_fechaEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">FECHA Y HORA DE PROCEDIMIENTO REALIZADO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hPP_fechaProcedimiento + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;">MOTIVO DE EGRESO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_motivoEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">PLAN DE MANEJO, TRATAMIENTO Y RECOMENDACIONES</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_planManejo + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="">NOMBRE COMPLETO, CÉDULA Y FIRMA DEL MÉDICO</td>' +
                '<td style="border-left: 1px solid #346094;"><b>' + medicoResponsableProcedimiento + '</b></td>' +
                '</tr>' +
                '</table>';

            // salto de pagina --> xml += saltoPagina();


            // HOJA NOTAS DE EVOLUCIÓN
            /*             xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE EVOLUCIÓN</b></p><br />' +
                            '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
                            '<tr height="30px">' +
                            '<td width="35%" style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>FECHA Y HORA DE ELABORACIÓN:</b></td>' +
                            '<td width="65%" style="border-bottom:1px solid #346094;border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>SIGNOS VITALES:</b></td>' +
                            '<td style="border-bottom:1px solid #346094;border-left:1px solid #346094;text-align: justify;"> FC:_____ pm  FR:____ pm  TA:____ mmHg  TEMP:____ °C</td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>SÍNTOMAS DEL PACIENTE:</b></td>' +
                            '<td style="border-bottom:1px solid #346094;border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>EXPLORACIÓN FÍSICA Y HALLAZGOS:</b></td>' +
                            '<td style="border-bottom:1px solid #346094;border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>DIAGNÓSTICO O PROBLEMAS CLÍNICOS:</b></td>' +
                            '<td style="border-bottom:1px solid #346094;border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>PLAN DE ESTUDIO O TRATAMIENTO:</b></td>' +
                            '<td style="border-bottom:1px solid #346094;border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;"><b>PRONÓSTICO:</b></td>' +
                            '<td style="border-bottom:1px solid #346094;border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '<tr height="30px">' +
                            '<td style="background-color: #cadcff;"><b>NOMBRE COMPLETO, CÉDULA Y FIRMA MÉDICO</b></td>' +
                            '<td style="border-left:1px solid #346094;"></td>' +
                            '</tr>' +
                            '</table>'; */

            xml += '</body></pdf>';
            context.response.renderPdf({ xmlString: xml });
            log.debug('Cedula', findCedulaMedico(medicoResponsableProcedimiento));

        }

        /**
         * Function que retorna un string de HTML con estilo para generar un salto de página
         * y además agrega el espacio necesario para inciar la siguiente página en el sitio
         * correcto después del logo de hoja membretada
         */
        function saltoPagina() {
            var saltoPagina = '<div style="page-break-after:always;"></div>';
            saltoPagina += '<br/><br/><br/><br/><br/>';

            return saltoPagina;
        }

        // Retorna el nombre de la Sucursal sin el KHG final
        /** Funcion que crea el archivo .txt por defecto y 
         * devuelve el id asociado a la creacion de este archivo
         * 
         * @param {string} folderParent id del Folder principal de cliente
         */
        function sucursalReal(sucursalText) {
            var largoSucrusal = sucursalText.length;
            largoSucrusal = largoSucrusal - 4;
            var sucursalFinal = sucursalText.slice(0, largoSucrusal);
            return sucursalFinal;
        }

        /**
         * Funcion que obtiene la imagen de fondo correspondiente a la sucursal
         * @param {int} sucursal Identificador de la sucursal
         */
        function getImageBackGround(sucursal) {
            var imageBack = "";
            if (sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28") {
                imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
            }
            else {
                if (sucursal == "22") // Altavista KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
                if (sucursal == "35") // Can-Cun KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                if (sucursal == "36") // Chihuahua KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
                if (sucursal == "23") // Guadalajara KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
                if (sucursal == "24") // Monterrey KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
                if (sucursal == "25") // Polanco KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
                if (sucursal == "37") // Puebla KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
                if (sucursal == "21") // Santa FE KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
                if (sucursal == "26") // Satelite KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
                if (sucursal == "27") // Tijuana KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
                if (sucursal == "28") // Veracruz KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
            }
            return imageBack;
        }

        /**
         * Funcion que retorna la los años enteros transcurridos entre dos fechas
         * @param {string} fechaAntigua - se ingresa la fecha inicial desde la que se quiere calcular, por ejemplo: una fecha de nacimiento  
         * @param {string} fechaReciente - se ingresa la fecha final relativa al calculo, por ejemplo: la fecha actual
         */
        function calcYearInt(fechaAntigua, fechaReciente) {
            var separador = '';
            var fR = fechaReciente.length;
            var fA = fechaAntigua.length;

            //extraer dia, mes y año del caso analizado
            separador = fechaReciente.search('/');
            var diaCaso = fechaReciente.substring(0, separador);
            fechaReciente = fechaReciente.substring(separador + 1, fR);
            fR = fechaReciente.length;
            separador = fechaReciente.search('/');
            var mesCaso = fechaReciente.substring(0, separador);
            fechaReciente = fechaReciente.substring(separador + 1, fR);
            var anioCaso = fechaReciente.substring(0, 4);

            //extraer dia, mes y año de la fecha de nacimiento del paciente
            separador = fechaAntigua.search('/');
            var diaNac = fechaAntigua.substring(0, separador);
            fechaAntigua = fechaAntigua.substring(separador + 1, fA);
            fA = fechaAntigua.length;
            separador = fechaAntigua.search('/');
            var mesNac = fechaAntigua.substring(0, separador);
            fechaAntigua = fechaAntigua.substring(separador + 1, fA);
            var anioNac = fechaAntigua.substring(0, 4);

            //calculo de las variables para obtener los días transcurridos entre ambas fechas
            var calcAnio = (parseInt(anioCaso) - parseInt(anioNac)) * 365.25;
            var calcMes = (parseInt(mesCaso) - parseInt(mesNac)) * 30;
            var calcDia = (parseInt(diaCaso) - parseInt(diaNac)) * 1;
            var calcEdad = (calcAnio + calcMes + calcDia) / 365.25;

            //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
            //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
            var edad = Math.floor(calcEdad);

            return edad;
        }

        /**
         * Funcion para generar una imagen amigable al check y uncheck
         * @param {String} checks Parametro que revisa si el valor es verdadero o falso
         */
        function checado(checks) {
            var check = "";
            if (checks == true) {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                //var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 6px;margin-top: px;\" height=\"10px\" width=\"10px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                //check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            }
            if (checks == false) {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                //var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                //check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check = "<img style=\"display:inline;margin-right: 6px;margin-top: px;\" height=\"10px\" width=\"10px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";
            }
            if (checks == "SI" || checks == "Si" || checks == "Sí") {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathYes = "https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39";
                var pathNot = "https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153";
                check = "SI (<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathYes }) + "\" />) ";
                check += "NO (<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNot }) + "\" />)";
            }
            if (checks == "NO" || checks == "No") {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                var pathYes = "https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153";
                var pathNot = "https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39";
                check = "SI (<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathYes }) + "\" />) ";
                check += "NO (<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNot }) + "\" />)";
            }
            return check;
        }

        /**
         * Función para buscar el empleado y obtener su Cedula Profesional
         * @param {string} nameMedico Nombre del médico o enfermero en formato de texto
         */
        function findCedulaMedico(nameMedico) {
            var vacio = "";
            var nombre = String(nameMedico);
            if (nameMedico == "" || nameMedico == null) {
                return vacio;
            } else {
                var findingVal = nombre.substring(0, 15);
                log.debug('Valor', findingVal);
            }

            /*             search.create({
                            type: search.Type.EMPLOYEE,
                            filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: 62921 })],
                            columns: ['internalid']
                        }).run().each(function (result) {
                            employeeId = result.getValue({ name: 'internalid' });
                        }); */
            //log.debug('id de empleado', employeeId);

            var recordEmployee = record.load({ type: 'employee', id: 62921 });
            var employeeCedula = recordEmployee.getValue({ fieldId: 'custentity392' });

            log.debug('Cedula', employeeCedula);
            return employeeCedula;
        }

        return {
            onRequest: onRequest
        }
    });