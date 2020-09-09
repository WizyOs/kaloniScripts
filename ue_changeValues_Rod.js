/**
 *@NApiVersion 2.x
*@NScriptType UserEventScript
*/

define(['N/record', 'N/log'],
    function (record, log) {

        function beforeSubmit(context) {
            var id_customer = context.newRecord.id;
            var type_customer = context.newRecord.type;

            log.debug('id', id_customer);

            if (id_customer == 74299) {

                if (type_customer == 'edit') {
                    var obj_customer = record.load({ type: 'customer', id: id_customer, isDynamic: true });
                    obj_customer.setValue({
                        fieldId: 'subsidiary',
                        value: 6,
                        ignoreFieldChange: true
                    });
                    obj_customer.setValue({
                        fieldId: 'custentity143',
                        value: 277,
                        ignoreFieldChange: true
                    });
                    obj_customer.setValue({
                        fieldId: 'custentity25',
                        value: 21,
                        ignoreFieldChange: true
                    });
                    obj_customer.setValue({
                        fieldId: 'custentity137',
                        value: 1,
                        ignoreFieldChange: true
                    });
                    obj_customer.setValue({
                        fieldId: 'custentity144',
                        value: 3,
                        ignoreFieldChange: true
                    });
                }
            }
        }

        return {
            beforeSubmit: beforeSubmit
        };

    });