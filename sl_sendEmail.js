/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/file', 'N/email'],

function(file,email){

    function onRequest(context)
  	{
      var fileId = context.request.parameters.idFile;
      log.debug('fileId', fileId);
      var fileObj = file.load({id: fileId});

      var mail = email.send({
      author: -5, //change to the internal id of the author
      recipients: 'acolin@kaloni.com', //change to the internal id of the recipient
      subject: 'Test Sample Email -- New SO record with file',
      body: 'email body',
      attachments: [fileObj]
      });
      return 'send ok';
    }

    return {
        onRequest: onRequest
    };

});