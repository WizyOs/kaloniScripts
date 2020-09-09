/**
 * Suitelet that changes the PO Form Type
 */
function crearNcCo(request, response)
{
  	var id = request.getParameter('paramNcCo');
  	nlapiLogExecution('AUDIT', 'crearNcCo: ', 'SL| Value request id parameter: ' + id);
  	var fields = id.split('_');
      var idparam = fields[0];
      var items = fields[1];
	  nlapiLogExecution('ERROR', 'SL| items: ', items);
      var indices = [];
      for(var i = 0; i < items.length; i++) {
          if (items[i] === "|") indices.push(i);
      }
      var valll = indices.length;
      nlapiLogExecution('ERROR', 'SL| valll: ', valll);

    var containsBR = false;
    var arrayItems = null;
    try{
      if(valll > 9)
      containsBR = true;
    }
    catch(error){
      nlapiLogExecution('ERROR', 'SL| function crearNcCo() catch(error): ', error);
    }

	if(containsBR){
      	nlapiLogExecution('AUDIT', 'SL| function crearNcCo() items: ', items);
  		arrayItems = items.split("<br>");
    }else{
      var newArray = [];
      newArray.push(items);
      arrayItems = newArray;
      nlapiLogExecution('AUDIT', 'SL| function crearNcCo() arrayItems = newArray: ', newArray);
    }
  	nlapiLogExecution('AUDIT', 'SL| function crearNcCo() arrayItems length: ', arrayItems.length);

	var ncRecord = nlapiLoadRecord('creditmemo', idparam);
	var valtranid = ncRecord.getFieldValue('tranid');
  	var valentity = ncRecord.getFieldValue('entity');
  	var textentity = ncRecord.getFieldText('entity');

	var detalleNc = idparam + '_' + valtranid + ' / ' + valentity + '_' + textentity;
  	//nlapiLogExecution('AUDIT', 'crearNcCo: ', 'SL| vals: ' + detalleNc);

  	// call WS  dateColombia
	var dateTimeColombia = getDateColombia();
  	var dateTimeColombia = dateTimeColombia.split(' ');

  	var dateColombia = dateTimeColombia[0];
  	var dateColombia = dateColombia.split('-');
	var anioCo = dateColombia[0];
  	var mesCo = dateColombia[1];
  	var diaCo = dateColombia[2];

  	var timeColombia = dateTimeColombia[1];
  	var timeColombia = timeColombia.split('-');
  	var horaCo = timeColombia[0];
  	var minutosCo = timeColombia[1];
  	var segundosCo = timeColombia[2];

    var day = diaCo;
    var month = mesCo;
    var year = anioCo;
    var dateToday = year + '-' + month + '-' + day;
  	var hora = horaCo;
    var min = minutosCo;
    var seg = segundosCo;
  	var hourToday = hora + ':' + min + ':' + seg;

  	// secciones
  	var secInCo01 = '01|';
  	var secInCo02 = '02|';
  	var secInCo03 = '03|';
  	var secInCo10 = '';
  	var secInCo11 = '11|';
  	var secInCo12 = '';
  	//var secInCo40 = '40|Credit Memo|' + valtranid;

  	var tipo_nota_de_credito = ncRecord.getFieldText('custbody63');

  	// secInCo01
	var codigo_tipo_documento_01 = '04';
  	var motivo_de_la_NotaCredito_01 = '';
  	if(tipo_nota_de_credito == "NC por anulación de factura"){
		motivo_de_la_NotaCredito_01 = "2";
    }
    else if(tipo_nota_de_credito == "NC por devolución de bienes"){
		motivo_de_la_NotaCredito_01 = "1";
    }
  	var secuencial_01 = valtranid; // PRUE984234911 PREF000000123
  	//secuencial_01 = secuencial_01.replace('-','');
  	var fecha_de_emision_01 = dateToday;
  	var hora_de_emision_01 = hourToday;
  	var secuencial_doc_sustento_01 = ncRecord.getFieldValue('custbody58');
  	var cufe_01 = '';
  	var fecha_doc_sustento_01 = ncRecord.getFieldValue('custbody60');
  	var fieldsDate = fecha_doc_sustento_01.split('/');
  	  var fieldsDate_dia = (fieldsDate[0]<10?'0':'') + fieldsDate[0];
      var fieldsDate_mes = (fieldsDate[1]<10?'0':'') + fieldsDate[1];
  	  var fieldsDate_anio = fieldsDate[2];
  	fecha_doc_sustento_01 = fieldsDate_anio + '-' + fieldsDate_mes + '-' + fieldsDate_dia;
	secInCo01 += codigo_tipo_documento_01+'|'+motivo_de_la_NotaCredito_01+'|'+secuencial_01+'|'+fecha_de_emision_01+'|'+hora_de_emision_01+'|'+secuencial_doc_sustento_01+'|'+cufe_01+'|'+fecha_doc_sustento_01+'\n';

  	var identificadorNC = "";
  	if(tipo_nota_de_credito == "NC por anulación de factura"){
		identificadorNC = "NCA_";
    }
    else if(tipo_nota_de_credito == "NC por devolución de bienes"){
		identificadorNC = "NCD_";
    }
  	var fileName = identificadorNC + secuencial_01 + '_' + day + month + year + '_' + hora + min + seg +'.txt';

  	// secInCo02
  	var tipo_identificacion_02 = '31';
  	var identificacion_02 = '900852763';
  	var razon_social_02 = 'KALONI COLOMBIA SAS';
  	var nombre_comercial_02 = '';
  	var departamento_02 = '';
  	var municipio_02 = '';
  	var ciudad_02 = '';
  	var direccion_02 = '';
  	var pais_02 = 'CO';
  	var regimen_02 = '2';
  	var location = ncRecord.getFieldText('location');
  	if(location === 'Bogota'){
       nombre_comercial_02 = 'KALONI COLOMBIA';
       departamento_02 = 'Bogotá D.C.';
       municipio_02 = 'Bogotá, D.C.';
       ciudad_02 = 'Bogotá, D.C.';
       direccion_02 = 'AK 9 113 52 EDIFICIO TORRES UNIDAS 2 LC 102';
    }
  	else{
       nombre_comercial_02 = 'KALONI COLOMBIA MEDELLIN';
       departamento_02 = 'Antioquia';
       municipio_02 = 'Medellín';
       ciudad_02 = 'Medellín';
       direccion_02 = 'CL 13 34 31 ED TRIANGLE';
  	}
	secInCo02 += tipo_identificacion_02+'|'+identificacion_02+'|'+razon_social_02+'|'+nombre_comercial_02+'|'+departamento_02+'|'+municipio_02+'|'+ciudad_02+'|'+direccion_02+'|'+pais_02+'|'+regimen_02+'\n';

	// secInCo03
	var tipo_identificacion_03 = ncRecord.getFieldText('custbody48');
  	tipo_identificacion_03 = getCodTypeIdent(tipo_identificacion_03);
  	var identificacion_03 = ncRecord.getFieldValue('custbody49');
  	var razon_social_03 = ncRecord.getFieldValue('custbody50');
  	var departamento_03 = ncRecord.getFieldValue('custbody51');
  	var municipio_03 = ncRecord.getFieldValue('custbody52');
  	var ciudad_03 = ncRecord.getFieldValue('custbody53');
  	var direccion_03 = ncRecord.getFieldValue('custbody54');
  	var pais_03 = 'CO';
  	var regimen_03 = ncRecord.getFieldText('custbody57');
  	regimen_03 = getCodRegimen(regimen_03);
  	var email_03 = ncRecord.getFieldValue('custbody55');
  	var telefono_03 = ncRecord.getFieldValue('custbody56');
  	secInCo03 += tipo_identificacion_03+'|'+identificacion_03+'|'+razon_social_03+'|'+departamento_03+'|'+municipio_03+'|'+ciudad_03+'|'+direccion_03+'|'+pais_03+'|'+regimen_03+'|'+email_03+'|'+telefono_03+'\n';

  // secInCo10
	for (var i = 0; i < arrayItems.length; i++) {
      try{
        var fields1 = arrayItems[i].split('|');
      	//nlapiLogExecution('AUDIT', 'crearFacturaCo: ', 'SL| split |: ' + fields1);
      	var valor_sin_impuesto_10 = fields1[5];
      	valor_sin_impuesto_10 = deleteComas(valor_sin_impuesto_10);
      	var porcentaje_impuesto_10 = fields1[6];
      	porcentaje_impuesto_10 = porcentaje_impuesto_10.replace('%','0');
      	var total_impuesto_10 = fields1[7];
      	total_impuesto_10 = deleteComas(total_impuesto_10);
      	secInCo10 += '10|01|'+valor_sin_impuesto_10+'|'+porcentaje_impuesto_10+'|'+total_impuesto_10+'\n';
      }
      catch(e){
            var vale = e;
    		nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
      }
	}

  // secInCo11
  	var subtotal_NC_11 = ncRecord.getFieldValue('subtotal');
  	var impuestos_11 = ncRecord.getFieldValue('taxtotal');
  	var total_NC_11 = ncRecord.getFieldValue('total');
  	var moneda_11 = 'COP';
  	var concepto_11 = ncRecord.getFieldValue('custbody64');
  	var descuento_11 = ncRecord.getFieldValue('discounttotal');
  	descuento_11 = descuento_11.length > 2 ? descuento_11 : '0.00';
  	secInCo11 += subtotal_NC_11+'|'+impuestos_11+'|'+total_NC_11+'|'+moneda_11+'|'+concepto_11+'|'+descuento_11; // +'\n';

  	// secInCo12
	for (var j = 0; j < arrayItems.length; j++) {
		var fields2 = arrayItems[j].split('|');
        //nlapiLogExecution('AUDIT', 'crearFacturaCo: ', 'SL| split |: ' + fields1);
         var secuencial_item_12 = j+1;
      	 var codigo_del_producto_12 = fields2[0];
      	 var descripcion_producto_12 = fields2[3];
         var cantidad_12 = fields2[1];
         cantidad_12 = deleteComas(cantidad_12);
         var valor_total_item_12 = fields2[5]; // importe Item Sin Impuesto
         valor_total_item_12 = deleteComas(valor_total_item_12);
         var precio_unitario_12 = fields2[4];
      	 if(precio_unitario_12 !== '' && precio_unitario_12 !== null){
            precio_unitario_12 = deleteComas(precio_unitario_12);
           	//nlapiLogExecution('AUDIT', 'deleteComas().....' + precUnit, precUnit);
         }
      	 else{
           //nlapiLogExecution('AUDIT', 'precUnit vacio!! ' + precUnit, precUnit);
           precio_unitario_12 = (valor_total_item_12/cantidad_12);
           //nlapiLogExecution('AUDIT', 'precUnit llenado!! ' + precUnit, precUnit);
         }
         var porcentaje_IVA_12 = fields2[6];
      	try{
          porcentaje_IVA_12 = porcentaje_IVA_12.replace('%','0');
        }catch(e){
            var vale = e;
    		nlapiLogExecution('ERROR', 'SL| porcentaje_IVA_12 = porcentaje_IVA_12.replace % to 0 ', vale);
        }
      	var valor_IVA_12 = fields2[7];
      	valor_IVA_12 = deleteComas(valor_IVA_12);
         var descripcion_adicional_12 = fields2[2];
         descripcion_adicional_12 = descripcion_adicional_12 != '' ? descripcion_adicional_12 : 'NO APLICA';
      	if (j == (arrayItems.length - 1)) {
          secInCo12 += '12|'+secuencial_item_12+'|'+codigo_del_producto_12+'|'+descripcion_producto_12+'|'+cantidad_12+'|'+precio_unitario_12+'|'+valor_total_item_12+'|'+porcentaje_IVA_12+'|'+valor_IVA_12+'|0.00|0.00|0.00|0.00|'+descripcion_adicional_12+'|0.00';
     	}
      	else{
          secInCo12 += '12|'+secuencial_item_12+'|'+codigo_del_producto_12+'|'+descripcion_producto_12+'|'+cantidad_12+'|'+precio_unitario_12+'|'+valor_total_item_12+'|'+porcentaje_IVA_12+'|'+valor_IVA_12+'|0.00|0.00|0.00|0.00|'+descripcion_adicional_12+'|0.00'+'\n';
        }
	}

  var valTXT = "";
  if(tipo_nota_de_credito == "NC por anulación de factura"){
      var fieldsSec11 = secInCo11.split('|');
      var secInCo11_NC_AnFac = fieldsSec11[0] + '|' + fieldsSec11[1] + '|' + fieldsSec11[2] + '|' + fieldsSec11[3] + '|' + fieldsSec11[4] + '|' + fieldsSec11[5];
	  valTXT = secInCo01+secInCo02+secInCo03+secInCo11_NC_AnFac; // +secInCo40;
    }
  	else if(tipo_nota_de_credito == "NC por devolución de bienes"){
      valTXT = secInCo01+secInCo02+secInCo03+secInCo10+secInCo11+'\n'+secInCo12; // +secInCo40;
    }

  nlapiLogExecution('ERROR', 'crearNcCo: SL| txt: ', valTXT); // secInCo01+secInCo02+secInCo03+secInCo10+secInCo11+secInCo12
  //return false;
  var codeBase64txt = getBase64(valTXT);

  var xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
  xml += '<soap:Body>';
  xml += '<CargarTxt xmlns="http://tempuri.org/">';
  xml += '<nitEmpresa>900852763</nitEmpresa>';
  xml += '<txtEncode>'+codeBase64txt+'</txtEncode>';
  xml += '<nombreArchivo>'+fileName+'</nombreArchivo>';
  xml += '<adjuntoZipBase64></adjuntoZipBase64>';
  xml += '</CargarTxt>';
  xml += '</soap:Body>';
  xml += '</soap:Envelope>';
  var bodyResp = invoke_ws(xml);

  var nodePosition = bodyResp.indexOf("CargarTxtResult");
  var nodePositionfin = bodyResp.indexOf("</CargarTxtResult");
  var respp = bodyResp.substring(nodePosition+16, nodePositionfin); // nodePosition+49

	nlapiLogExecution('AUDIT', 'SL| invoke_ws(xml) response:', bodyResp);
  	//return false;

  // create file
            if (valtranid != null && valtranid !== '' && valentity != null && valentity !== '' && respp == 'Archivo TXT cargado Correctamente') 
            {
					       var mesfolder = getMesFolder(month);
              		var newFile = nlapiCreateFile(fileName, 'PLAINTEXT', valTXT);
                    newFile.setFolder(mesfolder); // 1200659
                    newFile.setEncoding('UTF-8');
                    var fileId = nlapiSubmitFile(newFile);

              	  	ncRecord.setFieldValue('custbody61', respp);
              		ncRecord.setFieldValue('custbody47', 'Si');
              		ncRecord.setFieldValue('custbody62', fileName + ' | ' + detalleNc);
      				nlapiLogExecution('AUDIT', 'SL| PROCESADO (NC_CO): ', 'Value PROCESADO (NC_CO): Si');
              		nlapiSubmitRecord(ncRecord, false, true);
                    nlapiLogExecution('AUDIT', 'SL| crearNcCo(): ', 'Credit Memo redirecting...');
                    nlapiSetRedirectURL('RECORD', 'creditmemo', idparam, false);
              }
  			  else if(respp !== 'Archivo TXT cargado Correctamente'){
                    ncRecord.setFieldValue('custbody61', respp);
              		ncRecord.setFieldValue('custbody47', 'No');
      				nlapiLogExecution('AUDIT', 'SL| PROCESADO (NC_CO): ', 'Value PROCESADO (NC_CO): No');
              		nlapiSubmitRecord(ncRecord, false, true);
                    nlapiLogExecution('AUDIT', 'SL| crearNcCo(): ', 'Credit Memo redirecting...');
                    nlapiSetRedirectURL('RECORD', 'creditmemo', idparam, false);
              }
}

