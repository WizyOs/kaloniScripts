/**
 * Suitelet that changes the PO Form Type
 */
function crearPDFXML(request, response)
{
  	var id = request.getParameter('paramInCoPDFnc');
  	nlapiLogExecution('AUDIT', 'SL| Value request id parameter: ', id);

	var ncRecord = nlapiLoadRecord('creditmemo', id);
	var sl_pdf = ncRecord.getFieldValue('custbody70'); // PDF (NC_CO):
  	var sl_xml = ncRecord.getFieldValue('custbody71'); // XML (NC_CO):
  	var sl_localFiletxt = ncRecord.getFieldValue('custbody62'); // LOCAL_FILE_TXT (NC_CO):
  	//var textentity = ncRecord.getFieldText('entity');
	var valresponse = "";
  	var urlFilePDF = "";
  	var urlFileXML = "";
  	var nodefin = sl_localFiletxt.indexOf(".txt");

		// *************** PDF *****************
 if((sl_pdf == "" || sl_pdf == null) && (nodefin != "" || nodefin != null))
 {
        var valtxt = sl_localFiletxt.substring(0, nodefin);
     	var fileNameArray = valtxt.split("_");
     	var invoicefileName = fileNameArray[1];
     	//invoicefileName = getOnlyNum(invoicefileName);
     	var daykeyfileName = fileNameArray[2];
     	//var hourkeyfileName = fileNameArray[3];
     	var docID = getDocAutorization(invoicefileName);
   		//var findVal = docID.indexOf("AUTORIZADO Ok size:");
 		var findVal = docID.substring(0,19);
   		nlapiLogExecution('ERROR', 'SL| getDocAutorization(invoicefileName) findVal: ', findVal);
   		if(findVal == "AUTORIZADO Ok size:")
        {
          valresponse = createSOAPpdf(invoicefileName);
   		  nlapiLogExecution('ERROR', 'SL| createSOAPpdf(invoicefileName) invoicefileName = nameto:', invoicefileName);
          nlapiLogExecution('ERROR', 'SL| createSOAPpdf(invoicefileName) valresponse: ', valresponse);
          var mesfolder = daykeyfileName.substring(2,4);
   		  mesfolder = getMesFolder(mesfolder);
   		  //var valerr = valresponse.indexOf("Error");
   		  var valerr = valresponse.substring(0,6);
		  //var valpdf = valresponse.indexOf(".pdf|");
		  var valpdf = valresponse.substring(0,7);
          if(valerr == "Error ")
       	  {
          	nlapiLogExecution('ERROR', 'SL| soapPDF response: ', 'Respuesta SOAP con Error!! : ' + valresponse);
          }else if(valpdf == "NC-COL-"){
          nlapiLogExecution('AUDIT', 'SL| soapPDF response: ', 'Respuesta SOAP correcta!! : ' + valresponse);
          var fileAndBase64Array = valresponse.split("|");
          var fileNameResponse = fileAndBase64Array[0];
          var base64Response = fileAndBase64Array[1];
          try{
                var newFile = nlapiCreateFile(fileNameResponse, 'PDF', base64Response);
                newFile.setFolder(mesfolder); // SuiteScripts > ScriptFactory > Notas Crédito CO TXT > PDF y XML > 2019 >
                //newFile.setEncoding('UTF-8');
                var fileId = nlapiSubmitFile(newFile);

                var newfilePDF = nlapiLoadFile(fileId);
                urlFilePDF = newfilePDF.getURL();
            }catch(e){
              var er = e
              nlapiLogExecution('ERROR', 'SL| *** PDF *** catch(e): ', er);
            }
        }else{
          nlapiLogExecution('ERROR', 'SL| soapPDF response: ', 'Respuesta SOAP no controlada!! : ' + valresponse);
        }
	}
    else
    {
      nlapiLogExecution('ERROR', 'SL| getDocAutorization(invoicefileName) response: ', 'Documento no Autorizado!!');
    }
 }
		// *************** XML *****************
/*
 if((sl_xml == "" || sl_xml == null) && (nodefin != "" || nodefin != null))
 {
        var valtxt = sl_localFiletxt.substring(0, nodefin);
     	var fileNameArray = valtxt.split("_");
     	var invoicefileName = fileNameArray[1];
     	invoicefileName = getOnlyNum(invoicefileName);
     	var daykeyfileName = fileNameArray[2];
     	//var hourkeyfileName = fileNameArray[3];
		valresponse = createSOAPxml(invoicefileName);
   		nlapiLogExecution('AUDIT', 'SL| createSOAPxml(invoicefileName) invoicefileName = nameto:', invoicefileName);

   		var mesfolder = daykeyfileName.substring(2,4);
   		mesfolder = getMesFolder(mesfolder);
   		var valerr = valresponse.indexOf("Error");
		var valxml = valresponse.indexOf(".xml|");
     	if(valerr !== "" || valerr !== null)
        {
          	nlapiLogExecution('ERROR', 'SL| soapXML response: ', 'Respuesta SOAP con Error!! : ' + valresponse);
        }else if(valxml !== "" || valxml !== null){
          nlapiLogExecution('AUDIT', 'SL| soapXML response: ', 'Respuesta SOAP correcta!! : ' + valresponse);
          var fileAndBase64Array = valresponse.split("|");
          var fileNameResponse = fileAndBase64Array[0];
          var base64Response = fileAndBase64Array[1];
          try{
            	var decryptedValue = nlapiDecrypt(base64Response, 'base64');
                var newFile = nlapiCreateFile(fileNameResponse, 'XMLDOC', decryptedValue);
                newFile.setFolder(mesfolder); // SuiteScripts > ScriptFactory > Notas Crédito CO TXT > PDF y XML > 2019
                //newFile.setEncoding('UTF-8');
                var fileId = nlapiSubmitFile(newFile);

                var newfileXML = nlapiLoadFile(fileId);
                urlFileXML = newfileXML.getURL();
            }catch(e){
              var er = e
              nlapiLogExecution('ERROR', 'SL| *** XML *** catch(e): ', er);
            }
        }else{
          nlapiLogExecution('ERROR', 'SL| soapXML response: ', 'Respuesta SOAP no controlada!! : ' + valresponse);
        }
 }
*/
  if(urlFilePDF != "" && urlFileXML != ""){
       ncRecord.setFieldValue('custbody70', urlFilePDF);
       ncRecord.setFieldValue('custbody71', urlFileXML);
       nlapiSubmitRecord(ncRecord, false, true);
       nlapiLogExecution('AUDIT', 'SL| crearPDFXML(): ', 'Credit Memo redirecting (PDF-ok | XML-ok)...');
       nlapiSetRedirectURL('RECORD', 'creditmemo', id, false);
     }else if(urlFilePDF != "" && urlFileXML == ""){
       ncRecord.setFieldValue('custbody70', urlFilePDF);
       nlapiSubmitRecord(ncRecord, false, true);
       nlapiLogExecution('AUDIT', 'SL| crearPDFXML(): ', 'Credit Memo redirecting (PDF-ok | XML-notok)...');
       nlapiSetRedirectURL('RECORD', 'creditmemo', id, false);
      }else if(urlFilePDF == "" && urlFileXML != ""){
       ncRecord.setFieldValue('custbody71', urlFileXML);
       nlapiSubmitRecord(ncRecord, false, true);
       nlapiLogExecution('AUDIT', 'SL| crearPDFXML(): ', 'Credit Memo redirecting (PDF-notok | XML-ok)...');
       nlapiSetRedirectURL('RECORD', 'creditmemo', id, false);
      }else if(urlFilePDF == "" && urlFileXML == ""){
       nlapiLogExecution('AUDIT', 'SL| crearPDFXML(): ', 'Credit Memo redirecting (PDF-notok | XML-notok)...');
       nlapiSetRedirectURL('RECORD', 'creditmemo', id, false);
      }
}

