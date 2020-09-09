	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
define(['N/record', 'N/url', 'N/https', 'N/redirect'], function(record,url,https,redirect) {

    function afterSubmit(context)
  	{
        var currentRecord = context.newRecord;
        var prefijo = currentRecord.getValue({fieldId: 'custevent70'});

        // Condition that will run the codes only on Creation.
        if((prefijo == "12") && (context.type == 'create'))
        {
          	var companyId = currentRecord.getValue({fieldId: 'company'});
            var cliente = record.load({type: 'customer', id: companyId});
            /*var subsidiary = cliente.getValue({fieldId: 'subsidiary'});
            if(subsidiary == "6"){}*/
            var numExpediente = cliente.getValue({fieldId: 'entityid'});
            log.error('NewEvent: ','NewEventId: ' + currentRecord.id + ', cliente: ' + companyId + ', numExpediente: ' + numExpediente);

			//The page will redirect to Suitelet on After Submit function and pass the parameter/s to it
			redirect.toSuitelet({
				scriptId: 'customscript_cliente_pdf' ,
				deploymentId: 'customdeploy_cliente_pdf',
				parameters: {
					'id':companyId
				}
			});
          	redirect.toRecord({
                type : record.Type.CUSTOMER,
                id : companyId
                //parameters: {'custparam_test':'helloWorld'}
            });

            /*var suiteletURL = url.resolveScript({scriptId: 'customscript_cliente_pdf', deploymentId: 'customdeploy_cliente_pdf', returnExternalUrl: true});
            suiteletURL += '&id=' + companyId;
            var parameters = 'id=' + companyId;
            log.debug('suiteletURL: ', suiteletURL);*/
          
			/*URL of Restlet
            var suiteletURL = "https://3559763.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=425&deploy=1&compid=3559763&h=36c5deba202f53d42fc4";

            //Authorization header
            var authorization = "NLAuth nlauth_account=3559763, nlauth_email=acolin@kaloni.com, nlauth_signature=A2018COLIN*##, nlauth_role=1092";

            //Create the request headers
            var headers = new Array();
            headers['Content-Type'] = 'application/json';
            headers['Authorization'] = authorization;
            headers['User-Agent-x'] = 'SuiteScript Call';

            //format the data to be submitted; for this instance I used JSON
            var parameters = '{"id":"' + companyId + '"}';

			var response = https.post({url : suiteletURL, headers : headers, body : parameters});
            log.debug('Response: ', response.body.toString());*/
        }
    }

    return {
        afterSubmit: afterSubmit
    }
});