function getCodTypeIdent(paramText){
  var result = '';
  if(paramText === 'Registro civil')
    result = '11';
  if(paramText === 'Tarjeta de identidad')
    result = '12';
  if(paramText === 'Cédula de ciudadanía')
    result = '13';
  if(paramText === 'Tarjeta de extranjería')
    result = '21';
  if(paramText === 'Cédula de extranjería')
    result = '22';
  if(paramText === 'NIT')
    result = '31';
  if(paramText === 'Pasaporte')
    result = '41';
  if(paramText === 'Documento extranjero')
    result = '42';
  return result;
}

function getCodRegimen(paramText){
  var result = '';
  if(paramText === 'Simplificado')
     result = '0';
  if(paramText === 'Común')
   	 result = '2';
  return result;
}

function deleteComas(textParam){
  var res = '';
  var i      = 0;
  try{
      while(i<textParam.length){
     var text = textParam[i];

       if(text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == '-' || text == '.')
       {
        // si es diferente simplemente concatena el carácter original de la cadena original.
         res += text;
       }else{
        // si no es diferente concatena el carácter que introdujiste a remplazar
         //nlapiLogExecution('AUDIT', 'SL| No es número - ó .: ', text);
       }
       i++;
 	 } // Fin del while
  }
  catch(e){
    var vale = e;
    nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
  }
  return res;
}

