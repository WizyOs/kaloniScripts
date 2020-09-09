/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format'],

    function(record,search,format) {

        function _get(context) {

        }

        function _post(context) {
            var result = null;
            var obj = JSON.parse(context);
            //log.audit('obj: ', obj);

            if (obj.hasOwnProperty("param1"))
            {
                var valparam = obj.param1;
                log.debug('Parametro: ', valparam);
                if (valparam != '')
                {
                    var cod1 = valparam.split('-');
                    log.debug('cod1: ', cod1);
                    var idC = cod1[0];
                    log.debug('idC: ', idC);
                    if(parseInt(idC))
                    {
                        /*result = record.submitFields({
                          type: record.Type.SUPPORTCASE,
                          id: idC,
                          values:{
                                  custevent481: cod1[2],
                                  custevent482: cod1[1]
                          },
                          options:{enableSourcing: false, ignoreMandatoryFields : false}
                          });*/
                        //var objRecord = record.load({type: 'SUPPORTCASE', id: idC, isDynamic: true});
                        var objRecord = record.load({type: 'calendarevent', id: idC, isDynamic: true});
                        objRecord.setValue({fieldId: 'custevent481', value: cod1[1]});
                        objRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
                        log.debug('Encuesta', valparam);
                    }
                }
            }
            /* if(result == null)
               log.audit('Response null: ', 'El parametro recibido "param1" no es valido!!');
               return JSON.parse(result);*/
        }

        return {
            get: _get,
            post: _post
        };

    });
