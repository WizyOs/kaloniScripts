/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format'],

    function(record,search,format) {

        function _get(context) {}

        function _post(context) {
            var obj = JSON.parse(context);

            if (obj.hasOwnProperty("hg"))
            {
                var valHg = obj.hg;
                if(valHg != "" && valHg != null)
                {
                  log.debug('valHg: ', valHg);
                  var customer_id = searchCustomer(valHg);
                  log.debug('customer_id: ', customer_id);

                  if(customer_id != "" && customer_id != null)
              	 	 return customer_id;
               }
           }
           return "ok";
       }
  
        function searchCustomer(hg)
        {
            var customerid = null;
            var cont = 0;
            search.create({
                   type: search.Type.CUSTOMER,
                   filters: [search.createFilter({name: 'entityid', operator: search.Operator.IS, values: [hg]})],
                   columns: ['internalid', 'entityid']
            }).run().each(function(result){
                if(cont == 0)
                   customerid = result.getValue({name: 'internalid'});
                cont++;
                //return true;
            });
            log.debug('cont: ', cont);
            return customerid;
        }
  
        return {
            get: _get,
            post: _post
        };

    });