	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
define(['N/record', 'N/file', 'N/log', 'N/ui/serverWidget'], function(record, file, log, serverWidget) {

   function beforeLoad(context)
   {
     if(context.type == "view") // create
     {
        var inventory_transfer = context.newRecord.id;
    	var objRecord = record.load({type: 'inventorytransfer', id: inventory_transfer, isDynamic: true});
        var subsidiary = objRecord.getValue({fieldId: 'subsidiary'}); // subsidiary

        if(subsidiary == "6")
        {
			var currentForm = context.form;
            var html = '<script type="text/javascript">';
            html += 'var myVar = setInterval(myTimer, 1);'; // 10,000 = 1 segundo
            html += 'function myTimer() {';
            //html += '  document.getElementById("tbl_custpage_btnprint").style.display = "none";';
            html += '  jQuery("#tdbody_custpage_btnprint, #tdbody_secondarycustpage_btnprint").hide();';
            html += '}';
            html += '</script>';
            var field = currentForm.addField({id: "custpage_hide_button_print", label: "Hide-Button-Print", type: serverWidget.FieldType.INLINEHTML});
            field.defaultValue = html;

            context.form.addButton({id: "custpage_inventory_transfer", label: "Print", functionName: "onButtonClick_inventory_transfer"});
            context.form.clientScriptModulePath = "SuiteScripts/cs_Print_Inventory_Transfer.js";
        }
        /*else
        {
           log.debug("Log: ", "Ya se generó el PDF de la Estimación");
           log.debug("id:_pdf_Base64: ", generated_pdf_data);
        }*/
     }
     
     /*if(context.type == "edit")
     {
		var record_creditMemo = context.newRecord.id;
    	var objRecord = record.load({type: 'creditmemo', id: record_creditMemo, isDynamic: true});
        var ncf = objRecord.getText({fieldId: 'custbody156'}); // NCF:
        var pdf_nc = objRecord.getValue({fieldId: 'custbody159'}); // PDF NC (STO DO):
        var pdf_nc_encrypted = objRecord.getValue({fieldId: 'custbody161'}); // PDF NC ENCRYPTED (STO DO):

        if((ncf != "" && ncf != null) && (pdf_nc != "" && pdf_nc != null) && pdf_nc.indexOf(".pdf") > 0 && (pdf_nc_encrypted != "" && pdf_nc_encrypted != null))
        {
		   context.form.getField('custbody157').updateDisplayType({displayType:'disabled'});
           context.form.getField('custbody158').updateDisplayType({displayType:'disabled'});
           context.form.getField('custbody160').updateDisplayType({displayType:'disabled'});
           context.form.getField('custbody159').updateDisplayType({displayType:'disabled'});
        }
     }*/
     
   }
   return {
      beforeLoad: beforeLoad
   };
});
