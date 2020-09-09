	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/log','N/search','N/file','N/redirect'], function(record,log,search,file,redirect) {

        function beforeLoad(context) {

       }

        function beforeSubmit(context) {

		}
      
		function afterSubmit(context) {
           if(context.type == "create")
           {
    			// logging for test
                log.debug("title", "function afterSubmit(context)");
                var recordId = context.newRecord.id;
                log.debug("recordId: ", recordId);

                redirect.toSuitelet({scriptId: 'customscript1198', deploymentId: 'customdeploy1', parameters:{'recordId':recordId}});
           }
		}
      
		return {
          beforeLoad: beforeLoad,
          beforeSubmit: beforeSubmit,
          afterSubmit: afterSubmit
		};
});