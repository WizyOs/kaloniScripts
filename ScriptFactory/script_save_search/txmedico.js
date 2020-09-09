function txmedico(){
    var count='';
    var location='';
    var revresults = nlapiSearchRecord ('calendarevent','customsearch2982'); // Script tx medico
  	if(revresults != null)
    {
      for(var z=0; z<revresults.length; z++)
      {
        var result1=revresults[z];
        var column1=result1.getAllColumns();
        var sucursal =result1.getText(column1[1]);
        count =result1.getValue(column1[0]);
         if(sucursal=='Santa Fe KHG'){
         location = nlapiLoadRecord('location',21);//santa fe
         location.setFieldValue('custrecord12', count);//tx medico
         nlapiSubmitRecord(location, true);
           continue;
         }

         if(sucursal=='Altavista KHG'){
         location = nlapiLoadRecord('location',22);//altavista
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }

          if(sucursal=='Guadalajara KHG'){
         location = nlapiLoadRecord('location',23);//guadalajara
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Monterrey KHG'){
         location = nlapiLoadRecord('location',24);//monterrey
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Polanco KHG'){
         location = nlapiLoadRecord('location',25);//polanco
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Satelite KHG'){
         location = nlapiLoadRecord('location',26);//satelite
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Tijuana KHG'){
         location = nlapiLoadRecord('location',27);//tijuana
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Veracruz KHG'){
         location = nlapiLoadRecord('location',28);//veracruz
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
         if(sucursal=='Bogota'){
         location = nlapiLoadRecord('location',31);//bogota
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
         if(sucursal=='São Paulo'){
         location = nlapiLoadRecord('location',34);//Sao paulo
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
         if(sucursal=='Can-Cun KHG'){
         location = nlapiLoadRecord('location',35);//can-cun
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Chihuahua KHG'){
         location = nlapiLoadRecord('location',36);//chihuahua
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Puebla KHG'){
         location = nlapiLoadRecord('location',37);//puebla
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         } 
         if(sucursal=='Madrid'){
         location = nlapiLoadRecord('location',39);//madrid españa
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
        if(sucursal=='Dallas'){
         location = nlapiLoadRecord('location',40);//kaloni USA
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          /*if(sucursal==''){
         location = nlapiLoadRecord('location',41);//VIENA
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         } */
         if(sucursal=='Medellin'){
         location = nlapiLoadRecord('location',42);//MEDELLIN
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
          if(sucursal=='Santo Domingo'){
         location = nlapiLoadRecord('location',45);//Santo Domingo
         location.setFieldValue('custrecord12', count);
         nlapiSubmitRecord(location, true);
          continue;
         }
     }
    }
}






