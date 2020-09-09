function fxn_generatePDF()
{
//call the Suitelet created in Step 1
var createPDFURL = nlapiResolveURL('SUITELET','customscript1027','customdeploy1', false);
  //pass the internal id of the current record

  createPDFURL += '&id=' + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
   location.reload();
 //show the PDF file
 //newWindow = window.open(createPDFURL);


}



