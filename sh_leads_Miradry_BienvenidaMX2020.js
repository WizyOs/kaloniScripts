/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/render", 'N/email', 'N/log', 'N/search', 'N/record'],
    function (render, email, log, search, record) {
        function execute(context) {
          try
          {
            var count = 0;
            var mySearch = search.load({id: 'customsearch7543'}); // Leads Nuevos Miradry-BienvenidaMX2020
            var myPagedData = mySearch.runPaged({"pageSize": 1000});

            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
                    //log.debug('Each result: ', result);
                    var id = result.id;
                    //log.debug('id: ', id);
                    var mail = result.getValue({name: 'email'});

                    var mergeResult = render.mergeEmail({templateId: 1038, entity: null, recipient: null, supportCaseId: null, transactionId: null, customRecord: null}); // Email Template = Miradry-BienvenidaMX2020.html, id = 1038
                    var emailSubject = mergeResult.subject;
                    log.debug('emailSubject: ', emailSubject);
                    var emailBody = mergeResult.body;
                    log.debug('emailBody: ', emailBody);
                    if(mail != "" && mail != null && mail.length > 5 && mail.indexOf("@") > 0)
                    {
                      var rec = record.load({type:'lead', id:id, isDynamic:true});
                      email.send({author: 198528, recipients:[mail], subject:emailSubject, body:emailBody});
                      log.debug('Email: ', 'Enviado correctamente a: '+ mail);
                      rec.setValue({fieldId: 'custentity432', value: true});
                      rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                      count++;
                    }
                });
            });
    	   log.debug('count: ', count);

          }catch(e){
            log.debug('Exception: ', e);
            //return e.toString();
          }
        }

        return {
            execute: execute
        };
    });