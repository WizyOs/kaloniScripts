/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/file', 'N/search', 'N/error'],

    function (record, log, render, xmlMod, file, search, error) {

        function onRequest(context) {


            // MAIN VARS
            // Global Variables
            var values_questionsCheckbox = [];
            var values_booleans_questionsCheckbox = [];

            // Variables para crear los objetos principales
            var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
            var caso = record.load({ type: 'supportcase', id: recId }); // Variable que guarda el objeto Case
            var company = caso.getValue({ fieldId: 'company' }); // Id de cliente
            var clienteId = parseInt(company);
            var cliente;
            try {
                cliente = record.load({ type: 'CUSTOMER', id: clienteId }); // Variable que guarda el objeto Customer    
            } catch (error) {
                log.error('Error', error);
            }

            //CUSTOMER
            // Variables Informacion General obtenidas del CLIENTE
            var sucursalId = caso.getValue({ fieldId: 'custevent2' }); //Variable que guarda el id de Sucursal del cliente
            var nombreCliente = cliente.getText({ fieldId: 'altname' });
            var numeroExpediente = cliente.getText({ fieldId: 'entityid' });
            var identificacionCliente = cliente.getText({ fieldId: 'custentity251' }) || '';
            var telefonoCliente = cliente.getText({ fieldId: 'phone' }) || '';
            var direccionCliente = cliente.getText({ fieldId: 'defaultaddress' }) || '';
            var field_documentIdentification = cliente.getText({ fieldId: 'custentity431' }) || '_______________';

            // VARIABLES DE CASE
            // Variables Informacion General obtenidads del Case
            var sucId = caso.getText({ fieldId: 'custevent2' });
            var sucursalTextCaso = caso.getText({ fieldId: 'custevent2' }); // Variable que guarda el nombre de la sucursal en String del case
            var fechaCaso = caso.getText({ fieldId: 'startdate' }); // variable que guarda la fecha en la que se presenta el caso
            var edoCivilCliente = caso.getText({ fieldId: 'custevent206' }) || '';
            var fechNacCliente = caso.getText({ fieldId: 'custevent331' });
            var sexoCliente = caso.getText({ fieldId: 'custevent634' }) || '';
            var field_questionsCheckbox = caso.getText({ fieldId: 'custevent1185' }) || '';
            var subsidiaria = caso.getValue({ fieldId: 'subsidiary' });

            var hc_enfermeroExtraccion = caso.getText({ fieldId: 'custevent71' }) || ""; // variable que guarda el enfermero de extraccion del caso
            var hc_enfermeroExtraccion_cedula = obtenerCedula(hc_enfermeroExtraccion, 'c');
            var hc_enfermeroImplantacion = caso.getText({ fieldId: 'custevent72' }) || ""; // variable que guarda el enfermero de implantacion del caso
            var hc_enfermeroImplantacion_cedula = obtenerCedula(hc_enfermeroImplantacion, 'c');

            var count = 0;
            var medicosResponsables = Array();
            var medicosResponsables_cedulas = Array();
            var enfermerosResponsables = Array();
            var enfermerosResponsables_cedulas = Array();
            var medicoResponsableProcedimiento = caso.getText({ fieldId: 'custevent28' }) || ""; // variable que guarda el medico responsable del caso
            var enfermerosResponsableProcedimiento = caso.getText({ fieldId: 'custevent29' }) || ""; // variable que guarda el enfermeto responsable del caso

            for (count in medicoResponsableProcedimiento) {
                medicosResponsables.push(medicoResponsableProcedimiento[count]);
                medicosResponsables_cedulas.push(obtenerCedula(medicoResponsableProcedimiento[count], 'c'));
            }

            log.debug('medicos', medicosResponsables);
            log.debug('medicos cedulas', medicosResponsables_cedulas);

            for (count in enfermerosResponsableProcedimiento) {
                enfermerosResponsables.push(enfermerosResponsableProcedimiento[count]);
                enfermerosResponsables_cedulas.push(obtenerCedula(enfermerosResponsableProcedimiento[count], 'c'));
            }

            log.debug('enfermeros', enfermerosResponsables);
            log.debug('enfermeros cedulas', enfermerosResponsables_cedulas);

            var medicoResponsableProcedimiento_cedula = '';
            var enfermerosResponsableProcedimiento_cedula = '';

            var enfermeroA = obtenerNombreUno(enfermerosResponsableProcedimiento);
            var enfermeroA_cedula = obtenerCedula(enfermeroA, 'c');
            var enfermeroB = obtenerNombreDos(enfermerosResponsableProcedimiento);
            var enfermeroB_cedula = obtenerCedula(enfermeroB, 'c');
            var enfermeroResponsableProcedimiento = "";
            var hc_enfermeroExtraccion_equipoMedico = (hc_enfermeroExtraccion != "") ? ' / ' + hc_enfermeroExtraccion : "";
            var hc_enfermeroImplantacion_equipoMedico = (hc_enfermeroImplantacion != "") ? ' / ' + hc_enfermeroImplantacion : "";

            //ACTION: Checkbox de cliente en firma de Consentimiento Informado de procedimientos
            try {
                values_questionsCheckbox = field_questionsCheckbox.split(',');
                for (var key1 in values_questionsCheckbox) {
                    if (values_questionsCheckbox[key1] == 'true') {
                        values_booleans_questionsCheckbox[key1] = true;
                    } else if ( values_questionsCheckbox[key1] == 'false') {
                        values_booleans_questionsCheckbox[key1] = false;
                    }
                }
                log.debug('Arreglo de valores checkBox', values_questionsCheckbox);
            } catch (error) {
                log.error('Error de covnersion de cadena a arreglo', error);
            }

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

                    var he_tmedicamentos_administro_display = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_administro_display', line: i }) || "";
                    var he_tmedicamentos_dosis = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_dosis', line: i }); //
                    var he_tmedicamentos_hora = caso.getSublistText({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_hora', line: i }); //
                    var he_tmedicamentos_indico_display = caso.getSublistValue({ sublistId: 'recmachcustrecord_he_medicamentos', fieldId: 'custrecord_he_tmedicamentos_indico_display', line: i }) || ""; //
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


            //TAB CCONTROL DE CORTE VIABLES Y NO VIABLE
            var conteoFol_DoctorV = "";
            var conteoFol_DoctorNV = "";
            var conteoFol_1hDoctorV = "";
            var conteoFol_1hDoctorNV = "";
            var conteoFol_1hViables = 0;
            var conteoFol_1hNoViables = 0;
            var conteoFol_1hTotal = 0;
            var conteoFol_1hPorcentaje = 0;
            var conteoFol_2hDoctorV = "";
            var conteoFol_2hDoctorNV = "";
            var conteoFol_2hViables = 0;
            var conteoFol_2hNoViables = 0;
            var conteoFol_2hTotal = 0;
            var conteoFol_2hPorcentaje = 0;
            var conteoFol_3hDoctorV = "";
            var conteoFol_3hDoctorNV = "";
            var conteoFol_3hViables = 0;
            var conteoFol_3hNoViables = 0;
            var conteoFol_3hTotal = 0;
            var conteoFol_3hPorcentaje = 0;
            var conteoFol_4hDoctorV = "";
            var conteoFol_4hDoctorNV = "";
            var conteoFol_4hViables = 0;
            var conteoFol_4hNoViables = 0;
            var conteoFol_4hTotal = 0;
            var conteoFol_4hPorcentaje = 0;
            var conteoFol_5hDoctorV = "";
            var conteoFol_5hDoctorNV = "";
            var conteoFol_5hViables = 0;
            var conteoFol_5hNoViables = 0;
            var conteoFol_5hTotal = 0;
            var conteoFol_5hPorcentaje = 0;
            var recmachcustrecord_nro_cfs_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_nro_cfs' });
            if (recmachcustrecord_nro_cfs_Lines > 0) {
                for (var i = 0; i < 1; i++) {
                    conteoFol_1hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_una_hora_cf', line: i }) || 0;
                    conteoFol_2hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_dos_horas_cf', line: i }) || 0;
                    conteoFol_3hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_tres_horas_cf', line: i }) || 0;
                    conteoFol_4hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_cuatro_horas_cf', line: i }) || 0;
                    conteoFol_5hViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_cinco_horas_cf', line: i }) || 0;
                    conteoFol_DoctorV = caso.getSublistText({ sublistId: 'recmachcustrecord_nro_cfs', fieldId: 'custrecord_doctor_viables', line: i }) || "";
                    //conteoFol_1hViables = ((conteoFol_1hViables != null || conteoFol_1hViables != "") ? conteoFol_1hViables : 0);
                    //conteoFol_2hViables = ((conteoFol_2hViables != null || conteoFol_2hViables != "") ? conteoFol_2hViables : 0);
                    //conteoFol_3hViables = ((conteoFol_3hViables != null || conteoFol_3hViables != "") ? conteoFol_3hViables : 0);
                    //conteoFol_4hViables = ((conteoFol_4hViables != null || conteoFol_4hViables != "") ? conteoFol_4hViables : 0);
                    //conteoFol_5hViables = ((conteoFol_5hViables != null || conteoFol_5hViables != "") ? conteoFol_5hViables : 0);
                }
            }
            var recmachcustrecord_nro_cfs_nv_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_nro_cfs_nv' });
            if (recmachcustrecord_nro_cfs_nv_Lines > 0) {
                for (var i = 0; i < 1; i++) {
                    conteoFol_1hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_una_hora_cf_nv', line: i }) || 0;
                    conteoFol_2hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_dos_horas_cf_nv', line: i }) || 0;
                    conteoFol_3hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_tres_horas_cf_nv', line: i }) || 0;
                    conteoFol_4hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_cuatro_horas_cf_nv', line: i }) || 0;
                    conteoFol_5hNoViables = caso.getSublistValue({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_cinco_horas_cf_nv', line: i }) || 0;
                    conteoFol_DoctorNV = caso.getSublistText({ sublistId: 'recmachcustrecord_nro_cfs_nv', fieldId: 'custrecord_doctor_noviables', line: i }) || "";
                    //conteoFol_1hNoViables = ((conteoFol_1hNoViables != null || conteoFol_1hNoViables != "") ? conteoFol_1hNoViables : 0);
                    //conteoFol_2hNoViables = ((conteoFol_2hNoViables != null || conteoFol_2hNoViables != "") ? conteoFol_2hNoViables : 0);
                    //conteoFol_3hNoViables = ((conteoFol_3hNoViables != null || conteoFol_3hNoViables != "") ? conteoFol_3hNoViables : 0);
                    //conteoFol_4hNoViables = ((conteoFol_4hNoViables != null || conteoFol_4hNoViables != "") ? conteoFol_4hNoViables : 0);
                    //conteoFol_5hNoViables = ((conteoFol_5hNoViables != null || conteoFol_5hNoViables != "") ? conteoFol_5hNoViables : 0);
                }
            }
            conteoFol_1hTotal = parseInt(conteoFol_1hViables) + parseInt(conteoFol_1hNoViables);
            conteoFol_2hTotal = parseInt(conteoFol_2hViables) + parseInt(conteoFol_2hNoViables);
            conteoFol_3hTotal = parseInt(conteoFol_3hViables) + parseInt(conteoFol_3hNoViables);
            conteoFol_4hTotal = parseInt(conteoFol_4hViables) + parseInt(conteoFol_4hNoViables);
            conteoFol_5hTotal = parseInt(conteoFol_5hViables) + parseInt(conteoFol_5hNoViables);

            conteoFol_1hPorcentaje = ((conteoFol_1hViables) * 100) / conteoFol_1hTotal;
            conteoFol_2hPorcentaje = ((conteoFol_2hViables) * 100) / conteoFol_2hTotal;
            conteoFol_3hPorcentaje = ((conteoFol_3hViables) * 100) / conteoFol_3hTotal;
            conteoFol_4hPorcentaje = ((conteoFol_4hViables) * 100) / conteoFol_4hTotal;
            conteoFol_5hPorcentaje = ((conteoFol_5hViables) * 100) / conteoFol_5hTotal;
            conteoFol_1hPorcentaje = (isNaN(conteoFol_1hPorcentaje)) ? 0 : conteoFol_1hPorcentaje;
            conteoFol_2hPorcentaje = (isNaN(conteoFol_2hPorcentaje)) ? 0 : conteoFol_2hPorcentaje;
            conteoFol_3hPorcentaje = (isNaN(conteoFol_3hPorcentaje)) ? 0 : conteoFol_3hPorcentaje;
            conteoFol_4hPorcentaje = (isNaN(conteoFol_4hPorcentaje)) ? 0 : conteoFol_4hPorcentaje;
            conteoFol_5hPorcentaje = (isNaN(conteoFol_5hPorcentaje)) ? 0 : conteoFol_5hPorcentaje;

            var totalNoViables = conteoFol_1hNoViables + conteoFol_2hNoViables + conteoFol_3hNoViables + conteoFol_4hNoViables + conteoFol_5hNoViables;
            var totalViables = conteoFol_1hViables + conteoFol_2hViables + conteoFol_3hViables + conteoFol_4hViables + conteoFol_5hViables;
            var totalConteoTotales = conteoFol_1hTotal + conteoFol_2hTotal + conteoFol_3hTotal + conteoFol_4hTotal + conteoFol_5hTotal;

            conteoFol_1hDoctorV = conteoFol_DoctorV;
            conteoFol_2hDoctorV = conteoFol_DoctorV;
            conteoFol_3hDoctorV = conteoFol_DoctorV;
            conteoFol_4hDoctorV = conteoFol_DoctorV;
            conteoFol_5hDoctorV = conteoFol_DoctorV;

            conteoFol_1hDoctorNV = conteoFol_DoctorNV;
            conteoFol_2hDoctorNV = conteoFol_DoctorNV;
            conteoFol_3hDoctorNV = conteoFol_DoctorNV;
            conteoFol_4hDoctorNV = conteoFol_DoctorNV;
            conteoFol_5hDoctorNV = conteoFol_DoctorNV;



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
            hoyosConteoUnidadFolicular = parseInt(totalConteoUnidadFolicular) + parseInt(totalNoViables);
            var porcentajeHoyos = (totalConteoUnidadFolicular * 100) / hoyosConteoUnidadFolicular;
            porcentajeHoyos = (isNaN(porcentajeHoyos) == true) ? 0 : porcentajeHoyos;

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
            var sublist_hora1 = 0;
            var sublist_hora2 = 0;
            var sublist_hora3 = 0;
            var sublist_hora4 = 0;
            var sublist_hora5 = 0;
            var sublist_enfermero = "";
            var recmachcustrecord_control_corte_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_control_corte' });
            if (recmachcustrecord_control_corte_Lines > 0) {
                for (var i = 0; i < recmachcustrecord_control_corte_Lines; i++) {
                    var parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    sublist_enfermero = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_enfermera_display', line: i }) || "";
                    sublist_hora1 = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora1_cc', line: i });
                    sublist_hora2 = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora2_cc', line: i });
                    sublist_hora3 = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora3_cc', line: i });
                    sublist_hora4 = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora4_cc', line: i });
                    sublist_hora5 = caso.getSublistValue({ sublistId: 'recmachcustrecord_control_corte', fieldId: 'custrecord_hora5_cc', line: i });
                    sublist_hora1 = ((sublist_hora1 != null && sublist_hora1 != "") ? sublist_hora1 : 0);
                    sublist_hora2 = ((sublist_hora2 != null && sublist_hora2 != "") ? sublist_hora2 : 0);
                    sublist_hora3 = ((sublist_hora3 != null && sublist_hora3 != "") ? sublist_hora3 : 0);
                    sublist_hora4 = ((sublist_hora4 != null && sublist_hora4 != "") ? sublist_hora4 : 0);
                    sublist_hora5 = ((sublist_hora5 != null && sublist_hora5 != "") ? sublist_hora5 : 0);
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
            //hMP_descripcionAcciones = String(hMP_descripcionAcciones);
            // Grupo identificación del riesgo
            var identificacionRiesgo = null;
            var sublist_total = 0;
            var totalPuntajeIdentificaRiesgo = 0;
            var recmachcustrecord_identificacion_riesgo_Lines = caso.getLineCount({ sublistId: 'recmachcustrecord_identificacion_riesgo' });
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
                    identificacionRiesgo += '<td align="center"></td>';
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

            // DISEÑO EN SALA DE PROCEDIMIENTO
            var diseno_Img1_Val = caso.getValue({ fieldId: 'custevent82' });
            if (diseno_Img1_Val == "" || diseno_Img1_Val == null)
                diseno_Img1_Val = "1592235";

            var diseno_Img1 = file.load({ id: diseno_Img1_Val });
            var diseno_Img1_url = "data:image/png;base64," + diseno_Img1.getContents();

            var diseno_Img2_Val = caso.getValue({ fieldId: 'custevent83' });
            if (diseno_Img2_Val == "" || diseno_Img2_Val == null)
                diseno_Img2_Val = "1592235";

            var diseno_Img2 = file.load({ id: diseno_Img2_Val });
            var diseno_Img2_url = "data:image/png;base64," + diseno_Img2.getContents();

            var diseno_Img3_Val = caso.getValue({ fieldId: 'custevent84' });
            if (diseno_Img3_Val == "" || diseno_Img3_Val == null)
                diseno_Img3_Val = "1592235";

            var diseno_Img3 = file.load({ id: diseno_Img3_Val });
            var diseno_Img3_url = "data:image/png;base64," + diseno_Img3.getContents();

            var diseno_Img4_Val = caso.getValue({ fieldId: 'custevent85' });
            if (diseno_Img4_Val == "" || diseno_Img4_Val == null)
                diseno_Img4_Val = "1592235";

            var diseno_Img4 = file.load({ id: diseno_Img4_Val });
            var diseno_Img4_url = "data:image/png;base64," + diseno_Img4.getContents();

            ////FIRMAS

            var injerto_FirmaCliente_base64 = caso.getValue({ fieldId: 'custevent193' }); //custevent86
            if (injerto_FirmaCliente_base64 != "" && injerto_FirmaCliente_base64 != null) {
                if (injerto_FirmaCliente_base64.substring(0, 3) == "ok_")
                    injerto_FirmaCliente_base64 = injerto_FirmaCliente_base64.substring(3, injerto_FirmaCliente_base64.length);
            }
            else {
                injerto_FirmaCliente_base64 = "#";
            }

            var injerto_FirmaMedico_base64 = caso.getValue({ fieldId: 'custevent194' }); //custevent87
            if (injerto_FirmaMedico_base64 != "" && injerto_FirmaMedico_base64 != null) {
                if (injerto_FirmaMedico_base64.substring(0, 3) == "ok_")
                    injerto_FirmaMedico_base64 = injerto_FirmaMedico_base64.substring(3, injerto_FirmaMedico_base64.length);
            }
            else {
                injerto_FirmaMedico_base64 = "#";
            }


            // FIRMA CONSENTIMIENTO INFORMADO
            var consentimientoInjerto_base64Cliente = caso.getValue({ fieldId: 'custevent269' }); //custevent86
            if (consentimientoInjerto_base64Cliente != "" && consentimientoInjerto_base64Cliente != null) {
                if (consentimientoInjerto_base64Cliente.substring(0, 3) == "ok_")
                    consentimientoInjerto_base64Cliente = consentimientoInjerto_base64Cliente.substring(3, consentimientoInjerto_base64Cliente.length);
            }
            else {
                consentimientoInjerto_base64Cliente = "#";
            }

            var consentimientoInjerto_base64Medico = caso.getValue({ fieldId: 'custevent485' }); //custevent87
            if (consentimientoInjerto_base64Medico != "" && consentimientoInjerto_base64Medico != null) {
                if (consentimientoInjerto_base64Medico.substring(0, 3) == "ok_")
                    consentimientoInjerto_base64Medico = consentimientoInjerto_base64Medico.substring(3, consentimientoInjerto_base64Medico.length);
            }
            else {
                consentimientoInjerto_base64Medico = "#";
            }

            var consentimientoInjerto_base64Testigo1 = caso.getValue({ fieldId: 'custevent548' });
            if (consentimientoInjerto_base64Testigo1 != "" && consentimientoInjerto_base64Testigo1 != null) {
                if (consentimientoInjerto_base64Testigo1.substring(0, 3) == "ok_")
                    consentimientoInjerto_base64Testigo1 = consentimientoInjerto_base64Testigo1.substring(3, consentimientoInjerto_base64Testigo1.length);
            }
            else {
                consentimientoInjerto_base64Testigo1 = "#";
            }

            var consentimientoInjerto_base64Testigo2 = caso.getValue({ fieldId: 'custevent549' });
            if (consentimientoInjerto_base64Testigo2 != "" && consentimientoInjerto_base64Testigo2 != null) {
                if (consentimientoInjerto_base64Testigo2.substring(0, 3) == "ok_")
                    consentimientoInjerto_base64Testigo2 = consentimientoInjerto_base64Testigo2.substring(3, consentimientoInjerto_base64Testigo2.length);
            }
            else {
                consentimientoInjerto_base64Testigo2 = "#";
            }


            // FIRMA AUTORIZACIÓN DE USO DE IMAGEN EN FOTOGRAFÍA Y/O VIDEO PARA PUBLICACIÓN Y/O DIFUSIÓN
            var statusFirmaTestimonial = false;
            var testimonialbase64 = caso.getValue({ fieldId: 'custevent328' });
            if (testimonialbase64 != "" && testimonialbase64 != null) {
                if (testimonialbase64.substring(0, 3) == "ok_") {
                    testimonialbase64 = testimonialbase64.substring(3, testimonialbase64.length);
                }
                statusFirmaTestimonial = true;
            }
            else {
                testimonialbase64 = "#";
                statusFirmaTestimonial = false;
            }

            // IMG CASO DE PROCEDIMIENTOS
            var diseno_Img1_ValIMG = caso.getValue({ fieldId: 'custevent76' });
            if (diseno_Img1_ValIMG == "" || diseno_Img1_ValIMG == null)
                diseno_Img1_ValIMG = "1592235";

            var diseno_Img1IMG = file.load({ id: diseno_Img1_ValIMG });
            var diseno_Img1_urlIMG = "data:image/png;base64," + diseno_Img1IMG.getContents();

            var diseno_Img2_ValIMG = caso.getValue({ fieldId: 'custevent77' });
            if (diseno_Img2_ValIMG == "" || diseno_Img2_ValIMG == null)
                diseno_Img2_ValIMG = "1592235";

            var diseno_Img2IMG = file.load({ id: diseno_Img2_ValIMG });
            var diseno_Img2_urlIMG = "data:image/png;base64," + diseno_Img2IMG.getContents();

            var diseno_Img3_ValIMG = caso.getValue({ fieldId: 'custevent78' });
            if (diseno_Img3_ValIMG == "" || diseno_Img3_ValIMG == null)
                diseno_Img3_ValIMG = "1592235";

            var diseno_Img3IMG = file.load({ id: diseno_Img3_ValIMG });
            var diseno_Img3_urlIMG = "data:image/png;base64," + diseno_Img3IMG.getContents();

            var diseno_Img4_ValIMG = caso.getValue({ fieldId: 'custevent81' });
            if (diseno_Img4_ValIMG == "" || diseno_Img4_ValIMG == null)
                diseno_Img4_ValIMG = "1592235";

            var diseno_Img4IMG = file.load({ id: diseno_Img4_ValIMG });
            var diseno_Img4_urlIMG = "data:image/png;base64," + diseno_Img4IMG.getContents();


            // REVISIONES
            // Revisión 24 HORAS
            var REVISION_DE_24_HORAS_bto = caso.getText('custevent138') || '';
            var LAVADO_24HR_NOTA_MEDICA_bto = caso.getValue('custevent139') || '';
            var TX24H_bto = caso.getValue('custevent140') || '';
            var RESPONSABLE24H_bto = caso.getValue('custevent141') || '';
            // Revisión 10 DIAS
            var REVISION_10_DIAS_bto = caso.getText('custevent142') || '';
            var PRIMERA_NOTA_MEDICA_bto = caso.getValue('custevent143') || '';
            var TX10DIAS_bto = caso.getValue('custevent144') || '';
            var RESPONSABLE10DIAS_bto = caso.getValue('custevent145') || '';
            // Revisión de 1 Mes
            var REVISION_1_MES_bto = caso.getText('custevent146') || '';
            var SEGUNDA_NOTA_MEDICA_bto = caso.getValue('custevent147') || '';
            var TX1MES_bto = caso.getValue('custevent148') || '';
            var RESPONSABLE1MES_bto = caso.getValue('custevent149') || '';
            // Revisión de 2 Meses
            var REVISION_2_MESES_bto = caso.getText('custevent811') || '';
            var TERCERA_NOTA_MEDICA_bto = caso.getValue('custevent812') || '';
            var TX2MESES_bto = caso.getValue('custevent813') || '';
            var RESPONSABLE2MESES_bto = caso.getValue('custevent814') || '';
            // Revisión de 3 Meses
            var REVISION_3_MESES_bto = caso.getText('custevent150') || '';
            var CUARTA_NOTA_MEDICA_bto = caso.getValue('custevent151') || '';
            var TX3MESES_bto = caso.getValue('custevent152') || '';
            var RESPONSABLE3MESES_bto = caso.getValue('custevent153') || '';
            // Revisión de 4 Meses
            var REVISION_4_MESES_bto = caso.getText('custevent815') || '';
            var QUINTA_NOTA_MEDICA_bto = caso.getValue('custevent816') || '';
            var TX4MESES_bto = caso.getValue('custevent817') || '';
            var RESPONSABLE4MESES_bto = caso.getValue('custevent818') || '';
            // Revisión de 5 Meses
            var REVISION_5_MESES_bto = caso.getText('custevent154') || '';
            var SEXTA_NOTA_MEDICA_bto = caso.getValue('custevent155') || '';
            var TX5MESES_bto = caso.getValue('custevent156') || '';
            var RESPONSABLE5MESES_bto = caso.getValue('custevent157') || '';
            // Revisión de 6 Meses
            var REVISION_6_MESES_bto = caso.getText('custevent819') || '';
            var SEPTIMA_NOTA_MEDICA_bto = caso.getValue('custevent820') || '';
            var TX6MESES_bto = caso.getValue('custevent821') || '';
            var RESPONSABLE6MESES_bto = caso.getValue('custevent822') || '';
            // Revisión de 7 Meses
            var REVISION_7_MESES_bto = caso.getText('custevent158') || '';
            var OCTAVA_NOTA_MEDICA_bto = caso.getValue('custevent159') || '';
            var TX7MESES_bto = caso.getValue('custevent160') || '';
            var RESPONSABLE7MESES_bto = caso.getValue('custevent163') || '';
            // Revisión de 8 Meses
            var REVISION_8_MESES_bto = caso.getText('custevent823') || '';
            var NOVENA_NOTA_MEDICA_bto = caso.getValue('custevent826') || '';
            var TX8MESES_bto = caso.getValue('custevent835') || '';
            var RESPONSABLE8MESES_bto = caso.getValue('custevent830') || '';
            // Revisión de 9 Meses
            var REVISION_9_MESES_bto = caso.getText('custevent164') || '';
            var DECIMA_NOTA_MEDICA_bto = caso.getValue('custevent165') || '';
            var TX9MESES_bto = caso.getValue('custevent166') || '';
            var RESPONSABLE9MESES_bto = caso.getValue('custevent167') || '';
            // Revisión de 10 Meses
            var REVISION_10_MESES_bto = caso.getText('custevent824') || '';
            var DECIMOPRIMERA_NOTA_MEDICA_bto = caso.getValue('custevent827') || '';
            var TX10MESES_bto = caso.getValue('custevent834') || '';
            var RESPONSABLE10MESES_bto = caso.getValue('custevent831') || '';
            // Revisión de 11 Meses
            var REVISION_11_MESES_bto = caso.getText('custevent825') || '';
            var DECIMOSEGUNDA_NOTA_MEDICA_bto = caso.getValue('custevent828') || '';
            var TX11MESES_bto = caso.getValue('custevent832') || '';
            var RESPONSABLE11MESES_bto = caso.getValue('custevent838') || '';
            // Revisión de 12 Meses
            var REVISION_12_MESES_bto = caso.getText('custevent168') || '';
            var DECIMOTERCERA_NOTA_MEDICA_bto = caso.getValue('custevent169') || '';
            var TX12MESES_bto = caso.getValue('custevent170') || '';
            var RESPONSABLE12MESES_bto = caso.getValue('custevent171') || '';
            // Revisión de 13 Meses
            var REVISION_13_MESES_bto = caso.getText('custevent836') || '';
            var DECIMOCUARTA_NOTA_MEDICA_bto = caso.getValue('custevent829') || '';
            var TX13MESES_bto = caso.getValue('custevent833') || '';
            var RESPONSABLE13MESES_bto = caso.getValue('custevent837') || '';
            // Revisión de 14 Meses
            var REVISION_14_MESES_bto = caso.getText('custevent172') || '';
            var DECIMOQUINTA_NOTA_MEDICA_bto = caso.getValue('custevent173') || '';
            var TX14MESES_bto = caso.getValue('custevent174') || '';
            var RESPONSABLE14MESES_bto = caso.getValue('custevent175') || '';

            var encabezadoRevisiones = '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center"><b>REVISIONES EFECTUADAS</b></p>' +
                '<table style="width:100%;font-size:11px; font-family:Aria, sans-serif;">' +
                '<tr>' +
                '<td>' +
                '<br />' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<table border="1px" width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="3%"  background-color="#346094" >' +
                '</td>' +
                '<td width="19%" background-color="#346094" >' +
                '</td>' +
                '<td width="12%" background-color="#346094" color="#FFFFFF">' +
                '<b>Fecha</b>' +
                '</td>' +
                '<td width="33%" background-color="#346094" color="#FFFFFF">' +
                '<b>Notas Médicas</b>' +
                '</td>' +
                '<td width="33%" background-color="#346094" color="#FFFFFF" >' +
                '<b>Tratamiento</b>' +
                '</td>' +
                '</tr>';

            var rev24 = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%"  valign="top">' + checado(REVISION_DE_24_HORAS_bto) + '</td>' +
                '<td width="19%" >24 Horas</td>' +
                '<td width="11%" >' + REVISION_DE_24_HORAS_bto + '</td>' +
                '<td width="34%" ><p><u>' + LAVADO_24HR_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%" >' + TX24H_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2" >Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE24H_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev10d = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_10_DIAS_bto) + '</td>' +
                '<td width="19%">10 Días</td>' +
                '<td width="11%">' + REVISION_10_DIAS_bto + '</td>' +
                '<td width="34%"><p><u>' + PRIMERA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX10DIAS_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE10DIAS_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev1mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_1_MES_bto) + '</td>' +
                '<td width="19%" >1 Mes</td>' +
                '<td width="11%">' + REVISION_1_MES_bto + '</td>' +
                '<td width="34%"><p><u>' + SEGUNDA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX1MES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE1MES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev2mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_2_MESES_bto) + '</td>' +
                '<td width="19%">2 Meses</td>' +
                '<td width="11%">' + REVISION_2_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + TERCERA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX2MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE2MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev3mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_3_MESES_bto) + '</td>' +
                '<td width="19%" >3 Meses</td>' +
                '<td width="11%">' + REVISION_3_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + CUARTA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX3MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE3MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev4mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_4_MESES_bto) + '</td>' +
                '<td width="19%">4 Meses</td>' +
                '<td width="11%">' + REVISION_4_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + QUINTA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX4MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE4MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev5mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_5_MESES_bto) + '</td>' +
                '<td width="19%" >5 Meses</td>' +
                '<td width="11%">' + REVISION_5_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + SEXTA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX5MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE5MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev6mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_6_MESES_bto) + '</td>' +
                '<td width="19%">6 Meses</td>' +
                '<td width="11%">' + REVISION_6_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + SEPTIMA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX6MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE6MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev7mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_7_MESES_bto) + '</td>' +
                '<td width="19%">7 Meses</td>' +
                '<td width="11%">' + REVISION_7_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + OCTAVA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX7MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE7MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev8mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_8_MESES_bto) + '</td>' +
                '<td width="19%">8 Meses</td>' +
                '<td width="11%">' + REVISION_8_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + NOVENA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX8MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE8MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev9mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_9_MESES_bto) + '</td>' +
                '<td width="19%">9 Meses</td>' +
                '<td width="11%">' + REVISION_9_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + DECIMA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX9MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE9MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev10mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_10_MESES_bto) + '</td>' +
                '<td width="19%">10 Meses</td>' +
                '<td width="11%">' + REVISION_10_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + DECIMOPRIMERA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX10MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE10MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev11mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_11_MESES_bto) + '</td>' +
                '<td width="19%">11 Meses</td>' +
                '<td width="11%">' + REVISION_11_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + DECIMOSEGUNDA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX11MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE11MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev12mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_12_MESES_bto) + '</td> ' +
                '<td width="19%">12 Meses</td>' +
                '<td width="11%">' + REVISION_12_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + DECIMOTERCERA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX12MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE12MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev13mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_13_MESES_bto) + '</td>' +
                '<td width="19%">13 Meses</td>' +
                '<td width="11%">' + REVISION_13_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + DECIMOCUARTA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX13MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE13MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var rev14mes = '<td colspan="5">' +
                '<table width="100%" style="font-family:Aria, sans-serif;font-size:11px;table-layout:fixed;">' +
                '<tr>' +
                '<td width="2%" valign="top">' + checado(REVISION_14_MESES_bto) + '</td>' +
                '<td width="19%">14 Meses</td>' +
                '<td width="11%">' + REVISION_14_MESES_bto + '</td>' +
                '<td width="34%"><p><u>' + DECIMOQUINTA_NOTA_MEDICA_bto + '</u></p></td>' +
                '<td width="34%">' + TX14MESES_bto + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Nombre del Responsable: </td>' +
                '<td colspan="3" style="border-bottom:2px solid #000000;">' + RESPONSABLE14MESES_bto + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>';

            var array_Revisiones_text = [REVISION_DE_24_HORAS_bto, REVISION_10_DIAS_bto, REVISION_1_MES_bto, REVISION_2_MESES_bto, REVISION_3_MESES_bto, REVISION_4_MESES_bto, REVISION_5_MESES_bto, REVISION_6_MESES_bto, REVISION_7_MESES_bto, REVISION_8_MESES_bto, REVISION_9_MESES_bto, REVISION_10_MESES_bto, REVISION_11_MESES_bto, REVISION_12_MESES_bto, REVISION_13_MESES_bto, REVISION_14_MESES_bto];
            var array_Revisiones_html = [rev24, rev10d, rev1mes, rev2mes, rev3mes, rev4mes, rev5mes, rev6mes, rev7mes, rev8mes, rev9mes, rev10mes, rev11mes, rev12mes, rev13mes, rev14mes];
            var array_Revisiones_validador = [];
            var revisiones_revisionesEfectuadas = '';
            var tablaVacia = 0;
            for (var i = 0; i < array_Revisiones_text.length; i++) {
                if (array_Revisiones_text[i] != '') {
                    array_Revisiones_validador.push(i);
                    tablaVacia++;
                }
            }

            if (tablaVacia > 0) {
                var contadorIndependiente = 0;
                var contador_Revisiones_validador = array_Revisiones_validador.length;
                for (var i = 0; i < contador_Revisiones_validador; i++) {
                    var parImpar = ((contadorIndependiente + 1) % 2) ? '<tr>' : '<tr style="background-color: #cadcff">';
                    revisiones_revisionesEfectuadas += parImpar;
                    revisiones_revisionesEfectuadas += array_Revisiones_html[array_Revisiones_validador[i]];
                    if ((i == 3 && contador_Revisiones_validador > 4) || (i == 7 && contador_Revisiones_validador > 8) || (i == 11 && contador_Revisiones_validador > 12) || (i == 15 && contador_Revisiones_validador > 16)) {
                        revisiones_revisionesEfectuadas += "</table>";
                        revisiones_revisionesEfectuadas += saltoPagina(encabezados_fichaIdentificacion);
                        revisiones_revisionesEfectuadas += encabezadoRevisiones;
                    }
                    if (contador_Revisiones_validador == 1) {
                        revisiones_revisionesEfectuadas += "</table>";
                    }
                    if ((i + 1) == contador_Revisiones_validador && contador_Revisiones_validador > 1 && contador_Revisiones_validador <= 3) {
                        revisiones_revisionesEfectuadas += "</table>";
                    }
                    if ((i + 1) == contador_Revisiones_validador && contador_Revisiones_validador > 3 && contador_Revisiones_validador <= 7) {
                        revisiones_revisionesEfectuadas += "</table>";
                    }
                    if ((i + 1) == contador_Revisiones_validador && contador_Revisiones_validador > 7 && contador_Revisiones_validador <= 11) {
                        revisiones_revisionesEfectuadas += "</table>";
                    }
                    if ((i + 1) == contador_Revisiones_validador && contador_Revisiones_validador > 11 && contador_Revisiones_validador <= 15) {
                        revisiones_revisionesEfectuadas += "</table>";
                    }
                    if ((i + 1) == contador_Revisiones_validador && contador_Revisiones_validador == 16) {
                        revisiones_revisionesEfectuadas += "</table>";
                    }
                    contadorIndependiente++;
                }
            }

            //log.debug('Revisiones XML', revisiones_revisionesEfectuadas);

            // RECETA
            // VARIABLES PARA PDF DE RECETA PACIENTE
            var medS = caso.getValue({ fieldId: 'custevent2' });
            var form = caso.getValue({ fieldId: 'customform' });
            var medicoReceta = caso.getValue({ fieldId: 'custevent202' }) || null;
            var medicoRespReceta = caso.getText({ fieldId: 'custevent202' }) || null;
            var med1 = caso.getValue({ fieldId: 'custevent177' });
            var med2 = caso.getValue({ fieldId: 'custevent178' });
            var med3 = caso.getText({ fieldId: 'custevent179' }) || null;
            var ind1 = caso.getValue({ fieldId: 'custevent180' }) || null;
            var ind2 = caso.getValue({ fieldId: 'custevent181' }) || null;
            var ind3 = caso.getValue({ fieldId: 'custevent182' }) || null;
            var ind5 = caso.getValue({ fieldId: 'custevent187' }) || null;
            var ind6 = caso.getValue({ fieldId: 'custevent188' }) || null;
            var ind7 = caso.getValue({ fieldId: 'custevent189' }) || null;
            var ind8 = caso.getValue({ fieldId: 'custevent190' }) || null;
            ind1 = (ind1 != null) ? ': ' + ind1 : '';
            ind2 = (ind2 != null) ? ': ' + ind2 : '';
            ind3 = (ind3 != null) ? ': ' + ind3 : '';
            var shampooCaidaCheck = caso.getValue({ fieldId: 'custevent183' });
            var shampooGrasaCheck = caso.getValue({ fieldId: 'custevent184' });
            var aguaGlaciarCheck = caso.getValue({ fieldId: 'custevent185' });
            var argininaCheck = caso.getValue({ fieldId: 'custevent186' });
            var tipo = caso.getValue({ fieldId: 'custevent203' }) || false;
            var comentarios = null;
            if (tipo == 3) {
                comentarios = caso.getText({ fieldId: 'custevent196' });
            } else if (tipo == 1) {
                comentarios = caso.getText({ fieldId: 'custevent204' });
            } else {
                comentarios = null;
            }

            /*          var enfermeria_MedicoResponsable = record.load({ type: 'employee', id: medicoResponsableProcedimiento});
                        var enfermeria_Enfermero1Responsable = record.load({ type: 'employee', id: r});
                        var enfermeria_Enfermero2Responsable = record.load({ type: 'employee', id: r});
                        var enfermeria_EnfermeroExtraccion = record.load({ type: 'employee', id: r});
                        var enfermeria_EnfermeroImplantacion = record.load({ type: 'employee', id: r});
                        var cedulaMedicoResponsable = enfermeria_MedicoResponsable.getValue({ fieldId: 'custentity392'});
                        var cedulaEnfermero1Responsable = "";
                        var cedulaEnfermero2Responsable = "";
                        var cedulaEnfermeroExtraccion = "";
                        var cedulaEnfermeroImplantacion = "";
            */
            //log.debug('cedula Medico', findCedulaEmployee(enfermero));

            //caso.save();
            var fecha = new Date();
            fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();


            // TAB REVISIONES 

            // ZONA DE ENCABEZADOS
            // FICHA DE IDENTIFICACION
            

            // FICHA DE IDENTIFICACION PARA RECETA
            // CEDULAS MEDICOS Y ENFERMEROS
            if (medicoReceta != null) {
                var recetaDoctor = record.load({ type: 'employee', id: medicoReceta });
                if (recetaDoctor != null) {
                    var doctor = recetaDoctor.getValue({ fieldId: 'entityid' }) || null;
                    var cedula = recetaDoctor.getValue({ fieldId: 'custentity392' }) || "";
                    var inst = recetaDoctor.getValue({ fieldId: 'custentity393' }) || "";

                    encabezados_recetasIdentificacion = '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                        '<tr><td><b>NOMBRE DEL PACIENTE: </b>' + nombreCliente + '</td><td align=\"left\"><b>DR.: </b>' + doctor + '</td></tr>' +
                        '<tr><td><b>EDAD: </b>' + edadCliente + '</td><td align=\"left\"><b>CÉDULA: </b>' + cedula + '</td></tr>' +
                        '<tr><td><b>FECHA DE EMISIÓN: </b>' + fechaCaso + '</td><td align=\"left\"><b>INSTITUCIÓN: </b>' + inst + '</td></tr>' +
                        '</table>';
                }
            } else {
                //console.log('No se ha registrado el medico de la receta!!');
            }


            // FORMATO PDF EXPEDIENTE INJERTO
            // COMPLETO
            // Encabezado XML
            var encabezados_fichaIdentificacion = '<table style="width:75%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color:#346094;"> FICHA DE IDENTIFICACIÓN:</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;">' +
                '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + numeroExpediente + '</td><td><b>GÉNERO: </b> ' + sexoCliente + '</td></tr>' +
                '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
                '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO:</b>' + telefonoCliente + '</td></tr>' +
                '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
                '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + xmlMod.escape({ xmlText: direccionCliente })  + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
                '<pdf>\n' +
                '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
                //  +
                // '<br /><br /><br /><br /><br />';
                xml += encabezados_fichaIdentificacion;

            //IMAGENES DISEÑO SALA PROCEDIMIENTO
            xml += '<p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">DISEÑO EN SALA DE PROCEDIMIENTO</p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td colspan="2"><b>NOMBRE DEL PACIENTE:</b> ' + nombreCliente + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" width="50%"><img src="' + diseno_Img1_url + '" width="200" height="200" /></td>' +
                '<td align="center" width="50%"><img src="' + diseno_Img2_url + '" width="200" height="200" /></td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" width="50%"><img src="' + diseno_Img3_url + '" width="200" height="200" /></td>' +
                '<td align="center" width="50%"><img src="' + diseno_Img4_url + '" width="200" height="200" /></td>' +
                '</tr>' +
                '<tr>' +
                '<td><p style="align:center"><img src="' + injerto_FirmaCliente_base64 + '" width="100" height="100" /></p></td>' +
                '<td><p style="align:center"><img src="' + injerto_FirmaMedico_base64 + '" width="100" height="100" /></p></td>' +
                '</tr>' +
                '<tr>' +
                '<td><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />FIRMA DEL PACIENTE</b></p></td>' +
                '<td><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />FIRMA DEL MÉDICO</b></p></td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina(encabezados_fichaIdentificacion);

            //IMAGENES PROCEDIMIENTO ANTES Y DESPUES
            xml += '<p style="width:45%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">CASO DE PROCEDIMIENTO</p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td align="center"><b>FOTOS ANTES DEL INJERTO</b><img src="' + diseno_Img1_urlIMG + '" width="200" height="190" /></td>' +
                '<td align="center"><b>FOTOS DESPUÉS DEL INJERTO</b><img src="' + diseno_Img2_urlIMG + '" width="200" height="190" /></td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center"><b>FOTOS ANTES DE FRENTE</b><img src="' + diseno_Img3_urlIMG + '" width="200" height="190" /></td>' +
                '<td align="center"><b>FOTOS ANTES DE FRENTE 2</b><img src="' + diseno_Img4_urlIMG + '" width="200" height="190" /></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2"><p style="align:center"><img src="' + injerto_FirmaCliente_base64 + '" width="100" height="100" /></p></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2"><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>' + nombreCliente + '</b></p></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2"><p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />FIRMA DEL PACIENTE</b></p></td>' +
                '</tr>' +
                '</table>';

            if (medicoReceta != null && comentarios != null) {
                xml += saltoPagina(encabezados_fichaIdentificacion);

                // RECETAS
                xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>RECETA PACIENTE</b></p>';
                xml += encabezados_recetasIdentificacion;
                xml += '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">';
                if (form != '14') {
                    xml += '<tr><td align="left"><b>Especialidad:</b></td></tr>';
                } else {
                    xml += '<tr><td align="left"></td></tr>';
                }
                //xml += '<tr><td></td>';
                if (form != '14') {
                    xml += '<tr><td align="left"><b>Cédula ESP.:</b></td></tr>';
                } else {
                    xml += '<tr><td align="left"></td></tr>';
                }
                xml += '</table>';

                xml += '<table style="width:100%;font-size:11px; font-family:Aria, sans-serif">' +
                    '<tr><td style="background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;"><b>MEDICAMENTOS</b></td></tr>';

                if (med1 == '1') {
                    xml += '<tr><td><b>CLINDAMICINA</b> ' + ind1 + '</td></tr>';
                } else if (med1 == '2') {
                    xml += '<tr><td><b>TYLEX</b> ' + ind1 + '</td></tr>';
                } else if (med1 == '3') {
                    xml += '<tr><td><b>OMEPRAZOL</b> ' + ind1 + '</td></tr>';
                } else if (med1 == '4') {
                    xml += '<tr><td><b>CEFUROXIMA</b> ' + ind1 + '</td></tr>';
                } else if (med1 == '5') {
                    xml += '<tr><td><b>ALIN</b> ' + ind1 + '</td></tr>';
                } else if (med1 == '6') {
                    xml += '<tr><td><b>AZITROCIN</b> ' + ind1 + '</td></tr>';
                }
                if (med2 == '1') {
                    xml += '<tr><td><b>CLINDAMICINA</b> ' + ind2 + '</td></tr>';
                } else if (med2 == '2') {
                    xml += '<tr><td><b>TYLEX</b> ' + ind2 + '</td></tr>';
                } else if (med2 == '3') {
                    xml += '<tr><td><b>OMEPRAZOL</b> ' + ind2 + '</td></tr>';
                } else if (med2 == '4') {
                    xml += '<tr><td><b>CEFUROXIMA</b> ' + ind2 + '</td></tr>';
                } else if (med2 == '5') {
                    xml += '<tr><td><b>ALIN</b> ' + ind2 + '</td></tr>';
                } else if (med2 == '6') {
                    xml += '<tr><td><b>AZITROCIN</b> ' + ind2 + '</td></tr>';
                }
                if (med3 != null) {
                    xml += '<tr><td><b>' + med3 + '</b> ' + ind3 + '</td></tr>';
                }
                xml += '</table>';


                xml += '<table style="width:100%;font-size:11px; font-family:Aria, sans-serif">' +
                    '<tr><td colspan="2" style="background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;"><b>TRATAMIENTOS</b></td></tr>' +
                    '<tr>';

                if (shampooCaidaCheck == true) {
                    xml += '<td><table><tr><td><b><span style="font-size:10px;">SHAMPOO CONTROL CAÍDA</span></b></td></tr><tr><td style="width:50%;">' + ind5 + '</td></tr></table></td>';
                }
                if (shampooGrasaCheck == true) {
                    xml += '<td><table><tr><td><b><span style="font-size:10px;">SHAMPOO CONTROL GRASA</span></b></td></tr><tr><td style="width:50%;">' + ind6 + '</td></tr></table></td>';
                }
                xml += '</tr><tr>';
                if (aguaGlaciarCheck == true) {
                    xml += '<td><table><tr><td><b><span style="font-size:10px;">AGUA GLACIAR</span></b></td></tr><tr><td style="width:50%;">' + ind7 + '</td></tr></table></td>';
                }
                if (argininaCheck == true) {
                    xml += '<td><table><tr><td><b><span style="font-size:10px;">ARGININA</span></b></td></tr><tr><td style="width:50%;">' + ind8 + '</td></tr></table></td>';
                }
                xml += '</tr></table>';

                xml += '<table style="width:100%;font-size:11px; font-family:Aria, sans-serif">' +
                    '<tr><td style="background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;"><b>INDICACIONES DE CUIDADO</b></td></tr>';
                if (comentarios != false) {
                    var porciones = comentarios.split('•');
                    var i;
                    for (i = 1; i < porciones.length; i++) {
                        text = porciones[i];
                        xml += '<tr><td>•' + text + '</td></tr>';
                    }
                }
                xml += '</table>' +
                    '<br /><br /><br />' +
                    '<p align="center">______________________</p>' +
                    '<p style="font-family:Aria, sans-serif" font-size="15px" align="center"><b>Firma</b></p>';// +
                //'<p style="font-family:Aria, sans-serif" font-size="10px"><b>' + resp + '<br />' + resp1 + '</b></p>';

            } else {
                xml += saltoPagina(encabezados_fichaIdentificacion);

                // RECETAS
                xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>RECETA PACIENTE</b></p>' +
                    '<p style="color:#346094"><h4><b>Para poder generar la receta falta capturar los siguientes campos:</b></h4>' +
                    '<ul>' +
                    '<li style="font-size:18px;"><em>Médico Responsable de Receta</em></li>' +
                    '<li style="font-size:18px;"><em>Tipo de Receta</em></li>' +
                    '</ul>' +
                    '</p>';
            }

            xml += saltoPagina(encabezados_fichaIdentificacion);

            //HOJA DE ENFERMERIA
            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA</b></p>';
            xml += encabezados_fichaIdentificacion;
            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="37%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 12px;font-weight:bold;color:#346094">2. ESTADO DE CONCIENCIA Y FÍSICO</td>' +
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
                '<td>Hora de terminó: <b>' + he_anzd_hTermino + '</b></td>' +
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
                '<td>Hora de terminó: <b>' + he_anzi_hTermino + '</b></td>' +
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
                '<td colspan="2">Médico responsable: <b>' + medicoResponsableProcedimiento[0] + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td colspan="2">Enfermero responsable:  <b>' + enfermeroResponsableProcedimiento[0] + '</b></td>' +
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
                '<td width="50%">Hora de terminó: <b>' + he_extTermino + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Corte de unidades foliculares: <b>' + ' ' + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de Inicio: <b>' + he_corInicio + '</b></td>' +
                '<td width="50%">Hora de terminó: <b>' + he_corTermino + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Responsable de Implantación: <b>' + hc_enfermeroImplantacion + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de Inicio: <b>' + he_impInicio + '</b></td>' +
                '<td width="50%">Hora de terminó: <b>' + he_impTermino + '</b></td>' +
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
                '</table>';

            xml += saltoPagina(encabezados_fichaIdentificacion);

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
                '<td width="100%" style="background-color:#FFFFFF;">' + xmlMod.escape({ xmlText: he_observaciones }) + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina(encabezados_fichaIdentificacion);

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
                '<td><b>' + he_anzd_hInicio + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>TERMINÓ EXTRACCIÓN</td>' +
                '<td><b>' + he_anzd_hTermino + '</b></td>' +
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
                '<td><b>' + he_anzi_hInicio + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="48%">TERMINÓ IMPLANTACIÓN</td>' +
                '<td><b>' + he_anzi_hTermino + '</b></td>' +
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
                '<td width="40%" style="font-size: 12px;font-weight:bold;color:#346094;">EQUIPO MÉDICO:</td>' +
                '<td width="1%"></td>' +
                '<td width="5%"></td>' +
                '<td width="54%"></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span><b>' + medicoResponsableProcedimiento + '</b></td>' +
                '<td></td>' +
                '<td>Extrajo:</td>' +
                '<td style="border-bottom:1px solid #346094;">' + medicoResponsableProcedimiento + ' ' + hc_enfermeroExtraccion_equipoMedico + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span><b>' + enfermeroA + '</b></td>' +
                '<td></td>' +
                '<td>Implantó:</td>' +
                '<td style="border-bottom:1px solid #346094;">' + medicoResponsableProcedimiento + ' ' + hc_enfermeroImplantacion_equipoMedico + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><span style="color: #FFFFFF">|</span><b>' + enfermeroB + '</b></td>' +
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

            xml += saltoPagina(encabezados_fichaIdentificacion);

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
                '<tr style="background-color: #cadcff">' +
                '<td align="center">TOTALES</td>' +
                '<td align="center"></td>' +
                '<td align="center">' + totalViables + '</td>' +
                '<td align="center">' + totalNoViables + '</td>' +
                '<td align="center">' + totalConteoTotales + '</td>' +
                '<td align="center"></td>' +
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

            xml += saltoPagina(encabezados_fichaIdentificacion);

            xml += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>PROCEDIMIENTO SEGURO</b><br /><span style="font-size:11px; ">CHECKLIST Y VERIFICACIÓN DE SITIO, PACIENTE Y PROCEDIMIENTO</span></p>';

            xml += encabezados_fichaIdentificacion;

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
                '<br />' + ps_realizoMarcaje +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>VALORACIÓN PRE OPERATORIA</b>' +
                '<br />' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>SE COMPLETO EL CONTROL DE SEGURIDAD EN ANESTESIA</b>' +
                '<br />' + ps_controlAnestesia +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>REFIERE ALERGIAS</b>' +
                '<br />' +
                '<br />CUALES' +
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
                '<br />SI' +
                '<br />NO PROCEDE' +
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
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + enfermeroA + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr height="40px">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>ENFERMERA(O) B:</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + enfermeroB + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr height="40px" style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>OTROS:</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 12px"><b>' + '' + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina(encabezados_fichaIdentificacion);

            // HOJA DE PREVENCIÓN Y RIESGO DE CAÍDAS
            xml += '<p style="width:55%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>PREVENCIÓN Y RIESGO DE CAÍDAS</b></p>' +
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
                '<td style="vertical-align:top;">' +
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

            xml += saltoPagina(encabezados_fichaIdentificacion);


            // HOJA POST PROCEDIMIENTO
            xml += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA POST PROCEDIMIENTO</b><br />MICRO INJERTO CAPILAR</p>' +
                '<br />' +
                '<table style="width:100%;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color:#346094;"> 1. DETALLES DEL PROCEDIMIENTO.</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">PROCEDIMIENTO REALIZADO: <b>' + fechaCaso + '</b></td>' +
                '<td width="50%" style="border-left:1px solid #346094;"></td>' +
                '</tr>' +
                '<tr>' +
                '<td align="left">DIAGNÓSTICO POST-PROCEDIMIENTO: <b> ' + hPP_diagnosticoPP + ' </b></td>' +
                '<td style="border-left:1px solid #346094;">ZONA IMPLANTADA: <b>' + hPP_zonaImplantada + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>ANESTÉSICO Y TIPO DE ANESTESIA: <b>' + hPP_tipoAnestesia + '</b></td>' +
                '<td style="border-left:1px solid #346094;"></td>' +
                '</tr>' +
                '<tr>' +
                '<td>INICIO DE EXTRACCIÓN: <b>' + he_extInicio + '</b></td>' +
                '<td style="border-left:1px solid #346094;">TERMINO DE EXTRACCIÓN: <b>' + he_extTermino + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>INICIO DE IMPLANTACIÓN: <b>' + he_impInicio + '</b></td>' +
                '<td style="border-left:1px solid #346094;">TERMINO DE IMPLANTACIÓN: <b>' + he_impTermino + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>FOLÍCULOS: <b>' + totalConteoFoliculos + '</b></td>' +
                '<td style="border-left:1px solid #346094;">UNIDADES FOLICULARES: <b>' + totalConteoUnidadFolicular + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>MÉDICO RESPONSABLE: <b>' + medicoResponsableProcedimiento[0] + '</b></td>' +
                '<td style="border-left:1px solid #346094;">CÉDULA PROFESIONAL: ' + medicoResponsableProcedimiento_cedula + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>EQUIPO DE ENFERMERÍA: <b>' + enfermeroA + ((enfermeroB != '') ? ' y ' + enfermeroB : '') + '</b></td>' +
                '<td style="border-left:1px solid #346094;">CÉDULA PROFESIONAL: ' + enfermeroA_cedula + ((enfermeroB_cedula != '') ? ' y ' + enfermeroB_cedula : '') + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>OTROS: <b>' + hc_enfermeroExtraccion + ((hc_enfermeroImplantacion != '') ? ' y ' + hc_enfermeroImplantacion : '') + '</b></td>' +
                '<td style="border-left:1px solid #346094;">CÉDULA PROFESIONAL: ' + hc_enfermeroExtraccion_cedula + ((hc_enfermeroImplantacion_cedula != '') ? ' y ' + hc_enfermeroImplantacion_cedula : '') + '</td>' +
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

            xml += saltoPagina(encabezados_fichaIdentificacion);

            // HOJA NOTA EGRESO Y ALTA
            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA EGRESO Y ALTA</b></p><br />' +
                '<table style="width:100%;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td width="25%" style="border-bottom: 1px solid #346094;">FECHA Y HORA DE EGRESO</td>' +
                '<td width="75%" style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_fechaEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">SIGNOS VITALES</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>T/A Post: ' + he_TApost + ' F.C. Post: ' + he_FCpost + '</b></td>' +
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
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + hNEA_diagnosticoEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">FECHA Y HORA DE PROCEDIMIENTO REALIZADO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + fechaCaso + '</b></td>' +
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
                '<td style="border-left: 1px solid #346094;"><b>' + medicoResponsableProcedimiento + ' ' + medicoResponsableProcedimiento_cedula + '</b></td>' +
                '</tr>' +
                '</table>';

            xml += saltoPagina(encabezados_fichaIdentificacion);

            // CONSENTIMIENTO INFORMADO
            // Formato Colombia
            if (subsidiaria == '10') {

                xml += '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</b></p>' +
                    '<p style="font-size: 12px;color:#000000;font-family:Aria, sans-serif;">NOMBRE DEL PACIENTE: <b>' + nombreCliente + ' </b></p>' +
                    '<p style="font-size: 12px;color:#000000;font-family:Aria, sans-serif;">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Dentro de las normas éticas exigidas al profesional médico en Colombia por la ley 23 de 1981 se encuentra el deber de informar adecuada y oportunamente a todos sus pacientes los riesgos que puedan derivarse del tratamiento que le será practicado, solicitando su consentimiento anticipadamente (artículo 15 y 16). Por tanto, con el presente documento escrito se pretende informar a usted y a su familia acerca del procedimiento que se le practicará, por lo cual solicitamos llene de su puño y letra los espacios en blanco.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + nombreCliente + '</b>, identificado con el documento <b>' + field_documentIdentification + '</b> (Escribir cédula de  ciudadanía, cédula de Extranjería, Pasaporte, etc.) N° <b>' + identificacionCliente + '</b> , confirmo  que de manera voluntaria he decidido realizar un injerto de cabello en Kaloni Colombia, S.A.S.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Confirmo que he sido informado de los riesgos del procedimiento que a continuación se describen y he realizado las preguntas necesarias sobre cada uno de ellos (Marcar con una ' + checado(true) + 'para "SI" y con una ' + checado(false) + 'para "NO")</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><ol>' +
                    '<li>Dolor de cabeza o sensación de picadas u hormigueo en las zonas trabajadas ( ' + checado(values_booleans_questionsCheckbox[0]) + ')</li>' +
                    '<li>Enrojecimiento e Irritación de las zonas trabajadas ( ' + checado(values_booleans_questionsCheckbox[1]) + ')</li>' +
                    '<li>Hinchazón De la Cara o de las zonas trabajadas  ( ' + checado(values_booleans_questionsCheckbox[2]) + ')</li>' +
                    '<li>Infecciones ( ' + checado(values_booleans_questionsCheckbox[3]) + ')</li>' +
                    '<li>Sangrado, Formación de Hematomas  ( ' + checado(values_booleans_questionsCheckbox[4]) + ')</li>' +
                    '<li>Cicatrización anormal  ( ' + checado(values_booleans_questionsCheckbox[5]) + ')</li>' +
                    '<li>Alteración de la pigmentación de la piel ( ' + checado(values_booleans_questionsCheckbox[6]) + ')</li>' +
                    '<li>Lesión de Paquetes Neurovasculares ( ' + checado(values_booleans_questionsCheckbox[7]) + ')</li>' +
                    '<li>Pérdida de Densidad Capilar en la zona donadora ( ' + checado(values_booleans_questionsCheckbox[8]) + ')</li>' +
                    '<li>Limitantes del procedimiento en la obtención de resultados y expectativas ( ' + checado(values_booleans_questionsCheckbox[9]) + ')</li>' +
                    '</ol></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Confirmo que he sido informado que el resultado del procedimiento de injerto de cabello no necesariamente alcanzará siempre los resultados esperados y eso dependerá de la idiosincrasia de cada persona y de eventos fortuitos que se pueden presentar.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido informado claramente de las recomendaciones que debo seguir después del procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para que los implantes logren el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</p>' +
                    '<p style="align:center"><img src="' + consentimientoInjerto_base64Cliente + '" width="100" height="100" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + nombreCliente + '</b></p>';

                xml += saltoPagina(encabezados_fichaIdentificacion);

                xml += '<p style="font-family:Aria, sans-serif; font-size:12px;">Durante el procedimiento se me administrará anestesia local y otros medicamentos; para lo cual he autorizado al médico que realiza el procedimiento; se me informó que los anestésicos y algunos medicamentos  pueden presentar reacciones tales como: (Marcar con una ' + checado(true) + 'para "SI" y con una ' + checado(false) + 'para "NO")</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><ol>' +
                    '<li>Enrojecimiento e Irritación ( ' + checado(values_booleans_questionsCheckbox[10]) + ')</li>' +
                    '<li>Ardor en el momento de aplicación ( ' + checado(values_booleans_questionsCheckbox[11]) + ')</li>' +
                    '<li>Hinchazón de la Cara y las zonas trabajadas ( ' + checado(values_booleans_questionsCheckbox[12]) + ')</li>' +
                    '<li>Mareo y Náuseas ( ' + checado(values_booleans_questionsCheckbox[13]) + ')</li>' +
                    '<li>Dolor de Cabeza ( ' + checado(values_booleans_questionsCheckbox[14]) + ')</li>' +
                    '<li>Malestar general ( ' + checado(values_booleans_questionsCheckbox[15]) + ')</li>' +
                    '<li>Reacción Alérgica y Anafilaxia ( ' + checado(values_booleans_questionsCheckbox[16]) + ')</li>' +
                    '</ol></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Se me informó cuales son los beneficios que puedo obtener al realizarme este procedimiento de injerto de cabellos:</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Recuperación de un Porcentaje de densidad en la zona a implantar (Dependiente de la cantidad de cabellos obtenida, el área a trabajar, características de la piel del paciente y cuidados de este posteriores al procedimiento).</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">También manifiesto que se me han informado las alternativas al procedimiento de injerto de cabello que me puede ofrecer el médico tratante.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) de la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad en presencia de mis testigos y/o familiares sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento de implante de cabello.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido también informado(a) de que mis datos personales serán protegidos e incluidos en un expediente clínico, que deberá estar sometido a las garantías de la legislación aplicable. Asimismo, autorizo la toma de fotografías de la zona con fines clínicos.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Se me informó cuales son los beneficios que puedo obtener al realizarme este procedimiento de injerto de cabellos:</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Se me informó cuales son los beneficios que puedo obtener al realizarme este procedimiento de injerto de cabellos:</p>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + consentimientoInjerto_base64Cliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + nombreCliente + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + consentimientoInjerto_base64Medico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                    '</table>';

            } else {

                xml += '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</b></p>' +
                    '<p style="font-size: 12px;color:#000000;font-family:Aria, sans-serif;">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al procedimiento de injerto de cabello en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b>  Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Sangrado.</b> Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Infección.</b> A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente en la piel cabelluda tanto de zona donante como en zona a implantar. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Asimetría.</b> La cara humana es normalmente asimétrica por lo que puede haber variaciones entre un lado y otro tras un procedimiento de trasplante capilar.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reacciones alérgicas.</b>  Durante el procedimiento es necesaria la administración de ciertos medicamentos para poder ejecutar el procedimiento como es en la anestesia que se inyecta localmente en el área a tratar, también se requieren de analgésicos y otros medicamentos que son necesarios para mantener estable al paciente, sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados fármacos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Secuelas, signos y síntomas indeseables.</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfactorios.</b> El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos y de la dermis. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p>' +
                    '<p style="align:center"><img src="' + consentimientoInjerto_base64Cliente + '" width="100" height="100" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + nombreCliente + '</b></p>';

                xml += saltoPagina(encabezados_fichaIdentificacion);

                xml += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Retraso en la cicatrización.</b> Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> Recuperación y restauración de la densidad capilar en la zona a implantar, solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:medium;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br /></p>' +
                    '<ul style="font-family:Aria, sans-serif; font-size:11px; text-indent: 18px; list-style-type: square;">' +
                    '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img src="' + consentimientoInjerto_base64Cliente + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + nombreCliente + '</b></p></td><td align="center" width="50%"><img src="' + consentimientoInjerto_base64Medico + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br />FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br />' + medicoResponsableProcedimiento + '</b></p></td></tr>' +
                    '<tr><td align="center" width="50%"><img src="' + consentimientoInjerto_base64Testigo1 + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL TESTIGO 1<br /></b></p></td><td align="center" width="50%"><img src="' + consentimientoInjerto_base64Testigo2 + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL TESTIGO 2<br /></b></p></td></tr>' +
                    '</table>';
            }

            xml += saltoPagina(encabezados_fichaIdentificacion);

            if (tablaVacia > 0) {
                xml += encabezadoRevisiones;
                xml += revisiones_revisionesEfectuadas;
            } else {
                xml += encabezadoRevisiones;
                xml += "</table>";
            }

            if (statusFirmaTestimonial == true) {
                xml += saltoPagina(encabezados_fichaIdentificacion);
                xml += '<p style="width:70%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AUTORIZACIÓN DE USO DE IMAGEN EN FOTOGRAFÍA Y/O VIDEO PARA PUBLICACIÓN Y/O DIFUSIÓN</b></p>' +
                    '<br /><p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + nombreCliente + '</b>  (el “Paciente”), autorizo a Kaloni Holding Group, S.C., y sus afiliados (colectivamente "Kaloni") a usar secuencias de video y/o fotografías de mí y sus derivados, e incorporar tales videos y fotos en medios y materiales con la finalidad de participar en campañas, promocionales, programas didácticos y en lo general todos los necesarios para la difusión y promoción de la marca KALONI, propiedad de “Kaloni” y sus afiliados.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Autorizo  la  utilización  de  mi  imagen  en  campañas,  promocionales  y  demás  materiales  de apoyo que “Kaloni” considere pertinentes para la difusión y promoción de la marca KALONI que se distribuya en el país o en el extranjero por cualquier medio, ya sea impreso, electrónico, digital o cualquier otro. En cumplimiento a la normativa vigente, “Kaloni” garantiza que ha adoptado las medidas técnicas y organizativas necesarias para mantener el nivel de seguridad requerido en atención a la naturaleza de los datos tratados.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Es mi deseo establecer que esta autorización es voluntaria y gratuita y, por el presente renuncio a cualquier derecho a recibir compensación por tales usos en virtud de la autorización precedente. Por lo anterior me comprometo a no ejercer ninguna acción encaminada a reclamar alguna gratificación, regalía o concepto semejante y expresamente renuncio a aquella acción que pudiera proceder por el uso de la o las fotografías.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">La presente autorización no estará sujeta a temporalidad alguna; sin embargo, en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de Particulares, la autorización será revocable por el “Paciente” en cualquier momento en los terminós contenidos en el Aviso de Privacidad de “Kaloni”.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fechaCaso + ' </b></p><br />' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Atentamente,</p>' +
                    '<p style="align:center"><img src="' + testimonialbase64 + '" width="100" height="100" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />' + nombreCliente + '<br />FIRMA DEL TESTIMONIAL</b></p>';
            }

            xml += '</body></pdf>';
            context.response.renderPdf({ xmlString: xml });

        }

        function getImageBackGround(sucursal) {
            var imageBack = "";
            if (sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28") {
                if (sucursal == '52') {
                    imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
                } else {
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                }
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

        function dates(varDate) {
            var dates = "";
            if (varDate != null && varDate != "") {
                var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                dates = "<img height=\"15px\" width=\"15px\" src=\"" + xmlMod.escape({ xmlText: path }) + "\" />";
            } else {
                var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                dates = "<img height=\"15px\" width=\"15px\" src=\"" + xmlMod.escape({ xmlText: path2 }) + "\"/>";
            }
            return dates;
        }

        /**
        * Function que retorna un string de HTML con estilo para generar un salto de página
        * y además agrega el espacio necesario para inciar la siguiente página en el sitio
        * correcto después del logo de hoja membretada
        */
        function saltoPagina(encabezados_fichaIdentificacion) {
            var saltoPagina = '<div style="page-break-after:always;"></div>';
            saltoPagina += encabezados_fichaIdentificacion;

            // saltoPagina += '<br /><br /><br /><br /><br />';

            return saltoPagina;
        }

        // Retorna el nombre de la Sucursal sin el KHG final
        /** Funcion que crea el archivo .txt por defecto y 
         * devuelve el id asociado a la creacion de este archivo
         * 
         * @param {string} folderParent id del Folder principal de cliente
         */
        function sucursalReal(sucursalText) {
            var sucSinModif = sucursalText;
            var largoSucursal_base = sucursalText.length;
            largoSucursal_menosKHG = largoSucursal_base - 4;

            var validateKHG = sucursalText.slice(largoSucursal_menosKHG, largoSucursal_base);

            if (validateKHG == ' KHG') {
                var sucursalFinal = sucursalText.slice(0, largoSucursal_menosKHG);
                return sucursalFinal;
            } else {
                return sucSinModif;
            }
        }

        /**
         * Funcion que retorna la los años enteros transcurridos entre dos fechas
         * @param {string} fechaAntigua - se ingresa la fecha inicial desde la que se quiere calcular, por ejemplo: una fecha de nacimiento  
         * @param {string} fechaReciente - se ingresa la fecha final relativa al calculo, por ejemplo: la fecha actual
         */
        function calcYearInt(fechaAntigua, fechaReciente) {
            var edad = 0;
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
            edad = Math.floor(calcEdad);

            edad = (isNaN(edad) == true) ? "" : edad;

            return edad;
        }

        /**
         * Funcion para generar una imagen amigable al check y uncheck
         * @param {String or Boolean} checks Parametro que revisa si el valor es verdadero o falso
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
            if (checks != "") {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                //var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 6px;margin-top: px;\" height=\"10px\" width=\"10px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                //check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            }
            if (checks == "") {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                //var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                //check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check = "<img style=\"display:inline;margin-right: 6px;margin-top: px;\" height=\"10px\" width=\"10px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";
            }
            return check;
        }

        function obtenerNombreUno(names) {
            var cadenaNames = String(names);
            var indiceBuscado = cadenaNames.indexOf(',');
            namesFormateado = cadenaNames.substring(0, indiceBuscado);

            return namesFormateado;
        }

        function obtenerNombreDos(names) {
            var cadenaNames = String(names);
            var indiceBuscado = cadenaNames.indexOf(',');
            var largoCadena = cadenaNames.length;
            namesFormateado = cadenaNames.substring(indiceBuscado + 1, largoCadena);

            return namesFormateado;
        }

        /**
        * 
        * @param {string} nameEspecialist Name of professional
        * @param {string} request c = Cedula or i = Institution
        */
        function obtenerCedula(nameEspecialist, request) {
            var cedula = '';
            var institucion = '';

            if (typeof nameEspecialist == 'object') {
                nameEspecialist = toString(nameEspecialist);
                //log.debug('new name',nameEspecialist);
            }

            var clean_nameEspecialist = function (cadena) {
                var chars = {
                    "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
                    "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u",
                    "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
                    "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U"
                };

                var expr = /[áéíóú]/ig;
                res = cadena.replace(expr, function (e) { return chars[e]; });
                //log.debug('tipo res', typeof res);
                //log.debug('res', res);
                return res;
            };

            nameEspecialist = clean_nameEspecialist(nameEspecialist);
            log.debug('clean name', nameEspecialist);
            if ((nameEspecialist != '') && (request === 'c' || request === 'i')) {
                var arrayNameEspecialist = nameEspecialist.split(' ');
                var arraySerchIncorrect = ['Dr.', 'DR.', 'Dra.', 'DRA.', 'Dr', 'DR', 'Dra', 'DRA', 'Enf.', 'ENF.', 'Enf', 'ENF', 'Enfermero', 'Enfermera'];
                log.debug('', arrayNameEspecialist);
                var bandera = false;
                var arr_filters = [];

                for (var i = 0; i < arraySerchIncorrect.length; i++) {
                    if (arraySerchIncorrect[i] === arrayNameEspecialist[0]) {
                        bandera = true;
                    }
                }

                if (bandera == true) {
                    arrayNameEspecialist.shift();
                    name = arrayNameEspecialist;
                } else if (bandera == false) {
                    name = nameEspecialist.split(' ');
                }

                for (var key in name) {
                    if (name[key] != '' || name[key] != null) {
                        var filter = search.createFilter({ name: 'entityid', operator: search.Operator.CONTAINS, values: [name[key]] });
                        arr_filters.push(filter);
                    }
                }

                try {
                    searchEmployee = search.create({
                        type: 'EMPLOYEE', title: 'searchEmployees', id: 'customsearch_mySearch_employees',
                        columns: [{ name: 'entityid' }, { name: 'custentity392' }, { name: 'custentity393' }],
                        filters: arr_filters
                    }).run();

                    var results = searchEmployee.getRange({
                        start: 0,
                        end: 100
                    });

                    var res_stringy = JSON.stringify(results);
                    var res_parse = JSON.parse(res_stringy);
                    log.debug('Res object', res_parse);

                    for (var keyRes in res_parse) {
                        if (res_parse[keyRes].values.custentity392 != '') {
                            cedula = res_parse[keyRes].values.custentity392;
                        }
                        if (res_parse[keyRes].values.custentity393 != '') {
                            institucion = res_parse[keyRes].values.custentity393;
                        }
                    }

                    switch (request) {
                        case 'c':
                            result = cedula;
                            break;
                        case 'i':
                            result = institucion;
                            break;
                        default:
                            break;
                    }

                } catch (error) {
                    log.error('Nombre buscado catch', nameEspecialist);
                    log.error('Error de busqueda/funcion obtenerCedula', error);
                }
                return result;
            } else {
                log.debug('Nombre buscado else', nameEspecialist);
                result = '';
                return result;
            }
        }

        return {
            onRequest: onRequest
        };

    });