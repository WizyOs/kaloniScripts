/*
- NombreArchivo: NSO_formato_poliza_datos_ss.js
- NombreScript: NSO | formato poliza datos
- IdScript: customscript_nso_ss_formato_poliza_datos
- Implementación: customdeploy_nso_ss_formato_poliza_datos
- Descripción: Script Suitelet que obtiene información para la impresión de la poliza
- Autor: Itzadiana Morales Rivera
- Biblioteca: 
- Lenguaje: Javascript
- FechaCreación: 2018/Octubre/17
*/

function obtieneDatosPolizas( request, response ) {

	//Get record in proccess
	var currency  = request.getParameter( 'pcurrency' );
	var filial    = request.getParameter( 'psubsidiary' );

	nlapiLogExecution( 'DEBUG', 'currency', currency );	
	nlapiLogExecution( 'DEBUG', 'filial', filial );	

	var objectGL   = {
		currency   		 : currency, 
		subsidiary 		 : subsidiary,
		currencyname     : null, 
		companyname      : null, 
		filial_vatnumber : null,
		cal_num          : null,
		colonia          : null,
		ciudad           : null,
		codigo_postal    : null,
		razon_social     : null,
		phone            : null,
		idlogo           : null,
		srclogo          : null,
		urlimg           : null,
		approve_tran     : null,
		ismultibook      : null,
		accountingbook   : null,
		revised          : null,
		authorized       : null
	};

	var subsidiary = null;
	var cadena     = '';
	var moneda     = '';
	var srclogo    = '';
	var urlimg     = '';
	var idlogo     = '';

	if ( currency != 'null' && currency != '' && currency != null ) {
		var monedarec  = nlapiLoadRecord( 'currency', currency );
		moneda 		   = monedarec.getFieldValue( 'name' ) ;	
	}

	if ( filial != null && filial != '' ) {
		subsidiary = nlapiLoadRecord( 'subsidiary', filial ); 
	}
			
	if ( subsidiary ) {
		var setup            = SearchSetup( subsidiary );
		var ismultibook      = ( setup ) ? setup.getFieldValue( 'custrecord_setup_is_multibook' ) : null;
		var accountingbook   = ( setup != null && ismultibook == 'T' ) ? setup.getFieldValue( 'custrecord_setup_accountingbook' ) : null;
		var revised          = ( setup ) ? setup.getFieldText( 'custrecord_setup_revised' ) : '';
		var authorized       = ( setup ) ? setup.getFieldText( 'custrecord_setup_authorized' ) : '';
		var companyname		 = isNull( subsidiary.getFieldValue( 'legalname' ) );
		var filial_vatnumber = isNull( subsidiary.getFieldValue( 'federalidnumber' ) );	
		var cal_num 		 = isNull( subsidiary.getFieldValue( 'addr1' ) );
		var colonia 		 = isNull( subsidiary.getFieldValue( 'addr2' ) );
		var ciudad 			 = isNull( subsidiary.getFieldValue( 'city' ) );
		var codigo_postal 	 = isNull( subsidiary.getFieldValue( 'zip' ) );
		var razon_social 	 = isNull( subsidiary.getFieldValue( 'addrtext' ) );
		var phone		 	 = isNull( subsidiary.getFieldValue( 'addrphone' ) );	
		idlogo		         = isNull( subsidiary.getFieldValue( 'pagelogo' ) );
	} 
	else {
		var searchsetup      = nlapiSearchRecord( 'customrecord_setup_contmedelect', null, null, null );
		var setup            = ( searchsetup != null && searchsetup.length > 0 ) ? nlapiLoadRecord( 'customrecord_setup_contmedelect', searchsetup[0].getId() ) : null;
		var ismultibook      = ( setup ) ? setup.getFieldValue( 'custrecord_setup_is_multibook' ) : null;
		var accountingbook   = ( setup != null && ismultibook == 'T' ) ? setup.getFieldValue( 'custrecord_setup_accountingbook' ) : null;
		var revised          = ( setup ) ? setup.getFieldText( 'custrecord_setup_revised' ) : '';
		var authorized       = ( setup ) ? setup.getFieldText( 'custrecord_setup_authorized' ) : '';
		var company          =  nlapiLoadConfiguration( 'companyinformation' );
		var companyname		 = isNull( company.getFieldValue( 'legalname' ) );
		var filial_vatnumber = isNull( company.getFieldValue( 'employerid' ) );
		var cal_num 		 = isNull( company.getFieldValue( 'address1' ) );
		var colonia 		 = isNull( company.getFieldValue( 'address2' ) );
		var ciudad 			 = isNull( company.getFieldValue( 'city' ) );
		var codigo_postal 	 = isNull( company.getFieldValue( 'zip' ) );
		var razon_social 	 = isNull( company.getFieldValue( 'addresstext' ) );
		var phone		 	 = isNull( company.getFieldValue( 'phone' ) );
		idlogo		     = isNull( company.getFieldValue( 'pagelogo' ) );
	}
	
	var config = nlapiLoadConfiguration( 'companyinformation' );
	if ( config ) {
		var logourl = config.getFieldValue( 'pagelogo' );
		if ( logourl )
			srclogo = nlapiLoadFile( logourl ).getURL();
	}
	
	if ( idlogo != null && idlogo != '' ) {
		var getimg = isNull( nlapiLoadFile( idlogo ) );
		urlimg = "https://system.netsuite.com" + getimg.getURL();
		urlimg = urlimg.replace( /\&/g,'&amp;' );
	}

	
	objectGL.currencyname     = moneda; 
	objectGL.companyname      = companyname; 
	objectGL.filial_vatnumber = filial_vatnumber;
	objectGL.cal_num          = cal_num;
	objectGL.colonia          = colonia;
	objectGL.ciudad           = ciudad;
	objectGL.codigo_postal    = codigo_postal;
	objectGL.razon_social     = razon_social;
	objectGL.phone            = phone;
	objectGL.idlogo           = idlogo;
	objectGL.srclogo          = srclogo;
	objectGL.urlimg           = urlimg;
	objectGL.approve_tran     = authorized;
	objectGL.ismultibook      = ismultibook;
	objectGL.accountingbook   = accountingbook;
	objectGL.revised          = revised;
	objectGL.authorized       = authorized;

	cadena = JSON.stringify( objectGL );
	nlapiLogExecution( 'ERROR', 'cadena', cadena );	
	response.write( cadena );
}


function isNull( value ) {
	return ( value == null ) ? '' : value;
}


function nsoIsNull( value, defaul ) {
	return ( value == '' ) ? defaul : value;
}

function SearchSetup( p_subsidiary ) {
	var record = null;

	var filters = new Array();
	filters.push( new nlobjSearchFilter( 'custrecord_setup_subsidiary', null, 'anyof', p_subsidiary ) );

	var searchresults = nlapiSearchRecord( 'customrecord_setup_contmedelect', null, filters, null );

	if ( searchresults != null && searchresults.length > 0 ) {
		record = nlapiLoadRecord( searchresults[ 0 ].getRecordType(), searchresults[ 0 ].getId() );
	}

	return record;
}

