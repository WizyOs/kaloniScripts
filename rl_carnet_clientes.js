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
                log.debug('context: ', context);
                var obj_citas_Procedimientos = '{"citas":[]}';
                obj_citas_Procedimientos = JSON.parse(obj_citas_Procedimientos);
                var status_procedimientos = {proc1:false, proc2:false, proc3:false, proc4:false, proc5:false, proc6:false};
                var companyFirst = "";
                var newArray = [];
                var cont = 0;
                var boolCompany = false;

				var filters = [];
                filters[0] = search.createFilter({name:'email', operator:search.Operator.IS, values:'rdominguez@kaloni.com'});
                filters[1] = search.createFilter({name:'subsidiary', operator:search.Operator.IS, values:'6'});
                filters[2] = search.createFilter({name:'custevent839', operator:search.Operator.IS, values:['1','2','3','4','5','6']});

				var columns = [];
                columns[0] = search.createColumn({name:'internalid'});
                columns[1] = search.createColumn({name:'company'});
                columns[2] = search.createColumn({name:'subsidiary'});
                //columns[3] = search.createColumn({name:'customform'});
                columns[3] = search.createColumn({name:'custevent839'});

                search.create({
                  type: 'supportcase',
                  filters: filters,
                  columns: columns
                }).run().each(function(result){
                  //log.debug('result: ', result);
                  var caseId = result.getValue({name: 'internalid'});
                  //log.debug('caseId: ', caseId);
                  var company = result.getValue({name: 'company'});
                  var companyName = result.getText({name: 'company'});
                  var procedimiento = result.getValue({name: 'custevent839'});

                  var objRecord = record.load({type: 'supportcase', id: caseId, isDynamic: true});
                  var customform = objRecord.getValue({fieldId: 'customform'});

                  if(customform == "14" && (procedimiento == "1" || procedimiento == "2" || procedimiento == "3" || procedimiento == "4" || procedimiento == "5" || procedimiento == "6"))
                  {
                    if(boolCompany == false)
                    {
                      companyFirst = company;
                      log.debug('companyFirst: ', companyFirst);
                      log.debug('companyName: ', companyName);
                      boolCompany = true;
                    }

                    log.debug('customform: ', customform);
                    log.debug('procedimiento: ', procedimiento);
                    var campo_lav_24h = objRecord.getValue({fieldId: 'custevent138'});
                    var campo_tx_24h = objRecord.getValue({fieldId: 'custevent140'});
                    var campo_resp_24h = objRecord.getValue({fieldId: 'custevent141'});
                    var campo_nota_24h = objRecord.getValue({fieldId: 'custevent139'});

                    var campo_lav_10d = objRecord.getValue({fieldId: 'custevent142'});
                    var campo_tx_10d = objRecord.getValue({fieldId: 'custevent144'});
                    var campo_resp_10d = objRecord.getValue({fieldId: 'custevent145'});
                    var campo_nota_10d = objRecord.getValue({fieldId: 'custevent143'});

                    var campo_lav_1m = objRecord.getValue({fieldId: 'custevent146'});
                    var campo_tx_1m = objRecord.getValue({fieldId: 'custevent148'});
                    var campo_resp_1m = objRecord.getValue({fieldId: 'custevent149'});
                    var campo_nota_1m = objRecord.getValue({fieldId: 'custevent147'});

                    var campo_lav_2m = objRecord.getValue({fieldId: 'custevent811'});
                    var campo_tx_2m = objRecord.getValue({fieldId: 'custevent813'});
                    var campo_resp_2m = objRecord.getValue({fieldId: 'custevent814'});
                    var campo_nota_2m = objRecord.getValue({fieldId: 'custevent812'});

                    var campo_lav_3m = objRecord.getValue({fieldId: 'custevent150'});
                    var campo_tx_3m = objRecord.getValue({fieldId: 'custevent152'});
                    var campo_resp_3m = objRecord.getValue({fieldId: 'custevent153'});
                    var campo_nota_3m = objRecord.getValue({fieldId: 'custevent151'});

                    var campo_lav_4m = objRecord.getValue({fieldId: 'custevent815'});
                    var campo_tx_4m = objRecord.getValue({fieldId: 'custevent817'});
                    var campo_resp_4m = objRecord.getValue({fieldId: 'custevent818'});
                    var campo_nota_4m = objRecord.getValue({fieldId: 'custevent816'});

                    var campo_lav_5m = objRecord.getValue({fieldId: 'custevent154'});
                    var campo_tx_5m = objRecord.getValue({fieldId: 'custevent156'});
                    var campo_resp_5m = objRecord.getValue({fieldId: 'custevent157'});
                    var campo_nota_5m = objRecord.getValue({fieldId: 'custevent155'});

                    var campo_lav_6m = objRecord.getValue({fieldId: 'custevent819'});
                    var campo_tx_6m = objRecord.getValue({fieldId: 'custevent821'});
                    var campo_resp_6m = objRecord.getValue({fieldId: 'custevent822'});
                    var campo_nota_6m = objRecord.getValue({fieldId: 'custevent820'});

                    var campo_lav_7m = objRecord.getValue({fieldId: 'custevent158'});
                    var campo_tx_7m = objRecord.getValue({fieldId: 'custevent160'});
                    var campo_resp_7m = objRecord.getValue({fieldId: 'custevent163'});
                    var campo_nota_7m = objRecord.getValue({fieldId: 'custevent159'});

                    var campo_lav_8m = objRecord.getValue({fieldId: 'custevent823'});
                    var campo_tx_8m = objRecord.getValue({fieldId: 'custevent835'});
                    var campo_resp_8m = objRecord.getValue({fieldId: 'custevent830'});
                    var campo_nota_8m = objRecord.getValue({fieldId: 'custevent826'});

                    var campo_lav_9m = objRecord.getValue({fieldId: 'custevent164'});
                    var campo_tx_9m = objRecord.getValue({fieldId: 'custevent166'});
                    var campo_resp_9m = objRecord.getValue({fieldId: 'custevent167'});
                    var campo_nota_9m = objRecord.getValue({fieldId: 'custevent165'});

                    var campo_lav_10m = objRecord.getValue({fieldId: 'custevent824'});
                    var campo_tx_10m = objRecord.getValue({fieldId: 'custevent834'});
                    var campo_resp_10m = objRecord.getValue({fieldId: 'custevent831'});
                    var campo_nota_10m = objRecord.getValue({fieldId: 'custevent827'});

                    var campo_lav_11m = objRecord.getValue({fieldId: 'custevent825'});
                    var campo_tx_11m = objRecord.getValue({fieldId: 'custevent838'});
                    var campo_resp_11m = objRecord.getValue({fieldId: 'custevent832'});
                    var campo_nota_11m = objRecord.getValue({fieldId: 'custevent828'});

                    var campo_lav_12m = objRecord.getValue({fieldId: 'custevent168'});
                    var campo_tx_12m = objRecord.getValue({fieldId: 'custevent170'});
                    var campo_resp_12m = objRecord.getValue({fieldId: 'custevent171'});
                    var campo_nota_12m = objRecord.getValue({fieldId: 'custevent169'});

                    var campo_lav_13m = objRecord.getValue({fieldId: 'custevent836'});
                    var campo_tx_13m = objRecord.getValue({fieldId: 'custevent833'});
                    var campo_resp_13m = objRecord.getValue({fieldId: 'custevent837'});
                    var campo_nota_13m = objRecord.getValue({fieldId: 'custevent829'});

                    var campo_lav_14m = objRecord.getValue({fieldId: 'custevent172'});
                    var campo_tx_14m = objRecord.getValue({fieldId: 'custevent174'});
                    var campo_resp_14m = objRecord.getValue({fieldId: 'custevent175'});
                    var campo_nota_14m = objRecord.getValue({fieldId: 'custevent173'});

                    if(companyFirst == company)
                    {
                      if(procedimiento == "1" && status_procedimientos.proc1 == false)
                      {
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc1 = true;

                      }else if(procedimiento == "2" && status_procedimientos.proc2 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc2 = true;

                      }else if(procedimiento == "3" && status_procedimientos.proc3 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc3 = true;

                      }else if(procedimiento == "4" && status_procedimientos.proc4 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc4 = true;

                      }else if(procedimiento == "5" && status_procedimientos.proc5 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc5 = true;

                      }else if(procedimiento == "6" && status_procedimientos.proc6 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc6 = true;
                      }
                    }else{
                      log.debug('company es diferente de companyFirst: ', company);
                    }
                  }

                  cont++;
                  return true;
              });
              log.debug('cont: ', cont);
			  log.debug('newArray total con duplicados: ', newArray.length);
              var newArray2 = [];
              var uniqueObject = {};
              var i = null;
              for(i in newArray){
                  var objTitle = newArray[i]['case_internalid'];
                  uniqueObject[objTitle] = newArray[i];
              }
              for(i in uniqueObject){
                  newArray2.push(uniqueObject[i]);
                  obj_citas_Procedimientos['citas'].push(uniqueObject[i]);
              }
              log.debug('newArray2 total final: ', newArray2.length);
          	  return JSON.stringify(obj_citas_Procedimientos);
          
        }catch(e){
          log.debug('Exception 2: ', e);
          return "false";
        }
    }

    function post(context)
    {
        try
        {
          log.debug('context: ', context);
          var obj_citas_Procedimientos = '{"citas":[]}';
          obj_citas_Procedimientos = JSON.parse(obj_citas_Procedimientos);
          var status_procedimientos = {proc1:false, proc2:false, proc3:false, proc4:false, proc5:false, proc6:false};
          var companyFirst = "";
          var newArray = [];
          var cont = 0;
          var boolCompany = false;
          var context_obj = JSON.parse(context);
          if(context_obj.hasOwnProperty('correo') && context_obj.hasOwnProperty('subsidiary'))
          {
             log.debug('context_obj.correo: ', context_obj.correo);
             log.debug('context_obj.subsidiary: ', context_obj.subsidiary);
		     if(context_obj.correo != "" && context_obj.correo != null && context_obj.subsidiary != "" && context_obj.subsidiary != null)
             {
				var filters = [];
                filters[0] = search.createFilter({name:'email', operator:search.Operator.IS, values:context_obj.correo});
                filters[1] = search.createFilter({name:'subsidiary', operator:search.Operator.IS, values:context_obj.subsidiary});
                filters[2] = search.createFilter({name:'custevent839', operator:search.Operator.IS, values:['1','2','3','4','5','6']});

				var columns = [];
                columns[0] = search.createColumn({name:'internalid'});
                columns[1] = search.createColumn({name:'company'});
                columns[2] = search.createColumn({name:'subsidiary'});
                columns[3] = search.createColumn({name:'custevent839'});

                search.create({
                  type: 'supportcase',
                  filters: filters,
                  columns: columns
                }).run().each(function(result){
                  //log.debug('result: ', result);
                  var caseId = result.getValue({name: 'internalid'});
                  //log.debug('caseId: ', caseId);
                  var company = result.getValue({name: 'company'});
                  var companyName = result.getText({name: 'company'});
                  var procedimiento = result.getValue({name: 'custevent839'});

                  var objRecord = record.load({type: 'supportcase', id: caseId, isDynamic: true});
                  var customform = objRecord.getValue({fieldId: 'customform'});
                  if(customform == "14" && (procedimiento == "1" || procedimiento == "2" || procedimiento == "3" || procedimiento == "4" || procedimiento == "5" || procedimiento == "6"))
                  {
                    if(boolCompany == false)
                    {
                      companyFirst = company;
                      log.debug('companyFirst: ', companyFirst);
                      log.debug('companyName: ', companyName);
                      boolCompany = true;
                    }

                    log.debug('customform: ', customform);
                    log.debug('procedimiento: ', procedimiento);
                    var campo_lav_24h = objRecord.getValue({fieldId: 'custevent138'});
                    var campo_tx_24h = objRecord.getValue({fieldId: 'custevent140'});
                    var campo_resp_24h = objRecord.getValue({fieldId: 'custevent141'});
                    var campo_nota_24h = objRecord.getValue({fieldId: 'custevent139'});

                    var campo_lav_10d = objRecord.getValue({fieldId: 'custevent142'});
                    var campo_tx_10d = objRecord.getValue({fieldId: 'custevent144'});
                    var campo_resp_10d = objRecord.getValue({fieldId: 'custevent145'});
                    var campo_nota_10d = objRecord.getValue({fieldId: 'custevent143'});

                    var campo_lav_1m = objRecord.getValue({fieldId: 'custevent146'});
                    var campo_tx_1m = objRecord.getValue({fieldId: 'custevent148'});
                    var campo_resp_1m = objRecord.getValue({fieldId: 'custevent149'});
                    var campo_nota_1m = objRecord.getValue({fieldId: 'custevent147'});

                    var campo_lav_2m = objRecord.getValue({fieldId: 'custevent811'});
                    var campo_tx_2m = objRecord.getValue({fieldId: 'custevent813'});
                    var campo_resp_2m = objRecord.getValue({fieldId: 'custevent814'});
                    var campo_nota_2m = objRecord.getValue({fieldId: 'custevent812'});

                    var campo_lav_3m = objRecord.getValue({fieldId: 'custevent150'});
                    var campo_tx_3m = objRecord.getValue({fieldId: 'custevent152'});
                    var campo_resp_3m = objRecord.getValue({fieldId: 'custevent153'});
                    var campo_nota_3m = objRecord.getValue({fieldId: 'custevent151'});

                    var campo_lav_4m = objRecord.getValue({fieldId: 'custevent815'});
                    var campo_tx_4m = objRecord.getValue({fieldId: 'custevent817'});
                    var campo_resp_4m = objRecord.getValue({fieldId: 'custevent818'});
                    var campo_nota_4m = objRecord.getValue({fieldId: 'custevent816'});

                    var campo_lav_5m = objRecord.getValue({fieldId: 'custevent154'});
                    var campo_tx_5m = objRecord.getValue({fieldId: 'custevent156'});
                    var campo_resp_5m = objRecord.getValue({fieldId: 'custevent157'});
                    var campo_nota_5m = objRecord.getValue({fieldId: 'custevent155'});

                    var campo_lav_6m = objRecord.getValue({fieldId: 'custevent819'});
                    var campo_tx_6m = objRecord.getValue({fieldId: 'custevent821'});
                    var campo_resp_6m = objRecord.getValue({fieldId: 'custevent822'});
                    var campo_nota_6m = objRecord.getValue({fieldId: 'custevent820'});

                    var campo_lav_7m = objRecord.getValue({fieldId: 'custevent158'});
                    var campo_tx_7m = objRecord.getValue({fieldId: 'custevent160'});
                    var campo_resp_7m = objRecord.getValue({fieldId: 'custevent163'});
                    var campo_nota_7m = objRecord.getValue({fieldId: 'custevent159'});

                    var campo_lav_8m = objRecord.getValue({fieldId: 'custevent823'});
                    var campo_tx_8m = objRecord.getValue({fieldId: 'custevent835'});
                    var campo_resp_8m = objRecord.getValue({fieldId: 'custevent830'});
                    var campo_nota_8m = objRecord.getValue({fieldId: 'custevent826'});

                    var campo_lav_9m = objRecord.getValue({fieldId: 'custevent164'});
                    var campo_tx_9m = objRecord.getValue({fieldId: 'custevent166'});
                    var campo_resp_9m = objRecord.getValue({fieldId: 'custevent167'});
                    var campo_nota_9m = objRecord.getValue({fieldId: 'custevent165'});

                    var campo_lav_10m = objRecord.getValue({fieldId: 'custevent824'});
                    var campo_tx_10m = objRecord.getValue({fieldId: 'custevent834'});
                    var campo_resp_10m = objRecord.getValue({fieldId: 'custevent831'});
                    var campo_nota_10m = objRecord.getValue({fieldId: 'custevent827'});

                    var campo_lav_11m = objRecord.getValue({fieldId: 'custevent825'});
                    var campo_tx_11m = objRecord.getValue({fieldId: 'custevent838'});
                    var campo_resp_11m = objRecord.getValue({fieldId: 'custevent832'});
                    var campo_nota_11m = objRecord.getValue({fieldId: 'custevent828'});

                    var campo_lav_12m = objRecord.getValue({fieldId: 'custevent168'});
                    var campo_tx_12m = objRecord.getValue({fieldId: 'custevent170'});
                    var campo_resp_12m = objRecord.getValue({fieldId: 'custevent171'});
                    var campo_nota_12m = objRecord.getValue({fieldId: 'custevent169'});

                    var campo_lav_13m = objRecord.getValue({fieldId: 'custevent836'});
                    var campo_tx_13m = objRecord.getValue({fieldId: 'custevent833'});
                    var campo_resp_13m = objRecord.getValue({fieldId: 'custevent837'});
                    var campo_nota_13m = objRecord.getValue({fieldId: 'custevent829'});

                    var campo_lav_14m = objRecord.getValue({fieldId: 'custevent172'});
                    var campo_tx_14m = objRecord.getValue({fieldId: 'custevent174'});
                    var campo_resp_14m = objRecord.getValue({fieldId: 'custevent175'});
                    var campo_nota_14m = objRecord.getValue({fieldId: 'custevent173'});

                    if(companyFirst == company)
                    {
                      if(procedimiento == "1" && status_procedimientos.proc1 == false)
                      {
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc1 = true;

                      }else if(procedimiento == "2" && status_procedimientos.proc2 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc2 = true;

                      }else if(procedimiento == "3" && status_procedimientos.proc3 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc3 = true;

                      }else if(procedimiento == "4" && status_procedimientos.proc4 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc4 = true;

                      }else if(procedimiento == "5" && status_procedimientos.proc5 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc5 = true;

                      }else if(procedimiento == "6" && status_procedimientos.proc6 == false){
                         newArray.push({case_internalid:caseId, companyId:company, companyName:companyName, num_procedimiento:procedimiento, campo_lav_24h:campo_lav_24h, campo_tx_24h:campo_tx_24h, campo_resp_24h:campo_resp_24h, campo_nota_24h:campo_nota_24h, campo_lav_10d:campo_lav_10d, campo_tx_10d:campo_tx_10d, campo_resp_10d:campo_resp_10d, campo_nota_10d:campo_nota_10d, campo_lav_1m:campo_lav_1m, campo_tx_1m:campo_tx_1m, campo_resp_1m:campo_resp_1m, campo_nota_1m:campo_nota_1m, campo_lav_2m:campo_lav_2m, campo_tx_2m:campo_tx_2m, campo_resp_2m:campo_resp_2m, campo_nota_2m:campo_nota_2m, campo_lav_3m:campo_lav_3m, campo_tx_3m:campo_tx_3m, campo_resp_3m:campo_resp_3m, campo_nota_3m:campo_nota_3m, campo_lav_4m:campo_lav_4m, campo_tx_4m:campo_tx_4m, campo_resp_4m:campo_resp_4m, campo_nota_4m:campo_nota_4m, campo_lav_5m:campo_lav_5m, campo_tx_5m:campo_tx_5m, campo_resp_5m:campo_resp_5m, campo_nota_5m:campo_nota_5m, campo_lav_6m:campo_lav_6m, campo_tx_6m:campo_tx_6m, campo_resp_6m:campo_resp_6m, campo_nota_6m:campo_nota_6m, campo_lav_7m:campo_lav_7m, campo_tx_7m:campo_tx_7m, campo_resp_7m:campo_resp_7m, campo_nota_7m:campo_nota_7m, campo_lav_8m:campo_lav_8m, campo_tx_8m:campo_tx_8m, campo_resp_8m:campo_resp_8m, campo_nota_8m:campo_nota_8m, campo_lav_9m:campo_lav_9m, campo_tx_9m:campo_tx_9m, campo_resp_9m:campo_resp_9m, campo_nota_9m:campo_nota_9m, campo_lav_10m:campo_lav_10m, campo_tx_10m:campo_tx_10m, campo_resp_10m:campo_resp_10m, campo_nota_10m:campo_nota_10m, campo_lav_11m:campo_lav_11m, campo_tx_11m:campo_tx_11m, campo_resp_11m:campo_resp_11m, campo_nota_11m:campo_nota_11m, campo_lav_12m:campo_lav_12m, campo_tx_12m:campo_tx_12m, campo_resp_12m:campo_resp_12m, campo_nota_12m:campo_nota_12m, campo_lav_13m:campo_lav_13m, campo_tx_13m:campo_tx_13m, campo_resp_13m:campo_resp_13m, campo_nota_13m:campo_nota_13m, campo_lav_14m:campo_lav_14m, campo_tx_14m:campo_tx_14m, campo_resp_14m:campo_resp_14m, campo_nota_14m:campo_nota_14m});
                         status_procedimientos.proc6 = true;
                      }
                    }else{
                      log.debug('company es diferente de companyFirst: ', company);
                    }
                  }
                  cont++;
                  return true;
              });
              log.debug('cont: ', cont);
			  log.debug('newArray total con duplicados: ', newArray.length);
              var newArray2 = [];
              var uniqueObject = {};
              var i = null;
              for(i in newArray){
                  var objTitle = newArray[i]['case_internalid'];
                  uniqueObject[objTitle] = newArray[i];
              }
              for(i in uniqueObject){
                  newArray2.push(uniqueObject[i]);
                  obj_citas_Procedimientos['citas'].push(uniqueObject[i]);
              }
              log.debug('newArray2 total final: ', newArray2.length);
           }
          }

           return obj_citas_Procedimientos;
           //return {"status":"ok"};
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
