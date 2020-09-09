function suitelet(request, response)
{
  	nlapiLogExecution('AUDIT', 'SL| Value llego request: ', 'ok');
	/*if (request.getMethod() == "GET")
	{*/
	    //var id = request.getParameter(’employeeid’); //Employee Id passed from Client Script
	    //var result = nlapiLookupField(’employee’,id,’custentityField’);

	    var newFile = nlapiCreateFile('file.pdf', 'PDF', 'Respuesta SOAP con Error!!');
	    newFile.setFolder('1133040'); // STO_DO
	    //newFile.setEncoding('UTF-8');
	    var fileId = nlapiSubmitFile(newFile);
      	nlapiLogExecution('AUDIT', 'SL| Value fileId: ', fileId);
      	return fileId;
	    /*if(fileId !== null) // result
	    {
	       response.write(fileId); // result
	    }*/
 	//}
}