/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

//define(['N/url', 'N/email', 'N/log', 'N/redirect', 'N/record'], function(url, email, log, redirect, record)
define(['N/record','N/search','N/format','N/log','N/file'], function(record,search,format,log,file){

    function onRequest(context)
  	{
          try
          {
              var totalEvent = 0;
              var mySearch = search.load({id: 'customsearch7235'}); // Script LeadsMed
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      log.debug('result: ', result);
                      //var internalid = result.getValue({name: 'internalid'});
                      //var companyText = result.getText({name: 'company'});
                      var numEvents = result.getValue({name: "entityid", summary: "COUNT"});
                      log.debug('numEvents: ', numEvents);
					  var sucursalId = result.getValue({name: "custentity25", summary: "GROUP"});
                      log.debug('sucursalId: ', sucursalId);
					  var sucursalText = result.getText({name: "custentity25", summary: "GROUP"});
                      log.debug('sucursalText: ', sucursalText);
                    
					  var rec = record.load({type: 'location', id: sucursalId, isDynamic: true});
                      rec.setValue({fieldId: 'custrecord438', value: numEvents}); // , ignoreFieldChange: true
					  var recordId = rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                      log.debug('recordId: ', recordId);
                    
                    totalEvent = (parseInt(totalEvent) + parseInt(numEvents));
                  });
              });
           }catch(e){
              log.debug('Exception: ', e);
              return false;
           }
      log.debug('totalEvent: ', totalEvent);

    }

    return {
        onRequest: onRequest
    };

});
