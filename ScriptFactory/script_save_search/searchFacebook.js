function searchFacebook(){
    var fuente = '00166 Campaña Facebook Mx';
    var count='';
    var location='';
    /*Valoraciones Agendadas facebook*/
    var revresults = nlapiSearchRecord ('calendarevent','customsearch3242');
    for(var z=0; z<revresults.length; z++) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var sucursal =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
    if(sucursal==fuente){
     location = nlapiLoadRecord('location',44);//Test Face
     location.setFieldValue('custrecord6', count);//Valoraciones Agendadas
     nlapiSubmitRecord(location, true);
       continue;
     }
   }
   /*Valoraciones efectivas facebook*/
   var revresults = nlapiSearchRecord ('calendarevent','customsearch3241');
   for(var z=0; z<revresults.length; z++) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var sucursal =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
    if(sucursal==fuente){
     location = nlapiLoadRecord('location',44);//Test Face
     location.setFieldValue('custrecord7', count);//Val Efectivas
     nlapiSubmitRecord(location, true);
       continue;
     }
    }
   /*Leads Facebook*/
   var revresults = nlapiSearchRecord ('customer','customsearch3243');
   for(var z=0; z<revresults.length; z++) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var sucursal =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
    if(sucursal==fuente){
     location = nlapiLoadRecord('location',44);//Test Face
     location.setFieldValue('custrecord31', count);//Leads
     nlapiSubmitRecord(location, true);
       continue;
     }
    }
}






