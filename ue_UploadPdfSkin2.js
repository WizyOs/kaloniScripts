//Define the User Event function for a beforeLoad operation.
function beforeLoadUploadPdfSkin2(type, form)
{
  if(type == "view")
  {
    try
    {
      var customerRecord = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
      var urlSkin = customerRecord.getFieldValue('custentity368');
      nlapiLogExecution('ERROR', 'urlSkin: ' + urlSkin);
      var hg = customerRecord.getFieldValue('entityid');

      if(urlSkin != "" && urlSkin != null && urlSkin != "http://NA")
      {
        if(hg.substring(0,3) == "HG-")
        {
            nlapiLogExecution('ERROR', 'HG: ' + hg);
            var hg_Split = hg.split(" ");
            hg = hg_Split[0];
            var folderToFind = hg + "_FOLDER";

            var filter = new nlobjSearchFilter('name', null, 'is', folderToFind);
            var searchResult = nlapiSearchRecord('folder', null , filter , null);
            var folderId = null;
            if(searchResult != null)
            {
              for (var i = 0 ; i < searchResult.length; i++)
              {
               if(i >= 1)
                  break;

               folderId = searchResult[i].getId();
               nlapiLogExecution('ERROR', 'ue_UploadPdfSkin.js | beforeLoadUploadPdfSkin2()', 'folderId _ var i position value: ' + folderId + ' _ ' + i);
              }
              if(folderId != null)
              {
                  var url = urlSkin;
                  var pdfContent = nlapiRequestURL(url);
                  var actualContent = pdfContent.getBody();
                  var file = nlapiCreateFile(hg+'_SKIN.pdf', 'PDF', actualContent);
                  file.setFolder(folderId); // 1133040
                  var fileId = nlapiSubmitFile(file);

                  var filePDF = nlapiLoadFile(fileId);
                  var urlFile = filePDF.getURL();
                  nlapiLogExecution('ERROR', 'ue_UploadPdfSkin.js | beforeLoadUploadPdfSkin2()', 'local urlFile: ' + urlFile);
                  customerRecord.setFieldValue('custentity391', urlFile);
                  nlapiSubmitRecord(customerRecord, false, true);
              }
              else
              {
                nlapiLogExecution('ERROR', 'ue_UploadPdfSkin.js | beforeLoadUploadPdfSkin2()', 'El folderId encontrado es nulo: ' + folderId);
              }
            }
            else
            {
               nlapiLogExecution('ERROR', 'ue_UploadPdfSkin.js | beforeLoadUploadPdfSkin2()', 'No se encontró la carpeta llamada: ' + folderToFind);
            }
        }
      }
    }catch(e){
      nlapiLogExecution('ERROR', 'Exception: ', e);
    }
  }
}