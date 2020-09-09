/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/file', 'N/record', 'N/xml', 'N/search'],

    function (widget, file, record, xmlMod, search) {

        function onRequest(context) {
            // MAIN VARS
            // Variables para crear los objetos principales
            var recordCase_Id = context.request.parameters.recId;
            var caso = record.load({ type: 'supportcase', id: recordCase_Id });
            //var firmaRepositorio = caso.getValue({ fieldId: 'custevent855' }) || null;
            var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente
            var cliente = record.load({ type: 'customer', id: companyId }); // Variable que guarda el objeto Customer

            //CUSTOMER
            // Variables Informacion General obtenidas del CLIENTE
            var sucursalId = cliente.getValue({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var sucursalText = cliente.getText({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var nombreCliente = cliente.getText({ fieldId: 'altname' });
            var numeroExpediente = cliente.getText({ fieldId: 'entityid' });
            var identificacionCliente = cliente.getText({ fieldId: 'custentity251' }) || '';
            var telefonoCliente = cliente.getText({ fieldId: 'phone' }) || '';
            var direccionCliente = cliente.getText({ fieldId: 'defaultaddress' }) || '';
            var subsidiaria = cliente.getValue({ fieldId: 'subsidiary' });
            var urlFondo = '';

            if (subsidiaria == '19') {
                urlFondo = 'https://3559763.app.netsuite.com/core/media/media.nl?id=5124653&c=3559763&h=778f10e080998dd8a8af';
            } else {
                urlFondo = 'https://soportekaloni.com/consentimiento/kaloni.png';
            }

            var search_CompanyText = numeroExpediente + ' ' + nombreCliente;
            try {
                var idHistoriaClinica = null;
                var cargarBusqueda = search.load({ id: 'customsearch6993' });
                cargarBusqueda.filters.push(search.createFilter({ name: 'company', operator: search.Operator.IS, values: search_CompanyText }));
                cargarBusqueda.filters.push(search.createFilter({ name: 'title', operator: search.Operator.CONTAINS, values: 'Histor' }));
                cargarBusqueda.run().each(function (result) {
                    idHistoriaClinica = result.getValue({ name: 'internalid' });
                });
                log.debug('Id Historial Clinico', cargarBusqueda + ' Resultado ' + idHistoriaClinica);
                // VARIABLES HISTORIA CLINICA
                var historiaClinica = record.load({ type: 'supportcase', id: idHistoriaClinica });
                general_peso = historiaClinica.getText({ fieldId: 'custevent506' }) || '';
                general_talla = historiaClinica.getText({ fieldId: 'custevent507' }) || '';
                general_imc = historiaClinica.getText({ fieldId: 'custevent541' }) || '';
                general_imc = parseFloat(general_imc).toFixed(2);
            } catch (error) {
                log.error('Error de busqueda de historial clinico', error);
            }

            // VARIABLES DE CASE
            // Variables Mapeo EXPLORACION FISICA
            // Variables Informacion General obtenidads del Case
            var sucursalTextCaso = caso.getText({ fieldId: 'custevent2' }); // Variable que guarda el nombre de la sucursal en String del case
            var fechaCaso = caso.getText({ fieldId: 'startdate' }); // variable que guarda la fecha en la que se presenta el caso
            var hc_enfermeroExtraccion = caso.getText({ fieldId: 'custevent71' }) || ""; // variable que guarda el enfermero de extraccion del caso
            var hc_enfermeroImplantacion = caso.getText({ fieldId: 'custevent72' }) || ""; // variable que guarda el enfermero de implantacion del caso
            var medicoResponsableProcedimiento = caso.getText({ fieldId: 'custevent28' }) || ""; // variable que guarda el medico responsable del caso
            var enfermerosResponsableProcedimiento = caso.getText({ fieldId: 'custevent29' }) || ""; // variable que guarda el enfermeto responsable del caso
            var edoCivilCliente = caso.getText({ fieldId: 'custevent206' }) || '';
            var fechNacCliente = caso.getText({ fieldId: 'custevent331' });
            var sexoCliente = caso.getText({ fieldId: 'custevent634' }) || '';

            //APOYOS
            // Variables obtenias desde funciones locales
            //var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
            var sucReal = sucursalReal(sucursalText); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
            var edadCliente = calcYearInt(fechNacCliente, fechaCaso);

            // Variables Mapeo DIAGNOSTICO
            var body_diagnostico = caso.getText({ fieldId: 'custevent281' }) || '';
            var body_tratamiento = caso.getText({ fieldId: 'custevent280' }) || '';
            var body_exploracion_hallazgos = caso.getText({ fieldId: 'custevent279' }) || '';

            // Variables Mapeo del grupo ANTROPOMETRIA Y SOMATOMETRIA
            var body_per_abdominal = caso.getText({ fieldId: 'custevent625' });
            var body_per_cadera = caso.getText({ fieldId: 'custevent626' });
            var body_per_muslo = caso.getText({ fieldId: 'custevent627' });
            var body_per_brazo = caso.getText({ fieldId: 'custevent628' });
            var body_plie_bicipital = caso.getText({ fieldId: 'custevent629' });
            var body_plie_tricipital = caso.getText({ fieldId: 'custevent630' });
            var body_plie_subescapular = caso.getText({ fieldId: 'custevent631' });
            var body_plie_suprailiaco = caso.getText({ fieldId: 'custevent632' });
            var body_plie_abdominal = caso.getText({ fieldId: 'custevent633' });

            // Variables Mapeo del grupo AREA Y TRATAMIENTO PROYECTADO
            var body_zonaA1 = caso.getText({ fieldId: 'custevent581' }); //Variable ZONA 
            var body_zonaA = caso.getText({ fieldId: 'custevent582' }); //Variable ZONA 
            var body_zonaA2 = caso.getText({ fieldId: 'custevent583' }); //Variable ZONA 
            var body_zonaA3 = caso.getText({ fieldId: 'custevent584' }); //Variable ZONA 
            var body_zonaA4 = caso.getText({ fieldId: 'custevent585' }); //Variable ZONA 
            var body_zonaA5 = caso.getText({ fieldId: 'custevent586' }); //Variable ZONA 
            var body_zonaA6 = caso.getText({ fieldId: 'custevent587' }); //Variable ZONA 
            var body_zonaB = caso.getText({ fieldId: 'custevent588' }); //Variable ZONA 
            var body_zonaC1 = caso.getText({ fieldId: 'custevent589' }); //Variable ZONA 
            var body_zonaC2 = caso.getText({ fieldId: 'custevent590' }); //Variable ZONA 
            var body_zonaD = caso.getText({ fieldId: 'custevent591' }); //Variable ZONA 
            var body_zonaF1 = caso.getText({ fieldId: 'custevent592' }); //Variable ZONA 
            var body_zonaF2 = caso.getText({ fieldId: 'custevent593' }); //Variable ZONA 
            var body_zonaG1 = caso.getText({ fieldId: 'custevent594' }); //Variable ZONA 
            var body_zonaG2 = caso.getText({ fieldId: 'custevent595' }); //Variable ZONA 
            var body_zonaH1 = caso.getText({ fieldId: 'custevent596' }); //Variable ZONA 
            var body_zonaH2 = caso.getText({ fieldId: 'custevent597' }); //Variable ZONA 
            var body_zonaI1 = caso.getText({ fieldId: 'custevent598' }); //Variable ZONA 
            var body_zonaI2 = caso.getText({ fieldId: 'custevent599' }); //Variable ZONA 
            var body_zonaJ = caso.getText({ fieldId: 'custevent600' }); //Variable ZONA 
            var body_zonaK1 = caso.getText({ fieldId: 'custevent601' }); //Variable ZONA 
            var body_zonaK2 = caso.getText({ fieldId: 'custevent602' }); //Variable ZONA 
            var body_zonaL = caso.getText({ fieldId: 'custevent603' }); //Variable ZONA 
            var body_zonaM = caso.getText({ fieldId: 'custevent604' }); //Variable ZONA 
            var body_zonaN = caso.getText({ fieldId: 'custevent605' }); //Variable ZONA 
            var body_zonaP1 = caso.getText({ fieldId: 'custevent606' }); //Variable ZONA 
            var body_zonaP2 = caso.getText({ fieldId: 'custevent607' }); //Variable ZONA 
            var body_zonaP3 = caso.getText({ fieldId: 'custevent608' }); //Variable ZONA 
            var body_zonaP4 = caso.getText({ fieldId: 'custevent609' }); //Variable ZONA 
            var body_zonaQ1 = caso.getText({ fieldId: 'custevent610' }); //Variable ZONA 
            var body_zonaQ2 = caso.getText({ fieldId: 'custevent611' }); //Variable ZONA 
            var body_zonaQ3 = caso.getText({ fieldId: 'custevent612' }); //Variable ZONA 
            var body_zonaQ4 = caso.getText({ fieldId: 'custevent613' }); //Variable ZONA 
            var body_zonaR = caso.getText({ fieldId: 'custevent614' }); //Variable ZONA 
            var body_zonaS = caso.getText({ fieldId: 'custevent615' }); //Variable ZONA 
            var body_zonaT = caso.getText({ fieldId: 'custevent616' }); //Variable ZONA 
            var body_zonaU = caso.getText({ fieldId: 'custevent617' }); //Variable ZONA 
            var body_zonaV = caso.getText({ fieldId: 'custevent618' }); //Variable ZONA 
            var body_zonaW = caso.getText({ fieldId: 'custevent619' }); //Variable ZONA 

            // MANEJO DE FIRMAS
            var firmaMedico_base64 = caso.getValue({ fieldId: 'custevent325' }) || null; //Variable ZONA;
            var firmaMedico_png = caso.getValue({ fieldId: 'custevent320' }) || null; //Variable ZONA;

            // MANEJO DE IMAGENES
            var imagenRostro = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4';
            var imagenCuerpo = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030';
            var pintarRostro = caso.getValue({ fieldId: 'custevent801' }) || null;
            var pintarCuerpo = caso.getValue({ fieldId: 'custevent810' }) || null;

            var field_firmaNula = 'data:image/png;base64,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';

            // Imagen Rostro
            if (pintarRostro != null) {
                //var imagenPintarRostro_carga = file.load({ id: pintarRostro });
                //var imagenPintarRostro_link = imagenPintarRostro_carga.getContents();
                imagenRostroExpediente = pintarRostro; // imagenPintarRostro_link;
            } else {
                imagenRostroExpediente = imagenRostro;
            }
            // Imagen Cuerpo
            if (pintarCuerpo != null) {
                //var imagenPintarCuerpo_carga = file.load({ id: pintarCuerpo});
                //var imagenPintarCuerpo_link = imagenPintarCuerpo_carga.getContents();
                imagenCuerpoExpediente = pintarCuerpo; // imagenPintarCuerpo_link;
            } else {
                imagenCuerpoExpediente = imagenCuerpo;
            }
            // Imagen Firma
            if (firmaMedico_base64 != null) {
                firmaPaciente = firmaMedico_base64;
            } else {
                firmaPaciente = field_firmaNula;
            }

            var formulario = widget.createForm({ title: 'Firma Diagnóstico Body & Skin' });
            var pdfExpDiagBodySkin = formulario.addField({ id: 'custpage_expdiagn_bodyskin', label: 'Expediente Diagnostico BodySkin', type: 'inlinehtml' });
            var zonasFirma = formulario.addField({ id: 'custpage_zonafirmapacientebodyskin', label: 'Firma Paciente', type: 'inlinehtml' });

            // ZONA DE ENCABEZADOS
            // FICHA DE IDENTIFICACION
            var encabezados_fichaIdentificacion = '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;">1. FICHA DE IDENTIFICACIÓN</td>' +
                '</tr>' +
                '<tr>' +
                '<td width="100%">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;">' +
                '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + numeroExpediente + '</td><td><b>GÉNERO: </b> ' + sexoCliente + '</td></tr>' +
                '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
                '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
                '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
                '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            pdfExpDiagBodySkin.defaultValue = '<body>' +
                '<div align="" style="background: url(' + urlFondo + ') no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                '<h1 id="titulo" align="center">FIRMA DE DIAGNÓSTICO BODY & SKIN</h1>';

            pdfExpDiagBodySkin.defaultValue += '<p style="width:75%;height:20px;background-color:#346094;color:#FFFFFF;font-size: 16px;font-family:Aria, sans-serif;text-align:center;margin:auto;padding-top:2px;" align="center"><b style="vertical-align:middle;">VALORACIÓN INTEGRAL SKIN, BODY Y QUIRÚRGICOS</b></p>';

            pdfExpDiagBodySkin.defaultValue += encabezados_fichaIdentificacion;

            pdfExpDiagBodySkin.defaultValue += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td><b>2. EXPLORACIÓN FÍSICA</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;height:160px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr>' +
                '<td valign="top">' + body_exploracion_hallazgos;

            pdfExpDiagBodySkin.defaultValue += '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>3. DIAGNÓSTICO</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;height:120px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr style="background-color: #cadcff">' +
                '<td valign="top">' + body_diagnostico + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>4. TRATAMIENTO</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;height:120px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr>' +
                '<td valign="top">' + body_tratamiento + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<table style="width:100%;font-size:11px;font-family:Aria,sans-serif;" cellspacing="0">' +
                '<tr><td align="center" style="width:100%;"><img id="firma" width="100px" height="100px" src="' + xmlMod.escape({ xmlText: firmaPaciente }) + '" /></td></tr>' +
                '<tr><td align="center" style="width:100%;">' + nombreCliente + '</td></tr>' +
                '<tr><td align="center" style="width:10%;"></td></tr>' +
                '<tr><td align="center"><p style="width:140px;border-top:1px solid #000000;text-align:center;font-weight: bold;">' + 'Firma Paciente' + '</p></td></tr>' +
                '</table>';

            pdfExpDiagBodySkin.defaultValue += '<br /><hr /><p style="width:75%;height:20px;background-color:#346094;color:#FFFFFF;font-size: 16px;font-family:Aria, sans-serif;text-align:center;margin:auto;padding-top:2px;" align="center"><b>VALORACIÓN INTEGRAL SKIN, BODY Y QUIRÚRGICOS</b></p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td ><b>5. ANTROPOMETRÍA Y SOMATOMETRÍA</b> <em> (solo Body)</em></td>' +
                '<td rowspan="5" valign="bottom">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td valign="bottom">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td align="center"><img width="340px" height="340px" src="' + xmlMod.escape({ xmlText: imagenRostroExpediente }) + '" /></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td valign="bottom">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td align="center"><img width="340px" height="340px" src="' + xmlMod.escape({ xmlText: imagenCuerpoExpediente }) + '" /></td>' +
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
                '<td width="80px" style="border-bottom: 1px solid #346094;border-right: 1px solid #346094;"><b>PESO: </b>' + general_peso + '</td>' +
                '<td style="border-bottom: 1px solid #346094;"><b>TALLA: </b>' + general_talla + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-bottom: 1px solid #346094;border-right: 1px solid #346094;"><b>I.M.C.:</b></td>' +
                '<td style="border-bottom: 1px solid #346094;">' + general_imc + ' kg/m2</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="border-bottom: 1px solid #346094;border-right: 1px solid #346094;"><b>PERÍMETROS</b></td>' +
                '<td style="border-bottom: 1px solid #346094;">' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;" cellspacing="0">' +
                '<tr>' +
                '<td><b>ABDOMINAL: </b>' + body_per_abdominal + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>CADERA: </b>' + body_per_cadera + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>MUSLO: </b>' + body_per_muslo + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>BRAZO: </b>' + body_per_brazo + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff">' +
                '<td style="border-right: 1px solid #346094;"><b>PLIEGUES CUTÁNEOS</b></td>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;" cellspacing="0">' +
                '<tr>' +
                '<td><b>BICIPITAL: </b>' + body_plie_bicipital + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>TRICIPITAL: </b>' + body_plie_tricipital + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>SUBESCAPULAR: </b>' + body_plie_subescapular + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>SUPRAILIACO: </b>' + body_plie_suprailiaco + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>ABDOMINAL: </b>' + body_plie_abdominal + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td><b>6. ÁREA A TRATAR Y TRATAMIENTO PROYECTADO</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" cellspacing="0">' +
                '<tr>' +
                '<td align="center" width="80px" style="border-right: 1px solid #346094;"><b>ZONA A TRATAR</b></td>' +
                '<td align="center"><b>TRATAMIENTO PROYECTADO</b></td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">A</td>' +
                '<td>' + body_zonaA + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">A1</td>' +
                '<td>' + body_zonaA1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">A2</td>' +
                '<td>' + body_zonaA2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">A3</td>' +
                '<td>' + body_zonaA3 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">A4</td>' +
                '<td>' + body_zonaA4 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">A5</td>' +
                '<td>' + body_zonaA5 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">A6</td>' +
                '<td>' + body_zonaA6 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">B</td>' +
                '<td>' + body_zonaB + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">C1</td>' +
                '<td>' + body_zonaC1 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">C2</td>' +
                '<td>' + body_zonaC2 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">D</td>' +
                '<td>' + body_zonaD + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">F1</td>' +
                '<td>' + body_zonaF1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">F2</td>' +
                '<td>' + body_zonaF2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">G1</td>' +
                '<td>' + body_zonaG1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">G2</td>' +
                '<td>' + body_zonaG2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">H1</td>' +
                '<td>' + body_zonaH1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">H2</td>' +
                '<td>' + body_zonaH2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">I1</td>' +
                '<td>' + body_zonaI1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">I2</td>' +
                '<td>' + body_zonaI2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">J</td>' +
                '<td>' + body_zonaJ + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">K1</td>' +
                '<td>' + body_zonaK1 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">K2</td>' +
                '<td>' + body_zonaK2 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">L</td>' +
                '<td>' + body_zonaL + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">M</td>' +
                '<td>' + body_zonaM + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">N</td>' +
                '<td>' + body_zonaN + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">P1</td>' +
                '<td>' + body_zonaP1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">P2</td>' +
                '<td>' + body_zonaP2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">P3</td>' +
                '<td>' + body_zonaP3 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">P4</td>' +
                '<td>' + body_zonaP4 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">Q1</td>' +
                '<td>' + body_zonaQ1 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">Q2</td>' +
                '<td>' + body_zonaQ2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">Q3</td>' +
                '<td>' + body_zonaQ3 + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">Q4</td>' +
                '<td>' + body_zonaQ4 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">R</td>' +
                '<td>' + body_zonaR + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">S</td>' +
                '<td>' + body_zonaS + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">T</td>' +
                '<td>' + body_zonaT + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">U</td>' +
                '<td>' + body_zonaU + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td align="center" style="border-right: 1px solid #346094;">V</td>' +
                '<td>' + body_zonaV + '</td>' +
                '</tr>' +
                '<tr style="background-color: #cadcff;">' +
                '<td align="center" style="border-right: 1px solid #346094;">W</td>' +
                '<td>' + body_zonaW + '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</body>';

            zonasFirma.defaultValue = '<style type="text/css">' +
                '@media only screen and (min-width: 576px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:12px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                'background-size: contain;' +
                'background-repeat: no-repeat;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 500px;' +
                'margin-top:10px' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 120px;' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 768px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:12px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                'background-size: contain;' +
                'background-repeat: no-repeat;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 500px;' +
                'margin-top:10px;' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 120px;' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 992px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:16px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                'background-size: cover;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 500px;' +
                'margin-top:10px;' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 120px;' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 1200px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:16px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                'background-size: cover;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 500px;' +
                'margin-top:10px;' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 120px;' +
                '    }' +
                '}' +

                'h1 {' +
                '  border-bottom: 1px solid  #5D6975;' +
                '  color: #5D6975;' +
                '  font-size: 2.4em;' +
                '  line-height: 1.4em;' +
                '  font-weight: normal;' +
                '  text-align: center;' +
                '  margin: 0 0 20px 0;' +
                '}' +

                '#notices .notice {' +
                '  color: #5D6975;' +
                '  font-size: 1.2em;' +
                '}' +

                'footer {' +
                '  color: #5D6975;' +
                '  width: 100%;' +
                '  height: 30px;' +
                '  position: absolute;' +
                '  bottom: 0;' +
                '  border-top: 1px solid #C1CED9;' +
                '  padding: 8px 0;' +
                '  text-align: center;' +
                '}' +
                'body {font-family: Arial, Helvetica, sans-serif;}' +
                '.modal {' +
                '  display: none;' +
                '  position: fixed;' +
                '  z-index: 1; ' +
                '  padding-top: 100px; ' +
                '  left: 0;' +
                '  top: 0;' +
                '  width: 100%; ' +
                '  height: 100%;' +
                '  overflow: auto; ' +
                '  background-color: rgba(0,0,0,0.4);' +
                '  justify-content:center;' +
                '}' +
                '.modal-contentFirma {' +
                '  background-color: #fefefe;' +
                '  margin: auto;' +
                '  padding: 15px;' +
                '  border: 1px solid #888;' +
                '  width: 438px;' +
                '  height: 468px;' +
                '}' +
                '</style>' +

                '<div id="myModal" class="modal">' +
                '<div class="modal-contentFirma">' +
                '<canvas id="canvas-Firma" width="400" height="400" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;);">Get a better browser, bro.</canvas>' +
                '<br /><b>Firma Paciente</b>' +
                '<br /><button id="btn_cerrarFirma">Terminar</button>' +
                '</div>' +
                '</div>' +

                '<script type="application/javascript">' +
                'document.addEventListener("touchmove", function(e) {' +
                '  e.preventDefault();' +
                '},' +
                '{ passive: true });' +

                '(function() {' +
                '' +
                '    window.requestAnimFrame = (function (callback) {' +
                '        return window.requestAnimationFrame || ' +
                '                    window.webkitRequestAnimationFrame ||' +
                '                    window.mozRequestAnimationFrame ||' +
                '                    window.oRequestAnimationFrame ||' +
                '                    window.msRequestAnimaitonFrame ||' +
                '                    function (callback) {' +
                '                        window.setTimeout(callback, 1000/60);' +
                '                    };' +
                '    })();' +
                '' +
                '    var canvasFirma = document.getElementById("canvas-Firma");' +
                '    var ctx = canvasFirma.getContext("2d");' +
                '    ctx.strokeStyle = "#000000";' +
                '    ctx.lineWith = 2;' +
                '' +
                '    var drawingFirma = false;' +
                '    var mousePosFirma = { x:0, y:0 };' +
                '    var lastPosFirma = mousePosFirma;' +
                '' +
                '    canvasFirma.addEventListener("mousedown", function (e) {' +
                '        drawingFirma = true;' +
                '        lastPosFirma = getMousePos(canvasFirma, e);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("mouseup", function (e) {' +
                '        drawingFirma = false;' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("mousemove", function (e) {' +
                '        mousePosFirma = getMousePos(canvasFirma, e);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("touchstart", function (e) {' +
                '        mousePosFirma = getTouchPos(canvasFirma, e);' +
                '        var touch = e.touches[0];' +
                '        var mouseEvent = new MouseEvent("mousedown", {' +
                '            clientX: touch.clientX,' +
                '            clientY: touch.clientY' +
                '        });' +
                '        canvasFirma.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("touchend", function (e) {' +
                '        var mouseEvent = new MouseEvent("mouseup", {});' +
                '        canvasFirma.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("touchmove", function (e) {' +
                '        var touch = e.touches[0];' +
                '        var mouseEvent = new MouseEvent("mousemove", {' +
                '            clientX: touch.clientX,' +
                '            clientY: touch.clientY' +
                '        });' +
                '        canvasFirma.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchstart", function (e) {' +
                '        if (e.target == canvasFirma) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchend", function (e) {' +
                '        if (e.target == canvasFirma) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchmove", function (e) {' +
                '        if (e.target == cancanvasFirmavas) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    function getMousePos(canvasDom, mouseEvent) {' +
                '        var rect = canvasDom.getBoundingClientRect();' +
                '        return {' +
                '            x: mouseEvent.clientX - rect.left,' +
                '            y: mouseEvent.clientY - rect.top' +
                '        };' +
                '    }' +
                '' +
                '    function getTouchPos(canvasDom, touchEvent) {' +
                '        var rect = canvasDom.getBoundingClientRect();' +
                '        return {' +
                '            x: touchEvent.touches[0].clientX - rect.left,' +
                '            y: touchEvent.touches[0].clientY - rect.top' +
                '        };' +
                '    }' +
                '' +
                '    function renderCanvas() {' +
                '        if (drawingFirma) {' +
                '            ctx.moveTo(lastPosFirma.x, lastPosFirma.y);' +
                '            ctx.lineTo(mousePosFirma.x, mousePosFirma.y);' +
                '            ctx.stroke();' +
                '            lastPosFirma = mousePosFirma;' +
                '        }' +
                '    }' +
                '' +
                '    (function drawLoop () {' +
                '        requestAnimFrame(drawLoop);' +
                '        renderCanvas();' +
                '    })();' +
                '' +
                '})();' +
                '</script>';


            var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
            fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

            formulario.addButton({ id: 'custpage_pacienteDiagnosticoBodySkin_save', label: 'Enviar Firma', functionName: 'guardarFirma' });
            formulario.addButton({ id: 'custpage_pacienteDiagnosticoBodySkin_clean', label: 'Limpiar Firma', functionName: 'limpiarFirma' });
            formulario.addButton({ id: 'custpage_pacienteDiagnosticoBodySkin_sign', label: 'Firmar', functionName: 'crearFirma' });

            formulario.clientScriptFileId = '3449063';

            context.response.writePage(formulario);
        }

        return ({
            onRequest: onRequest
        });
    }
);

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
    var pathCheck = '';
    var pathYes = '';
    var pathNot = '';
    var pathRemove = '';

    if (checks == true) {
        pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
        check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathCheck }) + '" />';
    }
    if (checks == false) {
        pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
        check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathRemove }) + '" />';
    }
    if (checks == "SI" || checks == "Si" || checks == "Sí") {
        pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
        pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
        check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathYes }) + '" />)';
        check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathNot }) + '" />)';
    }
    if (checks == "NO" || checks == "No") {
        pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
        pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
        check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathYes }) + '" />)';
        check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathNot }) + '" />)';
    }
    if (checks != "") {
        pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
        check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathCheck }) + '" />';
    }
    if (checks == "") {
        pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
        check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathRemove }) + '" />';
    }
    return check;
}