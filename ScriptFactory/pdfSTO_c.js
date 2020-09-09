function sto_generatePDF()
{
//call the Suitelet created in Step 1
var createPDFURL = nlapiResolveURL('SUITELET','customscript_cliente_sto','customdeploy_cliente_pdf_sto', false);
  //pass the internal id of the current record

  createPDFURL += '&id=' + nlapiGetRecordId();
  nlapiRequestURL(createPDFURL);
   location.reload();
 //show the PDF file
 //newWindow = window.open(createPDFURL);


}



