/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/log', 'N/redirect'],

  function (record, log, redirect) {

    function onRequest(context) {
      var requestparam = context.request.parameters;
      log.debug({ title: 'Parameter: Record ID', details: requestparam.recordId });
      log.debug({ title: 'Parameter: Comp ID', details: requestparam.compid });
      try {

        // {'recordId':recordId}

        if (requestparam.recordId != null && requestparam.recordId != "" && requestparam.recordId.length > 1) {
          var objRecord = record.load({ type: 'SUPPORTCASE', id: requestparam.recordId, isDynamic: true });
          var customForm = objRecord.getValue({ fieldId: 'customform' });
          log.debug('customForm: ', customForm);
          var customFormText = objRecord.getText({ fieldId: 'customform' });
          log.debug('customFormText: ', customFormText);

          var val_indexOf = "";
          try {
            var val_indexOf = customFormText.indexOf("Hist");
            log.debug('val_indexOf: ', val_indexOf);
          } catch (e) {
            log.debug('Exception: ', e);
          }

          var company = objRecord.getValue({ fieldId: 'company' });
          log.debug('company: ', company);
          var current_custevent332 = objRecord.getValue({ fieldId: 'custevent332' }); // EDAD
          log.debug('EDAD current_custevent332: ', current_custevent332);
          var current_custevent332Text = objRecord.getText({ fieldId: 'custevent332' }); // EDAD
          log.debug('EDAD current_custevent332Text: ', current_custevent332Text);
          var current_custevent634 = objRecord.getValue({ fieldId: 'custevent634' }); // SEXO-GENERO
          log.debug('SEXO-GENERO current_custevent634: ', current_custevent634);
          var current_custevent634Text = objRecord.getText({ fieldId: 'custevent634' }); // SEXO-GENERO
          log.debug('SEXO-GENERO current_custevent634Text: ', current_custevent634Text);

          //return false;

          var edad = null;
          var sexoGenero = null;

          if ((current_custevent332 == null || current_custevent332 == "") || (current_custevent634 == null || current_custevent634 == "")) {
            if (customForm == "134" && val_indexOf >= 0) // Hist Clinica
            {
              var objRecordClient = record.load({ type: 'customer', id: company });
              var sexo = objRecordClient.getValue({ fieldId: 'custentity_sexo' });
              if (sexo != null && sexo != "")
                sexoGenero = sexo;
              var anios = objRecordClient.getText({ fieldId: 'custentity299' });
              if (anios != null && anios != "")
                edad = anios;

              if (sexoGenero != null)
                objRecord.setValue({ fieldId: "custevent634", value: sexoGenero });
              if (edad != null)
                objRecord.setValue({ fieldId: "custevent332", value: edad });

              // FECHA DE NACIMIENTO: 23/10/2017

              if (edad != null || sexoGenero != null) {
                objRecord.save({ enableSourcing: false, ignoreMandatoryFields: true });
                log.debug('edad y sexoGenero: ', edad + ' _ ' + sexoGenero);
              }
            }
          }
          else {
            log.debug('EDAD y SEXO-GENERO ya estan llenos: ', current_custevent332Text + ' _ ' + current_custevent634Text);
          }
        }

        //redirect.toRecord({id: requestparam.recordId, type: 'SUPPORTCASE'});
        redirect.toSuitelet({ scriptId: 'customscript1198', deploymentId: 'customdeploy1', parameters: { 'recordId': requestparam.recordId } });
      } catch (e1) {
        log.debug('Exception: ', e1);
      }

      /* var objRecord = record.load({type: record.Type.PURCHASE_ORDER, id: requestparam.recordId, isDynamic: true});
         objRecord.setValue({fieldId: 'memo',  value: 'Sample Comment', ignoreFieldChange: true});
         objRecord.save();*/
    }

    return {
      onRequest: onRequest
    };

  });
