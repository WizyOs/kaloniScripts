//Define the User Event function for a beforeLoad operation.

function beforeLoadInvoice(type, form)
{
 var newRecord = nlapiGetNewRecord();
 var ue_procesado = newRecord.getFieldValue('custbody33'); // PROCESADO (FE_CO):
 var ue_FILIAL = newRecord.getFieldText('subsidiary'); // FILIAL tranid

 if (ue_procesado !== "Si" && ue_FILIAL == "Colombia" && type == "view")
 {
    if (nlapiGetContext().getExecutionContext() == "userinterface")
    {
      	nlapiLogExecution('DEBUG', 'UE| Value PROCESADO (FE_CO): ', ue_procesado);
        form.setScript('customscript830');
		    form.addButton('custpage_feCO_button_view11', 'Factura Electronica CO', 'mypageInitfunction()');
    }
 }
}