	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
    */
    
   define(['N/record', 'N/log', 'N/runtime'], function(record, log, runtime) {

    function beforeLoad(context) {
        log.debug('context', context);

        if (context.type == 'view') {
            context.form.clientScriptFileId = 6366617;
            context.form.addButton({ id:'custpage_button_link_to_vol', label:'Llamada Online', functionName:'redirectToVol' });
        }
    }

    return {
        beforeLoad: beforeLoad
    }
});