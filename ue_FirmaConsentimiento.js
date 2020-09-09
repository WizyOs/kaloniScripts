/**
  * @NApiVersion 2.x
  * @NScriptType UserEventScript
  * @NModuleScope Public
  */

 define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/redirect'], function (record, file, serverWidget, redirect) {
  var imgURLcliente = null;
  var imgURLMed = null;
  var formbool = false;

  function beforeLoad(context) {
    if (context.type == 'view') {
      var recordCaseId = context.newRecord.id;
      var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
      var customForm = objRecord.getValue({ fieldId: 'customform' });
      var company = objRecord.getValue({ fieldId: 'company' });
      var field_firmaClienteBase64 = objRecord.getValue({ fieldId: 'custevent269' }) || null;
      var field_linkFirmaCliente = objRecord.getValue({ fieldId: 'custevent201' }) || null;
      var field_firmaMedBase64 = objRecord.getValue({ fieldId: 'custevent485' }) || null;
      var field_linkFirmaMed = objRecord.getValue({ fieldId: 'custevent486' }) || null;
      var field_firmaTestigo1Base64 = objRecord.getValue({ fieldId: 'custevent548' }) || null;
      var field_linkFirmaTestigo1 = objRecord.getValue({ fieldId: 'custevent513' }) || null;
      var field_firmaTestigo2Base64 = objRecord.getValue({ fieldId: 'custevent549' }) || null;
      var field_linkFirmaTestigo2 = objRecord.getValue({ fieldId: 'custevent514' }) || null;
      var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });

      log.debug('Debug links', 'Cliente ' + field_linkFirmaCliente + ' Med ' + field_linkFirmaMed + ' t1 ' + field_linkFirmaTestigo1 + ' t2 ' + field_linkFirmaTestigo2);

      if (customForm == "14")//INJERTO
      {
        if (field_firmaClienteBase64 == null || field_firmaMedBase64 == null) {
          context.form.addButton({
            id: "custpage_firmacontrato",
            label: "Firmar Consentimiento",
            functionName: "callSuiteletCons"
          });
          context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaConsentimiento.js";
        }
        formbool = true;
      }

      if (customForm == "151")//COMPLEMENTARIOS
      {
        if (field_firmaClienteBase64 == null || field_firmaMedBase64 == null) {
          context.form.addButton({
            id: "custpage_signcomplementaries",
            label: "Firmar Consentimiento",
            functionName: "callSuiteletConsComps"
          });
          context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaConsentimiento.js";
        }
        formbool = true;
      }

      if (customForm == "148")//Qx/NoQx
      {
        if (field_firmaClienteBase64 == null || field_firmaMedBase64 == null) {
          context.form.addButton({
            id: "custpage_signcomplementaries",
            label: "Firmar Consentimiento",
            functionName: "callSuiteletConsComps"
          });
          context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaConsentimiento.js";
        }
        formbool = true;
      }


      var fol = -4;
      if (formbool == true) {
        //var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
        if ((field_firmaClienteBase64 != null && field_linkFirmaCliente == null) || (field_firmaMedBase64 != null && field_linkFirmaMed == null) || (field_firmaTestigo1Base64 != null && field_linkFirmaTestigo1 == null) || (field_firmaTestigo2Base64 != null && field_linkFirmaTestigo2 == null)) {
          
          if (field_firmaClienteBase64 != null) {
            if (field_linkFirmaCliente == null) {
              var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
              log.debug("img_base64_Clie:", img_base64);
              var fileObj = file.create({ name: field_casenumber + " Firma Consentimiento.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false });
              try {
                var fileId = fileObj.save();
                var fileObjImage = file.load({ id: fileId });
                imgURLcliente = fileObjImage.url;
                log.debug('imgURLcliente:', imgURLcliente);
                objRecord.setValue({ fieldId: 'custevent201', value: imgURLcliente });
              } catch (error) {
                log.error('Error Client', error);
              }
            }
          }

          if (field_firmaMedBase64 != null) {
            if (field_linkFirmaMed == null) {
              var img_base64Med = field_firmaMedBase64.replace("data:image/png;base64,", "");
              log.debug("img_base64_Med:", img_base64Med);
              var fileObjM = file.create({ name: field_casenumber + " Firma ConsentimientoMedico.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64Med, isOnline: false });

                var fileIdM = fileObjM.save();
                var fileObjImageM = file.load({ id: fileIdM });
                imgURLMed = fileObjImageM.url;
                log.debug('imgURLMed:', imgURLMed);
                objRecord.setValue({ fieldId: 'custevent486', value: imgURLMed });

             
            }
          }

          if (field_firmaTestigo1Base64 != null) {
            if (field_linkFirmaTestigo1 == null) {
              var img_base64Testigo1 = field_firmaTestigo1Base64.replace("data:image/png;base64,", "");
              log.debug("img_base64Testigo1:", img_base64Testigo1);
              var fileObjT1 = file.create({ name: field_casenumber + " Firma Testigo1.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64Testigo1, isOnline: false });
              try {
                var fileIdT1 = fileObjT1.save();
                var fileObjImageTestigo1 = file.load({ id: fileIdT1 });
                imgURLTestigo1 = fileObjImageTestigo1.url;
                log.debug('imgURLTest1:', imgURLTestigo1);
                objRecord.setValue({ fieldId: 'custevent513', value: imgURLTestigo1 });
              } catch (error) {
                log.error('Error test1', error);
              }
            }
          }

          if (field_firmaTestigo2Base64 != null) {
            if (field_linkFirmaTestigo2 == null) {
              var img_base64Testigo2 = field_firmaTestigo2Base64.replace("data:image/png;base64,", "");
              log.debug("img_base64Testigo2:", img_base64Testigo2);
              var fileObjT2 = file.create({ name: field_casenumber + " Firma Testigo2.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64Testigo2, isOnline: false });
              try {
                var fileIdT2 = fileObjT2.save();
                var fileObjImageTestigo2 = file.load({ id: fileIdT2 });
                imgURLTestigo2 = fileObjImageTestigo2.url;
                log.debug('imgURLTest2:', imgURLTestigo2);
                objRecord.setValue({ fieldId: 'custevent514', value: imgURLTestigo2 });
              } catch (error) {
                log.error('Error test2', error);
              }
            }
          }


          try {
            objRecord.save({ enableSourcing: true, ignoreMandatoryFields: true });
          } catch (error) {
            log.error(error);
          }

        } else if (field_firmaClienteBase64 != "" && field_linkFirmaCliente == "") {
          field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
          var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
          log.debug("img_base64:", img_base64);
          
          var fileObj = file.create({ name: field_casenumber + " Firma Consentimiento.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false });
          var fileId = fileObj.save();

          var fileObjImage = file.load({ id: fileId });
          imgURLcliente = fileObjImage.url;

          //log.debug('imgURLcliente:', imgURLcliente);
          objRecord.setValue({ fieldId: 'custevent201', value: imgURLcliente });
          objRecord.save({ enableSourcing: true, ignoreMandatoryFields: true });
        }
      }
    }

  }

  return {
    beforeLoad: beforeLoad
  };
});
