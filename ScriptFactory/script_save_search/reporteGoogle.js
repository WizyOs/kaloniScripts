function reporteGoogle(){

	    var Filters = new Array();

		var id = '';
		var type = '';
		var author = '';
		var subject = '';
		var medios = '';

		//Filters[0] = new nlobjSearchFilter('author', null, 'anyof', '-5'); // set the internal id  of the author, the criteria can be set according to requirement Please refer to SuiteScript Records Browser to see list of available filters and Columns for the Message Record
		//Filters[1] = new nlobjSearchFilter('messagedate', null, 'on', 'today'); 

		var col = new Array();
		col[0]= new nlobjSearchColumn('medios');
/*		col[1]= new nlobjSearchColumn('messagetype');
		col[2] = new nlobjSearchColumn('author');
		col[3] = new nlobjSearchColumn('subject');*/

		//var rec = nlapiSearchRecord('message',null, Filters, col);
		/*var rec = nlapiSearchRecord('message',null, null, col);

		for ( var i = 0; rec != null && i < rec.length; i++ ) {
			var rec1 = rec[ i ];
			var id = id + rec1.getValue('internalid');  //As required values for other fields such as Author, subject can be captured and sent via email
		}*/

		//var id1 = id.split();

		/* if the emails needs to be attached to any record create a record object
		var records = new Object();
		records['transaction'] = 'xxx';
		*/

		//nlapiSendEmail('603152','kavila@kaloni.com',"Test Script Mail",'searchresults','id1',null,null,records,null);
		nlapiSendEmail('603152','kavila@kaloni.com',null,'searchresults','id1',null,null,col,null);


		var fromId = -5; //Authors' Internal ID
		var sbj = 'Hello World BFO PDF File';
		var msg = 'Hello World Attached BFO PDF';
		var bfoXmlString = '[XML String]';

		var pdfFileObj = nlapiXMLToPDF(bfoXmlString);
		//attach generated PDF 
		nlapiSendEmail(fromId, 'kavila@kaloni.com', sbj, msg, null, null, null, pdfFileObj);


}