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
            var exclusionFotoPacienteBase64 = objRecord.getValue({ fieldId: 'custevent516' });
            var exclusionFotoPacienteURL = objRecord.getText({ fieldId: 'custevent515' });

            if (customForm == '135') // Diagnóstico
            {
                if (exclusionFotoPacienteURL == "") {
                    log.debug("URL", "URL de campo vacía");
                    if (exclusionFotoPacienteBase64 != "") {
                        log.debug("Base64", "Existe Firma");

                        var okVal = exclusionFotoPacienteBase64.substring(0, 7);

                        if (okVal == 'data:im') {
                            //log.debug("data:im", "Se crea archivo PNG");
                            var pngFirmaExclusionPaciente_base64 = exclusionFotoPacienteBase64.replace('data:image/png;base64,', '');
                            var createFileFirmaExclusionPng = file.create({
                                name: casenumber + '_Exclusion_Firma Paciente.png',
                                fileType: 'PNGIMAGE',
                                folder: -4,
                                contents: pngFirmaExclusionPaciente_base64
                            });
                            var fileFirmaExclusionId = createFileFirmaExclusionPng.save();
                            var getFileImageFirmaExlusion = file.load({ id: fileFirmaExclusionId });
                            var getURLImageFirmaExclusion = getFileImageFirmaExlusion.url;
                            var newValBase64_exclusionFotoPacienteBase64 = "ok_" + exclusionFotoPacienteBase64;

                            objRecord.setValue({
                                fieldId: 'custevent515',
                                value: getURLImageFirmaExclusion,
                            });
                            objRecord.setValue({
                                fieldId: 'custevent516',
                                value: newValBase64_exclusionFotoPacienteBase64
                            });
                            objRecord.save({ enableSourcing: true });

                            objRecord.setValue({
                                fieldId: 'custevent515',
                                value: getURLImageFirmaExclusion,
                            });


                        } else {
                            //log.debug("Cualquier valor", "Se crea boton para guardar Firma");
                            context.form.addButton({
                                id: "custpage_excfotopdf",
                                label: "Firm. Exc. Fotografía",
                                functionName: "onButtonClick"
                            });
                            context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
                        }
                    } else {
                        log.debug("Base64", "No existe Firma");
                        context.form.addButton({
                            id: "custpage_excfotopdf",
                            label: "Firm. Exc. Fotografía",
                            functionName: "onButtonClick"
                        });
                        context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
                    }

                }/*  else {
                    log.debug("URL", "URL campo lleno");
                    context.form.addButton({
                        id: "custpage_excfotopdf",
                        label: "Exc. Fotografía",
                        functionName: "onButtonClick2"
                    });
                    context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaExcFotoPDF.js";
                } */
            }
        }
    };

    return {
        beforeLoad: beforeLoad
    };

});