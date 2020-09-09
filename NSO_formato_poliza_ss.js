/*
- NombreArchivo: NSO_formato_poliza_ss.js
- NombreScript: NSO | formato poliza
- IdScript: customscript_nso_ss_formato_poliza
- Implementación: customdeploy_nso_ss_formato_poliza 
- Descripción: Script Suitelet que muestra el formato de la poliza 
- Autor: Itzadiana Morales Rivera
- Biblioteca: 
- Lenguaje: Javascript
- FechaCreación: 2018/Octubre/17
*/

function imprimePoliza( request, response ) {

	try {
				//---> Get record in proccess
			var urlgetdata       = nlapiGetContext().getSetting( 'SCRIPT', 'custscript_nso_url_externa_suitelet' );
			var html             = nlapiGetContext().getSetting( 'SCRIPT', 'custscript_nso_plantilla_html' );
			var tranid           = request.getParameter( 'id' );
			var transaction      = getTranRecord( tranid );
			var datosFacturacion = nlapiLookupField( 'vendorbill', tranid, [ 'entity', 'custbody_uuid', 'custbody_nso_emision_mod_diot',
			 										'custbody_nso_tipo_mod_diot', 'custbody_nso_serie_mod_diot', 'custbody_nso_folio_mod_diot', 
			 										'custbody_nso_rfctaxid_mod_diot', 'custbody_nso_razon_mod_diot', 'custbody_nso_total_mod_diot', 
			 										'custbody_nso_total_cdfi_mod_diot', 'custbody_nso_total_comext_mod_diot', 'custbody_amount_16_iva', 
			 										'custbody_baseamount_16_iva_deducible', 'custbody_amount_retivahon_10667', 
			 										'custbody_amount_retivahon_7333', 'custbody_amount_ret10_iva', 'postingperiod',
			 										'custbody_amount_ret10_israrrend', 'custbody_amount_retivaarren_10667' ] );

			//---> Get another data from the main
			var currency     = transaction.getFieldValue( 'currency' );
			var subsidiary   = ( nlapiGetContext().getFeature( 'Subsidiaries' ) == true ) ? transaction.getFieldValue( 'subsidiary' ) : '';  nlapiLogExecution( 'ERROR', 'subsidiary', subsidiary );
			var prev_date    = isNull( transaction.getFieldValue( 'trandate' ) );
			var prev_tranid  = isNull( transaction.getFieldValue( 'tranid' ) );
			var tran_entity  = isNull( transaction.getFieldText( 'entity' ) );
			var memo 		 = isNull( transaction.getFieldValue( 'memo' ) );
			var moneda 		 = '';
			var create_trans = isNull( transaction.getFieldText( 'custbody_create_transaction' ) );

			if ( create_trans == '' ) {
				create_trans = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			}

			//---> Obtiene Datos como administrador
			var wurl      = 'https://forms.na2.netsuite.com/app/site/hosting/scriptlet.nl?script=783&deploy=1&compid=3559763&h=6144f8d932d22f8dbde9' + '&pcurrency=' + currency + '&psubsidiary=' + subsidiary;
			nlapiLogExecution( 'DEBUG', 'wurl', wurl );
			var wresponse = nlapiRequestURL( wurl, null, null, null );
			nlapiLogExecution( 'DEBUG', 'wresponse', wresponse );

			var wbody     = wresponse.getBody();
			nlapiLogExecution( 'DEBUG', 'wbody', wbody );

			var obj       = eval( '( ' + wbody + ' )' );

			nlapiLogExecution( 'DEBUG', 'obj', obj );

			var companyname		 = isNull( obj.companyname );
			var filial_vatnumber = isNull( obj.filial_vatnumber );
			var cal_num 		 = isNull( obj.cal_num );
			var colonia 		 = isNull( obj.colonia );
			var ciudad 			 = isNull( obj.ciudad );
			var codigo_postal 	 = isNull( obj.codigo_postal );
			var razon_social 	 = isNull( obj.razon_social );
			var phone		 	 = isNull( obj.phone );
			var moneda 		     = isNull( obj.currencyname );
			var srclogo          = isNull( obj.srclogo );
			var urlimg           = isNull( obj.urlimg );
			var approve_tran     = isNull( obj.approve_tran );
			var ismultibook      = isNull( obj.ismultibook );
			var accountingbook   = isNull( obj.accountingbook );
			var searchresults    = null;

			if ( approve_tran == '' )
				approve_tran = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

			if ( ismultibook == 'T' && accountingbook != null ) {
				//Get the GL Impact based on the view number -45
				 var searchresults = GetImpactGLedgerMultiBook( tranid, transaction.getRecordType(), accountingbook ) || null;
			} else {
				//Get the GL Impact based on the view number -36
				 var searchresults = getImpactGLedger( tranid, transaction.getRecordType() );
			}
			var  estil = 'style="border: 1px solid black;"';

			//Get the table where the GL Impact will be saved
			var cadena = '';
			cadena =  cadena + '<table style="border-collapse: collapse ;width:900;"><tr bgcolor="#EDEDEC"><td ' + estil + '><span class="line1"><strong>Cuenta</strong></span></td>';
			cadena =  cadena + '<td ' + estil + '><span class="line1"><strong>Monto (D&oacute;bito)</strong></span></td>';
			cadena =  cadena + '<td ' + estil + '><span class="line1"><strong>Monto (Cr&oacute;dito)</strong></span></td>';
			cadena =  cadena + '<td ' + estil + '><span class="line1"><strong>Nota</strong></span></td>';
			cadena =  cadena + '<td ' + estil + '><span class="line1"><strong>Ubicaci&oacute;n</strong></span></td>';
			cadena =  cadena + '<td ' + estil + '><span class="line1"><strong>Departamento</strong></span></td></tr>';


			if ( searchresults ) {

				var debitamount  = 0, creditamount = 0;

				for ( var x = 0 ; x <= searchresults.length - 1 ; x++ ) {
				
					cadena     = cadena + '<tr><td ' + estil + '>';
					if ( ismultibook == 'T' ) {
						cadena  = cadena + '<span class="line2">' + searchresults[x].getText( 'account', 'accountingtransaction' ) + '</span>';
					}
					else {
						cadena  = cadena + '<span class="line2">' + searchresults[x].getText( 'account' ) + '</span>';
					}
					cadena     = cadena + '</td><td ' + estil + '><P ALIGN=right>';

					var debit  = '', credit = '';

					if ( ismultibook == 'T' ) {
						if ( Math.abs( nsoParseFloatOrZero( searchresults[ x ].getValue( 'debitamount', 'accountingtransaction' ) ) ) > 0 ) {
							debit = nsoParseFloatOrZero( searchresults[ x ].getValue( 'debitamount', 'accountingtransaction' ) );
						}
						moneda = searchresults[x].getValue( 'basecurrency', 'accountingtransaction' );
					}
					else {
						if ( Math.abs( nsoParseFloatOrZero( searchresults[ x ].getValue( 'debitamount' ) ) ) > 0 ) {
							debit = nsoParseFloatOrZero( searchresults[ x ].getValue( 'debitamount' ) );
						}
					}

					debitamount = nsoParseFloatOrZero( debitamount ) + debit;
					cadena      = cadena + '<span class="line2">' + formatNumber( nlapiFormatCurrency( debit ) ) + '</span>';
					cadena      = cadena + '</P></td><td ' + estil + '><P ALIGN=right>';

					if ( ismultibook == 'T' ) {
						if ( Math.abs( nsoParseFloatOrZero( searchresults[ x ].getValue( 'creditamount', 'accountingtransaction' ) ) ) > 0 ) {
							credit = nsoParseFloatOrZero( searchresults[ x ].getValue( 'creditamount', 'accountingtransaction' ) );
						}
					}
					else {
						if ( Math.abs( nsoParseFloatOrZero( searchresults[ x ].getValue( 'creditamount' ) ) ) > 0 ) {
							credit = nsoParseFloatOrZero( searchresults[ x ].getValue( 'creditamount' ) );
						}
					}

					creditamount = nsoParseFloatOrZero( creditamount ) + credit;

					cadena = cadena + '<span class="line2">' + formatNumber( nlapiFormatCurrency( credit ) ) + '</span>';
					cadena = cadena + '</P></td><td ' + estil + '>';
					cadena = cadena + '<span class="line2">' + nsoIsNull3( searchresults[ x ].getValue( 'memo' ),"&nbsp;" ) + '</span>';
					cadena = cadena + '</td><td ' + estil + '>';
					cadena = cadena + '<span class="line2">' + nsoIsNull3( searchresults[ x ].getText( 'location' ),"&nbsp;" ) + '</span>';
					cadena = cadena + '</td><td ' + estil + '>';
					cadena = cadena + '<span class="line2">' + nsoIsNull3( searchresults[ x ].getText( 'department' ),"&nbsp;" ) + '</span>';
					cadena = cadena + '</td></tr>';
				}

				cadena = cadena + "<tr><td " + estil + "><b><p align=\"right\" class='line2'>Total</p></b></td>";
				cadena = cadena + "<td " + estil + "><strong><p align=\"right\" class='line2'>" + formatNumber( nlapiFormatCurrency( debitamount ) ) + "</p></strong></td>";
				cadena = cadena + "<td " + estil + "><strong><p align=\"right\" class='line2'>" + formatNumber( nlapiFormatCurrency( creditamount ) ) + "</p></strong></td>";
				cadena = cadena + "<td " + estil + ">&nbsp;</td>";
				cadena = cadena + "<td " + estil + ">&nbsp;</td>";
				cadena = cadena + "<td " + estil + ">&nbsp;</td></tr>";

			}

			cadena = cadena + "</table>";
			cadena = cadena + generaTablaEspacio();
			cadena = cadena + generaTablaCfdi( datosFacturacion );
			cadena = cadena + generaTablaEspacio();
			cadena = cadena + generaTablaDiot( datosFacturacion );

			//Replace the values on the html parameter
			html = html.replace( /\$company/g, companyname );
			html = html.replace( /\$colonia/g, colonia );
			html = html.replace( /\$ciudad/g, ciudad );
			html = html.replace( /\$codigo_postal/g, codigo_postal );
			html = html.replace( /\$filial_rfc/g, filial_vatnumber );
			html = html.replace( /\$phone/g, phone );
			html = html.replace( /\$beneficiario/g, tran_entity );
			html = html.replace( /\$id/g, prev_tranid );
			html = html.replace( /\$fecha_creacion/g, prev_date );
			html = html.replace( /\$currency/g, moneda );
			html = html.replace( /\$observaciones/g, memo );
			html = html.replace( /\$tabla/g, cadena );
			html = html.replace( /\$srcimg/g, ( subsidiary =='' ) ? srclogo : urlimg );
			html = html.replace( /\$elaborado/g, create_trans );
			html = html.replace( /\$autorizado/g, approve_tran );

			response.write( html );

		} catch ( e ) {

			nlapiLogExecution( 'ERROR', 'imprimePoliza', '<Error en la función imprimepoliza>' + e );
		}

}


