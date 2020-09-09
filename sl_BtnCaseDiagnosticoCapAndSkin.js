/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record','N/log','N/search','N/xml','N/runtime','N/file','N/format','N/http','N/encode','N/redirect'],

function(record,log,search,xmlMod,runtime,file,format,http,encode,redirect) {

    function onRequest(context) {
      // {formu: 'diagCap'}
      var customerId = context.request.parameters.customerId;
      var formulario = context.request.parameters.formu;
      log.debug('params: ', formulario + ' - ' + customerId);

      if(formulario == "diagSkin")
        formulario = "138";
      if(formulario == "diagCap")
        formulario = "135";

      var params = {'cf':formulario}

 redirect.redirect({
      url: '/app/crm/support/supportcase.nl?default='+ customerId +'&l=T', // '/app/accounting/transactions/salesord.nl?whence=',  /app/crm/support/supportcase.nl?default=108718&l=T&cf=134&whence=
      parameters: params
      });

      //context.response.write(content_txt.toString());
    }

    return {
        onRequest: onRequest
    };

});
