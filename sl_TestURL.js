/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */


define([],

    function () {

        function onRequest() {
            var recId = document.getElementById('id').value;
            log.debug("Record Actual", recId);
            return recId;
        }
        return {
            onRequest: onRequest
        }
    }