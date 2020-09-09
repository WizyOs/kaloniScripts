function generateproc()
{
  //call the Suitelet created in Step 1

  var createPDFURL = nlapiResolveURL('SUITELET','customscript_pdf_spain','customdeploy_pdf_spain', false);
  //pass the internal id of the current record
  createPDFURL += "&id=" + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
  location.reload(true);
  //show the PDF file 
  //newWindow = window.open(createPDFURL);
  
}

