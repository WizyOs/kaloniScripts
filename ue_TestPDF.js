/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record'], function (record) {

    function beforeLoad(context) {
        if (context.type == "view") {
            var recordCaseId = context.newRecord.id;
            var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false });
            var customFormValue = objRecord.getValue({ fieldId: 'customform' });

            if (customFormValue == "26" || customFormValue == "14") {
                context.form.addButton({ id: "custpage_generaldata", label: "Prueba", functionName: "onButtonClick" });
                context.form.clientScriptModulePath = "SuiteScripts/cs_TestPDF.js";
            }
        }
    }
    return {
        beforeLoad: beforeLoad
    };
});