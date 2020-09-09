/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define(['N/record', 'N/log'], function (record, log) {

    function pageInit(context) {

    }

    function fieldChanged(context) {
        var objRecord = context.currentRecord;


        var check_changeToEnglish = objRecord.getValue('custevent484');
        console.log(check_changeToEnglish);

        if (check_changeToEnglish === true) {
            console.log('Change to english');
            customform = objRecord.getValue('customform');
            urlBrowser = document.location.href;
            paramsUrl = new URL(urlBrowser);
            modeInterface = paramsUrl.searchParams.get("e");
    
            indicacionCabeza = objRecord.getText({ fieldId: 'custevent196' }) || null;
            indicacionBarba = objRecord.getText({ fieldId: 'custevent204' }) || null;
            indicacion_1 = objRecord.getText({ fieldId: 'custevent187' }) || null;
            indicacion_2 = objRecord.getText({ fieldId: 'custevent188' }) || null;
            indicacion_3 = objRecord.getText({ fieldId: 'custevent189' }) || null;
            indicacion_4 = objRecord.getText({ fieldId: 'custevent190' }) || null;
            if (modeInterface == 'T' && customform == 14) {
                comentario_capilar_receta = '• Remove the gauze from the donor area in the next 3 hours. \n' +
                    '• Do not bend or lift heaving objects for the next 72 hours. \n' +
                    '• Moisten the implanted area every hour with Glaciar Kaloni Spring Water for the next 10 days. \n' +
                    '• Wrap your pillow with a towel for the first 3 nights, due to the lymphatic fluid from the donor area. \n' +
                    '• Wash the implanted area with the Hair Loss Shampoo for the first 3 days without direct contact with the area using a small contanier. Let it work for a couple minutes and rinse the shampoo with water. From the 4th to the 10th day, you will alternate (1 day and 1 day) with the Hair Loss and Oil Control Shampoos washing only with your finger tips without rubbing. \n' +
                    '• Avoid touching the implant during the first 3 days. \n' +
                    '• Avoid pools, saunas, steam chambers, lakes and the sea for a month. \n' +
                    '• Do not expose to the sun for the next 90 days more than 15 minutes. \n' +
                    '• Avoid food with excess salt for 3 days. \n' +
                    '• Avoid the usage of hats. If necessary, use arigid hat without touching the graft area. \n' +
                    '• Remember to come back for your check up in 10 days tops. \n' +
                    '• Do not shave or use hair clippers on the graft area for 1 month.';
                comentario_barbaCeja_receta = '• Remove the gauze from the donor area in the next 3 hours. \n' +
                    '• Do not bend or lift heaving objects for the next 72 hours. \n' +
                    '• Moisten the implanted area every hour with Glaciar Kaloni Spring Water for the next 10 days. \n' +
                    '• Wrap your pillow with a towel for the first 3 nights, due to the lymphatic fluid from the donor area. \n' +
                    '• Wash the injected area during the first 3 days using a receiver, only by runoff; and from day 4 to 10, continue washing by runoff using the fingertips without rubbing or drying. \n' +
                    '• Avoid touching the implant during the first 3 days. \n' +
                    '• Avoid pools, saunas, steam chambers, lakes and the sea for a month. \n' +
                    '• Do not expose to the sun for the next 90 days more than 15 minutes. \n' +
                    '• Avoid food with excess salt for 3 days. \n' +
                    '• Avoid the usage of hats. If necessary, use arigid hat without touching the graft area. \n' +
                    '• Remember to come back for your check up in 10 days tops. \n' +
                    '• Do not shave or use hair clippers on the graft area for 1 month.';
                indicaciones_1_recetas = 'Wash implated area with anti hair loss shampoo during the first three days using a container, only by rinsing it; from day 4 to 10 alternate the shampoos (anti hair loss one day and oil control the next) using only the tip of your fingers without scrubing.';
                indicaciones_2_recetas = 'Starting on day 4 to 10 alternate the shampoos (anti hair loss one day oil control the next) using only the tip of your fingers without scrubing.';
                indicaciones_3_recetas = 'Keep the implats moist by spraing them with the Glaciar Water every 20 minutes during the next 10 days.';
                indicaciones_4_recetas = 'Take one tablespoon desolved in water every morning';

                if (indicacionCabeza != comentario_capilar_receta) {
                    objRecord.setText({ fieldId: 'custevent196', text: comentario_capilar_receta, ignoreFieldChange: true });
                }
                if (indicacionBarba != comentario_barbaCeja_receta) {
                    objRecord.setText({ fieldId: 'custevent204', text: comentario_barbaCeja_receta, ignoreFieldChange: true });
                }
                if (indicacion_1 != indicaciones_1_recetas) {
                    objRecord.setText({ fieldId: 'custevent187', text: indicaciones_1_recetas, ignoreFieldChange: true });
                }
                if (indicacion_2 != indicaciones_2_recetas) {
                    objRecord.setText({ fieldId: 'custevent188', text: indicaciones_2_recetas, ignoreFieldChange: true });
                }
                if (indicacion_3 != indicaciones_3_recetas) {
                    objRecord.setText({ fieldId: 'custevent189', text: indicaciones_3_recetas, ignoreFieldChange: true });
                }
                if (indicacion_4 != indicaciones_4_recetas) {
                    objRecord.setText({ fieldId: 'custevent190', text: indicaciones_4_recetas, ignoreFieldChange: true });
                }
          }
        } else if (check_changeToEnglish === false) {
            console.log('Cambia a español');
            customform = objRecord.getValue('customform');
            urlBrowser = document.location.href;
            paramsUrl = new URL(urlBrowser);
            modeInterface = paramsUrl.searchParams.get("e");
    
            indicacionCabeza = objRecord.getText({ fieldId: 'custevent196' }) || null;
            indicacionBarba = objRecord.getText({ fieldId: 'custevent204' }) || null;
            indicacion_1 = objRecord.getText({ fieldId: 'custevent187' }) || null;
            indicacion_2 = objRecord.getText({ fieldId: 'custevent188' }) || null;
            indicacion_3 = objRecord.getText({ fieldId: 'custevent189' }) || null;
            indicacion_4 = objRecord.getText({ fieldId: 'custevent190' }) || null;
            if (modeInterface == 'T' && customform == 14) {
                comentario_capilar_receta = '• Humedecer los implantes cada 20 minutos con Agua Glaciar por los próximos 10 días. \n' +
                    '• Retirar la gasa de la zona donadora en las próximas 3 horas.\n' +
                    '• Envuelva su almohada con una toalla o tela las primeras 3 noches. Estará saliendo líquido de anestesia lo cual es normal.\n' +
                    '• Lavar la zona injertada con Shampoo Control Caída durante los primeros 3 días usando un recipiente, solamente por escurrimiento; y del 4 al 10 alternar un día y un día cada Shampoo, usando solo las yemas de los dedos sin frotar.\n' +
                    '• No agacharse o levantar cosas pesadas por las próximas 72 horas.\n' +
                    '• Evitar tocar la zona del implante durante los primeros 10 días.\n' +
                    '• No hacer ejercicio físico intenso durante las primeras 2 semanas.\n' +
                    '• Evitar el contacto directo del agua de las regaderas sobre la zona injertada los primeros 10 días.\n' +
                    '• No alberca, mar, sauna y vapor por un mes.\n' +
                    '• No exponerse al sol durante los próximos 90 días.\n' +
                    '• Evitar el consumo excesivo de sal por 3 días.\n' +
                    '• No usar máquina rasuradora en zona de injertos durante 1 mes.\n' +
                    '• Evitar dentro de lo posible el uso de gorra, y si fuera necesario, utilizarla sobrepuesta durante las primeras semanas.\n' +
                    '• Recuerde volver para su próxima revisión dentro de 24 horas.\n';

                comentario_barbaCeja_receta = '• Humedecer los implantes cada 20 minutos con Agua Glaciar por los próximos 10 días.\n' +
                    '• Retirar la gasa de la zona donadora en las próximas 3 horas.\n' +
                    '• Envuelva su almohada con una toalla o tela las primeras 3 noches. Estará saliendo líquido de anestesia lo cual es normal.\n' +
                    '• Lavar la zona injertada durante los primeros 3 días usando un recipiente, solamente por escurrimiento; y del día 4 al 10, continuar lavando por escurrimiento usando las yemas de los dedos sin frotar ni secar.\n' +
                    '• No agacharse o levantar cosas pesadas por las próximas 72 horas.\n' +
                    '• Evitar tocar la zona del implante durante los primeros 10 días. Sólo podrá tocar a partir del día 4 para lavar.\n' +
                    '• No hacer ejercicio físico intenso durante las primeras 2 semanas.\n' +
                    '• Evitar el contacto directo del agua de las regaderas sobre la zona injertada los primeros 10 días.\n' +
                    '• No alberca, mar, sauna y vapor por un mes.\n' +
                    '• No exponerse al sol durante los próximos 90 días.\n' +
                    '• Evitar el consumo excesivo de sal por 3 días.\n' +
                    '• No usar máquina rasuradora en zona de injertos durante 1 mes.\n' +
                    '• En el caso de microinjerto de cejas, evitar maquillaje en esta zona el primer mes.\n' +
                    '• Recuerde volver para su próxima revisión dentro de 24 horas.\n';
                indicaciones_1_recetas = 'Lavar la zona injertada con Shampoo Control Caída durante los primeros 3 días utilizando un recipiente, solamente por escurrimiento;   y del día 4  al 10 alternar un día y un día cada Shampoo (control grasa y control caída) , usando solo las yemas de los dedos sin frotar.';
                indicaciones_2_recetas = 'A partir del día 4  al 10 alternar un día y un día cada Shampoo (control grasa y control caída) , usando solo las yemas de los dedos sin frotar.';
                indicaciones_3_recetas = 'Humedecer los implantes cada 20 minutos con Agua Glaciar durante los próximos 10 días.';
                indicaciones_4_recetas = '1 cucharada cafetera por las mañanas disuelta en agua.';

                if (indicacionCabeza != comentario_capilar_receta) {
                    objRecord.setText({ fieldId: 'custevent196', text: comentario_capilar_receta, ignoreFieldChange: true });
                }
                if (indicacionBarba != comentario_barbaCeja_receta) {
                    objRecord.setText({ fieldId: 'custevent204', text: comentario_barbaCeja_receta, ignoreFieldChange: true });
                }
                if (indicacion_1 != indicaciones_1_recetas) {
                    objRecord.setText({ fieldId: 'custevent187', text: indicaciones_1_recetas, ignoreFieldChange: true });
                }
                if (indicacion_2 != indicaciones_2_recetas) {
                    objRecord.setText({ fieldId: 'custevent188', text: indicaciones_2_recetas, ignoreFieldChange: true });
                }
                if (indicacion_3 != indicaciones_3_recetas) {
                    objRecord.setText({ fieldId: 'custevent189', text: indicaciones_3_recetas, ignoreFieldChange: true });
                }
                if (indicacion_4 != indicaciones_4_recetas) {
                    objRecord.setText({ fieldId: 'custevent190', text: indicaciones_4_recetas, ignoreFieldChange: true });
                }
            }
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});