function GetImpactGLedgerMultiBook( tranid, record_type, accountingbook ) {

	try { 

		if ( tranid == null || tranid == '' || tranid == null || accountingbook == '' || accountingbook == null ) {
			return null;
		}

		var values = new Array();
		values[ 0 ] = 0.00;
		values[ 1 ] = null;

		var filters = new Array();
		filters.push ( new nlobjSearchFilter( 'internalid', null, 'anyOf', tranid ) );
		filters.push ( new nlobjSearchFilter( 'accounttype', 'accountingtransaction', 'noneof', '@NONE@' ) );
		filters.push ( new nlobjSearchFilter( 'amount', 'accountingtransaction', 'notequalto', values ) );
		filters.push ( new nlobjSearchFilter( 'accountingbook', 'accountingtransaction', 'anyof', accountingbook ) );
		//filters.push ( new nlobjSearchFilter( 'isinactive', null, 'is', [ 'F' ] ) );


		var mySearch      = nlapiLoadSearch( record_type, '-45' );
		mySearch.setFilters( filters );
		var resultSet     = mySearch.runSearch();
		var searchresults = new Array();

		//----> Ciclo para traer hasta 10,000 registros
		for ( var i = 0 ; resultSet != null && i < 10; i++ ) {
			var indxini   = nsoParseIntOrZero( 1000 * i );
			var indxend   = nsoParseIntOrZero( indxini )  + 1000;
			var results   = resultSet.getResults( indxini, indxend );

			if ( results != null && results.length > 0 ) {
				searchresults = searchresults.concat( results );
			}else
				break;
		}
		return searchresults;

	} catch ( e ) {

		nlapiLogExecution( 'ERROR', 'GetImpactGLedgerMultiBook', '<Error en la función GetImpactGLedgerMultiBook>' + e );

	}

}


