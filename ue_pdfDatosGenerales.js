	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record'], function(record) {

   function beforeLoad(context) {
     if(context.type == "view")
     {
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        //var customForm = objRecord.getText({fieldId: 'customform'});
        var customForm = objRecord.getValue({fieldId: 'customform'});
        //log.error("customForm: ", customForm);

		if(customForm == "134") // Hist Clinica ó F-Historia Clinica = 134
        {
          context.form.addButton({id: "custpage_generaldata", label: "Ver Exp.", functionName: "onButtonClick"});
          context.form.clientScriptModulePath = "SuiteScripts/cs_pdfDatosGenerales.js";
        }
     }
  }
		return {
        beforeLoad: beforeLoad
		};
});