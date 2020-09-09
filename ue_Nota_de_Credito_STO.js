	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
    define(['N/record', 'N/file', 'N/log'], function(record, file, log) {

        function beforeLoad(context)
        {
          if(context.type == "view") // create
          {
             var record_creditMemo = context.newRecord.id;
             var objRecord = record.load({type: 'creditmemo', id: record_creditMemo, isDynamic: true});
             var ncf = objRecord.getText({fieldId: 'custbody156'}); // NCF:
             var ncf_modificado = objRecord.getValue({fieldId: 'custbody157'}); // NCF MODIFICADO:
             var rnc_cliente = objRecord.getValue({fieldId: 'custbody158'}); // RNC CLIENTE:
             var nombre_o_RZ_cliente = objRecord.getValue({fieldId: 'custbody160'}); // NOMBRE O RAZÓN SOCIAL CLIENTE:
             var pdf_nc = objRecord.getValue({fieldId: 'custbody159'}); // PDF NC (STO DO):
             var pdf_nc_encrypted = objRecord.getValue({fieldId: 'custbody161'}); // PDF NC ENCRYPTED (STO DO):
            
            log.debug("record_creditMemo: ", record_creditMemo);
            log.debug("objRecord: ", objRecord);
            log.debug("ncf: ", ncf);
            log.debug("ncf_modificado: ", ncf_modificado);
            log.debug("rnc_cliente: ", rnc_cliente);
            log.debug("nombre_o_RZ_cliente: ", nombre_o_RZ_cliente);
            log.debug("pdf_nc: ", pdf_nc);
            log.debug("pdf_nc_encrypted: ", pdf_nc_encrypted);
            context.form.addButton({id: "custpage_nc_sto_do", label: "Nota Crédito STO DO", functionName: "onButtonClick_ncSTO"});
            context.form.clientScriptModulePath = "SuiteScripts/cs_Nota_de_Credito_STO.js";
             if((ncf == "" || ncf == null) && (pdf_nc == "" || pdf_nc == null) && pdf_nc.indexOf(".pdf") == -1 && (pdf_nc_encrypted == "" || pdf_nc_encrypted == null))
             {
               if(ncf_modificado != "" && ncf_modificado != null && rnc_cliente != "" && rnc_cliente != null && nombre_o_RZ_cliente != "" && nombre_o_RZ_cliente != null){
                  context.form.addButton({id: "custpage_nc_sto_do", label: "Nota Crédito STO DO", functionName: "onButtonClick_ncSTO"});
                    context.form.clientScriptModulePath = "SuiteScripts/cs_Nota_de_Credito_STO.js";
               }
             }
             else
             {
                log.debug("Log: ", "Ya se generó la Nota de Crédito");
                log.debug("pdf_nc: ", pdf_nc);
                log.debug("Base64: ", pdf_nc_encrypted);
             }
     
                /*var okVal = firmaEmpBase64.substring(0, 7);
                if(okVal != "ok_data")
                {
                   // crear imagen paciente
                   var pngFirmaEmp_base64 = firmaEmpBase64.replace("data:image/png;base64,", "");
                   var fol = 1535412;
                   var fileObj = file.create({name: record_creditMemo + "_" + text_entityid + "_Firma Electrónica Empleado.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaEmp_base64, isOnline: false});
                   var pngFirmaEmp_fileId = fileObj.save();
                   //var pngFirmaCli1_fileObjImage = file.load({id:pngFirmaCli1_fileId});
                   //var pngFirmaCli1URL = pngFirmaCli1_fileObjImage.url;
                   //objRecord.setValue({fieldId: "custevent86", value: pngFirmaCli1URL});
     
                   var firmaEmp_base64_newValBase64 = "ok_" + firmaEmpBase64;
                   objRecord.setValue({fieldId: "custentity396", value: firmaEmp_base64_newValBase64});
                   objRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
                }
                else
                {
                   log.error("Log: ", "Ya se generó la imagen de Firma Electrónica Empleado.png");
                   log.error("firmaEmpBase64: ", firmaEmpBase64);
                }*/
     
          }
          
          if(context.type == "edit")
          {
             var record_creditMemo = context.newRecord.id;
             var objRecord = record.load({type: 'creditmemo', id: record_creditMemo, isDynamic: true});
             var ncf = objRecord.getText({fieldId: 'custbody156'}); // NCF:
             var pdf_nc = objRecord.getValue({fieldId: 'custbody159'}); // PDF NC (STO DO):
             var pdf_nc_encrypted = objRecord.getValue({fieldId: 'custbody161'}); // PDF NC ENCRYPTED (STO DO):
     
             if((ncf != "" && ncf != null) && (pdf_nc != "" && pdf_nc != null) && pdf_nc.indexOf(".pdf") > 0 && (pdf_nc_encrypted != "" && pdf_nc_encrypted != null))
             {
                context.form.getField('custbody157').updateDisplayType({displayType:'disabled'});
                context.form.getField('custbody158').updateDisplayType({displayType:'disabled'});
                context.form.getField('custbody160').updateDisplayType({displayType:'disabled'});
                context.form.getField('custbody159').updateDisplayType({displayType:'disabled'});
             }
          }
          
        }
        return {
           beforeLoad: beforeLoad
        };
     });
     