//Define the User Event function for a beforeLoad operation.
function beforeLoadFindFilesFromFolder(type, form)
{
  if (type == 'view')
  {
    var caseRecord = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
  	var customFormVal = caseRecord.getFieldValue('customform');
    if(customFormVal == "135") // F-Diagnostico
    {
      var newRecord = nlapiGetNewRecord();
      var companyVal = newRecord.getFieldText('company');
      nlapiLogExecution('DEBUG', 'companyVal: ', companyVal);

      if(companyVal.substring(0,3) == "HG-")
      {
        var companyVal_Split = companyVal.split(" ");
        companyVal = companyVal_Split[0];
        var folderToFind = companyVal + "_MICROCAMARA";

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
           nlapiLogExecution('DEBUG', 'UE | folderId _ var i position value: ', folderId + ' _ ' + i);
           //if(folderId == "1039538")
              //nlapiLogExecution('DEBUG', 'UE | folderId _ var i position value: ', folderId + ' _ ' + i);
          }

           if(folderId != null)
           {
              var filters = new Array();
              filters[0] = new nlobjSearchFilter('internalid', null, 'is', folderId);
              var columns = new Array();
              var fileid = new nlobjSearchColumn('internalid', 'file');
              var filename = new nlobjSearchColumn('name', 'file');
              var fileurl = new nlobjSearchColumn('url', 'file');
              var ffiletype = new nlobjSearchColumn('filetype', 'file');
              columns[0] = fileid;
              columns[1] = filename;
              columns[2] = fileurl;
              columns[3] = ffiletype;
              var searchResult2 = nlapiSearchRecord('folder', null , filters , columns);
              if(searchResult2)
              {
                 var imagesMicrocamara = [];
                 for(var j = 0 ; j < searchResult2.length; j++)
                 {
                    var fileidVal = searchResult2[j].getValue(fileid);
                    var filenameVal = searchResult2[j].getValue(filename);
                    var fileurlVal = searchResult2[j].getValue(fileurl);
                    var ffiletypeVal = searchResult2[j].getValue(ffiletype);
                    var ffiletypeParseJSON = JSON.stringify(ffiletypeVal);
    //nlapiLogExecution('DEBUG', 'ue_FindFilesFromFolder.js', 'fileidVal: '+fileidVal+' filenameVal: '+filenameVal+' url: '+fileurlVal+' ffiletypeParseJSON: '+ffiletypeParseJSON);
                    //nlapiLogExecution('DEBUG', 'ue_FindFilesFromFolder.js| ffiletypeParseJSON', ffiletypeParseJSON);
                    ffiletypeParseJSON = ffiletypeParseJSON.replace(/"/g, '');
                    if(ffiletypeParseJSON === "JPGIMAGE" || ffiletypeParseJSON === "PNGIMAGE")
                    {
                      //nlapiLogExecution('DEBUG', 'ue_FindFilesFromFolder.js| si es imagen', ffiletypeParseJSON);
                        imagesMicrocamara.push(fileidVal);
                    }
                    if(imagesMicrocamara.length >= 4)
                      break;
                 }
                 nlapiLogExecution('DEBUG', 'imagesMicrocamara encontradas: ', imagesMicrocamara.length);
                 if(imagesMicrocamara.length >= 2)
                 {
                   if(imagesMicrocamara[0] != null && imagesMicrocamara[0] != "")
                   	 caseRecord.setFieldValue('custevent333', imagesMicrocamara[0]);
                   if(imagesMicrocamara[1] != null && imagesMicrocamara[1] != "")
                   	 caseRecord.setFieldValue('custevent334', imagesMicrocamara[1]);
                   if(imagesMicrocamara[2] != null && imagesMicrocamara[2] != "")
                   	 caseRecord.setFieldValue('custevent335', imagesMicrocamara[2]);
                   if(imagesMicrocamara[3] != null && imagesMicrocamara[3] != "")
                   	 caseRecord.setFieldValue('custevent336', imagesMicrocamara[3]);
                   nlapiSubmitRecord(caseRecord, false, true);
                   nlapiLogExecution('DEBUG', 'ue_FindFilesFromFolder.js| Imagenes de microcamara cargadas al caso', 'ok');
                 }
              }
           }
           else
           {
             nlapiLogExecution('ERROR', 'ue_FindFilesFromFolder.js | function beforeLoadFindFilesFromFolder()', 'El folderId encontrado es nulo: ' + folderId);
           }
        }
        else
        {
           nlapiLogExecution('ERROR', 'ue_FindFilesFromFolder.js | function beforeLoadFindFilesFromFolder()', 'No se encontró la carpeta llamada: ' + folderToFind);
        }
      }
    }
  }
}

/*
  nlapiLogExecution('DEBUG', 'UE | beforeLoadFindFilesFromFolder(): ', 'Entre a beforeLoadFindFilesFromFolder()');
  var filename = "Captura de pantalla 2019-01-25 a la(s) 08.37.56.png";//your file name goes here HG-70494_MICROCAMARA
  var filter = new nlobjSearchFilter('name', 'file', 'is', filename);
  var column = new nlobjSearchColumn('internalid', 'file');
  var searchResult = nlapiSearchRecord('folder', null , filter , column);
  var folderId = null;
  var fileId = null;
  nlapiLogExecution('DEBUG', 'UE | searchResult: ', searchResult);
  if(searchResult != null)
  {
     folderId = searchResult[0].getId();
     fileId = searchResult[0].getValue('internalid','file');
     nlapiLogExecution('DEBUG', 'UE | folderId y fileId: ', folderId + ' _ ' + fileId);
  }else{
     nlapiLogExecution('DEBUG', 'UE | No hay resultados!!', 'No hay resultados!!');
  }
  */