   function pageInit(type, form) {

      form.addSubmitButton('Prueba');

      var idFormEditAndView = null;
      var idFomrCreate = null;
      var formulario = null;
      if (type == 'view' || type == 'quickview' || type == 'edit') {
         var recId = nlapiGetRecordId(); // id del registro actual
         var record = nlapiLoadRecord('supportcase', recId); // carga el registro actual en el objeto record
         idFormEditAndView = record.getFieldValue('customform'); // Id del formulario
      } else if (type == 'create') {
         idFomrCreate = nlapiGetFieldValue('customform');
      }

      if (idFormEditAndView != null && idFomrCreate == null) {
         formulario = idFormEditAndView;
      }
      if (idFormEditAndView == null && idFomrCreate != null) {
         formulario = idFomrCreate;
      }

      if ((formulario == 138 || formulario == 33) && (type == 'create' || type == 'edit')) {

         var tab_imagenes = form.addTab('custpage_prueba_envio_imagenes', 'Envio de Imagenes');
         form.insertTab(tab_imagenes, 'custpage_sesiones_medical');

         form.addField('custpage_load_image1', 'file', 'IMAGE 1', null, 'custpage_prueba_envio_imagenes');

      }
      nlapiLogExecution('DEBUG', 'VERIFICA', 'AQUI ENTRA EL SCRIPT');
   }

   function uploader(request, response) {
      if (request.getMethod() == 'GET') {
         var form = nlapiCreateForm('Attach File to Customer');
         var entityField = form.addField('entity', 'select', 'Customer', 'customer');
         entityField.setLayoutType('normal', 'startcol');
         entityField.setMandatory(true);

         var fileField = form.addField('file', 'file', 'Select File');
         fileField.setMandatory(true);

         form.addSubmitButton();
         form.addResetButton();
         response.writePage(form);
      }
      else {
         var entity = request.getParameter("entity");
         var file = request.getFile("file");

         // set the folder where this file will be added. In this case, 10 is the internal ID
         // of the SuiteScripts folder in the NetSuite file cabinet
         file.setFolder(3042073);

         // Create file and upload it to the file cabinet.
         var id = nlapiSubmitFile(file);

         // Attach file to customer record
         nlapiAttachRecord("file", id, "customer", entity);

         // Navigate to customer record
         response.sendRedirect('record', 'customer', entity);
      }
   }