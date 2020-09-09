//=================================================================================================================================
// Script File   : nso_klm_s_copy_entity.js
// Script Type   : Suitelet
// Description   : 
// Author        : David Vargas - Netsoft
// Date			 : 

//=================================================================================================================================
var subsidiary_destino = '6';


function click_copyentity()
{
	var w_id            = request.getParameter('idinvoice');
	var xtype           = request.getParameter('wtype');
	var customer        = nlapiLoadRecord('customer',w_id);
	var clienteanterior	= w_id;
	var entity          = customer.getFieldText('entity');
	var record_customer1 = '';
	
	var email          = customer.getFieldValue('email');
	var valida         = cargabusqueda(email);
	if (valida == null || valida == ''){
		var record_customer1 = nlapiCopyRecord(xtype,w_id);
		record_customer1.setFieldValue('subsidiary', subsidiary_destino);
		record_customer1.setFieldValue('custentity_previous_number',clienteanterior);
		record_customer1 = nlapiSubmitRecord(record_customer1, true, true);  
	}

	nlapiLogExecution('DEBUG','ID', record_customer1);
	customer.setFieldValue('custentity_previous_number',record_customer1);
	nlapiSubmitRecord(customer, true);
	
	nlapiSetRedirectURL('RECORD','customer', w_id, null, null);
	return record_customer1
}


function nsoGetEntityRecord(id)
{
	var itemrecord = null;

	var searchresults = nlapiSearchRecord('entity', null, new nlobjSearchFilter('internalid', null, 'is', id));
	
	if (searchresults != null && searchresults.length > 0)
	{
		itemrecord = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId());
	}
	
	return itemrecord;
}


function cargabusqueda (email2){
	var filters = new Array();
	//var cols = new Array();
	filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof',subsidiary_destino));
	filters.push(new nlobjSearchFilter('email', null, 'is',email2));
	var resultbusqueda = nlapiSearchRecord("customer", null, filters, null);
	return resultbusqueda;
}
