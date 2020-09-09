//=================================================================================================================================
// Script File   : NSOEInvoiceButtonCFDi.js
// Script Type   : User Event
// Description   : Add button on form transaction to send file by MySuite ws
// Author        : Ivan Gonzalez - Netsoft
// Date			 : 09-10-2012
// Base			 : CIMA
//=================================================================================================================================

//--> Before-Load Event

function nsoAddButtonCFDiInvoice(type, form, request)
{
	if(type == 'edit')
	{
		form.addButton("custpage_btnCFDi", "Genera CFDi", "click_cfdi()");
		
		var wid = nlapiGetRecordId();					
		var xtype = nlapiGetRecordType();
		/*var script = "window.location = '" + nlapiResolveURL('SUITELET', 'customscript_kaloni_cfdi_print', 'customdeploy_kaloni_cfdi_print') + '&idinvoice=' + wid +  '&wtype=' + xtype + "';"; 												
		form.addButton('custpage_btnprintcfdi', 'Imprimir CFDi', script);*/
		var url = nlapiResolveURL('SUITELET', 'customscript_kaloni_cfdi_print', 'customdeploy_kaloni_cfdi_print', null);
		url = url + "&idinvoice=" + wid +  "&wtype=" + xtype;												
		form.addButton('custpage_btnprintcfdi', 'Imprimir CFDi', "window.open('"+url+"'); window.opener.location.reload();");
		form.addButton("custpage_btncancelcfd", "Cancelar CFDi", "click_cancelcfd()");
	}
}



//--> On Init-Page
function nsoDoNothing()
{
}

//=================================================================================================================================
// Script File   : NSOEInvoiceButtonCFDi.js
// Script Type   : Client Event
// Description   : Send Text File To MySuite by Web Service
// Author        : Ivan Gonzalez - Netsoft
// Date          : 14-04-2011
//=================================================================================================================================

//--> On Click-Button Event
function click_cfdi()
{
	var id          = nlapiGetFieldValue("id");	
	var wtype       = nlapiGetRecordType();
	var invoice     = nsoGetTranRecord(id);
	var tranid      = invoice.getFieldValue("tranid");
	var subsidiary  = invoice.getFieldValue("subsidiary");
	var location    = invoice.getFieldValue("location");
	var setupcfdi   = nlapiLoadRecord("customrecord_setup_cfdi", 1);
	var oneworld    = setupcfdi.getFieldValue('custrecord_cfdi_oneworld');
	var billforlocation = setupcfdi.getFieldValue('custrecord_cfdi_location_testing');	
	var testing     = setupcfdi.getFieldValue('custrecord_cfdi_testing'); 	
	var setup       = null;
	
	if(oneworld == 'T' ){ 
	
		if(billforlocation == 'T'){
			setup = nlGetSetupRecord(subsidiary, location);
		}
		else {
			setup = nlGetSetupRecord(subsidiary, null);
		}	
	}
	else {
		
		if(billforlocation == 'T'){
			setup = nlGetSetupRecord(null, location);
		}
		else {
			setup = nlGetSetupRecord(null , null);
		}	
	}
	
	if(testing == 'T')	{
		var sRequestor  = setupcfdi.getFieldValue('custrecord_cfdi_testrequestor');
		var sEntity		= setupcfdi.getFieldValue('custrecord_cfdi_entity_testing');
		var sUser 		= setupcfdi.getFieldValue('custrecord_cfdi_testrequestor');	
		var sUserName   = setupcfdi.getFieldValue('custrecordcfdi_username_testing');
	}
	else {	
		var sRequestor  = setup.getFieldValue('custrecord_cfdi_requestor');
		var sEntity		= setup.getFieldValue('custrecord_cfdi_entity');
		var sUser 		= setup.getFieldValue('custrecord_cfdi_user');	
		var sUserName   = setup.getFieldValue('custrecord_cfdi_username');
	}
	
	var path      = setup.getFieldValue('custrecord_cfdi_path') + "\\" + tranid + ".xml";	
	
	var newline   = "[new line]";
	var url       = nlapiResolveURL("SUITELET", "customscript_kaloni_cfdi", "customdeploy_kaloni_cfdi", null) + "&invoiceid=" + id + "&splitter=|&newline=" + newline;	
	var xml       = invoice.getFieldValue("custbody_cfdixml");
	
	if(xml == null || xml == '' )
	{
		var bodytext = "";
		
		try
		{
			var objResponse = nlapiRequestURL(url, null, null, null);
			bodytext =  (objResponse.getBody());
			//bodytext = utf8Encode(bodytext);
			
			
			
		}
		catch(e){
			alert(e.description);
			return;
		}
		
		var text = bodytext.split(newline);	
		/*if(testing == 'T')	{		
		var res = nlCreateTextFileToEInvoice(path, bodytext, newline);}*/
	
		var docXml = nsoSendToWS(0, bodytext, '', id, wtype, sRequestor, sEntity, sUser, sUserName);
		
		//window.location = window.location;
				
		alert("proceso terminado!!");		
	}
	else
	{
		alert('Factura ya enviada al SAT, procese una nueva!');
	}
				
}




