/**

* @NApiVersion 2.x  
* @NScriptType Restlet
* @NModuleScope SameAccount

*/

define(['N/record', 'N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format', 'N/https', 'N/url', 'N/xml', 'N/render', 'N/runtime', 'N/config'],

  function (record, log, file, email, search, serverWidget, format, https, url, xmlMod, render, runtime, config) {

    function doGet(params) { }

    function doPost(params) {

      // log.debug("typeof", typeof params);
      var objJson;
      if (typeof params === "object") {
        objJson = params;
      } else {
        objJson = JSON.parse(params);
      }
      // log.debug("params", objJson);

      var param_idCustomer = objJson.idCustomer;
      var param_idCase = objJson.idCase;
      var param_typeCase = objJson.typeCase;
      var param_subTypeCase = objJson.subTypeCase;
      var param_subTypeNoQx = objJson.subTypeNoQx;

      // GLOBALS
      var pdfFile;

      if (param_typeCase === "clinicHistory") {
        try {
          pdfFile = generateClinicHistory(param_idCustomer, param_idCase);
        } catch (error) {
          return {
            "ERR_LOAD_CASE": "Cannot generate case pdf: " + error
          }
        }
      } else if (param_typeCase === "diagnostic") {
        try {
          pdfFile = generateDiagnostic(param_idCustomer, param_idCase);
        } catch (error) {
          return {
            "ERR_LOAD_CASE": "Cannot generate case pdf: " + error
          }
        }
      } else if (param_typeCase === "procedure") {
        if (param_subTypeCase === "qx") {
          try {
            pdfFile = generateProcedureQx(param_idCustomer, param_idCase);
          } catch (error) {
            return {
              "ERR_LOAD_CASE": "Cannot generate case pdf: " + error
            }
          }
        } else if (param_subTypeCase === "noQx") {
          try {

            pdfFile = generateProcedureNoQx(param_idCustomer, param_idCase, param_subTypeNoQx);
          } catch (error) {
            return {
              "ERR_LOAD_CASE": "Cannot generate case pdf: " + error
            }
          }
        } else {
          return {
            "ERR_PARAM_EMPTY": "parameter \"subTypeCase\" empty or value does not match"
          }
        }
      } else {
        return {
          "ERR_PARAM_EMPTY": "parameter \"typeCase\" empty or value does not match"
        }
      }

      return {
        fileName: param_idCustomer + '-' + param_idCase + '-' + param_typeCase + '-' + param_subTypeCase + '-' + param_subTypeCase + '-' + param_subTypeNoQx + '.pdf',
        fileContent: pdfFile.getContents()
      };
    }

    return {
      get: doGet,
      post: doPost
    };


    function generateClinicHistory(companyId, recId) {

      var configRecObj = config.load({
        type: config.Type.USER_PREFERENCES
      });
      var interfaceLanguage = configRecObj.getValue({
        fieldId: 'LANGUAGE'
      });
      var userObj = runtime.getCurrentUser();
      //var recId = context.request.parameters.recId;
      var caso = record.load({
        type: 'supportcase',
        id: recId
      });

      // FORMATO DE VALORACIÓN
      //var companyId = caso.getValue({ fieldId: 'company' });
      var edad = caso.getValue({
        fieldId: 'custevent332'
      });
      var cliente = record.load({
        type: 'customer',
        id: companyId
      }); // , isDynamic: true

      var numExpediente = cliente.getValue({
        fieldId: 'entityid'
      });
      var altname = cliente.getValue({
        fieldId: 'altname'
      });
      var phone = cliente.getText({
        fieldId: 'mobilephone'
      });
      var address = cliente.getValue({
        fieldId: 'defaultaddress'
      });
      var sucursal = cliente.getValue({
        fieldId: 'custentity25'
      });
      var sucursalText = cliente.getText({
        fieldId: 'custentity25'
      });
      var subsidiaryValue = cliente.getValue({
        fieldId: 'subsidiary'
      });
      var subsidiaryText = cliente.getText({
        fieldId: 'subsidiary'
      });
      var sucReal = sucursalReal(sucursalText);
      var edoCivil = caso.getText({
        fieldId: 'custevent206'
      }) || '';
      var genero = cliente.getText({
        fieldId: 'custentity_sexo'
      }) || '';
      var identificacion = cliente.getText({
        fieldId: 'custentity234'
      }) || '';
      var imageBack = getImageBackGround(sucursal, subsidiaryValue);
      var fechaCaso = caso.getText({
        fieldId: 'startdate'
      });
      var fechaDeNacimiento = caso.getText({
        fieldId: 'custevent331'
      }); //se cambia el custevent205
      edad = calcYearInt(fechaDeNacimiento, fechaCaso); // Calculo de la edad del paciente tomando como referencia la fecha de nacimiento y la fecha en la que se inicia el caso

      // Historial Clínico
      var renal = checado(caso.getValue({
        fieldId: 'custevent232'
      })); //Sufre de algun problema renal
      var resRenal = caso.getValue({
        fieldId: 'custevent227'
      }); //Cual problema renal
      var algunaCirugiaPrevia = checado(caso.getValue({
        fieldId: 'custevent223'
      })); //Alguna cirugia previa
      var cual2 = caso.getText({
        fieldId: 'custevent233'
      }); //Cual cirugia Previa
      var seHaHechoPruebas = checado(caso.getValue({
        fieldId: 'custevent236'
      })); // Pruebas de VIH
      var anestesiaPrevia = caso.getText({
        fieldId: 'custevent225'
      }); //anestesia previa
      var checkAnestesia = checado((caso.getText({
        fieldId: 'custevent225'
      }) == "" || caso.getText({
        fieldId: 'custevent225'
      }) == "Ninguna") ? false : true); //Representa Checado anestesia
      var respuesta = caso.getText({
        fieldId: 'custevent237'
      }); //Resultado VIH
      var sufreDeAlgunTipo = checado(caso.getValue({
        fieldId: 'custevent226'
      })); //Sufre de algun tipo de alergia
      var cual3 = caso.getText({
        fieldId: 'custevent240'
      }); //Cual alergia
      var sufreUstedDiabetes = caso.getText({
        fieldId: 'custevent230'
      }); //Tiene usted diabetes
      var checksufreUstedDiabetes = checado((caso.getText({
        fieldId: 'custevent230'
      }) == "" || caso.getText({
        fieldId: 'custevent230'
      }) == "No") ? false : true); //checado para Diabetes
      var queTipoDeCicatrizacion = caso.getText({
        fieldId: 'custevent229'
      });
      var checkqueTipoDeCicatrizacion = checado((caso.getText({
        fieldId: 'custevent229'
      }) != '') ? true : false); //checado para cicatrización
      var ingiereConFrecuencia = checado(caso.getValue({
        fieldId: 'custevent238'
      })); //Ingiere alcohol
      var resingiereConFrecuencia = caso.getText({
        fieldId: 'custevent228'
      }); //Respuesta ingiere alcohol
      var fuma = checado(caso.getValue({
        fieldId: 'custevent479'
      })); //Fuma
      var cualFuma = caso.getText({
        fieldId: 'custevent235'
      }); // especifique tabaquismo
      var enfermedadDeImportancia = checado(caso.getValue({
        fieldId: 'custevent341'
      })); // Enfermedad de importancia paciente
      var resEnfermedadDeImportancia = caso.getValue({
        fieldId: 'custevent253'
      });
      var antecedentesPatologicos = caso.getText({
        fieldId: 'custevent489'
      }); //Antecedentes previos convencionales
      var hepatitis = checado(caso.getValue({
        fieldId: 'custevent531'
      })); //Tiene hepatitis?
      var resHepatitis = caso.getText({
        fieldId: 'custevent532'
      }); //Resultado hepatitis
      var cardiacos = checado(caso.getValue({
        fieldId: 'custevent517'
      })); //Problemas cardiacos
      var resCardiacos = caso.getValue({
        fieldId: 'custevent518'
      }); //Respuesta cardiacos
      var respiratorios = checado(caso.getValue({
        fieldId: 'custevent519'
      })); //Problemas respiratorios
      var resRespiratorios = caso.getValue({
        fieldId: 'custevent520'
      }); //Respuesta respiratorias
      var hipertension = checado(caso.getValue({
        fieldId: 'custevent252'
      })); // Probelmas de hipertension
      var resHipertension = caso.getValue({
        fieldId: 'custevent222'
      }); //Respuesta hipertension
      var hepaticos = checado(caso.getValue({
        fieldId: 'custevent521'
      })); //Problemas hepaticos
      var resHepaticos = caso.getValue({
        fieldId: 'custevent522'
      }); // Respuesta hepaticos
      var gastrointestinales = checado(caso.getValue({
        fieldId: 'custevent523'
      })); // Problemas Gastrointestinales
      var resGastrointestinales = caso.getValue({
        fieldId: 'custevent524'
      }); // Respuesta gastrointestinales
      var afeccionesPiel = checado(caso.getValue({
        fieldId: 'custevent525'
      })); //Afecciones en la piel
      var resAfeccionesPiel = caso.getValue({
        fieldId: 'custevent526'
      }); // Respuesta afecciones en la piel
      var cancer = checado(caso.getValue({
        fieldId: 'custevent527'
      })); // Tiene cancer
      var resCancer = caso.getValue({
        fieldId: 'custevent528'
      }); // Respuesta Cancer
      var tiroides = checado(caso.getValue({
        fieldId: 'custevent529'
      })); //Problemas de tiroides
      var resTiroides = caso.getValue({
        fieldId: 'custevent530'
      }); // respuesta tiroides
      var suplementosAlimenticios = checado(caso.getValue({
        fieldId: 'custevent533'
      })); // toma suplementos alimenticios
      var resSuplementosAlimenticios = caso.getValue({
        fieldId: 'custevent534'
      }); // respuesta suplementos alimneticios
      var terapiaHormonal = checado(caso.getValue({
        fieldId: 'custevent535'
      })); // terapia Hormonal
      var resTerapiaHormonal = caso.getValue({
        fieldId: 'custevent536'
      }); // respuesta terapia hormonal
      var drogas = checado(caso.getValue({
        fieldId: 'custevent537'
      })); // consume drogas
      var resDrogas = caso.getValue({
        fieldId: 'custevent538'
      }); //respuesta consume drogas
      var coagulacion = checado(caso.getValue({
        fieldId: 'custevent539'
      })); // Problemas de coagulacion
      var resCoagulacion = caso.getValue({
        fieldId: 'custevent540'
      }); // respuesta coagulacion

      // Variables para firmas de Aviso de privacidad y Contrato de Servicios
      var avisoPrivacidadbase64 = caso.getValue({
        fieldId: 'custevent319'
      }) || '';
      var contratoServiciobase64 = caso.getValue({
        fieldId: 'custevent340'
      }) || '';

      // Antecedentes Heredofamiliares
      var diabetes1 = checado(caso.getValue({
        fieldId: 'custevent255'
      })); //caso.getText({ fieldId: 'custevent255' });
      var especifiqueDiabetes1 = caso.getText({
        fieldId: 'custevent257'
      });
      var hipertensionArterial = checado(caso.getValue({
        fieldId: 'custevent256'
      })); //(caso.getText({ fieldId: 'custevent256' }));
      var especifiqueHipertensionArterial = caso.getText({
        fieldId: 'custevent259'
      });
      var cancer2 = checado(caso.getValue({
        fieldId: 'custevent258'
      })); //caso.getText({ fieldId: 'custevent258' });
      var especifiqueCancer2 = caso.getText({
        fieldId: 'custevent260'
      });

      // Antecedentes ginecoobstetricos
      var menarca = caso.getText({
        fieldId: 'custevent261'
      });
      var menstruacion = caso.getText({
        fieldId: 'custevent262'
      });
      var g = caso.getValue({
        fieldId: 'custevent264'
      });
      var p = caso.getValue({
        fieldId: 'custevent265'
      });
      var c = caso.getValue({
        fieldId: 'custevent266'
      });
      var a = caso.getValue({
        fieldId: 'custevent267'
      });

      // Exploración física Paciente
      var aspectoFisico = caso.getText({
        fieldId: 'custevent492'
      });
      var frecuenciaCardiaca = caso.getText({
        fieldId: 'custevent504'
      });
      var sexoAparente = caso.getText({
        fieldId: 'custevent493'
      });
      var frecuenciaRespiratoria = caso.getText({
        fieldId: 'custevent505'
      });
      var edadAparente = caso.getText({
        fieldId: 'custevent494'
      });
      var peso = caso.getValue({
        fieldId: 'custevent506'
      }) || '';
      var constitucionPaciente = caso.getText({
        fieldId: 'custevent495'
      });
      var talla = caso.getValue({
        fieldId: 'custevent507'
      }) || '';
      var temperatura = caso.getText({
        fieldId: 'custevent502'
      });
      var especialidad = caso.getText({
        fieldId: 'custevent508'
      });
      var presionArterial = caso.getText({
        fieldId: 'custevent503'
      });
      var imc = caso.getText({
        fieldId: 'custevent541'
      }) || ''; //Indice de masa corporal paciente
      imc = parseFloat(imc);

      if (isNaN(imc)) {
        imc = '';
      } else {
        imc = imc.toFixed(2);
      }

      // Sección DATOS CLINICOS RELEVANTES
      var datosClinicosRelevantes = caso.getText({
        fieldId: 'custevent542'
      });

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
      var label_edadPaciente = caso.getField({
        fieldId: 'custevent332'
      }).label;
      var label_nombrePaciente = cliente.getField({
        fieldId: 'altname'
      }).label;
      var label_telefonoPaciente = cliente.getField({
        fieldId: 'phone'
      }).label;
      var label_direccionPaciente = cliente.getField({
        fieldId: 'defaultaddress'
      }).label;
      var label_sucursalCaso = caso.getField({
        fieldId: 'custevent2'
      }).label;
      var label_estadoCivilPaciente = caso.getField({
        fieldId: 'custevent206'
      }).label;
      var label_generoPaciente = cliente.getField({
        fieldId: 'custentity_sexo'
      }).label;
      var label_identificacionPaciente = caso.getField({
        fieldId: 'custevent1188'
      }).label;
      var label_fechaDeNacimientoPaciente = caso.getField({
        fieldId: 'custevent331'
      }).label;
      var label_check_enfermedadesRenales = caso.getField({
        fieldId: 'custevent232'
      }).label;
      var label_campo_enfermedadesRenales = caso.getField({
        fieldId: 'custevent227'
      }).label;
      var label_check_cirugiasPrevias = caso.getField({
        fieldId: 'custevent223'
      }).label;
      var label_campo_cirugiasPrevias = caso.getField({
        fieldId: 'custevent233'
      }).label;
      var label_check_pruebasVIH = caso.getField({
        fieldId: 'custevent236'
      }).label;
      var label_campo_resultadoVIH = caso.getField({
        fieldId: 'custevent237'
      }).label;
      var label_campo_anestesiaPrevia = caso.getField({
        fieldId: 'custevent225'
      }).label;
      var label_check_alergias = caso.getField({
        fieldId: 'custevent226'
      }).label;
      var label_campo_alergias = caso.getField({
        fieldId: 'custevent240'
      }).label;
      var label_campo_diabetes = caso.getField({
        fieldId: 'custevent230'
      }).label;
      var label_campo_cicatrizacion = caso.getField({
        fieldId: 'custevent229'
      }).label;
      var label_check_alcohol = caso.getField({
        fieldId: 'custevent238'
      }).label;
      var label_campo_alcohol = caso.getField({
        fieldId: 'custevent228'
      }).label;
      var label_check_tabaquismo = caso.getField({
        fieldId: 'custevent479'
      }).label;
      var label_campo_tabaquismo = caso.getField({
        fieldId: 'custevent235'
      }).label;
      var label_check_enfermedadDeImportancia = caso.getField({
        fieldId: 'custevent341'
      }).label;
      var label_campo_enfermedadDeImportancia = caso.getField({
        fieldId: 'custevent253'
      }).label;
      var label_antecedentesPatologicos = caso.getField({
        fieldId: 'custevent489'
      }).label;
      var label_check_hepatitis = caso.getField({
        fieldId: 'custevent531'
      }).label;
      var label_campo_hepatitis = caso.getField({
        fieldId: 'custevent532'
      }).label;
      var label_check_cardiacos = caso.getField({
        fieldId: 'custevent517'
      }).label;
      var label_campo_cardiacos = caso.getField({
        fieldId: 'custevent518'
      }).label;
      var label_check_respiratorios = caso.getField({
        fieldId: 'custevent519'
      }).label;
      var label_campo_respiratorios = caso.getField({
        fieldId: 'custevent520'
      }).label;
      var label_check_hipertension = caso.getField({
        fieldId: 'custevent252'
      }).label;
      var label_campo_hipertension = caso.getField({
        fieldId: 'custevent222'
      }).label;
      var label_check_hepaticos = caso.getField({
        fieldId: 'custevent521'
      }).label;
      var label_campo_hepaticos = caso.getField({
        fieldId: 'custevent522'
      }).label;
      var label_check_gastrointestinales = caso.getField({
        fieldId: 'custevent523'
      }).label;
      var label_campo_gastrointestinales = caso.getField({
        fieldId: 'custevent524'
      }).label;
      var label_check_afeccionesPiel = caso.getField({
        fieldId: 'custevent525'
      }).label;
      var label_campo_afeccionesPiel = caso.getField({
        fieldId: 'custevent526'
      }).label;
      var label_check_cancer = caso.getField({
        fieldId: 'custevent527'
      }).label;
      var label_campo_cancer = caso.getField({
        fieldId: 'custevent528'
      }).label;
      var label_check_tiroides = caso.getField({
        fieldId: 'custevent529'
      }).label;
      var label_campo_tiroides = caso.getField({
        fieldId: 'custevent530'
      }).label;
      var label_check_suplementosAlimenticios = caso.getField({
        fieldId: 'custevent533'
      }).label;
      var label_campo_suplementosAlimenticios = caso.getField({
        fieldId: 'custevent534'
      }).label;
      var label_check_terapiaHormonal = caso.getField({
        fieldId: 'custevent535'
      }).label;
      var label_campo_terapiaHormonal = caso.getField({
        fieldId: 'custevent536'
      }).label;
      var label_check_drogas = caso.getField({
        fieldId: 'custevent537'
      }).label;
      var label_campo_drogas = caso.getField({
        fieldId: 'custevent538'
      }).label;
      var label_check_coagulacion = caso.getField({
        fieldId: 'custevent539'
      }).label;
      var label_campo_coagulacion = caso.getField({
        fieldId: 'custevent540'
      }).label;
      var label_campo_diabetesHeredofamiliares = caso.getField({
        fieldId: 'custevent255'
      }).label;
      var label_campo_especifiqueDiabetesHeredofamiliares = caso.getField({
        fieldId: 'custevent257'
      }).label;
      var label_campo_hipertensionArterialHeredofamiliares = caso.getField({
        fieldId: 'custevent256'
      }).label;
      var label_campo_especifiqueHipertensionArterialHeredofamiliares = caso.getField({
        fieldId: 'custevent259'
      }).label;
      var label_campo_cancerHeredofamiliares = caso.getField({
        fieldId: 'custevent258'
      }).label;
      var label_campo_especifiqueCancerHeredofamiliares = caso.getField({
        fieldId: 'custevent260'
      }).label;
      var label_campo_menarcaGinecoonstetra = caso.getField({
        fieldId: 'custevent261'
      }).label;
      var label_campo_menstruacionGinecoonstetra = caso.getField({
        fieldId: 'custevent262'
      }).label;
      var label_campo_gestasGinecoobstetra = caso.getField({
        fieldId: 'custevent264'
      }).label;
      var label_campo_partosGinecoobstetra = caso.getField({
        fieldId: 'custevent265'
      }).label;
      var label_campo_cesareasGinecoobstetra = caso.getField({
        fieldId: 'custevent266'
      }).label;
      var label_campo_abortosGinecoobstetra = caso.getField({
        fieldId: 'custevent267'
      }).label;
      var label_campo_aspectoFisicoExploracionFisica = caso.getField({
        fieldId: 'custevent492'
      }).label;
      var label_campo_frecuenciaCardiacaExploracionFisica = caso.getField({
        fieldId: 'custevent504'
      }).label;
      var label_campo_sexoAparenteExploracionFisica = caso.getField({
        fieldId: 'custevent493'
      }).label;
      var label_campo_frecuenciaRespiratoriaExploracionFisica = caso.getField({
        fieldId: 'custevent505'
      }).label;
      var label_campo_edadAparenteExploracionFisica = caso.getField({
        fieldId: 'custevent494'
      }).label;
      var label_campo_pesoExploracionFisica = caso.getField({
        fieldId: 'custevent506'
      }).label;
      var label_campo_constitucionPacienteExploracionFisica = caso.getField({
        fieldId: 'custevent495'
      }).label;
      var label_campo_tallaExploracionFisica = caso.getField({
        fieldId: 'custevent507'
      }).label;
      var label_campo_temperaturaExploracionFisica = caso.getField({
        fieldId: 'custevent502'
      }).label;
      var label_campo_especialidadExploracionFisica = caso.getField({
        fieldId: 'custevent508'
      }).label;
      var label_campo_presionArterialExploracionFisica = caso.getField({
        fieldId: 'custevent503'
      }).label;
      var label_campo_imcExploracionFisica = caso.getField({
        fieldId: 'custevent541'
      }).label;
      var label_campo_datosClinicosRelevantesExploracionFisica = caso.getField({
        fieldId: 'custevent542'
      }).label;
      var label_campo_fechaNacimiento = caso.getField({
        fieldId: 'custevent331'
      }).label;
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

      // var avisoAlbya = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>' +
      //   '<br/><p style="font-family:Aria, sans-serif; font-size:12px;">Albya S.C., (“Albya”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p><br/>' +


      var encabezados_fichaIdentificacionHistory = '<table style="margin-left:150px;width:100%;font-size:11px; font-family:Aria, sans-serif;table-layout:fixed;">';
      encabezados_fichaIdentificacionHistory += '<tr>';
      encabezados_fichaIdentificacionHistory += '<td style=\"font-size: 13px;font-weight:bold;color:#346094;\">' + label_title_fichaIdentificacion.toUpperCase() + ':</td>';
      encabezados_fichaIdentificacionHistory += '</tr>';
      encabezados_fichaIdentificacionHistory += '<tr>';
      encabezados_fichaIdentificacionHistory += '<td>';
      encabezados_fichaIdentificacionHistory += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
      encabezados_fichaIdentificacionHistory += '<tr><td><b>' + label_title_numeroExpediente.toUpperCase() + ': </b> ' + numExpediente + '</td><td><b>' + label_generoPaciente.toUpperCase() + ': </b> ' + genero + '</td></tr>';
      encabezados_fichaIdentificacionHistory += '<tr><td><b>' + label_nombrePaciente.toUpperCase() + ': </b> ' + altname + '</td><td><b>CURP: </b> ' + identificacion + '</td></tr>';
      if (userObj.role == '3' || userObj.role == '1098') {
        encabezados_fichaIdentificacionHistory += '<tr><td><b>' + label_edadPaciente.toUpperCase() + ': </b> ' + edad + '</td><td><b>' + label_telefonoPaciente.toUpperCase() + ': </b> ' + phone + '</td></tr>';
      } else {
        encabezados_fichaIdentificacionHistory += '<tr><td><b>' + label_edadPaciente.toUpperCase() + ': </b> ' + edad + '</td><td><b>' + label_telefonoPaciente.toUpperCase() + ': </b> XXXXX</td></tr>';
      }
      encabezados_fichaIdentificacionHistory += '<tr><td><b>' + label_fechaDeNacimientoPaciente.toUpperCase() + ': </b> ' + fechaDeNacimiento + '</td><td><b>' + label_sucursalCaso.toUpperCase() + ': </b> ' + sucReal + '</td></tr>';
      encabezados_fichaIdentificacionHistory += '<tr><td width="60%"><b>' + label_direccionPaciente.toUpperCase(9) + ': </b> ' + address + '</td><td width="40%"><b>' + label_estadoCivilPaciente.toUpperCase() + ': </b>' + edoCivil + '</td></tr>';
      encabezados_fichaIdentificacionHistory += '</table>';
      encabezados_fichaIdentificacionHistory += '</td>';
      encabezados_fichaIdentificacionHistory += '</tr>';
      encabezados_fichaIdentificacionHistory += '</table>';

      var avisoAlbya = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">Albya S.C., (“Albya”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p> ' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos suyos tenemos?</b>' +
        '<br/>Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento o tratamiento que se realice y datos sobre su historial médico por ejemplo qué medicamentos toma actualmente, si padece alergias, etc.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué fines utilizaremos sus datos personales?</b>' +
        '<br/>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">A)	Para brindarle servicio de atención al cliente y dar contestación a sus consultas;</p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">B)   Para proveer los servicios y productos que ha solicitado y para mantenerlo informado sobre cambios en los mismos;</p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">C)	Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos.</p><br/>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">D)	Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios;</p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">E)   Realizar encuestas de mercado y análisis de estrategias de marketing;</p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">F)   Ofrecer promociones a nuestros clientes;</p>' +
        '<p style="font-family:Aria, sans-serif; font-size:12px;">G)	Mantener la relación con usted.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b>' +
        'Usted tiene el derecho de acceder a sus datos personales, rectificarlos, y cancelarlos, así como de oponerse al tratamiento que les demos conforme lo descrito en el presente aviso. Usted puede ejercer sus derechos en los términos establecidos legalmente, dirigiéndose por escrito a: Albya, S.C., con domicilio en Avenida Vasco de Quiroga 3900, Torre B, Piso 4, Int 401, Col. Santa Fe Cuajimalpa, Del. Cuajimalpa de Morelos, C.P. 05348, Ciudad de México o por correo electrónico a legal@albya.com.</p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>';
      avisoAlbya += encabezados_fichaIdentificacionHistory;
      avisoAlbya += '<p style="font-family:Aria, sans-serif; font-size:12px;">La negativa para el uso de sus datos personales para estas finalidades no será un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal.</b>' +
        '<br/>Albya otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada, por lo tanto se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.<br/>Asimismo, Albya y sus empleados, encargados y en general usuarios que tengan acceso a datos personales en el ejercicio de sus funciones o intervengan en cualquier fase del tratamiento se comprometen a guardar confidencialidad respecto de su información personal, incluso después de finalizada la relación con usted o con la empresa.</p><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Dónde puedo consultar la política de privacidad integral?</b>' +
        '<br/>PPara conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://albya.com/web/legal.php</p><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencia de datos</b>' +
        '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al aviso de privacidad</b>' +
        '<br/>Albya podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será publicada en https://albya.com/web/legal.php. Fecha de última actualización [01/11/2019]</p><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p>';

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
        '<br/>Para conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://kaloni.mx/legal.html.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencia de datos</b>' +
        '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p>' +
        '<div style="page-break-after: always;"></div>' +
        '<br/><br/><br/><br/><br/><br/>' +

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


      var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
      xml += '<pdf>\n';
      xml += '<body background-image="' + xmlMod.escape({
        xmlText: imageBack
      }) + '" >';
      xml += encabezados_fichaIdentificacionHistory;
      xml += '<p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">' + label_title_historiaClinica.toUpperCase() + '</p>';
      // xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">' + label_title_historiaClinica.toUpperCase() + '</p>';

      // xml += '<table style="width:100%;font-size:11px; font-family:Aria, sans-serif;table-layout:fixed;">';
      // xml += '<tr>';
      // xml += '<td style=\"font-size: 13px;font-weight:bold;color:#346094;\">1. ' + label_title_fichaIdentificacion.toUpperCase() + ':</td>';
      // xml += '</tr>';
      // xml += '<tr>';
      // xml += '<td>';
      // xml += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">";
      // xml += '<tr><td><b>' + label_title_numeroExpediente.toUpperCase() + ': </b> ' + numExpediente + '</td><td><b>' + label_generoPaciente.toUpperCase() + ': </b> ' + genero + '</td></tr>';
      // xml += '<tr><td><b>' + label_nombrePaciente.toUpperCase() + ': </b> ' + altname + '</td><td><b>CURP: </b> ' + identificacion + '</td></tr>';
      // if (userObj.role == '3' || userObj.role == '1098') {
      //   xml += '<tr><td><b>' + label_edadPaciente.toUpperCase() + ': </b> ' + edad + '</td><td><b>' + label_telefonoPaciente.toUpperCase() + ': </b> ' + phone + '</td></tr>';
      // } else {
      //   xml += '<tr><td><b>' + label_edadPaciente.toUpperCase() + ': </b> ' + edad + '</td><td><b>' + label_telefonoPaciente.toUpperCase() + ': </b> XXXXX</td></tr>';
      // }
      // xml += '<tr><td><b>' + label_fechaDeNacimientoPaciente.toUpperCase() + ': </b> ' + fechaDeNacimiento + '</td><td><b>' + label_sucursalCaso.toUpperCase() + ': </b> ' + sucReal + '</td></tr>';
      // xml += '<tr><td width="60%"><b>' + label_direccionPaciente.toUpperCase(9) + ': </b> ' + address + '</td><td width="40%"><b>' + label_estadoCivilPaciente.toUpperCase() + ': </b>' + edoCivil + '</td></tr>';
      // xml += '</table>';
      // xml += '</td>';
      // xml += '</tr>';
      // xml += '</table>';
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
      xml += '<tr><td align="left" colspan="4" style="border-bottom: 1px solid"><b>' + xmlMod.escape({
        xmlText: antecedentesPatologicos
      }) + ' </b></td></tr>';
      xml += '</table>';
      xml += '<div style=\"page-break-after: always;\"></div>';
      // xml += '<br/><br/><br/><br/><br/>';
      xml += encabezados_fichaIdentificacionHistory;


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
        xml += encabezados_fichaIdentificacionHistory;
        // xml += '<br/><br/><br/><br/><br/>';
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
        // xml += '<p></p><p></p>';
        xml += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
        xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p>';
        xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>' + altname + '</b></p>';
      }
      if (contratoServiciobase64 != '') {
        xml += '<div style=\"page-break-after: always;\"></div>';
        xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
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
      var pdfFile = render.xmlToPdf({
        xmlString: xml
      });

      return pdfFile;

      function getImageBackGround(sucursal, subsidiaryValue) {
        var imageBack = "";

        if (subsidiaryValue == 19) {
          imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
        } else {
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
          check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathCheck
          }) + "\" />";
          check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathNull
          }) + "\" />";
        } else if (checks == false) {
          //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
          var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
          var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
          check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathNull
          }) + "\" />";
          check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathRemove
          }) + "\"/>";
        } else if (checks == "SI") {
          //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
          var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
          var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
          check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathCheck
          }) + "\" />";
          check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathNull
          }) + "\" />";
        } else if (checks == "NO") {
          //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
          var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
          var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
          check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathNull
          }) + "\" />";
          check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathRemove
          }) + "\"/>";
        } else if (checks == 1) {
          //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
          var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
          var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
          check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathCheck
          }) + "\" />";
          check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathNull
          }) + "\" />";
        } else if (checks == 2) {
          //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
          var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
          var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
          check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathNull
          }) + "\" />";
          check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({
            xmlText: pathRemove
          }) + "\"/>";
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
        // saltoPagina += '<br /><br /><br /><br /><br />';
        saltoPagina += encabezados_fichaIdentificacion;

        log.debug('saltoPagina 1', saltoPagina);
        return saltoPagina;
      }
    }

    function generateDiagnostic(companyId, recId) {
      var identificacionCliente = '';
      var general_peso = "";
      var general_talla = "";
      var general_imc = "";
      var general_imc = "";

      // MAIN VARS
      // Variables para crear los objetos principales
      //var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
      log.debug('recId: ', recId);
      var caso = record.load({
        type: 'supportcase',
        id: recId
      }); // Variable que guarda el objeto Case
      //var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente
      var cliente = record.load({
        type: 'customer',
        id: companyId
      }); // Variable que guarda el objeto Customer
      var custevent_parentrecid = cliente.getValue({
        fieldId: 'custevent_parentrecid'
      }) || null;
      //if (custevent_parentrecid !== null) {
      //var casoHC_parent = record.load({ type: 'supportcase', id: custevent_parentrecid });
      //identificacionCliente = casoHC_parent.getText({ fieldId: 'custentity234' }) || '';
      //}            

      //CUSTOMER
      // Variables Informacion General obtenidas del CLIENTE
      var sucursalId = cliente.getValue({
        fieldId: 'custentity25'
      }); //Variable que guarda el id de Sucursal del cliente
      var sucursalText = cliente.getText({
        fieldId: 'custentity25'
      }); //Variable que guarda el id de Sucursal del cliente
      var nombreCliente = cliente.getText({
        fieldId: 'altname'
      });
      var numeroExpediente = cliente.getText({
        fieldId: 'entityid'
      });
      var identificacionCliente = cliente.getText({
        fieldId: 'custentity234'
      }) || '';
      var telefonoCliente = cliente.getText({
        fieldId: 'mobilephone'
      }) || '';
      var direccionCliente = cliente.getText({
        fieldId: 'defaultaddress'
      }) || '';

      var search_CompanyText = numeroExpediente + ' ' + nombreCliente;
      try {
        var idHistoriaClinica = null;
        var cargarBusqueda = search.load({
          id: 'customsearch6993'
        });
        cargarBusqueda.filters.push(search.createFilter({
          name: 'company',
          operator: search.Operator.IS,
          values: search_CompanyText
        }));
        cargarBusqueda.filters.push(search.createFilter({
          name: 'title',
          operator: search.Operator.CONTAINS,
          values: 'Histor'
        }));
        cargarBusqueda.run().each(function (result) {
          idHistoriaClinica = result.getValue({
            name: 'internalid'
          });
        });
        log.debug('Id Historial Clinico', cargarBusqueda + ' Resultado ' + idHistoriaClinica);
        // VARIABLES HISTORIA CLINICA
        var historiaClinica = record.load({
          type: 'supportcase',
          id: idHistoriaClinica
        });
        general_peso = historiaClinica.getText({
          fieldId: 'custevent506'
        }) || '';
        general_talla = historiaClinica.getText({
          fieldId: 'custevent507'
        }) || '';
        general_imc = historiaClinica.getText({
          fieldId: 'custevent541'
        }) || '';
        general_imc = parseFloat(general_imc).toFixed(2);
      } catch (error) {
        log.error('Error de busqueda de historial clinico', error);
      }

      // VARIABLES DE CASE
      // Variables Mapeo EXPLORACION FISICA
      // Variables Informacion General obtenidads del Case
      var sucursalTextCaso = caso.getText({
        fieldId: 'custevent2'
      }); // Variable que guarda el nombre de la sucursal en String del case
      var fechaCaso = caso.getText({
        fieldId: 'startdate'
      }); // variable que guarda la fecha en la que se presenta el caso
      var hc_enfermeroExtraccion = caso.getText({
        fieldId: 'custevent71'
      }) || ""; // variable que guarda el enfermero de extraccion del caso
      var hc_enfermeroImplantacion = caso.getText({
        fieldId: 'custevent72'
      }) || ""; // variable que guarda el enfermero de implantacion del caso
      var medicoResponsableProcedimiento = caso.getText({
        fieldId: 'custevent28'
      }) || ""; // variable que guarda el medico responsable del caso
      var enfermerosResponsableProcedimiento = caso.getText({
        fieldId: 'custevent29'
      }) || ""; // variable que guarda el enfermeto responsable del caso
      var edoCivilCliente = caso.getText({
        fieldId: 'custevent206'
      }) || '';
      var fechNacCliente = caso.getValue({
        fieldId: 'custevent331'
      });
      fechNacCliente = formatDate(fechNacCliente);
      var sexoCliente = caso.getText({
        fieldId: 'custevent634'
      }) || '';

      //APOYOS
      // Variables obtenias desde funciones locales
      var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
      var sucReal = sucursalReal(sucursalText); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
      var edadCliente = calcYearInt(fechNacCliente, fechaCaso);

      // Variables Mapeo DIAGNOSTICO
      var body_diagnostico = caso.getText({
        fieldId: 'custevent281'
      }) || '';
      var body_tratamiento = caso.getText({
        fieldId: 'custevent1066'
      }) || '';
      var body_exploracion_hallazgos = caso.getText({
        fieldId: 'custevent279'
      }) || '';
      var body_exploracion_relevantes = caso.getText({
        fieldId: 'custevent580'
      }) || '';

      // Variables Mapeo del grupo ANTROPOMETRIA Y SOMATOMETRIA
      var body_per_abdominal = caso.getText({
        fieldId: 'custevent625'
      });
      var body_per_cadera = caso.getText({
        fieldId: 'custevent626'
      });
      var body_per_muslo = caso.getText({
        fieldId: 'custevent627'
      });
      var body_per_brazo = caso.getText({
        fieldId: 'custevent628'
      });
      var body_plie_bicipital = caso.getText({
        fieldId: 'custevent629'
      });
      var body_plie_tricipital = caso.getText({
        fieldId: 'custevent630'
      });
      var body_plie_subescapular = caso.getText({
        fieldId: 'custevent631'
      });
      var body_plie_suprailiaco = caso.getText({
        fieldId: 'custevent632'
      });
      var body_plie_abdominal = caso.getText({
        fieldId: 'custevent633'
      });

      // Variables Mapeo del grupo AREA Y TRATAMIENTO PROYECTADO
      var body_zonaA1 = caso.getText({
        fieldId: 'custevent581'
      }); //Variable ZONA 
      var body_zonaA = caso.getText({
        fieldId: 'custevent582'
      }); //Variable ZONA 
      var body_zonaA2 = caso.getText({
        fieldId: 'custevent583'
      }); //Variable ZONA 
      var body_zonaA3 = caso.getText({
        fieldId: 'custevent584'
      }); //Variable ZONA 
      var body_zonaA4 = caso.getText({
        fieldId: 'custevent585'
      }); //Variable ZONA 
      var body_zonaA5 = caso.getText({
        fieldId: 'custevent586'
      }); //Variable ZONA 
      var body_zonaA6 = caso.getText({
        fieldId: 'custevent587'
      }); //Variable ZONA 
      var body_zonaB = caso.getText({
        fieldId: 'custevent588'
      }); //Variable ZONA 
      var body_zonaC1 = caso.getText({
        fieldId: 'custevent589'
      }); //Variable ZONA 
      var body_zonaC2 = caso.getText({
        fieldId: 'custevent590'
      }); //Variable ZONA 
      var body_zonaD = caso.getText({
        fieldId: 'custevent591'
      }); //Variable ZONA 
      var body_zonaF1 = caso.getText({
        fieldId: 'custevent592'
      }); //Variable ZONA 
      var body_zonaF2 = caso.getText({
        fieldId: 'custevent593'
      }); //Variable ZONA 
      var body_zonaG1 = caso.getText({
        fieldId: 'custevent594'
      }); //Variable ZONA 
      var body_zonaG2 = caso.getText({
        fieldId: 'custevent595'
      }); //Variable ZONA 
      var body_zonaH1 = caso.getText({
        fieldId: 'custevent596'
      }); //Variable ZONA 
      var body_zonaH2 = caso.getText({
        fieldId: 'custevent597'
      }); //Variable ZONA 
      var body_zonaI1 = caso.getText({
        fieldId: 'custevent598'
      }); //Variable ZONA 
      var body_zonaI2 = caso.getText({
        fieldId: 'custevent599'
      }); //Variable ZONA 
      var body_zonaJ = caso.getText({
        fieldId: 'custevent600'
      }); //Variable ZONA 
      var body_zonaK1 = caso.getText({
        fieldId: 'custevent601'
      }); //Variable ZONA 
      var body_zonaK2 = caso.getText({
        fieldId: 'custevent602'
      }); //Variable ZONA 
      var body_zonaL = caso.getText({
        fieldId: 'custevent603'
      }); //Variable ZONA 
      var body_zonaM = caso.getText({
        fieldId: 'custevent604'
      }); //Variable ZONA 
      var body_zonaN = caso.getText({
        fieldId: 'custevent605'
      }); //Variable ZONA 
      var body_zonaP1 = caso.getText({
        fieldId: 'custevent606'
      }); //Variable ZONA 
      var body_zonaP2 = caso.getText({
        fieldId: 'custevent607'
      }); //Variable ZONA 
      var body_zonaP3 = caso.getText({
        fieldId: 'custevent608'
      }); //Variable ZONA 
      var body_zonaP4 = caso.getText({
        fieldId: 'custevent609'
      }); //Variable ZONA 
      var body_zonaQ1 = caso.getText({
        fieldId: 'custevent610'
      }); //Variable ZONA 
      var body_zonaQ2 = caso.getText({
        fieldId: 'custevent611'
      }); //Variable ZONA 
      var body_zonaQ3 = caso.getText({
        fieldId: 'custevent612'
      }); //Variable ZONA 
      var body_zonaQ4 = caso.getText({
        fieldId: 'custevent613'
      }); //Variable ZONA 
      var body_zonaR = caso.getText({
        fieldId: 'custevent614'
      }); //Variable ZONA 
      var body_zonaS = caso.getText({
        fieldId: 'custevent615'
      }); //Variable ZONA 
      var body_zonaT = caso.getText({
        fieldId: 'custevent616'
      }); //Variable ZONA 
      var body_zonaU = caso.getText({
        fieldId: 'custevent617'
      }); //Variable ZONA 
      var body_zonaV = caso.getText({
        fieldId: 'custevent618'
      }); //Variable ZONA 
      var body_zonaW = caso.getText({
        fieldId: 'custevent619'
      }); //Variable ZONA 

      // MANEJO DE FIRMAS
      var firmaMedico_base64 = caso.getValue({
        fieldId: 'custevent325'
      }) || null;
      var firmaMedico_png = caso.getValue({
        fieldId: 'custevent320'
      }) || null;

      // MANEJO DE GRAFICOS
      var imagenRostro = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4';
      var imagenCuerpo = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030';
      var pintarRostro = caso.getValue({
        fieldId: 'custevent801'
      }) || null;
      var pintarCuerpo = caso.getValue({
        fieldId: 'custevent810'
      }) || null;

      // MANEJO DE FOTOGRAFÍAS
      var id_image_1 = caso.getValue({
        fieldId: 'custevent313'
      }) || 1592235;
      var url_image_1 = 'data:image/jpg;base64,' + file.load({
        id: id_image_1
      }).getContents();
      var id_image_2 = caso.getValue({
        fieldId: 'custevent314'
      }) || 1592235;
      var url_image_2 = 'data:image/jpg;base64,' + file.load({
        id: id_image_2
      }).getContents();
      var id_image_3 = caso.getValue({
        fieldId: 'custevent315'
      }) || 1592235;
      var url_image_3 = 'data:image/jpg;base64,' + file.load({
        id: id_image_3
      }).getContents();
      var id_image_4 = caso.getValue({
        fieldId: 'custevent316'
      }) || 1592235;
      var url_image_4 = 'data:image/jpg;base64,' + file.load({
        id: id_image_4
      }).getContents();
      var id_image_5 = caso.getValue({
        fieldId: 'custevent317'
      }) || 1592235;
      var url_image_5 = 'data:image/jpg;base64,' + file.load({
        id: id_image_5
      }).getContents();
      var id_image_6 = caso.getValue({
        fieldId: 'custevent318'
      }) || 1592235;
      var url_image_6 = 'data:image/jpg;base64,' + file.load({
        id: id_image_6
      }).getContents();
      var id_image_7 = caso.getValue({
        fieldId: 'custevent543'
      }) || 1592235;
      var url_image_7 = 'data:image/jpg;base64,' + file.load({
        id: id_image_7
      }).getContents();
      var id_image_8 = caso.getValue({
        fieldId: 'custevent544'
      }) || 1592235;
      var url_image_8 = 'data:image/jpg;base64,' + file.load({
        id: id_image_8
      }).getContents();
      var image_null = '';

      // log.debug('image', url_image_1 + ' ' + url_image_2 + ' ' + url_image_3 + ' ' + url_image_4 + ' ' + url_image_5 + ' ' + url_image_6 + ' ' + url_image_7 + ' ' + url_image_8);

      var canvasEmpty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAU+UlEQVR4Xu3VAQ0AAAjDMPBvGh0sxcF7ku84AgQIECBA4L3Avk8gAAECBAgQIDAG3RMQIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBAw6H6AAAECBAgEBAx6oEQRCBAgQICAQfcDBAgQIEAgIGDQAyWKQIAAAQIEDLofIECAAAECAQGDHihRBAIECBAgYND9AAECBAgQCAgY9ECJIhAgQIAAAYPuBwgQIECAQEDAoAdKFIEAAQIECBh0P0CAAAECBAICBj1QoggECBAgQMCg+wECBAgQIBAQMOiBEkUgQIAAAQIG3Q8QIECAAIGAgEEPlCgCAQIECBA4YhYB9bb5IxgAAAAASUVORK5CYII=";

      // Imagen Rostro
      if (pintarRostro != null) {
        //var imagenPintarRostro_carga = file.load({ id: pintarRostro });
        //var imagenPintarRostro_link = imagenPintarRostro_carga.getContents();
        imagenRostroExpediente = pintarRostro; // imagenPintarRostro_link;
      } else {
        imagenRostroExpediente = imagenRostro;
      }
      // Imagen Cuerpo
      if (pintarCuerpo != null) {
        //var imagenPintarCuerpo_carga = file.load({ id: pintarCuerpo});
        //var imagenPintarCuerpo_link = imagenPintarCuerpo_carga.getContents();
        imagenCuerpoExpediente = pintarCuerpo; // imagenPintarCuerpo_link;
      } else {
        imagenCuerpoExpediente = imagenCuerpo;
      }
      // Imagen Firma
      if (firmaMedico_base64 != null) {
        firmaPaciente = firmaMedico_base64;
      } else {
        firmaPaciente = canvasEmpty;
      }
      // log.debug('FIRMA Paciente', pintarRostro);

      // ZONA DE ENCABEZADOS
      // FICHA DE IDENTIFICACION
      var encabezados_fichaIdentificacion = '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;margin-left:150px; ">' +
        // '<tr>' +
        // '<td style="font-size: 13px;font-weight:bold;color:#346094;">1. FICHA DE IDENTIFICACIÓN</td>' +
        // '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;">' +
        '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + numeroExpediente + '</td><td><b>GÉNERO: </b> ' + sexoCliente + '</td></tr>' +
        '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
        '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
        '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
        '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE
      //
      //
      var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
        '<pdf>\n' +
        '<body background-image="' + xmlMod.escape({
          xmlText: imageBack
        }) + '" >' +
        '';
      xml += encabezados_fichaIdentificacion;
      xml += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto; margin-top:-50px;" align="center"><b>VALORACIÓN INTEGRAL SKIN, BODY Y QUIRÚRGICOS</b></p>';



      xml += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
        '<tr>' +
        '<td style="font-size: 12px;font-weight:bold;color:#346094;">2. EXPLORACIÓN FÍSICA</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;height:160px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
        '<tr>' +
        '<td valign="top">' + body_exploracion_hallazgos;

      xml += '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 12px;font-weight:bold;color:#346094;">3. DIAGNÓSTICO</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;height:120px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
        '<tr style="background-color: #cadcff">' +
        '<td valign="top">' + body_diagnostico + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 12px;font-weight:bold;color:#346094;">4. TRATAMIENTO</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;height:120px;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
        '<tr>' +
        '<td valign="top">' + body_tratamiento + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '<table style="width:100%;font-size:11px;font-family:Aria,sans-serif;" cellspacing="0">' +
        '<tr><td align="center" style="width:100%;"><img width="100px" height="100px" src="' + firmaPaciente + '" /></td></tr>' +
        '<tr><td align="center" style="width:100%;">' + nombreCliente + '</td></tr>' +
        '<tr><td align="center" style="width:10%;"></td></tr>' +
        '<tr><td align="center"><p style="width:140px;border-top:1px solid #000000;text-align:center;font-weight: bold;">' + 'Firma Paciente' + '</p></td></tr>' +
        '</table>';

      xml += saltoPagina();

      xml += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>VALORACIÓN INTEGRAL SKIN, BODY Y QUIRÚRGICOS</b></p>' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
        '<tr>' +
        '<td style="font-size: 12px;font-weight:bold;color:#346094;">5. ANTROPOMETRÍA Y SOMATOMETRÍA <em>(solo Body)</em></td>' +
        '<td rowspan="5" valign="bottom">' +
        '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td valign="bottom">' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td><img width="340px" height="340px" src="' + xmlMod.escape({
          xmlText: imagenRostroExpediente
        }) + '" /></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="bottom">' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td><img width="340px" height="340px" src="' + xmlMod.escape({
          xmlText: imagenCuerpoExpediente
        }) + '" /></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="80px" style="border-bottom: 1px solid #346094;border-right: 1px solid #346094;"><b>PESO: </b>' + general_peso + '</td>' +
        '<td style="border-bottom: 1px solid #346094;"><b>TALLA: </b>' + general_talla + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom: 1px solid #346094;border-right: 1px solid #346094;"><b>I.M.C.:</b></td>' +
        '<td style="border-bottom: 1px solid #346094;">' + general_imc + ' kg/m2</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom: 1px solid #346094;border-right: 1px solid #346094;"><b>PERÍMETROS</b></td>' +
        '<td style="border-bottom: 1px solid #346094;">' +
        '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;" cellspacing="0">' +
        '<tr>' +
        '<td><b>ABDOMINAL: </b>' + body_per_abdominal + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>CADERA: </b>' + body_per_cadera + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>MUSLO: </b>' + body_per_muslo + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>BRAZO: </b>' + body_per_brazo + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-right: 1px solid #346094;"><b>PLIEGUES CUTÁNEOS</b></td>' +
        '<td>' +
        '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;" cellspacing="0">' +
        '<tr>' +
        '<td><b>BICIPITAL: </b>' + body_plie_bicipital + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>TRICIPITAL: </b>' + body_plie_tricipital + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>SUBESCAPULAR: </b>' + body_plie_subescapular + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>SUPRAILIACO: </b>' + body_plie_suprailiaco + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>ABDOMINAL: </b>' + body_plie_abdominal + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 13px;font-weight:bold;color:#346094;">6. ÁREA A TRATAR Y TRATAMIENTO PROYECTADO</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:6.5px;font-family:Aria,sans-serif;border:2px solid #346094;text-align:center;" cellspacing="0">' +
        '<tr>' +
        '<td align="center" width="80px" style="border-right: 1px solid #346094;"><b>ZONA A TRATAR</b></td>' +
        '<td align="center"><b>TRATAMIENTO PROYECTADO</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">A</td>' +
        '<td>' + body_zonaA + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">A1</td>' +
        '<td>' + body_zonaA1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">A2</td>' +
        '<td>' + body_zonaA2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">A3</td>' +
        '<td>' + body_zonaA3 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">A4</td>' +
        '<td>' + body_zonaA4 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">A5</td>' +
        '<td>' + body_zonaA5 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">A6</td>' +
        '<td>' + body_zonaA6 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">B</td>' +
        '<td>' + body_zonaB + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">C1</td>' +
        '<td>' + body_zonaC1 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">C2</td>' +
        '<td>' + body_zonaC2 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">D</td>' +
        '<td>' + body_zonaD + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">F1</td>' +
        '<td>' + body_zonaF1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">F2</td>' +
        '<td>' + body_zonaF2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">G1</td>' +
        '<td>' + body_zonaG1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">G2</td>' +
        '<td>' + body_zonaG2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">H1</td>' +
        '<td>' + body_zonaH1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">H2</td>' +
        '<td>' + body_zonaH2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">I1</td>' +
        '<td>' + body_zonaI1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">I2</td>' +
        '<td>' + body_zonaI2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">J</td>' +
        '<td>' + body_zonaJ + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">K1</td>' +
        '<td>' + body_zonaK1 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">K2</td>' +
        '<td>' + body_zonaK2 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">L</td>' +
        '<td>' + body_zonaL + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">M</td>' +
        '<td>' + body_zonaM + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">N</td>' +
        '<td>' + body_zonaN + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">P1</td>' +
        '<td>' + body_zonaP1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">P2</td>' +
        '<td>' + body_zonaP2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">P3</td>' +
        '<td>' + body_zonaP3 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">P4</td>' +
        '<td>' + body_zonaP4 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">Q1</td>' +
        '<td>' + body_zonaQ1 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">Q2</td>' +
        '<td>' + body_zonaQ2 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">Q3</td>' +
        '<td>' + body_zonaQ3 + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">Q4</td>' +
        '<td>' + body_zonaQ4 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">R</td>' +
        '<td>' + body_zonaR + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">S</td>' +
        '<td>' + body_zonaS + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">T</td>' +
        '<td>' + body_zonaT + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">U</td>' +
        '<td>' + body_zonaU + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center" style="border-right: 1px solid #346094;">V</td>' +
        '<td>' + body_zonaV + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff;">' +
        '<td align="center" style="border-right: 1px solid #346094;">W</td>' +
        '<td>' + body_zonaW + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      xml += saltoPagina();

      xml += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>IMÁGENES DE VALORACIÓN</b></p>' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;" align="center" cellspacing="0">' +
        '<tr><td align="center">Imagen valoración 1</td><td align="center">Imagen valoración 2</td></tr>' +
        '<tr>' +
        '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape({
          xmlText: url_image_1
        }) + '" /></td>' +
        '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape({
          xmlText: url_image_2
        }) + '" /></td>' +
        '</tr>' +
        '<tr><td align="center">Imagen valoración 3</td><td align="center">Imagen valoración 4</td></tr>' +
        '<tr>' +
        '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape({
          xmlText: url_image_3
        }) + '" /></td>' +
        '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape({
          xmlText: url_image_4
        }) + '" /></td>' +
        '</tr>' +
        '<tr><td align="center">Imagen rostro 1</td><td align="center">Imagen rostro 2</td></tr>' +
        '<tr>' +
        '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape({
          xmlText: url_image_5
        }) + '" /></td>' +
        '<td align="center"><img height="200px" width="200px" src="' + xmlMod.escape({
          xmlText: url_image_6
        }) + '" /></td>' +
        '</tr>' +
        '</table>';

      xml += '</body></pdf>';
      var pdfFile = render.xmlToPdf({
        xmlString: xml
      });

      return pdfFile;

      /**
       * FUNCTION'S ZONE
       */

      /**
       * Function que retorna un string de HTML con estilo para generar un salto de página
       * y además agrega el espacio necesario para inciar la siguiente página en el sitio
       * correcto después del logo de hoja membretada
       */
      function saltoPagina() {
        var saltoPagina = '<div style="page-break-after:always;"></div>';
        // saltoPagina += '<br/><br/><br/>';
        saltoPagina += encabezados_fichaIdentificacion;
        log.debug('saltoPagina 2', saltoPagina);
        return saltoPagina;
      }

      /**
       * Funcion que obtiene la imagen de fondo correspondiente a la sucursal
       * @param {int} sucursal Identificador de la sucursal
       */
      function getImageBackGround(sucursal) {
        var imageBack = '';
        if (sucursal != '22' && sucursal != '35' && sucursal != '36' && sucursal != '23' && sucursal != '24' && sucursal != '25' && sucursal != '37' && sucursal != '21' && sucursal != '26' && sucursal != '27' && sucursal != '28') {
          if (sucursal == "52" || sucursal == "57") {
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          } else {
            imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
          }
        } else {
          if (sucursal == '22') // Altavista KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5';
          if (sucursal == '35') // Can-Cun KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17';
          if (sucursal == '36') // Chihuahua KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa';
          if (sucursal == '23') // Guadalajara KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773';
          if (sucursal == '24') // Monterrey KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2';
          if (sucursal == '25') // Polanco KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7';
          if (sucursal == '37') // Puebla KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2';
          if (sucursal == '21') // Santa FE KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d';
          if (sucursal == '26') // Satelite KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4';
          if (sucursal == '27') // Tijuana KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7';
          if (sucursal == '28') // Veracruz KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20';
        }
        return imageBack;
      }

      // Retorna el nombre de la Sucursal sin el KHG final
      /** Funcion que crea el archivo .txt por defecto y 
       * devuelve el id asociado a la creacion de este archivo
       * 
       * @param {string} folderParent id del Folder principal de cliente
       */
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
       * Funcion para generar una imagen amigable al check y uncheck
       * @param {String} checks Parametro que revisa si el valor es verdadero o falso
       */
      function checado(checks) {
        var check = "";
        if (checks == true) {
          var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathCheck
          }) + '" />';
        }
        if (checks == false) {
          var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathRemove
          }) + '" />';
        }
        if (checks == "SI" || checks == "Si" || checks == "Sí") {
          var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
          var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
          check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathYes
          }) + '" />)';
          check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathNot
          }) + '" />)';
        }
        if (checks == "NO" || checks == "No") {
          var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
          var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
          check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathYes
          }) + '" />)';
          check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathNot
          }) + '" />)';
        }
        if (checks != "") {
          var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathCheck
          }) + '" />';
        }
        if (checks == "") {
          var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathRemove
          }) + '" />';
        }
        return check;
      }
    }

    function generateProcedureQx(companyId, recId) {  

      // VARIABLES GLOBALES TABLAS
      var contadorIndependiente = 0;
      var i = 0;
      var parImpar = '';

      //MAIN VARS
      // Variables para crear los objetos principales
      //var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
      // log.debug('recId: ', recId);
      var caso = record.load({
        type: 'supportcase',
        id: recId
      }); // Variable que guarda el objeto Case
      //var companyId = caso.getValue({ fieldId: 'company' }); // Id de cliente

      // log.debug("caso",caso);
      // log.debug("caso",caso.rectype_723_5260_maxnkey);
      var cliente = record.load({
        type: 'customer',
        id: companyId
      }); // Variable que guarda el objeto Customer
      // log.debug("cliente",cliente);
      //CUSTOMER
      // Variables Informacion General obtenidas del CLIENTE
      var sucursalId = caso.getValue({
        fieldId: 'custevent2'
      }); //Variable que guarda el id de Sucursal del cliente
      var nombreCliente = cliente.getText({
        fieldId: 'altname'
      });
      var numeroExpediente = cliente.getText({
        fieldId: 'entityid'
      });

      var identificacionCliente = cliente.getText({
        fieldId: 'custentity234'
      }) || '';

      // var identificacionCliente = caso.getText({
      //   fieldId: 'custevent1188'
      // }) || '';
      log.debug("identificacionCliente", identificacionCliente);
         var telefonoCliente = cliente.getText({
        fieldId: 'mobilephone'
      }) || '';
      var direccionCliente = cliente.getText({
        fieldId: 'defaultaddress'
      }) || '';

      // VARIABLES DE CASE
      // Variables Mapeo EXPLORACION FISICA
      // Variables Informacion General obtenidads del Case
      var sucursalTextCaso = caso.getText({
        fieldId: 'custevent2'
      }); // Variable que guarda el nombre de la sucursal en String del case
      var fechaCaso = caso.getText({
        fieldId: 'startdate'
      }); // variable que guarda la fecha en la que se realiza el procedimiento
      var horaCaso = caso.getText({
        fieldId: 'starttime'
      }); // variable que gaurda la hora en la que se realiza el procedimiento
      var hc_enfermeroExtraccion = caso.getText({
        fieldId: 'custevent71'
      }) || ""; // variable que guarda el enfermero de extraccion del caso
      var hc_enfermeroImplantacion = caso.getText({
        fieldId: 'custevent72'
      }) || ""; // variable que guarda el enfermero de implantacion del caso
      var medicoResponsableProcedimiento = caso.getText({
        fieldId: 'custevent28'
      }) || ""; // variable que guarda el medico responsable del caso
      var enfermerosResponsableProcedimiento = caso.getText({
        fieldId: 'custevent29'
      }) || ""; // variable que guarda el enfermeto responsable del caso




      var edoCivilCliente = caso.getText({
        fieldId: 'custevent206'
      }) || '';

   


      var fechNacCliente = caso.getValue({
        fieldId: 'custevent331'
      });
      // var nuevaFecha = new SimpleDateFormat(fechNacCliente, Locale.MX);
      // log.debug("nuevaFecha",nuevaFecha);



      fechNacCliente = formatDate(fechNacCliente);

      var edadCliente = calcYearInt(fechNacCliente, fechaCaso);
      var sexoCliente = caso.getText({
        fieldId: 'custevent634'
      }) || '';
      var sexoCliente = caso.getText({
        fieldId: 'custevent634'
      }) || '';
      var enfermeroA = obtenerEnfermeroA(enfermerosResponsableProcedimiento);
      var enfermeroB = obtenerEnfermeroB(enfermerosResponsableProcedimiento);
      var enfermeroResponsableProcedimiento = "";
      var hc_enfermeroExtraccion_equipoMedico = (hc_enfermeroExtraccion != "") ? ' / ' + hc_enfermeroExtraccion : "";
      var hc_enfermeroImplantacion_equipoMedico = (hc_enfermeroImplantacion != "") ? ' / ' + hc_enfermeroImplantacion : "";

      /**
       * ****************** *
       * LOAD PARENT RECORD *
       * ****************** *
       */
      var arr_typeProcess = [];
      var positionArray = 0;
      var firmaCliente = caso.getValue({
        fieldId: 'custevent269'
      }) || null; //Firma Cliente
      var firmaMedico = caso.getValue({
        fieldId: 'custevent485'
      }) || null; //Firma Medico
      var firmaTestigo1 = caso.getValue({
        fieldId: 'custevent548'
      }) || null; //Firma testigo 1
      var firmaTestigo2 = caso.getValue({
        fieldId: 'custevent549'
      }) || null; //Firma testigo 2
      var firmas = '';


      if (firmaCliente != null) {
        try {
          var id_recordParent = caso.getValue({
            fieldId: 'custevent_parentrecid'
          }); // Variable que guarda el id del caso padre
          id_recordParent = parseInt(id_recordParent);
          var obj_parentRecord = record.load({
            type: 'supportcase',
            id: id_recordParent
          });
          typeProcess_values = obj_parentRecord.getValue({
            fieldId: 'custevent1066'
          });
          for (var key = 0; key < typeProcess_values.length; key++) {
            positionArray = parseInt(typeProcess_values[key]);
            typeProcess_value = parseInt(typeProcess_values[key]);
            arr_typeProcess[positionArray] = typeProcess_value;
          }
          // log.debug('Valores parent', 'id padre: ' + id_recordParent + ' tipo Procedimiento ' + typeProcess_value + ' position ' + positionArray + ' largo objeto ' + typeProcess_values.length);
        } catch (error) {
          log.debug('Error load parent supportcase', error);
        }
        firmas = '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
          '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + firmaCliente + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + nombreCliente + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + firmaMedico + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
          '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + firmaTestigo1 + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + firmaTestigo2 + '" width="50" height="50" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
          '</table>';
      }

      //APOYOS
      // Variables obtenias desde funciones locales
      var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
      log.debug(sucursalTextCaso);
      var sucReal = sucursalReal(sucursalTextCaso); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG



      var implantesMamarios_file = file.load({
        id: 5133275
      });
      var implantesMamarios = 'data:image/png;base64,' + implantesMamarios_file.getContents();

      //TAB CIRUGÍA SEGURA
      // Grupo Antes de la Inducción Anestésica
      var cs_identidad = checado(caso.getValue({
        fieldId: 'custevent550'
      }));
      var cs_sitioCorrecto = checado(caso.getValue({
        fieldId: 'custevent551'
      }));
      var cs_procedimientoCorrecto = checado(caso.getValue({
        fieldId: 'custevent552'
      }));
      var cs_cuentaConsentimientoInf = checado(caso.getValue({
        fieldId: 'custevent553'
      }));
      var cs_realizoMarcaje = checado((caso.getValue({
        fieldId: 'custevent556'
      }) == true) ? 'SI' : 'NO');
      var cs_controlAnestesia = checado((caso.getValue({
        fieldId: 'custevent557'
      }) == true) ? 'SI' : 'NO');
      var cs_vigilanciaEstandar = checado((caso.getValue({
        fieldId: 'custevent722'
      }) == true) ? 'SI' : 'NO');
      var cs_riesgoAspiracion = caso.getText({
        fieldId: 'custevent723'
      }) || '';
      var cs_riesgoHemorragia = caso.getText({
        fieldId: 'custevent724'
      }) || '';
      // Grupo Iniciar Procedimiento            
      var cs_confirmarMiembros = checado(caso.getValue({
        fieldId: 'custevent560'
      }));
      var cs_revisaCirujano = checado(caso.getValue({
        fieldId: 'custevent725'
      }));
      var cs_revisaAnestesia = checado(caso.getValue({
        fieldId: 'custevent726'
      }));
      var cs_revisarInstrumental = checado(caso.getValue({
        fieldId: 'custevent727'
      }));
      var cs_profilaxisAntibiótica = checado((caso.getValue({
        fieldId: 'custevent728'
      }) == true) ? 'SI' : 'NO');
      var cs_visualizarImagenes = checado((caso.getValue({
        fieldId: 'custevent729'
      }) == true) ? 'SI' : 'NO');
      // Grupo Después de la cirugía
      var cs_recuentoInstrumental = checado(caso.getValue({
        fieldId: 'custevent565'
      }));
      var cs_nomrbeProcedimiento = checado(caso.getValue({
        fieldId: 'custevent564'
      }));
      var cs_recuperacionTratamiento = checado(caso.getValue({
        fieldId: 'custevent567'
      }));
      var cs_etiquetadoHistopatologicas = checado(caso.getValue({
        fieldId: 'custevent564'
      }));
      var cs_materialTextil = checado(caso.getValue({
        fieldId: 'custevent730'
      }));

      // TAB VALORACIÓN PREANESTÉSICA
      // Grupo Valoración Preanestésico
      var vp_cirugiaElectiva = checado(caso.getValue({
        fieldId: 'custevent731'
      }));
      var vp_cirugiaElectiva_label = caso.getField({
        fieldId: 'custevent731'
      }).label;
      var vp_cirugiaUrgente = checado(caso.getValue({
        fieldId: 'custevent732'
      }));
      var vp_cirugiaUrgente_label = caso.getField({
        fieldId: 'custevent732'
      }).label;
      var vp_cirugiaMayor = checado(caso.getValue({
        fieldId: 'custevent733'
      }));
      var vp_cirugiaMayor_label = caso.getField({
        fieldId: 'custevent733'
      }).label;
      var vp_cirugiaMenor = checado(caso.getValue({
        fieldId: 'custevent734'
      }));
      var vp_cirugiaMenor_label = caso.getField({
        fieldId: 'custevent734'
      }).label;
      var vp_glucosa = caso.getText({
        fieldId: 'custevent735'
      }) || '';
      var vp_glucosa_label = caso.getField({
        fieldId: 'custevent735'
      }).label;
      var vp_urea = caso.getText({
        fieldId: 'custevent736'
      }) || '';
      var vp_urea_label = caso.getField({
        fieldId: 'custevent736'
      }).label;
      var vp_creatinina = caso.getText({
        fieldId: 'custevent737'
      }) || '';
      var vp_creatinina_label = caso.getField({
        fieldId: 'custevent737'
      }).label;
      var vp_ekg = caso.getText({
        fieldId: 'custevent738'
      }) || '';
      var vp_ekg_label = caso.getField({
        fieldId: 'custevent738'
      }).label;
      var vp_rxTorax = caso.getText({
        fieldId: 'custevent739'
      }) || '';
      var vp_rxTorax_label = caso.getField({
        fieldId: 'custevent739'
      }).label;
      var vp_asa = caso.getText({
        fieldId: 'custevent740'
      }) || '';
      var vp_asa_label = caso.getField({
        fieldId: 'custevent740'
      }).label;
      var vp_hb = caso.getText({
        fieldId: 'custevent741'
      }) || '';
      var vp_hb_label = caso.getField({
        fieldId: 'custevent741'
      }).label;
      var vp_hto = caso.getText({
        fieldId: 'custevent742'
      }) || '';
      var vp_hto_label = caso.getField({
        fieldId: 'custevent742'
      }).label;
      var vp_grupoS = caso.getText({
        fieldId: 'custevent743'
      }) || '';
      var vp_grupoS_label = caso.getField({
        fieldId: 'custevent743'
      }).label;
      var vp_rh = caso.getText({
        fieldId: 'custevent744'
      }) || '';
      var vp_rh_label = caso.getField({
        fieldId: 'custevent744'
      }).label;
      var vp_pa = caso.getText({
        fieldId: 'custevent745'
      }) || '';
      var vp_pa_label = caso.getField({
        fieldId: 'custevent745'
      }).label;
      var vp_fc = caso.getText({
        fieldId: 'custevent746'
      }) || '';
      var vp_fc_label = caso.getField({
        fieldId: 'custevent746'
      }).label;
      var vp_ef = caso.getText({
        fieldId: 'custevent747'
      }) || '';
      var vp_ef_label = caso.getField({
        fieldId: 'custevent747'
      }).label;
      var vp_craneo = caso.getText({
        fieldId: 'custevent748'
      }) || '';
      var vp_craneo_label = caso.getField({
        fieldId: 'custevent748'
      }).label;
      var vp_ojosOidosNarizGarganta = caso.getText({
        fieldId: 'custevent749'
      }) || '';
      var vp_ojosOidosNarizGarganta_label = caso.getField({
        fieldId: 'custevent749'
      }).label;
      var vp_patologiasActuales = caso.getText({
        fieldId: 'custevent750'
      }) || '';
      var vp_patologiasActuales_label = caso.getField({
        fieldId: 'custevent750'
      }).label;
      var vp_sRespiratoria = caso.getText({
        fieldId: 'custevent751'
      }) || '';
      var vp_sRespiratoria_label = caso.getField({
        fieldId: 'custevent751'
      }).label;
      var vp_sCardiovascular = caso.getText({
        fieldId: 'custevent752'
      }) || '';
      var vp_sCardiovascular_label = caso.getField({
        fieldId: 'custevent752'
      }).label;
      var vp_sGastrointestinal = caso.getText({
        fieldId: 'custevent753'
      }) || '';
      var vp_sGastrointestinal_label = caso.getField({
        fieldId: 'custevent753'
      }).label;
      var vp_sGenitourinatio = caso.getText({
        fieldId: 'custevent754'
      }) || '';
      var vp_sGenitourinatio_label = caso.getField({
        fieldId: 'custevent754'
      }).label;
      var vp_sNervioso = caso.getText({
        fieldId: 'custevent755'
      }) || '';
      var vp_sNervioso_label = caso.getField({
        fieldId: 'custevent755'
      }).label;
      var vp_sEndocrino = caso.getText({
        fieldId: 'custevent756'
      }) || '';
      var vp_sEndocrino_label = caso.getField({
        fieldId: 'custevent756'
      }).label;
      var vp_sMuscular = caso.getText({
        fieldId: 'custevent757'
      }) || '';
      var vp_sMuscular_label = caso.getField({
        fieldId: 'custevent757'
      }).label;
      var vp_alergiasTrans = caso.getText({
        fieldId: 'custevent758'
      }) || '';
      var vp_alergiasTrans_label = caso.getField({
        fieldId: 'custevent758'
      }).label;
      var vp_operacionesPrevias = caso.getText({
        fieldId: 'custevent759'
      }) || '';
      var vp_operacionesPrevias_label = caso.getField({
        fieldId: 'custevent759'
      }).label;
      var vp_antecedentesAnestesicos = caso.getText({
        fieldId: 'custevent760'
      }) || '';
      var vp_antecedentesAnestesicos_label = caso.getField({
        fieldId: 'custevent760'
      }).label;
      var vp_complicaciones = caso.getText({
        fieldId: 'custevent761'
      }) || '';
      var vp_complicaciones_label = caso.getField({
        fieldId: 'custevent761'
      }).label;
      var vp_tecAnestPropuesta = caso.getText({
        fieldId: 'custevent762'
      }) || '';
      var vp_tecAnestPropuesta_label = caso.getField({
        fieldId: 'custevent762'
      }).label;
      // Grupo Anestesia
      var vp_puncionVenosaSitio = caso.getText({
        fieldId: 'custevent763'
      }) || '';
      var vp_puncionVenosaSitio_label = caso.getField({
        fieldId: 'custevent763'
      }).label;
      var vp_puncionVenosaCalibre = caso.getText({
        fieldId: 'custevent764'
      }) || '';
      var vp_puncionVenosaCalibre_label = caso.getField({
        fieldId: 'custevent764'
      }).label;
      var vp_posicionPaciente = caso.getText({
        fieldId: 'custevent765'
      }) || '';
      var vp_posicionPaciente_label = caso.getField({
        fieldId: 'custevent765'
      }).label;
      var vp_posBrazosAbduccion = caso.getText({
        fieldId: 'custevent766'
      }) || '';
      var vp_posBrazosAbduccion_label = caso.getField({
        fieldId: 'custevent766'
      }).label;
      var vp_posBrazosAduccion = caso.getText({
        fieldId: 'custevent767'
      }) || '';
      var vp_posBrazosAduccion_label = caso.getField({
        fieldId: 'custevent767'
      }).label;
      var vp_torniqueteSitio = caso.getText({
        fieldId: 'custevent768'
      }) || '';
      var vp_torniqueteSitio_label = caso.getField({
        fieldId: 'custevent768'
      }).label;
      var vp_torniqueteInicia = caso.getText({
        fieldId: 'custevent769'
      }) || '';
      var vp_torniqueteInicia_label = caso.getField({
        fieldId: 'custevent769'
      }).label;
      var vp_torniqueteTermina = caso.getText({
        fieldId: 'custevent770'
      }) || '';
      var vp_torniqueteTermina_label = caso.getField({
        fieldId: 'custevent770'
      }).label;
      var vp_intubacionDificultades = checado(caso.getText({
        fieldId: 'custevent771'
      }) || '');
      var vp_intubacionDificultades_label = caso.getField({
        fieldId: 'custevent771'
      }).label;
      var vp_induccionDificultados = checado(caso.getText({
        fieldId: 'custevent772'
      }) || '');
      var vp_induccionDificultados_label = caso.getField({
        fieldId: 'custevent772'
      }).label;
      var vp_oralNasalCalibre = caso.getText({
        fieldId: 'custevent773'
      }) || '';
      var vp_oralNasalCalibre_label = caso.getField({
        fieldId: 'custevent773'
      }).label;
      var vp_oralNasalGlobo = checado(caso.getText({
        fieldId: 'custevent774'
      }) || '');
      var vp_oralNasalGlobo_label = caso.getField({
        fieldId: 'custevent774'
      }).label;
      var vp_presionNormalBaja = checado(caso.getText({
        fieldId: 'custevent775'
      }) || '');
      var vp_presionNormalBaja_label = caso.getField({
        fieldId: 'custevent775'
      }).label;
      var vp_bloqueoPlexo = caso.getText({
        fieldId: 'custevent776'
      }) || '';
      var vp_bloqueoPlexo_label = caso.getField({
        fieldId: 'custevent776'
      }).label;
      var vp_codicionPacienteCerrar = caso.getText({
        fieldId: 'custevent777'
      }) || '';
      var vp_codicionPacienteCerrar_label = caso.getField({
        fieldId: 'custevent777'
      }).label;
      var vp_sitiosPresion = caso.getText({
        fieldId: 'custevent778'
      }) || '';
      var vp_sitiosPresion_label = caso.getField({
        fieldId: 'custevent778'
      }).label;
      var vp_otrosDatos = caso.getText({
        fieldId: 'custevent779'
      }) || '';
      var vp_otrosDatos_label = caso.getField({
        fieldId: 'custevent779'
      }).label;
      var vp_puncionEpiduralDificultades = checado(caso.getValue({
        fieldId: 'custevent780'
      }) || 'NO');
      var vp_puncionEpiduralDificultades_label = caso.getField({
        fieldId: 'custevent780'
      }).label;
      var vp_pucnionEpiduralCalibre = caso.getText({
        fieldId: 'custevent781'
      }) || '';
      var vp_pucnionEpiduralCalibre_label = caso.getField({
        fieldId: 'custevent781'
      }).label;
      var vp_puncionEpiduralIntervertebral = caso.getText({
        fieldId: 'custevent782'
      }) || '';
      var vp_puncionEpiduralIntervertebral_label = caso.getField({
        fieldId: 'custevent782'
      }).label;
      var vp_puncionEpidrualAgente = caso.getText({
        fieldId: 'custevent783'
      }) || '';
      var vp_puncionEpidrualAgente_label = caso.getField({
        fieldId: 'custevent783'
      }).label;
      var vp_puncionEpiduralNivel = caso.getText({
        fieldId: 'custevent784'
      }) || '';
      var vp_puncionEpiduralNivel_label = caso.getField({
        fieldId: 'custevent784'
      }).label;
      var vp_ojosProteccion = checado(caso.getText({
        fieldId: 'custevent792'
      }) || '');
      var vp_ojosProteccion_label = caso.getField({
        fieldId: 'custevent792'
      }).label;
      var vp_porAnestesiologo = caso.getText({
        fieldId: 'custevent793'
      }) || '';
      var vp_porAnestesiologo_label = caso.getField({
        fieldId: 'custevent793'
      }).label;
      // Grupo Recuperación
      var vp_valoracionAldrete15 = caso.getText({
        fieldId: 'custevent785'
      }) || '';
      var vp_valoracionAldrete15_label = caso.getField({
        fieldId: 'custevent785'
      }).label;
      var vp_valoracionAldrete45 = caso.getText({
        fieldId: 'custevent786'
      }) || '';
      var vp_valoracionAldrete45_label = caso.getField({
        fieldId: 'custevent786'
      }).label;
      var vp_valoracionAldrete90 = caso.getText({
        fieldId: 'custevent787'
      }) || '';
      var vp_valoracionAldrete90_label = caso.getField({
        fieldId: 'custevent787'
      }).label;
      var vp_pasoDeRecuperacionA = caso.getText({
        fieldId: 'custevent788'
      }) || '';
      var vp_pasoDeRecuperacionA_label = caso.getField({
        fieldId: 'custevent788'
      }).label;
      var vp_pasoDeRecuperacionAEspecifique = caso.getText({
        fieldId: 'custevent789'
      }) || '';
      var vp_pasoDeRecuperacionAEspecifique_label = caso.getField({
        fieldId: 'custevent789'
      }).label;
      var vp_pasoDeRecuperacionAHora = caso.getText({
        fieldId: 'custevent790'
      }) || '';
      var vp_pasoDeRecuperacionAHora_label = caso.getField({
        fieldId: 'custevent790'
      }).label;
      var vp_recuperacionResponsable = caso.getText({
        fieldId: 'custevent791'
      }) || '';
      var vp_recuperacionResponsable_label = caso.getField({
        fieldId: 'custevent791'
      }).label;
      var vp_recuperacionResponsable_cedula = obtenerCedula(vp_recuperacionResponsable, 'c');

      // Grupo Transanestesico
      var vp_diagnosticoTransanestesico = caso.getText({
        fieldId: 'custevent796'
      }) || '';
      var vp_diagnosticoTransanestesico_label = caso.getField({
        fieldId: 'custevent796'
      }).label;
      var vp_operacionTransanestesico = caso.getText({
        fieldId: 'custevent797'
      }) || '';
      var vp_operacionTransanestesico_label = caso.getField({
        fieldId: 'custevent797'
      }).label;
      var vp_cirujanoTransanestesico = caso.getText({
        fieldId: 'custevent798'
      }) || '';
      var vp_cirujanoTransanestesico_label = caso.getField({
        fieldId: 'custevent798'
      }).label;
      var vp_cirujanoTransanestesico_cedula = obtenerCedula(vp_cirujanoTransanestesico, 'c');
      var vp_anestesiologoTransanestesico = caso.getText({
        fieldId: 'custevent799'
      }) || '';
      var vp_anestesiologoTransanestesico_label = caso.getField({
        fieldId: 'custevent799'
      }).label;
      var vp_anestesiologoTransanestesico_cedula = obtenerCedula(vp_anestesiologoTransanestesico, 'c');
      // Grupo Tiempos Parametros Signos
      var table_ParametrosSignos_ValoracionPreanestesica = null;
      var conteo_ParametrosSignosValoracionPreanestesica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord382'
      });
      ////log.debug('Tipo de Objeto Parametros y Signos', conteo_ParametrosSignosValoracionPreanestesica_lines);           
      if (conteo_ParametrosSignosValoracionPreanestesica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_ParametrosSignosValoracionPreanestesica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_ParametrosSignos_ParametrosSignos = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord357',
            line: i
          }) || '';
          var table_ParametrosSignos_8hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord358',
            line: i
          }) || '';
          var table_ParametrosSignos_9hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord359',
            line: i
          }) || '';
          var table_ParametrosSignos_10hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord360',
            line: i
          }) || '';
          var table_ParametrosSignos_11hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord361',
            line: i
          }) || '';
          var table_ParametrosSignos_12hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord362',
            line: i
          }) || '';
          var table_ParametrosSignos_13hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord363',
            line: i
          }) || '';
          var table_ParametrosSignos_14hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord364',
            line: i
          }) || '';
          var table_ParametrosSignos_15hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord365',
            line: i
          }) || '';
          var table_ParametrosSignos_16hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord366',
            line: i
          }) || '';
          var table_ParametrosSignos_17hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord367',
            line: i
          }) || '';
          var table_ParametrosSignos_18hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord368',
            line: i
          }) || '';
          var table_ParametrosSignos_19hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord369',
            line: i
          }) || '';
          var table_ParametrosSignos_20hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord370',
            line: i
          }) || '';
          var table_ParametrosSignos_21hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord371',
            line: i
          }) || '';
          var table_ParametrosSignos_22hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord372',
            line: i
          }) || '';
          var table_ParametrosSignos_23hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord373',
            line: i
          }) || '';
          var table_ParametrosSignos_24hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord374',
            line: i
          }) || '';
          var table_ParametrosSignos_1hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord375',
            line: i
          }) || '';
          var table_ParametrosSignos_2hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord376',
            line: i
          }) || '';
          var table_ParametrosSignos_3hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord377',
            line: i
          }) || '';
          var table_ParametrosSignos_4hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord378',
            line: i
          }) || '';
          var table_ParametrosSignos_5hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord379',
            line: i
          }) || '';
          var table_ParametrosSignos_6hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord380',
            line: i
          }) || '';
          var table_ParametrosSignos_7hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord382',
            fieldId: 'custrecord381',
            line: i
          }) || '';

          if (table_ParametrosSignos_ParametrosSignos != '' || table_ParametrosSignos_8hrs != '' || table_ParametrosSignos_9hrs != '' ||
            table_ParametrosSignos_10hrs != '' || table_ParametrosSignos_11hrs != '' || table_ParametrosSignos_12hrs != '' ||
            table_ParametrosSignos_13hrs != '' || table_ParametrosSignos_14hrs != '' || table_ParametrosSignos_15hrs != '' ||
            table_ParametrosSignos_16hrs != '' || table_ParametrosSignos_17hrs != '' || table_ParametrosSignos_18hrs != '' ||
            table_ParametrosSignos_19hrs != '' || table_ParametrosSignos_20hrs != '' || table_ParametrosSignos_21hrs != '' ||
            table_ParametrosSignos_22hrs != '' || table_ParametrosSignos_23hrs != '' || table_ParametrosSignos_24hrs != '' ||
            table_ParametrosSignos_1hrs != '' || table_ParametrosSignos_2hrs != '' || table_ParametrosSignos_3hrs != '' ||
            table_ParametrosSignos_4hrs != '' || table_ParametrosSignos_5hrs != '' || table_ParametrosSignos_6hrs != '' ||
            table_ParametrosSignos_7hrs != '') {

            table_ParametrosSignos_ValoracionPreanestesica += '<tr ' + parImpar + '>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_ParametrosSignos + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_8hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_9hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_10hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_11hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_12hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_13hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_14hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_15hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_16hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_17hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_18hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_19hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_20hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_21hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_22hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_23hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_24hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_1hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_2hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_3hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_4hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_5hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_6hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '<td align="center" style="border-left: 1px solid #346094;">' + table_ParametrosSignos_7hrs + '</td>';
            table_ParametrosSignos_ValoracionPreanestesica += '</tr>';
          }
          contadorIndependiente++;
        }
      }
      // Grupo Simbolos-Agentes anestésicos, farmacos, soluciones
      var table_SimbolosAgentes_ValoracionPreanestesica = null;
      var conteo_SimbolosAgentesValoracionPreanestesica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord408'
      });
      ////log.debug('Tipo de Objeto Simbolos, Agentes', conteo_SimbolosAgentesValoracionPreanestesica_lines);
      if (conteo_SimbolosAgentesValoracionPreanestesica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_SimbolosAgentesValoracionPreanestesica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          // log.debug('valor style', contadorIndependiente + parImpar);
          var table_SimbolosAgentes_FarmacoSolucion = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord383',
            line: i
          }) || '';
          var table_SimbolosAgentes_8hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord384',
            line: i
          }) || '';
          var table_SimbolosAgentes_9hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord385',
            line: i
          }) || '';
          var table_SimbolosAgentes_10hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord386',
            line: i
          }) || '';
          var table_SimbolosAgentes_11hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord387',
            line: i
          }) || '';
          var table_SimbolosAgentes_12hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord388',
            line: i
          }) || '';
          var table_SimbolosAgentes_13hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord389',
            line: i
          }) || '';
          var table_SimbolosAgentes_14hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord390',
            line: i
          }) || '';
          var table_SimbolosAgentes_15hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord391',
            line: i
          }) || '';
          var table_SimbolosAgentes_16hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord392',
            line: i
          }) || '';
          var table_SimbolosAgentes_17hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord393',
            line: i
          }) || '';
          var table_SimbolosAgentes_18hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord394',
            line: i
          }) || '';
          var table_SimbolosAgentes_19hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord395',
            line: i
          }) || '';
          var table_SimbolosAgentes_20hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord396',
            line: i
          }) || '';
          var table_SimbolosAgentes_21hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord397',
            line: i
          }) || '';
          var table_SimbolosAgentes_22hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord398',
            line: i
          }) || '';
          var table_SimbolosAgentes_23hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord399',
            line: i
          }) || '';
          var table_SimbolosAgentes_24hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord400',
            line: i
          }) || '';
          var table_SimbolosAgentes_1hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord401',
            line: i
          }) || '';
          var table_SimbolosAgentes_2hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord402',
            line: i
          }) || '';
          var table_SimbolosAgentes_3hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord403',
            line: i
          }) || '';
          var table_SimbolosAgentes_4hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord404',
            line: i
          }) || '';
          var table_SimbolosAgentes_5hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord405',
            line: i
          }) || '';
          var table_SimbolosAgentes_6hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord406',
            line: i
          }) || '';
          var table_SimbolosAgentes_7hrs = caso.getSublistText({
            sublistId: 'recmachcustrecord408',
            fieldId: 'custrecord407',
            line: i
          }) || '';

          if (table_SimbolosAgentes_FarmacoSolucion != '' || table_SimbolosAgentes_8hrs != '' || table_SimbolosAgentes_9hrs != '' ||
            table_SimbolosAgentes_10hrs != '' || table_SimbolosAgentes_11hrs != '' || table_SimbolosAgentes_12hrs != '' ||
            table_SimbolosAgentes_13hrs != '' || table_SimbolosAgentes_14hrs != '' || table_SimbolosAgentes_15hrs != '' ||
            table_SimbolosAgentes_16hrs != '' || table_SimbolosAgentes_17hrs != '' || table_SimbolosAgentes_18hrs != '' ||
            table_SimbolosAgentes_19hrs != '' || table_SimbolosAgentes_20hrs != '' || table_SimbolosAgentes_21hrs != '' ||
            table_SimbolosAgentes_22hrs != '' || table_SimbolosAgentes_23hrs != '' || table_SimbolosAgentes_24hrs != '' ||
            table_SimbolosAgentes_1hrs != '' || table_SimbolosAgentes_2hrs != '' || table_SimbolosAgentes_3hrs != '' ||
            table_SimbolosAgentes_4hrs != '' || table_SimbolosAgentes_5hrs != '' || table_SimbolosAgentes_6hrs != '' ||
            table_SimbolosAgentes_7hrs != '') {

            table_SimbolosAgentes_ValoracionPreanestesica += '<tr ' + parImpar + '>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_FarmacoSolucion + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_8hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_9hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_10hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_11hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_12hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_13hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_14hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_15hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_16hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_17hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_18hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_19hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_20hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_21hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_22hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_23hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_24hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_1hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_2hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_3hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_4hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_5hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_6hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '<td align="left" style="border-left: 1px solid #346094;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + table_SimbolosAgentes_7hrs + '</td>';
            table_SimbolosAgentes_ValoracionPreanestesica += '</tr>';
          }
          contadorIndependiente++;
        }
      }

      // TAB CONTROL DE LÍQUIDOS
      // Grupo Dieta
      var table_Dieta_ControlLiquidos = null;
      var conteo_DietaControlLiquidos_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord182'
      });
      ////log.debug('Tipo Objeto Control Liquidos Dieta', conteo_DietaControlLiquidos_lines);
      if (conteo_DietaControlLiquidos_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_DietaControlLiquidos_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Dieta_Matutino = caso.getSublistText({
            sublistId: 'recmachcustrecord182',
            fieldId: 'custrecord183',
            line: i
          }) || '';
          var table_Dieta_Vespertino = caso.getSublistText({
            sublistId: 'recmachcustrecord182',
            fieldId: 'custrecord180',
            line: i
          }) || '';
          var table_Dieta_Nocturno = caso.getSublistText({
            sublistId: 'recmachcustrecord182',
            fieldId: 'custrecord181',
            line: i
          }) || '';

          if (table_Dieta_Matutino != '' || table_Dieta_Vespertino != '' || table_Dieta_Nocturno != '') {
            table_Dieta_ControlLiquidos += '<tr ' + parImpar + '>';
            table_Dieta_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Dieta_Matutino + '</td>';
            table_Dieta_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Dieta_Vespertino + '</td>';
            table_Dieta_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Dieta_Nocturno + '</td>';
            table_Dieta_ControlLiquidos += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Ingresos
      var table_Ingresos_ControlLiquidos = null;
      var conteo_IngresosControlLiquidos_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord185'
      });
      var total_IngresosControlLiquidos_totalesGlobales = 0;
      var table_Ingresos_total1_subtotal = 0;
      var table_Ingresos_total2_subtotal = 0;
      var table_Ingresos_total3_subtotal = 0;
      //log.debug('Conteo Ingresos Control Liquidos', conteo_IngresosControlLiquidos_lines);
      if (conteo_IngresosControlLiquidos_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_IngresosControlLiquidos_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Ingresos_solucion = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord184',
            line: i
          }) || 0;
          var table_Ingresos_8 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord186',
            line: i
          }) || 0;
          var table_Ingresos_9 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord187',
            line: i
          }) || 0;
          var table_Ingresos_10 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord188',
            line: i
          }) || 0;
          var table_Ingresos_11 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord189',
            line: i
          }) || 0;
          var table_Ingresos_12 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord190',
            line: i
          }) || 0;
          var table_Ingresos_13 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord191',
            line: i
          }) || 0;
          var table_Ingresos_14 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord192',
            line: i
          }) || 0;
          var table_Ingresos_15 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord193',
            line: i
          }) || 0;
          //var table_Ingresos_total1 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord194', line: i }) || 0;
          var table_Ingresos_total1 = table_Ingresos_8 + table_Ingresos_9 + table_Ingresos_10 + table_Ingresos_11 + table_Ingresos_12 + table_Ingresos_13 + table_Ingresos_14 + table_Ingresos_15;
          table_Ingresos_total1_subtotal += table_Ingresos_total1;
          var table_Ingresos_16 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord195',
            line: i
          }) || 0;
          var table_Ingresos_17 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord196',
            line: i
          }) || 0;
          var table_Ingresos_18 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord197',
            line: i
          }) || 0;
          var table_Ingresos_19 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord198',
            line: i
          }) || 0;
          var table_Ingresos_20 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord199',
            line: i
          }) || 0;
          var table_Ingresos_21 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord200',
            line: i
          }) || 0;
          var table_Ingresos_22 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord201',
            line: i
          }) || 0;
          var table_Ingresos_23 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord202',
            line: i
          }) || 0;
          //var table_Ingresos_total2 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord203', line: i }) || 0;
          var table_Ingresos_total2 = table_Ingresos_16 + table_Ingresos_17 + table_Ingresos_18 + table_Ingresos_19 + table_Ingresos_20 + table_Ingresos_21 + table_Ingresos_22 + table_Ingresos_23;
          table_Ingresos_total2_subtotal += table_Ingresos_total2;
          var table_Ingresos_24 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord204',
            line: i
          }) || 0;
          var table_Ingresos_1 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord205',
            line: i
          }) || 0;
          var table_Ingresos_2 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord206',
            line: i
          }) || 0;
          var table_Ingresos_3 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord207',
            line: i
          }) || 0;
          var table_Ingresos_4 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord208',
            line: i
          }) || 0;
          var table_Ingresos_5 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord209',
            line: i
          }) || 0;
          var table_Ingresos_6 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord210',
            line: i
          }) || 0;
          var table_Ingresos_7 = caso.getSublistValue({
            sublistId: 'recmachcustrecord185',
            fieldId: 'custrecord211',
            line: i
          }) || 0;
          //var table_Ingresos_total3 = caso.getSublistValue({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord212', line: i }) || null;
          var table_Ingresos_total3 = table_Ingresos_24 + table_Ingresos_1 + table_Ingresos_3 + table_Ingresos_2 + table_Ingresos_4 + table_Ingresos_5 + table_Ingresos_6 + table_Ingresos_7;
          table_Ingresos_total3_subtotal += table_Ingresos_total3;
          total_IngresosControlLiquidos_totalesGlobales += parseFloat(table_Ingresos_total1) + parseFloat(table_Ingresos_total2) + parseFloat(table_Ingresos_total3);

          table_Ingresos_ControlLiquidos += '<tr ' + parImpar + '>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_solucion + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_8.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_9.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_10.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_11.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_12.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_13.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_14.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_15.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_total1.toFixed(2) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_16.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_17.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_18.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_19.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_20.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_21.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_22.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_23.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_total2.toFixed(2) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_24.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_1.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_2.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_3.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_4.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_5.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_6.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_7.toFixed(1) + '</td>';
          table_Ingresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ingresos_total3.toFixed(2) + '</td>';
          table_Ingresos_ControlLiquidos += '</tr>';
          contadorIndependiente++;
        }
      }
      // Grupo Egresos
      var table_Egresos_ControlLiquidos = null;
      var conteo_EgresosControlLiquidos_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord214'
      });
      var total_EgresosControlLiquidos_totalesGlobales = 0;
      var table_Egresos_total1_subtotal = 0;
      var table_Egresos_total2_subtotal = 0;
      var table_Egresos_total3_subtotal = 0;
      //log.debug('Conteo Egresos Control Liquidos', conteo_EgresosControlLiquidos_lines);
      if (conteo_EgresosControlLiquidos_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_EgresosControlLiquidos_lines; i++) {
          parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Egresos_hora = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord213',
            line: i
          }) || 0;
          var table_Egresos_8 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord215',
            line: i
          }) || 0;
          var table_Egresos_9 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord216',
            line: i
          }) || 0;
          var table_Egresos_10 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord217',
            line: i
          }) || 0;
          var table_Egresos_11 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord218',
            line: i
          }) || 0;
          var table_Egresos_12 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord219',
            line: i
          }) || 0;
          var table_Egresos_13 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord220',
            line: i
          }) || 0;
          var table_Egresos_14 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord221',
            line: i
          }) || 0;
          var table_Egresos_15 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord222',
            line: i
          }) || 0;
          //var table_Egresos_total1 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord194', line: i }) || 0;
          var table_Egresos_total1 = table_Egresos_8 + table_Egresos_9 + table_Egresos_10 + table_Egresos_11 + table_Egresos_12 + table_Egresos_13 + table_Egresos_14 + table_Egresos_15;
          table_Egresos_total1_subtotal += table_Egresos_total1;
          var table_Egresos_16 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord224',
            line: i
          }) || 0;
          var table_Egresos_17 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord225',
            line: i
          }) || 0;
          var table_Egresos_18 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord226',
            line: i
          }) || 0;
          var table_Egresos_19 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord227',
            line: i
          }) || 0;
          var table_Egresos_20 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord228',
            line: i
          }) || 0;
          var table_Egresos_21 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord229',
            line: i
          }) || 0;
          var table_Egresos_22 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord230',
            line: i
          }) || 0;
          var table_Egresos_23 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord231',
            line: i
          }) || 0;
          //var table_Egresos_total2 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord203', line: i }) || 0;
          var table_Egresos_total2 = table_Egresos_16 + table_Egresos_17 + table_Egresos_18 + table_Egresos_19 + table_Egresos_20 + table_Egresos_21 + table_Egresos_22 + table_Egresos_23;
          table_Egresos_total2_subtotal += table_Egresos_total2;
          var table_Egresos_24 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord236',
            line: i
          }) || 0;
          var table_Egresos_1 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord233',
            line: i
          }) || 0;
          var table_Egresos_2 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord234',
            line: i
          }) || 0;
          var table_Egresos_3 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord235',
            line: i
          }) || 0;
          var table_Egresos_4 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord237',
            line: i
          }) || 0;
          var table_Egresos_5 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord238',
            line: i
          }) || 0;
          var table_Egresos_6 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord239',
            line: i
          }) || 0;
          var table_Egresos_7 = caso.getSublistValue({
            sublistId: 'recmachcustrecord214',
            fieldId: 'custrecord240',
            line: i
          }) || 0;
          //var table_Egresos_total3 = caso.getSublistValue({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord212', line: i }) || null;
          var table_Egresos_total3 = table_Egresos_24 + table_Egresos_1 + table_Egresos_2 + table_Egresos_3 + table_Egresos_4 + table_Egresos_5 + table_Egresos_6 + table_Egresos_7;
          table_Egresos_total3_subtotal += table_Egresos_total3;
          total_EgresosControlLiquidos_totalesGlobales += parseFloat(table_Egresos_total1) + parseFloat(table_Egresos_total2) + parseFloat(table_Egresos_total3);

          table_Egresos_ControlLiquidos += '<tr ' + parImpar + '>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_hora + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_8.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_9.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_10.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_11.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_12.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_13.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_14.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_15.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_total1.toFixed(2) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_16.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_17.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_18.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_19.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_20.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_21.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_22.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_23.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_total2.toFixed(2) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_24.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_1.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_2.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_3.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_4.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_5.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_6.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_7.toFixed(1) + '</td>';
          table_Egresos_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Egresos_total3.toFixed(2) + '</td>';
          table_Egresos_ControlLiquidos += '</tr>';
          contadorIndependiente++;
        }
      }
      // Grupo Observaciones, datos relevantes a reportar
      var table_Observaciones_ControlLiquidos = null;
      var conteo_ObservacionesControlLiquidos_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord245'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_ObservacionesControlLiquidos_lines);
      if (conteo_ObservacionesControlLiquidos_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_ObservacionesControlLiquidos_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Observaciones_Matutino = caso.getSublistText({
            sublistId: 'recmachcustrecord245',
            fieldId: 'custrecord242',
            line: i
          }) || '';
          var table_Observaciones_Vespertino = caso.getSublistText({
            sublistId: 'recmachcustrecord245',
            fieldId: 'custrecord243',
            line: i
          }) || '';
          var table_Observaciones_Nocturno = caso.getSublistText({
            sublistId: 'recmachcustrecord245',
            fieldId: 'custrecord244',
            line: i
          }) || '';
          if (table_Observaciones_Matutino != '' || table_Observaciones_Vespertino != '' || table_Observaciones_Nocturno != '') {
            table_Observaciones_ControlLiquidos += '<tr ' + parImpar + '>';
            table_Observaciones_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Observaciones_Matutino + '</td>';
            table_Observaciones_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Observaciones_Vespertino + '</td>';
            table_Observaciones_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Observaciones_Nocturno + '</td>';
            table_Observaciones_ControlLiquidos += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Responsables
      var table_Responsables_ControlLiquidos = null;
      var conteo_ResponsablesControlLiquidos_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord250'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_ResponsablesControlLiquidos_lines);
      if (conteo_ResponsablesControlLiquidos_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_ResponsablesControlLiquidos_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Responsables_Responsable = caso.getSublistText({
            sublistId: 'recmachcustrecord250',
            fieldId: 'custrecord246',
            line: i
          }) || '';
          var table_Responsables_Matutino = caso.getSublistText({
            sublistId: 'recmachcustrecord250',
            fieldId: 'custrecord247',
            line: i
          }) || '';
          var table_Responsables_Vespertino = caso.getSublistText({
            sublistId: 'recmachcustrecord250',
            fieldId: 'custrecord248',
            line: i
          }) || '';
          var table_Responsables_Nocturno = caso.getSublistText({
            sublistId: 'recmachcustrecord250',
            fieldId: 'custrecord249',
            line: i
          }) || '';
          if (table_Responsables_Responsable != '' && (table_Responsables_Matutino != '' || table_Responsables_Vespertino != '' || table_Responsables_Nocturno != '')) {
            table_Responsables_ControlLiquidos += '<tr ' + parImpar + '>';
            table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Responsable + '</td>';
            table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Matutino + '</td>';
            table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Vespertino + '</td>';
            table_Responsables_ControlLiquidos += '<td align="center" style="border-left: 1px solid #346094;">' + table_Responsables_Nocturno + '</td>';
            table_Responsables_ControlLiquidos += '</tr>';
            contadorIndependiente++;
          }
        }
      }

      // TAB HOJA DE ENFERMERÍA QUIRÚRGICA
      // Grupo Estado de consciencia y físico
      var hojaQuirurgica_alerta_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent663'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_orientado_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent664'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_consciente_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent665'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_tranquilo_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent666'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_ansioso_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent667'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_letargico_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent668'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_nervioso_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent669'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_otros1_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent670'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_ayuno_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent671'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_tricotomia_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent672'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_region_edoConsciencia = caso.getText({
        fieldId: 'custevent673'
      }) || '';
      var hojaQuirurgica_alergias_edoConsciencia = caso.getText({
        fieldId: 'custevent674'
      }) || '';
      var hojaQuirurgica_protesis_edoConsciencia = caso.getText({
        fieldId: 'custevent675'
      }) || '';
      var hojaQuirurgica_alajas_edoConsciencia = caso.getText({
        fieldId: 'custevent676'
      }) || '';
      var hojaQuirurgica_ropaInterior_edoConsciencia = caso.getText({
        fieldId: 'custevent677'
      }) || '';
      var hojaQuirurgica_mucosasOrales_edoConsciencia = caso.getText({
        fieldId: 'custevent678'
      }) || '';
      var hojaQuirurgica_colorTegumentos_edoConsciencia = caso.getText({
        fieldId: 'custevent679'
      }) || '';
      var label_hojaQuirurgica_mucosasOrales_edoConsciencia = caso.getField({
        fieldId: 'custevent678'
      }).label;
      var label_hojaQuirurgica_colorTegumentos_edoConsciencia = caso.getField({
        fieldId: 'custevent679'
      }).label;
      var hojaQuirurgica_estadoPiel_edoConsciencia = caso.getText({
        fieldId: 'custevent680'
      }) || '';
      var hojaQuirurgica_afeccionesPiel_edoConsciencia = caso.getText({
        fieldId: 'custevent681'
      }) || '';
      var label_hojaQuirurgica_afeccionesPiel_edoConsciencia = caso.getField({
        fieldId: 'custevent681'
      }).label;
      var hojaQuirurgica_heridas_edoConsciencia = caso.getText({
        fieldId: 'custevent682'
      }) || '';
      var hojaQuirurgica_cicatrices_edoConsciencia = caso.getText({
        fieldId: 'custevent683'
      }) || '';
      var hojaQuirurgica_otros2_edoConsciencia = caso.getText({
        fieldId: 'custevent684'
      }) || '';
      var hojaQuirurgica_venoclisis_edoConsciencia = caso.getText({
        fieldId: 'custevent685'
      }) || '';
      var hojaQuirurgica_sondas_edoConsciencia = caso.getText({
        fieldId: 'custevent686'
      }) || '';
      var hojaQuirurgica_drenajes_edoConsciencia = caso.getText({
        fieldId: 'custevent687'
      }) || '';
      var hojaQuirurgica_consentimientoFirmado_edoConsciencia = checado((caso.getValue({
        fieldId: 'custevent663'
      })) ? 'SI' : 'NO');
      //var hojaQuirurgica_otros3_edoConsciencia = caso.getText({ fieldId: ''}) || '';
      // Signos Vitales Enfermería Quirúrgica
      var table_SignosVitales_Hora_td = null;
      var table_SignosVitales_FreCardiaca_td = null;
      var table_SignosVitales_SPO2_td = null;
      var table_SignosVitales_TAMMHG_td = null;
      var conteo_SignosVitalesEnfermeriaQuirurgica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord285'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SignosVitalesEnfermeriaQuirurgica_lines);
      if (conteo_SignosVitalesEnfermeriaQuirurgica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_SignosVitalesEnfermeriaQuirurgica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'background-color: #cadcff';
          var table_SignosVitales_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord285',
            fieldId: 'custrecord281',
            line: i
          }) || '';
          var table_SignosVitales_FreCardiaca = caso.getSublistText({
            sublistId: 'recmachcustrecord285',
            fieldId: 'custrecord282',
            line: i
          }) || '';
          var table_SignosVitales_SPO2 = caso.getSublistText({
            sublistId: 'recmachcustrecord285',
            fieldId: 'custrecord283',
            line: i
          }) || '';
          var table_SignosVitales_TAMMHG = caso.getSublistText({
            sublistId: 'recmachcustrecord285',
            fieldId: 'custrecord284',
            line: i
          }) || '';
          table_SignosVitales_Hora_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_Hora + '</td>';
          table_SignosVitales_FreCardiaca_td += '<td align="center" style="border-left: 1px solid #346094;' + parImpar + '">' + table_SignosVitales_FreCardiaca + '</td>';
          table_SignosVitales_SPO2_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_SPO2 + '</td>';
          table_SignosVitales_TAMMHG_td += '<td align="center" style="border-left: 1px solid #346094;' + parImpar + '">' + table_SignosVitales_TAMMHG + '</td>';
          contadorIndependiente++;
        }
      }
      // Grupo Anestesia
      var hojaQuirurgica_anestesiologo_anestesia = caso.getText({
        fieldId: 'custevent688'
      }) || '';
      var hojaQuirurgica_anestesiologo_anestesia_label = caso.getField({
        fieldId: 'custevent688'
      }).label;
      var hojaQuirurgica_anestesiologo_anestesia_cedula = obtenerCedula(hojaQuirurgica_anestesiologo_anestesia, 'c');
      var hojaQuirurgica_tipoAnestesia_anestesia = caso.getText({
        fieldId: 'custevent689'
      }) || '';
      var hojaQuirurgica_tipoAnestesia_anestesia_label = caso.getField({
        fieldId: 'custevent689'
      }).label;
      var hojaQuirurgica_horaInicio_anestesia = caso.getText({
        fieldId: 'custevent690'
      }) || '';
      var hojaQuirurgica_horaInicio_anestesia_label = caso.getField({
        fieldId: 'custevent690'
      }).label;
      var hojaQuirurgica_horaTermino_anestesia = caso.getText({
        fieldId: 'custevent694'
      }) || '';
      var hojaQuirurgica_horaTermino_anestesia_label = caso.getField({
        fieldId: 'custevent694'
      }).label;
      var hojaQuirurgica_intubacion_anestesia = caso.getText({
        fieldId: 'custevent691'
      }) || '';
      var hojaQuirurgica_intubacion_anestesia_label = caso.getField({
        fieldId: 'custevent691'
      }).label;
      var hojaQuirurgica_numTubos_anestesia = caso.getText({
        fieldId: 'custevent692'
      }) || '';
      var hojaQuirurgica_numTubos_anestesia_label = caso.getField({
        fieldId: 'custevent692'
      }).label;
      var hojaQuirurgica_medicaInduccion_anestesia = caso.getText({
        fieldId: 'custevent693'
      }) || '';
      var hojaQuirurgica_medicaInduccion_anestesia_label = caso.getField({
        fieldId: 'custevent693'
      }).label;
      // Grupo Asepsia y antisepsia
      var hojaQuirurgica_realizo_asepsia = caso.getText({
        fieldId: 'custevent695'
      }) || '';
      var hojaQuirurgica_realizo_asepsia_label = caso.getField({
        fieldId: 'custevent695'
      }).label;
      var hojaQuirurgica_region_asepsia = caso.getText({
        fieldId: 'custevent696'
      }) || '';
      var hojaQuirurgica_region_asepsia_label = caso.getField({
        fieldId: 'custevent696'
      }).label;
      var hojaQuirurgica_antiseptico_asepsia = caso.getText({
        fieldId: 'custevent697'
      }) || '';
      var hojaQuirurgica_antiseptico_asepsia_label = caso.getField({
        fieldId: 'custevent697'
      }).label;
      var hojaQuirurgica_observaciones_asepsia = caso.getText({
        fieldId: 'custevent693'
      }) || '';
      var hojaQuirurgica_observaciones_asepsia_label = caso.getField({
        fieldId: 'custevent693'
      }).label;
      // Grupo Cirugía
      var hojaQuirurgica_cirujano_cirugia = caso.getText({
        fieldId: 'custevent699'
      }) || '';
      var hojaQuirurgica_cirujano_cirugia_label = caso.getField({
        fieldId: 'custevent699'
      }).label;
      var hojaQuirurgica_cirujano_cirugia_cedula = obtenerCedula(hojaQuirurgica_cirujano_cirugia, 'c');
      var hojaQuirurgica_primerAyudante_cirugia = caso.getText({
        fieldId: 'custevent700'
      }) || '';
      var hojaQuirurgica_primerAyudante_cirugia_label = caso.getField({
        fieldId: 'custevent700'
      }).label;
      var hojaQuirurgica_primerAyudante_cirugia_cedula = obtenerCedula(hojaQuirurgica_primerAyudante_cirugia, 'c');
      var hojaQuirurgica_segundoAyudante_cirugia = caso.getText({
        fieldId: 'custevent701'
      }) || '';
      var hojaQuirurgica_segundoAyudante_cirugia_label = caso.getField({
        fieldId: 'custevent701'
      }).label;
      var hojaQuirurgica_segundoAyudante_cirugia_cedula = obtenerCedula(hojaQuirurgica_segundoAyudante_cirugia, 'c');
      var hojaQuirurgica_instrumentista_cirugia = caso.getText({
        fieldId: 'custevent702'
      }) || '';
      var hojaQuirurgica_instrumentista_cirugia_label = caso.getField({
        fieldId: 'custevent702'
      }).label;
      var hojaQuirurgica_instrumentista_cirugia_cedula = obtenerCedula(hojaQuirurgica_instrumentista_cirugia, 'c');
      var hojaQuirurgica_circulante_cirugia = caso.getText({
        fieldId: 'custevent703'
      }) || '';
      var hojaQuirurgica_circulante_cirugia_label = caso.getField({
        fieldId: 'custevent703'
      }).label;
      var hojaQuirurgica_circulante_cirugia_cedula = obtenerCedula(hojaQuirurgica_circulante_cirugia, 'c');
      var hojaQuirurgica_tiempoFuera_cirugia = caso.getText({
        fieldId: 'custevent704'
      }) || '';
      var hojaQuirurgica_tiempoFuera_cirugia_label = caso.getField({
        fieldId: 'custevent704'
      }).label;
      var hojaQuirurgica_horaInicioInfiltracion_cirugia = caso.getText({
        fieldId: 'custevent705'
      }) || '';
      var hojaQuirurgica_horaInicioInfiltracion_cirugia_label = caso.getField({
        fieldId: 'custevent705'
      }).label;
      var hojaQuirurgica_horaTerminoInfiltracion_cirugia = caso.getText({
        fieldId: 'custevent706'
      }) || '';
      var hojaQuirurgica_horaTerminoInfiltracion_cirugia_label = caso.getField({
        fieldId: 'custevent706'
      }).label;
      var hojaQuirurgica_horaInicioCirugia_cirugia = caso.getText({
        fieldId: 'custevent707'
      }) || '';
      var hojaQuirurgica_horaInicioCirugia_cirugia_label = caso.getField({
        fieldId: 'custevent707'
      }).label;
      var hojaQuirurgica_horaTerminoCirugia_cirugia = caso.getText({
        fieldId: 'custevent708'
      }) || '';
      var hojaQuirurgica_horaTerminoCirugia_cirugia_label = caso.getField({
        fieldId: 'custevent708'
      }).label;
      var hojaQuirurgica_cirugiaRealizada_cirugia = caso.getText({
        fieldId: 'custevent709'
      }) || '';
      var hojaQuirurgica_cirugiaRealizada_cirugia_label = caso.getField({
        fieldId: 'custevent709'
      }).label;
      // Grupo Conteo de gasas, material textil, instrumental y punzocortantes
      var hojaQuirurgica_gasas_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent710'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_gasas_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent710'
      }).label;
      var hojaQuirurgica_compresas_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent711'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_compresas_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent711'
      }).label;
      var hojaQuirurgica_cotonoides_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent712'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_cotonoides_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent712'
      }).label;
      var hojaQuirurgica_isopos_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent713'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_isopos_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent713'
      }).label;
      var hojaQuirurgica_agujasHipo_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent714'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_agujasHipo_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent714'
      }).label;
      var hojaQuirurgica_agujasSutu_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent715'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_agujasSutu_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent715'
      }).label;
      var hojaQuirurgica_hojasBisturi_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent716'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_hojasBisturi_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent716'
      }).label;
      var hojaQuirurgica_instrumental_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent717'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_instrumental_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent717'
      }).label;
      var hojaQuirurgica_otros_materialesInstrumental = checado((caso.getValue({
        fieldId: 'custevent718'
      })) ? 'SI' : 'NO');
      var hojaQuirurgica_otros_materialesInstrumental_label = caso.getField({
        fieldId: 'custevent718'
      }).label;
      // Grupo Medicación
      var table_Medicacion_EnfermeriaQuirurgica = null;
      var conteo_MedicacionEnfermeriaQuirurgica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord256'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_MedicacionEnfermeriaQuirurgica_lines);
      if (conteo_MedicacionEnfermeriaQuirurgica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_MedicacionEnfermeriaQuirurgica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Medicacion_EnfermeriaQuirurgica_Farmaco = caso.getSublistText({
            sublistId: 'recmachcustrecord256',
            fieldId: 'custrecord251',
            line: i
          }) || '';
          var table_Medicacion_EnfermeriaQuirurgica_Dosis = caso.getSublistText({
            sublistId: 'recmachcustrecord256',
            fieldId: 'custrecord252',
            line: i
          }) || '';
          var table_Medicacion_EnfermeriaQuirurgica_Via = caso.getSublistText({
            sublistId: 'recmachcustrecord256',
            fieldId: 'custrecord253',
            line: i
          }) || '';
          var table_Medicacion_EnfermeriaQuirurgica_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord256',
            fieldId: 'custrecord254',
            line: i
          }) || '';
          var table_Medicacion_EnfermeriaQuirurgica_Administro = caso.getSublistText({
            sublistId: 'recmachcustrecord256',
            fieldId: 'custrecord255',
            line: i
          }) || '';
          if (table_Medicacion_EnfermeriaQuirurgica_Farmaco != '' || table_Medicacion_EnfermeriaQuirurgica_Dosis != '' || table_Medicacion_EnfermeriaQuirurgica_Via != '' || table_Medicacion_EnfermeriaQuirurgica_Hora != '' || table_Medicacion_EnfermeriaQuirurgica_Administro != '') {
            table_Medicacion_EnfermeriaQuirurgica += '<tr ' + parImpar + '>';
            table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Farmaco + '</td>';
            table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Dosis + '</td>';
            table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Via + '</td>';
            table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Hora + '</td>';
            table_Medicacion_EnfermeriaQuirurgica += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_EnfermeriaQuirurgica_Administro + '</td>';
            table_Medicacion_EnfermeriaQuirurgica += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Soluciones Intravenosas
      var table_SolsIntravenosas_EnfermeriaQuirurgica = null;
      var conteo_SolsIntravenosasEnfermeriaQuirurgica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord261'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SolsIntravenosasEnfermeriaQuirurgica_lines);
      if (conteo_SolsIntravenosasEnfermeriaQuirurgica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_SolsIntravenosasEnfermeriaQuirurgica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_SolsIntravenosas_Solucion = caso.getSublistText({
            sublistId: 'recmachcustrecord261',
            fieldId: 'custrecord257',
            line: i
          }) || '';
          var table_SolsIntravenosas_Volumne = caso.getSublistText({
            sublistId: 'recmachcustrecord261',
            fieldId: 'custrecord258',
            line: i
          }) || '';
          var table_SolsIntravenosas_HoraInicio = caso.getSublistText({
            sublistId: 'recmachcustrecord261',
            fieldId: 'custrecord259',
            line: i
          }) || '';
          var table_SolsIntravenosas_Praparada = caso.getSublistText({
            sublistId: 'recmachcustrecord261',
            fieldId: 'custrecord260',
            line: i
          }) || '';
          if (table_SolsIntravenosas_Solucion != '' || table_SolsIntravenosas_Volumne != '' || table_SolsIntravenosas_HoraInicio != '' || table_SolsIntravenosas_Praparada != '') {
            table_SolsIntravenosas_EnfermeriaQuirurgica += '<tr ' + parImpar + '>';
            table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_Solucion + '</td>';
            table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_Volumne + '</td>';
            table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_HoraInicio + '</td>';
            table_SolsIntravenosas_EnfermeriaQuirurgica += '<td align="center" style="border-left:1px solid #346094;">' + table_SolsIntravenosas_Praparada + '</td>';
            table_SolsIntravenosas_EnfermeriaQuirurgica += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Catéteres, Sondas y Drenajes
      var table_CatSonDren_EnfermeriaQuirurgica = null;
      var conteo_CatSonDrenEnfermeriaQuirurgica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord427'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_CatSonDrenEnfermeriaQuirurgica_lines);
      if (conteo_CatSonDrenEnfermeriaQuirurgica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_CatSonDrenEnfermeriaQuirurgica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_CatSonDren_Tipo = caso.getSublistText({
            sublistId: 'recmachcustrecord427',
            fieldId: 'custrecord428',
            line: i
          }) || '';
          var table_CatSonDren_SitioIserc = caso.getSublistText({
            sublistId: 'recmachcustrecord427',
            fieldId: 'custrecord429',
            line: i
          }) || '';
          var table_CatSonDren_Instalado = caso.getSublistText({
            sublistId: 'recmachcustrecord427',
            fieldId: 'custrecord430',
            line: i
          }) || '';
          if (table_CatSonDren_Tipo != '' || table_CatSonDren_SitioIserc != '' || table_CatSonDren_Instalado != '') {
            table_CatSonDren_EnfermeriaQuirurgica += '<tr ' + parImpar + '>';
            table_CatSonDren_EnfermeriaQuirurgica += '<td align="center">' + table_CatSonDren_Tipo + '</td>';
            table_CatSonDren_EnfermeriaQuirurgica += '<td align="center">' + table_CatSonDren_SitioIserc + '</td>';
            table_CatSonDren_EnfermeriaQuirurgica += '<td align="center">' + table_CatSonDren_Instalado + '</td>';
            table_CatSonDren_EnfermeriaQuirurgica += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Equipo Biomédico Utilizado
      var hojaQuirurgica_equipoBiomedico = caso.getText({
        fieldId: 'custevent719'
      }) || '';
      var hojaQuirurgica_equipoBiomedico_label = caso.getField({
        fieldId: 'custevent719'
      }).label;
      // Grupo Implantes e insumos extras
      var hojaQuirurgica_implantesInsumos = caso.getText({
        fieldId: 'custevent720'
      }) || '';
      var hojaQuirurgica_implantesInsumos_label = caso.getField({
        fieldId: 'custevent720'
      }).label;
      // Grupo Observaciones
      var hojaQuirurgica_observaciones = caso.getText({
        fieldId: 'custevent721'
      }) || '';
      var hojaQuirurgica_observaciones_label = caso.getField({
        fieldId: 'custevent721'
      }).label;

      // TAB NOTA POST QUIRÚRGICA
      // Grupo Datos Generales
      var notaPostQuirurgica_cirujano_datosGenerales = caso.getText({
        fieldId: 'custevent655'
      }) || '';
      var notaPostQuirurgica_cirujano_datosGenerales_label = caso.getField({
        fieldId: 'custevent655'
      }).label;
      var notaPostQuirurgica_cirujano_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_cirujano_datosGenerales, 'c');
      var notaPostQuirurgica_primerAyudante_datosGenerales = caso.getText({
        fieldId: 'custevent656'
      }) || '';
      var notaPostQuirurgica_primerAyudante_datosGenerales_label = caso.getField({
        fieldId: 'custevent656'
      }).label;
      var notaPostQuirurgica_primerAyudante_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_primerAyudante_datosGenerales, 'c');
      var notaPostQuirurgica_segundoAyudante_datosGenerales = caso.getText({
        fieldId: 'custevent657'
      }) || '';
      var notaPostQuirurgica_segundoAyudante_datosGenerales_label = caso.getField({
        fieldId: 'custevent657'
      }).label;
      var notaPostQuirurgica_segundoAyudante_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_segundoAyudante_datosGenerales, 'c');
      var notaPostQuirurgica_anestesiologo_datosGenerales = caso.getText({
        fieldId: 'custevent658'
      }) || '';
      var notaPostQuirurgica_anestesiologo_datosGenerales_label = caso.getField({
        fieldId: 'custevent658'
      }).label;
      var notaPostQuirurgica_anestesiologo_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_anestesiologo_datosGenerales, 'c');
      var notaPostQuirurgica_instrumentista_datosGenerales = caso.getText({
        fieldId: 'custevent659'
      }) || '';
      var notaPostQuirurgica_instrumentista_datosGenerales_label = caso.getField({
        fieldId: 'custevent659'
      }).label;
      var notaPostQuirurgica_instrumentista_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_instrumentista_datosGenerales, 'c');
      var notaPostQuirurgica_circulante_datosGenerales = caso.getText({
        fieldId: 'custevent660'
      }) || '';
      var notaPostQuirurgica_circulante_datosGenerales_label = caso.getField({
        fieldId: 'custevent660'
      }).label;
      var notaPostQuirurgica_circulante_datosGenerales_cedula = obtenerCedula(notaPostQuirurgica_circulante_datosGenerales, 'c');

      var notaPostQuirurgica_dxPreOperatorio_datosGenerales = caso.getText({
        fieldId: 'custevent661'
      }) || '';
      var notaPostQuirurgica_dxPreOperatorio_datosGenerales_label = caso.getField({
        fieldId: 'custevent661'
      }).label;
      var notaPostQuirurgica_dxPostOperatorio_datosGenerales = caso.getText({
        fieldId: 'custevent576'
      }) || '';
      var notaPostQuirurgica_dxPostOperatorio_datosGenerales_label = caso.getField({
        fieldId: 'custevent576'
      }).label;
      var notaPostQuirurgica_anestesiaAplicada_datosGenerales = caso.getText({
        fieldId: 'custevent577'
      }) || '';
      var notaPostQuirurgica_anestesiaAplicada_datosGenerales_label = caso.getField({
        fieldId: 'custevent577'
      }).label;
      //var notaPostQuirurgica_cirujano_cedula = 'PruebaCedula';
      //var notaPostQuirurgica_primerAyudante_cedula = 'PruebaCedula';
      //var notaPostQuirurgica_segundoAyudante_cedula = 'PruebaCedula';
      //var notaPostQuirurgica_anestesiologo_cedula = 'PruebaCedula';
      //var notaPostQuirurgica_instrumentista_cedula = 'PruebaCedula';
      //var notaPostQuirurgica_circulante_cedula = 'PruebaCedula';
      // Grupo Nota Médica
      var notaPostQuirurgica_nota_notaMedica = caso.getText({
        fieldId: 'custevent662'
      }) || '';
      var notaPostQuirurgica_nota_notaMedica_label = caso.getField({
        fieldId: 'custevent662'
      }).label;


      // TAB INDICACIONES MEDICAS
      // Grupo Indicaciones Médicas
      var table_Indicaciones_IndicacionesMedicas = null;
      var conteo_IndicacionesIndicacionesMedicas_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord356'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_IndicacionesIndicacionesMedicas_lines);
      if (conteo_IndicacionesIndicacionesMedicas_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_IndicacionesIndicacionesMedicas_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Indicaciones_Fecha = caso.getSublistText({
            sublistId: 'recmachcustrecord356',
            fieldId: 'custrecord353',
            line: i
          }) || '';
          var table_Indicaciones_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord356',
            fieldId: 'custrecord437',
            line: i
          }) || '';
          var table_Indicaciones_Indicaciones = caso.getSublistText({
            sublistId: 'recmachcustrecord356',
            fieldId: 'custrecord355',
            line: i
          }) || '';
          if (table_Indicaciones_Fecha != '' || table_Indicaciones_Hora != '' || table_Indicaciones_Indicaciones != '') {
            table_Indicaciones_IndicacionesMedicas += '<tr ' + parImpar + '>';
            table_Indicaciones_IndicacionesMedicas += '<td align="center" style="border-left:1px solid #346094">' + table_Indicaciones_Fecha + '</td>';
            table_Indicaciones_IndicacionesMedicas += '<td align="center" style="border-left:1px solid #346094">' + table_Indicaciones_Hora + '</td>';
            table_Indicaciones_IndicacionesMedicas += '<td align="center" style="border-left:1px solid #346094">' + table_Indicaciones_Indicaciones + '</td>';
            table_Indicaciones_IndicacionesMedicas += '</tr>';
            contadorIndependiente++;
          }
        }
      }


      // TAB NOTAS DE EVOLUCION
      // Grupo Evolucion Médicas
      var table_Evolucion_EvolucionMedica = null;
      var conteo_EvolucionEvolucionMedica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord356'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_EvolucionEvolucionMedica_lines);
      if (conteo_EvolucionEvolucionMedica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_EvolucionEvolucionMedica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Evolucion_Fecha = caso.getSublistText({
            sublistId: 'recmachcustrecord356',
            fieldId: 'custrecord353',
            line: i
          }) || '';
          var table_Evolucion_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord356',
            fieldId: 'custrecord354',
            line: i
          }) || '';
          var table_Evolucion_Evolucion = caso.getSublistText({
            sublistId: 'recmachcustrecord356',
            fieldId: 'custrecord355',
            line: i
          }) || '';
          if (table_Evolucion_Fecha != '' || table_Evolucion_Hora != '' || table_Evolucion_Evolucion != '') {
            table_Evolucion_EvolucionMedica += '<tr ' + parImpar + '>';
            table_Evolucion_EvolucionMedica += '<td align="center">' + table_Evolucion_Fecha + '</td>';
            table_Evolucion_EvolucionMedica += '<td align="center">' + table_Evolucion_Hora + '</td>';
            table_Evolucion_EvolucionMedica += '<td align="center">' + table_Evolucion_Evolucion + '</td>';
            table_Evolucion_EvolucionMedica += '</tr>';
            contadorIndependiente++;
          }
        }
      }


      // TAB NOTAS DE RECUPERACION
      // Grupo Signos Vitales Recuperación
      var table_SignosVitales_Recuperacion_Hora_td = null;
      var table_SignosVitales_Recuperacion_FC_td = null;
      var table_SignosVitales_Recuperacion_SPO2_td = null;
      var table_SignosVitales_Recuperacion_TAMMHG_td = null;
      var conteo_SignosVitalesEnfermeriaQuirurgica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord416'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SignosVitalesEnfermeriaQuirurgica_lines);
      if (conteo_SignosVitalesEnfermeriaQuirurgica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_SignosVitalesEnfermeriaQuirurgica_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'background-color: #cadcff';

          var table_SignosVitales_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord416',
            fieldId: 'custrecord417',
            line: i
          }) || '';
          var table_SignosVitales_FC = caso.getSublistText({
            sublistId: 'recmachcustrecord416',
            fieldId: 'custrecord418',
            line: i
          }) || '';
          var table_SignosVitales_TAMMHG = caso.getSublistText({
            sublistId: 'recmachcustrecord416',
            fieldId: 'custrecord419',
            line: i
          }) || '';
          var table_SignosVitales_SPO2 = caso.getSublistText({
            sublistId: 'recmachcustrecord416',
            fieldId: 'custrecord420',
            line: i
          }) || '';

          table_SignosVitales_Recuperacion_Hora_td += '<td align="center" style="background-color: #cadcff">' + table_SignosVitales_Hora + '</td>';
          table_SignosVitales_Recuperacion_FC_td += '<td align="center">' + table_SignosVitales_FC + '</td>';
          table_SignosVitales_Recuperacion_SPO2_td += '<td align="center" style="background-color: #cadcff">' + table_SignosVitales_SPO2 + '</td>';
          table_SignosVitales_Recuperacion_TAMMHG_td += '<td align="center">' + table_SignosVitales_TAMMHG + '</td>';
          contadorIndependiente++;
        }
      }
      // Grupo Terapia Intravenosa y Solcuiones
      var table_TerapiaIntravenosa_NotasRecuperacion = null;
      var conteo_TerapiaIntravenosaNotasRecuperacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord273'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_TerapiaIntravenosaNotasRecuperacion_lines);
      if (conteo_TerapiaIntravenosaNotasRecuperacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_TerapiaIntravenosaNotasRecuperacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_TerapiaIntravenosa_Solucion = caso.getSublistText({
            sublistId: 'recmachcustrecord273',
            fieldId: 'custrecord266',
            line: i
          }) || '';
          var table_TerapiaIntravenosa_Horas = caso.getSublistText({
            sublistId: 'recmachcustrecord273',
            fieldId: 'custrecord267',
            line: i
          }) || '';
          var table_TerapiaIntravenosa_MLH = caso.getSublistText({
            sublistId: 'recmachcustrecord273',
            fieldId: 'custrecord268',
            line: i
          }) || '';
          var table_TerapiaIntravenosa_Inicia = caso.getSublistText({
            sublistId: 'recmachcustrecord273',
            fieldId: 'custrecord269',
            line: i
          }) || '';
          var table_TerapiaIntravenosa_Termina = caso.getSublistText({
            sublistId: 'recmachcustrecord273',
            fieldId: 'custrecord270',
            line: i
          }) || '';
          var table_TerapiaIntravenosa_Preparo = caso.getSublistText({
            sublistId: 'recmachcustrecord273',
            fieldId: 'custrecord271',
            line: i
          }) || '';
          if (table_TerapiaIntravenosa_Solucion != '' || table_TerapiaIntravenosa_Horas != '' || table_TerapiaIntravenosa_MLH != '' || table_TerapiaIntravenosa_Inicia != '' || table_TerapiaIntravenosa_Termina != '' || table_TerapiaIntravenosa_Preparo != '') {
            table_TerapiaIntravenosa_NotasRecuperacion += '<tr ' + parImpar + '>';
            table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Solucion + '</td>';
            table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Horas + '</td>';
            table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_MLH + '</td>';
            table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Inicia + '</td>';
            table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Termina + '</td>';
            table_TerapiaIntravenosa_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_TerapiaIntravenosa_Preparo + '</td>';
            table_TerapiaIntravenosa_NotasRecuperacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Catéteres, sondas y drenajes
      var table_CatSonDren_NotasRecuperacion = null;
      var conteo_CatSonDrenNotasRecuperacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord265'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_CatSonDrenNotasRecuperacion_lines);
      if (conteo_CatSonDrenNotasRecuperacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_CatSonDrenNotasRecuperacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_CatSonDren_NotasRecuperacion_Tipo = caso.getSublistText({
            sublistId: 'recmachcustrecord265',
            fieldId: 'custrecord262',
            line: i
          }) || '';
          var table_CatSonDren_NotasRecuperacion_SitioInserc = caso.getSublistText({
            sublistId: 'recmachcustrecord265',
            fieldId: 'custrecord263',
            line: i
          }) || '';
          var table_CatSonDren_NotasRecuperacion_FechaInsta = caso.getSublistText({
            sublistId: 'recmachcustrecord265',
            fieldId: 'custrecord272',
            line: i
          }) || '';
          var table_CatSonDren_NotasRecuperacion_Instalado = caso.getSublistText({
            sublistId: 'recmachcustrecord265',
            fieldId: 'custrecord264',
            line: i
          }) || '';
          if (table_CatSonDren_NotasRecuperacion_Tipo != '' || table_CatSonDren_NotasRecuperacion_SitioInserc != '' || table_CatSonDren_NotasRecuperacion_FechaInsta != '' || table_CatSonDren_NotasRecuperacion_Instalado != '') {
            table_CatSonDren_NotasRecuperacion += '<tr ' + parImpar + '>';
            table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_Tipo + '</td>';
            table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_SitioInserc + '</td>';
            table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_FechaInsta + '</td>';
            table_CatSonDren_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_NotasRecuperacion_Instalado + '</td>';
            table_CatSonDren_NotasRecuperacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Medicación
      var table_Medicacion_NotasRecuperacion = null;
      var conteo_MedicacionNotasRecuperacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord280'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_MedicacionNotasRecuperacion_lines);
      if (conteo_MedicacionNotasRecuperacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_MedicacionNotasRecuperacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Medicacion_NotasRecuperacion_Farmaco = caso.getSublistText({
            sublistId: 'recmachcustrecord280',
            fieldId: 'custrecord274',
            line: i
          }) || '';
          var table_Medicacion_NotasRecuperacion_Dosis = caso.getSublistText({
            sublistId: 'recmachcustrecord280',
            fieldId: 'custrecord275',
            line: i
          }) || '';
          var table_Medicacion_NotasRecuperacion_Via = caso.getSublistText({
            sublistId: 'recmachcustrecord280',
            fieldId: 'custrecord276',
            line: i
          }) || '';
          var table_Medicacion_NotasRecuperacion_Presentacion = caso.getSublistText({
            sublistId: 'recmachcustrecord280',
            fieldId: 'custrecord277',
            line: i
          }) || '';
          var table_Medicacion_NotasRecuperacion_Horario = caso.getSublistText({
            sublistId: 'recmachcustrecord280',
            fieldId: 'custrecord278',
            line: i
          }) || '';
          var table_Medicacion_NotasRecuperacion_Administro = caso.getSublistText({
            sublistId: 'recmachcustrecord280',
            fieldId: 'custrecord279',
            line: i
          }) || '';
          if (table_Medicacion_NotasRecuperacion_Farmaco != '' || table_Medicacion_NotasRecuperacion_Dosis != '' || table_Medicacion_NotasRecuperacion_Via != '' || table_Medicacion_NotasRecuperacion_Presentacion != '' || table_Medicacion_NotasRecuperacion_Horario != '' || table_Medicacion_NotasRecuperacion_Administro != '') {
            table_Medicacion_NotasRecuperacion += '<tr ' + parImpar + '>';
            table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Farmaco + '</td>';
            table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Dosis + '</td>';
            table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Via + '</td>';
            table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Presentacion + '</td>';
            table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Horario + '</td>';
            table_Medicacion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Medicacion_NotasRecuperacion_Administro + '</td>';
            table_Medicacion_NotasRecuperacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Condiciones de la herida quirúrgica
      var notasRecuperacion_condicionesHerida = caso.getText({
        fieldId: 'custevent794'
      }) || '';
      var notasRecuperacion_condicionesHerida_label = caso.getField({
        fieldId: 'custevent794'
      }).label;
      // Grupo Notas de Enfermería
      var notasRecuperacion_notasEnfermeria = caso.getText({
        fieldId: 'custevent795'
      }) || '';
      var notasRecuperacion_notasEnfermeria_label = caso.getField({
        fieldId: 'custevent795'
      }).label;
      // Grupo Evolución
      var table_Evolucion_NotasRecuperacion = null;
      var table_Evolucion_NotasRecuperacion_TotalPuntaje = 0;
      var table_Evolucion_NotasRecuperacion_TotalIngreso = 0;
      var table_Evolucion_NotasRecuperacion_TotalAlta = 0;
      var conteo_EvolucionNotasRecuperacion_lineas = caso.getLineCount({
        sublistId: 'recmachcustrecord421'
      });
      ////log.debug('Tipo Objeto 8. Evolucion Nota de Recuperación', conteo_EvolucionNotasRecuperacion_lineas);
      if (conteo_EvolucionNotasRecuperacion_lineas > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_EvolucionNotasRecuperacion_lineas; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Evolucion_NotasRecuperacion_EscalaAldrete1 = caso.getSublistText({
            sublistId: 'recmachcustrecord421',
            fieldId: 'custrecord422',
            line: i
          }) || '';
          var table_Evolucion_NotasRecuperacion_EscalaAldrete2 = caso.getSublistText({
            sublistId: 'recmachcustrecord421',
            fieldId: 'custrecord423',
            line: i
          }) || '';
          var table_Evolucion_NotasRecuperacion_Puntaje = caso.getSublistText({
            sublistId: 'recmachcustrecord421',
            fieldId: 'custrecord424',
            line: i
          }) || '';
          var table_Evolucion_NotasRecuperacion_Ingreso = caso.getSublistText({
            sublistId: 'recmachcustrecord421',
            fieldId: 'custrecord425',
            line: i
          }) || '';
          var table_Evolucion_NotasRecuperacion_Alta = caso.getSublistText({
            sublistId: 'recmachcustrecord421',
            fieldId: 'custrecord426',
            line: i
          }) || '';
          table_Evolucion_NotasRecuperacion_TotalPuntaje += parseInt(table_Evolucion_NotasRecuperacion_Puntaje);
          table_Evolucion_NotasRecuperacion_TotalIngreso += parseInt(table_Evolucion_NotasRecuperacion_Ingreso);
          table_Evolucion_NotasRecuperacion_TotalAlta += parseInt(table_Evolucion_NotasRecuperacion_Alta);
          if (table_Evolucion_NotasRecuperacion_EscalaAldrete1 != '' || table_Evolucion_NotasRecuperacion_EscalaAldrete2 != '' || table_Evolucion_NotasRecuperacion_Puntaje != '' || table_Evolucion_NotasRecuperacion_Ingreso != '' || table_Evolucion_NotasRecuperacion_Alta != '') {
            table_Evolucion_NotasRecuperacion += '<tr ' + parImpar + '>';
            table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_EscalaAldrete1 + '</td>';
            table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_EscalaAldrete2 + '</td>';
            table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_Puntaje + '</td>';
            table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_Ingreso + '</td>';
            table_Evolucion_NotasRecuperacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Evolucion_NotasRecuperacion_Alta + '</td>';
            table_Evolucion_NotasRecuperacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Responsable Enfermería
      var notaRecuperacion_Enfermeria_Responsable = 'PruebaResponsable';
      var notaRecupreacion_Enfermeria_Firma = 'FirmaResponsable';

      // TAB HOJA DE HOSPITALIZACION
      // Grupo Signos Vitales Hospitalización
      var table_SignosVitales_Hospitalizacion_Hora_td = null;
      var table_SignosVitales_Hospitalizacion_FC_td = null;
      var table_SignosVitales_Hospitalizacion_TC_td = null;
      var table_SignosVitales_Hospitalizacion_TAMMHG_td = null;
      var table_SignosVitales_Hospitalizacion_SPO2_td = null;
      var table_SignosVitales_Hospitalizacion_EscalaDolor_td = null;
      var table_SignosVitales_Hospitalizacion_FR_td = null;
      var conteo_SignosVitalesEnfermeriaQuirurgica_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord311'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SignosVitalesEnfermeriaQuirurgica_lines);
      if (conteo_SignosVitalesEnfermeriaQuirurgica_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_SignosVitalesEnfermeriaQuirurgica_lines; i++) {
          parImpar = ((i + 1) % 2) ? '' : 'background-color: #cadcff';
          var table_SignosVitales_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord409',
            line: i
          }) || '';
          var table_SignosVitales_FC = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord410',
            line: i
          }) || '';
          var table_SignosVitales_TC = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord411',
            line: i
          }) || '';
          var table_SignosVitales_TAMMHG = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord412',
            line: i
          }) || '';
          var table_SignosVitales_SPO2 = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord413',
            line: i
          }) || '';
          var table_SignosVitales_EscalaDolor = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord414',
            line: i
          }) || '';
          var table_SignosVitales_FR = caso.getSublistText({
            sublistId: 'recmachcustrecord311',
            fieldId: 'custrecord415',
            line: i
          }) || '';
          table_SignosVitales_Hospitalizacion_Hora_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_Hora + '</td>';
          table_SignosVitales_Hospitalizacion_FC_td += '<td align="center" style="border-left: 1px solid #346094;background-color: #cadcff;">' + table_SignosVitales_FC + '</td>';
          table_SignosVitales_Hospitalizacion_TC_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_TC + '</td>';
          table_SignosVitales_Hospitalizacion_TAMMHG_td += '<td align="center" style="border-left: 1px solid #346094;background-color:#cadcff;">' + table_SignosVitales_TAMMHG + '</td>';
          table_SignosVitales_Hospitalizacion_SPO2_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_SPO2 + '</td>';
          table_SignosVitales_Hospitalizacion_EscalaDolor_td += '<td align="center" style="border-left: 1px solid #346094;background-color: #cadcff;">' + table_SignosVitales_EscalaDolor + '</td>';
          table_SignosVitales_Hospitalizacion_FR_td += '<td align="center" style="border-left: 1px solid #346094;">' + table_SignosVitales_FR + '</td>';
          contadorIndependiente++;
        }
      }
      // Grupo Medicación
      var table_Medicacion_Hospitalizacion = null;
      var conteo_MedicacionHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord317'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_MedicacionHospitalizacion_lines);
      if (conteo_MedicacionHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_MedicacionHospitalizacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Medicacion_Hospitalizacion_Medicamento = caso.getSublistText({
            sublistId: 'recmachcustrecord317',
            fieldId: 'custrecord312',
            line: i
          }) || '';
          var table_Medicacion_Hospitalizacion_Dosis = caso.getSublistText({
            sublistId: 'recmachcustrecord317',
            fieldId: 'custrecord313',
            line: i
          }) || '';
          var table_Medicacion_Hospitalizacion_Frecuencia = caso.getSublistText({
            sublistId: 'recmachcustrecord317',
            fieldId: 'custrecord314',
            line: i
          }) || '';
          var table_Medicacion_Hospitalizacion_Via = caso.getSublistText({
            sublistId: 'recmachcustrecord317',
            fieldId: 'custrecord315',
            line: i
          }) || '';
          var table_Medicacion_Hospitalizacion_Horario = caso.getSublistText({
            sublistId: 'recmachcustrecord317',
            fieldId: 'custrecord316',
            line: i
          }) || '';
          if (table_Medicacion_Hospitalizacion_Medicamento != '' || table_Medicacion_Hospitalizacion_Dosis != '' || table_Medicacion_Hospitalizacion_Frecuencia != '' || table_Medicacion_Hospitalizacion_Via != '' || table_Medicacion_Hospitalizacion_Horario != '') {
            table_Medicacion_Hospitalizacion += '<tr ' + parImpar + '>';
            table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Medicamento + '</td>';
            table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Dosis + '</td>';
            table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Frecuencia + '</td>';
            table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Via + '</td>';
            table_Medicacion_Hospitalizacion += '<td align="center" style="border-left:1px solid #346094">' + table_Medicacion_Hospitalizacion_Horario + '</td>';
            table_Medicacion_Hospitalizacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Soluciones
      var table_Soluciones_Hospitalizacion = null;
      var conteo_SolucionesHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord325'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_SolucionesHospitalizacion_lines);
      if (conteo_SolucionesHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_SolucionesHospitalizacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Soluciones_Hospitalizacion_No = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord318',
            line: i
          }) || 0;
          var table_Soluciones_Hospitalizacion_Soluciones = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord319',
            line: i
          }) || '';
          var table_Soluciones_Hospitalizacion_Duracion = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord320',
            line: i
          }) || '';
          var table_Soluciones_Hospitalizacion_Inicio = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord321',
            line: i
          }) || '';
          var table_Soluciones_Hospitalizacion_Termino = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord322',
            line: i
          }) || '';
          var table_Soluciones_Hospitalizacion_MLHORA = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord323',
            line: i
          }) || '';
          var table_Soluciones_Hospitalizacion_FXP = caso.getSublistText({
            sublistId: 'recmachcustrecord325',
            fieldId: 'custrecord324',
            line: i
          }) || '';
          if (table_Soluciones_Hospitalizacion_No != '' || table_Soluciones_Hospitalizacion_Soluciones != '' || table_Soluciones_Hospitalizacion_Duracion != '' || table_Soluciones_Hospitalizacion_Inicio != '' || table_Soluciones_Hospitalizacion_Termino != '' || table_Soluciones_Hospitalizacion_MLHORA != '' || table_Soluciones_Hospitalizacion_FXP != '') {
            table_Soluciones_Hospitalizacion += '<tr ' + parImpar + '>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_No + '</td>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Soluciones + '</td>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Duracion + '</td>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Inicio + '</td>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_Termino + '</td>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_MLHORA + '</td>';
            table_Soluciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Soluciones_Hospitalizacion_FXP + '</td>';
            table_Soluciones_Hospitalizacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Catéteres, Sondas y Drenajes
      var table_CatSonDren_Hospitalizacion = null;
      var conteo_CatSonDrenHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord330'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_CatSonDrenHospitalizacion_lines);
      if (conteo_CatSonDrenHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_CatSonDrenHospitalizacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_CatSonDren_Hospitalizacion_Dispositivo = caso.getSublistText({
            sublistId: 'recmachcustrecord330',
            fieldId: 'custrecord326',
            line: i
          }) || '';
          var table_CatSonDren_Hospitalizacion_Calibre = caso.getSublistText({
            sublistId: 'recmachcustrecord330',
            fieldId: 'custrecord327',
            line: i
          }) || '';
          var table_CatSonDren_Hospitalizacion_Insercion = caso.getSublistText({
            sublistId: 'recmachcustrecord330',
            fieldId: 'custrecord328',
            line: i
          }) || '';
          var table_CatSonDren_Hospitalizacion_Instalacion = caso.getSublistText({
            sublistId: 'recmachcustrecord330',
            fieldId: 'custrecord329',
            line: i
          }) || '';
          if (table_CatSonDren_Hospitalizacion_Dispositivo != '' || table_CatSonDren_Hospitalizacion_Calibre != '' || table_CatSonDren_Hospitalizacion_Insercion != '' || table_CatSonDren_Hospitalizacion_Instalacion != '') {
            table_CatSonDren_Hospitalizacion += '<tr ' + parImpar + '>';
            table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Dispositivo + '</td>';
            table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Calibre + '</td>';
            table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Insercion + '</td>';
            table_CatSonDren_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_CatSonDren_Hospitalizacion_Instalacion + '</td>';
            table_CatSonDren_Hospitalizacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Valoración Riesgos de Caidas
      var table_Riesgos_Hospitalizacion = null;
      var table_Riesgos_Hospitalizacion_TotalPuntaje = 0;
      var table_Riesgos_Hospitalizacion_TotalTM = 0;
      var table_Riesgos_Hospitalizacion_TotalTV = 0;
      var table_Riesgos_Hospitalizacion_TotalTN = 0;
      var conteo_RiesgosHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord337'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_RiesgosHospitalizacion_lines);
      if (conteo_RiesgosHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_RiesgosHospitalizacion_lines; i++) {
          parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Riesgos_Hospitalizacion_Criterio = caso.getSublistText({
            sublistId: 'recmachcustrecord337',
            fieldId: 'custrecord331',
            line: i
          }) || '';
          var table_Riesgos_Hospitalizacion_Variable = caso.getSublistText({
            sublistId: 'recmachcustrecord337',
            fieldId: 'custrecord332',
            line: i
          }) || '';
          var table_Riesgos_Hospitalizacion_Puntaje = caso.getSublistText({
            sublistId: 'recmachcustrecord337',
            fieldId: 'custrecord333',
            line: i
          }) || 0;
          var table_Riesgos_Hospitalizacion_TM = caso.getSublistText({
            sublistId: 'recmachcustrecord337',
            fieldId: 'custrecord334',
            line: i
          }) || '';
          var table_Riesgos_Hospitalizacion_TV = caso.getSublistText({
            sublistId: 'recmachcustrecord337',
            fieldId: 'custrecord335',
            line: i
          }) || '';
          var table_Riesgos_Hospitalizacion_TN = caso.getSublistText({
            sublistId: 'recmachcustrecord337',
            fieldId: 'custrecord336',
            line: i
          }) || '';
          table_Riesgos_Hospitalizacion_TotalPuntaje += parseInt(table_Riesgos_Hospitalizacion_Puntaje);
          table_Riesgos_Hospitalizacion_TotalTM += parseInt(table_Riesgos_Hospitalizacion_TM);
          table_Riesgos_Hospitalizacion_TotalTV += parseInt(table_Riesgos_Hospitalizacion_TV);
          table_Riesgos_Hospitalizacion_TotalTN += parseInt(table_Riesgos_Hospitalizacion_TN);
          table_Riesgos_Hospitalizacion += '<tr ' + parImpar + '>';
          table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_Criterio + '</td>';
          table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_Variable + '</td>';
          table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_Puntaje + '</td>';
          table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_TM + '</td>';
          table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_TV + '</td>';
          table_Riesgos_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Riesgos_Hospitalizacion_TN + '</td>';
          table_Riesgos_Hospitalizacion += '</tr>';
          contadorIndependiente++;
        }
      }
      // Grupo Valoración Riesgos de Caidas
      var table_Ulceras_Hospitalizacion = null;
      var table_Ulceras_Hospitalizacion_TotalPuntaje = 0;
      var table_Ulceras_Hospitalizacion_TotalTM = 0;
      var table_Ulceras_Hospitalizacion_TotalTV = 0;
      var table_Ulceras_Hospitalizacion_TotalTN = 0;
      var conteo_UlcerasHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord344'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_UlcerasHospitalizacion_lines);
      if (conteo_UlcerasHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_UlcerasHospitalizacion_lines; i++) {
          parImpar = ((i + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Ulceras_Hospitalizacion_Criterio = caso.getSublistText({
            sublistId: 'recmachcustrecord344',
            fieldId: 'custrecord338',
            line: i
          }) || '';
          var table_Ulceras_Hospitalizacion_Variable = caso.getSublistText({
            sublistId: 'recmachcustrecord344',
            fieldId: 'custrecord339',
            line: i
          }) || '';
          var table_Ulceras_Hospitalizacion_Puntaje = caso.getSublistText({
            sublistId: 'recmachcustrecord344',
            fieldId: 'custrecord340',
            line: i
          }) || 0;
          var table_Ulceras_Hospitalizacion_TM = caso.getSublistText({
            sublistId: 'recmachcustrecord344',
            fieldId: 'custrecord341',
            line: i
          }) || '';
          var table_Ulceras_Hospitalizacion_TV = caso.getSublistText({
            sublistId: 'recmachcustrecord344',
            fieldId: 'custrecord342',
            line: i
          }) || '';
          var table_Ulceras_Hospitalizacion_TN = caso.getSublistText({
            sublistId: 'recmachcustrecord344',
            fieldId: 'custrecord343',
            line: i
          }) || '';
          table_Ulceras_Hospitalizacion_TotalPuntaje += parseInt(table_Ulceras_Hospitalizacion_Puntaje);
          table_Ulceras_Hospitalizacion_TotalTM += parseInt(table_Ulceras_Hospitalizacion_TM);
          table_Ulceras_Hospitalizacion_TotalTV += parseInt(table_Ulceras_Hospitalizacion_TV);
          table_Ulceras_Hospitalizacion_TotalTN += parseInt(table_Ulceras_Hospitalizacion_TN);
          table_Ulceras_Hospitalizacion += '<tr ' + parImpar + '>';
          table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_Criterio + '</td>';
          table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_Variable + '</td>';
          table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_Puntaje + '</td>';
          table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_TM + '</td>';
          table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_TV + '</td>';
          table_Ulceras_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Ulceras_Hospitalizacion_TN + '</td>';
          table_Ulceras_Hospitalizacion += '</tr>';
          contadorIndependiente++;
        }
      }
      // Grupo Notas Enfermeria
      var table_NotasEnfermeria_Hospitalizacion = null;
      var conteo_NotasEnfermeriaHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord348'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_NotasEnfermeriaHospitalizacion_lines);
      if (conteo_NotasEnfermeriaHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_NotasEnfermeriaHospitalizacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_NotasEnfermeria_Hospitalizacion_Matutino = caso.getSublistText({
            sublistId: 'recmachcustrecord348',
            fieldId: 'custrecord345',
            line: i
          }) || '';
          var table_NotasEnfermeria_Hospitalizacion_Vespertino = caso.getSublistText({
            sublistId: 'recmachcustrecord348',
            fieldId: 'custrecord346',
            line: i
          }) || '';
          var table_NotasEnfermeria_Hospitalizacion_Nocturno = caso.getSublistText({
            sublistId: 'recmachcustrecord348',
            fieldId: 'custrecord347',
            line: i
          }) || '';
          if (table_NotasEnfermeria_Hospitalizacion_Matutino != '' || table_NotasEnfermeria_Hospitalizacion_Vespertino != '' || table_NotasEnfermeria_Hospitalizacion_Nocturno != '') {
            table_NotasEnfermeria_Hospitalizacion += '<tr ' + parImpar + '>';
            table_NotasEnfermeria_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_NotasEnfermeria_Hospitalizacion_Matutino + '</td>';
            table_NotasEnfermeria_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_NotasEnfermeria_Hospitalizacion_Vespertino + '</td>';
            table_NotasEnfermeria_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_NotasEnfermeria_Hospitalizacion_Nocturno + '</td>';
            table_NotasEnfermeria_Hospitalizacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }
      // Grupo Intervenciones de Enfermería
      var table_Intervenciones_Hospitalizacion = null;
      var conteo_IntervencionesHospitalizacion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord352'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_IntervencionesHospitalizacion_lines);
      if (conteo_IntervencionesHospitalizacion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_IntervencionesHospitalizacion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_Intervenciones_Hospitalizacion_Matutino = caso.getSublistText({
            sublistId: 'recmachcustrecord352',
            fieldId: 'custrecord349',
            line: i
          }) || '';
          var table_Intervenciones_Hospitalizacion_Vespertino = caso.getSublistText({
            sublistId: 'recmachcustrecord352',
            fieldId: 'custrecord350',
            line: i
          }) || '';
          var table_Intervenciones_Hospitalizacion_Nocturno = caso.getSublistText({
            sublistId: 'recmachcustrecord352',
            fieldId: 'custrecord351',
            line: i
          }) || '';
          if (table_Intervenciones_Hospitalizacion_Matutino != '' || table_Intervenciones_Hospitalizacion_Vespertino != '' || table_Intervenciones_Hospitalizacion_Nocturno != '') {
            table_Intervenciones_Hospitalizacion += '<tr ' + parImpar + '>';
            table_Intervenciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Intervenciones_Hospitalizacion_Matutino + '</td>';
            table_Intervenciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Intervenciones_Hospitalizacion_Vespertino + '</td>';
            table_Intervenciones_Hospitalizacion += '<td align="center" style="border-left: 1px solid #346094;">' + table_Intervenciones_Hospitalizacion_Nocturno + '</td>';
            table_Intervenciones_Hospitalizacion += '</tr>';
            contadorIndependiente++;
          }
        }
      }

      // TAB INDICACIONES MEDICAS
      // Grupo Indicaciones Médicas
      var table_NotasEvolucion_NotaEvolucion = null;
      var conteo_NotasEvolucionNotaEvolucion_lines = caso.getLineCount({
        sublistId: 'recmachcustrecord431'
      });
      //log.debug('Tipo Objeto Control Liquidos Dieta', conteo_NotasEvolucionNotaEvolucion_lines);
      if (conteo_NotasEvolucionNotaEvolucion_lines > 0) {
        contadorIndependiente = 0;
        for (i = 0; i < conteo_NotasEvolucionNotaEvolucion_lines; i++) {
          parImpar = ((contadorIndependiente + 1) % 2) ? '' : 'style="background-color: #cadcff"';
          var table_NotasEvolucion_NotaEvolucion_Fecha = caso.getSublistText({
            sublistId: 'recmachcustrecord431',
            fieldId: 'custrecord432',
            line: i
          }) || '';
          var table_NotasEvolucion_NotaEvolucion_Hora = caso.getSublistText({
            sublistId: 'recmachcustrecord431',
            fieldId: 'custrecord433',
            line: i
          }) || '';
          var table_NotasEvolucion_NotaEvolucion_Observaciones = caso.getSublistText({
            sublistId: 'recmachcustrecord431',
            fieldId: 'custrecord434',
            line: i
          }) || '';
          if (table_Indicaciones_Fecha != '' || table_Indicaciones_Hora != '' || table_Indicaciones_Indicaciones != '') {
            table_NotasEvolucion_NotaEvolucion += '<tr ' + parImpar + '>';
            table_NotasEvolucion_NotaEvolucion += '<td align="center" style="border-left:1px solid #346094">' + table_NotasEvolucion_NotaEvolucion_Fecha + '</td>';
            table_NotasEvolucion_NotaEvolucion += '<td align="center" style="border-left:1px solid #346094">' + table_NotasEvolucion_NotaEvolucion_Hora + '</td>';
            table_NotasEvolucion_NotaEvolucion += '<td align="center" style="border-left:1px solid #346094">' + table_NotasEvolucion_NotaEvolucion_Observaciones + '</td>';
            table_NotasEvolucion_NotaEvolucion += '</tr>';
            contadorIndependiente++;
          }
        }
      }


      //TAB NOTA EGRESO Y ALTA
      // Grupo nota de egreso y alta
      var egresoAlta_notaEgresoAlta_fechaEgreso = caso.getText({
        fieldId: 'custevent570'
      }) || '';
      var egresoAlta_notaEgresoAlta_fechaEgreso_label = caso.getField({
        fieldId: 'custevent570'
      }).label;
      var egresoAlta_notaEgresoAlta_diagnosticoEgreso = caso.getText({
        fieldId: 'custevent573'
      }) || '';
      var egresoAlta_notaEgresoAlta_diagnosticoEgreso_label = caso.getField({
        fieldId: 'custevent573'
      }).label;
      var egresoAlta_notaEgresoAlta_motivoEgreso = caso.getText({
        fieldId: 'custevent574'
      }) || '';
      var egresoAlta_notaEgresoAlta_motivoEgreso_label = caso.getField({
        fieldId: 'custevent574'
      }).label;
      var egresoAlta_notaEgresoAlta_signosVitalesEgreso = caso.getText({
        fieldId: 'custevent571'
      }) || '';
      var egresoAlta_notaEgresoAlta_signosVitalesEgreso_label = caso.getField({
        fieldId: 'custevent571'
      }).label;
      var egresoAlta_notaEgresoAlta_resumenEvolucion = caso.getText({
        fieldId: 'custevent572'
      }) || '';
      var egresoAlta_notaEgresoAlta_resumenEvolucion_label = caso.getField({
        fieldId: 'custevent572'
      }).label;
      var egresoAlta_notaEgresoAlta_planManejo = caso.getText({
        fieldId: 'custevent575'
      }) || '';
      var egresoAlta_notaEgresoAlta_planManejo_label = caso.getField({
        fieldId: 'custevent575'
      }).label;

      // log.debug('Prueba Cedula', notaPostQuirurgica_primerAyudante_datosGenerales_cedula);

      // RECETA
      // VARIABLES PARA PDF DE RECETA PACIENTE
      /*             var medS = caso.getValue({ fieldId: 'custevent2' });
                  var form = caso.getValue({ fieldId: 'customform' });
                  var medicoReceta = caso.getValue({ fieldId: 'custevent202' });
                  var med1 = caso.getValue({ fieldId: 'custevent177' });
                  var med2 = caso.getValue({ fieldId: 'custevent178' });
                  var med3 = caso.getText({ fieldId: 'custevent179' });   
                  var ind1 = caso.getValue({ fieldId: 'custevent180' });
                  var ind2 = caso.getValue({ fieldId: 'custevent181' });
                  var ind3 = caso.getValue({ fieldId: 'custevent182' });
                  var ind5 = caso.getValue({ fieldId: 'custevent187' });
                  var ind6 = caso.getValue({ fieldId: 'custevent188' });
                  var ind7 = caso.getValue({ fieldId: 'custevent189' });
                  var ind8 = caso.getValue({ fieldId: 'custevent190' });
                  var shampooCaidaCheck = caso.getValue({ fieldId: 'custevent183' });
                  var shampooGrasaCheck = caso.getValue({ fieldId: 'custevent184' });
                  var aguaGlaciarCheck = caso.getValue({ fieldId: 'custevent185' });
                  var argininaCheck = caso.getValue({ fieldId: 'custevent186' });
                  var tipo = caso.getValue({ fieldId: 'custevent203' }) || false;
                  var comentarios = null;
                  if (tipo == 3) {
                      comentarios = caso.getText({ fieldId: 'custevent196' });
                  } else if (tipo == 1) {
                      comentarios = caso.getText({ fieldId: 'custevent204' });
                  } else {
                      comentarios = false;
                  } */

      //CEDULAS MEDICOS Y ENFERMEROS
      /*             var recetaDoctor = record.load({ type: 'employee', id: medicoReceta }) || null;
                  if (recetaDoctor != null) {
                      var doctor = recetaDoctor.getValue({ fieldId: 'entityid' });
                      var cedula = recetaDoctor.getValue({ fieldId: 'custentity392' });
                      var inst = recetaDoctor.getValue({ fieldId: 'custentity393' });
                  } else {
                      var doctor = '';
                      var cedula = '';
                      var inst = '';
                  }
                  */

      // ZONA DE ENCABEZADOS
      // FICHA DE IDENTIFICACION
      var encabezados_fichaIdentificacion = '<div style="margin-left:150px;background:white !important;" ><table style=" width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td style="font-size: 12px;font-weight:bold;color:#346094;">1. FICHA DE IDENTIFICACIÓN:</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;">' +
        '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + numeroExpediente + '</td><td><b>GÉNERO: </b> ' + sexoCliente + '</td></tr>' +
        '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
        '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
        '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
        '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table></div>';

      /*             var encabezados_recetasIdentificacion = '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                      '<tr><td><b>NOMBRE DEL PACIENTE: </b>' + nombreCliente + '</td><td align=\"left\"><b>DR.: </b>' + doctor + '</td></tr>' +
                      '<tr><td><b>EDAD: </b>' + edadCliente + '</td><td align=\"left\"><b>CÉDULA: </b>' + cedula + '</td></tr>' +
                      '<tr><td><b>FECHA DE EMISIÓN: </b>' + fechaCaso + '</td><td align=\"left\"><b>INSTITUCIÓN: </b>' + inst + '</td></tr>' +
                      '</table>'; */

      var stylesPDF = '<styles>' +
        'p { margin: 0; width:100%; border-bottom:1px solid #000000; }' +
        '#consentimiento { font-family: Aria, sans-serif; font-size: 11px; }' +
        '</styles>';

      /**
       * ************************ *
       *                          *
       * //FIXED: CONSENTIMIENTOS DE ALBYA *
       *                          *
       * ************************ *
       */

      var consentimiento_Liposuccion = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA LIPOSUCCIÓN</b></p>' +
        '<p id="consentimiento">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
        '<p id="consentimiento">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Liposucción</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p>' +
        '<p id="consentimiento"><b>¿En qué consiste el procedimiento?</b>  La Liposucción es un procedimiento encaminado a moldear el contorno corporal mediante la aspiración de grasa produciendo los probables siguientes beneficios:Mejorar el contorno corporal, el cual por razones personales el paciente considera inapropiado.Modificar los depósitos de grasa en las diferentes partes del cuerpo disminuyendo su volumen.La forma y el tamaño de los depósitos de grasa pueden influir tanto en el tratamiento recomendado como en el resultado final. Si no se tiene simetría o forma antes de la cirugía, es solo probable que se consiga una mejoría después del acto quirúrgico.Existen varios tipos de Liposucciones tales como la seca, húmeda, tumescente, con jeringa, con máquina, con láser o la ultrasónica.En forma conjunta con mi médico tratante y debido a su experiencia y mi conveniencia escogemos la técnica tumescente que significa la infiltración de una solución preparada con el beneficio de disminuir la cantidad de sangre que se aspira y mejorar el dolor postoperatorio.</p>' +
        '<p id="consentimiento"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en no tratar la laxitud de la cara y el cuello con Ritidectomía. Puede intentarse mejorar la laxitud cutánea, arrugas y depósitos grasos mediante otros tratamientos o cirugía, tales como peeling químico facial o la liposucción, sin embargo también existen riesgos y complicaciones potenciales asociados con las formas alternativas de tratamiento.</p>' +
        '<p id="consentimiento"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados a la liposucción. La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de los pacientes no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su cirujano plástico para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias de la liposucción.El paciente manifiesta que tomando en cuenta sus características personales, el médico le describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p>' +
        '<p id="consentimiento"><b>Hemorragia.</b> Es posible aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia postoperatoria, puede requerir tratamiento de emergencia para drenar la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o medicación antiinflamatoria desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de hemorragia.</p>' +
        '<p id="consentimiento"><b>Infección:</b> La infección es infrecuente tras este tipo de intervención. Si ocurre una infección, el tratamiento incluye el uso de antibióticos o cirugía adicional. Es extremadamente raro que pueda ocurrir una infección severa y producir infección bacteriana en otra parte del cuerpo.</p>' + saltoPagina() +
        '<p id="consentimiento"><b>Cambios en la sensibilidad de la piel:</b> Las zonas de liposucción están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad de la piel inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal. Ocasionalmente puede ocurrir una pérdida parcial o total de la sensibilidad de la piel aunque es muy raro.</p>' +
        '<p id="consentimiento"><b>Cicatriz cutánea:</b> La cicatrización excesiva (queloide) es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. El paciente podría necesitar cirugía adicional para tratar cicatrices anormales tras la cirugía o un tatuaje de la misma para igualar el color.</p>' +
        '<p id="consentimiento"><b>Retraso en la cicatrización:</b> Existe la posibilidad de una apertura (dehiscencia) de la herida o de una cicatrización retrasada. Algunas zonas pueden no curar normalmente y tardar un tiempo largo en cicatrizar. </p>' +
        '<p id="consentimiento"><b>Los fumadores</b> tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p>' +
        '<p id="consentimiento"><b>Trombolembolismo.</b> Aunque es muy raro que se presente, existe la posibilidad en que en algún momento durante o posterior a la cirugía se desprendan uno o varios pequeños trombos (coágulos) que alteren el funcionamiento de los pulmones o del cerebro por un mecanismo de obstrucción de la circulación normal produciéndose una embolia pulmonar o cerebral y casos muy raros producir la muerte. Si ocurre una embolia grasa o cualquier otra complicación pulmonar tras la liposucción el paciente podría necesitar tratamiento adicional incluyendo hospitalización.</p>' +
        '<p id="consentimiento"><b>Arrugas y pliegues en la piel:</b> Pueden existir pliegues visibles y palpables aunque es muy raro que suceda. Esto puede ser más pronunciado en pacientes con tipos de piel delgada y de mala calidad. el paciente podría necesitar tratamientos adicionales incluyendo cirugía para tratar irregularidades del contorno de la piel tras una liposucción.</p>' +
        '<p id="consentimiento"><b>Reacciones alérgicas.</b> En casos raros se han descrito alergias locales al esparadrapo, material de sutura o preparados tópicos. Pueden ocurrir en casos muy raros reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p>' +
        '<p id="consentimiento"><b>Anestesia.</b> Tanto la anestesia local como la anestesia general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p>' +
        '<p id="consentimiento"><b>Asimetría.</b> Puede no conseguirse un aspecto simétrico del cuerpo tras la liposucción. Factores como el tono de la piel, prominencias óseas, y tono muscular, pueden contribuir a una asimetría normal en los rasgos corporales. Usted puede estar insatisfecho con los resultados de la cirugía. Infrecuentemente se necesita realizar cirugía adicional para mejorar los resultados.</p>' +
        '<p id="consentimiento"><b>Shock quirúrgico.</b> En raras circunstancias, este procedimiento puede causar un trauma severo, particularmente cuando se succionan áreas múltiples o extensas en un mismo tiempo. Aunque son infrecuentes las complicaciones serias, infecciones o una excesiva pérdida de fluidos pueden llevar a un problema serio o incluso la muerte. Si ocurre el paciente podría necesitar hospitalización y tratamiento adicional.</p>' + saltoPagina() +
        '<p id="consentimiento"><b>Pérdida de piel.</b> La pérdida cutánea es rara tras una liposucción. El paciente podría necesitar tratamientos adicionales, incluyendo cirugía.</p>' +
        '<p id="consentimiento"><b>Efectos a largo plazo.</b> Pueden ocurrir alteraciones posteriores en el contorno corporal como resultado del envejecimiento, pérdida o ganancia de peso, embarazo u otras circunstancias no relacionadas con la liposucción.</p>' +
        '<p id="consentimiento"><b>Necesidad de cirugía adicional.</b> Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo del procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p>' +
        '<p id="consentimiento"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado:<ul><li id="consentimiento">Mejoramiento del contorno corporal.</li></ul></p>' +
        '<p id="consentimiento"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
        '<ul id="consentimiento"><li id="consentimiento">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Liposucción.</li>' +
        '<li id="consentimiento">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
        '<li id="consentimiento">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
        '<li id="consentimiento">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
        '<li id="consentimiento">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
        '<li id="consentimiento">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li></ul><br/><br/><br/>' +
        '<ul><li id="consentimiento">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
        '<li id="consentimiento">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
        '<li id="consentimiento">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
        '<li id="consentimiento">LOCALIZACIÓN DE LAS CICATRICES: Cicatrices muy pequeñas de 1 cm. y de 0,5 cm. en pliegues diversos según las zonas a tratar.</li>' +
        '</ul>' +
        '<p id="consentimiento"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';

      var consentimiento_Rinoseptoplastia = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA RINOSEPTOPLASTIA</b></p>' +
        '<p id="consentimiento">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
        '<p id="consentimiento">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Rinoseptoplastia</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p>' +
        '<p id="consentimiento"><b>¿En qué consiste el procedimiento?</b>  La Rinoseptoplastia es un procedimiento encaminado a mejorar el aspecto estético y funcional de la nariz produciendo los siguientes probables beneficios: Mejorar la forma y proporción de la nariz y de la cara, la cual por razones personales considera inapropiada.Las cirugías previas y los elementos anatómicos que se hubieran utilizado o modificado en ellas pueden influir tanto en el tratamiento recomendado como en el resultado final. Si no se tiene simetría o forma antes de la cirugía, es solo probable que se consiga una mejoría después.Existen varios tipos de Rinoseptoplastias, pero en general existen dos grandes grupos que consisten en las técnicas abiertas y las cerradas. En conjunto con mi médico tratante y debido a su experiencia y mi conveniencia escogemos la técnica</p>' +
        '<p id="consentimiento"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en colocar prótesis externas para mejorar la punta nasal, o rinomodelación con rellenos biocompatibles y temporales. Existen riesgos y complicaciones potenciales asociados con las formas alternativas de tratamiento.</p>' +
        '<p id="consentimiento"><b>RIESGOS DE LA CIRUGÍA DE RINOSEPTOPLASTIA.</b> El paciente manifiesta que tomando en cuenta sus características personales, el médico le describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p>' +
        '<p id="consentimiento"><b>Hemorragia:</b>  Es posible aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia postoperatoria, puede requerir tratamiento de emergencia para drenar la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o medicación antiinflamatoria desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de hemorragia.</p>' +
        '<p id="consentimiento"><b>Infección:</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p>' +
        '<p id="consentimiento"><b>Cambios en la sensibilidad de la piel:</b> La nariz y la mucosa nasal están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal. Ocasionalmente puede ocurrir una pérdida parcial o total de la sensibilidad de la piel aunque es muy raro.</p>' +
        '<p id="consentimiento"><b>Cicatriz cutánea:</b> La cicatrización excesiva (queloide) es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden retraerse y deformar la mucosa nasal. En este caso no existirán cicatrices externas.</p>' + saltoPagina() +
        '<p id="consentimiento"><b>Retraso en la cicatrización:</b> existe la posibilidad de una apertura (dehiscencia) de la herida o de una cicatrización retrasada. Algunas zonas pueden no curar normalmente y tardar un tiempo largo en cicatrizar.</p>' +
        '<p id="consentimiento"><b>Los fumadores</b> tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p>' +
        '<p id="consentimiento"><b>Arrugas y pliegues en la piel:</b> Pueden existir pliegues en la piel visibles y palpables aunque es muy raro que esto suceda. Esto puede ser más pronunciado en pacientes con tipos de piel delgada y de mala calidad.</p>' +
        '<p id="consentimiento"><b>Actividades y ocupaciones poco frecuentes:</b> Estas actividades y ocupaciones pueden implicar un riesgo en la evolución normal de la cirugía.</p>' +
        '<p id="consentimiento"><b>Reacciones alérgicas:</b> En casos raros se han descrito alergias locales al esparadrapo, material de sutura o preparados tópicos. Pueden ocurrir en casos muy raros reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p>' +
        '<p id="consentimiento"><b>Anestesia:</b> Tanto la anestesia local como la anestesia general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p>' +
        '<p id="consentimiento"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado.<ul><li id="consentimiento">Mejoramiento de la forma y proporción de la nariz y de la cara.</li>' +
        '<li id="consentimiento">Mejoramiento de la capacidad ventilatoria.</li></ul></p>' +
        '<p id="consentimiento"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
        '<ul id="consentimiento"><li id="consentimiento">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Rinoseptoplastia.</li>' +
        '<li id="consentimiento">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
        '<li id="consentimiento">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
        '<li id="consentimiento">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
        '<li id="consentimiento">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li></ul><br/><br/><br/><br/><br/>' +
        '<ul><li id="consentimiento">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
        '<li id="consentimiento">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
        '<li id="consentimiento">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
        '<li id="consentimiento">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
        '<li id="consentimiento">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido.</li>' +
        '</ul>' +
        '<p id="consentimiento">El paciente manifiesta que se le ha informado que existen muchas condiciones variables que pueden influenciar los resultados a largo plazo de la RINOSEPTOPLASTIA y, que podría  ser necesaria una cirugía secundaria para realizar una corrección adicional. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que puedan obtenerse.</p>' + saltoPagina() +
        '<p id="consentimiento"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';

      var consentimiento_MamoplastiaAumentoImplantes = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA MAMOPLASTIA DE AUMENTO CON IMPLANTES</b></p>' +
        '<p id="consentimiento">EDAD: <b>' + edadCliente + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +
        '<p id="consentimiento">Yo <b>' + nombreCliente + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + identificacionCliente + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Mampolastia de aumento con implantes</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p>' +
        '<p id="consentimiento"><b>¿En qué consiste el procedimiento?</b>  La mamoplastia de aumento es una operación quirúrgica destinada a aumentar el tamaño de las mamas, por una serie de motivos:Para mejorar el contorno corporal de la mujer, la cual por razones personales considera demasiado pequeño el tamaño de su pecho.Para corregir una pérdida en el volumen mamario después de un embarazo.Para equilibrar el tamaño de las mamas, cuando existe una diferencia significativa entre ellas.Como técnica reconstructiva en determinadas situaciones.La forma y el tamaño de las mamas previas a la cirugía pueden influir tanto en el tratamiento recomendado como en el resultado final. Si las mamas no tienen el mismo tamaño o forma antes de la cirugía, es poco probable que sean completamente simétricas después.Existen varios tipos de implantes: RELLENOS DE GEL DE SILICONA, RELLENOS DE SUERO FISIOLÓGICO, DE SUPERFICIE LISA, TEXTURADA, DE FORMA REDONDA O ANATÓMICA, ETC. el médico tratante le indicará el más adecuado para  cada  caso individual.El aumento de la mama se consigue implantando una prótesis ya sea detrás del tejido mamario subglandular debajo del músculo pectoral-submuscular y/o debajo de la aponeurosis del músculo pectoral (subfacial).  Las incisiones se realizan de forma que las cicatrices resulten lo más invisibles que sea posible, habitualmente alrededor de la parte inferior de la areola, o por debajo de la mama, o en la axila. El método de  implantación y la posición de la prótesis dependerá de sus preferencias, su anatomía y la recomendación de mi médico tratante.</p>' +
        '<p id="consentimiento"><b>TRATAMIENTO ALTERNATIVO.</b> La mamoplastia de aumento es una operación quirúrgica electiva. La alternativa podría consistir en no llevar a cabo la intervención, el uso de una prótesis mamaria externa o relleno.</p>' +
        '<p id="consentimiento"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados a la mamoplastia de aumento. La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de las mujeres no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su médico tratante para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias del aumento mamario.</p>' +
        '<p id="consentimiento"><b>Sangrado.</b>  Es posible, aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia post-operatoria, puede requerir tratamiento de urgencia para drenar la sangre acumulada, en caso muy extremo  transfusión de sangre. No debe tomar aspirina o medicamento antiinflamatorio, inhibidores coagulación, vit. E, medicamentos naturistas, ginkgo biloba desde 15 días antes de la cirugía., puesto que pueden aumentar el riesgo de  hemorragia.</p>' +
        '<p id="consentimiento"><b>Infección:</b> La infección después de la cirugía es muy rara. Si ocurre una infección, puede ser necesario tratamiento adicional, incluyendo antibióticos.</p>' + saltoPagina() +
        '<p id="consentimiento"><b>Contractura capsular.</b> El tejido cicatricial que se forma internamente alrededor del implante puede contraerse y hacer que la prótesis se haga redonda, firme y posiblemente dolorosa. La dureza excesiva de las mamas puede ocurrir al poco tiempo de la cirugía o al cabo de años. Puede esperarse que la incidencia de la contractura capsular sintomática aumenta con el tiempo. La contractura capsular puede ocurrir en un lado, en los dos o en ninguno. El tratamiento para la contractura capsular puede requerir cirugía, cambio del implante o retirada del mismo.</p>' +
        '<p id="consentimiento"><b>Cambios en la sensibilidad del pezón y la piel.</b> Las mamas están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad del pezón inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal.</p>' +
        '<p id="consentimiento"><b>Cicatrices cutáneas.</b> La cicatrización excesiva es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. El paciente podría necesitar cirugía adicional para tratar cicatrices anormales tras la cirugía, que puede incurrir en gastos económicos.</p>' +
        '<p id="consentimiento"><b>Implantes.</b> Los implantes mamarios, al igual que otros dispositivos médicos, pueden fallar. Pueden romperse o tener escapes. Cuando una prótesis de suero se vacía, el relleno de agua salada se absorbe por el organismo. La rotura puede ocurrir como resultado de una herida, durante una mamografía, o sin causa aparente. Las prótesis no tienen una vida ilimitada y eventualmente requerirán cirugía de recambio.</p>' +
        '<p id="consentimiento"><b>Extrusión del implante.</b> La falta de adecuada cobertura tisular o un infección puede dar como resultado la exposición y extrusión del implante. Se han visto casos de rotura de la piel con el uso de medicación esteroidea o tras radioterapia del tejido mamario. Si ocurre rotura del tejido y la prótesis se expone, es necesario su retiro.</p>' +
        '<p id="consentimiento"><b>Mamografía.</b> Si usted tiene alrededor de 35 años de edad, es recomendable realizar una mamografía y un ultrasonido preoperatorio. Usted debe informar al radiólogo de la presencia de prótesis mamarias, para que pueda realizarse los estudios mamográficos adecuados. La ecografía, mamografía especializada y la resonancia magnética pueden ser apropiados para evaluar nódulos mamarios y el estado de los implantes.</p>' +
        '<p id="consentimiento"><b>Arrugas y pliegues en la piel.</b> Pueden existir pliegues en el implante visibles y palpables. Es normal y de esperar que haya alguna arruga. Esto puede ser más pronunciado en pacientes con tejido mamario delgado.</p>' +
        '<p id="consentimiento"><b>Embarazo y lactancia.</b> No existe evidencia suficiente en cuanto a la absoluta seguridad de los implantes mamarios respecto a la fertilidad, embarazo o lactancia. Aunque no hay evidencia de ningún peligro especial de los implantes para la mujer embarazada o su hijo, continúan los estudios para buscar posibles problemas.</p>' +
        '<p id="consentimiento"><b>Calcificación.</b> Pueden formarse depósitos de calcio en el tejido que rodea la prótesis, lo que puede causar dolor, aumento de la consistencia, y puede ser visibles en la mamografía. Si esto ocurre, puede ser necesaria cirugía adicional para corregir el problema.</p>' +
        '<p id="consentimiento"><b>Actividades.</b> Las actividades y ocupaciones que implican un riesgo de traumatismo mamario, potencialmente podrían romper o dañar los implantes mamarios.</p>' + saltoPagina() +
        '<p id="consentimiento"><b>Reacciones alérgicas.</b> En casos raros se han descrito alergias locales al micropore material de sutura o preparados tópicos. Pueden ocurrir reacciones sistémicas, que son más graves, frente a medicamentos usados durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p>' +
        '<p id="consentimiento"><b>Enfermedad de la mama.</b> La literatura médica actual no demuestra un incremento en el riesgo de enfermedad mamaria o cáncer de mama en mujeres portadoras de prótesis mamarias por motivo estético o reconstructivo. La enfermedad mamaria puede aparecer independientemente de la presencia de prótesis. Es recomendable que todas las mujeres se practiquen autoexamen periódicamente, se sometan a mamografía y ultrasonido cada año si son mayores de 35 años y que consulten a su médico si descubre un bulto en la mama.</p>' +
        '<p id="consentimiento"><b>Anestesia.</b> Tanto la anestesia local como la general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p>' +
        '<p id="consentimiento"><b>Necesidad de cirugía adicional.</b> Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo del procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p>' +
        '<p id="consentimiento"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado.<ul><li id="consentimiento">Aumento del volumen mamario</li>' +
        '<li id="consentimiento">Mejoramiento del contorno del torso</li></ul></p>' +
        '<p id="consentimiento"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
        '<ul><li id="consentimiento">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Aumento mamario con implantes.</li>' +
        '<li id="consentimiento">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
        '<li id="consentimiento">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
        '<li id="consentimiento">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li></ul><br/><br/><br/><br/><br/>' +
        '<ul><li id="consentimiento">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
        '<li id="consentimiento">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
        '<li id="consentimiento">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
        '<li id="consentimiento">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
        '<li id="consentimiento">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
        '<li id="consentimiento">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido.</li>' +
        '<li id="consentimiento">LOCALIZACIÓN DE LAS CICATRICES: Incisión Periareolar (alrededor del pezón), Incisión Submamaria (en el surco bajo de la mama), Incisión axilar (en la axila).</li>' +
        '</ul>' +
        '<p align="center"><img src="' + implantesMamarios + '" height="200px" width="400px" /></p>' + saltoPagina() +
        '<p id="consentimiento"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';

      // FORMATO PDF EXPEDIENTE INJERTO
      // COMPLETO
      // Encabezado XML
      var expediente_medicalPDF = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
        '<pdf>\n' + stylesPDF +
        '<body background-image="' + xmlMod.escape({
          xmlText: imageBack
        }) + '" >';
      expediente_medicalPDF += encabezados_fichaIdentificacion;

      // log.debug('screen.width', screen.width);
      // log.debug('screen.width', screen.height);
      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>CIRUGÍA SEGURA</b></p>';


      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">2. ANTES DE LA INDUCCIÓN ANESTÉSICA</td>' +
        '<td width="2%"></td>' +
        '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">3. AL INICIAR EL PROCEDIMIENTO</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="border-bottom:1px solid #346094;"><b>EL PACIENTE CONFIRMO:</b>' +
        '<ul style="list-style: none">' +
        '<li>' + cs_identidad + ' SU IDENTIDAD</li>' +
        '<li>' + cs_sitioCorrecto + ' SITIO QUIRÚRGICO CORRECTO</li>' +
        '<li>' + cs_procedimientoCorrecto + ' PROCEDIMIENTO CORRECTO</li>' +
        '<li>' + cs_cuentaConsentimientoInf + ' CUENTA CON SU CONSENTIMIENTO INFORMADO</li>' +
        '</ul>' +
        '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom:1px solid #346094;"><b>SE REALIZO EL MARCAJE DEL SITIO QUIRÚRGICO</b>' +
        '<br />' + cs_realizoMarcaje +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom:1px solid #346094;"><b>SE COMPLETO EL CONTROL DE SEGURIDAD EN ANESTESIA</b>' +
        '<br />' + cs_controlAnestesia +
        '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom:1px solid #346094;"><b>SE COLOCARON ELEMENTOS DE VIGILANCIA ESTÁNDAR</b>' +
        '<br />' + cs_vigilanciaEstandar +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>VÍA AÉREA DIFÍCIL / RIESGO DE ASPIRACIÓN</b>' +
        '<br />' + cs_riesgoAspiracion +
        '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom:1px solid #346094;"><b>RIESGO DE HEMORRAGIA >500ml</b>' +
        '<br />' + cs_riesgoHemorragia +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '<td width="2%"></td>' +
        '<td width="49%" style="vertical-align: top">' +
        '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="border-bottom:1px solid #346094;">' + cs_confirmarMiembros + ' CONFIRMAR QUE TODOS LOS MIEMBROS DEL EQUIPO SE HAYAN IDENTIFICADO POR NOMBRE Y FUNCIÓN</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom:1px solid #346094;"><b>CIRUJANO, ANESTESIOLOGO E INSTRUMENTISTA CONFIRMAN VERBALMENTE</b>' +
        '<ul style="list-style: none">' +
        '<li>IDENTIDAD DEL PACIENTE</li>' +
        '<li>SITIO CORRECTO</li>' +
        '<li>PROCEDIMIENTO CORRECTO</li>' +
        '</ul>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom:1px solid #346094;"><b>PREVISIÓN DE EVENTOS CRÍTICOS</b>' +
        '<ul style="list-style: none">' +
        '<li>' + cs_revisaCirujano + ' EL CIRUJANO REVISA: LOS PASOS CRÍTICOS O IMPREVISTOS, LA DURACIÓN DE LA OPERACIÓN Y LA PÉRDIDA DE SANGRE PREVISTA</li>' +
        '<li>' + cs_revisaAnestesia + ' EL EQUIPO DE ANESTESIA REVISA: SI EL PACIENTE PRESNETA ALGÚN PROBLEMA ESPECÍFICO</li>' +
        '<li>' + cs_revisarInstrumental + ' EL EQUIPO DE ENFERMERÍA REVISA: SI SE HA CONFIRMADO LA ESTERILIDAD Y SI EXISTEN DUDAS O PROBLEMAS RELACIONADOS CON EL INSTRUMENTAL Y LOS EQUIPOS</li>' +
        '</ul>' +
        '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td><b>¿SE HA ADMINISTRADO PROFILAXIS ANTIBIÓTICA EN LOS ÚLTIMOS 60 MINUTOS?</b>' +
        '<br />' + cs_profilaxisAntibiótica +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td><b>¿PUEDEN VISUALIZARSE LAS IMÁGENES DIAGNÓSTICAS ESCENCIALES?</b>' +
        '<br />' + cs_visualizarImagenes +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;vertical-align:bottom;">4. DESPUÉS DE LA CIRUGÍA</td>' +
        '<td width="2%"></td>' +
        '<td width="49%" style="font-size: 11px;font-weight:bold;color:#346094;">5. MIEMBROS DEL EQUIPO EN CIRUGÍA</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="vertical-align: top">' +
        '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="border-bottom:1px solid #346094;"><b>ENFERMERÍA CONFIRMA VERBALMENTE CON EL EQUIPO:</b>' +
        '<ul style="list-style: none">' +
        '<li>' + cs_nomrbeProcedimiento + ' NOMBRE DEL PROCEDIMIENTO REALIZADO</li>' +
        '<li>' + cs_recuentoInstrumental + ' RECUENTO DE INSTRUMENTOS, AGUJAS Y HOJAS DE BISTURÍ</li>' +
        '<li>' + cs_etiquetadoHistopatologicas + ' ETIQUETADO DE MUESTRAS HISTOPATOLÓGICAS</li>' +
        '<li>' + cs_materialTextil + ' MATERIAL TEXTIL COMPLETO</li>' +
        '</ul>' +
        '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td>' + cs_recuperacionTratamiento + ' EL CIRUJANO, ANESTESISTA Y ENFERMERÍA REVISAN LOS PRINCIPALES ASPECTOS DE LA RECUPERACIÓN Y EL TRATAMIENTO DEL PACIENTE' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '<td></td>' +
        '<td>' +
        '<table style="width:100%;font-size:8px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="20%" style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + vp_cirujanoTransanestesico_label + '</b></td>' +
        '<td width="40%" style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + vp_cirujanoTransanestesico + '</b></span><br />NOMBRE</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + vp_anestesiologoTransanestesico_label + '</b></td>' +
        '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + vp_anestesiologoTransanestesico + '</b></span><br />NOMBRE</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + notaPostQuirurgica_instrumentista_datosGenerales_label + '</b></td>' +
        '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + notaPostQuirurgica_instrumentista_datosGenerales + '</b></span><br />NOMBRE</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom:1px solid #346094;vertical-align: bottom;"><b>' + notaPostQuirurgica_circulante_datosGenerales_label + '</b></td>' +
        '<td style="border-bottom:1px solid #346094;border-left: 1px solid #346094;border-right: 1px solid #346094;vertical-align: bottom;"><span style="font-size: 10px"><b>' + notaPostQuirurgica_circulante_datosGenerales + '</b></span><br />NOMBRE</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';
      // log.debug("salto", saltoPagina());
      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>VALORACIÓN PREANESTÉSICA</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
        '<tr style="background-color: #cadcff"><td>' + vp_cirugiaElectiva + ' <b>' + vp_cirugiaElectiva_label + '</b></td><td><b>' + vp_glucosa_label + ':</b> ' + vp_glucosa + '</td><td><b>' + vp_asa_label + ':</b> ' + vp_asa + '</td><td><b>' + vp_rh_label + ':</b> ' + vp_rh + '</td></tr>' +
        '<tr><td>' + vp_cirugiaUrgente + ' <b>' + vp_cirugiaUrgente_label + '</b></td><td><b>' + vp_urea_label + ':</b> ' + vp_urea + '</td><td><b>' + vp_hb_label + ':</b> ' + vp_hb + '</td><td><b>' + vp_pa_label + ':</b> ' + vp_pa + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td>' + vp_cirugiaMayor + ' <b>' + vp_cirugiaMayor_label + '</b></td><td><b>' + vp_creatinina_label + ':</b> ' + vp_creatinina + '</td><td><b>' + vp_hto_label + ':</b> ' + vp_hto + '</td><td><b>' + vp_fc_label + ':</b> ' + vp_fc + '</td></tr>' +
        '<tr><td>' + vp_cirugiaMenor + ' <b>' + vp_cirugiaMenor_label + '</b></td><td><b>' + vp_ekg_label + ':</b> ' + vp_ekg + '</td><td><b>' + vp_grupoS_label + ':</b> ' + vp_grupoS + '</td><td><b>' + vp_ef_label + ':</b> ' + vp_ef + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td></td><td><b>' + vp_rxTorax_label + ':</b> ' + vp_rxTorax + '</td></tr>' +
        '<tr><td width="50%" colspan="2"><b>' + vp_craneo_label + ':</b> ' + vp_craneo + '</td><td width="50%" colspan="2"><b>' + vp_sEndocrino_label + ':</b> ' + vp_sEndocrino + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_ojosOidosNarizGarganta_label + ':</b> ' + vp_ojosOidosNarizGarganta + '</td><td colspan="2"><b>' + vp_sMuscular_label + ':</b> ' + vp_sMuscular + '</td></tr>' +
        '<tr><td colspan="2"><b>' + vp_patologiasActuales_label + ':</b> ' + vp_patologiasActuales + '</td><td colspan="2"><b>' + vp_alergiasTrans_label + ':</b> ' + vp_alergiasTrans + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_sRespiratoria_label + ':</b> ' + vp_sRespiratoria + '</td><td colspan="2"><b>' + vp_operacionesPrevias_label + ':</b> ' + vp_operacionesPrevias + '</td></tr>' +
        '<tr><td colspan="2"><b>' + vp_sCardiovascular_label + ':</b> ' + vp_sCardiovascular + '</td><td colspan="2"><b>' + vp_antecedentesAnestesicos_label + ':</b> ' + vp_antecedentesAnestesicos + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_sGastrointestinal_label + ':</b> ' + vp_sGastrointestinal + '</td><td colspan="2"><b>' + vp_complicaciones_label + ':</b> ' + vp_complicaciones + '</td></tr>' +
        '<tr><td colspan="2"><b>' + vp_sGenitourinatio_label + ':</b> ' + vp_sGenitourinatio + '</td><td colspan="2"><b>' + vp_tecAnestPropuesta_label + ':</b> ' + vp_antecedentesAnestesicos + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td colspan="2"><b>' + vp_sNervioso_label + ':</b> ' + vp_sNervioso + '</td><td colspan="2"></td></tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr><td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;" colspan="2">2. ANESTESIA</td></tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
        '<tr style="background-color: #cadcff"><td width="50%"><b>' + vp_puncionVenosaSitio_label + ':</b> ' + vp_puncionVenosaSitio + '</td><td width="50%" rowspan="3"><b>' + vp_sitiosPresion_label + ':</b> ' + vp_sitiosPresion + '</td></tr>' +
        '<tr><td><b>' + vp_puncionVenosaCalibre_label + ':</b> ' + vp_puncionVenosaCalibre + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_ojosProteccion_label + ':</b> ' + vp_ojosProteccion + '</td></tr>' +
        '<tr><td><b>' + vp_posicionPaciente_label + ':</b> ' + vp_posicionPaciente + '</td><td rowspan="3"><b>' + vp_otrosDatos_label + ':</b>' + vp_otrosDatos + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_posBrazosAbduccion_label + ':</b> ' + vp_posBrazosAbduccion + '</td></tr>' +
        '<tr><td><b>' + vp_posBrazosAduccion_label + ':</b> ' + vp_posBrazosAduccion + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_torniqueteSitio_label + ':</b> ' + vp_torniqueteSitio + '</td><td><b>' + vp_puncionEpiduralDificultades_label + ':</b> ' + vp_puncionEpiduralDificultades + '</td></tr>' +
        '<tr><td><b>' + vp_torniqueteInicia_label + ':</b> ' + vp_torniqueteInicia + '</td><td><b>' + vp_pucnionEpiduralCalibre_label + ':</b> ' + vp_pucnionEpiduralCalibre + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_torniqueteTermina_label + ':</b> ' + vp_torniqueteTermina + '</td><td><b>' + vp_puncionEpiduralIntervertebral_label + ':</b> ' + vp_puncionEpiduralIntervertebral + '</td></tr>' +
        '<tr><td><b>' + vp_induccionDificultados_label + ':</b> ' + vp_induccionDificultados + '</td><td><b>' + vp_puncionEpidrualAgente_label + ':</b> ' + vp_puncionEpidrualAgente + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_intubacionDificultades_label + ':</b> ' + vp_intubacionDificultades + '</td><td><b>' + vp_puncionEpiduralNivel_label + ':</b> ' + vp_puncionEpiduralNivel + '</td></tr>' +
        '<tr><td><b>' + vp_oralNasalCalibre_label + ':</b> ' + vp_oralNasalCalibre + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_oralNasalGlobo_label + ':</b> ' + vp_oralNasalGlobo + '</td></tr>' +
        '<tr><td ><b>' + vp_presionNormalBaja_label + ':</b> ' + vp_presionNormalBaja + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_bloqueoPlexo_label + ':</b> ' + vp_bloqueoPlexo + '</td><td><b>' + vp_porAnestesiologo_label + ':</b> ' + vp_porAnestesiologo + '</td></tr>' +
        '<tr><td colspan="2"><b>' + vp_codicionPacienteCerrar_label + ':</b> ' + vp_codicionPacienteCerrar + '</td></tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr><td style="font-size: 12px;font-weight:bold;color:#346094;">3. RECUPERACIÓN</td></tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;" cellspacing="0">' +
        '<tr width="50%" style="background-color: #cadcff"><td><b>' + vp_valoracionAldrete15_label + ':</b> ' + vp_valoracionAldrete15 + '</td><td width="50%"><b>' + vp_pasoDeRecuperacionA_label + ':</b> ' + vp_pasoDeRecuperacionA + '</td></tr>' +
        '<tr><td><b>' + vp_valoracionAldrete45_label + ':</b> ' + vp_valoracionAldrete45 + '</td><td><b>' + vp_pasoDeRecuperacionAEspecifique_label + ':</b> ' + vp_pasoDeRecuperacionAEspecifique + '</td></tr>' +
        '<tr style="background-color: #cadcff"><td><b>' + vp_valoracionAldrete90_label + ':</b> ' + vp_valoracionAldrete90 + '</td><td><b>' + vp_pasoDeRecuperacionAHora_label + ':</b> ' + vp_pasoDeRecuperacionAHora + '</td></tr>' +
        '<tr><td></td><td><b>' + vp_recuperacionResponsable_label + ':</b> ' + vp_recuperacionResponsable + '</td></tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>REGISTRO TRANSANESTÉSICO</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">TIEMPOS, PARÁMETROS Y SIGNOS</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="10%" style="background-color:#346094;color:#FFFFFF;" align="center">DESCRIPCÓN</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">8h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">9h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">10h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">11h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">12h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">13h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">14h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">15h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">16h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">17h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">18h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">19h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">20h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">21h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">22h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">23h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">24h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">1h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">2h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">3h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">4h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">5h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">6h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">7h</td>' +
        '</tr>' + table_ParametrosSignos_ValoracionPreanestesica +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">SÍMBOLOS-AGENTES ANESTÉSICOS, FÁRMACOS, SOLUCIONES</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:6px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="8%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">DESCRIPCÓN</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">8h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">9h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">10h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">11h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">12h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">13h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">14h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">15h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">16h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">17h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">18h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">19h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">20h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">21h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">22h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">23h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">24h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">1h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">2h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">3h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">4h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">5h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">6h</td>' +
        '<td width="3.5%" style="background-color:#346094;color:#FFFFFF;font-size:7px" align="center">7h</td>' +
        '</tr>' + table_SimbolosAgentes_ValoracionPreanestesica +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>CONTROL DE LÍQUIDOS</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">DIETA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
        '</tr>' + table_Dieta_ControlLiquidos +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">INGRESOS</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="10%" style="background-color:#346094;color:#FFFFFF;" align="center">DESCRIPCÓN</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">8h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">9h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">10h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">11h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">12h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">13h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">14h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">15h</td>' +
        '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">16h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">17h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">18h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">19h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">20h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">21h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">22h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">23h</td>' +
        '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">24h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">1h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">2h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">3h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">4h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">5h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">6h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">7h</td>' +
        '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
        '</tr>' + table_Ingresos_ControlLiquidos +
        '<tr>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
        '<td colspan="8" style="background-color:#346094;"></td>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Ingresos_total1_subtotal.toFixed(2) + '</b></td>' +
        '<td colspan="8" style="background-color:#346094;"></td>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Ingresos_total2_subtotal.toFixed(2) + '</b></td>' +
        '<td colspan="8" style="background-color:#346094;"></td>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Ingresos_total3_subtotal.toFixed(2) + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">EGRESOS</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout: fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="10%" style="background-color:#346094;color:#FFFFFF;" align="center">DESCRIPCIÓN</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">8h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">9h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">10h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">11h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">12h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">13h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">14h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">15h</td>' +
        '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">16h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">17h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">18h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">19h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">20h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">21h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">22h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">23h</td>' +
        '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">24h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">1h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">2h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">3h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">4h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">5h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">6h</td>' +
        '<td width="3%" style="background-color:#346094;color:#FFFFFF;" align="center">7h</td>' +
        '<td width="4%" style="background-color:#346094;color:#FFFFFF;" align="center">TOTAL</td>' +
        '</tr>' + table_Egresos_ControlLiquidos +
        '<tr>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
        '<td colspan="8" style="background-color:#346094;"></td>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Egresos_total1_subtotal.toFixed(2) + '</b></td>' +
        '<td colspan="8" style="background-color:#346094;"></td>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Egresos_total2_subtotal.toFixed(2) + '</b></td>' +
        '<td colspan="8" style="background-color:#346094;"></td>' +
        '<td style="border-top:1px solid #346094;" align="center"><b>' + table_Egresos_total3_subtotal.toFixed(2) + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr>' +
        '<td>' +
        '<table style="width:100%;">' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:1px solid #346094;table-layout: fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="10%" style="border:1px solid #346094;" align="center"><b>BALANCE</b></td>' +
        '<td width="24%" style="background-color:#346094;"></td>' +
        '<td width="4%" style="border:1px solid #346094;" align="center"><b>' + (parseFloat(table_Ingresos_total1_subtotal) - parseFloat(table_Egresos_total1_subtotal)).toFixed(2) + '</b></td>' +
        '<td width="24%" style="background-color:#346094;"></td>' +
        '<td width="4%" style="border:1px solid #346094;" align="center"><b>' + (parseFloat(table_Ingresos_total2_subtotal) - parseFloat(table_Egresos_total2_subtotal)).toFixed(2) + '</b></td>' +
        '<td width="24%" style="background-color:#346094;"></td>' +
        '<td width="4%" style="border:1px solid #346094;" align="center"><b>' + (parseFloat(table_Ingresos_total3_subtotal) - parseFloat(table_Egresos_total3_subtotal)).toFixed(2) + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TOTAL DE INGRESOS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TOTAL DE EGRESOS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">BALANCE 24 HORAS</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td align="center">' + total_IngresosControlLiquidos_totalesGlobales.toFixed(2) + '</td>' +
        '<td align="center" style="border-left:1px solid #346094;">' + total_EgresosControlLiquidos_totalesGlobales.toFixed(2) + '</td>' +
        '<td align="center" style="border-left:1px solid #346094;">' + (parseFloat(total_IngresosControlLiquidos_totalesGlobales).toFixed(2) - parseFloat(total_EgresosControlLiquidos_totalesGlobales).toFixed(2)) + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>CONTROL DE LÍQUIDOS</b></p>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">OBSERVACIONES, DATOS RELEVANTES A REPORTAR</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
        '</tr>' + table_Observaciones_ControlLiquidos +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094"></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center"></td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
        '</tr>' + table_Responsables_ControlLiquidos +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA QUIRÚRGICA</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" colspan="3">' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td style="font-size: 12px;font-weight:bold;color:#346094">2. ESTADO DE CONCIENCIA Y FÍSICO</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +

        '<td width="33%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="40%">Alerta:</td>' +
        '<td width="60%">' + hojaQuirurgica_alerta_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Orientado:</td>' +
        '<td width="60%">' + hojaQuirurgica_orientado_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Consciente:</td>' +
        '<td width="60%">' + hojaQuirurgica_consciente_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Tranquilo:</td>' +
        '<td width="60%">' + hojaQuirurgica_tranquilo_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Ansioso:</td>' +
        '<td width="60%">' + hojaQuirurgica_ansioso_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Letárgico:</td>' +
        '<td width="60%">' + hojaQuirurgica_letargico_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Nervioso:</td>' +
        '<td width="60%">' + hojaQuirurgica_nervioso_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Otro:</td>' +
        '<td width="60%">' + hojaQuirurgica_otros1_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Ayuno:</td>' +
        '<td width="60%">' + hojaQuirurgica_ayuno_edoConsciencia + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +

        '<td width="33%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="40%">Tricotomía:</td>' +
        '<td width="60%">' + hojaQuirurgica_tricotomia_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Región:</td>' +
        '<td width="60%">' + hojaQuirurgica_region_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Alergias:</td>' +
        '<td width="60%">' + hojaQuirurgica_alergias_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Prótesis:</td>' +
        '<td width="60%">' + hojaQuirurgica_protesis_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Alajas:</td>' +
        '<td width="60%">' + hojaQuirurgica_alajas_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Ropa Interior:</td>' +
        '<td width="60%">' + hojaQuirurgica_ropaInterior_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">' + label_hojaQuirurgica_mucosasOrales_edoConsciencia + ':</td>' +
        '<td width="60%">' + hojaQuirurgica_mucosasOrales_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">' + label_hojaQuirurgica_colorTegumentos_edoConsciencia + ':</td>' +
        '<td width="60%">' + hojaQuirurgica_colorTegumentos_edoConsciencia + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +

        '<td width="33%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="40%">Estado de la piel:</td>' +
        '<td width="60%">' + hojaQuirurgica_estadoPiel_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">' + label_hojaQuirurgica_afeccionesPiel_edoConsciencia + ':</td>' +
        '<td width="60%">' + hojaQuirurgica_afeccionesPiel_edoConsciencia + '</td>' +
        '</tr>' +
        /*                 '<tr style="background-color: #cadcff">' +
                        '<td width="40%">Heridas:</td>' +
                        '<td width="60%">' + hojaQuirurgica_heridas_edoConsciencia + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td width="40%">Cicatrices:</td>' +
                        '<td width="60%">' + hojaQuirurgica_cicatrices_edoConsciencia + '</td>' +
                        '</tr>' +
                        '<tr style="background-color: #cadcff">' +
                        '<td width="40%">Otros:</td>' +
                        '<td width="60%">' + hojaQuirurgica_otros2_edoConsciencia + '</td>' +
                        '</tr>' + */
        '<tr>' +
        '<td width="40%">Venoclisis:</td>' +
        '<td width="60%">' + hojaQuirurgica_venoclisis_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Sondas:</td>' +
        '<td width="60%">' + hojaQuirurgica_sondas_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Drenajes:</td>' +
        '<td width="60%">' + hojaQuirurgica_drenajes_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Consentimientos Firmados:</td>' +
        '<td width="60%">' + hojaQuirurgica_consentimientoFirmado_edoConsciencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%"></td>' +
        '<td width="60%"></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +

        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top;table-fixed;">3. SIGNOS VITALES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="8%" style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">Hora</td>' + table_SignosVitales_Hora_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">F.C.</td>' + table_SignosVitales_FreCardiaca_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">SPO<sub>2</sub></td>' + table_SignosVitales_SPO2_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">T/A mmHg</td>' + table_SignosVitales_TAMMHG_td +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">4. ANESTESIA</td>' +
        '<td width="2%"></td>' +
        '<td width="49%" style="font-size: 12px;font-weight:bold;color:#346094">5. ASEPSIA Y ANTISEPSIA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="40%">Médico anestesiólogo responsable: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_anestesiologo_anestesia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Tipo de anestesia: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_tipoAnestesia_anestesia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Hora de inicio de anestesia: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_horaInicio_anestesia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Maniobra de intubación: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_intubacion_anestesia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Número de tubo: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_numTubos_anestesia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Medicamentos de inducción: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_medicaInduccion_anestesia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Hora de término de anestesia: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_horaTermino_anestesia + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '<td width="2%"></td>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="40%">Realizó: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_realizo_asepsia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Región: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_region_asepsia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="40%">Antiséptico: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_antiseptico_asepsia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="40%">Observaciones: </td>' +
        '<td width="60%"><b>' + hojaQuirurgica_observaciones_asepsia + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA QUIRÚRGICA</b></p>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;table-layout:fixed;">' +
        '<tr>' +
        '<td width="54%" style="font-size: 12px;font-weight:bold;color:#346094">6. CIRUGÍA</td>' +
        '<td width="2%"></td>' +
        '<td width="44%" style="font-size: 12px;font-weight:bold;color:#346094">7. CONTEO DE GASAS, MATERIAL TEXTIL, INSTRUMENTAL Y PUNZOCORTANTES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="50%">Cirujano responsable: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_cirujano_cirugia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="50%">Primer ayudante: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_primerAyudante_cirugia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="50%">Segundo ayudante: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_segundoAyudante_cirugia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="50%">Instrumentista quirúrgico: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_instrumentista_cirugia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="50%">Circulante: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_circulante_cirugia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="50%">Tiempo fuera: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_tiempoFuera_cirugia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="50%">Hora de inicio de infiltración: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_horaInicioInfiltracion_cirugia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="50%">Hora de término de infiltración: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_horaTerminoInfiltracion_cirugia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="50%">Hora de inicio de cirugía: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_horaInicioCirugia_cirugia + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="50%">Hora de término de cirugía: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_horaTerminoCirugia_cirugia + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td width="50%">Cirugía realizada: </td>' +
        '<td width="50%"><b>' + hojaQuirurgica_cirugiaRealizada_cirugia + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '<td width="2%"></td>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="55%">Gasas: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_gasas_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="55%">Compresas: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_compresas_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="55%">Cotoniodes: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_cotonoides_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="55%">Isopos: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_isopos_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="55%">Agujas hipodérmicas: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_agujasHipo_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="55%">Agujas de sutura: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_agujasSutu_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="55%">Hojas de bisturí: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_hojasBisturi_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td width="55%">Instrumental: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_instrumental_materialesInstrumental + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="55%">Otros: </td>' +
        '<td width="45%">Completo: ' + hojaQuirurgica_otros_materialesInstrumental + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">8. MEDICACIÓN</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">FÁRMACO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">DOSIS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">VÍA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">ADMINISTRÓ</td>' +
        '</tr>' + table_Medicacion_EnfermeriaQuirurgica +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">9. SOLUCIONES INTRAVENOSAS</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">SOLUCIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">VOLUMEN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORA DE INICIO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">PREPARADA POR:</td>' +
        '</tr>' + table_SolsIntravenosas_EnfermeriaQuirurgica +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:60%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">10. CATÉTERES, SONDAS Y DRENAJES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TIPO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">SITIO DE INSERCIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">INSTALADO POR:</td>' +
        '</tr>' + table_CatSonDren_EnfermeriaQuirurgica +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE ENFERMERÍA QUIRÚRGICA</b></p>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">11. EQUIPO BIOMÉDICO UTILIZADO</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;height:160px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td>' + hojaQuirurgica_equipoBiomedico + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">12. IMPLANTES E INSUMOS EXTRAS</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;height:240px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr style="background-color: #cadcff;">' +
        '<td>' + hojaQuirurgica_implantesInsumos + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">13. OBSERVACIONES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;height:160px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td>' + hojaQuirurgica_observaciones + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA POST QUIRÚRGICA</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">2. DATOS GENERALES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td>Diagnóstico pre-operatorio: ' + notaPostQuirurgica_dxPreOperatorio_datosGenerales + '</td>' +
        '<td>Cirugía programada: ' + 'notaPostQuirurgica_dxPreOperatorio_datosGenerales' + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td>Diagnóstico post-operatorio: ' + notaPostQuirurgica_dxPostOperatorio_datosGenerales + '</td>' +
        '<td>Cirugía realizada: ' + 'notaPostQuirurgica_dxPostOperatorio_datosGenerales' + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="2">Anestesia aplicada: ' + notaPostQuirurgica_anestesiaAplicada_datosGenerales + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td>Médico cirujano: ' + notaPostQuirurgica_cirujano_datosGenerales + ' </td>' +
        '<td>Cédula profesional: ' + notaPostQuirurgica_cirujano_datosGenerales_cedula + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>1er ayudante: ' + notaPostQuirurgica_primerAyudante_datosGenerales + '</td>' +
        '<td>Cédula profesional: ' + notaPostQuirurgica_primerAyudante_datosGenerales_cedula + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td>2do ayudante: ' + notaPostQuirurgica_segundoAyudante_datosGenerales + '</td>' +
        '<td>Cédula profesional: ' + notaPostQuirurgica_segundoAyudante_datosGenerales_cedula + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Médico anestesiólogo: ' + notaPostQuirurgica_anestesiologo_datosGenerales + '</td>' +
        '<td>Cédula profesional: ' + notaPostQuirurgica_anestesiologo_datosGenerales_cedula + '</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td>Enf. instrumentista: ' + notaPostQuirurgica_instrumentista_datosGenerales + '</td>' +
        '<td>Cédula profesional: ' + notaPostQuirurgica_instrumentista_datosGenerales_cedula + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Enf. circulante: ' + notaPostQuirurgica_circulante_datosGenerales + '</td>' +
        '<td>Cédula profesional: ' + notaPostQuirurgica_circulante_datosGenerales_cedula + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">3. NOTA MÉDICA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;height:220px;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr style="background-color: #cadcff">' +
        '<td>' + notaPostQuirurgica_nota_notaMedica + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>INDICACIONES MÉDICAS</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">FECHA</td>' +
        '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">HORA</td>' +
        '<td width="80%" style="background-color: #346094;color:#FFFFFF;" align="center">INDICACIONES</td>' +
        '</tr>' + table_Indicaciones_IndicacionesMedicas +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE RECUPERACIÓN</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top">2. SIGNOS VITALES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="8%" style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">HORA</td>' + table_SignosVitales_Recuperacion_Hora_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">F.C.</td>' + table_SignosVitales_Recuperacion_FC_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">SPO<sub>2</sub></td>' + table_SignosVitales_Recuperacion_SPO2_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">T/A mmHg</td>' + table_SignosVitales_Recuperacion_TAMMHG_td +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">3. TERAPIA INTRAVENOSA Y SOLUCIONES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">SOLUCIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORAS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">Ml/H</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">INICIA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TERMINA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">PREPARÓ</td>' +
        '</tr>' + table_TerapiaIntravenosa_NotasRecuperacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">4. CATÉTERES, SONDAS Y DRENAJES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TIPO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">SITIO DE INSERCIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">FECHA DE INSTALACIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">INSTALADO POR:</td>' +
        '</tr>' + table_CatSonDren_NotasRecuperacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">5. MEDICACIÓN</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">FÁRMACO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">DOSIS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">VÍA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">PRESENTACIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORARIO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">ADMINISTRÓ</td>' +
        '</tr>' + table_Medicacion_NotasRecuperacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE RECUPERACIÓN</b></p>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">6. CONDICIONES DE LA HERIDA QUIRÚRGICA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td>' + notasRecuperacion_condicionesHerida + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">7. NOTAS DE ENFERMERÍA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td>' + notasRecuperacion_notasEnfermeria + '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:50%;font-size:12px;font-family:Aria,sans-serif;" border="0" cellspacing="0">' +
        '<tr>' +
        '<td width="58%" style="font-size: 13px;font-weight:bold;color:#346094;">8. EVOLUCIÓN</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center" colspan="2"><b>ESCALA DE ALDRETE</b></td>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>PUNTAJE</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>INGRESO</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>ALTA</b></td>' +
        '</tr>' + table_Evolucion_NotasRecuperacion +
        '<tr>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Evolucion_NotasRecuperacion_TotalPuntaje + '</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Evolucion_NotasRecuperacion_TotalIngreso + '</b></td>' +
        '<td style="background-color: #cadcff;border-top:1px solid #346094;" align="center"><b>' + table_Evolucion_NotasRecuperacion_TotalAlta + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:50%;font-size:12px;font-family:Aria,sans-serif;" border="0" cellspacing="0">' +
        '<tr>' +
        '<td width="58%" style="font-size: 13px;font-weight:bold;color:#346094;">9. ENFERMERÍA</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center" colspan="2"><b>RESPONSABLE DE ENFERMERÍA</b></td>' +
        '</tr>' + 'identificacionRiesgo' +
        '<tr>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;">NOMBRE</td>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;">FIRMA</td>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE HOSPITALIZACIÓN</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td widt="100%" style="font-size: 12px;font-weight:bold;color:#346094;vertical-align:top">2. SIGNOS VITALES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:7px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
        '<tr>' +
        '<td style="width:40px;background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">HORA</td>' + table_SignosVitales_Hospitalizacion_Hora_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">F.C.</td>' + table_SignosVitales_Hospitalizacion_FC_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">T.C.</td>' + table_SignosVitales_Hospitalizacion_TC_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">PRESIÓN ARTERIAL</td>' + table_SignosVitales_Hospitalizacion_TAMMHG_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF" align="center">SPO<sub>2</sub></td>' + table_SignosVitales_Hospitalizacion_SPO2_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;border-bottom:1px solid #FFFFFF;font-size:6px;" align="center">ESCALA DE DOLOR</td>' + table_SignosVitales_Hospitalizacion_EscalaDolor_td +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">F.R.</td>' + table_SignosVitales_Hospitalizacion_FR_td +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">3. MEDICAMENTOS</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">MEDICAMENTO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">DOSIS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">FRECUENCIA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">VÍA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">HORARIO</td>' +
        '</tr>' + table_Medicacion_Hospitalizacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE HOSPITALIZACIÓN</b></p>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">4. SOLUCIONES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">No.</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">SOLUCIONES/NPT/ELEMENTOS SANGUÍNEOS/ELECTROLITOS</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">DURACIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">INICIO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TÉRMINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">Ml/HORA</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">F X P</td>' +
        '</tr>' + table_Soluciones_Hospitalizacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">CATÉTERES, SONDAS Y DRENAJES</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">DISPOSITIVO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">CALIBRE</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">SITIO DE INSERCIÓN</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">FECHA DE INSTALACIÓN</td>' +
        '</tr>' + table_CatSonDren_Hospitalizacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;">' +
        '<tr>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;table-layout:fixed;" border="0" cellspacing="0">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094;">5. VALORACIÓN RIESGOS DE CAÍDAS</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>CRITERIO DE EVALUACIÓN</b></td>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>VARIABLES</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>PUNTAJE</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.M.</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.V.</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.N.</b></td>' +
        '</tr>' + table_Riesgos_Hospitalizacion +
        '<tr>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalPuntaje + '</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalTM + '</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalTV + '</b></td>' +
        '<td style="background-color: #cadcff;border-top:1px solid #346094;" align="center"><b>' + table_Riesgos_Hospitalizacion_TotalTN + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '<td width="2%"></td>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;table-layout:fixed;" border="0" cellspacing="0">' +
        '<tr>' +
        '<td width="100%" style="font-size:12px;font-weight:bold;color:#346094;">6. VALORACIÓN DE ÚLCERAS POR PRESIÓN</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>CRITERIO DE EVALUACIÓN</b></td>' +
        '<td width="30%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>VARIABLES</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>PUNTAJE</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.M.</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.V.</b></td>' +
        '<td width="20%" style="background-color: #346094;color:#FFFFFF;" align="center"><b>T.N.</b></td>' +
        '</tr>' + table_Ulceras_Hospitalizacion +
        '<tr>' +
        '<td style="border-right:1px solid #346094;border-top:1px solid #346094;"></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>TOTAL</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalPuntaje + '</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalTM + '</b></td>' +
        '<td style="background-color: #cadcff;border-right:1px solid #346094;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalTV + '</b></td>' +
        '<td style="background-color: #cadcff;border-top:1px solid #346094;" align="center"><b>' + table_Ulceras_Hospitalizacion_TotalTN + '</b></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">ESCALA DE RIESGO G.H. DOWNTOWN</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr style="background-color: #cadcff">' +
        '<td>RIESGO BAJO: 0-2 PUNTOS</td>' +
        '</tr>' +
        '<tr style="background-color: #bfdcff">' +
        '<td>RIESGO MEDIO: 3-4 PUNTOS</td>' +
        '</tr>' +
        '<tr style="background-color: #b5dcff">' +
        '<td>RIESGO ALTO: 5-9 PUNTOS</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '<td width="2%"></td>' +
        '<td width="49%">' +
        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">ESCALA DE NORTON</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr style="background-color: #cadcff">' +
        '<td>RIESGO BAJO O NINGUNO: >14 PUNTOS</td>' +
        '</tr>' +
        '<tr style="background-color: #bfdcff">' +
        '<td>RIESGO MEDIO: 13-14 PUNTOS</td>' +
        '</tr>' +
        '<tr style="background-color: #b5dcff">' +
        '<td>RIESGO ALTO: 10-12 PUNTOS</td>' +
        '</tr>' +
        '<tr style="background-color: #aadcff">' +
        '<td>RIESGO MUY ALTO: 5-9 PUNTOS</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>HOJA DE HOSPITALIZACIÓN</b></p>';

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">7. NOTAS DE ENFERMERÍA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
        '</tr>' + table_NotasEnfermeria_Hospitalizacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">8. INTERVENCIONES DE ENFERMERÍA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
        '</tr>' + table_Intervenciones_Hospitalizacion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%" style="font-size: 12px;font-weight:bold;color:#346094">RESPONSABLE DE ENFERMERÍA</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094" cellspacing="0">' +
        '<tr>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center"></td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO MATUTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO VESPERTINO</td>' +
        '<td style="background-color: #346094;color:#FFFFFF;" align="center">TURNO NOCTURNO</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center">ENFERMERA</td>' +
        '<td>TURNO MATUTINO</td>' +
        '<td>TURNO VESPERTINO</td>' +
        '<td>TURNO NOCTURNO</td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff" >' +
        '<td align="center">FIRMA</td>' +
        '<td>TURNO MATUTINO</td>' +
        '<td>TURNO VESPERTINO</td>' +
        '<td>TURNO NOCTURNO</td>' +
        '</tr>' +
        '<tr>' +
        '<td align="center">JEFE DE ENFERMERAS</td>' +
        '<td>TURNO MATUTINO</td>' +
        '<td>TURNO VESPERTINO</td>' +
        '<td>TURNO NOCTURNO</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA DE EVOLUCIÓN</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:12px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;border:2px solid #346094;table-layout:fixed;" cellspacing="0">' +
        '<tr>' +
        '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">FECHA</td>' +
        '<td width="10%" style="background-color: #346094;color:#FFFFFF;" align="center">HORA</td>' +
        '<td width="80%" style="background-color: #346094;color:#FFFFFF;" align="center"></td>' +
        '</tr>' + table_NotasEvolucion_NotaEvolucion +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';

      expediente_medicalPDF += saltoPagina();

      expediente_medicalPDF += '<p style="width:60%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>NOTA EGRESO Y ALTA</b></p>';

      // expediente_medicalPDF += encabezados_fichaIdentificacion;

      expediente_medicalPDF += '<table style="width:100%;font-size:11px;font-family:Aria,sans-serif;border:2px solid #346094;" align="center" cellspacing="0">' +
        '<tr>' +
        '<td width="25%" style="border-bottom: 1px solid #346094;">FECHA Y HORA DE EGRESO</td>' +
        '<td width="75%" style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_fechaEgreso + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom: 1px solid #346094;">SIGNOS VITALES</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>T/A Post: ' + 'he_TApost' + ' F.C. Post: ' + 'he_FCpost' + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom: 1px solid #346094;">DIAGNÓSTICO DE INGRESO</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + '' + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom: 1px solid #346094;">RESUMEN DE LA EVOLUCIÓN Y ESTADO ACTUAL</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_resumenEvolucion + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom: 1px solid #346094;">DIAGNÓSTICO DE EGRESO</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_diagnosticoEgreso + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom: 1px solid #346094;">FECHA Y HORA DE PROCEDIMIENTO REALIZADO</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + fechaCaso + ' ' + horaCaso + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="border-bottom: 1px solid #346094;">MOTIVO DE EGRESO</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_motivoEgreso + '</b></td>' +
        '</tr>' +
        '<tr style="background-color: #cadcff">' +
        '<td style="border-bottom: 1px solid #346094;">PLAN DE MANEJO, TRATAMIENTO Y RECOMENDACIONES</td>' +
        '<td style="border-bottom: 1px solid #346094;border-left: 1px solid #346094;"><b>' + egresoAlta_notaEgresoAlta_planManejo + '</b></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="">NOMBRE COMPLETO, CÉDULA Y FIRMA DEL MÉDICO</td>' +
        '<td style="border-left: 1px solid #346094;"><b>' + '' + '</b></td>' +
        '</tr>' +
        '</table>';

      if (arr_typeProcess[7] == 7) {
        expediente_medicalPDF += saltoPagina();
        //expediente_medicalPDF += consentimiento_Liposuccion;
        expediente_medicalPDF += firmas;
      } else if (arr_typeProcess[5] == 5) {
        expediente_medicalPDF += saltoPagina();
        //expediente_medicalPDF += consentimiento_MamoplastiaAumentoImplantes;
        expediente_medicalPDF += firmas;
      } else if (arr_typeProcess[49] == 49) {
        expediente_medicalPDF += saltoPagina();
        //expediente_medicalPDF += consentimiento_Rinoseptoplastia;
        expediente_medicalPDF += firmas;
      }

      expediente_medicalPDF += '</body></pdf>';
      var pdfFile = render.xmlToPdf({
        xmlString: expediente_medicalPDF
      });

      return pdfFile;


      /**
       * ************************ *
       *                          *
       * //FUNCTION: SUPPORT AREA *
       *                          *
       * ************************ *
       */

      /**
       * //FUNCTION: saltoPagina()
       * Function que retorna un string de HTML con estilo para generar un salto de página
       * y además agrega el espacio necesario para inciar la siguiente página en el sitio
       * correcto después del logo de hoja membretada
       */
      function saltoPagina() {
        var saltoPagina = '<div style="page-break-after:always;"></div>';
        // saltoPagina += '<br /><br /><br /><br />';
        saltoPagina += encabezados_fichaIdentificacion;
        return saltoPagina;
      }

      /**
       * Funcion que obtiene la imagen de fondo correspondiente a la sucursal
       * @param {int} sucursal Identificador de la sucursal
       */
      function getImageBackGround(sucursal) {
        var imageBack = '';
        if (sucursal != '22' && sucursal != '35' && sucursal != '36' && sucursal != '23' && sucursal != '24' && sucursal != '25' && sucursal != '37' && sucursal != '21' && sucursal != '26' && sucursal != '27' && sucursal != '28') {
          if (sucursal == '52' || sucursal == '57') {
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          } else {
            // imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          }
        } else {
          if (sucursal == '22') // Altavista KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '35') // Can-Cun KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '36') // Chihuahua KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '23') // Guadalajara KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '24') // Monterrey KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '25') // Polanco KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '37') // Puebla KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '21') // Santa FE KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '26') // Satelite KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '27') // Tijuana KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          if (sucursal == '28') // Veracruz KHG
            // imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20';
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
        }
        return imageBack;
      }

      // Retorna el nombre de la Sucursal sin el KHG final
      /** Funcion que crea el archivo .txt por defecto y 
       * devuelve el id asociado a la creacion de este archivo
       * 
       * @param {string} folderParent id del Folder principal de cliente
       */
      function sucursalReal(sucursalText) {
        var largoSucrusal = sucursalText.length;
        largoSucrusal = largoSucrusal - 4;
        var sucursalFinal = sucursalText.slice(0, largoSucrusal);
        return sucursalFinal;
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
       * Funcion para generar una imagen amigable al check y uncheck
       * @param {String} checks Parametro que revisa si el valor es verdadero o falso
       */
      function checado(checks) {
        var check = "";
        if (checks == true) {
          var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathCheck
          }) + '" />';
        }
        if (checks == false) {
          var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathRemove
          }) + '" />';
        }
        if (checks == "SI" || checks == "Si" || checks == "Sí") {
          var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
          var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
          check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathYes
          }) + '" />)';
          check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathNot
          }) + '" />)';
        }
        if (checks == 'NO' || checks == 'No') {
          var pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
          var pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
          check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathYes
          }) + '" />)';
          check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathNot
          }) + '" />)';
        }
        /*             if (checks != "") {
                        var pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
                        check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathCheck }) + '" />';
                    }
                    if (checks == "") {
                        var pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
                        check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({ xmlText: pathRemove }) + '" />';
                    } */
        return check;
      }

      function obtenerEnfermeroA(namesEnfermeros) {
        var cadenaEnfermeros = String(namesEnfermeros); // namesEnfermeros;
        var indiceBuscado = cadenaEnfermeros.indexOf(',');
        enfermerosFormateado = cadenaEnfermeros.substring(0, indiceBuscado);

        return enfermerosFormateado;
      }

      function obtenerEnfermeroB(namesEnfermeros) {
        var cadenaEnfermeros = String(namesEnfermeros); // namesEnfermeros;
        var indiceBuscado = cadenaEnfermeros.indexOf(',');
        var largoCadena = cadenaEnfermeros.length;
        enfermerosFormateado = cadenaEnfermeros.substring(indiceBuscado + 1, largoCadena);

        return enfermerosFormateado;
      }

      /**
       * 
       * @param {string} nameEspecialist Name of professional
       * @param {string} request c = Cedula or i = Institution
       */
      function obtenerCedula(nameEspecialist, request) {
        var cedula = '';
        var institucion = '';
        // log.debug('', typeof nameEspecialist);
        var clean_nameEspecialist = function (cadena) {
          var chars = {
            "á": "a",
            "é": "e",
            "í": "i",
            "ó": "o",
            "ú": "u",
            "à": "a",
            "è": "e",
            "ì": "i",
            "ò": "o",
            "ù": "u",
            "Á": "A",
            "É": "E",
            "Í": "I",
            "Ó": "O",
            "Ú": "U",
            "À": "A",
            "È": "E",
            "Ì": "I",
            "Ò": "O",
            "Ù": "U"
          };

          var expr = /[áàéèíìóòúù]/ig;
          var res = cadena.replace(expr, function (e) {
            return chars[e];
          });
          return res;
        };

        nameEspecialist = clean_nameEspecialist(nameEspecialist);

        if ((nameEspecialist != '') && (request === 'c' || request === 'i')) {
          var arrayNameEspecialist = nameEspecialist.split(' ');
          var arraySerchIncorrect = ['Dr.', 'DR.', 'Dra.', 'DRA.', 'Dr', 'DR', 'Dra', 'DRA', 'Enf.', 'ENF.', 'Enf', 'ENF', 'Enfermero', 'Enfermera'];

          var bandera = false;
          var arr_filters = [];

          for (var i = 0; i < arraySerchIncorrect.length; i++) {
            if (arraySerchIncorrect[i] === arrayNameEspecialist[0]) {
              bandera = true;
            }
          }

          if (bandera == true) {
            arrayNameEspecialist.shift();
            name = arrayNameEspecialist;
          } else if (bandera == false) {
            name = nameEspecialist.split(' ');
          }

          // log.debug('name', name);

          for (var key in name) {
            if (name[key] != '' || name[key] != null) {
              var filter = search.createFilter({
                name: 'entityid',
                operator: search.Operator.CONTAINS,
                values: [name[key]]
              });
              arr_filters.push(filter);
            }
          }

          try {
            searchEmployee = search.create({
              type: 'EMPLOYEE',
              title: 'searchEmployees',
              id: 'customsearch_mySearch_employees',
              columns: [{
                name: 'entityid'
              }, {
                name: 'custentity392'
              }, {
                name: 'custentity393'
              }],
              filters: arr_filters
            }).run();

            var results = searchEmployee.getRange({
              start: 0,
              end: 100
            });

            var res_stringy = JSON.stringify(results);
            var res_parse = JSON.parse(res_stringy);
            // log.debug('Res object', res_parse);

            for (var keyRes in res_parse) {
              if (res_parse[keyRes].values.custentity392 != '') {
                cedula = res_parse[keyRes].values.custentity392;
              }
              if (res_parse[keyRes].values.custentity393 != '') {
                institucion = res_parse[keyRes].values.custentity393;
              }
            }

            switch (request) {
              case 'c':
                result = cedula;
                break;
              case 'i':
                result = institucion;
                break;
              default:
                break;
            }

          } catch (error) {
            log.error('Nombre buscado catch', nameEspecialist);
            log.error('Error de busqueda/funcion obtenerCedula', error);
          }
          return result;
        } else {
          // log.debug('Nombre buscado else', nameEspecialist);
          result = '';
          return result;
        }
      }
    }

    function generateProcedureNoQx(companyId, recId, expediente) {
      log.debug("recId", recId);
      // MAIN VARS
      // Global Variables
      var values_questionsCheckbox = [];
      var values_booleans_questionsCheckbox = [];

      // Variables para crear los objetos principales
      //var recId = context.request.parameters.recId; // Variable que guarda el id del supportCase obtenido de la URL
      //var typeComps = context.request.parameters.typeComps; // Variable que guarda el tipo 
      //var expediente = context.request.parameters.exp;
      var caso = record.load({
        type: 'supportcase',
        id: recId
      }); // Variable que guarda el objeto Case
      /*       var companyId = caso.getValue({
              fieldId: 'company'
            }); // Id de cliente */
      log.debug("caso prueba", caso);
      var cliente = record.load({
        type: 'customer',
        id: companyId
      }); // Variable que guarda el objeto Customer
      var formulario = caso.getValue({
        fieldId: 'customform'
      }); // Id de formulario
      var fechaNac = caso.getText({
        fieldId: 'custevent331'
      });
      var fecha = caso.getText({
        fieldId: 'startdate'
      });
      var field_questionsCheckbox = caso.getText({
        fieldId: 'custevent1185'
      }) || '';
      var subsidiaria = caso.getValue({
        fieldId: 'subsidiary'
      });

      var field_firmaClienteBase64 = caso.getValue({
        fieldId: 'custevent269'
      }) || null;
      var field_firmaMedBase64 = caso.getValue({
        fieldId: 'custevent485'
      }) || null;
      var field_firmaTestigo1Base64 = caso.getValue({
        fieldId: 'custevent548'
      }) || null;
      var field_firmaTestigo2Base64 = caso.getValue({
        fieldId: 'custevent549'
      }) || null;

      // MANEJO DE IMAGENES
      // Imagenes Base
      var imagenRostroBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4';
      var imagenCuerpoBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030';
      var imagenCabezaBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4';
      var imagenSession = null;

      if (expediente == 'rostro') {
        imagenSession = imagenRostroBase;
      } else if (expediente == 'cuerpo') {
        imagenSession = imagenCuerpoBase;
      } else if (expediente == 'complementarios') {
        imagenSession = imagenCabezaBase;
      }

      // CUSTOMER
      // Variables Informacion General obtenidas del CLIENTE
      var sucursalId = cliente.getValue({
        fieldId: 'custentity25'
      }); //Variable que guarda el id de Sucursal del cliente
      var sucursalText = cliente.getText({
        fieldId: 'custentity25'
      }); //Variable que guarda el id de Sucursal del cliente
      var nombreCliente = cliente.getText({
        fieldId: 'altname'
      });
      var name = cliente.getText({
        fieldId: 'altname'
      });
      var numeroExpediente = cliente.getText({
        fieldId: 'entityid'
      });
      // var identificacionCliente = cliente.getText({
      //   fieldId: 'custentity251'
      // }) || '';


      var identificacionCliente = cliente.getText({
        fieldId: 'custentity234'
      }) || '';

      var telefonoCliente = cliente.getText({
        fieldId: 'mobilephone'
      }) || '';
      var direccionCliente = cliente.getText({
        fieldId: 'defaultaddress'
      }) || '';

      var edad_fechaCaso = calcYearInt(fechaNac, fecha);
      var text_aniosCliente = (edad_fechaCaso == '') ? '' : ' años';

      var cfp = cliente.getValue({
        fieldId: "custentity251"
      });
      if (cfp == "" || cfp == null) {
        cfp = "____________________";
      }

      var search_CompanyText = numeroExpediente + ' ' + nombreCliente;
      try {
        var idHistoriaClinica = null;
        var cargarBusqueda = search.load({
          id: 'customsearch6993'
        });
        cargarBusqueda.filters.push(search.createFilter({
          name: 'company',
          operator: search.Operator.IS,
          values: search_CompanyText
        }));
        cargarBusqueda.filters.push(search.createFilter({
          name: 'title',
          operator: search.Operator.CONTAINS,
          values: 'Histor'
        }));
        cargarBusqueda.run().each(function (result) {
          idHistoriaClinica = result.getValue({
            name: 'internalid'
          });
        });
        // log.debug('Id Historial Clinico', cargarBusqueda + ' Resultado ' + idHistoriaClinica);
        // VARIABLES HISTORIA CLINICA
        var historiaClinica = record.load({
          type: 'supportcase',
          id: idHistoriaClinica
        });
        general_peso = historiaClinica.getText({
          fieldId: 'custevent506'
        }) || '';
        general_talla = historiaClinica.getText({
          fieldId: 'custevent507'
        }) || '';
        general_imc = historiaClinica.getText({
          fieldId: 'custevent541'
        }) || '';
        general_imc = parseFloat(general_imc).toFixed(2);
      } catch (error) {
        log.error('Error de busqueda de historial clinico', error);
      }

      // VARIABLES DE CASE
      // Variables Mapeo EXPLORACION FISICA
      // Variables Informacion General obtenidads del Case
      var sucursalTextCaso = caso.getText({
        fieldId: 'custevent2'
      }); // Variable que guarda el nombre de la sucursal en String del case
      var fechaCaso = caso.getText({
        fieldId: 'startdate'
      }); // variable que guarda la fecha en la que se presenta el caso
      var hc_enfermeroExtraccion = caso.getText({
        fieldId: 'custevent71'
      }) || ""; // variable que guarda el enfermero de extraccion del caso
      var hc_enfermeroImplantacion = caso.getText({
        fieldId: 'custevent72'
      }) || ""; // variable que guarda el enfermero de implantacion del caso
      var medicoResponsableProcedimiento = caso.getText({
        fieldId: 'custevent28'
      }) || ""; // variable que guarda el medico responsable del caso
      var enfermerosResponsableProcedimiento = caso.getText({
        fieldId: 'custevent29'
      }) || ""; // variable que guarda el enfermeto responsable del caso

      var edoCivilCliente = caso.getText({
        fieldId: 'custevent206'
      }) || '';
      var fechNacCliente = caso.getText({
        fieldId: 'custevent331'
      });

      var sexoCliente = caso.getValue({
        fieldId: 'custevent634'
      }) || '';

      if(sexoCliente == '1' ){
        sexoCliente ="Masculino";
      } else if(sexoCliente == '2')  {
        sexoCliente ="Femenino";
      }

      // APOYOS
      //ACTION: Checkbox de cliente en firma de Consentimiento Informado de procedimientos
      try {
        values_questionsCheckbox = field_questionsCheckbox.split(',');
        for (var key1 in values_questionsCheckbox) {
          if (values_questionsCheckbox[key1] == 'true') {
            values_booleans_questionsCheckbox[key1] = true;
          } else if (values_questionsCheckbox[key1] == 'false') {
            values_booleans_questionsCheckbox[key1] = false;
          }
        }
        // log.debug('Arreglo de valores checkBox', values_questionsCheckbox);
      } catch (error) {
        log.error('Error de covnersion de cadena a arreglo', error);
      }

      // Variables obtenias desde funciones locales
      var imageBack = getImageBackGround(sucursalId); // Varible que guarda la imagen correspondiente a la sucursal
      var sucReal = sucursalReal(sucursalText); // Variable que guarda el valor formulado para obtener la Sucursal sin KHG
      var edadCliente = calcYearInt(fechNacCliente, fechaCaso);
      var consentimiento = '';
      var xmlExpediente = '';

      var etiqueta_campo_1 = '';
      var etiqueta_campo_2 = '';
      var etiqueta_campo_3 = '';
      var etiqueta_campo_4 = '';
      var etiqueta_campo_5 = '';
      var etiqueta_campo_6 = '';
      var etiqueta_campo_7 = '';
      var etiqueta_campo_8 = '';
      var etiqueta_campo_9 = '';
      var etiqueta_campo_10 = '';
      var etiqueta_campo_11 = '';
      var etiqueta_campo_12 = '';
      var etiqueta_campo_13 = '';
      var etiqueta_campo_14 = '';
      var etiqueta_campo_15 = '';
      var etiqueta_campo_16 = '';
      var etiqueta_campo_17 = '';
      var etiqueta_campo_18 = '';
      var etiqueta_campo_19 = '';
      var etiqueta_campo_20 = '';
      var etiqueta_campo_21 = '';
      var etiqueta_campo_22 = '';
      var etiqueta_campo_23 = '';
      var etiqueta_campo_24 = '';

      var arr_arr_sessions = '';
      var array_datesLimit_values = '';

      if (formulario == 33 || formulario == 147) {
        //VARIABLES: Obtencion de Etiquetas de campos Base
        //NOTE: obtención de etiquetas de campos base
        etiqueta_campo_1 = caso.getField('custevent648').label;
        etiqueta_campo_2 = caso.getField('custevent649').label;
        etiqueta_campo_3 = caso.getField('custevent650').label;
        etiqueta_campo_4 = caso.getField('custevent651').label;
        etiqueta_campo_5 = caso.getField('custevent652').label;
        etiqueta_campo_6 = caso.getField('custevent653').label;
        etiqueta_campo_7 = caso.getField('custevent654').label;
        etiqueta_campo_8 = caso.getField('custevent506').label;
        etiqueta_campo_9 = caso.getField('custevent507').label;
        etiqueta_campo_10 = caso.getField('custevent541').label;
        etiqueta_campo_11 = caso.getField('custevent636').label; // TRATAMIENTO/PROCEDIMIENTO
        etiqueta_campo_12 = caso.getField('custevent637').label; // AREA A TRATAR
        etiqueta_campo_13 = caso.getField('custevent638').label; // PRODUCTOS ADICIONALES PARA EL TRATAMIENTO
        etiqueta_campo_14 = caso.getField('custevent639').label;
        etiqueta_campo_15 = caso.getField('custevent640').label;
        etiqueta_campo_16 = caso.getField('custevent641').label;
        etiqueta_campo_17 = caso.getField('custevent642').label;
        etiqueta_campo_18 = caso.getField('custevent643').label;
        etiqueta_campo_19 = caso.getField('custevent644').label;
        etiqueta_campo_20 = caso.getField('custevent645').label;
        etiqueta_campo_21 = caso.getField('custevent646').label;
        etiqueta_campo_22 = caso.getField('custevent647').label;
        etiqueta_campo_23 = caso.getField('custevent1056').label;
        etiqueta_campo_24 = caso.getField('custevent1069').label;

        //VARIABLES: Obtencion de valores campos BackEnd
        //NOTE: Valores sesion 1
        var campo_1_sesion1 = caso.getValue('custevent648') || '';
        var campo_2_sesion1 = caso.getValue('custevent649') || '';
        var campo_3_sesion1 = caso.getValue('custevent650') || '';
        var campo_4_sesion1 = caso.getValue('custevent651') || '';
        var campo_5_sesion1 = caso.getText('custevent652') || '';
        var campo_6_sesion1 = caso.getText('custevent653') || '';
        var campo_7_sesion1 = caso.getText('custevent654') || '';
        var campo_8_sesion1 = caso.getValue('custevent506') || '';
        var campo_9_sesion1 = caso.getValue('custevent507') || '';
        var campo_10_sesion1 = caso.getValue('custevent541') || '';
        var campo_11_sesion1 = caso.getText('custevent636') || '';
        var campo_12_sesion1 = caso.getText('custevent637') || '';
        var campo_13_sesion1 = caso.getText('custevent638') || '';
        var campo_14_sesion1 = caso.getValue('custevent639') || '';
        var campo_15_sesion1 = caso.getValue('custevent640') || '';
        var campo_16_sesion1 = caso.getValue('custevent641') || '';
        var campo_17_sesion1 = caso.getValue('custevent642') || '';
        var campo_18_sesion1 = caso.getValue('custevent643') || '';
        var campo_19_sesion1 = caso.getValue('custevent644') || '';
        var campo_20_sesion1 = caso.getValue('custevent645') || '';
        var campo_21_sesion1 = caso.getValue('custevent646') || '';
        var campo_22_sesion1 = caso.getValue('custevent647') || '';
        var campo_23_sesion1 = caso.getText('custevent1056') || '';
        var campo_24_sesion1 = caso.getValue('custevent1069') || imagenSession;
        var arr_values_session_1 = [campo_1_sesion1, campo_2_sesion1, campo_3_sesion1, campo_4_sesion1, campo_5_sesion1, campo_6_sesion1, campo_7_sesion1, campo_8_sesion1, campo_9_sesion1, campo_10_sesion1, campo_11_sesion1, campo_12_sesion1, campo_13_sesion1, campo_14_sesion1, campo_15_sesion1, campo_16_sesion1, campo_17_sesion1, campo_18_sesion1, campo_19_sesion1, campo_20_sesion1, campo_21_sesion1, campo_22_sesion1, campo_23_sesion1, campo_24_sesion1];
        //NOTE: Valores sesion 2
        var campo_1_sesion2 = caso.getValue('custevent1020') || '';
        var campo_2_sesion2 = caso.getValue('custevent1038') || '';
        var campo_3_sesion2 = caso.getValue('custevent1029') || '';
        var campo_4_sesion2 = caso.getValue('custevent1047') || '';
        var campo_5_sesion2 = caso.getText('custevent867') || '';
        var campo_6_sesion2 = caso.getText('custevent876') || '';
        var campo_7_sesion2 = caso.getText('custevent858') || '';
        var campo_8_sesion2 = caso.getValue('custevent912') || '';
        var campo_9_sesion2 = caso.getValue('custevent921') || '';
        var campo_10_sesion2 = caso.getValue('custevent930') || '';
        var campo_11_sesion2 = caso.getValue('custevent885') || '';
        var campo_12_sesion2 = caso.getText('custevent894') || '';
        var campo_13_sesion2 = caso.getText('custevent903') || '';
        var campo_14_sesion2 = caso.getText('custevent939') || '';
        var campo_15_sesion2 = caso.getValue('custevent957') || '';
        var campo_16_sesion2 = caso.getValue('custevent966') || '';
        var campo_17_sesion2 = caso.getValue('custevent948') || '';
        var campo_18_sesion2 = caso.getValue('custevent975') || '';
        var campo_19_sesion2 = caso.getValue('custevent984') || '';
        var campo_20_sesion2 = caso.getValue('custevent993') || '';
        var campo_21_sesion2 = caso.getValue('custevent1002') || '';
        var campo_22_sesion2 = caso.getValue('custevent1011') || '';
        var campo_23_sesion2 = caso.getText('custevent1057') || '';
        var campo_24_sesion2 = caso.getValue('custevent1070') || imagenSession;
        var arr_values_session_2 = [campo_1_sesion2, campo_2_sesion2, campo_3_sesion2, campo_4_sesion2, campo_5_sesion2, campo_6_sesion2, campo_7_sesion2, campo_8_sesion2, campo_9_sesion2, campo_10_sesion2, campo_11_sesion2, campo_12_sesion2, campo_13_sesion2, campo_14_sesion2, campo_15_sesion2, campo_16_sesion2, campo_17_sesion2, campo_18_sesion2, campo_19_sesion2, campo_20_sesion2, campo_21_sesion2, campo_22_sesion2, campo_23_sesion2, campo_24_sesion2];
        //NOTE: Valores sesion 3
        var campo_1_sesion3 = caso.getValue('custevent1021') || '';
        var campo_2_sesion3 = caso.getValue('custevent1039') || '';
        var campo_3_sesion3 = caso.getValue('custevent1030') || '';
        var campo_4_sesion3 = caso.getValue('custevent1048') || '';
        var campo_5_sesion3 = caso.getText('custevent868') || '';
        var campo_6_sesion3 = caso.getText('custevent877') || '';
        var campo_7_sesion3 = caso.getText('custevent859') || '';
        var campo_8_sesion3 = caso.getValue('custevent913') || '';
        var campo_9_sesion3 = caso.getValue('custevent922') || '';
        var campo_10_sesion3 = caso.getValue('custevent931') || '';
        var campo_11_sesion3 = caso.getText('custevent886') || '';
        var campo_12_sesion3 = caso.getText('custevent895') || '';
        var campo_13_sesion3 = caso.getText('custevent904') || '';
        var campo_14_sesion3 = caso.getValue('custevent940') || '';
        var campo_15_sesion3 = caso.getValue('custevent958') || '';
        var campo_16_sesion3 = caso.getValue('custevent967') || '';
        var campo_17_sesion3 = caso.getValue('custevent949') || '';
        var campo_18_sesion3 = caso.getValue('custevent976') || '';
        var campo_19_sesion3 = caso.getValue('custevent985') || '';
        var campo_20_sesion3 = caso.getValue('custevent994') || '';
        var campo_21_sesion3 = caso.getValue('custevent1003') || '';
        var campo_22_sesion3 = caso.getValue('custevent1012') || '';
        var campo_23_sesion3 = caso.getText('custevent1058') || '';
        var campo_24_sesion3 = caso.getValue('custevent1071') || imagenSession;
        var arr_values_session_3 = [campo_1_sesion3, campo_2_sesion3, campo_3_sesion3, campo_4_sesion3, campo_5_sesion3, campo_6_sesion3, campo_7_sesion3, campo_8_sesion3, campo_9_sesion3, campo_10_sesion3, campo_11_sesion3, campo_12_sesion3, campo_13_sesion3, campo_14_sesion3, campo_15_sesion3, campo_16_sesion3, campo_17_sesion3, campo_18_sesion3, campo_19_sesion3, campo_20_sesion3, campo_21_sesion3, campo_22_sesion3, campo_23_sesion3, campo_24_sesion3];
        //NOTE: Valores sesion 4
        var campo_1_sesion4 = caso.getValue('custevent1022') || '';
        var campo_2_sesion4 = caso.getValue('custevent1040') || '';
        var campo_3_sesion4 = caso.getValue('custevent1031') || '';
        var campo_4_sesion4 = caso.getValue('custevent1049') || '';
        var campo_5_sesion4 = caso.getText('custevent869') || '';
        var campo_6_sesion4 = caso.getText('custevent878') || '';
        var campo_7_sesion4 = caso.getText('custevent860') || '';
        var campo_8_sesion4 = caso.getValue('custevent914') || '';
        var campo_9_sesion4 = caso.getValue('custevent923') || '';
        var campo_10_sesion4 = caso.getValue('custevent932') || '';
        var campo_11_sesion4 = caso.getText('custevent887') || '';
        var campo_12_sesion4 = caso.getText('custevent896') || '';
        var campo_13_sesion4 = caso.getText('custevent905') || '';
        var campo_14_sesion4 = caso.getValue('custevent941') || '';
        var campo_15_sesion4 = caso.getValue('custevent959') || '';
        var campo_16_sesion4 = caso.getValue('custevent968') || '';
        var campo_17_sesion4 = caso.getValue('custevent950') || '';
        var campo_18_sesion4 = caso.getValue('custevent977') || '';
        var campo_19_sesion4 = caso.getValue('custevent986') || '';
        var campo_20_sesion4 = caso.getValue('custevent995') || '';
        var campo_21_sesion4 = caso.getValue('custevent1004') || '';
        var campo_22_sesion4 = caso.getValue('custevent1013') || '';
        var campo_23_sesion4 = caso.getText('custevent1059') || '';
        var campo_24_sesion4 = caso.getValue('custevent1072') || imagenSession;
        var arr_values_session_4 = [campo_1_sesion4, campo_2_sesion4, campo_3_sesion4, campo_4_sesion4, campo_5_sesion4, campo_6_sesion4, campo_7_sesion4, campo_8_sesion4, campo_9_sesion4, campo_10_sesion4, campo_11_sesion4, campo_12_sesion4, campo_13_sesion4, campo_14_sesion4, campo_15_sesion4, campo_16_sesion4, campo_17_sesion4, campo_18_sesion4, campo_19_sesion4, campo_20_sesion4, campo_21_sesion4, campo_22_sesion4, campo_23_sesion4, campo_24_sesion4];
        //NOTE: Valores sesion 5
        var campo_1_sesion5 = caso.getValue('custevent1023') || '';
        var campo_2_sesion5 = caso.getValue('custevent1041') || '';
        var campo_3_sesion5 = caso.getValue('custevent1032') || '';
        var campo_4_sesion5 = caso.getValue('custevent1050') || '';
        var campo_5_sesion5 = caso.getText('custevent870') || '';
        var campo_6_sesion5 = caso.getText('custevent879') || '';
        var campo_7_sesion5 = caso.getText('custevent861') || '';
        var campo_8_sesion5 = caso.getValue('custevent915') || '';
        var campo_9_sesion5 = caso.getValue('custevent924') || '';
        var campo_10_sesion5 = caso.getValue('custevent933') || '';
        var campo_11_sesion5 = caso.getText('custevent888') || '';
        var campo_12_sesion5 = caso.getText('custevent897') || '';
        var campo_13_sesion5 = caso.getText('custevent906') || '';
        var campo_14_sesion5 = caso.getValue('custevent942') || '';
        var campo_15_sesion5 = caso.getValue('custevent960') || '';
        var campo_16_sesion5 = caso.getValue('custevent969') || '';
        var campo_17_sesion5 = caso.getValue('custevent951') || '';
        var campo_18_sesion5 = caso.getValue('custevent978') || '';
        var campo_19_sesion5 = caso.getValue('custevent987') || '';
        var campo_20_sesion5 = caso.getValue('custevent996') || '';
        var campo_21_sesion5 = caso.getValue('custevent1005') || '';
        var campo_22_sesion5 = caso.getValue('custevent1014') || '';
        var campo_23_sesion5 = caso.getText('custevent1060') || '';
        var campo_24_sesion5 = caso.getValue('custevent1073') || imagenSession;
        var arr_values_session_5 = [campo_1_sesion5, campo_2_sesion5, campo_3_sesion5, campo_4_sesion5, campo_5_sesion5, campo_6_sesion5, campo_7_sesion5, campo_8_sesion5, campo_9_sesion5, campo_10_sesion5, campo_11_sesion5, campo_12_sesion5, campo_13_sesion5, campo_14_sesion5, campo_15_sesion5, campo_16_sesion5, campo_17_sesion5, campo_18_sesion5, campo_19_sesion5, campo_20_sesion5, campo_21_sesion5, campo_22_sesion5, campo_23_sesion5, campo_24_sesion5];
        //NOTE: Valores sesion 6
        var campo_1_sesion6 = caso.getValue('custevent1024') || '';
        var campo_2_sesion6 = caso.getValue('custevent1042') || '';
        var campo_3_sesion6 = caso.getValue('custevent1033') || '';
        var campo_4_sesion6 = caso.getValue('custevent1051') || '';
        var campo_5_sesion6 = caso.getText('custevent871') || '';
        var campo_6_sesion6 = caso.getText('custevent880') || '';
        var campo_7_sesion6 = caso.getText('custevent862') || '';
        var campo_8_sesion6 = caso.getValue('custevent916') || '';
        var campo_9_sesion6 = caso.getValue('custevent925') || '';
        var campo_10_sesion6 = caso.getValue('custevent934') || '';
        var campo_11_sesion6 = caso.getText('custevent889') || '';
        var campo_12_sesion6 = caso.getText('custevent898') || '';
        var campo_13_sesion6 = caso.getText('custevent907') || '';
        var campo_14_sesion6 = caso.getValue('custevent943') || '';
        var campo_15_sesion6 = caso.getValue('custevent961') || '';
        var campo_16_sesion6 = caso.getValue('custevent970') || '';
        var campo_17_sesion6 = caso.getValue('custevent952') || '';
        var campo_18_sesion6 = caso.getValue('custevent979') || '';
        var campo_19_sesion6 = caso.getValue('custevent988') || '';
        var campo_20_sesion6 = caso.getValue('custevent997') || '';
        var campo_21_sesion6 = caso.getValue('custevent1006') || '';
        var campo_22_sesion6 = caso.getValue('custevent1015') || '';
        var campo_23_sesion6 = caso.getText('custevent1061') || '';
        var campo_24_sesion6 = caso.getValue('custevent1074') || imagenSession;
        var arr_values_session_6 = [campo_1_sesion6, campo_2_sesion6, campo_3_sesion6, campo_4_sesion6, campo_5_sesion6, campo_6_sesion6, campo_7_sesion6, campo_8_sesion6, campo_9_sesion6, campo_10_sesion6, campo_11_sesion6, campo_12_sesion6, campo_13_sesion6, campo_14_sesion6, campo_15_sesion6, campo_16_sesion6, campo_17_sesion6, campo_18_sesion6, campo_19_sesion6, campo_20_sesion6, campo_21_sesion6, campo_22_sesion6, campo_23_sesion6, campo_24_sesion6];
        //NOTE: Valores sesion 7
        var campo_1_sesion7 = caso.getValue('custevent1025') || '';
        var campo_2_sesion7 = caso.getValue('custevent1043') || '';
        var campo_3_sesion7 = caso.getValue('custevent1034') || '';
        var campo_4_sesion7 = caso.getValue('custevent1052') || '';
        var campo_5_sesion7 = caso.getText('custevent872') || '';
        var campo_6_sesion7 = caso.getText('custevent881') || '';
        var campo_7_sesion7 = caso.getText('custevent863') || '';
        var campo_8_sesion7 = caso.getValue('custevent917') || '';
        var campo_9_sesion7 = caso.getValue('custevent926') || '';
        var campo_10_sesion7 = caso.getValue('custevent935') || '';
        var campo_11_sesion7 = caso.getText('custevent890') || '';
        var campo_12_sesion7 = caso.getText('custevent899') || '';
        var campo_13_sesion7 = caso.getText('custevent908') || '';
        var campo_14_sesion7 = caso.getValue('custevent944') || '';
        var campo_15_sesion7 = caso.getValue('custevent962') || '';
        var campo_16_sesion7 = caso.getValue('custevent971') || '';
        var campo_17_sesion7 = caso.getValue('custevent953') || '';
        var campo_18_sesion7 = caso.getValue('custevent980') || '';
        var campo_19_sesion7 = caso.getValue('custevent989') || '';
        var campo_20_sesion7 = caso.getValue('custevent998') || '';
        var campo_21_sesion7 = caso.getValue('custevent1007') || '';
        var campo_22_sesion7 = caso.getValue('custevent1016') || '';
        var campo_23_sesion7 = caso.getText('custevent1062') || '';
        var campo_24_sesion7 = caso.getValue('custevent1075') || imagenSession;
        var arr_values_session_7 = [campo_1_sesion7, campo_2_sesion7, campo_3_sesion7, campo_4_sesion7, campo_5_sesion7, campo_6_sesion7, campo_7_sesion7, campo_8_sesion7, campo_9_sesion7, campo_10_sesion7, campo_11_sesion7, campo_12_sesion7, campo_13_sesion7, campo_14_sesion7, campo_15_sesion7, campo_16_sesion7, campo_17_sesion7, campo_18_sesion7, campo_19_sesion7, campo_20_sesion7, campo_21_sesion7, campo_22_sesion7, campo_23_sesion7, campo_24_sesion7];
        //NOTE: Valores sesion 8
        var campo_1_sesion8 = caso.getValue('custevent1026') || '';
        var campo_2_sesion8 = caso.getValue('custevent1044') || '';
        var campo_3_sesion8 = caso.getValue('custevent1035') || '';
        var campo_4_sesion8 = caso.getValue('custevent1053') || '';
        var campo_5_sesion8 = caso.getText('custevent873') || '';
        var campo_6_sesion8 = caso.getText('custevent882') || '';
        var campo_7_sesion8 = caso.getText('custevent864') || '';
        var campo_8_sesion8 = caso.getValue('custevent918') || '';
        var campo_9_sesion8 = caso.getValue('custevent927') || '';
        var campo_10_sesion8 = caso.getValue('custevent936') || '';
        var campo_11_sesion8 = caso.getText('custevent891') || '';
        var campo_12_sesion8 = caso.getText('custevent900') || '';
        var campo_13_sesion8 = caso.getText('custevent909') || '';
        var campo_14_sesion8 = caso.getValue('custevent945') || '';
        var campo_15_sesion8 = caso.getValue('custevent963') || '';
        var campo_16_sesion8 = caso.getValue('custevent972') || '';
        var campo_17_sesion8 = caso.getValue('custevent954') || '';
        var campo_18_sesion8 = caso.getValue('custevent981') || '';
        var campo_19_sesion8 = caso.getValue('custevent990') || '';
        var campo_20_sesion8 = caso.getValue('custevent999') || '';
        var campo_21_sesion8 = caso.getValue('custevent1008') || '';
        var campo_22_sesion8 = caso.getValue('custevent1017') || '';
        var campo_23_sesion8 = caso.getText('custevent1063') || '';
        var campo_24_sesion8 = caso.getValue('custevent1076') || imagenSession;
        var arr_values_session_8 = [campo_1_sesion8, campo_2_sesion8, campo_3_sesion8, campo_4_sesion8, campo_5_sesion8, campo_6_sesion8, campo_7_sesion8, campo_8_sesion8, campo_9_sesion8, campo_10_sesion8, campo_11_sesion8, campo_12_sesion8, campo_13_sesion8, campo_14_sesion8, campo_15_sesion8, campo_16_sesion8, campo_17_sesion8, campo_18_sesion8, campo_19_sesion8, campo_20_sesion8, campo_21_sesion8, campo_22_sesion8, campo_23_sesion8, campo_24_sesion8];
        //NOTE: Valores sesion 9
        var campo_1_sesion9 = caso.getValue('custevent1027') || '';
        var campo_2_sesion9 = caso.getValue('custevent1045') || '';
        var campo_3_sesion9 = caso.getValue('custevent1036') || '';
        var campo_4_sesion9 = caso.getValue('custevent1054') || '';
        var campo_5_sesion9 = caso.getText('custevent874') || '';
        var campo_6_sesion9 = caso.getText('custevent883') || '';
        var campo_7_sesion9 = caso.getText('custevent865') || '';
        var campo_8_sesion9 = caso.getValue('custevent919') || '';
        var campo_9_sesion9 = caso.getValue('custevent928') || '';
        var campo_10_sesion9 = caso.getValue('custevent937') || '';
        var campo_11_sesion9 = caso.getText('custevent892') || '';
        var campo_12_sesion9 = caso.getText('custevent901') || '';
        var campo_13_sesion9 = caso.getText('custevent910') || '';
        var campo_14_sesion9 = caso.getValue('custevent946') || '';
        var campo_15_sesion9 = caso.getValue('custevent964') || '';
        var campo_16_sesion9 = caso.getValue('custevent973') || '';
        var campo_17_sesion9 = caso.getValue('custevent955') || '';
        var campo_18_sesion9 = caso.getValue('custevent982') || '';
        var campo_19_sesion9 = caso.getValue('custevent991') || '';
        var campo_20_sesion9 = caso.getValue('custevent1000') || '';
        var campo_21_sesion9 = caso.getValue('custevent1009') || '';
        var campo_22_sesion9 = caso.getValue('custevent1018') || '';
        var campo_23_sesion9 = caso.getText('custevent1064') || '';
        var campo_24_sesion9 = caso.getValue('custevent1077') || imagenSession;
        var arr_values_session_9 = [campo_1_sesion9, campo_2_sesion9, campo_3_sesion9, campo_4_sesion9, campo_5_sesion9, campo_6_sesion9, campo_7_sesion9, campo_8_sesion9, campo_9_sesion9, campo_10_sesion9, campo_11_sesion9, campo_12_sesion9, campo_13_sesion9, campo_14_sesion9, campo_15_sesion9, campo_16_sesion9, campo_17_sesion9, campo_18_sesion9, campo_19_sesion9, campo_20_sesion9, campo_21_sesion9, campo_22_sesion9, campo_23_sesion9, campo_24_sesion9];
        //NOTE: Valores sesion 10
        var campo_1_sesion10 = caso.getValue('custevent1028') || '';
        var campo_2_sesion10 = caso.getValue('custevent1046') || '';
        var campo_3_sesion10 = caso.getValue('custevent1037') || '';
        var campo_4_sesion10 = caso.getValue('custevent1055') || '';
        var campo_5_sesion10 = caso.getText('custevent875') || '';
        var campo_6_sesion10 = caso.getText('custevent884') || '';
        var campo_7_sesion10 = caso.getText('custevent866') || '';
        var campo_8_sesion10 = caso.getValue('custevent920') || '';
        var campo_9_sesion10 = caso.getValue('custevent929') || '';
        var campo_10_sesion10 = caso.getValue('custevent938') || '';
        var campo_11_sesion10 = caso.getText('custevent893') || '';
        var campo_12_sesion10 = caso.getText('custevent902') || '';
        var campo_13_sesion10 = caso.getText('custevent911') || '';
        var campo_14_sesion10 = caso.getValue('custevent947') || '';
        var campo_15_sesion10 = caso.getValue('custevent965') || '';
        var campo_16_sesion10 = caso.getValue('custevent974') || '';
        var campo_17_sesion10 = caso.getValue('custevent956') || '';
        var campo_18_sesion10 = caso.getValue('custevent983') || '';
        var campo_19_sesion10 = caso.getValue('custevent992') || '';
        var campo_20_sesion10 = caso.getValue('custevent1001') || '';
        var campo_21_sesion10 = caso.getValue('custevent1010') || '';
        var campo_22_sesion10 = caso.getValue('custevent1019') || '';
        var campo_23_sesion10 = caso.getText('custevent1065') || '';
        var campo_24_sesion10 = caso.getValue('custevent1078') || imagenSession;
        var arr_values_session_10 = [campo_1_sesion10, campo_2_sesion10, campo_3_sesion10, campo_4_sesion10, campo_5_sesion10, campo_6_sesion10, campo_7_sesion10, campo_8_sesion10, campo_9_sesion10, campo_10_sesion10, campo_11_sesion10, campo_12_sesion10, campo_13_sesion10, campo_14_sesion10, campo_15_sesion10, campo_16_sesion10, campo_17_sesion10, campo_18_sesion10, campo_19_sesion10, campo_20_sesion10, campo_21_sesion10, campo_22_sesion10, campo_23_sesion10, campo_24_sesion10];

        //NOTE: Arreglo de los arreglos de sesiones
        arr_arr_sessions = [arr_values_session_1, arr_values_session_2, arr_values_session_3, arr_values_session_4, arr_values_session_5, arr_values_session_6, arr_values_session_7, arr_values_session_8, arr_values_session_9, arr_values_session_10];

        //NOTE: Arreglo de los campos que contienen la fecha de la sesion
        array_datesLimit_values = [campo_23_sesion1, campo_23_sesion2, campo_23_sesion3, campo_23_sesion4, campo_23_sesion5, campo_23_sesion6, campo_23_sesion7, campo_23_sesion8, campo_23_sesion9, campo_23_sesion10];
      }

      if (formulario == 151) {
        //VARIABLES: Obtencion de Etiquetas de campos Base
        //NOTE: obtención de etiquetas de campos base
        etiqueta_campo_1 = caso.getField('custevent1079').label;
        etiqueta_campo_2 = caso.getField('custevent1056').label;
        etiqueta_campo_3 = caso.getField('custevent1080').label;
        etiqueta_campo_4 = caso.getField('custevent1090').label;
        etiqueta_campo_5 = caso.getField('custevent1100').label;
        etiqueta_campo_6 = caso.getField('custevent1110').label;
        etiqueta_campo_7 = caso.getField('custevent1120').label;
        etiqueta_campo_8 = caso.getField('custevent1130').label;
        etiqueta_campo_9 = caso.getField('custevent1140').label;
        etiqueta_campo_10 = caso.getField('custevent1150').label;
        etiqueta_campo_11 = caso.getField('custevent1160').label;
        etiqueta_campo_12 = caso.getField('custevent1170').label;
        etiqueta_campo_13 = caso.getField('custevent650').label;
        etiqueta_campo_14 = caso.getField('custevent649').label;
        etiqueta_campo_15 = caso.getField('custevent651').label;
        etiqueta_campo_16 = caso.getField('custevent1069').label;
        //VARIABLES: Obtencion de valores campos BackEnd
        //NOTE: Valores complementarios 1
        var campo_1_complementarios1 = caso.getText('custevent1079') || '';
        var campo_2_complementarios1 = caso.getText('custevent1056') || '';
        var campo_3_complementarios1 = caso.getValue('custevent1080') || '';
        var campo_4_complementarios1 = caso.getValue('custevent1090') || '';
        var campo_5_complementarios1 = caso.getText('custevent1100') || '';
        var campo_6_complementarios1 = caso.getText('custevent1110') || '';
        var campo_7_complementarios1 = caso.getText('custevent1120') || '';
        var campo_8_complementarios1 = caso.getText('custevent1130') || '';
        var campo_9_complementarios1 = caso.getText('custevent1140') || '';
        var campo_10_complementarios1 = caso.getText('custevent1150') || '';
        var campo_11_complementarios1 = caso.getText('custevent1160') || '';
        var campo_12_complementarios1 = caso.getText('custevent1170') || '';
        var campo_13_complementarios1 = caso.getText('custevent650') || '';
        var campo_14_complementarios1 = caso.getText('custevent649') || '';
        var campo_15_complementarios1 = caso.getText('custevent651') || '';
        var campo_16_complementarios1 = caso.getText('custevent1069') || imagenSession;
        var arr_values_complementarios_1 = [campo_1_complementarios1, campo_2_complementarios1, campo_3_complementarios1, campo_4_complementarios1, campo_5_complementarios1, campo_6_complementarios1, campo_7_complementarios1, campo_8_complementarios1, campo_9_complementarios1, campo_10_complementarios1, campo_11_complementarios1, campo_12_complementarios1, campo_13_complementarios1, campo_14_complementarios1, campo_15_complementarios1, campo_16_complementarios1];
        //NOTE: Valores complementarios 2
        var campo_1_complementarios2 = caso.getText('custevent1079') || '';
        var campo_2_complementarios2 = caso.getText('custevent1057') || '';
        var campo_3_complementarios2 = caso.getValue('custevent1081') || '';
        var campo_4_complementarios2 = caso.getValue('custevent1091') || '';
        var campo_5_complementarios2 = caso.getText('custevent1101') || '';
        var campo_6_complementarios2 = caso.getText('custevent1111') || '';
        var campo_7_complementarios2 = caso.getText('custevent1121') || '';
        var campo_8_complementarios2 = caso.getText('custevent1131') || '';
        var campo_9_complementarios2 = caso.getText('custevent1141') || '';
        var campo_10_complementarios2 = caso.getText('custevent1151') || '';
        var campo_11_complementarios2 = caso.getText('custevent1161') || '';
        var campo_12_complementarios2 = caso.getText('custevent1171') || '';
        var campo_13_complementarios2 = caso.getText('custevent1029') || '';
        var campo_14_complementarios2 = caso.getText('custevent1038') || '';
        var campo_15_complementarios2 = caso.getText('custevent1047') || '';
        var campo_16_complementarios2 = caso.getText('custevent1070') || imagenSession;
        var arr_values_complementarios_2 = [campo_1_complementarios2, campo_2_complementarios2, campo_3_complementarios2, campo_4_complementarios2, campo_5_complementarios2, campo_6_complementarios2, campo_7_complementarios2, campo_8_complementarios2, campo_9_complementarios2, campo_10_complementarios2, campo_11_complementarios2, campo_12_complementarios2, campo_13_complementarios2, campo_14_complementarios2, campo_15_complementarios2, campo_16_complementarios2];
        //NOTE: Valores complementarios 3
        var campo_1_complementarios3 = caso.getText('custevent1079') || '';
        var campo_2_complementarios3 = caso.getText('custevent1058') || '';
        var campo_3_complementarios3 = caso.getValue('custevent1082') || '';
        var campo_4_complementarios3 = caso.getValue('custevent1092') || '';
        var campo_5_complementarios3 = caso.getText('custevent1102') || '';
        var campo_6_complementarios3 = caso.getText('custevent1112') || '';
        var campo_7_complementarios3 = caso.getText('custevent1122') || '';
        var campo_8_complementarios3 = caso.getText('custevent1132') || '';
        var campo_9_complementarios3 = caso.getText('custevent1142') || '';
        var campo_10_complementarios3 = caso.getText('custevent1152') || '';
        var campo_11_complementarios3 = caso.getText('custevent1162') || '';
        var campo_12_complementarios3 = caso.getText('custevent1172') || '';
        var campo_13_complementarios3 = caso.getText('custevent1030') || '';
        var campo_14_complementarios3 = caso.getText('custevent1039') || '';
        var campo_15_complementarios3 = caso.getText('custevent1048') || '';
        var campo_16_complementarios3 = caso.getText('custevent1071') || imagenSession;
        var arr_values_complementarios_3 = [campo_1_complementarios3, campo_2_complementarios3, campo_3_complementarios3, campo_4_complementarios3, campo_5_complementarios3, campo_6_complementarios3, campo_7_complementarios3, campo_8_complementarios3, campo_9_complementarios3, campo_10_complementarios3, campo_11_complementarios3, campo_12_complementarios3, campo_13_complementarios3, campo_14_complementarios3, campo_15_complementarios3, campo_16_complementarios3];
        //NOTE: Valores complementarios 4
        var campo_1_complementarios4 = caso.getText('custevent1079') || '';
        var campo_2_complementarios4 = caso.getText('custevent1059') || '';
        var campo_3_complementarios4 = caso.getValue('custevent1083') || '';
        var campo_4_complementarios4 = caso.getValue('custevent1093') || '';
        var campo_5_complementarios4 = caso.getText('custevent1103') || '';
        var campo_6_complementarios4 = caso.getText('custevent1113') || '';
        var campo_7_complementarios4 = caso.getText('custevent1123') || '';
        var campo_8_complementarios4 = caso.getText('custevent1133') || '';
        var campo_9_complementarios4 = caso.getText('custevent1143') || '';
        var campo_10_complementarios4 = caso.getText('custevent1153') || '';
        var campo_11_complementarios4 = caso.getText('custevent1163') || '';
        var campo_12_complementarios4 = caso.getText('custevent1173') || '';
        var campo_13_complementarios4 = caso.getText('custevent1031') || '';
        var campo_14_complementarios4 = caso.getText('custevent1040') || '';
        var campo_15_complementarios4 = caso.getText('custevent1049') || '';
        var campo_16_complementarios4 = caso.getText('custevent1072') || imagenSession;
        var arr_values_complementarios_4 = [campo_1_complementarios4, campo_2_complementarios4, campo_3_complementarios4, campo_4_complementarios4, campo_5_complementarios4, campo_6_complementarios4, campo_7_complementarios4, campo_8_complementarios4, campo_9_complementarios4, campo_10_complementarios4, campo_11_complementarios4, campo_12_complementarios4, campo_13_complementarios4, campo_14_complementarios4, campo_15_complementarios4, campo_16_complementarios4];
        //NOTE: Valores complementarios 5
        var campo_1_complementarios5 = caso.getText('custevent1079') || '';
        var campo_2_complementarios5 = caso.getText('custevent1060') || '';
        var campo_3_complementarios5 = caso.getValue('custevent1084') || '';
        var campo_4_complementarios5 = caso.getValue('custevent1094') || '';
        var campo_5_complementarios5 = caso.getText('custevent1104') || '';
        var campo_6_complementarios5 = caso.getText('custevent1114') || '';
        var campo_7_complementarios5 = caso.getText('custevent1124') || '';
        var campo_8_complementarios5 = caso.getText('custevent1134') || '';
        var campo_9_complementarios5 = caso.getText('custevent1144') || '';
        var campo_10_complementarios5 = caso.getText('custevent1154') || '';
        var campo_11_complementarios5 = caso.getText('custevent1164') || '';
        var campo_12_complementarios5 = caso.getText('custevent1174') || '';
        var campo_13_complementarios5 = caso.getText('custevent1032') || '';
        var campo_14_complementarios5 = caso.getText('custevent1041') || '';
        var campo_15_complementarios5 = caso.getText('custevent1050') || '';
        var campo_16_complementarios5 = caso.getText('custevent1073') || imagenSession;
        var arr_values_complementarios_5 = [campo_1_complementarios5, campo_2_complementarios5, campo_3_complementarios5, campo_4_complementarios5, campo_5_complementarios5, campo_6_complementarios5, campo_7_complementarios5, campo_8_complementarios5, campo_9_complementarios5, campo_10_complementarios5, campo_11_complementarios5, campo_12_complementarios5, campo_13_complementarios5, campo_14_complementarios5, campo_15_complementarios5, campo_16_complementarios5];
        //NOTE: Valores complementarios 6
        var campo_1_complementarios6 = caso.getText('custevent1079') || '';
        var campo_2_complementarios6 = caso.getText('custevent1061') || '';
        var campo_3_complementarios6 = caso.getValue('custevent1085') || '';
        var campo_4_complementarios6 = caso.getValue('custevent1095') || '';
        var campo_5_complementarios6 = caso.getText('custevent1105') || '';
        var campo_6_complementarios6 = caso.getText('custevent1115') || '';
        var campo_7_complementarios6 = caso.getText('custevent1125') || '';
        var campo_8_complementarios6 = caso.getText('custevent1135') || '';
        var campo_9_complementarios6 = caso.getText('custevent1145') || '';
        var campo_10_complementarios6 = caso.getText('custevent1155') || '';
        var campo_11_complementarios6 = caso.getText('custevent1165') || '';
        var campo_12_complementarios6 = caso.getText('custevent1175') || '';
        var campo_13_complementarios6 = caso.getText('custevent1033') || '';
        var campo_14_complementarios6 = caso.getText('custevent1042') || '';
        var campo_15_complementarios6 = caso.getText('custevent1051') || '';
        var campo_16_complementarios6 = caso.getText('custevent1074') || imagenSession;
        var arr_values_complementarios_6 = [campo_1_complementarios6, campo_2_complementarios6, campo_3_complementarios6, campo_4_complementarios6, campo_5_complementarios6, campo_6_complementarios6, campo_7_complementarios6, campo_8_complementarios6, campo_9_complementarios6, campo_10_complementarios6, campo_11_complementarios6, campo_12_complementarios6, campo_13_complementarios6, campo_14_complementarios6, campo_15_complementarios6, campo_16_complementarios6];
        //NOTE: Valores complementarios 7
        var campo_1_complementarios7 = caso.getText('custevent1079') || '';
        var campo_2_complementarios7 = caso.getText('custevent1062') || '';
        var campo_3_complementarios7 = caso.getValue('custevent1086') || '';
        var campo_4_complementarios7 = caso.getValue('custevent1096') || '';
        var campo_5_complementarios7 = caso.getText('custevent1106') || '';
        var campo_6_complementarios7 = caso.getText('custevent1116') || '';
        var campo_7_complementarios7 = caso.getText('custevent1126') || '';
        var campo_8_complementarios7 = caso.getText('custevent1136') || '';
        var campo_9_complementarios7 = caso.getText('custevent1146') || '';
        var campo_10_complementarios7 = caso.getText('custevent1156') || '';
        var campo_11_complementarios7 = caso.getText('custevent1166') || '';
        var campo_12_complementarios7 = caso.getText('custevent1176') || '';
        var campo_13_complementarios7 = caso.getText('custevent1034') || '';
        var campo_14_complementarios7 = caso.getText('custevent1043') || '';
        var campo_15_complementarios7 = caso.getText('custevent1052') || '';
        var campo_16_complementarios7 = caso.getText('custevent1075') || imagenSession;
        var arr_values_complementarios_7 = [campo_1_complementarios7, campo_2_complementarios7, campo_3_complementarios7, campo_4_complementarios7, campo_5_complementarios7, campo_6_complementarios7, campo_7_complementarios7, campo_8_complementarios7, campo_9_complementarios7, campo_10_complementarios7, campo_11_complementarios7, campo_12_complementarios7, campo_13_complementarios7, campo_14_complementarios7, campo_15_complementarios7, campo_16_complementarios7];
        //NOTE: Valores complementarios 8
        var campo_1_complementarios8 = caso.getText('custevent1079') || '';
        var campo_2_complementarios8 = caso.getText('custevent1063') || '';
        var campo_3_complementarios8 = caso.getValue('custevent1087') || '';
        var campo_4_complementarios8 = caso.getValue('custevent1097') || '';
        var campo_5_complementarios8 = caso.getText('custevent1107') || '';
        var campo_6_complementarios8 = caso.getText('custevent1117') || '';
        var campo_7_complementarios8 = caso.getText('custevent1127') || '';
        var campo_8_complementarios8 = caso.getText('custevent1137') || '';
        var campo_9_complementarios8 = caso.getText('custevent1147') || '';
        var campo_10_complementarios8 = caso.getText('custevent1157') || '';
        var campo_11_complementarios8 = caso.getText('custevent1167') || '';
        var campo_12_complementarios8 = caso.getText('custevent1177') || '';
        var campo_13_complementarios8 = caso.getText('custevent1035') || '';
        var campo_14_complementarios8 = caso.getText('custevent1044') || '';
        var campo_15_complementarios8 = caso.getText('custevent1053') || '';
        var campo_16_complementarios8 = caso.getText('custevent1076') || imagenSession;
        var arr_values_complementarios_8 = [campo_1_complementarios8, campo_2_complementarios8, campo_3_complementarios8, campo_4_complementarios8, campo_5_complementarios8, campo_6_complementarios8, campo_7_complementarios8, campo_8_complementarios8, campo_9_complementarios8, campo_10_complementarios8, campo_11_complementarios8, campo_12_complementarios8, campo_13_complementarios8, campo_14_complementarios8, campo_15_complementarios8, campo_16_complementarios8];
        //NOTE: Valores complementarios 9
        var campo_1_complementarios9 = caso.getText('custevent1079') || '';
        var campo_2_complementarios9 = caso.getText('custevent1064') || '';
        var campo_3_complementarios9 = caso.getValue('custevent1088') || '';
        var campo_4_complementarios9 = caso.getValue('custevent1098') || '';
        var campo_5_complementarios9 = caso.getText('custevent1108') || '';
        var campo_6_complementarios9 = caso.getText('custevent1118') || '';
        var campo_7_complementarios9 = caso.getText('custevent1128') || '';
        var campo_8_complementarios9 = caso.getText('custevent1138') || '';
        var campo_9_complementarios9 = caso.getText('custevent1148') || '';
        var campo_10_complementarios9 = caso.getText('custevent1158') || '';
        var campo_11_complementarios9 = caso.getText('custevent1168') || '';
        var campo_12_complementarios9 = caso.getText('custevent1178') || '';
        var campo_13_complementarios9 = caso.getText('custevent1036') || '';
        var campo_14_complementarios9 = caso.getText('custevent1045') || '';
        var campo_15_complementarios9 = caso.getText('custevent1054') || '';
        var campo_16_complementarios9 = caso.getText('custevent1077') || imagenSession;
        var arr_values_complementarios_9 = [campo_1_complementarios9, campo_2_complementarios9, campo_3_complementarios9, campo_4_complementarios9, campo_5_complementarios9, campo_6_complementarios9, campo_7_complementarios9, campo_8_complementarios9, campo_9_complementarios9, campo_10_complementarios9, campo_11_complementarios9, campo_12_complementarios9, campo_13_complementarios9, campo_14_complementarios9, campo_15_complementarios9, campo_16_complementarios9];
        //NOTE: Valores complementarios 10
        var campo_1_complementarios10 = caso.getText('custevent1079') || '';
        var campo_2_complementarios10 = caso.getText('custevent1065') || '';
        var campo_3_complementarios10 = caso.getValue('custevent1089') || '';
        var campo_4_complementarios10 = caso.getValue('custevent1099') || '';
        var campo_5_complementarios10 = caso.getText('custevent1109') || '';
        var campo_6_complementarios10 = caso.getText('custevent1119') || '';
        var campo_7_complementarios10 = caso.getText('custevent1129') || '';
        var campo_8_complementarios10 = caso.getText('custevent1139') || '';
        var campo_9_complementarios10 = caso.getText('custevent1149') || '';
        var campo_10_complementarios10 = caso.getText('custevent1159') || '';
        var campo_11_complementarios10 = caso.getText('custevent1169') || '';
        var campo_12_complementarios10 = caso.getText('custevent1179') || '';
        var campo_13_complementarios10 = caso.getText('custevent1037') || '';
        var campo_14_complementarios10 = caso.getText('custevent1046') || '';
        var campo_15_complementarios10 = caso.getText('custevent1055') || '';
        var campo_16_complementarios10 = caso.getText('custevent1078') || imagenSession;
        var arr_values_complementarios_10 = [campo_1_complementarios10, campo_2_complementarios10, campo_3_complementarios10, campo_4_complementarios10, campo_5_complementarios10, campo_6_complementarios10, campo_7_complementarios10, campo_8_complementarios10, campo_9_complementarios10, campo_10_complementarios10, campo_11_complementarios10, campo_12_complementarios10, campo_13_complementarios10, campo_14_complementarios10, campo_15_complementarios10, campo_16_complementarios10];

        //NOTE: Arreglo de los arreglos de complementarioses
        arr_arr_sessions = [arr_values_complementarios_1, arr_values_complementarios_2, arr_values_complementarios_3, arr_values_complementarios_4, arr_values_complementarios_5, arr_values_complementarios_6, arr_values_complementarios_7, arr_values_complementarios_8, arr_values_complementarios_9, arr_values_complementarios_10];

        //NOTE: Arreglo de los campos que contienen la fecha de la complementarios
        array_datesLimit_values = [campo_2_complementarios1, campo_2_complementarios2, campo_2_complementarios3, campo_2_complementarios4, campo_2_complementarios5, campo_2_complementarios6, campo_2_complementarios7, campo_2_complementarios8, campo_2_complementarios9, campo_2_complementarios10];
      }

      // ZONA DE ENCABEZADOS
      // FICHA DE IDENTIFICACION
      var encabezados_fichaIdentificacion = '<table style="margin-left:150px;width:100%;font-size:11px;font-family:Aria,sans-serif;">' +
        '<tr>' +
        '<td style="font-size: 13px;font-weight:bold;color: #346094;">FICHA DE IDENTIFICACIÓN</td>' +
        '</tr>' +
        '<tr>' +
        '<td width="100%">' +
        '<table style="width:100%;font-size:10px;font-family:Aria,sans-serif;">' +
        '<tr><td><b>NO. DE EXPEDIENTE: </b> ' + numeroExpediente + '</td><td><b>GÉNERO: </b> ' + sexoCliente + '</td></tr>' +
        '<tr><td><b>NOMBRE: </b> ' + nombreCliente + '</td><td><b>CURP: </b> ' + identificacionCliente + '</td></tr>' +
        '<tr><td><b>EDAD: </b> ' + edadCliente + '</td><td><b>TELÉFONO: </b> ' + telefonoCliente + '</td></tr>' +
        '<tr><td><b>FECHA DE NACIMIENTO: </b> ' + fechNacCliente + '</td><td><b>SUCURSAL: </b> ' + sucReal + '</td></tr>' +
        '<tr><td width="60%"><b>DIRECCIÓN: </b> ' + direccionCliente + '</td><td width="40%"><b>ESTADO CIVIL: </b>' + edoCivilCliente + '</td></tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>';


      /*       if (typeComps == '8') {
              consentimiento = '<p style="width:80%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO APLICACIÓN EXTRACTOS PROTEICOS AVANZADOS DERIVADOS DE ADIPOCITOS (APPE°)</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme a la <b>aplicación de extractos proteicos avanzados DERIVADOS DE ADIPOCITOS (AAPE<sup>TM</sup>)</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido informado, que en atención a la composición y tipos de reacción de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas al producto AAPETM (Extractos Proteicos Avanzados derivados de adipocitos) los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿En qué consiste el procedimiento?</b><br /> Por sus siglas en inglés significa extractos proteicos avanzados derivados de adipocitos, se administra de manera tópica en pequeñas dosis mediante la realización de un número variable de pequeños pinchazos en la piel (vía intradérmica), esta técnica consigue aumentar el efecto de los productos administrados por lo que las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">El número de sesiones y la frecuencia de aplicación de las mismas es variable en función de la patología de tratar y de cada paciente por lo que no puede ser determinado de antemano. Los resultados se obtienen con mayor efectividad si el tratamiento realizado se complementa con otros tratamientos que potenciarán sus efectos, por ese motivo es importante que usted atienda a su Consulta de Valoración previamente.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b><br /> Las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente, por ejemplo rojez, inflamación y reacción alérgica.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">La posibilidad de hematomas es un riesgo frecuente que depende también de la toma de ciertos medicamentos por parte del paciente (e.g. aspirina y otros anticoagulantes), por tal motivo es mi deber informar al médico sobre la toma de cualquier medicación antes de ser sometido al procedimiento.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Enrojecimiento alrededor de los pinchazos que normalmente pueden tardar unas horas o pocos días en desaparecer. Sensación de incomodidad dependiendo de la zona a tratar y de la sensibilidad personal.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> La aplicación directa de los extractos proteicos avanzados puede ayudar a estimular la reparación, revitalización de la piel y el cabello.</p>' +
                '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="60" height="60" /></p>' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
              consentimiento += saltoPagina();
              consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                '<ul style="list-style-type: square;">' +
                '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                '</table>';
            } else if (typeComps == '7') {
              consentimiento = '<p style="width:80%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PARA INSTALACIÓN DE PRÓTESIS CAPILAR PHP</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de instalación de prótesis capilar PHP</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b> Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reacciones alérgicas. </b> Durante la aplicación y el mantenimiento es necesaria la aplicación de ciertos productos químicos de manera tópica para poder ejecutar el procedimiento que son necesarios. sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados productos y químicos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Secuelas, signos y síntomas indeseables. </b> Al finalizar el procedimiento es posible que se generen molestias al realizar expresiones muy marcadas, es decir al sonreír, fruncir el ceño o al realizar gestos de asombro o enojo lo que no  considerada de gravedad. Es posible que exista comezón, ardor o irritación de la piel cabelluda por lo que se le sugiere acudir de inmediato la unidad médica donde se realizó la instalación o el mantenimiento.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfactorios. </b> Existe la posibilidad de que la prótesis capilar llegue a despegarse de alguna parte incluso siguiendo las indicaciones y recomendaciones que el personal le hace al terminar su aplicación o mantenimiento, esto se debe a factores intrínsecos y extrínsecos  que dependen directamente de la sudoración, actividad física, ritmo de vida, humedad del medio, temperatura, enfermedades de la piel cabelluda y accidentes o incidentes directos en la prótesis.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo entiendo  que no es posible asegurar o garantizar un resultado exacto, ya que dicho resultado puede variar en razón de factores como cuidados del propio paciente, condiciones externas incluyendo factores fortuitos relacionados con la idiosincrasia propia de cada paciente.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> Visualización inmediata y abrupta de la densidad capilar de la zona a instalar (previamente valorada) dando una pronta e inmediata solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de densidad proyectada en la valoración y preferencias de la prótesis capilar obtenida).</p>' +
                '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="60" height="60" /></p>' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
              consentimiento += saltoPagina();
              consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                '<ul style="list-style-type: square;">' +
                '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Por el presente documento, autorizo al equipo médico, los auxiliares médicos, técnicos y personal  de Kaloni Holding Group, S.C., a realizar el procedimiento de instalación /mantenimiento de la prótesis capilar PHP</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' He sido también informado(a) que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la legislación Mexicana aplicable.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de la zona con fines clínicos.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                '</table>';
            } else if (typeComps == '6') {
              consentimiento = '<p style="width:80%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MESOTERAPIA</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>tratamiento con Mesoterapia capilar</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido informado, que en atención a la composición y tipos de reacción de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas a medicamentos y proteínas utilizadas durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Es mi deber informar al médico sobre la toma de cualquier medicación antes de ser sometido al procedimiento.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿En qué consiste el procedimiento?.</b><br /> El tratamiento con Mesoterapia o intradermoterapia consiste en la administración de pequeñas dosis de fármacos, multivitamínicos, aminoácidos y factores de crecimiento autólogos o derivados de  células madre, mediante la realización de un número variable de inyecciones en la piel cabelluda vía intradérmica o con micro punciones, esta técnica consigue aumentar el efecto de los productos administrados por lo que las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">El número de sesiones y la frecuencia de aplicación de las mismas es variable en función del tratamiento a seguir de cada paciente por lo que no puede ser determinado de antemano. Los resultados se obtienen con mayor efectividad si el tratamiento realizado se complementa con otros tratamientos que potenciarán sus efectos, por ese motivo es importante que usted atienda a su Consulta de Valoración previamente.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS. </b><br /> <ul style="list-style-type: square;">' +
                '<li>Existe una posibilidad, aunque mínima, de que aparezca vitíligo, una pigmentación en la zona de tratamiento sobre todo si hay exposición solar o a lámparas UV después del mismo.</li>' +
                '<li>Existe la posibilidad de generar atrofia de la piel cabelluda debida a la idiosincrasia de cada paciente por la interacción de alguno o varios componentes de las fórmulas administradas.</li>' +
                '<li>También es posible la aparición  de hematomas, es un riesgo frecuente que depende también del consumo o la utilización de ciertos medicamentos por parte del paciente (por ejemplo el uso de ácido acetil salicílico y otros anticoagulantes). </li>' +
                '<li>Enrojecimiento en el área de la aplicación o de micropunción que normalmente pueden tardar unas horas o pocos días en desaparecer.</li>' +
                '<li>Sensación de comezón, ardor leve, dolor de cabeza  dependiendo de la zona a tratar y por la idiosincrasia de cada persona.</li>' +
                '<li>Puede existir el riesgo de presentar complicaciones causadas por alergias causadas por uno o varios de los componentes de las fórmulas, multivitamínicos o aminoácidos utilizados.</li></ul></p>' +
                '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="50" height="50" /></p>' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
              consentimiento += saltoPagina();
              consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><ul style="list-style-type: square;">' +
                '<li>Hasta pasados 3-4 días de realizado el procedimiento no debe acudir a saunas o piscinas para evitar la contaminación de los puntos de puntura.</li>' +
                '<li>La técnica debe usarse con precaución durante el embarazo.</li></ul></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS. </b><br /> <ul style="list-style-type: square;"><li>La aplicación directa de este tratamiento puede ayudar a estimular la reparación, el crecimiento y la revitalización del cabello y la piel cabelluda.</li>' +
                '<li>Puede prevenir el proceso de calvicie en alopecias no cicatrizales.</li>' +
                '<li>Puede mejorar el crecimiento del cabello así como la disminución en el proceso de caída.</li>' +
                '<li>Favorece el equilibrio en las fases de recambio y el recambio folicular.</li>' +
                '<li>Puede mejorar la estructura capilar del cabello y su engrosamiento en la piel cabelluda tratada.</li></ul></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                '<ul style="list-style-type: square;">' +
                '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="60" height="60" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                '</table>';
            } else {
              consentimiento = '<p style="width:60%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">EDAD: <b>' + edad_fechaCaso + ' ' + text_aniosCliente + '</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al procedimiento de injerto de cabello en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b>  Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Sangrado.</b> Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Infección.</b> A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente en la piel cabelluda tanto de zona donante como en zona a implantar. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Asimetría.</b> La cara humana es normalmente asimétrica por lo que puede haber variaciones entre un lado y otro tras un procedimiento de trasplante capilar.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reacciones alérgicas.</b>  Durante el procedimiento es necesaria la administración de ciertos medicamentos para poder ejecutar el procedimiento como es en la anestesia que se inyecta localmente en el área a tratar, también se requieren de analgésicos y otros medicamentos que son necesarios para mantener estable al paciente, sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados fármacos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Secuelas, signos y síntomas indeseables.</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfactorios.</b> El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos y de la dermis. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Retraso en la cicatrización.</b> Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +
                '<p style="align:center"><img src="' + field_firmaClienteBase64 + '" width="100" height="100" /></p>' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + name + '</b></p>';
              consentimiento += saltoPagina();
              consentimiento += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> Recuperación y restauración de la densidad capilar en la zona a implantar, solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b>' +
                '<ul style="list-style-type: square;">' +
                '<li>' + checado(values_booleans_questionsCheckbox[0]) + ' Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[1]) + ' Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[2]) + ' Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[3]) + ' Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[4]) + ' Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
                '<li>' + checado(values_booleans_questionsCheckbox[5]) + ' Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +
                '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +
                "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">" +
                '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaClienteBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedBase64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
                '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo1Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo2Base64 + '" width="80" height="80" /><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
                '</table>';
            } */

      if (expediente == 'rostro') {

        // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE APARATOLOGIA ROSTRO
        //
        //
        var xmlRostro = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
          '<pdf>\n' +
          '<body background-image="' + xmlMod.escape({
            xmlText: imageBack
          }) + '" >';
        xmlRostro += encabezados_fichaIdentificacion;

        xmlRostro += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>SESIONES DE APARATOLOGÍA ROSTRO</b></p>';



        //ACTION: Generación de la estructura de sesiones en el expediente
        for (var rc in array_datesLimit_values) {
          //log.debug('fechas', array_datesLimit_values[rc]);
          if (array_datesLimit_values[rc] != '') {

            xmlRostro += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:1px solid #000000;"><tbody>' +

              '<tr>' +
              '<td style="width:20%;background-color:#346094;color:#FFFFFF;font-size:14px;">Sesión ' + (parseInt(rc) + 1) + '</td>' +
              '<td style="width:52%;background-color:#346094;color:#FFFFFF;"><b>' + etiqueta_campo_23 + ': </b>' + arr_arr_sessions[rc][22] + '</td>' +
              '<td style="width:28%;background-color:#346094;color:#FFFFFF;"></td>' +
              '</tr>' +
              '<tr><td colspan="2">' +

              '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
              '<tr><td style="width:55px;border-bottom:1px solid #346094;"><b>' + breakWord(etiqueta_campo_7) + ':</b></td>' +
              '<td style="width:45px;background-color: #cadcff;border-bottom:1px solid #346094;" colspan="2">' + getMultiVals(arr_arr_sessions[rc][6]) + '</td>' +
              '<td style="width:42px;;border-bottom:1px solid #346094;"><b>' + etiqueta_campo_5 + ':</b></td>' +
              '<td style="width:60px;background-color: #cadcff;border-bottom:1px solid #346094;" colspan="2">' + getMultiVals(arr_arr_sessions[rc][4]) + '</td></tr>' +

              '<tr><td style="width:48px;"><b>' + etiqueta_campo_6 + ':</b></td>' +
              '<td style="width:50px;background-color: #cadcff;" colspan="2">' + getMultiVals(arr_arr_sessions[rc][5]) + '</td>' +
              '</tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Observaciones</td></tr>' +
              '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_1 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;" colspan="5">' + arr_arr_sessions[rc][0] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_3 + ':</b></td>' +
              '<td style="background-color: #cadcff;" colspan="5">' + arr_arr_sessions[rc][2] + '</td>' +
              '</tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Responsables</td></tr>' +
              '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_2 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;" colspan="5">' + arr_arr_sessions[rc][1] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_4 + ':</b></td>' +
              '<td style="background-color: #cadcff;" colspan="5">' + arr_arr_sessions[rc][3] + '</td>' +
              '</tr>' +
              '</tbody></table></td>' +

              '<td width="220px" height="220px" rowspan="15" style="border-left:1px solid #000000;" align="center" valign="middle"><img width="200px" height="200px" src="' + xmlMod.escape({
                xmlText: arr_arr_sessions[rc][23]
              }) + '" /></td></tr>' +

              '</tbody></table><br />';

            if (((rc % 2) == 1) && rc != 9 && array_datesLimit_values[parseInt(rc) + 1] != '') {
              xmlRostro += saltoPagina();
            }
          }
        }

        if (field_firmaClienteBase64 != null || field_firmaMedBase64 != null) {
          xmlRostro += saltoPagina();
          //xmlRostro += consentimiento;
        }

        xmlRostro += '</body></pdf>';
        xmlExpediente = xmlRostro;
        //context.response.renderPdf({ xmlString: xmlRostro });

      } else if (expediente == 'cuerpo') {

        // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE APARATOLOGIA CUERPO
        //
        //
        var xmlCuerpo = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
          '<pdf>\n' +
          '<body background-image="' + xmlMod.escape({
            xmlText: imageBack
          }) + '" >';
        xmlCuerpo += encabezados_fichaIdentificacion;

        xmlCuerpo += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>SESIONES DE APARATOLOGÍA CUERPO</b></p>';



        for (var cc in array_datesLimit_values) {
          //log.debug('fechas', array_datesLimit_values[rc]);
          if (array_datesLimit_values[cc] != '') {

            xmlCuerpo += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:1px solid #000000;"><tbody>' +

              '<tr>' +
              '<td style="width:20%;background-color:#346094;color:#FFFFFF;font-size:14px;">Sesión ' + (parseInt(cc) + 1) + '</td>' +
              '<td style="width:52%;background-color:#346094;color:#FFFFFF;"><b>' + etiqueta_campo_23 + ': </b>' + arr_arr_sessions[cc][22] + '</td>' +
              '<td style="width:28%;background-color:#346094;color:#FFFFFF;"></td>' +
              '</tr>' +
              '<tr><td colspan="2">' +

              '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
              '<tr><td style="width:55px"><b>' + breakWord(etiqueta_campo_11) + ':</b></td>' +
              '<td style="width:45px;background-color: #cadcff;">' + getMultiVals(arr_arr_sessions[cc][10]) + '</td>' +
              '<td style="width:42px;"><b>' + etiqueta_campo_12 + ':</b></td>' +
              '<td style="width:60px;background-color: #cadcff;">' + getMultiVals(arr_arr_sessions[cc][11]) + '</td>' +
              '<td style="width:48px;"><b>' + etiqueta_campo_13 + ':</b></td>' +
              '<td style="width:50px;background-color: #cadcff;">' + getMultiVals(arr_arr_sessions[cc][12]) + '</td>' +
              '</tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Información general</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_8 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][7] + '</td>' +
              '<td><b>' + etiqueta_campo_9 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][8] + '</td>' +
              '<td><b>' + etiqueta_campo_10 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][9] + '</td>' +
              '</tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Perímetros</td></tr>' +
              '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_14 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][13] + '</td>' +
              '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_16 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][15] + '</td>' +
              '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_17 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][16] + '</td>' +
              '</tr>' +
              '<tr><td><b>' + etiqueta_campo_15 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][14] + '</td></tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Pliegues Cutáneos</td></tr>' +
              '<tr><td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_18 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][17] + '</td>' +
              '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_20 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][19] + '</td>' +
              '<td style="border-bottom:1px solid #346094;"><b>' + etiqueta_campo_22 + ':</b></td>' +
              '<td style="background-color: #cadcff;border-bottom:1px solid #346094;">' + arr_arr_sessions[cc][21] + '</td>' +
              '</tr>' +
              '<tr><td><b>' + etiqueta_campo_19 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][18] + '</td>' +
              '<td><b>' + etiqueta_campo_21 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cc][20] + '</td></tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Observaciones</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_1 + ':</b></td>' +
              '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][0] + '</td>' +
              '<td><b>' + etiqueta_campo_3 + ':</b></td>' +
              '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][2] + '</td>' +
              '</tr>' +

              '<tr><td colspan="6" style="background-color:#346094;color:#FFFFFF;font-size:11px;">Responsables</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_2 + ':</b></td>' +
              '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][1] + '</td>' +
              '<td><b>' + etiqueta_campo_4 + ':</b></td>' +
              '<td style="background-color: #cadcff;" colspan="2">' + arr_arr_sessions[cc][3] + '</td>' +
              '</tr>' +
              '</tbody></table></td>' +

              '<td width="220px" height="220px" rowspan="15" style="border-left:1px solid #000000;" align="center" valign="middle"><img width="200px" height="200px" src="' + xmlMod.escape({
                xmlText: arr_arr_sessions[cc][23]
              }) + '" /></td></tr>' +

              '</tbody></table><p></p>';

            //xmlCuerpo += saltoPagina();

            if (cc == 0 && array_datesLimit_values[parseInt(cc) + 1] != '') {
              xmlCuerpo += saltoPagina();
            }
            if (((cc % 2) == 0) && cc != 9 && cc != 0 && array_datesLimit_values[parseInt(cc) + 1] != '') {
              xmlCuerpo += saltoPagina();
            }
          }
        }

        if (field_firmaClienteBase64 != null && field_firmaMedBase64 != null) {
          xmlCuerpo += saltoPagina();
          //xmlCuerpo += consentimiento;
        }

        xmlCuerpo += '</body></pdf>';
        xmlExpediente = xmlCuerpo;
        //context.response.renderPdf({ xmlString: xmlCuerpo });
      } else if (expediente == 'complementarios') {

        // log.debug('Arrays Complementarios', 'arreglo de fechas: ' + array_datesLimit_values.length + '  arreglo de valores: ' + arr_arr_sessions[0]);
        // CREACION DE LA CADENA XML PARA LA CREACION DEL PDF DE EXPEDIENTE APARATOLOGIA CUERPO
        //
        //
        var xmlComplementarios = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
          '<pdf>\n' +
          '<body background-image="' + xmlMod.escape({
            xmlText: imageBack
          }) + '" >' +
          '<br /><br /><br /><br /><br />';

        xmlComplementarios += '<p style="width:75%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;text-align:center;margin:auto;" align="center"><b>SESIONES DE PROCEDIMIENTO</b></p>';

        xmlComplementarios += encabezados_fichaIdentificacion;

        for (var cco in array_datesLimit_values) {
          //log.debug('fechas', array_datesLimit_values[rc]);
          if (array_datesLimit_values[cco] != '') {

            xmlComplementarios += '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;border:1px solid #000000;"><tbody>' +

              '<tr>' +
              '<td style="width:70%;background-color:#346094;color:#FFFFFF;font-size:14px;">Sesión ' + (parseInt(cco) + 1) + '</td>' +
              '<td style="width:30%;background-color:#346094;color:#FFFFFF;"><b>' + etiqueta_campo_2 + ': </b>' + arr_arr_sessions[cco][1] + '</td>' +
              '</tr>' +

              '<tr><td>' +

              '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
              '<tr><td style="width:34%;"><b>' + etiqueta_campo_1 + ':</b></td>' +
              '<td style="width:66%;background-color: #cadcff;">' + arr_arr_sessions[cco][0] + '</td></tr>' +
              '</tbody></table>' +

              '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
              '<tr><td style="width:18%;"><b>' + etiqueta_campo_3 + ':</b></td>' +
              '<td style="width:29%;background-color: #cadcff;">' + arr_arr_sessions[cco][2] + '</td>' +
              '<td style="width:24%;"><b>' + etiqueta_campo_5 + ':</b></td>' +
              '<td style="width:29%;background-color: #cadcff;">' + arr_arr_sessions[cco][4] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_4 + ':</b></td>' +
              '<td>' + arr_arr_sessions[cco][3] + '</td>' +
              '<td><b>' + etiqueta_campo_6 + ':</b></td>' +
              '<td>' + arr_arr_sessions[cco][5] + '</td></tr>' +
              '</tbody></table>' +

              '<table style="width:100%;font-size:9px;font-family:Aria,sans-serif;table-layout:fixed;"><tbody>' +
              '<tr><td style="width:35%;background-color: #cadcff;"><b>' + etiqueta_campo_7 + ':</b></td>' +
              '<td style="width:65%;background-color: #cadcff;">' + arr_arr_sessions[cco][6] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_8 + ':</b></td>' +
              '<td>' + arr_arr_sessions[cco][7] + '</td></tr>' +
              '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_9 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][8] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_10 + ':</b></td>' +
              '<td>' + arr_arr_sessions[cco][9] + '</td></tr>' +
              '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_11 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][10] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_12 + ':</b></td>' +
              '<td>' + arr_arr_sessions[cco][11] + '</td></tr>' +
              '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_13 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][12] + '</td></tr>' +
              '<tr><td><b>' + etiqueta_campo_14 + ':</b></td>' +
              '<td>' + arr_arr_sessions[cco][13] + '</td></tr>' +
              '<tr><td style="background-color: #cadcff;"><b>' + etiqueta_campo_15 + ':</b></td>' +
              '<td style="background-color: #cadcff;">' + arr_arr_sessions[cco][14] + '</td></tr>' +

              '</tbody></table></td>' +

              '<td width="220px" height="220px" rowspan="10" style="border-left:1px solid #000000;" align="center" valign="middle"><img width="120px" height="200px" src="' + xmlMod.escape({
                xmlText: arr_arr_sessions[cco][15]
              }) + '" /></td></tr>' +

              '</tbody></table><p></p>';
            if (((cco % 2) == 1) && cco != 9 && array_datesLimit_values[parseInt(cco) + 1] != '') {
              xmlComplementarios += saltoPagina();
            }
            //log.debug('dato suma', array_datesLimit_values[parseInt(cco) + 1]);
            //if (cco == 0) { xmlComplementarios += saltoPagina(); }
            //if (((cco % 2) == 0) && cco != 9 && cco != 0) { xmlComplementarios += saltoPagina(); }
          }
        }

        if (field_firmaClienteBase64 != null && field_firmaMedBase64 != null) {
          xmlComplementarios += saltoPagina();
          //xmlComplementarios += consentimiento;
        }

        xmlComplementarios += '</body></pdf>';
        xmlExpediente = xmlComplementarios;
        //context.response.renderPdf({ xmlString: xmlComplementarios });
      }
      var pdfFile = render.xmlToPdf({
        xmlString: xmlExpediente
      });

      return pdfFile;


      /**
       * FUNCTION'S ZONE
       */

      /**
       * Function que retorna un string de HTML con estilo para generar un salto de página
       * y además agrega el espacio necesario para inciar la siguiente página en el sitio
       * correcto después del logo de hoja membretada
       */
      function saltoPagina() {
        var saltoPagina = '<div style="page-break-after:always;"></div>';
        // saltoPagina += '<br/><br/><br/><br/><br/>';
        saltoPagina += encabezados_fichaIdentificacion;

        log.debug('saltoPagina 4', saltoPagina);
        return saltoPagina;
      }

      /**
       * Funcion que obtiene la imagen de fondo correspondiente a la sucursal
       * @param {int} sucursal Identificador de la sucursal
       */
      function getImageBackGround(sucursal) {
        var imageBack = '';
        if (sucursal != '22' && sucursal != '35' && sucursal != '36' && sucursal != '23' && sucursal != '24' && sucursal != '25' && sucursal != '37' && sucursal != '21' && sucursal != '26' && sucursal != '27' && sucursal != '28') {
          if (sucursal == "52") {
            imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
          } else {
            imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
          }
        } else {
          if (sucursal == '22') // Altavista KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5';
          if (sucursal == '35') // Can-Cun KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17';
          if (sucursal == '36') // Chihuahua KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa';
          if (sucursal == '23') // Guadalajara KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773';
          if (sucursal == '24') // Monterrey KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2';
          if (sucursal == '25') // Polanco KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7';
          if (sucursal == '37') // Puebla KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2';
          if (sucursal == '21') // Santa FE KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d';
          if (sucursal == '26') // Satelite KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4';
          if (sucursal == '27') // Tijuana KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7';
          if (sucursal == '28') // Veracruz KHG
            imageBack = 'https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20';
        }
        return imageBack;
      }

      // Retorna el nombre de la Sucursal sin el KHG final
      /** Funcion que crea el archivo .txt por defecto y 
       * devuelve el id asociado a la creacion de este archivo
       * 
       * @param {string} folderParent id del Folder principal de cliente
       */
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
       * Funcion para generar una imagen amigable al check y uncheck
       * @param {String} checks Parametro que revisa si el valor es verdadero o falso
       */
      function checado(checks) {
        var check = '';
        var pathCheck = '';
        var pathRemove = '';
        var pathYes = '';
        var pathNot = '';

        if (checks == true) {
          pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathCheck
          }) + '" />';
        }
        if (checks == false) {
          pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathRemove
          }) + '" />';
        }
        if (checks == "SI" || checks == "Si" || checks == "Sí") {
          pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
          pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
          check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathYes
          }) + '" />)';
          check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathNot
          }) + '" />)';
        }
        if (checks == "NO" || checks == "No") {
          pathYes = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434813&c=3559763&h=bf10e95cc3971a1f6153';
          pathNot = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2434639&c=3559763&h=141384dcbe703ef18c39';
          check = 'SI (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathYes
          }) + '" />)';
          check += 'NO (<img style="display:inline;margin-right: 3px;" height="13px" width="13px" src="' + xmlMod.escape({
            xmlText: pathNot
          }) + '" />)';
        }
        if (checks != "") {
          pathCheck = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathCheck
          }) + '" />';
        }
        if (checks == "") {
          pathRemove = 'https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c';
          check = '<img style="display:inline;margin-right: 6px;margin-top: px;" height="10px" width="10px" src="' + xmlMod.escape({
            xmlText: pathRemove
          }) + '" />';
        }
        return check;
      }

      function getMultiVals(arregloValores) {
        var result = '';
        if (arregloValores != '') {
          for (var i in arregloValores) {
            result += '- ' + arregloValores[i] + '<br />';
          }
          return result;
        }
        return result;
      }

      function breakWord(word) {
        var result = '';
        if (word != '') {
          result = word.replace('/', ' ');
          return result;
        }
      }



    }

    function formatDate(date) {
      var current_datetime = new Date(date);
      var day = current_datetime.getDate();
      var month = current_datetime.getMonth();
      month = current_datetime.getMonth() + 1
      var year = current_datetime.getFullYear();
      var formatted_date = day + "/" + month + "/" + year;

    
      return formatted_date;

    }
    function calcYearInt(fechaAntigua, fechaReciente) {
      log.debug("fechaAntigua", fechaAntigua);
      log.debug("fechaReciente", fechaReciente);
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
      log.debug("edad", edad);
      return edad;
    }

  });
