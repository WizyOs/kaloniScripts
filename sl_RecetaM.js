/**
 * Suitelet that changes the PO Form Type
 */
// *********************************************************************************************************

function crearPDFCaso(valid) {
  var inRecord = nlapiLoadRecord('supportcase', valid);
  var companyInfo = nlapiLoadConfiguration('userpreferences');
  var languageInterface = companyInfo.getFieldValue('language');
  nlapiLogExecution('DEBUG','Lenguaje',languageInterface);
  var medResp = inRecord.getFieldValue('custevent202') || null;

  if ( medResp != null){
    try {

      var logo = "https://system.na2.netsuite.com/core/media/media.nl?id=1586838&c=3559763&h=c9885abe8bc213e27887";
      //Receta
      var inRecord = nlapiLoadRecord('supportcase', valid);
      var med1 = inRecord.getFieldValue('custevent177');
      var medS = inRecord.getFieldValue('custevent2');
      var form = inRecord.getFieldValue('customform');
      var medResp = inRecord.getFieldValue('custevent202');
      var customerRecord = nlapiLoadRecord('employee', medResp);
      var doctor = customerRecord.getFieldValue('entityid');
      var cedula = customerRecord.getFieldValue('custentity392') || "";
      var inst = customerRecord.getFieldValue('custentity393') || "";
      var med2 = inRecord.getFieldValue('custevent178');
      var med3 = inRecord.getFieldValue('custevent179');
      var ind1 = inRecord.getFieldValue('custevent180') || '';
      var ind2 = inRecord.getFieldValue('custevent181') || '';
      var ind3 = inRecord.getFieldValue('custevent182') || '';
      var ind5 = inRecord.getFieldValue('custevent187');
      var ind6 = inRecord.getFieldValue('custevent188');
      var ind7 = inRecord.getFieldValue('custevent189');
      var ind8 = inRecord.getFieldValue('custevent190');
      var shampooCaidaCheck = inRecord.getFieldValue('custevent183');
      var shampooGrasaCheck = inRecord.getFieldValue('custevent184');
      var aguaGlaciarCheck = inRecord.getFieldValue('custevent185');
      var argininaCheck = inRecord.getFieldValue('custevent186');
      var tipo = inRecord.getFieldValue('custevent203');

      // NATIVE LABELS
      var label_shampooCaidaCheck = inRecord.getField('custevent183');
      var label_shampooGrasaCheck = inRecord.getField('custevent184');
      var label_aguaGlaciarCheck = inRecord.getField('custevent185');
      var label_argininaCheck = inRecord.getField('custevent186');
      var label_dateExpedition = inRecord.getField('custevent197');
      label_shampooCaidaCheck = label_shampooCaidaCheck.getLabel();
      label_shampooGrasaCheck = label_shampooGrasaCheck.getLabel();
      label_aguaGlaciarCheck = label_aguaGlaciarCheck.getLabel();
      label_argininaCheck = label_argininaCheck.getLabel();
      label_dateExpedition = label_dateExpedition.getLabel();

      // CUSTOM LABELS
      var label_title_medicamentos = ''; //en -> Medicines
      var label_title_tratamientos = ''; //en -> Treatments
      var laebl_title_indicaciones_cuidado = ''; //en -> Care indications
      var label_title_firma = ''; //en -> Signature
      var label_title_responsable_sanitario = ''; //en -> Health Manager
      var label_title_receta_paciente = ''; //en -> Patient Prescription
      var label_title_nombre_paciente = ''; //en -> Name of Patient
      var label_title_edad_paciente = ''; //en -> Age
      var label_title_cedula = ''; //en -> Professional ID
      var label_title_intitucion = ''; //en -> University
      var label_title_especialidad = ''; //en -> Specialty
      var label_title_cedula_esp = ''; //en -> Professional ID Spec.

      if (languageInterface == 'en') {
        label_title_medicamentos = 'Medicines';
        label_title_tratamientos = 'Treatments';
        laebl_title_indicaciones_cuidado = 'Care indications';
        label_title_firma = 'Signature';
        label_title_responsable_sanitario = 'Health Manager';
        label_title_receta_paciente = 'Patient Prescription';
        label_title_nombre_paciente = 'Name of Patient';
        label_title_edad_paciente = 'Age';
        label_title_cedula = 'Professional ID';
        label_title_intitucion = 'University';
        label_title_especialidad = 'Specialty';
        label_title_cedula_esp = 'Professional ID Spec.';
      } else if (languageInterface == 'de_DE') {
        label_title_medicamentos = 'Medicines';
        label_title_tratamientos = 'Treatments';
        laebl_title_indicaciones_cuidado = 'Care indications';
        label_title_firma = 'Signature';
        label_title_responsable_sanitario = 'Health Manager';
        label_title_receta_paciente = 'Patient Prescription';
        label_title_nombre_paciente = 'Name of Patient';
        label_title_edad_paciente = 'Age';
        label_title_cedula = 'Professional ID';
        label_title_intitucion = 'University';
        label_title_especialidad = 'Specialty';
        label_title_cedula_esp = 'Professional ID Spec.';
      } else if (languageInterface == 'es_AR') {
        label_title_medicamentos = 'Medicamentos';
        label_title_tratamientos = 'Tratamientos';
        laebl_title_indicaciones_cuidado = 'Indicaciones de Cuidado';
        label_title_firma = 'Firma';
        label_title_responsable_sanitario = 'Responsable Sanitario';
        label_title_receta_paciente = 'Receta Paciente';
        label_title_nombre_paciente = 'Nombre del Paciente';
        label_title_edad_paciente = 'Edad';
        label_title_cedula = 'Cédula';
        label_title_intitucion = 'Institución';
        label_title_especialidad = 'Especialidad';
        label_title_cedula_esp = 'Cédula ESP.';
      }

      if (tipo == '3') {
        var comentarios = inRecord.getFieldValue('custevent196');
        nlapiLogExecution('DEBUG', 'Indicaciones: ', comentarios);
      } else if (tipo == '1') {
        var comentarios = inRecord.getFieldValue('custevent204');
        nlapiLogExecution('DEBUG', 'Indicaciones: ', comentarios);
      }
      /*return false;*/
      var fechaExp = inRecord.getFieldValue('custevent197') || '';
      //Company y sucursal
      var hgName = inRecord.getFieldText('company');
      var idC = inRecord.getFieldValue('company');
      var fields = hgName.split(' ');
      var hg = fields[0];
      var customerRecordC = nlapiLoadRecord('customer', idC);
      var edad = ""; // inRecord.getFieldValue('custevent332'); // customerRecordC custentity149 inRecord custevent332
      var filters = new Array();
      filters[0] = new nlobjSearchFilter('company', null, 'is', hgName); // 'HG-70494 Daniela Avila'
      var cols = new Array();
      cols[0] = new nlobjSearchColumn('internalid');
      var searchResult = nlapiSearchRecord('supportcase', null, filters, cols);
      if (searchResult != null) {
        nlapiLogExecution('DEBUG', 'searchResult.length: ', searchResult.length);
        for (var i = 0; i < searchResult.length; i++) {
          /*var jsonString = JSON.stringify(searchResult[i]);
          var obj = JSON.parse(jsonString);
          var folderId = searchResult[i].getId();*/

          var caseId_Column = searchResult[i].getValue(nlobjSearchColumn('internalid'));
          var recCase = nlapiLoadRecord('supportcase', caseId_Column);
          try {
            edad = recCase.getFieldValue('custevent332');
          } catch (e) {
            nlapiLogExecution('DEBUG', 'Exception: ', e);
          }
          if (edad != null && edad != "") {
            if (edad > 0) {
              edad = edad + " años";
              nlapiLogExecution('DEBUG', 'caseId_Column y edad: ', caseId_Column + ' _ ' + edad);
              break;
            }
          }
        }
      }
      else {
        nlapiLogExecution('DEBUG', 'searchResult in null: ', searchResult);
      }
      var clienteName = customerRecordC.getFieldValue('altname');
      var fields = hgName.split(' ');
      var hg = fields[0];
      var sucursal = inRecord.getFieldText('custevent2');
      sucursal = sucursal + "_HAIR";
      var fileXMLtoPDF = null;

      //21: Santa Fe
      //22: Altavista
      //23: Guadalajara
      //24: Monterrey
      //25: Polanco
      //26: Satéllite
      //27: Tijuana
      //28: Veracruz
      //36: Chihuahua
      //37: Puebla
      //35: Cancún

      if (medS == '21') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
        var Sucur = 'SN';
      } else if (medS == '22') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
        var Sucur = 'AL';
      }
      else if (medS == '23') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
        var Sucur = 'GU';
      }
      else if (medS == '24') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
        var Sucur = 'MO';
      }
      else if (medS == '25') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
        var Sucur = 'PO';
      }
      else if (medS == '26') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
        var Sucur = 'ST';
      }
      else if (medS == '27') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
        var Sucur = 'TI';
      }
      else if (medS == '28') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
        var Sucur = 'VE';
      }
      else if (medS == '36') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
        var Sucur = 'CH';
      }
      else if (medS == '37') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
        var Sucur = 'PU';
      }
      else if (medS == '35') {
        var ubicacion = nlapiLoadRecord('location', medS);
        var respon = ubicacion.getFieldValue('custrecord155');
        var responsable = nlapiLoadRecord('employee', respon);
        var RespName = responsable.getFieldValue('entityid');
        var RespCed = responsable.getFieldValue('custentity392');
        var RespInst = responsable.getFieldValue('custentity393');
        //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
        var resp = RespName + '';
        var resp1 = '' + RespInst + ' ' + RespCed + '';
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        var Sucur = 'CA';
      } else {
        var water = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        var resp = "";
        var resp1 = "";
      }

      /*if(medS!='' ){
               var ubicacion = nlapiLoadRecord('location', medS);
               var respon = ubicacion.getFieldValue('custrecord155');
               var responsable = nlapiLoadRecord('employee', respon);
               var RespName = responsable.getFieldValue('entityid');
               var RespCed = responsable.getFieldValue('custentity392');
               var RespInst = responsable.getFieldValue('custentity393');
               //nlapiLogExecution('DEBUG', 'Responsable: ', 'Value Medico: ' + RespName);
               var resp = "Responsable Sanitario Dr(a).: " + RespName +'';
               var resp1 = '' + RespInst +' '+ RespCed +'';
   
           }
           else{
               var resp = "";
               var resp1 = "";
           }*/

      //var cod1 = fechaExp.split('/');
      //var an = cod1[2];
      //var anio = an.substring(2, 6);
      //var d = new Date();
      //var n = d.toLocaleTimeString();
      //var cod2 = n.split(':');
      //var time = cod2[2];
      //var time2 = time.substring(0, 2);
      //var folio= Sucur + '-' + cod1[0] + '' + cod1[1] + '' + anio + ''+ cod2[0] +''+ cod2[1] +''+ time2;



      var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"' + nlapiEscapeXML(water) + '\" >';
      xml += '<p style=\"font-family:Aria, sans-serif;\" font-size=\"20px\" align=\"left\"><b>' + label_title_receta_paciente.toUpperCase() + '</b></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += '<p></p>';
      xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
      // var name = hgName.substring(9, 100);
      xml += '<tr><td><b>' + label_title_nombre_paciente + ': </b>' + clienteName + '</td><td align=\"left\"><b>Dr.: </b>' + doctor + '</td></tr>';
      xml += '<tr><td><b>' + label_title_edad_paciente + ': </b>' + edad + '</td><td align=\"left\"><b>' + label_title_cedula + ': </b>' + cedula + '</td></tr>';
      xml += '<tr><td><b>' + label_dateExpedition + ': </b>' + fechaExp + '</td><td align=\"left\"><b>' + label_title_intitucion + ': </b>' + inst + '</td></tr>';

      xml += '<tr><td></td>';
      if (form != '14') {
        xml += '<td align=\"left\"><b>' + label_title_especialidad + ': </b></td></tr>';
      } else {
        xml += '<td align=\"left\"></td></tr>';
      }
      xml += '<tr><td></td>';
      if (form != '14') {
        xml += '<td align=\"left\"><b>' + label_title_cedula_esp + ': </b></td></tr>';
      } else {
        xml += '<td align=\"left\"></td></tr>';
      }
      xml += '</table>';
      xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
      xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\"><b>' + label_title_medicamentos.toUpperCase() + '</b></td></tr>';
      if (med1 == '1') {
        xml += '<tr><td><b>Clindamicina:</b> ' + ind1 + '</td></tr>';
      } else if (med1 == '2') {
        xml += '<tr><td><b>Tylex:</b> ' + ind1 + '</td></tr>';
      } else if (med1 == '3') {
        xml += '<tr><td><b>Omeprazol:</b> ' + ind1 + '</td></tr>';
      } else if (med1 == '4') {
        xml += '<tr><td><b>Cefuroxima:</b> ' + ind1 + '</td></tr>';
      } else if (med1 == '5') {
        xml += '<tr><td><b>Alin:</b> ' + ind1 + '</td></tr>';
      } else if (med1 == '6') {
        xml += '<tr><td><b>Azitrocin:</b> ' + ind1 + '</td></tr>';
      }
      if (med2 == '1') {
        xml += '<tr><td><b>Clindamicina:</b> ' + ind2 + '</td></tr>';
      } else if (med2 == '2') {
        xml += '<tr><td><b>Tylex:</b> ' + ind2 + '</td></tr>';
      } else if (med2 == '3') {
        xml += '<tr><td><b>Omeprazol:</b> ' + ind2 + '</td></tr>';
      } else if (med2 == '4') {
        xml += '<tr><td><b>Cefuroxima:</b> ' + ind2 + '</td></tr>';
      } else if (med2 == '5') {
        xml += '<tr><td><b>Alin:</b> ' + ind2 + '</td></tr>';
      } else if (med2 == '6') {
        xml += '<tr><td><b>Azitrocin:</b> ' + ind2 + '</td></tr>';
      }
      if (med3 != null) {
        xml += '<tr><td><b>' + med3 + ':</b> ' + ind3 + '</td></tr>';
      }

      xml += '</table>';


      xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
      xml += '<tr><td colspan=\"2\" color=\"#FFFFFF\" background-color=\"#346094\"><b>' + label_title_tratamientos.toUpperCase() + '</b></td></tr>';
      xml += '<tr>';
      if (shampooCaidaCheck == "T") {
        xml += '<td><table><tr><td><b><span style=\"font-size:10px;\">' + label_shampooCaidaCheck + '</span></b></td></tr><tr><td>' + ind5 + '</td></tr></table></td>';
      }
      if (shampooGrasaCheck == "T") {
        xml += '<td><table><tr><td><b><span style=\"font-size:10px;\">' + label_shampooGrasaCheck + '</span></b></td></tr><tr><td>' + ind6 + '</td></tr></table></td>';
      }
      xml += '</tr>';
      xml += '<tr>';
      if (aguaGlaciarCheck == "T") {
        xml += '<td><table><tr><td><b><span style=\"font-size:10px;\">' + label_aguaGlaciarCheck + '</span></b></td></tr><tr><td>' + ind7 + '</td></tr></table></td>';
      }
      if (argininaCheck == "T") {
        xml += '<td><table><tr><td><b><span style=\"font-size:10px;\">' + label_argininaCheck + '</span></b></td></tr><tr><td>' + ind8 + '</td></tr></table></td>';
      }
      xml += '</tr></table>';

      xml += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
      xml += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\"><b>' + laebl_title_indicaciones_cuidado.toUpperCase() + '</b></td></tr>';
      var porciones = comentarios.split('•');
      var i;
      for (i = 1; i < porciones.length; i++) {
        text = porciones[i];
        xml += '<tr><td>•' + text + '</td></tr>';
      }
      //xml += '<tr><td>'+comentarios+'</td></tr>';
      xml += '</table>';

      xml += '<p align=\"center\">______________________</p>';
      xml += '<p style=\"font-family:Aria, sans-serif\" font-size=\"15px\" align=\"center\"><b>' + label_title_firma + '</b></p>';
      xml += '<p style=\"font-family:Aria, sans-serif\" font-size=\"10px\"><b>' + label_title_responsable_sanitario + ' Dr. ' + resp + '<br />' + resp1 + '</b></p>';

      xml += '</body>\n</pdf>';


      fileXMLtoPDF = nlapiXMLToPDF(xml);
      return fileXMLtoPDF;

    }
    catch (error) {
      var msgError = error;
      //nlapiLogExecution('debug', 'title', JSON.stringify(med1));
      nlapiLogExecution('debug', 'title', msgError);
      nlapiLogExecution('debug', 'title', msgError + ' ' + hgName);
      return false;
    }
  } else {
    return false;
  } 
}


