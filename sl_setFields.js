/**
* @NApiVersion 2.x
* @NScriptType Suitelet
* @NModuleScope Public
*/

define(['N/record', 'N/log', 'N/search', 'N/ui/serverWidget'],
    function (record, log, search, serverWidget) {

        function onRequest(context) {
            var idCurrentRecord = context.newRecord.id;
            var tab = context.form.addTab({ id: 'custpage_expedientes_cliente', label: 'Expedientes del cliente' });
            var insertTab = context.form.insertTab({ tab: tab, nexttab: 'custom27' });
            context.form.addButton({ id: 'custpage_botonPrueba', label: 'Prueba', functionName: 'colaborar' });
            context.form.addField({ id : 'custpage_text', type : serverWidget.FieldType.TEXT, label : 'Text' });

            if (context.type == 'view') {
                try {
                    var caso = record.load({ type: 'supportcase', id: idCurrentRecord, isDynamic: true });
                    var clienteId = caso.getText({ fieldId: 'company' });
                    var crearBusqueda = search.create({
                        type: 'SUPPORTCASE', title: 'Casos por cliente', id: 'customsearch_casesXcustomer',
                        filters: [{ name: 'company', operator: search.Operator.IS, values: [clienteId] }],
                        columns: [{ name: 'internalId' }, { name: 'number' }, { name: 'title' }]
                    });
                    var resultBusqueda = crearBusqueda.run().getRange(0, 100);

                    log.debug('Search Result', insertTab);
                } catch (error) {
                    log.error('Error Tab y Sublist', error);
                }
            }
        }

        return {
            onRequest: onRequest
        }

    });