/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/url'],

    function (url) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function beforeLoad(scriptContext) {
            var recordId = 987;
            scriptContext.form.addButton({
                id: 'custpage_buttonTest',
                label: 'Test',
                functionName: 'showPassedValueFunc(' + recordId + ')'
            });

            scriptContext.form.clientScriptModulePath = "SuiteScripts/practica_Client.js";


        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function beforeSubmit(scriptContext) {

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function afterSubmit(scriptContext) {
            var recordId = scriptContext.Record.id;

            scriptContext.addButton({
                id: 'custpage_buttonTest',
                label: 'Test',
                functionName: 'showPassedValueFunc(' + recordId + ')'
            });

            scriptContext.form.clientScriptModulePath = "SuiteScripts/practica_Client.js";
        }

        return {
            beforeLoad: beforeLoad,
            //beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };

    });