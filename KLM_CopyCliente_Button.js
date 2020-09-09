//=================================================================================================================================
// Script File   : KLM_CopyCliente_Button.js
// Script Type   : User Event
// Description   : 
// Author        : David Vargas - Netsoft
// Date			 : 

//=================================================================================================================================

var subsidiary_destino = '6';

//--> Before-Load Event
function nsoAddButtonCopyCustomer(type, form, request)
{
	if(type == 'view'){ 
		try{
			var wid   = nlapiGetRecordId();					
			var xtype = nlapiGetRecordType();
			var customer = nlapiLoadRecord(xtype,wid);
			var email = customer.getFieldValue('email');
			var subsidia = customer.getFieldValue('subsidiary');
			var	valida = cargabusqueda(email,subsidia); 
			if(valida == null || valida == ''){
				var script = "window.location = '" + nlapiResolveURL('SUITELET', 'customscript_klm_s_copy_entity', 'customdeploy_klm_s_copy_entity')+ "&idinvoice=" + wid +  "&wtype=" + xtype+ "';";
				form.addButton("custpage_copyentity", "Copiar Cliente", script);
			}
		}
		catch(e){
			alert(e.description);
			return;
		}
	}
}


function cargabusqueda (email2,subsidia){
	var filters = new Array();
	//var cols = new Array();
	var resultbusqueda = '';
	if(subsidia == 1 || subsidia == 2){
		filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof',subsidiary_destino));
		filters.push(new nlobjSearchFilter('email', null, 'is',email2));
		resultbusqueda = nlapiSearchRecord("entity", null, filters, null);
		return resultbusqueda;
	}
	else{
		return 1;
	}
	
}
