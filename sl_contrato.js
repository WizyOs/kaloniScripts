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




    var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';

                xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"20px\" align=\"left\">CONTRATO DE PRESTACIÓN DE SERVICIOS DE KALONI HOLDING GROUP S.C.</p>";
    			xml += '<p>El presente documento especifica los términos y condiciones, en adelante “Términos y Condiciones” que serán aplicados a la disposición de servicios “Servicios” prestados por Kaloni Holding Group S.C., en lo sucesivo “Kaloni”, a favor de la persona que firma este documento, en lo siguiente conocido como “El Cliente”.</p>';
     			xml += '<p>Para los efectos de los presentes Términos y Condiciones se entenderá por:</p>';
                xml += '<p><u>Servicio o Servicios:</u> Servicios médicos y estéticos ofrecidos por Kaloni, entre éstos se incluye el microinjerto capilar, la cirugía plástica y reconstructiva, tratamientos estéticos corporales, faciales y la venta de distintos productos para el cuidado estético.</p>';
     			xml += '<p><u>Aviso y Política de Privacidad:</u> Documento físico y/o electrónico que establece las normas bajo las que se trata su Información por Kaloni.</p>';
                xml += '<p><u>Formato de Valoración:</u> Formato de entrevista realizada por el personal de Kaloni al Cliente en el cual se detalla información relevante para el correcto diagnóstico del Cliente.</p>';
    			xml += '<p><u>Hoja de Presupuesto:</u> Documento que Kaloni emite formalmente en el cual se describe detalladamente el Servicio que se prestará al Cliente y los costos derivados de dicha prestación de Servicios.</p>';
                xml += '<p><u>Anticipo:</u> A la cantidad monetaria que el Cliente entrega al proveedor como adelanto para reservar la Fecha de Procedimiento en la que se llevará a cabo la prestación de los Servicios.</p>';
    			xml += '<p><u>Fecha de Procedimiento:</u> Fecha seleccionada por el Cliente en la cual Kaloni prestará los Servicios conforme a los Términos y Condiciones suscritas entre las partes.</p>';
                xml += '<p><u>Consentimiento Informado:</u> Documento que comunica al Cliente de forma explícita y clara toda la información relativa al procedimiento al que va a someterse, los beneficios, riesgos, y otros aspectos relevantes relacionados con los Servicios contratados. </p>';
    			xml += '<p><u>Receta Médica:</u> Documento que expide el médico en el cual se le indicará al Cliente las prescripciones médicas que deberá cumplir.</p>';
                xml += '<p>A la Hoja de Presupuesto, a los Términos y Condiciones y al Consentimiento Informado se les denominará conjuntamente el “Contrato”.</p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';
   				xml += '<p></p>';
                xml += '<p></p>';

    			xml += '<p><b>Valoración Previa Requerida.</b> El Cliente podrá programar su cita de valoración en cualquiera de nuestras clínicas, directorio disponible en <a href="https://kaloni.mx">https://kaloni.mx</a>, en la cita de valoración se le explicarán detalladamente las opciones de tratamiento y los costos derivados. Kaloni prestará los servicios al Cliente de acuerdo con lo establecido en el Contrato. </p>';
                xml += '<p><b>Cooperación.</b> El Cliente deberá proporcionar a Kaloni información verdadera en todo momento. El Cliente reconoce que deberá seguir cabalmente todos los cuidados indicados y asistir a todas las citas de seguimiento. </p>';
                xml += '<p><b>De la Prestación del Servicio.</b> El Cliente reconoce tener conocimiento que los Servicios objeto de este Contrato serán prestados por personal médico y/o estético altamente capacitado, habiendo aceptado y autorizado expresamente en el Consentimiento Informado con la realización de los procedimientos por dicho profesional. Una vez que los Servicios sean prestados no se realizarán devoluciones. En el caso de compra de producto, una vez acreditado el pago correspondiente, Kaloni procederá a la entrega de la mercancía.</p>';
                xml += '<p><b>Pago.</b> Con la finalidad de reservar la Fecha de Procedimiento, el Cliente podrá realizar el pago total del Servicio contratado o podrá realizar un pago parcial en concepto de Anticipo, el cual no podrá ser menor a la cantidad equivalente al 10% del monto total de su procedimiento, en este último caso, el Cliente se obliga a  pagar el monto restante a más tardar en la Fecha de Procedimiento. El pago podrá ser realizado en efectivo en las cajas de Kaloni, a través de tarjeta de crédito o débito en nuestras terminales bancarias o mediante transferencia bancaria conforme a los siguientes datos:</p>';
    			xml += '<p>Banco: BBVA Bancomer</p>';
    			xml += '<p>Beneficiario: KALONI HOLDING GROUP, S.C. </p>';
    			xml += '<p>Cuenta: 0100361658</p>';
    			xml += '<p>CLABE Interbancaria: 0121 8000 1003 6165 86</p>';
    			xml += '<p><b>Facturación.</b> Al momento de hacer su pago, la Ejecutiva de Atención a Clientes proporcionará al Cliente un Formato de Facturación mismo que deberá llenar con su información correcta y firmar. En caso de requerir factura con datos fiscales, deberá indicar sus datos fiscales correctos y completos, en caso de no requerirla deberá señalarlo en el mismo formato ya que Kaloni facturará a público en general como parte de las ventas del día, por lo tanto no se expedirán facturas posteriores al día de pago.   </p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';
   				xml += '<p></p>';
                xml += '<p></p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';

    			xml += '<p><b>Resultado.</b> El Cliente comprende que la práctica de la medicina no es una ciencia exacta, y que por tal motivo no es posible garantizar un resultado, dado que dicho resultado puede variar en razón a factores tales como cuidados y precauciones que son responsabilidad del Cliente y algunos otros aleatorios relacionados con la naturaleza de cada Cliente. El Cliente manifiesta, además, haber recibido información detallada sobre el diagnóstico, los posibles pronósticos, habiendo sido todo perfectamente entendido y aceptado por él, obligándose a cumplir todas las prescripciones médicas anteriores y posteriores al procedimiento médico, a fin de minimizar la ocurrencia de cualquiera de los riesgos señalados en el Consentimiento Informado.</p>';
    			xml += '<p><b>Devolución.</b> El Cliente podrá cancelar o modificar la programación del Servicio contratado siempre y cuando notifique a Kaloni con una antelación de siete días hábiles previos a la Fecha de Procedimiento. El Cliente acepta y reconoce que si decide cancelar el Servicio fuera de este término, Kaloni retendrá el monto equivalente al 10% del costo total del procedimiento por concepto de Gastos Administrativos. La solicitud de devolución será procedente únicamente dentro de los siguientes treinta días naturales contados a partir de la fecha de su pago parcial o total; una vez concluido este término, Kaloni no realizará devolución monetaria, únicamente podrá ofrecer al Cliente cambio por otros servicios y/o producto. El Cliente deberá contactar <u>servicioalcliente@kaloni.com</u> para iniciar el trámite, no se atenderán solicitudes de devolución por otro medio. Kaloni dará respuesta a su solicitud mediante el envío de un Formato de Devolución, mismo que el Cliente deberá llenar con la información relativa a su pago y enviar adjuntando la factura, recibo o comprobante bancario al correo electrónico anteriormente mencionado. Una vez recibido el formato con la información completa, Kaloni notificará a El Cliente la correcta recepción de su trámite y a partir de esta fecha Kaloni tendrá 30 días hábiles para concluir el trámite de su devolución. El Cliente comprende y acepta que en el supuesto de cancelación del Servicio y solicitud de devolución, Kaloni retendrá las comisiones bancarias conforme a la cláusula siguiente.</p>';
    			xml += '<p><b>Comisiones Bancarias.</b> La comisión bancaria aplicable por uso de terminal será del 3.7% en tarjetas American Express y del 2% en el resto de tarjetas bancarias. Si el pago se realizó a meses sin intereses, adicional a la comisión por uso de la terminal se retendrá la cantidad correspondiente al 12% en compras a 12 meses sin intereses y 6% en compras a 6 meses sin intereses.</p>';
    			xml += '<p><b>Producto.</b> El Cliente contará con 30 días naturales a partir de la fecha de compra para solicitar el cambio o la devolución de un producto. Una vez abierto el producto no se aceptarán devoluciones.</p>';
    			xml += '<p><b>Tratamiento De Datos Personales.</b> El Aviso de Privacidad y las políticas de uso y recopilación de información de Kaloni se encuentran disponibles para su consulta en nuestro sitio web <a href="http://kaloni.mx">http://kaloni.mx.</a></p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
     			xml += '<p></p>';
                xml += '<p></p>';
   				xml += '<p></p>';
                xml += '<p></p>';
    			xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';
                xml += '<p></p>';

    			xml += '<p><b>Leyes Aplicables y Jurisdicción.</b> Para la interpretación, cumplimiento y ejecución del presente Contrato, las partes se someten a la jurisdicción y competencia de las autoridades competentes de la Ciudad de México, renunciando expresamente y desde este momento a cualquier otro fuero que por razón de su domicilio presente o futuro pudiera corresponderles.</p>';
    			xml += '<p>___________________________</p>';
                xml += '<p></p>';

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

