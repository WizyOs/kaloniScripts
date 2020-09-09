/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

 define(['N/record', 'N/log'],
    function(record, log) {
        function beforeLoad(context) {
            //log.debug('context', context.newRecord);
            var idCustomer = context.request.parameters.default;
            var currentRecord = context.newRecord;
            var value_customform = currentRecord.getValue({ fieldId: 'customform' });
            log.debug('context1', idCustomer);
            log.debug('context2', currentRecord);
            log.debug('context3', value_customform);

            try {
                if (value_customform !== '110') {
                    var objRecord = record.load({ type: 'customer', id: idCustomer, isDynamic: true });
                    //var field_custentity229_ageCustomer = objRecord.getValue({ fieldId: 'custentity299' });
                    var field_custentity_sexo_generoCustomer = objRecord.getValue({ fieldId: 'custentity_sexo' });
                    var field_custentity25_sucursalCustomer = objRecord.getValue({ fieldId: 'custentity25' });
        
                    //currentRecord.setValue({ fieldId: 'custevent332', value: field_custentity229_ageCustomer, ignoreFieldChange: true });
                    currentRecord.setValue({ fieldId: 'custevent634', value: field_custentity_sexo_generoCustomer, ignoreFieldChange: true });
                    currentRecord.setValue({ fieldId: 'custevent2', value: field_custentity25_sucursalCustomer, ignoreFieldChange: true });
                }
            } catch (error) {
                log.error('Error de caso TI', error);
            }
        }

        return {
            beforeLoad: beforeLoad
        };
    });