function fxn_generatePDF() // fxn_generatePDF
{
  //call the Suitelet created in Step 1
  var createPDFURL = nlapiResolveURL('SUITELET', 'customscript_suiteletkari', 'customdeploy_suiteletkari', false);
 
  //pass the internal id of the current record
  createPDFURL += '&id=' + nlapiGetRecordId();
 
  //show the PDF file 
  newWindow = window.open(createPDFURL);
}