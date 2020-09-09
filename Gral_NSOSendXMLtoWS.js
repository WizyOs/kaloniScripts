//=================================================================================================================================
// Script File	 : Gral_NSOSendXMLtoWS.js
// Script Type   : library
// Author		 : Ivan Gonzalez - Netsoft
// Date			 : 29-04-2015
// Base			 : McGeever
//=================================================================================================================================

function nsoSendToWS(sAccion, sData1, sData2, wId, wtype, sRequestor, sEntity, sUser, sUserName, path)
{
	var retval       = true;	
	var sTransaction = '';
	var sData3       = "";
	var IdXMLBody    = isNull(nlapiGetContext().getSetting('SCRIPT', 'custscript_idxml_field_cli'));
	var IdPDFBody    = isNull(nlapiGetContext().getSetting('SCRIPT', 'custscript_idpdf_field_cli'));
	switch (sAccion){
		case 0:
			sTransaction = 'CONVERT_NATIVE_XML';
			break;
		case 1:
			sTransaction = 'CANCEL_XML';
			break;
		case 2:
			sTransaction = 'GET_MONTHLY_REPORT';
			break;
		case 3:
			sTransaction = 'GET_DOCUMENT';
			break;
		case 4:
			sTransaction = 'VALIDATE_DOCUMENT';
			break;	
		case 5:
			sTransaction = 'LOOKUP_ISSUED_INTERNAL_ID';
			break;	
		case 6:
			sTransaction = 'RETRIEVE_DOCUMENT';
			break;	
	}
	
	if(sTransaction == 'GET_DOCUMENT' || sTransaction == 'RETRIEVE_DOCUMENT')	{
    	sData3 = 'XML PDF';
	}
	if (sData1){	
		sData1 = sData1.replace(/\&/g,'&amp;');
		sData1 = sData1.replace(/</g,'&lt;');
		sData1 = sData1.replace(/>/g,'&gt;');
	}
	
	var sXml = '';
	sXml += '<?xml version=\"1.0\" encoding=\"utf-8\"?> ';
	sXml += '<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> ';
	sXml += '<soap:Body> ';
	sXml += '<RequestTransaction xmlns=\"http://www.fact.com.mx/schema/ws\"> ';
	sXml += '<Requestor>' + sRequestor + '</Requestor> ';
	sXml += '<Transaction>' + sTransaction + '</Transaction> ';
	sXml += '<Country>MX</Country> ';
	sXml += '<Entity>' + sEntity + '</Entity> ';
	sXml += '<User>' + sUser + '</User> ';
	sXml += '<UserName>' + sUserName + '</UserName> ';
	sXml += '<Data1>' + sData1 + '</Data1> ';
	sXml += '<Data2>' + sData2 + '</Data2> ';
	sXml += '<Data3>' + sData3 + '</Data3> ';
	sXml += '</RequestTransaction> ';
	sXml += '</soap:Body> ';
	sXml += '</soap:Envelope> ';
	
	
	var headers = new Array();
	headers['Content-Type']   = 'text/xml; charset=utf-8';
	headers['Content-Length'] = '"' + sXml.length + '"';
	headers['SOAPAction']     = 'http://www.fact.com.mx/schema/ws/RequestTransaction';
	
	
	try{
		if (sEntity == 'AAA010101AAA'){
			var sURL = 'https://www.mysuitetest.com/mx.com.fact.wsfront/factwsfront.asmx';
		}
		else{
			var sURL = 'https://www.mysuitecfdi.com/mx.com.fact.wsfront/factwsfront.asmx';
		}
		if (sEntity == 'AAA010101AAA'){
			//sXml = utf8_encode(sXml)
			var valueBody =  consume_api(sData1, sURL, sRequestor, sTransaction, sEntity, sUser, sUserName, sData2, sData3);
			//var valueBody  = sResponse.getBody();	
		}
		else{
			var sResponse = nlapiRequestURL( sURL, sXml, headers);
			var valueBody  = sResponse.getBody();
		}
		//----> Obtiene el cuerpo del response
		
		var xmlResult = null;
	}
	catch (ex)
	{
		nlapiLogExecution('ERROR', ex instanceof nlobjError ? ex.getCode() : "CUSTOM_ERROR_CODE",
				ex instanceof nlobjError ? ex.getDetails() : 'JavaScript Error: ' + (ex.message != null ? ex.message : ex));
	}
	//----> Valida que el resultado no de mensaje de Error
	if (sAccion != 3){
		retval = nsoValidaResponse(valueBody);
	}
	if(retval == true){
		if (sAccion == 5 ){
			var oXml = '';
			var nodeValue = '';
			oXml = nlapiStringToXML(valueBody);
			var retval    = nlapiSelectValue(oXml,"//*[name()='ResponseData1']");
			if (retval > 0){ 
				var values = new Array();
				nodeValue = nlapiSelectValue(oXml,"//*[name()='ResponseData2']");
				if(nodeValue != null && nodeValue != ""){
					var valXMl = decode64(nodeValue);
					valXMl = valXMl.replace(/\n/g, "");
					valXMl = nlapiStringToXML(valXMl);
					var uuid = nlapiSelectValue(valXMl,"//*[name()='uuid']");
					var batch  = nlapiSelectValue(valXMl,"//*[name()='batch']");
					var serial = nlapiSelectValue(valXMl,"//*[name()='serial']");
					if ( batch != null && batch != '' && serial != null && batch != ''){
						xmlResult = batch+'-'+serial;
					}
				}
			}
		}
		if(sAccion == 0 || sAccion == 3 || sAccion == 6)
		{
			var oXml      = '';
			var nodeValue = '';
			oXml          = nlapiStringToXML(valueBody);
			var values    = new Array();
			nodeValue     = nlapiSelectValue(oXml,"//*[name()='ResponseData1']");
			
			if(nodeValue != null && nodeValue != ""){
				values[0] = decode64(nodeValue);
				values[0] = values[0].replace(/Ã¡/g, "á");
				values[0] = values[0].replace(/Ã©/g, "é");
				values[0] = values[0].replace(/Ã­/g, "í");
				values[0] = values[0].replace(/Ã³/g, "ó");
				values[0] = values[0].replace(/Ãº/g, "ú");
				
				values[0] = values[0].replace(/Ã/g, "Á");
				values[0] = values[0].replace(/ Á/g, "É");
				values[0] = values[0].replace(/Á/g, "Í");
				values[0] = values[0].replace(/Á/g, "Ó");
				values[0] = values[0].replace(/Á/g, "Ú");
				
				values[0] = values[0].replace(/Á±/g, "ñ");
				values[0] = values[0].replace(/Á/g, "Ñ");
				
				values[0] = values[0].replace(/ÁÂ¤/g, "ä");
				values[0] = values[0].replace(/ÁÂ«/g, "ë");
				values[0] = values[0].replace(/ÁÂ¯/g, "ï");
				values[0] = values[0].replace(/ÁÂ¶/g, "ö");
				values[0] = values[0].replace(/ÁÂ¼/g, "ü");
				
				//values[0] = values[0].replace(/Á/g, "Ä");
				//values[0] = values[0].replace(/É/g, "Ë");
				//values[0] = values[0].replace(/Á/g, "Ï");
				//values[0] = values[0].replace(/Ó/g, "Ö");
				//values[0] = values[0].replace(/Ú/g, "Ü");
				
				values[0] = values[0].replace(/Â©/g, "©");
				values[0] = values[0].replace(/Â®/g, "®");
				values[0] = values[0].replace(/Â/g, "™");
				values[0] = values[0].replace(/ÁÂ/g, "Ø");
				values[0] = values[0].replace(/Âª/g, "ª");
				values[0] = values[0].replace(//g, "%");
				values[0] = values[0].replace(/ÁÂ/g, "Ç");
				try{
					if (values[0] != null && values[0] != ''){
					nlapiSubmitField(wtype, wId, IdXMLBody,  values[0] );
					}
				}
				catch(ex){
					nlapiLogExecution('ERROR', ex instanceof nlobjError ? ex.getCode() : "CUSTOM_ERROR_CODE",
				ex instanceof nlobjError ? ex.getDetails() : 'JavaScript Error: ' + (ex.message != null ? ex.message : ex));
				}
			}//end if(nodeValue != null && nodeValue != ""){
				
			values[1] = nlapiSelectValue(oXml,"//*[name()='ResponseData3']");	
			
			if (values[1] != null && values[1] != ''){
				try{
				nlapiSubmitField(wtype, wId, IdPDFBody, values[1] );}
				catch(ex){
					nlapiLogExecution('ERROR', ex instanceof nlobjError ? ex.getCode() : "CUSTOM_ERROR_CODE",
				ex instanceof nlobjError ? ex.getDetails() : 'JavaScript Error: ' + (ex.message != null ? ex.message : ex));
				}
			}
		}//end if(sAccion == 0 || sAccion == 3)
		
		return xmlResult;
	}
	else{
		xmlResult = nsoValidaResponseError(valueBody);
		return xmlResult;
	}
}

function nsoValidaResponseError(valueBody)
{
	var retval = '';
	var oXml = nlapiStringToXML(valueBody);
	retval	 = nlapiSelectValue(oXml,"//*[name()='Data']");
	return retval;
}


function nsoValidaResponse(valueBody)
{
	var retval  = true;
	var sMsgbox = '';
	var oXml    = nlapiStringToXML(valueBody);
	var sResult  = nlapiSelectValue(oXml,"//*[name()='Result']");
	var sDescrip = nlapiSelectValue(oXml,"//*[name()='Description']");
	var Data	 = nlapiSelectValue(oXml,"//*[name()='Data']");
	
	if( sResult == 'false' ){
		sMsgbox += 'Descripcion: ' + Data + '\n';
		alert('Se ha generado el siguiente mensaje: \n' + sMsgbox);
		retval = false;
	}
	return retval;
}

function nsoValidaExiste(valueBody)
{
	var retval = 0;
	var oXml = nlapiStringToXML(valueBody);
	var retval    = nlapiSelectValue(oXml,"//*[name()='ResponseData1']");
	
	return retval;
}


function consume_api(Data1, sURL, sRequestor, sTransaction, sEntity, sUser, sUserName, Data2, Data3){

	var xmlhttp = new XMLHttpRequest();;
	
	/*if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject('MSXML2.XMLHTTP.3.0');
	}*/
	Data1 = utf8_encode(Data1);

	var sXml = '';
	sXml += '<?xml version=\"1.0\" encoding=\"utf-8\"?> ';
	sXml += '<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> ';
	sXml += '<soap:Body> ';
	sXml += '<RequestTransaction xmlns=\"http://www.fact.com.mx/schema/ws\"> ';
	sXml += '<Requestor>' + sRequestor + '</Requestor> ';
	sXml += '<Transaction>' + sTransaction + '</Transaction> ';
	sXml += '<Country>MX</Country> ';
	sXml += '<Entity>' + sEntity + '</Entity> ';
	sXml += '<User>' + sUser + '</User> ';
	sXml += '<UserName>' + sUserName + '</UserName> ';
	sXml += '<Data1>' + Data1 + '</Data1> ';
	sXml += '<Data2>' + Data2 + '</Data2> ';
	sXml += '<Data3>' + Data3+ '</Data3> ';
	sXml += '</RequestTransaction> ';
	sXml += '</soap:Body> ';
	sXml += '</soap:Envelope> ';
	
	xmlhttp.open("POST", sURL ,false);

	xmlhttp.setRequestHeader("Content-Type", "text/xml");
	xmlhttp.send(sXml);
	var res = xmlhttp.responseText;
	return res;
}



//--------------------------------------------------------------------------------------------------------------------
//Function
//Description: convert base64 Encoding/Decoding
//--------------------------------------------------------------------------------------------------------------------

var keyStr = "ABCDEFGHIJKLMNOP" +
               "QRSTUVWXYZabcdef" +
               "ghijklmnopqrstuv" +
               "wxyz0123456789+/" +
               "=";

  function encode64(input) {
     input = escape(input);
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
           enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
           enc4 = 64;
        }

        output = output +
           keyStr.charAt(enc1) +
           keyStr.charAt(enc2) +
           keyStr.charAt(enc3) +
           keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);

     return output;
  }

  function decode64(input) {
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

     } while (i < input.length);

     return unescape(output);
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

function isNull(value) {
    return (value == null) ? '' : value;
}


