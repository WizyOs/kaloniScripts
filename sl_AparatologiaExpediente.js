/**
* @NApiVersion 2.x
* @NScriptType Suitelet
* @NModuleScope Public
*/

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/file', 'N/search'],

    function (record, log, render, xmlMod, file, search) {

        function onRequest(context) {

            // MAIN VARS
            // Global Variables
            var values_questionsCheckbox = [];
            var values_booleans_questionsCheckbox = [];

            // Variables para crear los objetos principales
            var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
            var typeComps = context.request.parameters.typeComps; // Variable que guarda el tipo 
            var expediente = context.request.parameters.exp;
            var caso = record.load({ type: 'supportcase', id: recId }); // Variable que guarda el objeto Case
            var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente
            var cliente = record.load({ type: 'customer', id: companyId }); // Variable que guarda el objeto Customer
            var formulario = caso.getValue({ fieldId: 'customform' }); // Id de formulario
            var fechaNac = caso.getText({ fieldId: 'custevent331' });
            var fecha = caso.getText({ fieldId: 'startdate' });
            var field_questionsCheckbox = caso.getText({ fieldId: 'custevent1185' }) || '';
            var subsidiaria = caso.getValue({ fieldId: 'subsidiary' });

            var field_firmaClienteBase64 = caso.getValue({ fieldId: 'custevent269' }) || null;
            var field_firmaMedBase64 = caso.getValue({ fieldId: 'custevent485' }) || null;
            var field_firmaTestigo1Base64 = caso.getValue({ fieldId: 'custevent548' }) || null;
            var field_firmaTestigo2Base64 = caso.getValue({ fieldId: 'custevent549' }) || null;

            // MANEJO DE IMAGENES
            // Imagenes Base
            var imagenRostroBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4';
            var imagenCuerpoBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030';
            var imagenCabezaBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4';
            var imagenSession = null;

            if (expediente == 'rostro') {
                imagenSession = imagenRostroBase;
            } else if (expediente == 'cuerpo') {
                imagenSession = imagenCuerpoBase;
            } else if (expediente == 'complementarios') {
                imagenSession = imagenCabezaBase;
            }

            // CUSTOMER
            // Variables Informacion General obtenidas del CLIENTE
            var sucursalId = cliente.getValue({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var sucursalText = cliente.getText({ fieldId: 'custentity25' }); //Variable que guarda el id de Sucursal del cliente
            var nombreCliente = cliente.getText({ fieldId: 'altname' });
            var name = cliente.getText({ fieldId: 'altname' });
            var numeroExpediente = cliente.getText({ fieldId: 'entityid' });
            var identificacionCliente = cliente.getText({ fieldId: 'custentity251' }) || '';
            var telefonoCliente = cliente.getText({ fieldId: 'phone' }) || '';
            var direccionCliente = cliente.getText({ fieldId: 'defaultaddress' }) || '';

            var edad_fechaCaso = calcYearInt(fechaNac, fecha);
            var text_aniosCliente = (edad_fechaCaso == '') ? '' : ' años';

            var cfp = cliente.getValue({
                fieldId: "custentity251"
            });
            if (cfp == "" || cfp == null) {
                cfp = "____________________";
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

            // APOYOS
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

            // Variables obtenias desde funciones locales
            var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
            var sucReal = sucursalReal(sucursalText); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
            var edadCliente = calcYearInt(fechNacCliente, fechaCaso);
            var consentimiento = '';
            var xmlExpediente = '';

            var etiqueta_campo_1 = '';
            var etiqueta_campo_2 = '';
            var etiqueta_campo_3 = '';
            var etiqueta_campo_4 = '';
            var etiqueta_campo_5 = '';
            var etiqueta_campo_6 = '';
            var etiqueta_campo_7 = '';
            var etiqueta_campo_8 = '';
            var etiqueta_campo_9 = '';
            var etiqueta_campo_10 = '';
            var etiqueta_campo_11 = '';
            var etiqueta_campo_12 = '';
            var etiqueta_campo_13 = '';
            var etiqueta_campo_14 = '';
            var etiqueta_campo_15 = '';
            var etiqueta_campo_16 = '';
            var etiqueta_campo_17 = '';
            var etiqueta_campo_18 = '';
            var etiqueta_campo_19 = '';
            var etiqueta_campo_20 = '';
            var etiqueta_campo_21 = '';
            var etiqueta_campo_22 = '';
            var etiqueta_campo_23 = '';
            var etiqueta_campo_24 = '';

            var arr_arr_sessions = '';
            var array_datesLimit_values = '';

            if (formulario == 33 || formulario == 147) {
                //VARIABLES: Obtencion de Etiquetas de campos Base
                //NOTE: obtención de etiquetas de campos base
                etiqueta_campo_1 = caso.getField('custevent648').label;
                etiqueta_campo_2 = caso.getField('custevent649').label;
                etiqueta_campo_3 = caso.getField('custevent650').label;
                etiqueta_campo_4 = caso.getField('custevent651').label;
                etiqueta_campo_5 = caso.getField('custevent652').label;
                etiqueta_campo_6 = caso.getField('custevent653').label;
                etiqueta_campo_7 = caso.getField('custevent654').label;
                etiqueta_campo_8 = caso.getField('custevent506').label;
                etiqueta_campo_9 = caso.getField('custevent507').label;
                etiqueta_campo_10 = caso.getField('custevent541').label;
                etiqueta_campo_11 = caso.getField('custevent636').label; // TRATAMIENTO/PROCEDIMIENTO
                etiqueta_campo_12 = caso.getField('custevent637').label; // AREA A TRATAR
                etiqueta_campo_13 = caso.getField('custevent638').label; // PRODUCTOS ADICIONALES PARA EL TRATAMIENTO
                etiqueta_campo_14 = caso.getField('custevent639').label;
                etiqueta_campo_15 = caso.getField('custevent640').label;
                etiqueta_campo_16 = caso.getField('custevent641').label;
                etiqueta_campo_17 = caso.getField('custevent642').label;
                etiqueta_campo_18 = caso.getField('custevent643').label;
                etiqueta_campo_19 = caso.getField('custevent644').label;
                etiqueta_campo_20 = caso.getField('custevent645').label;
                etiqueta_campo_21 = caso.getField('custevent646').label;
                etiqueta_campo_22 = caso.getField('custevent647').label;
                etiqueta_campo_23 = caso.getField('custevent1056').label;
                etiqueta_campo_24 = caso.getField('custevent1069').label;

                //VARIABLES: Obtencion de valores campos BackEnd
                //NOTE: Valores sesion 1
                var campo_1_sesion1 = caso.getValue('custevent648') || '';
                var campo_2_sesion1 = caso.getValue('custevent649') || '';
                var campo_3_sesion1 = caso.getValue('custevent650') || '';
                var campo_4_sesion1 = caso.getValue('custevent651') || '';
                var campo_5_sesion1 = caso.getText('custevent652') || '';
                var campo_6_sesion1 = caso.getText('custevent653') || '';
                var campo_7_sesion1 = caso.getText('custevent654') || '';
                var campo_8_sesion1 = caso.getValue('custevent506') || '';
                var campo_9_sesion1 = caso.getValue('custevent507') || '';
                var campo_10_sesion1 = caso.getValue('custevent541') || '';
                var campo_11_sesion1 = caso.getText('custevent636') || '';
                var campo_12_sesion1 = caso.getText('custevent637') || '';
                var campo_13_sesion1 = caso.getText('custevent638') || '';
                var campo_14_sesion1 = caso.getValue('custevent639') || '';
                var campo_15_sesion1 = caso.getValue('custevent640') || '';
                var campo_16_sesion1 = caso.getValue('custevent641') || '';
                var campo_17_sesion1 = caso.getValue('custevent642') || '';
                var campo_18_sesion1 = caso.getValue('custevent643') || '';
                var campo_19_sesion1 = caso.getValue('custevent644') || '';
                var campo_20_sesion1 = caso.getValue('custevent645') || '';
                var campo_21_sesion1 = caso.getValue('custevent646') || '';
                var campo_22_sesion1 = caso.getValue('custevent647') || '';
                var campo_23_sesion1 = caso.getText('custevent1056') || '';
                var campo_24_sesion1 = caso.getValue('custevent1069') || imagenSession;
                var arr_values_session_1 = [campo_1_sesion1, campo_2_sesion1, campo_3_sesion1, campo_4_sesion1, campo_5_sesion1, campo_6_sesion1, campo_7_sesion1, campo_8_sesion1, campo_9_sesion1, campo_10_sesion1, campo_11_sesion1, campo_12_sesion1, campo_13_sesion1, campo_14_sesion1, campo_15_sesion1, campo_16_sesion1, campo_17_sesion1, campo_18_sesion1, campo_19_sesion1, campo_20_sesion1, campo_21_sesion1, campo_22_sesion1, campo_23_sesion1, campo_24_sesion1];
                //NOTE: Valores sesion 2
                var campo_1_sesion2 = caso.getValue('custevent1020') || '';
                var campo_2_sesion2 = caso.getValue('custevent1038') || '';
                var campo_3_sesion2 = caso.getValue('custevent1029') || '';
                var campo_4_sesion2 = caso.getValue('custevent1047') || '';
                var campo_5_sesion2 = caso.getText('custevent867') || '';
                var campo_6_sesion2 = caso.getText('custevent876') || '';
                var campo_7_sesion2 = caso.getText('custevent858') || '';
                var campo_8_sesion2 = caso.getValue('custevent912') || '';
                var campo_9_sesion2 = caso.getValue('custevent921') || '';
                var campo_10_sesion2 = caso.getValue('custevent930') || '';
                var campo_11_sesion2 = caso.getValue('custevent885') || '';
                var campo_12_sesion2 = caso.getText('custevent894') || '';
                var campo_13_sesion2 = caso.getText('custevent903') || '';
                var campo_14_sesion2 = caso.getText('custevent939') || '';
                var campo_15_sesion2 = caso.getValue('custevent957') || '';
                var campo_16_sesion2 = caso.getValue('custevent966') || '';
                var campo_17_sesion2 = caso.getValue('custevent948') || '';
                var campo_18_sesion2 = caso.getValue('custevent975') || '';
                var campo_19_sesion2 = caso.getValue('custevent984') || '';
                var campo_20_sesion2 = caso.getValue('custevent993') || '';
                var campo_21_sesion2 = caso.getValue('custevent1002') || '';
                var campo_22_sesion2 = caso.getValue('custevent1011') || '';
                var campo_23_sesion2 = caso.getText('custevent1057') || '';
                var campo_24_sesion2 = caso.getValue('custevent1070') || imagenSession;
                var arr_values_session_2 = [campo_1_sesion2, campo_2_sesion2, campo_3_sesion2, campo_4_sesion2, campo_5_sesion2, campo_6_sesion2, campo_7_sesion2, campo_8_sesion2, campo_9_sesion2, campo_10_sesion2, campo_11_sesion2, campo_12_sesion2, campo_13_sesion2, campo_14_sesion2, campo_15_sesion2, campo_16_sesion2, campo_17_sesion2, campo_18_sesion2, campo_19_sesion2, campo_20_sesion2, campo_21_sesion2, campo_22_sesion2, campo_23_sesion2, campo_24_sesion2];
                //NOTE: Valores sesion 3
                var campo_1_sesion3 = caso.getValue('custevent1021') || '';
                var campo_2_sesion3 = caso.getValue('custevent1039') || '';
                var campo_3_sesion3 = caso.getValue('custevent1030') || '';
                var campo_4_sesion3 = caso.getValue('custevent1048') || '';
                var campo_5_sesion3 = caso.getText('custevent868') || '';
                var campo_6_sesion3 = caso.getText('custevent877') || '';
                var campo_7_sesion3 = caso.getText('custevent859') || '';
                var campo_8_sesion3 = caso.getValue('custevent913') || '';
                var campo_9_sesion3 = caso.getValue('custevent922') || '';
                var campo_10_sesion3 = caso.getValue('custevent931') || '';
                var campo_11_sesion3 = caso.getText('custevent886') || '';
                var campo_12_sesion3 = caso.getText('custevent895') || '';
                var campo_13_sesion3 = caso.getText('custevent904') || '';
                var campo_14_sesion3 = caso.getValue('custevent940') || '';
                var campo_15_sesion3 = caso.getValue('custevent958') || '';
                var campo_16_sesion3 = caso.getValue('custevent967') || '';
                var campo_17_sesion3 = caso.getValue('custevent949') || '';
                var campo_18_sesion3 = caso.getValue('custevent976') || '';
                var campo_19_sesion3 = caso.getValue('custevent985') || '';
                var campo_20_sesion3 = caso.getValue('custevent994') || '';
                var campo_21_sesion3 = caso.getValue('custevent1003') || '';
                var campo_22_sesion3 = caso.getValue('custevent1012') || '';
                var campo_23_sesion3 = caso.getText('custevent1058') || '';
                var campo_24_sesion3 = caso.getValue('custevent1071') || imagenSession;
                var arr_values_session_3 = [campo_1_sesion3, campo_2_sesion3, campo_3_sesion3, campo_4_sesion3, campo_5_sesion3, campo_6_sesion3, campo_7_sesion3, campo_8_sesion3, campo_9_sesion3, campo_10_sesion3, campo_11_sesion3, campo_12_sesion3, campo_13_sesion3, campo_14_sesion3, campo_15_sesion3, campo_16_sesion3, campo_17_sesion3, campo_18_sesion3, campo_19_sesion3, campo_20_sesion3, campo_21_sesion3, campo_22_sesion3, campo_23_sesion3, campo_24_sesion3];
                //NOTE: Valores sesion 4
                var campo_1_sesion4 = caso.getValue('custevent1022') || '';
                var campo_2_sesion4 = caso.getValue('custevent1040') || '';
                var campo_3_sesion4 = caso.getValue('custevent1031') || '';
                var campo_4_sesion4 = caso.getValue('custevent1049') || '';
                var campo_5_sesion4 = caso.getText('custevent869') || '';
                var campo_6_sesion4 = caso.getText('custevent878') || '';
                var campo_7_sesion4 = caso.getText('custevent860') || '';
                var campo_8_sesion4 = caso.getValue('custevent914') || '';
                var campo_9_sesion4 = caso.getValue('custevent923') || '';
                var campo_10_sesion4 = caso.getValue('custevent932') || '';
                var campo_11_sesion4 = caso.getText('custevent887') || '';
                var campo_12_sesion4 = caso.getText('custevent896') || '';
                var campo_13_sesion4 = caso.getText('custevent905') || '';
                var campo_14_sesion4 = caso.getValue('custevent941') || '';
                var campo_15_sesion4 = caso.getValue('custevent959') || '';
                var campo_16_sesion4 = caso.getValue('custevent968') || '';
                var campo_17_sesion4 = caso.getValue('custevent950') || '';
                var campo_18_sesion4 = caso.getValue('custevent977') || '';
                var campo_19_sesion4 = caso.getValue('custevent986') || '';
                var campo_20_sesion4 = caso.getValue('custevent995') || '';
                var campo_21_sesion4 = caso.getValue('custevent1004') || '';
                var campo_22_sesion4 = caso.getValue('custevent1013') || '';
                var campo_23_sesion4 = caso.getText('custevent1059') || '';
                var campo_24_sesion4 = caso.getValue('custevent1072') || imagenSession;
                var arr_values_session_4 = [campo_1_sesion4, campo_2_sesion4, campo_3_sesion4, campo_4_sesion4, campo_5_sesion4, campo_6_sesion4, campo_7_sesion4, campo_8_sesion4, campo_9_sesion4, campo_10_sesion4, campo_11_sesion4, campo_12_sesion4, campo_13_sesion4, campo_14_sesion4, campo_15_sesion4, campo_16_sesion4, campo_17_sesion4, campo_18_sesion4, campo_19_sesion4, campo_20_sesion4, campo_21_sesion4, campo_22_sesion4, campo_23_sesion4, campo_24_sesion4];
                //NOTE: Valores sesion 5
                var campo_1_sesion5 = caso.getValue('custevent1023') || '';
                var campo_2_sesion5 = caso.getValue('custevent1041') || '';
                var campo_3_sesion5 = caso.getValue('custevent1032') || '';
                var campo_4_sesion5 = caso.getValue('custevent1050') || '';
                var campo_5_sesion5 = caso.getText('custevent870') || '';
                var campo_6_sesion5 = caso.getText('custevent879') || '';
                var campo_7_sesion5 = caso.getText('custevent861') || '';
                var campo_8_sesion5 = caso.getValue('custevent915') || '';
                var campo_9_sesion5 = caso.getValue('custevent924') || '';
                var campo_10_sesion5 = caso.getValue('custevent933') || '';
                var campo_11_sesion5 = caso.getText('custevent888') || '';
                var campo_12_sesion5 = caso.getText('custevent897') || '';
                var campo_13_sesion5 = caso.getText('custevent906') || '';
                var campo_14_sesion5 = caso.getValue('custevent942') || '';
                var campo_15_sesion5 = caso.getValue('custevent960') || '';
                var campo_16_sesion5 = caso.getValue('custevent969') || '';
                var campo_17_sesion5 = caso.getValue('custevent951') || '';
                var campo_18_sesion5 = caso.getValue('custevent978') || '';
                var campo_19_sesion5 = caso.getValue('custevent987') || '';
                var campo_20_sesion5 = caso.getValue('custevent996') || '';
                var campo_21_sesion5 = caso.getValue('custevent1005') || '';
                var campo_22_sesion5 = caso.getValue('custevent1014') || '';
                var campo_23_sesion5 = caso.getText('custevent1060') || '';
                var campo_24_sesion5 = caso.getValue('custevent1073') || imagenSession;
                var arr_values_session_5 = [campo_1_sesion5, campo_2_sesion5, campo_3_sesion5, campo_4_sesion5, campo_5_sesion5, campo_6_sesion5, campo_7_sesion5, campo_8_sesion5, campo_9_sesion5, campo_10_sesion5, campo_11_sesion5, campo_12_sesion5, campo_13_sesion5, campo_14_sesion5, campo_15_sesion5, campo_16_sesion5, campo_17_sesion5, campo_18_sesion5, campo_19_sesion5, campo_20_sesion5, campo_21_sesion5, campo_22_sesion5, campo_23_sesion5, campo_24_sesion5];
                //NOTE: Valores sesion 6
                var campo_1_sesion6 = caso.getValue('custevent1024') || '';
                var campo_2_sesion6 = caso.getValue('custevent1042') || '';
                var campo_3_sesion6 = caso.getValue('custevent1033') || '';
                var campo_4_sesion6 = caso.getValue('custevent1051') || '';
                var campo_5_sesion6 = caso.getText('custevent871') || '';
                var campo_6_sesion6 = caso.getText('custevent880') || '';
                var campo_7_sesion6 = caso.getText('custevent862') || '';
                var campo_8_sesion6 = caso.getValue('custevent916') || '';
                var campo_9_sesion6 = caso.getValue('custevent925') || '';
                var campo_10_sesion6 = caso.getValue('custevent934') || '';
                var campo_11_sesion6 = caso.getText('custevent889') || '';
                var campo_12_sesion6 = caso.getText('custevent898') || '';
                var campo_13_sesion6 = caso.getText('custevent907') || '';
                var campo_14_sesion6 = caso.getValue('custevent943') || '';
                var campo_15_sesion6 = caso.getValue('custevent961') || '';
                var campo_16_sesion6 = caso.getValue('custevent970') || '';
                var campo_17_sesion6 = caso.getValue('custevent952') || '';
                var campo_18_sesion6 = caso.getValue('custevent979') || '';
                var campo_19_sesion6 = caso.getValue('custevent988') || '';
                var campo_20_sesion6 = caso.getValue('custevent997') || '';
                var campo_21_sesion6 = caso.getValue('custevent1006') || '';
                var campo_22_sesion6 = caso.getValue('custevent1015') || '';
                var campo_23_sesion6 = caso.getText('custevent1061') || '';
                var campo_24_sesion6 = caso.getValue('custevent1074') || imagenSession;
                var arr_values_session_6 = [campo_1_sesion6, campo_2_sesion6, campo_3_sesion6, campo_4_sesion6, campo_5_sesion6, campo_6_sesion6, campo_7_sesion6, campo_8_sesion6, campo_9_sesion6, campo_10_sesion6, campo_11_sesion6, campo_12_sesion6, campo_13_sesion6, campo_14_sesion6, campo_15_sesion6, campo_16_sesion6, campo_17_sesion6, campo_18_sesion6, campo_19_sesion6, campo_20_sesion6, campo_21_sesion6, campo_22_sesion6, campo_23_sesion6, campo_24_sesion6];
                //NOTE: Valores sesion 7
                var campo_1_sesion7 = caso.getValue('custevent1025') || '';
                var campo_2_sesion7 = caso.getValue('custevent1043') || '';
                var campo_3_sesion7 = caso.getValue('custevent1034') || '';
                var campo_4_sesion7 = caso.getValue('custevent1052') || '';
                var campo_5_sesion7 = caso.getText('custevent872') || '';
                var campo_6_sesion7 = caso.getText('custevent881') || '';
                var campo_7_sesion7 = caso.getText('custevent863') || '';
                var campo_8_sesion7 = caso.getValue('custevent917') || '';
                var campo_9_sesion7 = caso.getValue('custevent926') || '';
                var campo_10_sesion7 = caso.getValue('custevent935') || '';
                var campo_11_sesion7 = caso.getText('custevent890') || '';
                var campo_12_sesion7 = caso.getText('custevent899') || '';
                var campo_13_sesion7 = caso.getText('custevent908') || '';
                var campo_14_sesion7 = caso.getValue('custevent944') || '';
                var campo_15_sesion7 = caso.getValue('custevent962') || '';
                var campo_16_sesion7 = caso.getValue('custevent971') || '';
                var campo_17_sesion7 = caso.getValue('custevent953') || '';
                var campo_18_sesion7 = caso.getValue('custevent980') || '';
                var campo_19_sesion7 = caso.getValue('custevent989') || '';
                var campo_20_sesion7 = caso.getValue('custevent998') || '';
                var campo_21_sesion7 = caso.getValue('custevent1007') || '';
                var campo_22_sesion7 = caso.getValue('custevent1016') || '';
                var campo_23_sesion7 = caso.getText('custevent1062') || '';
                var campo_24_sesion7 = caso.getValue('custevent1075') || imagenSession;
                var arr_values_session_7 = [campo_1_sesion7, campo_2_sesion7, campo_3_sesion7, campo_4_sesion7, campo_5_sesion7, campo_6_sesion7, campo_7_sesion7, campo_8_sesion7, campo_9_sesion7, campo_10_sesion7, campo_11_sesion7, campo_12_sesion7, campo_13_sesion7, campo_14_sesion7, campo_15_sesion7, campo_16_sesion7, campo_17_sesion7, campo_18_sesion7, campo_19_sesion7, campo_20_sesion7, campo_21_sesion7, campo_22_sesion7, campo_23_sesion7, campo_24_sesion7];
                //NOTE: Valores sesion 8
                var campo_1_sesion8 = caso.getValue('custevent1026') || '';
                var campo_2_sesion8 = caso.getValue('custevent1044') || '';
                var campo_3_sesion8 = caso.getValue('custevent1035') || '';
                var campo_4_sesion8 = caso.getValue('custevent1053') || '';
                var campo_5_sesion8 = caso.getText('custevent873') || '';
                var campo_6_sesion8 = caso.getText('custevent882') || '';
                var campo_7_sesion8 = caso.getText('custevent864') || '';
                var campo_8_sesion8 = caso.getValue('custevent918') || '';
                var campo_9_sesion8 = caso.getValue('custevent927') || '';
                var campo_10_sesion8 = caso.getValue('custevent936') || '';
                var campo_11_sesion8 = caso.getText('custevent891') || '';
                var campo_12_sesion8 = caso.getText('custevent900') || '';
                var campo_13_sesion8 = caso.getText('custevent909') || '';
                var campo_14_sesion8 = caso.getValue('custevent945') || '';
                var campo_15_sesion8 = caso.getValue('custevent963') || '';
                var campo_16_sesion8 = caso.getValue('custevent972') || '';
                var campo_17_sesion8 = caso.getValue('custevent954') || '';
                var campo_18_sesion8 = caso.getValue('custevent981') || '';
                var campo_19_sesion8 = caso.getValue('custevent990') || '';
                var campo_20_sesion8 = caso.getValue('custevent999') || '';
                var campo_21_sesion8 = caso.getValue('custevent1008') || '';
                var campo_22_sesion8 = caso.getValue('custevent1017') || '';
                var campo_23_sesion8 = caso.getText('custevent1063') || '';
                var campo_24_sesion8 = caso.getValue('custevent1076') || imagenSession;
                var arr_values_session_8 = [campo_1_sesion8, campo_2_sesion8, campo_3_sesion8, campo_4_sesion8, campo_5_sesion8, campo_6_sesion8, campo_7_sesion8, campo_8_sesion8, campo_9_sesion8, campo_10_sesion8, campo_11_sesion8, campo_12_sesion8, campo_13_sesion8, campo_14_sesion8, campo_15_sesion8, campo_16_sesion8, campo_17_sesion8, campo_18_sesion8, campo_19_sesion8, campo_20_sesion8, campo_21_sesion8, campo_22_sesion8, campo_23_sesion8, campo_24_sesion8];
                //NOTE: Valores sesion 9
                var campo_1_sesion9 = caso.getValue('custevent1027') || '';
                var campo_2_sesion9 = caso.getValue('custevent1045') || '';
                var campo_3_sesion9 = caso.getValue('custevent1036') || '';
                var campo_4_sesion9 = caso.getValue('custevent1054') || '';
                var campo_5_sesion9 = caso.getText('custevent874') || '';
                var campo_6_sesion9 = caso.getText('custevent883') || '';
                var campo_7_sesion9 = caso.getText('custevent865') || '';
                var campo_8_sesion9 = caso.getValue('custevent919') || '';
                var campo_9_sesion9 = caso.getValue('custevent928') || '';
                var campo_10_sesion9 = caso.getValue('custevent937') || '';
                var campo_11_sesion9 = caso.getText('custevent892') || '';
                var campo_12_sesion9 = caso.getText('custevent901') || '';
                var campo_13_sesion9 = caso.getText('custevent910') || '';
                var campo_14_sesion9 = caso.getValue('custevent946') || '';
                var campo_15_sesion9 = caso.getValue('custevent964') || '';
                var campo_16_sesion9 = caso.getValue('custevent973') || '';
                var campo_17_sesion9 = caso.getValue('custevent955') || '';
                var campo_18_sesion9 = caso.getValue('custevent982') || '';
                var campo_19_sesion9 = caso.getValue('custevent991') || '';
                var campo_20_sesion9 = caso.getValue('custevent1000') || '';
                var campo_21_sesion9 = caso.getValue('custevent1009') || '';
                var campo_22_sesion9 = caso.getValue('custevent1018') || '';
                var campo_23_sesion9 = caso.getText('custevent1064') || '';
                var campo_24_sesion9 = caso.getValue('custevent1077') || imagenSession;
                var arr_values_session_9 = [campo_1_sesion9, campo_2_sesion9, campo_3_sesion9, campo_4_sesion9, campo_5_sesion9, campo_6_sesion9, campo_7_sesion9, campo_8_sesion9, campo_9_sesion9, campo_10_sesion9, campo_11_sesion9, campo_12_sesion9, campo_13_sesion9, campo_14_sesion9, campo_15_sesion9, campo_16_sesion9, campo_17_sesion9, campo_18_sesion9, campo_19_sesion9, campo_20_sesion9, campo_21_sesion9, campo_22_sesion9, campo_23_sesion9, campo_24_sesion9];
                //NOTE: Valores sesion 10
                var campo_1_sesion10 = caso.getValue('custevent1028') || '';
                var campo_2_sesion10 = caso.getValue('custevent1046') || '';
                var campo_3_sesion10 = caso.getValue('custevent1037') || '';
                var campo_4_sesion10 = caso.getValue('custevent1055') || '';
                var campo_5_sesion10 = caso.getText('custevent875') || '';
                var campo_6_sesion10 = caso.getText('custevent884') || '';
                var campo_7_sesion10 = caso.getText('custevent866') || '';
                var campo_8_sesion10 = caso.getValue('custevent920') || '';
                var campo_9_sesion10 = caso.getValue('custevent929') || '';
                var campo_10_sesion10 = caso.getValue('custevent938') || '';
                var campo_11_sesion10 = caso.getText('custevent893') || '';
                var campo_12_sesion10 = caso.getText('custevent902') || '';
                var campo_13_sesion10 = caso.getText('custevent911') || '';
                var campo_14_sesion10 = caso.getValue('custevent947') || '';
                var campo_15_sesion10 = caso.getValue('custevent965') || '';
                var campo_16_sesion10 = caso.getValue('custevent974') || '';
                var campo_17_sesion10 = caso.getValue('custevent956') || '';
                var campo_18_sesion10 = caso.getValue('custevent983') || '';
                var campo_19_sesion10 = caso.getValue('custevent992') || '';
                var campo_20_sesion10 = caso.getValue('custevent1001') || '';
                var campo_21_sesion10 = caso.getValue('custevent1010') || '';
                var campo_22_sesion10 = caso.getValue('custevent1019') || '';
                var campo_23_sesion10 = caso.getText('custevent1065') || '';
                var campo_24_sesion10 = caso.getValue('custevent1078') || imagenSession;
                var arr_values_session_10 = [campo_1_sesion10, campo_2_sesion10, campo_3_sesion10, campo_4_sesion10, campo_5_sesion10, campo_6_sesion10, campo_7_sesion10, campo_8_sesion10, campo_9_sesion10, campo_10_sesion10, campo_11_sesion10, campo_12_sesion10, campo_13_sesion10, campo_14_sesion10, campo_15_sesion10, campo_16_sesion10, campo_17_sesion10, campo_18_sesion10, campo_19_sesion10, campo_20_sesion10, campo_21_sesion10, campo_22_sesion10, campo_23_sesion10, campo_24_sesion10];

                //NOTE: Arreglo de los arreglos de sesiones
                arr_arr_sessions = [arr_values_session_1, arr_values_session_2, arr_values_session_3, arr_values_session_4, arr_values_session_5, arr_values_session_6, arr_values_session_7, arr_values_session_8, arr_values_session_9, arr_values_session_10];

                //NOTE: Arreglo de los campos que contienen la fecha de la sesion
                array_datesLimit_values = [campo_23_sesion1, campo_23_sesion2, campo_23_sesion3, campo_23_sesion4, campo_23_sesion5, campo_23_sesion6, campo_23_sesion7, campo_23_sesion8, campo_23_sesion9, campo_23_sesion10];
            }

            if (formulario == 151) {
                //VARIABLES: Obtencion de Etiquetas de campos Base
                //NOTE: obtención de etiquetas de campos base
                etiqueta_campo_1 = caso.getField('custevent1079').label;
                etiqueta_campo_2 = caso.getField('custevent1056').label;
                etiqueta_campo_3 = caso.getField('custevent1080').label;
                etiqueta_campo_4 = caso.getField('custevent1090').label;
                etiqueta_campo_5 = caso.getField('custevent1100').label;
                etiqueta_campo_6 = caso.getField('custevent1110').label;
                etiqueta_campo_7 = caso.getField('custevent1120').label;
                etiqueta_campo_8 = caso.getField('custevent1130').label;
                etiqueta_campo_9 = caso.getField('custevent1140').label;
                etiqueta_campo_10 = caso.getField('custevent1150').label;
                etiqueta_campo_11 = caso.getField('custevent1160').label;
                etiqueta_campo_12 = caso.getField('custevent1170').label;
                etiqueta_campo_13 = caso.getField('custevent650').label;
                etiqueta_campo_14 = caso.getField('custevent649').label;
                etiqueta_campo_15 = caso.getField('custevent651').label;
                etiqueta_campo_16 = caso.getField('custevent1069').label;
                //VARIABLES: Obtencion de valores campos BackEnd
                //NOTE: Valores complementarios 1
                var campo_1_complementarios1 = caso.getText('custevent1079') || '';
                var campo_2_complementarios1 = caso.getText('custevent1056') || '';
                var campo_3_complementarios1 = caso.getValue('custevent1080') || '';
                var campo_4_complementarios1 = caso.getValue('custevent1090') || '';
                var campo_5_complementarios1 = caso.getText('custevent1100') || '';
                var campo_6_complementarios1 = caso.getText('custevent1110') || '';
                var campo_7_complementarios1 = caso.getText('custevent1120') || '';
                var campo_8_complementarios1 = caso.getText('custevent1130') || '';
                var campo_9_complementarios1 = caso.getText('custevent1140') || '';
                var campo_10_complementarios1 = caso.getText('custevent1150') || '';
                var campo_11_complementarios1 = caso.getText('custevent1160') || '';
                var campo_12_complementarios1 = caso.getText('custevent1170') || '';
                var campo_13_complementarios1 = caso.getText('custevent650') || '';
                var campo_14_complementarios1 = caso.getText('custevent649') || '';
                var campo_15_complementarios1 = caso.getText('custevent651') || '';
                var campo_16_complementarios1 = caso.getText('custevent1069') || imagenSession;
                var arr_values_complementarios_1 = [campo_1_complementarios1, campo_2_complementarios1, campo_3_complementarios1, campo_4_complementarios1, campo_5_complementarios1, campo_6_complementarios1, campo_7_complementarios1, campo_8_complementarios1, campo_9_complementarios1, campo_10_complementarios1, campo_11_complementarios1, campo_12_complementarios1, campo_13_complementarios1, campo_14_complementarios1, campo_15_complementarios1, campo_16_complementarios1];
                //NOTE: Valores complementarios 2
                var campo_1_complementarios2 = caso.getText('custevent1079') || '';
                var campo_2_complementarios2 = caso.getText('custevent1057') || '';
                var campo_3_complementarios2 = caso.getValue('custevent1081') || '';
                var campo_4_complementarios2 = caso.getValue('custevent1091') || '';
                var campo_5_complementarios2 = caso.getText('custevent1101') || '';
                var campo_6_complementarios2 = caso.getText('custevent1111') || '';
                var campo_7_complementarios2 = caso.getText('custevent1121') || '';
                var campo_8_complementarios2 = caso.getText('custevent1131') || '';
                var campo_9_complementarios2 = caso.getText('custevent1141') || '';
                var campo_10_complementarios2 = caso.getText('custevent1151') || '';
                var campo_11_complementarios2 = caso.getText('custevent1161') || '';
                var campo_12_complementarios2 = caso.getText('custevent1171') || '';
                var campo_13_complementarios2 = caso.getText('custevent1029') || '';
                var campo_14_complementarios2 = caso.getText('custevent1038') || '';
                var campo_15_complementarios2 = caso.getText('custevent1047') || '';
                var campo_16_complementarios2 = caso.getText('custevent1070') || imagenSession;
                var arr_values_complementarios_2 = [campo_1_complementarios2, campo_2_complementarios2, campo_3_complementarios2, campo_4_complementarios2, campo_5_complementarios2, campo_6_complementarios2, campo_7_complementarios2, campo_8_complementarios2, campo_9_complementarios2, campo_10_complementarios2, campo_11_complementarios2, campo_12_complementarios2, campo_13_complementarios2, campo_14_complementarios2, campo_15_complementarios2, campo_16_complementarios2];
                //NOTE: Valores complementarios 3
                var campo_1_complementarios3 = caso.getText('custevent1079') || '';
                var campo_2_complementarios3 = caso.getText('custevent1058') || '';
                var campo_3_complementarios3 = caso.getValue('custevent1082') || '';
                var campo_4_complementarios3 = caso.getValue('custevent1092') || '';
                var campo_5_complementarios3 = caso.getText('custevent1102') || '';
                var campo_6_complementarios3 = caso.getText('custevent1112') || '';
                var campo_7_complementarios3 = caso.getText('custevent1122') || '';
                var campo_8_complementarios3 = caso.getText('custevent1132') || '';
                var campo_9_complementarios3 = caso.getText('custevent1142') || '';
                var campo_10_complementarios3 = caso.getText('custevent1152') || '';
                var campo_11_complementarios3 = caso.getText('custevent1162') || '';
                var campo_12_complementarios3 = caso.getText('custevent1172') || '';
                var campo_13_complementarios3 = caso.getText('custevent1030') || '';
                var campo_14_complementarios3 = caso.getText('custevent1039') || '';
                var campo_15_complementarios3 = caso.getText('custevent1048') || '';
                var campo_16_complementarios3 = caso.getText('custevent1071') || imagenSession;
                var arr_values_complementarios_3 = [campo_1_complementarios3, campo_2_complementarios3, campo_3_complementarios3, campo_4_complementarios3, campo_5_complementarios3, campo_6_complementarios3, campo_7_complementarios3, campo_8_complementarios3, campo_9_complementarios3, campo_10_complementarios3, campo_11_complementarios3, campo_12_complementarios3, campo_13_complementarios3, campo_14_complementarios3, campo_15_complementarios3, campo_16_complementarios3];
                //NOTE: Valores complementarios 4
                var campo_1_complementarios4 = caso.getText('custevent1079') || '';
                var campo_2_complementarios4 = caso.getText('custevent1059') || '';
                var campo_3_complementarios4 = caso.getValue('custevent1083') || '';
                var campo_4_complementarios4 = caso.getValue('custevent1093') || '';
                var campo_5_complementarios4 = caso.getText('custevent1103') || '';
                var campo_6_complementarios4 = caso.getText('custevent1113') || '';
                var campo_7_complementarios4 = caso.getText('custevent1123') || '';
                var campo_8_complementarios4 = caso.getText('custevent1133') || '';
                var campo_9_complementarios4 = caso.getText('custevent1143') || '';
                var campo_10_complementarios4 = caso.getText('custevent1153') || '';
                var campo_11_complementarios4 = caso.getText('custevent1163') || '';
                var campo_12_complementarios4 = caso.getText('custevent1173') || '';
                var campo_13_complementarios4 = caso.getText('custevent1031') || '';
                var campo_14_complementarios4 = caso.getText('custevent1040') || '';
                var campo_15_complementarios4 = caso.getText('custevent1049') || '';
                var campo_16_complementarios4 = caso.getText('custevent1072') || imagenSession;
                var arr_values_complementarios_4 = [campo_1_complementarios4, campo_2_complementarios4, campo_3_complementarios4, campo_4_complementarios4, campo_5_complementarios4, campo_6_complementarios4, campo_7_complementarios4, campo_8_complementarios4, campo_9_complementarios4, campo_10_complementarios4, campo_11_complementarios4, campo_12_complementarios4, campo_13_complementarios4, campo_14_complementarios4, campo_15_complementarios4, campo_16_complementarios4];
                //NOTE: Valores complementarios 5
                var campo_1_complementarios5 = caso.getText('custevent1079') || '';
                var campo_2_complementarios5 = caso.getText('custevent1060') || '';
                var campo_3_complementarios5 = caso.getValue('custevent1084') || '';
                var campo_4_complementarios5 = caso.getValue('custevent1094') || '';
                var campo_5_complementarios5 = caso.getText('custevent1104') || '';
                var campo_6_complementarios5 = caso.getText('custevent1114') || '';
                var campo_7_complementarios5 = caso.getText('custevent1124') || '';
                var campo_8_complementarios5 = caso.getText('custevent1134') || '';
                var campo_9_complementarios5 = caso.getText('custevent1144') || '';
                var campo_10_complementarios5 = caso.getText('custevent1154') || '';
                var campo_11_complementarios5 = caso.getText('custevent1164') || '';
                var campo_12_complementarios5 = caso.getText('custevent1174') || '';
                var campo_13_complementarios5 = caso.getText('custevent1032') || '';
                var campo_14_complementarios5 = caso.getText('custevent1041') || '';
                var campo_15_complementarios5 = caso.getText('custevent1050') || '';
                var campo_16_complementarios5 = caso.getText('custevent1073') || imagenSession;
                var arr_values_complementarios_5 = [campo_1_complementarios5, campo_2_complementarios5, campo_3_complementarios5, campo_4_complementarios5, campo_5_complementarios5, campo_6_complementarios5, campo_7_complementarios5, campo_8_complementarios5, campo_9_complementarios5, campo_10_complementarios5, campo_11_complementarios5, campo_12_complementarios5, campo_13_complementarios5, campo_14_complementarios5, campo_15_complementarios5, campo_16_complementarios5];
                //NOTE: Valores complementarios 6
                var campo_1_complementarios6 = caso.getText('custevent1079') || '';
                var campo_2_complementarios6 = caso.getText('custevent1061') || '';
                var campo_3_complementarios6 = caso.getValue('custevent1085') || '';
                var campo_4_complementarios6 = caso.getValue('custevent1095') || '';
                var campo_5_complementarios6 = caso.getText('custevent1105') || '';
                var campo_6_complementarios6 = caso.getText('custevent1115') || '';
                var campo_7_complementarios6 = caso.getText('custevent1125') || '';
                var campo_8_complementarios6 = caso.getText('custevent1135') || '';
                var campo_9_complementarios6 = caso.getText('custevent1145') || '';
                var campo_10_complementarios6 = caso.getText('custevent1155') || '';
                var campo_11_complementarios6 = caso.getText('custevent1165') || '';
                var campo_12_complementarios6 = caso.getText('custevent1175') || '';
                var campo_13_complementarios6 = caso.getText('custevent1033') || '';
                var campo_14_complementarios6 = caso.getText('custevent1042') || '';
                var campo_15_complementarios6 = caso.getText('custevent1051') || '';
                var campo_16_complementarios6 = caso.getText('custevent1074') || imagenSession;
                var arr_values_complementarios_6 = [campo_1_complementarios6, campo_2_complementarios6, campo_3_complementarios6, campo_4_complementarios6, campo_5_complementarios6, campo_6_complementarios6, campo_7_complementarios6, campo_8_complementarios6, campo_9_complementarios6, campo_10_complementarios6, campo_11_complementarios6, campo_12_complementarios6, campo_13_complementarios6, campo_14_complementarios6, campo_15_complementarios6, campo_16_complementarios6];
                //NOTE: Valores complementarios 7
                var campo_1_complementarios7 = caso.getText('custevent1079') || '';
                var campo_2_complementarios7 = caso.getText('custevent1062') || '';
                var campo_3_complementarios7 = caso.getValue('custevent1086') || '';
                var campo_4_complementarios7 = caso.getValue('custevent1096') || '';
                var campo_5_complementarios7 = caso.getText('custevent1106') || '';
                var campo_6_complementarios7 = caso.getText('custevent1116') || '';
                var campo_7_complementarios7 = caso.getText('custevent1126') || '';
                var campo_8_complementarios7 = caso.getText('custevent1136') || '';
                var campo_9_complementarios7 = caso.getText('custevent1146') || '';
                var campo_10_complementarios7 = caso.getText('custevent1156') || '';
                var campo_11_complementarios7 = caso.getText('custevent1166') || '';
                var campo_12_complementarios7 = caso.getText('custevent1176') || '';
                var campo_13_complementarios7 = caso.getText('custevent1034') || '';
                var campo_14_complementarios7 = caso.getText('custevent1043') || '';
                var campo_15_complementarios7 = caso.getText('custevent1052') || '';
                var campo_16_complementarios7 = caso.getText('custevent1075') || imagenSession;
                var arr_values_complementarios_7 = [campo_1_complementarios7, campo_2_complementarios7, campo_3_complementarios7, campo_4_complementarios7, campo_5_complementarios7, campo_6_complementarios7, campo_7_complementarios7, campo_8_complementarios7, campo_9_complementarios7, campo_10_complementarios7, campo_11_complementarios7, campo_12_complementarios7, campo_13_complementarios7, campo_14_complementarios7, campo_15_complementarios7, campo_16_complementarios7];
                //NOTE: Valores complementarios 8
                var campo_1_complementarios8 = caso.getText('custevent1079') || '';
                var campo_2_complementarios8 = caso.getText('custevent1063') || '';
                var campo_3_complementarios8 = caso.getValue('custevent1087') || '';
                var campo_4_complementarios8 = caso.getValue('custevent1097') || '';
                var campo_5_complementarios8 = caso.getText('custevent1107') || '';
                var campo_6_complementarios8 = caso.getText('custevent1117') || '';
                var campo_7_complementarios8 = caso.getText('custevent1127') || '';
                var campo_8_complementarios8 = caso.getText('custevent1137') || '';
                var campo_9_complementarios8 = caso.getText('custevent1147') || '';
                var campo_10_complementarios8 = caso.getText('custevent1157') || '';
                var campo_11_complementarios8 = caso.getText('custevent1167') || '';
                var campo_12_complementarios8 = caso.getText('custevent1177') || '';
                var campo_13_complementarios8 = caso.getText('custevent1035') || '';
                var campo_14_complementarios8 = caso.getText('custevent1044') || '';
                var campo_15_complementarios8 = caso.getText('custevent1053') || '';
                var campo_16_complementarios8 = caso.getText('custevent1076') || imagenSession;
                var arr_values_complementarios_8 = [campo_1_complementarios8, campo_2_complementarios8, campo_3_complementarios8, campo_4_complementarios8, campo_5_complementarios8, campo_6_complementarios8, campo_7_complementarios8, campo_8_complementarios8, campo_9_complementarios8, campo_10_complementarios8, campo_11_complementarios8, campo_12_complementarios8, campo_13_complementarios8, campo_14_complementarios8, campo_15_complementarios8, campo_16_complementarios8];
                //NOTE: Valores complementarios 9
                var campo_1_complementarios9 = caso.getText('custevent1079') || '';
                var campo_2_complementarios9 = caso.getText('custevent1064') || '';
                var campo_3_complementarios9 = caso.getValue('custevent1088') || '';
                var campo_4_complementarios9 = caso.getValue('custevent1098') || '';
                var campo_5_complementarios9 = caso.getText('custevent1108') || '';
                var campo_6_complementarios9 = caso.getText('custevent1118') || '';
                var campo_7_complementarios9 = caso.getText('custevent1128') || '';
                var campo_8_complementarios9 = caso.getText('custevent1138') || '';
                var campo_9_complementarios9 = caso.getText('custevent1148') || '';
                var campo_10_complementarios9 = caso.getText('custevent1158') || '';
                var campo_11_complementarios9 = caso.getText('custevent1168') || '';
                var campo_12_complementarios9 = caso.getText('custevent1178') || '';
                var campo_13_complementarios9 = caso.getText('custevent1036') || '';
                var campo_14_complementarios9 = caso.getText('custevent1045') || '';
                var campo_15_complementarios9 = caso.getText('custevent1054') || '';
                var campo_16_complementarios9 = caso.getText('custevent1077') || imagenSession;
                var arr_values_complementarios_9 = [campo_1_complementarios9, campo_2_complementarios9, campo_3_complementarios9, campo_4_complementarios9, campo_5_complementarios9, campo_6_complementarios9, campo_7_complementarios9, campo_8_complementarios9, campo_9_complementarios9, campo_10_complementarios9, campo_11_complementarios9, campo_12_complementarios9, campo_13_complementarios9, campo_14_complementarios9, campo_15_complementarios9, campo_16_complementarios9];
                //NOTE: Valores complementarios 10
                var campo_1_complementarios10 = caso.getText('custevent1079') || '';
                var campo_2_complementarios10 = caso.getText('custevent1065') || '';
                var campo_3_complementarios10 = caso.getValue('custevent1089') || '';
                var campo_4_complementarios10 = caso.getValue('custevent1099') || '';
                var campo_5_complementarios10 = caso.getText('custevent1109') || '';
                var campo_6_complementarios10 = caso.getText('custevent1119') || '';
                var campo_7_complementarios10 = caso.getText('custevent1129') || '';
                var campo_8_complementarios10 = caso.getText('custevent1139') || '';
                var campo_9_complementarios10 = caso.getText('custevent1149') || '';
                var campo_10_complementarios10 = caso.getText('custevent1159') || '';
                var campo_11_complementarios10 = caso.getText('custevent1169') || '';
                var campo_12_complementarios10 = caso.getText('custevent1179') || '';
                var campo_13_complementarios10 = caso.getText('custevent1037') || '';
                var campo_14_complementarios10 = caso.getText('custevent1046') || '';
                var campo_15_complementarios10 = caso.getText('custevent1055') || '';
                var campo_16_complementarios10 = caso.getText('custevent1078') || imagenSession;
                var arr_values_complementarios_10 = [campo_1_complementarios10, campo_2_complementarios10, campo_3_complementarios10, campo_4_complementarios10, campo_5_complementarios10, campo_6_complementarios10, campo_7_complementarios10, campo_8_complementarios10, campo_9_complementarios10, campo_10_complementarios10, campo_11_complementarios10, campo_12_complementarios10, campo_13_complementarios10, campo_14_complementarios10, campo_15_complementarios10, campo_16_complementarios10];

                //NOTE: Arreglo de los arreglos de complementarioses
                arr_arr_sessions = [arr_values_complementarios_1, arr_values_complementarios_2, arr_values_complementarios_3, arr_values_complementarios_4, arr_values_complementarios_5, arr_values_complementarios_6, arr_values_complementarios_7, arr_values_complementarios_8, arr_values_complementarios_9, arr_values_complementarios_10];

                //NOTE: Arreglo de los campos que contienen la fecha de la complementarios
                array_datesLimit_values = [campo_2_complementarios1, campo_2_complementarios2, campo_2_complementarios3, campo_2_complementarios4, campo_2_complementarios5, campo_2_complementarios6, campo_2_complementarios7, campo_2_complementarios8, campo_2_complementarios9, campo_2_complementarios10];
            }

            // ZONA DE ENCABEZADOS
            // FICHA DE IDENTIFICACION
            var encabezados_fichaIdentificacion = '<table style="width:60%;font-size:11px;font-family:Aria,sans-serif;">' +
                '<tr>' +
                '<td style="font-size: 13px;font-weight:bold;color: #346094;">FICHA DE IDENTIFICACIÓN</td>' +
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


            if (typeComps == '8') {
                consentimiento = '<p style="width:80%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO APLICACIÓN EXTRACTOS PROTEICOS AVANZADOS DERIVADOS DE ADIPOCITOS (APPE°)</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme a la <b>aplicación de extractos proteicos avanzados DERIVADOS DE ADIPOCITOS (AAPE<sup>TM</sup>)</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido informado, que en atención a la composición y tipos de reacción de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas al producto AAPETM (Extractos Proteicos Avanzados derivados de adipocitos) los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿En qué consiste el procedimiento?</b><br /> Por sus siglas en inglés significa extractos proteicos avanzados derivados de adipocitos, se administra de manera tópica en pequeñas dosis mediante la realización de un número variable de pequeños pinchazos en la piel (vía intradérmica), esta técnica consigue aumentar el efecto de los productos administrados por lo que las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">El número de sesiones y la frecuencia de aplicación de las mismas es variable en función de la patología de tratar y de cada paciente por lo que no puede ser determinado de antemano. Los resultados se obtienen con mayor efectividad si el tratamiento realizado se complementa con otros tratamientos que potenciarán sus efectos, por ese motivo es importante que usted atienda a su Consulta de Valoración previamente.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b><br /> Las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente, por ejemplo rojez, inflamación y reacción alérgica.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">La posibilidad de hematomas es un riesgo frecuente que depende también de la toma de ciertos medicamentos por parte del paciente (e.g. aspirina y otros anticoagulantes), por tal motivo es mi deber informar al médico sobre la toma de cualquier medicación antes de ser sometido al procedimiento.</p>'+
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Enrojecimiento alrededor de los pinchazos que normalmente pueden tardar unas horas o pocos días en desaparecer. Sensación de incomodidad dependiendo de la zona a tratar y de la sensibilidad personal.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> La aplicación directa de los extractos proteicos avanzados puede ayudar a estimular la reparación, revitalización de la piel y el cabello.</p>' +
                    '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="60" height="60" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
                    consentimiento += saltoPagina(encabezados_fichaIdentificacion);
                    consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                    '<ul style="list-style-type: square;">' +
                    '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                    "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                    '</table>';
            } else if (typeComps == '7') {
                consentimiento = '<p style="width:80%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA INSTALACIÓN DE PRÓTESIS CAPILAR PHP</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de instalación de prótesis capilar PHP</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b> Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reacciones alérgicas. </b> Durante la aplicación y el mantenimiento es necesaria la aplicación de ciertos productos químicos de manera tópica para poder ejecutar el procedimiento que son necesarios. sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados productos y químicos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Secuelas, signos y síntomas indeseables. </b> Al finalizar el procedimiento es posible que se generen molestias al realizar expresiones muy marcadas, es decir al sonreír, fruncir el ceño o al realizar gestos de asombro o enojo lo que no  considerada de gravedad. Es posible que exista comezón, ardor o irritación de la piel cabelluda por lo que se le sugiere acudir de inmediato la unidad médica donde se realizó la instalación o el mantenimiento.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfactorios. </b> Existe la posibilidad de que la prótesis capilar llegue a despegarse de alguna parte incluso siguiendo las indicaciones y recomendaciones que el personal le hace al terminar su aplicación o mantenimiento, esto se debe a factores intrínsecos y extrínsecos  que dependen directamente de la sudoración, actividad física, ritmo de vida, humedad del medio, temperatura, enfermedades de la piel cabelluda y accidentes o incidentes directos en la prótesis.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo entiendo  que no es posible asegurar o garantizar un resultado exacto, ya que dicho resultado puede variar en razón de factores como cuidados del propio paciente, condiciones externas incluyendo factores fortuitos relacionados con la idiosincrasia propia de cada paciente.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> Visualización inmediata y abrupta de la densidad capilar de la zona a instalar (previamente valorada) dando una pronta e inmediata solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de densidad proyectada en la valoración y preferencias de la prótesis capilar obtenida).</p>' +
                    '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="60" height="60" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
                    consentimiento += saltoPagina(encabezados_fichaIdentificacion);
                    consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                    '<ul style="list-style-type: square;">' +
                    '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Por el presente documento, autorizo al equipo médico, los auxiliares médicos, técnicos y personal  de Kaloni Holding Group, S.C., a realizar el procedimiento de instalación /mantenimiento de la prótesis capilar PHP</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' He sido también informado(a) que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la legislación Mexicana aplicable.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de la zona con fines clínicos.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                    "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                    '</table>';
            } else if (typeComps == '6') {
                consentimiento = '<p style="width:80%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MESOTERAPIA</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>tratamiento con Mesoterapia capilar</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido informado, que en atención a la composición y tipos de reacción de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas a medicamentos y proteínas utilizadas durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Es mi deber informar al médico sobre la toma de cualquier medicación antes de ser sometido al procedimiento.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿En qué consiste el procedimiento?.</b><br /> El tratamiento con Mesoterapia o intradermoterapia consiste en la administración de pequeñas dosis de fármacos, multivitamínicos, aminoácidos y factores de crecimiento autólogos o derivados de  células madre, mediante la realización de un número variable de inyecciones en la piel cabelluda vía intradérmica o con micro punciones, esta técnica consigue aumentar el efecto de los productos administrados por lo que las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">El número de sesiones y la frecuencia de aplicación de las mismas es variable en función del tratamiento a seguir de cada paciente por lo que no puede ser determinado de antemano. Los resultados se obtienen con mayor efectividad si el tratamiento realizado se complementa con otros tratamientos que potenciarán sus efectos, por ese motivo es importante que usted atienda a su Consulta de Valoración previamente.</p>'+
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS. </b><br /> <ul style="list-style-type: square;">' +
                    '<li>Existe una posibilidad, aunque mínima, de que aparezca vitíligo, una pigmentación en la zona de tratamiento sobre todo si hay exposición solar o a lámparas UV después del mismo.</li>' +
                    '<li>Existe la posibilidad de generar atrofia de la piel cabelluda debida a la idiosincrasia de cada paciente por la interacción de alguno o varios componentes de las fórmulas administradas.</li>' +
                    '<li>También es posible la aparición  de hematomas, es un riesgo frecuente que depende también del consumo o la utilización de ciertos medicamentos por parte del paciente (por ejemplo el uso de ácido acetil salicílico y otros anticoagulantes). </li>' +
                    '<li>Enrojecimiento en el área de la aplicación o de micropunción que normalmente pueden tardar unas horas o pocos días en desaparecer.</li>' +
                    '<li>Sensación de comezón, ardor leve, dolor de cabeza  dependiendo de la zona a tratar y por la idiosincrasia de cada persona.</li>' +
                    '<li>Puede existir el riesgo de presentar complicaciones causadas por alergias causadas por uno o varios de los componentes de las fórmulas, multivitamínicos o aminoácidos utilizados.</li></ul></p>' +
                    '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="50" height="50" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
                    consentimiento += saltoPagina(encabezados_fichaIdentificacion);
                    consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><ul style="list-style-type: square;">' +
                    '<li>Hasta pasados 3-4 días de realizado el procedimiento no debe acudir a saunas o piscinas para evitar la contaminación de los puntos de puntura.</li>' +
                    '<li>La técnica debe usarse con precaución durante el embarazo.</li></ul></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS. </b><br /> <ul style="list-style-type: square;"><li>La aplicación directa de este tratamiento puede ayudar a estimular la reparación, el crecimiento y la revitalización del cabello y la piel cabelluda.</li>' +
                    '<li>Puede prevenir el proceso de calvicie en alopecias no cicatrizales.</li>' +
                    '<li>Puede mejorar el crecimiento del cabello así como la disminución en el proceso de caída.</li>' +
                    '<li>Favorece el equilibrio en las fases de recambio y el recambio folicular.</li>' +
                    '<li>Puede mejorar la estructura capilar del cabello y su engrosamiento en la piel cabelluda tratada.</li></ul></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                    '<ul style="list-style-type: square;">' +
                    '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                    "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                    '</table>';
            } else {
                consentimiento = '<p style="width:60%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al procedimiento de injerto de cabello en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b>  Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Sangrado.</b> Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Infección.</b> A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente en la piel cabelluda tanto de zona donante como en zona a implantar. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Asimetría.</b> La cara humana es normalmente asimétrica por lo que puede haber variaciones entre un lado y otro tras un procedimiento de trasplante capilar.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reacciones alérgicas.</b>  Durante el procedimiento es necesaria la administración de ciertos medicamentos para poder ejecutar el procedimiento como es en la anestesia que se inyecta localmente en el área a tratar, también se requieren de analgésicos y otros medicamentos que son necesarios para mantener estable al paciente, sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados fármacos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Secuelas, signos y síntomas indeseables.</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfactorios.</b> El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos y de la dermis. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Retraso en la cicatrización.</b> Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                    '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="100" height="100" /></p>' +
                    '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
                    consentimiento += saltoPagina(encabezados_fichaIdentificacion);
                    consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> Recuperación y restauración de la densidad capilar en la zona a implantar, solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                    '<ul style="list-style-type: square;">' +
                    '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                    '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                    '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                    "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                    '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                    '</table>';
            }

            if (expediente == 'rostro') {

                // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE APARATOLOGIA ROSTRO
                //
                //
                var xmlRostro = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
                    '<pdf>\n' +
                    '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
                    //  +
                    // '<br /><br /><br /><br /><br />';
                    xmlRostro += encabezados_fichaIdentificacion

                xmlRostro += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>SESIONES DE APARATOLOGÍA ROSTRO</b></p>';

               ;
                
                //ACTION: Generación de la estructura de sesiones en el expediente
                for (var rc in array_datesLimit_values) {
                    //log.debug('fechas', array_datesLimit_values[rc]);
                    if (array_datesLimit_values[rc] != '') {

                        xmlRostro += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:1px solid #000000;"><tbody>' +

                            '<tr>' +
                            '<td style="width:20%;background-color:#346094;color:#FFFFFF;font-size:14px;">Sesión ' + (parseInt(rc) + 1) + '</td>' +
                            '<td style="width:52%;background-color:#346094;color:#FFFFFF;"><b>' + etiqueta_campo_23 + ': </b>' + arr_arr_sessions[rc][22] + '</td>' +
                            '<td style="width:28%;background-color:#346094;color:#FFFFFF;"></td>' +
                            '</tr>' +
                            '<tr><td colspan="2">' +

                            '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
                            '<tr><td style="width:55px;border-bottom:1px solid #346094;"><b>' + breakWord(etiqueta_campo_7) + ':</b></td>' +
                            '<td style="width:45px;background-color: #cadcff;border-bottom:1px solid #346094;" colspan="2">' + getMultiVals(arr_arr_sessions[rc][6]) + '</td>' +
                            '<td style="width:42px;;border-bottom:1px solid #346094;"><b>' + etiqueta_campo_5 + ':</b></td>' +
                            '<td style="width:60px;background-color: #cadcff;border-bottom:1px solid #346094;" colspan="2">' + getMultiVals(arr_arr_sessions[rc][4]) + '</td></tr>' +

                            '<tr><td style="width:48px;"><b>' + etiqueta_campo_6 + ':</b></td>' +
                            '<td style="width:50px;background-color: #cadcff;" colspan="2">' + getMultiVals(arr_arr_sessions[rc][5]) + '</td>' +
                            '</tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Observaciones</td></tr>' +
                            '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_1 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;" colspan="5">' + arr_arr_sessions[rc][0] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_3 + ':</b></td>' +
                            '<td style="background-color: #cadcff;" colspan="5">' + arr_arr_sessions[rc][2] + '</td>' +
                            '</tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Responsables</td></tr>' +
                            '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_2 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;" colspan="5">' + arr_arr_sessions[rc][1] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_4 + ':</b></td>' +
                            '<td style="background-color: #cadcff;" colspan="5">' + arr_arr_sessions[rc][3] + '</td>' +
                            '</tr>' +
                            '</tbody></table></td>' +

                            '<td width="220px" height="220px" rowspan="15" style="border-left:1px solid #000000;" align="center" valign="middle"><img width="200px" height="200px" src="' + xmlMod.escape({ xmlText: arr_arr_sessions[rc][23] }) + '" /></td></tr>' +

                            '</tbody></table><br />';

                            if (((rc % 2) == 1) && rc != 9 && array_datesLimit_values[parseInt(rc) + 1] != '') { xmlRostro += saltoPagina(encabezados_fichaIdentificacion); }
                    }
                }

                if (field_firmaClienteBase64 != null || field_firmaMedBase64 != null) {
                    xmlRostro += saltoPagina(encabezados_fichaIdentificacion);
                    xmlRostro += consentimiento;
                }

                xmlRostro += '</body></pdf>';
                xmlExpediente = xmlRostro;
                //context.response.renderPdf({ xmlString: xmlRostro });

            } else if (expediente == 'cuerpo') {

                // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE APARATOLOGIA CUERPO
                //
                //
                var xmlCuerpo = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
                    '<pdf>\n' +
                    '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >' +
                    '<br /><br /><br /><br /><br />';

                xmlCuerpo += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>SESIONES DE APARATOLOGÍA CUERPO</b></p>';

                xmlCuerpo += encabezados_fichaIdentificacion;

                for (var cc in array_datesLimit_values) {
                    //log.debug('fechas', array_datesLimit_values[rc]);
                    if (array_datesLimit_values[cc] != '') {

                        xmlCuerpo += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:1px solid #000000;"><tbody>' +

                            '<tr>' +
                            '<td style="width:20%;background-color:#346094;color:#FFFFFF;font-size:14px;">Sesión ' + (parseInt(cc) + 1) + '</td>' +
                            '<td style="width:52%;background-color:#346094;color:#FFFFFF;"><b>' + etiqueta_campo_23 + ': </b>' + arr_arr_sessions[cc][22] + '</td>' +
                            '<td style="width:28%;background-color:#346094;color:#FFFFFF;"></td>' +
                            '</tr>' +
                            '<tr><td colspan="2">' +

                            '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
                            '<tr><td style="width:55px"><b>' + breakWord(etiqueta_campo_11) + ':</b></td>' +
                            '<td style="width:45px;background-color: #cadcff;">' + getMultiVals(arr_arr_sessions[cc][10]) + '</td>' +
                            '<td style="width:42px;"><b>' + etiqueta_campo_12 + ':</b></td>' +
                            '<td style="width:60px;background-color: #cadcff;">' + getMultiVals(arr_arr_sessions[cc][11]) + '</td>' +
                            '<td style="width:48px;"><b>' + etiqueta_campo_13 + ':</b></td>' +
                            '<td style="width:50px;background-color: #cadcff;">' + getMultiVals(arr_arr_sessions[cc][12]) + '</td>' +
                            '</tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Información general</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_8 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][7] + '</td>' +
                            '<td><b>' + etiqueta_campo_9 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][8] + '</td>' +
                            '<td><b>' + etiqueta_campo_10 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][9] + '</td>' +
                            '</tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Perímetros</td></tr>' +
                            '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_14 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][13] + '</td>' +
                            '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_16 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][15] + '</td>' +
                            '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_17 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][16] + '</td>' +
                            '</tr>' +
                            '<tr><td><b>' + etiqueta_campo_15 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][14] + '</td></tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Pliegues Cutáneos</td></tr>' +
                            '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_18 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][17] + '</td>' +
                            '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_20 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][19] + '</td>' +
                            '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_22 + ':</b></td>' +
                            '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][21] + '</td>' +
                            '</tr>' +
                            '<tr><td><b>' + etiqueta_campo_19 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][18] + '</td>' +
                            '<td><b>' + etiqueta_campo_21 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][20] + '</td></tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Observaciones</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_1 + ':</b></td>' +
                            '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][0] + '</td>' +
                            '<td><b>' + etiqueta_campo_3 + ':</b></td>' +
                            '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][2] + '</td>' +
                            '</tr>' +

                            '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Responsables</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_2 + ':</b></td>' +
                            '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][1] + '</td>' +
                            '<td><b>' + etiqueta_campo_4 + ':</b></td>' +
                            '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][3] + '</td>' +
                            '</tr>' +
                            '</tbody></table></td>' +

                            '<td width="220px" height="220px" rowspan="15" style="border-left:1px solid #000000;" align="center" valign="middle"><img width="200px" height="200px" src="' + xmlMod.escape({ xmlText: arr_arr_sessions[cc][23] }) + '" /></td></tr>' +

                            '</tbody></table><p></p>';

                            //xmlCuerpo += saltoPagina(encabezados_fichaIdentificacion);

                        if (cc == 0 && array_datesLimit_values[parseInt(cc) + 1] != '') { xmlCuerpo += saltoPagina(encabezados_fichaIdentificacion); }
                        if (((cc % 2) == 0) && cc != 9 && cc != 0 && array_datesLimit_values[parseInt(cc) + 1] != '') { xmlCuerpo += saltoPagina(encabezados_fichaIdentificacion); }
                    }
                }

                if (field_firmaClienteBase64 != null && field_firmaMedBase64 != null) {
                    xmlCuerpo += saltoPagina(encabezados_fichaIdentificacion);
                    xmlCuerpo += consentimiento;
                }

                xmlCuerpo += '</body></pdf>';
                xmlExpediente = xmlCuerpo;
                //context.response.renderPdf({ xmlString: xmlCuerpo });
            } else if (expediente == 'complementarios') {

                log.debug('Arrays Complementarios', 'arreglo de fechas: ' + array_datesLimit_values.length + '  arreglo de valores: ' + arr_arr_sessions[0]);
                // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE APARATOLOGIA CUERPO
                //
                //
                var xmlComplementarios = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
                    '<pdf>\n' +
                    '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
                    //  +
                    // '<br /><br /><br /><br /><br />';
                    xmlComplementarios += encabezados_fichaIdentificacion;


                xmlComplementarios += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>SESIONES DE PROCEDIMIENTO</b></p>';

               
                for (var cco in array_datesLimit_values) {
                    //log.debug('fechas', array_datesLimit_values[rc]);
                    if (array_datesLimit_values[cco] != '') {

                        xmlComplementarios += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:1px solid #000000;"><tbody>' +

                            '<tr>' +
                            '<td style="width:70%;background-color:#346094;color:#FFFFFF;font-size:14px;">Sesión ' + (parseInt(cco) + 1) + '</td>' +
                            '<td style="width:30%;background-color:#346094;color:#FFFFFF;"><b>' + etiqueta_campo_2 + ': </b>' + arr_arr_sessions[cco][1] + '</td>' +
                            '</tr>' +

                            '<tr><td>' +

                            '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
                            '<tr><td style="width:34%;"><b>' + etiqueta_campo_1 + ':</b></td>' +
                            '<td style="width:66%;background-color: #cadcff;">' + arr_arr_sessions[cco][0] + '</td></tr>' +
                            '</tbody></table>' +

                            '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
                            '<tr><td style="width:18%;"><b>' + etiqueta_campo_3 + ':</b></td>' +
                            '<td style="width:29%;background-color: #cadcff;">' + arr_arr_sessions[cco][2] + '</td>' +
                            '<td style="width:24%;"><b>' + etiqueta_campo_5 + ':</b></td>' +
                            '<td style="width:29%;background-color: #cadcff;">' + arr_arr_sessions[cco][4] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_4 + ':</b></td>' +
                            '<td>' + arr_arr_sessions[cco][3] + '</td>' +
                            '<td><b>' + etiqueta_campo_6 + ':</b></td>' +
                            '<td>' + arr_arr_sessions[cco][5] + '</td></tr>' +
                            '</tbody></table>' +

                            '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
                            '<tr><td style="width:35%;background-color: #cadcff;"><b>' + etiqueta_campo_7 + ':</b></td>' +
                            '<td style="width:65%;background-color: #cadcff;">' + arr_arr_sessions[cco][6] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_8 + ':</b></td>' +
                            '<td>' + arr_arr_sessions[cco][7] + '</td></tr>' +
                            '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_9 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][8] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_10 + ':</b></td>' +
                            '<td>' + arr_arr_sessions[cco][9] + '</td></tr>' +
                            '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_11 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][10] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_12 + ':</b></td>' +
                            '<td>' + arr_arr_sessions[cco][11] + '</td></tr>' +
                            '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_13 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][12] + '</td></tr>' +
                            '<tr><td><b>' + etiqueta_campo_14 + ':</b></td>' +
                            '<td>' + arr_arr_sessions[cco][13] + '</td></tr>' +
                            '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_15 + ':</b></td>' +
                            '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][14] + '</td></tr>' +

                            '</tbody></table></td>' +

                            '<td width="220px" height="220px" rowspan="10" style="border-left:1px solid #000000;" align="center" valign="middle"><img width="120px" height="200px" src="' + xmlMod.escape({ xmlText: arr_arr_sessions[cco][15] }) + '" /></td></tr>' +

                            '</tbody></table><p></p>';
                        if (((cco % 2) == 1) && cco != 9 && array_datesLimit_values[parseInt(cco) + 1] != '') { xmlComplementarios += saltoPagina(encabezados_fichaIdentificacion); }
                        //log.debug('dato suma', array_datesLimit_values[parseInt(cco) + 1]);
                        //if (cco == 0) { xmlComplementarios += saltoPagina(encabezados_fichaIdentificacion); }
                        //if (((cco % 2) == 0) && cco != 9 && cco != 0) { xmlComplementarios += saltoPagina(encabezados_fichaIdentificacion); }
                    }
                }

                if (field_firmaClienteBase64 != null && field_firmaMedBase64 != null) {
                    xmlComplementarios += saltoPagina(encabezados_fichaIdentificacion);
                    xmlComplementarios += consentimiento;
                }

                xmlComplementarios += '</body></pdf>';
                xmlExpediente = xmlComplementarios;
                //context.response.renderPdf({ xmlString: xmlComplementarios });
            }
            context.response.renderPdf({ xmlString: xmlExpediente });
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
                if (sucursal == "52") {
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
         * @param {String} checks Parametro que revisa si el valor es verdadero o falso
         */
        function checado(checks) {
            var check = '';
            var pathCheck = '';
            var pathRemove = '';
            var pathYes = '';
            var pathNot = '';

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

        function getMultiVals(arregloValores) {
            var result = '';
            if (arregloValores != '') {
                for (var i in arregloValores) {
                    result += '- ' + arregloValores[i] + '<br />';
                }
                return result;
            }
            return result;
        }

        function breakWord(word) {
            var result = '';
            if (word != '') {
                result = word.replace('/', ' ');
                return result;
            }
        }

        return {
            onRequest: onRequest
        };
    });