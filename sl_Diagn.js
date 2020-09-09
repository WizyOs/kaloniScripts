/**
 * Suitelet that changes the PO Form Type
 */
// *********************************************************************************************************

function crearPDFCaso(valid) {

    var inRecord = nlapiLoadRecord('supportcase', valid);
    var medS = inRecord.getFieldValue('custevent2') || null;
    var user = nlapiGetUser();

    if (medS != null) {
        try {
 nlapiLogExecution('DEBUG', 'DEBUG', medS);
            var logo = "https://system.na2.netsuite.com/core/media/media.nl?id=1586838&c=3559763&h=c9885abe8bc213e27887";
            //Receta
            inRecord = nlapiLoadRecord('supportcase', valid);
            var type_alop = inRecord.getFieldValue('custevent294');
            var type_alop_label = inRecord.getField('custevent294').label;
            var company = inRecord.getFieldValue('company');
            var client = nlapiLoadRecord("customer", company);
            var cliente = client.getFieldValue("subsidiary");
            var cie = inRecord.getFieldText('custevent290');
            var casenumberText = inRecord.getFieldValue('casenumber');
            var imageURLpredefinida = "https://system.na2.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4";
            var imageURLrostro = "https://system.na2.netsuite.com/core/media/media.nl?id=2592214&c=3559763&h=209ff4c22993fdaad9f6";
            var imageURL = null;
            var imageDiagram = null;
            var imageDiagramRostro = null;
            var idImg = null;
            var expediente = client.getFieldValue('entityid');
            var altname = client.getFieldValue('altname');
            var fechaDeNacimiento = inRecord.getFieldValue('custevent331');
            var direccion = client.getFieldValue('defaultaddress') || '';
            var identificacion = client.getFieldValue('custentity251') || '';
            var phone = client.getFieldValue('phone');
            var estadoCivil = inRecord.getFieldText('custevent206') || '';
            var genero = inRecord.getFieldText('custevent634') || '';
            var sucursal = client.getFieldValue('custentity25');
            var sucursalText = client.getFieldText('custentity25');
            var sucReal = sucursalReal(sucursalText);
            var bandera = false;
            var fechaCaso = inRecord.getFieldValue('startdate');
            var fechaCaso_label = inRecord.getField('startdate').label;
            var edad = calcYearInt(fechaDeNacimiento, fechaCaso);
            fechaDeNacimiento = (fechaDeNacimiento == null) ? "" : fechaDeNacimiento;

            var imagePinturaCabeza_Base64 = inRecord.getFieldValue('custevent511') || null;
                if (imagePinturaCabeza_Base64 != null) {
                    imageDiagram = "<img width=\"140px\" height=\"200px\" src=\"" + nlapiEscapeXML(imagePinturaCabeza_Base64) + "\"/>";
                } else {
                    imageDiagram = "<img width=\"140px\" height=\"200px\" src=\"" + nlapiEscapeXML(imageURLpredefinida) + "\"/>";
                }

            var imagePinturaRostro_Base64 = inRecord.getFieldValue('custevent801') || null;
                if (imagePinturaRostro_Base64 != null){
                    imageDiagramRostro = "<img width=\"180px\" height=\"200px\" src=\"" + nlapiEscapeXML(imagePinturaRostro_Base64) + "\"/>";
                } else {
                    imageDiagramRostro = "<img width=\"180px\" height=\"200px\" src=\"" + nlapiEscapeXML(imageURLrostro) + "\"/>";
                }
            
            var DCDOA1 = inRecord.getFieldValue('custevent303');
            var DCDOA1_label = inRecord.getField('custevent303').label;
            var DCDOB1 = inRecord.getFieldValue('custevent302');
            var DCDOB1_label = inRecord.getField('custevent302').label;
            var DCDOC1 = inRecord.getFieldValue('custevent301');
            var DCDOC1_label = inRecord.getField('custevent301').label;
            var DCDOpro = inRecord.getFieldValue('custevent300');
            var DCDOpro_label = inRecord.getField('custevent300').label;
            var DCZRA1 = inRecord.getFieldValue('custevent299');
            var DCZRA1_label = inRecord.getField('custevent299').label;
            var DCZRB1 = inRecord.getFieldValue('custevent298');
            var DCZRB1_label = inRecord.getField('custevent298').label;
            var DCZRC1 = inRecord.getFieldValue('custevent297');
            var DCZRC1_label = inRecord.getField('custevent297').label;
            var DCZRpro = inRecord.getFieldValue('custevent296');
            var DCZRpro_label = inRecord.getField('custevent296').label;
            var AreaZD = inRecord.getFieldValue('custevent304');
            var AreaZD_label = inRecord.getField('custevent304').label;
            var AreaZDA = inRecord.getFieldValue('custevent305');
            var AreaZDA_label = inRecord.getField('custevent305').label;
            var AreaZDB = inRecord.getFieldValue('custevent306');
            var AreaZDB_label = inRecord.getField('custevent306').label;
            var AreaZDC = inRecord.getFieldValue('custevent307');
            var AreaZDC_label = inRecord.getField('custevent307').label;
            var AreaZD2 = inRecord.getFieldValue('custevent308');
            var AreaZD2_label = inRecord.getField('custevent308').label;
            var type_alop_text = inRecord.getFieldText('custevent309');
            var type_alop_text_label = inRecord.getField('custevent309').label;
            var type_razurado = inRecord.getFieldText('custevent311');
            var type_razurado_label = inRecord.getField('custevent311').label;
            var patologi = inRecord.getFieldValue('custevent310');
            var patologi_label = inRecord.getField('custevent310').label;
            var fecha = inRecord.getFieldValue('custevent276');
            var procedimientos = inRecord.getFieldText('custevent277') || '';
            var procedimientos_label = inRecord.getField('custevent277').label || '';
            var tiras = inRecord.getFieldText('custevent278') || '';
            var tiras_label = inRecord.getField('custevent278').label || '';
            var tipoDiag = inRecord.getFieldText('custevent284') || '';
            var tipoDiag_label = inRecord.getField('custevent284').label || '';
            //Nuevas areas de zonas receptoras para Barba
            var DCROD = inRecord.getFieldValue('custevent620');
            var DCROD_label = inRecord.getField('custevent620').label;
            var DCROF = inRecord.getFieldValue('custevent621');
            var DCROF_label = inRecord.getField('custevent621').label;
            var DCROG = inRecord.getFieldValue('custevent622');
            var DCROG_label = inRecord.getField('custevent622').label;
            var DCROH = inRecord.getFieldValue('custevent623');
            var DCROH_label = inRecord.getField('custevent623').label;
            var DCROI = inRecord.getFieldValue('custevent624');
            var DCROI_label = inRecord.getField('custevent624').label;

            var image_valoration1 = inRecord.getFieldValue('custevent313');
            var image_valoration1_label = inRecord.getField('custevent313').label;
            if (image_valoration1 != null && image_valoration1 != "") {
                var file_image1 = nlapiLoadFile(image_valoration1);
                var image_url1 = file_image1.getValue();
                var img_val_1 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url1) + "\"/>";
            } else {
                //img_val_1 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image1 = nlapiLoadFile("1592235");
                var image_url1 = file_image1.getValue();
                var img_val_1 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url1) + "\"/>";
            }

            var image_valoration2 = inRecord.getFieldValue('custevent314');
            var image_valoration2_label = inRecord.getField('custevent314').label;
            if (image_valoration2 != null && image_valoration2 != "") {
                var file_image2 = nlapiLoadFile(image_valoration2);
                var image_url2 = file_image2.getValue();
                var img_val_2 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url2) + "\"/>";
            } else {
                //img_val_2 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image2 = nlapiLoadFile("1592235");
                var image_url2 = file_image2.getValue();
                img_val_2 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url2) + "\"/>";
            }

            var image_valoration3 = inRecord.getFieldValue('custevent315');
            var image_valoration3_label = inRecord.getField('custevent315').label;
            if (image_valoration3 != null && image_valoration3 != "") {
                var file_image3 = nlapiLoadFile(image_valoration3);
                var image_url3 = file_image3.getValue();
                var img_val_3 = "<img height=\"200px\" width=\"200px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url3) + "\"/>";
            } else {
                //img_val_3 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image3 = nlapiLoadFile("1592235");
                var image_url3 = file_image3.getValue();
                var img_val_3 = "<img height=\"200px\" width=\"200px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url3) + "\"/>";
            }

            var image_valoration4 = inRecord.getFieldValue('custevent316');
            var image_valoration4_label = inRecord.getField('custevent316').label;
            if (image_valoration4 != null && image_valoration4 != "") {
                var file_image4 = nlapiLoadFile(image_valoration4);
                var image_url4 = file_image4.getValue();
                var img_val_4 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url4) + "\"/>";
            } else {
                //img_val_4 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image4 = nlapiLoadFile("1592235");
                var image_url4 = file_image4.getValue();
                var img_val_4 = "<img height=\"200px\" width=\"200px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_url4) + "\"/>";
            }

            //IMAGEN DE VALORACIÓN NUMERO 4 EN FORMATO AMPLIO PARA SECCIÓN ZONA A TRABAJAR
            var image_zonaTrabajar4 = inRecord.getFieldValue('custevent316');
            var image_zonaTrabajar4_label = inRecord.getField('custevent316').label;
            if (image_zonaTrabajar4 != null && image_zonaTrabajar4 != "") {
                var file_image_zona4 = nlapiLoadFile(image_zonaTrabajar4);
                var image_zonaTrabajar_url4 = file_image_zona4.getValue();
                var img_zona_4 = "<img height=\"600px\" width=\"600px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_zonaTrabajar_url4) + "\"/>";
            } else {
                var file_image_zona4 = nlapiLoadFile("1592235");
                var image_zonaTrabajar_url4 = file_image_zona4.getValue();
                var img_zona_4 = "<img height=\"600px\" width=\"600px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image_zonaTrabajar_url4) + "\"/>";
            }

            var observaciones = inRecord.getFieldValue('custevent279') || '';
            var observaciones_label = inRecord.getField('custevent279').label;
            var idx = inRecord.getFieldValue('custevent281') || '';
            var idx_label = inRecord.getField('custevent281').label;
            var tx = inRecord.getFieldValue('custevent280') || '';
            var tx_label = inRecord.getField('custevent280').label;
            var companyVal = inRecord.getFieldValue('company');
            var cliRecord = nlapiLoadRecord('customer', companyVal);
            var name = cliRecord.getFieldValue('altname');
            //var med1 = inRecord.getFieldValue('custevent177');
            var medS = inRecord.getFieldValue('custevent2');
            var nameMedico = inRecord.getFieldText('custevent322');

            var pngEmpty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAABS39xVAAAFz0lEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiDwGVgAyc5eaH0AAAAASUVORK5CYII=";

            var image1_microcamara = inRecord.getFieldValue('custevent333');
            var image1_microcamara_label = inRecord.getField('custevent333').label;
            if (image1_microcamara != null && image1_microcamara != "") {
                var file_image1_microcamara = nlapiLoadFile(image1_microcamara);
                var image1_microcamara_url = file_image1_microcamara.getValue();
                var img_micro_val_1 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image1_microcamara_url) + "\"/>";
            } else {
                //img_val_1 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image1_microcamara = nlapiLoadFile("1592235");
                var image1_microcamara_url = file_image1_microcamara.getValue();
                var img_micro_val_1 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image1_microcamara_url) + "\"/>";
            }

            var image2_microcamara = inRecord.getFieldValue('custevent334');
            var image2_microcamara_label = inRecord.getField('custevent334').label;
            if (image2_microcamara != null && image2_microcamara != "") {
                var file_image2_microcamara = nlapiLoadFile(image2_microcamara);
                var image2_microcamara_url = file_image2_microcamara.getValue();
                var img_micro_val_2 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image2_microcamara_url) + "\"/>";
            } else {
                //img_val_2 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image2_microcamara = nlapiLoadFile("1592235");
                var image2_microcamara_url = file_image2_microcamara.getValue();
                img_micro_val_2 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image2_microcamara_url) + "\"/>";
            }

            var image3_microcamara = inRecord.getFieldValue('custevent335');
            var image3_microcamara_label = inRecord.getField('custevent335').label;
            if (image3_microcamara != null && image3_microcamara != "") {
                var file_image3_microcamara = nlapiLoadFile(image3_microcamara);
                var image3_microcamara_url = file_image3_microcamara.getValue();
                var img_micro_val_3 = "<img height=\"275px\" width=\"275px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image3_microcamara_url) + "\"/>";
            } else {
                //img_val_3 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image3_microcamara = nlapiLoadFile("1592235");
                var image3_microcamara_url = file_image3_microcamara.getValue();
                var img_micro_val_3 = "<img height=\"275px\" width=\"275px\"  src=\"data:image/jpg;base64," + nlapiEscapeXML(image3_microcamara_url) + "\"/>";
            }

            var image4_microcamara = inRecord.getFieldValue('custevent336');
            var image4_microcamara_label = inRecord.getField('custevent336').label;
            if (image4_microcamara != null && image4_microcamara != "") {
                var file_image4_microcamara = nlapiLoadFile(image4_microcamara);
                var image4_microcamara_url = file_image4_microcamara.getValue();
                var img_micro_val_4 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image4_microcamara_url) + "\"/>";
            } else {
                //img_val_4 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
                var file_image4_microcamara = nlapiLoadFile("1592235");
                var image4_microcamara_url = file_image4_microcamara.getValue();
                var img_micro_val_4 = "<img height=\"275px\" width=\"275px\" src=\"data:image/jpg;base64," + nlapiEscapeXML(image4_microcamara_url) + "\"/>";
            }


            var diagnosticoFirmaPacienteBase64 = inRecord.getFieldValue('custevent325') || null;
            if (diagnosticoFirmaPacienteBase64 == null) {
                diagnosticoFirmaPacienteBase64 = pngEmpty;
            } else {
                if (diagnosticoFirmaPacienteBase64.substring(0, 3) == "ok_")
                    diagnosticoFirmaPacienteBase64 = diagnosticoFirmaPacienteBase64.substring(3, diagnosticoFirmaPacienteBase64.length);
            }

            var diagnosticoFirmaMedicoBase64 = inRecord.getFieldValue('custevent326') || null;
            if (diagnosticoFirmaMedicoBase64 == null) {
                diagnosticoFirmaMedicoBase64 = pngEmpty;
            } else {
                if (diagnosticoFirmaMedicoBase64.substring(0, 3) == "ok_")
                    diagnosticoFirmaMedicoBase64 = diagnosticoFirmaMedicoBase64.substring(3, diagnosticoFirmaMedicoBase64.length);
            }

            var fotosValoracionFirmaPacienteBase64 = inRecord.getFieldValue('custevent330') || null;
            if (fotosValoracionFirmaPacienteBase64 == null) {
                fotosValoracionFirmaPacienteBase64 = pngEmpty;
            } else {
                if (fotosValoracionFirmaPacienteBase64.substring(0, 3) == "ok_")
                    fotosValoracionFirmaPacienteBase64 = fotosValoracionFirmaPacienteBase64.substring(3, fotosValoracionFirmaPacienteBase64.length);
            }

            var exclusionFirmaPaciente_base64 = inRecord.getFieldValue('custevent516') || null;
            var exclusionFirmaPaciente_URL = inRecord.getFieldValue('custevent515');
            try {
                var validadorFirmaExclusion_base64 = exclusionFirmaPaciente_base64.substring(0, 3);
            } catch (error) {
                nlapiLogExecution('ERROR', 'Firma Exclusioón', msgError);
            }


            if ((validadorFirmaExclusion_base64 != "ok_" || validadorFirmaExclusion_base64 != "dat") && (exclusionFirmaPaciente_URL == null)) {
                exclusionFirmaPaciente_base64 = pngEmpty;
                bandera = false;
            } else if ((validadorFirmaExclusion_base64 == "ok_") || (validadorFirmaExclusion_base64 == "dat")) {
                exclusionFirmaPaciente_base64 = exclusionFirmaPaciente_base64.substring(3, exclusionFirmaPaciente_base64.length);
                bandera = true;
            }

            //var existeFirmaExclusion = exclusionFirmaPaciente_base64.substring(0, 3);
            var f = String(fechaCaso);
            var suc = String(sucReal);
            var nombre = String(name);

            var exclusion = integrarExlusionFoto(bandera, exclusionFirmaPaciente_base64, suc, f, nombre);

            //21: Santa Fe, 22: Altavista, 23: Guadalajara, 24: Monterrey, 25: Polanco, 26: Satéllite, 27: Tijuana, 28: Veracruz, 36: Chihuahua, 37: Puebla, 35: Cancún

            if (sucursal == '21') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
                var Sucur = 'SN';
            } else if (sucursal == '52') {
                var water = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
            }
            else if (sucursal == '22') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
                var Sucur = 'AL';
            }
            else if (sucursal == '23') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
                var Sucur = 'GU';
            }
            else if (sucursal == '24') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
                var Sucur = 'MO';
            }
            else if (sucursal == '25') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
                var Sucur = 'PO';
            }
            else if (sucursal == '26') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
                var Sucur = 'ST';
            }
            else if (sucursal == '27') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
                var Sucur = 'TI';
            }
            else if (sucursal == '28') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
                var Sucur = 'VE';
            }
            else if (sucursal == '36') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
                var Sucur = 'CH';
            }
            else if (sucursal == '37') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
                var Sucur = 'PU';
            }
            else if (sucursal == '35') {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                var Sucur = 'CA';
            } else {
                var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
            }
            var headerPdf = '';
            headerPdf += "<table style=\"width:70%;font-size:11px; font-family:'Aria', sans-serif\">";
            headerPdf += '<tr>';
            headerPdf += '<td style=\"font-size: 13px;font-weight:bold;color:#346094;\">FICHA DE IDENTIFICACIÓN:</td>';
            headerPdf += '</tr>';
            headerPdf += '<tr>';
            headerPdf += '<td>';
            headerPdf += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            headerPdf += '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + expediente + '</td><td><b>GÉNERO: </b> ' + genero + '</td></tr>';
            headerPdf += '<tr><td><b>NOMBRE: </b> ' + altname + '</td><td><b>CURP: </b> ' + identificacion + '</td></tr>';
            /*if (userObj.role == '3' || userObj.role == '1098') {*/
                headerPdf += '<tr><td><b>EDAD: </b> ' + edad + '</td><td><b>TELÉFONO: </b> ' + phone + '</td></tr>';
            /*} else {*/
            //xml += '<tr><td><b>EDAD: </b> ' + 'edad' + '</td><td><b>TELÉFONO: </b> XXXXX</td></tr>';
            /*}*/
            headerPdf += '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechaDeNacimiento + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>';
            headerPdf += '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + nlapiEscapeXML(direccion) + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + estadoCivil + '</td></tr>';
            headerPdf += '</table>';
            headerPdf += '</td>';
            headerPdf += '</tr>';
            headerPdf += '</table>';
            var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"' + nlapiEscapeXML(water) + '\" >';
            // xml += "<p></p><p></p><p></p><p></p><p></p>";
            xml += headerPdf;

            xml += "<p width=\"28%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">DIAGNÓSTICO CAPILAR</p>";
            
           
           
            xml += "<table  style=\"font-family:'Aria', sans-serif\" width=\"100%\" >";
            xml += "<tr>";
            xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'11px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\"><b>Tipos de Alopecia</b>";
            xml += "</td>";
            xml += "</tr>";
            xml += "</table>";
            xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
            xml += "<tr>";
            xml += "<td width=\"35%\" align=\"left\"><b>" + type_alop_text_label + "</b>:&nbsp;" + checado(type_alop_text) + "</td>";
            xml += "<td width=\"25%\" align=\"left\"><b>" + type_razurado_label + "</b>:&nbsp;" + checado(type_razurado) + "</td>";
            xml += "<td width=\"40%\" align=\"left\"><b>" + patologi_label + "</b>:&nbsp;" + checado(patologi) + "</td>";
            xml += "</tr>";
            xml += "</table >";

            xml += "<table style=\"font-family:'Aria', sans-serif\">";
            xml += "<tr>";
            xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'12px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\">Tipo y Diagrama de Clasificación Tipo AA</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td width=\"100%\" align=\"left\" style=\"font-family:'Aria', sans-serif;font-size:'11px'\"><b>" + tipoDiag_label + "</b>:&nbsp;" + tipoDiag + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td>";
            xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif;font-size:11px;\">";
            xml += "<tr>";
            xml += "<td width=\"78\">" + funt1(type_alop) + "</td>";
            xml += "<td width=\"78\">" + funt2(type_alop) + "</td>";
            xml += "<td width=\"78\">" + funt3(type_alop) + "</td>";
            xml += "<td width=\"78\">" + funt4(type_alop) + "</td>";
            xml += "<td width=\"78\">" + funt5(type_alop) + "</td>";
            xml += "<td width=\"78\">" + funt6(type_alop) + "</td>";
            xml += "<td width=\"78\">" + funt7(type_alop) + "</td>";
            xml += "</tr>";
            xml += "<tr >";
            xml += "<td align=\"center\"  width=\"78\">1</td>";
            xml += "<td align=\"center\"  width=\"78\">2</td>";
            xml += "<td align=\"center\"  width=\"78\">3</td>";
            xml += "<td align=\"center\"  width=\"78\">4</td>";
            xml += "<td align=\"center\"  width=\"78\">5</td>";
            xml += "<td align=\"center\"  width=\"78\">6</td>";
            xml += "<td align=\"center\"  width=\"78\">7</td>";
            xml += "</tr>";
            xml += "<tr>";
            if (cliente == '10') {
                xml += "<td colspan=\"4\" style=\"align:lefth\">CIE10:&nbsp;<b>" + checado(cie) + "</b></td>";
            }
            xml += "</tr>";
            xml += "</table>";
            xml += "</td>";
            xml += "</tr>";
            xml += "</table>";

            xml += "<table>";
            xml += "<tr>";
            xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'12px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\">Registro de Evaluación de Densidad</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td>";
            xml += "<table border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">";
            xml += "<tr>";
            xml += "<td valign=\"middle\"  width=\"260\" border=\"1px\"><b>" + DCDOA1_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" width=\"180\"  border=\"1px\">" + checado(DCDOA1) + "</td>";
            xml += "<td width=\"180\" height=\"200px\" align=\"center\" border=\"1px\" rowspan=\"9\">" + imageDiagram + " </td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCDOB1_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCDOB1) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCDOC1_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCDOC1) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCDOpro_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCDOpro) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCZRA1_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCZRA1) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCZRB1_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCZRB1) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCZRC1_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCZRC1) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCZRpro_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCZRpro) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCROD_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCROD) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCROF_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCROF) + "</td>";
            xml += "<td width=\"180\" height=\"180px\" align=\"center\" border=\"1px\" rowspan=\"10\">" + imageDiagramRostro + " </td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCROG_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCROG) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCROH_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCROH) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + DCROI_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\">" + checado(DCROI) + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td colspan=\"2\" style=\"font-family:'Aria', sans-serif; font-size:'12px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\">Área de Medición</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + AreaZD_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZD) + "</b></td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + AreaZDA_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDA) + "</b></td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + AreaZDB_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDB) + "</b></td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + AreaZDC_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDC) + "</b></td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td valign=\"middle\" border=\"1px\"><b>" + AreaZD2_label + "</b></td>";
            xml += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZD2) + "</b></td>";
            xml += "</tr>";
            xml += "</table>";
            xml += "</td>";
            xml += "</tr>";
            xml += "</table>";
            xml += '<div style=\"page-break-after: always;\"></div>';
            // xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            xml += headerPdf;

            //IMAGENES VALORACION
            xml += "<p width=\"38%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">IMÁGENES VALORACIÓN</p>";
            xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
            xml += "<tr>";
            xml += "<td width=\"50%\" align=\"center\">" + image_valoration1_label + ":&nbsp;" + img_val_1 + "</td>";
            //xml += "<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
            xml += "<td width=\"50%\" align=\"center\">" + image_valoration2_label + ":&nbsp;" + img_val_2 + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td width=\"50%\" align=\"center\">" + image_valoration3_label + ":&nbsp;" + img_val_3 + "</td>";
            //xml += "<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
            xml += "<td width=\"50%\"  align=\"center\">" + image_valoration4_label + ":&nbsp;" + img_val_4 + "</td>";
            xml += "</tr>";
            xml += "</table>";
            xml += '<br></br>';
            xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >";
            xml += "<tr>";
            xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
            xml += "<td width=\"300px\" align=\"center\" valign=\"middle\"><img src=\"" + diagnosticoFirmaPacienteBase64 + "\" width=\"100\" height=\"100\" /></td>";
            xml += "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
            xml += "<td width=\"300px\" align=\"center\" valign=\"middle\" style=\"border-top:1px solid #000000;\"><b>FIRMA DEL PACIENTE</b></td>";
            xml += "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
            xml += "<td width=\"300px\" align=\"center\" valign=\"middle\">" + checado(name) + "</td>";
            xml += "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
            xml += "</tr>";
            xml += "</table>";
            xml += '<div style=\"page-break-after: always;\"></div>';
            // xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            xml += headerPdf;

            //IMAGENES MICROCAMARA
            xml += "<p width=\"38%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">FOTOS DE MICROCAMARA</p>";
            xml += '<br></br>';
            xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
            xml += "<tr>";
            xml += "<td width=\"50%\" align=\"center\">" + image1_microcamara_label + "&nbsp;" + img_micro_val_1 + "</td>";
            xml += "<td width=\"50%\" align=\"center\">" + image2_microcamara_label + "&nbsp;" + img_micro_val_2 + "</td>";
            xml += "</tr>";
            xml += "<tr>";
            xml += "<td width=\"50%\" align=\"center\">" + image3_microcamara_label + "&nbsp;" + img_micro_val_3 + "</td>";
            xml += "<td width=\"50%\"  align=\"center\">" + image4_microcamara_label + "&nbsp;" + img_micro_val_4 + "</td>";
            xml += "</tr>";
            xml += "</table>";
            xml += '<br></br>';
            xml += '<div style=\"page-break-after: always;\"></div>';
            // xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            xml += headerPdf;


            //ZONA A TRABAJAR
            xml += "<p width=\"38%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">ÁREA A TRATAR</p>";
            xml += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
            xml += "<tr><td width=\"100%\" align=\"center\">" + img_zona_4 + "</td></tr>";
            xml += "</table>";
            xml += '<div style=\"page-break-after: always;\"></div>';
            // xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            xml += headerPdf;


            //DIAGNOSTIVO TRATAMIENTO
            xml += "<p width=\"28%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">DIAGNÓSTICO CAPILAR</p>";
            xml += "<table  style=\"font-family:'Aria', sans-serif\" width=\"100%\" >";
            xml += "<tr>";
            xml += "<td style=\"font-family:'Aria', sans-serif; font-size:'11px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\"><b>Exploración, Diagnóstico y Tratamiento</b>";
            xml += "</td>";
            xml += "</tr>";
            xml += "</table>";
            xml += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
            xml += "<tr>";
            xml += "<td width=\"30%\" align=\"left\"><b>" + fechaCaso_label + "</b>:&nbsp;" + fechaCaso + "</td>";
            xml += "<td width=\"40%\" align=\"center\"><b>" + procedimientos_label + "</b>:&nbsp;" + procedimientos + "</td>";
            xml += "<td width=\"30%\" align=\"center\"><b>" + tiras_label + "</b>:&nbsp;" + tiras + "</td>";
            xml += "</tr>";
            xml += "</table >";
            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td><b>' + observaciones_label + '</b>:&nbsp;</td></tr>';
            xml += '<tr><td height="100" background-color="#CCD1D1" style="border: 1px solid black">' + observaciones + '</td></tr>';
            xml += '</table>';
            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td><b>' + idx_label + '</b>:&nbsp;</td></tr>';
            xml += '<tr><td height="100" background-color="#CCD1D1" style="border: 1px solid black">' + idx + '</td></tr>';
            xml += '</table>';
            xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td><b>' + tx_label + '</b>:&nbsp;</td></tr>';
            xml += '<tr><td height="100" background-color="#CCD1D1" style="border: 1px solid black">' + tx + '</td></tr>';
            xml += '<tr><td height="10"></td></tr>';
            xml += '<tr><td><b>Médico que valoró: </b><span style="text-decoration:underline;font-size:12px;font-family:Aria, sans-serif;">' + nameMedico + '</span></td></tr>';
            xml += '</table>';

            //Formulario Exclusión de Fotografía
            xml += exclusion;

            xml += '</body>\n</pdf>';

            fileXMLtoPDF = nlapiXMLToPDF(xml);
            return fileXMLtoPDF;
        }
        catch (error) {
            var msgError = error;
            //nlapiLogExecution('debug', 'title', JSON.stringify(med1));
            nlapiLogExecution('ERROR', 'title', msgError);
            return false;
        }
    } else {
        alert('No se ha registrado el medico responsable')
    }
}
//var id = request.getParameter('poid');
//var result = crearPDFCaso(id);
// *********************************************************************************************************
function gererarPDF(request, response) {

    var id = request.getParameter('poid');
    nlapiLogExecution('DEBUG', 'PDF Recetas: ', 'Value request id parameter: ' + id);
    try {
        var result = crearPDFCaso(id);
        if (result !== false && result !== null) {
            nlapiLogExecution('AUDIT', 'function crearPDFCaso(): ', 'Receta creada correctamente!! Case id record: ' + id);
            response.setContentType('PDF', 'preview.pdf', 'inline');
            response.write(result.getValue());
        } else {
            nlapiLogExecution('ERROR', ' function crearPDFCaso(): ', 'Receta no creada!! Case id record: ' + id);
        }
    }
    catch (err2) {
        var msgError = err2;
        nlapiLogExecution('ERROR', 'Error gererarPDF function', msgError);
    }
}
// *********************************************************************************************************
function checado(checks) {
    var check = "";
    if (checks == "T") {
        var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
        check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path) + "\">probando</img>";
    }
    else {
        if (checks == "F") {
            var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
            check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path2) + "\"/>";
        } else {
            if (checks == null) {
                check = "";
            } else {
                check = checks;
            }
        }
    }
    return check;
}

