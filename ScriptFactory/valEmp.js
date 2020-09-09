function valEmp(){
    var count='';
    var campo1='';
    var campo2='';
    var revresults = nlapiSearchRecord('calendarevent','customsearch2976');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor=='Cynthia Ancona Ahumada KHG'){
       campo1 = nlapiLoadRecord('employee', '77721);//numero_empleado
       campo1.setFieldValue('comments', count);//comments
       campo2= nlapiLoadRecord('employee', '77721');//comentarios
       campo2.setFieldValue('custentity116', count);//comments
       nlapiSubmitRecord(campo1, true);
       nlapiSubmitRecord(campo2, true);
       continue;
     }
   }
}

