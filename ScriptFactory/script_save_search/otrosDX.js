function otrosDX(){
    var sucursal1 = 'Santa Fe KHG';
    var sucursal2 = 'Altavista KHG';
    var sucursal3 = 'Guadalajara KHG';
    var sucursal4 = 'Monterrey KHG';
    var sucursal5 = 'Polanco KHG';
    var sucursal6 = 'Satelite KHG';
    var sucursal7 = 'Tijuana KHG';
    var sucursal8 = 'Veracruz KHG';
    var sucursal9 = 'Bogota';
    var sucursal10 = 'São Paulo';
    var sucursal11 = 'Can-Cun KHG';
    var sucursal12 = 'Chihuahua KHG';
    var sucursal13 = 'Puebla KHG';
    var sucursal14 = 'Madrid';
    var sucursal15 = 'Medellin';
    var sucursal16 = 'Santo Domingo';
  	var sucursal17 = 'Velazquez';
    var count='';
    var location='';
    /*BÚSQUEDA biopsia*/
    var revresults = nlapiSearchRecord ('calendarevent','customsearch2979');
    for(var z=0; z<revresults.length; z++) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var sucursal =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
    if(sucursal==sucursal1){
     location = nlapiLoadRecord('location',21);//santa fe
     location.setFieldValue('custrecord13', count);//biopsia
     nlapiSubmitRecord(location, true);
       continue;
     }

     if(sucursal==sucursal2){
     location = nlapiLoadRecord('location',22);//altavista
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }

      if(sucursal==sucursal3){
     location = nlapiLoadRecord('location',23);//guadalajara
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal4){
     location = nlapiLoadRecord('location',24);//monterrey
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal5){
     location = nlapiLoadRecord('location',25);//polanco
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal6){
     location = nlapiLoadRecord('location',26);//satelite
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal7){
     location = nlapiLoadRecord('location',27);//tijuana
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal8){
     location = nlapiLoadRecord('location',28);//veracruz
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
     if(sucursal==sucursal9){
     location = nlapiLoadRecord('location',31);//bogota
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
     if(sucursal==sucursal10){
     location = nlapiLoadRecord('location',34);//Sao paulo
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
     if(sucursal==sucursal11){
     location = nlapiLoadRecord('location',35);//can-cun
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal12){
     location = nlapiLoadRecord('location',36);//chihuahua
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
      if(sucursal==sucursal13){
     location = nlapiLoadRecord('location',37);//puebla
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     } 
     if(sucursal==sucursal14){
     location = nlapiLoadRecord('location',39);//madrid españa
     location.setFieldValue('custrecord13', count);
     nlapiSubmitRecord(location, true);
      continue;
     }
     if(sucursal==sucursal15){
       location = nlapiLoadRecord('location',42);//MEDELLIN
       location.setFieldValue('custrecord13', count);
       nlapiSubmitRecord(location, true);
       continue;
     }
     if(sucursal==sucursal16){
       location = nlapiLoadRecord('location',45);//Santo Domingo
       location.setFieldValue('custrecord13', count);
       nlapiSubmitRecord(location, true);
       continue;
     }
      if(sucursal==sucursal17){
       location = nlapiLoadRecord('location',46);//Velazquez
       location.setFieldValue('custrecord13', count);
       nlapiSubmitRecord(location, true);
       continue;
     }
   }
   /*BÚSQUEDA intensivo*/
   var revresults = nlapiSearchRecord ('calendarevent','customsearch2983');
   for(var z=0; z<revresults.length; z++) {

       var result1=revresults[z];
       var column1=result1.getAllColumns();
       var sucursal =result1.getText(column1[1]);
       count =result1.getValue(column1[0]);
      if(sucursal==sucursal1){
      location = nlapiLoadRecord('location',21);//santa fe
      location.setFieldValue('custrecord16', count);//intensivo
      nlapiSubmitRecord(location, true);
        continue;
      }

      if(sucursal==sucursal2){
      location = nlapiLoadRecord('location',22);//altavista
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }

       if(sucursal==sucursal3){
      location = nlapiLoadRecord('location',23);//guadalajara
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal4){
      location = nlapiLoadRecord('location',24);//monterrey
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal5){
      location = nlapiLoadRecord('location',25);//polanco
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal6){
      location = nlapiLoadRecord('location',26);//satelite
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal7){
      location = nlapiLoadRecord('location',27);//tijuana
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal8){
      location = nlapiLoadRecord('location',28);//veracruz
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal9){
      location = nlapiLoadRecord('location',31);//bogota
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal10){
      location = nlapiLoadRecord('location',34);//Sao paulo
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal11){
      location = nlapiLoadRecord('location',35);//can-cun
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal12){
      location = nlapiLoadRecord('location',36);//chihuahua
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal13){
      location = nlapiLoadRecord('location',37);//puebla
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      } 
      if(sucursal==sucursal14){
      location = nlapiLoadRecord('location',39);//madrid españa
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal15){
      location = nlapiLoadRecord('location',42);//MEDELLIN
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
     if(sucursal==sucursal16){
      location = nlapiLoadRecord('location',45);//Santo Domingo
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
     if(sucursal==sucursal17){
      location = nlapiLoadRecord('location',46);//Velazquez
      location.setFieldValue('custrecord16', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      }
   /*BÚSQUEDA mantenimiento*/
    var revresults = nlapiSearchRecord ('calendarevent','customsearch2980');
   for(var z=0; z<revresults.length; z++) {
       var result1=revresults[z];
       var column1=result1.getAllColumns();
       var sucursal =result1.getText(column1[1]);
       count =result1.getValue(column1[0]);
      if(sucursal==sucursal1){
      location = nlapiLoadRecord('location',21);//santa fe
      location.setFieldValue('custrecord17', count);//mantenimiento
      nlapiSubmitRecord(location, true);
        continue;
      }
      if(sucursal==sucursal2){
      location = nlapiLoadRecord('location',22);//altavista
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal3){
      location = nlapiLoadRecord('location',23);//guadalajara
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal4){
      location = nlapiLoadRecord('location',24);//monterrey
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal5){
      location = nlapiLoadRecord('location',25);//polanco
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal6){
      location = nlapiLoadRecord('location',26);//satelite
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal7){
      location = nlapiLoadRecord('location',27);//tijuana
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal8){
      location = nlapiLoadRecord('location',28);//veracruz
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal9){
      location = nlapiLoadRecord('location',31);//bogota
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal10){
      location = nlapiLoadRecord('location',34);//Sao paulo
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal11){
      location = nlapiLoadRecord('location',35);//can-cun
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal12){
      location = nlapiLoadRecord('location',36);//chihuahua
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal13){
      location = nlapiLoadRecord('location',37);//puebla
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      } 
      if(sucursal==sucursal14){
      location = nlapiLoadRecord('location',39);//madrid españa
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal15){
      location = nlapiLoadRecord('location',42);//MEDELLIN
      location.setFieldValue('custrecord17', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal16){
        location = nlapiLoadRecord('location',45);//Santo Domingo
        location.setFieldValue('custrecord17', count);
        nlapiSubmitRecord(location, true);
         continue;
      }
      if(sucursal==sucursal17){
        location = nlapiLoadRecord('location',46);//Velazquez
        location.setFieldValue('custrecord17', count);
        nlapiSubmitRecord(location, true);
         continue;
      }
    }
   /*BÚSQUEDA protesis*/
   var revresults = nlapiSearchRecord ('calendarevent','customsearch2981');
   for(var z=0; z<revresults.length; z++) {
       var result1=revresults[z];
       var column1=result1.getAllColumns();
       var sucursal =result1.getText(column1[1]);
       count =result1.getValue(column1[0]);
      if(sucursal==sucursal1){
      location = nlapiLoadRecord('location',21);//santa fe
      location.setFieldValue('custrecord154', count);//mantenimiento
      nlapiSubmitRecord(location, true);
        continue;
      }
      if(sucursal==sucursal2){
      location = nlapiLoadRecord('location',22);//altavista
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal3){
      location = nlapiLoadRecord('location',23);//guadalajara
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal4){
      location = nlapiLoadRecord('location',24);//monterrey
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal5){
      location = nlapiLoadRecord('location',25);//polanco
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal6){
      location = nlapiLoadRecord('location',26);//satelite
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal7){
      location = nlapiLoadRecord('location',27);//tijuana
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal8){
      location = nlapiLoadRecord('location',28);//veracruz
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal9){
      location = nlapiLoadRecord('location',31);//bogota
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal10){
      location = nlapiLoadRecord('location',34);//Sao paulo
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal11){
      location = nlapiLoadRecord('location',35);//can-cun
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal12){
      location = nlapiLoadRecord('location',36);//chihuahua
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal13){
      location = nlapiLoadRecord('location',37);//puebla
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      } 
      if(sucursal==sucursal14){
      location = nlapiLoadRecord('location',39);//madrid españa
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal15){
      location = nlapiLoadRecord('location',42);//MEDELLIN
      location.setFieldValue('custrecord154', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal16){
        location = nlapiLoadRecord('location',45);//Santo Domingo
        location.setFieldValue('custrecord154', count);
        nlapiSubmitRecord(location, true);
         continue;
      }
     if(sucursal==sucursal17){
        location = nlapiLoadRecord('location',46);//Velazquez
        location.setFieldValue('custrecord154', count);
        nlapiSubmitRecord(location, true);
         continue;
      }
    }
   /*BÚSQUEDA txmedico*/
   var revresults = nlapiSearchRecord ('calendarevent','customsearch2982');
   for(var z=0; z<revresults.length; z++) {

       var result1=revresults[z];
       var column1=result1.getAllColumns();
       var sucursal =result1.getText(column1[1]);
       count =result1.getValue(column1[0]);
      if(sucursal==sucursal1){
      location = nlapiLoadRecord('location',21);//santa fe
      location.setFieldValue('custrecord12', count);//tx medico
      nlapiSubmitRecord(location, true);
        continue;
      }
       if(sucursal==sucursal2){
      location = nlapiLoadRecord('location',22);//altavista
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal3){
      location = nlapiLoadRecord('location',23);//guadalajara
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal4){
      location = nlapiLoadRecord('location',24);//monterrey
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal5){
      location = nlapiLoadRecord('location',25);//polanco
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal6){
      location = nlapiLoadRecord('location',26);//satelite
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal7){
      location = nlapiLoadRecord('location',27);//tijuana
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal8){
      location = nlapiLoadRecord('location',28);//veracruz
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal9){
      location = nlapiLoadRecord('location',31);//bogota
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal10){
      location = nlapiLoadRecord('location',34);//Sao paulo
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal11){
      location = nlapiLoadRecord('location',35);//can-cun
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal12){
      location = nlapiLoadRecord('location',36);//chihuahua
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
       if(sucursal==sucursal13){
      location = nlapiLoadRecord('location',37);//puebla
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      } 
      if(sucursal==sucursal14){
      location = nlapiLoadRecord('location',39);//madrid españa
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal15){
      location = nlapiLoadRecord('location',42);//MEDELLIN
      location.setFieldValue('custrecord12', count);
      nlapiSubmitRecord(location, true);
       continue;
      }
      if(sucursal==sucursal16){
        location = nlapiLoadRecord('location',45);//Santo Domingo
        location.setFieldValue('custrecord12', count);
        nlapiSubmitRecord(location, true);
         continue;
      }
     if(sucursal==sucursal17){
        location = nlapiLoadRecord('location',46);//Velazquez
        location.setFieldValue('custrecord12', count);
        nlapiSubmitRecord(location, true);
         continue;
      }
   }
}






