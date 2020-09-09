/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */


define([
        'N/record', 'N/ui/serverWidget', 'N/log', 'N/url', 'N/search', 'N/runtime', 'N/file', 'N/email'
    ],
    function (record, serverwidget, log, url, search, runtime, file, email) {

        function beforeLoad(context) {

            var userObj = runtime.getCurrentUser();
            var role = userObj.role;
            var nextField_agenda = '';

            // GLOBALS
            var customer_subsidiary;

            if ((context.type == 'create')) {

                if (role != 3 && role != 1092 && role != 1173) {
                    var str_newRecord = JSON.stringify(context.newRecord);
                    var obj_newRecord = JSON.parse(str_newRecord);
                    var company = obj_newRecord.fields.company;

                    if (company != null && company != "" && company != undefined) {
                        var customerObj = record.load({
                            type: 'customer',
                            id: company
                        });
                        customer_subsidiary = customerObj.getValue({
                            fieldId: 'subsidiary'
                        });
                    } else {
                        customer_subsidiary = 0;
                    }    
                        //log.debug(customer_subsidiary);
    
                        var field_sucursal = context.form.getField({
                            id: 'custevent2'
                        }).updateDisplayType({
                            displayType: 'hidden'
                        });
                        var label_sucursal = field_sucursal.label;
    
                        var field_resoruce = context.form.getSublist({
                            id: 'resource'
                        });
                        var label_resource = field_resoruce.label;
    
    
                        var subsidiary_per_roleSearch = search.load({
                            id: 'customsearch7709',
                            type: 'role'
                        });
    
                        var filter_subsidiary_per_roleSearch = search.createFilter({
                            name: 'internalid',
                            operator: search.Operator.IS,
                            values: role
                        });
                        subsidiary_per_roleSearch.filters.push(filter_subsidiary_per_roleSearch);
    
                        var results_subsidiary_per_roleSearch = subsidiary_per_roleSearch.run().getRange({
                            start: 0,
                            end: 1000
                        });
    
                        var obj_resultSearch_subsidiary = JSON.stringify(results_subsidiary_per_roleSearch);
                        var json_resultSearch_subsidiary = JSON.parse(obj_resultSearch_subsidiary);
                        subsidiary = json_resultSearch_subsidiary[0].values.subsidiaries[0].value;
                        //log.debug('debug obj Json', subsidiary);                
                        //log.debug('Results',subsidiary); 
    
                        var resoruces = search.create({
                            type: search.Type.CLASSIFICATION,
                            columns: []
                        });
    
                        var result_resources = resoruces.run().getRange({
                            start: 0,
                            end: 1000
                        });
    
                        log.debug('Result resources', result_resources);
    
                        var branchSearch = search.create({
                            type: 'location',
                            filters: [
                                ['subsidiary', search.Operator.IS, subsidiary]
                            ],
                            columns: ['name']
                        });
    
                        var searchResults_branchSearch = branchSearch.run().getRange({
                            start: 0,
                            end: 1000
                        });
    
                        var obj_resultSearch_branches = JSON.stringify(searchResults_branchSearch);
    
                        log.debug('result branches', obj_resultSearch_branches);
    
                        var field_subsidiary_hidden = context.form.addField({
                            id: 'custpage_subsidiary_hidden',
                            type: 'text',
                            label: 'Subsidiary hidden'
                        }).updateDisplayType({
                            displayType: 'hidden'
                        });
                        var field_branchoffice_hidden = context.form.addField({
                            id: 'custpage_branchoffice_hidden',
                            type: 'longtext',
                            label: 'Branches hidden'
                        }).updateDisplayType({
                            displayType: 'hidden'
                        });
    
                        if (customer_subsidiary != 19) {
                            field_subsidiary_hidden.defaultValue = subsidiary;
                            field_branchoffice_hidden.defaultValue = obj_resultSearch_branches;
                            nextField_agenda = 'status';
                        } else {
                            field_subsidiary_hidden.defaultValue = subsidiary;
                            var id = customerObj.getValue({
                                fieldId: 'custentity25'
                            });
                            var name = customerObj.getText({
                                fieldId: 'custentity25'
                            });
                            field_branchoffice_hidden.defaultValue = '[{"recordType":"location","id":"' + id + '","values":{"name":"' + name + '"}}]';
                            nextField_agenda = 'custevent70';
                        }
    
    
                        //log.debug('obj field', field_subsidiary_hidden);
    
                        var field_branchOffice = context.form.addField({
                            id: 'custpage_branchoffice',
                            type: 'select',
                            label: label_sucursal
                        });
                        context.form.insertField({
                            field: field_branchOffice,
                            nextfield: 'status'
                        });
                        field_branchOffice.isMandatory = true;
                        var field_resource = context.form.addField({
                            id: 'custpage_resource',
                            type: 'select',
                            label: label_resource
                        });
                        context.form.insertField({
                            field: field_resource,
                            nextfield: nextField_agenda
                        });
                        field_resource.isMandatory = true;
                                        
                }
            }

            if (context.type == 'edit') {
                log.debug('is edit');
                //log.debug(context);
                if (role != 3 && role != 1092 && role != 1173) {

                    var company;
                    //log.debug('context.newRecord values', context.newRecord);
                    var str_newRecord = JSON.stringify(context.newRecord);
                    var obj_newRecord = JSON.parse(str_newRecord);
                    log.debug('objeto edit', obj_newRecord);

                    var count = 1;
                    for (var a in obj_newRecord.sublists.attendee) {
                        var linea = "line " + count;
                        log.debug(linea, typeof linea + ' ' + linea);
                        var custjob = obj_newRecord.sublists.attendee[linea].attendeetype;
                        log.debug("custjob", custjob);
                        if (custjob === "custjob") {
                            company = obj_newRecord.sublists.attendee[linea].attendee;
                            log.debug("company", company);
                        }
                        count++;
                    }

                    var customerObj = record.load({
                        type: 'customer',
                        id: company
                    });
                    var customer_subsidiary = customerObj.getValue({
                        fieldId: 'subsidiary'
                    });

                    var field_sucursal = context.form.getField({
                        id: 'custevent2'
                    }).updateDisplayType({
                        displayType: 'hidden'
                    });
                    var label_sucursal = field_sucursal.label;

                    var field_resoruce = context.form.getSublist({
                        id: 'resource'
                    });
                    var label_resource = field_resoruce.label;


                    var subsidiary_per_roleSearch = search.load({
                        id: 'customsearch7709',
                        type: 'role'
                    });

                    var filter_subsidiary_per_roleSearch = search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.IS,
                        values: role
                    });
                    subsidiary_per_roleSearch.filters.push(filter_subsidiary_per_roleSearch);

                    var results_subsidiary_per_roleSearch = subsidiary_per_roleSearch.run().getRange({
                        start: 0,
                        end: 1000
                    });

                    var obj_resultSearch_subsidiary = JSON.stringify(results_subsidiary_per_roleSearch);
                    var json_resultSearch_subsidiary = JSON.parse(obj_resultSearch_subsidiary);
                    subsidiary = json_resultSearch_subsidiary[0].values.subsidiaries[0].value;
                    //log.debug('debug obj Json', subsidiary);                
                    //log.debug('Results',subsidiary); 

                    var resoruces = search.create({
                        type: search.Type.CLASSIFICATION,
                        columns: []
                    });

                    var result_resources = resoruces.run().getRange({
                        start: 0,
                        end: 1000
                    });

                    log.debug('Result resources', result_resources);

                    var branchSearch = search.create({
                        type: 'location',
                        filters: [
                            ['subsidiary', search.Operator.IS, subsidiary]
                        ],
                        columns: ['name']
                    });

                    var searchResults_branchSearch = branchSearch.run().getRange({
                        start: 0,
                        end: 1000
                    });

                    var obj_resultSearch_branches = JSON.stringify(searchResults_branchSearch);

                    //log.debug('result branches',obj_resultSearch_branches);

                    var field_subsidiary_hidden = context.form.addField({
                        id: 'custpage_subsidiary_hidden',
                        type: 'text',
                        label: 'Subsidiary hidden'
                    }).updateDisplayType({
                        displayType: 'hidden'
                    });
                    var field_branchoffice_hidden = context.form.addField({
                        id: 'custpage_branchoffice_hidden',
                        type: 'longtext',
                        label: 'Branches hidden'
                    }).updateDisplayType({
                        displayType: 'hidden'
                    });

                    if (customer_subsidiary != 19) {
                        field_subsidiary_hidden.defaultValue = subsidiary;
                        field_branchoffice_hidden.defaultValue = obj_resultSearch_branches;
                        nextField_agenda = 'status';
                    } else {
                        field_subsidiary_hidden.defaultValue = subsidiary;
                        var id = customerObj.getValue({
                            fieldId: 'custentity25'
                        });
                        var name = customerObj.getText({
                            fieldId: 'custentity25'
                        });
                        field_branchoffice_hidden.defaultValue = '[{"recordType":"location","id":"' + id + '","values":{"name":"' + name + '"}}]';
                        nextField_agenda = 'custevent70';
                    }

                    //log.debug('obj field', field_subsidiary_hidden);

                    var field_branchOffice = context.form.addField({
                        id: 'custpage_branchoffice',
                        type: 'select',
                        label: label_sucursal
                    });
                    context.form.insertField({
                        field: field_branchOffice,
                        nextfield: 'status'
                    });
                    field_branchOffice.isMandatory = true;
                    var field_resource = context.form.addField({
                        id: 'custpage_resource',
                        type: 'select',
                        label: label_resource
                    });
                    context.form.insertField({
                        field: field_resource,
                        nextfield: nextField_agenda
                    });
                    field_resource.isMandatory = true;
                }
            }
        }

        function beforeSubmit() {

        }

        return {
            beforeLoad: beforeLoad
        };

    });