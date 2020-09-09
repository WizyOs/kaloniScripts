/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/ui/serverWidget'], function (record, log, serverWidget) {

    function beforeLoad(context) {
        var recId = '';
        var objRecord = '';
        var customform = 0;
        var groupGraphics = '';

        try {

            if (context.type == 'view') {
                recId = context.request.parameters.id;
                objRecord = record.load({ type: 'supportcase', id: recId });
                customform = objRecord.getValue({ fieldId: 'customform' });
            }
            if (context.type == 'edit') {
                recId = context.newRecord.id;
                objRecord = record.load({ type: 'supportcase', id: recId });
                customform = objRecord.getValue({ fieldId: 'customform' });
            }
            if (context.type == 'create') {
                contextJS = JSON.stringify(context);
                obj_context = JSON.parse(contextJS);
                customform = obj_context.request.parameters.cf;
                //customform = parseInt(customform);
                log.debug('Customform',customform);
            }

            if (customform == 138) {
                var graphicRostro = context.form.addField({ id: 'custpage_graphicrostro', type: serverWidget.FieldType.INLINEHTML, label: 'Gráfico de referencia Rostro', container: 'custom227' });
                graphicRostro.defaultValue = '<figure><img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4" alt="" width="360px"><figcaption align="center">Gráfico de referencia rostro</figcaption></figure>';
                var graphicCuerpo = context.form.addField({ id: 'custpage_graphiccuerpo', type: serverWidget.FieldType.INLINEHTML, label: 'Gráfico de referencia Cuerpo', container: 'custom227' });
                graphicCuerpo.defaultValue = '<figure><img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030" alt="" width="360px"><figcaption align="center">Gráfico de referencia cuerpo</figcaption></figure>';
                context.form.insertField({ field: graphicRostro, nextfield: 'custevent581' });
                context.form.insertField({ field: graphicCuerpo, nextfield: 'custevent604' });
            }

            if (customform == 135) {
                var graphicCabeza = context.form.addField({ id: 'custpage_graphiccabeza', type: serverWidget.FieldType.INLINEHTML, label: 'Gráfico de referencia Cabeza', container: 'custom214' });
                graphicCabeza.defaultValue = '<figure><img src="https://3559763.app.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4" alt="" width="190px"><figcaption align="center">Gráfico de referencia cabeza</figcaption></figure>';
                var graphicBarba = context.form.addField({ id: 'custpage_graphicbarba', type: serverWidget.FieldType.INLINEHTML, label: 'Gráfico de referencia Barba', container: 'custom214' });
                graphicBarba.defaultValue = '<figure><img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2557710&c=3559763&h=9ebd9d599112a672abce" alt="" width="300px"><figcaption align="center">Gráfico de referencia barba</figcaption></figure>';
                //context.form.insertField({ field: graphicCabeza, nextfield: 'custevent303' });
                //context.form.insertField({ field: graphicBarba, nextfield: 'custevent304' });
            }


        } catch (auditError) {
            log.audit('Error UI - Imagenes de referencia', auditError);
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});