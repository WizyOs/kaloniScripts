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
            try {
                var formularioId = context.request.parameters.cf;
            } catch (error) {
                var formularioId = 'notFormulario';
            }
            log.debug('Formulario', formularioId);

            if (formularioId != 119 || formularioId == 'notFormulario') {
                var idCurrentRecord = context.newRecord.id;
                var cliente = record.load({ type: 'customer', id: idCurrentRecord });
                var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                var urlSkinRemote = cliente.getText({ fieldId: 'custentity368' });
                var urlSkinLocal = cliente.getText({ fieldId: 'custentity391' }) || 'null';

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
                    fotosEnfermeria = String(fotosEnfermeria);
                    fotosMicrocamara = String(fotosMicrocamara);
                    var folders = ['R24HORAS', 'R10DIAS', 'R1MES', 'R2MES', 'R3MESES', 'R4MESES', 'R5MESES', 'R6MESES', 'R7MESES', 'R8MESES', 'R9MESES', 'R10MESES', 'R11MESES', 'R12MESES', 'R13MESES', 'R14MESES', 'Aparatología', 'TRATAMIENTOS', fotosEnfermeria, fotosMicrocamara];

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
                                            search.createFilter({ name: 'name', operator: search.Operator.IS, values: [folders[numFolder]] }),
                                            search.createFilter({ name: 'parent', operator: search.Operator.IS, values: [folderCliId] })
                                        ],
                                        columns: ['internalid', 'parent']
                                    }).run().each(function (result) {
                                        folderAutoId = result.getValue({ name: 'internalid' });
                                        folderAutoParent = result.getValue({ name: 'parent' });
                                    });
                                    //log.debug(folders[numFolder] + ' ' + folderAutoId);
                                    //log.debug('Id Folder Injerto', folderInjertoID);
                                    //log.debug('id Parent', folderAutoParent);                                

                                    if (folderAutoId == null) {
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
                                            value: folders[numFolder]
                                        });
                                        var folderRevisionId = createFoldersR.save({
                                            enableSourcing: true,
                                            ignoreMandatoryFields: true
                                        });
                                        //Creación del archivo por defecto NetSuiteInf.txt
                                        createDefaultFile(folderRevisionId);
                                        log.debug('Folder Creado', 'Folder base creado: ' + folders[numFolder] + ' del cliente: ' + clienteIdText);

                                        //Creación del folder Microcamara para las carpetas de revisión
                                        if (numFolder <= 7) {
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
                                    }
                                };
                                log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                            } catch (error) {
                                log.error('Exception: ', error);
                                log.error('Id Cliente: ', clienteIdText);
                                log.error('Sucursal Cliente', sucursalText);
                            }
                            if (urlSkinRemote.slice(0, 4) == "http" && urlSkinLocal == 'null') {
                                var idPDFSkin = createURLSkin(folderCliId, urlSkinRemote, clienteIdText);
                                var filePDFSkin = file.load({ id: idPDFSkin });
                                var filePDFSkinURL = filePDFSkin.url;
                                cliente.setValue({ fieldId: 'custentity391', value: filePDFSkinURL });
                                cliente.save({ enableSourcing: true, ignoreMandatoryFields: true });
                                log.debug('id Folder creado y su URL NS', idPDFSkin + ' ' + filePDFSkinURL);
                            } else {
                                log.debug('URL Skin no existe o ya existe un PDF local creado');
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

                                /** AUTOMATION: CREATE FOLDERS OF REVISIONS
                                 * Creación de folders automaticamente al crear el evento de valoracion
                                 * Array: Folders => nombre de los folders base
                                 * folderClienteId => variable que indica el id del folder del cliente
                                 */

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
                                    if (numFolder <= 7) {
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
                            if (urlSkinRemote.slice(0, 4) == "http" && urlSkinLocal == 'null') {
                                var idPDFSkin = createURLSkin(folderClienteId, urlSkinRemote, clienteIdText);
                                var filePDFSkin = file.load({ id: idPDFSkin });
                                var filePDFSkinURL = filePDFSkin.url;
                                cliente.setValue({ fieldId: 'custentity391', value: filePDFSkinURL });
                                cliente.save({ enableSourcing: true, ignoreMandatoryFields: true });
                                log.debug('id Folder creado y su URL NS', idPDFSkin + ' ' + filePDFSkinURL);
                            } else {
                                log.debug('URL Skin no existe');
                            }
                        }
                    }
                }
            }
            var scriptObj = runtime.getCurrentScript();
            log.debug('Units', "Remaining governance units: " + scriptObj.getRemainingUsage());
        }

        /**
         * 
         * @param {*} context // Contexto actual de trabajo
         */
        function beforeSubmit(context) {

        }

        /**
         * 
         * @param {*} context // Contexto actual de trabajo
         */
        function afterSubmit(context) {
            var formularioId = context.request.parameters.cf;
            log.debug('Formulario', formularioId);

            if (formularioId == 119) {
                var idCurrentRecord = context.newRecord.id;
                var cliente = record.load({ type: 'customer', id: idCurrentRecord });
                var subsidiary = cliente.getValue({ fieldId: 'subsidiary' });
                var clienteIdText = cliente.getText({ fieldId: 'entityid' });
                var sucursalText = cliente.getText({ fieldId: 'custentity25' });
                var urlSkinRemote = cliente.getText({ fieldId: 'custentity368' });
                var urlSkinLocal = cliente.getText({ fieldId: 'custentity391' }) || 'null';

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
                    fotosEnfermeria = String(fotosEnfermeria);
                    fotosMicrocamara = String(fotosMicrocamara);
                    var folders = ['R24HORAS', 'R10DIAS', 'R1MES', 'R3MESES', 'R6MESES', 'R9MESES', 'R12MESES', 'R14MESES', 'Aparatología', 'TRATAMIENTOS', fotosEnfermeria, fotosMicrocamara];

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
                                            search.createFilter({ name: 'name', operator: search.Operator.IS, values: [folders[numFolder]] }),
                                            search.createFilter({ name: 'parent', operator: search.Operator.IS, values: [folderCliId] })
                                        ],
                                        columns: ['internalid', 'parent']
                                    }).run().each(function (result) {
                                        folderAutoId = result.getValue({ name: 'internalid' });
                                        folderAutoParent = result.getValue({ name: 'parent' })
                                    });
                                    //log.debug(folders[numFolder] + ' ' + folderAutoId);
                                    //log.debug('Id Folder Injerto', folderInjertoID);
                                    //log.debug('id Parent', folderAutoParent);                                

                                    if (folderAutoId == null) {
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
                                            value: folders[numFolder]
                                        });
                                        var folderRevisionId = createFoldersR.save({
                                            enableSourcing: true,
                                            ignoreMandatoryFields: true
                                        });
                                        //Creación del archivo por defecto NetSuiteInf.txt
                                        createDefaultFile(folderRevisionId);
                                        log.debug('Folder Creado', 'Folder base creado: ' + folders[numFolder] + ' del cliente: ' + clienteIdText);

                                        //Creación del folder Microcamara para las carpetas de revisión
                                        if (numFolder <= 7) {
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
                                    }
                                };
                                //log.debug('Folder de cliente existe, se crean el resto de folders', clienteIdText);
                            } catch (error) {
                                log.error('Exception: ', error);
                                log.error('Id Cliente: ', clienteIdText);
                                log.error('Sucursal Cliente', sucursalText);
                            }
                            if (urlSkinRemote.slice(0, 4) == "http" && urlSkinLocal == 'null') {
                                var idPDFSkin = createURLSkin(folderCliId, urlSkinRemote, clienteIdText);
                                var filePDFSkin = file.load({ id: idPDFSkin });
                                var filePDFSkinURL = filePDFSkin.url;
                                cliente.setValue({ fieldId: 'custentity391', value: filePDFSkinURL });
                                cliente.save({ enableSourcing: true, ignoreMandatoryFields: true });
                                log.debug('id Folder creado y su URL NS', idPDFSkin + ' ' + filePDFSkinURL);
                            } else {
                                log.debug('URL Skin no existe o ya existe un PDF local creado');
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

                                /** AUTOMATION: CREATE FOLDERS OF REVISIONS
                                 * Creación de folders automaticamente al crear el evento de valoracion
                                 * Array: Folders => nombre de los folders base
                                 * folderClienteId => variable que indica el id del folder del cliente
                                 */

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
                                    if (numFolder <= 7) {
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
                            if (urlSkinRemote.slice(0, 4) == "http" && urlSkinLocal == 'null') {
                                var idPDFSkin = createURLSkin(folderClienteId, urlSkinRemote, clienteIdText);
                                var filePDFSkin = file.load({ id: idPDFSkin });
                                var filePDFSkinURL = filePDFSkin.url;
                                cliente.setValue({ fieldId: 'custentity391', value: filePDFSkinURL });
                                cliente.save({ enableSourcing: true, ignoreMandatoryFields: true });
                                log.debug('id Folder creado y su URL NS', idPDFSkin + ' ' + filePDFSkinURL);
                            } else {
                                log.debug('URL Skin no existe');
                            }
                        }
                    }
                }
            }
            var scriptObj = runtime.getCurrentScript();
            log.debug('Units', "Remaining governance units: " + scriptObj.getRemainingUsage());
        }


        /**
         * En esta sección se colocan las funciones auxiliares del proceso de creación de carpetas y archivos
         *
         */

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