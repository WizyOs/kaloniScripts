/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/ui/serverWidget", "N/crypto", "N/https", "N/runtime", "N/encode", "N/url", 'N/email', 'N/log', 'N/search', 'N/record'],
    function (ui, crypto, https, runtime, encode, urlMod, email, log, search, record) {
        function execute(context)
  		{
            var dateToday = "";
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
            filters [1] =  search.createFilter({name :  'custevent2', operator : search.Operator.IS, values:['52','53','54','57']});
            // 53 = Albya Chihuahua | 54 = Albya Cancún
            // filters [1] =  search.createFilter({name :  'location', operator : search.Operator.IS, values : ['Albya']}); // CONTAINS

            var columns = [];
            columns [0] = search.createColumn({name :  'company'});
            columns [1] = search.createColumn({name : 'location'});
            columns [2] = search.createColumn({name : 'startdate'});
            columns [3] = search.createColumn({name : 'starttime'});
            columns [4] = search.createColumn({name : 'custevent1'}); // DETALLE DE CANCELACIÓN
            columns [5] = search.createColumn({name : 'custevent2'}); // SUCURSAL

            var encontrados = 0;
            var modificados = 0;
            search.create({
                    type :  search.Type.CALENDAR_EVENT,
                    filters : filters,
                    columns : columns
            }).run().each(function(result){
                //log.debug('result: ', result);
                var company = result.getValue({name: 'company'});
                if(isNaN(parseInt(company)) == false)
                {
                  log.debug('company: ', company);
                  var companyName = result.getText({name: 'company'});
                  //log.debug('companyName: ', companyName);
                  var location = result.getValue({name: 'location'});
                  //log.debug('location: ', location);
                  var sucursal = result.getText({name: 'custevent2'}); // SUCURSAL
                  //log.debug('sucursal: ', sucursal);
                  var startdate = result.getValue({name: 'startdate'});
                  //log.debug('startdate: ', startdate);
                  var starttime = result.getValue({name: 'starttime'});
                  //log.debug('starttime: ', starttime);
                  var detalle_cancelacion = result.getText({name: 'custevent1'}); // DETALLE DE CANCELACIÓN
                  log.debug('detalle_cancelacion: ', detalle_cancelacion);
                  if((detalle_cancelacion == null || detalle_cancelacion == "") && detalle_cancelacion.length < 3 && starttime.indexOf(':') >= 0 && startdate.indexOf('/') >= 0)
                  {
                    var startdateSplit = startdate.split('/');
                    var realStartDate = startdateSplit[2]+","+('0'+startdateSplit[1]).slice(-2)+","+startdateSplit[0];
                    log.debug('real_StartDate: ', realStartDate);
                    var realTime = getRealTime(starttime);
                    log.debug('real_Time: ', realTime);

                    if(dateToday.indexOf('202') >= 0 && hourToday.indexOf(':') >= 0 && realTime.length == 3)
                    {
                      var dateTodaySplit = dateToday.split('/');
                      var hourTodaySplit = hourToday.split(':');
                      log.debug('parseInt(hourTodaySplit[0]): ', parseInt(hourTodaySplit[0]));
                      var toInt_hourTodaySplit_0 = Number(hourTodaySplit[0]);
                      log.debug('toInt_hourTodaySplit_0: ', toInt_hourTodaySplit_0);

                      log.debug('realTime[0]: ', realTime[0]);
                      var toInt_realTime_0 = realTime[0];
                      toInt_realTime_0 = Number(toInt_realTime_0);
                      log.debug('toInt_realTime_0: ', toInt_realTime_0);
                      if(toInt_hourTodaySplit_0 > toInt_realTime_0)
                      {
                        var supuestoValor_dt1 = startdateSplit[2] +","+ ('0'+startdateSplit[1]).slice(-2) +","+ startdateSplit[0] +","+ realTime[0]+","+realTime[1]+","+realTime[2];
                        log.debug('supuestoValor_dt1: ', supuestoValor_dt1);
                        var dt1 = new Date(startdateSplit[2],('0'+startdateSplit[1]).slice(-2),startdateSplit[0],realTime[0],realTime[1],realTime[2]); // 2014,10,02,10,11,00
                        log.debug('dt1: ', dt1); // "2020-05-27T16:00:00.000Z"

                        var supuestoValor_dt2 = dateTodaySplit[2]+","+dateTodaySplit[1]+","+dateTodaySplit[0]+","+hourTodaySplit[0]+","+hourTodaySplit[1]+","+hourTodaySplit[2];
                        log.debug('supuestoValor_dt2: ', supuestoValor_dt2);
                        var dt2 = new Date(dateTodaySplit[2],dateTodaySplit[1],dateTodaySplit[0],hourTodaySplit[0],hourTodaySplit[1],hourTodaySplit[2]); // 2014,10,02,24,13,00
                        log.debug('dt2: ', dt2); // "2020-05-28T00:06:03.000Z"

                        var diffHour = diff_hours(dt2, dt1);
                        log.debug('diffHour: ', diffHour); // 3
                        if(diffHour >= 6 && result.id != "" && result.id != null)
                        {
                          var eventRecord = record.load({type: 'calendarevent', id: result.id, isDynamic: true});
                          eventRecord.setValue({fieldId: "custevent1", value: '3'}); // 3 = No se presentó (DETALLE DE CANCELACIÓN)
                          eventRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                          log.debug('Update Event Record: ', result.id);
                          modificados++;
                        }
                      }
                    }
                  }
                  encontrados++;
              	}
                return true;
            });
            log.debug('Encontrados: ', encontrados);
            log.debug('Modificados: ', modificados);
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
          var time_ParamSplit = time_Param.split(':');
          if(time_ParamSplit[0] == '12' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)) // 12:00 am
          {
            result.push("00");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '1' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 1:00 am
            result.push("01");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '2' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 2:00 am
            result.push("02");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '3' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 3:00 am
            result.push("03");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '4' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 4:00 am
            result.push("04");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '5' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 5:00 am
            result.push("05");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '6' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 6:00 am
            result.push("06");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '7' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 7:00 am
            result.push("07");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '8' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 8:00 am
            result.push("08");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '9' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 9:00 am
            result.push("09");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '10' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 10:00 am
            result.push("10");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '11' && (time_Param.indexOf('am') >= 0 || time_Param.indexOf('AM') >= 0)){ // 11:00 am
            result.push("11");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '12' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 12:00 pm
            result.push("12");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '1' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 1:00 pm
            result.push("13");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '2' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 2:00 pm
            result.push("14");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '3' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 3:00 pm
            result.push("15");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '4' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 4:00 pm
            result.push("16");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '5' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 5:00 pm
            result.push("17");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '6' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 6:00 pm
            result.push("18");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '7' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 7:00 pm
            result.push("19");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '8' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 8:00 pm
            result.push("20");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '9' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 9:00 pm
            result.push("21");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '10' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 10:00 pm
            result.push("22");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          else if(time_ParamSplit[0] == '11' && (time_Param.indexOf('pm') >= 0 || time_Param.indexOf('PM') >= 0)){ // 11:00 pm
            result.push("23");
            result.push(time_ParamSplit[1].substring(0,2));
            result.push("00");
          }
          return result;
        }

        return {
            execute: execute
        };
    });