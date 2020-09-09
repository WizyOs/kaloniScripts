/**
 * @author AAvila @One System
 * 10/Oct/2012
 * Javascript User Event para Factura Electronica.
 */

var objContext = nlapiGetContext();
var intMaxReg = 1000;
var intMinReg = 0;

function beforeLoad(type,form){
   	var currentContext = nlapiGetContext();
   	var varScriptId = currentContext.getScriptId();

	if ((currentContext.getExecutionContext() == 'userinterface') && (type == 'view') )
	 {	
		//Obtiene Invoice
var v_role =nlapiGetRole();
	if (v_role ==3)
	{

			form.addButton('custpage_formcp','Factura Electronica MX ' , "FormCP()");
			form.setScript('customscript_nscustomercashsale');
	} else	
		{

		var idInvoice = nlapiGetRecordId();		
		nlapiSetFieldValue('custbody_nro_invoice',idInvoice);
        
		
		var filters = new Array();  
		filters[0] = new nlobjSearchFilter('type', null, 'is', ['CashSale'] );
		
		filters[1] = new nlobjSearchFilter('internalid',null,'is',idInvoice);
		filters[2] = new nlobjSearchFilter('status',null,'is','CashSale:C');
		var columns = new Array();
		columns[0] = new nlobjSearchColumn('internalid');
		
		var objResultSet = nlapiCreateSearch( 'transaction', filters, columns).runSearch();	
		var objResult = objResultSet.getResults(intMinReg, intMaxReg);
		var intLength = objResult.length;
		
	    if ( intLength >0 )
		{
		
			var estado = nlapiGetFieldValue('custbody_estado_factelectronica');

			if (estado!='Generado' && estado!='Cancelada') 
			{

			form.addButton('custpage_formcp','Factura Electronica MX ' , "FormCP()");
			form.setScript('customscript_nscustomercashsale');
			}		
		}
				

		
	 }
	 }
	return true;
}


function beforeSubmit(type)
{
	return true;
}

function afterSubmit(type)
{
	return true;
}