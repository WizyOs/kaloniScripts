function pdfMexicoClient()
{
  //call the Suitelet created in Step 1
 
  var createPDFURL = nlapiResolveURL('SUITELET','customscript552','customdeploy1', false);
  //pass the internal id of the current record

 createPDFURL += '&id=' + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
   location.reload(true);
 //show the PDF file
 //newWindow = window.open(createPDFURL);
  
}