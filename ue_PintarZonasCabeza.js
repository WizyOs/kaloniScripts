/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/
define(['N/record', 'N/file', 'N/https', 'N/search', 'N/runtime'], function (record, file, https, search, runtime) {

   function beforeLoad(context) {
      if (context.type == "view") {
         var recordCaseId = context.newRecord.id;
         var objRecord = record.load({ type: 'supportcase', id: recordCaseId, isDynamic: true });
         var casenumberVal = objRecord.getValue({ fieldId: 'casenumber' });
         //log.debug("casenumberVal: ", casenumberVal);
         var customformVal = objRecord.getValue({ fieldId: 'customform' });
         //log.debug("customformVal: ", customformVal);
         var imgCabezaBase64 = objRecord.getValue({ fieldId: 'custevent511' }) || null;
         var imgRostroBase64 = objRecord.getValue({ fieldId: 'custevent801' }) || null;
         var imgCabezaBase64_url = objRecord.getValue({ fieldId: 'custevent512' }) || null;
         var imgRostroBase64_url = objRecord.getValue({ fieldId: 'custevent800' }) || null;
         var imagenCabezaSeteada = false;
         var imagenRostroSeteada = false;
         var fol = '';
         var fileObj = '';
         var response = https.get({ url: 'https://rest.netsuite.com/rest/datacenterurls?account=3559763&c=3559763' });
         var jsonObj = response.body;
         var obj = JSON.parse(jsonObj);
         var exist_file_ImagenZonasCabezaFull = false;
         var exist_file_ImagenZonasRostroFull = false;
         var searchResult = '';
         var file_name = '';

         try {
            var searchImages = search.load({
               id: "customsearch7172"
            });

            var filterFolder = search.createFilter({
               name: "folder",
               operator: search.Operator.IS,
               values: [1572868]
            });

            var filterName = search.createFilter({
               name: "name",
               operator: search.Operator.CONTAINS,
               values: [recordCaseId + "_" + casenumberVal]
            });

            searchImages.filters.push(filterName);
            searchImages.filters.push(filterFolder);

            searchResult = searchImages.run().getRange({
               start: 0,
               end: 2
            });

            log.debug('Resultado busqueda', JSON.stringify(searchResult));
            var str_files = JSON.stringify(searchResult);
            var obj_files = JSON.parse(str_files);

            //log.debug('objetos cabeza', obj_files[0].values.name);
            //log.debug('objetos rostro', obj_files[1].values.name);


            try {
               for (var key_images in obj_files) {
                  var string_name_cabeza = obj_files[key_images].values.name;
                  var index_image_cabeza = string_name_cabeza.indexOf('_ImagenZonasCabezaFull.png', 0);
                  //log.debug('index cabeza', index_image_cabeza);
                  if (index_image_cabeza >= 0) {
                     exist_file_ImagenZonasCabezaFull = true;
                  }
                  var string_namre_rostro = obj_files[key_images].values.name;
                  var index_image_rostro = string_namre_rostro.indexOf('_ImagenZonasRostroFull.png', 0);
                  //log.debug('index rostro', index_image_rostro);
                  if (index_image_rostro >= 0) {
                     exist_file_ImagenZonasRostroFull = true;
                  }
               }
            } catch (error) {
               log.debug('Error existe archivo', error);
            }

         } catch (error) {
            log.debug('Error busqueda archivos', error);
         }


         if (customformVal == "135") // Diagnostico
         {
            if (imgCabezaBase64 != null) {
               if (imgCabezaBase64_url == null && exist_file_ImagenZonasCabezaFull == false) {
                  // crear imagen paciente
                  var pngCabeza_base64 = imgCabezaBase64.replace("data:image/png;base64,", "");
                  fol = 1572868;
                  fileObj = file.create({ name: recordCaseId + "_" + casenumberVal + "_ImagenZonasCabezaFull.png", fileType: "PNGIMAGE", folder: fol, contents: pngCabeza_base64, isOnline: false });
                  try {
                     pngCabeza_fileId = fileObj.save();
                     var newImage = file.load({ id: pngCabeza_fileId });
                     objRecord.setValue({ fieldId: "custevent512", value: obj.systemDomain + newImage.url });
                     imagenCabezaSeteada = true;
                  } catch (error) {
                     log.error('Error save Head', error);
                  }
               } else {
                  log.debug("Log: ", "file of head was created");
                  //log.debug("imgCabezaBase64: ", imgCabezaBase64);
               }
            }

            if (imgRostroBase64 != null) {
               if (imgRostroBase64_url == null && exist_file_ImagenZonasRostroFull == false) {
                  // crear imagen paciente
                  var pngRostro_base64 = imgRostroBase64.replace("data:image/png;base64,", "");
                  fol = 1572868;
                  fileObj = file.create({ name: recordCaseId + "_" + casenumberVal + "_ImagenZonasRostroFull.png", fileType: "PNGIMAGE", folder: fol, contents: pngRostro_base64, isOnline: false });
                  try {
                     pngRostro_fileId = fileObj.save();
                     var newImageRostro = file.load({ id: pngRostro_fileId });
                     objRecord.setValue({ fieldId: "custevent800", value: obj.systemDomain + newImageRostro.url });
                     imagenRostroSeteada = true;
                  } catch (error) {k
                     log.debug('Error save Face', error);
                  }
               }
               else {
                  log.debug("Log: ", "file of face was created");
                  //log.debug("imgRostroBase64: ", imgRostroBase64);
               }
            }

            if (imagenCabezaSeteada == true || imagenRostroSeteada == true) {
               objRecord.save({ enableSourcing: true, ignoreMandatoryFields: true });
            }

            if (exist_file_ImagenZonasCabezaFull == false || exist_file_ImagenZonasRostroFull == false) {
               context.form.addButton({ id: "custpage_img_cabeza", label: "Pintar Zonas", functionName: "onButtonClick_PintarCabeza" });
               context.form.clientScriptModulePath = "SuiteScripts/cs_PintarZonasCabeza.js";
            }
         }
      }
      var scriptObj = runtime.getCurrentScript();
      log.debug('Script Remainning', scriptObj.getRemainingUsage());
   }
   return {
      beforeLoad: beforeLoad
   };
});
