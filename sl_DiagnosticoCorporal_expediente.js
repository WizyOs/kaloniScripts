/**
* @NApiVersion 2.x
* @NScriptType Suitelet
* @NModuleScope Public
*/

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/file', 'N/search'],

    function (record, log, render, xmlMod, file, search) {

        function onRequest(context) {

            var identificacionCliente = '';
            var general_peso = "";
            var general_talla = "";
            var general_imc = "";
            var general_imc = "";

            // MAIN VARS
            // Variables para crear los objetos principales
            var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
            var caso = record.load({ type: 'supportcase', id: recId }); // Variable que guarda el objeto Case
            var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente
            var cliente = record.load({ type: 'customer', id: companyId }); // Variable que guarda el objeto Customer
            var custevent_parentrecid = cliente.getValue({ fieldId: 'custevent_parentrecid' }) || null;
            //if (custevent_parentrecid !== null) {
                //var casoHC_parent = record.load({ type: 'supportcase', id: custevent_parentrecid });
                //identificacionCliente = casoHC_parent.getText({ fieldId: 'custentity234' }) || '';
            //}            

            //CUSTOMER
            // Variables Informacion General obtenidas del CLIENTE
            var sucursalId = cliente.getValue({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var sucursalText = cliente.getText({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var nombreCliente = cliente.getText({ fieldId: 'altname' });
            var numeroExpediente = cliente.getText({ fieldId: 'entityid' });
            var identificacionCliente = cliente.getText({ fieldId: 'custentity234' }) || '';
            var telefonoCliente = cliente.getText({ fieldId: 'mobilephone' }) || '';
            var direccionCliente = cliente.getText({ fieldId: 'defaultaddress' }) || '';

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
            var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
            var sucReal = sucursalReal(sucursalText); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
            var edadCliente = calcYearInt(fechNacCliente, fechaCaso);

            // Variables Mapeo DIAGNOSTICO
            var body_diagnostico = caso.getText({ fieldId: 'custevent281' }) || '';
            var body_tratamiento = caso.getText({ fieldId: 'custevent1066' }) || '';
            var body_exploracion_hallazgos = caso.getText({ fieldId: 'custevent279' }) || '';
            var body_exploracion_relevantes = caso.getText({ fieldId: 'custevent580' }) || '';

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
            var firmaMedico_base64 = caso.getValue({ fieldId: 'custevent325' }) || null;
            var firmaMedico_png = caso.getValue({ fieldId: 'custevent320' }) || null;

            // MANEJO DE GRAFICOS
            var imagenRostro = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4';
            var imagenCuerpo = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030';
            var pintarRostro = caso.getValue({ fieldId: 'custevent801' }) || null;
            var pintarCuerpo = caso.getValue({ fieldId: 'custevent810' }) || null;

            // MANEJO DE FOTOGRAFÍAS
            var id_image_1 = caso.getValue({ fieldId: 'custevent313' }) || 1592235;
            var url_image_1 = 'data:image/jpg;base64,' + file.load({ id: id_image_1 }).getContents();
            var id_image_2 = caso.getValue({ fieldId: 'custevent314' }) || 1592235;
            var url_image_2 = 'data:image/jpg;base64,' + file.load({ id: id_image_2 }).getContents();
            var id_image_3 = caso.getValue({ fieldId: 'custevent315' }) || 1592235;
            var url_image_3 = 'data:image/jpg;base64,' + file.load({ id: id_image_3 }).getContents();
            var id_image_4 = caso.getValue({ fieldId: 'custevent316' }) || 1592235;
            var url_image_4 = 'data:image/jpg;base64,' + file.load({ id: id_image_4 }).getContents();
            var id_image_5 = caso.getValue({ fieldId: 'custevent317' }) || 1592235;
            var url_image_5 = 'data:image/jpg;base64,' + file.load({ id: id_image_5 }).getContents();
            var id_image_6 = caso.getValue({ fieldId: 'custevent318' }) || 1592235;
            var url_image_6 = 'data:image/jpg;base64,' + file.load({ id: id_image_6 }).getContents();
            var id_image_7 = caso.getValue({ fieldId: 'custevent543' }) || 1592235;
            var url_image_7 = 'data:image/jpg;base64,' + file.load({ id: id_image_7 }).getContents();
            var id_image_8 = caso.getValue({ fieldId: 'custevent544' }) || 1592235;
            var url_image_8 = 'data:image/jpg;base64,' + file.load({ id: id_image_8 }).getContents();
            var image_null = '';

            log.debug('image', url_image_1 + ' ' + url_image_2 + ' ' + url_image_3 + ' ' + url_image_4 + ' ' + url_image_5 + ' ' + url_image_6 + ' ' + url_image_7 + ' ' + url_image_8);

            var canvasEmpty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAU+UlEQVR4Xu3VAQ0AAAjDMPBvGh0sxcF7ku84AgQIECBA4L3Avk8gAAECBAgQIDAG3RMQIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBA4YhYB9bb5IxgAAAAASUVORK5CYII=";

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
                firmaPaciente = canvasEmpty;
            }
            log.debug('FIRMA Paciente', pintarRostro);

            // ZONA DE ENCABEZADOS
            // FICHA DE IDENTIFICACION
            var encabezados_fichaIdentificacion = '<table style="margin-top: -70px !important;width:60%;font-size:12px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 11px;font-weight:bold;color:#346094;">FICHA DE IDENTIFICACIÓN</td>' +
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

            // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE
            //
            //
            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
                '<pdf>\n' +
                '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
                xml += encabezados_fichaIdentificacion;

            xml += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;margin-top:-50px !important;" align="center"><b>VALORACIÓN INTEGRAL SKIN, BODY Y QUIRÚRGICOS</b></p>';

           

            xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td style="font-size: 11px;font-weight:bold;color:#346094;">2. EXPLORACIÓN FÍSICA</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;height:160px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
                '<tr>' +
                '<td valign="top">' + body_exploracion_hallazgos;

            xml += '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="font-size: 11px;font-weight:bold;color:#346094;">3. DIAGNÓSTICO</td>' +
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
                '<td style="font-size: 11px;font-weight:bold;color:#346094;">4. TRATAMIENTO</td>' +
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
                '<tr><td align="center" style="width:100%;"><img width="100px" height="100px" src="' + firmaPaciente + '" /></td></tr>' +
                '<tr><td align="center" style="width:100%;">' + nombreCliente + '</td></tr>' +
                '<tr><td align="center" style="width:10%;"></td></tr>' +
                '<tr><td align="center"><p style="width:140px;border-top:1px solid #000000;text-align:center;font-weight: bold;">' + 'Firma Paciente' + '</p></td></tr>' +
                '</table>';

            xml += saltoPagina(encabezados_fichaIdentificacion);

            xml += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>VALORACIÓN INTEGRAL SKIN, BODY Y QUIRÚRGICOS</b></p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
                '<tr>' +
                '<td style="font-size: 11px;font-weight:bold;color:#346094;">5. ANTROPOMETRÍA Y SOMATOMETRÍA <em> (solo Body)</em></td>' +
                '<td rowspan="5" valign="bottom">' +
                '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td valign="bottom">' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td><img width="340px" height="340px" src="' + xmlMod.escape({ xmlText: imagenRostroExpediente }) + '" /></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td valign="bottom">' +
                '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
                '<tr>' +
                '<td><img width="340px" height="340px" src="' + xmlMod.escape({ xmlText: imagenCuerpoExpediente }) + '" /></td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
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
                '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;" cellspacing="0">' +
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
                '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;" cellspacing="0">' +
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
                '<td style="font-size: 11px;font-weight:bold;color:#346094;">6. ÁREA A TRATAR Y TRATAMIENTO PROYECTADO</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<table style="width:100%;font-size:6.5px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" cellspacing="0">' +
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
                '</table>';

                xml += saltoPagina(encabezados_fichaIdentificacion);

                xml += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>IMÁGENES DE VALORACIÓN</b></p>' +
                '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
                '<tr><td align="center">Imagen valoración 1</td><td align="center">Imagen valoración 2</td></tr>' +
                '<tr>' +
                '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape ({ xmlText: url_image_1 }) + '" /></td>' +
                '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape ({ xmlText: url_image_2 }) + '" /></td>' +
                '</tr>' +
                '<tr><td align="center">Imagen valoración 3</td><td align="center">Imagen valoración 4</td></tr>' +
                '<tr>' +
                '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape ({ xmlText: url_image_3 }) + '" /></td>' +
                '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape ({ xmlText: url_image_4 }) + '" /></td>' +
                '</tr>' +
                '<tr><td align="center">Imagen rostro 1</td><td align="center">Imagen rostro 2</td></tr>' +
                '<tr>' +
                '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape ({ xmlText: url_image_5 }) + '" /></td>' +
                '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape ({ xmlText: url_image_6 }) + '" /></td>' +
                '</tr>' +
                '</table>';

            xml += '</body></pdf>';
            context.response.renderPdf({ xmlString: xml });
        }

        /**
         * FUNCTION'S ZONE
         */

        /**
         * Function que retorna un string de HTML con estilo para generar un salto de página
         * y además agrega el espacio necesario para inciar la siguiente página en el sitio
         * correcto después del logo de hoja membretada
         */
        function saltoPagina(encabezados_fichaIdentificacion) {
            var saltoPagina = '<div style="page-break-after:always;"></div>';
            saltoPagina += encabezados_fichaIdentificacion;

            return saltoPagina;
        }

        /**
         * Funcion que obtiene la imagen de fondo correspondiente a la sucursal
         * @param {int} sucursal Identificador de la sucursal
         */
        function getImageBackGround(sucursal) {
            var imageBack = '';
            if (sucursal != '22' && sucursal != '35' && sucursal != '36' && sucursal != '23' && sucursal != '24' && sucursal != '25' && sucursal != '37' && sucursal != '21' && sucursal != '26' && sucursal != '27' && sucursal != '28') {
                if (sucursal == "52" || sucursal == "57") {
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
            var sucSinModif = sucursalText;
            var largoSucursal_base = sucursalText.length;
            largoSucursal_menosKHG = largoSucursal_base - 4;
        
            var validateKHG  = sucursalText.slice(largoSucursal_menosKHG, largoSucursal_base);
        
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
         * @param {String} checks Parametro que revisa si el valor es verdadero o falso
         */
        function checado(checks) {
            var check = "";
            if (checks == true) {
                var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
                check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathCheck }) + '" />';
            }
            if (checks == false) {
                var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
                check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathRemove }) + '" />';
            }
            if (checks == "SI" || checks == "Si" || checks == "Sí") {
                var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
                var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
                check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathYes }) + '" />)';
                check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathNot }) + '" />)';
            }
            if (checks == "NO" || checks == "No") {
                var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
                var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
                check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathYes }) + '" />)';
                check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({ xmlText: pathNot }) + '" />)';
            }
            if (checks != "") {
                var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
                check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathCheck }) + '" />';
            }
            if (checks == "") {
                var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
                check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathRemove }) + '" />';
            }
            return check;
        }

        return {
            onRequest: onRequest
        }
    });