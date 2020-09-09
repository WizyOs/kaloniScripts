/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/

define(['N/record', 'N/runtime', 'N/log'],
    function (record, runtime, log) {

        function pageInit(context) {
            var recId = context.currentRecord.id;
            var recType = context.currentRecord.Type;
            var userRole = runtime.getCurrentUser();
            var caso = record.load({ type: 'supportcase', id: recId });

/*             console.log('Record Id ' + recId);
           console.log('NameUser ' + userRole.name);
            console.log('Role Id ' + userRole.role); */
            console.log('Name View ' + recType);
            // USERS ROLES
            // Administrador KHG = 3
            // Enfermeria KHG = 1102
            // Injerto KHG = 1187
            // Consultor Ventas KHG = 1098
var prueba2 = caso.getText({ fieldId: 'custevent522' });
                var prueba = caso.getField({ fieldId: 'custevent522' });
                console.log(prueba.label);
                console.log('prueba 2 ' + prueba2)
            
        }

        return {
            pageInit: pageInit
        }
    });