/**
 * @author AAVILA @One System
 * Javascript para formulario Foliculos (Bill Credit)
 * Kaloni
 * Sep '12
 */
function changefield(type,lblname){
	alert(type);
	alert(lblname);
}

// Suma columnas del Conteo unidades foliculares
function fgetFielName(type,lblname) {
	if (type=='recmachcustrecord_nro_cf') {
		
		// Inicializa variables
		var hrss = 0; 
		var hrsO = nlapiGetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_nro_cuf');
		var hrs1 = nlapiGetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_una_hora');
		var hrs2 = nlapiGetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_dos_horas');
		var hrs3 = nlapiGetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_tres_horas');
		var hrs4 = nlapiGetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_cuatro_horas');
		var hrs5 = nlapiGetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_cinco_horas');

		// Suma columnas
		if (hrs1!='' && hrs1!=null){
			hrss = parseInt(hrss) + parseInt(hrs1);
		}
		if (hrs2!='' && hrs2!=null){
			hrss = parseInt(hrss) + parseInt(hrs2);
		}
		if (hrs3!='' && hrs3!=null){
			hrss = parseInt(hrss) + parseInt(hrs3);
		}
		if (hrs4!='' && hrs4!=null){
			hrss = parseInt(hrss) + parseInt(hrs4);
		}
		if (hrs5!='' && hrs5!=null){
			hrss = parseInt(hrss) + parseInt(hrs5);
		}
	
		// Asigna sumatoria a columna sub total
		nlapiSetCurrentLineItemValue('recmachcustrecord_nro_cf','custrecord_cf_sub_total', hrss*hrsO);
	}	
	
	// Suma columnas de Control de Corte
	if (type=='recmachcustrecord_control_corte') {
		var hrss = 0;
		var hrs1 = nlapiGetCurrentLineItemValue('recmachcustrecord_control_corte','custrecord_hora1_cc');
		var hrs2 = nlapiGetCurrentLineItemValue('recmachcustrecord_control_corte','custrecord_hora2_cc');
		var hrs3 = nlapiGetCurrentLineItemValue('recmachcustrecord_control_corte','custrecord_hora3_cc');
		var hrs4 = nlapiGetCurrentLineItemValue('recmachcustrecord_control_corte','custrecord_hora4_cc');
		var hrs5 = nlapiGetCurrentLineItemValue('recmachcustrecord_control_corte','custrecord_hora5_cc');
	
		// Suma columnas
		if (hrs1!='' && hrs1!=null){
			hrss = parseInt(hrss) + parseInt(hrs1);
		}
		if (hrs2!='' && hrs2!=null){
			hrss = parseInt(hrss) + parseInt(hrs2);
		}
		if (hrs3!='' && hrs3!=null){
			hrss = parseInt(hrss) + parseInt(hrs3);
		}
		if (hrs4!='' && hrs4!=null){
			hrss = parseInt(hrss) + parseInt(hrs4);
		}
		if (hrs5!='' && hrs5!=null){
			hrss = parseInt(hrss) + parseInt(hrs5);
		}

		// Asigna sumatoria a columna sub total
		nlapiSetCurrentLineItemValue('recmachcustrecord_control_corte','custrecord_subtotal_cc', hrss);
	}

	// Sale de la funcion
	return true;
}

