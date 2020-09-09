/**
 * @author JCARDENAS @One System
 * Fecha: Agosto'11
 * Javascript para formularios Invoice: Documentos por Cobrar MX
 */

function pageInit(form, type) {
	// Nombre del Formulario
		v_department = nlapiGetFieldValue('department');
		if (v_department==null || v_department=='') {
			nlapiSetFieldValue('department', '3');
		} 
}