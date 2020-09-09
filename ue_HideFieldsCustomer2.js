	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/runtime', 'N/log'], function(runtime, log) {

   function beforeLoad(context)
   {
     if(context.type == "view" || context.type == "edit" || context.type == "create")
     {
        log.debug("ue_HideFieldsCustomer2.js", "Inicio beforeLoad("+context.type+")");
        var userObj = runtime.getCurrentUser();
        log.debug('current user: ', userObj);
        log.debug("current user role: ", userObj.role);
        if(userObj.role == "1187") // "1187 = Kaloni Hair - Injerto KHG"
        {
		   context.form.getField('phone').updateDisplayType({displayType:'hidden'});
           context.form.getField('mobilephone').updateDisplayType({displayType:'hidden'});
           context.form.getField('homephone').updateDisplayType({displayType:'hidden'});
           context.form.getField('email').updateDisplayType({displayType:'hidden'});
        }
        log.debug("ue_HideFieldsCustomer2.js", "Fin beforeLoad("+context.type+")");
     }
   }

    return {
       beforeLoad: beforeLoad
	};
});
