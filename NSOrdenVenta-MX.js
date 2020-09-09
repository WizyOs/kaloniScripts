/**
 * @author JCARDENAS @One System
 * Fecha: OCTUBRE'11
 * Javascript para formularios Invoice: Documentos por Cobrar MX
 * Este script NO CONTIENE recalculo de montos a nivel de detalle
 */

function saverecord(){
	//Llamada del Método al grabar
	if(validalinea() == false ){
		return false;
	}
}

function validalinea(){
	var nrorows = nlapiGetLineItemCount('item');
	if (parseFloat(nrorows)==0) {
		return false;
	}
	// Primer Porcentaje
	var taxrate1= nlapiGetLineItemValue('item', 'taxrate1', 1);
	if (parseFloat(nrorows)==1) {
		return true;
	}
	// Busca un impuesto en 2 o más Lineas agregadas
	for (var i = 2; i<=nrorows; i++) {
		var taxrate2 = nlapiGetLineItemValue('item', 'taxrate1', i);
		if (taxrate2!=taxrate1) { 
			break;
		}
	}
	// Si son diferentes no graba
	if (taxrate1!=taxrate2) {
		alert('No puede ingresar "Tasas de Impuestos" Diferentes');
		return false;
	}
	return true;
}