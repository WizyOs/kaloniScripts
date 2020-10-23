/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/record', 'N/log', 'N/runtime'], function (record, log, runtime) {

    function pageInit(context) {
        log.debug('context portlet', context);
        alert("Corre");
    }

    return {
        pageInit: pageInit
    };
});