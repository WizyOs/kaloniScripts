function valEmp(){
    var count='';
    var campo1='';
    var campo2='';
    var campo3='';
    var revresults = nlapiSearchRecord ('employee','customsearch2976');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor=='Cynthia Ancona Ahumada KHG'){
       campo1 = nlapiLoadRecord('employee', 'custentity116');//comentarios
       campo1.setFieldValue('custentity116', count);//comments
        campo2 = nlapiLoadRecord('employee', 'comments');//comentarios
       campo2.setFieldValue('comments', count);//comments
           campo3= nlapiLoadRecord('employee', 'comments');//comentarios
        campo3.setFieldValue('custrecord153', count);//comments
       nlapiSubmitRecord(campo1, true);
        nlapiSubmitRecord(campo2, true);
        nlapiSubmitRecord(campo3, true);
         continue;
     }
   }
}

