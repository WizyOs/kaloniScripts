	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/file', 'N/redirect', 'N/log', 'N/url', 'N/email', 'N/search'], function(record, file, redirect, log, url, email, search) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        log.debug("ue_enviar_CFDI_a_clientes.js", "Inicio beforeLoad(context=view)");
        var current_invoiceId = context.newRecord.id;

        var rec = record.load({type: 'invoice', id: current_invoiceId, isDynamic: true}); // Factura CUN-02978
        var idCliente = rec.getValue({fieldId: 'entity'});
        log.debug('idCliente:', idCliente);
      	var custbody_uuid = rec.getValue({fieldId: 'custbody_uuid'});
        log.debug('custbody_uuid:', custbody_uuid);
        var custbody_foliosat = rec.getValue({fieldId: 'custbody_foliosat'});
        log.debug('custbody_foliosat:', custbody_foliosat);
        var custbody_cfdi_pdf = rec.getValue({fieldId: 'custbody_cfdi_pdf'});
        log.debug('custbody_cfdi_pdf:', custbody_cfdi_pdf);
        var custbody_cfdixml = rec.getValue({fieldId: 'custbody_cfdixml'});
        log.debug('custbody_cfdixml:', custbody_cfdixml);

       if(custbody_uuid != "" && custbody_uuid != null && custbody_foliosat != "" && custbody_foliosat != null && custbody_cfdi_pdf != "" && custbody_cfdi_pdf != null && custbody_cfdixml != "" && custbody_cfdixml != null && idCliente != "" && idCliente != null)
       {
          log.debug('Campos CFDI completos: ', 'uuid, foliosat, cfdi_pdf y cfdixml');

		  var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: idCliente, columns: ['subsidiary', 'email']});
          var subsidiary = fieldLookUp['subsidiary'][0].value;
          log.debug("subsidiary: ", subsidiary);
          var mail = fieldLookUp['email'];
          log.debug("mail: ", mail);

          var custbody_refpdf = rec.getValue({fieldId: 'custbody_refpdf'});
          log.debug('custbody_refpdf:', custbody_refpdf);
          var custbody_xml_file = rec.getValue({fieldId: 'custbody_xml_file'});
          log.debug('custbody_xml_file:', custbody_xml_file);
          var envio_Docs_CFDI = rec.getValue({fieldId: 'custbody155'});
          log.debug('envio_Docs_CFDI:', envio_Docs_CFDI);
          if(custbody_refpdf != "" && custbody_refpdf != null && custbody_xml_file != "" && custbody_xml_file != null && mail != "" && mail != null && subsidiary == "6" && envio_Docs_CFDI == false)
          {
             var senderId = 198528;
             var recipientEmail = [mail]; // ['al221211350@gmail.com'] - mail
             var fileObjPDF = file.load({id: custbody_refpdf});
             var fileObjXML = file.load({id: custbody_xml_file});
             email.send({author: senderId, recipients: recipientEmail, subject: 'Documentos CFDI', body: 'Hay documentos CFDI recientes (PDF y XML).', attachments: [fileObjPDF, fileObjXML]});
             rec.setValue({fieldId: "custbody155", value: true});
             rec.save({enableSourcing: false, ignoreMandatoryFields: true});
             log.debug('Status Docs CFDI: ', 'PDF y XML Enviados al cliente.');
          }
       }
        log.debug("ue_enviar_CFDI_a_clientes.js", "Fin beforeLoad(context=view)");
     }
   }

    return {
       beforeLoad: beforeLoad
	};
});
