function valagendadas(){
    var count='';
    var location='';
    var revresults = nlapiSearchRecord ('calendarevent','customsearch987');
for(var z=0; z<revresults.length; z++) {

    var result1=revresults[z];
    var column1=result1.getAllColumns();
    var sucursal =result1.getText(column1[1]);
    count =result1.getValue(column1[0]);
   if(sucursal=='Valoración SFE 1 KHG'){
   location = nlapiLoadRecord('location',21);//santa fe
   location.setFieldValue('custrecord6', count);//valoraciones agendades
   nlapiSubmitRecord(location, true);
     continue;
   }

   if(sucursal=='Valoraciones Altavista KHG'){
   location = nlapiLoadRecord('location',22);//altavista
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }

    if(sucursal=='Valoraciones Guadalajara KHG'){
   location = nlapiLoadRecord('location',23);//guadalajara
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoración Monterrey KHG'){
   location = nlapiLoadRecord('location',24);//monterrey
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoraciones Polanco KHG'){
   location = nlapiLoadRecord('location',25);//polanco
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoraciones Satelite KHG'){
   location = nlapiLoadRecord('location',26);//satelite
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoración Tijuana KHG'){
   location = nlapiLoadRecord('location',27);//tijuana
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoraciones Veracruz KHG'){
   location = nlapiLoadRecord('location',28);//veracruz
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
   if(sucursal=='Valoraciones Colombia'){
   location = nlapiLoadRecord('location',31);//bogota
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
   if(sucursal=='Valoraciones Brasil khg'){
   location = nlapiLoadRecord('location',34);//Sao paulo
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
   if(sucursal=='Valoraciones Can Cun KHG'){
   location = nlapiLoadRecord('location',35);//can-cun
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoraciones Chihuahua KHG'){
   location = nlapiLoadRecord('location',36);//chihuahua
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
    if(sucursal=='Valoraciones Puebla KHG'){
   location = nlapiLoadRecord('location',37);//puebla
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   } 
   if(sucursal=='Valoraciones España'){
   location = nlapiLoadRecord('location',39);//madrid españa
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   }
 /*  if(sucursal==''){
   location = nlapiLoadRecord('location',40);//kaloni USA
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   } 
   if(sucursal==''){
   location = nlapiLoadRecord('location',41);//VIENA
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   } */
   if(sucursal=='Medellin'){
   location = nlapiLoadRecord('location',42);//MEDELLIN
   location.setFieldValue('custrecord6', count);
   nlapiSubmitRecord(location, true);
    continue;
   } 

   }

}
















