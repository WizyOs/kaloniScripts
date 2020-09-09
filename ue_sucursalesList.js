/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/ui/serverWidget', 'N/log', 'N/search'], function(record, serverWidget, log, search) {

    function beforeLoad(context)
    {
       if(context.type == "edit")
       {
         log.debug('context type:', context.type);

         try
         {
    		var currentEventId = context.newRecord.id;
            log.debug('currentEventId: ', currentEventId);
            var rec = record.load({type: 'calendarevent', id: currentEventId, isDynamic: true});
            var company = rec.getValue({fieldId: 'company'});
            log.debug('company: ', company);
            if(company != null && company != "")
            {
              context.form.getField('custevent2').updateDisplayType({displayType:'hidden'}); // Ocultar Sucursal

              var objRecord = record.load({type: 'customer', id: company, isDynamic: true});
              var subsidiary_Company = objRecord.getValue({fieldId: 'subsidiary'});
              log.debug('subsidiary_Company: ', subsidiary_Company);

              if(subsidiary_Company != "" && subsidiary_Company != null)
              {
				// \ \ Creates a variable containing the current form
                var currentForm = context.form;
                // serverWidget.FieldType.INLINEHTML
                var selectField = currentForm.addField({id:'custpage_selectfieldsucursales', type:serverWidget.FieldType.SELECT, label:'SUCURSAL *'});
                selectField.addSelectOption({value:'', text:''});

                search.create({
                     type: search.Type.LOCATION,
                     filters: [search.createFilter({name: 'subsidiary', operator: search.Operator.IS, values: [subsidiary_Company]}),
                               search.createFilter({name: 'isinactive', operator: search.Operator.IS, values: ["false"]})],
                     columns: ['internalid', 'name', 'subsidiary', 'isinactive']
                }).run().each(function(result){
                      var internalid_found = result.getValue({name: 'internalid'});
                      var name_found = result.getValue({name: 'name'});
                      var subsidiary_found = result.getValue({name: 'subsidiary'});
                      var isinactive_found = result.getValue({name: 'isinactive'});
                      //log.debug('isinactive_found: ', isinactive_found);
                      selectField.addSelectOption({value:internalid_found, text:name_found});
                      return true;
                 });
                 //field.defaultValue = html;
              }
              else
              {
                var currentForm = context.form;
                var html = '<script>alert("Llena el campo SUBSIDIARY de COMPANY !!");</script>';
                var field = currentForm.addField({id: "custpage_alert", label: "Alert", type: serverWidget.FieldType.INLINEHTML});
                field.defaultValue = html;
              }
            }
         }catch(e){
           log.debug('Exception log:', e);
         }
       }

        if(context.type == 'create')
        {
          log.debug('context type:', context.type);

          try
          {
			var currentRecord = context.newRecord;
            //log.debug('context type create - currentEventId: ', currentRecord.Id);
        	var company = currentRecord.getValue({fieldId: 'company'});
            log.debug('company: ', company);
            if(company != null && company != "")
            {
              context.form.getField('custevent2').updateDisplayType({displayType:'hidden'}); // Ocultar Sucursal

              var objRecord = record.load({type: 'customer', id: company, isDynamic: true});
              var subsidiary_Company = objRecord.getValue({fieldId: 'subsidiary'});
              log.debug('subsidiary_Company: ', subsidiary_Company);

              if(subsidiary_Company != "" && subsidiary_Company != null)
              {
                var currentForm = context.form;
                //var html = '<script src="https://3559763.restlets.api.netsuite.com"></script>';
                var html = '<script>';
                html += 'jQuery(document).ready(function(){';
                html += '	jQuery("#company_display").change(function(){';
                html += '		var hddn_company_fs = jQuery("#hddn_company_fs").val();';
                html += '		if(hddn_company_fs != null && hddn_company_fs != "")';
                html += '		{';
                html += '			alert("hddn_company_fs: " + hddn_company_fs);';
                html += '			jQuery.ajax({';
                html += '				url: "https://cors-anywhere.herokuapp.com/https://3559763.app.netsuite.com/app/site/hosting/restlet.nl?script=1291&deploy=1",';
           //https://cors-anywhere.herokuapp.com/ https://3559763.app.netsuite.com/app/site/hosting/restlet.nl?script=1291&deploy=1 https://3559763.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=1291&deploy=1
                html += '				type: "GET",';
                html += '				crossDomain: true,';
                html += '				dataType: "JSON",'; // jsonp
                html += '				data: {companyVal:"108718"},'; // "108718"
                html += '				contentType: "application/json; charset=utf-8",'; // text/plain
                //html += '				jsonp: "jsonp-callback",';
                //html += '				headers:{Authorization: "NLAuth nlauth_account=3559763, nlauth_email=acolin@kaloni.com, nlauth_signature=ALBERTO123*, nlauth_role=3"},';
                html += '				beforeSend: function(xhr){xhr.setRequestHeader("Authorization", "NLAuth nlauth_account=3559763, nlauth_email=acolin@kaloni.com, nlauth_signature=ALBERTO123*, nlauth_role=3")},';
                html += '				success: function(response){alert("success--" + response);},';
                html += '				error: function(response){alert("error--" + response);}';
                html += '			})';
                /*html += '			.done(function(data){var response = JSON.parse(data); jQuery("<pre>").text(JSON.stringify(response)).appendTo("body");})'; // jQuery("<pre>").text(JSON.stringify(data)).appendTo("body");
                html += '			.fail(function(data){var response = JSON.parse(data); jQuery("<pre>").text(JSON.stringify(response)).appendTo("body");})';
                html += '			.always(function(data){var response = JSON.parse(data); jQuery("<pre>").text(JSON.stringify(response)).appendTo("body");});';*/
                html += '		}';
                html += '		var suc = jQuery("#selectSucursales").val();';
                html += '		alert("Sucursal: " + suc);';
                html += '	});';
                html += '});';
                html += "</script>";
                var field = currentForm.addField({id: "custpage_script_select", label: "Script_Select", type: serverWidget.FieldType.INLINEHTML});
                field.defaultValue = html;
                
                // serverWidget.FieldType.SELECT
                var selectField = currentForm.addField({id:'custpage_selectfieldsucursales', type:serverWidget.FieldType.INLINEHTML, label:'SUCURSAL *'});
                selectField.defaultValue = '<br /><select id="selectSucursales" name="selectSucursales" >';
                selectField.defaultValue += '<option value=""></option>';
                //selectField.addSelectOption({value:'', text:''});
                search.create({
                     type: search.Type.LOCATION,
                     filters: [search.createFilter({name: 'subsidiary', operator: search.Operator.IS, values: [subsidiary_Company]}),
                               search.createFilter({name: 'isinactive', operator: search.Operator.IS, values: ["false"]})],
                     columns: ['internalid', 'name', 'subsidiary', 'isinactive']
                }).run().each(function(result){
                      var internalid_found = result.getValue({name: 'internalid'});
                      var name_found = result.getValue({name: 'name'});
                      var subsidiary_found = result.getValue({name: 'subsidiary'});
                      var isinactive_found = result.getValue({name: 'isinactive'});
                      //log.debug('isinactive_found: ', isinactive_found);
                      //selectField.addSelectOption({value:internalid_found, text:name_found});
                  	  selectField.defaultValue += '<option value="'+internalid_found+'">'+name_found+'</option>';
                      return true;
                 });
                 selectField.defaultValue += '</select>';
              }
              else
              {
                var currentForm = context.form;
                var html = '<script>alert("Llena el campo SUBSIDIARY de COMPANY !!");</script>';
                var field = currentForm.addField({id: "custpage_alert", label: "Alert", type: serverWidget.FieldType.INLINEHTML});
                field.defaultValue = html;
              }
            }
          }catch(e){
           log.debug('Exception log:', e);
          }
        }
      
    }

    return {
        beforeLoad: beforeLoad
    };
});
