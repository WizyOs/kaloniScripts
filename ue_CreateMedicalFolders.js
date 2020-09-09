/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/file', 'N/https', 'N/runtime', 'N/log'],

    /**
     * 
     * @param {*} record 
     * @param {*} search 
     * @param {*} file 
     */

    function (record, search, file, https, runtime, log) {

        function beforeLoad(context) {
            var idCurrentRecord = context.newRecord.id;
            var user = runtime.getCurrentUser();
            var role = user.role;

            if (role == 3) {
                try {
                    var supportCase = record.load({ type: 'supportcase', id: idCurrentRecord, isDynamic: false });
                    var formulario = supportCase.getValue({ fieldId: 'customform' }) || null;

                    if (context.type == 'view' && formulario == 138) {
                        var companyId = supportCase.getValue({ fieldId: 'company' });
                        var cliente = record.load({ type: 'customer', id: companyId });
                        var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                        var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                        var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                        var urlSkinRemote = cliente.getText({ fieldId: 'custentity368' });
                        var valuesListTratamiento = supportCase.getText({ fieldId: 'custevent1066' }) || null;
                        var nombreTratamiento = '';
                        for (var i in valuesListTratamiento) {
                            nombreTratamiento += valuesListTratamiento[i] + '_';
                        }
                        log.debug('Nombre carpeta', nombreTratamiento);
                        var numeroKHG = supportCase.getText({ fieldId: 'casenumber' });

                        log.debug('Record Num', numeroKHG);

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

                        if (nombreTratamiento != null) {

                            if (subsidiary == "6" || subsidiary == "11" || subsidiary == "10" || subsidiary == "12" || subsidiary == "16" || subsidiary == "15" || subsidiary == "17" || subsidiary == "13") {

                                var folderSucId = null;
                                var folderCliId = null;
                                var folderAutoId = null;
                                var folderAutoParent = null;
                                var folders = ['3 MESES', '7 DIAS', '15 DIAS', '20 DIAS', 'ANTES DE CIRUGIA', 'VALORACION'];
                                var array_foldersValidador = [];

                                // Busqueda el nombre del folder de la sucursal
                                search.create({
                                    type: search.Type.FOLDER,
                                    filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [sucursalText + "_HAIR"] })],
                                    columns: ['internalid']
                                }).run().each(function (result) {
                                    folderSucId = result.getValue({ name: 'internalid' });
                                });

                                if (folderSucId != null) {
                                    // Busqueda el nombre del folder del cliente
                                    search.create({
                                        type: search.Type.FOLDER,
                                        filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [clienteIdText + "_FOLDER"] })],
                                        columns: ['internalid']
                                    }).run().each(function (result) {
                                        folderCliId = result.getValue({ name: 'internalid' });
                                    });

                                    // Busqueda el nombre del folder del cliente
                                    search.create({
                                        type: search.Type.FOLDER,
                                        filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [clienteIdText + '_SKIN_BODY'] })],
                                        columns: ['internalid']
                                    }).run().each(function (result) {
                                        folderMedicalId = result.getValue({ name: 'internalid' });
                                    });

                                    var folderMedicalId = folderMedicalId;
                                    var valor = Math.floor(Math.random() * 1000001);
                                    // Creación de folders base sin incluir la de cliente por que ya existe
                                    if (folderCliId != null) {
                                        if (folderMedicalId == null) {
                                            try {
                                                //Creación del archivo por defecto NetSuiteInf.txt
                                                createDefaultFile(folderCliId);

                                                var createFolderSkinBoby = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFolderSkinBoby.setValue({
                                                    fieldId: 'parent',
                                                    value: folderCliId
                                                });
                                                createFolderSkinBoby.setValue({
                                                    fieldId: 'name',
                                                    value: clienteIdText + '_SKIN_BODY'
                                                });
                                                var folderSkinBodyId = createFolderSkinBoby.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                var createFolderTratamiento = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'parent',
                                                    value: folderSkinBodyId
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'name',
                                                    value: nombreTratamiento + numeroKHG
                                                });
                                                var folderTratamientoId = createFolderTratamiento.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                createDefaultFile(folderTratamientoId);


                                                for (var numFolder in folders) {
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
                                                }

                                                if (array_foldersValidador.length > 0) {
                                                    for (var i = 0; i < array_foldersValidador.length; i++) {
                                                        var createFoldersEnTratamiento = record.create({
                                                            type: record.Type.FOLDER,
                                                            isDynamic: true
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'parent',
                                                            value: folderTratamientoId
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'name',
                                                            value: folders[array_foldersValidador[i]]
                                                        });
                                                        var foldersEnTratamientoId = createFoldersEnTratamiento.save({
                                                            enableSourcing: true,
                                                            ignoreMandatoryFields: true
                                                        });
                                                        //Creación del archivo por defecto NetSuiteInf.txt
                                                        createDefaultFile(foldersEnTratamientoId);
                                                        log.debug('Folder Creado', 'Folder base creado: ' + folders[array_foldersValidador[i]] + ' del cliente: ' + clienteIdText);

                                                    }
                                                    log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                                                }
                                            } catch (error) {
                                                log.error('Exception: ', error);
                                                log.error('Id Cliente: ', clienteIdText);
                                                log.error('Sucursal Cliente', sucursalText);
                                            }
                                        } else {
                                            try {
                                                var createFolderTratamiento = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'parent',
                                                    value: folderMedicalId
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'name',
                                                    value: nombreTratamiento + numeroKHG
                                                });
                                                var folderTratamientoId = createFolderTratamiento.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                createDefaultFile(folderTratamientoId);


                                                for (var numFolder in folders) {
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
                                                }

                                                if (array_foldersValidador.length > 0) {
                                                    for (var i = 0; i < array_foldersValidador.length; i++) {
                                                        var createFoldersEnTratamiento = record.create({
                                                            type: record.Type.FOLDER,
                                                            isDynamic: true
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'parent',
                                                            value: folderTratamientoId
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'name',
                                                            value: folders[array_foldersValidador[i]]
                                                        });
                                                        var foldersEnTratamientoId = createFoldersEnTratamiento.save({
                                                            enableSourcing: true,
                                                            ignoreMandatoryFields: true
                                                        });
                                                        //Creación del archivo por defecto NetSuiteInf.txt
                                                        createDefaultFile(foldersEnTratamientoId);
                                                        log.debug('Folder Creado', 'Folder base creado: ' + folders[array_foldersValidador[i]] + ' del cliente: ' + clienteIdText);

                                                    }
                                                    log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                                                }
                                            } catch (error) {
                                                log.error('Exception: ', error);
                                                log.error('Id Cliente: ', clienteIdText);
                                                log.error('Sucursal Cliente', sucursalText);
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    log.error('Error de generación de carpetas BASE BeforeLoad', error);
                }
                var scriptObj = runtime.getCurrentScript();
                log.debug('Units AfterSubmit', "Remaining governance units: " + scriptObj.getRemainingUsage());
            }
        }

        function beforeSubmit(context) {

        }

        function afterSubmit(context) {
            var currentRecord = context.newRecord;

            if (currentRecord != null || currentRecord != '') {

                try {
                    //var prefijo = currentRecord.getValue({ fieldId: 'custevent70' });
                    var formulario = currentRecord.getValue({ fieldId: 'customform' });

                    if (context.type == 'create' && formulario == 138) {
                        var companyId = currentRecord.getValue({ fieldId: 'company' });
                        var cliente = record.load({ type: 'customer', id: companyId });
                        var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                        var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                        var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                        var urlSkinRemote = cliente.getText({ fieldId: 'custentity368' });
                        var valuesListTratamiento = currentRecord.getText({ fieldId: 'custevent1066' }) || null;
                        var nombreTratamiento = '';
                        for (var i in valuesListTratamiento) {
                            nombreTratamiento += valuesListTratamiento[i] + '_';
                        }
                        var supportCaseId = currentRecord.id;
                        var supportCase = record.load({ type: 'supportcase', id: supportCaseId, isDynamic: true });
                        var numeroKHG = supportCase.getText({ fieldId: 'casenumber' });

                        log.debug('Record Num', numeroKHG);

                        // Validación para proceso de creación automatico de folders por subsidiaria
                        // México = 6
                        // Brasil = 11
                        // Colombia = 10
                        // España = 12
                        // Eominicana = 16
                        // Dallas = 15
                        //You can comment for remove all subsidiarys
                        //Comment only for Meixco subsidiary

                        if (nombreTratamiento != null) {
                            if (subsidiary == "6" || subsidiary == "11" || subsidiary == "10" || subsidiary == "12" || subsidiary == "16" || subsidiary == "15" || subsidiary == "17" || subsidiary == "13") {

                                var folderSucId = null;
                                var folderCliId = null;
                                var folderAutoId = null;
                                var folderAutoParent = null;
                                var folders = ['3 MESES', '7 DIAS', '15 DIAS', '20 DIAS', 'ANTES DE CIRUGIA', 'VALORACION'];
                                var array_foldersValidador = [];

                                // Busqueda el nombre del folder de la sucursal
                                search.create({
                                    type: search.Type.FOLDER,
                                    filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [sucursalText + "_HAIR"] })],
                                    columns: ['internalid']
                                }).run().each(function (result) {
                                    folderSucId = result.getValue({ name: 'internalid' });
                                });

                                if (folderSucId != null) {
                                    // Busqueda el nombre del folder del cliente
                                    search.create({
                                        type: search.Type.FOLDER,
                                        filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [clienteIdText + "_FOLDER"] })],
                                        columns: ['internalid']
                                    }).run().each(function (result) {
                                        folderCliId = result.getValue({ name: 'internalid' });
                                    });

                                    // Busqueda el nombre del folder del cliente
                                    search.create({
                                        type: search.Type.FOLDER,
                                        filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [clienteIdText + '_SKIN_BODY'] })],
                                        columns: ['internalid']
                                    }).run().each(function (result) {
                                        folderMedicalId = result.getValue({ name: 'internalid' });
                                    });

                                    var folderMedicalId = folderMedicalId;
                                    var valor = Math.floor(Math.random() * 1000001);
                                    // Creación de folders base sin incluir la de cliente por que ya existe
                                    if (folderCliId != null) {
                                        if (folderMedicalId == null) {
                                            try {
                                                //Creación del archivo por defecto NetSuiteInf.txt
                                                createDefaultFile(folderCliId);

                                                var createFolderSkinBoby = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFolderSkinBoby.setValue({
                                                    fieldId: 'parent',
                                                    value: folderCliId
                                                });
                                                createFolderSkinBoby.setValue({
                                                    fieldId: 'name',
                                                    value: clienteIdText + '_SKIN_BODY_'
                                                });
                                                var folderSkinBodyId = createFolderSkinBoby.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                var createFolderTratamiento = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'parent',
                                                    value: folderSkinBodyId
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'name',
                                                    value: nombreTratamiento + numeroKHG
                                                });
                                                var folderTratamientoId = createFolderTratamiento.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                createDefaultFile(folderTratamientoId);


                                                for (var numFolder in folders) {
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
                                                }

                                                if (array_foldersValidador.length > 0) {
                                                    for (var i = 0; i < array_foldersValidador.length; i++) {
                                                        var createFoldersEnTratamiento = record.create({
                                                            type: record.Type.FOLDER,
                                                            isDynamic: true
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'parent',
                                                            value: folderTratamientoId
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'name',
                                                            value: folders[array_foldersValidador[i]]
                                                        });
                                                        var foldersEnTratamientoId = createFoldersEnTratamiento.save({
                                                            enableSourcing: true,
                                                            ignoreMandatoryFields: true
                                                        });
                                                        //Creación del archivo por defecto NetSuiteInf.txt
                                                        createDefaultFile(foldersEnTratamientoId);
                                                        log.debug('Folder Creado', 'Folder base creado: ' + folders[array_foldersValidador[i]] + ' del cliente: ' + clienteIdText);

                                                    }
                                                    log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                                                }
                                            } catch (error) {
                                                log.error('Exception: ', error);
                                                log.error('Id Cliente: ', clienteIdText);
                                                log.error('Sucursal Cliente', sucursalText);
                                            }
                                        } else {
                                            try {
                                                var createFolderTratamiento = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'parent',
                                                    value: folderMedicalId
                                                });
                                                createFolderTratamiento.setValue({
                                                    fieldId: 'name',
                                                    value: nombreTratamiento + numeroKHG
                                                });
                                                var folderTratamientoId = createFolderTratamiento.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                createDefaultFile(folderTratamientoId);


                                                for (var numFolder in folders) {
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
                                                }

                                                if (array_foldersValidador.length > 0) {
                                                    for (var i = 0; i < array_foldersValidador.length; i++) {
                                                        var createFoldersEnTratamiento = record.create({
                                                            type: record.Type.FOLDER,
                                                            isDynamic: true
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'parent',
                                                            value: folderTratamientoId
                                                        });
                                                        createFoldersEnTratamiento.setValue({
                                                            fieldId: 'name',
                                                            value: folders[array_foldersValidador[i]]
                                                        });
                                                        var foldersEnTratamientoId = createFoldersEnTratamiento.save({
                                                            enableSourcing: true,
                                                            ignoreMandatoryFields: true
                                                        });
                                                        //Creación del archivo por defecto NetSuiteInf.txt
                                                        createDefaultFile(foldersEnTratamientoId);
                                                        log.debug('Folder Creado', 'Folder base creado: ' + folders[array_foldersValidador[i]] + ' del cliente: ' + clienteIdText);

                                                    }
                                                    log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                                                }
                                            } catch (error) {
                                                log.error('Exception: ', error);
                                                log.error('Id Cliente: ', clienteIdText);
                                                log.error('Sucursal Cliente', sucursalText);
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    log.error('Error de generación de carpetas BASE Aftersubmit', error);
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

        //Funcion para la replica del archivo del gabinete SKIN
        /** Funcion que retorna el INTERNAL ID del archivo en PDF creado
         * 
         * @param {int} folderParent Folder principal de cliente
         * @param {string} urlOrigin URL del archivo remoto en formato PDF de Skin
         * @param {string} idTextoCliente Identificador HG-XXXXXX de cliente
         */
        function createURLSkin(folderParent, urlOrigin, idTextoCliente) {
            var response = https.request({
                url: urlOrigin,
            });

            var pdfContent = response.body;

            var createURLSkin = file.create({
                name: idTextoCliente + "_SKIN.pdf",
                fyleType: file.Type.PDF,
                contents: pdfContent,
                folder: folderParent
            });
            var fileSkinPDFId = createURLSkin.save();

            return fileSkinPDFId;
        }

        return {
            beforeLoad: beforeLoad, //carga la funcion beforeLoad que se usa antes de que la pagina sea cargada
            //beforeSubmit: beforeSubmit, // carga la funcion beforeSubmit se usa después de que el registro sea enviado
            afterSubmit: afterSubmit // carga la funcion afterSubmit se usa antes de que el registro sea enviado
        };
    });