function nlCreateTextFileToEInvoice(path, text, newline)
{
	var retval = false;
	
	try
	{
		var objFSO = new NSObjFSO();
		var folder = objFSO.getParentFolderName(path);
		var file   = objFSO.getFileName(path);
		
		if(objFSO.folderExists(folder)){
			if(file != ''){
				nlCreateTextFile(path, text, newline);
				retval = true;
			}
			else{
				alert('Nombre de archivo no especificado!');
			}
		}
		else{
			alert('La ruta especificada no existe!');
		}
	}
	catch(err){
		alert('Error: ' + err.number + ' - ' + err.description);
		var txt = text.replace(/\[new line\]/g, String.fromCharCode(13));
		alert(txt);
	}
	
	return retval;
}


function nlCreateTextFile(path, text, newline)
{
	var fso, f, ts, s;
	var arr_text = text.split(newline);
	fso = new ActiveXObject("Scripting.FileSystemObject");
	fso.createTextFile(path, true);
	f = fso.GetFile(path);
	ts = f.OpenAsTextStream(ForWriting, TristateUseDefault);
	ts.Write(nsoReplace(text, newline, "\r\n"));
	ts.Close( );
	fso = null;
}

function nlGetSetupRecord(subsidiary, location)
{
	var retval  = null;	
	var index   = 0;
	
	var filters = new Array();
	
	if(subsidiary != null && subsidiary != "") {
		filters[index]  = new nlobjSearchFilter("custrecord_cfdi_subsidiary", null, "anyof", subsidiary);
		index += 1;
	}
	
	if(location != null && location != "") {
		filters[index]  = new nlobjSearchFilter("custrecord_cfdi_location", null, "anyof", location);
		index += 1;
	}
		
	var results = nlapiSearchRecord("customrecord_cfdisetup", null, filters, null);	
	
	if(results != null && results.length > 0)
	{
		retval = nlapiLoadRecord(results[0].getRecordType(), results[0].getId()) ;
	}
	else
	{
		var msg = "No se encontr" + String.fromCharCode(243) 
		        + " el registro de configuraci" + String.fromCharCode(243) 
				+ "n de la factura electr" + String.fromCharCode(243) + "nica para la ubicaci" + String.fromCharCode(243) + "n '" + subsidiary_disp + "'";
		throw nlapiCreateError("ERROR", msg, false);
	}
	
	return retval;
}



//=================================================================================================================================
// Script File   : NSOEInvoiceButtonCFDi.js
// Script Type   : Client Event
// Description   : Cancel cfd file
// Author        : Ivan Gonzalez - Netsoft
// Date          : 03-02-2010
// Modifico      : J. Luis Ferrer - Netsoft
// Date          : 26-04-2011
//=================================================================================================================================

//--> On Click-Button Event
function click_cancelcfd()
{
	var wtype       = nlapiGetRecordType();
	var id  = nlapiGetFieldValue('id');
	var invoice = nsoGetTranRecord(id);
	var subsidiary  = invoice.getFieldValue("subsidiary");
	var url         = nlapiResolveURL("SUITELET", "customscript_cancelcfdi", "customdeploy_cancelcfdi", null) + "&pid=" + id;
	var wresponse   = nlapiRequestURL(url, null, null, null);			
	var wbody       = wresponse.getBody();		
	eval(wbody);
	var wfields     = wrkfields;
	var setup	    = nlGetSetupRecord(subsidiary, subsidiary);
	var sRequestor  = setup.getFieldValue('custrecord_cfdi_requestor');
	var sEntity		= setup.getFieldValue('custrecord_cfdi_entity');
	var sUser 		= setup.getFieldValue('custrecord_cfdi_user');	
	var sUserName   = setup.getFieldValue('custrecord_cfdi_username');
	var serie       = isNull(wfields.wSerie);
	var folio       = wfields.wFolio;
	
	
	if(confirm('Esta por Cancelar la Factura No. : ' + folio + ', Desea Continuar?') ==  true)
	{
		/*invoice.setFieldValue('custbody_cancelcfdi', 'T');
		nlapiSubmitRecord(invoice);*/
		
		try
		{			
			var lResult = nsoSendToWS(1, '', folio , id, wtype, sRequestor, sEntity, sUser, sUserName);						
			if (lResult == null || lResult == '')
			{
				nlapiSubmitField(wtype, id, 'custbody_cancelcfdi', 'T');
				alert('Proceso Terminado.');
				//window.location = window.location;
			}	
		}
		catch(e)
		{
			alert(e.description);
			return;
		}
	}
}

//=================================================================================================================================

// Script Type   : User Event, Before Submit Record
// Description 	 : Agrega Monto Anterior en una columna nueva, en el articulo de descuento.
// Author		 : Ivan Gonzalez - Netsoft
// Date			 : 19-10-2011
// Before Submit Function 
//=================================================================================================================================

