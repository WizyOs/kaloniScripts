function getLead_Id(request, response){
	if(request.getMethod() == 'POST')
	{
        var hgToFind = 'empty';
		hgToFind = request.getParameter("hgToFind");
		nlapiLogExecution("Debug", "hgToFind: ", hgToFind);

	    var filters = new Array();
	    var columns = new Array();
	    filters[0] = new nlobjSearchFilter("custbody_historial_medico", null, "is", hgToFind);
	    columns[0] = new nlobjSearchColumn('entity', null, null);
	    var results = nlapiSearchRecord('invoice', null, filters, columns);

	    if(results != null)
	    {
	        var resultString = '';
	        for (var i = 0; i < results.length ; i++)
	        {
	          var result = results[i];
	          resultString = resultString + result.getText('entity');

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