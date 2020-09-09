/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/url', 'N/https', 'N/redirect', 'N/ui/dialog', 'N/ui/message', 'N/search', 'N/file'],

    function (record, url, https, redirect, dialog, message, search, file) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */

        function beforeLoad(context) {
            var recId = context.newRecord.id;
            //var userRole = runtime.getCurrentUser();
            var caso = record.load({ type: 'supportcase', id: recId });
            //var formulario = caso.getValue({ fieldId: 'customform'});

            var objField = caso.getField({
                fieldId: 'custevent521'
            }).label;

            log.debug('objeto',objField);
        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         */
        function beforeSubmit(context) {

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         */
        function afterSubmit(context) {


        };

        return {
            beforeLoad: beforeLoad,
            //beforeSubmit: beforeSubmit,
            //afterSubmit: afterSubmit
        };
    });