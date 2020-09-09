/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/

define(['require','N/record','N/url','N/https','N/log','N/runtime', 'N/currentRecord'], 
function(require, record, url, https, log, runtime, currentRecord) {

    function pageInit(context) {
        
    }

    function mostrarInfo() {
        var currentUrl = document.location.href;
        var paramsUrl = new URL(currentUrl);
        var mode = paramsUrl.searchParams.get("mode");
        var recId = paramsUrl.searchParams.get("recId");
        var rec = paramsUrl.searchParams.get("parentRecId");
        var valImage1 = null;
        var currentRec = currentRecord.get();
        alert(currentRec.id + recId + rec);

        if (mode == 'e') {

        } else if (mode == 'c') {

        }
    }

    return {
        pageInit: pageInit,
        mostrarInfo: mostrarInfo
    };
    
});