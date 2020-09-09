//Define the User Event function for a beforeLoad operation.
function beforeLoadEmployee(type, form)
{
 var newRecord = nlapiGetNewRecord();
 //var folderStatus = newRecord.getFieldValue('custentity335');

 if (type == 'view') // && folderStatus !== 'ok'
 {
    if (nlapiGetContext().getExecutionContext() == 'userinterface') {
      	//nlapiLogExecution('DEBUG', 'Value folderStatus: ', folderStatus);
        form.setScript('customscript820'); // id of client script
		form.addButton('custpage_crearExp_button_view', 'Generar Exp.', 'callSuitelet()');
    }
 }

}