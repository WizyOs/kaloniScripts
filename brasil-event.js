function onClick(type, form)
{
// form.addButton('custpage_br', 'Atualização Exp. Brasil','fxn_generatePDF_brasil()');

  form.setScript('customscript_brasil_client');
  var subsidiary = nlapiGetFieldValue('subsidiary');
 /*
  if(subsidiary!='11'){
     form.removeButton('custpage_br');
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
      */
}


