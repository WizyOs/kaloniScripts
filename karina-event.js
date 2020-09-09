function onClick(type, form)
{
  //add a custom button on the form
  //specify the function name of the Client script created in Step 2
  form.addButton('custpage_Add', 'Print Item Barcode','fxn_generatePDF_karina()');
 
  //set the internal id of the Client script created in Step 2
  form.setScript('customscript_kari_client');
}