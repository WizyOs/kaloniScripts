/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/

	define(['N/record', 'N/log', 'N/redirect'], function(record,log,redirect) {


       function beforeLoad(context) {

       }

        function beforeSubmit(context) {

		}

		function afterSubmit(context) {
           if(context.type == "create")
           {
    			// logging for test
                log.debug("title", "function afterSubmit(context)");
                var recordId = context.newRecord.id;
                log.debug("recordId: ", recordId);

                redirect.toSuitelet({scriptId: 'customscript1197', deploymentId: 'customdeploy1', parameters:{'recordId':recordId}});
           }
		}

		return {
          beforeLoad: beforeLoad,
          beforeSubmit: beforeSubmit,
          afterSubmit: afterSubmit
		};
});



/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
/*
	define(['N/record', 'N/log'], function(record,log) {


       function beforeLoad(context) {
         if(context.type == "view")
         {
            var recordCaseId = context.newRecord.id;
            var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId});
            var customForm = objRecord.getValue({fieldId: 'customform'});
            log.debug('customForm: ', customForm);
            var customFormText = objRecord.getText({fieldId: 'customform'});
            log.debug('customFormText: ', customFormText);

            var val_indexOf = customFormText.indexOf("Hist");
            log.debug('val_indexOf: ', val_indexOf);
            var company = objRecord.getValue({fieldId: 'company'});

            var current_custevent332 = objRecord.getValue({fieldId: 'custevent332'}); // EDAD
            var current_custevent332Text = objRecord.getText({fieldId: 'custevent332'}); // EDAD
            var current_custevent634 = objRecord.getValue({fieldId: 'custevent634'}); // SEXO-GENERO
            var current_custevent634Text = objRecord.getText({fieldId: 'custevent634'}); // SEXO-GENERO

           var edad = null;
           var sexoGenero = null;

           if((current_custevent332 == null || current_custevent332 == "") || (current_custevent634 == null || current_custevent634 == ""))
           {
              if(customForm == "134" && val_indexOf >= 0) // Hist Clinica
              {
                var objRecordClient = record.load({type: 'customer', id: company});
                var sexo = objRecordClient.getValue({fieldId: 'custentity_sexo'});
                if(sexo != null && sexo != "")
                   sexoGenero = sexo;
                var anios = objRecordClient.getText({fieldId: 'custentity299'});
                if(anios != null && anios != "")
                   edad = anios;

                if(sexoGenero != null)
                   objRecord.setValue({fieldId: "custevent634", value: sexoGenero});
                if(edad != null)
                  objRecord.setValue({fieldId: "custevent332", value: edad});
                if(edad != null || sexoGenero != null){
                  objRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                  log.debug('edad y sexoGenero: ', edad + ' _ ' + sexoGenero);
                }
              }
           }
           else
           {
             log.debug('EDAD y SEXO-GENERO ya estan llenos: ', current_custevent332Text + ' _ ' + current_custevent634Text);
           }

         }
       }

		return {
        beforeLoad: beforeLoad
		};
});
*/