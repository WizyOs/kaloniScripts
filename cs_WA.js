/**
 * Client Function to call Suitelet
 */
function sendWhatsApp(type, form, request)
{
	var id = nlapiGetRecordId();
  	var t = nlapiGetRecordType();
  	var rec = nlapiLoadRecord(t, id)
	var title = rec.getFieldValue('title');
    //var vall = nlapiGetFieldValue('title');
 	//nlapiSetFieldValue('custbody17', 'valorN'); // custbody45
	nlapiLogExecution('DEBUG', 'CS| Value id y title: ', id + ' - ' + title);
  	alert("CS| Value id y title: " + id + ' - ' + title);
	//Pass Purchase Order Id (paramname = poid)
	//window.location = nlapiResolveURL('SUITELET', 'customscript821', 'customdeploy1')+'&poid='+id;
	return true;
}