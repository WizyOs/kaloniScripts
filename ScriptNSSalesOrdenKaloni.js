/**
 * @author WCARPIO @One System
 * Javascript para Orden de Venta (Sales Order)
 * Kaloni
 * Sep '12
 */
function changefield(type,lblname){
	alert(type);
	alert(lblname);
}

// Suma columnas del Conteo unidades foliculares

function onload(){
	var nroOrden = nlapiGetFieldValue('tranid');
	var cliente = nlapiGetFieldValue('entity');
	alert(nroOrden + ' / ' + cliente); 
	/*var filters = new Array();
	filters[0] = new nlobjSearchFilter('entity',null,'is',cliente);
	filters[1] = new nlobjSearchFilter('mainline',null,'is','T');
	var searchresults = nlapiSearchRecord('salesorder',null,filters,null,new nlobjSearchColumn('internalid'));
	var valuesId = new Array();
	for(var i = 0; searchresults != null && i < searchresults.length; i++){
		valuesId[i] = searchresults[i].getId();
	}
	var values = new Array() // define a new Array and set customers
	values[0] ='80';  // 80 references the internal ID of first customer, Abe Simpson
	values[1] = '81';  // 81 references the internal ID of the second customer, Abe Lincoln
	alert('1'); 
	// set values for the multiselect field called Customers Multiselect Field
	nlapiSetFieldValues('custevent_pedido_venta_caso', values,true,true); 
	alert('2');*/
}