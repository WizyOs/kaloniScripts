/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/file', 'N/https', 'N/runtime'],

    /**
     * 
     * @param {*} record 
     * @param {*} search 
     * @param {*} file 
     */

    function (record, search, file, https, runtime) {

        function beforeLoad(context) {

            if (context.type == 'view') {
                var idCurrentRecord = context.newRecord.id;
                if (idCurrentRecord != null || idCurrentRecord != '') {
                    try {
                        var cliente = record.load({ type: 'customer', id: idCurrentRecord });
                        var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                        var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                        var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                        var urlSkinRemote = cliente.getText({ fieldId: 'custentity368' });

                        // Validación para proceso de creación automatico de folders por subsidiaria
                        // México = 6
                        // Brasil = 11
                        // Colombia = 10
                        // España = 12
                        // Eominicana = 16
                        // Dallas = 15
                        // Alemania = 17
                        // Austria = 13
                        //You can comment for remove all subsidiarys
                        //Comment only for Meixco subsidiary

                        if (subsidiary == "6" || subsidiary == "11" || subsidiary == "10" || subsidiary == "12" || subsidiary == "16" || subsidiary == "15" || subsidiary == "17" || subsidiary == "13") {

                            var folderSucId = null;
                            var folderCliId = null;
                            var folderAutoId = null;
                            var folderAutoParent = null;
                            var fotosEnfermeria = clienteIdText + "_FOTOS_ENFERMERIA";
                            var fotosMicrocamara = clienteIdText + "_MICROCAMARA";
                            var folders = ['R11MESES', 'R12MESES', 'R13MESES', 'R14MESES', 'Aparatología', 'TRATAMIENTOS', fotosEnfermeria, fotosMicrocamara];
                            var array_foldersValidador = [];

                            // Busqueda el nombre del folder de la sucursal
                            search.create({
                                type: search.Type.FOLDER,
                                filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [sucursalText + "_HAIR"] })],
                                columns: ['internalid']
                            }).run().each(function (result) {
                                folderSucId = result.getValue({ name: 'internalid' });
                            });
                            //log.debug('Folder Sucursal', folderSucId);

                            if (folderSucId != null) {
                                // Busqueda el nombre del folder del cliente
                                search.create({
                                    type: search.Type.FOLDER,
                                    filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [clienteIdText + "_FOLDER"] })],
                                    columns: ['internalid']
                                }).run().each(function (result) {
                                    folderCliId = result.getValue({ name: 'internalid' });
                                });
                                log.debug('Folder Cliente', folderCliId);

                                // Creación de folders base sin incluir la de cliente por que ya existe
                                if (folderCliId != null) {
                                    try {
                                        //Creación del archivo por defecto NetSuiteInf.txt
                                        createDefaultFile(folderCliId);

                                        for (numFolder in folders) {
                                            search.create({
                                                type: search.Type.FOLDER,
                                                filters: [
                                                    search.createFilter({ name: 'name', operator: search.Operator.IS, values: [folders[numFolder]], isor: false }),
                                                    search.createFilter({ name: 'parent', operator: search.Operator.IS, values: [folderCliId] })
                                                ],
                                                columns: ['internalid', 'name']
                                            }).run().each(function (result) {
                                                folderAutoId = result.getValue({ name: 'internalid' }) || null;
                                                folderName = result.getValue({ name: 'name' }) || null;
                                            });
                                            //log.debug('array_foldersValidador', 'Id Folder: ' + folderAutoId + ' Folder Name: ' + folderName);
                                            if (folderAutoId == null) {
                                                array_foldersValidador.push(numFolder);
                                                //log.debug('Array Validador Valores', array_foldersValidador);
                                            }
                                            folderAutoId = null;
                                            folderName = null;
                                        };

                                        if (array_foldersValidador.length > 0) {
                                            for (var i = 0; i < array_foldersValidador.length; i++) {
                                                var createFoldersR = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFoldersR.setValue({
                                                    fieldId: 'parent',
                                                    value: folderCliId
                                                });
                                                createFoldersR.setValue({
                                                    fieldId: 'name',
                                                    value: folders[array_foldersValidador[i]]
                                                });
                                                var folderRevisionId = createFoldersR.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });
                                                //Creación del archivo por defecto NetSuiteInf.txt
                                                createDefaultFile(folderRevisionId);
                                                log.debug('Folder Creado', 'Folder base creado: ' + folders[array_foldersValidador[i]] + ' del cliente: ' + clienteIdText);

                                                //Creación del folder Microcamara para las carpetas de revisión
                                                if (folders[array_foldersValidador[i]] <= 3) {
                                                    var createFoldersM = record.create({
                                                        type: record.Type.FOLDER,
                                                        isDynamic: true
                                                    });
                                                    createFoldersM.setValue({
                                                        fieldId: 'parent',
                                                        value: folderRevisionId
                                                    });
                                                    createFoldersM.setValue({
                                                        fieldId: 'name',
                                                        value: "MC" + (parseInt(folders[array_foldersValidador[i]]) + 1)
                                                    });
                                                    var folderMicroId = createFoldersM.save({
                                                        enableSourcing: true,
                                                        ignoreMandatoryFields: true
                                                    });
                                                    //Creación del archivo por defecto NetSuiteInf.txt
                                                    createDefaultFile(folderMicroId);
                                                }
                                            }
                                            log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                                        }
                                    } catch (error) {
                                        log.error('Exception: ', error);
                                        log.error('Id Cliente: ', clienteIdText);
                                        log.error('Sucursal Cliente', sucursalText);
                                    }
                                    // Creación de folders base incluyendo la de cliente
                                } else {
                                    try {
                                        var createFolderC = record.create({
                                            type: record.Type.FOLDER,
                                            isDynamic: true
                                        });
                                        createFolderC.setValue({
                                            fieldId: 'parent',
                                            value: folderSucId
                                        });
                                        createFolderC.setValue({
                                            fieldId: 'name',
                                            value: clienteIdText + "_FOLDER"
                                        });
                                        var folderClienteId = createFolderC.save({
                                            enableSourcing: true,
                                            ignoreMandatoryFields: true
                                        });

                                        //Creación del archivo por defecto NetSuiteInf.txt
                                        createDefaultFile(folderClienteId);

                                        for (numFolder in folders) {
                                            var createFoldersR = record.create({
                                                type: record.Type.FOLDER,
                                                isDynamic: true
                                            });
                                            createFoldersR.setValue({
                                                fieldId: 'parent',
                                                value: folderClienteId
                                            });
                                            createFoldersR.setValue({
                                                fieldId: 'name',
                                                value: folders[numFolder]
                                            });
                                            var folderRevisionId = createFoldersR.save({
                                                enableSourcing: true,
                                                ignoreMandatoryFields: true
                                            });
                                            //Creación del archivo por defecto NetSuiteInf.txt
                                            createDefaultFile(folderRevisionId);

                                            //Creación del folder Microcamara para las carpetas de revisión
                                            if (numFolder <= 3) {
                                                var createFoldersM = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFoldersM.setValue({
                                                    fieldId: 'parent',
                                                    value: folderRevisionId
                                                });
                                                createFoldersM.setValue({
                                                    fieldId: 'name',
                                                    value: "MC" + (parseInt(numFolder) + 1)
                                                });
                                                var folderMicroId = createFoldersM.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });
                                                //Creación del archivo por defecto NetSuiteInf.txt
                                                createDefaultFile(folderMicroId);
                                            }
                                        };
                                        log.debug('Folder de cliente NO existe, se crean todos los folders', clienteIdText);
                                    } catch (error) {
                                        log.error('Exception: ', error);
                                        log.error('Id Cliente: ', clienteIdText);
                                        log.error('Sucursal Cliente', sucursalText);
                                    }
                                }
                            }
                        }
                    } catch (error) {
                        log.error('Error de generación de carpetas BASE 2 BeforeLoad', error);
                    }
                }
            }
            var scriptObj = runtime.getCurrentScript();
            log.debug('Units BeforeLoad', "Remaining governance units: " + scriptObj.getRemainingUsage());
        }

        function beforeSubmit(context) {

        }

        function afterSubmit(context) {
            var currentRecord = context.newRecord;
            if (currentRecord != null || currentRecord != '') {
                try {
                    var prefijo = currentRecord.getValue({ fieldId: 'custevent70' });

                    if ((prefijo == "12") && (context.type == 'create')) {
                        var companyId = currentRecord.getValue({ fieldId: 'company' });
                        var cliente = record.load({ type: 'customer', id: companyId });
                        var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                        var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                        var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                        var urlSkinRemote = cliente.getText({ fieldId: 'custentity368' });

                        // Validación para proceso de creación automatico de folders por subsidiaria
                        // México = 6
                        // Brasil = 11
                        // Colombia = 10
                        // España = 12
                        // Eominicana = 16
                        // Dallas = 15
                        //You can comment for remove all subsidiarys
                        //Comment only for Meixco subsidiary

                        if (subsidiary == "6" || subsidiary == "11" || subsidiary == "10" || subsidiary == "12" || subsidiary == "16" || subsidiary == "15" || subsidiary == "17" || subsidiary == "13") {

                            var folderSucId = null;
                            var folderCliId = null;
                            var folderAutoId = null;
                            var folderAutoParent = null;
                            var fotosEnfermeria = clienteIdText + "_FOTOS_ENFERMERIA";
                            var fotosMicrocamara = clienteIdText + "_MICROCAMARA";
                            var folders = ['R11MESES', 'R12MESES', 'R13MESES', 'R14MESES', 'Aparatología', 'TRATAMIENTOS', fotosEnfermeria, fotosMicrocamara];
                            var array_foldersValidador = [];

                            // Busqueda el nombre del folder de la sucursal
                            search.create({
                                type: search.Type.FOLDER,
                                filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [sucursalText + "_HAIR"] })],
                                columns: ['internalid']
                            }).run().each(function (result) {
                                folderSucId = result.getValue({ name: 'internalid' });
                            });
                            //log.debug('Folder Sucursal', folderSucId);

                            if (folderSucId != null) {
                                // Busqueda el nombre del folder del cliente
                                search.create({
                                    type: search.Type.FOLDER,
                                    filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [clienteIdText + "_FOLDER"] })],
                                    columns: ['internalid']
                                }).run().each(function (result) {
                                    folderCliId = result.getValue({ name: 'internalid' });
                                });
                                log.debug('Folder Cliente', folderCliId);

                                // Creación de folders base sin incluir la de cliente por que ya existe
                                if (folderCliId != null) {
                                    try {
                                        //Creación del archivo por defecto NetSuiteInf.txt
                                        createDefaultFile(folderCliId);

                                        for (numFolder in folders) {
                                            search.create({
                                                type: search.Type.FOLDER,
                                                filters: [
                                                    search.createFilter({ name: 'name', operator: search.Operator.IS, values: [folders[numFolder]], isor: false }),
                                                    search.createFilter({ name: 'parent', operator: search.Operator.IS, values: [folderCliId] })
                                                ],
                                                columns: ['internalid', 'name']
                                            }).run().each(function (result) {
                                                folderAutoId = result.getValue({ name: 'internalid' }) || null;
                                                folderName = result.getValue({ name: 'name' }) || null;
                                            });
                                            //log.debug('array_foldersValidador', 'Id Folder: ' + folderAutoId + ' Folder Name: ' + folderName);
                                            if (folderAutoId == null) {
                                                array_foldersValidador.push(numFolder);
                                                //log.debug('Array Validador Valores', array_foldersValidador);
                                            }
                                            folderAutoId = null;
                                            folderName = null;
                                        };

                                        if (array_foldersValidador.length > 0) {
                                            for (var i = 0; i < array_foldersValidador.length; i++) {
                                                var createFoldersR = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFoldersR.setValue({
                                                    fieldId: 'parent',
                                                    value: folderCliId
                                                });
                                                createFoldersR.setValue({
                                                    fieldId: 'name',
                                                    value: folders[array_foldersValidador[i]]
                                                });
                                                var folderRevisionId = createFoldersR.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });
                                                //Creación del archivo por defecto NetSuiteInf.txt
                                                createDefaultFile(folderRevisionId);
                                                log.debug('Folder Creado', 'Folder base creado: ' + folders[array_foldersValidador[i]] + ' del cliente: ' + clienteIdText);

                                                //Creación del folder Microcamara para las carpetas de revisión
                                                if (folders[array_foldersValidador[i]] <= 3) {
                                                    var createFoldersM = record.create({
                                                        type: record.Type.FOLDER,
                                                        isDynamic: true
                                                    });
                                                    createFoldersM.setValue({
                                                        fieldId: 'parent',
                                                        value: folderRevisionId
                                                    });
                                                    createFoldersM.setValue({
                                                        fieldId: 'name',
                                                        value: "MC" + (parseInt(folders[array_foldersValidador[i]]) + 1)
                                                    });
                                                    var folderMicroId = createFoldersM.save({
                                                        enableSourcing: true,
                                                        ignoreMandatoryFields: true
                                                    });
                                                    //Creación del archivo por defecto NetSuiteInf.txt
                                                    createDefaultFile(folderMicroId);
                                                }
                                            }
                                            log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                                        };
                                    } catch (error) {
                                        log.error('Exception: ', error);
                                        log.error('Id Cliente: ', clienteIdText);
                                        log.error('Sucursal Cliente', sucursalText);
                                    }
                                    // Creación de folders base incluyendo la de cliente
                                } else {
                                    try {
                                        var createFolderC = record.create({
                                            type: record.Type.FOLDER,
                                            isDynamic: true
                                        });
                                        createFolderC.setValue({
                                            fieldId: 'parent',
                                            value: folderSucId
                                        });
                                        createFolderC.setValue({
                                            fieldId: 'name',
                                            value: clienteIdText + "_FOLDER"
                                        });
                                        var folderClienteId = createFolderC.save({
                                            enableSourcing: true,
                                            ignoreMandatoryFields: true
                                        });

                                        //Creación del archivo por defecto NetSuiteInf.txt
                                        createDefaultFile(folderClienteId);

                                        for (numFolder in folders) {
                                            var createFoldersR = record.create({
                                                type: record.Type.FOLDER,
                                                isDynamic: true
                                            });
                                            createFoldersR.setValue({
                                                fieldId: 'parent',
                                                value: folderClienteId
                                            });
                                            createFoldersR.setValue({
                                                fieldId: 'name',
                                                value: folders[numFolder]
                                            });
                                            var folderRevisionId = createFoldersR.save({
                                                enableSourcing: true,
                                                ignoreMandatoryFields: true
                                            });
                                            //Creación del archivo por defecto NetSuiteInf.txt
                                            createDefaultFile(folderRevisionId);

                                            //Creación del folder Microcamara para las carpetas de revisión
                                            if (numFolder <= 3) {
                                                var createFoldersM = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFoldersM.setValue({
                                                    fieldId: 'parent',
                                                    value: folderRevisionId
                                                });
                                                createFoldersM.setValue({
                                                    fieldId: 'name',
                                                    value: "MC" + (parseInt(numFolder) + 1)
                                                });
                                                var folderMicroId = createFoldersM.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });
                                                //Creación del archivo por defecto NetSuiteInf.txt
                                                createDefaultFile(folderMicroId);
                                            }
                                        };
                                        log.debug('Folder de cliente NO existe, se crean todos los folders', clienteIdText);
                                    } catch (error) {
                                        log.error('Exception: ', error);
                                        log.error('Id Cliente: ', clienteIdText);
                                        log.error('Sucursal Cliente', sucursalText);
                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    log.error('Error de generación de carpetas BASE 2 Aftersubmit', error);
                }
            }
            var scriptObj = runtime.getCurrentScript();
            log.debug('Units AfterSubmit', "Remaining governance units: " + scriptObj.getRemainingUsage());
        }

        //Función para la creación del archivo por defecto NetSuiteInf.txt
        /** Funcion que crea el archivo .txt por defecto y 
         * devuelve el id asociado a la creacion de este archivo
         * 
         * @param {string} folderParent id del Folder principal de cliente
         */
        function createDefaultFile(folderParent) {
            var createDefaultFile = file.create({
                name: 'NetSuiteInf.txt',
                fileType: file.Type.PLAINTEXT,
                contents: 'Archivo creado por script',
                encoding: file.Encoding.UTF8,
                folder: folderParent
            });
            var NetSuiteInfId = createDefaultFile.save();

            return NetSuiteInfId;
        }

        return {
            beforeLoad: beforeLoad, //carga la funcion beforeLoad que se usa antes de que la pagina sea cargada
            //beforeSubmit: beforeSubmit, // carga la funcion beforeSubmit se usa después de que el registro sea enviado
            afterSubmit: afterSubmit // carga la funcion afterSubmit se usa antes de que el registro sea enviado
        };
    });