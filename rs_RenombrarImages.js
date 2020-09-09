/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format','N/log','N/file', 'N/https'],

function(record,search,format,log,file,https) {

    function _get(context) {
          try
          {
            /*var newArray = [];
            var sourceClient = '{"sourceClient":[]}';
            sourceClient = JSON.parse(sourceClient);*/
            var count = 0;
            var url = "https://api.messagemedia.com/v1/messages";
            var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
            var mySearch = search.load({id: 'customsearch2706'}); // busquedatest25
            var myPagedData = mySearch.runPaged({"pageSize": 1000});

            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
                    //var email = result.getValue({name: 'attendeeCustomer.email'});
					//var parseJSONval = JSON.parse(JSON.stringify(result));
                    log.debug('Each result: ', result);
                    var id = result.id;
                    var entityid = result.getValue({name: 'entityid'});
                    var altname = result.getValue({name: 'altname'});
                    var phone = result.getValue({name: 'phone'});
                    /*log.debug('Each id: ', id);
                    log.debug('Each entityid: ', entityid);
                    log.debug('Each altname: ', altname);*/
                    log.debug('Each phone: ', phone);
                    var numberPattern = /\d+/g;
					var newValPhone = phone.match(numberPattern).join('');
                    /*var objStr = {id:id, entityid:entityid, altname:altname, phone:newValPhone};
                    log.debug('Each objStr: ', objStr);*/
                    if(newValPhone.length == 10)
                    {
                      log.debug('Each newValPhone: ', newValPhone);
                      var bodyRequest = '{"messages":[{"content":"MessageMedia Test", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                      var responseReenvio = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                      var responseReenvioBody = JSON.parse(responseReenvio.body);
                      log.debug('responseReenvioBody: ', responseReenvioBody);
                      count++;
                    }
                });
            });

    	   log.debug('count: ', count);
		   /*log.debug('newArray total con duplicados: ', newArray.length);
			// Declare a new array
            var newArray2 = [];
            // Declare an empty object
            var uniqueObject = {};
    		var i = null;
            // Loop for the array elements
            for (i in newArray) {
                // Extract the title
                var objTitle = newArray[i]['id'];
                // Use the title as the index
                uniqueObject[objTitle] = newArray[i];
            }
            // Loop to push unique object into array
            for (i in uniqueObject) {
                newArray2.push(uniqueObject[i]);
                sourceClient['sourceClient'].push(uniqueObject[i]);
            }
    		log.debug('newArray2 total final: ', newArray2.length);
            // Display the unique objects
            response = sourceClient;*/

          }catch(e){
            log.debug('Exception: ', e);
            return e.toString();
          }
      return "result";
    }

    function _post(context)
    {
      var response = null;
	  var cont = 0;
      var dateNow = new Date(); // 2019-08-19T20:54:22.270Z
      var fecha = format.format({value: dateNow, type: format.Type.DATE}); // 19/8/2019
      var dateNowSplit = fecha.split("/");
      var anio = dateNowSplit[2];
      var mes = dateNowSplit[1];
      var dia = dateNowSplit[0];
      var dateNowToSeach = dia + "/" + mes + "/" + anio; // '15/08/2019';

      var obj = JSON.parse(context);
      if (obj.hasOwnProperty("param"))
      {
         var valparam = obj.param;
         if (valparam === 'updateImages')
         {
			var filters = [];
            filters [0] =  search.createFilter({name: 'name', operator: search.Operator.IS, values: ['image.jpg']});
      		filters [1] =  search.createFilter({name: 'created', operator: search.Operator.ON, values: [dateNowToSeach]});

            search.create({
                   type: 'file', //search.Type.CUSTOMER,
                   filters: filters,
                   columns: ['internalid', 'filetype', 'name', 'created']
            }).run().each(function(result){
                //if(cont == 0)
                //{
                  var fileid = result.getValue({name: 'internalid'});
                  var filetypeVal = result.getValue({name: 'filetype'});
                  var nameVal = result.getValue({name: 'name'});
                  var createdVal = result.getValue({name: 'created'});
                  //response = '{fileid: "'+ fileid +'", filetypeVal: "'+ filetypeVal +'", nameVal: "'+ nameVal +'", createdVal: "'+ createdVal +'"}';
                  if(filetypeVal == "JPGIMAGE")
                  {
                    //load the file to be renamed
                    var fileRec = file.load({id: fileid});
                    var currFileName = fileRec.name;
                    if(currFileName == 'image.jpg')
                    {
                      var dateMX = new Date();
                      var mxCityDate = format.format({value: dateMX, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
                      //save the current file name of the file
                      var newFileName = currFileName + '_' + mxCityDate + '_(' + cont +  ')';
                      //set the new file name of the file
                      fileRec.name = newFileName;
                      //submit the file so that the new file name would be saved
                      fileRec.save();
                    }
                  }
                //}
                cont++;
              return true;
            });
            //log.debug('cont: ', 'Se actualizó el nombre de ' + cont + ' archivos con nombre: image.jpg');
            if(cont > 0)
              response = 'Se actualizó el nombre de ' + cont + ' archivos con nombre: image.jpg';
         }
      }

      if(response == null && cont == 0)
      {
        //log.debug('Response null: ', 'El parametro recibido "param" no es valido o no se encontraron resultados!!');
        response = 'El parametro recibido "param" no es valido o no se encontraron resultados!!';
      }

        /*var objRes = JSON.parse(response);
        log.debug('objRes: ', objRes);
        return objRes;*/
      	return response;
    }

    return {
        get: _get,
        post: _post
    };

});