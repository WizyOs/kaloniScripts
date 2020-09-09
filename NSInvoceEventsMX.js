/**
 * @author AAVILA @One System
 * Fecha: Agosto'11
 * Javascript para formularios Invoice: Documentos por Cobrar MX
 */

function pageInit(form, type) {
	// Nombre del Formulario

	

	// Factura
		creafrom = nlapiGetFieldValue('createdfrom');
		if (creafrom!=null && creafrom!='') {
			//nlapiSetFieldValue('custbody_orden_de_venta', creafrom);
			//nlapiDisableField('custbody_orden_de_venta', true);
			
			// Suma los anticipos
			sumAnticipos(creafrom);
		} 

		nlapiSetFieldValue('custbody_tipodoc_cxc', 1);
		
		nlapiDisableField('custbody_tipodoc_cxc', true);
		nlapiSetFieldValue('custbody_tipo_comprobante', 1);
		nlapiDisableField('custbody_tipo_comprobante', true);
		nlapiDisableField('custbody_serie_doc_cxc', true);
		nlapiDisableField('custbody_numero_doc', true);
		nlapiDisableField('custbody_numero_foliofiscal', true);
		nlapiDisableField('custbody_monto_letras_esn', true);

	


//nlapiDisableField('custbody_estado_factelectronica', true);
	nlapiDisableField('custbody_mensaje_efactura', true);
      nlapiDisableField('custbody_mensaje_interfactrura', true);

	 metodopago = nlapiGetFieldValue('custbody_metodopago');
	 if ((metodopago=='9')  || (metodopago=='1')) {
		 nlapiSetFieldValue('custbody_cuenta_cliente', '');
		 nlapiDisableField('custbody_cuenta_cliente', true);
	 } else {
		 nlapiDisableField('custbody_cuenta_cliente', false);
	 }

	// Factura - Nota de Cargo

	//if (frmname == 'OSS Factura Vta MX' || frmname == 'OSS Nota de Cargo') {
		 // Customer
		 centity = nlapiGetFieldValue('custbody_emailtracking');
		 if (centity==null || centity==''){
			 loadmails();			 
		 }
	//} // Factura - Nota de Cargo

	// Aplica asignaciones
	return true;
} 

function validitems(){
	// Orden de venta
	ordevent = nlapiGetFieldValue('custbody_orden_de_venta');

	// Valida dato
	if (ordevent!=null && ordevent!='') {
		//  Filtros del Query
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('mainline', null, 'is', 'F');
		filters[1] = new nlobjSearchFilter('internalid', null, 'is', ordevent);
	
		// Campos del Query
		var columns = new Array();
		columns[0] = new nlobjSearchColumn('quantity');
		columns[1] = new nlobjSearchColumn('custitem_cuenta_cabellos','item');
		   
		// Ejecuta la Query
		var transacdata = nlapiSearchRecord('salesorder', null, filters, columns);
		var quantityitm = 0;
		if (transacdata!=null){

			var rows = transacdata.length
			// Barre toda la consulta
			for (var i = 0; i < rows; i++) {
				// Suma todos los anticipos
				if (transacdata[i].getValue('custitem_cuenta_cabellos', 'item')=='T') {
					// Total Facturas Anticipadas
					var qty = transacdata[i].getValue('quantity');
					quantityitm =  parseInt(quantityitm) + (parseInt(qty) * -1);
				} // Suma todos los anticipos
			} // Barre toda la consulta
		}

		// Obtiene valores del item
		var lineNum = nlapiGetLineItemCount('item');
		var qtyitem = 0;
		for (var j=0; j<=lineNum; j++) {
			// Codigo Item
			var codeitem = nlapiGetLineItemValue('item', 'item', j);
		    if (codeitem!=null){
				// Item
			    var fieldsperiodo = [ 'custitem_cuenta_cabellos' ];
			    var transacdata = nlapiLookupField('item', codeitem ,fieldsperiodo);
			    var cuentacabel = transacdata.custitem_cuenta_cabellos;
				
			    // Cuenta cabellos
				if (cuentacabel=='T') {
					var qty = nlapiGetLineItemValue('item', 'quantity', j);
					qtyitem = parseInt(qtyitem) + parseInt(qty); 
				}
		    }
		}
		
		// varifica cantidades
		if (parseInt(quantityitm)!=parseInt(qtyitem)){
			// Mensaje usuario
			alert('Cantidad de cabellos no coincide con la Orden de venta...');
			
			// Retorna falso
			return false;
		}
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
	return true;
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
	
	if (cuentab.length != 5 )
	{
	
		//alert('Debe ingresar 4 dígitos en Cuenta Bancaria');
		//return false;
	}else
	{return true;}
	}
	}

	// Mail de la Entity y Subsidiaria
	 if (lblname=='entity') {
		 loadmails();
	 } // Mail de la Entity y Subsidiaria
	
	// Solo Orden de Venta
	 if (lblname=='custbody_orden_de_venta') {
		// Variable debe estar vacia
		 creafrom = nlapiGetFieldValue('createdfrom');
		if (creafrom==null || creafrom=='') {
			// Orden de venta
			ordevent = nlapiGetFieldValue('custbody_orden_de_venta');

			// Valida dato
			if (ordevent!=null && ordevent!='') {
				// Suma los anticipos 
				sumAnticipos(ordevent);
			} // Valida dato		
		}
	} // Solo Orden de Venta
	 
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
	return true;
}

function loadmails(){
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

	 return true;
}

/*
function validalinea(type,lblname){
	var taxrate2 = nlapiGetCurrentLineItemValue('item','taxrate1');

	// Valida el IVA
	var nrorows = nlapiGetLineItemCount('item');
	if (parseInt(nrorows)>1) {
		// Busca un impuesto
		for (var i = 0; i<=nrorows; i++) {
			var taxrate1 = nlapiGetLineItemValue('item', 'taxrate1', i);
			if (taxrate1!=null && taxrate1!=''){
				break;
			}
		} // Busca un impuesto
		
		// Si son diferentes no graba
		if ((taxrate1!=taxrate2) && (taxrate2!=null && taxrate2!='')) {
			// Mensaje a usuario
			alert('No puede ingresa un tipo de impuesto diferente a '+taxrate1+'.');
			
			// No permite el ingreso
			return false;
		} // Si son diferentes no graba
	} // Valida el IVA

	return true;
}

*/
function sumAnticipos(ordevent){
	// Valor de la cuenta anticipo
	// var ctaanticipo = nlapiGetContext().getSetting('SCRIPT', 'custscript_cc_anticipo');
	var ctaanticipo = 992; 
		
	//  Filtros del Query
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('mainline', null, 'is', 'F');
	filters[1] = new nlobjSearchFilter('custbody_orden_de_venta', null, 'is', ordevent);

	// Campos del Query
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('amount');
	columns[1] = new nlobjSearchColumn('expenseaccount', 'item');
	   
	// Ejecuta la Query
	var transacdata = nlapiSearchRecord('invoice', null, filters, columns);
	
	// Cantidad de documentos
	if (transacdata!=null) {
		var rows = transacdata.length
		var total =  0;
		// Barre toda la consulta
		for (var i = 0; i < rows; i++) {
			// Suma todos los anticipos
			if (transacdata[i].getValue('expenseaccount', 'item')==ctaanticipo) {
				// Total Facturas Anticipadas
				total =  total + transacdata[i].getValue('amount');
			} // Suma todos los anticipos
		} // Barre toda la consulta

		// Total Facturas Anticipadas 
		nlapiSetFieldValue('custbody_anticipos_total',total);
	}

	return true;
}