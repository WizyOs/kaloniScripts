	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record','N/log'], function(record,log) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        //var customFormText = objRecord.getText({fieldId: 'customform'});
        var customFormValue = objRecord.getValue({fieldId: 'customform'});
       log.debug('id record', recordCaseId);
        //log.debug("customFormValue y customFormText: ", customFormValue + " y " + customFormText);

		if(customFormValue == "26" || customFormValue == "14")
        {
          context.form.addButton({id: "custpage_pdfEnfInj", label: "Ver Exp.", functionName: "onButtonClick2"});
          context.form.clientScriptModulePath = "SuiteScripts/cs_pdfDatosGenerales.js";
        }
     }
   }
		return {
        beforeLoad: beforeLoad
		};
});