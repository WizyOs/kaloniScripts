/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define([
  "N/record",
  "N/search",
  "N/runtime",
  "N/log",
  "N/ui/serverWidget",
  "N/email"
], function(record, search, runtime, log, serverWidget, email) {
  var userObj = runtime.getCurrentUser();
  var role = userObj.role;
  function beforeLoad(context) {

    if (role != 3 || role != 1092) {
      if (context.type == "edit" || context.type == "view") {
        var str_newRecord = JSON.stringify(context.newRecord);
        var obj_newRecord = JSON.parse(str_newRecord);

        var value_custentity234 = obj_newRecord.fields.custentity234 || '';
        log.debug('val indentification', value_custentity234);
        if (value_custentity234 == '') {
          context.form
            .getField({
              id: "custentity234"
            })
            .updateDisplayType({ displayType: "normal" });
        } else {
          context.form
            .getField({
              id: "custentity234"
            })
            .updateDisplayType({ displayType: "hidden" });
        }
      }
    }
  }

  return {
    beforeLoad: beforeLoad
  };
});
