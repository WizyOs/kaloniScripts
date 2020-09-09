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
                if(company != "" && company != null)
                {
                   log.debug("company: ", company);
                   var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: company, columns: ['subsidiary', 'mobilephone']});
                   var subsidiary = fieldLookUp['subsidiary'][0].value;
                   var mobilephone = fieldLookUp['mobilephone'];
                   if(subsidiary == "19" && mobilephone != "" && mobilephone != null)
                   {
                      log.debug("subsidiary: ", subsidiary);
                      var numberPattern = /\d+/g;
				   	  var newValPhone = mobilephone.match(numberPattern).join('');
					  var prefijoEvento = rec.getValue({fieldId: 'custevent70'}); // PREFIJO EVENTO
                      var detalleCancelacion = rec.getValue({fieldId: 'custevent1'}); // DETALLE DE CANCELACIÓN
                      var mm_SMS_Val_NSP = rec.getValue({fieldId: 'custevent1189'}); // MM SMS Val (No se presentó):
                      if(prefijoEvento == "12" && detalleCancelacion == "3" && newValPhone.length == 10)
                      {
                        log.debug("prefijoEvento: ", prefijoEvento);
                        log.debug("detalleCancelacion: ", detalleCancelacion);
                        log.debug("newValPhone: ", newValPhone);
                        if(mm_SMS_Val_NSP == "" || mm_SMS_Val_NSP == null) // && mm_SMS_Val_NSP.length <= 3
                        {
                           log.debug("mm_SMS_Val_NSP: ", mm_SMS_Val_NSP);
                           // +527221310265 525547718413 '+newValPhone+'
                           var msgContent = "Albya - Lamentamos que no haya acudido a su cita de valoración. Puede reagendar al 5022 1056";
                           var bodyRequest = '{"messages":[{"content":"'+msgContent+'", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                           var response = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                           log.debug('response.body: ', response.body);
                           var responseObj = JSON.parse(response.body);
                           log.debug('responseObj["messages"][0].message_id: ', responseObj["messages"][0].message_id);
                           rec.setValue({fieldId: 'custevent1189', value: responseObj["messages"][0].message_id});
                           rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                           log.debug('recordId: ', recordId);
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
       if(context.type == "edit")
       {
          log.debug("ue_sms_no_se_presento_Albya.js", "Inicio afterSubmit("+context.type+")");
	      var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
          var url = "https://api.messagemedia.com/v1/messages";
          var recordId = context.newRecord.id;
		  if(recordId != "" && recordId != null)
          {
             var rec = record.load({type: 'calendarevent', id: recordId, isDynamic: true});
             var company = rec.getValue({fieldId: 'company'});
             if(company != "" && company != null)
             {
                log.debug("company: ", company);
                var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: company, columns: ['subsidiary', 'mobilephone']});
                var subsidiary = fieldLookUp['subsidiary'][0].value;
                var mobilephone = fieldLookUp['mobilephone'];
                if(subsidiary == "19" && mobilephone != "" && mobilephone != null)
                {
                   log.debug("subsidiary: ", subsidiary);
                   var numberPattern = /\d+/g;
			   	   var newValPhone = mobilephone.match(numberPattern).join('');
				   var prefijoEvento = rec.getValue({fieldId: 'custevent70'}); // PREFIJO EVENTO
                   var detalleCancelacion = rec.getValue({fieldId: 'custevent1'}); // DETALLE DE CANCELACIÓN
                   var mm_SMS_Val_NSP = rec.getValue({fieldId: 'custevent1189'}); // MM SMS Val (No se presentó):
                   if(prefijoEvento == "12" && detalleCancelacion == "3" && newValPhone.length == 10)
                   {
                      log.debug("prefijoEvento: ", prefijoEvento);
                      log.debug("detalleCancelacion: ", detalleCancelacion);
                      log.debug("newValPhone: ", newValPhone);
                      if(mm_SMS_Val_NSP == "" || mm_SMS_Val_NSP == null) // && mm_SMS_Val_NSP.length <= 3
                      {
                         log.debug("mm_SMS_Val_NSP: ", mm_SMS_Val_NSP);
                         // +527221310265 525547718413 '+newValPhone+'
                         var msgContent = "Albya - Lamentamos que no haya acudido a su cita de valoración. Puede reagendar al 5022 1056";
                         var bodyRequest = '{"messages":[{"content":"'+msgContent+'", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                         var response = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                         log.debug('response.body: ', response.body);
                         var responseObj = JSON.parse(response.body);
                         log.debug('responseObj["messages"][0].message_id: ', responseObj["messages"][0].message_id);
                         rec.setValue({fieldId: 'custevent1189', value: responseObj["messages"][0].message_id});
                         rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                         log.debug('recordId: ', recordId);
                      }
                   }
                }
             }
          }
          log.debug("ue_sms_no_se_presento_Albya.js", "Fin afterSubmit("+context.type+")");
       }
	}

    return {
      	beforeLoad: beforeLoad,
        afterSubmit: afterSubmit
    };
});