function invoke_ws(xml){

    //Set up Headers
    var headers = new Array();
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = 'http://tempuri.org/CargarTxt';
	var url = 'http://api.stupendo.co/ServicioCargaTxtColombia/WebServiceReceptaProceso.asmx'; // http://184.106.39.67/ServicioCargaTxtColombia/WebServiceReceptaProceso.asmx
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

function getDateColombia(){
  var xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
  xml += '<soap:Body>';
  xml += '<GetDateColombia xmlns="https://devkaloni.com" />';
  xml += '</soap:Body>';
  xml += '</soap:Envelope>';

      //Set up Headers
    var headers = new Array();
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = 'https://devkaloni.com/GetDateColombia';
	var url = 'https://devkaloni.com/WS/WSconnect_ftp.asmx';
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
  var nodePosition = bodyResp.indexOf("<GetDateColombiaResult>");
  var nodePositionfin = bodyResp.indexOf("</GetDateColombiaResult>");
  var dateTime = bodyResp.substring(nodePosition+23, nodePositionfin);
    return dateTime;
}

function getMesFolder(mesRef){
  var folderId = "";
  if(mesRef == "03")
    folderId = "1311161";
  if(mesRef == "04")
    folderId = "1311162";
  if(mesRef == "05")
    folderId = "1311163";
  if(mesRef == "06")
    folderId = "1311164";
  if(mesRef == "07")
    folderId = "1311165";
  if(mesRef == "08")
    folderId = "1311166";
  if(mesRef == "09")
    folderId = "1311167";
  if(mesRef == "10")
    folderId = "1311168";
  if(mesRef == "11")
    folderId = "1311169";
  if(mesRef == "12")
    folderId = "1311170";

  nlapiLogExecution('AUDIT', 'SL| function getMesFolder(mesRef): mes|folderId', mesRef + "|" + folderId);
  return folderId;
}

function getBase64(stringPar){
     var codeBase64Exp = "MDF8MDF8MXxQUlVFOTg0MjM0OTAwfDIwMTgtMTItM3wyMDo1MToxMw0KMDJ8MzF8OTAwODUyNzYzfEtBTE9OSSBDT0xPTUJJQSBTQVN8S0FMT05JIENPTE9NQklBfEJvZ290w6EgRC5DLnxCb2dvdMOhLCBELkMufEJvZ290w6EsIEQuQy58QUsgOSAxMTMgNTIgRURJRklDSU8gVE9SUkVTIFVOSURBUyAyIExDIDEwMg0KMDN8MTN8MTIzNDU2Nzg5fE1BSURBIE1VTkFSfENVTkRJTkFNQVJDQXxDRU5UUk98Qk9HT1TDgXxBdXRvcGlzdGEgTm9ydGUgIyAxMjItNTZ8Q098MnxleGFtcGxlQGV4YW1wbGUuY29tfDU3MzEyMzg3OTA5MQ0KMTB8MDF8NzMwMjUuMjF8MTkuMDB8MTM4NzQuNzkNCjEwfDAxfDgzNDQ1LjM4fDE5LjAwfDE1ODU0LjYyDQoxMXwxNTY0NzAuNTl8Mjk3MjkuNDF8MTg2MjAwLjAwfDAuMDB8Q09QDQoxMnwxfDI2NDh8U0hBTVBPTyBLQUxPTkkgQ09OVFJPTCBDQUlEQSAzNjAgTUwgQ09MfDF8NzMwMjUuMjF8NzMwMjUuMjF8MTkuMDB8MTMsODc0Ljc5fDAuMDB8MC4wMHwwLjAwfDAuMDB8MC4wMHxQSUVaQQ0KMTJ8MnwyNjUwfExPQ0lPTiBDQVBJTEFSIEtBTE9OSSAxMjAgTUwgQ09MfDF8ODM0NDUuMzh8ODM0NDUuMzh8MTkuMDB8MTUsODU0LjYyfDAuMDB8MC4wMHwwLjAwfDAuMDB8MC4wMHxQSUVaQQ==";

var Base64 = {
_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
            u = a = 64
        } else if (isNaN(i)) {
            a = 64
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
}, decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
            t = t + String.fromCharCode(r)
        }
        if (a != 64) {
            t = t + String.fromCharCode(i)
        }
    }
    t = Base64._utf8_decode(t);
    return t
}, _utf8_encode: function (e) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128)
        } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128)
        }
    }
    return t
}, _utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r = c1 = c2 = 0;
    while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
            n++
        } else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2
        } else {
            c2 = e.charCodeAt(n + 1);
            c3 = e.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3
        }
    }
    return t
  }
}

// Define the string
//var string = 'Hello World!';

// Encode the String
var encodedString = Base64.encode(stringPar);
nlapiLogExecution('AUDIT', 'SL| Base64 code: ', encodedString);
  //console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

// Decode the String
//var decodedString = Base64.decode(encodedString);
//nlapiLogExecution('AUDIT', 'SL| Base64 decode: ', decodedString);

  return encodedString; // encodedString; codeBase64Exp
}