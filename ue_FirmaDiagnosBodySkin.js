/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record', 'N/file'], function (record, file) {

    function beforeLoad(context) {
        if (context.type == 'view') {
            var recordCaseId = context.newRecord.id;
            var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
            var customForm = objRecord.getValue({ fieldId: 'customform' });
            var casenumber = objRecord.getValue({ fieldId: 'casenumber' });
            var exclusionFotoPacienteBase64 = objRecord.getValue({ fieldId: 'custevent325' });
            var exclusionFotoPacienteURL = objRecord.getText({ fieldId: 'custevent320' });

            if (customForm == '138') // Diagnóstico
            {
                if (exclusionFotoPacienteURL == "") {
                    log.debug("URL", "URL de campo vacía");
                    if (exclusionFotoPacienteBase64 != "") {    
                        log.debug("Base64", "Existe Firma");

                        var okVal = exclusionFotoPacienteBase64.substring(0, 7);

                        if (okVal == 'data:im') {
                            var pngFirmaExclusionPaciente_base64 = exclusionFotoPacienteBase64.replace('data:image/png;base64,', '');
                            var createFileFirmaExclusionPng = file.create({
                                name: casenumber + '_Diagnostico_BodySkin_Firma Paciente.png',
                                fileType: 'PNGIMAGE',
                                folder: -4,
                                contents: pngFirmaExclusionPaciente_base64
                            });
                            var fileFirmaExclusionId = createFileFirmaExclusionPng.save();
                            var getFileImageFirmaExlusion = file.load({ id: fileFirmaExclusionId });
                            var getURLImageFirmaExclusion = getFileImageFirmaExlusion.url;
                            var newValBase64_exclusionFotoPacienteBase64 = "ok_" + exclusionFotoPacienteBase64;

                            objRecord.setValue({
                                fieldId: 'custevent320',
                                value: getURLImageFirmaExclusion,
                            });
                            objRecord.setValue({
                                fieldId: 'custevent325',
                                value: newValBase64_exclusionFotoPacienteBase64
                            });
                            objRecord.save({ enableSourcing: true });

                        } else {
                            context.form.addButton({
                                id: "custpage_diagnosticoBodySkin",
                                label: "Firma Diagnóstico",
                                functionName: "onButtonClick"
                            });
                            //context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaDiagnosticoBodySkin.js";
                        }
                    } else {
                        log.debug("Base64", "No existe Firma");
                        context.form.addButton({
                            id: "custpage_excfotopdf",
                            label: "Firma Diagnóstico",
                            functionName: "onButtonClick"
                        });
                        //context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaDiagnosticoBodySkin.js";
                    }
                }
            }
        }
    }

    return {
        beforeLoad: beforeLoad
    };

});