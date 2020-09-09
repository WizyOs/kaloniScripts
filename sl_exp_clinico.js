/**
 * Suitelet that changes the PO Form Type
 */
    // *********************************************************************************************************

  function crearPDFCaso(valid){
    try
  {

  var logo = "https://system.na2.netsuite.com/core/media/media.nl?id=1586838&c=3559763&h=c9885abe8bc213e27887";
  //Receta
  var inRecord = nlapiLoadRecord('supportcase', valid);
  var med1 = inRecord.getFieldValue('custevent177');
  var medS = inRecord.getFieldValue('custevent2');
  var medResp = inRecord.getFieldValue('custevent202');
  var med2 = inRecord.getFieldValue('custevent178');
  var med3 = inRecord.getFieldValue('custevent179');
  var ind1 = inRecord.getFieldValue('custevent180');
  var ind2 = inRecord.getFieldValue('custevent181');
  var ind3 = inRecord.getFieldValue('custevent182');
  var ind5 = inRecord.getFieldValue('custevent187');
  var ind6 = inRecord.getFieldValue('custevent188');
  var ind7 = inRecord.getFieldValue('custevent189');
  var ind8 = inRecord.getFieldValue('custevent190');
  var shampooCaidaCheck = inRecord.getFieldValue('custevent183');
  var shampooGrasaCheck = inRecord.getFieldValue('custevent184');
  var aguaGlaciarCheck = inRecord.getFieldValue('custevent185');
  var argininaCheck = inRecord.getFieldValue('custevent186');
  var comentarios = inRecord.getFieldValue('custevent196');
    /*nlapiLogExecution('DEBUG', 'Value PDF comentarios: ', comentarios);
    return false;*/
  var fechaExp = inRecord.getFieldValue('custevent197');
  //Company y sucursal
  var hgName = inRecord.getFieldText('company');
  var fields = hgName.split(' ');
  var hg = fields[0];
  var hg1 = fields[1];
  var sucursal = inRecord.getFieldText('custevent2');
  sucursal = sucursal + "_HAIR";
  var fileXMLtoPDF = null;
/////
 var motivo = inRecord.getFieldValue('custevent270');
 var fecha = inRecord.getFieldValue('custevent273');
 var referencias = inRecord.getFieldValue('custevent272');
 var diagnostico = inRecord.getFieldValue('custevent274');
 var considerar = inRecord.getFieldValue('custevent275');
 var fProce = inRecord.getFieldValue('custevent276');
 var proced = inRecord.getFieldValue('custevent277');
 var tiras = inRecord.getFieldValue('custevent278');
 var dato = inRecord.getFieldValue('custevent279');
 var xdx = inRecord.getFieldValue('custevent280');
 var tx = inRecord.getFieldValue('custevent281');
 var motivoC = inRecord.getFieldValue('custevent284');
 var enfermedad = inRecord.getFieldValue('custevent285');
 var revision = inRecord.getFieldValue('custevent286');
 var antecedentes = inRecord.getFieldValue('custevent287');
 var signos = inRecord.getFieldValue('custevent288');
 var examen = inRecord.getFieldValue('custevent289');
 var cie = inRecord.getFieldValue('custevent290');
 var plan = inRecord.getFieldValue('custevent291');
 var principal = inRecord.getFieldValue('custevent292');
 var confirmado = inRecord.getFieldValue('custevent293');

  //21: Santa Fe
 // 22: Altavista
  //23: Guadalajara
  //24: Monterrey
  //25: Polanco
  //26: Satéllite
  //27: Tijuana
  //28: Veracruz
  //36: Chihuahua
  //37: Puebla
  //35: Cancún

   if(medS=='21'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
    var Sucur='SN';
    }else if(medS=='22'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
    var Sucur='AL';
    }
    else if(medS=='23'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
    var Sucur='GU';
    }
    else if(medS=='24'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
    var Sucur='MO';
    }
    else if(medS=='25'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
    var Sucur='PO';
    }
    else if(medS=='26'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
    var Sucur='ST';
    }
    else if(medS=='27'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
    var Sucur='TI';
    }
    else if(medS=='28'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
    var Sucur='VE';
    }
    else if(medS=='36'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
    var Sucur='CH';
    }
    else if(medS=='37'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
    var Sucur='PU';
    }
    else if(medS=='35'){
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
    var Sucur='CA';
    }else{
    var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
    }

  if (motivo=='2'){
    var motivoname='Propuesto';
    }
   else if(motivo=='4'){
     var motivoname='Tratamiento Intensivo';
   }
   else if(motivo=='5'){
    var motivoname='Llamar Para Precio de Cancelación';
   }
   else if(motivo=='7'){
    var motivoname='Perdio Interes/No Llamar';
   }
   else if(motivo=='11'){
     var motivoname='Interesado/Desea Esperar';
   } 
   else if(motivo=='12'){
     var motivoname='Cierre';
   }
   else if(motivo=='13'){
     var motivoname='Seguimiento Medical';
   }
   else if(motivo=='14'){
    var motivoname='No Candidato de Medical';
   }
   else if(motivo=='15'){
     var motivoname='Cierre-Retoque';
   }
   else if(motivo=='16'){
    var motivoname='Cierre Sin Procedimiento';
   }
   else if(motivo=='17'){
    var motivoname='Protesis';
   }
   else if(motivo=='18'){
    var motivoname='Mantenimiento Preventivo';
   }
   else if(motivo=='19'){
    var motivoname='Biopsia';
   }
   else if(motivo=='20'){
    var motivoname='Tx Medico';
   }


if (motivoC=="1"){
var mot="Valoración de Cejas"
    }else if(motivoC=="2"){
var mot="Valoración de Caída de Cabello"
    }else if(motivoC=="3"){
var mot="Valoración de Cejas"
    }else if(motivoC=="4"){
var mot="Valoración de Bigote"
    }


if (confirmado=="1"){
var confirmadoC="Confirmado"
    }else if(confirmado=="2"){
var confirmadoC="Impresión Diagnostica"
    }


if (cie=="1"){
var motivocie="L63 Alopecia Areata"
    }else if(cie=="2"){
var motivocie="L64 Alopecia Androgénica"
    }else if(cie=="3"){
var motivocie="L65 Otra Pérdida de Pelo no Cicatrical"
    }else if(cie=="4"){
var motivocie="L66 Alopecia Cicatrical"
    }else if(cie=="5"){
var motivocie="L67 Anormalidades del Color y del Tallo del Pelo"
    }else if(cie=="6"){
var motivocie="L68 Hipertricosis"
    }else if(cie=="7"){
var motivocie="L70 Acné"
    }else if(cie=="8"){
var motivocie="L71 Rosácea"
    }else if(cie=="9"){
var motivocie="L72 Quistes Foliculares de la Piel y del Tejido Subcutáneo"
    }else if(cie=="10"){
var motivocie="L73 Otros Transtornos Foliculares"
    }else if(cie=="11"){
var motivocie="L74 Transtornos Sudoríparos Ecrinos"
    }else if(cie=="12"){
var motivocie="L75 Transtornos Sudoríparos Apocrinos"
    }


    var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >';
    xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"20px\" align=\"left\">HISTORIAL CLÍNICO</p>";
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';

                xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
                xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\" colspan=\"3\"  align=\"center\"><b>FORMATO DE VALORACIÓN</b></td></tr>';
                xml += '<tr><td><b>No. EXPEDIENTE:</b> '+hg+'</td></tr>';
    			xml += '<tr><td><b>NOMBRE:</b> '+hg1+'</td></tr>';
                xml += '</table>';
    			xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
                xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\" colspan=\"3\"  align=\"center\"><b>DIAGNOSTICO MICROCAMARA</b></td></tr>';
                xml += '<tr><td  colspan=\"2\"><b>Motivo:</b> '+diagnostico+'</td><td><b>Considerar para Proyección de Venta</b>'+checado(considerar)+'</td></tr>';
                xml += '</table>';
     			xml += '<p></p>';
    			xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
                xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\" colspan=\"3\"  align=\"center\"><b>FECHA DE PROCEDIMIENTO AGENDADO</b></td></tr>';
                xml += '<tr><td><b>Fecha:</b> '+fProce+'</td><td><b>Procedimientos:</b> '+proced+'</td><td><b>Tiras:</b> '+tiras+'</td></tr>';
                xml += '</table>';
     			xml += '<p></p>';
    			xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
                xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\" colspan=\"3\"  align=\"center\"><b>COMENTARIOS</b></td></tr>';
                xml += '<tr><td><b>Algun Otro Dato Importante<br /> que Desee Referirnos:</b> '+dato+'</td><td><b>TX:</b> '+tx+'</td><td><b>XDX:</b> '+xdx+'</td></tr>';
                xml += '</table>';
     			xml += '<p></p>';
    			xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
                xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\" colspan=\"3\"  align=\"center\"><b>MOTIVO DE CONSULTA Y ENFERMEDAD ACTUAL</b></td></tr>';
                xml += '<tr><td  colspan=\"2\"><b>Motivo:</b> '+mot+'</td><td><b>Enfermedad:</b>'+enfermedad+'</td></tr>';
    			xml += '<tr><td  colspan=\"2\"><b>Revisión por Sistema:</b> '+revision+'</td><td><b>Antecedentes:</b> '+antecedentes+'</td></tr>';
    			xml += '<tr><td  colspan=\"2\"><b>Signos Vitales:</b> '+signos+'</td><td><b>Examen Fisico:</b> '+examen+'</td></tr>';
    			xml += '<tr><td  colspan=\"2\"><b>CIE10:</b> '+motivocie+'</td><td><b>Plan de Trabajo:</b> '+plan+'</td></tr>';
    			xml += '<tr><td  colspan=\"2\"><b>Principal:</b> '+checado(principal)+'</td><td><b>Confirmado o Impresión Diagnostica:</b> '+confirmadoC+'</td></tr>';
                xml += '</table>';

                xml += '</body>\n</pdf>';

              fileXMLtoPDF = nlapiXMLToPDF(xml);
                return fileXMLtoPDF;
  }
    catch(error)
  {
    var msgError = error;
    //nlapiLogExecution('debug', 'title', JSON.stringify(med1));
    nlapiLogExecution('debug', 'title', msgError);
    return false;
  }
}


  // *********************************************************************************************************
