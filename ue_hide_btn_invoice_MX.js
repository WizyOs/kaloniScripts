	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
define(['N/record', 'N/log', 'N/ui/serverWidget'], function(record, log, serverWidget) {

   function beforeLoad(context)
   {
     if(context.type == "view") // create
     {
        var record_invoice = context.newRecord.id;
    	var objRecord = record.load({type: 'invoice', id: record_invoice, isDynamic: true});
        var subsidiary = objRecord.getValue({fieldId: 'subsidiary'});

        if(subsidiary != "6" && subsidiary != "19")
        {
			var currentForm = context.form;
            var html = '<script type="text/javascript">';
            html += 'var myVar = setInterval(myTimer, 1);'; // 10,000 = 1 segundo
            html += 'function myTimer() {';
            //html += '  document.getElementById("tbl_print").style.display = "none";';
            html += '  jQuery("#tdbody_custpage_formcp, #tdbody_secondarycustpage_formcp").hide();';
            html += '}';
            html += '</script>';
            var field = currentForm.addField({id: "custpage_hide_button_femx", label: "Hide-Button-femx", type: serverWidget.FieldType.INLINEHTML});
            field.defaultValue = html;
        }
     }
   }
   return {
      beforeLoad: beforeLoad
   };
});
