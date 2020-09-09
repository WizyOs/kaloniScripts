function onClick(type, form)
{

  // form.addButton('custpage_colom', 'Actualizar Exp. Col.','get_pdf_col()');
  form.setScript('customscriptpdf_col_cliente');
  /*var subsidiary = nlapiGetFieldValue('subsidiary');
   if(subsidiary!='10'){
     form.removeButton('custpage_colom');
  }*/
   var role = nlapiGetContext().getRole();
      if(role == 1106){
         form.removeButton('custpage_mex');
      if(role == 1044){
         form.removeButton('custpage_mex');
      }
      }
         if(role == 1108){
         form.removeButton('custpage_mex');
      }
}
