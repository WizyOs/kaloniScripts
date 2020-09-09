/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/log','N/search','N/file','N/redirect'],

function(record,log,search,file,redirect){

    function onRequest(context){
      try
      {
        var requestparam = context.request.parameters;

        log.debug('Parameter: Record ID: ', requestparam.recordId);

        if(requestparam.recordId != null && requestparam.recordId != "" && requestparam.recordId.length > 1)
        {
            var objRecord = record.load({type: 'SUPPORTCASE', id: requestparam.recordId});
            var customForm = objRecord.getValue({fieldId: 'customform'});
            log.debug('customForm: ', customForm);
            var customFormText = objRecord.getText({fieldId: 'customform'});
            log.debug('customFormText: ', customFormText);
            var val_indexOf = customFormText.indexOf("Hist");
            log.debug('val_indexOf: ', val_indexOf);

            var company = objRecord.getText({fieldId: 'company'});
            var current_custevent331 = objRecord.getValue({fieldId: 'custevent331'}); // FECHA DE NACIMIENTO
            var current_custevent331Text = objRecord.getText({fieldId: 'custevent331'}); // FECHA DE NACIMIENTO
            var current_custevent332 = objRecord.getValue({fieldId: 'custevent332'}); // EDAD
            var current_custevent332Text = objRecord.getText({fieldId: 'custevent332'}); // EDAD
            var current_custevent634 = objRecord.getValue({fieldId: 'custevent634'}); // SEXO-GENERO
            var current_custevent634Text = objRecord.getText({fieldId: 'custevent634'}); // SEXO-GENERO
            var current_custevent206 = objRecord.getValue({fieldId: 'custevent206'}); // ESTADO CIVIL
            var current_custevent206Text = objRecord.getText({fieldId: 'custevent206'}); // ESTADO CIVIL
            var current_custevent207 = objRecord.getValue({fieldId: 'custevent207'}); // OCUPACIÓN
            var current_custevent207Text = objRecord.getText({fieldId: 'custevent207'}); // OCUPACIÓN

           var fechaNacimiento = null;
           var edad = null;
           var sexoGenero = null;
           var estadoCivil = null;
           var ocupacion = null;

           if((current_custevent331 == null || current_custevent331 == "") || (current_custevent332 == null || current_custevent332 == "") || (current_custevent634 == null || current_custevent634 == "") || (current_custevent206 == null || current_custevent206 == "") || (current_custevent207 == null || current_custevent207 == ""))
           {
              var casosConHist = 0;
              if(customForm != "134" && val_indexOf == -1) // Hist Clinica
              {
                  var boolValue = false;
                  search.create({
                           type: 'SUPPORTCASE',
                           filters: [search.createFilter({name: 'company', operator: search.Operator.IS, values: [company]})],
                           columns: ['internalid', 'company', 'title']
                    }).run().each(function(result){
                           var internalid = result.getValue({name: 'internalid'});
                           var company = result.getText({name: 'company'});
                           var title = result.getValue({name: 'title'});
                           log.debug('Values internalid _ company _ title: ', internalid + " _ " + company + " _ " + title);
                           var val_indexOf2 = title.indexOf("Hist");
                           if(val_indexOf2 >= 0)
                           {
                             casosConHist++;
                             var objRecordCase = record.load({type: 'SUPPORTCASE', id: internalid, isDynamic: true});
                             var custevent331 = objRecordCase.getValue({fieldId: 'custevent331'}); // FECHA DE NACIMIENTO
                             var custevent332 = objRecordCase.getValue({fieldId: 'custevent332'}); // EDAD
                             var custevent634 = objRecordCase.getValue({fieldId: 'custevent634'}); // SEXO-GENERO
                             var custevent206 = objRecordCase.getValue({fieldId: 'custevent206'}); // ESTADO CIVIL
                             var custevent207 = objRecordCase.getValue({fieldId: 'custevent207'}); // OCUPACIÓN

                             if((custevent331 != null || custevent331 != "" || custevent332 != null || custevent332 != "" || custevent634 != null || custevent634 != "" || custevent206 != null || custevent206 != "" || custevent207 != null || custevent207 != "") && boolValue == false)
                             {
                                fechaNacimiento = custevent331;
                                edad = custevent332;
                                sexoGenero = custevent634;
                                estadoCivil = custevent206;
                                ocupacion = custevent207;
                                boolValue = true;
                             }
                           }
                          return true;
                    });
              }
              else{
                log.debug('Formulario: ', 'Este caso es del formulario Hist Clinica');
              }
              log.debug('casos con Hist value: ', casosConHist);
           }
           else
           {
             log.debug('FECHA DE NACIMIENTO, EDAD, SEXO-GENERO, ESTADO CIVIL y OCUPACIÓN ya estan llenos: ', current_custevent331Text + ' _ ' + current_custevent332Text + ' _ ' + current_custevent634Text + ' _ ' + current_custevent206Text + ' _ ' + current_custevent207Text);
           }

            if(fechaNacimiento != null)
               objRecord.setValue({fieldId: "custevent331", value: fechaNacimiento});
            if(edad != null)
              objRecord.setValue({fieldId: "custevent332", value: edad});
            if(sexoGenero != null)
              objRecord.setValue({fieldId: "custevent634", value: sexoGenero});
            if(estadoCivil != null)
              objRecord.setValue({fieldId: "custevent206", value: estadoCivil});
            if(ocupacion != null)
              objRecord.setValue({fieldId: "custevent207", value: ocupacion});

            if(fechaNacimiento != null || edad != null || sexoGenero != null || estadoCivil != null || ocupacion != null)
               objRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
        }

        redirect.toRecord({id: requestparam.recordId, type: 'SUPPORTCASE'});
      }catch(e1){
        log.debug('Exception: ', e1);
      }
    }

    return {
        onRequest: onRequest
    };

});
