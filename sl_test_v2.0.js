/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record', 'N/xml', 'N/runtime', 'N/search'],
    function (widget, url, https, file, record, xml, runtime, search) {
        function onRequest(context) {

            var recId = null;
            var review = null;
            var numProc = null;
            var arr_set_fields_disabled_values = [];
            var arr_set_fields_disabled = [];
            var arr_preValueImages = new Array(24);
            var arr_nameFolderReview = [
                "R24HORAS",
                "R10DIAS",
                "R1MES",
                "R2MESES",
                "R3MESES",
                "R4MESES",
                "R5MESES",
                "R6MESES",
                "R7MESES",
                "R8MESES",
                "R9MESES",
                "R10MESES",
                "R11MESES",
                "R12MESES",
                "R13MESES",
                "R14MESES"
              ];

            if (context.request.method === 'GET') {

                var customform = context.request.parameters.cf;
                recId = context.request.parameters.recId;
                review = context.request.parameters.review;
                numProc = context.request.parameters.numProc;
                var customerId = context.request.parameters.customerId;
                var objRecord = record.load({ type: "customer", id: customerId, isDynamic: false });
                var idCustomerText = objRecord.getText({ fieldId: "entityid" });
                var nameFolderCustomer = idCustomerText + "_FOLDER";
                var formulario = widget.createForm({ title: 'Cargar Imagenes' });
                var nameSearch = recId;
                var filter = '';
                var searchResult = '';

                log.debug('record id', recId + context.request.parameters.review);

                if (review != undefined) {
                    try {
                      search.create({
                          type: search.Type.FOLDER,
                          filters: [
                            search.createFilter({
                              name: "name",
                              operator: search.Operator.IS,
                              values: [nameFolderCustomer]
                            })
                          ],
                          columns: ["internalid"]
                        }).run().each(function(result) {
                          idRootFolder = result.getValue({ name: "internalid" });
                        });
            
                      log.debug('id Client Folder', idRootFolder);
            
                      search.create({
                          type: search.Type.FOLDER,
                          filters: [
                            search.createFilter({
                              name: "name",
                              operator: search.Operator.IS,
                              values: [arr_nameFolderReview[review - 1]],
                              isor: false
                            }),
                            search.createFilter({
                              name: "parent",
                              operator: search.Operator.IS,
                              values: [idRootFolder]
                            })
                          ],
                          columns: ["internalid", "name"]
                        }).run().each(function(result) {
                          idReviewFolder = result.getValue({ name: "internalid" });
                          nameReviewFolder = result.getValue({ name: "name" });
                        });
            
                      log.debug(
                        "id Review Folder",
                        idReviewFolder + " " + nameReviewFolder
                      );
            
                      var searchImages = search.load({
                        id: "customsearch7172"
                      });
            
                      var filterFolder = search.createFilter({
                        name: "folder",
                        operator: search.Operator.IS,
                        values: [idReviewFolder]
                      });
            
                      var filterName = search.createFilter({
                        name: "name",
                        operator: search.Operator.CONTAINS,
                        values: [recId + "_numProc_" + numProc + "_rev_" + review + "_"]
                      });
            
                      searchImages.filters.push(filterName);
                      searchImages.filters.push(filterFolder);
            
                      var searchResult = searchImages.run().getRange({
                        start: 0,
                        end: 36
                      });

                    for (var kt in searchResult) {
                        internalId = searchResult[kt].getValue({ name: 'internalid' });
                        name = searchResult[kt].getValue({ name: 'name' });
                        dato = name.indexOf('image_', 0);
                        punto = name.indexOf('.', 0);
                        numImage = name.slice((dato + 6), punto);
                        arr_set_fields_disabled_values[parseInt(numImage) - 1] = internalId;
    
                        log.debug('debug', dato + ' ' + punto + ' num imagen ' + numImage);
                    }
            
/*                       for (var sr in searchResult) {
                        name = searchResult[sr].getValue({ name: "name" });
                        url = searchResult[sr].getValue({ name: "url" });
                        dato = name.indexOf("image_", 0);
                        punto = name.indexOf(".", 0);
                        numImage = name.slice(dato + 6, punto);
                        if (url != null) {
                          arr_preValueImages[numImage - 1] = url;
                        }
                      }
            
                      for (var i = 0; i < 12; i++) {
                        var validateValue = arr_preValueImages[i];
                        if (validateValue != null) {
                          arr_valueImages[i] = arr_preValueImages[i];
                        } else {
                          arr_valueImages[i] = noImageObj.url;
                        }
                      }
            
                      log.debug("arreglo Reviews", arr_valueImages); */
                    } catch (error) {
                      log.error("ERROR_SEARCH", error);
                    }
                  } else {
                    var searchImages = search.load({
                        id: 'customsearch7080'
                    });
    
                    filter = search.createFilter({
                        name: 'name',
                        operator: search.Operator.CONTAINS,
                        values: [nameSearch]
                    });
    
                    searchImages.filters.push(filter);
    
                    searchResult = searchImages.run().getRange({
                        start: 0,
                        end: 36
                    });
    
                    for (var kt in searchResult) {
                        internalId = searchResult[kt].getValue({ name: 'internalid' });
                        name = searchResult[kt].getValue({ name: 'name' });
                        dato = name.indexOf('image_', 0);
                        punto = name.indexOf('.', 0);
                        numImage = name.slice((dato + 6), punto);
                        arr_set_fields_disabled_values[parseInt(numImage) - 1] = internalId;
    
                        log.debug('debug', dato + ' ' + punto + ' num imagen ' + numImage);
                    }
                  }



                if (customform == 135) {
                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'IMAGEN VALORACIÓN 1' });
                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'IMAGEN VALORACIÓN 2' });
                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'IMAGEN VALORACIÓN 3' });
                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'IMAGEN VALORACIÓN 4' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'ROSTRO 1' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'ROSTRO 2' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN 1 MICROCAMARA' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN 2 MICROCAMARA' });
                    field_image_9 = formulario.addField({ id: 'custpage_image_9', type: 'file', label: 'IMAGEN 3 MICROCAMARA' });
                    field_image_10 = formulario.addField({ id: 'custpage_image_10', type: 'file', label: 'IMAGEN 4 MICROCAMARA' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8, field_image_9, field_image_10];
                }

                if (customform == 138) {
                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'IMAGEN 1' });
                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'IMAGEN 2' });
                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'IMAGEN 3' });
                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'IMAGEN 4' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'IMAGEN 5' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'IMAGEN 6' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN 7' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN 8' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8];
                }

                if (customform == 14 && review == null) {
                    //FOTOS DISEÑO MEDICO DE INJERTO
                    title_imagesInjerto = formulario.addField({ id: 'custpage_images_injerto', type: 'INLINEHTML', label: 'medico injerto' });
                    title_imagesInjerto.defaultValue = '</br><h1>IMÁGENES MÉDICO INJERTO</h1><hr>';
                    title_imagesInjerto.updateLayoutType({ layoutType: 'OUTSIDE' });
                    title_imagesInjerto.updateBreakType({ breakType: 'STARTROW' });

                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'DISEÑO IMAGEN 1' });
                    field_image_1.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_1.updateBreakType({ breakType: 'STARTROW' });
                    field_image_1.updateBreakType({ breakType: 'STARTCOL' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'IMAGEN DESPUÉS 1' });
                    field_image_5.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'DISEÑO IMAGEN 2' });
                    field_image_2.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_2.updateBreakType({ breakType: 'STARTROW' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'IMAGEN DESPUÉS 2' });
                    field_image_6.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'DISEÑO IMAGEN 3' });
                    field_image_3.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_3.updateBreakType({ breakType: 'STARTROW' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN FRONTAL' });
                    field_image_7.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'DISEÑO IMAGEN 4' });
                    field_image_4.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_4.updateBreakType({ breakType: 'STARTROW' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN EXTRA' });
                    field_image_8.updateLayoutType({ layoutType: 'OUTSIDE' });

                    //FOTOS ENFERMERIA - ANTES
                    title_imagesEnfermeriaAntes = formulario.addField({ id: 'custpage_images_enfermeria_antes', type: 'INLINEHTML', label: 'enfermeria antes' });
                    title_imagesEnfermeriaAntes.defaultValue = '</br><h1>IMAGENES ENFERMERIA ANTES</h1><hr>';
                    title_imagesEnfermeriaAntes.updateLayoutType({ layoutType: 'OUTSIDE' });
                    title_imagesEnfermeriaAntes.updateBreakType({ breakType: 'STARTROW' });

                    field_image_9 = formulario.addField({ id: 'custpage_image_9', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 1' });
                    field_image_9.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_9.updateBreakType({ breakType: 'STARTROW' });
                    field_image_9.updateBreakType({ breakType: 'STARTCOL' });
                    field_image_13 = formulario.addField({ id: 'custpage_image_13', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 5' });
                    field_image_13.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_10 = formulario.addField({ id: 'custpage_image_10', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 2' });
                    field_image_10.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_10.updateBreakType({ breakType: 'STARTROW' });
                    field_image_14 = formulario.addField({ id: 'custpage_image_14', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 6' });
                    field_image_14.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_11 = formulario.addField({ id: 'custpage_image_11', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 3' });
                    field_image_11.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_11.updateBreakType({ breakType: 'STARTROW' });
                    field_image_15 = formulario.addField({ id: 'custpage_image_15', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 7' });
                    field_image_15.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_12 = formulario.addField({ id: 'custpage_image_12', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 4' });
                    field_image_12.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_12.updateBreakType({ breakType: 'STARTROW' });
                    field_image_16 = formulario.addField({ id: 'custpage_image_16', type: 'file', label: 'IMAGEN ENFERMERÍA ANTES 8' });
                    field_image_16.updateLayoutType({ layoutType: 'OUTSIDE' });

                    //FOTOS ENFERMERIA - DESPUES
                    title_imagesEnfermeriaDespues = formulario.addField({ id: 'custpage_images_enfermeria_despues', type: 'INLINEHTML', label: 'enfermeria despues' });
                    title_imagesEnfermeriaDespues.defaultValue = '</br><h1>IMAGENES ENFERMERIA DESPUÉS</h1><hr>';
                    title_imagesEnfermeriaDespues.updateLayoutType({ layoutType: 'OUTSIDE' });
                    title_imagesEnfermeriaDespues.updateBreakType({ breakType: 'STARTROW' });

                    field_image_17 = formulario.addField({ id: 'custpage_image_17', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 1' });
                    field_image_17.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_17.updateBreakType({ breakType: 'STARTROW' });
                    field_image_17.updateBreakType({ breakType: 'STARTCOL' });
                    field_image_21 = formulario.addField({ id: 'custpage_image_21', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 5' });
                    field_image_21.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_18 = formulario.addField({ id: 'custpage_image_18', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 2' });
                    field_image_18.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_18.updateBreakType({ breakType: 'STARTROW' });
                    field_image_22 = formulario.addField({ id: 'custpage_image_22', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 6' });
                    field_image_22.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_19 = formulario.addField({ id: 'custpage_image_19', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 3' });
                    field_image_19.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_19.updateBreakType({ breakType: 'STARTROW' });
                    field_image_23 = formulario.addField({ id: 'custpage_image_23', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 7' });
                    field_image_23.updateLayoutType({ layoutType: 'OUTSIDE' });

                    field_image_20 = formulario.addField({ id: 'custpage_image_20', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 4' });
                    field_image_20.updateLayoutType({ layoutType: 'OUTSIDE' });
                    field_image_20.updateBreakType({ breakType: 'STARTROW' });
                    field_image_24 = formulario.addField({ id: 'custpage_image_24', type: 'file', label: 'IMAGEN ENFERMERÍA DESPUÉS 8' });
                    field_image_24.updateLayoutType({ layoutType: 'OUTSIDE' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8, field_image_9, field_image_10, field_image_11, field_image_12, field_image_13, field_image_14, field_image_15, field_image_16, field_image_17, field_image_18, field_image_19, field_image_20, field_image_21, field_image_22, field_image_23, field_image_24];
                }

                if (customform == 14 && review != null) {
                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'IMAGEN 1' });
                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'IMAGEN 2' });
                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'IMAGEN 3' });
                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'IMAGEN 4' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'IMAGEN 5' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'IMAGEN 6' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN 7' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN 8' });
                    field_image_9 = formulario.addField({ id: 'custpage_image_9', type: 'file', label: 'MICROCÁMARA 1' });
                    field_image_10 = formulario.addField({ id: 'custpage_image_10', type: 'file', label: 'MICROCÁMARA 2' });
                    field_image_11 = formulario.addField({ id: 'custpage_image_11', type: 'file', label: 'MICROCÁMARA 3' });
                    field_image_12 = formulario.addField({ id: 'custpage_image_12', type: 'file', label: 'MICROCÁMARA 4' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8, field_image_9, field_image_10, field_image_11, field_image_12];
                }

                if (customform == 148) {
                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'IMAGEN 1' });
                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'IMAGEN 2' });
                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'IMAGEN 3' });
                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'IMAGEN 4' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'IMAGEN 5' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'IMAGEN 6' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN 7' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN 8' });
                    field_image_9 = formulario.addField({ id: 'custpage_image_9', type: 'file', label: 'IMAGEN 9' });
                    field_image_10 = formulario.addField({ id: 'custpage_image_10', type: 'file', label: 'IMAGEN 10' });
                    field_image_11 = formulario.addField({ id: 'custpage_image_11', type: 'file', label: 'IMAGEN 11' });
                    field_image_12 = formulario.addField({ id: 'custpage_image_12', type: 'file', label: 'IMAGEN 12' });
                    field_image_13 = formulario.addField({ id: 'custpage_image_13', type: 'file', label: 'IMAGEN 13' });
                    field_image_14 = formulario.addField({ id: 'custpage_image_14', type: 'file', label: 'IMAGEN 14' });
                    field_image_15 = formulario.addField({ id: 'custpage_image_15', type: 'file', label: 'IMAGEN 15' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8, field_image_9, field_image_10, field_image_11, field_image_12, field_image_13, field_image_14, field_image_15];
                }

                if (customform == 26) {
                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'DISEÑO IMAGEN 1' });
                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'DISEÑO IMAGEN 2' });
                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'DISEÑO IMAGEN 3' });
                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'DISEÑO IMAGEN 4' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'IMAGEN ANTES' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'IMAGEN DESPUÉS' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN FRONTAL' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN EXTRA' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8];
                }

                if (customform == 151 || customform == 147 || customform == 33) {
                    field_image_1 = formulario.addField({ id: 'custpage_image_1', type: 'file', label: 'IMAGEN 1' });
                    field_image_2 = formulario.addField({ id: 'custpage_image_2', type: 'file', label: 'IMAGEN 2' });
                    field_image_3 = formulario.addField({ id: 'custpage_image_3', type: 'file', label: 'IMAGEN 3' });
                    field_image_4 = formulario.addField({ id: 'custpage_image_4', type: 'file', label: 'IMAGEN 4' });
                    field_image_5 = formulario.addField({ id: 'custpage_image_5', type: 'file', label: 'IMAGEN 5' });
                    field_image_6 = formulario.addField({ id: 'custpage_image_6', type: 'file', label: 'IMAGEN 6' });
                    field_image_7 = formulario.addField({ id: 'custpage_image_7', type: 'file', label: 'IMAGEN 7' });
                    field_image_8 = formulario.addField({ id: 'custpage_image_8', type: 'file', label: 'IMAGEN 8' });

                    arr_set_fields_disabled = [field_image_1, field_image_2, field_image_3, field_image_4, field_image_5, field_image_6, field_image_7, field_image_8];
                }

                disableFields(arr_set_fields_disabled, arr_set_fields_disabled_values);

                log.debug('', arr_set_fields_disabled_values);

                formulario.addSubmitButton({ label: 'Enviar Imágenes' });
                formulario.addButton({ id: 'custpage_cancel_button', label: 'Cancelar', functionName: 'cancelSelf' });
                formulario.clientScriptModulePath = 'SuiteScripts/cs_DiagnosticoCorporal.js';
                context.response.writePage(formulario);

            } else {

                //TODO: PROCESS TO SAVE IMAGE ON CLICK TO SUBMIT BUTTON
                var script = runtime.getCurrentScript();

                //ACTION: GET params from currrent context response
                var paramsEntry = context.request.parameters.entryformquerystring;
                //ACTION: CONVERT context URL to JSON schema
                var entryJSON = getJSON(paramsEntry.toString());
                //ACTION: GET specific params from entry
                recId = entryJSON.recId;
                var parentRecId = entryJSON.parentRecId;
                var mode = entryJSON.mode;
                var customerId = entryJSON.customerId;
                var numProc = entryJSON.numProc;
                review = entryJSON.review;

                log.debug('Params Entry', paramsEntry);
                log.debug('Entry', entryJSON);

                //ACTION: GET values of custom fields from form before submit
                var objImg_1 = context.request.files.custpage_image_1 || null;
                var objImgName_1 = 'image_1';
                var objImg_2 = context.request.files.custpage_image_2 || null;
                var objImgName_2 = 'image_2';
                var objImg_3 = context.request.files.custpage_image_3 || null;
                var objImgName_3 = 'image_3';
                var objImg_4 = context.request.files.custpage_image_4 || null;
                var objImgName_4 = 'image_4';
                var objImg_5 = context.request.files.custpage_image_5 || null;
                var objImgName_5 = 'image_5';
                var objImg_6 = context.request.files.custpage_image_6 || null;
                var objImgName_6 = 'image_6';
                var objImg_7 = context.request.files.custpage_image_7 || null;
                var objImgName_7 = 'image_7';
                var objImg_8 = context.request.files.custpage_image_8 || null;
                var objImgName_8 = 'image_8';
                var objImg_9 = context.request.files.custpage_image_9 || null;
                var objImgName_9 = 'image_9';
                var objImg_10 = context.request.files.custpage_image_10 || null;
                var objImg_Name10 = 'image_10';
                var objImg_11 = context.request.files.custpage_image_11 || null;
                var objImg_Name11 = 'image_11';
                var objImg_12 = context.request.files.custpage_image_12 || null;
                var objImg_Name12 = 'image_12';
                var objImg_13 = context.request.files.custpage_image_13 || null;
                var objImg_Name13 = 'image_13';
                var objImg_14 = context.request.files.custpage_image_14 || null;
                var objImg_Name14 = 'image_14';
                var objImg_15 = context.request.files.custpage_image_15 || null;
                var objImg_Name15 = 'image_15';
                var objImg_16 = context.request.files.custpage_image_16 || null;
                var objImg_Name16 = 'image_16';
                var objImg_17 = context.request.files.custpage_image_17 || null;
                var objImg_Name17 = 'image_17';
                var objImg_18 = context.request.files.custpage_image_18 || null;
                var objImg_Name18 = 'image_18';
                var objImg_19 = context.request.files.custpage_image_19 || null;
                var objImg_Name19 = 'image_19';
                var objImg_20 = context.request.files.custpage_image_20 || null;
                var objImg_Name20 = 'image_20';
                var objImg_21 = context.request.files.custpage_image_21 || null;
                var objImg_Name21 = 'image_21';
                var objImg_22 = context.request.files.custpage_image_22 || null;
                var objImg_Name22 = 'image_22';
                var objImg_23 = context.request.files.custpage_image_23 || null;
                var objImg_Name23 = 'image_23';
                var objImg_24 = context.request.files.custpage_image_24 || null;
                var objImg_Name24 = 'image_24';

                //CONSTANTS: nombre de los folders de revision asignados por numero de review
                //1 -> R24HORAS
                //2 -> R10DIAS
                //3 -> R1MES
                //4 -> R2MESES
                //5 -> R3MESES
                //6 -> R4MESES
                //7 -> R5MESES
                //8 -> R6MESES
                //9 -> R7MESES
                //10 -> R8MESES
                //11 -> R9MESES
                //12 -> R10MESES
                //13 -> R11MESES
                //14 -> R12MESES
                //15 -> R13MESES
                //16 -> R14MESES

                var nameFolderReview = '';
                if (review == '1') {
                    nameFolderReview = 'R24HORAS';
                } else if (review == '2') {
                    nameFolderReview = 'R10DIAS';
                } else if (review == '3') {
                    nameFolderReview = 'R1MES';
                } else if (review == '4') {
                    nameFolderReview = 'R2MESES';
                } else if (review == '5') {
                    nameFolderReview = 'R3MESES';
                } else if (review == '6') {
                    nameFolderReview = 'R4MESES';
                } else if (review == '7') {
                    nameFolderReview = 'R5MESES';
                } else if (review == '8') {
                    nameFolderReview = 'R6MESES';
                } else if (review == '9') {
                    nameFolderReview = 'R7MESES';
                } else if (review == '10') {
                    nameFolderReview = 'R8MESES';
                } else if (review == '11') {
                    nameFolderReview = 'R9MESES';
                } else if (review == '12') {
                    nameFolderReview = 'R10MESES';
                } else if (review == '13') {
                    nameFolderReview = 'R11MESES';
                } else if (review == '14') {
                    nameFolderReview = 'R12MESES';
                } else if (review == '15') {
                    nameFolderReview = 'R13MESES';
                } else if (review == '16') {
                    nameFolderReview = 'R14MESES';
                }

                var ar_images_values = [objImg_1, objImg_2, objImg_3, objImg_4, objImg_5, objImg_6, objImg_7, objImg_8, objImg_9, objImg_10, objImg_11, objImg_12, objImg_13, objImg_14, objImg_15, objImg_16, objImg_17, objImg_18, objImg_19, objImg_20, objImg_21, objImg_22, objImg_23, objImg_24];

                var ar_images_names = [objImgName_1, objImgName_2, objImgName_3, objImgName_4, objImgName_5, objImgName_6, objImgName_7, objImgName_8, objImgName_9, objImg_Name10, objImg_Name11, objImg_Name12, objImg_Name13, objImg_Name14, objImg_Name15, objImg_Name16, objImg_Name17, objImg_Name18, objImg_Name19, objImg_Name20, objImg_Name21, objImg_Name22, objImg_Name23, objImg_Name24];

                //CONSTANTS: CONSTANT that describe the base name of jpg files
                var IMAGE_NAME = customerId + '_' + recId + '_';

                var objRecord = record.load({ type: 'customer', id: customerId });
                var idCustomerText = objRecord.getText({ fieldId: 'entityid' });
                var nameFolderCustomer = idCustomerText + '_FOLDER';
                var idRootFolder = null;

                search.create({
                    type: search.Type.FOLDER,
                    filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [nameFolderCustomer] })],
                    columns: ['internalid']
                }).run().each(function (result) {
                    idRootFolder = result.getValue({ name: 'internalid' });
                });

                //ACTION: Guarda imagenes que no pertenecen a "SESIONES DE REVISIONES"
                if (review == null) {

                    for (var e in ar_images_values) {
                        if (ar_images_values[e] != null) {
                            ar_images_values[e].name = IMAGE_NAME + ar_images_names[e] + '.jpg';
                            //ar_images_values[e].Type = 'PNGIMAGE';
                            ar_images_values[e].folder = 2762933;
                            ar_images_values[e].save();
                        }
                    }
                    log.debug('DATA OF SAVE', 'CLIENT: ' + idCustomerText + ' Record: ' + recId);
                    context.response.write('<html><body><script>window.open("https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=' + recId + '&whence=&", "_self"); </script></body></html>');

                    //ACTION: Guarda imagenes que pertenecen a "SESIONES DE REVISIONES", validando previamente que exista un numero de la revision
                } else if (review == '1' || review == '2' || review == '3' || review == '4' || review == '5' || review == '6' || review == '7' || review == '8' || review == '9' || review == '10' || review == '11' || review == '12' || review == '13' || review == '14' || review == '15' || review == '16') {

                    try {
                        search.create({
                            type: search.Type.FOLDER,
                            filters: [
                                search.createFilter({ name: 'name', operator: search.Operator.IS, values: [nameFolderReview], isor: false }),
                                search.createFilter({ name: 'parent', operator: search.Operator.IS, values: [idRootFolder] })
                            ],
                            columns: ['internalid']
                        }).run().each(function (result) {
                            idReviewFolder = result.getValue({ name: 'internalid' });
                        });
                    } catch (error) {
                        log.error('ERROR busqueda folder revision', error);
                    }

                    var reviewName = '';

                    for (var f in ar_images_values) {
                        if (f >= 0 && f < 8) {
                            reviewName = 'numProc_' + numProc + '_rev_' + review + '_';
                        } else if (f >= 8 && f < 12) {
                            reviewName = 'numProc_' + numProc + '_rev_' + review + '_mic_' + f + '_';
                        }
                        if (ar_images_values[f] != null) {
                            ar_images_values[f].name = IMAGE_NAME + reviewName + ar_images_names[f] + '.jpg';
                            //ar_images_values[f].Type = 'PNGIMAGE';
                            ar_images_values[f].folder = idReviewFolder;
                            ar_images_values[f].save();
                        }
                    }
                    log.debug('DATA OF SAVE', 'CLIENT: ' + nameFolderCustomer + ' FOLDER REVIEW: ' + nameFolderReview + ' Record: ' + recId);
                }
                log.debug('Remaining', script.getRemainingUsage());
                context.response.write('<html><body><script>window.parent.close(); </script></body></html>');
            }
        }






        /**
         * //FUNCTION: disableFields(arr_disable, arr_values) -> Esta función bloquea los campos que ya tengan un valor guardado en la base de datos de netsuite
         * 
         * @param {array} arr_disable Arreglo que guarda los campos de netsuite
         * @param {array} arr_values Arreglo que guarda los valores de los campos de netsuite
         */
        function disableFields(arr_disable, arr_values) {
            for (var index = 0; index < arr_disable.length; index++) {
                if (arr_values[index] != null) {
                    var field = arr_disable[index];
                    field.updateDisplayType({ displayType: widget.FieldDisplayType.DISABLED });
                }
            }
        }

        /**
         * //FUNCTION: getJSON() -> convert URL to JSON schema
         * 
         * getJSON -> convert URL string to JSON schema
         * @param {string} u string of url that we wants convert to JSON schema
         */
        function getJSON(u) {

            var ar_url_data = u.split('&');

            var json = {};
            for (var i = 0; i < ar_url_data.length; i++) {
                var ar_val = ar_url_data[i].split('=');
                json[ar_val[0]] = ar_val[1];
            }
            return json;
        }

        /**
         * // FUNCTION: compress images to png from jpg, lowering image quality
         * 
         * @param {string} source_img_obj data source of image to will be compress
         * @param {int} quality final quality of image
         * @param {int} maxWidth maximum width of final image
         * @param {string} output_format 
         */
        function compress(source_img_obj, quality, maxWidth, output_format) {
            var mime_type = "image/jpeg";
            if (typeof output_format !== "undefined" && output_format == "png") {
                mime_type = "image/png";
            }

            maxWidth = maxWidth || 1000;
            var natW = source_img_obj.naturalWidth;
            var natH = source_img_obj.naturalHeight;
            var ratio = natH / natW;
            if (natW > maxWidth) {
                natW = maxWidth;
                natH = ratio * maxWidth;
            }

            var cvs = document.createElement('canvas');
            cvs.width = natW;
            cvs.height = natH;

            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, natW, natH);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;
        }

        return {
            onRequest: onRequest
        };
    });