function getDocAutorization(nameDoc){
  var xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:miserviciowsdl">';
  xml += '<soapenv:Header/>';
  xml += '<soapenv:Body>';
  xml += '<urn:MiFuncion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
  xml += '<miparametro xsi:type="xsd:string">' + nameDoc + '</miparametro>';
  xml += '</urn:MiFuncion>';
  xml += '</soapenv:Body>';
  xml += '</soapenv:Envelope>';

      //Set up Headers
    var headers = new Array();
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = 'https://efactory-kaloni.com/SENDWA/WebServiceSOAP/server.php/MiFuncion';
	var url = 'https://efactory-kaloni.com:443/SENDWA/WebServiceSOAP/server.php';
    var resp = null;
    if (xml)  {
    	// blindly re-try upon error
    	try{
    		resp = nlapiRequestURL(url, xml, headers);
    	}catch(e){
    		resp = nlapiRequestURL(url, xml, headers);
    	}
    }
  	else{
    	resp = nlapiRequestURL(url, null , headers);
    }

	var bodyResp = resp.getBody();
  	var respp = "";
  	nlapiLogExecution('ERROR', 'SL| response: bodyResp', bodyResp);
  	if(bodyResp.indexOf("<return xsi:type=") != "" && bodyResp.indexOf("<return xsi:type=") != null)
    {
        var nodePosition = bodyResp.indexOf("<return xsi:type=");
        var nodePositionfin = bodyResp.indexOf("</return>");
        respp = bodyResp.substring(nodePosition+30, nodePositionfin);
        nlapiLogExecution('ERROR', 'SL| function getDocAutorization(nameDoc)* node <return xsi:type="xsd:string"> response: ', respp);
    }
  	else
    {
        respp = "Error ";
        respp += bodyResp;
    }
  	return respp;
}

