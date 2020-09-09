/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/search', 'N/runtime', 'N/log', 'N/ui/serverWidget', 'N/email'],
  function (record, search, runtime, log, serverWidget, email) {
    var userObj = runtime.getCurrentUser();
    var role = userObj.role;
    function beforeLoad(context) {

      log.debug('context', context);

      if (role != 3 || role != 1092) {
        //if (userObj.subsidiary == '19') {
          context.form.getField({
            id: 'subsidiary'
          }).updateDisplayType({ displayType: 'hidden' });
        //}
      }
    }

    return {
      beforeLoad: beforeLoad
    };
  });