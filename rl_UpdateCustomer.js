/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/log'],

function(record,log) {

    function _get(context) {

    }

    function _post(context) {
      var result = null;
      var obj = JSON.parse(context);
      log.debug('obj: ', obj);

      if (obj.hasOwnProperty("idEvento") && obj.hasOwnProperty("question") && obj.hasOwnProperty("reaction") && obj.hasOwnProperty("calificacion") && obj.hasOwnProperty("commentario"))
      {
        var idEvento = obj.idEvento;
        if (idEvento != '' && idEvento != null && parseInt(idEvento))
        {
           var objRecord = record.load({type: 'calendarevent', id: idEvento, isDynamic: true});
           objRecord.setValue({fieldId: 'custevent481', value: obj.calificacion});
           objRecord.setValue({fieldId: 'custevent482', value: obj.commentario});
       	   objRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
           log.debug('response: ', true);
           return true;
        }
      }
      log.debug('response: ', false);
      return false;
     /* if(result == null)
        log.audit('Response null: ', 'El parametro recibido "param1" no es valido!!');
	    return JSON.parse(result);*/
    }

    return {
        get: _get,
      	post: _post
    };

});
