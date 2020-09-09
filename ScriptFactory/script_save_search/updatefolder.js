function portletName(){
    var folderC = nlapiCreateRecord('folder');
    var parentC = folderC.getField('parent');
    var folderList = parentC.getSelectOptions("MC8");

if(folderList.length!=0) {
  for(i=0;i<=folderList.length;i++){
        var idsfol=folderList[i].getId();
   // var newAttachment = nlapiCreateFile('NetSuiteInformation.txt', 'PLAINTEXT', 'Archivo creado por script');
     var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
    newAttachment.setFolder(idsfol);
    newAttachment.setEncoding('UTF-8');
    nlapiSubmitFile(newAttachment);
  }
  
}

}