function gererarPDF(request, response)
{
try
{
  var id = request.getParameter('poid');
    nlapiLogExecution('DEBUG', 'PDF Recetas: ', 'Value request id parameter: ' + id);

    var result = crearPDFCaso(id);
    if(result !== false && result !== null)
    {
      nlapiLogExecution('AUDIT', 'function crearPDFCaso(): ', 'Receta creada correctamente!! Case id record: ' + id);
      response.setContentType('PDF','preview.pdf', 'inline');
      response.write(result.getValue());
    }else{
      nlapiLogExecution('ERROR', ' function crearPDFCaso(): ', 'Receta no creada!! Case id record: ' + id);
    }
}
catch(err2)
{
  var msgError = err2;
  nlapiLogExecution('ERROR', 'Error gererarPDF function', msgError);
}
}

  // *********************************************************************************************************
function getFolderPar(val){
         var folderParent = '';
       if(val === 'Mexico')
         folderParent = '1131962';
       if(val === 'Colombia')
         folderParent = '1131965';
       if(val === 'España')
         folderParent = '1131964';
       if(val === 'Brasil')
         folderParent = '1131963';
       if(val === 'Republica Dominicana')
         folderParent = '1131966';
       if(val === 'Hair Clinical Professional S.C.')
         folderParent = '1138802';
       if(val === 'Dr. Matiasek - Vienna')
         folderParent = '1138803';
       if(val === 'Juvenesse Clinic Professional S.C.')
         folderParent = '1138804';
       if(val === 'Kaloni USA')
         folderParent = '1138827';
       if(val === 'Kaloni USA No Usar.')
         folderParent = '1138829';
return folderParent;
}

function checado(checks) {
var check ="";
if (checks == "T"){
   var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
   check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path)+"\">probando</img>";
 }
else {
  if(checks == "F") {
     var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
     check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
     }else {
       if(checks == null){
         var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
         check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
       }else{
         var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
         check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
       }
     }
  }
 return check;
}

function deleteComas(textParam){
var res = '';
var i      = 0;
try{
    while(i<textParam.length){
   var text = textParam[i];

     if(text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == '-' || text == '.')
     {
      // si es diferente simplemente concatena el carácter original de la cadena original.
       res += text;
     }else{
      // si no es diferente concatena el carácter que introdujiste a remplazar
       //nlapiLogExecution('AUDIT', 'SL| No es número - ó .: ', text);
     }
     i++;
    } // Fin del while
}
catch(e){
  var vale = e;
  nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
}
return res;
}

function getFecha(){
var valFecha = '';
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f=new Date();
  valFecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
return valFecha;
}

