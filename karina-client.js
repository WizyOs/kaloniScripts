function fxn_generatePDF_karina()
{
  //call the Suitelet created in Step 1
  var createPDFURL = nlapiResolveURL('SUITELET', 'customscript_kari_suitelet', 'customdeploy_kari_suitelet', false);
 
  //pass the internal id of the current record
  createPDFURL += '&id=' + nlapiGetRecordId();
 nlapiRequestURL(createPDFURL);
   location.reload();
  //show the PDF file 
  //newWindow = window.open(createPDFURL);
}