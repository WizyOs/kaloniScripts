function valEmpVAC(){
    var count='';
    var campo1='';var campo2='';var campo3='';var campo4='';var campo5='';var campo6='';var campo7='';var campo8='';var campo9='';var campo10='';var campo11='';var campo12='';var campo13='';var campo14='';
    var revresults = nlapiSearchRecord('calendarevent','customsearch2976');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor=='Cynthia Ancona Ahumada KHG'){
       campo1 = nlapiLoadRecord('employee', '77721');//numero_empleado
       campo1.setFieldValue('custentity304', count);//vac
       nlapiSubmitRecord(campo1, true);
       continue;
     }
      if(consultor=='Karen Cardenas Durban'){
       campo2 = nlapiLoadRecord('employee', '99005');//numero_empleado
       campo2.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo2, true);
       continue;
     }
      if(consultor=='Georgina Soto Robles'){
       campo3 = nlapiLoadRecord('employee', '165101');//numero_empleado
       campo3.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo3, true);
       continue;
     }
      if(consultor=='Gilda Monserrat Mosqueda Elizondo'){
       campo4 = nlapiLoadRecord('employee', '585340');//numero_empleado
       campo4.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo4, true);
       continue;
     }
      if(consultor=='Paulina Asiain Loya'){
       campo5 = nlapiLoadRecord('employee', '385113');//numero_empleado
       campo5.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo5, true);
       continue;
     }
      if(consultor=='Maria Monica Huerta Lichtenberg khg'){
       campo6 = nlapiLoadRecord('employee', '62854');//numero_empleado
       campo6.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo6, true);
       continue;
     }
      if(consultor=='Sergio Barba Cano'){
       campo7 = nlapiLoadRecord('employee', '279069');//numero_empleado
       campo7.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo7, true);
       continue;
     }
      if(consultor=='Silvia Maela de la Torre Gutierrez khg'){
       campo8 = nlapiLoadRecord('employee', '62853');//numero_empleado
       campo8.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo8, true);
       continue;
     }
      if(consultor=='Ana Paula De la Concha Enriquez'){
       campo9 = nlapiLoadRecord('employee', '310228');//numero_empleado
       campo9.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo9, true);
       continue;
     }
      if(consultor=='Carlos De la Garza Esquer'){
       campo10 = nlapiLoadRecord('employee', '489559');//numero_empleado
       campo10.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo10, true);
       continue;
     }
      if(consultor=='Paulina Rizo Frias'){
       campo11 = nlapiLoadRecord('employee', '585337');//numero_empleado
       campo11.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo11, true);
       continue;
     }
      if(consultor=='Alejandra Lopez Sanguino'){
       campo12 = nlapiLoadRecord('employee', '432739');//numero_empleado
       campo12.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo12, true);
       continue;
     }
      if(consultor=='Ricardo Valdez Martinez'){
       campo13 = nlapiLoadRecord('employee', '127021');//numero_empleado
       campo13.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo13, true);
       continue;
     }
      if(consultor=="Yolanda Lozano Jimenez"){
       campo14 = nlapiLoadRecord('employee', '574785');//numero_empleado
       campo14.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo14, true);
       continue;
     }
   }
}

