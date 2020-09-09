/**
  * @NApiVersion 2.x
  * @NScriptType UserEventScript
  * @NModuleScope Public
  */

   define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/redirect'], function(record, file, serverWidget, redirect) {
       function beforeLoad(context) {
         if (context.type == 'view'){
           var rec = context.newRecord;
           var recType = rec.type;
           log.debug('recType',recType);
           var recordCaseId = context.newRecord.id;
           var objRecord = record.load({type: recType, id: recordCaseId, isDynamic: true});

          context.form.addButton({
              	 id: "custpage_comprobante",
               	 label: "Solicitud",
               	 functionName: "callSuiteletComp"
          	   });
              context.form.clientScriptModulePath = "SuiteScripts/cs_comprobante.js";
       }
     }
   return {
  beforeLoad: beforeLoad
};
});
