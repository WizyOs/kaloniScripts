/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/render', 'N/log', 'N/record', 'N/email', 'N/search'], function(render, log, record, email, search) {

    function beforeLoad(context)
    {
        try
        {
          var d = new Date();
          log.debug('sumarDias(): ', sumarDias(d, -21));
          
			var count = 0;
            var mySearch = search.load({id: 'customsearch7543'}); // Leads Nuevos Miradry-BienvenidaMX2020
            var myPagedData = mySearch.runPaged({"pageSize": 1000});

            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
                    log.debug('Each result: ', result);
                    var id = result.id;
                    log.debug('id: ', id);
                    /*var entityid = result.getValue({name: 'entityid'});
                    var altname = result.getValue({name: 'altname'});
                    var phone = result.getValue({name: 'phone'});
                    log.debug('Each phone: ', phone);
                    var numberPattern = /\d+/g;
					var newValPhone = phone.match(numberPattern).join('');
                    if(newValPhone.length == 10)
                    {
                      log.debug('Each newValPhone: ', newValPhone);
                      var bodyRequest = '{"messages":[{"content":"MessageMedia Test", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                      var responseReenvio = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                      var responseReenvioBody = JSON.parse(responseReenvio.body);
                      log.debug('responseReenvioBody: ', responseReenvioBody);
                      count++;
                    }*/
                });
            });
    	   log.debug('count: ', count);
          
		 	/*if(context.type == "view")
       	 	{
              log.debug("beforeLoad() - "+context.type+": ", "Inicio");
              var recordId = context.newRecord.id;
			  if(recordId != "" && recordId != null)
              {
                var rec = record.load({type: 'lead', id: recordId, isDynamic: true});
                var subsidiary = rec.getValue({fieldId: 'subsidiary'});
                log.debug("subsidiary: ", subsidiary);
                var mail = rec.getValue({fieldId: 'email'});
                log.debug("mail: ", mail);
                var utm_Content = rec.getValue({fieldId: 'custentity139'});
                log.debug("utm_Content: ", utm_Content);
                var utm_campaing = rec.getValue({fieldId: 'custentity135'});
                log.debug("utm_campaing: ", utm_campaing);
                var miradry_bienvenidaMX2020 = rec.getValue({fieldId: 'custentity432'}); // Status plantilla miradry_bienvenidaMX2020:
                log.debug("miradry_bienvenidaMX2020: ", miradry_bienvenidaMX2020);

                var tratamiento_miradryMX2020 = rec.getValue({fieldId: 'custentity433'}); // Status plantilla tratamiento_miradryMX2020:
                log.debug("tratamiento_miradryMX2020: ", tratamiento_miradryMX2020);

                if(subsidiary != "" && subsidiary != null && subsidiary == "6")
                {
                   if((utm_Content.indexOf("MIRADRY") >= 0 || utm_campaing.indexOf("MIRADRY") >= 0) && miradry_bienvenidaMX2020 == false)
                   {
                      var mergeResult = render.mergeEmail({templateId: 1038, entity: null, recipient: null, supportCaseId: null, transactionId: null, customRecord: null}); // Email Template = Miradry-BienvenidaMX2020.html, id = 1038
                      var emailSubject = mergeResult.subject;
                      log.debug('emailSubject: ', emailSubject);
                      var emailBody = mergeResult.body;
                      log.debug('emailBody: ', emailBody);
                      if(mail != "" && mail != null && mail.length > 5 && mail.indexOf("@") > 0)
                      {
                        //author: 103204 198528 'Bienvenido a una vida sin sudor'  myvar_html
                        email.send({author: 198528, recipients:[mail], subject:emailSubject, body:emailBody});
                        log.debug('Email: ', 'Enviado correctamente!!');

                        rec.setValue({fieldId: 'custentity432', value: true});
                        rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                      }
                   }
                }
              }
              log.debug("beforeLoad() - "+context.type+": ", "Fin");
         	}*/
        }catch(e){
           log.debug('beforeLoad() - view -  Exception log:', e);
        }
    }

    function sumarDias(fecha, dias){
       fecha.setDate(fecha.getDate() + dias);
       return fecha;
    }

    return {
      	beforeLoad: beforeLoad
    };
});
