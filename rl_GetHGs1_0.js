function getHGs(request)
{
    //if(request.getMethod() == 'POST')
    //{
    if(request != null && request != "")
    {
        var response = null;
        //nlapiLogExecution("Debug", "request: ", request);
        //var jsonString = JSON.stringify(request);
        var obj = JSON.parse(request);
        var hg = obj.param1;
       // nlapiLogExecution('DEBUG', 'hg:  ', hg);

        if(hg != null && hg != "")
        {
            var filters = new Array();
            var columns = new Array();
            filters[0] = new nlobjSearchFilter("custbody_historial_medico", null, "is", hg);
            columns[0] = new nlobjSearchColumn('entity', null, null);
            /*columns[1] = new nlobjSearchColumn('internalid', null, null);
           columns[2] = new nlobjSearchColumn('tranid', null, null);*/
            columns[1] = new nlobjSearchColumn('internalid', null, null);
            var results = nlapiSearchRecord('invoice', null, filters, columns);

            if(results != null)
            {
                var resultString = '';
                for (var i = 0; i < results.length ; i++)
                {
                    var result = results[i];
                    resultString = resultString + result.getValue('internalid');
                    // nlapiLogExecution("Debug", "result.getValue('id'): ", result.getValue('internalid'));
                        if(i != parseInt(results.length - 1))
                            {
                            resultString = resultString + '|' ;
                            var cod1 = resultString.split('|');
                            var idC = cod1[0];
                            var salesRepRec = nlapiLoadRecord("invoice", idC);
                            var itemCount = salesRepRec.getLineItemCount("item");

                        	}
                  			var resultString2 = '';
                   			for (var i = 1; i <= itemCount; i++)
                                 {
                                  salesRepRec.selectLineItem("item", i);
                                  var currentDescription = salesRepRec.getCurrentLineItemValue("item", "description");
                                  nlapiLogExecution('DEBUG', 'itemCount', currentDescription);
                                  resultString2 += '-' + currentDescription;
                                  response = resultString2;
                           		}
                        }
                 //nlapiLogExecution('DEBUG', 'salesRepRec', itemCount);
                    }
                }
           // response = resultString2;
            }
            else
            {
                response = 'none found';
            }
    return response;
}
