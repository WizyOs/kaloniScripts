function generateproc()
{
  //call the Suitelet created in Step 1

  var createPDFURL = nlapiResolveURL('SUITELET','customscriptpresupuesto_pdf','customdeploypresupuesto_pdf', false);
  //pass the internal id of the current record
  createPDFURL += "&id=" + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
  location.reload(true);
  //show the PDF file 
  //newWindow = window.open(createPDFURL);
  
}