// *********************************************************************************************************
function gererarPDF(request, response) {
  var id = request.getParameter('poid');
    debugger;
    try {    
      nlapiLogExecution('DEBUG', 'PDF Recetas: ', 'Value request id parameter: ' + id);  
      var result = crearPDFCaso(id);
      if (result !== false && result !== null) {
        nlapiLogExecution('AUDIT', 'function crearPDFCaso(): ', 'Receta creada correctamente!! Case id record: ' + id);
        response.setContentType('PDF', 'preview.pdf', 'inline');
        response.write(result.getValue());
      } else {
        nlapiLogExecution('ERROR', ' function crearPDFCaso(): ', 'Receta no creada!! Case id record: ' + id);
        nlapiLogExecution('DEBUG', 'PDF Recetas: ', 'No se ha registrado médico responsable de Receta!!');
      }
    }
    catch (err2) {
      var msgError = err2;
      nlapiLogExecution('ERROR', 'Error gererarPDF function', msgError);
    }
}

// *********************************************************************************************************
function getFolderPar(val) {
  var folderParent = '';
  if (val === 'Mexico')
    folderParent = '1131962';
  if (val === 'Colombia')
    folderParent = '1131965';
  if (val === 'España')
    folderParent = '1131964';
  if (val === 'Brasil')
    folderParent = '1131963';
  if (val === 'Republica Dominicana')
    folderParent = '1131966';
  if (val === 'Hair Clinical Professional S.C.')
    folderParent = '1138802';
  if (val === 'Dr. Matiasek - Vienna')
    folderParent = '1138803';
  if (val === 'Juvenesse Clinic Professional S.C.')
    folderParent = '1138804';
  if (val === 'Kaloni USA')
    folderParent = '1138827';
  if (val === 'Kaloni USA No Usar.')
    folderParent = '1138829';
  return folderParent;
}

function checado(checks) {
  var check = "";
  if (checks == "T") {
    var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
    check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path) + "\">probando</img>";
  }
  else {
    if (checks == "F") {
      var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
      check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path2) + "\"/>";
    } else {
      if (checks == null) {
        var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
        check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path2) + "\"/>";
      } else {
        var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
        check = "<img height=\"15px\" width=\"15px\" src=\"" + nlapiEscapeXML(path2) + "\"/>";
      }
    }
  }
  return check;
}

function deleteComas(textParam) {
  var res = '';
  var i = 0;
  try {
    while (i < textParam.length) {
      var text = textParam[i];

      if (text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == '-' || text == '.') {
        // si es diferente simplemente concatena el carácter original de la cadena original.
        res += text;
      } else {
        // si no es diferente concatena el carácter que introdujiste a remplazar
        //nlapiLogExecution('AUDIT', 'SL| No es número - ó .: ', text);
      }
      i++;
    } // Fin del while
  }
  catch (e) {
    var vale = e;
    nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
  }
  return res;
}

function getFecha() {
  var valFecha = '';
  var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
  var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
  var f = new Date();
  valFecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  return valFecha;
}

