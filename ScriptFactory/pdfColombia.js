function get_pdf_col()
{
  //call the Suitelet created in Step 1
  var createPDFURL = nlapiResolveURL('SUITELET', 'customscriptpdf_suitelet', 'customdeploypdf_suitelet', false);
 
  //pass the internal id of the current record
  createPDFURL += '&id=' + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
  location.reload(true);
 //show the PDF file
  //newWindow = window.open(createPDFURL);

}

