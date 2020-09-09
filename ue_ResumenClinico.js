/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/search','N/log','N/format'], function(record,search,log,format) {
	var descriptionCurrentInvoice = [];

    var invoiceId = null;

    function beforeLoad(context)
    {
      if(context.type == "view")
      {
        var currentRec = context.newRecord;
        var currentInvoiceId = context.newRecord.id;
        //var invoice_entityText = currentRec.getText({fieldId: 'entity'});

        context.form.clientScriptFileId = 2563119;
		context.form.addButton({
			id:'custpage_button_resumenclinico',
			label:'Resumen Clínico',
			functionName:'testFunction'
		});

      }
    }

    return {
        beforeLoad: beforeLoad
    };
});
