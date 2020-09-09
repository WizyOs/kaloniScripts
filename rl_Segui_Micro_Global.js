/**

 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount

 */

define(['N/record','N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format', 'N/https', 'N/url'],

function(record,log,file,email,search,serverWidget,format,https,url) {

    function get(context)
  	{
        try
        {
            /*var fileObj = file.create({name:'IDs.txt', fileType:file.Type.PLAINTEXT, contents:'2736462e-8ee7-43d6-bac3-1b8bdad679b0,ef3d1792-f422-4f88-a4cc-433c8ec07fee', encoding:file.Encoding.UTF8, folder:'4433758', isOnline:false});
            var txt_fileId = fileObj.save();
            log.debug('txt_fileId: ', txt_fileId);*/

            var fileObj = generarTxt();
            if(fileObj != null)
            {
              var fileOrigen = {id:fileObj.id, name:fileObj.name, folder:fileObj.folder, fileType:fileObj.fileType, contents:fileObj.getContents()};
              log.debug('fileOrigen: ', fileOrigen);

              var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
              var bodyRequest = '{"messages":[{"content":"otro test", "destination_number":"+527221310265", "format":"SMS"}]}';
              var responseReenvio = https.request({method:https.Method.POST, url:"https://api.messagemedia.com/v1/messages", headers:headers, body:bodyRequest});
              var responseReenvioBody = JSON.parse(responseReenvio.body);
              log.debug('responseReenvioBody: ', responseReenvioBody);
              fileOrigen.contents += ","+responseReenvioBody['messages'][0].message_id;
              log.debug('responseReenvioBody["messages"][0].message_id: ', responseReenvioBody['messages'][0].message_id);

              var newFile = file.create({name:fileOrigen.name, fileType:fileObj.fileType, contents:fileOrigen.contents, encoding:file.Encoding.UTF8, folder:fileObj.folder, isOnline:false});
              newFile.save();
            }
            return "res";
         	/*var resArr = ids[i].substring(ids[i].length - 3, ids[i].length);
                 if(resArr != "|ok")
                 {
                   folio = ids[i];
                   break;
                 }*/

			/*var result = get_saved_search('customsearch7178'); // Disparo mailing 11D
            log.debug('result: ', result);
            return "res";*/

            /*var recip = ['al221211350@gmail.com'];
            var ccRecip = ['al221211350@gmail.com'];
			var res = email.send({author: 198528, recipients: 'al221211350@gmail.com', cc: ccRecip, subject:'¿Cómo retirar las costras del microinjerto?', body:'testing okokok'});
            log.debug(res); // cc: ['637079'],
          	return 'ok';*/

			/*log.debug('Got Here')
			var url = 'https://api.messagemedia.com/v1/messages';
            var body = '{"messages":[{"content":"testing pers2", "destination_number":"+527221310265", "format":"SMS"}]}'; // 7221310265  5532490939
			var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
			var response = https.request({method: https.Method.POST, url: url, headers: headers, body : body});
			log.debug('Response: ', response);
            log.debug('Response.body: ', response.body);
            var obj = JSON.parse(response.body);
            var message_id = obj['messages'][0].message_id;
            log.debug('message_id: ', message_id);
            if(message_id.length == 36 && message_id != null && message_id != '')
            {
              var response2 = https.request({method: https.Method.GET, url: url+'/'+message_id, headers: headers});
              log.debug('Response2: ', response2);
              log.debug('Response2.body: ', response2.body);
            }
            return "result";*/

          /*var dateMx = new Date();
          var mxDate = format.format({value: dateMx, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY}); // 28/8/2019 11:28:52 am
          log.debug('mxDate: ', mxDate);
          var mxDate_Split = mxDate.split('/');
          var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
          var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
          var anio_Mx = mxDate_Split[2].substring(0, 4);
          log.debug('dia_Mx: ', dia_Mx);
          var savedS = '';
          if(dia_Mx != null && dia_Mx != '' && parseInt(dia_Mx) >= 5)
            savedS = 'customsearch6443'; // Seguimiento Microinjerto Global
          else
            savedS = 'customsearch7309'; // Seguimiento Microinjerto Global Mes Pasado

          var result_Segui_Micro_Global = get_saved_search_customer(savedS);
          log.debug('result_Segui_Micro_Global: ', result_Segui_Micro_Global);
          return JSON.stringify(result_Segui_Micro_Global);*/
        }catch(e){
          log.debug('Exception 2: ', e);
          return "false";
        }
    }
  
  function generarTxt()
  {
    var fileObj = null;
    var dateMx = new Date();
    var mxDate = format.format({value: dateMx, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
    //log.debug('mxDate: ', mxDate);
    var mxDate_Split = mxDate.split('/');
    var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
    var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
    var anio_Mx = mxDate_Split[2].substring(0, 4);
    var fecha = dia_Mx+'-'+mes_Mx+'-'+anio_Mx;
    try
    {
       fileObj = file.load({id:'SuiteScripts/ScriptFactory/MessageMedia/'+fecha+'_IDs.txt'});
       log.debug('generarTxt(): ', 'Si existe txt');
    }catch(e){
       log.debug('Exception generarTxt(): ', e);
       log.debug('Exception generarTxt() - fileObj: ', fileObj);
       if(fileObj == null)
       {
         var newFile = file.create({name:fecha+'_IDs.txt', fileType:file.Type.PLAINTEXT, contents:'', encoding:file.Encoding.UTF8, folder:'4433758', isOnline:false});
         var txt_fileId = newFile.save();
         log.debug('txt_fileId: ', txt_fileId)
         fileObj = file.load({id:txt_fileId});
       }
    }
    return fileObj;
  }
  
        function get_saved_search(idSearch)
        {
          try
          {
            var count = 0;
            log.debug('idSearch: ', idSearch);
            var mySearch = search.load({id: idSearch});
            var myPagedData = mySearch.runPaged({"pageSize": 1000});

            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
                    log.debug('result: ', result);
                    //var email = result.getValue({name: 'attendeeCustomer.email'});
					var parseJSONval = JSON.parse(JSON.stringify(result));
                    /*var email_value = parseJSONval.values["attendeeCustomer.email"][0].value;
                    var email_text = parseJSONval.values["attendeeCustomer.email"][0].text;*/
                    var correo = parseJSONval.values["attendeeCustomer.email"];
                    //log.debug('correo: ', correo);
                  
                    if(correo != "" && correo != null)
                    {
                      var customerId = "";
                      var email = "";
                      search.create({
                            type: search.Type.CUSTOMER,
                            filters: [search.createFilter({name: 'email', operator: search.Operator.IS, values: [correo]})],
                            columns: ['internalid', 'email']
                      }).run().each(function(result){
                          //var jsonString = JSON.stringify(result);	var obj = JSON.parse(jsonString);
                          customerId = result.getValue({name: 'internalid'});
                          log.debug('customerId: ', customerId);
                          email = result.getValue({name: 'email'});
                          log.debug('email: ', email);
                          return true;
                      });

                      //var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: customerId, columns: ['custentity386']});
                      var objRecord = record.load({type: record.Type.CUSTOMER, id: customerId, isDynamic: true});
                      var noVolverAcontactar = objRecord.getValue({fieldId: 'custentity386'});
                      log.debug('noVolverAcontactar: ', noVolverAcontactar);
                      if(noVolverAcontactar == false)
                        log.debug('bool: ', 'false');
                    }
                  
                    //var ccRecip = ['ajuarez@kaloni.com'];
                    //email.send({author: 198528, recipients:correo, cc: ccRecip, subject:'¿Cómo retirar las costras del microinjerto?', body:body_m}); // 103204 198528
            		//log.debug('Disparo mailing 1D to: ', correo);
                    count++;
                });
            });
          	return true;
          }catch(e){
            log.debug('Exception: ', e);
            return false;
          }
        }
  

    function post(context)
    {
        try
        {
          var dateMx = new Date();
          var mxDate = format.format({value: dateMx, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY}); // 28/8/2019 11:28:52 am
          log.debug('mxDate: ', mxDate);
          var mxDate_Split = mxDate.split('/');
          var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
          var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
          var anio_Mx = mxDate_Split[2].substring(0, 4);
          log.debug('dia_Mx: ', dia_Mx);
          var savedS = 'customsearch6443';
          /*if(dia_Mx != null && dia_Mx != '' && parseInt(dia_Mx) >= 5)
            savedS = 'customsearch6443'; // Seguimiento Microinjerto Global
          else
            savedS = 'customsearch7309'; // Seguimiento Microinjerto Global Mes Pasado*/

          var result_Segui_Micro_Global = get_saved_search_customer(savedS);
          log.debug('result_Segui_Micro_Global: ', result_Segui_Micro_Global);
          return result_Segui_Micro_Global;
        }catch(e){
          log.debug('Exception 2: ', e);
          return false;
        }
    }

        function get_saved_search_customer(idSearch)
        {
          try
          {
      		  var obj_Segui_Micro_Global = '{"segui_Micro_Global":[]}';
        	  obj_Segui_Micro_Global = JSON.parse(obj_Segui_Micro_Global);
              var totalMicro = 0;
              var mySearch = search.load({id:idSearch});
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      //log.debug('result: ', result);
                      var id = result.id;
                      //log.debug('id: ', id);
                      var entityid = result.getValue({name: 'entityid'});
                      //log.debug('entityid: ', entityid);
                      var altname = result.getValue({name: 'altname'});
                      //log.debug('altname: ', altname);
                      var confirmacion = result.getText({name: 'custevent80', join: 'event'});
                      //log.debug('confirmacion: ', confirmacion);
                      var startdate = result.getValue({name: 'startdate', join: 'event'});
                      //log.debug('startdate: ', startdate);
                      var sucursal = result.getText({name: 'custevent2', join: 'case'});
                      //log.debug('sucursal: ', sucursal);
                      var subsidiary = result.getText({name: 'subsidiary'});
                      //log.debug('subsidiary: ', subsidiary);
                      var medicos_precedimiento = result.getText({name: 'custevent28', join: 'case'});
                      //log.debug('medicos_precedimiento: ', medicos_precedimiento);
                      var diseno_img1 = result.getText({name: 'custevent82', join: 'case'});
                      //log.debug('diseno_img1: ', diseno_img1);
                      var firma_aceptacion = result.getValue({name: 'custevent86', join: 'case'});
                      //log.debug('firma_aceptacion: ', firma_aceptacion);
                      var firma_medico_injerto = result.getValue({name: 'custevent87', join: 'case'});
                      //log.debug('firma_medico_injerto: ', firma_medico_injerto);
                      var firma_consentimiento = result.getValue({name: 'custevent201', join: 'case'});
                      //log.debug('firma_consentimiento: ', firma_consentimiento);
                      obj_Segui_Micro_Global['segui_Micro_Global'].push({id: id, entityid: entityid, altname: altname, confirmacion: confirmacion, startdate: startdate, sucursal: sucursal, subsidiary: subsidiary, medicos_precedimiento: medicos_precedimiento, diseno_img1: diseno_img1, firma_aceptacion: firma_aceptacion, firma_medico_injerto: firma_medico_injerto, firma_consentimiento: firma_consentimiento});
                      /*var column_1 = result.columns[1];
                      var column_2 = result.columns[2];*/
                      totalMicro++;
                  });
              });
              log.debug('totalMicro: ', totalMicro);
              return obj_Segui_Micro_Global;
           }catch(e){
              log.debug('Exception: ', e);
              return false;
          }
        }

    return {
        get: get,
      	post: post
    };
});
