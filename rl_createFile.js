function getCamp(){
  var xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:miserviciowsdl">';
  xml += '<soapenv:Header/>';
  xml += '<soapenv:Body>';
  xml += '<urn:MiFuncion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
  xml += '<miparametro xsi:type="xsd:string">Testing</miparametro>';
  xml += '</urn:MiFuncion>';
  xml += '</soapenv:Body>';
  xml += '</soapenv:Envelope>';
  var bodyResp = invoke_ws(xml);
  nlapiLogExecution('AUDIT', 'RL| invoke_ws(xml) response:', bodyResp);
  return bodyResp;
  /*
  var nodePosition = bodyResp.indexOf("CargarTxtResult");
  var nodePositionfin = bodyResp.indexOf("</CargarTxtResult");
  var respp = bodyResp.substring(nodePosition+16, nodePositionfin); // nodePosition+49
  */

    /*var newFile = nlapiCreateFile('test.pdf', 'PDF', '');
    newFile.setFolder('1133040');
    //newFile.setEncoding('UTF-8');
    var fileId = nlapiSubmitFile(newFile);
  	return fileId;*/
}

function invoke_ws(xml){
    //Set up Headers
    var headers = new Array();
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = 'https://efactory-kaloni.com/SENDWA/WebServiceSOAP/server.php/MiFuncion';
	var url = 'https://efactory-kaloni.com:443/SENDWA/WebServiceSOAP/server.php'; // http://184.106.39.67/ServicioCargaTxtColombia/WebServiceReceptaProceso.asmx
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
    return resp.getBody();
}

function getCampp(){
    var newArray = [];
  	var lead_cam = get_lead_cam();
    newArray.push(lead_cam);
  	//var agendada_cam = get_agendada_cam();
    //newArray.push(agendada_cam);
  	return newArray;
}

function get_lead_cam(){
  /* Load a summary search */
  var primaryArray = [];
  var search = nlapiLoadSearch('Customer', 5631);
  var resultSet = search.runSearch();
  var results = resultSet.getResults(0, 1000);
  for ( var i = 0; results != null && i < results.length; i++ ){
       var searchresult = results[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);

 	   /*var columns = searchresult.getAllColumns();
        var columns0 = searchresult.getValue(columns[0]);
        nlapiLogExecution('DEBUG', 'columns0: ', columns0);
    	cont++;*/
	}

  var results1 = resultSet.getResults(1000, 2000);
  for ( var i = 0; results1 != null && i < results1.length; i++ ){
       var searchresult = results1[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);
	}

  var results2 = resultSet.getResults(2000, 3000);
  for ( var i = 0; results2 != null && i < results2.length; i++ ){
       var searchresult = results2[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);
	}

  var results3 = resultSet.getResults(3000, 4000);
  for ( var i = 0; results3 != null && i < results3.length; i++ ){
       var searchresult = results3[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);
	}

  var result = getCountvalues(primaryArray);
  return result; // retorna un array
}

function getCamp1(){ //get_agendada_cam
  /* Load a summary search */
  var primaryArray = [];
  var search = nlapiLoadSearch('Customer', 5637);
  var resultSet = search.runSearch();
  var results = resultSet.getResults(0, 1000);
  for ( var i = 0; results != null && i < results.length; i++ ){
       var searchresult = results[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       return jsonString;
       var obj = JSON.parse(jsonString);
	   /*var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);*/
	}

  var result = getCountvalues(primaryArray);
  return result; // retorna un array
}

function getCountvalues(valArray){
  	var arrayResult = [];
    var  countResults = {};
  	var sumGlobal = 0;

    valArray.forEach(function(i) { countResults[i] = (countResults[i]||0) + 1;});

	Object.keys(countResults).forEach(function(k){
        var val = k + '=' + countResults[k];
/*
        if(k == "00166 Campaña Facebook Mx" || k == "00167 Campaña Google Mx" || k == "00168 Campaña OFF-LINE"){
             arrayResult.push(val);
             nlapiLogExecution('AUDIT', 'RL| val result: ', JSON.stringify(val));
             sumMX += countResults[k];
        }else{
			sumOtras += countResults[k];
        }*/
      arrayResult.push(val);
      nlapiLogExecution('AUDIT', 'RL| val result: ', JSON.stringify(val));
      sumGlobal += countResults[k];
	});
	//arrayResult.push("Otras Campañas="+sumOtras);
  	arrayResult.push("Total Campañas="+sumGlobal);
    return arrayResult; // countResults
}
