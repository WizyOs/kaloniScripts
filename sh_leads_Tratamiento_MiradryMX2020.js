/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/format", 'N/email', 'N/log', 'N/search', 'N/record', 'N/render'],
    function (format, email, log, search, record, render) {
        function execute(context) {
          try
          {
            var count = 0;
            var dateMX = new Date();
            log.debug('dateMX: ', dateMX); //	"2020-02-19T18:17:10.670Z"
            var dateMX_menos_3semanas = sumarDias(dateMX, -21);
            log.debug('dateMX_menos_3semanas: ', dateMX_menos_3semanas); // "2020-01-29T18:17:10.670Z"

            var mxDate = format.format({value: dateMX_menos_3semanas, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
            log.debug('mxDate: ', mxDate); // 29/1/2020 12:17:10 pm
            var mxDate_Split = mxDate.split('/');
            var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
            //log.debug('dia_Mx: ', dia_Mx); // 
            var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
            //log.debug('mes_Mx: ', mes_Mx); // 
            var anio_Mx = mxDate_Split[2].substring(0, 4);
            //log.debug('anio_Mx: ', anio_Mx); // 

            /*var mxHour_Split = mxDate_Split[2].split(' ');
            var hourAux = mxHour_Split[1].split(':');
            var hourAuxHH = hourAux[0].length > 1 ? hourAux[0] : "0"+hourAux[0];
            //log.debug('hourAuxHH: ', hourAuxHH); // 
            var hourAuxMM = hourAux[1].length > 1 ? hourAux[1] : "0"+hourAux[1];
            //log.debug('hourAuxMM: ', hourAuxMM); // 
            var hourAuxSS = hourAux[2].length > 1 ? hourAux[2] : "0"+hourAux[2];
            //log.debug('hourAuxSS: ', hourAuxSS); // */

            if(dia_Mx != "" && dia_Mx != null && mes_Mx != "" && mes_Mx != null && anio_Mx != "" && anio_Mx != null)
            {
                // Leads Nuevos Tratamiento_MiradryMX2020
                var filters = [];
                filters[0] = search.createFilter({name:'datecreated', operator:search.Operator.ON, values:dia_Mx+'/'+mes_Mx+'/'+anio_Mx});
                filters[1] = search.createFilter({name:'entitystatus', operator:search.Operator.IS, values:'17'});
                filters[2] = search.createFilter({name:'custentity139', operator:search.Operator.CONTAINS, values:'MIRADRY'});
                filters[3] = search.createFilter({name:'custentity135', operator:search.Operator.CONTAINS, values:'MIRADRY'});
                filters[4] = search.createFilter({name:'custentity433', operator:search.Operator.IS, values:'false'});

                var columns = [];
                columns[0] = search.createColumn({name:'internalid'});
                columns[1] = search.createColumn({name:'email'});
                columns[2] = search.createColumn({name:'entitystatus'});
                columns[3] = search.createColumn({name:'datecreated'});
                columns[4] = search.createColumn({name:'custentity139'});
                columns[5] = search.createColumn({name:'custentity135'});
                columns[6] = search.createColumn({name:'custentity433'});

                search.create({
                      type : 'lead',
                      filters : filters,
                      columns : columns
                }).run().each(function(result){
                      log.debug('result: ', result);
                      var leadId = result.getValue({name: 'internalid'});
                      //log.debug('leadId: ', leadId);
                      var mail = result.getValue({name: 'email'});

                      var mergeResult = render.mergeEmail({templateId: 1039, entity: null, recipient: null, supportCaseId: null, transactionId: null, customRecord: null}); // Email Template = TratamientoMiradry_MX2020.html, id = 1039
                      var emailSubject = mergeResult.subject;
                      log.debug('emailSubject: ', emailSubject);
                      var emailBody = mergeResult.body;
                      log.debug('emailBody: ', emailBody);
                      if(mail != "" && mail != null && mail.length > 5 && mail.indexOf("@") > 0)
                      {
                        var objRecord = record.load({type:'lead', id:leadId, isDynamic:true});
                        email.send({author: 198528, recipients:[mail], subject:emailSubject, body:emailBody});
                        log.debug('Email: ', 'Enviado correctamente a: '+ mail);
                        objRecord.setValue({fieldId: 'custentity433', value: true});
                        objRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                        count++;
                      }
                      return true;
                 });
			}
			log.debug('count: ', count);
          }catch(e){
            log.debug('Exception: ', e);
            //return e.toString();
          }
        }

        function sumarDias(fecha, dias){
           fecha.setDate(fecha.getDate() + dias);
           return fecha;
        }

        return {
            execute: execute,
            sumarDias: sumarDias
        };
    });