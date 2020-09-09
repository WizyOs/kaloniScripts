/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/record', 'N/xml', 'N/file'],

   function (widget, record, xml, file) {

      function onRequest(context) {
         var recordCase_Id = context.request.parameters.recordCaseId;
         var compaId = context.request.parameters.compaId;

         var inRecord = record.load({ type: 'SUPPORTCASE', id: recordCase_Id, isDynamic: true });
         var type_alop = inRecord.getValue({ fieldId: 'custevent294' });
         var cie = inRecord.getText({ fieldId: 'custevent290' });
         var DCDOA1 = inRecord.getValue({ fieldId: 'custevent303' });
         var imageCabezaId = '743298';
         var imageDiagramCabeza = null;
         var imageRostroId = '2592214';
         var imageDiagramRostro = null;

         var DCDOB1 = inRecord.getValue({ fieldId: 'custevent302' });
         var DCDOC1 = inRecord.getValue({ fieldId: 'custevent301' });
         var DCDOpro = inRecord.getValue({ fieldId: 'custevent300' });
         var DCZRA1 = inRecord.getValue({ fieldId: 'custevent299' });
         var DCZRB1 = inRecord.getValue({ fieldId: 'custevent298' });
         var DCZRC1 = inRecord.getValue({ fieldId: 'custevent297' });
         var DCZRpro = inRecord.getValue({ fieldId: 'custevent296' });
         var AreaZD = inRecord.getValue({ fieldId: 'custevent304' });
         var AreaZDA = inRecord.getValue({ fieldId: 'custevent305' });
         var AreaZDB = inRecord.getValue({ fieldId: 'custevent306' });
         var AreaZDC = inRecord.getValue({ fieldId: 'custevent307' });
         var AreaZD2 = inRecord.getValue({ fieldId: 'custevent308' });
         var type_alop_text = inRecord.getText({ fieldId: 'custevent309' });
         var type_razurado = inRecord.getText({ fieldId: 'custevent311' });
         var patologi = inRecord.getValue({ fieldId: 'custevent310' });
         //Nuevas areas de zonas receptoras para Barba
         var DCROD = inRecord.getValue('custevent620');
         var DCROF = inRecord.getValue('custevent621');
         var DCROG = inRecord.getValue('custevent622');
         var DCROH = inRecord.getValue('custevent623');
         var DCROI = inRecord.getValue('custevent624');

         var file_image1 = '';
         var image_url1 = '';
         var img_val_1 = '';
         var file_image2 = '';
         var image_url2 = '';
         var img_val_2 = '';
         var file_image3 = '';
         var image_url3 = '';
         var img_val_3 = '';
         var file_image4 = '';
         var image_url4 = '';
         var img_val_4 = '';

         var imagenPinturaCabeza_value = inRecord.getValue('custevent512') || null;
         if (imagenPinturaCabeza_value != null) {
            imageDiagramCabeza = "<img height=\"200px\" width=\"160px\" src=\"" + xml.escape(imagenPinturaCabeza_value) + "\"/>";
         } else {
            var imagenPinturaCabeza_default = file.load(imageCabezaId);
            var imageURLcabeza = imagenPinturaCabeza_default.url;
            imageDiagramCabeza = "<img height=\"200px\" width=\"160px\" src=\"" + xml.escape(imageURLcabeza) + "\"/>";
         }

         var imagenPinturaRostro_value = inRecord.getValue('custevent800') || null;
         if (imagenPinturaRostro_value != null) {
            imageDiagramRostro = "<img height=\"220px\" width=\"220px\" src=\"" + xml.escape(imagenPinturaRostro_value) + "\"/>";
         } else {
            var imagenPinturaRostro_default = file.load(imageRostroId)
            var imageURLrostro = imagenPinturaRostro_default.url;
            imageDiagramRostro = "<img height=\"180px\" width=\"180px\" src=\"" + xml.escape(imageURLrostro) + "\"/>";
         }

         var image_valoration1 = inRecord.getValue({ fieldId: 'custevent313' });
         if (image_valoration1 != null && image_valoration1 != "") {
            file_image1 = file.load(image_valoration1);
            image_url1 = file_image1.url;
            img_val_1 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url1) + "\"/>";
         } else {
            //img_val_1 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            file_image1 = file.load("1592235");
            image_url1 = file_image1.url;
            img_val_1 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url1) + "\"/>";
         }

         var image_valoration2 = inRecord.getValue({ fieldId: 'custevent314' });
         if (image_valoration2 != null && image_valoration2 != "") {
            file_image2 = file.load(image_valoration2);
            image_url2 = file_image2.url;
            img_val_2 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url2) + "\"/>";
         } else {
            //img_val_2 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            file_image2 = file.load("1592235");
            image_url2 = file_image2.url;
            img_val_2 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url2) + "\"/>";
         }

         var image_valoration3 = inRecord.getValue({ fieldId: 'custevent315' });
         if (image_valoration3 != null && image_valoration3 != "") {
            file_image3 = file.load(image_valoration3);
            image_url3 = file_image3.url;
            img_val_3 = "<img height=\"300px\" width=\"300px\"  src=\"" + xml.escape(image_url3) + "\"/>";
         } else {
            //img_val_3 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            file_image3 = file.load("1592235");
            image_url3 = file_image3.url;
            img_val_3 = "<img height=\"300px\" width=\"300px\"  src=\"" + xml.escape(image_url3) + "\"/>";
         }

         var image_valoration4 = inRecord.getValue({ fieldId: 'custevent316' });
         if (image_valoration4 != null && image_valoration4 != "") {
            file_image4 = file.load(image_valoration4);
            image_url4 = file_image4.url;
            img_val_4 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url4) + "\"/>";
         } else {
            //img_val_4 = "<p style=\"color:red\">NO HAY IMAGEN!</p>";
            file_image4 = file.load("1592235");
            image_url4 = file_image4.url;
            img_val_4 = "<img height=\"300px\" width=\"300px\" src=\"" + xml.escape(image_url4) + "\"/>";
         }
         var observaciones = inRecord.getValue({ fieldId: 'custevent279' });
         var idx = inRecord.getValue({ fieldId: 'custevent281' });
         var tx = inRecord.getValue({ fieldId: 'custevent280' });

         var cliRecord = record.load({ type: 'customer', id: compaId, isDynamic: true });
         var name = cliRecord.getValue({ fieldId: 'altname' });
         var medS = inRecord.getValue({ fieldId: 'custevent2' });
         var nameMedico = inRecord.getText({ fieldId: 'custevent322' });

         var fecha = new Date();
         fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

         var field_firmaNula = 'data:image/png;base64,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';

         var headPDF = '<body>' +
            '<div align="center" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
            '<div id="scroll"><div id="notices">' +
            '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 50px;margin-top:20px">' +
            '<h1 id="titulo">DIAGNÓSTICO CAPILAR</h1>';

         var bodyPDF = "<table><tr><td></td></tr></table>";
         bodyPDF += "<table style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td style=\"align:lefth\">";
         bodyPDF += "<ul><li>DIAGRAMA DE CLASIFICACIÓN TIPO AA</li></ul>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\">" + funt1(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt2(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt3(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt4(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt5(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt6(type_alop) + "</td>";
         bodyPDF += "<td align=\"center\">" + funt7(type_alop) + "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\">1</td>";
         bodyPDF += "<td align=\"center\">2</td>";
         bodyPDF += "<td align=\"center\">3</td>";
         bodyPDF += "<td align=\"center\">4</td>";
         bodyPDF += "<td align=\"center\">5</td>";
         bodyPDF += "<td align=\"center\">6</td>";
         bodyPDF += "<td align=\"center\">7</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td colspan=\"3\" style=\"align:lefth\">Grado:&nbsp;<b>" + checado(type_alop) + "</b></td>";
         bodyPDF += "<td colspan=\"4\" style=\"align:lefth\">CIE10:&nbsp;<b>" + checado(cie) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";


         bodyPDF += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\" border=\"1px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td colspan=\"2\" style=\"font-family:'Aria', sans-serif; font-size:'12px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\">";
         bodyPDF += "<ul>";
         bodyPDF += "<li><b>REGISTRO DE EVALUACIÓN DE DENSIDAD</b></li>";
         bodyPDF += "</ul>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante A1 </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOA1) + "</b></td>";
         bodyPDF += "<td width=\"180\" height=\"200px\" align=\"center\" border=\"1px\" rowspan=\"9\">" + imageDiagramCabeza + " </td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante B1 </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOB1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante C1 </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOC1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante (PROMEDIO) </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCDOpro) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora A </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRA1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora B </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRB1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora C </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRC1) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora (PROMEDIO) </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCZRpro) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora D </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCROD) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora F </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCROF) + "</b></td>";
         bodyPDF += "<td width=\"180\" height=\"180px\" align=\"center\" border=\"1px\" rowspan=\"10\">" + imageDiagramRostro + " </td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora G </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCROG) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora H </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCROH) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora I </td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(DCROI) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td colspan=\"2\" style=\"font-family:'Aria', sans-serif; font-size:'12px'\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"left\">";
         bodyPDF += "<ul>";
         bodyPDF += "<li><b>ÁREA DE MEDICIÓN</b></li>";
         bodyPDF += "</ul>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona donante</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZD) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora A</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDA) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora B</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDB) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora C</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZDC) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td valign=\"middle\" border=\"1px\">Área (cm2) en zona receptora</td>";
         bodyPDF += "<td valign=\"middle\" align=\"center\" border=\"1px\"><b>" + checado(AreaZD2) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<br/><br/><table style=\"font-family:'Aria', sans-serif; font-size: 15px\" width=\"100%\" >";
         bodyPDF += "<tr>";
         bodyPDF += "<td style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" ><b>TIPOS DE ALOPECIA</b>";
         bodyPDF += "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table border=\"1px\" width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td border=\"1px\" width=\"30%\" align=\"center\">TIPO:&nbsp;<b>" + checado(type_alop_text) + "</b></td>";
         bodyPDF += "<td border=\"1px\" width=\"40%\" align=\"center\">RASURADO:&nbsp;<b>" + checado(type_razurado) + "</b></td>";
         bodyPDF += "<td border=\"1px\" width=\"30%\" align=\"center\">PATOLOGÍA:&nbsp;<b>" + checado(patologi) + "</b></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table >";

         bodyPDF += "<br/><br/><br/><br/><br/><table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\">";
         bodyPDF += "<tr>";
         bodyPDF += "<td width=\"50%\" align=\"center\">Zona donadora<br/>" + img_val_1 + "</td>";
         bodyPDF += "<td width=\"50%\" align=\"center\">Frontal<br/>" + img_val_2 + "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td width=\"50%\" align=\"center\">Coronilla<br/>" + img_val_3 + "</td>";
         bodyPDF += "<td width=\"50%\"  align=\"center\">Área a tratar<br/>" + img_val_4 + "</td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif; font-size: 15px\" >";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"><img id=\"myImgFirmaCli\" src=\"" + field_firmaNula + "\" width=\"200\" height=\"200\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "<td width=\"300px\" align=\"center\" valign=\"middle\" style=\"border-top:1px solid #000000;\"><b>FIRMA DEL PACIENTE</b></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "</tr>";
         bodyPDF += "<tr>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\">" + checado(name) + "</td>";
         bodyPDF += "<td align=\"center\" valign=\"middle\"></td>";
         bodyPDF += "</tr>";
         bodyPDF += "</table>";

         bodyPDF += "<br/><br/><br/><br/><table style=\"width:100%; font-size: 15px; font-family:'Aria', sans-serif\">";
         bodyPDF += '<tr><td >EXPLORACIÓN Y HALLAZGOS:</td></tr>';
         bodyPDF += '<tr><td height="120px" valign=\"top\" style="border: 1px solid black"><b>' + observaciones + '</b></td></tr>';
         bodyPDF += '</table>';

         bodyPDF += "<table style=\"width:100%; font-size: 15px; font-family:'Aria', sans-serif\">";
         bodyPDF += '<tr><td>IDX:</td></tr>';
         bodyPDF += '<tr><td height="120px" valign=\"top\" style="border: 1px solid black"><b>' + idx + '</b></td></tr>';
         bodyPDF += '</table>';

         bodyPDF += "<table style=\"width:100%; font-size: 15px; font-family:'Aria', sans-serif\">";
         bodyPDF += '<tr><td>TX:</td></tr>';
         bodyPDF += '<tr><td height="120" valign=\"top\" style="border: 1px solid black"><b>' + tx + '</b></td></tr>';
         bodyPDF += '</table>';

         var footerPDF = '' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</body>';

         var formulario = widget.createForm({ title: 'Firma Diagnóstico' });
         var pdfDoc = formulario.addField({ id: 'custpage_pdfdoc', label: 'PdfDoc', type: 'inlinehtml' });

         pdfDoc.defaultValue = headPDF + bodyPDF + footerPDF;

         var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firma', type: 'inlinehtml' });
         firmasCambas.defaultValue = '<style type="text/css">' +

            '@media only screen and (min-width: 576px) {' +
            '    #texto{' +
            '    text-align: justify;' +
            'font-size:12px;' +
            '    }' +
            '    #fondo{' +
            'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'margin-left: 20px!important;' +
            'margin-right: 40px!important;' +
            'margin-bottom: 40px;' +
            'padding-bottom: 50px;' +
            'margin-top:10px' +
            '    }' +
            '}' +
            '@media only screen and (min-width: 768px) {' +
            '    #texto{' +
            '    text-align: justify;' +
            'font-size:12px;' +
            '    }' +
            '    #fondo{' +
            'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'margin-left: 40px!important;' +
            'margin-right: 40px!important;' +
            'margin-bottom: 40px;' +
            'padding-bottom: 50px;' +
            'margin-top:10px' +
            '    }' +
            '    #titulo{' +
            '    padding-top: 180px;' +
            '    }' +
            '}' +
            '@media only screen and (min-width: 768px) {' +
            '    #texto{' +
            '    text-align: justify;' +
            'font-size:12px;' +
            '    }' +
            '    #fondo{' +
            'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'margin-left: 20px!important;' +
            'margin-right: 40px!important;' +
            'margin-bottom: 40px;' +
            'padding-bottom: 50px;' +
            'margin-top:10px;' +
            '    }' +
            '    #titulo{' +
            '    padding-top: 180px;' +
            '    }' +
            '}' +
            '@media only screen and (min-width: 992px) {' +
            '    #texto{' +
            '    text-align: justify;' +
            'font-size:16px;' +
            '    }' +
            '    #fondo{' +
            'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
            'background-size: cover;' +
            'margin-left: 40px!important;' +
            'margin-right: 40px!important;' +
            'margin-bottom: 40px;' +
            'padding-bottom: 50px;' +
            'margin-top:10px;' +
            '    }' +
            '    #titulo{' +
            '    padding-top: 120px;' +
            '    }' +
            '}' +
            '@media only screen and (min-width: 1200px) {' +
            '    #texto{' +
            '    text-align: justify;' +
            'font-size:16px;' +
            '    }' +
            '    #fondo{' +
            'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
            'background-size: cover;' +
            'margin-left: 40px!important;' +
            'margin-right: 40px!important;' +
            'margin-bottom: 40px;' +
            'padding-bottom: 50px;' +
            'margin-top:10px;' +
            '    }' +
            '    #titulo{' +
            '    padding-top: 120px;' +
            '    }' +
            '}' +

            'body {font-family: Arial, Helvetica, sans-serif;}' +
            '.modal {' +
            '  display: none;' +
            '  position: fixed;' +
            '  z-index: 1; ' +
            '  padding-top: 100px; ' +
            '  left: 0;' +
            '  top: 0;' +
            '  width: 100%; ' +
            '  height: 100%;' +
            '  overflow: auto; ' +
            '  background-color: rgba(0,0,0,0.4);' +
            '}' +
            '' +
            '.modalPaciente {' +
            '  display: none;' +
            '  position: fixed;' +
            '  z-index: 1; ' +
            '  padding-top: 100px; ' +
            '  left: 0;' +
            '  top: 0;' +
            '  width: 100%; ' +
            '  height: 100%;' +
            '  overflow: auto; ' +
            '  background-color: rgba(0,0,0,0.4);' +
            '}' +
            '' +
            '.modal-content {' +
            '  background-color: #fefefe;' +
            '  margin: auto;' +
            '  padding: 10px;' +
            '  border: 1px solid #888;' +
            '  width: 528px;' +
            '  height: 560px;' +
            '}' +

            'h1 {' +
            '  border-bottom: 1px solid  #5D6975;' +
            '  color: #5D6975;' +
            '  font-size: 2.4em;' +
            '  line-height: 1.4em;' +
            '  font-weight: normal;' +
            '  text-align: center;' +
            '  margin: 0 0 20px 0;' +
            '}' +

            '#notices .notice {' +
            '  color: #5D6975;' +
            '  font-size: 1.2em;' +
            '}' +

            '#scroll {' +
            'border: 1px solid black;' +
            '  overflow-y: auto;' +
            '}' +

            '</style>' +

            '<div id="myModal" class="modalPaciente">' +
            '<div class="modal-content">' +
            '<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
            '<br /> <b><center>FIRMA DEL PACIENTE<br /></center></b>' +
            '<button id="btn_cerrarFirmaPaciente">Terminar</button>' +
            '</div>' +
            '</div>' +

            '<div id="myModal2" class="modal">' +
            '<div class="modal-content">' +
            '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
            '<br /> <b>FIRMA DEL MÉDICO</b>' +
            '</div>' +
            '</div>' +

            '<script type="application/javascript">' +
            'document.addEventListener("mousemove", function(e) {' +
            '  e.preventDefault();' +
            '},' +
            '{ passive: true });' +
            '(function() {' +
            '' +
            '    window.requestAnimFrame = (function (callback) {' +
            '        return window.requestAnimationFrame || ' +
            '                    window.webkitRequestAnimationFrame ||' +
            '                    window.mozRequestAnimationFrame ||' +
            '                    window.oRequestAnimationFrame ||' +
            '                    window.msRequestAnimaitonFrame ||' +
            '                    function (callback) {' +
            '                        window.setTimeout(callback, 1000/60);' +
            '                    };' +
            '    })();' +
            '' +
            '    var canvas = document.getElementById("sig-canvas");' +
            '    var ctx = canvas.getContext("2d");' +
            '    ctx.strokeStyle = "#222222";' +
            '    ctx.lineWith = 2;' +
            '' +
            '    var canvas2 = document.getElementById("sig-canvas2");' +
            '    var ctx2 = canvas2.getContext("2d");' +
            '    ctx2.strokeStyle = "#222222";' +
            '    ctx2.lineWith = 2;' +
            '' +
            '    var drawing = false;' +
            '    var mousePos = { x:0, y:0 };' +
            '    var lastPos = mousePos;' +
            '' +
            '    var drawing2 = false;' +
            '    var mousePos2 = { x:0, y:0 };' +
            '    var lastPos2 = mousePos2;' +
            '' +
            '    canvas.addEventListener("mousedown", function (e) {' +
            '        drawing = true;' +
            '        lastPos = getMousePos(canvas, e);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("mousedown", function (e) {' +
            '        drawing2 = true;' +
            '        lastPos2 = getMousePos(canvas2, e);' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("mouseup", function (e) {' +
            '        drawing = false;' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("mouseup", function (e) {' +
            '        drawing2 = false;' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("mousemove", function (e) {' +
            '        mousePos = getMousePos(canvas, e);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("mousemove", function (e) {' +
            '        mousePos2 = getMousePos(canvas2, e);' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("touchstart", function (e) {' +
            '        mousePos = getTouchPos(canvas, e);' +
            '        var touch = e.touches[0];' +
            '        var mouseEvent = new MouseEvent("mousedown", {' +
            '            clientX: touch.clientX,' +
            '            clientY: touch.clientY' +
            '        });' +
            '        canvas.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("touchstart", function (e) {' +
            '        mousePos2 = getTouchPos(canvas2, e);' +
            '        var touch = e.touches[0];' +
            '        var mouseEvent = new MouseEvent("mousedown", {' +
            '            clientX: touch.clientX,' +
            '            clientY: touch.clientY' +
            '        });' +
            '        canvas2.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '    canvas.addEventListener("touchend", function (e) {' +
            '        var mouseEvent = new MouseEvent("mouseup", {});' +
            '        canvas.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("touchend", function (e) {' +
            '        var mouseEvent = new MouseEvent("mouseup", {});' +
            '        canvas2.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '' +
            '    canvas.addEventListener("touchmove", function (e) {' +
            '        var touch = e.touches[0];' +
            '        var mouseEvent = new MouseEvent("mousemove", {' +
            '            clientX: touch.clientX,' +
            '            clientY: touch.clientY' +
            '        });' +
            '        canvas.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '    canvas2.addEventListener("touchmove", function (e) {' +
            '        var touch = e.touches[0];' +
            '        var mouseEvent = new MouseEvent("mousemove", {' +
            '            clientX: touch.clientX,' +
            '            clientY: touch.clientY' +
            '        });' +
            '        canvas2.dispatchEvent(mouseEvent);' +
            '    }, false);' +
            '' +
            '    document.body.addEventListener("touchstart", function (e) {' +
            '        if (e.target == canvas || e.target == canvas2) {' +
            '            e.preventDefault();' +
            '        }' +
            '    }, false);' +
            '' +
            '    document.body.addEventListener("touchend", function (e) {' +
            '        if (e.target == canvas || e.target == canvas2) {' +
            '            e.preventDefault();' +
            '        }' +
            '    }, false);' +
            '' +
            '    document.body.addEventListener("touchmove", function (e) {' +
            '        if (e.target == canvas || e.target == canvas2) {' +
            '            e.preventDefault();' +
            '        }' +
            '    }, false);' +
            '' +
            '    function getMousePos(canvasDom, mouseEvent) {' +
            '        var rect = canvasDom.getBoundingClientRect();' +
            '        return {' +
            '            x: mouseEvent.clientX - rect.left,' +
            '            y: mouseEvent.clientY - rect.top' +
            '        };' +
            '    }' +
            '' +
            '    function getTouchPos(canvasDom, touchEvent) {' +
            '        var rect = canvasDom.getBoundingClientRect();' +
            '        return {' +
            '            x: touchEvent.touches[0].clientX - rect.left,' +
            '            y: touchEvent.touches[0].clientY - rect.top' +
            '        };' +
            '    }' +
            '' +
            '    function renderCanvas() {' +
            '        if (drawing) {' +
            '            ctx.moveTo(lastPos.x, lastPos.y);' +
            '            ctx.lineTo(mousePos.x, mousePos.y);' +
            '            ctx.stroke();' +
            '            lastPos = mousePos;' +
            '        }' +
            '        if (drawing2) {' +
            '            ctx2.moveTo(lastPos2.x, lastPos2.y);' +
            '            ctx2.lineTo(mousePos2.x, mousePos2.y);' +
            '            ctx2.stroke();' +
            '            lastPos2 = mousePos2;' +
            '        }' +
            '    }' +
            '' +
            '    (function drawLoop () {' +
            '        requestAnimFrame(drawLoop);' +
            '        renderCanvas();' +
            '    })();' +
            '' +
            '})();' +
            '</script>';

         var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
         fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

         formulario.addButton({ id: 'custpage_01', label: 'Enviar Firma', functionName: 'enviarFirmas' });
         formulario.addButton({ id: 'custpage_0111', label: 'Limpiar Firma Paciente', functionName: 'limpiarFirmaCli' });
         //formulario.addButton({id: 'custpage_0114', label: 'Limpiar firma Médico', functionName: 'limpiarFirmaMed'});
         //formulario.addButton({id: 'custpage_0113', label: 'Mostrar firma', functionName: 'mostrarFirmas'});
         formulario.addButton({ id: 'custpage_0112', label: 'Firma Paciente', functionName: 'abrirModal' });
         //formulario.addButton({id: 'custpage_0115', label: 'Firma Médico', functionName: 'abrirModal2'});
         formulario.clientScriptFileId = '2122875';

         context.response.writePage(formulario);
      }

      function funt1(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743291&c=3559763&h=1e56212e1db2d20cecd8";
         if (entero == 1)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt2(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743292&c=3559763&h=76fba8deb7014f71c1f7";
         if (entero == 2)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt3(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743293&c=3559763&h=7dec6caa816e21b8bc6e";
         if (entero == 3)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt4(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743294&c=3559763&h=1185d5785a0770214839";
         if (entero == 4)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt5(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743295&c=3559763&h=7a635732f3364dfd193f";
         if (entero == 5)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt6(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743296&c=3559763&h=2d035ee0a3af4a40b135";
         if (entero == 6)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function funt7(Num) {
         var entero = parseInt(Num);
         var imageSelect = "";
         imageSelect = "https://system.na2.netsuite.com/core/media/media.nl?id=743297&c=3559763&h=d1987980bf9f6bb72443";
         if (entero == 7)
            imageSelect = "<div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);width:85px\"><img height=\"85px\" valign=\"middle\" width=\"100%\" src=\"" + xml.escape(imageSelect) + "\" /></div>";
         else
            imageSelect = "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\"" + xml.escape(imageSelect) + "\"></img>";

         return imageSelect;
      }

      function checado(checks) {
         var check = "";
         if (checks == "T") {
            var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
            check = "<img height=\"15px\" width=\"15px\" src=\"" + xml.escape(path) + "\">probando</img>";
         }
         else {
            if (checks == "F") {
               var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
               check = "<img height=\"15px\" width=\"15px\" src=\"" + xml.escape(path2) + "\"/>";
            }
            else {
               if (checks == null)
                  check = "";
               else
                  check = checks;
            }
         }
         return check;
      }

      return {
         onRequest: onRequest
      };

   });