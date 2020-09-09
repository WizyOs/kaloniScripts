/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

 define(['N/record', 'N/log'], function(record, log) {
     
    function beforeLoad(context) {
        log.debug('context', context.request.parameters.default);
        try {
            var idCusomer = context.request.parameters.default;
            var objCustomer = record.load({ type: 'customer', id: idCusomer });
            var field_customer_custentity434 = objCustomer.getValue({ fieldId: 'custentity434' });
    
            var field_sucursal = context.form.getField({ id: 'custevent208' });
            field_sucursal.defaultValue = field_customer_custentity434;
        } catch (error) {
            log.error('Error custevent434', error);
        }

    }

    return {
        beforeLoad: beforeLoad
    };
     
 });