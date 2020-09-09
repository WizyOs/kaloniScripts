/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */


define(['N/record', 'N/ui/dialog'],

    function (record, dialog) {

        function pageInit(context){
            var recordId = record.Record.id;

            //var recId = document.getElementById('id').value;
            dialog.alert("El id del registro es: " + recordId);
        }

        return {
            pageInit: pageInit
        }
    });