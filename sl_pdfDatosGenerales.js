/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/runtime', 'N/config'],

    function (record, log, render, xmlMod, runtime, config) {

        function onRequest(context) {
            var configRecObj = config.load({ type: config.Type.USER_PREFERENCES });
            var interfaceLanguage = configRecObj.getValue({ fieldId: 'LANGUAGE' });
            log.debug('Interface Language', interfaceLanguage);

            var userObj = runtime.getCurrentUser();
            log.debug('userObj: ', userObj);
            var recId = context.request.parameters.recId;
            var caso = record.load({ type: 'supportcase', id: recId });

            // FORMATO DE VALORACIÓN
            var companyId = caso.getValue({ fieldId: 'company' });
            var edad = caso.getValue({ fieldId: 'custevent332' });
            var cliente = record.load({ type: 'customer', id: companyId }); // , isDynamic: true

            var numExpediente = cliente.getValue({ fieldId: 'entityid' });
            var altname = cliente.getValue({ fieldId: 'altname' });
            var phone = cliente.getText({ fieldId: 'mobilephone' });
            var address = cliente.getValue({ fieldId: 'defaultaddress' });
            var sucursal = cliente.getValue({ fieldId: 'custentity25' });
            var sucursalText = cliente.getText({ fieldId: 'custentity25' });
            var subsidiaryValue = cliente.getValue({ fieldId: 'subsidiary' });
            var subsidiaryText = cliente.getText({ fieldId: 'subsidiary' });
            var sucReal = sucursalReal(sucursalText);
            var edoCivil = caso.getText({ fieldId: 'custevent206' }) || '';
            var genero = cliente.getText({ fieldId: 'custentity_sexo' }) || '';
            var identificacion = cliente.getText({ fieldId: 'custentity234' }) || '';
            var imageBack = getImageBackGround(sucursal, subsidiaryValue);
            var fechaCaso = caso.getText({ fieldId: 'startdate' });
            var fechaDeNacimiento = caso.getText({ fieldId: 'custevent331' }); //se cambia el custevent205
            edad = calcYearInt(fechaDeNacimiento, fechaCaso); // Calculo de la edad del paciente tomando como referencia la fecha de nacimiento y la fecha en la que se inicia el caso

            // Historial Clínico
            var renal = checado(caso.getValue({ fieldId: 'custevent232' })); //Sufre de algun problema renal
            var resRenal = caso.getValue({ fieldId: 'custevent227' }); //Cual problema renal
            var algunaCirugiaPrevia = checado(caso.getValue({ fieldId: 'custevent223' })); //Alguna cirugia previa
            var cual2 = caso.getText({ fieldId: 'custevent233' }); //Cual cirugia Previa
            var seHaHechoPruebas = checado(caso.getValue({ fieldId: 'custevent236' })); // Pruebas de VIH
            var anestesiaPrevia = caso.getText({ fieldId: 'custevent225' });//anestesia previa
            var checkAnestesia = checado((caso.getText({ fieldId: 'custevent225' }) == "" || caso.getText({ fieldId: 'custevent225' }) == "Ninguna") ? false : true);//Representa Checado anestesia
            var respuesta = caso.getText({ fieldId: 'custevent237' }); //Resultado VIH
            var sufreDeAlgunTipo = checado(caso.getValue({ fieldId: 'custevent226' })); //Sufre de algun tipo de alergia
            var cual3 = caso.getText({ fieldId: 'custevent240' }); //Cual alergia
            var sufreUstedDiabetes = caso.getText({ fieldId: 'custevent230' }); //Tiene usted diabetes
            var checksufreUstedDiabetes = checado((caso.getText({ fieldId: 'custevent230' }) == "" || caso.getText({ fieldId: 'custevent230' }) == "No") ? false : true); //checado para Diabetes
            var queTipoDeCicatrizacion = caso.getText({ fieldId: 'custevent229' });
            var checkqueTipoDeCicatrizacion = checado((caso.getText({ fieldId: 'custevent229' }) != '') ? true : false); //checado para cicatrización
            var ingiereConFrecuencia = checado(caso.getValue({ fieldId: 'custevent238' })); //Ingiere alcohol
            var resingiereConFrecuencia = caso.getText({ fieldId: 'custevent228' }); //Respuesta ingiere alcohol
            var fuma = checado(caso.getValue({ fieldId: 'custevent479' })); //Fuma
            var cualFuma = caso.getText({ fieldId: 'custevent235' });// especifique tabaquismo
            var enfermedadDeImportancia = checado(caso.getValue({ fieldId: 'custevent341' }));// Enfermedad de importancia paciente
            var resEnfermedadDeImportancia = caso.getValue({ fieldId: 'custevent253' });
            var antecedentesPatologicos = caso.getText({ fieldId: 'custevent489' }); //Antecedentes previos convencionales
            var hepatitis = checado(caso.getValue({ fieldId: 'custevent531' })); //Tiene hepatitis?
            var resHepatitis = caso.getText({ fieldId: 'custevent532' }); //Resultado hepatitis
            var cardiacos = checado(caso.getValue({ fieldId: 'custevent517' })); //Problemas cardiacos
            var resCardiacos = caso.getValue({ fieldId: 'custevent518' }); //Respuesta cardiacos
            var respiratorios = checado(caso.getValue({ fieldId: 'custevent519' })); //Problemas respiratorios
            var resRespiratorios = caso.getValue({ fieldId: 'custevent520' }); //Respuesta respiratorias
            var hipertension = checado(caso.getValue({ fieldId: 'custevent252' })); // Probelmas de hipertension
            var resHipertension = caso.getValue({ fieldId: 'custevent222' }); //Respuesta hipertension
            var hepaticos = checado(caso.getValue({ fieldId: 'custevent521' })); //Problemas hepaticos
            var resHepaticos = caso.getValue({ fieldId: 'custevent522' });// Respuesta hepaticos
            var gastrointestinales = checado(caso.getValue({ fieldId: 'custevent523' })); // Problemas Gastrointestinales
            var resGastrointestinales = caso.getValue({ fieldId: 'custevent524' }); // Respuesta gastrointestinales
            var afeccionesPiel = checado(caso.getValue({ fieldId: 'custevent525' })); //Afecciones en la piel
            var resAfeccionesPiel = caso.getValue({ fieldId: 'custevent526' }); // Respuesta afecciones en la piel
            var cancer = checado(caso.getValue({ fieldId: 'custevent527' })); // Tiene cancer
            var resCancer = caso.getValue({ fieldId: 'custevent528' }); // Respuesta Cancer
            var tiroides = checado(caso.getValue({ fieldId: 'custevent529' })); //Problemas de tiroides
            var resTiroides = caso.getValue({ fieldId: 'custevent530' }); // respuesta tiroides
            var suplementosAlimenticios = checado(caso.getValue({ fieldId: 'custevent533' })); // toma suplementos alimenticios
            var resSuplementosAlimenticios = caso.getValue({ fieldId: 'custevent534' }); // respuesta suplementos alimneticios
            var terapiaHormonal = checado(caso.getValue({ fieldId: 'custevent535' })); // terapia Hormonal
            var resTerapiaHormonal = caso.getValue({ fieldId: 'custevent536' }); // respuesta terapia hormonal
            var drogas = checado(caso.getValue({ fieldId: 'custevent537' })); // consume drogas
            var resDrogas = caso.getValue({ fieldId: 'custevent538' }); //respuesta consume drogas
            var coagulacion = checado(caso.getValue({ fieldId: 'custevent539' })); // Problemas de coagulacion
            var resCoagulacion = caso.getValue({ fieldId: 'custevent540' }); // respuesta coagulacion

            // Variables para firmas de Aviso de privacidad y Contrato de Servicios
            var avisoPrivacidadbase64 = caso.getValue({ fieldId: 'custevent319' }) || '';
            var contratoServiciobase64 = caso.getValue({ fieldId: 'custevent340' }) || '';

            // Antecedentes Heredofamiliares
            var diabetes1 = checado(caso.getValue({ fieldId: 'custevent255' })); //caso.getText({ fieldId: 'custevent255' });
            var especifiqueDiabetes1 = caso.getText({ fieldId: 'custevent257' });
            var hipertensionArterial = checado(caso.getValue({ fieldId: 'custevent256' })); //(caso.getText({ fieldId: 'custevent256' }));
            var especifiqueHipertensionArterial = caso.getText({ fieldId: 'custevent259' });
            var cancer2 = checado(caso.getValue({ fieldId: 'custevent258' })); //caso.getText({ fieldId: 'custevent258' });
            var especifiqueCancer2 = caso.getText({ fieldId: 'custevent260' });

            // Antecedentes ginecoobstetricos
            var menarca = caso.getText({ fieldId: 'custevent261' });
            var menstruacion = caso.getText({ fieldId: 'custevent262' });
            var g = caso.getValue({ fieldId: 'custevent264' });
            var p = caso.getValue({ fieldId: 'custevent265' });
            var c = caso.getValue({ fieldId: 'custevent266' });
            var a = caso.getValue({ fieldId: 'custevent267' });

            // Exploración física Paciente
            var aspectoFisico = caso.getText({ fieldId: 'custevent492' });
            var frecuenciaCardiaca = caso.getText({ fieldId: 'custevent504' });
            var sexoAparente = caso.getText({ fieldId: 'custevent493' });
            var frecuenciaRespiratoria = caso.getText({ fieldId: 'custevent505' });
            var edadAparente = caso.getText({ fieldId: 'custevent494' });
            var peso = caso.getValue({ fieldId: 'custevent506' }) || '';
            var constitucionPaciente = caso.getText({ fieldId: 'custevent495' });
            var talla = caso.getValue({ fieldId: 'custevent507' }) || '';
            var temperatura = caso.getText({ fieldId: 'custevent502' });
            var especialidad = caso.getText({ fieldId: 'custevent508' });
            var presionArterial = caso.getText({ fieldId: 'custevent503' });
            var imc = caso.getText({ fieldId: 'custevent541' }) || ''; //Indice de masa corporal paciente
            imc = parseFloat(imc);

            if (isNaN(imc)) {
                imc = '';
            } else {
                imc = imc.toFixed(2);
            }

            // Sección DATOS CLINICOS RELEVANTES
            var datosClinicosRelevantes = caso.getText({ fieldId: 'custevent542' });

            if (avisoPrivacidadbase64 != '') {
                if (avisoPrivacidadbase64.substring(0, 3) == "ok_")
                    avisoPrivacidadbase64 = avisoPrivacidadbase64.substring(3, avisoPrivacidadbase64.length);
            }

            if (contratoServiciobase64 != '') {
                if (contratoServiciobase64.substring(0, 3) == "ok_")
                    contratoServiciobase64 = contratoServiciobase64.substring(3, contratoServiciobase64.length);
            }
            //caso.save();
            var fecha = new Date();
            fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();


            //VARIABLES: SET LABELS to fields in differents languages
            //NOTE: ALL OBJECTS FIELDS that setting labels
            // FORMATO DE VALORACIÓN
            var label_edadPaciente = caso.getField({ fieldId: 'custevent332' }).label;
            var label_nombrePaciente = cliente.getField({ fieldId: 'altname' }).label;
            var label_telefonoPaciente = cliente.getField({ fieldId: 'phone' }).label;
            var label_direccionPaciente = cliente.getField({ fieldId: 'defaultaddress' }).label;
            var label_sucursalCaso = caso.getField({ fieldId: 'custevent2' }).label;
            var label_estadoCivilPaciente = caso.getField({ fieldId: 'custevent206' }).label;
            var label_generoPaciente = cliente.getField({ fieldId: 'custentity_sexo' }).label;
            var label_identificacionPaciente = caso.getField({ fieldId: 'custevent1188' }).label;
            var label_fechaDeNacimientoPaciente = caso.getField({ fieldId: 'custevent331' }).label;
            var label_check_enfermedadesRenales = caso.getField({ fieldId: 'custevent232' }).label;
            var label_campo_enfermedadesRenales = caso.getField({ fieldId: 'custevent227' }).label;
            var label_check_cirugiasPrevias = caso.getField({ fieldId: 'custevent223' }).label;
            var label_campo_cirugiasPrevias = caso.getField({ fieldId: 'custevent233' }).label;
            var label_check_pruebasVIH = caso.getField({ fieldId: 'custevent236' }).label;
            var label_campo_resultadoVIH = caso.getField({ fieldId: 'custevent237' }).label;
            var label_campo_anestesiaPrevia = caso.getField({ fieldId: 'custevent225' }).label;
            var label_check_alergias = caso.getField({ fieldId: 'custevent226' }).label;
            var label_campo_alergias = caso.getField({ fieldId: 'custevent240' }).label;
            var label_campo_diabetes = caso.getField({ fieldId: 'custevent230' }).label;
            var label_campo_cicatrizacion = caso.getField({ fieldId: 'custevent229' }).label;
            var label_check_alcohol = caso.getField({ fieldId: 'custevent238' }).label;
            var label_campo_alcohol = caso.getField({ fieldId: 'custevent228' }).label;
            var label_check_tabaquismo = caso.getField({ fieldId: 'custevent479' }).label;
            var label_campo_tabaquismo = caso.getField({ fieldId: 'custevent235' }).label;
            var label_check_enfermedadDeImportancia = caso.getField({ fieldId: 'custevent341' }).label;
            var label_campo_enfermedadDeImportancia = caso.getField({ fieldId: 'custevent253' }).label;
            var label_antecedentesPatologicos = caso.getField({ fieldId: 'custevent489' }).label;
            var label_check_hepatitis = caso.getField({ fieldId: 'custevent531' }).label;
            var label_campo_hepatitis = caso.getField({ fieldId: 'custevent532' }).label;
            var label_check_cardiacos = caso.getField({ fieldId: 'custevent517' }).label;
            var label_campo_cardiacos = caso.getField({ fieldId: 'custevent518' }).label;
            var label_check_respiratorios = caso.getField({ fieldId: 'custevent519' }).label;
            var label_campo_respiratorios = caso.getField({ fieldId: 'custevent520' }).label;
            var label_check_hipertension = caso.getField({ fieldId: 'custevent252' }).label;
            var label_campo_hipertension = caso.getField({ fieldId: 'custevent222' }).label;
            var label_check_hepaticos = caso.getField({ fieldId: 'custevent521' }).label;
            var label_campo_hepaticos = caso.getField({ fieldId: 'custevent522' }).label;
            var label_check_gastrointestinales = caso.getField({ fieldId: 'custevent523' }).label;
            var label_campo_gastrointestinales = caso.getField({ fieldId: 'custevent524' }).label;
            var label_check_afeccionesPiel = caso.getField({ fieldId: 'custevent525' }).label;
            var label_campo_afeccionesPiel = caso.getField({ fieldId: 'custevent526' }).label;
            var label_check_cancer = caso.getField({ fieldId: 'custevent527' }).label;
            var label_campo_cancer = caso.getField({ fieldId: 'custevent528' }).label;
            var label_check_tiroides = caso.getField({ fieldId: 'custevent529' }).label;
            var label_campo_tiroides = caso.getField({ fieldId: 'custevent530' }).label;
            var label_check_suplementosAlimenticios = caso.getField({ fieldId: 'custevent533' }).label;
            var label_campo_suplementosAlimenticios = caso.getField({ fieldId: 'custevent534' }).label;
            var label_check_terapiaHormonal = caso.getField({ fieldId: 'custevent535' }).label;
            var label_campo_terapiaHormonal = caso.getField({ fieldId: 'custevent536' }).label;
            var label_check_drogas = caso.getField({ fieldId: 'custevent537' }).label;
            var label_campo_drogas = caso.getField({ fieldId: 'custevent538' }).label;
            var label_check_coagulacion = caso.getField({ fieldId: 'custevent539' }).label;
            var label_campo_coagulacion = caso.getField({ fieldId: 'custevent540' }).label;
            var label_campo_diabetesHeredofamiliares = caso.getField({ fieldId: 'custevent255' }).label;
            var label_campo_especifiqueDiabetesHeredofamiliares = caso.getField({ fieldId: 'custevent257' }).label;
            var label_campo_hipertensionArterialHeredofamiliares = caso.getField({ fieldId: 'custevent256' }).label;
            var label_campo_especifiqueHipertensionArterialHeredofamiliares = caso.getField({ fieldId: 'custevent259' }).label;
            var label_campo_cancerHeredofamiliares = caso.getField({ fieldId: 'custevent258' }).label;
            var label_campo_especifiqueCancerHeredofamiliares = caso.getField({ fieldId: 'custevent260' }).label;
            var label_campo_menarcaGinecoonstetra = caso.getField({ fieldId: 'custevent261' }).label;
            var label_campo_menstruacionGinecoonstetra = caso.getField({ fieldId: 'custevent262' }).label;
            var label_campo_gestasGinecoobstetra = caso.getField({ fieldId: 'custevent264' }).label;
            var label_campo_partosGinecoobstetra = caso.getField({ fieldId: 'custevent265' }).label;
            var label_campo_cesareasGinecoobstetra = caso.getField({ fieldId: 'custevent266' }).label;
            var label_campo_abortosGinecoobstetra = caso.getField({ fieldId: 'custevent267' }).label;
            var label_campo_aspectoFisicoExploracionFisica = caso.getField({ fieldId: 'custevent492' }).label;
            var label_campo_frecuenciaCardiacaExploracionFisica = caso.getField({ fieldId: 'custevent504' }).label;
            var label_campo_sexoAparenteExploracionFisica = caso.getField({ fieldId: 'custevent493' }).label;
            var label_campo_frecuenciaRespiratoriaExploracionFisica = caso.getField({ fieldId: 'custevent505' }).label;
            var label_campo_edadAparenteExploracionFisica = caso.getField({ fieldId: 'custevent494' }).label;
            var label_campo_pesoExploracionFisica = caso.getField({ fieldId: 'custevent506' }).label;
            var label_campo_constitucionPacienteExploracionFisica = caso.getField({ fieldId: 'custevent495' }).label;
            var label_campo_tallaExploracionFisica = caso.getField({ fieldId: 'custevent507' }).label;
            var label_campo_temperaturaExploracionFisica = caso.getField({ fieldId: 'custevent502' }).label;
            var label_campo_especialidadExploracionFisica = caso.getField({ fieldId: 'custevent508' }).label;
            var label_campo_presionArterialExploracionFisica = caso.getField({ fieldId: 'custevent503' }).label;
            var label_campo_imcExploracionFisica = caso.getField({ fieldId: 'custevent541' }).label;
            var label_campo_datosClinicosRelevantesExploracionFisica = caso.getField({ fieldId: 'custevent542' }).label;
            var label_campo_fechaNacimiento = caso.getField({ fieldId: 'custevent331' }).label;
            //NOTE: CUSTOM LABELS
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
            var label_title_historiaClinica = '';
            var label_title_fichaIdentificacion = '';
            var label_title_numeroExpediente = '';
            var label_title_antecedentesPersonales = '';
            var label_title_antecedentesNoPatologicos = '';
            var label_title_antecedentesHeredofamiliares = '';
            var label_title_antecedentesGinecoobstetricos = '';
            var label_title_exploracionFisica = '';
            var label_title_datosClinicosRelevantes = '';
            var label_title_embarazos = '';
            var label_campo_cual = '';
            var label_campo_queTipoCicatrizacion = '';


            if (interfaceLanguage == 'en') {
                label_title_medicamentos = '';
                label_title_tratamientos = '';
                laebl_title_indicaciones_cuidado = '';
                label_title_firma = '';
                label_title_responsable_sanitario = '';
                label_title_receta_paciente = '';
                label_title_nombre_paciente = 'Name of Patient';
                label_title_edad_paciente = 'Age';
                label_title_sexo_paciente = 'Gender';
                label_title_numero_expediente = 'File No.';
                label_title_fechaNacimiento_paciente = 'Day of birth';
                label_title_direccion_paciente = 'Address';
                label_title_intitucion = '';
                label_title_especialidad = '';
                label_title_cedula_esp = '';
                label_title_historiaClinica = 'Clinical History Format';
                label_title_fichaIdentificacion = 'Identification file';
                label_title_numeroExpediente = 'File number';
                label_title_antecedentesPersonales = 'Personal medical history';
                label_title_antecedentesNoPatologicos = 'Non-Pathological Background, Prior Conventional, Alternative or Traditional Treatments';
                label_title_antecedentesHeredofamiliares = 'Hered family history';
                label_title_antecedentesGinecoobstetricos = 'Gyneco-obstetric Background (if applicable)';
                label_title_exploracionFisica = 'Physical exploration';
                label_title_datosClinicosRelevantes = 'Relevant clinical data';
                label_title_embarazos = 'Pregnancies';
                label_campo_cual = 'Which?';
                label_campo_queTipoCicatrizacion = 'Specify';
            } else if (interfaceLanguage == 'es_AR') {
                label_title_medicamentos = '';
                label_title_tratamientos = '';
                laebl_title_indicaciones_cuidado = '';
                label_title_firma = '';
                label_title_responsable_sanitario = '';
                label_title_receta_paciente = '';
                label_title_nombre_paciente = '';
                label_title_edad_paciente = '';
                label_title_cedula = '';
                label_title_intitucion = '';
                label_title_especialidad = '';
                label_title_cedula_esp = '';
                label_title_historiaClinica = 'Formato de historia clínica';
                label_title_fichaIdentificacion = 'Ficha de identificación';
                label_title_numeroExpediente = 'No. de expediente';
                label_title_antecedentesPersonales = 'Antecedentes Personales';
                label_title_antecedentesNoPatologicos = 'Antecedentes no Patológicos, Tratamientos Previos Convencionales, Alternativos o Tradicionales';
                label_title_antecedentesHeredofamiliares = 'Antecedentes Heredofamiliares';
                label_title_antecedentesGinecoobstetricos = 'Antecedentes Ginecoobstétricos (si aplica)';
                label_title_exploracionFisica = 'Exploración Física';
                label_title_datosClinicosRelevantes = 'Datos clínicos relevantes';
                label_title_embarazos = 'Embarazos';
                label_campo_cual = '¿Cuál?';
                label_campo_queTipoCicatrizacion = 'Especifíque';
            } else if (interfaceLanguage == 'de_DE') {
                label_title_medicamentos = '';
                label_title_tratamientos = '';
                laebl_title_indicaciones_cuidado = '';
                label_title_firma = '';
                label_title_responsable_sanitario = '';
                label_title_receta_paciente = '';
                label_title_nombre_paciente = '';
                label_title_edad_paciente = '';
                label_title_cedula = '';
                label_title_intitucion = '';
                label_title_especialidad = '';
                label_title_cedula_esp = '';
                label_title_historiaClinica = 'Krankengeschichte';
                label_title_fichaIdentificacion = 'personenbezogener Daten';
                label_title_numeroExpediente = 'Aktennummer.';
                label_title_antecedentesPersonales = 'Persönlicher Hintergrund';
                label_title_antecedentesNoPatologicos = 'Nicht-pathologischer Hintergrund, frühere konventionelle, alternative oder traditionelle Behandlungen';
                label_title_antecedentesHeredofamiliares = 'ihre familiäre Krankheitsvorgeschichte gestellt';
                label_title_antecedentesGinecoobstetricos = 'Gynäkologisch-geburtshilflicher Hintergrund (falls zutreffend)';
                label_title_exploracionFisica = 'Physische Erforschung';
                label_title_datosClinicosRelevantes = 'Relevante klinische Daten';
                label_title_embarazos = 'Schwangerschaften';
                label_campo_cual = 'Welches?';
                label_campo_queTipoCicatrizacion = 'Angeben';
            } else if (interfaceLanguage == 'pt_BR') {
                label_title_medicamentos = '';
                label_title_tratamientos = '';
                laebl_title_indicaciones_cuidado = '';
                label_title_firma = '';
                label_title_responsable_sanitario = '';
                label_title_receta_paciente = '';
                label_title_nombre_paciente = '';
                label_title_edad_paciente = '';
                label_title_cedula = '';
                label_title_intitucion = '';
                label_title_especialidad = '';
                label_title_cedula_esp = '';
                label_title_historiaClinica = 'Formato do história clínica';
                label_title_fichaIdentificacion = 'Folha de identificação';
                label_title_numeroExpediente = 'Número do caso';
                label_title_antecedentesPersonales = 'Antecedentes pessoais';
                label_title_antecedentesNoPatologicos = 'Antecedentes não patológicos, tratamentos convencionais convencionais, alternativos ou tradicionais';
                label_title_antecedentesHeredofamiliares = 'História da família Hered';
                label_title_antecedentesGinecoobstetricos = 'Antecedentes Gyneco-Obstétricos (se aplicável)';
                label_title_exploracionFisica = 'Exploração física';
                label_title_datosClinicosRelevantes = 'Dados clínicos relevantes';
                label_title_embarazos = 'Gravidezes';
                label_campo_cual = 'Qual?';
                label_campo_queTipoCicatrizacion = 'Especifique';
            } else {
                label_title_medicamentos = '';
                label_title_tratamientos = '';
                laebl_title_indicaciones_cuidado = '';
                label_title_firma = '';
                label_title_responsable_sanitario = '';
                label_title_receta_paciente = '';
                label_title_nombre_paciente = '';
                label_title_edad_paciente = '';
                label_title_cedula = '';
                label_title_intitucion = '';
                label_title_especialidad = '';
                label_title_cedula_esp = '';
                label_title_historiaClinica = 'Formato de historia clínica';
                label_title_fichaIdentificacion = 'Ficha de identificación';
                label_title_numeroExpediente = 'No. de expediente';
                label_title_antecedentesPersonales = 'Antecedentes Personales';
                label_title_antecedentesNoPatologicos = 'Antecedentes no Patológicos, Tratamientos Previos Convencionales, Alternativos o Tradicionales';
                label_title_antecedentesHeredofamiliares = 'Antecedentes Heredofamiliares';
                label_title_antecedentesGinecoobstetricos = 'Antecedentes Ginecoobstétricos (si aplica)';
                label_title_exploracionFisica = 'Exploración Física';
                label_title_datosClinicosRelevantes = 'Datos clínicos relevantes';
                label_title_embarazos = 'Embarazos';
                label_campo_cual = '¿Cuál?';
                label_campo_queTipoCicatrizacion = 'Especifíque';
            }
            //Anexo aviso de privacidad
            /**
             * AVISO DE PRIVACIDAD MEXICO
             * se cambia a solo una variablec y se incluyen saltos de pagina dentro del html
             * salto de pagina => '<div style="page-break-after: always;"></div>'+
             * espacio para membretado => '<br/><br/><br/><br/><br/><br/>'+
             */

            var avisoAlbya = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Albya S.C., (“Albya”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos suyos tenemos?</b>' +
                '<br/>Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento o tratamiento que se realice y datos sobre su historial médico por ejemplo qué medicamentos toma actualmente, si padece alergias, etc.</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué fines utilizaremos sus datos personales?</b>' +
                '<br/>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">A)	Para brindarle servicio de atención al cliente y dar contestación a sus consultas;</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">B)   Para proveer los servicios y productos que ha solicitado y para mantenerlo informado sobre cambios en los mismos;</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">C)	Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos.</p><br/>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p><br/>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">D)	Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios;</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">E)   Realizar encuestas de mercado y análisis de estrategias de marketing;</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">F)   Ofrecer promociones a nuestros clientes;</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">G)	Mantener la relación con usted.</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b>' +
                '<br/>Usted tiene el derecho de acceder a sus datos personales, rectificarlos, y cancelarlos, así como de oponerse al tratamiento que les demos conforme lo descrito en el presente aviso. Usted puede ejercer sus derechos en los términos establecidos legalmente, dirigiéndose por escrito a: Albya, S.C., con domicilio en Avenida Vasco de Quiroga 3900, Torre B, Piso 4, Int 401, Col. Santa Fe Cuajimalpa, Del. Cuajimalpa de Morelos, C.P. 05348, Ciudad de México o por correo electrónico a legal@albya.com.</p><br/><br/><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">La negativa para el uso de sus datos personales para estas finalidades no será un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal.</b>' +
                '<br/>Albya otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada, por lo tanto se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.<br/>Asimismo, Albya y sus empleados, encargados y en general usuarios que tengan acceso a datos personales en el ejercicio de sus funciones o intervengan en cualquier fase del tratamiento se comprometen a guardar confidencialidad respecto de su información personal, incluso después de finalizada la relación con usted o con la empresa.</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Dónde puedo consultar la política de privacidad integral?</b>' +
                '<br/>PPara conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://albya.com/web/legal.php</p><br/><br/><br/><br/><br/><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencia de datos</b>' +
                '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al aviso de privacidad</b>' +
                '<br/>Albya podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será publicada en https://albya.com/web/legal.php. Fecha de última actualización [01/11/2019]</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p><br/><br/>';

            var avisoMexico = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>' +
                '<br/><p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Holding Group S.C., (“Kaloni”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos suyos tenemos?</b>' +
                '<br/>Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento o tratamiento que se realice y datos sobre su historial médico por ejemplo qué medicamentos toma actualmente, si padece alergias, etc.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué fines utilizaremos sus datos personales?</b>' +
                '<br/>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">A) Para brindarle servicio de atención al cliente y dar contestación a sus consultas;<br/>' +
                'B) Para proveer los servicios y productos que ha solicitado y para mantenerlo informado sobre cambios en los mismos;<br/>' +
                'C) Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">D) Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios;<br/>' +
                'E) Realizar encuestas de mercado y análisis de estrategias de marketing<br/>' +
                'F) Ofrecer promociones a nuestros clientes;<br/>' +
                'G) Mantener la relación con usted.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b>' +
                '<br/>Usted tiene el derecho de acceder a sus datos personales, rectificarlos, y cancelarlos, así como de oponerse al tratamiento que les demos conforme lo descrito en el presente aviso. Usted puede ejercer sus derechos en los términos establecidos legalmente, dirigiéndose por escrito a: Kaloni Holding Group, S.C., con domicilio en Avenida Vasco de Quiroga 3900, Torre B, Piso 4, Int 401, Col. Santa Fe Cuajimalpa, Del. Cuajimalpa de Morelos, C.P. 05348, Ciudad de México o por correo electrónico a legal@kaloni.com.</p><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;">La negativa para el uso de sus datos personales para estas finalidades no será un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal.</b>' +
                '<br/>Kaloni otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada, por lo tanto se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.</p>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Dónde puedo consultar la política de privacidad integral?</b>' +
                '<br/>Para conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://kaloni.mx/legal.html.</p><br/><br/><br/><br/><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencia de datos</b>' +
                '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p>' +
                // '<div style="page-break-after: always;"></div>' +
                // '<br/><br/><br/><br/><br/><br/>' +

                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al aviso de privacidad</b>' +
                '<br/>Kaloni podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será publicada en https://kaloni.mx/legal.html. Fecha de última actualización [22/08/2019]</p>' +

                '<p style="font-family:Aria, sans-serif; font-size: 12px;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p><br/><br/>';

            var avisoColombia = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">De conformidad con la Ley 1581 de 2012, artículo 10 del decreto reglamentario 1377 de 2013 y al artículo 20 del Decreto 0722 de 2013, <b>KALONI COLOMBIA S.A.S.</b>, en adelante Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, ponemos a su disposición nuestro Aviso de Privacidad y Política de Tratamiento de Datos Personales, la cual tiene como propósito informar las prácticas en relación con la búsqueda, tratamiento y comunicación de la información que nos sea proporcionada a través de este sitio web.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos personales recopilamos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono,</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;ciudad de residencia y sucursal donde desea ser atendido.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo recolectamos sus datos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Al momento de utilizar el sitio, acepta los Términos de Uso de este sitio web y del presente aviso de privacidad. Parte de la información que usted envíe puede ser información de identificación o de carácter personal (es decir, información que únicamente puede estar relacionada con usted, como su nombre completo, domicilio, dirección de e-mail, número de teléfono). Al enviar sus datos a través de este sitio web, sean personales o no, está aceptando y, por consiguiente dando su consentimiento expreso de manera libre e inequívoca, para que dichos datos puedan ser objeto de búsqueda, tratamiento y comunicación de acuerdo con la presente Política de Tratamiento de Datos Personales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Se informará sobre qué datos son obligatorios y cuales optativos.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué usamos sus datos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni utilizará los datos depositados en este sitio para transmitirle información (si la ha solicitado), realizar operaciones de marketing, realizar estudios y otras actividades con fines de comercialización y ofrecimiento de servicios y para cualquier otro fin especificado en el presente aviso.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Tenemos implementados en este sitio web estándares comerciales de tecnología y seguridad operacional para proteger a nuestros visitantes de accesos no autorizados, revelación, alteración o destrucción toda la información proporcionada.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo almacenamos sus datos?</b></p>';
            avisoColombia += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">La legislación vigente otorga al titular de los datos una serie de derechos que le invitamos a considerar detenidamente: </p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Conocer, actualizar, rectificar, suprimir y revocar los datos personales. Este derecho se podrá ejercer, entre otros, frente a </p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;prohibido o no haya sido autorizado.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Solicitar prueba de la autorización de Tratamiento otorgada.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Ser informado respecto del uso que el responsable le ha dado a los datos personales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Presentar ante los organismos de control correspondientes, quejas por infracciones a lo dispuesto en la normativa vigente</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;y las demás normas que la modifiquen, adicionen o complementen.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Acceder en forma gratuita a los datos personales que hayan sido objeto de Tratamiento.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Quién es responsable de los datos personales recopilados?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, será el Responsable y/o Encargado del tratamiento de los datos personales de sus clientes, y clientes prospectivos obtenidos durante el uso este sitio web y sus actividades de negocio.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por escrito a KALONI COLOMBIA S.A.S., ubicada en Bogotá D.C., en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, o por correo electrónico a legal@kaloni.com .</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni validará la identificación, analizará, clasificará y emitirá la respuesta a la solicitud en los tiempos establecidos en la ley, y será enviada a través del medio por el cual se recibe la solicitud o por el medio que el titular especifique en su comunicación. La supresión de datos personales y/o revocación de autorización para tratamiento de la información no procederá cuando el titular tenga un deber legal o contractual de permanecer en las bases de datos de Kaloni.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dichos requerimientos serán tramitados siempre y cuando cumplan con los siguientes requisitos:</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. La solicitud deberá ser dirigida a Kaloni;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Deberá contar con la identificación del titular, su causahabiente, representante o mandatario;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;3. Habrá de contener la descripción de los hechos que dan lugar a su petición;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;4. Datos de contacto para notificación de la respuesta;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;5. Documentos y hechos soporte de su petición;</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">En caso de que el requerimiento resulte incompleto en cuanto a sus requisitos, el solicitante será requerido para que dentro de los cinco (5) días siguientes a la recepción del requerimiento subsane sus omisiones. Transcurridos dos (2) meses desde la fecha en que el solicitante fue requerido para subsanar su petición sin obtener la información requerida, se entenderá que ha desistido del reclamo.</p>';
            avisoColombia += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencias de datos personales</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país, adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Al suministrar la información personal en este sitio web, estará autorizando de forma expresa, libre e inequívoca que la información recogida pueda ser integrada por Kaloni con otros datos obtenidos activamente, a no ser que especifiquemos otra finalidad al recogerlos. Finalmente, nos estará autorizando a ceder y/o suministrar la información personal suministrada en este sitio, a terceras partes que no son filiales ni agentes, pero únicamente en los siguientes casos:</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;I. A los contratistas que realizan labores de apoyo en nuestra empresa (como, por ejemplo: servicios logísticos, asistencia</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;técnica, servicios de entrega e instituciones financieras); en este caso, pediremos a estos terceros que traten la información</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;de acuerdo con esta Política de Privacidad y la usen con los mismos fines.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;II. Si lo solicitan las fuerzas de seguridad o lo requieren leyes, órdenes judiciales o normas gubernamentales.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">La búsqueda, tratamiento y comunicación de información contemplada en esta Política de Privacidad puede conllevar la comunicación de los datos a jurisdicciones fuera de su país de residencia donde es posible que no existan leyes y normas equivalentes sobre la información personal, circunstancia que acepta prestando su consentimiento de forma expresa, libre e inequívoca a esta política de privacidad.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cookies y tecnologías similares</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo contactar a la autoridad apropiada?</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante la autoridad local correspondiente, le invitamos a conocer más información aquí.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al presente Aviso de Privacidad</b></p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios.</p>';
            avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Última modificación: 23 de mayo 2019.</p>';

            var avisoEspana = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Para Kaloni Hair, S.L.U., en adelante Kaloni Hair Madrid, el secreto profesional, la confidencialidad, y la seguridad son valores imprescindibles, y en todo momento garantizamos nuestro compromiso con la privacidad del usuario o visitante en todas sus interacciones. En Kaloni Hair Madrid nos comprometemos a no recabar información innecesaria sobre el usuario, como también a tratar con extrema diligencia la información personal que el usuario pueda facilitar a través de nuestra página web.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos), y la normativa relativa a la Protección de Datos de Carácter Personal, usted debe saber que la utilización de algunos servicios en nuestra página web, requiere que nos faciliten algunos de sus datos personales a través de formularios de registro o mediante el envío de mensajes de correo electrónico, y que estos datos podrán ser objeto de tratamientos e incorporación a los ficheros de Kaloni Hair Madrid, titular y responsable del mismo.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos personales recopilamos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono,</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;ciudad de residencia y sucursal donde desea ser atendido.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo recolectamos sus datos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">El envío de los datos implica su autorización para incorporarlos a nuestros ficheros, siempre que Kaloni Hair Madrid lo considere conveniente, quedando regulados en todo caso por el presente Aviso de Privacidad. Kaloni Hair Madrid, se reserva el derecho de decidir la incorporación o no, de sus datos personales en nuestros ficheros.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué usamos sus datos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Procesamos sus datos personales para los fines siguientes: </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Mantener la relación con usted;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Dar contestación a sus consultas;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios; </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Brindar servicio de atención al cliente;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Realizar encuestas de mercado y análisis de estrategias de marketing;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Ofrecer promociones a nuestros clientes;</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento.</p>';
            avisoEspana += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">La legislación vigente otorga al titular de los datos una serie de derechos que te invitamos a considerar detenidamente. Así dispones de los derechos de acceso, rectificación, supresión, limitación del tratamiento, recibir notificación en caso de rectificación o supresión de datos personales o limitación de tratamiento, portabilidad de los datos, oposición y a no ser objeto de una decisión automatizada, incluida la elaboración de perfiles, basada únicamente en el tratamiento automatizado. Kaloni Hair Madrid quiere asegurarse de que usted esté enterado de sus derechos: </p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de acceso:</b> Usted tiene derecho a solicitar los datos personales relacionados con usted y que nos haya proporcionado.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de rectificación:</b> Usted tiene el derecho a solicitar la corrección de los datos personales si usted cree que la información no es exacta. También tiene el derecho a solicitar que la empresa complemente aquellos datos que considere están incompletos.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de supresión:</b> Usted tiene el derecho a solicitar la eliminación de los datos personales (una vez que ya no sean necesarios para una finalidad empresarial legítima, como completar una transacción comercial)</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a restringir el tratamiento:</b> Usted tiene el derecho a solicitar la restricción de los datos personales siempre y cuando ya no sean necesarios para una finalidad empresarial legítima.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a objetar el tratamiento:</b> Usted tiene el derecho a objetar el tratamiento de sus datos personal.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a la portabilidad de los datos:</b> Usted tiene el derecho a solicitar la transferencia de sus datos a otra parte, siempre que esto sea viable técnicamente.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Quién es responsable de los datos personales recopilados?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por carta a: Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637 o por correo electrónico a legal@kaloni.com .</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencias de datos personales</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país (esto incluye el área exterior al Espacio Económico Europeo), adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales.</p>';
            avisoEspana += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cookies y tecnologías similares</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Hair Madrid puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo contactar a la autoridad apropiada?</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante una autoridad de supervisión de protección de datos de la UE. Puede encontrar los detalles de su autoridad de supervisión aplicable aquí.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al presente Aviso de Privacidad</b></p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios.</p>';
            avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Última modificación: 23 de mayo 2019.</p>';

            //Anexo de contrato de prestacion de servicios
            var contratoMexico = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONTRATO DE PRESTACIÓN DE SERVICIOS DE KALONI HOLDING GROUP S.C.</b></p>';
            contratoMexico += '<br/>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">El presente documento especifica los términos y condiciones, en adelante “Términos y Condiciones” que serán aplicados a la disposición de servicios “Servicios” prestados por Kaloni Holding Group S.C., en lo sucesivo “Kaloni”, a favor de la persona que firma este documento, en lo siguiente conocido como “El Cliente”. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Para los efectos de los presentes Términos y Condiciones se entenderá por:</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Servicio o Servicios:</u> Servicios médicos y estéticos ofrecidos por Kaloni, entre éstos se incluye el microinjerto capilar, la cirugía plástica y reconstructiva, tratamientos estéticos corporales, faciales y la venta de distintos productos para el cuidado estético. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Aviso y Política de Privacidad:</u> Documento físico y/o electrónico que establece las normas bajo las que se trata su Información por Kaloni. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Formato de Valoración:</u> Formato de entrevista realizada por el personal de Kaloni al Cliente en el cual se detalla información relevante para el correcto diagnóstico del Cliente.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Anticipo:</u> A la cantidad monetaria que el Cliente entrega al proveedor como adelanto para reservar la Fecha de Procedimiento en la que se llevará a cabo la prestación de los Servicios.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Fecha de Procedimiento:</u> Fecha seleccionada por el Cliente en la cual Kaloni prestará los Servicios conforme a los Términos y Condiciones suscritas entre las partes. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Consentimiento Informado:</u> Documento que comunica al Cliente de forma explícita y clara toda la información relativa al procedimiento al que va a someterse, los beneficios, riesgos, y otros aspectos relevantes relacionados con los Servicios contratados. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><u>Receta Médica:</u> Documento que expide el médico en el cual se le indicará al Cliente las prescripciones médicas que deberá cumplir.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">A la Hoja de Presupuesto, a los Términos y Condiciones y al Consentimiento Informado se les denominará conjuntamente el “Contrato”.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Valoración Previa Requerida.</b> El Cliente podrá programar su cita de valoración en cualquiera de nuestras clínicas, directorio disponible en https://kaloni.mx, en la cita de valoración se le explicarán detalladamente las opciones de tratamiento y los costos derivados. Kaloni prestará los servicios al Cliente de acuerdo con lo establecido en el Contrato. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cooperación.</b> El Cliente deberá proporcionar a Kaloni información verdadera en todo momento. El Cliente reconoce que deberá seguir cabalmente todos los cuidados indicados y asistir a todas las citas de seguimiento.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>De la Prestación del Servicio.</b> El Cliente reconoce tener conocimiento que los Servicios objeto de este Contrato serán prestados por personal médico y/o estético altamente capacitado, habiendo aceptado y autorizado expresamente en el Consentimiento Informado con la realización de los procedimientos por dicho profesional. Una vez que los Servicios sean prestados no se realizarán devoluciones. En el caso de compra de producto, una vez acreditado el pago correspondiente, Kaloni procederá a la entrega de la mercancía.</p>';
            contratoMexico += '<div style="page-break-after: always;"></div>';
            contratoMexico += '<br/><br/><br/><br/><br/><br/>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Pago.</b> Con la finalidad de reservar la Fecha de Procedimiento, el Cliente podrá realizar el pago total del Servicio contratado o podrá realizar un pago parcial en concepto de Anticipo, el cual no podrá ser menor a la cantidad equivalente al 10% del monto total de su procedimiento, en este último caso, el Cliente se obliga a  pagar el monto restante a más tardar en la Fecha de Procedimiento. El pago podrá ser realizado en efectivo en las cajas de Kaloni, a través de tarjeta de crédito o débito en nuestras terminales bancarias o mediante transferencia bancaria conforme a los siguientes datos:</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Banco: BBVA Bancomer</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Beneficiario: KALONI HOLDING GROUP, S.C. </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">Cuenta: 0100361658</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;">CLABE Interbancaria: 0121 8000 1003 6165 86</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Facturación.</b> Al momento de hacer su pago, la Ejecutiva de Atención a Clientes proporcionará al Cliente un Formato de Facturación mismo que deberá llenar con su información correcta y firmar. En caso de requerir factura con datos fiscales, deberá indicar sus datos fiscales correctos y completos, en caso de no requerirla deberá señalarlo en el mismo formato ya que Kaloni facturará a público en general como parte de las ventas del día, por lo tanto no se expedirán facturas posteriores al día de pago.   </p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultado.</b> El Cliente comprende que la práctica de la medicina no es una ciencia exacta, y que por tal motivo no es posible garantizar un resultado, dado que dicho resultado puede variar en razón a factores tales como cuidados y precauciones que son responsabilidad del Cliente y algunos otros aleatorios relacionados con la naturaleza de cada Cliente. El Cliente manifiesta, además, haber recibido información detallada sobre el diagnóstico, los posibles pronósticos, habiendo sido todo perfectamente entendido y aceptado por él, obligándose a cumplir todas las prescripciones médicas anteriores y posteriores al procedimiento médico, a fin de minimizar la ocurrencia de cualquiera de los riesgos señalados en el Consentimiento Informado.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Devolución.</b> El Cliente podrá cancelar o modificar la programación del Servicio contratado siempre y cuando notifique a Kaloni con una antelación de siete días hábiles previos a la Fecha de Procedimiento. El Cliente acepta y reconoce que si decide cancelar el Servicio fuera de este término, Kaloni retendrá el monto equivalente al 10% del costo total del procedimiento por concepto de Gastos Administrativos. La solicitud de devolución será procedente únicamente dentro de los siguientes treinta días naturales contados a partir de la fecha de su pago parcial o total; una vez concluido este término, Kaloni no realizará devolución monetaria, únicamente podrá ofrecer al Cliente cambio por otros servicios y/o producto. El Cliente deberá contactar <u>servicioalcliente@kaloni.com</u> para iniciar el trámite, no se atenderán solicitudes de devolución por otro medio. Kaloni dará respuesta a su solicitud mediante el envío de un Formato de Devolución, mismo que el Cliente deberá llenar con la información relativa a su pago y enviar adjuntando la factura, recibo o comprobante bancario al correo electrónico anteriormente mencionado. Una vez recibido el formato con la información completa, Kaloni notificará a El Cliente la correcta recepción de su trámite y a partir de esta fecha Kaloni tendrá 30 días hábiles para concluir el trámite de su devolución. El Cliente comprende y acepta que en el supuesto de cancelación del Servicio y solicitud de devolución, Kaloni retendrá las comisiones bancarias conforme a la cláusula siguiente.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Comisiones Bancarias.</b> La comisión bancaria aplicable por uso de terminal será del 3.7% en tarjetas American Express y del 2% en el resto de tarjetas bancarias. Si el pago se realizó a meses sin intereses, adicional a la comisión por uso de la terminal se retendrá la cantidad correspondiente al 12% en compras a 12 meses sin intereses y 6% en compras a 6 meses sin intereses.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Producto.</b> El Cliente contará con 30 días naturales a partir de la fecha de compra para solicitar el cambio o la devolución de un producto. Una vez abierto el producto no se aceptarán devoluciones.</p>';
            contratoMexico += '<div style="page-break-after: always;"></div>';
            contratoMexico += '<br/><br/><br/><br/><br/><br/>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Tratamiento De Datos Personales.</b> El Aviso de Privacidad y las políticas de uso y recopilación de información de Kaloni se encuentran disponibles para su consulta en nuestro sitio web http://kaloni.mx.</p>';
            contratoMexico += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Leyes Aplicables y Jurisdicción.</b> Para la interpretación, cumplimiento y ejecución del presente Contrato, las partes se someten a la jurisdicción y competencia de las autoridades competentes de la Ciudad de México, renunciando expresamente y desde este momento a cualquier otro fuero que por razón de su domicilio presente o futuro pudiera corresponderles.</p>';
            contratoMexico += '<p></p><p></p><p></p><p></p>';
            var headerPdf ='';
            headerPdf += '<table style="width:70%;font-size:11px; font-family:Aria, sans-serif;table-layout:fixed;">';
            headerPdf += '<tr>';
            headerPdf += '<td style=\"font-size: 13px;font-weight:bold;color:#346094;\">1. ' + label_title_fichaIdentificacion.toUpperCase() + ':</td>';
            headerPdf += '</tr>';
            headerPdf += '<tr>';
            headerPdf += '<td>';
            headerPdf += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            headerPdf += '<tr><td><b>' + label_title_numeroExpediente.toUpperCase() + ': </b> ' + numExpediente + '</td><td><b>' + label_generoPaciente.toUpperCase() + ': </b> ' + genero + '</td></tr>';
            headerPdf += '<tr><td><b>' + label_nombrePaciente.toUpperCase() + ': </b> ' + altname + '</td><td><b>CURP: </b> ' + identificacion + '</td></tr>';
            if (userObj.role == '3' || userObj.role == '1098') {
                headerPdf += '<tr><td><b>' + label_edadPaciente.toUpperCase() + ': </b> ' + edad + '</td><td><b>' + label_telefonoPaciente.toUpperCase() + ': </b> ' + phone + '</td></tr>';
            } else {
                headerPdf += '<tr><td><b>' + label_edadPaciente.toUpperCase() + ': </b> ' + edad + '</td><td><b>' + label_telefonoPaciente.toUpperCase() + ': </b> XXXXX</td></tr>';
            }
            headerPdf += '<tr><td><b>' + label_fechaDeNacimientoPaciente.toUpperCase() + ': </b> ' + fechaDeNacimiento + '</td><td><b>' + label_sucursalCaso.toUpperCase() + ': </b> ' + sucReal + '</td></tr>';
            headerPdf += '<tr><td width="60%"><b>' + label_direccionPaciente.toUpperCase(9) + ': </b> ' + xmlMod.escape({ xmlText: address }) + '</td><td width="40%"><b>' + label_estadoCivilPaciente.toUpperCase() + ': </b>' + edoCivil + '</td></tr>';
            headerPdf += '</table>';
            headerPdf += '</td>';
            headerPdf += '</tr>';
            headerPdf += '</table>';
            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
            xml += '<pdf>\n';
            xml += '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';
            xml +=headerPdf;
            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">' + label_title_historiaClinica.toUpperCase() + '</p>';
           
            
            xml += '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">';
            xml += '<tr><td align="left" valign="bottom" colspan="4" color="#FFFFFF" background-color="#346094"><b> ' + label_title_antecedentesPersonales.toUpperCase() + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_enfermedadDeImportancia + '</td><td align="left" valign="bottom" width="6%">' + enfermedadDeImportancia + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_enfermedadesRenales + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resEnfermedadDeImportancia + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_cirugiasPrevias + '</td><td align="left" valign="bottom" width="6%">' + algunaCirugiaPrevia + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_cirugiasPrevias + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + cual2 + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_campo_anestesiaPrevia + '</td><td align="left" valign="bottom" width="6%">' + checkAnestesia + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_cual + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + anestesiaPrevia + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_alergias + '</td><td align="left" valign="bottom" width="6%">' + sufreDeAlgunTipo + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_alergias + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + cual3 + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_campo_diabetes + '</td><td align="left" valign="bottom" width="6%">' + checksufreUstedDiabetes + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_cual + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + sufreUstedDiabetes + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_hipertension + '</td><td align="left" valign="bottom" width="6%">' + hipertension + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_hipertension + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resHipertension + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_cardiacos + '</td><td align="left" valign="bottom" width="6%">' + cardiacos + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_cardiacos + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resCardiacos + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_respiratorios + '</td><td align="left" valign="bottom" width="6%">' + respiratorios + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_respiratorios + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resRespiratorios + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_enfermedadesRenales + '</td><td align="left" valign="bottom" width="6%">' + renal + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_enfermedadesRenales + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resRenal + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_hepaticos + '</td><td align="left" valign="bottom" width="6%">' + hepaticos + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_hepaticos + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resHepaticos + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_gastrointestinales + '</td><td align="left" valign="bottom" width="6%">' + gastrointestinales + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_gastrointestinales + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resGastrointestinales + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_afeccionesPiel + '</td><td align="left" valign="bottom" width="6%">' + afeccionesPiel + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_afeccionesPiel + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resAfeccionesPiel + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_cancer + '</td><td align="left" valign="bottom" width="6%">' + cancer + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_cancer + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resCancer + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_tiroides + '</td><td align="left" valign="bottom" width="6%">' + tiroides + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_tiroides + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resTiroides + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_pruebasVIH + '</td><td align="left" valign="bottom" width="6%">' + seHaHechoPruebas + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_resultadoVIH + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + respuesta + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_hepatitis + '</td><td align="left" valign="bottom" width="6%">' + hepatitis + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_hepatitis + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resHepatitis + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_suplementosAlimenticios + '</td><td align="left" valign="bottom" width="6%">' + suplementosAlimenticios + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_suplementosAlimenticios + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resSuplementosAlimenticios + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_terapiaHormonal + '</td><td align="left" valign="bottom" width="6%">' + terapiaHormonal + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_terapiaHormonal + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resTerapiaHormonal + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_tabaquismo + ': </td><td align="left" valign="bottom" width="6%">' + fuma + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_tabaquismo + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + cualFuma + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_alcohol + '</td><td align="left" valign="bottom" width="6%">' + ingiereConFrecuencia + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_alcohol + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resingiereConFrecuencia + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_drogas + '</td><td align="left" valign="bottom" width="6%">' + drogas + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_drogas + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resDrogas + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_campo_cicatrizacion + ': </td><td align="left" valign="bottom" width="6%">' + checkqueTipoDeCicatrizacion + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_queTipoCicatrizacion + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + queTipoDeCicatrizacion + '</b></td></tr>';
            xml += '<tr><td align="left" valign="bottom" widht="45%">' + label_check_coagulacion + '</td><td align="left" valign="bottom" width="6%">' + coagulacion + '</td>';
            xml += '<td align="left" valign="bottom" width="9%">' + label_campo_coagulacion + ': </td><td align="left" valign="bottom" style="border-bottom: 1px solid;" width="50%"><b>' + resCoagulacion + '</b></td></tr>';
            xml += '</table>';

            xml += '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif; margin-top:5px;">';
            xml += '<tr><td align="left" valign="bottom" colspan="4" color="#FFFFFF" background-color="#346094"><b> ' + label_title_antecedentesNoPatologicos.toUpperCase() + '</b></td></tr>';
            xml += '<tr><td align="left" colspan="4" style="border-bottom: 1px solid"><b>' + xmlMod.escape({ xmlText: antecedentesPatologicos }) + ' </b></td></tr>';
            xml += '</table>';
            xml += '<div style=\"page-break-after: always;\"></div>';
            // xml += '<br/><br/><br/><br/><br/>';
            xml +=headerPdf;


            xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">' + label_title_historiaClinica.toUpperCase() + '</p>';

            xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="4" color="#FFFFFF" background-color="#346094"><b> ' + label_title_antecedentesHeredofamiliares.toUpperCase() + '</b></td></tr>';
            xml += '<tr><td align="left" width="25%">' + label_campo_diabetesHeredofamiliares + ': </td><td align="left" width="10%">' + diabetes1 + '</td>';
            xml += '<td align="left" width="20%">' + label_campo_especifiqueDiabetesHeredofamiliares + ': </td><td align="left" width="45%" style="border-bottom: 1px solid;"><b>' + especifiqueDiabetes1 + '</b></td></tr>';
            xml += '<tr><td align="left" width="25%">' + label_campo_hipertensionArterialHeredofamiliares + ': </td><td align="left" width="10%">' + hipertensionArterial + '</td>';
            xml += '<td align="left" width="20%">' + label_campo_especifiqueHipertensionArterialHeredofamiliares + ': </td><td align="left" width="45%" style="border-bottom: 1px solid;"><b>' + especifiqueHipertensionArterial + '</b></td></tr>';
            xml += '<tr><td align="left" width="25%">' + label_campo_cancerHeredofamiliares + ': </td><td align="left" width="10%">' + cancer2 + '</td>';
            xml += '<td align="left" width="20%">' + label_campo_especifiqueCancerHeredofamiliares + ': </td><td align="left" width="45%" style="border-bottom: 1px solid;"><b>' + especifiqueCancer2 + '</b></td></tr>';
            xml += '</table><br/>';

            xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="4" color="#FFFFFF" background-color="#346094"><b> ' + label_title_antecedentesGinecoobstetricos.toUpperCase() + '</b></td></tr>';
            xml += '<tr><td align="left" width="25%">' + label_campo_menarcaGinecoonstetra + ': </td><td align="left" width="70%"><b>' + menarca + '</b></td></tr>';
            xml += '<tr><td align="left" width="25%">' + label_campo_menstruacionGinecoonstetra + ': </td><td align="left" width="70%"><b>' + menstruacion + '</b></td></tr>';
            xml += '<tr><td align="left" width="20%">' + label_title_embarazos + ':</td></tr>';
            xml += '</table>';
            xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            xml += '<tr>';
            xml += '<td align="right" width="8%">' + label_campo_gestasGinecoobstetra + ': </td><td align="center" width="8%" style="border: 1px solid;"><b>' + g + '</b></td>';
            xml += '<td align="right" width="8%">' + label_campo_partosGinecoobstetra + ': </td><td align="center" width="8%" style="border: 1px solid;"><b>' + p + '</b></td>';
            xml += '<td align="right" width="8%">' + label_campo_cesareasGinecoobstetra + ': </td><td align="center" width="8%" style="border: 1px solid;"><b>' + c + '</b></td>';
            xml += '<td align="right" width="8%">' + label_campo_abortosGinecoobstetra + ': </td><td align="center" width="8%" style="border: 1px solid;"><b>' + a + '</b></td>';
            xml += '<td width="36%"></td>';
            xml += '</tr>';
            xml += '</table><br/>';

            xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="5" color="#FFFFFF" background-color="#346094"><b> ' + label_title_exploracionFisica.toUpperCase() + '</b></td></tr>';
            xml += '<tr><td align="left" width="17%">' + label_campo_temperaturaExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + temperatura + '</b></td><td width="3%"></td>';
            xml += '<td align="left" width="17%">' + label_campo_presionArterialExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + presionArterial + '</b></td></tr>';
            xml += '<tr><td align="left" width="17%">' + label_campo_frecuenciaCardiacaExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + frecuenciaCardiaca + '</b></td><td width="3%"></td>';
            xml += '<td align="left" width="17%">' + label_campo_frecuenciaRespiratoriaExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + frecuenciaRespiratoria + '</b></td></tr>';
            xml += '<tr><td align="left" width="17%">' + label_campo_pesoExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + peso + ' kgs.</b></td><td width="3%"></td>';
            xml += '<td align="left" width="17%">' + label_campo_tallaExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + talla + ' mts.</b></td></tr>';
            xml += '<tr><td align="left" width="17%">' + label_campo_especialidadExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + especialidad + '</b></td><td width="3%"></td>';
            xml += '<td align="left" width="17%">' + label_campo_imcExploracionFisica + ': </td><td align="left" width="30%" style="border-bottom: 1px solid;"><b>' + imc + '</b></td></tr>';
            xml += '</table><br/>';

            xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" width="30%">' + label_campo_aspectoFisicoExploracionFisica + ': </td><td align="left" style="border-bottom: 1px solid;"><b>' + aspectoFisico + '</b></td></tr>';
            xml += '<tr><td align="left" width="30%">' + label_campo_sexoAparenteExploracionFisica + ': </td><td align="left" style="border-bottom: 1px solid;"><b>' + sexoAparente + '</b></td></tr>';
            xml += '<tr><td align="left" width="30%">' + label_campo_edadAparenteExploracionFisica + ': </td><td align="left" style="border-bottom: 1px solid;"><b>' + edadAparente + '</b></td></tr>';
            xml += '<tr><td align="left" width="30%">' + label_campo_constitucionPacienteExploracionFisica + ': </td><td align="left" style="border-bottom: 1px solid;"><b>' + constitucionPaciente + '</b></td></tr>';
            xml += '</table><br/>';

            xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
            xml += '<tr><td align="left" colspan="4" color="#FFFFFF" background-color="#346094"><b>' + label_title_datosClinicosRelevantes.toUpperCase() + '</b></td></tr>';
            xml += '<tr><td align="left" style="border-bottom: 1px solid;" width="100%"><b>' + datosClinicosRelevantes + '</b></td></tr>';
            xml += '</table>';

            if (avisoPrivacidadbase64 != '') {
                xml += '<div style=\"page-break-after: always;\"></div>';
                // xml += '<br/><br/><br/><br/><br/>';
                xml +=headerPdf;
                if (subsidiaryText == "Mexico") {
                    xml += avisoMexico;
                } else if (subsidiaryText == "Colombia") {
                    xml += avisoColombia;
                } else if (subsidiaryText == "España") {
                    xml += avisoEspana;
                } else if (subsidiaryText == 'Albya') {
                    xml += avisoAlbya;
                } else {
                    xml += avisoMexico;
                }
                xml += '<p></p><p></p>';
                xml += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
                xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p>';
                xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>' + altname + '</b></p>';
            }
            if (contratoServiciobase64 != '') {
                xml += '<div style=\"page-break-after: always;\"></div>';
                xml += headerPdf;
                if (subsidiaryText == "Mexico") {
                    xml += contratoMexico;
                } else if (subsidiaryText == "Colombia") {
                    xml += contratoColombia;
                } else if (subsidiaryText == "España") {
                    xml += contratoEspana;
                } else {
                    xml += contratoMexico;
                }
                xml += '<p style="align:center"><img src="' + contratoServiciobase64 + '" width="100" height="100" /></p>';
                xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + altname + '</b></p>';
            }
            xml += '</body></pdf>';
            context.response.renderPdf({ xmlString: xml });
        }

        function getImageBackGround(sucursal,subsidiaryValue) {
            var imageBack = "";

            if (subsidiaryValue == 19) {
                    imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
            }
            else {
                if (sucursal == "22") // Altavista KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
                if (sucursal == "35") // Can-Cun KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                if (sucursal == "36") // Chihuahua KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
                if (sucursal == "23") // Guadalajara KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
                if (sucursal == "24") // Monterrey KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
                if (sucursal == "25") // Polanco KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
                if (sucursal == "37") // Puebla KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
                if (sucursal == "21") // Santa FE KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
                if (sucursal == "26") // Satelite KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
                if (sucursal == "27") // Tijuana KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
                if (sucursal == "28") // Veracruz KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
            }
            return imageBack;
        }

        function sucursalReal(sucursalText) {
            var sucSinModif = sucursalText;
            var largoSucursal_base = sucursalText.length;
            largoSucursal_menosKHG = largoSucursal_base - 4;

            var validateKHG = sucursalText.slice(largoSucursal_menosKHG, largoSucursal_base);

            if (validateKHG == ' KHG') {
                var sucursalFinal = sucursalText.slice(0, largoSucursal_menosKHG);
                return sucursalFinal;
            } else {
                return sucSinModif;
            }
        }

        function checado(checks) {
            var check = "";
            if (checks == true) {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            } else if (checks == false) {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";
            } else if (checks == "SI") {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            } else if (checks == "NO") {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";
            } else if (checks == 1) {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            } else if (checks == 2) {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";
            }
            return check;
        }

        /**
 * Funcion que retorna la los años enteros transcurridos entre dos fechas
 * @param {string} fechaAntigua - se ingresa la fecha inicial desde la que se quiere calcular, por ejemplo: una fecha de nacimiento  
 * @param {string} fechaReciente - se ingresa la fecha final relativa al calculo, por ejemplo: la fecha actual
 */
        function calcYearInt(fechaAntigua, fechaReciente) {
            var edad = 0;
            var separador = '';
            var fR = fechaReciente.length;
            var fA = fechaAntigua.length;

            //extraer dia, mes y año del caso analizado
            separador = fechaReciente.search('/');
            var diaCaso = fechaReciente.substring(0, separador);
            fechaReciente = fechaReciente.substring(separador + 1, fR);
            fR = fechaReciente.length;
            separador = fechaReciente.search('/');
            var mesCaso = fechaReciente.substring(0, separador);
            fechaReciente = fechaReciente.substring(separador + 1, fR);
            var anioCaso = fechaReciente.substring(0, 4);

            //extraer dia, mes y año de la fecha de nacimiento del paciente
            separador = fechaAntigua.search('/');
            var diaNac = fechaAntigua.substring(0, separador);
            fechaAntigua = fechaAntigua.substring(separador + 1, fA);
            fA = fechaAntigua.length;
            separador = fechaAntigua.search('/');
            var mesNac = fechaAntigua.substring(0, separador);
            fechaAntigua = fechaAntigua.substring(separador + 1, fA);
            var anioNac = fechaAntigua.substring(0, 4);

            //calculo de las variables para obtener los días transcurridos entre ambas fechas
            var calcAnio = (parseInt(anioCaso) - parseInt(anioNac)) * 365.25;
            var calcMes = (parseInt(mesCaso) - parseInt(mesNac)) * 30;
            var calcDia = (parseInt(diaCaso) - parseInt(diaNac)) * 1;
            var calcEdad = (calcAnio + calcMes + calcDia) / 365.25;

            //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
            //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
            edad = Math.floor(calcEdad);

            edad = (isNaN(edad) == true) ? "" : edad;

            return edad;
        }

        /**
        * Function que retorna un string de HTML con estilo para generar un salto de página
        * y además agrega el espacio necesario para inciar la siguiente página en el sitio
        * correcto después del logo de hoja membretada
        */
        function saltoPagina() {
            var saltoPagina = '<div style="page-break-after:always;"></div>';
            saltoPagina += '<br /><br /><br /><br /><br />';

            return saltoPagina;
        }



        return {
            onRequest: onRequest
        };

    });
