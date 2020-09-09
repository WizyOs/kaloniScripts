/**
 * Client Function to call Suitelet
 */
function mypageInitfunction1(type, form)
{
  	var id = nlapiGetRecordId();

          nlapiLogExecution('DEBUG', 'CS| Value parameter on client script: ', 'Value CreditMemoCO id: ' + id);
          // Pass Purchase Order Id (paramname = poid)
          window.location = nlapiResolveURL('SUITELET', 'customscript906', 'customdeploy1')+'&paramInCoPDFnc='+id;
          //return true;
}