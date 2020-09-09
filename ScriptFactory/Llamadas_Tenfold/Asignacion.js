////////////////////Busqueda de todos los 14 Ejecutivos mx y total de leeds a actualizar dependiendo su status on u off////////////  
 function Asignacion(){
    var campo1='';var campo2='';var campo3='';var campo4='';var campo5='';
  	var campo6='';var campo7='';var campo8='';var campo9='';var campo10='';var campo11='';
  	var campo12='';var campo13='';var campo14='';var campo15='';var campo16='';
    var revresults = nlapiSearchRecord('customer','customsearch3247');
for(var z in revresults){
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var ejecutivo=result1.getText(column1[2]);
      var lead=result1.getValue(column1[0]);

if(ejecutivo=='Adrian Garcia Velazquez'){
       campo1 = nlapiLoadRecord('employee', '619862');
       var statusE1 = nlapiLoadRecord('employee', '619862').getFieldValue('employeestatus');
       var lead1 = nlapiLoadRecord('customer', lead);
           lead1.setFieldValue('custentity295', statusE1);
           nlapiSubmitRecord(lead1, true);
       continue;
        //idList 139
      }
if(ejecutivo=='Andrea Leon Osornio' || ejecutivo=='Andrea Leon Osornio KHG'){
     campo2 = nlapiLoadRecord('employee', '134651');
     var statusE2 = nlapiLoadRecord('employee', '134651').getFieldValue('employeestatus');
     var lead2 = nlapiLoadRecord('customer', lead);
     lead2.setFieldValue('custentity295', statusE2);
     nlapiSubmitRecord(lead2, true);
     continue;
        //idList 39
     }
if(ejecutivo=='Andrea Martinez Avila'){
       campo3 = nlapiLoadRecord('employee', '293992');
       var statusE3 = nlapiLoadRecord('employee', '293992').getFieldValue('employeestatus');
       var lead3 = nlapiLoadRecord('customer', lead);
           lead3.setFieldValue('custentity295', statusE3);
           nlapiSubmitRecord(lead3, true);
       continue;
       //idList 66
      }
   if(ejecutivo=='Andres Mote Rivera'){
     campo4 = nlapiLoadRecord('employee', '598012');
     var statusE4 = nlapiLoadRecord('employee', '598012').getFieldValue('employeestatus');
     var lead4 = nlapiLoadRecord('customer', lead);
      lead4.setFieldValue('custentity295', statusE4);
     nlapiSubmitRecord(lead4, true);
     continue;
        //idList 134
    }
  if(ejecutivo=='Edgar Rene Santiago Lopez'){
       campo5 = nlapiLoadRecord('employee', '598016');
       var statusE5 = nlapiLoadRecord('employee', '598016').getFieldValue('employeestatus');
       var lead5 = nlapiLoadRecord('customer', lead);
           lead5.setFieldValue('custentity295', statusE5);
           nlapiSubmitRecord(lead5, true);
       continue;
       //idList 132
      }
if(ejecutivo=='Erick Melchor Albines' || ejecutivo=='Eric Melchor Alvinez'){
       campo6 = nlapiLoadRecord('employee', '369273');
 	   var statusE6 = nlapiLoadRecord('employee', '369273').getFieldValue('employeestatus');
       var lead6 = nlapiLoadRecord('customer', lead);
           lead6.setFieldValue('custentity295', statusE6);
           nlapiSubmitRecord(lead6, true);
       continue;
        //idList 78
      }
 if(ejecutivo=='Esther Lew Finkelstein' || ejecutivo=='Esther Lew Finkelstein khg'){
       campo7 = nlapiLoadRecord('employee', '62841');
       var statusE7 = nlapiLoadRecord('employee', '62841').getFieldValue('employeestatus');
       var lead7 = nlapiLoadRecord('customer', lead);
           lead7.setFieldValue('custentity295', statusE7);
           nlapiSubmitRecord(lead7, true);
       continue;
       //idList 3
      }
 if(ejecutivo=='Jose Manuel Borja Castro'){
    campo8 = nlapiLoadRecord('employee', '598011');
     var statusE8 = nlapiLoadRecord('employee', '598011').getFieldValue('employeestatus');
      var lead8 = nlapiLoadRecord('customer', lead);
       lead8.setFieldValue('custentity295', statusE8);
       nlapiSubmitRecord(lead8, true);
       continue;
        //idList 130
     }
  if(ejecutivo=='Juan de Dios Casco Urrutia'){
     campo9 = nlapiLoadRecord('employee', '598010');
      var statusE9 = nlapiLoadRecord('employee', '598010').getFieldValue('employeestatus');
      var lead9 = nlapiLoadRecord('customer', lead);
       lead9.setFieldValue('custentity295', statusE9);
         nlapiSubmitRecord(lead9, true);
       continue;
        //idList 129
     }
if(ejecutivo=='Kaloni Web'){
     campo10 = nlapiLoadRecord('employee', '198528');
      var statusE10 = nlapiLoadRecord('employee', '198528').getFieldValue('employeestatus');
      var lead10 = nlapiLoadRecord('customer', lead);
       lead10.setFieldValue('custentity295', statusE10);
         nlapiSubmitRecord(lead10, true);
       continue;
  //119
     }
 if(ejecutivo=='Luis Antonio Morales Camacho'){
       campo11 = nlapiLoadRecord('employee', '389114');
       var statusE11 = nlapiLoadRecord('employee', '389114').getFieldValue('employeestatus');
       var lead11 = nlapiLoadRecord('customer', lead);
           lead11.setFieldValue('custentity295', statusE11);
           nlapiSubmitRecord(lead11, true);
       continue;
       //idList 80
      }
 if(ejecutivo=='Maria Elena García Martinez' || ejecutivo=='Maria Elena Garcia Martinez KHG'){
       campo12 = nlapiLoadRecord('employee', '134654');
       var statusE12 = nlapiLoadRecord('employee', '134654').getFieldValue('employeestatus');
       var lead12 = nlapiLoadRecord('customer', lead);
           lead12.setFieldValue('custentity295', statusE12);
           nlapiSubmitRecord(lead12, true);
       continue;
       //idList 38
      }
 if(ejecutivo=='Maria Fernanda Perez Varela'){
       campo13 = nlapiLoadRecord('employee', '619863');
       var statusE13 = nlapiLoadRecord('employee', '619863').getFieldValue('employeestatus');
       var lead13 = nlapiLoadRecord('customer', lead);
           lead13.setFieldValue('custentity295', statusE13);
           nlapiSubmitRecord(lead13, true);
       continue;
       //idList 140
      }
 if(ejecutivo=='Mateo Macedo' || ejecutivo=='Mateo Macedo khg' ){
       campo14 = nlapiLoadRecord('employee', '552029');
       var statusE14 = nlapiLoadRecord('employee', '552029').getFieldValue('employeestatus');
       var lead14 = nlapiLoadRecord('customer', lead);
           lead14.setFieldValue('custentity295', statusE14);
           nlapiSubmitRecord(lead14, true);
       continue;
       //idList 118
      }
  if(ejecutivo=='Veronica Morales Camacho' || ejecutivo=='Veronica Morales Camacho KHG'){
       campo15 = nlapiLoadRecord('employee', '62843');
       var statusE15 = nlapiLoadRecord('employee', '62843').getFieldValue('employeestatus');
       var lead15 = nlapiLoadRecord('customer', lead);
           lead15.setFieldValue('custentity295', statusE15);
           nlapiSubmitRecord(lead15, true);
       continue;
       //idList 6
      }
 if(ejecutivo=='Daniel Mauricio Miguez'){
       campo16 = nlapiLoadRecord('employee', '505088');
       var statusE16 = nlapiLoadRecord('employee', '505088').getFieldValue('employeestatus');
       var lead16 = nlapiLoadRecord('customer', lead);
           lead16.setFieldValue('custentity295', statusE16);
           nlapiSubmitRecord(lead16, true);
       continue;
       //idList 108
      }
	//}
//}
