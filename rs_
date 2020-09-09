
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
            var recObj1 = [];
            var count = 0;
            var obj = JSON.parse(context);

            if (obj.hasOwnProperty("param1"))
            {
                var valparam = obj.param1;
                if(valparam != '')
                {
                  log.debug('valparam: ', valparam);
          		  var entityVal = null;
                  var cont = 0;
                  search.create({
                         type: search.Type.INVOICE,
                         //filters: [search.createFilter({name: 'entity', operator: search.Operator.CONTAINS, values: [valparam]})],
                    	 filters: [search.createFilter({name: 'custbody_historial_medico', operator: search.Operator.IS, values: [valparam]})],
                         columns: ['entity']
                  }).run().each(function(result){
                      //if(cont == 0)
                         entityVal = result.getText({name: 'entity'});
                    	 log.debug('entityVal: ', entityVal);
                      cont++;
                      //return true;
                  });
                  log.debug('cont: ', cont);
                  return entityVal;
               }
           }
       }
        return {
            get: _get,
            post: _post
        };

    });