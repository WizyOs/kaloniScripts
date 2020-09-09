/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/https', 'N/log'], function (record, file, serverWidget, https, log) {


    function beforeLoad(context) {
        if (context.type == 'view') {
            var recId = context.newRecord.id;
            var caso = record.load({ type: 'supportcase', id: recId, isDynamic: true });
            var caseId = caso.getValue({ fieldId: 'casenumber' });
            var caseIdForm = caso.getValue({ fieldId: 'customform' });
            var pintarRostro_base64 = caso.getValue({ fieldId: 'custevent801' }) || null;
            var pintarCuerpo_base64 = caso.getValue({ fieldId: 'custevent810' }) || null;
            var pintarRostro = caso.getValue({ fieldId: 'custevent800' }) || null;
            var pintarCuerpo = caso.getValue({ fieldId: 'custevent809' }) || null;
            var casenumber = caso.getValue({ fieldId: 'casenumber' });
            var firmaPaciente_diagnostico_Base64 = caso.getValue({ fieldId: 'custevent325' }) || null;
            var firmaPaciente_diagnostico_URL = caso.getText({ fieldId: 'custevent320' }) || null;

            if (caseIdForm == '138') {
                var folderId_PintarZonas = 1572868; // id de folde para guardar imagenes de cabeza, rostro y body -> 1572868
                var folderId_Firmas = -4; // Id folder para guardar imagenes de firmas -4
                var response = https.get({ url: 'https://rest.netsuite.com/rest/datacenterurls?account=3559763&c=3559763' });
                var jsonObj = response.body;
                var objSistema = JSON.parse(jsonObj);
                var rostroRecordSet = false;
                var rostroCuerpoSet = false;
                var firmaDiagnosticoSet = false;

                if (pintarRostro_base64 != null || pintarCuerpo_base64 != null) {
                    if (pintarRostro == null || pintarCuerpo == null) {

                        if (pintarRostro_base64 != null) {
                            var pngRostro_base64 = pintarRostro_base64.replace("data:image/png;base64,", "");
                            var fileObjRostro = file.create({ name: recId + ' ' + caseId + '_ImagenMedicalRostroFull.png', fileType: 'PNGIMAGE', folder: folderId_PintarZonas, contents: pngRostro_base64, isOnline: false });
                            var pngRostro_fileId = fileObjRostro.save();
                            var newImageRostro = file.load({ id: pngRostro_fileId });
                            caso.setValue({ fieldId: 'custevent800', value: objSistema.systemDomain + newImageRostro.url });
                            rostroRecordSet = true;
                        } else {
                            log.debug("Log: ", "Ya se generó la imagen del Rostro!!");
                            log.debug("imgRostroBase64: ", pintarRostro_base64);
                        }

                        if (pintarCuerpo_base64 != null) {
                            var pngCuerpo_base64 = pintarCuerpo_base64.replace("data:image/png;base64,", "");
                            var fileObjCuerpo = file.create({ name: recId + ' ' + caseId + '_ImagenMedicalCuerpoFull.png', fileType: 'PNGIMAGE', folder: folderId_PintarZonas, contents: pngCuerpo_base64, isOnline: false });
                            var pngCuerpo_fileId = fileObjCuerpo.save();
                            var newImageCuerpo = file.load({ id: pngCuerpo_fileId });
                            caso.setValue({ fieldId: 'custevent809', value: objSistema.systemDomain + newImageCuerpo.url });
                            rostroCuerpoSet = true;
                        } else {
                            log.debug("Log: ", "Ya se generó la imagen del Cuerpo!!");
                            log.debug("imgCuerpoBase64: ", pintarCuerpo_base64);
                        }
                    }
                }

                if (firmaPaciente_diagnostico_URL == null) {
                    if (firmaPaciente_diagnostico_Base64 != null) {

                        var okVal = firmaPaciente_diagnostico_Base64.substring(0, 7);

                        if (okVal == 'data:im') {
                            var pngfirmaPaciente_diagnostico_Base64 = firmaPaciente_diagnostico_Base64.replace('data:image/png;base64,', '');
                            var createFileFirmaDiagnosticoBodySkinPng = file.create({
                                name: casenumber + '_Diagnostico_BodySkin_Firma Paciente.png',
                                fileType: 'PNGIMAGE',
                                folder: folderId_Firmas,
                                contents: pngfirmaPaciente_diagnostico_Base64
                            });
                            var fileFirmaDiagnosticoBodySkinId = createFileFirmaDiagnosticoBodySkinPng.save();
                            var getFileImageFirmaDiagnosticoBodySkinId = file.load({ id: fileFirmaDiagnosticoBodySkinId });
                            var getURLImageFirmaDiagnosticoBodySkin = getFileImageFirmaDiagnosticoBodySkinId.url;

                            caso.setValue({
                                fieldId: 'custevent320',
                                value: getURLImageFirmaDiagnosticoBodySkin,
                            });

                            firmaDiagnosticoSet = true;
                        }
                    }
                }

                if (rostroRecordSet == true || rostroCuerpoSet == true || firmaDiagnosticoSet == true) {
                    caso.save({ enableSourcing: true, ignoreMandatoryFields: true });
                }

                // BOTON PINTAR ZONAS SOBRE IMAGENES
                if (pintarRostro_base64 == null || pintarCuerpo_base64 == null) {
                    context.form.addButton({ id: 'custpage_pintar_imagenes', label: 'Pintar Zonas', functionName: 'pintarImagenes' });
                }
                // BOTON FIRMA PACIENTE
                if (firmaPaciente_diagnostico_Base64 == null) {
                    context.form.addButton({ id: "custpage_firmaPaciente_diagnosticoBodySkin", label: "Firma Diagnóstico", functionName: "firmaDiagnosticoBodySkin" });
                }
                // BOTON VER EXPEDIENTE
                context.form.addButton({ id: 'custpage_ver_expedienteDiagnostico', label: 'Ver Exp.', functionName: 'verExpedienteCorporal' });
                context.form.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';
            }

            if (caseIdForm == '148') {
                context.form.addButton({ id: 'custpage_ver_expedienteProcedimiento', label: 'Ver Exp.', functionName: 'verExpedienteProcedimiento' });
                context.form.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';
            }

            if (caseIdForm == '147') {
                context.form.addButton({ id: 'custpage_ver_expedienteAparatologiaRostro', label: 'Ver Exp.', functionName: 'verExpedienteRostro' });
                context.form.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';
            }

            if (caseIdForm == '33') {
                context.form.addButton({ id: 'custpage_ver_expedienteAparatologiaCuerpo', label: 'Ver Exp.', functionName: 'verExpedienteCuerpo' });
                context.form.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';
            }

            if (caseIdForm == '151') {
                context.form.addButton({ id: 'custpage_ver_expedienteAparatologiaComplementarios', label: 'Ver Exp.', functionName: 'verExpedienteComplementarios' });
                context.form.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';
            }
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});