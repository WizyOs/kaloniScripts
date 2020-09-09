var intMaxReg = 1000;
var intMinReg = 0;
var bolStop = false;
var intTotalRows = 0;
var intLoops = 1;
var objContext = nlapiGetContext();

function scheduled_main()
{
	var filters = new Array();  
		filters[0] = new nlobjSearchFilter('type', null, 'anyof', ['CustInvc'] );
		filters[1] = new nlobjSearchFilter('mainline', null, 'is', 'T'); 	
		filters[2] = new nlobjSearchFilter('custbody_estado_factelectronica', null, 'is','Enviado a cancelar'); 
		
	var columns = new Array();
		columns[0] = new nlobjSearchColumn('internalid');

	var objResultSet = nlapiCreateSearch( 'transaction', filters, columns).runSearch();
	
		while(!bolStop && objContext.getRemainingUsage() > 100 ) {
			var objResult = objResultSet.getResults(intMinReg, intMaxReg);
		    var intLength = objResult.length;		
			for(var i = 0; i < intLength; i++) {
				abc(objResult[i]);
				nrolinealst +=1;			
			}		    
		    intTotalRows += intLength;
		    intMinReg = intMaxReg;
		    intMaxReg += 1000;
		    if(intLength < 1000) {
		        bolStop = true;
		    }
		    intLoops++; 
		}

		
	
}


function abc(eachResult)
{
	var columns = eachResult.getAllColumns();
	var internalid = eachResult.getValue('internalid');	
	
	   nlapiSubmitField('invoice', internalid , ['voided', 'memo'],['T', 'VOID'], true);
    
    return true;
	
}