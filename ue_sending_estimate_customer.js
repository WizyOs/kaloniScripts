	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/render', 'N/log', 'N/email', 'N/search', 'N/runtime'], function(record, render, log, email, search, runtime) {

   function beforeLoad(context)
   {
   }

	function afterSubmit(context)
    {
       if(context.type == "create")
       {
            log.debug("ue_sending_estimate_customer.js", "Inicio afterSubmit(" + context.type + ")");
			var recordId = context.newRecord.id;
            log.debug("recordId: ", recordId);
            if(recordId != "" && recordId != null)
            {
                var rec = record.load({type: 'estimate', id: recordId, isDynamic: true});
                var customerId = rec.getValue({fieldId: 'entity'});
                log.debug("customerId: ", customerId);
                var subsidiary = rec.getValue({fieldId: 'subsidiary'});
                log.debug("subsidiary: ", subsidiary);
                var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: customerId, columns: ['email']});
                var mail = fieldLookUp['email'];
                log.debug("mail: ", mail);

                if((subsidiary == "6" || subsidiary == "19") && mail != "" && mail != null)
                {
                  //var jsonObj = {title: "test title"}
                  var renderer = render.create();
                  renderer.setTemplateByScriptId('CUSTTMPL_3559763_5');
                  //renderer.addCustomDataSource({format: render.DataSource.OBJECT, alias: "JSON", data: jsonObj});
                  renderer.addRecord('record', record.load({type: 'estimate', id: recordId}));
                  var txtPDF = renderer.renderAsPdf();
                  var userObj = runtime.getCurrentUser();
                  log.debug('current user: ', userObj);
                  if(subsidiary == "6" && userObj.id != null && userObj.id != "")
                  {
                    // author:198528
                    email.send({author:userObj.id, recipients:[mail], subject:"Estimación PDF", body:"Tienes una nueva estimación", attachments: [txtPDF]});
                  	log.debug("mail sent: ", "ok");
                  }
                  else if(subsidiary == "19" && userObj.id != null && userObj.id != "")
                  {
                    // author:1133783
                    email.send({author:userObj.id, recipients:[mail], subject:"Estimación PDF", body:"Tienes una nueva estimación", attachments: [txtPDF]});
                    log.debug("mail sent: ", "ok");
                  }
                }
            }
         	log.debug("ue_sending_estimate_customer.js", "Fin afterSubmit(" + context.type + ")");
       }
	}

    return {
       beforeLoad: beforeLoad,
       afterSubmit: afterSubmit
	};
});
