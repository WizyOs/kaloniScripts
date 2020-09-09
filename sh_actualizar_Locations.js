/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/ui/serverWidget", "N/record", "N/https", "N/runtime", "N/encode", "N/url", 'N/email', 'N/log', 'N/search'],
    function (ui, record, https, runtime, encode, urlMod, email, log, search) {
        function execute(context){
          var result_ValAgenMed = get_saved_search_event('customsearch7233', 'custrecord439'); // Script ValAgenMed
          log.debug('result_ValAgenMed: ', result_ValAgenMed);

          var result_ValEfecMed = get_saved_search_event('customsearch7234', 'custrecord28'); // Script ValEfecMed
          log.debug('result_ValEfecMed: ', result_ValEfecMed);

          var result_PAMedical = get_saved_search_event('customsearch7236', 'custrecord440'); // Script PAMedical
          log.debug('result_PAMedical: ', result_PAMedical);

          var result_PARMedical = get_saved_search_event('customsearch7237', 'custrecord3'); // Script PARMedical
          log.debug('result_PARMedical: ', result_PARMedical);

          var result_LeadsMed = get_saved_search_customer('customsearch7235', 'custrecord438'); // Script LeadsMed
          log.debug('result_LeadsMed: ', result_LeadsMed);
        }

        function get_saved_search_event(idSearch, fieldIdVal)
        {
          try
          {
              var totalEvent = 0;
              var mySearch = search.load({id:idSearch});
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      log.debug('result: ', result);
                      //var internalid = result.getValue({name: 'internalid'});
                      //var companyText = result.getText({name: 'company'});
                      var numEvents = result.getValue({name: "internalid", summary: "COUNT"});
                      //log.debug('numEvents: ', numEvents);
					  var sucursalId = result.getValue({name: "custevent2", summary: "GROUP"});
                      //log.debug('sucursalId: ', sucursalId);
					  var sucursalText = result.getText({name: "custevent2", summary: "GROUP"});
                      //log.debug('sucursalText: ', sucursalText);

					  var rec = record.load({type: 'location', id: sucursalId, isDynamic: true});
                      rec.setValue({fieldId: fieldIdVal, value: numEvents}); // , ignoreFieldChange: true
					  var recordId = rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                      log.debug('recordId: ', recordId);

                      totalEvent = (parseInt(totalEvent) + parseInt(numEvents));
                  });
              });
              //log.debug('totalEvent: ', totalEvent);
              return totalEvent;
           }catch(e){
              log.debug('Exception: ', e);
              return false;
          }
        }

        function get_saved_search_customer(idSearch, fieldIdVal)
        {
          try
          {
              var totalEvent = 0;
              var mySearch = search.load({id:idSearch});
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      log.debug('result: ', result);
                      //var internalid = result.getValue({name: 'internalid'});
                      //var companyText = result.getText({name: 'company'});
                      var numEvents = result.getValue({name: "entityid", summary: "COUNT"});
                      //log.debug('numEvents: ', numEvents);
					  var sucursalId = result.getValue({name: "custentity25", summary: "GROUP"});
                      //log.debug('sucursalId: ', sucursalId);
					  var sucursalText = result.getText({name: "custentity25", summary: "GROUP"});
                      //log.debug('sucursalText: ', sucursalText);

					  var rec = record.load({type: 'location', id: sucursalId, isDynamic: true});
                      rec.setValue({fieldId: fieldIdVal, value: numEvents}); // , ignoreFieldChange: true
					  var recordId = rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                      log.debug('recordId: ', recordId);

                      totalEvent = (parseInt(totalEvent) + parseInt(numEvents));
                  });
              });
              //log.debug('totalEvent: ', totalEvent);
              return totalEvent;
           }catch(e){
              log.debug('Exception: ', e);
              return false;
          }
        }

        return {
            execute: execute
        };
    });