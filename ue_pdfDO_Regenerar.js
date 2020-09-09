//Define the User Event function for a beforeLoad operation.
function beforeLoadRegenerarInvoiceStoDo(type, form)
{
 var newRecord = nlapiGetNewRecord();
 var tranidField = newRecord.getFieldValue('tranid');
 var locationVal = newRecord.getFieldText('location');
 var tipoFactHidden = newRecord.getFieldValue('custbody66');
 var tipoFact = newRecord.getFieldText('custbody65');
  
 form.setScript('customscript889');
 form.addButton('custpage_pdfStoDo_button_view', 'Regenerar Fac STO DO', 'callSuiteletRegenerar()');
}