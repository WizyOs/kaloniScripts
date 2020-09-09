	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/log'], function(record, file, serverWidget, log) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        var recordCaseId = context.newRecord.id;
    	  var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true});
        var field_casenumber = objRecord.getValue({fieldId: 'casenumber'});
        var firmaCli1 = objRecord.getValue({fieldId: 'custevent86'}) || null;
        var firmaMed1 = objRecord.getValue({fieldId: 'custevent87'}) || null;

         var diseno_Img1 = objRecord.getValue({fieldId: 'custevent82'}) || null;
         //var diseno_Img2 = objRecord.getValue({fieldId: 'custevent83'});
        log.debug('Valor diseño imagen', diseno_Img1);

		 /*if(customForm == "135")
         {*/
           if(diseno_Img1 != null) //  && diseno_Img2 != ""
           {
             if(firmaCli1 == null && firmaMed1 == null)
             {
                var firmaCli1_base64 = objRecord.getValue({fieldId: 'custevent193'}) || null;
                var firmaMed1_base64 = objRecord.getValue({fieldId: 'custevent194'}) || null;
                if(firmaCli1_base64 != null && firmaMed1_base64 != null)
                {
                   var okVal = firmaCli1_base64.substring(0, 7);
                   var okVal2 = firmaMed1_base64.substring(0, 7);
                   if(okVal != "ok_data" && okVal2 != "ok_data")
                   {
                       // crear imagen paciente
                       var pngFirmaCli1_base64 = firmaCli1_base64.replace("data:image/png;base64,", "");
                       var fol = -4;
                       var fileObj = file.create({name: field_casenumber + " Firma cliente Injerto.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaCli1_base64, isOnline: false});
                       var pngFirmaCli1_fileId = fileObj.save();

                       var pngFirmaCli1_fileObjImage = file.load({id:pngFirmaCli1_fileId});
                       var pngFirmaCli1URL = pngFirmaCli1_fileObjImage.url;

                       // crear imagen médico
                       var pngFirmaMed1_base64 = firmaMed1_base64.replace("data:image/png;base64,", "");
                       var fileObj2 = file.create({name: field_casenumber + " Firma Médico Injerto.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaMed1_base64, isOnline: false});
                       var pngFirmaMed1_fileId = fileObj2.save();
                       var pngFirmaMed1_fileObjImage = file.load({id:pngFirmaMed1_fileId});
                       var pngFirmaMed1URL = pngFirmaMed1_fileObjImage.url;

                       objRecord.setValue({fieldId: "custevent86", value: pngFirmaCli1URL});
                       objRecord.setValue({fieldId: "custevent87", value: pngFirmaMed1URL});
                       var firmaCli1_base64_newValBase64 = "ok_" + firmaCli1_base64;
                       var firmaMed1_base64_newValBase64 = "ok_" + firmaMed1_base64;
                       objRecord.setValue({fieldId: "custevent193", value: firmaCli1_base64_newValBase64});
                       objRecord.setValue({fieldId: "custevent194", value: firmaMed1_base64_newValBase64});
                       objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
                   }
                   else
                   {
                     log.debug("Log: ", "Ya se generaron las imagenes de firma (Paciente y Médico)");
                     log.debug("firmaCli1_base64: ", firmaCli1_base64);
                     log.debug("firmaMed1_base64: ", firmaMed1_base64);
                   }
                }
                else
                {
                   context.form.addButton({
                     id: "custpage_firmasfotos",
                     label: "Firmas Fotos",
                     functionName: "onButtonClick2"
                   });
                   context.form.clientScriptModulePath = "SuiteScripts/cs_DiagnosticoFirmas.js";
                }
             }
           }
           else
           {
             var currentForm = context.form;

                  var html = '<script>';
                      html += 'require([\'N/ui/message\'], function (message){';
                          html += 'var onViewMessage = message.create({';
                          html += 'title: \'Firmas Historial Fotográfico \', ';
                          html += 'message: \'El campo DISEÑO IMG1 debe ir lleno &nbsp;&nbsp;&nbsp;&nbsp; - (ubicación: "Historial Fotográfico", sección: "Diseño en Sala") \', ';
                          html += 'type: message.Type.INFORMATION';
                          html += '}); ';
                      html += 'onViewMessage.show(10000);';
                      html += '})';
                  html += '</script>';

                  var field = currentForm.addField({
                      id: "custpage_alertonview_preimg",
                      label: "PRE-IMG",
                      type: serverWidget.FieldType.INLINEHTML,
                  });

              field.defaultValue = html;
           }
         //}
     }
   }
		return {
        beforeLoad: beforeLoad
		};
});
