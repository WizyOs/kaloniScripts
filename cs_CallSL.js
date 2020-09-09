/**
 * Client Function to call Suitelet
 */
function callSuitelet()
{
	var id = nlapiGetRecordId();
  	nlapiLogExecution('DEBUG', 'CS| Value id on client script: ', 'value id: ' + id);
	//Pass Purchase Order Id (paramname = poid)
	window.location = nlapiResolveURL('SUITELET', 'customscript821', 'customdeploy1')+'&poid='+id;
	return true;
}