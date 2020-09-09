/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format','N/log','N/file'],

function(record,search,format,log,file) {

  function _get(context){
          var response = null;
      
          try
          {
              var count = 0;
              var newArray = [];
              var objAgendas = '{"agendas":[]}';
              //log.debug('array objAgendas JSON: ', objAgendas);
      	   	  objAgendas = JSON.parse(objAgendas);
              log.debug('objAgendas: ', objAgendas);
              var mySearch = search.load({id: 'customsearch7225'}); // Eventos del dia
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      //log.debug('result POST: ', result);
                      var internalid = result.getValue({name: 'internalid'});
                      var company = result.getValue({name: 'company'});
                      var companyText = result.getText({name: 'company'});
                      var startdate = result.getValue({name: 'startdate'});
                      var starttime = result.getValue({name: 'starttime'});
                      var endtime = result.getValue({name: 'endtime'});
                      var location = result.getValue({name: 'location'});
                      var status = result.getText({name: 'status'});
                      var estadoConf = result.getText({name: 'custevent80'});

                      if(company != null && company != "")
                      {
                        if(internalid != null && internalid != "")
                        {
                          var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: company, columns: ['email', 'subsidiary']});
                          log.debug('fieldLookUp: ', fieldLookUp);
                          newArray.push({internalid: internalid, companyId: company, companyText: companyText, email: fieldLookUp.email, estado_confirmacion: estadoConf, startdate: startdate, starttime: starttime, endtime: endtime, location: location, status: status, subsidiary: fieldLookUp.subsidiary[0].value});
                          
                            /*var objJSON = JSON.stringify({internalid: internalid, companyId: company, companyText: companyText, email: fieldLookUp.email, estado_confirmacion: estadoConf, startdate: startdate, starttime: starttime, endtime: endtime, location: location, status: status}) + ",";
                            log.debug('objJSON: ', objJSON);
                            objAgendas += objJSON;*/
                        }
                      }
                    count++;
                  });
              });
           }catch(e){
              log.debug('Exception: ', e);
              return false;
           }
    
    	   log.debug('count: ', count);
		   log.debug('newArray total con duplicados: ', newArray.length);
			// Declare a new array
            var newArray2 = [];
            // Declare an empty object
            var uniqueObject = {};
    		var i = null;
            // Loop for the array elements
            for (i in newArray) {
                // Extract the title
                var objTitle = newArray[i]['internalid'];
                // Use the title as the index
                uniqueObject[objTitle] = newArray[i];
            }
            // Loop to push unique object into array
            for (i in uniqueObject) {
                newArray2.push(uniqueObject[i]);
                objAgendas['agendas'].push(uniqueObject[i]);
            }
    		log.debug('newArray2 total final: ', newArray2.length);
            // Display the unique objects
            response = objAgendas;
			log.debug('response: ', response);
    		return response;
      
      	   //return response; // response
  }

    function _post(context)
    {
      	  log.debug('request: ', 'POST');
          var response = null;
          try
          {
              var count = 0;
              var newArray = [];
              var objAgendas = '{"agendas":[]}';
              //log.debug('array objAgendas JSON: ', objAgendas);
      	   	  objAgendas = JSON.parse(objAgendas);
              log.debug('objAgendas: ', objAgendas);
              var mySearch = search.load({id: 'customsearch7225'}); // Eventos del dia
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      //log.debug('result POST: ', result);
                      var internalid = result.getValue({name: 'internalid'});
                      var prefijo = result.getValue({name: 'custevent70'});
                      var prefijoText = result.getText({name: 'custevent70'});
                      var company = result.getValue({name: 'company'});
                      var companyText = result.getText({name: 'company'});
                      var startdate = result.getValue({name: 'startdate'});
                      var starttime = result.getValue({name: 'starttime'});
                      var endtime = result.getValue({name: 'endtime'});
                      var location = result.getValue({name: 'location'});
                      var status = result.getText({name: 'status'});
                      var estadoConf = result.getText({name: 'custevent80'});

                      if(company != null && company != "")
                      {
                        if(internalid != null && internalid != "")
                        {
                          var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: company, columns: ['email', 'subsidiary']});
                          //log.debug('fieldLookUp: ', fieldLookUp.email);
                          newArray.push({internalid: internalid, prefijoId: prefijo, prefijoText: prefijoText, companyId: company, companyText: companyText, email: fieldLookUp.email, estado_confirmacion: estadoConf, startdate: startdate, starttime: starttime, endtime: endtime, location: location, status: status, subsidiary: fieldLookUp.subsidiary[0].value});
                        }
                      }
                    count++;
                  });
              });

               log.debug('count: ', count);
               log.debug('newArray total con duplicados: ', newArray.length);
                // Declare a new array
                var newArray2 = [];
                // Declare an empty object
                var uniqueObject = {};
                var i = null;
                // Loop for the array elements
                for (i in newArray) {
                    // Extract the title
                    var objTitle = newArray[i]['internalid'];
                    // Use the title as the index
                    uniqueObject[objTitle] = newArray[i];
                }
                // Loop to push unique object into array
                for (i in uniqueObject) {
                    newArray2.push(uniqueObject[i]);
                    objAgendas['agendas'].push(uniqueObject[i]);
                }
                log.debug('newArray2 total final: ', newArray2.length);
                // Display the unique objects
                response = objAgendas;
                log.debug('response: ', response);

           }catch(e){
              log.debug('Exception: ', e);
              return false;
           }
    	return response;
    }

   function getFormato(val_fecha)
   {
      var fecha = format.format({value: val_fecha, type: format.Type.DATE}); // 19/8/2019
      log.debug('format.format fecha: ', fecha);
      var dateNowSplit = fecha.split("/");
      var anio = dateNowSplit[2];
      var mes = dateNowSplit[1];
      var dia = dateNowSplit[0];
      var dateNowToSeach = dia + "/" + mes + "/" + anio; // '15/08/2019';
      log.debug('dateNowToSeach: ', dateNowToSeach);
      return dateNowToSeach;
   }

    return {
        get: _get,
        post: _post
    };

});