function getImpactGLedger( tranid, record_type )
{

	try {

			//--> modif iam 28-02-2012 para que tome mas de 1000 registros la busqueda
			if ( tranid == null || tranid == '' || record_type == null || record_type == ''  ) {
				return null;
			}

			var values = new Array();
			values[ 0 ] = 0.00;
			values[ 1 ] = null;

			var filters = new Array();
			filters.push( new nlobjSearchFilter( 'internalid',  null, 'anyOf',      tranid ) );
			filters.push( new nlobjSearchFilter( 'accounttype', null, 'noneof',     '@NONE@' ) );
			filters.push( new nlobjSearchFilter( 'amount',      null, 'notequalto', values ) );
			//filters.push( new nlobjSearchFilter( 'isinactive', null, 'is', [ 'F' ] ) );


			var columns = new Array();
			columns.push( new nlobjSearchColumn( 'fxamount' ) );
			columns.push( new nlobjSearchColumn( 'amount' ) );
			columns.push( new nlobjSearchColumn( 'account' ) );
			columns.push( new nlobjSearchColumn( 'debitamount' ) );
			columns.push( new nlobjSearchColumn( 'creditamount' ) );
			columns.push( new nlobjSearchColumn( 'posting' ) );
			columns.push( new nlobjSearchColumn( 'memo' ) );
			columns.push( new nlobjSearchColumn( 'entity' ) );
			columns.push( new nlobjSearchColumn( 'department' ) );
			columns.push( new nlobjSearchColumn( 'class' ) );
			columns.push( new nlobjSearchColumn( 'location' ) );

			var mySearch      = nlapiLoadSearch( record_type, '-36' );
			mySearch.setFilters( filters );
			mySearch.setColumns( columns )
			var resultSet     = mySearch.runSearch();
			var searchresults = new Array();

			//----> Ciclo para traer hasta 10,000 registros
			for ( var i = 0 ; resultSet != null && i < 10; i++) {
				var indxini   = nsoParseIntOrZero( 1000 * i );
				var indxend   = nsoParseIntOrZero( indxini ) + 1000;
				var results   = resultSet.getResults( indxini, indxend );

				if ( results != null && results.length > 0 ) {
					searchresults = searchresults.concat( results );
				}
				else
					break;
			}

			return searchresults;

	} catch ( e ) {
		nlapiLogExecution( 'ERROR', 'getImpactGLedger', '<Error en la función getImpactGLedger>' + e );

	}
	
}


