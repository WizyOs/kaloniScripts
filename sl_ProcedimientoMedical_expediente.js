/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/file', 'N/search'],

    function (record, log, render, xml, file, search) {

        function onRequest(context) {

            // VARIABLES GLOBALES TABLAS
            var contadorIndependiente = 0;
            var i = 0;
            var parImpar = '';

            //MAIN VARS
            // Variables para crear los objetos principales
            var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
            var caso = record.load({ type: 'supportcase', id: recId }); // Variable que guarda el objeto Case
            var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente
            var cliente = record.load({ type: 'customer', id: companyId }); // Variable que guarda el objeto Customer
            log.debug("caso",caso);
            //CUSTOMER
            // Variables Informacion General obtenidas del CLIENTE
            var sucursalId = caso.getValue({ fieldId: 'custevent2' }); //Variable que guarda el id de Sucursal del cliente
            var nombreCliente = cliente.getText({ fieldId: 'altname' });
            var numeroExpediente = cliente.getText({ fieldId: 'entityid' });
            var identificacionCliente = cliente.getText({ fieldId: 'custentity251' }) || '';
            var telefonoCliente = cliente.getText({ fieldId: 'phone' }) || '';
            var direccionCliente = cliente.getText({ fieldId: 'defaultaddress' }) || '';

            // VARIABLES DE CASE
            // Variables Mapeo EXPLORACION FISICA
            // Variables Informacion General obtenidads del Case
            var sucursalTextCaso = caso.getText({ fieldId: 'custevent2' }); // Variable que guarda el nombre de la sucursal en String del case
            var fechaCaso = caso.getText({ fieldId: 'startdate' }); // variable que guarda la fecha en la que se realiza el procedimiento
            var horaCaso = caso.getText({ fieldId: 'starttime' }); // variable que gaurda la hora en la que se realiza el procedimiento
            var hc_enfermeroExtraccion = caso.getText({ fieldId: 'custevent71' }) || ""; // variable que guarda el enfermero de extraccion del caso
            var hc_enfermeroImplantacion = caso.getText({ fieldId: 'custevent72' }) || ""; // variable que guarda el enfermero de implantacion del caso
            var medicoResponsableProcedimiento = caso.getText({ fieldId: 'custevent28' }) || ""; // variable que guarda el medico responsable del caso
            var enfermerosResponsableProcedimiento = caso.getText({ fieldId: 'custevent29' }) || ""; // variable que guarda el enfermeto responsable del caso
            var edoCivilCliente = caso.getText({ fieldId: 'custevent206' }) || '';
            var fechNacCliente = caso.getText({ fieldId: 'custevent331' });
            var sexoCliente = caso.getText({ fieldId: 'custevent634' }) || '';
            var enfermeroA = obtenerEnfermeroA(enfermerosResponsableProcedimiento);
            var enfermeroB = obtenerEnfermeroB(enfermerosResponsableProcedimiento);
            var enfermeroResponsableProcedimiento = "";
            var hc_enfermeroExtraccion_equipoMedico = (hc_enfermeroExtraccion != "") ? ' / ' + hc_enfermeroExtraccion : "";
            var hc_enfermeroImplantacion_equipoMedico = (hc_enfermeroImplantacion != "") ? ' / ' + hc_enfermeroImplantacion : "";

            /**
            * ****************** *
            * LOAD PARENT RECORD *
            * ****************** *
            */
           var arr_typeProcess = [];
           var positionArray = 0;
           var firmaCliente = caso.getValue({ fieldId: 'custevent269' }) || null; //Firma Cliente
           var firmaMedico = caso.getValue({ fieldId: 'custevent485' }) || null; //Firma Medico
           var firmaTestigo1 = caso.getValue({ fieldId: 'custevent548' }) || null; //Firma testigo 1
           var firmaTestigo2 = caso.getValue({ fieldId: 'custevent549' }) || null; //Firma testigo 2
           var firmas = '';


           if (firmaCliente != null) {
               try {
                   var id_recordParent = caso.getValue({ fieldId: 'custevent_parentrecid' }); // Variable que guarda el id del caso padre
                   id_recordParent = parseInt(id_recordParent);
                   var obj_parentRecord = record.load({ type: 'supportcase', id: id_recordParent });
                   typeProcess_values = obj_parentRecord.getValue({ fieldId: 'custevent1066' });
                   for (var key = 0; key < typeProcess_values.length; key++) {
                       positionArray = parseInt(typeProcess_values[key]);
                       typeProcess_value = parseInt(typeProcess_values[key]);
                       arr_typeProcess[positionArray] = typeProcess_value;
                   }
                   log.debug('Valores parent', 'id padre: ' + id_recordParent + ' tipo Procedimiento ' + typeProcess_value + ' position ' + positionArray + ' largo objeto ' + typeProcess_values.length);
               } catch (error) {
                   log.debug('Error load parent supportcase', error);
               }
               firmas = '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
               '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + firmaCliente + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + nombreCliente + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + firmaMedico + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
               '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + firmaTestigo1 + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + firmaTestigo2 + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
               '</table>';
           }
			log.debug("firmaCliente",firmaCliente);
            //APOYOS
            // Variables obtenias desde funciones locales
            var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
            var sucReal = sucursalReal(sucursalTextCaso); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
            var edadCliente = calcYearInt(fechNacCliente, fechaCaso);
            var implantesMamarios_file = file.load({ id: 5133275 });
            var implantesMamarios = 'data:image/png;base64,' + implantesMamarios_file.getContents();

            //TAB CIRUGÍA SEGURA
            // Grupo Antes de la Inducción Anestésica
            var cs_identidad = checado(caso.getValue({ fieldId: 'custevent550' }));
            var cs_sitioCorrecto = checado(caso.getValue({ fieldId: 'custevent551' }));
            var cs_procedimientoCorrecto = checado(caso.getValue({ fieldId: 'custevent552' }));
            var cs_cuentaConsentimientoInf = checado(caso.getValue({ fieldId: 'custevent553' }));
            var cs_realizoMarcaje = checado((caso.getValue({ fieldId: 'custevent556' }) == true) ? 'SI' : 'NO');
            var cs_controlAnestesia = checado((caso.getValue({ fieldId: 'custevent557' }) == true) ? 'SI' : 'NO');
            var cs_vigilanciaEstandar = checado((caso.getValue({ fieldId: 'custevent722' }) == true) ? 'SI' : 'NO');
            var cs_riesgoAspiracion = caso.getText({ fieldId: 'custevent723' }) || '';
            var cs_riesgoHemorragia = caso.getText({ fieldId: 'custevent724' }) || '';
            // Grupo Iniciar Procedimiento            
            var cs_confirmarMiembros = checado(caso.getValue({ fieldId: 'custevent560' }));
            var cs_revisaCirujano = checado(caso.getValue({ fieldId: 'custevent725' }));
            var cs_revisaAnestesia = checado(caso.getValue({ fieldId: 'custevent726' }));
            var cs_revisarInstrumental = checado(caso.getValue({ fieldId: 'custevent727' }));
            var cs_profilaxisAntibiótica = checado((caso.getValue({ fieldId: 'custevent728' }) == true) ? 'SI' : 'NO');
            var cs_visualizarImagenes = checado((caso.getValue({ fieldId: 'custevent729' }) == true) ? 'SI' : 'NO');
            // Grupo Después de la cirugía
            var cs_recuentoInstrumental = checado(caso.getValue({ fieldId: 'custevent565' }));
            var cs_nomrbeProcedimiento = checado(caso.getValue({ fieldId: 'custevent564' }));
            var cs_recuperacionTratamiento = checado(caso.getValue({ fieldId: 'custevent567' }));
            var cs_etiquetadoHistopatologicas = checado(caso.getValue({ fieldId: 'custevent564' }));
            var cs_materialTextil = checado(caso.getValue({ fieldId: 'custevent730' }));

            // TAB VALORACIÓN PREANESTÉSICA
            // Grupo Valoración Preanestésico
            var vp_cirugiaElectiva = checado(caso.getValue({ fieldId: 'custevent731' }));
            var vp_cirugiaElectiva_label = caso.getField({ fieldId: 'custevent731' }).label;
            var vp_cirugiaUrgente = checado(caso.getValue({ fieldId: 'custevent732' }));
            var vp_cirugiaUrgente_label = caso.getField({ fieldId: 'custevent732' }).label;
            var vp_cirugiaMayor = checado(caso.getValue({ fieldId: 'custevent733' }));
            var vp_cirugiaMayor_label = caso.getField({ fieldId: 'custevent733' }).label;
            var vp_cirugiaMenor = checado(caso.getValue({ fieldId: 'custevent734' }));
            var vp_cirugiaMenor_label = caso.getField({ fieldId: 'custevent734' }).label;
            var vp_glucosa = caso.getText({ fieldId: 'custevent735' }) || '';
            var vp_glucosa_label = caso.getField({ fieldId: 'custevent735' }).label;
            var vp_urea = caso.getText({ fieldId: 'custevent736' }) || '';
            var vp_urea_label = caso.getField({ fieldId: 'custevent736' }).label;
            var vp_creatinina = caso.getText({ fieldId: 'custevent737' }) || '';
            var vp_creatinina_label = caso.getField({ fieldId: 'custevent737' }).label;
            var vp_ekg = caso.getText({ fieldId: 'custevent738' }) || '';
            var vp_ekg_label = caso.getField({ fieldId: 'custevent738' }).label;
            var vp_rxTorax = caso.getText({ fieldId: 'custevent739' }) || '';
            var vp_rxTorax_label = caso.getField({ fieldId: 'custevent739' }).label;
            var vp_asa = caso.getText({ fieldId: 'custevent740' }) || '';
            var vp_asa_label = caso.getField({ fieldId: 'custevent740' }).label;
            var vp_hb = caso.getText({ fieldId: 'custevent741' }) || '';
            var vp_hb_label = caso.getField({ fieldId: 'custevent741' }).label;
            var vp_hto = caso.getText({ fieldId: 'custevent742' }) || '';
            var vp_hto_label = caso.getField({ fieldId: 'custevent742' }).label;
            var vp_grupoS = caso.getText({ fieldId: 'custevent743' }) || '';
            var vp_grupoS_label = caso.getField({ fieldId: 'custevent743' }).label;
            var vp_rh = caso.getText({ fieldId: 'custevent744' }) || '';
            var vp_rh_label = caso.getField({ fieldId: 'custevent744' }).label;
            var vp_pa = caso.getText({ fieldId: 'custevent745' }) || '';
            var vp_pa_label = caso.getField({ fieldId: 'custevent745' }).label;
            var vp_fc = caso.getText({ fieldId: 'custevent746' }) || '';
            var vp_fc_label = caso.getField({ fieldId: 'custevent746' }).label;
            var vp_ef = caso.getText({ fieldId: 'custevent747' }) || '';
            var vp_ef_label = caso.getField({ fieldId: 'custevent747' }).label;
            var vp_craneo = caso.getText({ fieldId: 'custevent748' }) || '';
            var vp_craneo_label = caso.getField({ fieldId: 'custevent748' }).label;
            var vp_ojosOidosNarizGarganta = caso.getText({ fieldId: 'custevent749' }) || '';
            var vp_ojosOidosNarizGarganta_label = caso.getField({ fieldId: 'custevent749' }).label;
            var vp_patologiasActuales = caso.getText({ fieldId: 'custevent750' }) || '';
            var vp_patologiasActuales_label = caso.getField({ fieldId: 'custevent750' }).label;
            var vp_sRespiratoria = caso.getText({ fieldId: 'custevent751' }) || '';
            var vp_sRespiratoria_label = caso.getField({ fieldId: 'custevent751' }).label;
            var vp_sCardiovascular = caso.getText({ fieldId: 'custevent752' }) || '';
            var vp_sCardiovascular_label = caso.getField({ fieldId: 'custevent752' }).label;
            var vp_sGastrointestinal = caso.getText({ fieldId: 'custevent753' }) || '';
            var vp_sGastrointestinal_label = caso.getField({ fieldId: 'custevent753' }).label;
            var vp_sGenitourinatio = caso.getText({ fieldId: 'custevent754' }) || '';
            var vp_sGenitourinatio_label = caso.getField({ fieldId: 'custevent754' }).label;
            var vp_sNervioso = caso.getText({ fieldId: 'custevent755' }) || '';
            var vp_sNervioso_label = caso.getField({ fieldId: 'custevent755' }).label;
            var vp_sEndocrino = caso.getText({ fieldId: 'custevent756' }) || '';
            var vp_sEndocrino_label = caso.getField({ fieldId: 'custevent756' }).label;
            var vp_sMuscular = caso.getText({ fieldId: 'custevent757' }) || '';
            var vp_sMuscular_label = caso.getField({ fieldId: 'custevent757' }).label;
            var vp_alergiasTrans = caso.getText({ fieldId: 'custevent758' }) || '';
            var vp_alergiasTrans_label = caso.getField({ fieldId: 'custevent758' }).label;
            var vp_operacionesPrevias = caso.getText({ fieldId: 'custevent759' }) || '';
            var vp_operacionesPrevias_label = caso.getField({ fieldId: 'custevent759' }).label;
            var vp_antecedentesAnestesicos = caso.getText({ fieldId: 'custevent760' }) || '';
            var vp_antecedentesAnestesicos_label = caso.getField({ fieldId: 'custevent760' }).label;
            var vp_complicaciones = caso.getText({ fieldId: 'custevent761' }) || '';
            var vp_complicaciones_label = caso.getField({ fieldId: 'custevent761' }).label;
            var vp_tecAnestPropuesta = caso.getText({ fieldId: 'custevent762' }) || '';
            var vp_tecAnestPropuesta_label = caso.getField({ fieldId: 'custevent762' }).label;
            // Grupo Anestesia
            var vp_puncionVenosaSitio = caso.getText({ fieldId: 'custevent763' }) || '';
            var vp_puncionVenosaSitio_label = caso.getField({ fieldId: 'custevent763' }).label;
            var vp_puncionVenosaCalibre = caso.getText({ fieldId: 'custevent764' }) || '';
            var vp_puncionVenosaCalibre_label = caso.getField({ fieldId: 'custevent764' }).label;
            var vp_posicionPaciente = caso.getText({ fieldId: 'custevent765' }) || '';
            var vp_posicionPaciente_label = caso.getField({ fieldId: 'custevent765' }).label;
            var vp_posBrazosAbduccion = caso.getText({ fieldId: 'custevent766' }) || '';
            var vp_posBrazosAbduccion_label = caso.getField({ fieldId: 'custevent766' }).label;
            var vp_posBrazosAduccion = caso.getText({ fieldId: 'custevent767' }) || '';
            var vp_posBrazosAduccion_label = caso.getField({ fieldId: 'custevent767' }).label;
            var vp_torniqueteSitio = caso.getText({ fieldId: 'custevent768' }) || '';
            var vp_torniqueteSitio_label = caso.getField({ fieldId: 'custevent768' }).label;
            var vp_torniqueteInicia = caso.getText({ fieldId: 'custevent769' }) || '';
            var vp_torniqueteInicia_label = caso.getField({ fieldId: 'custevent769' }).label;
            var vp_torniqueteTermina = caso.getText({ fieldId: 'custevent770' }) || '';
            var vp_torniqueteTermina_label = caso.getField({ fieldId: 'custevent770' }).label;
            var vp_intubacionDificultades = checado(caso.getText({ fieldId: 'custevent771' }) || '');
            var vp_intubacionDificultades_label = caso.getField({ fieldId: 'custevent771' }).label;
            var vp_induccionDificultados = checado(caso.getText({ fieldId: 'custevent772' }) || '');
            var vp_induccionDificultados_label = caso.getField({ fieldId: 'custevent772' }).label;
            var vp_oralNasalCalibre = caso.getText({ fieldId: 'custevent773' }) || '';
            var vp_oralNasalCalibre_label = caso.getField({ fieldId: 'custevent773' }).label;
            var vp_oralNasalGlobo = checado(caso.getText({ fieldId: 'custevent774' }) || '');
            var vp_oralNasalGlobo_label = caso.getField({ fieldId: 'custevent774' }).label;
            var vp_presionNormalBaja = checado(caso.getText({ fieldId: 'custevent775' }) || '');
            var vp_presionNormalBaja_label = caso.getField({ fieldId: 'custevent775' }).label;
            var vp_bloqueoPlexo = caso.getText({ fieldId: 'custevent776' }) || '';
            var vp_bloqueoPlexo_label = caso.getField({ fieldId: 'custevent776' }).label;
            var vp_codicionPacienteCerrar = caso.getText({ fieldId: 'custevent777' }) || '';
            var vp_codicionPacienteCerrar_label = caso.getField({ fieldId: 'custevent777' }).label;
            var vp_sitiosPresion = caso.getText({ fieldId: 'custevent778' }) || '';
            var vp_sitiosPresion_label = caso.getField({ fieldId: 'custevent778' }).label;
            var vp_otrosDatos = caso.getText({ fieldId: 'custevent779' }) || '';
            var vp_otrosDatos_label = caso.getField({ fieldId: 'custevent779' }).label;
            var vp_puncionEpiduralDificultades = checado(caso.getValue({ fieldId: 'custevent780' }) || 'NO');
            var vp_puncionEpiduralDificultades_label = caso.getField({ fieldId: 'custevent780' }).label;
            var vp_pucnionEpiduralCalibre = caso.getText({ fieldId: 'custevent781' }) || '';
            var vp_pucnionEpiduralCalibre_label = caso.getField({ fieldId: 'custevent781' }).label;
            var vp_puncionEpiduralIntervertebral = caso.getText({ fieldId: 'custevent782' }) || '';
            var vp_puncionEpiduralIntervertebral_label = caso.getField({ fieldId: 'custevent782' }).label;
            var vp_puncionEpidrualAgente = caso.getText({ fieldId: 'custevent783' }) || '';
            var vp_puncionEpidrualAgente_label = caso.getField({ fieldId: 'custevent783' }).label;
            var vp_puncionEpiduralNivel = caso.getText({ fieldId: 'custevent784' }) || '';
            var vp_puncionEpiduralNivel_label = caso.getField({ fieldId: 'custevent784' }).label;
            var vp_ojosProteccion = checado(caso.getText({ fieldId: 'custevent792' }) || '');
            var vp_ojosProteccion_label = caso.getField({ fieldId: 'custevent792' }).label;
            var vp_porAnestesiologo = caso.getText({ fieldId: 'custevent793' }) || '';
            var vp_porAnestesiologo_label = caso.getField({ fieldId: 'custevent793' }).label;
            // Grupo Recuperación
            var vp_valoracionAldrete15 = caso.getText({ fieldId: 'custevent785' }) || '';
            var vp_valoracionAldrete15_label = caso.getField({ fieldId: 'custevent785' }).label;
            var vp_valoracionAldrete45 = caso.getText({ fieldId: 'custevent786' }) || '';
            var vp_valoracionAldrete45_label = caso.getField({ fieldId: 'custevent786' }).label;
            var vp_valoracionAldrete90 = caso.getText({ fieldId: 'custevent787' }) || '';
            var vp_valoracionAldrete90_label = caso.getField({ fieldId: 'custevent787' }).label;
            var vp_pasoDeRecuperacionA = caso.getText({ fieldId: 'custevent788' }) || '';
            var vp_pasoDeRecuperacionA_label = caso.getField({ fieldId: 'custevent788' }).label;
            var vp_pasoDeRecuperacionAEspecifique = caso.getText({ fieldId: 'custevent789' }) || '';
            var vp_pasoDeRecuperacionAEspecifique_label = caso.getField({ fieldId: 'custevent789' }).label;
            var vp_pasoDeRecuperacionAHora = caso.getText({ fieldId: 'custevent790' }) || '';
            var vp_pasoDeRecuperacionAHora_label = caso.getField({ fieldId: 'custevent790' }).label;
            var vp_recuperacionResponsable = caso.getText({ fieldId: 'custevent791' }) || '';
            var vp_recuperacionResponsable_label = caso.getField({ fieldId: 'custevent791' }).label;
            var vp_recuperacionResponsable_cedula = obtenerCedula(vp_recuperacionResponsable, 'c');

            // Grupo Transanestesico
            var vp_diagnosticoTransanestesico = caso.getText({ fieldId: 'custevent796' }) || '';
            var vp_diagnosticoTransanestesico_label = caso.getField({ fieldId: 'custevent796' }).label;
            var vp_operacionTransanestesico = caso.getText({ fieldId: 'custevent797' }) || '';
            var vp_operacionTransanestesico_label = caso.getField({ fieldId: 'custevent797' }).label;
            var vp_cirujanoTransanestesico = caso.getText({ fieldId: 'custevent798' }) || '';
            var vp_cirujanoTransanestesico_label = caso.getField({ fieldId: 'custevent798' }).label;
            var vp_cirujanoTransanestesico_cedula = obtenerCedula(vp_cirujanoTransanestesico, 'c');
            var vp_anestesiologoTransanestesico = caso.getText({ fieldId: 'custevent799' }) || '';
            var vp_anestesiologoTransanestesico_label = caso.getField({ fieldId: 'custevent799' }).label;
            var vp_anestesiologoTransanestesico_cedula = obtenerCedula(vp_anestesiologoTransanestesico, 'c');
            // Grupo Tiempos Parametros Signos
            var table_ParametrosSignos_ValoracionPreanestesica = null;
            var conteo_ParametrosSignosValoracionPreanestesica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord382' });
            ////log.debug('Tipo de Objeto Parametros y Signos', conteo_ParametrosSignosValoracionPreanestesica_lines);           
            if (conteo_ParametrosSignosValoracionPreanestesica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_ParametrosSignosValoracionPreanestesica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_ParametrosSignos_ParametrosSignos = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord357', line: i }) || '';
                    var table_ParametrosSignos_8hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord358', line: i }) || '';
                    var table_ParametrosSignos_9hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord359', line: i }) || '';
                    var table_ParametrosSignos_10hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord360', line: i }) || '';
                    var table_ParametrosSignos_11hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord361', line: i }) || '';
                    var table_ParametrosSignos_12hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord362', line: i }) || '';
                    var table_ParametrosSignos_13hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord363', line: i }) || '';
                    var table_ParametrosSignos_14hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord364', line: i }) || '';
                    var table_ParametrosSignos_15hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord365', line: i }) || '';
                    var table_ParametrosSignos_16hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord366', line: i }) || '';
                    var table_ParametrosSignos_17hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord367', line: i }) || '';
                    var table_ParametrosSignos_18hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord368', line: i }) || '';
                    var table_ParametrosSignos_19hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord369', line: i }) || '';
                    var table_ParametrosSignos_20hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord370', line: i }) || '';
                    var table_ParametrosSignos_21hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord371', line: i }) || '';
                    var table_ParametrosSignos_22hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord372', line: i }) || '';
                    var table_ParametrosSignos_23hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord373', line: i }) || '';
                    var table_ParametrosSignos_24hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord374', line: i }) || '';
                    var table_ParametrosSignos_1hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord375', line: i }) || '';
                    var table_ParametrosSignos_2hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord376', line: i }) || '';
                    var table_ParametrosSignos_3hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord377', line: i }) || '';
                    var table_ParametrosSignos_4hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord378', line: i }) || '';
                    var table_ParametrosSignos_5hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord379', line: i }) || '';
                    var table_ParametrosSignos_6hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord380', line: i }) || '';
                    var table_ParametrosSignos_7hrs = caso.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord381', line: i }) || '';

                    if (table_ParametrosSignos_ParametrosSignos != '' || table_ParametrosSignos_8hrs != '' || table_ParametrosSignos_9hrs != '' ||
                        table_ParametrosSignos_10hrs != '' || table_ParametrosSignos_11hrs != '' || table_ParametrosSignos_12hrs != '' ||
                        table_ParametrosSignos_13hrs != '' || table_ParametrosSignos_14hrs != '' || table_ParametrosSignos_15hrs != '' ||
                        table_ParametrosSignos_16hrs != '' || table_ParametrosSignos_17hrs != '' || table_ParametrosSignos_18hrs != '' ||
                        table_ParametrosSignos_19hrs != '' || table_ParametrosSignos_20hrs != '' || table_ParametrosSignos_21hrs != '' ||
                        table_ParametrosSignos_22hrs != '' || table_ParametrosSignos_23hrs != '' || table_ParametrosSignos_24hrs != '' ||
                        table_ParametrosSignos_1hrs != '' || table_ParametrosSignos_2hrs != '' || table_ParametrosSignos_3hrs != '' ||
                        table_ParametrosSignos_4hrs != '' || table_ParametrosSignos_5hrs != '' || table_ParametrosSignos_6hrs != '' ||
                        table_ParametrosSignos_7hrs != '') {

                        table_ParametrosSignos_ValoracionPreanestesica += '<tr ' + parImpar + '>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_ParametrosSignos + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_8hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_9hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_10hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_11hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_12hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_13hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_14hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_15hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_16hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_17hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_18hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_19hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_20hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_21hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_22hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_23hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_24hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_1hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_2hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_3hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_4hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_5hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_6hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_7hrs + '</td>';
                        table_ParametrosSignos_ValoracionPreanestesica += '</tr>';
                    }
                    contadorIndependiente++;
                }
            }
            // Grupo Simbolos-Agentes anestésicos, farmacos, soluciones
            var table_SimbolosAgentes_ValoracionPreanestesica = null;
            var conteo_SimbolosAgentesValoracionPreanestesica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord408' });
            ////log.debug('Tipo de Objeto Simbolos, Agentes', conteo_SimbolosAgentesValoracionPreanestesica_lines);
            if (conteo_SimbolosAgentesValoracionPreanestesica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_SimbolosAgentesValoracionPreanestesica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    log.debug('valor style', contadorIndependiente + parImpar);
                    var table_SimbolosAgentes_FarmacoSolucion = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord383', line: i }) || '';
                    var table_SimbolosAgentes_8hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord384', line: i }) || '';
                    var table_SimbolosAgentes_9hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord385', line: i }) || '';
                    var table_SimbolosAgentes_10hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord386', line: i }) || '';
                    var table_SimbolosAgentes_11hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord387', line: i }) || '';
                    var table_SimbolosAgentes_12hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord388', line: i }) || '';
                    var table_SimbolosAgentes_13hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord389', line: i }) || '';
                    var table_SimbolosAgentes_14hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord390', line: i }) || '';
                    var table_SimbolosAgentes_15hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord391', line: i }) || '';
                    var table_SimbolosAgentes_16hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord392', line: i }) || '';
                    var table_SimbolosAgentes_17hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord393', line: i }) || '';
                    var table_SimbolosAgentes_18hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord394', line: i }) || '';
                    var table_SimbolosAgentes_19hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord395', line: i }) || '';
                    var table_SimbolosAgentes_20hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord396', line: i }) || '';
                    var table_SimbolosAgentes_21hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord397', line: i }) || '';
                    var table_SimbolosAgentes_22hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord398', line: i }) || '';
                    var table_SimbolosAgentes_23hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord399', line: i }) || '';
                    var table_SimbolosAgentes_24hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord400', line: i }) || '';
                    var table_SimbolosAgentes_1hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord401', line: i }) || '';
                    var table_SimbolosAgentes_2hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord402', line: i }) || '';
                    var table_SimbolosAgentes_3hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord403', line: i }) || '';
                    var table_SimbolosAgentes_4hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord404', line: i }) || '';
                    var table_SimbolosAgentes_5hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord405', line: i }) || '';
                    var table_SimbolosAgentes_6hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord406', line: i }) || '';
                    var table_SimbolosAgentes_7hrs = caso.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord407', line: i }) || '';

                    if (table_SimbolosAgentes_FarmacoSolucion != '' || table_SimbolosAgentes_8hrs != '' || table_SimbolosAgentes_9hrs != '' ||
                        table_SimbolosAgentes_10hrs != '' || table_SimbolosAgentes_11hrs != '' || table_SimbolosAgentes_12hrs != '' ||
                        table_SimbolosAgentes_13hrs != '' || table_SimbolosAgentes_14hrs != '' || table_SimbolosAgentes_15hrs != '' ||
                        table_SimbolosAgentes_16hrs != '' || table_SimbolosAgentes_17hrs != '' || table_SimbolosAgentes_18hrs != '' ||
                        table_SimbolosAgentes_19hrs != '' || table_SimbolosAgentes_20hrs != '' || table_SimbolosAgentes_21hrs != '' ||
                        table_SimbolosAgentes_22hrs != '' || table_SimbolosAgentes_23hrs != '' || table_SimbolosAgentes_24hrs != '' ||
                        table_SimbolosAgentes_1hrs != '' || table_SimbolosAgentes_2hrs != '' || table_SimbolosAgentes_3hrs != '' ||
                        table_SimbolosAgentes_4hrs != '' || table_SimbolosAgentes_5hrs != '' || table_SimbolosAgentes_6hrs != '' ||
                        table_SimbolosAgentes_7hrs != '') {

                        table_SimbolosAgentes_ValoracionPreanestesica += '<tr ' + parImpar + '>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_FarmacoSolucion + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_8hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_9hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_10hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_11hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_12hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_13hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_14hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_15hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_16hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_17hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_18hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_19hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_20hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_21hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_22hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_23hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_24hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_1hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_2hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_3hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_4hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_5hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_6hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_7hrs + '</td>';
                        table_SimbolosAgentes_ValoracionPreanestesica += '</tr>';
                    }
                    contadorIndependiente++;
                }
            }

            // TAB CONTROL DE LÍQUIDOS
            // Grupo Dieta
            var table_Dieta_ControlLiquidos = null;
            var conteo_DietaControlLiquidos_lines = caso.getLineCount({ sublistId: 'recmachcustrecord182' });
            ////log.debug('Tipo Objeto Control Liquidos Dieta', conteo_DietaControlLiquidos_lines);
            if (conteo_DietaControlLiquidos_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_DietaControlLiquidos_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Dieta_Matutino = caso.getSublistText({ sublistId: 'recmachcustrecord182', fieldId: 'custrecord183', line: i }) || '';
                    var table_Dieta_Vespertino = caso.getSublistText({ sublistId: 'recmachcustrecord182', fieldId: 'custrecord180', line: i }) || '';
                    var table_Dieta_Nocturno = caso.getSublistText({ sublistId: 'recmachcustrecord182', fieldId: 'custrecord181', line: i }) || '';

                    if (table_Dieta_Matutino != '' || table_Dieta_Vespertino != '' || table_Dieta_Nocturno != '') {
                        table_Dieta_ControlLiquidos += '<tr ' + parImpar + '>';
                        table_Dieta_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Dieta_Matutino + '</td>';
                        table_Dieta_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Dieta_Vespertino + '</td>';
                        table_Dieta_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Dieta_Nocturno + '</td>';
                        table_Dieta_ControlLiquidos += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Ingresos
            var table_Ingresos_ControlLiquidos = null;
            var conteo_IngresosControlLiquidos_lines = caso.getLineCount({ sublistId: 'recmachcustrecord185' });
            var total_IngresosControlLiquidos_totalesGlobales = 0;
            var table_Ingresos_total1_subtotal = 0;
            var table_Ingresos_total2_subtotal = 0;
            var table_Ingresos_total3_subtotal = 0;
            //log.debug('Conteo Ingresos Control Liquidos', conteo_IngresosControlLiquidos_lines);
            if (conteo_IngresosControlLiquidos_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_IngresosControlLiquidos_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Ingresos_solucion = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord184', line: i }) || 0;
                    var table_Ingresos_8 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord186', line: i }) || 0;
                    var table_Ingresos_9 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord187', line: i }) || 0;
                    var table_Ingresos_10 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord188', line: i }) || 0;
                    var table_Ingresos_11 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord189', line: i }) || 0;
                    var table_Ingresos_12 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord190', line: i }) || 0;
                    var table_Ingresos_13 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord191', line: i }) || 0;
                    var table_Ingresos_14 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord192', line: i }) || 0;
                    var table_Ingresos_15 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord193', line: i }) || 0;
                    //var table_Ingresos_total1 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord194', line: i }) || 0;
                    var table_Ingresos_total1 = table_Ingresos_8 + table_Ingresos_9 + table_Ingresos_10 + table_Ingresos_11 + table_Ingresos_12 + table_Ingresos_13 + table_Ingresos_14 + table_Ingresos_15;
                    table_Ingresos_total1_subtotal += table_Ingresos_total1;
                    var table_Ingresos_16 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord195', line: i }) || 0;
                    var table_Ingresos_17 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord196', line: i }) || 0;
                    var table_Ingresos_18 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord197', line: i }) || 0;
                    var table_Ingresos_19 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord198', line: i }) || 0;
                    var table_Ingresos_20 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord199', line: i }) || 0;
                    var table_Ingresos_21 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord200', line: i }) || 0;
                    var table_Ingresos_22 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord201', line: i }) || 0;
                    var table_Ingresos_23 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord202', line: i }) || 0;
                    //var table_Ingresos_total2 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord203', line: i }) || 0;
                    var table_Ingresos_total2 = table_Ingresos_16 + table_Ingresos_17 + table_Ingresos_18 + table_Ingresos_19 + table_Ingresos_20 + table_Ingresos_21 + table_Ingresos_22 + table_Ingresos_23;
                    table_Ingresos_total2_subtotal += table_Ingresos_total2;
                    var table_Ingresos_24 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord204', line: i }) || 0;
                    var table_Ingresos_1 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord205', line: i }) || 0;
                    var table_Ingresos_2 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord206', line: i }) || 0;
                    var table_Ingresos_3 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord207', line: i }) || 0;
                    var table_Ingresos_4 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord208', line: i }) || 0;
                    var table_Ingresos_5 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord209', line: i }) || 0;
                    var table_Ingresos_6 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord210', line: i }) || 0;
                    var table_Ingresos_7 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord211', line: i }) || 0;
                    //var table_Ingresos_total3 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord212', line: i }) || null;
                    var table_Ingresos_total3 = table_Ingresos_24 + table_Ingresos_1 + table_Ingresos_3 + table_Ingresos_2 + table_Ingresos_4 + table_Ingresos_5 + table_Ingresos_6 + table_Ingresos_7;
                    table_Ingresos_total3_subtotal += table_Ingresos_total3;
                    total_IngresosControlLiquidos_totalesGlobales += parseFloat(table_Ingresos_total1) + parseFloat(table_Ingresos_total2) + parseFloat(table_Ingresos_total3);

                    table_Ingresos_ControlLiquidos += '<tr ' + parImpar + '>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_solucion + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_8.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_9.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_10.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_11.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_12.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_13.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_14.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_15.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_total1.toFixed(2) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_16.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_17.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_18.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_19.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_20.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_21.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_22.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_23.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_total2.toFixed(2) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_24.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_1.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_2.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_3.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_4.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_5.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_6.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_7.toFixed(1) + '</td>';
                    table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_total3.toFixed(2) + '</td>';
                    table_Ingresos_ControlLiquidos += '</tr>';
                    contadorIndependiente++;
                }
            }
            // Grupo Egresos
            var table_Egresos_ControlLiquidos = null;
            var conteo_EgresosControlLiquidos_lines = caso.getLineCount({ sublistId: 'recmachcustrecord214' });
            var total_EgresosControlLiquidos_totalesGlobales = 0;
            var table_Egresos_total1_subtotal = 0;
            var table_Egresos_total2_subtotal = 0;
            var table_Egresos_total3_subtotal = 0;
            //log.debug('Conteo Egresos Control Liquidos', conteo_EgresosControlLiquidos_lines);
            if (conteo_EgresosControlLiquidos_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_EgresosControlLiquidos_lines; i++) {
                    parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Egresos_hora = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord213', line: i }) || 0;
                    var table_Egresos_8 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord215', line: i }) || 0;
                    var table_Egresos_9 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord216', line: i }) || 0;
                    var table_Egresos_10 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord217', line: i }) || 0;
                    var table_Egresos_11 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord218', line: i }) || 0;
                    var table_Egresos_12 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord219', line: i }) || 0;
                    var table_Egresos_13 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord220', line: i }) || 0;
                    var table_Egresos_14 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord221', line: i }) || 0;
                    var table_Egresos_15 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord222', line: i }) || 0;
                    //var table_Egresos_total1 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord194', line: i }) || 0;
                    var table_Egresos_total1 = table_Egresos_8 + table_Egresos_9 + table_Egresos_10 + table_Egresos_11 + table_Egresos_12 + table_Egresos_13 + table_Egresos_14 + table_Egresos_15;
                    table_Egresos_total1_subtotal += table_Egresos_total1;
                    var table_Egresos_16 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord224', line: i }) || 0;
                    var table_Egresos_17 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord225', line: i }) || 0;
                    var table_Egresos_18 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord226', line: i }) || 0;
                    var table_Egresos_19 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord227', line: i }) || 0;
                    var table_Egresos_20 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord228', line: i }) || 0;
                    var table_Egresos_21 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord229', line: i }) || 0;
                    var table_Egresos_22 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord230', line: i }) || 0;
                    var table_Egresos_23 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord231', line: i }) || 0;
                    //var table_Egresos_total2 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord203', line: i }) || 0;
                    var table_Egresos_total2 = table_Egresos_16 + table_Egresos_17 + table_Egresos_18 + table_Egresos_19 + table_Egresos_20 + table_Egresos_21 + table_Egresos_22 + table_Egresos_23;
                    table_Egresos_total2_subtotal += table_Egresos_total2;
                    var table_Egresos_24 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord236', line: i }) || 0;
                    var table_Egresos_1 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord233', line: i }) || 0;
                    var table_Egresos_2 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord234', line: i }) || 0;
                    var table_Egresos_3 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord235', line: i }) || 0;
                    var table_Egresos_4 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord237', line: i }) || 0;
                    var table_Egresos_5 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord238', line: i }) || 0;
                    var table_Egresos_6 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord239', line: i }) || 0;
                    var table_Egresos_7 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord240', line: i }) || 0;
                    //var table_Egresos_total3 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord212', line: i }) || null;
                    var table_Egresos_total3 = table_Egresos_24 + table_Egresos_1 + table_Egresos_2 + table_Egresos_3 + table_Egresos_4 + table_Egresos_5 + table_Egresos_6 + table_Egresos_7;
                    table_Egresos_total3_subtotal += table_Egresos_total3;
                    total_EgresosControlLiquidos_totalesGlobales += parseFloat(table_Egresos_total1) + parseFloat(table_Egresos_total2) + parseFloat(table_Egresos_total3);

                    table_Egresos_ControlLiquidos += '<tr ' + parImpar + '>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_hora + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_8.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_9.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_10.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_11.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_12.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_13.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_14.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_15.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_total1.toFixed(2) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_16.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_17.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_18.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_19.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_20.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_21.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_22.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_23.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_total2.toFixed(2) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_24.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_1.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_2.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_3.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_4.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_5.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_6.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_7.toFixed(1) + '</td>';
                    table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_total3.toFixed(2) + '</td>';
                    table_Egresos_ControlLiquidos += '</tr>';
                    contadorIndependiente++;
                }
            }
            // Grupo Observaciones, datos relevantes a reportar
            var table_Observaciones_ControlLiquidos = null;
            var conteo_ObservacionesControlLiquidos_lines = caso.getLineCount({ sublistId: 'recmachcustrecord245' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_ObservacionesControlLiquidos_lines);
            if (conteo_ObservacionesControlLiquidos_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_ObservacionesControlLiquidos_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Observaciones_Matutino = caso.getSublistText({ sublistId: 'recmachcustrecord245', fieldId: 'custrecord242', line: i }) || '';
                    var table_Observaciones_Vespertino = caso.getSublistText({ sublistId: 'recmachcustrecord245', fieldId: 'custrecord243', line: i }) || '';
                    var table_Observaciones_Nocturno = caso.getSublistText({ sublistId: 'recmachcustrecord245', fieldId: 'custrecord244', line: i }) || '';
                    if (table_Observaciones_Matutino != '' || table_Observaciones_Vespertino != '' || table_Observaciones_Nocturno != '') {
                        table_Observaciones_ControlLiquidos += '<tr ' + parImpar + '>';
                        table_Observaciones_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Observaciones_Matutino + '</td>';
                        table_Observaciones_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Observaciones_Vespertino + '</td>';
                        table_Observaciones_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Observaciones_Nocturno + '</td>';
                        table_Observaciones_ControlLiquidos += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Responsables
            var table_Responsables_ControlLiquidos = null;
            var conteo_ResponsablesControlLiquidos_lines = caso.getLineCount({ sublistId: 'recmachcustrecord250' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_ResponsablesControlLiquidos_lines);
            if (conteo_ResponsablesControlLiquidos_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_ResponsablesControlLiquidos_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Responsables_Responsable = caso.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord246', line: i }) || '';
                    var table_Responsables_Matutino = caso.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord247', line: i }) || '';
                    var table_Responsables_Vespertino = caso.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord248', line: i }) || '';
                    var table_Responsables_Nocturno = caso.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord249', line: i }) || '';
                    if (table_Responsables_Responsable != '' && (table_Responsables_Matutino != '' || table_Responsables_Vespertino != '' || table_Responsables_Nocturno != '')) {
                        table_Responsables_ControlLiquidos += '<tr ' + parImpar + '>';
                        table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Responsable + '</td>';
                        table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Matutino + '</td>';
                        table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Vespertino + '</td>';
                        table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Nocturno + '</td>';
                        table_Responsables_ControlLiquidos += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }

            // TAB HOJA DE ENFERMERÍA QUIRÚRGICA
            // Grupo Estado de consciencia y físico
            var hojaQuirurgica_alerta_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent663' })) ? 'SI' : 'NO');
            var hojaQuirurgica_orientado_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent664' })) ? 'SI' : 'NO');
            var hojaQuirurgica_consciente_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent665' })) ? 'SI' : 'NO');
            var hojaQuirurgica_tranquilo_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent666' })) ? 'SI' : 'NO');
            var hojaQuirurgica_ansioso_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent667' })) ? 'SI' : 'NO');
            var hojaQuirurgica_letargico_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent668' })) ? 'SI' : 'NO');
            var hojaQuirurgica_nervioso_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent669' })) ? 'SI' : 'NO');
            var hojaQuirurgica_otros1_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent670' })) ? 'SI' : 'NO');
            var hojaQuirurgica_ayuno_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent671' })) ? 'SI' : 'NO');
            var hojaQuirurgica_tricotomia_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent672' })) ? 'SI' : 'NO');
            var hojaQuirurgica_region_edoConsciencia = caso.getText({ fieldId: 'custevent673' }) || '';
            var hojaQuirurgica_alergias_edoConsciencia = caso.getText({ fieldId: 'custevent674' }) || '';
            var hojaQuirurgica_protesis_edoConsciencia = caso.getText({ fieldId: 'custevent675' }) || '';
            var hojaQuirurgica_alajas_edoConsciencia = caso.getText({ fieldId: 'custevent676' }) || '';
            var hojaQuirurgica_ropaInterior_edoConsciencia = caso.getText({ fieldId: 'custevent677' }) || '';
            var hojaQuirurgica_mucosasOrales_edoConsciencia = caso.getText({ fieldId: 'custevent678' }) || '';
            var hojaQuirurgica_colorTegumentos_edoConsciencia = caso.getText({ fieldId: 'custevent679' }) || '';
            var label_hojaQuirurgica_mucosasOrales_edoConsciencia = caso.getField({ fieldId: 'custevent678' }).label;
            var label_hojaQuirurgica_colorTegumentos_edoConsciencia = caso.getField({ fieldId: 'custevent679' }).label;
            var hojaQuirurgica_estadoPiel_edoConsciencia = caso.getText({ fieldId: 'custevent680' }) || '';
            var hojaQuirurgica_afeccionesPiel_edoConsciencia = caso.getText({ fieldId: 'custevent681' }) || '';
            var label_hojaQuirurgica_afeccionesPiel_edoConsciencia = caso.getField({ fieldId: 'custevent681' }).label;
            var hojaQuirurgica_heridas_edoConsciencia = caso.getText({ fieldId: 'custevent682' }) || '';
            var hojaQuirurgica_cicatrices_edoConsciencia = caso.getText({ fieldId: 'custevent683' }) || '';
            var hojaQuirurgica_otros2_edoConsciencia = caso.getText({ fieldId: 'custevent684' }) || '';
            var hojaQuirurgica_venoclisis_edoConsciencia = caso.getText({ fieldId: 'custevent685' }) || '';
            var hojaQuirurgica_sondas_edoConsciencia = caso.getText({ fieldId: 'custevent686' }) || '';
            var hojaQuirurgica_drenajes_edoConsciencia = caso.getText({ fieldId: 'custevent687' }) || '';
            var hojaQuirurgica_consentimientoFirmado_edoConsciencia = checado((caso.getValue({ fieldId: 'custevent663' })) ? 'SI' : 'NO');
            //var hojaQuirurgica_otros3_edoConsciencia = caso.getText({ fieldId: ''}) || '';
            // Signos Vitales Enfermería Quirúrgica
            var table_SignosVitales_Hora_td = null;
            var table_SignosVitales_FreCardiaca_td = null;
            var table_SignosVitales_SPO2_td = null;
            var table_SignosVitales_TAMMHG_td = null;
            var conteo_SignosVitalesEnfermeriaQuirurgica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord285' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SignosVitalesEnfermeriaQuirurgica_lines);
            if (conteo_SignosVitalesEnfermeriaQuirurgica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_SignosVitalesEnfermeriaQuirurgica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'background-color: #cadcff';
                    var table_SignosVitales_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord281', line: i }) || '';
                    var table_SignosVitales_FreCardiaca = caso.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord282', line: i }) || '';
                    var table_SignosVitales_SPO2 = caso.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord283', line: i }) || '';
                    var table_SignosVitales_TAMMHG = caso.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord284', line: i }) || '';
                    table_SignosVitales_Hora_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_Hora + '</td>';
                    table_SignosVitales_FreCardiaca_td += '<td align="center" style="border-left: 1px solid #346094;' + parImpar + '">' + table_SignosVitales_FreCardiaca + '</td>';
                    table_SignosVitales_SPO2_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_SPO2 + '</td>';
                    table_SignosVitales_TAMMHG_td += '<td align="center" style="border-left: 1px solid #346094;' + parImpar + '">' + table_SignosVitales_TAMMHG + '</td>';
                    contadorIndependiente++;
                }
            }
            // Grupo Anestesia
            var hojaQuirurgica_anestesiologo_anestesia = caso.getText({ fieldId: 'custevent688' }) || '';
            var hojaQuirurgica_anestesiologo_anestesia_label = caso.getField({ fieldId: 'custevent688' }).label;
            var hojaQuirurgica_anestesiologo_anestesia_cedula = obtenerCedula(hojaQuirurgica_anestesiologo_anestesia, 'c');
            var hojaQuirurgica_tipoAnestesia_anestesia = caso.getText({ fieldId: 'custevent689' }) || '';
            var hojaQuirurgica_tipoAnestesia_anestesia_label = caso.getField({ fieldId: 'custevent689' }).label;
            var hojaQuirurgica_horaInicio_anestesia = caso.getText({ fieldId: 'custevent690' }) || '';
            var hojaQuirurgica_horaInicio_anestesia_label = caso.getField({ fieldId: 'custevent690' }).label;
            var hojaQuirurgica_horaTermino_anestesia = caso.getText({ fieldId: 'custevent694' }) || '';
            var hojaQuirurgica_horaTermino_anestesia_label = caso.getField({ fieldId: 'custevent694' }).label;
            var hojaQuirurgica_intubacion_anestesia = caso.getText({ fieldId: 'custevent691' }) || '';
            var hojaQuirurgica_intubacion_anestesia_label = caso.getField({ fieldId: 'custevent691' }).label;
            var hojaQuirurgica_numTubos_anestesia = caso.getText({ fieldId: 'custevent692' }) || '';
            var hojaQuirurgica_numTubos_anestesia_label = caso.getField({ fieldId: 'custevent692' }).label;
            var hojaQuirurgica_medicaInduccion_anestesia = caso.getText({ fieldId: 'custevent693' }) || '';
            var hojaQuirurgica_medicaInduccion_anestesia_label = caso.getField({ fieldId: 'custevent693' }).label;
            // Grupo Asepsia y antisepsia
            var hojaQuirurgica_realizo_asepsia = caso.getText({ fieldId: 'custevent695' }) || '';
            var hojaQuirurgica_realizo_asepsia_label = caso.getField({ fieldId: 'custevent695' }).label;
            var hojaQuirurgica_region_asepsia = caso.getText({ fieldId: 'custevent696' }) || '';
            var hojaQuirurgica_region_asepsia_label = caso.getField({ fieldId: 'custevent696' }).label;
            var hojaQuirurgica_antiseptico_asepsia = caso.getText({ fieldId: 'custevent697' }) || '';
            var hojaQuirurgica_antiseptico_asepsia_label = caso.getField({ fieldId: 'custevent697' }).label;
            var hojaQuirurgica_observaciones_asepsia = caso.getText({ fieldId: 'custevent693' }) || '';
            var hojaQuirurgica_observaciones_asepsia_label = caso.getField({ fieldId: 'custevent693' }).label;
            // Grupo Cirugía
            var hojaQuirurgica_cirujano_cirugia = caso.getText({ fieldId: 'custevent699' }) || '';
            var hojaQuirurgica_cirujano_cirugia_label = caso.getField({ fieldId: 'custevent699' }).label;
            var hojaQuirurgica_cirujano_cirugia_cedula = obtenerCedula(hojaQuirurgica_cirujano_cirugia, 'c');
            var hojaQuirurgica_primerAyudante_cirugia = caso.getText({ fieldId: 'custevent700' }) || '';
            var hojaQuirurgica_primerAyudante_cirugia_label = caso.getField({ fieldId: 'custevent700' }).label;
            var hojaQuirurgica_primerAyudante_cirugia_cedula = obtenerCedula(hojaQuirurgica_primerAyudante_cirugia, 'c');
            var hojaQuirurgica_segundoAyudante_cirugia = caso.getText({ fieldId: 'custevent701' }) || '';
            var hojaQuirurgica_segundoAyudante_cirugia_label = caso.getField({ fieldId: 'custevent701' }).label;
            var hojaQuirurgica_segundoAyudante_cirugia_cedula = obtenerCedula(hojaQuirurgica_segundoAyudante_cirugia, 'c');
            var hojaQuirurgica_instrumentista_cirugia = caso.getText({ fieldId: 'custevent702' }) || '';
            var hojaQuirurgica_instrumentista_cirugia_label = caso.getField({ fieldId: 'custevent702' }).label;
            var hojaQuirurgica_instrumentista_cirugia_cedula = obtenerCedula(hojaQuirurgica_instrumentista_cirugia, 'c');
            var hojaQuirurgica_circulante_cirugia = caso.getText({ fieldId: 'custevent703' }) || '';
            var hojaQuirurgica_circulante_cirugia_label = caso.getField({ fieldId: 'custevent703' }).label;
            var hojaQuirurgica_circulante_cirugia_cedula = obtenerCedula(hojaQuirurgica_circulante_cirugia, 'c');
            var hojaQuirurgica_tiempoFuera_cirugia = caso.getText({ fieldId: 'custevent704' }) || '';
            var hojaQuirurgica_tiempoFuera_cirugia_label = caso.getField({ fieldId: 'custevent704' }).label;
            var hojaQuirurgica_horaInicioInfiltracion_cirugia = caso.getText({ fieldId: 'custevent705' }) || '';
            var hojaQuirurgica_horaInicioInfiltracion_cirugia_label = caso.getField({ fieldId: 'custevent705' }).label;
            var hojaQuirurgica_horaTerminoInfiltracion_cirugia = caso.getText({ fieldId: 'custevent706' }) || '';
            var hojaQuirurgica_horaTerminoInfiltracion_cirugia_label = caso.getField({ fieldId: 'custevent706' }).label;
            var hojaQuirurgica_horaInicioCirugia_cirugia = caso.getText({ fieldId: 'custevent707' }) || '';
            var hojaQuirurgica_horaInicioCirugia_cirugia_label = caso.getField({ fieldId: 'custevent707' }).label;
            var hojaQuirurgica_horaTerminoCirugia_cirugia = caso.getText({ fieldId: 'custevent708' }) || '';
            var hojaQuirurgica_horaTerminoCirugia_cirugia_label = caso.getField({ fieldId: 'custevent708' }).label;
            var hojaQuirurgica_cirugiaRealizada_cirugia = caso.getText({ fieldId: 'custevent709' }) || '';
            var hojaQuirurgica_cirugiaRealizada_cirugia_label = caso.getField({ fieldId: 'custevent709' }).label;
            // Grupo Conteo de gasas, material textil, instrumental y punzocortantes
            var hojaQuirurgica_gasas_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent710' })) ? 'SI' : 'NO');
            var hojaQuirurgica_gasas_materialesInstrumental_label = caso.getField({ fieldId: 'custevent710' }).label;
            var hojaQuirurgica_compresas_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent711' })) ? 'SI' : 'NO');
            var hojaQuirurgica_compresas_materialesInstrumental_label = caso.getField({ fieldId: 'custevent711' }).label;
            var hojaQuirurgica_cotonoides_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent712' })) ? 'SI' : 'NO');
            var hojaQuirurgica_cotonoides_materialesInstrumental_label = caso.getField({ fieldId: 'custevent712' }).label;
            var hojaQuirurgica_isopos_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent713' })) ? 'SI' : 'NO');
            var hojaQuirurgica_isopos_materialesInstrumental_label = caso.getField({ fieldId: 'custevent713' }).label;
            var hojaQuirurgica_agujasHipo_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent714' })) ? 'SI' : 'NO');
            var hojaQuirurgica_agujasHipo_materialesInstrumental_label = caso.getField({ fieldId: 'custevent714' }).label;
            var hojaQuirurgica_agujasSutu_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent715' })) ? 'SI' : 'NO');
            var hojaQuirurgica_agujasSutu_materialesInstrumental_label = caso.getField({ fieldId: 'custevent715' }).label;
            var hojaQuirurgica_hojasBisturi_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent716' })) ? 'SI' : 'NO');
            var hojaQuirurgica_hojasBisturi_materialesInstrumental_label = caso.getField({ fieldId: 'custevent716' }).label;
            var hojaQuirurgica_instrumental_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent717' })) ? 'SI' : 'NO');
            var hojaQuirurgica_instrumental_materialesInstrumental_label = caso.getField({ fieldId: 'custevent717' }).label;
            var hojaQuirurgica_otros_materialesInstrumental = checado((caso.getValue({ fieldId: 'custevent718' })) ? 'SI' : 'NO');
            var hojaQuirurgica_otros_materialesInstrumental_label = caso.getField({ fieldId: 'custevent718' }).label;
            // Grupo Medicación
            var table_Medicacion_EnfermeriaQuirurgica = null;
            var conteo_MedicacionEnfermeriaQuirurgica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord256' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_MedicacionEnfermeriaQuirurgica_lines);
            if (conteo_MedicacionEnfermeriaQuirurgica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_MedicacionEnfermeriaQuirurgica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Medicacion_EnfermeriaQuirurgica_Farmaco = caso.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord251', line: i }) || '';
                    var table_Medicacion_EnfermeriaQuirurgica_Dosis = caso.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord252', line: i }) || '';
                    var table_Medicacion_EnfermeriaQuirurgica_Via = caso.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord253', line: i }) || '';
                    var table_Medicacion_EnfermeriaQuirurgica_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord254', line: i }) || '';
                    var table_Medicacion_EnfermeriaQuirurgica_Administro = caso.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord255', line: i }) || '';
                    if (table_Medicacion_EnfermeriaQuirurgica_Farmaco != '' || table_Medicacion_EnfermeriaQuirurgica_Dosis != '' || table_Medicacion_EnfermeriaQuirurgica_Via != '' || table_Medicacion_EnfermeriaQuirurgica_Hora != '' || table_Medicacion_EnfermeriaQuirurgica_Administro != '') {
                        table_Medicacion_EnfermeriaQuirurgica += '<tr ' + parImpar + '>';
                        table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Farmaco + '</td>';
                        table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Dosis + '</td>';
                        table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Via + '</td>';
                        table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Hora + '</td>';
                        table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Administro + '</td>';
                        table_Medicacion_EnfermeriaQuirurgica += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Soluciones Intravenosas
            var table_SolsIntravenosas_EnfermeriaQuirurgica = null;
            var conteo_SolsIntravenosasEnfermeriaQuirurgica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord261' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SolsIntravenosasEnfermeriaQuirurgica_lines);
            if (conteo_SolsIntravenosasEnfermeriaQuirurgica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_SolsIntravenosasEnfermeriaQuirurgica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_SolsIntravenosas_Solucion = caso.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord257', line: i }) || '';
                    var table_SolsIntravenosas_Volumne = caso.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord258', line: i }) || '';
                    var table_SolsIntravenosas_HoraInicio = caso.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord259', line: i }) || '';
                    var table_SolsIntravenosas_Praparada = caso.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord260', line: i }) || '';
                    if (table_SolsIntravenosas_Solucion != '' || table_SolsIntravenosas_Volumne != '' || table_SolsIntravenosas_HoraInicio != '' || table_SolsIntravenosas_Praparada != '') {
                        table_SolsIntravenosas_EnfermeriaQuirurgica += '<tr ' + parImpar + '>';
                        table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_Solucion + '</td>';
                        table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_Volumne + '</td>';
                        table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_HoraInicio + '</td>';
                        table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_Praparada + '</td>';
                        table_SolsIntravenosas_EnfermeriaQuirurgica += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Catéteres, Sondas y Drenajes
            var table_CatSonDren_EnfermeriaQuirurgica = null;
            var conteo_CatSonDrenEnfermeriaQuirurgica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord427' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_CatSonDrenEnfermeriaQuirurgica_lines);
            if (conteo_CatSonDrenEnfermeriaQuirurgica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_CatSonDrenEnfermeriaQuirurgica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_CatSonDren_Tipo = caso.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord428', line: i }) || '';
                    var table_CatSonDren_SitioIserc = caso.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord429', line: i }) || '';
                    var table_CatSonDren_Instalado = caso.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord430', line: i }) || '';
                    if (table_CatSonDren_Tipo != '' || table_CatSonDren_SitioIserc != '' || table_CatSonDren_Instalado != '') {
                        table_CatSonDren_EnfermeriaQuirurgica += '<tr ' + parImpar + '>';
                        table_CatSonDren_EnfermeriaQuirurgica += '<td align="center">' + table_CatSonDren_Tipo + '</td>';
                        table_CatSonDren_EnfermeriaQuirurgica += '<td align="center">' + table_CatSonDren_SitioIserc + '</td>';
                        table_CatSonDren_EnfermeriaQuirurgica += '<td align="center">' + table_CatSonDren_Instalado + '</td>';
                        table_CatSonDren_EnfermeriaQuirurgica += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Equipo Biomédico Utilizado
            var hojaQuirurgica_equipoBiomedico = caso.getText({ fieldId: 'custevent719' }) || '';
            var hojaQuirurgica_equipoBiomedico_label = caso.getField({ fieldId: 'custevent719' }).label;
            // Grupo Implantes e insumos extras
            var hojaQuirurgica_implantesInsumos = caso.getText({ fieldId: 'custevent720' }) || '';
            var hojaQuirurgica_implantesInsumos_label = caso.getField({ fieldId: 'custevent720' }).label;
            // Grupo Observaciones
            var hojaQuirurgica_observaciones = caso.getText({ fieldId: 'custevent721' }) || '';
            var hojaQuirurgica_observaciones_label = caso.getField({ fieldId: 'custevent721' }).label;

            // TAB NOTA POST QUIRÚRGICA
            // Grupo Datos Generales
            var notaPostQuirurgica_cirujano_datosGenerales = caso.getText({ fieldId: 'custevent655' }) || '';
            var notaPostQuirurgica_cirujano_datosGenerales_label = caso.getField({ fieldId: 'custevent655' }).label;
            var notaPostQuirurgica_cirujano_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_cirujano_datosGenerales, 'c');
            var notaPostQuirurgica_primerAyudante_datosGenerales = caso.getText({ fieldId: 'custevent656' }) || '';
            var notaPostQuirurgica_primerAyudante_datosGenerales_label = caso.getField({ fieldId: 'custevent656' }).label;
            var notaPostQuirurgica_primerAyudante_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_primerAyudante_datosGenerales, 'c');
            var notaPostQuirurgica_segundoAyudante_datosGenerales = caso.getText({ fieldId: 'custevent657' }) || '';
            var notaPostQuirurgica_segundoAyudante_datosGenerales_label = caso.getField({ fieldId: 'custevent657' }).label;
            var notaPostQuirurgica_segundoAyudante_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_segundoAyudante_datosGenerales, 'c');
            var notaPostQuirurgica_anestesiologo_datosGenerales = caso.getText({ fieldId: 'custevent658' }) || '';
            var notaPostQuirurgica_anestesiologo_datosGenerales_label = caso.getField({ fieldId: 'custevent658' }).label;
            var notaPostQuirurgica_anestesiologo_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_anestesiologo_datosGenerales, 'c');
            var notaPostQuirurgica_instrumentista_datosGenerales = caso.getText({ fieldId: 'custevent659' }) || '';
            var notaPostQuirurgica_instrumentista_datosGenerales_label = caso.getField({ fieldId: 'custevent659' }).label;
            var notaPostQuirurgica_instrumentista_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_instrumentista_datosGenerales, 'c');
            var notaPostQuirurgica_circulante_datosGenerales = caso.getText({ fieldId: 'custevent660' }) || '';
            var notaPostQuirurgica_circulante_datosGenerales_label = caso.getField({ fieldId: 'custevent660' }).label;
            var notaPostQuirurgica_circulante_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_circulante_datosGenerales, 'c');

            var notaPostQuirurgica_dxPreOperatorio_datosGenerales = caso.getText({ fieldId: 'custevent661' }) || '';
            var notaPostQuirurgica_dxPreOperatorio_datosGenerales_label = caso.getField({ fieldId: 'custevent661' }).label;
            var notaPostQuirurgica_dxPostOperatorio_datosGenerales = caso.getText({ fieldId: 'custevent576' }) || '';
            var notaPostQuirurgica_dxPostOperatorio_datosGenerales_label = caso.getField({ fieldId: 'custevent576' }).label;
            var notaPostQuirurgica_anestesiaAplicada_datosGenerales = caso.getText({ fieldId: 'custevent577' }) || '';
            var notaPostQuirurgica_anestesiaAplicada_datosGenerales_label = caso.getField({ fieldId: 'custevent577' }).label;
            //var notaPostQuirurgica_cirujano_cedula = 'PruebaCedula';
            //var notaPostQuirurgica_primerAyudante_cedula = 'PruebaCedula';
            //var notaPostQuirurgica_segundoAyudante_cedula = 'PruebaCedula';
            //var notaPostQuirurgica_anestesiologo_cedula = 'PruebaCedula';
            //var notaPostQuirurgica_instrumentista_cedula = 'PruebaCedula';
            //var notaPostQuirurgica_circulante_cedula = 'PruebaCedula';
            // Grupo Nota Médica
            var notaPostQuirurgica_nota_notaMedica = caso.getText({ fieldId: 'custevent662' }) || '';
            var notaPostQuirurgica_nota_notaMedica_label = caso.getField({ fieldId: 'custevent662' }).label;


            // TAB INDICACIONES MEDICAS
            // Grupo Indicaciones Médicas
            var table_Indicaciones_IndicacionesMedicas = null;
            var conteo_IndicacionesIndicacionesMedicas_lines = caso.getLineCount({ sublistId: 'recmachcustrecord356' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_IndicacionesIndicacionesMedicas_lines);
            if (conteo_IndicacionesIndicacionesMedicas_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_IndicacionesIndicacionesMedicas_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Indicaciones_Fecha = caso.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord353', line: i }) || '';
                    var table_Indicaciones_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord437', line: i }) || '';
                    var table_Indicaciones_Indicaciones = caso.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord355', line: i }) || '';
                    if (table_Indicaciones_Fecha != '' || table_Indicaciones_Hora != '' || table_Indicaciones_Indicaciones != '') {
                        table_Indicaciones_IndicacionesMedicas += '<tr ' + parImpar + '>';
                        table_Indicaciones_IndicacionesMedicas += '<td align="center" style="border-left:1px solid #346094">' + table_Indicaciones_Fecha + '</td>';
                        table_Indicaciones_IndicacionesMedicas += '<td align="center" style="border-left:1px solid #346094">' + table_Indicaciones_Hora + '</td>';
                        table_Indicaciones_IndicacionesMedicas += '<td align="center" style="border-left:1px solid #346094">' + table_Indicaciones_Indicaciones + '</td>';
                        table_Indicaciones_IndicacionesMedicas += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }


            // TAB NOTAS DE EVOLUCION
            // Grupo Evolucion Médicas
            var table_Evolucion_EvolucionMedica = null;
            var conteo_EvolucionEvolucionMedica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord356' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_EvolucionEvolucionMedica_lines);
            if (conteo_EvolucionEvolucionMedica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_EvolucionEvolucionMedica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Evolucion_Fecha = caso.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord353', line: i }) || '';
                    var table_Evolucion_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord354', line: i }) || '';
                    var table_Evolucion_Evolucion = caso.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord355', line: i }) || '';
                    if (table_Evolucion_Fecha != '' || table_Evolucion_Hora != '' || table_Evolucion_Evolucion != '') {
                        table_Evolucion_EvolucionMedica += '<tr ' + parImpar + '>';
                        table_Evolucion_EvolucionMedica += '<td align="center">' + table_Evolucion_Fecha + '</td>';
                        table_Evolucion_EvolucionMedica += '<td align="center">' + table_Evolucion_Hora + '</td>';
                        table_Evolucion_EvolucionMedica += '<td align="center">' + table_Evolucion_Evolucion + '</td>';
                        table_Evolucion_EvolucionMedica += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }


            // TAB NOTAS DE RECUPERACION
            // Grupo Signos Vitales Recuperación
            var table_SignosVitales_Recuperacion_Hora_td = null;
            var table_SignosVitales_Recuperacion_FC_td = null;
            var table_SignosVitales_Recuperacion_SPO2_td = null;
            var table_SignosVitales_Recuperacion_TAMMHG_td = null;
            var conteo_SignosVitalesEnfermeriaQuirurgica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord416' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SignosVitalesEnfermeriaQuirurgica_lines);
            if (conteo_SignosVitalesEnfermeriaQuirurgica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_SignosVitalesEnfermeriaQuirurgica_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'background-color: #cadcff';

                    var table_SignosVitales_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord417', line: i }) || '';
                    var table_SignosVitales_FC = caso.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord418', line: i }) || '';
                    var table_SignosVitales_TAMMHG = caso.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord419', line: i }) || '';
                    var table_SignosVitales_SPO2 = caso.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord420', line: i }) || '';

                    table_SignosVitales_Recuperacion_Hora_td += '<td align="center" style="background-color: #cadcff">' + table_SignosVitales_Hora + '</td>';
                    table_SignosVitales_Recuperacion_FC_td += '<td align="center">' + table_SignosVitales_FC + '</td>';
                    table_SignosVitales_Recuperacion_SPO2_td += '<td align="center" style="background-color: #cadcff">' + table_SignosVitales_SPO2 + '</td>';
                    table_SignosVitales_Recuperacion_TAMMHG_td += '<td align="center">' + table_SignosVitales_TAMMHG + '</td>';
                    contadorIndependiente++;
                }
            }
            // Grupo Terapia Intravenosa y Solcuiones
            var table_TerapiaIntravenosa_NotasRecuperacion = null;
            var conteo_TerapiaIntravenosaNotasRecuperacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord273' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_TerapiaIntravenosaNotasRecuperacion_lines);
            if (conteo_TerapiaIntravenosaNotasRecuperacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_TerapiaIntravenosaNotasRecuperacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_TerapiaIntravenosa_Solucion = caso.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord266', line: i }) || '';
                    var table_TerapiaIntravenosa_Horas = caso.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord267', line: i }) || '';
                    var table_TerapiaIntravenosa_MLH = caso.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord268', line: i }) || '';
                    var table_TerapiaIntravenosa_Inicia = caso.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord269', line: i }) || '';
                    var table_TerapiaIntravenosa_Termina = caso.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord270', line: i }) || '';
                    var table_TerapiaIntravenosa_Preparo = caso.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord271', line: i }) || '';
                    if (table_TerapiaIntravenosa_Solucion != '' || table_TerapiaIntravenosa_Horas != '' || table_TerapiaIntravenosa_MLH != '' || table_TerapiaIntravenosa_Inicia != '' || table_TerapiaIntravenosa_Termina != '' || table_TerapiaIntravenosa_Preparo != '') {
                        table_TerapiaIntravenosa_NotasRecuperacion += '<tr ' + parImpar + '>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Solucion + '</td>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Horas + '</td>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_MLH + '</td>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Inicia + '</td>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Termina + '</td>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Preparo + '</td>';
                        table_TerapiaIntravenosa_NotasRecuperacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Catéteres, sondas y drenajes
            var table_CatSonDren_NotasRecuperacion = null;
            var conteo_CatSonDrenNotasRecuperacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord265' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_CatSonDrenNotasRecuperacion_lines);
            if (conteo_CatSonDrenNotasRecuperacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_CatSonDrenNotasRecuperacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_CatSonDren_NotasRecuperacion_Tipo = caso.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord262', line: i }) || '';
                    var table_CatSonDren_NotasRecuperacion_SitioInserc = caso.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord263', line: i }) || '';
                    var table_CatSonDren_NotasRecuperacion_FechaInsta = caso.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord272', line: i }) || '';
                    var table_CatSonDren_NotasRecuperacion_Instalado = caso.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord264', line: i }) || '';
                    if (table_CatSonDren_NotasRecuperacion_Tipo != '' || table_CatSonDren_NotasRecuperacion_SitioInserc != '' || table_CatSonDren_NotasRecuperacion_FechaInsta != '' || table_CatSonDren_NotasRecuperacion_Instalado != '') {
                        table_CatSonDren_NotasRecuperacion += '<tr ' + parImpar + '>';
                        table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_Tipo + '</td>';
                        table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_SitioInserc + '</td>';
                        table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_FechaInsta + '</td>';
                        table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_Instalado + '</td>';
                        table_CatSonDren_NotasRecuperacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Medicación
            var table_Medicacion_NotasRecuperacion = null;
            var conteo_MedicacionNotasRecuperacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord280' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_MedicacionNotasRecuperacion_lines);
            if (conteo_MedicacionNotasRecuperacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_MedicacionNotasRecuperacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Medicacion_NotasRecuperacion_Farmaco = caso.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord274', line: i }) || '';
                    var table_Medicacion_NotasRecuperacion_Dosis = caso.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord275', line: i }) || '';
                    var table_Medicacion_NotasRecuperacion_Via = caso.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord276', line: i }) || '';
                    var table_Medicacion_NotasRecuperacion_Presentacion = caso.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord277', line: i }) || '';
                    var table_Medicacion_NotasRecuperacion_Horario = caso.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord278', line: i }) || '';
                    var table_Medicacion_NotasRecuperacion_Administro = caso.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord279', line: i }) || '';
                    if (table_Medicacion_NotasRecuperacion_Farmaco != '' || table_Medicacion_NotasRecuperacion_Dosis != '' || table_Medicacion_NotasRecuperacion_Via != '' || table_Medicacion_NotasRecuperacion_Presentacion != '' || table_Medicacion_NotasRecuperacion_Horario != '' || table_Medicacion_NotasRecuperacion_Administro != '') {
                        table_Medicacion_NotasRecuperacion += '<tr ' + parImpar + '>';
                        table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Farmaco + '</td>';
                        table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Dosis + '</td>';
                        table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Via + '</td>';
                        table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Presentacion + '</td>';
                        table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Horario + '</td>';
                        table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Administro + '</td>';
                        table_Medicacion_NotasRecuperacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Condiciones de la herida quirúrgica
            var notasRecuperacion_condicionesHerida = caso.getText({ fieldId: 'custevent794' }) || '';
            var notasRecuperacion_condicionesHerida_label = caso.getField({ fieldId: 'custevent794' }).label;
            // Grupo Notas de Enfermería
            var notasRecuperacion_notasEnfermeria = caso.getText({ fieldId: 'custevent795' }) || '';
            var notasRecuperacion_notasEnfermeria_label = caso.getField({ fieldId: 'custevent795' }).label;
            // Grupo Evolución
            var table_Evolucion_NotasRecuperacion = null;
            var table_Evolucion_NotasRecuperacion_TotalPuntaje = 0;
            var table_Evolucion_NotasRecuperacion_TotalIngreso = 0;
            var table_Evolucion_NotasRecuperacion_TotalAlta = 0;
            var conteo_EvolucionNotasRecuperacion_lineas = caso.getLineCount({ sublistId: 'recmachcustrecord421' });
            ////log.debug('Tipo Objeto 8. Evolucion Nota de Recuperación', conteo_EvolucionNotasRecuperacion_lineas);
            if (conteo_EvolucionNotasRecuperacion_lineas > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_EvolucionNotasRecuperacion_lineas; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Evolucion_NotasRecuperacion_EscalaAldrete1 = caso.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord422', line: i }) || '';
                    var table_Evolucion_NotasRecuperacion_EscalaAldrete2 = caso.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord423', line: i }) || '';
                    var table_Evolucion_NotasRecuperacion_Puntaje = caso.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord424', line: i }) || '';
                    var table_Evolucion_NotasRecuperacion_Ingreso = caso.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord425', line: i }) || '';
                    var table_Evolucion_NotasRecuperacion_Alta = caso.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord426', line: i }) || '';
                    table_Evolucion_NotasRecuperacion_TotalPuntaje += parseInt(table_Evolucion_NotasRecuperacion_Puntaje);
                    table_Evolucion_NotasRecuperacion_TotalIngreso += parseInt(table_Evolucion_NotasRecuperacion_Ingreso);
                    table_Evolucion_NotasRecuperacion_TotalAlta += parseInt(table_Evolucion_NotasRecuperacion_Alta);
                    if (table_Evolucion_NotasRecuperacion_EscalaAldrete1 != '' || table_Evolucion_NotasRecuperacion_EscalaAldrete2 != '' || table_Evolucion_NotasRecuperacion_Puntaje != '' || table_Evolucion_NotasRecuperacion_Ingreso != '' || table_Evolucion_NotasRecuperacion_Alta != '') {
                        table_Evolucion_NotasRecuperacion += '<tr ' + parImpar + '>';
                        table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_EscalaAldrete1 + '</td>';
                        table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_EscalaAldrete2 + '</td>';
                        table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_Puntaje + '</td>';
                        table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_Ingreso + '</td>';
                        table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_Alta + '</td>';
                        table_Evolucion_NotasRecuperacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Responsable Enfermería
            var notaRecuperacion_Enfermeria_Responsable = 'PruebaResponsable';
            var notaRecupreacion_Enfermeria_Firma = 'FirmaResponsable';

            // TAB HOJA DE HOSPITALIZACION
            // Grupo Signos Vitales Hospitalización
            var table_SignosVitales_Hospitalizacion_Hora_td = null;
            var table_SignosVitales_Hospitalizacion_FC_td = null;
            var table_SignosVitales_Hospitalizacion_TC_td = null;
            var table_SignosVitales_Hospitalizacion_TAMMHG_td = null;
            var table_SignosVitales_Hospitalizacion_SPO2_td = null;
            var table_SignosVitales_Hospitalizacion_EscalaDolor_td = null;
            var table_SignosVitales_Hospitalizacion_FR_td = null;
            var conteo_SignosVitalesEnfermeriaQuirurgica_lines = caso.getLineCount({ sublistId: 'recmachcustrecord311' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SignosVitalesEnfermeriaQuirurgica_lines);
            if (conteo_SignosVitalesEnfermeriaQuirurgica_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_SignosVitalesEnfermeriaQuirurgica_lines; i++) {
                    parImpar = ((i + 1) % 2) ? '' : 'background-color: #cadcff';
                    var table_SignosVitales_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord409', line: i }) || '';
                    var table_SignosVitales_FC = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord410', line: i }) || '';
                    var table_SignosVitales_TC = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord411', line: i }) || '';
                    var table_SignosVitales_TAMMHG = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord412', line: i }) || '';
                    var table_SignosVitales_SPO2 = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord413', line: i }) || '';
                    var table_SignosVitales_EscalaDolor = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord414', line: i }) || '';
                    var table_SignosVitales_FR = caso.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord415', line: i }) || '';
                    table_SignosVitales_Hospitalizacion_Hora_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_Hora + '</td>';
                    table_SignosVitales_Hospitalizacion_FC_td += '<td align="center" style="border-left: 1px solid #346094;background-color: #cadcff;">' + table_SignosVitales_FC + '</td>';
                    table_SignosVitales_Hospitalizacion_TC_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_TC + '</td>';
                    table_SignosVitales_Hospitalizacion_TAMMHG_td += '<td align="center" style="border-left: 1px solid #346094;background-color:#cadcff;">' + table_SignosVitales_TAMMHG + '</td>';
                    table_SignosVitales_Hospitalizacion_SPO2_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_SPO2 + '</td>';
                    table_SignosVitales_Hospitalizacion_EscalaDolor_td += '<td align="center" style="border-left: 1px solid #346094;background-color: #cadcff;">' + table_SignosVitales_EscalaDolor + '</td>';
                    table_SignosVitales_Hospitalizacion_FR_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_FR + '</td>';
                    contadorIndependiente++;
                }
            }
            // Grupo Medicación
            var table_Medicacion_Hospitalizacion = null;
            var conteo_MedicacionHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord317' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_MedicacionHospitalizacion_lines);
            if (conteo_MedicacionHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_MedicacionHospitalizacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Medicacion_Hospitalizacion_Medicamento = caso.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord312', line: i }) || '';
                    var table_Medicacion_Hospitalizacion_Dosis = caso.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord313', line: i }) || '';
                    var table_Medicacion_Hospitalizacion_Frecuencia = caso.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord314', line: i }) || '';
                    var table_Medicacion_Hospitalizacion_Via = caso.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord315', line: i }) || '';
                    var table_Medicacion_Hospitalizacion_Horario = caso.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord316', line: i }) || '';
                    if (table_Medicacion_Hospitalizacion_Medicamento != '' || table_Medicacion_Hospitalizacion_Dosis != '' || table_Medicacion_Hospitalizacion_Frecuencia != '' || table_Medicacion_Hospitalizacion_Via != '' || table_Medicacion_Hospitalizacion_Horario != '') {
                        table_Medicacion_Hospitalizacion += '<tr ' + parImpar + '>';
                        table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Medicamento + '</td>';
                        table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Dosis + '</td>';
                        table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Frecuencia + '</td>';
                        table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Via + '</td>';
                        table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Horario + '</td>';
                        table_Medicacion_Hospitalizacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Soluciones
            var table_Soluciones_Hospitalizacion = null;
            var conteo_SolucionesHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord325' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SolucionesHospitalizacion_lines);
            if (conteo_SolucionesHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_SolucionesHospitalizacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Soluciones_Hospitalizacion_No = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord318', line: i }) || 0;
                    var table_Soluciones_Hospitalizacion_Soluciones = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord319', line: i }) || '';
                    var table_Soluciones_Hospitalizacion_Duracion = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord320', line: i }) || '';
                    var table_Soluciones_Hospitalizacion_Inicio = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord321', line: i }) || '';
                    var table_Soluciones_Hospitalizacion_Termino = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord322', line: i }) || '';
                    var table_Soluciones_Hospitalizacion_MLHORA = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord323', line: i }) || '';
                    var table_Soluciones_Hospitalizacion_FXP = caso.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord324', line: i }) || '';
                    if (table_Soluciones_Hospitalizacion_No != '' || table_Soluciones_Hospitalizacion_Soluciones != '' || table_Soluciones_Hospitalizacion_Duracion != '' || table_Soluciones_Hospitalizacion_Inicio != '' || table_Soluciones_Hospitalizacion_Termino != '' || table_Soluciones_Hospitalizacion_MLHORA != '' || table_Soluciones_Hospitalizacion_FXP != '') {
                        table_Soluciones_Hospitalizacion += '<tr ' + parImpar + '>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_No + '</td>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Soluciones + '</td>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Duracion + '</td>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Inicio + '</td>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Termino + '</td>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_MLHORA + '</td>';
                        table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_FXP + '</td>';
                        table_Soluciones_Hospitalizacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Catéteres, Sondas y Drenajes
            var table_CatSonDren_Hospitalizacion = null;
            var conteo_CatSonDrenHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord330' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_CatSonDrenHospitalizacion_lines);
            if (conteo_CatSonDrenHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_CatSonDrenHospitalizacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_CatSonDren_Hospitalizacion_Dispositivo = caso.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord326', line: i }) || '';
                    var table_CatSonDren_Hospitalizacion_Calibre = caso.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord327', line: i }) || '';
                    var table_CatSonDren_Hospitalizacion_Insercion = caso.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord328', line: i }) || '';
                    var table_CatSonDren_Hospitalizacion_Instalacion = caso.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord329', line: i }) || '';
                    if (table_CatSonDren_Hospitalizacion_Dispositivo != '' || table_CatSonDren_Hospitalizacion_Calibre != '' || table_CatSonDren_Hospitalizacion_Insercion != '' || table_CatSonDren_Hospitalizacion_Instalacion != '') {
                        table_CatSonDren_Hospitalizacion += '<tr ' + parImpar + '>';
                        table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Dispositivo + '</td>';
                        table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Calibre + '</td>';
                        table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Insercion + '</td>';
                        table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Instalacion + '</td>';
                        table_CatSonDren_Hospitalizacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Valoración Riesgos de Caidas
            var table_Riesgos_Hospitalizacion = null;
            var table_Riesgos_Hospitalizacion_TotalPuntaje = 0;
            var table_Riesgos_Hospitalizacion_TotalTM = 0;
            var table_Riesgos_Hospitalizacion_TotalTV = 0;
            var table_Riesgos_Hospitalizacion_TotalTN = 0;
            var conteo_RiesgosHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord337' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_RiesgosHospitalizacion_lines);
            if (conteo_RiesgosHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_RiesgosHospitalizacion_lines; i++) {
                    parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Riesgos_Hospitalizacion_Criterio = caso.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord331', line: i }) || '';
                    var table_Riesgos_Hospitalizacion_Variable = caso.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord332', line: i }) || '';
                    var table_Riesgos_Hospitalizacion_Puntaje = caso.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord333', line: i }) || 0;
                    var table_Riesgos_Hospitalizacion_TM = caso.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord334', line: i }) || '';
                    var table_Riesgos_Hospitalizacion_TV = caso.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord335', line: i }) || '';
                    var table_Riesgos_Hospitalizacion_TN = caso.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord336', line: i }) || '';
                    table_Riesgos_Hospitalizacion_TotalPuntaje += parseInt(table_Riesgos_Hospitalizacion_Puntaje);
                    table_Riesgos_Hospitalizacion_TotalTM += parseInt(table_Riesgos_Hospitalizacion_TM);
                    table_Riesgos_Hospitalizacion_TotalTV += parseInt(table_Riesgos_Hospitalizacion_TV);
                    table_Riesgos_Hospitalizacion_TotalTN += parseInt(table_Riesgos_Hospitalizacion_TN);
                    table_Riesgos_Hospitalizacion += '<tr ' + parImpar + '>';
                    table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_Criterio + '</td>';
                    table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_Variable + '</td>';
                    table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_Puntaje + '</td>';
                    table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_TM + '</td>';
                    table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_TV + '</td>';
                    table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_TN + '</td>';
                    table_Riesgos_Hospitalizacion += '</tr>';
                    contadorIndependiente++;
                }
            }
            // Grupo Valoración Riesgos de Caidas
            var table_Ulceras_Hospitalizacion = null;
            var table_Ulceras_Hospitalizacion_TotalPuntaje = 0;
            var table_Ulceras_Hospitalizacion_TotalTM = 0;
            var table_Ulceras_Hospitalizacion_TotalTV = 0;
            var table_Ulceras_Hospitalizacion_TotalTN = 0;
            var conteo_UlcerasHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord344' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_UlcerasHospitalizacion_lines);
            if (conteo_UlcerasHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_UlcerasHospitalizacion_lines; i++) {
                    parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Ulceras_Hospitalizacion_Criterio = caso.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord338', line: i }) || '';
                    var table_Ulceras_Hospitalizacion_Variable = caso.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord339', line: i }) || '';
                    var table_Ulceras_Hospitalizacion_Puntaje = caso.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord340', line: i }) || 0;
                    var table_Ulceras_Hospitalizacion_TM = caso.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord341', line: i }) || '';
                    var table_Ulceras_Hospitalizacion_TV = caso.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord342', line: i }) || '';
                    var table_Ulceras_Hospitalizacion_TN = caso.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord343', line: i }) || '';
                    table_Ulceras_Hospitalizacion_TotalPuntaje += parseInt(table_Ulceras_Hospitalizacion_Puntaje);
                    table_Ulceras_Hospitalizacion_TotalTM += parseInt(table_Ulceras_Hospitalizacion_TM);
                    table_Ulceras_Hospitalizacion_TotalTV += parseInt(table_Ulceras_Hospitalizacion_TV);
                    table_Ulceras_Hospitalizacion_TotalTN += parseInt(table_Ulceras_Hospitalizacion_TN);
                    table_Ulceras_Hospitalizacion += '<tr ' + parImpar + '>';
                    table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_Criterio + '</td>';
                    table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_Variable + '</td>';
                    table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_Puntaje + '</td>';
                    table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_TM + '</td>';
                    table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_TV + '</td>';
                    table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_TN + '</td>';
                    table_Ulceras_Hospitalizacion += '</tr>';
                    contadorIndependiente++;
                }
            }
            // Grupo Notas Enfermeria
            var table_NotasEnfermeria_Hospitalizacion = null;
            var conteo_NotasEnfermeriaHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord348' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_NotasEnfermeriaHospitalizacion_lines);
            if (conteo_NotasEnfermeriaHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_NotasEnfermeriaHospitalizacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_NotasEnfermeria_Hospitalizacion_Matutino = caso.getSublistText({ sublistId: 'recmachcustrecord348', fieldId: 'custrecord345', line: i }) || '';
                    var table_NotasEnfermeria_Hospitalizacion_Vespertino = caso.getSublistText({ sublistId: 'recmachcustrecord348', fieldId: 'custrecord346', line: i }) || '';
                    var table_NotasEnfermeria_Hospitalizacion_Nocturno = caso.getSublistText({ sublistId: 'recmachcustrecord348', fieldId: 'custrecord347', line: i }) || '';
                    if (table_NotasEnfermeria_Hospitalizacion_Matutino != '' || table_NotasEnfermeria_Hospitalizacion_Vespertino != '' || table_NotasEnfermeria_Hospitalizacion_Nocturno != '') {
                        table_NotasEnfermeria_Hospitalizacion += '<tr ' + parImpar + '>';
                        table_NotasEnfermeria_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_NotasEnfermeria_Hospitalizacion_Matutino + '</td>';
                        table_NotasEnfermeria_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_NotasEnfermeria_Hospitalizacion_Vespertino + '</td>';
                        table_NotasEnfermeria_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_NotasEnfermeria_Hospitalizacion_Nocturno + '</td>';
                        table_NotasEnfermeria_Hospitalizacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }
            // Grupo Intervenciones de Enfermería
            var table_Intervenciones_Hospitalizacion = null;
            var conteo_IntervencionesHospitalizacion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord352' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_IntervencionesHospitalizacion_lines);
            if (conteo_IntervencionesHospitalizacion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_IntervencionesHospitalizacion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_Intervenciones_Hospitalizacion_Matutino = caso.getSublistText({ sublistId: 'recmachcustrecord352', fieldId: 'custrecord349', line: i }) || '';
                    var table_Intervenciones_Hospitalizacion_Vespertino = caso.getSublistText({ sublistId: 'recmachcustrecord352', fieldId: 'custrecord350', line: i }) || '';
                    var table_Intervenciones_Hospitalizacion_Nocturno = caso.getSublistText({ sublistId: 'recmachcustrecord352', fieldId: 'custrecord351', line: i }) || '';
                    if (table_Intervenciones_Hospitalizacion_Matutino != '' || table_Intervenciones_Hospitalizacion_Vespertino != '' || table_Intervenciones_Hospitalizacion_Nocturno != '') {
                        table_Intervenciones_Hospitalizacion += '<tr ' + parImpar + '>';
                        table_Intervenciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Intervenciones_Hospitalizacion_Matutino + '</td>';
                        table_Intervenciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Intervenciones_Hospitalizacion_Vespertino + '</td>';
                        table_Intervenciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Intervenciones_Hospitalizacion_Nocturno + '</td>';
                        table_Intervenciones_Hospitalizacion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }

            // TAB INDICACIONES MEDICAS
            // Grupo Indicaciones Médicas
            var table_NotasEvolucion_NotaEvolucion = null;
            var conteo_NotasEvolucionNotaEvolucion_lines = caso.getLineCount({ sublistId: 'recmachcustrecord431' });
            //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_NotasEvolucionNotaEvolucion_lines);
            if (conteo_NotasEvolucionNotaEvolucion_lines > 0) {
                contadorIndependiente = 0;
                for (i = 0; i < conteo_NotasEvolucionNotaEvolucion_lines; i++) {
                    parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
                    var table_NotasEvolucion_NotaEvolucion_Fecha = caso.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord432', line: i }) || '';
                    var table_NotasEvolucion_NotaEvolucion_Hora = caso.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord433', line: i }) || '';
                    var table_NotasEvolucion_NotaEvolucion_Observaciones = caso.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord434', line: i }) || '';
                    if (table_Indicaciones_Fecha != '' || table_Indicaciones_Hora != '' || table_Indicaciones_Indicaciones != '') {
                        table_NotasEvolucion_NotaEvolucion += '<tr ' + parImpar + '>';
                        table_NotasEvolucion_NotaEvolucion += '<td align="center" style="border-left:1px solid #346094">' + table_NotasEvolucion_NotaEvolucion_Fecha + '</td>';
                        table_NotasEvolucion_NotaEvolucion += '<td align="center" style="border-left:1px solid #346094">' + table_NotasEvolucion_NotaEvolucion_Hora + '</td>';
                        table_NotasEvolucion_NotaEvolucion += '<td align="center" style="border-left:1px solid #346094">' + table_NotasEvolucion_NotaEvolucion_Observaciones + '</td>';
                        table_NotasEvolucion_NotaEvolucion += '</tr>';
                        contadorIndependiente++;
                    }
                }
            }


            //TAB NOTA EGRESO Y ALTA
            // Grupo nota de egreso y alta
            var egresoAlta_notaEgresoAlta_fechaEgreso = caso.getText({ fieldId: 'custevent570' }) || '';
            var egresoAlta_notaEgresoAlta_fechaEgreso_label = caso.getField({ fieldId: 'custevent570' }).label;
            var egresoAlta_notaEgresoAlta_diagnosticoEgreso = caso.getText({ fieldId: 'custevent573' }) || '';
            var egresoAlta_notaEgresoAlta_diagnosticoEgreso_label = caso.getField({ fieldId: 'custevent573' }).label;
            var egresoAlta_notaEgresoAlta_motivoEgreso = caso.getText({ fieldId: 'custevent574' }) || '';
            var egresoAlta_notaEgresoAlta_motivoEgreso_label = caso.getField({ fieldId: 'custevent574' }).label;
            var egresoAlta_notaEgresoAlta_signosVitalesEgreso = caso.getText({ fieldId: 'custevent571' }) || '';
            var egresoAlta_notaEgresoAlta_signosVitalesEgreso_label = caso.getField({ fieldId: 'custevent571' }).label;
            var egresoAlta_notaEgresoAlta_resumenEvolucion = caso.getText({ fieldId: 'custevent572' }) || '';
            var egresoAlta_notaEgresoAlta_resumenEvolucion_label = caso.getField({ fieldId: 'custevent572' }).label;
            var egresoAlta_notaEgresoAlta_planManejo = caso.getText({ fieldId: 'custevent575' }) || '';
            var egresoAlta_notaEgresoAlta_planManejo_label = caso.getField({ fieldId: 'custevent575' }).label;

            log.debug('Prueba Cedula', notaPostQuirurgica_primerAyudante_datosGenerales_cedula);

            // RECETA
            // VARIABLES PARA PDF DE RECETA PACIENTE
            /*             var medS = caso.getValue({ fieldId: 'custevent2' });
                        var form = caso.getValue({ fieldId: 'customform' });
                        var medicoReceta = caso.getValue({ fieldId: 'custevent202' });
                        var med1 = caso.getValue({ fieldId: 'custevent177' });
                        var med2 = caso.getValue({ fieldId: 'custevent178' });
                        var med3 = caso.getText({ fieldId: 'custevent179' });   
                        var ind1 = caso.getValue({ fieldId: 'custevent180' });
                        var ind2 = caso.getValue({ fieldId: 'custevent181' });
                        var ind3 = caso.getValue({ fieldId: 'custevent182' });
                        var ind5 = caso.getValue({ fieldId: 'custevent187' });
                        var ind6 = caso.getValue({ fieldId: 'custevent188' });
                        var ind7 = caso.getValue({ fieldId: 'custevent189' });
                        var ind8 = caso.getValue({ fieldId: 'custevent190' });
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
                            comentarios = false;
                        } */

            //CEDULAS MEDICOS Y ENFERMEROS
            /*             var recetaDoctor = record.load({ type: 'employee', id: medicoReceta }) || null;
                        if (recetaDoctor != null) {
                            var doctor = recetaDoctor.getValue({ fieldId: 'entityid' });
                            var cedula = recetaDoctor.getValue({ fieldId: 'custentity392' });
                            var inst = recetaDoctor.getValue({ fieldId: 'custentity393' });
                        } else {
                            var doctor = '';
                            var cedula = '';
                            var inst = '';
                        }
                        */

            // ZONA DE ENCABEZADOS
            // FICHA DE IDENTIFICACION
            var encabezados_fichaIdentificacion = '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 12px;font-weight:bold;color:#346094;">1. FICHA DE IDENTIFICACIÓN:</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;">' +
                '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + numeroExpediente + '</td><td><b>GÉNERO: </b> ' + sexoCliente + '</td></tr>' +
                '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
                '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
                '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
                '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            /*             var encabezados_recetasIdentificacion = '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                            '<tr><td><b>NOMBRE DEL PACIENTE: </b>' + nombreCliente + '</td><td align=\"left\"><b>DR.: </b>' + doctor + '</td></tr>' +
                            '<tr><td><b>EDAD: </b>' + edadCliente + '</td><td align=\"left\"><b>CÉDULA: </b>' + cedula + '</td></tr>' +
                            '<tr><td><b>FECHA DE EMISIÓN: </b>' + fechaCaso + '</td><td align=\"left\"><b>INSTITUCIÓN: </b>' + inst + '</td></tr>' +
                            '</table>'; */

            var stylesPDF = '<styles>' +
                'p { margin: 0; width:100%; border-bottom:1px solid #000000; }' +
                '#consentimiento { font-family: Aria, sans-serif; font-size: 11px; }' +
                '</styles>';

            /**
             * ************************ *
             *                          *
             * //FIXED: CONSENTIMIENTOS DE ALBYA *
             *                          *
             * ************************ *
             */

            var consentimiento_Liposuccion = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA LIPOSUCCIÓN</b></p>' +
                '<p id="consentimiento">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
                '<p id="consentimiento">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Liposucción</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p>' +
                '<p id="consentimiento"><b>¿En qué consiste el procedimiento?</b>  La Liposucción es un procedimiento encaminado a moldear el contorno corporal mediante la aspiración de grasa produciendo los probables siguientes beneficios:Mejorar el contorno corporal, el cual por razones personales el paciente considera inapropiado.Modificar los depósitos de grasa en las diferentes partes del cuerpo disminuyendo su volumen.La forma y el tamaño de los depósitos de grasa pueden influir tanto en el tratamiento recomendado como en el resultado final. Si no se tiene simetría o forma antes de la cirugía, es solo probable que se consiga una mejoría después del acto quirúrgico.Existen varios tipos de Liposucciones tales como la seca, húmeda, tumescente, con jeringa, con máquina, con láser o la ultrasónica.En forma conjunta con mi médico tratante y debido a su experiencia y mi conveniencia escogemos la técnica tumescente que significa la infiltración de una solución preparada con el beneficio de disminuir la cantidad de sangre que se aspira y mejorar el dolor postoperatorio.</p>' +
                '<p id="consentimiento"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en no tratar la laxitud de la cara y el cuello con Ritidectomía. Puede intentarse mejorar la laxitud cutánea, arrugas y depósitos grasos mediante otros tratamientos o cirugía, tales como peeling químico facial o la liposucción, sin embargo también existen riesgos y complicaciones potenciales asociados con las formas alternativas de tratamiento.</p>' +
                '<p id="consentimiento"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados a la liposucción. La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de los pacientes no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su cirujano plástico para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias de la liposucción.El paciente manifiesta que tomando en cuenta sus características personales, el médico le describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p>' +
                '<p id="consentimiento"><b>Hemorragia.</b> Es posible aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia postoperatoria, puede requerir tratamiento de emergencia para drenar la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o medicación antiinflamatoria desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de hemorragia.</p>' +
                '<p id="consentimiento"><b>Infección:</b> La infección es infrecuente tras este tipo de intervención. Si ocurre una infección, el tratamiento incluye el uso de antibióticos o cirugía adicional. Es extremadamente raro que pueda ocurrir una infección severa y producir infección bacteriana en otra parte del cuerpo.</p>' + saltoPagina() +
                '<p id="consentimiento"><b>Cambios en la sensibilidad de la piel:</b> Las zonas de liposucción están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad de la piel inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal. Ocasionalmente puede ocurrir una pérdida parcial o total de la sensibilidad de la piel aunque es muy raro.</p>' +
                '<p id="consentimiento"><b>Cicatriz cutánea:</b> La cicatrización excesiva (queloide) es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. El paciente podría necesitar cirugía adicional para tratar cicatrices anormales tras la cirugía o un tatuaje de la misma para igualar el color.</p>' +
                '<p id="consentimiento"><b>Retraso en la cicatrización:</b> Existe la posibilidad de una apertura (dehiscencia) de la herida o de una cicatrización retrasada. Algunas zonas pueden no curar normalmente y tardar un tiempo largo en cicatrizar. </p>' +
                '<p id="consentimiento"><b>Los fumadores</b> tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p>' +
                '<p id="consentimiento"><b>Trombolembolismo.</b> Aunque es muy raro que se presente, existe la posibilidad en que en algún momento durante o posterior a la cirugía se desprendan uno o varios pequeños trombos (coágulos) que alteren el funcionamiento de los pulmones o del cerebro por un mecanismo de obstrucción de la circulación normal produciéndose una embolia pulmonar o cerebral y casos muy raros producir la muerte. Si ocurre una embolia grasa o cualquier otra complicación pulmonar tras la liposucción el paciente podría necesitar tratamiento adicional incluyendo hospitalización.</p>' +
                '<p id="consentimiento"><b>Arrugas y pliegues en la piel:</b> Pueden existir pliegues visibles y palpables aunque es muy raro que suceda. Esto puede ser más pronunciado en pacientes con tipos de piel delgada y de mala calidad. el paciente podría necesitar tratamientos adicionales incluyendo cirugía para tratar irregularidades del contorno de la piel tras una liposucción.</p>' +
                '<p id="consentimiento"><b>Reacciones alérgicas.</b> En casos raros se han descrito alergias locales al esparadrapo, material de sutura o preparados tópicos. Pueden ocurrir en casos muy raros reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p>' +
                '<p id="consentimiento"><b>Anestesia.</b> Tanto la anestesia local como la anestesia general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p>' +
                '<p id="consentimiento"><b>Asimetría.</b> Puede no conseguirse un aspecto simétrico del cuerpo tras la liposucción. Factores como el tono de la piel, prominencias óseas, y tono muscular, pueden contribuir a una asimetría normal en los rasgos corporales. Usted puede estar insatisfecho con los resultados de la cirugía. Infrecuentemente se necesita realizar cirugía adicional para mejorar los resultados.</p>' +
                '<p id="consentimiento"><b>Shock quirúrgico.</b> En raras circunstancias, este procedimiento puede causar un trauma severo, particularmente cuando se succionan áreas múltiples o extensas en un mismo tiempo. Aunque son infrecuentes las complicaciones serias, infecciones o una excesiva pérdida de fluidos pueden llevar a un problema serio o incluso la muerte. Si ocurre el paciente podría necesitar hospitalización y tratamiento adicional.</p>' + saltoPagina() +
                '<p id="consentimiento"><b>Pérdida de piel.</b> La pérdida cutánea es rara tras una liposucción. El paciente podría necesitar tratamientos adicionales, incluyendo cirugía.</p>' +
                '<p id="consentimiento"><b>Efectos a largo plazo.</b> Pueden ocurrir alteraciones posteriores en el contorno corporal como resultado del envejecimiento, pérdida o ganancia de peso, embarazo u otras circunstancias no relacionadas con la liposucción.</p>' +
                '<p id="consentimiento"><b>Necesidad de cirugía adicional.</b> Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo del procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p>' +
                '<p id="consentimiento"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado:<ul><li id="consentimiento">Mejoramiento del contorno corporal.</li></ul></p>' +
                '<p id="consentimiento"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
                '<ul id="consentimiento"><li id="consentimiento">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Liposucción.</li>' +
                '<li id="consentimiento">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
                '<li id="consentimiento">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                '<li id="consentimiento">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                '<li id="consentimiento">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
                '<li id="consentimiento">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li></ul><br/><br/><br/>' +
                '<ul><li id="consentimiento">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li id="consentimiento">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
                '<li id="consentimiento">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
                '<li id="consentimiento">LOCALIZACIÓN DE LAS CICATRICES: Cicatrices muy pequeñas de 1 cm. y de 0,5 cm. en pliegues diversos según las zonas a tratar.</li>' +
                '</ul>' +
                '<p id="consentimiento"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';

            var consentimiento_Rinoseptoplastia = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA RINOSEPTOPLASTIA</b></p>' +
                '<p id="consentimiento">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
                '<p id="consentimiento">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Rinoseptoplastia</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p>' +
                '<p id="consentimiento"><b>¿En qué consiste el procedimiento?</b>  La Rinoseptoplastia es un procedimiento encaminado a mejorar el aspecto estético y funcional de la nariz produciendo los siguientes probables beneficios: Mejorar la forma y proporción de la nariz y de la cara, la cual por razones personales considera inapropiada.Las cirugías previas y los elementos anatómicos que se hubieran utilizado o modificado en ellas pueden influir tanto en el tratamiento recomendado como en el resultado final. Si no se tiene simetría o forma antes de la cirugía, es solo probable que se consiga una mejoría después.Existen varios tipos de Rinoseptoplastias, pero en general existen dos grandes grupos que consisten en las técnicas abiertas y las cerradas. En conjunto con mi médico tratante y debido a su experiencia y mi conveniencia escogemos la técnica</p>' +
                '<p id="consentimiento"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en colocar prótesis externas para mejorar la punta nasal, o rinomodelación con rellenos biocompatibles y temporales. Existen riesgos y complicaciones potenciales asociados con las formas alternativas de tratamiento.</p>' +
                '<p id="consentimiento"><b>RIESGOS DE LA CIRUGÍA DE RINOSEPTOPLASTIA.</b> El paciente manifiesta que tomando en cuenta sus características personales, el médico le describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p>' +
                '<p id="consentimiento"><b>Hemorragia:</b>  Es posible aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia postoperatoria, puede requerir tratamiento de emergencia para drenar la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o medicación antiinflamatoria desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de hemorragia.</p>' +
                '<p id="consentimiento"><b>Infección:</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p>' +
                '<p id="consentimiento"><b>Cambios en la sensibilidad de la piel:</b> La nariz y la mucosa nasal están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal. Ocasionalmente puede ocurrir una pérdida parcial o total de la sensibilidad de la piel aunque es muy raro.</p>' +
                '<p id="consentimiento"><b>Cicatriz cutánea:</b> La cicatrización excesiva (queloide) es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden retraerse y deformar la mucosa nasal. En este caso no existirán cicatrices externas.</p>' + saltoPagina() + 
                '<p id="consentimiento"><b>Retraso en la cicatrización:</b> existe la posibilidad de una apertura (dehiscencia) de la herida o de una cicatrización retrasada. Algunas zonas pueden no curar normalmente y tardar un tiempo largo en cicatrizar.</p>' +
                '<p id="consentimiento"><b>Los fumadores</b> tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p>' +
                '<p id="consentimiento"><b>Arrugas y pliegues en la piel:</b> Pueden existir pliegues en la piel visibles y palpables aunque es muy raro que esto suceda. Esto puede ser más pronunciado en pacientes con tipos de piel delgada y de mala calidad.</p>' +
                '<p id="consentimiento"><b>Actividades y ocupaciones poco frecuentes:</b> Estas actividades y ocupaciones pueden implicar un riesgo en la evolución normal de la cirugía.</p>' +
                '<p id="consentimiento"><b>Reacciones alérgicas:</b> En casos raros se han descrito alergias locales al esparadrapo, material de sutura o preparados tópicos. Pueden ocurrir en casos muy raros reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p>' +
                '<p id="consentimiento"><b>Anestesia:</b> Tanto la anestesia local como la anestesia general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p>' +
                '<p id="consentimiento"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado.<ul><li id="consentimiento">Mejoramiento de la forma y proporción de la nariz y de la cara.</li>' +
                '<li id="consentimiento">Mejoramiento de la capacidad ventilatoria.</li></ul></p>' +
                '<p id="consentimiento"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
                '<ul id="consentimiento"><li id="consentimiento">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Rinoseptoplastia.</li>' +
                '<li id="consentimiento">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
                '<li id="consentimiento">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                '<li id="consentimiento">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                '<li id="consentimiento">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li></ul><br/><br/><br/><br/><br/>' +
                '<ul><li id="consentimiento">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
                '<li id="consentimiento">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li id="consentimiento">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
                '<li id="consentimiento">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
                '<li id="consentimiento">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido.</li>' +
                '</ul>' +
                '<p id="consentimiento">El paciente manifiesta que se le ha informado que existen muchas condiciones variables que pueden influenciar los resultados a largo plazo de la RINOSEPTOPLASTIA y, que podría  ser necesaria una cirugía secundaria para realizar una corrección adicional. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que puedan obtenerse.</p>' + saltoPagina() +
                '<p id="consentimiento"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';

            var consentimiento_MamoplastiaAumentoImplantes = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA MAMOPLASTIA DE AUMENTO CON IMPLANTES</b></p>' +
                '<p id="consentimiento">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
                '<p id="consentimiento">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Mampolastia de aumento con implantes</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p>' +
                '<p id="consentimiento"><b>¿En qué consiste el procedimiento?</b>  La mamoplastia de aumento es una operación quirúrgica destinada a aumentar el tamaño de las mamas, por una serie de motivos:Para mejorar el contorno corporal de la mujer, la cual por razones personales considera demasiado pequeño el tamaño de su pecho.Para corregir una pérdida en el volumen mamario después de un embarazo.Para equilibrar el tamaño de las mamas, cuando existe una diferencia significativa entre ellas.Como técnica reconstructiva en determinadas situaciones.La forma y el tamaño de las mamas previas a la cirugía pueden influir tanto en el tratamiento recomendado como en el resultado final. Si las mamas no tienen el mismo tamaño o forma antes de la cirugía, es poco probable que sean completamente simétricas después.Existen varios tipos de implantes: RELLENOS DE GEL DE SILICONA, RELLENOS DE SUERO FISIOLÓGICO, DE SUPERFICIE LISA, TEXTURADA, DE FORMA REDONDA O ANATÓMICA, ETC. el médico tratante le indicará el más adecuado para  cada  caso individual.El aumento de la mama se consigue implantando una prótesis ya sea detrás del tejido mamario subglandular debajo del músculo pectoral-submuscular y/o debajo de la aponeurosis del músculo pectoral (subfacial).  Las incisiones se realizan de forma que las cicatrices resulten lo más invisibles que sea posible, habitualmente alrededor de la parte inferior de la areola, o por debajo de la mama, o en la axila. El método de  implantación y la posición de la prótesis dependerá de sus preferencias, su anatomía y la recomendación de mi médico tratante.</p>' +
                '<p id="consentimiento"><b>TRATAMIENTO ALTERNATIVO.</b> La mamoplastia de aumento es una operación quirúrgica electiva. La alternativa podría consistir en no llevar a cabo la intervención, el uso de una prótesis mamaria externa o relleno.</p>' +
                '<p id="consentimiento"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados a la mamoplastia de aumento. La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de las mujeres no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su médico tratante para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias del aumento mamario.</p>' +
                '<p id="consentimiento"><b>Sangrado.</b>  Es posible, aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia post-operatoria, puede requerir tratamiento de urgencia para drenar la sangre acumulada, en caso muy extremo  transfusión de sangre. No debe tomar aspirina o medicamento antiinflamatorio, inhibidores coagulación, vit. E, medicamentos naturistas, ginkgo biloba desde 15 días antes de la cirugía., puesto que pueden aumentar el riesgo de  hemorragia.</p>' +
                '<p id="consentimiento"><b>Infección:</b> La infección después de la cirugía es muy rara. Si ocurre una infección, puede ser necesario tratamiento adicional, incluyendo antibióticos.</p>' + saltoPagina() + 
                '<p id="consentimiento"><b>Contractura capsular.</b> El tejido cicatricial que se forma internamente alrededor del implante puede contraerse y hacer que la prótesis se haga redonda, firme y posiblemente dolorosa. La dureza excesiva de las mamas puede ocurrir al poco tiempo de la cirugía o al cabo de años. Puede esperarse que la incidencia de la contractura capsular sintomática aumenta con el tiempo. La contractura capsular puede ocurrir en un lado, en los dos o en ninguno. El tratamiento para la contractura capsular puede requerir cirugía, cambio del implante o retirada del mismo.</p>' +
                '<p id="consentimiento"><b>Cambios en la sensibilidad del pezón y la piel.</b> Las mamas están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad del pezón inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal.</p>' +
                '<p id="consentimiento"><b>Cicatrices cutáneas.</b> La cicatrización excesiva es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. El paciente podría necesitar cirugía adicional para tratar cicatrices anormales tras la cirugía, que puede incurrir en gastos económicos.</p>' +
                '<p id="consentimiento"><b>Implantes.</b> Los implantes mamarios, al igual que otros dispositivos médicos, pueden fallar. Pueden romperse o tener escapes. Cuando una prótesis de suero se vacía, el relleno de agua salada se absorbe por el organismo. La rotura puede ocurrir como resultado de una herida, durante una mamografía, o sin causa aparente. Las prótesis no tienen una vida ilimitada y eventualmente requerirán cirugía de recambio.</p>' +
                '<p id="consentimiento"><b>Extrusión del implante.</b> La falta de adecuada cobertura tisular o un infección puede dar como resultado la exposición y extrusión del implante. Se han visto casos de rotura de la piel con el uso de medicación esteroidea o tras radioterapia del tejido mamario. Si ocurre rotura del tejido y la prótesis se expone, es necesario su retiro.</p>' +
                '<p id="consentimiento"><b>Mamografía.</b> Si usted tiene alrededor de 35 años de edad, es recomendable realizar una mamografía y un ultrasonido preoperatorio. Usted debe informar al radiólogo de la presencia de prótesis mamarias, para que pueda realizarse los estudios mamográficos adecuados. La ecografía, mamografía especializada y la resonancia magnética pueden ser apropiados para evaluar nódulos mamarios y el estado de los implantes.</p>' +
                '<p id="consentimiento"><b>Arrugas y pliegues en la piel.</b> Pueden existir pliegues en el implante visibles y palpables. Es normal y de esperar que haya alguna arruga. Esto puede ser más pronunciado en pacientes con tejido mamario delgado.</p>' +
                '<p id="consentimiento"><b>Embarazo y lactancia.</b> No existe evidencia suficiente en cuanto a la absoluta seguridad de los implantes mamarios respecto a la fertilidad, embarazo o lactancia. Aunque no hay evidencia de ningún peligro especial de los implantes para la mujer embarazada o su hijo, continúan los estudios para buscar posibles problemas.</p>' +
                '<p id="consentimiento"><b>Calcificación.</b> Pueden formarse depósitos de calcio en el tejido que rodea la prótesis, lo que puede causar dolor, aumento de la consistencia, y puede ser visibles en la mamografía. Si esto ocurre, puede ser necesaria cirugía adicional para corregir el problema.</p>' +
                '<p id="consentimiento"><b>Actividades.</b> Las actividades y ocupaciones que implican un riesgo de traumatismo mamario, potencialmente podrían romper o dañar los implantes mamarios.</p>' + saltoPagina() +
                '<p id="consentimiento"><b>Reacciones alérgicas.</b> En casos raros se han descrito alergias locales al micropore material de sutura o preparados tópicos. Pueden ocurrir reacciones sistémicas, que son más graves, frente a medicamentos usados durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p>' +
                '<p id="consentimiento"><b>Enfermedad de la mama.</b> La literatura médica actual no demuestra un incremento en el riesgo de enfermedad mamaria o cáncer de mama en mujeres portadoras de prótesis mamarias por motivo estético o reconstructivo. La enfermedad mamaria puede aparecer independientemente de la presencia de prótesis. Es recomendable que todas las mujeres se practiquen autoexamen periódicamente, se sometan a mamografía y ultrasonido cada año si son mayores de 35 años y que consulten a su médico si descubre un bulto en la mama.</p>' +
                '<p id="consentimiento"><b>Anestesia.</b> Tanto la anestesia local como la general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p>' +
                '<p id="consentimiento"><b>Necesidad de cirugía adicional.</b> Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo del procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p>' +
                '<p id="consentimiento"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado.<ul><li id="consentimiento">Aumento del volumen mamario</li>' +
                '<li id="consentimiento">Mejoramiento del contorno del torso</li></ul></p>' +
                '<p id="consentimiento"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
                '<ul><li id="consentimiento">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Aumento mamario con implantes.</li>' +
                '<li id="consentimiento">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
                '<li id="consentimiento">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                '<li id="consentimiento">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li></ul><br/><br/><br/><br/><br/>' +
                '<ul><li id="consentimiento">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
                '<li id="consentimiento">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
                '<li id="consentimiento">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li id="consentimiento">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
                '<li id="consentimiento">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
                '<li id="consentimiento">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido.</li>' +
                '<li id="consentimiento">LOCALIZACIÓN DE LAS CICATRICES: Incisión Periareolar (alrededor del pezón), Incisión Submamaria (en el surco bajo de la mama), Incisión axilar (en la axila).</li>' +
                '</ul>' +
                '<p align="center"><img src="' + implantesMamarios + '" height="200px" width="400px" /></p>' + saltoPagina() +
                '<p id="consentimiento"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';

            // FORMATO PDF EXPEDIENTE INJERTO
            // COMPLETO
            // Encabezado XML
            var expediente_medicalPDF = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
                '<pdf>\n' + stylesPDF +
                '<body background-image="' + xml.escape({ xmlText: imageBack }) + '" >' +
                '<br /><br /><br /><br /><br />';

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>CIRUGÍA SEGURA</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">2. ANTES DE LA INDUCCIÓN ANESTÉSICA</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">3. AL INICIAR EL PROCEDIMIENTO</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>EL PACIENTE CONFIRMO:</b>' +
                '<ul style="list-style: none">' +
                '<li>' + cs_identidad + ' SU IDENTIDAD</li>' +
                '<li>' + cs_sitioCorrecto + ' SITIO QUIRÚRGICO CORRECTO</li>' +
                '<li>' + cs_procedimientoCorrecto + ' PROCEDIMIENTO CORRECTO</li>' +
                '<li>' + cs_cuentaConsentimientoInf + ' CUENTA CON SU CONSENTIMIENTO INFORMADO</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>SE REALIZO EL MARCAJE DEL SITIO QUIRÚRGICO</b>' +
                '<br />' + cs_realizoMarcaje +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>SE COMPLETO EL CONTROL DE SEGURIDAD EN ANESTESIA</b>' +
                '<br />' + cs_controlAnestesia +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>SE COLOCARON ELEMENTOS DE VIGILANCIA ESTÁNDAR</b>' +
                '<br />' + cs_vigilanciaEstandar +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>VÍA AÉREA DIFÍCIL / RIESGO DE ASPIRACIÓN</b>' +
                '<br />' + cs_riesgoAspiracion +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>RIESGO DE HEMORRAGIA >500ml</b>' +
                '<br />' + cs_riesgoHemorragia +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="vertical-align: top">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;">' + cs_confirmarMiembros + ' CONFIRMAR QUE TODOS LOS MIEMBROS DEL EQUIPO SE HAYAN IDENTIFICADO POR NOMBRE Y FUNCIÓN</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;"><b>CIRUJANO, ANESTESIOLOGO E INSTRUMENTISTA CONFIRMAN VERBALMENTE</b>' +
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
                '<li>' + cs_revisaCirujano + ' EL CIRUJANO REVISA: LOS PASOS CRÍTICOS O IMPREVISTOS, LA DURACIÓN DE LA OPERACIÓN Y LA PÉRDIDA DE SANGRE PREVISTA</li>' +
                '<li>' + cs_revisaAnestesia + ' EL EQUIPO DE ANESTESIA REVISA: SI EL PACIENTE PRESNETA ALGÚN PROBLEMA ESPECÍFICO</li>' +
                '<li>' + cs_revisarInstrumental + ' EL EQUIPO DE ENFERMERÍA REVISA: SI SE HA CONFIRMADO LA ESTERILIDAD Y SI EXISTEN DUDAS O PROBLEMAS RELACIONADOS CON EL INSTRUMENTAL Y LOS EQUIPOS</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td><b>¿SE HA ADMINISTRADO PROFILAXIS ANTIBIÓTICA EN LOS ÚLTIMOS 60 MINUTOS?</b>' +
                '<br />' + cs_profilaxisAntibiótica +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>¿PUEDEN VISUALIZARSE LAS IMÁGENES DIAGNÓSTICAS ESCENCIALES?</b>' +
                '<br />' + cs_visualizarImagenes +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;vertical-align:bottom;">4. DESPUÉS DE LA CIRUGÍA</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">5. MIEMBROS DEL EQUIPO EN CIRUGÍA</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="vertical-align: top">' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;"><b>ENFERMERÍA CONFIRMA VERBALMENTE CON EL EQUIPO:</b>' +
                '<ul style="list-style: none">' +
                '<li>' + cs_nomrbeProcedimiento + ' NOMBRE DEL PROCEDIMIENTO REALIZADO</li>' +
                '<li>' + cs_recuentoInstrumental + ' RECUENTO DE INSTRUMENTOS, AGUJAS Y HOJAS DE BISTURÍ</li>' +
                '<li>' + cs_etiquetadoHistopatologicas + ' ETIQUETADO DE MUESTRAS HISTOPATOLÓGICAS</li>' +
                '<li>' + cs_materialTextil + ' MATERIAL TEXTIL COMPLETO</li>' +
                '</ul>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>' + cs_recuperacionTratamiento + ' EL CIRUJANO, ANESTESISTA Y ENFERMERÍA REVISAN LOS PRINCIPALES ASPECTOS DE LA RECUPERACIÓN Y EL TRATAMIENTO DEL PACIENTE' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td></td>' +
                '<td>' +
                '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="20%" style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + vp_cirujanoTransanestesico_label + '</b></td>' +
                '<td width="40%" style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + vp_cirujanoTransanestesico + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + vp_anestesiologoTransanestesico_label + '</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + vp_anestesiologoTransanestesico + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + notaPostQuirurgica_instrumentista_datosGenerales_label + '</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + notaPostQuirurgica_instrumentista_datosGenerales + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + notaPostQuirurgica_circulante_datosGenerales_label + '</b></td>' +
                '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + notaPostQuirurgica_circulante_datosGenerales + '</b></span><br />NOMBRE</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>VALORACIÓN PREANESTÉSICA</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr style="background-color: #cadcff"><td>' + vp_cirugiaElectiva + ' <b>' + vp_cirugiaElectiva_label + '</b></td><td><b>' + vp_glucosa_label + ':</b> ' + vp_glucosa + '</td><td><b>' + vp_asa_label + ':</b> ' + vp_asa + '</td><td><b>' + vp_rh_label + ':</b> ' + vp_rh + '</td></tr>' +
                '<tr><td>' + vp_cirugiaUrgente + ' <b>' + vp_cirugiaUrgente_label + '</b></td><td><b>' + vp_urea_label + ':</b> ' + vp_urea + '</td><td><b>' + vp_hb_label + ':</b> ' + vp_hb + '</td><td><b>' + vp_pa_label + ':</b> ' + vp_pa + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td>' + vp_cirugiaMayor + ' <b>' + vp_cirugiaMayor_label + '</b></td><td><b>' + vp_creatinina_label + ':</b> ' + vp_creatinina + '</td><td><b>' + vp_hto_label + ':</b> ' + vp_hto + '</td><td><b>' + vp_fc_label + ':</b> ' + vp_fc + '</td></tr>' +
                '<tr><td>' + vp_cirugiaMenor + ' <b>' + vp_cirugiaMenor_label + '</b></td><td><b>' + vp_ekg_label + ':</b> ' + vp_ekg + '</td><td><b>' + vp_grupoS_label + ':</b> ' + vp_grupoS + '</td><td><b>' + vp_ef_label + ':</b> ' + vp_ef + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td></td><td><b>' + vp_rxTorax_label + ':</b> ' + vp_rxTorax + '</td></tr>' +
                '<tr><td width="50%" colspan="2"><b>' + vp_craneo_label + ':</b> ' + vp_craneo + '</td><td width="50%" colspan="2"><b>' + vp_sEndocrino_label + ':</b> ' + vp_sEndocrino + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_ojosOidosNarizGarganta_label + ':</b> ' + vp_ojosOidosNarizGarganta + '</td><td colspan="2"><b>' + vp_sMuscular_label + ':</b> ' + vp_sMuscular + '</td></tr>' +
                '<tr><td colspan="2"><b>' + vp_patologiasActuales_label + ':</b> ' + vp_patologiasActuales + '</td><td colspan="2"><b>' + vp_alergiasTrans_label + ':</b> ' + vp_alergiasTrans + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_sRespiratoria_label + ':</b> ' + vp_sRespiratoria + '</td><td colspan="2"><b>' + vp_operacionesPrevias_label + ':</b> ' + vp_operacionesPrevias + '</td></tr>' +
                '<tr><td colspan="2"><b>' + vp_sCardiovascular_label + ':</b> ' + vp_sCardiovascular + '</td><td colspan="2"><b>' + vp_antecedentesAnestesicos_label + ':</b> ' + vp_antecedentesAnestesicos + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_sGastrointestinal_label + ':</b> ' + vp_sGastrointestinal + '</td><td colspan="2"><b>' + vp_complicaciones_label + ':</b> ' + vp_complicaciones + '</td></tr>' +
                '<tr><td colspan="2"><b>' + vp_sGenitourinatio_label + ':</b> ' + vp_sGenitourinatio + '</td><td colspan="2"><b>' + vp_tecAnestPropuesta_label + ':</b> ' + vp_antecedentesAnestesicos + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_sNervioso_label + ':</b> ' + vp_sNervioso + '</td><td colspan="2"></td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr><td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;" colspan="2">2. ANESTESIA</td></tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr style="background-color: #cadcff"><td width="50%"><b>' + vp_puncionVenosaSitio_label + ':</b> ' + vp_puncionVenosaSitio + '</td><td width="50%" rowspan="3"><b>' + vp_sitiosPresion_label + ':</b> ' + vp_sitiosPresion + '</td></tr>' +
                '<tr><td><b>' + vp_puncionVenosaCalibre_label + ':</b> ' + vp_puncionVenosaCalibre + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_ojosProteccion_label + ':</b> ' + vp_ojosProteccion + '</td></tr>' +
                '<tr><td><b>' + vp_posicionPaciente_label + ':</b> ' + vp_posicionPaciente + '</td><td rowspan="3"><b>' + vp_otrosDatos_label + ':</b>' + vp_otrosDatos + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_posBrazosAbduccion_label + ':</b> ' + vp_posBrazosAbduccion + '</td></tr>' +
                '<tr><td><b>' + vp_posBrazosAduccion_label + ':</b> ' + vp_posBrazosAduccion + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_torniqueteSitio_label + ':</b> ' + vp_torniqueteSitio + '</td><td><b>' + vp_puncionEpiduralDificultades_label + ':</b> ' + vp_puncionEpiduralDificultades + '</td></tr>' +
                '<tr><td><b>' + vp_torniqueteInicia_label + ':</b> ' + vp_torniqueteInicia + '</td><td><b>' + vp_pucnionEpiduralCalibre_label + ':</b> ' + vp_pucnionEpiduralCalibre + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_torniqueteTermina_label + ':</b> ' + vp_torniqueteTermina + '</td><td><b>' + vp_puncionEpiduralIntervertebral_label + ':</b> ' + vp_puncionEpiduralIntervertebral + '</td></tr>' +
                '<tr><td><b>' + vp_induccionDificultados_label + ':</b> ' + vp_induccionDificultados + '</td><td><b>' + vp_puncionEpidrualAgente_label + ':</b> ' + vp_puncionEpidrualAgente + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_intubacionDificultades_label + ':</b> ' + vp_intubacionDificultades + '</td><td><b>' + vp_puncionEpiduralNivel_label + ':</b> ' + vp_puncionEpiduralNivel + '</td></tr>' +
                '<tr><td><b>' + vp_oralNasalCalibre_label + ':</b> ' + vp_oralNasalCalibre + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_oralNasalGlobo_label + ':</b> ' + vp_oralNasalGlobo + '</td></tr>' +
                '<tr><td ><b>' + vp_presionNormalBaja_label + ':</b> ' + vp_presionNormalBaja + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_bloqueoPlexo_label + ':</b> ' + vp_bloqueoPlexo + '</td><td><b>' + vp_porAnestesiologo_label + ':</b> ' + vp_porAnestesiologo + '</td></tr>' +
                '<tr><td colspan="2"><b>' + vp_codicionPacienteCerrar_label + ':</b> ' + vp_codicionPacienteCerrar + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr><td style="font-size: 12px;font-weight:bold;color:#346094;">3. RECUPERACIÓN</td></tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr width="50%" style="background-color: #cadcff"><td><b>' + vp_valoracionAldrete15_label + ':</b> ' + vp_valoracionAldrete15 + '</td><td width="50%"><b>' + vp_pasoDeRecuperacionA_label + ':</b> ' + vp_pasoDeRecuperacionA + '</td></tr>' +
                '<tr><td><b>' + vp_valoracionAldrete45_label + ':</b> ' + vp_valoracionAldrete45 + '</td><td><b>' + vp_pasoDeRecuperacionAEspecifique_label + ':</b> ' + vp_pasoDeRecuperacionAEspecifique + '</td></tr>' +
                '<tr style="background-color: #cadcff"><td><b>' + vp_valoracionAldrete90_label + ':</b> ' + vp_valoracionAldrete90 + '</td><td><b>' + vp_pasoDeRecuperacionAHora_label + ':</b> ' + vp_pasoDeRecuperacionAHora + '</td></tr>' +
                '<tr><td></td><td><b>' + vp_recuperacionResponsable_label + ':</b> ' + vp_recuperacionResponsable + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>REGISTRO TRANSANESTÉSICO</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">TIEMPOS, PARÁMETROS Y SIGNOS</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="10%" style="background-color:#346094;color:#FFFFFF;" align="center">DESCRIPCÓN</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">8h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">9h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">10h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">11h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">12h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">13h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">14h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">15h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">16h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">17h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">18h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">19h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">20h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">21h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">22h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">23h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">24h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">1h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">2h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">3h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">4h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">5h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">6h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">7h</td>' +
                '</tr>' + table_ParametrosSignos_ValoracionPreanestesica +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">SÍMBOLOS-AGENTES ANESTÉSICOS, FÁRMACOS, SOLUCIONES</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="8%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">DESCRIPCÓN</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">8h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">9h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">10h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">11h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">12h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">13h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">14h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">15h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">16h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">17h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">18h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">19h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">20h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">21h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">22h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">23h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">24h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">1h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">2h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">3h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">4h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">5h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">6h</td>' +
                '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">7h</td>' +
                '</tr>' + table_SimbolosAgentes_ValoracionPreanestesica +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>CONTROL DE LÍQUIDOS</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">DIETA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
                '</tr>' + table_Dieta_ControlLiquidos +
                '</table>' +
                '</td>' +
                '</tr>' +

                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">INGRESOS</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="10%" style="background-color:#346094;color:#FFFFFF;" align="center">DESCRIPCÓN</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">8h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">9h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">10h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">11h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">12h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">13h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">14h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">15h</td>' +
                '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">16h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">17h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">18h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">19h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">20h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">21h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">22h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">23h</td>' +
                '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">24h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">1h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">2h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">3h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">4h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">5h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">6h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">7h</td>' +
                '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
                '</tr>' + table_Ingresos_ControlLiquidos +
                '<tr>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
                '<td colspan="8" style="background-color:#346094;"></td>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Ingresos_total1_subtotal.toFixed(2) + '</b></td>' +
                '<td colspan="8" style="background-color:#346094;"></td>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Ingresos_total2_subtotal.toFixed(2) + '</b></td>' +
                '<td colspan="8" style="background-color:#346094;"></td>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Ingresos_total3_subtotal.toFixed(2) + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +

                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">EGRESOS</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="10%" style="background-color:#346094;color:#FFFFFF;" align="center">DESCRIPCIÓN</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">8h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">9h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">10h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">11h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">12h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">13h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">14h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">15h</td>' +
                '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">16h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">17h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">18h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">19h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">20h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">21h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">22h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">23h</td>' +
                '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">24h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">1h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">2h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">3h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">4h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">5h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">6h</td>' +
                '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">7h</td>' +
                '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
                '</tr>' + table_Egresos_ControlLiquidos +
                '<tr>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
                '<td colspan="8" style="background-color:#346094;"></td>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Egresos_total1_subtotal.toFixed(2) + '</b></td>' +
                '<td colspan="8" style="background-color:#346094;"></td>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Egresos_total2_subtotal.toFixed(2) + '</b></td>' +
                '<td colspan="8" style="background-color:#346094;"></td>' +
                '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Egresos_total3_subtotal.toFixed(2) + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +

                '<tr>' +
                '<td>' +
                '<table style="width:100%;">' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:1px solid #346094;table-layout: fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="10%" style="border:1px solid #346094;" align="center"><b>BALANCE</b></td>' +
                '<td width="24%" style="background-color:#346094;"></td>' +
                '<td width="4%" style="border:1px solid #346094;" align="center"><b>' + (parseFloat(table_Ingresos_total1_subtotal) - parseFloat(table_Egresos_total1_subtotal)).toFixed(2) + '</b></td>' +
                '<td width="24%" style="background-color:#346094;"></td>' +
                '<td width="4%" style="border:1px solid #346094;" align="center"><b>' + (parseFloat(table_Ingresos_total2_subtotal) - parseFloat(table_Egresos_total2_subtotal)).toFixed(2) + '</b></td>' +
                '<td width="24%" style="background-color:#346094;"></td>' +
                '<td width="4%" style="border:1px solid #346094;" align="center"><b>' + (parseFloat(table_Ingresos_total3_subtotal) - parseFloat(table_Egresos_total3_subtotal)).toFixed(2) + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +

                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TOTAL DE INGRESOS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TOTAL DE EGRESOS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">BALANCE 24 HORAS</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td align="center">' + total_IngresosControlLiquidos_totalesGlobales.toFixed(2) + '</td>' +
                '<td align="center" style="border-left:1px solid #346094;">' + total_EgresosControlLiquidos_totalesGlobales.toFixed(2) + '</td>' +
                '<td align="center" style="border-left:1px solid #346094;">' + (parseFloat(total_IngresosControlLiquidos_totalesGlobales).toFixed(2) - parseFloat(total_EgresosControlLiquidos_totalesGlobales).toFixed(2)) + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>CONTROL DE LÍQUIDOS</b></p>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">OBSERVACIONES, DATOS RELEVANTES A REPORTAR</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
                '</tr>' + table_Observaciones_ControlLiquidos +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094"></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center"></td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
                '</tr>' + table_Responsables_ControlLiquidos +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA QUIRÚRGICA</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" colspan="3">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 12px;font-weight:bold;color:#346094">2. ESTADO DE CONCIENCIA Y FÍSICO</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +

                '<td width="33%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="40%">Alerta:</td>' +
                '<td width="60%">' + hojaQuirurgica_alerta_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Orientado:</td>' +
                '<td width="60%">' + hojaQuirurgica_orientado_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Consciente:</td>' +
                '<td width="60%">' + hojaQuirurgica_consciente_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Tranquilo:</td>' +
                '<td width="60%">' + hojaQuirurgica_tranquilo_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Ansioso:</td>' +
                '<td width="60%">' + hojaQuirurgica_ansioso_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Letárgico:</td>' +
                '<td width="60%">' + hojaQuirurgica_letargico_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Nervioso:</td>' +
                '<td width="60%">' + hojaQuirurgica_nervioso_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Otro:</td>' +
                '<td width="60%">' + hojaQuirurgica_otros1_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Ayuno:</td>' +
                '<td width="60%">' + hojaQuirurgica_ayuno_edoConsciencia + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +

                '<td width="33%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="40%">Tricotomía:</td>' +
                '<td width="60%">' + hojaQuirurgica_tricotomia_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Región:</td>' +
                '<td width="60%">' + hojaQuirurgica_region_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Alergias:</td>' +
                '<td width="60%">' + hojaQuirurgica_alergias_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Prótesis:</td>' +
                '<td width="60%">' + hojaQuirurgica_protesis_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Alajas:</td>' +
                '<td width="60%">' + hojaQuirurgica_alajas_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Ropa Interior:</td>' +
                '<td width="60%">' + hojaQuirurgica_ropaInterior_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">' + label_hojaQuirurgica_mucosasOrales_edoConsciencia + ':</td>' +
                '<td width="60%">' + hojaQuirurgica_mucosasOrales_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">' + label_hojaQuirurgica_colorTegumentos_edoConsciencia + ':</td>' +
                '<td width="60%">' + hojaQuirurgica_colorTegumentos_edoConsciencia + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +

                '<td width="33%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="40%">Estado de la piel:</td>' +
                '<td width="60%">' + hojaQuirurgica_estadoPiel_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">' + label_hojaQuirurgica_afeccionesPiel_edoConsciencia + ':</td>' +
                '<td width="60%">' + hojaQuirurgica_afeccionesPiel_edoConsciencia + '</td>' +
                '</tr>' +
                /*                 '<tr style="background-color: #cadcff">' +
                                '<td width="40%">Heridas:</td>' +
                                '<td width="60%">' + hojaQuirurgica_heridas_edoConsciencia + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td width="40%">Cicatrices:</td>' +
                                '<td width="60%">' + hojaQuirurgica_cicatrices_edoConsciencia + '</td>' +
                                '</tr>' +
                                '<tr style="background-color: #cadcff">' +
                                '<td width="40%">Otros:</td>' +
                                '<td width="60%">' + hojaQuirurgica_otros2_edoConsciencia + '</td>' +
                                '</tr>' + */
                '<tr>' +
                '<td width="40%">Venoclisis:</td>' +
                '<td width="60%">' + hojaQuirurgica_venoclisis_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Sondas:</td>' +
                '<td width="60%">' + hojaQuirurgica_sondas_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Drenajes:</td>' +
                '<td width="60%">' + hojaQuirurgica_drenajes_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Consentimientos Firmados:</td>' +
                '<td width="60%">' + hojaQuirurgica_consentimientoFirmado_edoConsciencia + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%"></td>' +
                '<td width="60%"></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +

                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top;table-fixed;">3. SIGNOS VITALES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="8%" style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">Hora</td>' + table_SignosVitales_Hora_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">F.C.</td>' + table_SignosVitales_FreCardiaca_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">SPO<sub>2</sub></td>' + table_SignosVitales_SPO2_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">T/A mmHg</td>' + table_SignosVitales_TAMMHG_td +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">4. ANESTESIA</td>' +
                '<td width="2%"></td>' +
                '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">5. ASEPSIA Y ANTISEPSIA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="40%">Médico anestesiólogo responsable: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_anestesiologo_anestesia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Tipo de anestesia: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_tipoAnestesia_anestesia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Hora de inicio de anestesia: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_horaInicio_anestesia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Maniobra de intubación: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_intubacion_anestesia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Número de tubo: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_numTubos_anestesia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Medicamentos de inducción: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_medicaInduccion_anestesia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Hora de término de anestesia: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_horaTermino_anestesia + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="40%">Realizó: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_realizo_asepsia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Región: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_region_asepsia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="40%">Antiséptico: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_antiseptico_asepsia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="40%">Observaciones: </td>' +
                '<td width="60%"><b>' + hojaQuirurgica_observaciones_asepsia + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA QUIRÚRGICA</b></p>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;table-layout:fixed;">' +
                '<tr>' +
                '<td width="54%" style="font-size: 12px;font-weight:bold;color:#346094">6. CIRUGÍA</td>' +
                '<td width="2%"></td>' +
                '<td width="44%" style="font-size: 12px;font-weight:bold;color:#346094">7. CONTEO DE GASAS, MATERIAL TEXTIL, INSTRUMENTAL Y PUNZOCORTANTES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="50%">Cirujano responsable: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_cirujano_cirugia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Primer ayudante: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_primerAyudante_cirugia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="50%">Segundo ayudante: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_segundoAyudante_cirugia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Instrumentista quirúrgico: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_instrumentista_cirugia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="50%">Circulante: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_circulante_cirugia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Tiempo fuera: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_tiempoFuera_cirugia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="50%">Hora de inicio de infiltración: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_horaInicioInfiltracion_cirugia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de término de infiltración: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_horaTerminoInfiltracion_cirugia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="50%">Hora de inicio de cirugía: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_horaInicioCirugia_cirugia + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="50%">Hora de término de cirugía: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_horaTerminoCirugia_cirugia + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td width="50%">Cirugía realizada: </td>' +
                '<td width="50%"><b>' + hojaQuirurgica_cirugiaRealizada_cirugia + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="55%">Gasas: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_gasas_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="55%">Compresas: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_compresas_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="55%">Cotoniodes: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_cotonoides_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="55%">Isopos: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_isopos_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="55%">Agujas hipodérmicas: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_agujasHipo_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="55%">Agujas de sutura: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_agujasSutu_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="55%">Hojas de bisturí: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_hojasBisturi_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td width="55%">Instrumental: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_instrumental_materialesInstrumental + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="55%">Otros: </td>' +
                '<td width="45%">Completo: ' + hojaQuirurgica_otros_materialesInstrumental + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">8. MEDICACIÓN</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">FÁRMACO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">DOSIS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">VÍA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">ADMINISTRÓ</td>' +
                '</tr>' + table_Medicacion_EnfermeriaQuirurgica +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">9. SOLUCIONES INTRAVENOSAS</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">SOLUCIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">VOLUMEN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORA DE INICIO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">PREPARADA POR:</td>' +
                '</tr>' + table_SolsIntravenosas_EnfermeriaQuirurgica +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:60%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">10. CATÉTERES, SONDAS Y DRENAJES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TIPO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">SITIO DE INSERCIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">INSTALADO POR:</td>' +
                '</tr>' + table_CatSonDren_EnfermeriaQuirurgica +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA QUIRÚRGICA</b></p>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">11. EQUIPO BIOMÉDICO UTILIZADO</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;height:160px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td>' + hojaQuirurgica_equipoBiomedico + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">12. IMPLANTES E INSUMOS EXTRAS</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;height:240px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr style="background-color: #cadcff;">' +
                '<td>' + hojaQuirurgica_implantesInsumos + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">13. OBSERVACIONES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;height:160px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td>' + hojaQuirurgica_observaciones + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA POST QUIRÚRGICA</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">2. DATOS GENERALES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td>Diagnóstico pre-operatorio: ' + notaPostQuirurgica_dxPreOperatorio_datosGenerales + '</td>' +
                '<td>Cirugía programada: ' + 'notaPostQuirurgica_dxPreOperatorio_datosGenerales' + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>Diagnóstico post-operatorio: ' + notaPostQuirurgica_dxPostOperatorio_datosGenerales + '</td>' +
                '<td>Cirugía realizada: ' + 'notaPostQuirurgica_dxPostOperatorio_datosGenerales' + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2">Anestesia aplicada: ' + notaPostQuirurgica_anestesiaAplicada_datosGenerales + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>Médico cirujano: ' + notaPostQuirurgica_cirujano_datosGenerales + ' </td>' +
                '<td>Cédula profesional: ' + notaPostQuirurgica_cirujano_datosGenerales_cedula + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>1er ayudante: ' + notaPostQuirurgica_primerAyudante_datosGenerales + '</td>' +
                '<td>Cédula profesional: ' + notaPostQuirurgica_primerAyudante_datosGenerales_cedula + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>2do ayudante: ' + notaPostQuirurgica_segundoAyudante_datosGenerales + '</td>' +
                '<td>Cédula profesional: ' + notaPostQuirurgica_segundoAyudante_datosGenerales_cedula + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Médico anestesiólogo: ' + notaPostQuirurgica_anestesiologo_datosGenerales + '</td>' +
                '<td>Cédula profesional: ' + notaPostQuirurgica_anestesiologo_datosGenerales_cedula + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td>Enf. instrumentista: ' + notaPostQuirurgica_instrumentista_datosGenerales + '</td>' +
                '<td>Cédula profesional: ' + notaPostQuirurgica_instrumentista_datosGenerales_cedula + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Enf. circulante: ' + notaPostQuirurgica_circulante_datosGenerales + '</td>' +
                '<td>Cédula profesional: ' + notaPostQuirurgica_circulante_datosGenerales_cedula + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">3. NOTA MÉDICA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;height:220px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td>' + notaPostQuirurgica_nota_notaMedica + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>INDICACIONES MÉDICAS</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">FECHA</td>' +
                '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">HORA</td>' +
                '<td width="80%" style="background-color: #346094;color:#FFFFFF;" align="center">INDICACIONES</td>' +
                '</tr>' + table_Indicaciones_IndicacionesMedicas +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE RECUPERACIÓN</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top">2. SIGNOS VITALES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="8%" style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">HORA</td>' + table_SignosVitales_Recuperacion_Hora_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">F.C.</td>' + table_SignosVitales_Recuperacion_FC_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">SPO<sub>2</sub></td>' + table_SignosVitales_Recuperacion_SPO2_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">T/A mmHg</td>' + table_SignosVitales_Recuperacion_TAMMHG_td +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">3. TERAPIA INTRAVENOSA Y SOLUCIONES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">SOLUCIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORAS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">Ml/H</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">INICIA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TERMINA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">PREPARÓ</td>' +
                '</tr>' + table_TerapiaIntravenosa_NotasRecuperacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">4. CATÉTERES, SONDAS Y DRENAJES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TIPO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">SITIO DE INSERCIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">FECHA DE INSTALACIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">INSTALADO POR:</td>' +
                '</tr>' + table_CatSonDren_NotasRecuperacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">5. MEDICACIÓN</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">FÁRMACO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">DOSIS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">VÍA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">PRESENTACIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORARIO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">ADMINISTRÓ</td>' +
                '</tr>' + table_Medicacion_NotasRecuperacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE RECUPERACIÓN</b></p>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">6. CONDICIONES DE LA HERIDA QUIRÚRGICA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td>' + notasRecuperacion_condicionesHerida + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">7. NOTAS DE ENFERMERÍA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td>' + notasRecuperacion_notasEnfermeria + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:50%;font-size:12px;font-family:Aria,sans-serif;" border="0" cellspacing="0">' +
                '<tr>' +
                '<td width="58%" style="font-size: 13px;font-weight:bold;color:#346094;">8. EVOLUCIÓN</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center" colspan="2"><b>ESCALA DE ALDRETE</b></td>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>PUNTAJE</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>INGRESO</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>ALTA</b></td>' +
                '</tr>' + table_Evolucion_NotasRecuperacion +
                '<tr>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Evolucion_NotasRecuperacion_TotalPuntaje + '</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Evolucion_NotasRecuperacion_TotalIngreso + '</b></td>' +
                '<td style="background-color: #cadcff;border-top:1px solid #346094;" align="center"><b>' + table_Evolucion_NotasRecuperacion_TotalAlta + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:50%;font-size:12px;font-family:Aria,sans-serif;" border="0" cellspacing="0">' +
                '<tr>' +
                '<td width="58%" style="font-size: 13px;font-weight:bold;color:#346094;">9. ENFERMERÍA</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center" colspan="2"><b>RESPONSABLE DE ENFERMERÍA</b></td>' +
                '</tr>' + 'identificacionRiesgo' +
                '<tr>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;">NOMBRE</td>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;">FIRMA</td>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE HOSPITALIZACIÓN</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top">2. SIGNOS VITALES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
                '<tr>' +
                '<td style="width:40px;background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">HORA</td>' + table_SignosVitales_Hospitalizacion_Hora_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">F.C.</td>' + table_SignosVitales_Hospitalizacion_FC_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">T.C.</td>' + table_SignosVitales_Hospitalizacion_TC_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">PRESIÓN ARTERIAL</td>' + table_SignosVitales_Hospitalizacion_TAMMHG_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">SPO<sub>2</sub></td>' + table_SignosVitales_Hospitalizacion_SPO2_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF;font-size:6px;" align="center">ESCALA DE DOLOR</td>' + table_SignosVitales_Hospitalizacion_EscalaDolor_td +
                '</tr>' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">F.R.</td>' + table_SignosVitales_Hospitalizacion_FR_td +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">3. MEDICAMENTOS</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">MEDICAMENTO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">DOSIS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">FRECUENCIA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">VÍA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORARIO</td>' +
                '</tr>' + table_Medicacion_Hospitalizacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE HOSPITALIZACIÓN</b></p>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">4. SOLUCIONES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">No.</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">SOLUCIONES/NPT/ELEMENTOS SANGUÍNEOS/ELECTROLITOS</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">DURACIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">INICIO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TÉRMINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">Ml/HORA</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">F X P</td>' +
                '</tr>' + table_Soluciones_Hospitalizacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">CATÉTERES, SONDAS Y DRENAJES</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">DISPOSITIVO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">CALIBRE</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">SITIO DE INSERCIÓN</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">FECHA DE INSTALACIÓN</td>' +
                '</tr>' + table_CatSonDren_Hospitalizacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;">' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;table-layout:fixed;" border="0" cellspacing="0">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">5. VALORACIÓN RIESGOS DE CAÍDAS</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>CRITERIO DE EVALUACIÓN</b></td>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>VARIABLES</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>PUNTAJE</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.M.</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.V.</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.N.</b></td>' +
                '</tr>' + table_Riesgos_Hospitalizacion +
                '<tr>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalPuntaje + '</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalTM + '</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalTV + '</b></td>' +
                '<td style="background-color: #cadcff;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalTN + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;table-layout:fixed;" border="0" cellspacing="0">' +
                '<tr>' +
                '<td width="100%" style="font-size:12px;font-weight:bold;color:#346094;">6. VALORACIÓN DE ÚLCERAS POR PRESIÓN</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>CRITERIO DE EVALUACIÓN</b></td>' +
                '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>VARIABLES</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>PUNTAJE</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.M.</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.V.</b></td>' +
                '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.N.</b></td>' +
                '</tr>' + table_Ulceras_Hospitalizacion +
                '<tr>' +
                '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalPuntaje + '</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalTM + '</b></td>' +
                '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalTV + '</b></td>' +
                '<td style="background-color: #cadcff;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalTN + '</b></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">ESCALA DE RIESGO G.H. DOWNTOWN</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td>RIESGO BAJO: 0-2 PUNTOS</td>' +
                '</tr>' +
                '<tr style="background-color: #bfdcff">' +
                '<td>RIESGO MEDIO: 3-4 PUNTOS</td>' +
                '</tr>' +
                '<tr style="background-color: #b5dcff">' +
                '<td>RIESGO ALTO: 5-9 PUNTOS</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '<td width="2%"></td>' +
                '<td width="49%">' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">ESCALA DE NORTON</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td>RIESGO BAJO O NINGUNO: >14 PUNTOS</td>' +
                '</tr>' +
                '<tr style="background-color: #bfdcff">' +
                '<td>RIESGO MEDIO: 13-14 PUNTOS</td>' +
                '</tr>' +
                '<tr style="background-color: #b5dcff">' +
                '<td>RIESGO ALTO: 10-12 PUNTOS</td>' +
                '</tr>' +
                '<tr style="background-color: #aadcff">' +
                '<td>RIESGO MUY ALTO: 5-9 PUNTOS</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE HOSPITALIZACIÓN</b></p>';

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">7. NOTAS DE ENFERMERÍA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
                '</tr>' + table_NotasEnfermeria_Hospitalizacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">8. INTERVENCIONES DE ENFERMERÍA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
                '</tr>' + table_Intervenciones_Hospitalizacion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +

                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">RESPONSABLE DE ENFERMERÍA</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center"></td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
                '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center">ENFERMERA</td>' +
                '<td>TURNO MATUTINO</td>' +
                '<td>TURNO VESPERTINO</td>' +
                '<td>TURNO NOCTURNO</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff" >' +
                '<td align="center">FIRMA</td>' +
                '<td>TURNO MATUTINO</td>' +
                '<td>TURNO VESPERTINO</td>' +
                '<td>TURNO NOCTURNO</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center">JEFE DE ENFERMERAS</td>' +
                '<td>TURNO MATUTINO</td>' +
                '<td>TURNO VESPERTINO</td>' +
                '<td>TURNO NOCTURNO</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE EVOLUCIÓN</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
                '<tr>' +
                '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">FECHA</td>' +
                '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">HORA</td>' +
                '<td width="80%" style="background-color: #346094;color:#FFFFFF;" align="center"></td>' +
                '</tr>' + table_NotasEvolucion_NotaEvolucion +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            expediente_medicalPDF += saltoPagina();

            expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA EGRESO Y ALTA</b></p>';

            expediente_medicalPDF += encabezados_fichaIdentificacion;

            expediente_medicalPDF += '<table style="width:100%;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td width="25%" style="border-bottom: 1px solid #346094;">FECHA Y HORA DE EGRESO</td>' +
                '<td width="75%" style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_fechaEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">SIGNOS VITALES</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>T/A Post: ' + 'he_TApost' + ' F.C. Post: ' + 'he_FCpost' + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;">DIAGNÓSTICO DE INGRESO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + '' + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">RESUMEN DE LA EVOLUCIÓN Y ESTADO ACTUAL</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_resumenEvolucion + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;">DIAGNÓSTICO DE EGRESO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_diagnosticoEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">FECHA Y HORA DE PROCEDIMIENTO REALIZADO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + fechaCaso + ' ' + horaCaso + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;">MOTIVO DE EGRESO</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_motivoEgreso + '</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;">PLAN DE MANEJO, TRATAMIENTO Y RECOMENDACIONES</td>' +
                '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_planManejo + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td style="">NOMBRE COMPLETO, CÉDULA Y FIRMA DEL MÉDICO</td>' +
                '<td style="border-left: 1px solid #346094;"><b>' + '' + '</b></td>' +
                '</tr>' +
                '</table>';

            if (arr_typeProcess[7] == 7) {
                expediente_medicalPDF += saltoPagina();
                expediente_medicalPDF += consentimiento_Liposuccion;
                expediente_medicalPDF += firmas;
            } else if (arr_typeProcess[5] == 5) {
                expediente_medicalPDF += saltoPagina();
                expediente_medicalPDF += consentimiento_MamoplastiaAumentoImplantes;
                expediente_medicalPDF += firmas;
            } else if (arr_typeProcess[49] == 49) {
                expediente_medicalPDF += saltoPagina();
                expediente_medicalPDF += consentimiento_Rinoseptoplastia;
                expediente_medicalPDF += firmas;
            }

            expediente_medicalPDF += '</body></pdf>';
            context.response.renderPdf({ xmlString: expediente_medicalPDF });
        }

        /**
         * ************************ *
         *                          *
         * //FUNCTION: SUPPORT AREA *
         *                          *
         * ************************ *
         */

        /**
        * //FUNCTION: saltoPagina()
        * Function que retorna un string de HTML con estilo para generar un salto de página
        * y además agrega el espacio necesario para inciar la siguiente página en el sitio
        * correcto después del logo de hoja membretada
        */
        function saltoPagina() {
            var saltoPagina = '<div style="page-break-after:always;"></div>';
            saltoPagina += '<br /><br /><br /><br />';

            return saltoPagina;
        }

        /**
            * Funcion que obtiene la imagen de fondo correspondiente a la sucursal
            * @param {int} sucursal Identificador de la sucursal
            */
        function getImageBackGround(sucursal) {
            var imageBack = '';
            if (sucursal != '22' && sucursal != '35' && sucursal != '36' && sucursal != '23' && sucursal != '24' && sucursal != '25' && sucursal != '37' && sucursal != '21' && sucursal != '26' && sucursal != '27' && sucursal != '28') {
                if (sucursal == '52' || sucursal == '57') {
                    imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
                } else {
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                }
            }
            else {
                if (sucursal == '22') // Altavista KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5';
                if (sucursal == '35') // Can-Cun KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17';
                if (sucursal == '36') // Chihuahua KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa';
                if (sucursal == '23') // Guadalajara KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773';
                if (sucursal == '24') // Monterrey KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2';
                if (sucursal == '25') // Polanco KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7';
                if (sucursal == '37') // Puebla KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2';
                if (sucursal == '21') // Santa FE KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d';
                if (sucursal == '26') // Satelite KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4';
                if (sucursal == '27') // Tijuana KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7';
                if (sucursal == '28') // Veracruz KHG
                    imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20';
            }
            return imageBack;
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
        * @param {String} checks Parametro que revisa si el valor es verdadero o falso
        */
        function checado(checks) {
            var check = "";
            if (checks == true) {
                var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
                check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xml.escape({ xmlText: pathCheck }) + '" />';
            }
            if (checks == false) {
                var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
                check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xml.escape({ xmlText: pathRemove }) + '" />';
            }
            if (checks == "SI" || checks == "Si" || checks == "Sí") {
                var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
                var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
                check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xml.escape({ xmlText: pathYes }) + '" />)';
                check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xml.escape({ xmlText: pathNot }) + '" />)';
            }
            if (checks == 'NO' || checks == 'No') {
                var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
                var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
                check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xml.escape({ xmlText: pathYes }) + '" />)';
                check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xml.escape({ xmlText: pathNot }) + '" />)';
            }
            /*             if (checks != "") {
                            var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
                            check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xml.escape({ xmlText: pathCheck }) + '" />';
                        }
                        if (checks == "") {
                            var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
                            check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xml.escape({ xmlText: pathRemove }) + '" />';
                        } */
            return check;
        }

        function obtenerEnfermeroA(namesEnfermeros) {
            var cadenaEnfermeros = String(namesEnfermeros); // namesEnfermeros;
            var indiceBuscado = cadenaEnfermeros.indexOf(',');
            enfermerosFormateado = cadenaEnfermeros.substring(0, indiceBuscado);

            return enfermerosFormateado;
        }

        function obtenerEnfermeroB(namesEnfermeros) {
            var cadenaEnfermeros = String(namesEnfermeros); // namesEnfermeros;
            var indiceBuscado = cadenaEnfermeros.indexOf(',');
            var largoCadena = cadenaEnfermeros.length;
            enfermerosFormateado = cadenaEnfermeros.substring(indiceBuscado + 1, largoCadena);

            return enfermerosFormateado;
        }

        /**
         * 
         * @param {string} nameEspecialist Name of professional
         * @param {string} request c = Cedula or i = Institution
         */
        function obtenerCedula(nameEspecialist, request) {
            var cedula = '';
            var institucion = '';
            log.debug('', typeof nameEspecialist);
            var clean_nameEspecialist = function (cadena) {
                var chars = {
                    "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
                    "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u",
                    "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
                    "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U"
                };

                var expr = /[áàéèíìóòúù]/ig;
                var res = cadena.replace(expr, function (e) { return chars[e]; });
                return res;
            };

            nameEspecialist = clean_nameEspecialist(nameEspecialist);

            if ((nameEspecialist != '') && (request === 'c' || request === 'i')) {
                var arrayNameEspecialist = nameEspecialist.split(' ');
                var arraySerchIncorrect = ['Dr.', 'DR.', 'Dra.', 'DRA.', 'Dr', 'DR', 'Dra', 'DRA', 'Enf.', 'ENF.', 'Enf', 'ENF', 'Enfermero', 'Enfermera'];

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

                log.debug('name', name);

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