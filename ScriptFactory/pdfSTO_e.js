function onClick(type, form)
{
// form.addButton('custpage_sto', 'Actualizar Exp. STO','sto_generatePDF()');

  form.setScript('customscript_pdf_sto');

var subsidiary = nlapiGetFieldValue('subsidiary');
   /*if(subsidiary!='16'){
     form.removeButton('custpage_sto');
  }*/
  var role = nlapiGetContext().getRole();
      if(role == 1094){
         form.removeButton('custpage_colom');
        if(role == 1102){
         form.removeButton('custpage_colom');
 
      }
      }
         if(role == 1098){
         form.removeButton('custpage_colom');
      
      }
}


