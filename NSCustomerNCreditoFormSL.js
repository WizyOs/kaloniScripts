/**
 * @author JCadenas
 * Suitelet para  Generar El Batch con la informacion de la Factura
 */

function FormCP()
{

   if (confirm('Está seguro de generar la Nota de Crédito Electrónica')) {
	var idInvoice	= nlapiGetRecordId();

	// actualiza el campo de la nota de credito
	nlapiSubmitField('creditmemo', idInvoice , 'custbody_estado_factelectronica', 'Enviado', true);

	// Carga nuevamente la ventana
	location.reload();
   }
}

function aplicatevoid()
{
	var idInvoice	= nlapiGetRecordId();
	// actualiza el campo de la factura
	nlapiSubmitField('creditmemo', idInvoice , 'custbody_estado_factelectronica', 'Enviado a cancelar', true);
	
	// Carga nuevamente la ventana
	location.reload();
}