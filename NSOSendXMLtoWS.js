//=================================================================================================================================
// Script File	 : NSOSendXMLtoWS.js
// Script Type   : library
// Author		 : Ivan Gonzalez - Netsoft
// Date			 : 26-06-2012
// Base			 : McGeever
//=================================================================================================================================

function nsoSendToWS(sAccion, sData1, sData2, wId, wtype, sRequestor, sEntity, sUser, sUserName)
{
	var retval = true;	
	
	var sTransaction = '';
	var sData3 = "";
	
	
	switch (sAccion)
	{
		case 0:
			sTransaction = 'CONVERT_NATIVE_XML';
			break;
		case 1:
			sTransaction = 'CANCEL_DOCUMENT_2';
			break;
		case 2:
			sTransaction = 'GET_MONTHLY_REPORT';
			break;
		case 3:
			sTransaction = 'GET_DOCUMENT';
			break;	
	}
		
	if( sData2 == '' || sData2 == null )
		sData2 = 'XML PDF';

	if(sTransaction == 'GET_DOCUMENT')	
    	sData3 = 'XML PDF';
		
	var uuid = sData1;
		if(sAccion==1){
			sData1 = '<Dictionary name="StoredXmlSelector">';
    		sData1 += '<Entry k="Store" v="iSSuEd"/>';
    		sData1 += '<Entry k="IssuerCountryCode" v="MX"/>';
    		sData1 += '<Entry k="IssuerTaxId" v="'+sEntity+'"/>'
    		sData1 += '<Entry k="DocumentGUID" v="'+uuid+'"/>'
    		sData1 += '<Entry k="Year" v="'+'2018'+'"/>';
			sData1 += '</Dictionary>';
		}
  
	sData1 = sData1.replace(/\&/g,'&amp;');
	sData1 = sData1.replace(/</g,'&lt;');
	sData1 = sData1.replace(/>/g,'&gt;');
	
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
	
	if (sEntity == 'AAA010101AAA')
	
	{var sURL = 'https://www.mysuitetest.com/mx.com.fact.wsfront/factwsfront.asmx';}
	else
	{var sURL = 'https://www.mysuitecfdi.com/mx.com.fact.wsfront/factwsfront.asmx';}
	
	
	
	//var sResponse = nlapiRequestURL( sURL, sXml, headers);
var sResponse = nlapiRequestURL( sURL, sXml, null);
	//----> Obtiene el cuerpo del response
	var valueBody  = sResponse.getBody();
	var xmlResult = null;
	
	
	//----> Valida que el resultado no de mensaje de Error
	
	
	
	if (sAccion != 3)
	{
		retval = nsoValidaResponse(valueBody);
	}
	
	if(retval == true)
	{
		
		
		if(sAccion == 0 || sAccion == 3)
		{
			
			var oXml = '';
			var nodeValue = '';
			oXml = nlapiStringToXML(valueBody);
			//alert ('oXml:  ' , + oXml);
			
			var fields = new Array();
			
			fields[0] = "custbody_cfdixml";
			fields[1] = "custbody_cfdi_pdf";
			
			
					
			var values = new Array();
			nodeValue = nlapiSelectValue(oXml,"//*[name()='ResponseData1']");
			//alert ('nodeValue:  ' , + nodeValue);
			if(nodeValue != null && nodeValue != "")
			{
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
				
				values[0] = values[0].replace(/ÁÂ/g, "Ç");
			}
			values[1] = nlapiSelectValue(oXml,"//*[name()='ResponseData3']");	
			
			
			
			var wrecord = nlapiLoadRecord(wtype, wId);
			
			
			wrecord.setFieldValue("custbody_cfdixml", values[0] );
			wrecord.setFieldValue("custbody_cfdi_pdf", values[1] );
			nlapiSubmitRecord(wrecord);
			
		}
		
		return xmlResult;
	}
	else
	{
		return xmlResult;
	}
}

function nsoValidaResponse(valueBody)
{
	var retval = true;
	var sMsgbox = '';
	
	//alert('valueBody : ' + valueBody);
	//----> Parsea la cadena en XML
	var oXml = nlapiStringToXML(valueBody);
	
	//alert('oXml : ' + oXml);
	//----> Obtiene el valor del nodo especifico
	var sResult  = nlapiSelectValue(oXml,"//*[name()='Result']");
	var sCode    = nlapiSelectValue(oXml,"//*[name()='Code']");
	var sHint    = nlapiSelectValue(oXml,"//*[name()='Hint']");
	var sDescrip = nlapiSelectValue(oXml,"//*[name()='Description']");
	var Data	 = nlapiSelectValue(oXml,"//*[name()='Data']");
	
	
		if( sResult == 'false' )
		{
			sMsgbox += 'Code: ' + sCode + '\n';
			sMsgbox += 'Motivo: ' + sHint + '\n';
			sMsgbox += 'Descripcion: ' + sDescrip + '\n';
			sMsgbox += 'Descripcion: ' + Data + '\n';
			alert('Se ha generado el siguiente mensaje: \n' + sMsgbox);
			retval = false;
		}
	return retval;
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



