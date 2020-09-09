/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */
define(['N/record', 'N/file', 'N/redirect', 'N/url', 'N/ui/serverWidget'], function (record, file, redirect, url, serverWidget) {

    function beforeLoad(context) {
        if (context.type == 'view') {
            var recordCaseId = context.newRecord.id;
            var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });


            var suitletURL = url.resolveScript({
                scriptId: 'customscript1114',
                deploymentId: 'customdeploy1',
                params: { recordCaseId: recordCaseId },
                returnExternalUrl: false
            });
            log.debug('URL SUITLET', suitletURL);
            log.debug('CASO', recordCaseId);
            //var link = 'https://3559763.app.netsuite.com'+suitletURL;
            //log.debug('link', link);
            //	var str = "Ver mas";
            //var par = "<p id='demo'></p>";
            // var result = str.link("https://3559763.app.netsuite.com"+suitletURL);
            //document.getElementById("demo").innerHTML = result;
            //log.debug('link', par);

            //log.debug('link', result);
            objRecord.setValue({ fieldId: 'custevent483', value: suitletURL });
            //objRecord.setValue({fieldId: 'custevent484', value: result});
            try {
                objRecord.save({ enableSourcing: true, ignoreMandatoryFields: false });
            } catch (error) {
                log.debug('Error on Save custevent483 suitletURL', error)
            }



        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
