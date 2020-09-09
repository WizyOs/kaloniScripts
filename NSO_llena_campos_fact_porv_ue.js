/*
- NombreArchivo: NSO_llena_campos_fact_prov_ue.js
- NombreScript: NSO | llena campos factura proveedor
- IdScript: customscript_nso_ue_llena_campos_factprov
- Implementación: customdeploy_nso_ue_llena_campos_factprov Vendor Bill
- Descripción: Script User event que llena campos de la pestaña de facturación electronica en la factura del proveedor con la información de un xml
- Autor: Itzadiana Morales Rivera
- Biblioteca: 
- Lenguaje: Javascript
- FechaCreación: 2018/Octubre/17
*/

var context = nlapiGetContext();
var IDIOMA  = context.getPreference( 'LANGUAGE' ).split( '_' )[ 0 ];

function muestraBotonImprimirPoliza( type, form, request ) {

	try {

		if ( type == 'view' ) {

			var id  = nlapiGetRecordId();
			var url = nlapiResolveURL( 'SUITELET', 'customscript_nso_ss_formato_poliza', 'customdeploy_nso_ss_formato_poliza', null );
			url = url + "&id=" + id;
			form.addButton( 'custpage_btnprint', ( IDIOMA == 'es' ) ? 'Imprimir P&oacute;liza' : 'Print Policy', "window.open('"+ url +"')" );
		}

	} catch ( e ) {
		nlapiLogExecution( 'ERROR', 'Mostrando el botón ', e );
	}	

}

