function asignadosKcenter(){
    var count='';
    var campo1='';var campo2='';var campo3='';var campo4='';var campo5='';var campo6='';var campo7='';var campo8='';var campo9='';var campo10='';var campo11='';var campo12='';var campo13='';var campo14='';var campo15='';var campo16='';var campo17='';var campo18='';var campo19='';var campo20='';var campo21='';var campo22='';var campo23='';var campo24='';var campo25='';var campo26='';var campo27='';var campo28='';var campo29='';var campo30='';var campo31='';
    var revresults = nlapiSearchRecord('customer','customsearch3007');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var kcenter =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(kcenter=='Esther Lew Finkelstein khg'){
       campo1 = nlapiLoadRecord('employee', '62841');//numero_empleado
       campo1.setFieldValue('custentity117', count);//vac
       nlapiSubmitRecord(campo1, true);
       continue;
     }
      if(kcenter=='Eric Melchor Alvinez'){
       campo2 = nlapiLoadRecord('employee', '369273');//numero_empleado
       campo2.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo2, true);
       continue;
     }
      if(kcenter=='Veronica Morales Camacho KHG'){
       campo3 = nlapiLoadRecord('employee', '62843');//numero_empleado
       campo3.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo3, true);
       continue;
     }
      if(kcenter=='Veronica Pineda Villegas khg'){
       campo4 = nlapiLoadRecord('employee', '62840');//numero_empleado
       campo4.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo4, true);
       continue;
     }
      if(kcenter=='Sesachia Berenice Grimaldo Rios'){
       campo5 = nlapiLoadRecord('employee', '574797');//numero_empleado
       campo5.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo5, true);
       continue;
     }
      if(kcenter=='Maria Elena Garcia Martinez KHG'){
       campo6 = nlapiLoadRecord('employee', '134654');//numero_empleado
       campo6.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo6, true);
       continue;
     }
      if(kcenter=='Andrea Leon Osornio KHG'){
       campo7 = nlapiLoadRecord('employee', '134651');//numero_empleado
       campo7.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo7, true);
       continue;
     }
      if(kcenter=='Juan de Dios Casco Urrutia'){
       campo8 = nlapiLoadRecord('employee', '598010');//numero_empleado
       campo8.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo8, true);
       continue;
     }
      if(kcenter=='Mateo Macedo khg'){
       campo9 = nlapiLoadRecord('employee', '552029');//numero_empleado
       campo9.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo9, true);
       continue;
     }
      if(kcenter=='Edgar Rene Santiago Lopez'){
       campo10 = nlapiLoadRecord('employee', '598016');//numero_empleado
       campo10.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo10, true);
       continue;
     }
      if(kcenter=='Kaloni Web'){
       campo11 = nlapiLoadRecord('employee', '198528');//numero_empleado
       campo11.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo11, true);
       continue;
      }
       if(kcenter=='Daniel Mauricio  Miguez'){
       campo12 = nlapiLoadRecord('employee', '505088');//numero_empleado
       campo12.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo12, true);
       continue;
    }
       if(kcenter=='Luis Antonio  Morales Camacho'){
       campo13 = nlapiLoadRecord('employee', '389114');//numero_empleado
       campo13.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo13, true);
       continue;
    }
      if(kcenter=='Andrea Martinez Avila'){
       campo14 = nlapiLoadRecord('employee', '293992');//numero_empleado
       campo14.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo14, true);
       continue;
    }
      if(kcenter=='Jose Manuel Borja Castro'){
       campo15 = nlapiLoadRecord('employee', '598011');//numero_empleado
       campo15.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo15, true);
       continue;
    }
      if(kcenter=='Jorge Julio Alvarado Chavez'){
       campo16 = nlapiLoadRecord('employee', '562921');//numero_empleado
       campo16.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo16, true);
       continue;
    }
       if(kcenter=='Andres Mote Rivera'){
       campo17 = nlapiLoadRecord('employee', '598012');//numero_empleado
       campo17.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo17, true);
       continue;
    }
       if(kcenter=='Martha Belen Cordero Mondragon'){
       campo18 = nlapiLoadRecord('employee', '302101');//numero_empleado
       campo18.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo18, true);
       continue;
    }
       if(kcenter=='Clara Jurado Torres'){
       campo19 = nlapiLoadRecord('employee', '328927');//numero_empleado
       campo19.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo19, true);
       continue;
    }
       if(kcenter=='Valeria Italia Morales Parral'){
       campo20 = nlapiLoadRecord('employee', '62889');//numero_empleado
       campo20.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo20, true);
       continue;
    }
       if(kcenter=='Aura Elena Valencia Vazquez'){
       campo21 = nlapiLoadRecord('employee', '62884');//numero_empleado
       campo21.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo21, true);
       continue;
    }
       if(kcenter=='Lucia Hernandez PerezCasas'){
       campo22 = nlapiLoadRecord('employee', '459787');//numero_empleado
       campo22.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo22, true);
       continue;
    }
       if(kcenter=='Edith Nallely Garcia Torres'){
       campo23 = nlapiLoadRecord('employee', '123405');//numero_empleado
       campo23.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo23, true);
       continue;
    }
       if(kcenter=='Nataly Zapata Flores'){
       campo24 = nlapiLoadRecord('employee', '62879');//numero_empleado
       campo24.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo24, true);
       continue;
    }
       if(kcenter=='Rosa Najera Gonzalez'){
       campo25 = nlapiLoadRecord('employee', '62887');//numero_empleado
       campo25.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo25, true);
       continue;
    }
       if(kcenter=='Jessica Ochoa Mayo'){
       campo26 = nlapiLoadRecord('employee', '62893');//numero_empleado
       campo26.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo26, true);
       continue;
    }
       if(kcenter=='Andrea Nohemi Treviño Robles'){
       campo27 = nlapiLoadRecord('employee', '62891');//numero_empleado
       campo27.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo27, true);
       continue;
    }
       if(kcenter=='Yuliana Rios Martinez'){
       campo28 = nlapiLoadRecord('employee', '472766');//numero_empleado
       campo28.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo28, true);
       continue;
    }
       if(kcenter=='Maria Irene Mata Olvera KHG'){
       campo29 = nlapiLoadRecord('employee', '62855');//numero_empleado
       campo29.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo29, true);
       continue;
    }
       if(kcenter=='Daniela Aguilar Morales'){
       campo30 = nlapiLoadRecord('employee', '610477');//numero_empleado
       campo30.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo30, true);
       continue;
    }
       if(kcenter=='Nataly Zapata Flores'){
       campo31 = nlapiLoadRecord('employee', '62879');//numero_empleado
       campo31.setFieldValue('custentity117', count);
       nlapiSubmitRecord(campo31, true);
       continue;
    }
   }
}

