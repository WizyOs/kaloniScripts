function onClick(type, form)
{
  if (type == 'view'){
    // form.addButton('custpage_mex', 'Actualizar Exp.','fxn_generatePDF()');

  form.setScript('customscript_generarecliente_pdf');

var subsidiary = nlapiGetFieldValue('subsidiary');
   if(subsidiary!='6'){
     form.removeButton('custpage_mex');
  }
  var role = nlapiGetContext().getRole();
      if(role == 1094){
         form.removeButton('custpage_colom');
        if(role == 1102){ ///ROLE ENFERMERI
         form.removeButton('custpage_colom');

      }
      }
         if(role == 1098){
         form.removeButton('custpage_colom');
      }

     var roleA = nlapiGetRole();
 	nlapiLogExecution('DEBUG', 'Role: ', roleA);
    if(roleA == '1102'){
	var button=form.getButton('edit');
		button.setDisabled(true);          //Disable the button in the User Interface
       }
  }
}


