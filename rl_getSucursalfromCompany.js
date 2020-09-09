/**

 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount

 */

define(['N/record','N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget'],

function(record,log,file,email,search,serverWidget) {

    function get(context)
  	{
      /*var rec = record.load({type: 'invoice', id: '486123', isDynamic: true});
      log.debug('rec: ', rec);
      //rec.setValue({fieldId: 'status', value: 'Open'});
      //rec.setValue({fieldId: 'statusRef', value: 'open'});
      rec.setValue({fieldId: 'pendingpaypalauth', value: 'T'});
      rec.setValue({fieldId: 'voided', value: 'F'});
      var recChange = rec.save({enableSourcing: false, ignoreMandatoryFields: true});
      log.debug('recChange: ', recChange);
      return JSON.stringify(recChange);*/
      
      log.debug('context: ', context);
      var newArray = [];
      var objSucursales = '{"sucursales":[]}';
      objSucursales = JSON.parse(objSucursales);
      var sucursales = "";
	  //var obj = JSON.parse(context);
      var obj = context;
      if(obj.hasOwnProperty("companyVal"))
      {
          var companyVal = obj.companyVal;
          log.debug('companyVal: ', companyVal);
          if(companyVal != null && companyVal != "")
          {
            try
            {
               var objRecord = record.load({type: 'customer', id: companyVal, isDynamic: true});
               var subsidiary_Company = objRecord.getValue({fieldId: 'subsidiary'});
               log.debug('subsidiary_Company: ', subsidiary_Company);

               if(subsidiary_Company != "" && subsidiary_Company != null)
               {
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
                      //sucursales += internalid_found +":"+ name_found+"|";
                      newArray.push({internalid: internalid_found, name: name_found});
                      return true;
                   });
               }
            }catch(e){
              log.debug('Exception 2: ', e);
              return false;
            }
          }
      }
      var newArray2 = [];
	  var uniqueObject = {};
      var i = null;
      for(i in newArray){
         var objTitle = newArray[i]['internalid'];
         uniqueObject[objTitle] = newArray[i];
      }
      for(i in uniqueObject){
         newArray2.push(uniqueObject[i]);
         objSucursales['sucursales'].push(uniqueObject[i]);
      }
      log.debug('objSucursales: ', objSucursales);
 	  //return sucursales;
      return JSON.stringify(objSucursales);
    }
  
  
  
    function post(context)
    {
      var sucursales = "";
	  var obj = JSON.parse(context);
      if(obj.hasOwnProperty("companyVal"))
      {
          var companyVal = obj.companyVal;
          log.debug('companyVal: ', companyVal);
          if(companyVal != null && companyVal != "")
          {
            try
            {
               var objRecord = record.load({type: 'customer', id: companyVal, isDynamic: true});
               var subsidiary_Company = objRecord.getValue({fieldId: 'subsidiary'});
               log.debug('subsidiary_Company: ', subsidiary_Company);

               if(subsidiary_Company != "" && subsidiary_Company != null)
               {
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
                      sucursales += internalid_found +"="+ name_found+"|";
                      return true;
                   });
               }
            }catch(e){
              log.debug('Exception 2: ', e);
              return false;
            }
          }
      }
      log.debug('sucursales: ', sucursales);
 	  return sucursales;
        //return 'response post'; // {msg: 'post'}
    }

    return {
        get: get,
      	post: post
    };
});
