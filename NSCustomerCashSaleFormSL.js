/**
 * @author JCadenas
 * Suitelet para  Generar El Batch con la información de la Venta de Producto
 */

function FormCP()
{
    if (confirm('Está seguro de generar la Factura Electrónica')) 
     {
	var idInvoice	= nlapiGetRecordId();

	// actualiza el campo de la factura
	nlapiSubmitField('cashsale', idInvoice , 'custbody_estado_factelectronica', 'Enviado', true);

	// Carga nuevamente la ventana
	location.reload();
      }
}

function aplicatevoid()
{
	var idInvoice	= nlapiGetRecordId();
	// actualiza el campo de la factura
	nlapiSubmitField('invoice', idInvoice , 'custbody_estado_factelectronica', 'Cancelada', true);
        nlapiSubmitField('invoice', idInvoice , 'memo' , 'VOID', true);
        nlapiSubmitField('invoice', idInvoice , 'voided', 'T', true);

	// Carga nuevamente la ventana
	location.reload();
}