/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */

define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/log', 'N/search', 'N/currentRecord'], function (record, file, serverWidget, log, search, currentRecord) {

    function beforeLoad(context) {
        context = JSON.parse(JSON.stringify(context));

        var idCustomer = context.request.parameters.id;
        var totalFacturas = 0;

        var searchCreate_VentaKaloni = search.create({
            "type": "transaction",
            "filters": [{
                    "name": "type",
                    "operator": "anyof",
                    "values": [
                        "CustInvc",
                        "CustCred"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "status",
                    "operator": "anyof",
                    "values": [
                        "@ALL@"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "mainline",
                    "operator": "is",
                    "values": [
                        "T"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "class",
                    "operator": "noneof",
                    "values": [
                        "16"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "location",
                    "operator": "noneof",
                    "values": [
                        "20",
                        "18"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "subsidiary",
                    "operator": "anyof",
                    "values": [
                        "@ALL@"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "internalidnumber",
                    "join": "customermain",
                    "operator": "equalto",
                    "values": [
                        idCustomer
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                }
            ],
            "columns": [{
                    "name": "trandate",
                    "summary": "GROUP",
                    "label": "Date",
                    "type": "date",
                    "function": "month",
                    "sortdir": "ASC"
                },
                {
                    "name": "netamountnotax",
                    "summary": "SUM",
                    "label": "Amount (Net of Tax)",
                    "type": "currency",
                    "sortdir": "NONE"
                },
                {
                    "name": "grossamount",
                    "summary": "SUM",
                    "label": "Importe (bruto)",
                    "type": "currency",
                    "sortdir": "NONE"
                },
                {
                    "name": "internalid",
                    "summary": "COUNT",
                    "label": "Internal ID",
                    "type": "select",
                    "sortdir": "NONE"
                }
            ],
            "settings": [{
                "name": "consolidationtype",
                "value": "ACCTTYPE"
            }],
            "title": null
        });

        var searchResult_ventaKaloni = searchCreate_VentaKaloni.run().getRange({
            start: 0,
            end: 1000
        });

        if (searchResult_ventaKaloni.length > 0) {
            var obj_searchResult_ventaKaloni = JSON.parse(JSON.stringify(searchResult_ventaKaloni));
            log.debug("Total Factura", obj_searchResult_ventaKaloni);
            log.debug("Total Importe", totalFacturas);
            var id_selectLevel;

            for (var si in obj_searchResult_ventaKaloni) {
                if (obj_searchResult_ventaKaloni[si].values["SUM(grossamount)"] !== ".00") {
                    totalFacturas += parseFloat(obj_searchResult_ventaKaloni[si].values["SUM(grossamount)"]);
                }
            }

            var obj_customer = record.load({
                type: record.Type.CUSTOMER,
                id: idCustomer,
                isDynamic: true,
            });

            obj_customer.setValue({
                fieldId: "custentity445",
                value: totalFacturas
            });

            if (totalFacturas < 75000) { // Sin membresia -> no aplica, select = 4
                id_selectLevel = 4;
            } else if (totalFacturas >= 75000 && totalFacturas < 100000) { // PLATA -> Clasificacion C, select = 1
                id_selectLevel = 1;
            } else if (totalFacturas >= 100000 && totalFacturas < 150000) { // ORO -> Clasificacion B, select = 2
                id_selectLevel = 2;
            } else if (totalFacturas >= 150000) { // BLACK -> Clasificacion A, select = 3
                id_selectLevel = 3;
            }

            obj_customer.setValue({
                fieldId: "custentity444",
                value: id_selectLevel
            });

            var recordId = obj_customer.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });

            log.debug("record saved", recordId)
        }

    }

    return {
        beforeLoad: beforeLoad
    }
});