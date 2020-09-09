/**
 * @author AAVILA @One System
 * Fecha: Agosto'11
 * Javascript para formularios Invoice: Documentos por Cobrar MX
 */

function pageInit(type, form) {
	/*
	 * Generado desde la factura
	 * Actualizado por AAvila el 10/Oct/2012
	 */
	createfrom = nlapiGetFieldValue('createdfrom');
	if (type=='copy' && createfrom!=null && createfrom!=''){
		// Borra el contenido de campos personalizados
		 nlapiSetFieldValue('custbody_estado_factelectronica', '');
		 nlapiSetFieldValue('custbody_mensaje_efactura', '');
	}


	nlapiSetFieldValue('custbody_tipodoc_cxc', '4');
	nlapiDisableField('custbody_tipodoc_cxc', true);
                      nlapiSetFieldValue('custbody_tipo_comprobante', 2);
	nlapiDisableField('custbody_tipo_comprobante', true);
		
	// Desactiva campos personalizados
	nlapiDisableField('custbody_estado_factelectronica', true);
	nlapiDisableField('custbody_mensaje_efactura', true);
        nlapiDisableField('custbody_mensaje_interfactrura', true);

	// Aplica asignaciones
	metodopago = nlapiGetFieldValue('custbody_metodopago');
	if (metodopago!=null && (metodopago=='9')  || (metodopago=='1')) {
		 nlapiSetFieldValue('custbody_cuenta_cliente', '');
		 nlapiDisableField('custbody_cuenta_cliente', true);
	} else {
		 nlapiDisableField('custbody_cuenta_cliente', false);
	}

	return true;
} 

function CambiaCampos(type,lblname) {
	 if (lblname=='custbody_metodopago') {
		// Variable debe estar vacia
		 metodopago = nlapiGetFieldValue('custbody_metodopago');
		if ((metodopago=='9')  || (metodopago=='1')) {
			 nlapiSetFieldValue('custbody_cuenta_cliente', '');
			 nlapiDisableField('custbody_cuenta_cliente', true);
		} else {
			 nlapiDisableField('custbody_cuenta_cliente', false);
		}
	 }
}


function changebody(type,lblname) {

if (lblname='custbody_cuenta_cliente')
{
	var cuentab=nlapiGetFieldValue('custbody_cuenta_cliente');
	if (nlapiGetFieldValue('custbody_cuenta_cliente')==""|nlapiGetFieldValue('custbody_cuenta_cliente')==null) {
			return true;
		}
	else
	{
	cuentab= cuentab.split(' ').join('');
	
	if (cuentab.length != 4 )
	{
	
		alert('Debe ingresar 4 dígitos en Cuenta Bancaria');
		return false;
	}else
	{return true;}
	}
	}

	// Mail de la Entity y Subsidiaria
	 if (lblname=='entity') {
		 // Customer
		 centity = nlapiGetFieldValue('entity');
		 if (centity!=null && centity!=''){
			 var fieldname = [ 'email','altemail','subsidiary' ];
			 var transdata = nlapiLookupField('customer', centity, fieldname);
			 var tranmail1 = '';
			 var tranmail2 = '';
			 var tranmail3 = '';
			 var trasubsid = '';
			 if (transdata!=null){
				 var tranmail1 = transdata.email;
				 var tranmail3 = transdata.altemail;
				 var trasubsid = transdata.subsidiary;
			 }
			 // Subsidiary
			 if (trasubsid !=null && trasubsid!=''){
				 var fieldname = [ 'email' ];
				 var transdata = nlapiLookupField('subsidiary', trasubsid, fieldname);
				 if (transdata!=null){
					 var tranmail2 = transdata.email;
				 }
			 } // Subsidiary
			 // Concadena los emails
			 if (tranmail1!='' && tranmail2!='' && tranmail3!=''){
			 nlapiSetFieldValue('custbody_emailtracking', tranmail1+', '+tranmail2+', '+tranmail3 );
				}
			 if (tranmail1!='' && tranmail2=='' && tranmail3!=''){
				 nlapiSetFieldValue('custbody_emailtracking', tranmail1 +', '+ tranmail3);
			 }

			 if (tranmail1!='' && tranmail2=='' && tranmail3==''){
				 nlapiSetFieldValue('custbody_emailtracking', tranmail1);
			 }

			 if (tranmail1=='' && tranmail2!='' && tranmail3==''){
				 nlapiSetFieldValue('custbody_emailtracking', tranmail2);
			 }


			 if (tranmail1=='' && tranmail2=='' && tranmail3!=''){
				 nlapiSetFieldValue('custbody_emailtracking', tranmail3);
			 }


			 if (tranmail1=='' && tranmail2!='' && tranmail3!=''){
				 nlapiSetFieldValue('custbody_emailtracking',  tranmail2 +', '+ tranmail3);
			 }

			 if (tranmail1!='' && tranmail2!='' && tranmail3==''){
				 nlapiSetFieldValue('custbody_emailtracking',  tranmail1 +', '+ tranmail2);
			 }

		 } // Customer
		 

	 } // Mail de la Entity y Subsidiaria

	 // Desabilida control 
	 if (lblname=='custbody_metodopago') {
		// Variable debe estar vacia
		 metodopago = nlapiGetFieldValue('custbody_metodopago');
		if ((metodopago=='9')  || (metodopago=='1')) {
			 nlapiSetFieldValue('custbody_cuenta_cliente', '');
			 nlapiDisableField('custbody_cuenta_cliente', true);
		} else {
			 nlapiDisableField('custbody_cuenta_cliente', false);
		}
	 }
	 
	 if (lblname=='subsidiary')
	 {
	 		 cdepartment = nlapiGetFieldValue('department');
	     if (cdepartment ==null && cdepartment=='')
		 {

		  nlapiSetFieldValue('department', '3');
		 }
	 }
	return true;
}

function saveRecord()
{
	/* AAvila
	 * Cambios realizados para desactivar el boton grabar
	 * Fecha 10/Oct/2012
	 */
	var estado = nlapiGetFieldValue('custbody_estado_factelectronica');
	if (estado=='Generado') {
		alert('No se puede grabar el documento. Por que ya esta firmado electronicamente');
		return false;
	}

	
	var metodopago = nlapiGetFieldValue('custbody_metodopago');
	if ((metodopago!='9')  && (metodopago!='1')) 
	{  
		var ctacliente = nlapiGetFieldValue('custbody_cuenta_cliente');
		if (ctacliente == null || ctacliente == '' )
		{
			alert('Debe ingresar valor en el campo: Cuenta Bancaria Cliente.');
			return false;
		} else 	
		{
			var _longitud = ctacliente.length;
			if (_longitud>=5)
			{
				alert('La longitud del campo Cuenta Bancaria Cliente debe ser 4 caracteres.');
				return false;
			}
		}
	}
return true;
}