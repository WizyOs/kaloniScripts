/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/file'],

    function (record, search, file) {

        function beforeLoad(context) {
            var recId = document.getElementById('id').nodeValue;
            //var recordId = context.parameters;
            log.debug("Record id desde page init", recId);
            //var companyId = currentRecord.getValue({ fieldId: 'company'});
            //var cliente =  record.load({ type: 'view', id: recordID});
            //var clienteId = cliente.getValue({ fieldId: 'entityid' });
            //var clienteIdText = cliente.getText({ fieldId: 'entityid' });
            //var urlSkin = cliente.value({ fieldId: 'custentity368'});

            
            //log.debug("Record Id", recordID);
            //log.debug("clienteId", clienteId);
            //log.debug("URL", urlSkin);
        }

        function beforeSubmit(context) {

        }

        function afterSubmit(context) {

        }

        return {
            beforeLoad: beforeLoad
        };
    });

