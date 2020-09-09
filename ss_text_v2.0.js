/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */
define(['N/search', 'N/record', 'N/email', 'N/runtime', 'N/file'],
    function(search, record, email, runtime, file) {
        function execute(context) {
            if (context.type !== context.InvocationType.ON_DEMAND)
                return;
            
            try {
                
                search.load({
                    id: 'customsearch7080'
                }).run().each(function(result) {

                    internalid = result.getValue({ name: 'internalid' });
                    name = result.getValue({ name: 'name' });
                    nameEndLimit = name.indexOf('_');
                    customerId = name.slice(0, nameEndLimit);

                    clientRecord = record.load({ type: 'customer', id: customerId, isDynamic: false });
                    clientText = clientRecord.getText({ fieldId: 'entityid' });

                    search.create({
                        type: search.Type.FOLDER,
                        filters: [{ name: 'internalid', operator: search.Operator.IS, values: [ clientText + '_FOLDER'] }],
                        columns: [{ name: 'internalid'}]
                    }).run().each( function (result) {
                        folderId = result.getValue('internalid');
                    });

                    var imageFileId = file.load({ id: internalid });
                    imageFileId.parent = folderId;
                    imageFileId.save();

                    return true;
                });
            } catch (e) {

                var subject = 'Fatal Error: Unable to transform salesorder to item fulfillment!';
                var authorId = -5;
                var recipientEmail = 'notify@company.com';
                email.send({
                    author: authorId,
                    recipients: recipientEmail,
                    subject: subject,
                    body: 'Fatal error occurred in script: ' + runtime.getCurrentScript().id + '\n\n' + JSON.stringify(e)
                });
            }
        }

        return {
            execute: execute
        };
    });