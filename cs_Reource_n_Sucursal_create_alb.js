/**
* @NApiVersion 2.0
* @NScriptType ClientScript
* @NModuleScope Public
*/

define(['N/search', 'N/currentRecord', 'N/runtime'], function (search, currentRecord, runtime) {
    var record = currentRecord.get();
    var userObj = runtime.getCurrentUser();
    var idUser = userObj.id;
    var role = userObj.role;
    var bandera = true;

    function pageInit(context) {
        var field_branchoffice_hidden = '';
        var obj_branchOffice = '';
        var field_branchOffice = '';

        if (context.mode == 'create') {
            if (role != 3 && role != 1092) {
                field_branchoffice_hidden = record.getValue('custpage_branchoffice_hidden');
                obj_branchOffice = JSON.parse(field_branchoffice_hidden);
                field_branchOffice = record.getField('custpage_branchoffice');
                field_branchOffice.removeSelectOption({ value: null });
                field_resources = record.getField('custpage_resource');
                //field_resources.removeSelectOption({ value: null });

                record.setValue({
                    fieldId: 'custevent70',
                    value: "12",
                    ignoreFieldChange: true
                });

                resources = [
                    {
                        "sucursal": "57",
                        "value": "229",
                        "text": "Valoraciones Anatole (Albya)"
                    },
                    {
                        "sucursal": "52",
                        "value": "224",
                        "text": "Valoraciones Guadalajara (Albya)"
                    },
                    {
                        "sucursal": "54",
                        "value": "231",
                        "text": "Valoraciones Cancún (Albya)"
                    },
                    {
                        "sucursal": "53",
                        "value": "232",
                        "text": "Valoraciones Chihuahua (Albya)"
                    }
                ];

                var str_resources = JSON.stringify(resources);
                var obj_resources = JSON.parse(str_resources);

                for (var kc_resources in obj_resources) {
                    if (obj_resources[kc_resources].sucursal == obj_branchOffice[0].id) {
                        field_resources.insertSelectOption({
                            value: obj_resources[kc_resources].value,
                            text: obj_resources[kc_resources].text
                        });
                    }
                }

                if (obj_branchOffice.length != 0) {
                    for (var kc_branches in obj_branchOffice) {
                        id = obj_branchOffice[kc_branches].id;
                        if (id != 38 && id != 20 && id != 43) {
                            field_branchOffice.insertSelectOption({
                                value: obj_branchOffice[kc_branches].id,
                                text: obj_branchOffice[kc_branches].values.name
                            });
                        }
                    }
                }
            }
        }
    }

    function fieldChanged(context) {

        if (role != 3 && role != 1092) {
            var currentRecord = context.currentRecord;

            if (context.fieldId == 'custevent70') {

                field_branchoffice_hidden = record.getValue('custpage_branchoffice_hidden');
                obj_branchOffice = JSON.parse(field_branchoffice_hidden);
                var value_prefix = currentRecord.getValue('custevent70');
                var text_prefix = currentRecord.getText('custevent70');
                var field_subsidiary_hidden = record.getValue('custpage_subsidiary_hidden');
                var resources = [];

                if (value_prefix !== '' && value_prefix !== null) {
                    //console.log(text_prefix.substring(0, 7));
                    prefix = text_prefix.substring(0, 7);

                    if (prefix == 'Val') {
                        resources = [
                            {
                                "sucursal": "57",
                                "value": "229",
                                "text": "Valoraciones Anatole (Albya)"
                            },
                            {
                                "sucursal": "52",
                                "value": "224",
                                "text": "Valoraciones Guadalajara (Albya)"
                            },
                            {
                                "sucursal": "54",
                                "value": "231",
                                "text": "Valoraciones Cancún (Albya)"
                            },
                            {
                                "sucursal": "53",
                                "value": "232",
                                "text": "Valoraciones Chihuahua (Albya)"
                            }
                        ];
                    } else if (prefix == 'Rev') {
                        resources = [{
                            "sucursal": "52",
                            "value": "240",
                            "text": "Revisiones Guadalajara (Albya)"
                          },
                          {
                            "sucursal": "53",
                            "value": "239",
                            "text": "Revisiones Chihuahua (Albya)"
                          },
                          {
                            "sucursal": "54",
                            "value": "238",
                            "text": "Revisiones Cancun (Albya)"
                          },
                          {
                            "sucursal": "57",
                            "value": "237",
                            "text": "Revisiones Polanco (Albya)"
                          }
                        ];
                    } else if (prefix == 'Pro') {
                        resources = [{
                            "sucursal": "54",
                            "value": "234",
                            "text": "Sala Cancun (Albya)"
                          },
                          {
                            "sucursal": "53",
                            "value": "235",
                            "text": "Sala Chihuahua (Albya)"
                          },
                          {
                            "sucursal": "52",
                            "value": "236",
                            "text": "Sala Guadalajara (Albya)"
                          },
                          {
                            "sucursal": "57",
                            "value": "233",
                            "text": "Sala Polanco Albya"
                          }
                        ];
                    } else if (prefix == 'REV' || prefix == 'REV 10D' || prefix == 'REV 10M' || prefix == 'REV 11M' || prefix == 'REV 12M' || prefix == 'REV 13M' || prefix == 'REV 14M' || prefix == 'REV 1M' || prefix == 'REV 24H' || prefix == 'REV 2M' || prefix == 'REV 3M' || prefix == 'REV 4M' || prefix == 'REV 5M' || prefix == 'REV 6M' || prefix == 'REV 7M' || prefix == 'REV 8M' || prefix == 'REV 9M' || prefix == 'REV-HAI') {
                        resources = [
                        ];
                    } else if (prefix == 'BQL' || prefix == 'INY' || prefix == 'MED' || prefix == 'PRP' || prefix == 'QX') {
                        resources = [
                        ];
                    } else if (prefix == 'VAL-INY' || prefix == 'VAL-MED' || prefix == 'VAL-QX') {
                        resources = [
                        ];
                    } else if (prefix == 'VOL') {
                        resources = [
                        ];
                    } else if (prefix == 'VOL-PRE') {
                        resources = [
                        ];
                    } else if (prefix == 'MESO') {
                        resources = [
                        ];
                    } else if (prefix == 'PROCEDI') {
                        resources = [
                        ];
                    } else if (prefix == 'REV-QX' || prefix == 'REV-TX') {
                        resources = [
                        ];
                    }
                    var str_resources = JSON.stringify(resources);
                    var obj_resources = JSON.parse(str_resources);

                    var field_resources = record.getField('custpage_resource');
                    field_resources.removeSelectOption({ value: null });

                    if (obj_resources.length > 0) {

                        for (var k_resources in obj_resources) {
                            if (obj_resources[k_resources].sucursal == obj_branchOffice[0].id) {
                                field_resources.insertSelectOption({
                                    value: obj_resources[k_resources].value,
                                    text: obj_resources[k_resources].text
                                });
                            }
                        }
                    }
                }
            }

            if (context.fieldId == 'custpage_branchoffice') {
                var value_branch = record.getValue('custpage_branchoffice');
                record.setValue({
                    fieldId: 'custevent2',
                    value: value_branch,
                    ignoreFieldChange: true
                });
            }

            if (context.fieldId == 'custpage_resource') {

                currentRecord.setValue({
                    fieldId: 'custevent79',
                    value: "Cita de Valoración",
                    ignoreFieldChange: true
                });

                /* var value_prefix = currentRecord.getValue('custpage_resource');
                var text_prefix = currentRecord.getText('custpage_resource');
                if (value_prefix !== '' && value_prefix !== null) {
                    //console.log(text_prefix.substring(0, 7));
                    prefix = text_prefix.substring(0, 3);
                    if (prefix == 'Val') {
                        record.setText({
                            fieldId: 'custevent79',
                            value: 'Cita Valoración',
                            ignoreFieldChange: true
                        });
                    }
                } */

                var value_branch = record.getValue('custpage_branchoffice');
                record.setValue({
                    fieldId: 'custevent2',
                    value: value_branch,
                    ignoreFieldChange: true
                });

                //console.log('fieldChange' + JSON.stringify(context));
                var valResource = currentRecord.getValue('custpage_resource');

                currentRecord.insertLine({
                    sublistId: 'resource',
                    line: 0,
                });
                currentRecord.setCurrentSublistValue({
                    sublistId: 'resource',
                    fieldId: 'resource',
                    value: valResource
                });

                currentRecord.selectLine({
                    sublistId: 'resource',
                    line: 0
                });

                currentRecord.commitLine({
                    sublistId: 'resource',
                });

                var objSublist = currentRecord.getSublist({
                    sublistId: 'resource'
                });

                if (objSublist.isChanged) {
                    currentRecord.removeLine({
                        sublistId: 'resource',
                        line: 0,
                    });

                    currentRecord.insertLine({
                        sublistId: 'resource',
                        line: 0,
                    });
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'resource',
                        fieldId: 'resource',
                        value: valResource
                    });

                    currentRecord.selectLine({
                        sublistId: 'resource',
                        line: 0
                    });

                    currentRecord.commitLine({
                        sublistId: 'resource',
                    });
                }
            }
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };

});