function beforeLoadTab(type, form) {
    var currentContext = nlapiGetContext();
    var currentUserID = currentContext.getUser();
    var cliente = nlapiGetFieldText('company');


    // Cases view
    //if ((currentContext.getExecutionContext() == 'userinterface') && (type == 'edit' | type == 'create' | type == 'view')) {
    if ((currentContext.getExecutionContext() == 'userinterface') && (type == 'view')) {

        var expedientesCliente = form.addTab('custpage_expedientescliente', 'Expedientes del Paciente');
        form.insertTab(expedientesCliente, 'custom243');

        var filter = nlobjSearchFilter('company', null, 'is', cliente);
        var columns = Array();
        columns[0] = new nlobjSearchColumn('internalid');
        columns[1] = new nlobjSearchColumn('number');
        columns[2] = new nlobjSearchColumn('title');
        columns[3] = new nlobjSearchColumn('company');

        var search = nlapiSearchRecord('supportcase', 'customsearch_search_ordersale_supportcas', filter, columns);
        nlapiLogExecution('DEBUG', 'Objeto Search', search.length);

        var listaExpedientes = form.addSubList('custpage_sublistexpedientes', 'inlineeditor', 'Expedientes', 'custpage_expedientescliente');

        listaExpedientes.addField('custpage_customer', 'text', 'Customer');
        listaExpedientes.addField('custpage_date', 'text', 'Created');
        listaExpedientes.addField('custpage_title', 'text', 'Subjetc');
        //listaExpedientes.addField('custpage_tx', 'text', 'Tx');
        //listaExpedientes.addField('custpage_valuation', 'text', 'Valuation');
        listaExpedientes.addField('custpage_number', 'text', 'Number');
        listaExpedientes.addField('custpage_view', 'text', 'View PDF');
        //listaExpedientes.addField('custpage_internalid', 'text', 'Internal ID');

        var urlbase = '<a class="dottedlink" href="https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=11779442" target="fldUrlWindow">Historial Clinica</a>';
        var url = null;

        //NOTE: ID FORMULARIOS
        // Diagnóstico capilar -> 135 = 284
        // Diagnóstico Skin & Body -> 138 = 1068

        var rowCount = 0;
        for (var i = 0; i < search.length; i++) {
            rowCount += 1;
/*             var recordId = search[i].getValue('internalid');
            var record = nlapiLoadRecord('supportcase', recordId);
            var typeForm = record.getFieldValue('customform');
            var tx = '';
            var valuation = '';

            if (typeForm == 135) { tx = record.getFieldText('custevent280') || null; } else if (typeForm == 138) { pretx = record.getFieldTexts('custevent1066') || null; for (var c in pretx) { tx += pretx[c] + ' '; } } else { tx = ''; }

            if (typeForm == 135) { valuation = record.getFieldText('custevent284') || null; } else if (typeForm == 138) { valuation = record.getFieldText('custevent1067') || null; } else { valuation = ''; } */
                        

            nlapiSetLineItemValue('custpage_sublistexpedientes', 'custpage_customer', rowCount, '<a class="dottedlink" href="https://3559763.app.netsuite.com/app/common/entity/custjob.nl?id=' + search[i].getValue('company') + '&whence=" target="_blank">' + search[i].getText('company') + '</a>');

            nlapiSetLineItemValue('custpage_sublistexpedientes', 'custpage_date', rowCount, search[i].getValue('createddate'));

            nlapiSetLineItemValue('custpage_sublistexpedientes', 'custpage_title', rowCount, '<a class="dottedlink" href="https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=' + search[i].getValue('internalid') + '" target="_blank">' + search[i].getValue('title') + '</a>');

/*             nlapiSetLineItemValue('custpage_sublistexpedientes', 'custpage_tx', rowCount, tx);
            
            nlapiSetLineItemValue('custpage_sublistexpedientes', 'custpage_valuation', rowCount, valuation); */

            nlapiSetLineItemValue('custpage_sublistexpedientes', 'custpage_number', rowCount, '<a class="dottedlink" href="https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=' + search[i].getValue('internalid') + '" target="_blank">' + search[i].getValue('number') + '</a>');

            nlapiCommitLineItem('custpage_sublistexpedientes');
        }
    }
}