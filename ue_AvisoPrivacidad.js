	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/file'], function(record, file) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        var customForm = objRecord.getValue({fieldId: 'customform'});
       	var casenumber = objRecord.getValue({fieldId: 'casenumber'});
        var avisoPrivacidadBase64 = objRecord.getValue({fieldId: 'custevent319'});
        var avisoPrivacidadURL = objRecord.getValue({fieldId: 'custevent312'});
        //log.debug("customForm: ", customForm);

		if(customForm == "134") // Hist Clinica = 134
        {
          if(avisoPrivacidadURL == "" || avisoPrivacidadURL == null)
          {
			 if(avisoPrivacidadBase64 != "" && avisoPrivacidadBase64 != null)
             {
               	 var okVal = avisoPrivacidadBase64.substring(0, 7);
               	 //log.debug("okVal: ", okVal);
               	 if(okVal != "ok_data")
                 {
                     var img_base64 = avisoPrivacidadBase64.replace("data:image/png;base64,", "");
                     var fol = -4;
                     var fileObj = file.create({name: casenumber + "_Aviso de Privacidad_Firma paciente.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false});
                     var fileId = fileObj.save();

                     var fileObjImage = file.load({id:fileId});
                     var firmaURLcliente = fileObjImage.url;

                     objRecord.setValue({fieldId: "custevent312", value: firmaURLcliente});
                   	 var newValBase64 = "ok_" + avisoPrivacidadBase64;
                   	 objRecord.setValue({fieldId: "custevent319", value: newValBase64});
                     objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
                 }
				 else
                 {
                   log.debug("avisoPrivacidadBase64: ", avisoPrivacidadBase64);
                 }
             }
             else
             {
               context.form.addButton({
                  id: "custpage_avisoprivacidad",
                  label: "Aviso De Privacidad",
                  functionName: "onButtonClick"
               });
               context.form.clientScriptModulePath = "SuiteScripts/cs_AvisoPrivacidad.js";
             }
          }
        }

     }
  }
		return {
        beforeLoad: beforeLoad
		};
});