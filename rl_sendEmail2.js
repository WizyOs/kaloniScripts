/**

 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount

 */

define(['N/record','N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget',],

function(record,log,file,email,search,serverWidget) {

    function get(context)
  	{
      log.debug('msg get', context);
      //var fileId = context.request.parameters.idFile;
      //log.debug('fileId', fileId);
      /*var fileObj = file.load({id: '2225021'});
      var mail = email.send({author: -5, recipients: 'acolin@kaloni.com', subject: 'Test Sample Email -- New SO record with file', body: 'email body', attachments: [fileObj]});*/
      return 'send ok';
	  //return context.idFile;
    }

    function post(context)
    {
      var companyVal = null;
      try{companyVal = context.companyVal;}catch(e){log.debug('Exception 1: ', e);}

	  if(companyVal != null && companyVal != "")
      {
        try
        {
           var objRecord = record.load({type: 'customer', id: companyVal, isDynamic: true});
           var subsidiary_Company = objRecord.getValue({fieldId: 'subsidiary'});
           log.debug('subsidiary_Company: ', subsidiary_Company);

           if(subsidiary_Company != "" && subsidiary_Company != null)
           {
              var currentForm = serverWidget.createForm({title: 'Fulfill Order Lines'});
              //var currentForm = context.form;
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
                  selectField.addSelectOption({value:internalid_found, text:name_found});
                  return true;
               });
               //field.defaultValue = html;
               return true;
           }
           else
           {
              var currentForm = context.form;
              var html = '<script>alert("Llena el campo SUBSIDIARY de COMPANY !!");</script>';
              var field = currentForm.addField({id: "custpage_alert", label: "Alert", type: serverWidget.FieldType.INLINEHTML});
              field.defaultValue = html;
              return false;
           }
        }catch(e){
          log.debug('Exception 2: ', e);
          return false;
        }
      }

      var subsidiary_Company = null;
      try{subsidiary_Company = context.subsidiary_Company_par;}catch(e){log.debug('Exception 3: ', e);}

      var sucursal_New_Event = null;
      try{sucursal_New_Event = context.sucursal_New_Event_par;}catch(e){log.debug('Exception 4: ', e);}

      if(subsidiary_Company != null && subsidiary_Company != "" && sucursal_New_Event != null && sucursal_New_Event != "")
      {
        try
        {
            var sucAux = false;
            var countAux = 0;
            search.create({
                 type: search.Type.LOCATION,
                 filters: [search.createFilter({name: 'subsidiary', operator: search.Operator.IS, values: [subsidiary_Company]})],
                 columns: ['internalid', 'name', 'subsidiary']
            }).run().each(function(result){
                 //var jsonString = JSON.stringify(result);	var obj = JSON.parse(jsonString);
                 //if(countAux < 99)
                 //{
                  var internalid_found = result.getValue({name: 'internalid'});
                  var name_found = result.getValue({name: 'name'});
                  var subsidiary_found = result.getValue({name: 'subsidiary'});
                  if(sucursal_New_Event == internalid_found)
                  {
                     sucAux = true;
                     log.debug('internalid_found: ', internalid_found);
                     log.debug('name_found: ', name_found);
                     log.debug('subsidiary_found: ', subsidiary_found);
                   }
                  //}
                  countAux++;
                  return true;
             });

             log.debug('countAux: ', countAux);

             if(sucAux)
             {
                log.debug('SUCURSAL: ', 'Selección valida!!');
                return true;
             }
             else
             {
                alert('La SUCURSAL que seleccionaste no pertenece a la SUBSIDIARY de COMPANY');
                return false;
             }
          }catch(e){
            log.debug('Exception 5: ', e);
            return false;
          }
        
      }

        //return 'response post'; // {msg: 'post'}
    }

    return {
        get: get,
      	post: post
    };
});
