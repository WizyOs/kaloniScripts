/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/record', 'N/runtime'], function(log, record, runtime) {

    function beforeLoad(context)
    {
        try
        {
          /*var d = new Date();
          log.debug('sumarDias(): ', sumarDias(d, -21));*/

		 	if(context.type == "edit" || context.type == "create")
       	 	{
              //var recordId = context.newRecord.id;
              var userObj = runtime.getCurrentUser();
              if(userObj.role != "3" && userObj.role != "1258" && userObj.role != "1244")
              {
                log.debug('current user: ', userObj);
                context.form.getField('customform').updateDisplayType({displayType:'disabled'}); // hidden disabled
                //log.debug('current user role: ', userObj.role);
              }
         	}

        }catch(e){
           log.debug('beforeLoad() - '+context.type+' -  Exception log:', e);
        }
    }

    function sumarDias(fecha, dias){
       fecha.setDate(fecha.getDate() + dias);
       return fecha;
    }

    return {
      	beforeLoad: beforeLoad
    };
});
