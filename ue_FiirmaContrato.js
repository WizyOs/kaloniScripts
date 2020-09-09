/**
  * @NApiVersion 2.x
  * @NScriptType UserEventScript
  * @NModuleScope Public
  */

   define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/redirect'], function(record, file, serverWidget, redirect) {
		var imgURLcliente = null;
       function beforeLoad(context) {
         if (context.type == 'view'){
           var recordCaseId = context.newRecord.id;
           var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true});
		   var customForm = objRecord.getValue({fieldId: 'customform'});
           var field_firmaClienteBase64 = objRecord.getValue({fieldId: 'custevent340'});
           var field_linkFirmaCliente = objRecord.getValue({fieldId: 'custevent339'});

        if(customForm == "134")//Historia Clínica
        {
          if(field_firmaClienteBase64 == "" && field_linkFirmaCliente == ""){
         	 context.form.addButton({
              	 id: "custpage_firmacontrato",
               	 label: "Firma C. Servicios",
               	 functionName: "callSuiteletCon"
          	   });
              context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaContrato.js";
          }/*else if(field_firmaClienteBase64 != "" && field_linkFirmaCliente != ""){
           	  context.form.addButton({
              	 id: "custpage_firmacontrato",
               	 label: "Contrato Serv.",
               	 functionName: "callSuiteletConPDF"
          	   });
              context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaContrato.js";
          }*/
        }

        if(field_firmaClienteBase64 != "" && field_linkFirmaCliente == "")
        {
           var field_casenumber = context.newRecord.getValue({fieldId: 'casenumber'});
           var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
           log.debug("img_base64:", img_base64);

           var fol = -4;
           var fileObj = file.create({name: field_casenumber + " Firma contrato.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false});
           var fileId = fileObj.save();

           var fileObjImage = file.load({id:fileId});
           imgURLcliente = fileObjImage.url;

           log.debug('imgURLcliente:', imgURLcliente);
           objRecord.setValue({fieldId: 'custevent339', value: imgURLcliente});
           objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
        }

       }
     }

    return {
      beforeLoad: beforeLoad
    };
});