function llenaCamposAfterSubmit( type, form, request ) {

	nlapiLogExecution( 'DEBUG', 'type', type );


	if ( type == 'edit' || type == 'create' || type == 'xedit' ) {

		var wid                = nlapiGetRecordId();
		var wtype              = nlapiGetRecordType();

		nlapiLogExecution( 'DEBUG', 'ID TRANSACCION', wid );

		if ( wtype == 'vendorbill' ) {

			var oldRecordBill = nlapiGetOldRecord();
			var recordBill    = nlapiGetNewRecord();

			var refxml      = recordBill.getFieldValue( 'custbody_cfdi_ref_xml' );
			var refxmlOld   = null;

			if ( oldRecordBill ) {

				 refxmlOld   = oldRecordBill.getFieldValue( 'custbody_cfdi_ref_xml' );

			}

			nlapiLogExecution( 'DEBUG', 'refxml', refxml );
			nlapiLogExecution( 'DEBUG', 'refxmlOld', refxmlOld );

			var idUpdateFactura = 0;

			if ( oldRecordBill && refxmlOld && !refxml ) {

				// se elimina el archivo del campo 

				nlapiLogExecution( 'DEBUG', 'Loading XML IF 1' );

				idUpdateFactura = nlapiSubmitField( wtype, wid, [ 'custbody_nso_emision_mod_diot', 'custbody_nso_tipo_mod_diot', 'custbody_nso_serie_mod_diot', 
																		  'custbody_nso_folio_mod_diot', 'custbody_nso_rfctaxid_mod_diot', 'custbody_nso_razon_mod_diot', 
																		  'custbody_nso_total_mod_diot', 'custbody_nso_total_cdfi_mod_diot', 'custbody_nso_total_comext_mod_diot', 
																		  'custbody_uuid' ],
					                                                    [ '', '', '', '', '', '', '', '', '', ''] );

			}

			if ( oldRecordBill && refxmlOld && refxml && ( refxmlOld == refxml ) ) {

				// se actualizo pero no hubo ningun cambio en el archivo

				try	{

					nlapiLogExecution( 'DEBUG', 'Loading XML IF 2', refxml );
					var xmlobj      = nlapiLoadFile( refxml );
					var xmlDocument = nlapiStringToXML( xmlobj.getValue() );

					var Complemento      = nlapiSelectNodes( xmlDocument, "//*[name()='tfd:TimbreFiscalDigital']" );
					var UUID             = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'UUID' ) : '';
					var fecha            = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'FechaTimbrado' ) : '';

					var Emisor      = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Emisor']" );
    				var rSocial   = Emisor [ 0 ] ? ( Emisor[ 0 ].getAttribute( 'Nombre' )  || Emisor[ 0 ].getAttribute( 'Nombre' ) ) : '';
    				var rfcEmisor = Emisor[ 0 ] ? Emisor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';

					var Receptor    = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Receptor']" );
    				var rfcReceptor = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';
    				var nombre     = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Nombre' ) || Emisor[ 0 ].getAttribute( 'Nombre' ) : '';

					var Comprobante = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Comprobante']" );
					var total       = Comprobante[ 0 ] ?  Comprobante[ 0 ].getAttribute( 'total' ) || Comprobante[ 0 ].getAttribute( 'Total' ) : '';
					var serie       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'Serie' ) || Comprobante[ 0 ].getAttribute( 'Serie' ) ) || '' : '';
					var folio       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'folio' ) || Comprobante[ 0 ].getAttribute( 'Folio' ) ) || '' : '';


					 idUpdateFactura = nlapiSubmitField( wtype, wid, [ 'custbody_nso_emision_mod_diot', 'custbody_nso_tipo_mod_diot', 'custbody_nso_serie_mod_diot', 
																		  'custbody_nso_folio_mod_diot', 'custbody_nso_rfctaxid_mod_diot', 'custbody_nso_razon_mod_diot', 
																		  'custbody_nso_total_mod_diot', 'custbody_nso_total_cdfi_mod_diot', 'custbody_nso_total_comext_mod_diot', 
																		  'custbody_uuid' ],
					                                                    [ fecha, 'ingreso', serie, folio, rfcEmisor, rSocial, total, total, '0', UUID] );

				} catch ( ex ) {
					nlapiLogExecution( 'ERROR', 'Error while setting values form XML', ex.message );
				}
				
			}

			if ( oldRecordBill && refxmlOld && refxml && ( refxmlOld != refxml ) ) {

				// se actualiza el archivo del campo


				try	{
					nlapiLogExecution( 'DEBUG', 'Loading XML 3', refxml );
					var xmlobj      = nlapiLoadFile( refxml );
					var xmlDocument = nlapiStringToXML( xmlobj.getValue() );

					var Complemento      = nlapiSelectNodes( xmlDocument, "//*[name()='tfd:TimbreFiscalDigital']" );
					var UUID             = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'UUID' ) : '';
					var fecha            = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'FechaTimbrado' ) : '';

					var Emisor      = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Emisor']" );
    				var rSocial   = Emisor [ 0 ] ? ( Emisor[ 0 ].getAttribute( 'Nombre' )  || Emisor[ 0 ].getAttribute( 'Nombre' ) ) : '';
    				var rfcEmisor = Emisor[ 0 ] ? Emisor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';



					var Receptor    = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Receptor']" );
    				var rfcReceptor = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';
    				var nombre     = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Nombre' ) || Emisor[ 0 ].getAttribute( 'Nombre' ) : '';


					var Comprobante = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Comprobante']" );
					var total       = Comprobante[ 0 ] ?  Comprobante[ 0 ].getAttribute( 'total' ) || Comprobante[ 0 ].getAttribute( 'Total' ) : '';
					var serie       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'Serie' ) || Comprobante[ 0 ].getAttribute( 'Serie' ) ) || '' : '';
					var folio       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'folio' ) || Comprobante[ 0 ].getAttribute( 'Folio' ) ) || '' : '';


					 idUpdateFactura = nlapiSubmitField( wtype, wid, [ 'custbody_nso_emision_mod_diot', 'custbody_nso_tipo_mod_diot', 'custbody_nso_serie_mod_diot', 
																		  'custbody_nso_folio_mod_diot', 'custbody_nso_rfctaxid_mod_diot', 'custbody_nso_razon_mod_diot', 
																		  'custbody_nso_total_mod_diot', 'custbody_nso_total_cdfi_mod_diot', 'custbody_nso_total_comext_mod_diot', 
																		  'custbody_uuid' ],
					                                                    [ fecha, 'ingreso', serie, folio, rfcEmisor, rSocial, total, total, '0', UUID] );

				} catch ( ex ) {
					nlapiLogExecution( 'ERROR', 'Error while setting values form XML', ex.message );
				}

			}

			if ( oldRecordBill && !refxmlOld && refxml  ) {

				// se actualiza el archivo del campo

				try	{
					nlapiLogExecution( 'DEBUG', 'Loading XML IF 4', refxml );
					var xmlobj      = nlapiLoadFile( refxml );
					var xmlDocument = nlapiStringToXML( xmlobj.getValue() );

					var Complemento      = nlapiSelectNodes( xmlDocument, "//*[name()='tfd:TimbreFiscalDigital']" );
					var UUID             = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'UUID' ) : '';
					var fecha            = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'FechaTimbrado' ) : '';

					var Emisor      = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Emisor']" );
    				var rSocial   = Emisor [ 0 ] ? ( Emisor[ 0 ].getAttribute( 'Nombre' )  || Emisor[ 0 ].getAttribute( 'Nombre' ) ) : '';
    				var rfcEmisor = Emisor[ 0 ] ? Emisor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';

					var Receptor    = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Receptor']" );
    				var rfcReceptor = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';
    				var nombre     = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Nombre' ) || Emisor[ 0 ].getAttribute( 'Nombre' ) : '';

					var Comprobante = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Comprobante']" );
					var total       = Comprobante[ 0 ] ?  Comprobante[ 0 ].getAttribute( 'total' ) || Comprobante[ 0 ].getAttribute( 'Total' ) : '';
					var serie       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'Serie' ) || Comprobante[ 0 ].getAttribute( 'Serie' ) ) || '' : '';
					var folio       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'folio' ) || Comprobante[ 0 ].getAttribute( 'Folio' ) ) || '' : '';


					 idUpdateFactura = nlapiSubmitField( wtype, wid, [ 'custbody_nso_emision_mod_diot', 'custbody_nso_tipo_mod_diot', 'custbody_nso_serie_mod_diot', 
																		  'custbody_nso_folio_mod_diot', 'custbody_nso_rfctaxid_mod_diot', 'custbody_nso_razon_mod_diot', 
																		  'custbody_nso_total_mod_diot', 'custbody_nso_total_cdfi_mod_diot', 'custbody_nso_total_comext_mod_diot', 
																		  'custbody_uuid' ],
					                                                    [ fecha, 'ingreso', serie, folio, rfcEmisor, rSocial, total, total, '0', UUID] );

				} catch ( ex ) {
					nlapiLogExecution( 'ERROR', 'Error while setting values form XML', ex.message );
				}

			}

			if ( !oldRecordBill ) {

				// no existe un oldRecord

				try	{
					nlapiLogExecution( 'DEBUG', 'Loading XML IF 5 ', refxml );
					var xmlobj      = nlapiLoadFile( refxml );
					var xmlDocument = nlapiStringToXML( xmlobj.getValue() );

					var Complemento      = nlapiSelectNodes( xmlDocument, "//*[name()='tfd:TimbreFiscalDigital']" );
					var UUID             = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'UUID' ) : '';
					var fecha            = Complemento[ 0 ] ? Complemento[ 0 ].getAttribute( 'FechaTimbrado' ) : '';

					var Emisor      = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Emisor']" );
    				var rSocial   = Emisor [ 0 ] ? ( Emisor[ 0 ].getAttribute( 'Nombre' )  || Emisor[ 0 ].getAttribute( 'Nombre' ) ) : '';
    				var rfcEmisor = Emisor[ 0 ] ? Emisor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';

					var Receptor    = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Receptor']" );
    				var rfcReceptor = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Rfc' ) || Emisor[ 0 ].getAttribute( 'Rfc' ) : '';
    				var nombre     = Receptor[ 0 ] ? Receptor[ 0 ].getAttribute( 'Nombre' ) || Emisor[ 0 ].getAttribute( 'Nombre' ) : '';

					var Comprobante = nlapiSelectNodes( xmlDocument, "//*[name()='cfdi:Comprobante']" );
					var total       = Comprobante[ 0 ] ?  Comprobante[ 0 ].getAttribute( 'total' ) || Comprobante[ 0 ].getAttribute( 'Total' ) : '';
					var serie       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'Serie' ) || Comprobante[ 0 ].getAttribute( 'Serie' ) ) || '' : '';
					var folio       = Comprobante[ 0 ] ? ( Comprobante[ 0 ].getAttribute( 'folio' ) || Comprobante[ 0 ].getAttribute( 'Folio' ) ) || '' : '';


					 idUpdateFactura = nlapiSubmitField( wtype, wid, [ 'custbody_nso_emision_mod_diot', 'custbody_nso_tipo_mod_diot', 'custbody_nso_serie_mod_diot', 
																		  'custbody_nso_folio_mod_diot', 'custbody_nso_rfctaxid_mod_diot', 'custbody_nso_razon_mod_diot', 
																		  'custbody_nso_total_mod_diot', 'custbody_nso_total_cdfi_mod_diot', 'custbody_nso_total_comext_mod_diot', 
																		  'custbody_uuid' ],
					                                                    [ fecha, 'ingreso', serie, folio, rfcEmisor, rSocial, total, total, '0', UUID] );

				} catch ( ex ) {
					nlapiLogExecution( 'ERROR', 'Error while setting values form XML', ex.message );
				}
			} 
		}
	}
}
