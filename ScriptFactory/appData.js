function appData() {
  var search = nlapiSearchRecord("customer", "customsearch4473", null, null); //BD Karina Avila
  var columns = search.getColumns();
  var results = search.runSearch();
  if (results) {
    for (i = 0; i < columns.length; i++) {
      results.forEachResult(getResults);
    }
  }
}

function getResults(res) {
  var cols =  res.getAllColumns();
  var message0 = res.getValue(cols[0]);
  var message1 = res.getValue(cols[1]);
  var message2 = res.getValue(cols[2]);
  var message3 = res.getValue(cols[3]);
  var message4 = res.getValue(cols[4]);
  var message5 = res.getValue(cols[5]);
  var message6 = res.getValue(cols[6]);
  var message7 = res.getValue(cols[7]);
  var message8 = res.getValue(cols[8]);
  var message9 = res.getValue(cols[9]);
  var message10 = res.getValue(cols[10]);

  var message =  message0 + " " +message1 + " " + message2 + " " + message3 + " " + message4 + " " + message5 + " " + message6 + " " + message7 + " " + message8 + " " + message9 + " " + message10 + "\n";

  // -------------------  INICIO_TXT  --------------------
  // XML content of the file
  var folder = nlapiLoadRecord('folder','1103566');
  folder.setFieldValue('name','Data');
  folder.setFieldValue('parent','1101627');
  var parentFolderId = nlapiSubmitRecord(folder,true);
 // var scriptID = message.getName());
  var fileGenerated = nlapiCreateFile('app.txt', 'PLAINTEXT', message);
  fileGenerated.setFolder(parentFolderId);
  fileGenerated.setEncoding('UTF-8');
  nlapiSubmitFile(fileGenerated);
// ----------------------  FIN_TXT  -----------------------
  return true;
}