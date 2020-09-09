/**
  * @NApiVersion 2.x
  * @NScriptType UserEventScript
  * @NModuleScope Public
  */

define(['N/record', 'N/file', 'N/ui/serverWidget', 'N/redirect'], function (record, file, serverWidget, redirect) {
  var exports = {};
  var imgURLcliente = null;
  function beforeLoad(context) {
    if (context.type == 'view') {
      var recordCaseId = context.newRecord.id;
      var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
      var chekFirmaB64 = context.newRecord.getValue({ fieldId: 'custevent269' });
      var checkFirmar = objRecord.getValue({ fieldId: 'custevent268' });
      var company = objRecord.getText({ fieldId: 'company' });
      var IDClient = objRecord.getValue({ fieldId: 'company' });
      var startdate = objRecord.getText({ fieldId: 'startdate' });
      var edad = objRecord.getText({ fieldId: 'custevent283' });
      var hg = company.substring(0, 2);
      log.debug("HGID:", hg);
      if (hg == 'HG') {
        var mergeRecord = record.load({
          type: 'customer',
          id: IDClient,
          isDynamic: true
        });
        var age = mergeRecord.getValue({
          fieldId: "custentity149"
        });
        log.debug("Edad:", age);
        var pais = mergeRecord.getValue({
          fieldId: "subsidiary"
        });
        log.debug("Pais:", pais);
      }

      var customForm = objRecord.getValue({ fieldId: 'customform' });
      var field_firmaClienteBase64 = context.newRecord.getValue({ fieldId: 'custevent269' });
      var field_linkFirmaCliente = context.newRecord.getValue({ fieldId: 'custevent201' });
      var field_firmaMedBase64 = context.newRecord.getValue({ fieldId: 'custevent485' });
      var field_linkFirmaMed = context.newRecord.getValue({ fieldId: 'custevent486' });
      var field_firmaTestigo1Base64 = context.newRecord.getValue({ fieldId: 'custevent548'});
      var field_linkFirmaTestigo1 = context.newRecord.getValue({ fieldId: 'custevent513'});
      var field_firmaTestigo2Base64 = context.newRecord.getValue({ fieldId: 'custevent549'});
      var field_linkFirmaTestigo2 = context.newRecord.getValue({ fieldId: 'custevent514'});

      /*if (customForm == "14")//F-Atención Cliente - Injerto
      {
        if ((field_firmaClienteBase64 == "" && field_linkFirmaCliente == "") || (field_firmaMedBase64 == "" && field_linkFirmaMed == "") || (field_firmaTestigo1Base64 == "" && field_linkFirmaTestigo1 == "") || (field_firmaTestigo2Base64 == "" && field_linkFirmaTestigo2 == "")) {
          context.form.addButton({
            id: "custpageConsentimiento",
            label: "Consentimiento",
            functionName: "callSuiteletConPDF"
          });
          context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaConsent.js";
        }
      }*/

      /* context.form.addButton({
            type: 'SUPPORTCASE',
           id: "custpage_123",
           label: "Firma Consentimiento",
           functionName: "onButtonClick"
      });*/
      /* if(chekFirmaB64!=""){
         objRecord.setValue({
           fieldId: "custevent268",
           value: false
       });
        objRecord.save({
          enableSourcing: true,
         ignoreMandatoryFields: false
       });
       }*/

      if (checkFirmar) {
        var firmaconsenti = objRecord.getValue({ fieldId: 'custevent201' });

        if (firmaconsenti == "") {
          var suitletURL = redirect.toSuitelet({
            scriptId: 'customscript1010',
            deploymentId: 'customdeploy1',
            parameters: {
              'recordCaseId': recordCaseId,
              'company': company,
              'startdate': startdate,
              'age': age,
              'subsidiary': pais
            }
          });
        } else {
          var currentForm = context.form;
          var html = '<script>';
          html += 'require([\'N/ui/message\'], function (message){';
          html += 'var onViewMessage = message.create({';
          html += 'title: \'Firmas de Consentimiento \', ';
          html += 'message: \' La Firma ya Existe!! <br /> Desactiva el check FIRMAR CONSENTIMIENTO. \', ';
          html += 'type: message.Type.INFORMATION';
          html += '}); ';
          html += 'onViewMessage.show(10000);';
          html += '})';
          html += '</script>';

          var field = currentForm.addField({
            id: "custpage",
            label: "PRE-FIRMAS",
            type: serverWidget.FieldType.INLINEHTML,
          });

          field.defaultValue = html;
        }
      }


    }
  }

  function beforeSubmit(context) {
    if (context.type == "edit") {
      var recordCaseId = context.newRecord.id;
      var objRecord = record.load({ type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true });
      var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
      var field_firmaClienteBase64 = context.newRecord.getValue({ fieldId: 'custevent269' });
      //log.debug("beforeSubmit field_firmaClienteBase64:", field_firmaClienteBase64);

      var customForm = objRecord.getValue({ fieldId: 'customform' });
      //var field_firmaClienteBase64 = context.newRecord.getValue({ fieldId: 'custevent269' });
      //var field_linkFirmaCliente = context.newRecord.getValue({ fieldId: 'custevent201' });
      var field_firmaMedBase64 = context.newRecord.getValue({ fieldId: 'custevent485' });
      var field_linkFirmaMed = context.newRecord.getValue({ fieldId: 'custevent486' });
      var field_firmaTestigo1Base64 = context.newRecord.getValue({ fieldId: 'custevent548'});
      var field_linkFirmaTestigo1 = context.newRecord.getValue({ fieldId: 'custevent513'});
      var field_firmaTestigo2Base64 = context.newRecord.getValue({ fieldId: 'custevent549'});
      var field_linkFirmaTestigo2 = context.newRecord.getValue({ fieldId: 'custevent514'});

      var field_linkFirmaCliente = context.newRecord.getValue({ fieldId: 'custevent201' });
      //log.debug("beforeSubmit field_linkFirmaCliente:", field_linkFirmaCliente);

      /*     if(field_firmaClienteBase64 != "" && field_linkFirmaCliente == "")
          {
              var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
             //log.debug("beforeSubmit img_base64:", img_base64);
      
             var fol = -4;
             var fileObj = file.create({name: field_casenumber + " Firma consent.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false});
             var fileId = fileObj.save();
      
             var fileObjImage = file.load({id:fileId});
             imgURLcliente = fileObjImage.url;
      
             log.debug('beforeSubmit imgURLcliente:', imgURLcliente);
           scriptContext.newRecord.setValue({fieldId: 'custevent201', value: imgURLcliente});
          } */

      if (field_firmaClienteBase64 != "" && field_linkFirmaCliente == "" && field_firmaMedBase64 != "" && field_linkFirmaMed == "" && field_firmaTestigo1Base64 != "" && field_linkFirmaTestigo1 == "" && field_firmaTestigo2Base64 != "" && field_linkFirmaTestigo2 == "") {
        var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
        var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
        log.debug("img_base64:", img_base64);
        var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
        var img_base64Med = field_firmaMedBase64.replace("data:image/png;base64,", "");
        log.debug("img_base64CLIE:", img_base64Med);
        var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
        var img_base64Testigo1 = field_firmaTestigo1Base64.replace("data:image/png;base64,", "");
        log.debug("img_base64Testigo1:", img_base64Testigo1);
        var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
        var img_base64Testigo2 = field_firmaTestigo2Base64.replace("data:image/png;base64,", "");
        log.debug("img_base64Testigo2:", img_base64Testigo2);

        var fol = -4;
        var fileObj = file.create({ name: field_casenumber + " Firma Consentimiento.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false });
        var fileId = fileObj.save();
        var folM = -4;
        var fileObjM = file.create({ name: field_casenumber + " Firma ConsentimientoMedico.png", fileType: "PNGIMAGE", folder: folM, contents: img_base64Med, isOnline: false });
        var fileIdM = fileObjM.save();
        var folT1 = -4;
        var fileObjT1 = file.create({ name: field_casenumber + " Firma Testigo1.png", fileType: "PNGIMAGE", folder: folT1, contents: img_base64Testigo1, isOnline: false });
        var fileIdT1 = fileObjT1.save();
        var folT2 = -4;
        var fileObjT2 = file.create({ name: field_casenumber + " Firma Testigo2.png", fileType: "PNGIMAGE", folder: folT2, contents: img_base64Testigo2, isOnline: false });
        var fileIdT2 = fileObjT2.save();

        var fileObjImage = file.load({ id: fileId });
        imgURLcliente = fileObjImage.url;
        var fileObjImageM = file.load({ id: fileIdM });
        imgURLMed = fileObjImageM.url;
        var fileObjImageTestigo1 = file.load({ id: fileIdT1 });
        imgURLTestigo1 = fileObjImageTestigo1.url;
        var fileObjImageTestigo2 = file.load({ id: fileIdT2 });
        imgURLTestigo2 = fileObjImageTestigo2.url;

        log.debug('imgURLcliente:', imgURLcliente);
        objRecord.setValue({ fieldId: 'custevent201', value: imgURLcliente });
        log.debug('imgURLMed:', imgURLMed);
        objRecord.setValue({ fieldId: 'custevent486', value: imgURLMed });
        log.debug('imgURLMed:', imgURLTestigo1);
        objRecord.setValue({ fieldId: 'custevent513', value: imgURLTestigo1 });
        log.debug('imgURLMed:', imgURLTestigo2);
        objRecord.setValue({ fieldId: 'custevent514', value: imgURLTestigo2 });
        objRecord.save({ enableSourcing: true, ignoreMandatoryFields: true });

      } else if (field_firmaClienteBase64 != "" && field_linkFirmaCliente == "") {
/*         var field_casenumber = context.newRecord.getValue({ fieldId: 'casenumber' });
        var img_base64 = field_firmaClienteBase64.replace("data:image/png;base64,", "");
        log.debug("img_base64:", img_base64);


        var fol = -4; */
       // var fileObj = file.create({ name: field_casenumber + " Firma Consentimiento.png", fileType: "PNGIMAGE", folder: fol, contents: img_base64, isOnline: false });
       // var fileId = fileObj.save();

        //var fileObjImage = file.load({ id: fileId });
        //imgURLcliente = fileObjImage.url;

        //log.debug('imgURLcliente:', imgURLcliente);
        //objRecord.setValue({ fieldId: 'custevent201', value: imgURLcliente });
        //objRecord.save({ enableSourcing: true, ignoreMandatoryFields: false });
      }
    }
  }

  //       exports.beforeLoad = beforeLoad,
  //     exports.beforeSubmit: beforeSubmit
  //   return exports;
  return {
    beforeSubmit: beforeSubmit
  };
});
