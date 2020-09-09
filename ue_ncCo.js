//Define the User Event function for a beforeLoad operation.

function beforeLoadNC(type, form)
{
    var newRecord = nlapiGetNewRecord();
    var ue_procesado = newRecord.getFieldValue('custbody47'); // PROCESADO (NC_CO):
    var ue_FILIAL = newRecord.getFieldText('subsidiary'); // SUBSIDIARY

    if (ue_procesado !== "Si" && ue_FILIAL == "Colombia" && type == "view") 
    {
        if (nlapiGetContext().getExecutionContext() == "userinterface") 
        {
            nlapiLogExecution('DEBUG', 'UE| Value PROCESADO (NC_CO): ', ue_procesado);
            form.setScript('customscript876');
            form.addButton('custpage_ncCO_button_view11', 'Nota de Credito Electronica CO', 'mypageInitfunction()');
        }
    }
}