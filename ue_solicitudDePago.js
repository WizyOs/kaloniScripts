	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/log'], function(record, log) {

   function beforeLoad(context) {
     if(context.type == "view")
     {
        var record_PO = context.newRecord.id;
        var objRecord = record.load({type: 'purchaseorder', id: record_PO, isDynamic: false});
        var subsidiary = objRecord.getValue({fieldId: 'subsidiary'});
        log.debug("subsidiary: ", subsidiary);
        var approvalstatus = objRecord.getValue({fieldId: 'approvalstatus'});
        log.debug("approvalstatus: ", approvalstatus);

		if(subsidiary == "6" && approvalstatus == "2") // approvalstatus - Pending Approval = 1 - Approved = 2
        {
          context.form.addButton({id: "custpage_solicitud_pago", label: "Solicitud de Pago", functionName: "onButtonClick"});
          context.form.clientScriptModulePath = "SuiteScripts/cs_solicitudDePago.js";
        }
     }
  }
		return {
        beforeLoad: beforeLoad
		};
});