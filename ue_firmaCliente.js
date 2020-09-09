	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
	define(['N/redirect'],
	function(redirect) {
      function beforeLoad(context) {
        /*
        if(context.type == "edit")
        {
          context.form.addButton({id: 'custpage_firmaCliente', label: 'Firmar', functionName: 'firmar()'});
          context.form.clientScriptField = '1977016';
          // logging for test
			    log.debug("title", "function beforeLoad(context)");
        	//context.newRecord.setValue({fieldId: 'comments', value: 'test nota'});
        	var fieldNota = context.form.getField({id: 'comments'});
        	log.debug("before load edit", "context.form.getField({id: 'comments'});" + fieldNota);
        	var newField = context.form.addField({id: 'custpage_newfield', label: 'NEW FIELD TEST', type: 'text'});
        	newField.defaultValue = "default value test";
        	//fieldNota.updateDisplayType({displayType: 'disabled'});
        }*/
			//The page will redirect to Suitelet on After Submit function and pass the parameter/s to it
			/*redirect.toSuitelet({
				scriptId: 'customscript_suitlet5027' ,
				deploymentId: 'customdeploy1',
				parameters: {
					'recordId':'1273'
				}
			});*/
		}

		return {
        beforeLoad: beforeLoad
		};
});