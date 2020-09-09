/**
 * @author ECARPIO @One System
 * Fecha: Agosto'11
 * Javascript para formularios Invoice: Documentos por Cobrar MX
 * Este script NO CONTIENE recalculo de montos a nivel de detalle
 */

function recalc(type){
	//monto en letras en espanol
	var cliente = nlapiGetFieldValue('entity');
	var tipoMoneda = nlapiGetFieldValue('currency');
	var inimoneda = nlapiLookupField('currency', tipoMoneda, 'symbol');
	var monedaTexto = nlapiLookupField('currency', tipoMoneda, 'name');
	
	// Convierte a letras
	var monto = nlapiGetFieldValue('total');
	if(monto != 0 || monto != null)
	{
		var montoletras = ConvNumeroLetraESP(monto,monedaTexto,inimoneda);
		nlapiSetFieldValue('custbody_monto_letras_esn',montoletras);
	}	
	return true;
}


//DMena 2706/2012 Formato de fecha
function saveRecord()
{
	if (!validitems()) {
			return false;
		}

		var metodopago = nlapiGetFieldValue('custbody_metodopago');
		
		if ((metodopago!='9')  && (metodopago!='1')) {
			//var ctacliente = nlapiGetFieldValue('custbody_cuenta_cliente');
			
			//if (ctacliente == null || ctacliente == '' )
			//{
			//	alert('Debe ingresar valor en el campo: Cuenta Bancaria Cliente.');
			//	return false;
			//}
			//else
			//{
			//	var _longitud = length(ctacliente);
				//alert(_longitud);
			//	if (_longitud>=5)
			//	{
			//		alert('La longitud del campo Cuenta Bancaria Cliente debe ser 4 caracteres.');
			//		return false;
			//	}
			//}
		}

	  var today = new Date();
	  
	   if ((String(nlapiGetFieldValue('custbodyns_feccustcre')).length == 0)) 
	  {
		   var mes = today.getMonth() + 1 ;
			lapiSetFieldValue('custbodyns_feccustcre', rellenarTexto(today.getDate(),2,'N')+ '/'+ rellenarTexto(mes,2,'N')  +'/'+today.getFullYear() + ' ' + rellenarTexto(today.getHours(),2,'N') + ':' + rellenarTexto(today.getMinutes(),2,'N') + ':' + rellenarTexto(today.getSeconds(),2,'N'));
	  }
  
	return true;
}

function rellenarTexto(Numero,TotalDigitos,TipoCaracter)
{
	if (Numero==null || Numero=='')
	{ Numero = '';}
	else
	{ Numero = Numero.toString(); }
	
	 
	var pd = ''; 
    if (TotalDigitos > Numero.length) 
    { 
       for (i=0; i < (TotalDigitos-Numero.length); i++) 
       {  
       	if (TipoCaracter=='N')
       	{ pd += '0'; }
       	else
       	{ pd += ' '; }
       }  
    }  
    if (TipoCaracter=='N')
    { return pd + Numero.toString();}
    else
    { return Numero.toString() + pd ;}
     
}