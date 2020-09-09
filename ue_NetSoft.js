	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
	define(['N/redirect'],
	function(redirect) {
      function beforeLoad(context) {
        if(context.type == "edit")
        {
          context.form.addButton({id: 'custpage_test1', label: 'Boton V2', functionName: 'function1()'});
          context.form.clientScriptField = '1977016';
          // logging for test
			log.debug("title", "function beforeLoad(context)");
        	//context.newRecord.setValue({fieldId: 'comments', value: 'test nota'});
        	var fieldNota = context.form.getField({id: 'comments'});
        	log.debug("before load edit", "context.form.getField({id: 'comments'});" + fieldNota);
        	var newField = context.form.addField({id: 'custpage_newfield', label: 'NEW FIELD TEST', type: 'text'});
        	newField.defaultValue = "default value test";
        	//fieldNota.updateDisplayType({displayType: 'disabled'});
        }
			//The page will redirect to Suitelet on After Submit function and pass the parameter/s to it
			/*redirect.toSuitelet({
				scriptId: 'customscript913' ,
				deploymentId: 'customdeploy1',
				parameters: {
					'recordId':'1273'
				}
			});*/
		}

        function beforeSubmit(context) {
			if(context.type == "edit")
            {
               // logging for test
              log.debug("title", "function beforeSubmit(context)");
              //context.newRecord.setValue({fieldId: 'comments', value: 'test nota'});

              var getDefaultVal = context.newRecord.getValue({fieldId: 'custpage_newfield'});
              log.debug("var getDefaultVal ", getDefaultVal);
        	  var getVal = context.newRecord.getValue({fieldId: 'comments'});
              if(getVal == "1")
				throw "¡(beforeSubmit edit) El valor de nota no puede ser 1!";
              /*else
                throw "¡(beforeSubmit edit) El valor de nota es: " + getVal + "!";*/
            }
		}

		function afterSubmit(context) {
			// logging for test
			log.debug("title", "function afterSubmit(context)");
            var getVal = context.newRecord.getValue({fieldId: 'comments'});
            if(getVal == "redirect")
            {
              redirect.toRecord({
                  id: '411945',
                  type: 'employee'
              });
            }
		}

		return {
		afterSubmit: afterSubmit,
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
		};
});