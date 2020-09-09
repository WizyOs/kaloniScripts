/**
 *@NApiVersion 2.x
*@NScriptType UserEventScript
*/

define(['N/record', 'N/ui/serverWidget', 'N/log', 'N/url', 'N/search', 'N/runtime', 'N/file'],
    function (record, serverwidget, log, url, search, runtime, file) {
        function beforeLoad(context) {

            var customform = null;
            var objRecord = null;
            var parentRecId = null;
            var currentRecId = null;
            var company = null;
            var objCustomer = null;

            if (context.type == 'view') {

                recId = context.newRecord.id;
                objRecord = record.load({ type: 'supportcase', id: recId, isDynamic: true });
                parentRecId = objRecord.getValue({ fieldId: 'custevent_parentrecid' });
                tempRecId = objRecord.getValue({ fieldId: 'custevent_temptrecid' }) || null;
                customform = objRecord.getValue({ fieldId: 'customform' });
                company = objRecord.getValue({ fieldId: 'company' });

                if (customform == 135 || customform == 14 || customform == 138 || customform == 147 || customform == 33 || customform == 148 || customform == 26) {

                    context.form.addButton({ id: 'custpage_button_load_images', label: 'Toma de fotografías', functionName: 'loadimages' });
                    context.form.addButton({ id: 'custpage_button_view_images', label: 'Ver fotografías', functionName: 'viewimagesReviews' });
                    context.form.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';

                    try {
                        objCustomer = record.load({ type: 'customer', id: company, isDynamic: true });
                        hgText = objCustomer.getText({ fieldId: 'entityid' });
                        sucursalText = objCustomer.getText({ fieldId: 'custentity25' });
                    } catch (error) {
                        log.debug('ERROR', error);
                    }

                    var arr_diag_capilar = ['custevent313', 'custevent314', 'custevent315', 'custevent316', 'custevent317', 'custevent318', 'custevent333', 'custevent334', 'custevent335', 'custevent336'];
                    var arr_diag_skin = ['custevent313', 'custevent314', 'custevent315', 'custevent316', 'custevent317', 'custevent318', 'custevent543', 'custevent544'];
                    var arr_proc_capilar = ['custevent82', 'custevent83', 'custevent84', 'custevent85', 'custevent76', 'custevent77', 'custevent78', 'custevent81'];
                    var arr_proc_skin = ['custevent840', 'custevent841', 'custevent842', 'custevent843', 'custevent844', 'custevent845', 'custevent846', 'custevent847', 'custevent848', 'custevent849', 'custevent850', 'custevent851', 'custevent852', 'custevent853', 'custevent854'];
                    var arr_values = new Array(15);

                    var imageId = null;

                    var nameComplete = company + '_' + parentRecId + '_' + recId;
                    var nameSearch = recId;

                    var searchImages = search.load({
                        id: 'customsearch7080'
                    });

                    var filter = search.createFilter({
                        name: 'name',
                        operator: search.Operator.CONTAINS,
                        values: [nameSearch]
                    });

                    searchImages.filters.push(filter);

                    var searchResult = searchImages.run().getRange({
                        start: 0,
                        end: 36
                    });

                    log.debug('resultado search', searchResult);

                    var internalId = null;
                    var newInternalId = null;
                    var name = null;
                    var dato = null;
                    var punto = null;
                    var numImage = null;
                    var fileRename = null;
                    var newName = null;

                    for (var kt in searchResult) {
                        internalId = searchResult[kt].getValue({ name: 'internalid' });
                        name = searchResult[kt].getValue({ name: 'name' });
                        dato = name.indexOf('image_', 0);
                        punto = name.indexOf('.', 0);
                        numImage = name.slice((dato + 6), punto);
                        arr_values[numImage - 1] = internalId;

                        log.debug('debug', dato + ' ' + punto + ' num imagen ' + numImage);
                    }
                

                    var valor = null;
                    var campo = null;
                    var counterValidator = 0;
                    var valorCampo;

                    if (customform == 135) {
                        for (var dc = 0; dc < arr_diag_capilar.length; dc++) {
                            valor = arr_values[dc];
                            campo = arr_diag_capilar[dc];
                            //valorCampo = objRecord.getValue({ filedId: campo }) || null;
                            //log.debug('Valor Campo', 'valor: ' + valor + 'campo: ' + campo);
                            if (valor != null /*&& valorCampo == null*/) {
                                objRecord.setValue({ fieldId: campo, value: valor, ignoreFieldChange: true });
                                counterValidator += 1;
                            }
                        }
                    }

                    if (customform == 138) {
                        for (var ds = 0; ds < arr_diag_skin.length; ds++) {
                            valor = arr_values[ds];
                            campo = arr_diag_skin[ds];
                            //valorCampo = objRecord.getValue({ filedId: campo }) || null;
                            if (valor != null /* && valorCampo == null */) {
                                objRecord.setValue({ fieldId: campo, value: valor, ignoreFieldChange: true });
                                counterValidator += 1;
                            }
                        }
                    }

                    if (customform == 14) {
                        for (var pc = 0; pc < arr_proc_capilar.length; pc++) {
                            valor = arr_values[pc];
                            campo = arr_proc_capilar[pc];
                            //valorCampo = objRecord.getValue({ filedId: campo }) || null; 
                            if (valor != null /* && valorCampo == null */) {
                                objRecord.setValue({ fieldId: campo, value: valor, ignoreFieldChange: true });
                                counterValidator += 1;
                            }
                        }
                    }

                    if (customform == 148) {
                        for (var ps = 0; ps < arr_proc_skin.length; ps++) {
                            valor = arr_values[ps];
                            campo = arr_proc_skin[ps];
                            //valorCampo = objRecord.getValue({ filedId: campo }) || null; 
                            if (valor != null /* && valorCampo == null */) {
                                objRecord.setValue({ fieldId: campo, value: valor, ignoreFieldChange: true });
                                counterValidator += 1;
                            }
                        }
                    }

                    if (customform == 26) {
                        for (var he = 0; he < arr_proc_capilar.length; he++) {
                            valor = arr_values[he];
                            campo = arr_proc_capilar[he];
                            //valorCampo = objRecord.getValue({ filedId: campo }) || null; 
                            if (valor != null /* && valorCampo == null */) {
                                objRecord.setValue({ fieldId: campo, value: valor, ignoreFieldChange: true });
                                counterValidator += 1;
                            }
                        }
                    }

                    if (counterValidator > 0) {
                        try {
                            objRecord.save({ enableSourcing: true, ignoreMandatoryFields: true });
                            log.debug('Save Process', 'Se guarda algo');
                        } catch (error) {
                            log.debug('Error save record', error);
                        }
                    }
                }
            }

            var script = runtime.getCurrentScript();
            log.debug('Remaining', script.getRemainingUsage());
        }

        return {
            beforeLoad: beforeLoad
        };
    });