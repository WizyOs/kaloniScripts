/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/ui/dialog', 'N/record'],

function(dialog, record) {
	
	function pageInit(context) {
		var recordId = context.Record.id;
		
		dialog.alert(recordId);
		log.debug(recordId);
    }
	
	function showPassedValueFunc(paramTest) {
        
      	var clientVar = paramTest             
      
		var options = {
	            title: "Passed Value",
	            message: clientVar           //Display the value using an alert dialog
	         };
			 
		dialog.alert(options)
    }
   
    return {
    	pageInit: pageInit,
    };
    
});