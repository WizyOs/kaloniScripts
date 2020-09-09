function getLead_Id(request, response){
	if(request.getMethod() == 'GET')
	{

      	var emailToFind = 'empty';
		emailToFind = request.getParameter("emailToFind");
		nlapiLogExecution("Debug", "emailToFind: ", emailToFind);

	    var filters = new Array();
	    var columns = new Array();
	    filters[0] = new nlobjSearchFilter("email", null, "is", "aig_15_krazy@hotmail.com");
	    columns[0] = new nlobjSearchColumn('internalId', null, null);
	    var results = nlapiSearchRecord('lead', null, filters, columns);

	    if(results != null)
	    {
	        var resultString = '';
	        for (var i = 0; i < results.length ; i++)
	        {
	          var result = results[i];
	          resultString = resultString + result.getValue('internalId');

	          if(i != parseInt(results.length - 1))
	          {
	            resultString = resultString + '|' ;
	          }
	          nlapiLogExecution('DEBUG', 'resultString', resultString);
	        }
	        response.write(resultString);
	    }
	    else
	    {
	      response.write('none found' );
	    }
	}
}