function createSOAPpdf(nameto)
{
  var respSOAP = null;
  var xml = '<?xml version="1.0" encoding="utf-8"?>';
      xml += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
      xml += '<soap:Body>';
      xml += '<FindNamePDF xmlns="https://devkaloni.com">';
      xml += '<nametofind>' + nameto + '</nametofind>';
      xml += '<serverAndfilepath>api.stupendo.co/900852763/900852763/ENVIADOS/PDF/</serverAndfilepath>';
      xml += '<user>usrKaloni</user>';
      xml += '<pass>{8>xF=N*</pass>';
      xml += '</FindNamePDF>';
      xml += '</soap:Body>';
      xml += '</soap:Envelope>';
      var bodyResp = invoke_ws(xml, 'PDF');

	  if(bodyResp.indexOf("<FindNamePDFResult>") != "" && bodyResp.indexOf("<FindNamePDFResult>") != null){
        var nodePosition = bodyResp.indexOf("<FindNamePDFResult>");
        var nodePositionfin = bodyResp.indexOf("</FindNamePDFResult>");
        var respp = bodyResp.substring(nodePosition+19, nodePositionfin);
        respSOAP = respp;
        nlapiLogExecution('AUDIT', 'SL| function createSOAPpdf(nameto)* node <FindNamePDFResult> response: ', respSOAP);
      }else if(bodyResp.indexOf("<faultcode>") != "" && bodyResp.indexOf("<faultcode>") != null){
        nlapiLogExecution('ERROR', 'SL| function createSOAPpdf(nameto)* if bodyResp.indexOf(<faultcode>) result: ', bodyResp.indexOf('<faultcode>'));
        var nodePosition = bodyResp.indexOf("<faultcode>");
        var nodePositionfin = bodyResp.indexOf("</faultstring>");
        var respp = bodyResp.substring(nodePosition+11, nodePositionfin);
        respSOAP = "Error ";
        respSOAP += respp;
        nlapiLogExecution('ERROR', 'SL| function createSOAPpdf(nameto)* node <faultcode> response (Error): ', respSOAP);
      }else{
        respSOAP = "Error ";
        respSOAP += bodyResp;
        nlapiLogExecution('ERROR', 'SL| function createSOAPpdf(nameto)* else respSOAP = Error: ', respSOAP);
      }
  return respSOAP;
}

