function campoPersonalizadoK(){
    var count1='';
    var campo1='';
    var revresults1 = nlapiSearchRecord('calendarevent','customsearch2976');
  for(var z1 in revresults1 ) {
      var result11=revresults1[z1];
      var column11=result11.getAllColumns();
      var consultor1 =result11.getText(column11[1]);
      count1 =result11.getValue(column11[0]);
      if(consultor1=='Cynthia Ancona Ahumada KHG'){
        var amount = nlapiGetCurrentLineItemValue('item', 'Personalizado');
    	nlapiSetCurrentLineItemValue('item', 'custentity117', amount);
    	continue;
     }
   }
}