function Invoice_SetAmount(type)
{
	if(type == "create" || type == "edit")
	{	
		var wid           = nlapiGetNewRecord().getId();
		var wrecord       = nlapiGetNewRecord();
		var wdiscountrate = Math.abs(parseFloat(wrecord.getFieldValue('discountrate')));
		
		for (var j= 1; j <= wrecord.getLineItemCount('item'); j++) 
		{
			var wamount = parseFloat(wrecord.getLineItemValue('item', 'amount', j));
			
			if(wamount < 0)
			{
				var afteramount = wrecord.getLineItemValue('item', 'amount', j-1);
				wrecord.setLineItemValue('item', 'custcol_afteramount', j, afteramount);			
			}
		}
	}
}


function nsoGetTranRecord(id, dynamic)
{
	var itemrecord = null;

	if (id != null && id != "")
	{
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('internalid', null, 'is', id);
		filters[1] = new nlobjSearchFilter('mainline', null, 'is', "T");		
		var searchresults = nlapiSearchRecord('transaction', null, filters, null);
		
		if (searchresults != null && searchresults.length > 0)
		{
			itemrecord = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId(), dynamic == true ? {recordmode:'dynamic'} :  null);
		}
	}
	
	return itemrecord;
}

//===============================================================================================
//it is a private function for internal use in utf8Encode function 

/* UTF8 encoding/decoding functions
 * Copyright (c) 2006 by Ali Farhadi.
 * released under the terms of the Gnu Public License.
 * see the GPL for details.
 *
 * Email: ali[at]farhadi[dot]ir
 * Website: http://farhadi.ir/
 */

//an alias of String.fromCharCode
function chr(code)
{
	return String.fromCharCode(code);
}

//returns utf8 encoded charachter of a unicode value.
//code must be a number indicating the Unicode value.
//returned value is a string between 1 and 4 charachters.
function code2utf(code)
{
	if (code < 128) return chr(code);
	if (code < 2048) return chr(192+(code>>6)) + chr(128+(code&63));
	if (code < 65536) return chr(224+(code>>12)) + chr(128+((code>>6)&63)) + chr(128+(code&63));
	if (code < 2097152) return chr(240+(code>>18)) + chr(128+((code>>12)&63)) + chr(128+((code>>6)&63)) + chr(128+(code&63));
}

//it is a private function for internal use in utf8Encode function 
function _utf8Encode(str)
{	
	var utf8str = new Array();
	for (var i=0; i<str.length; i++) {
		utf8str[i] = code2utf(str.charCodeAt(i));
	}
	return utf8str.join('');
}

//Encodes a unicode string to UTF8 format.
function utf8Encode(str)
{	
	var utf8str = new Array();
	var pos,j = 0;
	var tmpStr = '';
	
	while ((pos = str.search(/[^\x00-\x7F]/)) != -1) {
		tmpStr = str.match(/([^\x00-\x7F]+[\x00-\x7F]{0,10})+/)[0];
		utf8str[j++] = str.substr(0, pos);
		utf8str[j++] = _utf8Encode(tmpStr);
		str = str.substr(pos + tmpStr.length);
	}
	
	utf8str[j++] = str;
	return utf8str.join('');
}

//it is a private function for internal use in utf8Decode function 
function _utf8Decode(utf8str)
{	
	var str = new Array();
	var code,code2,code3,code4,j = 0;
	for (var i=0; i<utf8str.length; ) {
		code = utf8str.charCodeAt(i++);
		if (code > 127) code2 = utf8str.charCodeAt(i++);
		if (code > 223) code3 = utf8str.charCodeAt(i++);
		if (code > 239) code4 = utf8str.charCodeAt(i++);
		
		if (code < 128) str[j++]= chr(code);
		else if (code < 224) str[j++] = chr(((code-192)<<6) + (code2-128));
		else if (code < 240) str[j++] = chr(((code-224)<<12) + ((code2-128)<<6) + (code3-128));
		else str[j++] = chr(((code-240)<<18) + ((code2-128)<<12) + ((code3-128)<<6) + (code4-128));
	}
	return str.join('');
}

//Decodes a UTF8 formated string
function utf8Decode(utf8str)
{
	var str = new Array();
	var pos = 0;
	var tmpStr = '';
	var j=0;
	while ((pos = utf8str.search(/[^\x00-\x7F]/)) != -1) {
		tmpStr = utf8str.match(/([^\x00-\x7F]+[\x00-\x7F]{0,10})+/)[0];
		str[j++]= utf8str.substr(0, pos) + _utf8Decode(tmpStr);
		utf8str = utf8str.substr(pos + tmpStr.length);
	}
	
	str[j++] = utf8str;
	return str.join('');
}




function _utf8Encode(str)
{	
	var utf8str = new Array();
	for (var i=0; i<str.length; i++) {
		utf8str[i] = code2utf(str.charCodeAt(i));
	}
	return utf8str.join('');
}


function nsoReplace(texto,s1,s2){
	return texto.split(s1).join(s2);
}

function isNull(value) {
    return (value == null) ? '' : value;
}