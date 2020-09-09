//Define the User Event function for a beforeLoad operation.
function beforeLoadRecetas(type, form) {
    if (type == 'view') {
        var newRecord = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
        var subsidiaryField = newRecord.getFieldText('subsidiary');
        //var formulario = newRecord.getFieldValue('custevent338');
        var formulario = newRecord.getFieldValue('customform');
        var tipo = newRecord.getFieldValue('custevent203');
        var casenumber = newRecord.getFieldValue('casenumber');
        var role = nlapiGetRole();
        //nlapiLogExecution('DEBUG', 'ROLE: ', role);
        //nlapiLogExecution('DEBUG', 'FORM: ', formulario);
        //nlapiLogExecution('DEBUG', 'TIPO: ', tipo);

        if (formulario == '14' && role == '3') {//ID-14 Atencion cliente-Injerto -- ID-3 ROL ADMINISTRADOR
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        if (formulario == '14' && role == '1187') {//ID-14 Atencion cliente-Injerto -- ID-1187 ROL INJERTO
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        if (formulario == '14' && role == '1102') {//ID-14 Atencion cliente-Injerto -- ID-1102 ROL ENFERMERIA
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        if (formulario != '14' && role == '1173') {//ID-14 Atencion cliente-Injerto -- ID-1173 ROL RECEPCION
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        if (formulario == '14' && role == '1173') {//ID-14 Atencion cliente-Injerto -- ID-1173 ROL RECEPCION
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }

        if (formulario == '26' && role == '3') {//ID-26 Enfermeria -- ID-3 ROL ADMINISTRADOR
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        if (formulario == '26' && role == '1187') {//ID-26 Enfermeria -- ID-1187 ROL INJERTO
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        if (formulario == '26' && role == '1102') {//ID-26 Enfermeria -- ID-1102 ROL ENFERMERIA
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetas_button_view', 'R. Farmacia', 'callSuitelet()');
            }
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasM_button_view', 'R. Paciente', 'callSuiteletM()');
            }
        }
        ////////////////////////////////
		/*if(formulario == '14' && role == '3' && tipo == null){
      		newRecord.setFieldValue('custevent196', indicaciones1);
        	nlapiSubmitRecord(newRecord, false, true);
            }*/

        if (formulario == '135') { //ID-135 Diagnostigo
            if (nlapiGetContext().getExecutionContext() == 'userinterface') {
                /*
                              var boolVAL = false;
                              var img_Valoracion1 = newRecord.getFieldValue('custevent313');
                              //var urlValoracion1 = nlapiLookupField('file', img_Valoracion1, 'url');
                              if(img_Valoracion1 != null && img_Valoracion1 != "")
                              {
                                  var file_image1 = nlapiLoadFile(img_Valoracion1);
                                  var image_url1 = file_image1.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración1.txt', 'PLAINTEXT', image_url1);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent475', idx);
                                  boolVAL = true;
                               }
                               else
                               {
                                  var file_image1 = nlapiLoadFile("1592235");
                                  var image_url1 = file_image1.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración1.txt', 'PLAINTEXT', image_url1);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent475', idx);
                                  boolVAL = true;
                               }
                
                              var img_Valoracion2 = newRecord.getFieldValue('custevent314');
                              if(img_Valoracion2 != null && img_Valoracion2 != "")
                              {
                                var file_image2 = nlapiLoadFile(img_Valoracion2);
                                var image_url2 = file_image2.getValue();
                                var filex = nlapiCreateFile(casenumber+'_IMG_valoración2.txt', 'PLAINTEXT', image_url2);
                                filex.setFolder(1510431);
                                var idx = nlapiSubmitFile(filex);
                                newRecord.setFieldValue('custevent476', idx);
                                boolVAL = true;
                               }
                               else
                               {
                                  var file_image2 = nlapiLoadFile("1592235");
                                  var image_url2 = file_image2.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración2.txt', 'PLAINTEXT', image_url2);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent476', idx);
                                  boolVAL = true;
                               }
                
                              var img_Valoracion3 = newRecord.getFieldValue('custevent315');
                              if(img_Valoracion3 != null && img_Valoracion3 != "")
                              {
                                  var file_image3 = nlapiLoadFile(img_Valoracion3);
                                  var image_url3 = file_image3.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración3.txt', 'PLAINTEXT', image_url3);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent477', idx);
                                  boolVAL = true;
                               }
                               else
                               {
                                  var file_image3 = nlapiLoadFile("1592235");
                                  var image_url3 = file_image3.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración3.txt', 'PLAINTEXT', image_url3);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent477', idx);
                                  boolVAL = true;
                               }
                
                              var img_Valoracion4 = newRecord.getFieldValue('custevent316');
                              if(img_Valoracion4 != null && img_Valoracion4 != "")
                              {
                                  var file_image4 = nlapiLoadFile(img_Valoracion4);
                                  var image_url4 = file_image4.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración4.txt', 'PLAINTEXT', image_url4);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent478', idx);
                                  boolVAL = true;
                               }
                               else
                               {
                                  var file_image4 = nlapiLoadFile("1592235");
                                  var image_url4 = file_image4.getValue();
                                  var filex = nlapiCreateFile(casenumber+'_IMG_valoración4.txt', 'PLAINTEXT', image_url4);
                                  filex.setFolder(1510431);
                                  var idx = nlapiSubmitFile(filex);
                                  newRecord.setFieldValue('custevent478', idx);
                                  boolVAL = true;
                               }
                              if(boolVAL)
                                    nlapiSubmitRecord(newRecord);*/

                form.setScript('customscript893'); // id of client script
                form.addButton('custpage_pdfRecetasD_button_view', 'Ver Exp.', 'callSuiteletD()');
            }
        }

    }
}

function afterSubmitRecetas(type, form) {
    if (type == 'edit') {
        var customerRecord = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
        var formulario1 = customerRecord.getFieldValue('customform');
        var tipo1 = customerRecord.getFieldValue('custevent196');
        var tipo2 = customerRecord.getFieldValue('custevent204');
        var tipo3 = customerRecord.getFieldValue('custevent187');
        var tipo4 = customerRecord.getFieldValue('custevent188');
        var tipo5 = customerRecord.getFieldValue('custevent189');
        var tipo6 = customerRecord.getFieldValue('custevent190');
        var idioma = customerRecord.getFieldValue('custevent484');
        nlapiLogExecution('DEBUG', 'idioma: ', idioma);
        var rol = nlapiGetRole();

        var indicaciones1 = '';
        var indicaciones2 = '';
        var indicaciones3 = '';
        var indicaciones4 = '';
        var indicaciones5 = '';
        var indicaciones6 = '';

        if (idioma == "T") {
            indicaciones1 = "• Remove the gauze from the donor area in the next 3 hours.• Do not bend or lift heaving objects for the next 72 hours.• Moisten the implanted area every hour with Glaciar Kaloni Spring Water for the next 10 days.• Wrap your pillow with a towel for the first 3 nights, due to the lymphatic fluid from the donor area.• Wash the implanted area with the Hair Loss Shampoo for the first 3 days without direct contact with the area using a small contanier. Let it work for a couple minutes and rinse the shampoo with water. From the 4th to the 10th day, you will alternate (1 day and 1 day) with the Hair Loss and Oil Control Shampoos washing only with your finger tips without rubbing.• Avoid touching the implant during the first 3 days.• Avoid pools, saunas, steam chambers, lakes and the sea for a month.• Do not expose to the sun for the next 90 days more than 15 minutes.• Avoid food with excess salt for 3 days.• Avoid the usage of hats. If necessary, use arigid hat without touching the graft area.• Remember to come back for your check up in 10 days tops.• Do not shave or use hair clippers on the graft area for 1 month.";
            indicaciones2 = "• Remove the gauze from the donor area in the next 3 hours.• Do not bend or lift heaving objects for the next 72 hours.• Moisten the implanted area every hour with Glaciar Kaloni Spring Water for the next 10 days.• Wrap your pillow with a towel for the first 3 nights, due to the lymphatic fluid from the donor area.• Wash the injected area during the first 3 days using a receiver, only by runoff; and from day 4 to 10, continue washing by runoff using the fingertips without rubbing or drying.• Avoid touching the implant during the first 3 days.• Avoid pools, saunas, steam chambers, lakes and the sea for a month.• Do not expose to the sun for the next 90 days more than 15 minutes.• Avoid food with excess salt for 3 days.• Avoid the usage of hats. If necessary, use arigid hat without touching the graft area.• Remember to come back for your check up in 10 days tops.• Do not shave or use hair clippers on the graft area for 1 month.";
            indicaciones3 = 'Wash implated area with anti hair loss shampoo during the first three days using a container, only by rinsing it; from day 4 to 10 alternate the shampoos (anti hair loss one day and oil control the next) using only the tip of your fingers without scrubing.';
            indicaciones4 = 'Starting on day 4 to 10 alternate the shampoos (anti hair loss one day oil control the next) using only the tip of your fingers without scrubing.';
            indicaciones5 = 'Keep the implats moist by spraing them with the Glaciar Water every 20 minutes during the next 10 days.';
            indicaciones6 = 'Take one tablespoon desolved in water every morning';
            //nlapiLogExecution('DEBUG', 'indicaciones1: ', indicaciones1);

            customerRecord.setFieldValue('custevent196', indicaciones1);
            customerRecord.setFieldValue('custevent204', indicaciones2);
            customerRecord.setFieldValue('custevent187', indicaciones3);
            customerRecord.setFieldValue('custevent188', indicaciones4);
            customerRecord.setFieldValue('custevent189', indicaciones5);
            customerRecord.setFieldValue('custevent190', indicaciones6);
            nlapiSubmitRecord(customerRecord, false, true);

        } else if (idioma == "F") {
            indicaciones1 = "• Humedecer los implantes cada 20 minutos con Agua Glaciar por los próximos 10 días.• Retirar la gasa de la zona donadora en las próximas 3 horas.• Envuelva su almohada con una toalla o tela las primeras 3 noches. Estará saliendo líquido de anestesia lo cual es normal.•	Lavar la zona injertada con Shampoo Control Caída durante los primeros 3 días usando un recipiente, solamente por escurrimiento; y del 4 al 10 alternar un día y un día cada Shampoo, usando solo las yemas de los dedos sin frotar.• No agacharse o levantar cosas pesadas por las próximas 72 horas.•	Evitar tocar la zona del implante durante los primeros 10 días.• No hacer ejercicio físico intenso durante las primeras 2 semanas.•	Evitar el contacto directo del agua de las regaderas sobre la zona injertada los primeros 10 días.•	No alberca, mar, sauna y vapor por un mes.•	No exponerse al sol durante los próximos 90 días.• Evitar el consumo excesivo de sal por 3 días.• No usar máquina rasuradora en zona de injertos durante 1 mes.• Evitar dentro de lo posible el uso de gorra, y si fuera necesario, utilizarla sobrepuesta durante las primeras semanas.• Recuerde volver para su próxima revisión dentro de 24 horas.";
            indicaciones2 = "• Humedecer los implantes cada 20 minutos con Agua Glaciar por los próximos 10 días.• Retirar la gasa de la zona donadora en las próximas 3 horas.• Envuelva su almohada con una toalla o tela las primeras 3 noches. Estará saliendo líquido de anestesia lo cual es normal.• Lavar la zona injertada durante los primeros 3 días usando un recipiente, solamente por escurrimiento; y del día 4 al 10  continuar lavando por escurrimiento usando las yemas de los dedos sin frotar ni secar.• No agacharse o levantar cosas pesadas por las próximas 72 horas.• Evitar tocar la zona del implante durante los primeros 10 días. Sólo podrá tocar a partir del día 4 para lavar.• No hacer ejercicio físico intenso durante las primeras 2 semanas.• Evitar el contacto directo del agua de las regaderas sobre la zona injertada los primeros 10 días.· No alberca, mar, sauna y vapor por un mes.• No exponerse al sol durante los próximos 90 días.• Evitar el consumo excesivo de sal por 3 días.• No usar máquina rasuradora en zona de injertos durante 1 mes.· En el caso de microinjerto de cejas, evitar maquillaje en esta zona el primer mes.· Recuerde volver para su próxima revisión dentro de 24 horas.";
            indicaciones3 = "Lavar la zona injertada con Shampoo Control Caída durante los primeros 3 días utilizando un recipiente, solamente por escurrimiento;   y del día 4  al 10 alternar un día y un día cada Shampoo (control grasa y control caída) , usando solo las yemas de los dedos sin frotar.";
            indicaciones4 = "A partir del día 4  al 10 alternar un día y un día cada Shampoo (control grasa y control caída) , usando solo las yemas de los dedos sin frotar.";
            indicaciones5 = "Humedecer los implantes cada 20 minutos con Agua Glaciar durante los próximos 10 días.";
            indicaciones6 = "1 cucharada cafetera por las mañanas disuelta en agua.";

            customerRecord.setFieldValue('custevent196', indicaciones1);
            customerRecord.setFieldValue('custevent204', indicaciones2);
            customerRecord.setFieldValue('custevent187', indicaciones3);
            customerRecord.setFieldValue('custevent188', indicaciones4);
            customerRecord.setFieldValue('custevent189', indicaciones5);
            customerRecord.setFieldValue('custevent190', indicaciones6);
            nlapiSubmitRecord(customerRecord, false, true);
        }

        if (formulario1 == '14' && rol == '3') { // ID 14 Injerto - 3 ROL Admin
            if (tipo1 == null || tipo2 == null || tipo3 == null || tipo4 == null || tipo5 == null || tipo6 == null) {
                customerRecord.setFieldValue('custevent196', indicaciones1);
                customerRecord.setFieldValue('custevent204', indicaciones2);
                customerRecord.setFieldValue('custevent187', indicaciones3);
                customerRecord.setFieldValue('custevent188', indicaciones4);
                customerRecord.setFieldValue('custevent189', indicaciones5);
                customerRecord.setFieldValue('custevent190', indicaciones6);
                nlapiSubmitRecord(customerRecord, false, true);
            }
        }
        if (formulario1 == '14' && rol == '1187') { // ID 14 Injerto - 1187 ROL INJERTO
            if (tipo1 == null || tipo2 == null || tipo3 == null || tipo4 == null || tipo5 == null || tipo6 == null) {
                customerRecord.setFieldValue('custevent196', indicaciones1);
                customerRecord.setFieldValue('custevent204', indicaciones2);
                customerRecord.setFieldValue('custevent187', indicaciones3);
                customerRecord.setFieldValue('custevent188', indicaciones4);
                customerRecord.setFieldValue('custevent189', indicaciones5);
                customerRecord.setFieldValue('custevent190', indicaciones6);
                nlapiSubmitRecord(customerRecord, false, true);
            }
        }
        if (formulario1 == '14' && rol == '1102') { // ID 14 Injerto - 1102 ROL ENFERMERIA
            if (tipo1 == null || tipo2 == null || tipo3 == null || tipo4 == null || tipo5 == null || tipo6 == null) {
                customerRecord.setFieldValue('custevent196', indicaciones1);
                customerRecord.setFieldValue('custevent204', indicaciones2);
                customerRecord.setFieldValue('custevent187', indicaciones3);
                customerRecord.setFieldValue('custevent188', indicaciones4);
                customerRecord.setFieldValue('custevent189', indicaciones5);
                customerRecord.setFieldValue('custevent190', indicaciones6);
                nlapiSubmitRecord(customerRecord, false, true);
            }
        }
        if (formulario1 == '14' && rol == '1173') { // ID 14 Injerto - 1173 ROL RECEPCIÓN
            if (tipo1 == null || tipo2 == null || tipo3 == null || tipo4 == null || tipo5 == null || tipo6 == null) {
                customerRecord.setFieldValue('custevent196', indicaciones1);
                customerRecord.setFieldValue('custevent204', indicaciones2);
                customerRecord.setFieldValue('custevent187', indicaciones3);
                customerRecord.setFieldValue('custevent188', indicaciones4);
                customerRecord.setFieldValue('custevent189', indicaciones5);
                customerRecord.setFieldValue('custevent190', indicaciones6);
                nlapiSubmitRecord(customerRecord, false, true);
            }
        }
    }
}