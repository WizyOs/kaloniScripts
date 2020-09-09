/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/crypto", "N/https", "N/runtime", "N/encode", "N/url", "N/log", "N/record", "N/file", "N/format"],
    function (crypto, https, runtime, encode, url, log, record, file, format) {
        function execute(context)
  		{
          try
          {
            var dateMx = new Date();
            var mxDate = format.format({value: dateMx, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
            var mxDate_Split = mxDate.split('/');
            var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
            var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
            var anio_Mx = mxDate_Split[2].substring(0, 4);
            var fecha = dia_Mx+'-'+mes_Mx+'-'+anio_Mx;
            var fileObj = file.load({id:'SuiteScripts/ScriptFactory/MessageMedia/'+fecha+'_IDs.txt'}); // '5367992'
            var fileOrigen = {id:fileObj.id, name:fileObj.name, folder:fileObj.folder, fileType:fileObj.fileType, contents:fileObj.getContents()};
            log.debug('fileOrigen: ', fileOrigen);

            if(fileOrigen.contents.indexOf(",") >= 0)
            {
              var ids = fileOrigen.contents.split(',');
              var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};

              for(var i=0; i<ids.length; i++)
              {
                if(ids[i].length == 36 && ids[i] != null && ids[i] != '')
                {
                  log.debug('if ids[i]: ', ids[i]);
                  var getStatus = https.request({method:https.Method.GET, url:'https://api.messagemedia.com/v1/messages/'+ids[i], headers: headers});
                  log.debug('getStatus.body: ', getStatus.body);
                  var obj = JSON.parse(getStatus.body);
                  //var status = obj.status;
                  log.debug('status: ', obj.status);
                  fileOrigen.contents = fileOrigen.contents.replace(ids[i], ids[i]+'|'+obj.status);
                  log.debug('fileOrigen.contents: ', fileOrigen.contents);

                  if(obj.status != "submitted" && obj.status != "processed" && obj.status != "enroute")
                  {
                    var bodyRequest = '{"messages":[{"content":"'+obj.content+'", "destination_number":"'+obj.destination_number+'", "format":"SMS"}]}';
                    var responseReenvio = https.request({method:https.Method.POST, url:"https://api.messagemedia.com/v1/messages", headers:headers, body:bodyRequest});
                    log.debug('responseReenvio.body: ', responseReenvio.body);
                    var responseReenvioObj = JSON.parse(responseReenvio.body);
                    fileOrigen.contents += ","+responseReenvioObj["messages"][0].message_id;
                    log.debug('responseReenvioObj["messages"][0].message_id: ', responseReenvioObj["messages"][0].message_id);
                  }

                }else if(ids[i].length > 36 && ids[i] != null && ids[i] != ''){
                  log.debug('else ids[i]: ', ids[i]);
                  var id_status = ids[i].split('|');
                  if(id_status[1] != "submitted" && id_status[1] != "processed" && id_status[1] != "enroute")
                  {
                    var getStatus2 = https.request({method:https.Method.GET, url:'https://api.messagemedia.com/v1/messages/'+id_status[0], headers: headers});
                    log.debug('getStatus2.body: ', getStatus2.body);
                    var obj2 = JSON.parse(getStatus2.body);
                    //var status = obj.status;
                    log.debug('status2: ', obj2.status);
                    fileOrigen.contents = fileOrigen.contents.replace(ids[i], id_status[0]+'|'+obj2.status);
                    log.debug('fileOrigen.contents2: ', fileOrigen.contents);

                    if(obj2.status != "submitted" && obj2.status != "processed" && obj2.status != "enroute")
                    {
                      var bodyRequest2 = '{"messages":[{"content":"'+obj2.content+'", "destination_number":"'+obj2.destination_number+'", "format":"SMS"}]}';
                      var responseReenvio2 = https.request({method:https.Method.POST, url:"https://api.messagemedia.com/v1/messages", headers:headers, body:bodyRequest2});
                      log.debug('responseReenvio2.body: ', responseReenvio2.body);
                      var responseReenvio2Obj = JSON.parse(responseReenvio2.body);
                      fileOrigen.contents += ","+responseReenvio2Obj["messages"][0].message_id;
                      log.debug('responseReenvio2Obj["messages"][0].message_id: ', responseReenvio2Obj["messages"][0].message_id);
                      /*log.debug('responseReenvio2: ', responseReenvio2);
                      var responseReenvioObj2 = JSON.parse(responseReenvio2.body);
                      fileOrigen.contents += ","+responseReenvioObj2.message_id;
                      log.debug('responseReenvioObj2.message_id: ', responseReenvioObj2.message_id);*/
                    }
                  }
                }
              }
              var newFile = file.create({name:fileOrigen.name, fileType:fileObj.fileType, contents:fileOrigen.contents, encoding:file.Encoding.UTF8, folder:fileObj.folder, isOnline:false});
              newFile.save();
            }
            log.debug('function execute(): ', 'Fin'); //return "res";
          }catch(e){
            log.debug('Exception: ', e);
            return false;
          }
        }

        return {
            execute: execute
        };
    });