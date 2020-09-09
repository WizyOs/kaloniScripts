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

        if (context.mode == 'edit') {
            if (role != 3 && role != 1092) {
                var field_branch_default = record.getValue('custevent2');
                field_branchoffice_hidden = record.getValue('custpage_branchoffice_hidden');
                obj_branchOffice = JSON.parse(field_branchoffice_hidden);
                field_branchOffice = record.getField('custpage_branchoffice');
                field_branchOffice.removeSelectOption({ value: null });

                if (obj_branchOffice.length != 0) {
                    for (var ke_branches in obj_branchOffice) {
                        id = obj_branchOffice[ke_branches].id;
                        if (id != 38 && id != 20 && id != 43){
                            field_branchOffice.insertSelectOption({
                                value: obj_branchOffice[ke_branches].id,
                                text: obj_branchOffice[ke_branches].values.name
                            });
                        }
                    }
                }

                var value_prefix = record.getValue('custevent70');
                var text_prefix = record.getText('custevent70');
                var resources = [];

                if (value_prefix !== '' && value_prefix !== null) {
                    prefix = text_prefix.substring(0, 7);

                    if (prefix == 'VALORAC') {
                        resources = [
                            {
                                "sucursal": "58",
                                "value": "277",
                                "text": "InstitutoKaloni - Ania"
                            }
                        ];
                    }

                    var str_resources = JSON.stringify(resources);
                    var obj_resources = JSON.parse(str_resources);

                    var field_resources = record.getField('custpage_resource');
                    field_resources.removeSelectOption({ value: null });

                    var sublistFieldValue = record.getSublistValue({
                        sublistId: 'resource',
                        fieldId: 'resource',
                        line: 0
                    });

                    console.log(obj_branchOffice);
                    
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

                    record.setValue({
                        fieldId: "custpage_resource",
                        value: sublistFieldValue,
                        ignoreFieldChange: true,
                        forceSyncSourcing: true
                    });
                }
            }
        }
    }

    function fieldChanged(context) {

        if (role != 3 && role != 1092) {
            if (context.fieldId == 'custevent70') {

                var value_prefix = record.getValue('custevent70');
                var text_prefix = record.getText('custevent70');
                var field_subsidiary_hidden = record.getValue('custpage_subsidiary_hidden');
                field_branchoffice_hidden = record.getValue('custpage_branchoffice_hidden');
                obj_branchOffice = JSON.parse(field_branchoffice_hidden);
                console.log(obj_branchOffice);
                var resources = [];

                if (value_prefix !== '' && value_prefix !== null) {
                    prefix = text_prefix.substring(0, 7);

                    if (prefix == 'VALORAC') {
                        resources = [
                            {
                                "sucursal": "58",
                                "value": "277",
                                "text": "InstitutoKaloni - Ania"
                            }
                        ];
                    }

                    var str_resources = JSON.stringify(resources);
                    var obj_resources = JSON.parse(str_resources);

                    var field_resources = record.getField('custpage_resource');
                    field_resources.removeSelectOption({ value: null });

                    if (obj_resources.length > 0) {
                        field_resources.insertSelectOption({
                            value: 0,
                            text: " "
                        });
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

                var value_branch = record.getValue('custpage_branchoffice');
                record.setValue({
                    fieldId: 'custevent2',
                    value: value_branch,
                    ignoreFieldChange: true
                });
                
                console.log('fieldChange' + JSON.stringify(context));
                var valResource = record.getValue('custpage_resource');

                record.selectLine({
                    sublistId: 'resource',
                    line: 0
                });
                
                record.setCurrentSublistValue({
                    sublistId: 'resource',
                    fieldId: 'resource',
                    value: valResource
                });

                record.commitLine({
                    sublistId: 'resource',
                });

                var objSublist = record.getSublist({
                    sublistId: 'resource'
                });

                if (objSublist.isChanged) {
                    record.removeLine({
                        sublistId: 'resource',
                        line: 0,
                    });

                    record.insertLine({
                        sublistId: 'resource',
                        line: 0,
                    });
                    record.setCurrentSublistValue({
                        sublistId: 'resource',
                        fieldId: 'resource',
                        value: valResource
                    });

                    record.selectLine({
                        sublistId: 'resource',
                        line: 0
                    });

                    record.commitLine({
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