function createSOAPxml(nameto)
{
  var respSOAP = null;
  var xml = '<?xml version="1.0" encoding="utf-8"?>';
      xml += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
      xml += '<soap:Body>';
      xml += '<FindNameXML xmlns="https://devkaloni.com">';
      xml += '<nametofind>' + nameto + '</nametofind>';
      xml += '<serverAndfilepath>api.stupendo.co/900852763/900852763/ENVIADOS/XML/</serverAndfilepath>';
      xml += '<user>usrKaloni</user>';
      xml += '<pass>{8>xF=N*</pass>';
      xml += '</FindNameXML>';
      xml += '</soap:Body>';
      xml += '</soap:Envelope>';
      var bodyResp = invoke_ws(xml, 'XML');

	  if(bodyResp.indexOf("<FindNameXMLResult>") != "" && bodyResp.indexOf("<FindNameXMLResult>") != null){
        var nodePosition = bodyResp.indexOf("<FindNameXMLResult>");
        var nodePositionfin = bodyResp.indexOf("</FindNameXMLResult>");
        var respp = bodyResp.substring(nodePosition+19, nodePositionfin);
        respSOAP = respp;
        nlapiLogExecution('AUDIT', 'SL| function createSOAPxml(nameto)* node <FindNameXMLResult> response: ', respSOAP);
      }else if(bodyResp.indexOf("<faultcode>") != "" && bodyResp.indexOf("<faultcode>") != null){
        nlapiLogExecution('ERROR', 'SL| function createSOAPxml(nameto)* if bodyResp.indexOf(<faultcode>) result: ', bodyResp.indexOf('<faultcode>'));
        var nodePosition = bodyResp.indexOf("<faultcode>");
        var nodePositionfin = bodyResp.indexOf("</faultstring>");
        var respp = bodyResp.substring(nodePosition+11, nodePositionfin);
        respSOAP = "Error ";
        respSOAP += respp;
        nlapiLogExecution('ERROR', 'SL| function createSOAPxml(nameto)* node <faultcode> response (Error): ', respSOAP);
      }else{
        respSOAP = "Error ";
        respSOAP += bodyResp;
        nlapiLogExecution('ERROR', 'SL| function createSOAPxml(nameto)* else respSOAP = Error: ', respSOAP);
      }
  return respSOAP;
}

function invoke_ws(xml, paramId)
{
  var soapAction = "";
  if(paramId == "PDF")
    soapAction = 'https://devkaloni.com/FindNamePDF';
  else
    soapAction = 'https://devkaloni.com/FindNameXML';

    var headers = new Array();
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = soapAction;
	var url = 'https://devkaloni.com/WS/WSconnect_ftp.asmx';
    var resp = null;
    if(xml)
    {
    	try
        {
    		resp = nlapiRequestURL(url, xml, headers);
    	}
      	catch(e)
        {
    		resp = nlapiRequestURL(url, xml, headers);
    	}
    }
    return resp.getBody();
}

function getOnlyNum(textParam)
{
  var res = '';
  var i      = 0;
  try
  {
      while(i<textParam.length)
      {
        var text = textParam[i];
         if(text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9)
         {
           res += text;
         }
         i++;
 	  }
  }
  catch(e){
    var vale = e;
    nlapiLogExecution('ERROR', 'SL| function getOnlyNum(textParam) catch(e): ', vale);
  }
  return res;
}

function getMesFolder(mesRef){
  var folderId = "";
  if(mesRef == "03")
    folderId = "1308283";
  if(mesRef == "04")
    folderId = "1308284";
  if(mesRef == "05")
    folderId = "1308285";
  if(mesRef == "06")
    folderId = "1308286";
  if(mesRef == "07")
    folderId = "1308287";
  if(mesRef == "08")
    folderId = "1308288";
  if(mesRef == "09")
    folderId = "1308289";
  if(mesRef == "10")
    folderId = "1308290";
  if(mesRef == "11")
    folderId = "1308291";
  if(mesRef == "12")
    folderId = "1308292";

  nlapiLogExecution('AUDIT', 'SL| function getMesFolder(mesRef): mes|folderId', mesRef + "|" + folderId);
  return folderId;
}