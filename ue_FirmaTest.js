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
           var field_firmaClienteBase64 = objRecord.getValue({fieldId: 'custevent328'});
           var field_linkFirmaCliente = objRecord.getValue({fieldId: 'custevent327'});

          if(customForm == "14")//F-Atención Cliente - Injerto
        {
          if(field_firmaClienteBase64 == "" && field_linkFirmaCliente == ""){
          context.form.addButton({
              	 id: "custpage_firmastestimonial",
               	 label: "Firma Testimonial",
               	 functionName: "callSuiteletTest"
          	   });
              context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaTest.js";
          }/*else if(field_firmaClienteBase64 != "" && field_linkFirmaCliente != ""){
           context.form.addButton({
              	 id: "custpage_firmastestimonial",
               	 label: "Testimonial",
               	 functionName: "callSuiteletTestPDF"
          	   });
              context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaTest.js";
                   }*/
        }

           if(field_firmaClienteBase64 != "" && field_linkFirmaCliente == "")
    {
        var field_casenumber = context.newRecord.getValue({fieldId: 'casenumber'});
        var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
       log.debug("img_base64:", img_base64);

       var fol = -4;
       var fileObj = file.create({name: field_casenumber + " Firma testimonial.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false});
       var fileId = fileObj.save();

       var fileObjImage = file.load({id:fileId});
       imgURLcliente = fileObjImage.url;

       log.debug('imgURLcliente:', imgURLcliente);
       objRecord.setValue({fieldId: 'custevent327', value: imgURLcliente});
       objRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
    }

       }
     }


   return {
  beforeLoad: beforeLoad
};
});
