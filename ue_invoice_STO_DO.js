	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
define(['N/record', 'N/file', 'N/log', 'N/ui/serverWidget', 'N/https', 'N/search', 'N/format'], function(record, file, log, serverWidget, https, search,format) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
       /*var resultTest1 = ["","00","01"];
       var toInt_realTime_0 = resultTest1[0];
       log.debug('toInt_realTime_0: ', toInt_realTime_0);
       toInt_realTime_0 = Number(toInt_realTime_0);
       log.debug('toInt_realTime_0: ', toInt_realTime_0);*/
       
        var record_invoice = context.newRecord.id;
    	var objRecord = record.load({type: 'invoice', id: record_invoice, isDynamic: true});
        var subsidiary = objRecord.getValue({fieldId: 'subsidiary'});
        log.debug('subsidiary: ', subsidiary);
        var tranidField = objRecord.getValue({fieldId: 'tranid'});
        log.debug('tranidField: ', tranidField);
        var locationVal = objRecord.getText({fieldId: 'location'});
        log.debug('locationVal: ', locationVal);
       
            /*var dateToday = "";
            var hourToday = "";
            var xmlrequest = '<?xml version="1.0" encoding="UTF-8"?>';
            xmlrequest += '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="urn:miserviciowsdl" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
            xmlrequest += '	<SOAP-ENV:Body>';
            xmlrequest += '		<ns1:getDateNow>';
            xmlrequest += '			<miparametro xsi:type="xsd:string">America/Mexico_City</miparametro>';
            xmlrequest += '		</ns1:getDateNow>';
            xmlrequest += '	</SOAP-ENV:Body>';
            xmlrequest += '</SOAP-ENV:Envelope>';

            //Set up Headers
            var headers = {};
            headers['User-Agent-x'] = 'SuiteScript-Call';
            headers['Content-Type'] = 'text/xml; charset=utf-8';
            headers['Content-Length']= 'length';
            headers['SOAPAction'] = 'https://efactory-kaloni.com/SENDWA/WebServiceSOAP/dateNow.php/getDateNow';
            var url2 = 'https://efactory-kaloni.com:443/SENDWA/WebServiceSOAP/dateNow.php';
            var cont = https.post({url: url2, headers: headers, body: xmlrequest});
            // log.debug('msg body', cont.body);
            if(cont.code == "200")
            {
               var position = cont.body.indexOf('xsd:string">');
               if(position >= 0)
               {
                  var fecha = cont.body.substring(position + 12, position + 31);
                  //log.debug('fecha: ', fecha);
                  var fechaSplit = fecha.split(' ');
                  dateToday = fechaSplit[0];
                  log.debug('dateToday: ', dateToday);
                  hourToday = fechaSplit[1];
                  log.debug('hourToday: ', hourToday);
               }
            }

        var filters = [];
        filters [0] =  search.createFilter({name :  'startdate', operator : search.Operator.ON, values : dateToday}); // '25/06/2020' dateToday
        filters [1] =  search.createFilter({name :  'location', operator : search.Operator.IS, values : ['Albya']}); // CONTAINS
        //filters [2] =  search.createFilter({name :  'custevent2', operator : search.Operator.IS, values:['53','54']});
        // 53 = Albya Chihuahua | 54 = Albya Cancún

        var columns = [];
        columns [0] = search.createColumn({name :  'company'});
        columns [1] = search.createColumn({name : 'location'});
        columns [2] = search.createColumn({name : 'startdate'});
        columns [3] = search.createColumn({name : 'starttime'});
        columns [4] = search.createColumn({name : 'custevent1'}); // DETALLE DE CANCELACIÓN
        columns [5] = search.createColumn({name : 'custevent2'}); // SUCURSAL
		var contador = 0;
       	search.create({
                type :  search.Type.CALENDAR_EVENT,
                filters : filters,
                columns : columns
        }).run().each(function(result){
            log.debug('result: ', result);
            var company = result.getValue({name: 'company'});
            if(isNaN(parseInt(company)) == false)
            {
              log.debug('company: ', company);
			  var companyName = result.getText({name: 'company'});
              log.debug('companyName: ', companyName);
              var location = result.getValue({name: 'location'});
              log.debug('location: ', location);
              var sucursal = result.getText({name: 'custevent2'}); // SUCURSAL
              log.debug('sucursal: ', sucursal);
              var startdate = result.getValue({name: 'startdate'});
              log.debug('startdate: ', startdate);
              var starttime = result.getValue({name: 'starttime'});
              log.debug('starttime: ', starttime);
              var detalle_cancelacion = result.getText({name: 'custevent1'}); // DETALLE DE CANCELACIÓN
              log.debug('detalle_cancelacion: ', detalle_cancelacion);
              if((detalle_cancelacion == null || detalle_cancelacion == "") && detalle_cancelacion.length < 3 && starttime.indexOf(':') >= 0 && startdate.indexOf('/') >= 0)
              {
                var startdateSplit = startdate.split('/');
                var realStartDate = startdateSplit[2]+","+('0'+startdateSplit[1]).slice(-2)+","+startdateSplit[0];
                log.debug('realStartDate: ', realStartDate);
                var realTime = getRealTime(starttime);
                log.debug('realTime: ', realTime);

				if(dateToday.indexOf('202') >= 0 && hourToday.indexOf(':') >= 0 && realTime.length == 3)
                {
                  var dateTodaySplit = dateToday.split('/');
                  var hourTodaySplit = hourToday.split(':');
                  if(parseInt(hourTodaySplit[0]) > realTime[0])
                  {
                    var dt1 = new Date(startdateSplit[2],('0'+startdateSplit[1]).slice(-2),startdateSplit[0],realTime[0],realTime[1],realTime[2]); // 2014,10,02,10,11,00
            	    var dt2 = new Date(dateTodaySplit[2],dateTodaySplit[1],dateTodaySplit[0],hourTodaySplit[0],hourTodaySplit[1],hourTodaySplit[2]); // 2014,10,02,24,13,00
                    var diffHour = diff_hours(dt2, dt1);
            	    log.debug('diffHour: ', diffHour); // 3
                    if(diffHour >= 3 && result.id != "" && result.id != null)
                    {
                      var eventRecord = record.load({type: 'calendarevent', id: result.id, isDynamic: true});
                      eventRecord.setValue({fieldId: "custevent1", value: '3'}); // 3 = No se presentó (DETALLE DE CANCELACIÓN)
        			  eventRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                    }
                  }
                }
              }
              contador++;
            }
			return true;
        });
        log.debug('contador: ', contador);*/
       
        if(subsidiary == "16" && locationVal == "Santo Domingo")
        {
          var tipoFactHidden = objRecord.getValue({fieldId: 'custbody66'});
          log.debug('tipoFactHidden: ', tipoFactHidden);
          var tipoFact = objRecord.getText({fieldId: 'custbody65'});
          log.debug('tipoFact: ', tipoFact);
          var rnc_Cliente = objRecord.getValue({fieldId: 'custbody_cfdi_rfc'});
          log.debug('rnc_Cliente: ', rnc_Cliente);
          var urlPDFfact = objRecord.getValue({fieldId: 'custbody73'});
          log.debug('urlPDFfact: ', urlPDFfact);
          //createAlert("Llena todos los campos test2!!", context);

          var boolVal = true;
          var item_Lines = objRecord.getLineCount({sublistId : 'item'});
          if(item_Lines > 0)
          {
              for(var i = 0; i < item_Lines; i++)
              {
                  log.debug('Item #', i);
                  /*var valor_quantity = objRecord.getSublistValue({sublistId:'item', fieldId:'quantity', line:i}); // cantidad
                  if(isNaN(parseFloat(valor_quantity)) == true && parseFloat(valor_quantity) <= 0){boolVal = false;}*/
                  var currentDescription = objRecord.getSublistText({sublistId:'item', fieldId:'description', line:i}); //descripcion
                  if(currentDescription == null || currentDescription == ""){boolVal = false;}
                  log.debug('currentDescription: ', currentDescription);
                  var currentRate = objRecord.getSublistValue({sublistId:'item', fieldId:'rate', line:i}); // precio unitario item
                  if(isNaN(parseFloat(currentRate)) == true){boolVal = false;}
                  log.debug('currentRate: ', currentRate);
                  var currentAmount = objRecord.getSublistValue({sublistId:'item', fieldId:'amount', line:i}); // monto total (cantidad * precio unitario) item
                  if(isNaN(parseFloat(currentAmount)) == true){boolVal = false;}
                  log.debug('currentAmount: ', currentAmount);
                  var currentTax1amt = objRecord.getSublistValue({sublistId:'item', fieldId:'tax1amt', line:i}); // impuesto aplicado
                  if(isNaN(parseFloat(currentTax1amt)) == true){boolVal = false;}
                  log.debug('currentTax1amt: ', currentTax1amt);
                  var currentGrossamt = objRecord.getSublistValue({sublistId:'item', fieldId:'grossamt', line:i}); // (precio total item + impuesto aplicado)
                  if(isNaN(parseFloat(currentGrossamt)) == true){boolVal = false;}
                  log.debug('currentGrossamt: ', currentGrossamt);
              }
          }

          if(boolVal == false)
          {
              createAlert("Llena todos los campos requeridos de los artículos a facturar!!", context);
          }
          else
          {
             if(tipoFact == "De consumo" && rnc_Cliente != "" && rnc_Cliente != null)
             {
               if(fol_Fact_Consumo_Disponibles())
               {
                  if((tipoFactHidden == "" || tipoFactHidden == null) && (urlPDFfact == "" || urlPDFfact == null))
                  {
                     context.form.addButton({id: "custpage_invoice_sto_do", label: "Factura STO DO", functionName: "onButtonClick_invoice_STO_DO('"+rnc_Cliente+"')"});
                     context.form.clientScriptModulePath = "SuiteScripts/cs_invoice_STO_DO.js";
                  }
               }
               else
               {
                 createAlert("No hay folios disponibles para FACTURAS DE CONSUMO !!", context);
               }
             }else if(tipoFact == "De crédito fiscal" && rnc_Cliente != "" && rnc_Cliente != null){
               if(fol_Fact_Cred_Fiscal_Disponibles())
               {
                  if((tipoFactHidden == "" || tipoFactHidden == null) && (urlPDFfact == "" || urlPDFfact == null))
                  {
                     context.form.addButton({id: "custpage_invoice_sto_do", label: "Factura STO DO", functionName: "onButtonClick_invoice_STO_DO('"+rnc_Cliente+"')"});
                     context.form.clientScriptModulePath = "SuiteScripts/cs_invoice_STO_DO.js";
                  }
               }
               else
               {
                 createAlert("No hay folios disponibles para FACTURAS DE CRÉDITO FISCAL !!", context);
               }
            }else{
              createAlert("Llena los campos RNC CLIENTE y TIPO DE FACTURA !!", context);
            }
          }
        }
     }
   }

    function fol_Fact_Cred_Fiscal_Disponibles()
    {
      var response = false;
      var fileFolios = file.load({id:'1823847'}); // folios_crédito_fiscal_test.txt = 6262399 | folios_crédito_fiscal.txt = 1823847
      var folios = fileFolios.getContents();
      var result = folios.substring(folios.length - 3, folios.length);

      if(result != "|ok")
        response = true;

      return response;
    }

    function fol_Fact_Consumo_Disponibles()
    {
      var response = false;
      var fileFolios = file.load({id:'1823846'}); // folios_consumo_test.txt = 6262348 | folios_consumo.txt = 1823846
      var folios = fileFolios.getContents();
      var result = folios.substring(folios.length - 3, folios.length);

      if(result != "|ok")
        response = true;

      return response;
    }

    function createAlert(textalert, context)
    {
        var currentForm = context.form;
        var html = '<script language="JavaScript" type="text/javascript">window.alert("'+textalert+'");</script>';
        var field = currentForm.addField({id: "custpage_alert_items", label: "Alert_Items", type: serverWidget.FieldType.INLINEHTML});
        field.defaultValue = html;
    }

    function diff_hours(dt2, dt1)
    {
      var diff =(dt2.getTime() - dt1.getTime()) / 1000;
      diff /= (60 * 60);
      return Math.abs(Math.round(diff));
    }

    function getRealTime(time_Param)
    {
      var result = [];
      if(time_Param.indexOf('12:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)) // 12:00 am
      {
        var time_ParamSplit = time_Param.split(':');
        //result = "00,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("00");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('1:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 1:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "01,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("01");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('2:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 2:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "02,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("02");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('3:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 3:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "03,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("03");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('4:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 4:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "04,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("04");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('5:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 5:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "05,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("05");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('6:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 6:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "06,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("06");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('7:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 7:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "07,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("07");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('8:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 8:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "08,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("08");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('9:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 9:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "09,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("09");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('10:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 10:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "10,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("10");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('11:') >= 0 && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 11:00 am
        var time_ParamSplit = time_Param.split(':');
        //result = "11,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("11");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('12:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 12:00 pm
        var time_ParamSplit = time_Param.split(':');
        result = "12,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("12");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('1:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 1:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "13,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("13");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('2:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 2:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "14,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("14");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('3:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 3:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "15,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("15");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('4:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 4:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "16,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("16");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('5:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 5:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "17,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("17");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('6:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 6:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "18,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("18");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('7:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 7:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "19,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("19");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('8:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 8:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "20,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("20");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('9:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 9:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "21,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("21");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('10:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 10:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "22,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("22");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      else if(time_Param.indexOf('11:') >= 0 && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 11:00 pm
        var time_ParamSplit = time_Param.split(':');
        //result = "23,"+time_ParamSplit[1].substring(0,2)+",00";
        result.push("23");
        result.push(time_ParamSplit[1].substring(0,2));
        result.push("00");
      }
      return result;
    }

   return{
      beforeLoad: beforeLoad
   };
});
