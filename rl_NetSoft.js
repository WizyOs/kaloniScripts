/**

 * @NApiVersion 2.x

 * @NScriptType Restlet

 * @NModuleScope SameAccount

 */

define(['N/record','N/log'],

function(record,log) {

    function get(context) {
      log.debug('msg get', context);
		return context.param1;
    }
  
  function post(context) {
    log.debug('msg post',context);
		return {msg: 'post'};
    }

    return {
        get: get,
      	post: post
        
    };

});
