/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record', 'N/file'], function (record, file) {

  function beforeLoad(context) {
    /*     if (context.type == "view") {
          var recordCaseId = context.newRecord.id;
          var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
          var customForm = objRecord.getValue({ fieldId: 'customform' });
          var casenumber = objRecord.getValue({ fieldId: 'casenumber' });
          var diagnosticoFirmaPacienteBase64 = objRecord.getValue({ fieldId: 'custevent325' });
          var diagnosticoFirmaMedicoBase64 = objRecord.getValue({fieldId: 'custevent326'});
          var fotosValoracionFirmaPacienteBase64 = objRecord.getValue({ fieldId: 'custevent330' });
          var diagnosticoFirmaPacienteURL = objRecord.getValue({ fieldId: 'custevent320' });
          var diagnosticoFirmaMedicoURL = objRecord.getValue({fieldId: 'custevent321'});
          var fotosValoracionFirmaPacienteURL = objRecord.getValue({ fieldId: 'custevent329' });
          log.debug("customForm: ", customForm);
          if(customForm == "Diagnostico"){
                 context.form.addButton({
                     id: "custpage_firmasdiagnostico",
                     label: "Firmas Diagnostico",
                     functionName: "onButtonClick"
                 });
                     context.form.clientScriptModulePath = "SuiteScripts/cs_DiagnosticoFirmas.js";
              }
    
          if (customForm == "135")  F-Diagnostico = 135
          {
            if ((diagnosticoFirmaPacienteURL == "" || diagnosticoFirmaPacienteURL == null) && (diagnosticoFirmaMedicoURL == "" || diagnosticoFirmaMedicoURL == null) && (fotosValoracionFirmaPacienteURL == "" || fotosValoracionFirmaPacienteURL == null)) {
              if (diagnosticoFirmaPacienteBase64 != "" || diagnosticoFirmaPacienteBase64 != null && diagnosticoFirmaMedicoBase64 != "" && diagnosticoFirmaMedicoBase64 != null && fotosValoracionFirmaPacienteBase64 != "" && fotosValoracionFirmaPacienteBase64 != null) {
                var okVal = diagnosticoFirmaPacienteBase64.substring(0, 7);
                var okVal2 = diagnosticoFirmaMedicoBase64.substring(0, 7);
                var okVal3 = fotosValoracionFirmaPacienteBase64.substring(0, 7);
                log.debug("okVal: ", okVal);
                if (okVal != "ok_data" && okVal2 != "ok_data" && okVal3 != "ok_data") {
                   crear imagen paciente
                  var pngFirmaPaciente_base64 = diagnosticoFirmaPacienteBase64.replace("data:image/png;base64,", "");
                  var fol = -4;
                  var fileObj = file.create({ name: casenumber + "_Diagnostico_Firma paciente.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaPaciente_base64, isOnline: false });
                  var pngFirmaPaciente_fileId = fileObj.save();
                  var pngFirmaPaciente_fileObjImage = file.load({ id: pngFirmaPaciente_fileId });
                  var pngFirmaPacienteURL = pngFirmaPaciente_fileObjImage.url;
                   crear imagen médico
                  var pngFirmaMedico_base64 = diagnosticoFirmaMedicoBase64.replace("data:image/png;base64,", "");
                  var fileObj2 = file.create({name: casenumber + "_Diagnostico_Firma medico.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaMedico_base64, isOnline: false});
                  var pngFirmaMedico_fileId = fileObj2.save();
                  var pngFirmaMedico_fileObjImage = file.load({id:pngFirmaMedico_fileId});
                  var pngFirmaMedicoURL = pngFirmaMedico_fileObjImage.url;
    
                  objRecord.setValue({ fieldId: "custevent320", value: pngFirmaPacienteURL });
                  objRecord.setValue({ fieldId: "custevent329", value: pngFirmaPacienteURL });
                  objRecord.setValue({fieldId: "custevent321", value: pngFirmaMedicoURL});
                  var diagnosticoFirmaPacienteBase64_newValBase64 = "ok_" + diagnosticoFirmaPacienteBase64;
                  var diagnosticoFirmaMedicoBase64_newValBase64 = "ok_" + diagnosticoFirmaMedicoBase64;
                  var fotosValoracionFirmaPacienteBase64_newValBase64 = "ok_" + fotosValoracionFirmaPacienteBase64;
                  objRecord.setValue({ fieldId: "custevent325", value: diagnosticoFirmaPacienteBase64_newValBase64 });
                  objRecord.setValue({fieldId: "custevent326", value: diagnosticoFirmaMedicoBase64_newValBase64});
                  objRecord.setValue({ fieldId: "custevent330", value: fotosValoracionFirmaPacienteBase64_newValBase64 });
                  objRecord.save({ enableSourcing: true, ignoreMandatoryFields: false });
                }
                else {
                  log.debug("Log: ", "Ya se generaron las imagenes de firma (Paciente y Médico)");
                  log.debug("diagnosticoFirmaPacienteBase64: ", diagnosticoFirmaPacienteBase64);
                  log.debug("diagnosticoFirmaMedicoBase64: ", diagnosticoFirmaMedicoBase64);
                  log.debug("fotosValoracionFirmaPacienteBase64: ", fotosValoracionFirmaPacienteBase64);
                }
              }
              else {
                context.form.addButton({
                  id: "custpage_firmasdiagnostico",
                  label: "Firma Diagnostico",
                  functionName: "onButtonClick"
                });
                context.form.clientScriptModulePath = "SuiteScripts/cs_DiagnosticoFirmas.js";
              }
            }
          }
    
        } */

    if (context.type == "view") {
      var recordCaseId = context.newRecord.id;
      var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
      var customForm = objRecord.getValue({ fieldId: 'customform' });
      var casenumber = objRecord.getValue({ fieldId: 'casenumber' });
      var diagnosticoFirmaPacienteBase64 = objRecord.getValue({ fieldId: 'custevent325' });
      var diagnosticoFirmaPacienteURL = objRecord.getValue({ fieldId: 'custevent320' });

       if (customForm == "135") {
        if (diagnosticoFirmaPacienteURL == "") {
          if (diagnosticoFirmaPacienteBase64 != "") {
            log.debug('base64: ', diagnosticoFirmaPacienteBase64);
            log.debug('url: ', diagnosticoFirmaPacienteURL);
            var okVal = diagnosticoFirmaPacienteBase64.substring(0, 7);
            if (okVal != "ok_data") {
              //crear imagen paciente
              var pngFirmaPaciente_base64 = diagnosticoFirmaPacienteBase64.replace("data:image/png;base64,", "");
              var fol = -4;
              var fileObj = file.create({ name: casenumber + "_Diagnostico_Firma paciente.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaPaciente_base64, isOnline: false });
              var pngFirmaPaciente_fileId = fileObj.save();
              var pngFirmaPaciente_fileObjImage = file.load({ id: pngFirmaPaciente_fileId });
              var pngFirmaPacienteURL = pngFirmaPaciente_fileObjImage.url;;

              objRecord.setValue({ fieldId: "custevent320", value: pngFirmaPacienteURL });
              var diagnosticoFirmaPacienteBase64_newValBase64 = "ok_" + diagnosticoFirmaPacienteBase64;
              objRecord.setValue({ fieldId: "custevent325", value: diagnosticoFirmaPacienteBase64_newValBase64 });
              objRecord.save({ enableSourcing: true, ignoreMandatoryFields: true });
            }
          }
          else {
            context.form.addButton({
              id: "custpage_firmasdiagnostico",
              label: "Firma Diagnóstico",
              functionName: "onButtonClick"
            });
            context.form.clientScriptModulePath = "SuiteScripts/cs_DiagnosticoFirmas.js";
          }
        }  else {
          log.debug("Log: ", "Ya se generaron las imagenes de firma (Paciente y Médico)");
          log.debug("diagnosticoFirmaPacienteBase64: ", diagnosticoFirmaPacienteBase64);
        }
      }

    }
  }
  return {
    beforeLoad: beforeLoad
  };
});