function isNull( value ) {
	return ( value == null ) ? '' : value;
}

function nsoIsNull3( value, defaul ) {
	return ( value == '' ) ? defaul : value;
}

function nsoParseIntOrZero( i ) {
	var r = parseInt( i );
	return isNaN( r ) ? 0 : r;
}

function nsoNumberOrZero( f ) {
	var r = ( !isNaN( f ) ) ? Number( f ) : 0;
	return r;
}

function nsoParseFloatOrZero( f ) {
	var r = parseFloat( f );
	return isNaN( r ) ? 0.0 : r;
}

function getTranRecord( tranid ) {
	var record = null;

	if ( tranid != null && tranid != '' )	{
		var searchresults = nlapiSearchRecord( 'transaction', null, new nlobjSearchFilter( 'internalid', null, 'anyof', tranid ) );

		if ( searchresults != null && searchresults.length > 0 ) {
			record = nlapiLoadRecord( searchresults[ 0 ].getRecordType(), searchresults[ 0 ].getId() );
		}
	}
	return record;
}


function GetNameAccount( account_id ) {
	var record = nlapiLoadRecord( 'account', account_id );
	var accountchain = '';
	accountchain = isNull( record.getFieldValue( 'acctnumber' ) ) + ' ';
	accountchain = accountchain + isNull( record.getFieldValue( 'acctname' ) );

	return accountchain;
}


