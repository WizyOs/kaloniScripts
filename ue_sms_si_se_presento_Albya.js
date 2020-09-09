/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/log', 'N/record', 'N/https', 'N/search'], function(serverWidget, log, record, https, search) {

    function beforeLoad(context)
    {
        try
        {
		 	if(context.type == "view") // context.type == "edit" ||
       	 	{
              log.debug("beforeLoad() - "+context.type+": ", "Inicio");
              var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
              var url = "https://api.messagemedia.com/v1/messages";
              var recordId = context.newRecord.id;
			  if(recordId != "" && recordId != null)
              {
                var rec = record.load({type: 'calendarevent', id: recordId, isDynamic: true});
                var company = rec.getValue({fieldId: 'company'});
                log.debug("company: ", company);
                if(company != "" && company != null)
                {
                   var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: company, columns: ['subsidiary', 'mobilephone']});
                   var subsidiary = fieldLookUp['subsidiary'][0].value;
                   log.debug("subsidiary: ", subsidiary);
                   var mobilephone = fieldLookUp['mobilephone'];
                   if((subsidiary == "19" || subsidiary == "6") && mobilephone != "" && mobilephone != null)
                   {
                      var numberPattern = /\d+/g;
				   	  var newValPhone = mobilephone.match(numberPattern).join('');
                      log.debug("newValPhone: ", newValPhone);
					  var prefijoEvento = rec.getValue({fieldId: 'custevent70'});
                      log.debug("prefijoEvento: ", prefijoEvento);
                      var detalleCancelacion = rec.getValue({fieldId: 'custevent1'});
                      log.debug("detalleCancelacion: ", detalleCancelacion);
                      var messageMediaSmsValoracion = rec.getValue({fieldId: 'custevent1186'});
                      log.debug("messageMediaSmsValoracion: ", messageMediaSmsValoracion);
                      var messageMediaSmsProcedimiento = rec.getValue({fieldId: 'custevent1187'});
                      log.debug("messageMediaSmsProcedimiento: ", messageMediaSmsProcedimiento);
                      if(prefijoEvento == "12" && detalleCancelacion == "4" && newValPhone.length == 10)
                      {
                        if(messageMediaSmsValoracion != "" && messageMediaSmsValoracion != null && messageMediaSmsValoracion.length >= 36)
                        {
                           if(messageMediaSmsValoracion.indexOf("submitted") == -1 && messageMediaSmsValoracion.indexOf("processed") == -1 && messageMediaSmsValoracion.indexOf("enroute") == -1)
                           {
                              var mmId = messageMediaSmsValoracion.substring(0,36);
                              log.debug('mmId: ', mmId);

                              var getStatus = https.request({method:https.Method.GET, url:url+'/'+mmId, headers: headers});
                              log.debug('getStatus.body: ', getStatus.body);
                              var obj = JSON.parse(getStatus.body);
                              log.debug('status: ', obj.status);
                              if(obj.status == "submitted" || obj.status == "processed" || obj.status == "enroute")
                              {
                                 var newValmm = mmId+"|"+obj.status;
                                 log.debug('newValmm: ', newValmm);
                                 rec.setValue({fieldId: 'custevent1186', value: newValmm});
                                 rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                              }else{
                                 // +527221310265 525547718413 '+newValPhone+'
                                 var msgContent = "";
                                 if(subsidiary == "6"){
                                    msgContent = "Kaloni - Gracias por asistir a tu cita de valoración. Dudas al (55)50221056";
                                 }else if(subsidiary == "19"){
                                    msgContent = "Albya - Gracias por asistir a tu consulta. Cualquier duda estamos en el 50221056";
                                 }

                                 var bodyRequest = '{"messages":[{"content":"'+msgContent+'", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                                 var response = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                                 log.debug('response.body: ', response.body);
                                 var responseObj = JSON.parse(response.body);
                                 log.debug('responseObj["messages"][0].message_id: ', responseObj["messages"][0].message_id);
                                 rec.setValue({fieldId: 'custevent1186', value: responseObj["messages"][0].message_id});
                                 rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                              }
                           }
                        }
                      }else if(prefijoEvento == "1" && detalleCancelacion == "4" && newValPhone.length == 10){
                        if(messageMediaSmsProcedimiento != "" && messageMediaSmsProcedimiento != null && messageMediaSmsProcedimiento.length >= 36)
                        {
                           if(messageMediaSmsProcedimiento.indexOf("submitted") == -1 && messageMediaSmsProcedimiento.indexOf("processed") == -1 && messageMediaSmsProcedimiento.indexOf("enroute") == -1)
                           {
                              var mmId = messageMediaSmsProcedimiento.substring(0,36);
                              log.debug('mmId: ', mmId);

                              var getStatus = https.request({method:https.Method.GET, url:url+'/'+mmId, headers: headers});
                              log.debug('getStatus.body: ', getStatus.body);
                              var obj = JSON.parse(getStatus.body);
                              log.debug('status: ', obj.status);
                              if(obj.status == "submitted" || obj.status == "processed" || obj.status == "enroute")
                              {
                                 var newValmm = mmId+"|"+obj.status;
                                 log.debug('newValmm: ', newValmm);
                                 rec.setValue({fieldId: 'custevent1187', value: newValmm});
                                 rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                              }else{
                                 // +527221310265 525547718413 '+newValPhone+'
                                 var msgContent = "";
                                 if(subsidiary == "6"){
                                    msgContent = "Kaloni - Gracias por asistir a tu procedimiento. Cualquier duda estamos en el 50221056";
                                 }else if(subsidiary == "19"){
                                    msgContent = "Albya - Gracias por asistir a tu procedimiento. Cualquier duda estamos en el 50221056";
                                 }

                                 var bodyRequest = '{"messages":[{"content":"'+msgContent+'", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                                 var response = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                                 log.debug('response.body: ', response.body);
                                 var responseObj = JSON.parse(response.body);
                                 log.debug('responseObj["messages"][0].message_id: ', responseObj["messages"][0].message_id);
                                 rec.setValue({fieldId: 'custevent1187', value: responseObj["messages"][0].message_id});
                                 rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                              }
                           }
                        }
                      }
                   }
                }
              }
              log.debug("beforeLoad() - "+context.type+": ", "Fin");
         	}
        }catch(e){
           log.debug('beforeLoad() - edit - view -  Exception log:', e);
        }
    }



    function afterSubmit(context)
    {
         try
         {
			if(context.type == "edit")
       		{
              log.debug("afterSubmit() - "+context.type+": ", "Inicio");
              var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
              var url = "https://api.messagemedia.com/v1/messages";
              var recordId = context.newRecord.id;
              log.debug("recordId: ", recordId);
              if(recordId != "" && recordId != null)
              {
                 var rec = record.load({type: 'calendarevent', id: recordId, isDynamic: true});
                 var company = rec.getValue({fieldId: 'company'});
                 log.debug("company: ", company);
                 if(company != "" && company != null)
                 {
                   var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: company, columns: ['subsidiary', 'mobilephone']});
                   var subsidiary = fieldLookUp['subsidiary'][0].value;
                   log.debug("subsidiary: ", subsidiary);
                   var mobilephone = fieldLookUp['mobilephone'];
                   if((subsidiary == "19" || subsidiary == "6") && mobilephone != "" && mobilephone != null)
                   {
                     var numberPattern = /\d+/g;
				   	 var newValPhone = mobilephone.match(numberPattern).join('');
                     log.debug("newValPhone: ", newValPhone);
                     var prefijoEvento = rec.getValue({fieldId: 'custevent70'});
                     log.debug("prefijoEvento: ", prefijoEvento);
                     var detalleCancelacion = rec.getValue({fieldId: 'custevent1'});
                     log.debug("detalleCancelacion: ", detalleCancelacion);
                     var messageMediaSmsValoracion = rec.getValue({fieldId: 'custevent1186'});
                     log.debug("messageMediaSmsValoracion: ", messageMediaSmsValoracion);
                     var messageMediaSmsProcedimiento = rec.getValue({fieldId: 'custevent1187'});
                     log.debug("messageMediaSmsProcedimiento: ", messageMediaSmsProcedimiento);
					 if(prefijoEvento == "12" && detalleCancelacion == "4" && newValPhone.length == 10)
                     {
                       if(messageMediaSmsValoracion == "" || messageMediaSmsValoracion == null || messageMediaSmsValoracion.length <= 0)
                       {
                          // +527221310265 525547718413 '+newValPhone+'
                          var msgContent = "";
                          if(subsidiary == "6"){
                             msgContent = "Kaloni - Gracias por asistir a tu cita de valoración. Dudas al (55)50221056";
                          }else if(subsidiary == "19"){
                             msgContent = "Albya - Gracias por asistir a tu consulta. Cualquier duda estamos en el 50221056";
                          }
                          var bodyRequest = '{"messages":[{"content":"'+msgContent+'", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                          var response = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                          log.debug('response.body: ', response.body);
                          var responseObj = JSON.parse(response.body);
                          log.debug('responseObj["messages"][0].message_id: ', responseObj["messages"][0].message_id);

                          rec.setValue({fieldId: 'custevent1186', value: responseObj["messages"][0].message_id});
                          rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                       }
                     }else if(prefijoEvento == "1" && detalleCancelacion == "4" && newValPhone.length == 10){
                       if(messageMediaSmsProcedimiento == "" || messageMediaSmsProcedimiento == null || messageMediaSmsProcedimiento.length <= 0)
                       {
                          // +527221310265 525547718413 '+newValPhone+'
                          var msgContent = "";
                          if(subsidiary == "6"){
                             msgContent = "Kaloni - Gracias por asistir a tu procedimiento. Cualquier duda estamos en el 50221056";
                          }else if(subsidiary == "19"){
                             msgContent = "Albya - Gracias por asistir a tu procedimiento. Cualquier duda estamos en el 50221056";
                          }
                          var bodyRequest = '{"messages":[{"content":"'+msgContent+'", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                          var response = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                          log.debug('response.body: ', response.body);
                          var responseObj = JSON.parse(response.body);
                          log.debug('responseObj["messages"][0].message_id: ', responseObj["messages"][0].message_id);

                          rec.setValue({fieldId: 'custevent1187', value: responseObj["messages"][0].message_id});
                          rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                       }
                     }
                   }
                 }
              }
              log.debug("afterSubmit() - "+context.type+": ", "Fin");
       		}
         }catch(e){
           log.debug('afterSubmit() - edit - Exception log:', e);
         }
    }

    return {
      	beforeLoad: beforeLoad,
        afterSubmit: afterSubmit
    };
});
