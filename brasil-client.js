function fxn_generatePDF_brasil()
{
//call the Suitelet created in Step 1
var createPDFURL = nlapiResolveURL('SUITELET','customscript_pdf_brasil','customdeploy_pdf_brasil', false);
  //pass the internal id of the current record

  createPDFURL += '&id=' + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
   location.reload(true);
 //show the PDF file
 //newWindow = window.open(createPDFURL);


}