function formatNumber( num, prefix )
{
	prefix = prefix || '';
	num += '';
	var splitStr = num.split('.');
	var splitLeft = splitStr[0];
	var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
	var regx = /(\d+)(\d{3})/;

	while ( regx.test( splitLeft ) ) {
		splitLeft = splitLeft.replace( regx, '$1' + ',' + '$2' );
	}
	var rec = prefix + splitLeft + splitRight;
	if ( rec == "0.00" ) {
		return "&nbsp";
	}
	return rec;
}


function CodificaUTF8( bodytext )
{
	var retval = '';
	if ( bodytext != null && bodytext != '' ) {
		bodytext = bodytext.replace( /á/g, '&#225;' );
		bodytext = bodytext.replace( /é/g, '&#233;' );
		bodytext = bodytext.replace( /í/g, '&#237;' );
		bodytext = bodytext.replace( /ó/g, '&#243;' );
		bodytext = bodytext.replace( /ú/g, '&#250;' );
		bodytext = bodytext.replace( /Á/g, '&#193;' );
		bodytext = bodytext.replace( /É/g, '&#201;' );
		bodytext = bodytext.replace( /Í/g, '&#205;' );
		bodytext = bodytext.replace( /Ó/g, '&#211;' );
		bodytext = bodytext.replace( /Ú/g, '&#218;' );
		bodytext = bodytext.replace( /Ò/g, '&#210;' );
		bodytext = bodytext.replace( /ñ/g, '&#241;' );
		bodytext = bodytext.replace( /Ñ/g, '&#209;' );
		bodytext = bodytext.replace( /®/g, '&#174;' );
		bodytext = bodytext.replace( /©/g, '&#169;' );
		bodytext = bodytext.replace( /ª/g, '&#170;' );
		bodytext = bodytext.replace( /™/g, '&#153;' );
		bodytext = bodytext.replace( /Ÿ/g, '&#159;' );
		bodytext = bodytext.replace( /°/g, '&#176;' );
		bodytext = bodytext.replace( /¼/g, '&#188;' );
		bodytext = bodytext.replace( /½/g, '&#189;' );
		bodytext = bodytext.replace( /¾/g, '&#190;' );
		bodytext = bodytext.replace( /Ä/g, '&#196;' );
		bodytext = bodytext.replace( /Ë/g, '&#203;' );
		bodytext = bodytext.replace( /Ï/g, '&#207;' );
		bodytext = bodytext.replace( /Ö/g, '&#214;' );
		bodytext = bodytext.replace( /Ü/g, '&#220;' );
		bodytext = bodytext.replace( /ÿ/g, '&#255;' ) ;

		retval = bodytext;
	}
	return retval;
}

function generaTablaCfdi( datosFacturacion ) {

	var cadena = '';
	cadena = cadena + '<table width="900" border="0">';
	cadena = cadena + '<tbody>';
	cadena = cadena + '<tr>';
	cadena = cadena +  '<td colspan="8">CFD/CFDI ASOCIADOS A LA PÓLIZA</td>';
	cadena = cadena +  '</tr>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" ><strong>Emisión</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>Tipo</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>Serie</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>Folio</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>UUID</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>RFC/TaxId</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>Razón Social</strong></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><strong>Total</strong></td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_nso_emision_mod_diot' ] + '</span></td>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_nso_tipo_mod_diot' ] + '</span></td>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_nso_serie_mod_diot' ] + '</span></td>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_nso_folio_mod_diot' ] + '</span></td>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_uuid' ] + '</span></td>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_nso_rfctaxid_mod_diot' ] + '</span></td>';
	cadena = cadena + '<td><span class="line2">' + datosFacturacion[ 'custbody_nso_razon_mod_diot' ] + '</span></td>';
	cadena = cadena + '<td  style="border-bottom:1px solid #000000"><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_nso_total_mod_diot' ] ) ) )+ '</span></td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td><strong>Total CFD/CFDI:</strong></td>';
	cadena = cadena + '<td ><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_nso_total_cdfi_mod_diot' ] ) ) )+ '</span></td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td></td>';
	cadena = cadena + '<td><strong>Total Comp.Ext:.</strong></td>';
	cadena = cadena + '<td><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_nso_total_comext_mod_diot' ] ) ) )+ '</span></td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '</tbody>';
	cadena = cadena + '</table>';

	return cadena;

}

