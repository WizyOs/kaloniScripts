  /**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

 define(['N/record', 'N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format', 'N/https', 'N/url', 'N/xml', 'N/render', 'N/runtime'],

 function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {

   function doGet(params) {

   }

   function doPost(params) {
     var objJson = JSON.parse(params);
     var param_Email = objJson.param;
     log.debug('Params', objJson.param);
     var idHistoriaClinica = 0;

     //Busqueda de  id de cliente por medio de correo electronico
     var searchCustomer = search.create({
       type: search.Type.CUSTOMER,
       columns: [{
         name: 'internalid'
       }, {
         name: 'email'
       }],
       filters: [{
         name: 'email',
         operator: 'is',
         values: param_Email
       }]
     });
     var id = 0;
     var resultCustomer = searchCustomer.run().each(function (result) {
       id = result.getValue({
         name: 'internalid'
       });
     });

     //Busqueda de id de caso por id de cliente y filtrado por historia clinica
     var searchHistory = search.create({
       type: search.Type.SUPPORT_CASE,
       columns: [{
         name: 'internalid'
       }],
       filters: [{
         name: 'internalid',
         join: 'customer',
         operator: 'is',          
         values: id
       } , {
         name: 'title',
         operator: 'startswith',
         values: 'Histor'
       }]
     });

     var result_searchHistory = searchHistory.run().each(function (result) {
       idHistoriaClinica = result.getValue({ name: 'internalid' });
     });

     log.debug('Resultado Historia Clinica', id);

     //DATOS CLIENTE
     var obj_customer = record.load({ type: 'customer', id: id });
     var idCustomer = id;
     var field_customer_entityid = obj_customer.getText({ fieldId: 'entityid' });
     var field_customer_altname = obj_customer.getText({ fieldId: 'altname' });
     var field_customer_custentity_sexo = obj_customer.getText({ fieldId: 'custentity_sexo' });
     var field_customer_defaultaddress = obj_customer.getText({ fieldId: 'defaultaddress' });
     var field_customer_mobilephone = obj_customer.getText({ fieldId: 'mobilephone' });
     var field_customer_custentity25 = obj_customer.getText({ fieldId: 'custentity25' });
     var field_customer_custentity234 = obj_customer.getText({ fieldId: 'custentity234' });

   }

   return {
     get: doGet,
     post: doPost
   };

 });