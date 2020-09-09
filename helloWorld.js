/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */


define(['N/ui/dialog', 'N/https', 'N/record', 'N/currentRecord'],

    function (dialog, https, record, currentRecord) {

        function helloWorld(context) {
            /*var id = context.currentRecord.id;
            var cliente = record.load({ type: 'prospect', id: id});
            var url = cliente.getValue({ fieldId: 'custentity368'});
            var folderCliente = cliente.getText({ field: 'entityid'});
            log.debug('idFolder', folderCliente);*/

/*             search.create({
                type: search.Type.FOLDER,
                filters: [search.createFilter({ name: 'name', operator: search.Operator.IS, values: folderCliente })],
                columns: ['internalid']
            }).run().each(function (result) {
                folderId = result.getValue({ name: 'internalid' });
            });

            log.debug('idFolder', folderId);


            if(url.slice(0,4 == http)){
                var response = https.get({
                    url: url
                });

                var pdfContent = response.body;

                var createURLSkin = file.create({
                    name: idTextoCliente + "_SKIN.pdf",
                    fyleType: file.Type.PDF,
                    contents: pdfContent,
                    folder: folderId
                });
                var fileSkinPDFId = createURLSkin.save();
                log.debug('id', fileSkinPDFId);
                var filePDFSkin = file.load({id: fileSkinPDFId});
                var filePDFSkinURL = filePDFSkin.url;
                //cliente.setValue({ fieldId: 'custentity391', value: filePDFSkinURL});
                //cliente.save({enableSourcing: true, ignoreMandatoryFields: false});
                log.debug('id Folder creado y su URL NS', fileSkinPDFId + ' ' + filePDFSkinURL);
            } */

/*             log.debug({
                title: 'Client Response Body',
                details: response.body
            });

            log.debug('url',url);
            log.debug('respuesta',response);

            var options = {
                title: 'Hello!',
                message: url
            };

            try {

                dialog.alert(options);

                log.debug({
                    title: 'Success',
                    details: 'Alert displayed successfully'
                });

            } catch (e) {

                log.error({
                    title: e.name,
                    details: e.message
                });
            } */
        }

        /*         function helloWorld() {
                    var options = {
                        title: 'Hello!',
                        message: 'Hello, World!'
                    };
                
                    try {
                   
                        dialog.alert(options);
                   
                        log.debug ({
                            title: 'Success',
                            details: 'Alert displayed successfully'
                        });
                
                    } catch (e) {
                   
                        log.error ({ 
                            title: e.name,
                            details: e.message
                        });           
                    } 
                } */



        return {
            pageInit: helloWorld
        };
    })