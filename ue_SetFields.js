/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/log', 'N/config'],
    function (record, log, config) {

        function beforeLoad(context) {
            var configRecObj = config.load({ type: config.Type.USER_PREFERENCES });
            var interfaceLanguage = configRecObj.getValue({ fieldId: 'LANGUAGE' });
            var comentario_capilar_receta = '';
            var comentario_barbaCeja_receta = '';
            var texto = '';
            var indicaciones_1_recetas = '';
            var indicaciones_2_recetas = '';
            var indicaciones_3_recetas = '';
            var indicaciones_4_recetas = '';

            try {
                var recId = context.newRecord.id;
                var caso = record.load({ type: 'supportcase', id: recId, isDynamic: true });
                var bandera = false;
            } catch (error) {
                log.debug(error);
            }

            var clienteId = '';
            var indicacionCabeza = '';
            var indicacionBarba = '';
            var indicacion_1 = '';
            var indicacion_2 = '';
            var indicacion_3 = '';
            var indicacion_4 = '';
            var isSet_descripcionTecnicaHallazgos = '';

            log.debug('Interface Language', interfaceLanguage);

            if (interfaceLanguage == 'en') {
                texto = 'The patient is identified, allergies are specified and questions are answered before beginning the procedure. The treatment area is authorized, designed, photographed and agreed to with the patient\'s signed consent. The trichotomy is carried out by the nursing team on ________________ using  ________________. The patient is informed by the nursing team regarding the prescriptions described on the medical instructions sheet. The vital signs are monitored during the procedure.\n\n While the patient is lying on his stomach, the antisepsis of the back of the head with surgical soap is carried out. The donor area is marked. The anesthesia plan in the extraction area is managed. Extractions are carried out with a .90 mm perforator. Extraction bleeding:______________cc\'s.\n\n With the patient in the Semi- Fowler\'s position, the antisepsis with surgical soap is carried put in the _______________ area. Implanting in the treatment area is initiated with 0.8mm and 1.00mm Lion HN implantors using the Kaloni technique.  Implanting bleeding: _______cc\'s.\n\nINCIDENTS OR ACCIDENTS:_____________________________________________________________________________________________________________________________________________________________________________________________\n\n The procedure is finalized by indicating the follow-up procedures verbally and in writing. A follow-up appointment is scheduled for the next day. The patient with stable vital signs is discharged in writing.';

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
            } else if (interfaceLanguage == 'es_AR') {
                texto = 'Se identifica paciente, indagan alergias, aclaran dudas y preguntas sobre el procedimiento antes de iniciar el procedimiento. Realización de diseño de zona a tratar, que es autorizado, fotografiado y firmado de conformidad por el paciente. Se realiza tricotomía por equipo de enfermería en ________________ del tipo ________________. Prescripción de medicamentos descritos en hoja de indicaciones médicas que son administrados por equipo de enfermería. Vigilancia de signos vitales durante el procedimiento.\n\nPaciente en posición decúbito ventral, se realiza antisepsia con jabón quirúrgico en región occipital. Marcaje de zona donadora. Se maneja el plan anestésico descrito en zona de extracción. Se realiza extracción con punch del .90 mm. Sangrado durante la extracción ______________cc.\n\nCon paciente colocado en posición semi fowler, se realiza antisepsia con jabón quirúrgico en región ___________________________. Inicia implantación en zona a tratar con implantadores Lion HN de 0.8mm y 1.00mm con técnica de Kaloni. Sangrado durante la implantación ______________________cc.\n\nINCIDENTES O ACCIDENTES:____________________________________________________________________________________ ____________________________________________________________________________________________________________\n\nFinaliza el procedimiento indicándose verbalmente y por escrito los cuidados posteriores al procedimiento. Se cita para las próximas 24 horas. Egresa paciente con signos vitales estables y por sus propios medios a su domicilio con nota de egreso.';

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
            } else if (interfaceLanguage == 'de_DE') {
                //Poner valores a setear para idioma Aleman
            } else {
                texto = 'Se identifica paciente, indagan alergias, aclaran dudas y preguntas sobre el procedimiento antes de iniciar el procedimiento. Realización de diseño de zona a tratar, que es autorizado, fotografiado y firmado de conformidad por el paciente. Se realiza tricotomía por equipo de enfermería en ________________ del tipo ________________. Prescripción de medicamentos descritos en hoja de indicaciones médicas que son administrados por equipo de enfermería. Vigilancia de signos vitales durante el procedimiento.\n\nPaciente en posición decúbito ventral, se realiza antisepsia con jabón quirúrgico en región occipital. Marcaje de zona donadora. Se maneja el plan anestésico descrito en zona de extracción. Se realiza extracción con punch del .90 mm. Sangrado durante la extracción ______________cc.\n\nCon paciente colocado en posición semi fowler, se realiza antisepsia con jabón quirúrgico en región ___________________________. Inicia implantación en zona a tratar con implantadores Lion HN de 0.8mm y 1.00mm con técnica de Kaloni. Sangrado durante la implantación ______________________cc.\n\nINCIDENTES O ACCIDENTES:____________________________________________________________________________________ ____________________________________________________________________________________________________________\n\nFinaliza el procedimiento indicándose verbalmente y por escrito los cuidados posteriores al procedimiento. Se cita para las próximas 24 horas. Egresa paciente con signos vitales estables y por sus propios medios a su domicilio con nota de egreso.';

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
            }

            try {
                clienteId = caso.getText({ fieldId: 'company' });
                indicacionCabeza = caso.getText({ fieldId: 'custevent196' }) || null;
                indicacionBarba = caso.getText({ fieldId: 'custevent204' }) || null;
                indicacion_1 = caso.getText({ fieldId: 'custevent187' }) || null;
                indicacion_2 = caso.getText({ fieldId: 'custevent188' }) || null;
                indicacion_3 = caso.getText({ fieldId: 'custevent189' }) || null;
                indicacion_4 = caso.getText({ fieldId: 'custevent190' }) || null;
                isSet_descripcionTecnicaHallazgos = caso.getText({ fieldId: 'custevent569' }) || null;
                log.debug('Valores barba ceja', indicacionBarba + ' ' + indicacionCabeza);
            } catch (error) {
                log.error('Erorr', error);
            }

            log.debug('large cabello', indicacionCabeza.length);
            log.debug('large barba', indicacionBarba.length);
            log.debug('large ind 1', indicacion_1.length);
            log.debug('large ind 2', indicacion_2.length);
            log.debug('large ind 3', indicacion_3.length);
            log.debug('large ind 4', indicacion_4.length);

            if (context.type == 'view') {
                if (isSet_descripcionTecnicaHallazgos == null) {
                    caso.setText({ fieldId: 'custevent569', text: texto });
                    bandera = true;
                    log.audit('Seteo de campo al cliente', clienteId);
                }

                if (indicacionCabeza == 'undefined' || indicacionCabeza == null) {
                    caso.setText({ fieldId: 'custevent196', text: comentario_capilar_receta });
                    bandera = true;
                }
                if (indicacionBarba == 'undifined' || indicacionBarba == null) {
                    caso.setText({ fieldId: 'custevent204', text: comentario_barbaCeja_receta });
                    bandera = true;
                }
                if (indicacion_1 == 'undefined' || indicacion_1 == null) {
                    caso.setText({ fieldId: 'custevent187', text: indicaciones_1_recetas });
                    bandera = true;
                }
                if (indicacion_2 == 'undefined' || indicacion_2 == null) {
                    caso.setText({ fieldId: 'custevent188', text: indicaciones_2_recetas });
                    bandera = true;
                }
                if (indicacion_3 == 'undefined' || indicacion_3 == null) {
                    caso.setText({ fieldId: 'custevent189', text: indicaciones_3_recetas });
                    bandera = true;
                }
                if (indicacion_4 == 'undefined' || indicacion_4 == null) {
                    caso.setText({ fieldId: 'custevent190', text: indicaciones_4_recetas });
                    bandera = true;
                }

                if (bandera == true) {
                    log.audit('Seteo de campos al indicaciones', clienteId);
                    caso.save({ enableSourcing: true, ignoreMandatoryFields: true });
                }
            }

            if (context.type == 'create') {
                if (isSet_descripcionTecnicaHallazgos == null) {
                    context.currentRecord.setText({ fieldId: 'custevent569', text: texto });
                    bandera = true;
                    log.audit('Seteo de campo al cliente', clienteId);
                }

                if (indicacionCabeza == 'undefined' || indicacionCabeza == null) {
                    context.currentRecord.setText({ fieldId: 'custevent196', text: comentario_capilar_receta });
                    bandera = true;
                }
                if (indicacionBarba == 'undifined' || indicacionBarba == null) {
                    context.currentRecord.setText({ fieldId: 'custevent204', text: comentario_barbaCeja_receta });
                    bandera = true;
                }
                if (indicacion_1 == 'undefined' || indicacion_1 == null) {
                    context.currentRecord.setText({ fieldId: 'custevent187', text: indicaciones_1_recetas });
                    bandera = true;
                }
                if (indicacion_2 == 'undefined' || indicacion_2 == null) {
                    context.currentRecord.setText({ fieldId: 'custevent188', text: indicaciones_2_recetas });
                    bandera = true;
                }
                if (indicacion_3 == 'undefined' || indicacion_3 == null) {
                    context.currentRecord.setText({ fieldId: 'custevent189', text: indicaciones_3_recetas });
                    bandera = true;
                }
                if (indicacion_4 == 'undefined' || indicacion_4 == null) {
                    context.currentRecord.setText({ fieldId: 'custevent190', text: indicaciones_4_recetas });
                    bandera = true;
                }
            }

            if (context.type == '') {

            }
        }

        return {
            beforeLoad: beforeLoad
        };

    });