  /**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

  define(['N/record', 'N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format', 'N/https', 'N/url', 'N/xml', 'N/render', 'N/runtime'],

    function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {

      function doGet(params) {

      }

      function doPost(params) {
        log.debug("params",params);
        var objJson = JSON.parse(params);
        var param_idEmpleado = objJson.idEmpleado;
        var param_recipientEmail = objJson.recipientEmail;
        var param_subject = objJson.subject;
        var param_bodyMail = objJson.bodyMail;
        var param_idCustomer = objJson.idCustomer;

        try {
          email.send({
            author: param_idEmpleado, //1133783,
            recipients: param_recipientEmail,
            subject: param_subject,
            body: param_bodyMail,
            relatedRecords: {
              entityId: param_idCustomer,
            }
          });
          log.debug("Send Mail", "Send Mail to: " + param_recipientEmail);

          return {
            "sendMailTo": param_recipientEmail
          }
        } catch (error) {
          log.debug(
            "Send Mail Erro",
            "Send Mail to: " + param_recipientEmail + " Error: " + error
          );
        }


      }

      return {
        get: doGet,
        post: doPost
      }

    });