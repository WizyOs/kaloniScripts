function onClick(type, form) //onClick
{
  //add a custom button on the form
  //specify the function name of the Client script created in Step 2
  form.addButton('custpage_Add', 'Print Item Barcode K',"fxn_generatePDF();");
 
  //set the internal id of the Client script created in Step 2
  form.setScript('customscript_clientkari');
}