	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/runtime', 'N/redirect', 'N/log', 'N/ui/serverWidget'], function(record, runtime, redirect, log, serverWidget) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        var userObj = runtime.getCurrentUser();
        log.debug("userObj.role: ", userObj.role);
        if(userObj.role != "3")
        {
          var currentInvId = context.newRecord.id;
          var rec = record.load({type: 'invoice', id: currentInvId, isDynamic: true});
          var subsidiary_Val = rec.getValue({fieldId: 'subsidiary'}); // 6 Mx
          log.debug('subsidiary_Val: ', subsidiary_Val);
          var custbody_cfdi_pdf_Val = rec.getValue({fieldId: 'custbody_cfdi_pdf'});
          log.debug('custbody_cfdi_pdf_Val: ', custbody_cfdi_pdf_Val);
          var custbody_cfdixml_Val = rec.getValue({fieldId: 'custbody_cfdixml'});
          log.debug('custbody_cfdixml_Val: ', custbody_cfdixml_Val);

          if(subsidiary_Val == "6")
          {
            if(custbody_cfdi_pdf_Val != null && custbody_cfdi_pdf_Val != "" && custbody_cfdixml_Val != null && custbody_cfdixml_Val != "")
            {
              var currentForm = context.form;
              var html = '<script type="text/javascript">';
              html += 'var myVar = setInterval(myTimer, 1);'; // 10,000 = 1 segundo
              html += 'function myTimer() {';
              html += '  document.getElementById("edit").style.display = "none";';
              html += '  document.getElementById("tdbody_edit").style.display = "none";';
              html += '  document.getElementById("secondaryedit").style.display = "none";';
              html += '  document.getElementById("tdbody_secondaryedit").style.display = "none";';
              html += '}';
              html += '</script>';
              var field = currentForm.addField({
                  id: "custpage_alertonview_inovice", // Sets an internal ID for the new field
                  label: "PRE-Inovice", // Sets a label to the new field
                  type: serverWidget.FieldType.INLINEHTML, // Sets a type to the new field using enum
              });
              field.defaultValue = html;
            }
          }
        }
     }
     
    if(context.type == "edit")
    {
       var userObj = runtime.getCurrentUser();
       log.debug("userObj: ", userObj);
       var currentInvId = context.newRecord.id;
       if(userObj.role == "1173" && currentInvId != null) // Recepción México = 1173
       {
          var rec = record.load({type: 'invoice', id: currentInvId, isDynamic: true});
          var subsidiary = rec.getValue({fieldId: 'subsidiary'});
          if(subsidiary == "6")
          {
            log.debug("Redirect: ", " to view");
            redirect.toRecord({type : 'invoice', id : currentInvId});
          }
       }
    }
     
   }

    return {
       beforeLoad: beforeLoad
	};
});