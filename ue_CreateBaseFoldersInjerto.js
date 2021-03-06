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

        }

        function beforeSubmit(context) {

        }

        /**
         * 
         * @param {*} context // Contexto actual de trabajo
         */
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

                            // Busqueda el nombre del folder de la sucursal
                            search.create({
                                type: search.Type.FOLDER,
                                filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: [sucursalText + "_HAIR"] })],
                                columns: ['internalid']
                            }).run().each(function (result) {
                                folderSucId = result.getValue({ name: 'internalid' });
                            });
                            log.debug('Folder Sucursal', folderSucId);

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

                                if (folderCliId != null) {
                                    try {
                                        var injertoFolders = ['1 Proc', '2 Proc', '3 Proc'];
                                        var injertoBeforeAfter = ['Diseño Sala', 'Fotos Despues Procedimiento'];

                                        var createFolderBaseInjerto = record.create({
                                            type: record.Type.FOLDER,
                                            isDynamic: true
                                        });
                                        createFolderBaseInjerto.setValue({
                                            fieldId: 'parent',
                                            value: folderCliId
                                        });
                                        createFolderBaseInjerto.setValue({
                                            fieldId: 'name',
                                            value: "INJERTO"
                                        });
                                        var folderInjertoBase = createFolderBaseInjerto.save({
                                            enableSourcing: true,
                                            ignoreMandatoryFields: true
                                        });

                                        createDefaultFile(folderInjertoBase);

                                        log.debug('Carpeta Injerto creada', folderInjertoBase);


                                        for (numFolder in injertoFolders) {
                                            var createFoldersInjerto = record.create({
                                                type: record.Type.FOLDER,
                                                isDynamic: true
                                            });
                                            createFoldersInjerto.setValue({
                                                fieldId: 'parent',
                                                value: folderInjertoBase
                                            });
                                            createFoldersInjerto.setValue({
                                                fieldId: 'name',
                                                value: injertoFolders[numFolder]
                                            });
                                            var foldersInjertoId = createFoldersInjerto.save({
                                                enableSourcing: true,
                                                ignoreMandatoryFields: true
                                            });

                                            createDefaultFile(foldersInjertoId);

                                            for (numFolder in injertoBeforeAfter) {
                                                var createFoldersBeforeAfter = record.create({
                                                    type: record.Type.FOLDER,
                                                    isDynamic: true
                                                });
                                                createFoldersBeforeAfter.setValue({
                                                    fieldId: 'parent',
                                                    value: foldersInjertoId
                                                });
                                                createFoldersBeforeAfter.setValue({
                                                    fieldId: 'name',
                                                    value: injertoBeforeAfter[numFolder]
                                                });
                                                var folderInjertoBeforeAfterId = createFoldersBeforeAfter.save({
                                                    enableSourcing: true,
                                                    ignoreMandatoryFields: true
                                                });

                                                createDefaultFile(folderInjertoBeforeAfterId);
                                            }
                                        }
                                        log.debug('Folder Injerto Creado', clienteIdText);
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

        return {
            //beforeLoad: beforeLoad, //carga la funcion beforeLoad que se usa antes de que la pagina sea cargada
            //beforeSubmit: beforeSubmit, // carga la funcion beforeSubmit se usa después de que el registro sea enviado
            afterSubmit: afterSubmit // carga la funcion afterSubmit se usa antes de que el registro sea enviado
        };
    });