function getFecha() {
    var valFecha = '';
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var f = new Date();
    valFecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
    return valFecha;
}

function funt1(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743291&c=3559763&h=1e56212e1db2d20cecd8";
    if (entero == 1) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt2(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743292&c=3559763&h=76fba8deb7014f71c1f7";
    if (entero == 2) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt3(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743293&c=3559763&h=7dec6caa816e21b8bc6e";
    if (entero == 3) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}

function funt4(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743294&c=3559763&h=1185d5785a0770214839";
    if (entero == 4) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {
        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt5(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743295&c=3559763&h=7a635732f3364dfd193f";
    if (entero == 5) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {

        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt6(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743296&c=3559763&h=2d035ee0a3af4a40b135";
    if (entero == 6) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {
        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}
function funt7(Num) {
    var entero = parseInt(Num);
    var imageSelect = "";
    imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743297&c=3559763&h=d1987980bf9f6bb72443";
    if (entero == 7) {
        imageSelect = "<img height=\"78px\" valign=\"middle\" border=\"6px\" width=\"78px\" style=\"border-color: #346094\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    } else {
        imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + nlapiEscapeXML(imageSelect) + "\"></img>";
    }
    return imageSelect;
}

function integrarExlusionFoto(bandera, firma, sucReal, fech, paciente) {

    if (bandera == true) {
        var avisoMexico = '<div style="page-break-after: always;"></div>' +

            '<br/><br/><br/><br/><br/>' +

            '<p style="width:70%;color:#000000;font-family:Aria, sans-serif;align:center"><b>FORMULARIO DE EXCLUSIÓN DE FOTOGRAFÍA PARA EXPEDIENTE CLÍNICO ELECTRÓNICO</b></p>' +

            '<br/><p style="font-family:Aria, sans-serif; font-size:12px;">El expediente clínico electrónico es una fuente de información que amplía el dictamen médico experto, conformándose por una descripción médica aunado a documentos, imágenes, procedimientos, pruebas diversas, análisis e información de estudios practicados al paciente.</p>' +

            '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendo que el expediente clínico electrónico de manera integral, representa una base para conocer las condiciones de salud, los actos médicos, los diferentes procedimientos ejecutados por el equipo médico así como los resultados y progreso de mi tratamiento.</p>' +

            '<p style="font-family:Aria, sans-serif; font-size:12px;">Por tal motivo, entiendo que al denegar el permiso de toma de fotografías para integrar dicho expediente, los médicos no contarán con referencias gráficas para documentar el seguimiento completo de mi tratamiento.</p>' +

            '<p style="font-family:Aria, sans-serif; font-size:12px;">(Solo firme si rechaza el permiso)</p>' +

            '<p style="font-family:Aria, sans-serif; font-size:12px;">No otorgo autorización para la toma de fotografías y/o videos durante mi proceso de tratamiento en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +

            '<p style="font-family:Aria, sans-serif; font-size: 12px;">Firmo la presente, en <b>' + sucReal + ' a ' + fech + ' </b></p><br/>' +

            '<p style="font-family:Aria, sans-serif; font-size:12px;">Atentamente,</p>' +

            "<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >" +

            "<tr>" +

            "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>" +

            "<td width=\"300px\" align=\"center\" valign=\"middle\"><img src=\"" + firma + "\" width=\"100\" height=\"100\" /></td>" +

            "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>" +

            "</tr>" +

            "<tr>" +

            "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>" +

            "<td width=\"300px\" align=\"center\" valign=\"middle\"><u> " + paciente + "</u></td>" +

            "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>" +

            "</tr>" +

            "<tr>" +

            "<td width=\"277px\" align=\"center\" valign=\"middle\"></td>" +

            "<td width=\"300px\" align=\"center\" valign=\"middle\"><b>Firma del Paciente</b></td>" +

            "<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>" +

            "</tr>" +

            "</table>";

        return avisoMexico;
    } else {
        return avisoMexico = '';
    }
}

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
    var separador = '';
    var edad = null;

    if (fechaReciente == null || fechaAntigua == null) {
        edad = "";
        return edad;
    } else {
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
}