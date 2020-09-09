function onClick(type, form)
{
  if(type == "view"){
     // form.addButton('custpage_mex2', 'Actualizar Exp2.','fxn_generatePDF()');

  form.setScript('customscript1026');

var subsidiary = nlapiGetFieldValue('subsidiary');
   if(subsidiary!='6'){
     form.removeButton('custpage_mex2');
  }
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
}