function onloadKHREnfermeras(){
	nlapiSetFieldValue('category','2');
	nlapiDisableField('category',true);
}
// Suma subtotales
function saveRecord() {

	// Total
	var hrtt = 0;
	
	// Suma todo el Conteo foliculos
	var rows = nlapiGetLineItemCount('recmachcustrecord_nro_cfs');

	// Suma todo el Conteo foliculos
	var hrss = 0; 
	if (rows!=0) {	

		// Barre las columnas 
		for (var ind=1; ind<=rows;ind++) {
			
			var hrs1 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs','custrecord_una_hora_cf', ind);
			var hrs2 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs','custrecord_dos_horas_cf', ind);
			var hrs3 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs','custrecord_tres_horas_cf', ind);
			var hrs4 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs','custrecord_cuatro_horas_cf', ind);
			var hrs5 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs','custrecord_cinco_horas_cf', ind);
	
			// Suma columnas
			if (hrs1!='' && hrs1!=null){
				hrss = parseInt(hrss) + parseInt(hrs1);
			}
			if (hrs2!='' && hrs2!=null){
				hrss = parseInt(hrss) + parseInt(hrs2);
			}
			if (hrs3!='' && hrs3!=null){
				hrss = parseInt(hrss) + parseInt(hrs3);
			}
			if (hrs4!='' && hrs4!=null){
				hrss = parseInt(hrss) + parseInt(hrs4);
			}
			if (hrs5!='' && hrs5!=null){
				hrss = parseInt(hrss) + parseInt(hrs5);
			}
		}

		// Total Foliculos 
		nlapiSetFieldValue('custevent_ns_cf_total',hrss);
		hrtt = parseInt(hrtt) + parseInt(hrss);
	} else {
		// Total Foliculos 
		nlapiSetFieldValue('custevent_ns_cf_total',0);
	}

	// Suma todo el Conteo foliculos No Viables
	var rows = nlapiGetLineItemCount('recmachcustrecord_nro_cfs_nv');

	// Suma todo el Conteo foliculos No Viables
	var hrss = 0; 
	if (rows!=0) {	

		// Barre las columnas 
		for (var ind=1; ind<=rows;ind++) {
			
			var hrs1 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs_nv','custrecord_una_hora_cf_nv', ind);
			var hrs2 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs_nv','custrecord_dos_horas_cf_nv', ind);
			var hrs3 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs_nv','custrecord_tres_horas_cf_nv', ind);
			var hrs4 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs_nv','custrecord_cuatro_horas_cf_nv', ind);
			var hrs5 = nlapiGetLineItemValue('recmachcustrecord_nro_cfs_nv','custrecord_cinco_horas_cf_nv', ind);
		
			// Suma columnas
			if (hrs1!='' && hrs1!=null){
				hrss = parseInt(hrss) + parseInt(hrs1);
			}
			if (hrs2!='' && hrs2!=null){
				hrss = parseInt(hrss) + parseInt(hrs2);
			}
			if (hrs3!='' && hrs3!=null){
				hrss = parseInt(hrss) + parseInt(hrs3);
			}
			if (hrs4!='' && hrs4!=null){
				hrss = parseInt(hrss) + parseInt(hrs4);
			}
			if (hrs5!='' && hrs5!=null){
				hrss = parseInt(hrss) + parseInt(hrs5);
			}
		}

		// Total Foliculos 
		nlapiSetFieldValue('custevent_ns_cf_total_nv',hrss);					
		hrtt = parseInt(hrtt) + parseInt(hrss);
	} else {
		// Total Foliculos 
		nlapiSetFieldValue('custevent_ns_cf_total_nv',0);					
	}
	
	// Total General 
	nlapiSetFieldValue('custevent_ns_cf_total_tt',hrtt);					
	
	// Suma columnas de Conteo unidades foliculares   
	var rows = nlapiGetLineItemCount('recmachcustrecord_nro_cf');

	var subtot = 0; 
	if (rows!=0) {
		
		// Barre la columna subtotal
		for (var ind=1; ind<=rows;ind++) {

			var subaux = nlapiGetLineItemValue('recmachcustrecord_nro_cf','custrecord_cf_sub_total', ind);

			// Valida que el subtotal no este vacio
			if (subaux!='' && subaux!=null) {
				subtot = parseInt(subtot) + parseInt(subaux);
			} // Valida que el subtotal no este vacio

		} // Barre la columna subtotal

		// Total Unidades Foliculares 
		nlapiSetFieldValue('custevent_ns_cuf_total',subtot);
	} else {
		// Total Unidades Foliculares 
		nlapiSetFieldValue('custevent_ns_cuf_total',0);
	}

	
	// Suma columnas de Control de Corte
	var rows = nlapiGetLineItemCount('recmachcustrecord_nro_cf');

	var subtot = 0; 
	if (rows!=0) {
		
		// Barre la columna subtotal
		for (var ind=1; ind<=rows;ind++) {

			var subaux = nlapiGetLineItemValue('recmachcustrecord_control_corte','custrecord_subtotal_cc', ind);

			// Valida que el subtotal no este vacio
			if (subaux!='' && subaux!=null) {
				subtot = parseInt(subtot) + parseInt(subaux);
			} // Valida que el subtotal no este vacio

		} // Barre la columna subtotal

		// Total Unidades Foliculares 
		nlapiSetFieldValue('custevent_ns_cc_total',subtot);
	} else {
		// Total Unidades Foliculares 
		nlapiSetFieldValue('custevent_ns_cc_total',0);
	}
	// Sale de la funcion
	return true;	
}