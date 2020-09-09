/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/ui/dialog'],

function(dialog) {
	
	function pageInit(context) {
        
    }
	
	function muestraDatos(paramTest) {
        
      	var datos = paramTest             
      
		var options = {
	            title: "Muestra Datos",
	            message: datos           //Display the value using an alert dialog
	         };
			 
		dialog.alert(options)
    }
   
    return {
    	pageInit: pageInit,
    	muestraDatos: muestraDatos
    };
    
});