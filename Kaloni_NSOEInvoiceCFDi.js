//===================================================================================================================================
// Company        : NetSoft, www.netsoft.com.mx
// Name of Script : NSOEInvoiceCFD.js
// Author         : Ivan Gonzalez - Netsoft - M�xico
// Date			  : 26-06-2012
// Base			  : McGeever
// Type           : SuiteLet
// Sub-Type       : Business Process
// Categories     : Business logic
// Description    : Return text with layout to an invoice/memo-credit
// NetSuite Ver.  : (Edition: International) Release 2010
// Installation   :   SuiteLet                  Method                ScriptId           DeploymentId
//                    ------------------------- -----------------     ------------------ ----------------
//		              CFDi		   				nsoEInvoiceCFD        
//
// Parameters     :   Name             Description                            Type      Value(s)
//                    ---------------- -------------------------------------- --------- -----------
//                    invoiceid        Internalid of invoice or memocredit    integer   
//
// Dependences     : File Name
//                   --------------------
//                   NSOUtils.js
//                   ObjEInvoiceCFDi.js
//                   NSOCountriesStates.js
//===================================================================================================================================

function nsoEInvoiceCFD(request, response)
{
	var invoiceid = request.getParameter('invoiceid');
	var splitter = request.getParameter('splitter');
	var newline = request.getParameter('newline');
	var setupid = nlGetSetupEInvoiceId(invoiceid);
	var objEInvoice = new NSObjEInvoiceCFDi();
	var text = objEInvoice.build(invoiceid, splitter, newline, setupid);
	response.write(text);	
}

function nlGetSetupEInvoiceId(id)
{
	var retval = null;
	var record = nsoGetTranRecord(id);
	var location   = record.getFieldValue("location");
	var subsidiary = record.getFieldValue("subsidiary");
	var filters = new Array();
	var index = 0;
	if(subsidiary != null && subsidiary != "") {
		filters[index]  = new nlobjSearchFilter("custrecord_cfdi_subsidiary", null, "anyof", subsidiary);
		index += 1;
	}
	
	if(location != null && location != "") {
		filters[index]  = new nlobjSearchFilter("custrecord_cfdi_location", null, "anyof", location);
		index += 1;
	}
		
	var results = nlapiSearchRecord("customrecord_cfdisetup", null, filters, null);	
	
	if(results != null && results.length > 0)
	{
		retval = results[0].getId();
	}
	else
	{
		var msg = "No se encontr" + String.fromCharCode(243) 
		        + " el registro de configuraci" + String.fromCharCode(243) 
				+ "n de la factura electr" + String.fromCharCode(243) + "nica para la ubicaci" + String.fromCharCode(243) + "n '" + subsidiary_disp + "'";
		throw nlapiCreateError("ERROR", msg, false);
	}
	
	return retval;
}

