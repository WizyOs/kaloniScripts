/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

/**
 * Script que permite guardar el Id del registro padre del cual se procesa la creación del nuevo caso
 *     Rec Padre       --      Rec Hijo
 * Historial Clinico   ->  Historial Clinico
 * Historial Clinico   ->    Diagnosticos
 * Diagnoticos         ->   Procedimientos
 **procedimientos      ->      Revisiones**
 */

define(['N/record', 'N/log'],
    function (record, log) {

        function beforeLoad(context) {
            var recId = null;
            var caso = null;
            var caseIdForm = null;
            //ACTION: Guarda en todos los casos de Historia Clinica el valor 'Id Record' del caso, como su propio 'Id Record Parent'
            if (context.type == 'view' || context.type == 'edit') {
                recId = context.newRecord.id;
                caso = record.load({ type: 'supportcase', id: recId, isDynamic: true });
                caseIdForm = caso.getValue({ fieldId: 'customform' });
                if (caseIdForm == '134') {
                    record.submitFields({ type: 'supportcase', id: recId, values: { custevent_parentrecid: recId } });
                }
            }
            //ACTION: Guarda en todos los casos generados por flujo de trabajo el calor 'Id Record Parent' el 'Id Record' del caso del cual se procesa la creación del caso actual
            if (context.type == 'create') {
                log.debug("context", context.request);
                recId = context.request.parameters.recId || null;
                caseIdForm = context.request.parameters.cf;
                if (caseIdForm == '134' || caseIdForm == '135' || caseIdForm == '14' || caseIdForm == '138' || caseIdForm == '147' || caseIdForm == '33' || caseIdForm == '148' || caseIdForm == '151') {
                    context.newRecord.setValue({ fieldId: 'custevent_parentrecid', value: recId, ignoreFieldChange: true });
                }
            }
        }

        return {
            beforeLoad: beforeLoad
        };
    });