/**
 * Client Function to call Suitelet
 */
function mypageInitfunction1(type, form)
{
  	var id = nlapiGetRecordId();
  	var t = nlapiGetRecordType();
  	//var rec = nlapiLoadRecord(t, id)
	//var title = rec.getFieldValue('custbody44');

          nlapiLogExecution('DEBUG', 'CS| Value parameter on client script: ', 'Value InvoiceCO id: ' + id);
          // Pass Purchase Order Id (paramname = poid)
          window.location = nlapiResolveURL('SUITELET', 'customscript903', 'customdeploy1')+'&paramInCoPDF='+id;
          //return true;
}