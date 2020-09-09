/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define(['N/record', 'N/log'], function (record, log) {

    function pageInit(context) {
        console.log(context);
      var campo = context.addField({ id : 'custpage_text', type : context.FieldType.text, label : 'Text' });
    }
	return {
      pageInit: pageInit
    }
});