function generaTablaDiot( datosFacturacion ) {

	var isrRetenido     = nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_ret10_iva' ] ) + nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_ret10_israrrend' ] );
	var ivaRetenido     = nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_retivaarren_10667' ] ) + nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_retivahon_10667' ] );
	var totalErogacion  = ivaRetenido + nsoParseFloatOrZero( datosFacturacion[ 'custbody_baseamount_16_iva_deducible' ] ) + nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_16_iva' ] ) + nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_ret10_iva' ] );
	var periodoContable = nlapiLookupField( 'accountingperiod', datosFacturacion[ 'postingperiod' ], 'periodname');

	var cadena = '';
	cadena = cadena + '<table width="900" border="0">';
	cadena = cadena + '<tbody>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td colspan="14">INFORMACIÓN PARA DIOT</td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '<tr >';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><span class="line2"><strong>Prov</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><span class="line2"><strong>Tasa</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center ><span class="line2"><strong>Importe base</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>Importe IVA</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>IVA retenido</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>ISR retenido</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>IEPS</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>Otras erogaciones</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>Total erogación</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>IVA pag. no acred.</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2"><strong>IETU</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><span class="line2"><strong>Con. IETU</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><span class="line2"><strong>Apl. IVA</strong></span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000"><span class="line2"><strong>Periodo acredit.</strong></span></td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td><span class="line2">' + nlapiLookupField( 'vendor', datosFacturacion[ 'entity' ], 'custentity319' ) + '</span></td>';
	cadena = cadena + '<td>16%</td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_baseamount_16_iva_deducible' ] ) ) ) + '</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_16_iva' ] ) ) ) + '</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( ivaRetenido ) ) ) + '</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">' +  formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( isrRetenido ) ) ) + '</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">0.00</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">0.00 </span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( totalErogacion ) ) ) + '</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">0.0</span></td>';
	cadena = cadena + '<td style="border-bottom:1px solid #000000" align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_baseamount_16_iva_deducible' ] ) ) ) + '</span></td>';
	cadena = cadena + '<td ><span class="line2">Nin...</td>';
	cadena = cadena + '<td><span class="line2">Si</td>';
	cadena = cadena + '<td><span class="line2">' + periodoContable + '</td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '<tr>';
	cadena = cadena + '<td>&nbsp;</td>';
	cadena = cadena + '<td>&nbsp;</td>';
	cadena = cadena + '<td align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_baseamount_16_iva_deducible' ] ) ) ) + '</span></td>';
	cadena = cadena + '<td align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_amount_16_iva' ] ) ) ) + '</span></td>';
	cadena = cadena + '<td align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( ivaRetenido ) ) ) + '</span></td>';
	cadena = cadena + '<td align = center><span class="line2">' +  formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( isrRetenido ) ) ) + '</span></td>';
	cadena = cadena + '<td align = center><span class="line2">0.00</span></td>';
	cadena = cadena + '<td align = center><span class="line2">0.00</span></td>';
	cadena = cadena + '<td align = center><span class="line2">' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( totalErogacion ) ) ) + '</span></td>';
	cadena = cadena + '<td align = center><span class="line2">0.0</span></td>';
	cadena = cadena + '<td align = center>' + formatNumber( nlapiFormatCurrency ( nsoParseFloatOrZero( datosFacturacion[ 'custbody_baseamount_16_iva_deducible' ] ) ) ) + '</span></td>';
	cadena = cadena + '<td>&nbsp;</td>';
	cadena = cadena + '<td>&nbsp;</td>';
	cadena = cadena + '<td>&nbsp;</td>';
	cadena = cadena + '</tr>';
	cadena = cadena + '</tbody>';
	cadena = cadena + '</table>';

	return cadena;

}

function generaTablaEspacio() {

	var cadena = '';

	cadena += '<table width="900" border="0">';
	cadena += '<tbody>';
	cadena += '<tr>';
	cadena += '<td></td>';
	cadena += '<td></td>';
	cadena += '</tr>';
	cadena += '<tr>';
	cadena += '<td></td>';
	cadena += '<td></td>';
	cadena += '</tr>';
	cadena += '<tr>';
	cadena += '<td></td>';
	cadena += '<td></td>';
	cadena += '</tr>';
	cadena += '<tr>';
	cadena += '<td></td>';
	cadena += '<td></td>';
	cadena += '</tr>';
	cadena += '</tbody>';
	cadena += '</table>';
	return cadena;

}