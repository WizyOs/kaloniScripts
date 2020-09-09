function valAgenEmp(){
    var consultor1 = 'Cynthia Ancona Ahumada KHG';
    var consultor2 = 'Karen Cardenas Durban';
    var consultor3 = 'Georgina Soto Robles';
    var consultor4 = 'Gilda Monserrat Mosqueda Elizondo';
    var consultor5 = 'Paulina Asiain Loya';
    var consultor6 = 'Maria Monica Huerta Lichtenberg khg';
    var consultor7 = 'Sergio Barba Cano';
    var consultor8 = 'Silvia Maela de la Torre Gutierrez khg';
    var consultor9 = 'Ana Paula De la Concha Enriquez';
    var consultor10 = 'Carlos De la Garza Esquer';
    var consultor11 = 'Paulina Rizo Frias';
    var consultor12 = 'Alejandra Lopez Sanguino';
    var consultor13 = 'Ricardo Valdez Martinez';
    var consultor14 = 'Yolanda Lozano Jimenez';
    var consultor15 = 'Ximena Olvera Lara';
    var consultor16 = 'Alejandra Sosa Cid';
  	var consultor17 = 'Jose Roberto Avila Avila';
    var consultor18 = 'Priscila Alexis Trejo Landazuri';
    var consultor19 = 'Lucia Alejandra Franco Cisneros';
    var consultor20 = 'Juan Carlos Ortiz Fernandez';
    var consultor21 = 'Karen Cardenas Durban ESP';
    var consultor22 = 'Andreyna Brea Cedeño';
    var consultor23 = 'Aneli Sanchez';

    var empleado1 = '77721';
    var empleado2 = '99005';
    var empleado3 = '165101';
    var empleado4 = '585340';
    var empleado5 = '385113';
    var empleado6 = '62854';
    var empleado7 = '279069';
    var empleado8 = '62853';
    var empleado9 = '310228';
    var empleado10 = '489559';
    var empleado11 = '585337';
    var empleado12 = '432739';
    var empleado13 = '127021';
    var empleado14 = '574785';
  	var empleado15 = '123407';
  	var empleado16 = '625788';
  	var empleado17 = '666006';
  	var empleado18 = '687412';
    var empleado19 = '682835';
    var empleado20 = '687195';
    var empleado21 = '187309';
    var empleado22 = '734394';
    var empleado23 = '735184';
  
    var count='';
    var campo1='';var campo2='';var campo3='';var campo4='';var campo5='';var campo6='';var campo7='';var campo8='';var campo9='';var campo10='';var campo11='';var campo12='';var campo13='';var campo14=''; var campo15=''; var campo16='';var campo17='';var campo18='';var campo19='';var campo20='';var campo21='';var campo22='';var campo23='';
   /*BÚSQUEDA Script ValSuc Emp*/
    var revresults = nlapiSearchRecord('calendarevent','customsearch2976');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor==consultor1){
       campo1 = nlapiLoadRecord('employee', empleado1);//numero_empleado
       campo1.setFieldValue('custentity304', count);//vac
       nlapiSubmitRecord(campo1, true);
       continue;
     }
      if(consultor==consultor2){
       campo2 = nlapiLoadRecord('employee', empleado2);//numero_empleado
       campo2.setFieldValue('custentity304', '0');
       nlapiSubmitRecord(campo2, true);
       continue;
     }
      if(consultor==consultor3){
       campo3 = nlapiLoadRecord('employee', empleado3);//numero_empleado
       campo3.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo3, true);
       continue;
     }
      if(consultor==consultor4){
       campo4 = nlapiLoadRecord('employee', empleado4);//numero_empleado
       campo4.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo4, true);
       continue;
     }
      if(consultor==consultor5){
       campo5 = nlapiLoadRecord('employee', empleado5);//numero_empleado
       campo5.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo5, true);
       continue;
     }
      if(consultor==consultor6){
       campo6 = nlapiLoadRecord('employee', empleado6);//numero_empleado
       campo6.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo6, true);
       continue;
     }
      if(consultor==consultor7){
       campo7 = nlapiLoadRecord('employee', empleado7);//numero_empleado
       campo7.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo7, true);
       continue;
     }
      if(consultor==consultor8){
       campo8 = nlapiLoadRecord('employee', empleado8);//numero_empleado
       campo8.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo8, true);
       continue;
     }
      if(consultor==consultor9){
       campo9 = nlapiLoadRecord('employee', empleado9);//numero_empleado
       campo9.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo9, true);
       continue;
     }
      if(consultor==consultor10){
       campo10 = nlapiLoadRecord('employee', empleado10);//numero_empleado
       campo10.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo10, true);
       continue;
     }
      if(consultor==consultor11){
       campo11 = nlapiLoadRecord('employee', empleado11);//numero_empleado
       campo11.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo11, true);
       continue;
     }
      if(consultor==consultor12){
       campo12 = nlapiLoadRecord('employee', empleado12);//numero_empleado
       campo12.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo12, true);
       continue;
     }
      if(consultor==consultor13){
       campo13 = nlapiLoadRecord('employee', empleado13);//numero_empleado
       campo13.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo13, true);
       continue;
     }
      if(consultor==consultor14){
       campo14 = nlapiLoadRecord('employee', empleado14);//numero_empleado
       campo14.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo14, true);
       continue;
     }
      if(consultor==consultor15){
       campo15 = nlapiLoadRecord('employee', empleado15);//numero_empleado
       campo15.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo15, true);
       continue;
     }
      if(consultor==consultor16){
       campo16 = nlapiLoadRecord('employee', empleado16);//numero_empleado
       campo16.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo16, true);
       continue;
     }
    if(consultor==consultor17){
       campo17 = nlapiLoadRecord('employee', empleado17);//numero_empleado
       campo17.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo17, true);
       continue;
     }
     if(consultor==consultor18){
       campo18 = nlapiLoadRecord('employee', empleado18);//numero_empleado
       campo18.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo18, true);
       continue;
     }
     if(consultor==consultor19){
       campo19 = nlapiLoadRecord('employee', empleado19);//numero_empleado
       campo19.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo19, true);
       continue;
     }
     if(consultor==consultor20){
       campo20 = nlapiLoadRecord('employee', empleado20);//numero_empleado
       campo20.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo20, true);
       continue;
     }
     if(consultor==consultor21){
       campo21 = nlapiLoadRecord('employee', empleado21);//numero_empleado
       campo21.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo21, true);
       continue;
     }
     if(consultor==consultor22){
       campo22 = nlapiLoadRecord('employee', empleado22);//numero_empleado
       campo22.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo22, true);
       continue;
     }
	 if(consultor==consultor23){
       campo23 = nlapiLoadRecord('employee', empleado23);//numero_empleado
       campo23.setFieldValue('custentity304', count);
       nlapiSubmitRecord(campo23, true);
       continue;
     }
   }
  /*BÚSQUEDA Script ValEfec emp*/
  var revresults = nlapiSearchRecord('calendarevent','customsearch2984');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor==consultor1){
       campo1 = nlapiLoadRecord('employee', empleado1);//numero_empleado
       campo1.setFieldValue('custentity305', count);//vae 
       nlapiSubmitRecord(campo1, true);
       continue;
     }
      if(consultor==consultor2){
       campo2 = nlapiLoadRecord('employee', empleado2);//numero_empleado
       campo2.setFieldValue('custentity305', "0");
       nlapiSubmitRecord(campo2, true);
       continue;
     }
      if(consultor==consultor3){
       campo3 = nlapiLoadRecord('employee', empleado3);//numero_empleado
       campo3.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo3, true);
       continue;
     }
      if(consultor==consultor4){
       campo4 = nlapiLoadRecord('employee', empleado4);//numero_empleado
       campo4.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo4, true);
       continue;
     }
      if(consultor==consultor5){
       campo5 = nlapiLoadRecord('employee', empleado5);//numero_empleado
       campo5.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo5, true);
       continue;
     }
      if(consultor==consultor6){
       campo6 = nlapiLoadRecord('employee', empleado6);//numero_empleado
       campo6.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo6, true);
       continue;
     }
      if(consultor==consultor7){
       campo7 = nlapiLoadRecord('employee', empleado7);//numero_empleado
       campo7.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo7, true);
       continue;
     }
      if(consultor==consultor8){
       campo8 = nlapiLoadRecord('employee', empleado8);//numero_empleado
       campo8.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo8, true);
       continue;
     }
      if(consultor==consultor9){
       campo9 = nlapiLoadRecord('employee', empleado9);//numero_empleado
       campo9.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo9, true);
       continue;
     }
      if(consultor==consultor10){
       campo10 = nlapiLoadRecord('employee', empleado10);//numero_empleado
       campo10.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo10, true);
       continue;
     }
      if(consultor==consultor11){
       campo11 = nlapiLoadRecord('employee', empleado11);//numero_empleado
       campo11.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo11, true);
       continue;
     }
      if(consultor==consultor12){
       campo12 = nlapiLoadRecord('employee', empleado12);//numero_empleado
       campo12.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo12, true);
       continue;
     }
      if(consultor==consultor13){
       campo13 = nlapiLoadRecord('employee', empleado13);//numero_empleado
       campo13.setFieldValue('custentity305', count); 
       nlapiSubmitRecord(campo13, true);
       continue;
     }
      if(consultor==consultor14){
       campo14 = nlapiLoadRecord('employee', empleado14);//numero_empleado
       campo14.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo14, true);
       continue;
     }
      if(consultor==consultor15){
       campo15 = nlapiLoadRecord('employee', empleado15);//numero_empleado
       campo15.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo15, true);
       continue;
     }
      if(consultor==consultor16){
       campo16 = nlapiLoadRecord('employee', empleado16);//numero_empleado
       campo16.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo16, true);
       continue;
     }
      if(consultor==consultor17){
       campo17 = nlapiLoadRecord('employee', empleado17);//numero_empleado
       campo17.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo17, true);
       continue;
     }
     if(consultor==consultor18){
       campo18 = nlapiLoadRecord('employee', empleado18);//numero_empleado
       campo18.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo18, true);
       continue;
     }
     if(consultor==consultor19){
       campo19 = nlapiLoadRecord('employee', empleado19);//numero_empleado
       campo19.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo19, true);
       continue;
     }
     if(consultor==consultor20){
       campo20 = nlapiLoadRecord('employee', empleado20);//numero_empleado
       campo20.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo20, true);
       continue;
     }
     if(consultor==consultor21){
       campo21 = nlapiLoadRecord('employee', empleado21);//numero_empleado
       campo21.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo21, true);
       continue;
     }
     if(consultor==consultor22){
       campo22 = nlapiLoadRecord('employee', empleado22);//numero_empleado
       campo22.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo22, true);
       continue;
     }
     if(consultor==consultor23){
       campo23 = nlapiLoadRecord('employee', empleado23);//numero_empleado
       campo23.setFieldValue('custentity305', count);
       nlapiSubmitRecord(campo23, true);
       continue;
     }
   }
  /*BÚSQUEDA KPI-Consultor Cierres*/
   var revresults = nlapiSearchRecord('transaction','customsearch1633');
	for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor==consultor1){
       campo1 = nlapiLoadRecord('employee', empleado1);//numero_empleado
       campo1.setFieldValue('custentity306', count);//cc 
       nlapiSubmitRecord(campo1, true);
       continue;
     }
      if(consultor==consultor2){
       campo2 = nlapiLoadRecord('employee', empleado2);//numero_empleado
       campo2.setFieldValue('custentity306', 0); 
       nlapiSubmitRecord(campo2, true);
       continue;
     }
      if(consultor==consultor3){
       campo3 = nlapiLoadRecord('employee', empleado3);//numero_empleado
       campo3.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo3, true);
       continue;
     }
      if(consultor==consultor4){
       campo4 = nlapiLoadRecord('employee', empleado4);//numero_empleado
       campo4.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo4, true);
       continue;
     }
      if(consultor==consultor5){
       campo5 = nlapiLoadRecord('employee', empleado5);//numero_empleado
       campo5.setFieldValue('custentity306', 0); 
       nlapiSubmitRecord(campo5, true);
       continue;
     }
      if(consultor==consultor6){
       campo6 = nlapiLoadRecord('employee', empleado6);//numero_empleado
       campo6.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo6, true);
       continue;
     }
      if(consultor==consultor7){
       campo7 = nlapiLoadRecord('employee', empleado7);//numero_empleado
       campo7.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo7, true);
       continue;
     }
      if(consultor==consultor8){
       campo8 = nlapiLoadRecord('employee', empleado8);//numero_empleado
       campo8.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo8, true);
       continue;
     }
      if(consultor==consultor9){
       campo9 = nlapiLoadRecord('employee', empleado9);//numero_empleado
       campo9.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo9, true);
       continue;
     }
      if(consultor==consultor10){
       campo10 = nlapiLoadRecord('employee', empleado10);//numero_empleado
       campo10.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo10, true);
       continue;
     }
      if(consultor==consultor11){
       campo11 = nlapiLoadRecord('employee', empleado11);//numero_empleado
       campo11.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo11, true);
       continue;
     }
      if(consultor==consultor12){
       campo12 = nlapiLoadRecord('employee', empleado12);//numero_empleado
       campo12.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo12, true);
       continue;
     }
      if(consultor==consultor13){
       campo13 = nlapiLoadRecord('employee', empleado13);//numero_empleado
       campo13.setFieldValue('custentity306', count); 
       nlapiSubmitRecord(campo13, true);
       continue;
     }
      if(consultor==consultor14){
       campo14 = nlapiLoadRecord('employee', empleado14);//numero_empleado
       campo14.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo14, true);
       continue;
     }
      if(consultor==consultor15){
       campo15 = nlapiLoadRecord('employee', empleado15);//numero_empleado
       campo15.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo15, true);
       continue;
     }
      if(consultor==consultor16){
       campo16 = nlapiLoadRecord('employee', empleado16);//numero_empleado
       campo16.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo16, true);
       continue;
     }
      if(consultor==consultor17){
       campo17 = nlapiLoadRecord('employee', empleado17);//numero_empleado
       campo17.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo17, true);
       continue;
     }
     if(consultor==consultor18){
       campo18 = nlapiLoadRecord('employee', empleado18);//numero_empleado
       campo18.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo18, true);
       continue;
     }
     if(consultor==consultor19){
       campo19 = nlapiLoadRecord('employee', empleado19);//numero_empleado
       campo19.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo19, true);
       continue;
     }
     if(consultor==consultor20){
       campo20 = nlapiLoadRecord('employee', empleado20);//numero_empleado
       campo20.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo20, true);
       continue;
     }
     if(consultor==consultor21){
       campo21 = nlapiLoadRecord('employee', empleado21);//numero_empleado
       campo21.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo21, true);
       continue;
     }
     if(consultor==consultor22){
       campo22 = nlapiLoadRecord('employee', empleado22);//numero_empleado
       campo22.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo22, true);
       continue;
     }
     if(consultor==consultor23){
       campo23 = nlapiLoadRecord('employee', empleado23);//numero_empleado
       campo23.setFieldValue('custentity306', count);
       nlapiSubmitRecord(campo23, true);
       continue;
     }
   }
   /*BÚSQUEDA KPI-Consultor Promedios*/
   var revresults = nlapiSearchRecord('transaction','customsearch2969');
  for(var z in revresults ) {
      var result1=revresults[z];
      var column1=result1.getAllColumns();
      var consultor =result1.getText(column1[1]);
      count =result1.getValue(column1[0]);
      if(consultor==consultor1){
       campo1 = nlapiLoadRecord('employee', empleado1);//numero_empleado
       campo1.setFieldValue('custentity116', count);//cp
       nlapiSubmitRecord(campo1, true);
       continue;
     }
      if(consultor==consultor2){
       campo2 = nlapiLoadRecord('employee', empleado2);//numero_empleado
       campo2.setFieldValue('custentity116', ''); 
       nlapiSubmitRecord(campo2, true);
       continue;
     }
      if(consultor==consultor3){
       campo3 = nlapiLoadRecord('employee', empleado3);//numero_empleado
       campo3.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo3, true);
       continue;
     }
      if(consultor==consultor4){
       campo4 = nlapiLoadRecord('employee', empleado4);//numero_empleado
       campo4.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo4, true);
       continue;
     }
      if(consultor==consultor5){
       campo5 = nlapiLoadRecord('employee', empleado5);//numero_empleado
       campo5.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo5, true);
       continue;
     }
      if(consultor==consultor6){
       campo6 = nlapiLoadRecord('employee', empleado6);//numero_empleado
       campo6.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo6, true);
       continue;
     }
      if(consultor==consultor7){
       campo7 = nlapiLoadRecord('employee', empleado7);//numero_empleado
       campo7.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo7, true);
       continue;
     }
      if(consultor==consultor8){
       campo8 = nlapiLoadRecord('employee', empleado8);//numero_empleado
       campo8.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo8, true);
       continue;
     }
      if(consultor==consultor9){
       campo9 = nlapiLoadRecord('employee', empleado9);//numero_empleado
       campo9.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo9, true);
       continue;
     }
      if(consultor==consultor10){
       campo10 = nlapiLoadRecord('employee', empleado10);//numero_empleado
       campo10.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo10, true);
       continue;
     }
      if(consultor==consultor11){
       campo11 = nlapiLoadRecord('employee', empleado11);//numero_empleado
       campo11.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo11, true);
       continue;
     }
      if(consultor==consultor12){
       campo12 = nlapiLoadRecord('employee', empleado12);//numero_empleado
       campo12.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo12, true);
       continue;
     }
      if(consultor==consultor13){
       campo13 = nlapiLoadRecord('employee', empleado13);//numero_empleado
       campo13.setFieldValue('custentity116', count); 
       nlapiSubmitRecord(campo13, true);
       continue;
     }
    if(consultor==consultor14){
       campo14 = nlapiLoadRecord('employee', empleado14);//numero_empleado
       campo14.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo14, true);
       continue;
     }
    if(consultor==consultor15){
       campo15 = nlapiLoadRecord('employee', empleado15);//numero_empleado
       campo15.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo15, true);
       continue;
     }
      if(consultor==consultor16){
       campo16 = nlapiLoadRecord('employee', empleado16);//numero_empleado
       campo16.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo16, true);
       continue;
     }
    if(consultor==consultor17){
       campo17 = nlapiLoadRecord('employee', empleado17);//numero_empleado
       campo17.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo17, true);
       continue;
     }
    if(consultor==consultor18){
       campo18 = nlapiLoadRecord('employee', empleado18);//numero_empleado
       campo18.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo18, true);
       continue;
     }
    if(consultor==consultor19){
       campo19 = nlapiLoadRecord('employee', empleado19);//numero_empleado
       campo19.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo19, true);
       continue;
     }
    if(consultor==consultor20){
       campo20 = nlapiLoadRecord('employee', empleado20);//numero_empleado
       campo20.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo20, true);
       continue;
     }
    if(consultor==consultor21){
       campo21 = nlapiLoadRecord('employee', empleado21);//numero_empleado
       campo21.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo21, true);
       continue;
     }
    if(consultor==consultor22){
       campo22 = nlapiLoadRecord('employee', empleado22);//numero_empleado
       campo22.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo22, true);
       continue;
     }
    if(consultor==consultor23){
       campo23 = nlapiLoadRecord('employee', empleado23);//numero_empleado
       campo23.setFieldValue('custentity116', count);
       nlapiSubmitRecord(campo23, true);
       continue;
     }
   }
}

