function onClick(type, form)
{


  form.addButton('custpage_Add', 'Tester','pdfMexicoClient()');//origina
// form.addButton('custpage_btnpre', 'Ex.Colombia',"generate_presupuesto();");
  //set the internal id of the Client script created in Step 2
  form.setScript('customscript553');//origina
 var sub = nlapiGetFieldValue('subsidiary');
  if(sub=='subsidiary' || form=='customform'){
    var r = nlapiLoadRecord('customrecord_base_record','1');
    form.removeButton('custpage_mex');
  }
  //set the internal id of the Client script created in Step 2
  //form.setScript('customscript_generapresupuesto');

}

