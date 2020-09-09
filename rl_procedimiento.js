/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

   define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) { }

    function doPost(params) {
        var scriptObj = runtime.getCurrentScript();

        var objJson;
        if (typeof params === "object") {
            objJson = params;
        } else {
            objJson = JSON.parse(params);
        }
        log.debug("params", objJson);

        var param_idProcedure = objJson.idProcedure;
        var param_typeProcedure = objJson.typeProcedure;
        var param_typeInternal = objJson.typeInternal;

        // GLOBALES
        var response_cutomer = [];
        var response_cases = [];
        var idProcedure = "";

        //Busqueda de id de caso por id de cliente y filtrado por historia clinica
        var searchCreate_procedureCase = search.create({
            type: search.Type.SUPPORT_CASE,
            columns: [{
                name: "internalid"
            },
            {
                name: "date"
            }
            ],
            filters: [{
                name: "internalid",
                operator: "is",
                values: param_idProcedure
            }]
        });

        var searchPreview_procedureCase = searchCreate_procedureCase.run().each(function (result) {
            idProcedure = result.getValue({
                name: 'internalid'
            });
            dateprocedure = result.getValue({
                name: 'date'
            })
        });

        if (param_typeProcedure == "qx") {
            // PARAMETROS de QUIRÚRGICO
            var param_startdate = objJson.startdate; // Fecha // "FECHA DE PROCEDIMIENTO" 
            var param_starttime = objJson.starttime; // Hora // "HORA DEL PROCEDIMIENTO"
            var param_custevent550 = objJson.custevent550; // Check // "SU IDENTIDAD" 
            var param_custevent551 = objJson.custevent551; // Check // "SITIO QUIRÚRGICO CORRECTO" 
            var param_custevent552 = objJson.custevent552; // Check // "PROCEDIMIENTO CORRECTO" 
            var param_custevent553 = objJson.custevent553; // Check // "CUENTA CON SU CONSENTIMIENTO INFORMADO" 
            var param_custevent556 = objJson.custevent556; // Check // "REALIZÓ MARCAJE DEL SITIO QUIRÚRGICO" 
            var param_custevent557 = objJson.custevent557; // Check // "SE COMPLETÓ EL CONTROL DE SEGURIDAD EN ANESTESIA" 
            var param_custevent722 = objJson.custevent722; // Check // "SE COLOCARON ELEMENTOS DE VIGILANCIA ESTÁNDAR" 
            var param_custevent560 = objJson.custevent560; // Check // "CONFIRMAR QUE TODOS LOS MIEMBROS DEL EQUIPO SE HAYAN IDENTIFICADO POR NOMBRE Y FUNCIÓN" 
            var param_custevent725 = objJson.custevent725; // Check // "EL CIRUJANO REVISA LOS PASOS CRÍTICOS O IMPREVISTOS, LA DURACIÓN DE LA OPERACIÓN Y LA PÉRDIDA DE SANGRE PREVISTA." 
            var param_custevent726 = objJson.custevent726; // Check // "EL EQUIPO DE ANESTESIA REVISA SI EL PACIENTE PRESENTA ALGÚN PROBLEMA ESPECÍFICO." 
            var param_custevent727 = objJson.custevent727; // Check // "EL EQUIPO DE ENFERMERÍA REVISA SI SE HA CONFIRMADO LA ESTERILIDAD Y SI EXISTEN DUDAS O PROBLEMAS RELACIONADOS CON EL INSTRUMENTAL Y LOS EQUIPOS" 
            var param_custevent723 = objJson.custevent723; // Lista // "VÍA AÉREA DIFÍCIL / RIESGO DE ASPIRACIÓN" 
            var param_custevent724 = objJson.custevent724; // Lista // "RIESGO DE HEMORRAGIA > 500 ML" 
            var param_custevent728 = objJson.custevent728; // Lista // "SE HA ADMINISTRADO PROFILAXIS ANTIBIÓTICA EN LOS ÚLTIMOS 60 MINUTOS?" 
            var param_custevent729 = objJson.custevent729; // Lista // "¿PUEDEN VISUALIZARSE LAS IMÁGENES DIAGNÓSTICAS ESENCIALES?" 
            var param_custevent565 = objJson.custevent565; // Check // "RECUENTO DE INSTRUMENTOS, AGUJAS Y HOJA DE BISTURÍ" 
            var param_custevent564 = objJson.custevent564; // Check // "ETIQUETADO DE MUESTRAS HISPATOLÓGICAS" 
            var param_custevent730 = objJson.custevent730; // Check // "MATERIAL TEXTIL COMPLETO" 
            var param_custevent567 = objJson.custevent567; // Check // "REVISAN LOS PRINCIPALES ASPECTOS DE LA RECUPERACIÓN Y EL TRATAMIENTO DEL PACIENTE" 
            var param_custevent840 = objJson.custevent840; // url // "IMAGEN 1" 
            var param_custevent841 = objJson.custevent841; // url // "IMAGEN 2" 
            var param_custevent842 = objJson.custevent842; // url // "IMAGEN 3" 
            var param_custevent843 = objJson.custevent843; // url // "IMAGEN 4" 
            var param_custevent844 = objJson.custevent844; // url // "IMAGEN 5" 
            var param_custevent845 = objJson.custevent845; // url // "IMAGEN 6" 
            var param_custevent846 = objJson.custevent846; // url // "IMAGEN 7" 
            var param_custevent847 = objJson.custevent847; // url // "IMAGEN 8" 
            var param_custevent848 = objJson.custevent848; // url // "IMAGEN 9" 
            var param_custevent849 = objJson.custevent849; // url // "IMAGEN 10" 
            var param_custevent850 = objJson.custevent850; // url // "IMAGEN 11" 
            var param_custevent851 = objJson.custevent851; // url // "IMAGEN 12" 
            var param_custevent852 = objJson.custevent852; // url // "IMAGEN 13" 
            var param_custevent853 = objJson.custevent853; // url // "IMAGEN 14" 
            var param_custevent854 = objJson.custevent854; // url // "IMAGEN 15" 
            var param_custevent731 = objJson.custevent731; // Check // "CIRUGÍA ELECTIVA" 
            var param_custevent732 = objJson.custevent732; // Check // "URGENTE" 
            var param_custevent733 = objJson.custevent733; // Check // "C. MAYOR" 
            var param_custevent734 = objJson.custevent734; // Check // "C. MENOR" 
            var param_custevent735 = objJson.custevent735; // text // "GLUCOSA" 
            var param_custevent736 = objJson.custevent736; // text // "UREA" 
            var param_custevent737 = objJson.custevent737; // text // "CREATININA" 
            var param_custevent738 = objJson.custevent738; // text // "EKG" 
            var param_custevent739 = objJson.custevent739; // text // "RX TÓRAX" 
            var param_custevent740 = objJson.custevent740; // text // "ASA" 
            var param_custevent741 = objJson.custevent741; // text // "HB" 
            var param_custevent742 = objJson.custevent742; // text // "HTO" 
            var param_custevent743 = objJson.custevent743; // text // "GRUPO S" 
            var param_custevent744 = objJson.custevent744; // text // "RH" 
            var param_custevent745 = objJson.custevent745; // text // "PA" 
            var param_custevent746 = objJson.custevent746; // text // "FC" 
            var param_custevent747 = objJson.custevent747; // text // "EF" 
            var param_custevent748 = objJson.custevent748; // text // "CRÁNEO" 
            var param_custevent749 = objJson.custevent749; // text // "OJOS, OÍDOS, NARÍZ, GARGANTA" 
            var param_custevent750 = objJson.custevent750; // text // "PATOLOGÍAS ACTUALES" 
            var param_custevent751 = objJson.custevent751; // text // "S. RESPIRATORIA" 
            var param_custevent752 = objJson.custevent752; // text // "S. CARDIOVASCULAR" 
            var param_custevent753 = objJson.custevent753; // text // "S. GASTROINTESTINAL" 
            var param_custevent754 = objJson.custevent754; // text // "S. GENITOURINATIO" 
            var param_custevent755 = objJson.custevent755; // text // "S. NERVIOSO" 
            var param_custevent756 = objJson.custevent756; // text // "S. ENDÓCRINO" 
            var param_custevent757 = objJson.custevent757; // text // "S. MUSC. ESQ" 
            var param_custevent758 = objJson.custevent758; // text // "ALERGIAS/TRANS" 
            var param_custevent759 = objJson.custevent759; // text // "OPERAC. PREVIAS" 
            var param_custevent760 = objJson.custevent760; // text // "ANTECEDENTES ANESTÉSICOS" 
            var param_custevent761 = objJson.custevent761; // text // "COMPLICACIONES" 
            var param_custevent762 = objJson.custevent762; // text // "TEC. ANEST. PROPUESTA" 
            var param_custevent763 = objJson.custevent763; // text // "PUNCIÓN VENOSA (SITIO)" 
            var param_custevent764 = objJson.custevent764; // text // "PUNCIÓN VENOSA (CALIBRE)" 
            var param_custevent765 = objJson.custevent765; // Lista // "POSICIÓN DEL PACIENTE" 
            var param_custevent766 = objJson.custevent766; // text // "POSICIÓN DE LOS BRAZOS (ABDUCCIÓN)" 
            var param_custevent767 = objJson.custevent767; // text // "POSICIÓN DE LOS BRAZOS (ADUCCIÓN)" 
            var param_custevent768 = objJson.custevent768; // text // "TORNIQUETE (SITIO)" 
            var param_custevent769 = objJson.custevent769; // text // "TORNIQUETE (INICIA)" 
            var param_custevent770 = objJson.custevent770; // text // "TORNIQUETE (TERMINA)" 
            var param_custevent771 = objJson.custevent771; // Lista // "INTUBACIÓN (DIFICULTADES TÉCNICAS)" 
            var param_custevent772 = objJson.custevent772; // Lista // "INDUCCIÓN I.V.I.M. INH (DIFICULTADES TÉCNICAS)" 
            var param_custevent773 = objJson.custevent773; // text // "ORAL NASAL (CALIBRE)" 
            var param_custevent774 = objJson.custevent774; // Lista // "ORAL NASAL (GLOBO)" 
            var param_custevent775 = objJson.custevent775; // Lista // "PRESIÓN NORMAL BAJA (TRAUMÁTICA)" 
            var param_custevent776 = objJson.custevent776; // textArea // "BLOQUEO DE PLEXO" 
            var param_custevent777 = objJson.custevent777; // textArea // "CONDICIÓN DEL PACIENTE AL CERRAR" 
            var param_custevent778 = objJson.custevent778; // textArea // "SITIOS DE PRESIÓN" 
            var param_custevent779 = objJson.custevent779; // textArea // "OTROS DATOS" 
            var param_custevent780 = objJson.custevent780; // Lista // "PUNCIÓN EPIDURAL / SUBARAC (DIFICULTADES TÉCNICAS)" 
            var param_custevent781 = objJson.custevent781; // text // "PUNCIÓN EPIDURAL / SUBARAC ( AGUJA CALIBRE)" 
            var param_custevent782 = objJson.custevent782; // text // "PUNCIÓN EPIDURAL / SUBARAC (ESP. INTERVERTEBRAL)" 
            var param_custevent783 = objJson.custevent783; // text // "PUNCIÓN EPIDURAL / SUBARAC (AGENTE)" 
            var param_custevent784 = objJson.custevent784; // text // "PUNCIÓN EPIDURAL / SUBARAC (NIVEL DE)" 
            var param_custevent792 = objJson.custevent792; // Lista // "OJOS (PROTECCIÓN)" 
            var param_custevent793 = objJson.custevent793; // Lista // "POR ANESTESIÓLOGO" 
            var param_custevent785 = objJson.custevent785; // text // "VALORACIÓN DE ALDERETE (15 MIN.)" 
            var param_custevent786 = objJson.custevent786; // text // "VALORACIÓN DE ALDERETE (45 MIN.)" 
            var param_custevent787 = objJson.custevent787; // text // "VALORACIÓN DE ALDERETE (90 MIN.)" 
            var param_custevent788 = objJson.custevent788; // Lista // "EL PACIENTE PASÓ DE RECUPERACIÓN A" 
            var param_custevent789 = objJson.custevent789; // text // "ESPECIFÍQUE" 
            var param_custevent790 = objJson.custevent790; // text // "HORA" 
            var param_custevent791 = objJson.custevent791; // text // "RESPONSABLE" 
            var param_custevent796 = objJson.custevent796; // text // "DIAGNÓSTICO" 
            var param_custevent797 = objJson.custevent797; // text // "OPERACIÓN" 
            var param_custevent798 = objJson.custevent798; // text // "CIRUJANO" 
            var param_custevent799 = objJson.custevent799; // text // "ANESTESIÓLOGO" 
            var param_custevent663 = objJson.custevent663; // Check // "ALERTA" 
            var param_custevent664 = objJson.custevent664; // Check // "ORIENTADO" 
            var param_custevent665 = objJson.custevent665; // Check // "CONSCIENTE" 
            var param_custevent666 = objJson.custevent666; // Check // "TRANQUILO" 
            var param_custevent667 = objJson.custevent667; // Check // "ANSIOSO" 
            var param_custevent668 = objJson.custevent668; // Check // "LETÁRGICO" 
            var param_custevent669 = objJson.custevent669; // Check // "NERVIOSO" 
            var param_custevent670 = objJson.custevent670; // Check // "OTRO" 
            var param_custevent671 = objJson.custevent671; // Lista // "AYUNO" 
            var param_custevent672 = objJson.custevent672; // Lista // "TRICOTOMÍA" 
            var param_custevent673 = objJson.custevent673; // Lista // "REGIÓN" 
            var param_custevent674 = objJson.custevent674; // text // "ALERGÍAS" 
            var param_custevent675 = objJson.custevent675; // text // "PRÓTESIS" 
            var param_custevent676 = objJson.custevent676; // text // "ALAJAS" 
            var param_custevent677 = objJson.custevent677; // text // "ROPA INTERIOR" 
            var param_custevent681 = objJson.custevent681; // Lista // "AFECCIONES DE LA PIEL" 
            var param_custevent678 = objJson.custevent678; // text // "COLORACIÓN Y ESTADO DE HIDRATACIÓN DE MUCOSAS" 
            var param_custevent679 = objJson.custevent679; // text // "COLORACIÓN Y ESTADO DE HIDRATACIÓN DE TEGUMENTOS" 
            var param_custevent685 = objJson.custevent685; // text // "VENOCLISIS" 
            var param_custevent686 = objJson.custevent686; // text // "SONDAS" 
            var param_custevent687 = objJson.custevent687; // text // "DRENAJES"
            var param_custevent688 = objJson.custevent688; // text // "MÉDICO RESPONSABLE ANESTESIÓLOGO"
            var param_custevent689 = objJson.custevent689; // lista // "TIPO DE ANESTESIA"
            var param_custevent690 = objJson.custevent690; // text // "HORA DE INICIO DE ANESTESIA"
            var param_custevent694 = objJson.custevent694; // text // "HORA DE TÉRMINO DE ANESTESIA"
            var param_custevent691 = objJson.custevent691; // text // "MANIOBRA DE INTUBACIÓN"
            var param_custevent692 = objJson.custevent692; // text // "NÚMERO DE TUBO"
            var param_custevent693 = objJson.custevent693; // text // "MEDICAMENTOS DE INDUCCIÓN"
            var param_custevent695 = objJson.custevent695; // text // "REALIZÓ"
            var param_custevent696 = objJson.custevent696; // text // "REGIÓN"
            var param_custevent697 = objJson.custevent697; // text // "ANTISÉPTICO"
            var param_custevent698 = objJson.custevent698; // textArea // "OBSERVACIONES"
            var param_custevent699 = objJson.custevent699; // text // "CIRUJANO RESPONSABLE (C)"
            var param_custevent700 = objJson.custevent700; // text // "PRIMER AYUDANTE"
            var param_custevent701 = objJson.custevent701; // text // "SEGUNDO AYUDANTE"
            var param_custevent702 = objJson.custevent702; // text // "INSTRUMENTISTA QUIRÚRGICO"
            var param_custevent703 = objJson.custevent703; // text // "CIRCULANTE"
            var param_custevent704 = objJson.custevent704; // text // "TIEMPO FUERA"
            var param_custevent705 = objJson.custevent705; // text // "HORA DE INICIO DE INFILTRACIÓN"
            var param_custevent706 = objJson.custevent706; // text // "HORA DE TÉRMINO DE INFILTRACIÓN"
            var param_custevent707 = objJson.custevent707; // text // "HORA DE INICIO DE CIRUGÍA"
            var param_custevent708 = objJson.custevent708; // text // "HORA DE TÉRMINO DE CIRUGÍA"
            var param_custevent709 = objJson.custevent709; // text // "CIRUGÍA REALIZADA"
            var param_custevent710 = objJson.custevent710; // Check // "GASAS (COMPLETO)"
            var param_custevent711 = objJson.custevent711; // Check // "COMPRESAS (COMPLETO)"
            var param_custevent712 = objJson.custevent712; // Check // "COTONIODES (COMPLETO)"
            var param_custevent713 = objJson.custevent713; // Check // "ISOPOS (COMPLETO)"
            var param_custevent714 = objJson.custevent714; // Check // "AGUJAS HIPODÉRMICAS (COMPLETO)"
            var param_custevent715 = objJson.custevent715; // Check // "AGUJAS DE SUTURA (COMPLETO)"
            var param_custevent716 = objJson.custevent716; // Check // "HOJAS DE BISTURÍ (COMPLETO)"
            var param_custevent717 = objJson.custevent717; // Check // "INSTRUMENTAL (COMPLETO)"
            var param_custevent718 = objJson.custevent718; // Check // "OTROS (CONTEO)"
            var param_custevent719 = objJson.custevent719; // textArea // "EQUIPO BIOMÉDICO UTILIZADO"
            var param_custevent720 = objJson.custevent720; // textArea // "IMPLANTES E INSUMOS EXTRAS"
            var param_custevent721 = objJson.custevent721; // textArea // "OBSERVACIONES"
            var param_custevent655 = objJson.custevent655; // text // "MÉDICO CIRUJANO" 
            var param_custevent656 = objJson.custevent656; // text // "1ER AYUDANTE" 
            var param_custevent657 = objJson.custevent657; // text // "2DO AYUDANTE" 
            var param_custevent658 = objJson.custevent658; // text // "MÉDICO ANESTESIÓLOGO" 
            var param_custevent659 = objJson.custevent659; // text // "ENF. INSTRUMENTISTA" 
            var param_custevent660 = objJson.custevent660; // text // "ENF. CIRCULANTE" 
            var param_custevent661 = objJson.custevent661; // textarea // "DIAGNÓSTICO PRE-OPERATORIO" 
            var param_custevent576 = objJson.custevent576; // textarea // "DIAGNÓSTICO POST-OPERATORIO" 
            var param_custevent577 = objJson.custevent577; // Lista // "ANESTESIA APLICADA" 
            var param_custevent662 = objJson.custevent662; // textarea // "NOTA MÉDICA" 
            var param_custevent794 = objJson.custevent794; // textarea // "CONDICIONES DE LA HERIDA QUIRÚRGICA" 
            var param_custevent795 = objJson.custevent795; // textarea // "NOTAS DE ENFERMERÍA" 
            var param_custevent570 = objJson.custevent570; // text // "FECHA Y HORA DE EGRESO" 
            var param_custevent573 = objJson.custevent573; // textarea // "DIAGNÓSTICO DE EGRESO" 
            var param_custevent574 = objJson.custevent574; // textarea // "MOTIVO DE EGRESO" 
            var param_custevent572 = objJson.custevent572; // textarea // "RESUMEN DE LA EVOLUCIÓN Y ESTADO ACTUAL" 
            var param_custevent575 = objJson.custevent575; // textarea // "PLAN DE MANEJO, TRATAMIENTO Y RECOMENDACIONES" 
            var param_custevent202 = objJson.custevent202; // multilista // "DR. RESPONSABLE" 
            var param_custevent197 = objJson.custevent197; // Fecha // "FECHA DE EXPEDICIÓN" 
            var param_custevent857 = objJson.custevent857; // text // "INDICACIONES" 
            var param_custevent803 = objJson.custevent803; // Lista // "CLAVE DEL TIPO DE EPISODIO" 
            var param_custevent804 = objJson.custevent804; // text // "CÉDULA PROFESIONAL DEL MÉDICO RESPONSABLE DEL EPISODIO:" 
            var param_custevent805 = objJson.custevent805; // text // "NOMBRE DEL MÉDICO RESPONSABLE DEL EPISODIO:" 
            var param_custevent806 = objJson.custevent806; // text // "PRIMER APELLIDO DEL MÉDICO RESPONSABLE DEL EPISODIO:" 
            var param_custevent807 = objJson.custevent807; // text // "CLUES DEL ESTABLECIMIENTO RESPONSABLE DEL EPISODIO:" 
            var param_custevent808 = objJson.custevent808; // text // "LICENCIA SANITARIA DEL ESTABLECIMIENTO RESPONSABLE DEL EPISODIO:" 
            var param_custevent269 = objJson.custevent269; // text // "FIRMA DEL CLIENTE DE CONSENTIMIENTO INFORMADO"

            // VARIABLES GLOBALES
            var file_content_image_1 = "";
            var file_content_image_2 = "";
            var file_content_image_3 = "";
            var file_content_image_4 = "";
            var file_content_image_5 = "";
            var file_content_image_6 = "";
            var file_content_image_7 = "";
            var file_content_image_8 = "";
            var file_content_image_9 = "";
            var file_content_image_10 = "";
            var file_content_image_11 = "";
            var file_content_image_12 = "";
            var file_content_image_13 = "";
            var file_content_image_14 = "";
            var file_content_image_15 = "";
            var file_content_firmaCliente = "";

            var obj_case_procedure = record.load({
                type: "supportcase",
                id: idProcedure
            });

            //procedureO ALBYA
            var field_case_procedure_casenumber = obj_case_procedure.getText({
                fieldId: "casenumber"
            });
            var field_case_procedure_startdate = obj_case_procedure.getText({
                fieldId: "startdate"
            });
            var field_case_procedure_starttime = obj_case_procedure.getText({
                fieldId: "starttime"
            });
            var field_case_procedure_custevent550 = obj_case_procedure.getValue({
                fieldId: "custevent550"
            });
            var field_case_procedure_custevent551 = obj_case_procedure.getValue({
                fieldId: "custevent551"
            });
            var field_case_procedure_custevent552 = obj_case_procedure.getValue({
                fieldId: "custevent552"
            });
            var field_case_procedure_custevent553 = obj_case_procedure.getValue({
                fieldId: "custevent553"
            });
            var field_case_procedure_custevent556 = obj_case_procedure.getValue({
                fieldId: "custevent556"
            });
            var field_case_procedure_custevent557 = obj_case_procedure.getValue({
                fieldId: "custevent557"
            });
            var field_case_procedure_custevent722 = obj_case_procedure.getValue({
                fieldId: "custevent722"
            });
            var field_case_procedure_custevent560 = obj_case_procedure.getValue({
                fieldId: "custevent560"
            });
            var field_case_procedure_custevent725 = obj_case_procedure.getValue({
                fieldId: "custevent725"
            });
            var field_case_procedure_custevent726 = obj_case_procedure.getValue({
                fieldId: "custevent726"
            });
            var field_case_procedure_custevent727 = obj_case_procedure.getValue({
                fieldId: "custevent727"
            });
            var field_case_procedure_custevent723 = obj_case_procedure.getValue({
                fieldId: "custevent723"
            });
            var field_case_procedure_custevent724 = obj_case_procedure.getValue({
                fieldId: "custevent724"
            });
            var field_case_procedure_custevent728 = obj_case_procedure.getValue({
                fieldId: "custevent728"
            });
            var field_case_procedure_custevent729 = obj_case_procedure.getValue({
                fieldId: "custevent729"
            });
            var field_case_procedure_custevent565 = obj_case_procedure.getValue({
                fieldId: "custevent565"
            });
            var field_case_procedure_custevent564 = obj_case_procedure.getValue({
                fieldId: "custevent564"
            });
            var field_case_procedure_custevent730 = obj_case_procedure.getValue({
                fieldId: "custevent730"
            });
            var field_case_procedure_custevent567 = obj_case_procedure.getValue({
                fieldId: "custevent567"
            });
            var field_case_procedure_custevent840 = obj_case_procedure.getValue({
                fieldId: "custevent840"
            }) || null;
            var field_case_procedure_custevent841 = obj_case_procedure.getValue({
                fieldId: "custevent841"
            }) || null;
            var field_case_procedure_custevent842 = obj_case_procedure.getValue({
                fieldId: "custevent842"
            }) || null;
            var field_case_procedure_custevent843 = obj_case_procedure.getValue({
                fieldId: "custevent843"
            }) || null;
            var field_case_procedure_custevent844 = obj_case_procedure.getValue({
                fieldId: "custevent844"
            }) || null;
            var field_case_procedure_custevent845 = obj_case_procedure.getValue({
                fieldId: "custevent845"
            }) || null;
            var field_case_procedure_custevent846 = obj_case_procedure.getValue({
                fieldId: "custevent846"
            }) || null;
            var field_case_procedure_custevent847 = obj_case_procedure.getValue({
                fieldId: "custevent847"
            }) || null;
            var field_case_procedure_custevent848 = obj_case_procedure.getValue({
                fieldId: "custevent848"
            }) || null;
            var field_case_procedure_custevent849 = obj_case_procedure.getValue({
                fieldId: "custevent849"
            }) || null;
            var field_case_procedure_custevent850 = obj_case_procedure.getValue({
                fieldId: "custevent850"
            }) || null;
            var field_case_procedure_custevent851 = obj_case_procedure.getValue({
                fieldId: "custevent851"
            }) || null;
            var field_case_procedure_custevent852 = obj_case_procedure.getValue({
                fieldId: "custevent852"
            }) || null;
            var field_case_procedure_custevent853 = obj_case_procedure.getValue({
                fieldId: "custevent853"
            }) || null;
            var field_case_procedure_custevent854 = obj_case_procedure.getValue({
                fieldId: "custevent854"
            }) || null;
            var field_case_procedure_custevent731 = obj_case_procedure.getText({
                fieldId: "custevent731"
            });
            var field_case_procedure_custevent732 = obj_case_procedure.getText({
                fieldId: "custevent732"
            });
            var field_case_procedure_custevent733 = obj_case_procedure.getText({
                fieldId: "custevent733"
            });
            var field_case_procedure_custevent734 = obj_case_procedure.getText({
                fieldId: "custevent734"
            });
            var field_case_procedure_custevent735 = obj_case_procedure.getText({
                fieldId: "custevent735"
            });
            var field_case_procedure_custevent736 = obj_case_procedure.getText({
                fieldId: "custevent736"
            });
            var field_case_procedure_custevent737 = obj_case_procedure.getText({
                fieldId: "custevent737"
            });
            var field_case_procedure_custevent738 = obj_case_procedure.getText({
                fieldId: "custevent738"
            });
            var field_case_procedure_custevent739 = obj_case_procedure.getText({
                fieldId: "custevent739"
            });
            var field_case_procedure_custevent740 = obj_case_procedure.getText({
                fieldId: "custevent740"
            });
            var field_case_procedure_custevent741 = obj_case_procedure.getText({
                fieldId: "custevent741"
            });
            var field_case_procedure_custevent742 = obj_case_procedure.getText({
                fieldId: "custevent742"
            });
            var field_case_procedure_custevent743 = obj_case_procedure.getText({
                fieldId: "custevent743"
            });
            var field_case_procedure_custevent744 = obj_case_procedure.getText({
                fieldId: "custevent744"
            });
            var field_case_procedure_custevent745 = obj_case_procedure.getText({
                fieldId: "custevent745"
            });
            var field_case_procedure_custevent746 = obj_case_procedure.getText({
                fieldId: "custevent746"
            });
            var field_case_procedure_custevent747 = obj_case_procedure.getText({
                fieldId: "custevent747"
            });
            var field_case_procedure_custevent748 = obj_case_procedure.getText({
                fieldId: "custevent748"
            });
            var field_case_procedure_custevent749 = obj_case_procedure.getText({
                fieldId: "custevent749"
            });
            var field_case_procedure_custevent750 = obj_case_procedure.getText({
                fieldId: "custevent750"
            });
            var field_case_procedure_custevent751 = obj_case_procedure.getText({
                fieldId: "custevent751"
            });
            var field_case_procedure_custevent752 = obj_case_procedure.getText({
                fieldId: "custevent752"
            });
            var field_case_procedure_custevent753 = obj_case_procedure.getText({
                fieldId: "custevent753"
            });
            var field_case_procedure_custevent754 = obj_case_procedure.getText({
                fieldId: "custevent754"
            });
            var field_case_procedure_custevent755 = obj_case_procedure.getText({
                fieldId: "custevent755"
            });
            var field_case_procedure_custevent756 = obj_case_procedure.getText({
                fieldId: "custevent756"
            });
            var field_case_procedure_custevent757 = obj_case_procedure.getText({
                fieldId: "custevent757"
            });
            var field_case_procedure_custevent758 = obj_case_procedure.getText({
                fieldId: "custevent758"
            });
            var field_case_procedure_custevent759 = obj_case_procedure.getText({
                fieldId: "custevent759"
            });
            var field_case_procedure_custevent760 = obj_case_procedure.getText({
                fieldId: "custevent760"
            });
            var field_case_procedure_custevent761 = obj_case_procedure.getText({
                fieldId: "custevent761"
            });
            var field_case_procedure_custevent762 = obj_case_procedure.getText({
                fieldId: "custevent762"
            });
            var field_case_procedure_custevent763 = obj_case_procedure.getText({
                fieldId: "custevent763"
            });
            var field_case_procedure_custevent764 = obj_case_procedure.getText({
                fieldId: "custevent764"
            });
            var field_case_procedure_custevent765 = obj_case_procedure.getValue({
                fieldId: "custevent765"
            });
            var field_case_procedure_custevent766 = obj_case_procedure.getText({
                fieldId: "custevent766"
            });
            var field_case_procedure_custevent767 = obj_case_procedure.getText({
                fieldId: "custevent767"
            });
            var field_case_procedure_custevent768 = obj_case_procedure.getText({
                fieldId: "custevent768"
            });
            var field_case_procedure_custevent769 = obj_case_procedure.getText({
                fieldId: "custevent769"
            });
            var field_case_procedure_custevent770 = obj_case_procedure.getText({
                fieldId: "custevent770"
            });
            var field_case_procedure_custevent771 = obj_case_procedure.getValue({
                fieldId: "custevent771"
            });
            var field_case_procedure_custevent772 = obj_case_procedure.getValue({
                fieldId: "custevent772"
            });
            var field_case_procedure_custevent773 = obj_case_procedure.getText({
                fieldId: "custevent773"
            });
            var field_case_procedure_custevent774 = obj_case_procedure.getValue({
                fieldId: "custevent774"
            });
            var field_case_procedure_custevent775 = obj_case_procedure.getValue({
                fieldId: "custevent775"
            });
            var field_case_procedure_custevent776 = obj_case_procedure.getText({
                fieldId: "custevent776"
            });
            var field_case_procedure_custevent777 = obj_case_procedure.getText({
                fieldId: "custevent777"
            });
            var field_case_procedure_custevent778 = obj_case_procedure.getText({
                fieldId: "custevent778"
            });
            var field_case_procedure_custevent779 = obj_case_procedure.getText({
                fieldId: "custevent779"
            });
            var field_case_procedure_custevent780 = obj_case_procedure.getValue({
                fieldId: "custevent780"
            });
            var field_case_procedure_custevent781 = obj_case_procedure.getText({
                fieldId: "custevent781"
            });
            var field_case_procedure_custevent782 = obj_case_procedure.getText({
                fieldId: "custevent782"
            });
            var field_case_procedure_custevent783 = obj_case_procedure.getText({
                fieldId: "custevent783"
            });
            var field_case_procedure_custevent784 = obj_case_procedure.getText({
                fieldId: "custevent784"
            });
            var field_case_procedure_custevent792 = obj_case_procedure.getValue({
                fieldId: "custevent792"
            });
            var field_case_procedure_custevent793 = obj_case_procedure.getValue({
                fieldId: "custevent793"
            });
            var field_case_procedure_custevent785 = obj_case_procedure.getText({
                fieldId: "custevent785"
            });
            var field_case_procedure_custevent786 = obj_case_procedure.getText({
                fieldId: "custevent786"
            });
            var field_case_procedure_custevent787 = obj_case_procedure.getText({
                fieldId: "custevent787"
            });
            var field_case_procedure_custevent788 = obj_case_procedure.getValue({
                fieldId: "custevent788"
            });
            var field_case_procedure_custevent789 = obj_case_procedure.getText({
                fieldId: "custevent789"
            });
            var field_case_procedure_custevent790 = obj_case_procedure.getText({
                fieldId: "custevent790"
            });
            var field_case_procedure_custevent791 = obj_case_procedure.getText({
                fieldId: "custevent791"
            });
            var field_case_procedure_custevent796 = obj_case_procedure.getText({
                fieldId: "custevent796"
            });
            var field_case_procedure_custevent797 = obj_case_procedure.getText({
                fieldId: "custevent797"
            });
            var field_case_procedure_custevent798 = obj_case_procedure.getText({
                fieldId: "custevent798"
            });
            var field_case_procedure_custevent799 = obj_case_procedure.getText({
                fieldId: "custevent799"
            });
            var field_case_procedure_custevent663 = obj_case_procedure.getValue({
                fieldId: "custevent663"
            });
            var field_case_procedure_custevent664 = obj_case_procedure.getValue({
                fieldId: "custevent664"
            });
            var field_case_procedure_custevent665 = obj_case_procedure.getValue({
                fieldId: "custevent665"
            });
            var field_case_procedure_custevent666 = obj_case_procedure.getValue({
                fieldId: "custevent666"
            });
            var field_case_procedure_custevent667 = obj_case_procedure.getValue({
                fieldId: "custevent667"
            });
            var field_case_procedure_custevent668 = obj_case_procedure.getValue({
                fieldId: "custevent668"
            });
            var field_case_procedure_custevent669 = obj_case_procedure.getValue({
                fieldId: "custevent669"
            });
            var field_case_procedure_custevent670 = obj_case_procedure.getValue({
                fieldId: "custevent670"
            });
            var field_case_procedure_custevent671 = obj_case_procedure.getValue({
                fieldId: "custevent671"
            });
            var field_case_procedure_custevent672 = obj_case_procedure.getValue({
                fieldId: "custevent672"
            });
            var field_case_procedure_custevent673 = obj_case_procedure.getValue({
                fieldId: "custevent673"
            });
            var field_case_procedure_custevent674 = obj_case_procedure.getText({
                fieldId: "custevent674"
            });
            var field_case_procedure_custevent675 = obj_case_procedure.getText({
                fieldId: "custevent675"
            });
            var field_case_procedure_custevent676 = obj_case_procedure.getText({
                fieldId: "custevent676"
            });
            var field_case_procedure_custevent677 = obj_case_procedure.getText({
                fieldId: "custevent677"
            });
            var field_case_procedure_custevent681 = obj_case_procedure.getValue({
                fieldId: "custevent681"
            });
            var field_case_procedure_custevent678 = obj_case_procedure.getText({
                fieldId: "custevent678"
            });
            var field_case_procedure_custevent679 = obj_case_procedure.getText({
                fieldId: "custevent679"
            });
            var field_case_procedure_custevent685 = obj_case_procedure.getText({
                fieldId: "custevent685"
            });
            var field_case_procedure_custevent686 = obj_case_procedure.getText({
                fieldId: "custevent686"
            });
            var field_case_procedure_custevent687 = obj_case_procedure.getText({
                fieldId: "custevent687"
            });
            var field_case_procedure_custevent688 = obj_case_procedure.getText({
                fieldId: "custevent688"
            });
            var field_case_procedure_custevent689 = obj_case_procedure.getValue({
                fieldId: "custevent689"
            });
            var field_case_procedure_custevent690 = obj_case_procedure.getText({
                fieldId: "custevent690"
            });
            var field_case_procedure_custevent694 = obj_case_procedure.getText({
                fieldId: "custevent694"
            });
            var field_case_procedure_custevent691 = obj_case_procedure.getText({
                fieldId: "custevent691"
            });
            var field_case_procedure_custevent692 = obj_case_procedure.getText({
                fieldId: "custevent692"
            });
            var field_case_procedure_custevent693 = obj_case_procedure.getText({
                fieldId: "custevent693"
            });
            var field_case_procedure_custevent695 = obj_case_procedure.getText({
                fieldId: "custevent695"
            });
            var field_case_procedure_custevent696 = obj_case_procedure.getText({
                fieldId: "custevent696"
            });
            var field_case_procedure_custevent697 = obj_case_procedure.getText({
                fieldId: "custevent697"
            });
            var field_case_procedure_custevent698 = obj_case_procedure.getText({
                fieldId: "custevent698"
            });
            var field_case_procedure_custevent699 = obj_case_procedure.getText({
                fieldId: "custevent699"
            });
            var field_case_procedure_custevent700 = obj_case_procedure.getText({
                fieldId: "custevent700"
            });
            var field_case_procedure_custevent701 = obj_case_procedure.getText({
                fieldId: "custevent701"
            });
            var field_case_procedure_custevent702 = obj_case_procedure.getText({
                fieldId: "custevent702"
            });
            var field_case_procedure_custevent703 = obj_case_procedure.getText({
                fieldId: "custevent703"
            });
            var field_case_procedure_custevent704 = obj_case_procedure.getText({
                fieldId: "custevent704"
            });
            var field_case_procedure_custevent705 = obj_case_procedure.getText({
                fieldId: "custevent705"
            });
            var field_case_procedure_custevent706 = obj_case_procedure.getText({
                fieldId: "custevent706"
            });
            var field_case_procedure_custevent707 = obj_case_procedure.getText({
                fieldId: "custevent707"
            });
            var field_case_procedure_custevent708 = obj_case_procedure.getText({
                fieldId: "custevent708"
            });
            var field_case_procedure_custevent709 = obj_case_procedure.getText({
                fieldId: "custevent709"
            });
            var field_case_procedure_custevent710 = obj_case_procedure.getValue({
                fieldId: "custevent710"
            });
            var field_case_procedure_custevent711 = obj_case_procedure.getValue({
                fieldId: "custevent711"
            });
            var field_case_procedure_custevent712 = obj_case_procedure.getValue({
                fieldId: "custevent712"
            });
            var field_case_procedure_custevent713 = obj_case_procedure.getValue({
                fieldId: "custevent713"
            });
            var field_case_procedure_custevent714 = obj_case_procedure.getValue({
                fieldId: "custevent714"
            });
            var field_case_procedure_custevent715 = obj_case_procedure.getValue({
                fieldId: "custevent715"
            });
            var field_case_procedure_custevent716 = obj_case_procedure.getValue({
                fieldId: "custevent716"
            });
            var field_case_procedure_custevent717 = obj_case_procedure.getValue({
                fieldId: "custevent717"
            });
            var field_case_procedure_custevent718 = obj_case_procedure.getValue({
                fieldId: "custevent718"
            });
            var field_case_procedure_custevent719 = obj_case_procedure.getText({
                fieldId: "custevent719"
            });
            var field_case_procedure_custevent720 = obj_case_procedure.getText({
                fieldId: "custevent720"
            });
            var field_case_procedure_custevent721 = obj_case_procedure.getText({
                fieldId: "custevent721"
            });
            var field_case_procedure_custevent655 = obj_case_procedure.getText({
                fieldId: "custevent655"
            });
            var field_case_procedure_custevent656 = obj_case_procedure.getText({
                fieldId: "custevent656"
            });
            var field_case_procedure_custevent657 = obj_case_procedure.getText({
                fieldId: "custevent657"
            });
            var field_case_procedure_custevent658 = obj_case_procedure.getText({
                fieldId: "custevent658"
            });
            var field_case_procedure_custevent659 = obj_case_procedure.getText({
                fieldId: "custevent659"
            });
            var field_case_procedure_custevent660 = obj_case_procedure.getText({
                fieldId: "custevent660"
            });
            var field_case_procedure_custevent661 = obj_case_procedure.getText({
                fieldId: "custevent661"
            });
            var field_case_procedure_custevent576 = obj_case_procedure.getText({
                fieldId: "custevent576"
            });
            var field_case_procedure_custevent577 = obj_case_procedure.getValue({
                fieldId: "custevent577"
            });
            var field_case_procedure_custevent662 = obj_case_procedure.getText({
                fieldId: "custevent662"
            });
            var field_case_procedure_custevent794 = obj_case_procedure.getText({
                fieldId: "custevent794"
            });
            var field_case_procedure_custevent795 = obj_case_procedure.getText({
                fieldId: "custevent795"
            });
            var field_case_procedure_custevent570 = obj_case_procedure.getText({
                fieldId: "custevent570"
            });
            var field_case_procedure_custevent573 = obj_case_procedure.getText({
                fieldId: "custevent573"
            });
            var field_case_procedure_custevent574 = obj_case_procedure.getText({
                fieldId: "custevent574"
            });
            var field_case_procedure_custevent572 = obj_case_procedure.getText({
                fieldId: "custevent572"
            });
            var field_case_procedure_custevent575 = obj_case_procedure.getText({
                fieldId: "custevent575"
            });
            var field_case_procedure_custevent202 = obj_case_procedure.getText({
                fieldId: "custevent202"
            });
            var field_case_procedure_custevent197 = obj_case_procedure.getText({
                fieldId: "custevent197"
            });
            var field_case_procedure_custevent857 = obj_case_procedure.getText({
                fieldId: "custevent857"
            });
            var field_case_procedure_custevent803 = obj_case_procedure.getValue({
                fieldId: "custevent803"
            });
            var field_case_procedure_custevent804 = obj_case_procedure.getText({
                fieldId: "custevent804"
            });
            var field_case_procedure_custevent805 = obj_case_procedure.getText({
                fieldId: "custevent805"
            });
            var field_case_procedure_custevent806 = obj_case_procedure.getText({
                fieldId: "custevent806"
            });
            var field_case_procedure_custevent807 = obj_case_procedure.getText({
                fieldId: "custevent807"
            });
            var field_case_procedure_custevent808 = obj_case_procedure.getText({
                fieldId: "custevent808"
            });

            if (field_case_procedure_custevent840 != null) {
                var fileObj_image_1 = file.load({
                    id: field_case_procedure_custevent840
                });
                file_content_image_1 = fileObj_image_1.getContents();
            } else {
                file_content_image_1 = "";
            }
            if (field_case_procedure_custevent841 != null) {
                var fileObj_image_2 = file.load({
                    id: field_case_procedure_custevent841
                });
                file_content_image_2 = fileObj_image_2.getContents();
            } else {
                file_content_image_2 = "";
            }
            if (field_case_procedure_custevent842 != null) {
                var fileObj_image_3 = file.load({
                    id: field_case_procedure_custevent842
                });
                file_content_image_3 = fileObj_image_3.getContents();
            } else {
                file_content_image_3 = "";
            }
            if (field_case_procedure_custevent843 != null) {
                var fileObj_image_4 = file.load({
                    id: field_case_procedure_custevent843
                });
                file_content_image_4 = fileObj_image_4.getContents();
            } else {
                file_content_image_4 = "";
            }
            if (field_case_procedure_custevent844 != null) {
                var fileObj_image_5 = file.load({
                    id: field_case_procedure_custevent844
                });
                file_content_image_5 = fileObj_image_5.getContents();
            } else {
                file_content_image_5 = "";
            }
            if (field_case_procedure_custevent845 != null) {
                var fileObj_image_6 = file.load({
                    id: field_case_procedure_custevent845
                });
                file_content_image_6 = fileObj_image_6.getContents();
            } else {
                file_content_image_6 = "";
            }
            if (field_case_procedure_custevent846 != null) {
                var fileObj_image_7 = file.load({
                    id: field_case_procedure_custevent846
                });
                file_content_image_7 = fileObj_image_7.getContents();
            } else {
                file_content_image_7 = "";
            }
            if (field_case_procedure_custevent847 != null) {
                var fileObj_image_8 = file.load({
                    id: field_case_procedure_custevent847
                });
                file_content_image_8 = fileObj_image_8.getContents();
            } else {
                file_content_image_8 = "";
            }
            if (field_case_procedure_custevent848 != null) {
                var fileObj_image_9 = file.load({
                    id: field_case_procedure_custevent848
                });
                file_content_image_9 = fileObj_image_9.getContents();
            } else {
                file_content_image_9 = "";
            }
            if (field_case_procedure_custevent849 != null) {
                var fileObj_image_10 = file.load({
                    id: field_case_procedure_custevent849
                });
                file_content_image_10 = fileObj_image_10.getContents();
            } else {
                file_content_image_19 = "";
            }
            if (field_case_procedure_custevent850 != null) {
                var fileObj_image_11 = file.load({
                    id: field_case_procedure_custevent850
                });
                file_content_image_11 = fileObj_image_11.getContents();
            } else {
                file_content_image_11 = "";
            }
            if (field_case_procedure_custevent851 != null) {
                var fileObj_image_12 = file.load({
                    id: field_case_procedure_custevent851
                });
                file_content_image_12 = fileObj_image_12.getContents();
            } else {
                file_content_image_12 = "";
            }
            if (field_case_procedure_custevent852 != null) {
                var fileObj_image_13 = file.load({
                    id: field_case_procedure_custevent852
                });
                file_content_image_13 = fileObj_image_13.getContents();
            } else {
                file_content_image_13 = "";
            }
            if (field_case_procedure_custevent853 != null) {
                var fileObj_image_14 = file.load({
                    id: field_case_procedure_custevent853
                });
                file_content_image_14 = fileObj_image_14.getContents();
            } else {
                file_content_image_14 = "";
            }
            if (field_case_procedure_custevent854 != null) {
                var fileObj_image_15 = file.load({
                    id: field_case_procedure_custevent854
                });
                file_content_image_15 = fileObj_image_15.getContents();
            } else {
                file_content_image_15 = "";
            }
            var field_case_procedure_custevent269 = obj_case_procedure.getText({
                fieldId: "custevent269"
            }) || "";


            if (field_case_procedure_custevent550 == "T") {
                field_case_procedure_custevent550 = true;
            } else if (field_case_procedure_custevent550 == "F") {
                field_case_procedure_custevent550 = false;
            }
            if (field_case_procedure_custevent552 == "T") {
                field_case_procedure_custevent552 = true;
            } else if (field_case_procedure_custevent552 == "F") {
                field_case_procedure_custevent552 = false;
            }
            if (field_case_procedure_custevent553 == "T") {
                field_case_procedure_custevent553 = true;
            } else if (field_case_procedure_custevent553 == "F") {
                field_case_procedure_custevent553 = false;
            }
            if (field_case_procedure_custevent556 == "T") {
                field_case_procedure_custevent556 = true;
            } else if (field_case_procedure_custevent556 == "F") {
                field_case_procedure_custevent556 = false;
            }
            if (field_case_procedure_custevent557 == "T") {
                field_case_procedure_custevent557 = true;
            } else if (field_case_procedure_custevent557 == "F") {
                field_case_procedure_custevent557 = false;
            }
            if (field_case_procedure_custevent722 == "T") {
                field_case_procedure_custevent722 = true;
            } else if (field_case_procedure_custevent722 == "F") {
                field_case_procedure_custevent722 = false;
            }
            if (field_case_procedure_custevent560 == "T") {
                field_case_procedure_custevent560 = true;
            } else if (field_case_procedure_custevent560 == "F") {
                field_case_procedure_custevent560 = false;
            }
            if (field_case_procedure_custevent725 == "T") {
                field_case_procedure_custevent725 = true;
            } else if (field_case_procedure_custevent725 == "F") {
                field_case_procedure_custevent725 = false;
            }
            if (field_case_procedure_custevent726 == "T") {
                field_case_procedure_custevent726 = true;
            } else if (field_case_procedure_custevent726 == "F") {
                field_case_procedure_custevent726 = false;
            }
            if (field_case_procedure_custevent727 == "T") {
                field_case_procedure_custevent727 = true;
            } else if (field_case_procedure_custevent727 == "F") {
                field_case_procedure_custevent727 = false;
            }
            if (field_case_procedure_custevent565 == "T") {
                field_case_procedure_custevent565 = true;
            } else if (field_case_procedure_custevent565 == "F") {
                field_case_procedure_custevent565 = false;
            }
            if (field_case_procedure_custevent564 == "T") {
                field_case_procedure_custevent564 = true;
            } else if (field_case_procedure_custevent564 == "F") {
                field_case_procedure_custevent564 = false;
            }
            if (field_case_procedure_custevent730 == "T") {
                field_case_procedure_custevent730 = true;
            } else if (field_case_procedure_custevent730 == "F") {
                field_case_procedure_custevent730 = false;
            }
            if (field_case_procedure_custevent567 == "T") {
                field_case_procedure_custevent567 = true;
            } else if (field_case_procedure_custevent567 == "F") {
                field_case_procedure_custevent567 = false;
            }
            if (field_case_procedure_custevent731 == "T") {
                field_case_procedure_custevent731 = true;
            } else if (field_case_procedure_custevent731 == "F") {
                field_case_procedure_custevent731 = false;
            }
            if (field_case_procedure_custevent732 == "T") {
                field_case_procedure_custevent732 = true;
            } else if (field_case_procedure_custevent732 == "F") {
                field_case_procedure_custevent732 = false;
            }
            if (field_case_procedure_custevent733 == "T") {
                field_case_procedure_custevent733 = true;
            } else if (field_case_procedure_custevent733 == "F") {
                field_case_procedure_custevent733 = false;
            }
            if (field_case_procedure_custevent734 == "T") {
                field_case_procedure_custevent734 = true;
            } else if (field_case_procedure_custevent734 == "F") {
                field_case_procedure_custevent734 = false;
            }
            if (field_case_procedure_custevent663 == "T") {
                field_case_procedure_custevent663 = true;
            } else if (field_case_procedure_custevent663 == "F") {
                field_case_procedure_custevent663 = false;
            }
            if (field_case_procedure_custevent664 == "T") {
                field_case_procedure_custevent664 = true;
            } else if (field_case_procedure_custevent664 == "F") {
                field_case_procedure_custevent664 = false;
            }
            if (field_case_procedure_custevent665 == "T") {
                field_case_procedure_custevent665 = true;
            } else if (field_case_procedure_custevent665 == "F") {
                field_case_procedure_custevent665 = false;
            }
            if (field_case_procedure_custevent666 == "T") {
                field_case_procedure_custevent666 = true;
            } else if (field_case_procedure_custevent666 == "F") {
                field_case_procedure_custevent666 = false;
            }
            if (field_case_procedure_custevent667 == "T") {
                field_case_procedure_custevent667 = true;
            } else if (field_case_procedure_custevent667 == "F") {
                field_case_procedure_custevent667 = false;
            }
            if (field_case_procedure_custevent668 == "T") {
                field_case_procedure_custevent668 = true;
            } else if (field_case_procedure_custevent668 == "F") {
                field_case_procedure_custevent668 = false;
            }
            if (field_case_procedure_custevent669 == "T") {
                field_case_procedure_custevent669 = true;
            } else if (field_case_procedure_custevent669 == "F") {
                field_case_procedure_custevent669 = false;
            }
            if (field_case_procedure_custevent670 == "T") {
                field_case_procedure_custevent670 = true;
            } else if (field_case_procedure_custevent670 == "F") {
                field_case_procedure_custevent670 = false;
            }
            if (field_case_procedure_custevent710 == "T") {
                field_case_procedure_custevent710 = true;
            } else if (field_case_procedure_custevent710 == "F") {
                field_case_procedure_custevent710 = false;
            }
            if (field_case_procedure_custevent711 == "T") {
                field_case_procedure_custevent711 = true;
            } else if (field_case_procedure_custevent711 == "F") {
                field_case_procedure_custevent711 = false;
            }
            if (field_case_procedure_custevent712 == "T") {
                field_case_procedure_custevent712 = true;
            } else if (field_case_procedure_custevent712 == "F") {
                field_case_procedure_custevent712 = false;
            }
            if (field_case_procedure_custevent713 == "T") {
                field_case_procedure_custevent713 = true;
            } else if (field_case_procedure_custevent713 == "F") {
                field_case_procedure_custevent713 = false;
            }
            if (field_case_procedure_custevent714 == "T") {
                field_case_procedure_custevent714 = true;
            } else if (field_case_procedure_custevent714 == "F") {
                field_case_procedure_custevent714 = false;
            }
            if (field_case_procedure_custevent715 == "T") {
                field_case_procedure_custevent715 = true;
            } else if (field_case_procedure_custevent715 == "F") {
                field_case_procedure_custevent715 = false;
            }
            if (field_case_procedure_custevent716 == "T") {
                field_case_procedure_custevent716 = true;
            } else if (field_case_procedure_custevent716 == "F") {
                field_case_procedure_custevent716 = false;
            }
            if (field_case_procedure_custevent717 == "T") {
                field_case_procedure_custevent717 = true;
            } else if (field_case_procedure_custevent717 == "F") {
                field_case_procedure_custevent717 = false;
            }
            if (field_case_procedure_custevent718 == "T") {
                field_case_procedure_custevent718 = true;
            } else if (field_case_procedure_custevent718 == "F") {
                field_case_procedure_custevent718 = false;
            }

            // SUBLISTS
            // ARRAYS TO RESPONSE SUBLISTS

            /************** MEDICAL INDICATIONS TAB
             * Medical Indications Sublist
             */
            var arr_medicalIndications = [];
            var counterSublist_medicalIndications = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord356' });
            if (counterSublist_medicalIndications > 0) {
                for (i = 0; i < counterSublist_medicalIndications; i++) {
                    var custrecord353 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord353', line: i }) || '';
                    var custrecord355 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord355', line: i }) || '';
                    var custrecord436 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord436', line: i }) || '';
                    var custrecord437 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord437', line: i }) || '';
                    log.debug("custrecord353", custrecord353);
                    arr_medicalIndications.push({
                        "medical_d": custrecord353,
                        "indications": custrecord355,
                        "responsable": custrecord436,
                        "medical_t": custrecord437
                    });
                }
            } else {
                arr_medicalIndications.push("NO DATA");
            }

            /************** SURGICAL NURSING SHEET
             * Medication Sublist
             */
            var arr_medication = [];
            var counterSublist_medication = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord256' });
            if (counterSublist_medication > 0) {
                for (i = 0; i < counterSublist_medication; i++) {
                    custrecord251 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord251', line: i }) || '';
                    custrecord252 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord252', line: i }) || '';
                    custrecord253 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord253', line: i }) || '';
                    custrecord254 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord254', line: i }) || '';
                    custrecord255 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord255', line: i }) || '';

                    arr_medication.push({
                        "drug": custrecord251,
                        "dose": custrecord252,
                        "via": custrecord253,
                        "medical_t": custrecord254,
                        "administer": custrecord255,
                    });
                }
            } else {
                arr_medication.push("NO DATA");
            }

            /************** SURGICAL NURSING SHEET
             * Intravenous solutions Sublist
             */
            var arr_intravenousSolutions = [];
            var counterSublist_intravenousSolutions = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord261' });
            if (counterSublist_intravenousSolutions > 0) {
                for (i = 0; i < counterSublist_intravenousSolutions; i++) {
                    custrecord257 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord257', line: i }) || '';
                    custrecord258 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord258', line: i }) || '';
                    custrecord259 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord259', line: i }) || '';
                    custrecord260 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord260', line: i }) || '';

                    arr_intravenousSolutions.push({
                        "solution": custrecord257,
                        "volume": custrecord258,
                        "startTime": custrecord259,
                        "preparedBy": custrecord260
                    });
                }
            } else {
                arr_intravenousSolutions.push("NO DATA");
            }

            /************** SURGICAL NURSING SHEET
             * Vital signs Sublist
             */
            var arr_vitalSigns = [];
            var counterSublist_vitalSigns = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord285' });
            if (counterSublist_vitalSigns > 0) {
                for (i = 0; i < counterSublist_vitalSigns; i++) {
                    custrecord281 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord281', line: i }) || '';
                    custrecord282 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord282', line: i }) || '';
                    custrecord283 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord283', line: i }) || '';
                    custrecord284 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord284', line: i }) || '';

                    arr_vitalSigns.push({
                        "medical_t": custrecord281,
                        "heartRate": custrecord282,
                        "SPO2": custrecord283,
                        "TAMMHG": custrecord284
                    });
                }
            } else {
                arr_vitalSigns.push("NO DATA");
            }

            /************** SURGICAL NURSING SHEET
             * Cat, probes, drains Sublist
             */
            var arr_catProbesDrains_SNS = [];
            var counterSublist_catProbesDrains_SNS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord427' });
            if (counterSublist_catProbesDrains_SNS > 0) {
                for (i = 0; i < counterSublist_catProbesDrains_SNS; i++) {
                    custrecord428 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord428', line: i }) || '';
                    custrecord429 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord429', line: i }) || '';
                    custrecord430 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord430', line: i }) || '';

                    arr_catProbesDrains_SNS.push({
                        "type": custrecord428,
                        "installedBy": custrecord429,
                        "insertionSite": custrecord430
                    });
                }
            } else {
                arr_catProbesDrains_SNS.push("NO DATA");
            }

            /************** RECOVERY NOTE
             * Intravenous therapy and solutions
             */
            var arr_intravenousTherapySolutions = [];
            var counterSublist_intravenousTherapySolutions = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord273' });
            if (counterSublist_intravenousTherapySolutions > 0) {
                for (i = 0; i < counterSublist_intravenousTherapySolutions; i++) {
                    custrecord266 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord266', line: i }) || '';
                    custrecord267 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord267', line: i }) || '';
                    custrecord268 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord268', line: i }) || '';
                    custrecord269 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord269', line: i }) || '';
                    custrecord270 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord270', line: i }) || '';
                    custrecord271 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord273', fieldId: 'custrecord271', line: i }) || '';

                    arr_intravenousTherapySolutions.push({
                        "solution": custrecord266,
                        "hour": custrecord267,
                        "MIH": custrecord268,
                        "starting": custrecord269,
                        "ending": custrecord270,
                        "preparedBy": custrecord271
                    });
                }
            } else {
                arr_intravenousTherapySolutions.push("NO DATA");
            }

            /************** RECOVERY NOTE
             * Cat, probes, drains Sublist
             */
            var arr_catProbesDrains_RN = [];
            var counterSublist_catProbesDrains_RN = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord265' });
            if (counterSublist_catProbesDrains_RN > 0) {
                for (i = 0; i < counterSublist_catProbesDrains_RN; i++) {
                    custrecord262 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord262', line: i }) || '';
                    custrecord263 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord263', line: i }) || '';
                    custrecord272 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord272', line: i }) || '';
                    custrecord264 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord265', fieldId: 'custrecord264', line: i }) || '';

                    arr_catProbesDrains_RN.push({
                        "type": custrecord262,
                        "insertionSite": custrecord263,
                        "instalationDate": custrecord272,
                        "instaledBy": custrecord264
                    });
                }
            } else {
                arr_catProbesDrains_RN.push("NO DATA");
            }

            /************** RECOVERY NOTE
             * Medication Sublist
             */
            var arr_medication_RN = [];
            var counterSublist_medication_RN = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord280' });
            if (counterSublist_medication_RN > 0) {
                for (i = 0; i < counterSublist_medication_RN; i++) {
                    custrecord274 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord274', line: i }) || '';
                    custrecord275 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord275', line: i }) || '';
                    custrecord277 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord277', line: i }) || '';
                    custrecord278 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord278', line: i }) || '';
                    custrecord279 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord280', fieldId: 'custrecord279', line: i }) || '';

                    arr_medication_RN.push({
                        "drug": custrecord274,
                        "dose": custrecord275,
                        "presentation": custrecord277,
                        "medical_t": custrecord278,
                        "administer": custrecord279
                    });
                }
            } else {
                arr_medication_RN.push("NO DATA");
            }

            /************** RECOVERY NOTE
             * Vital signs Sublist
             */
            var arr_vitalSigns_RN = [];
            var counterSublist_vitalSigns_RN = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord416' });
            if (counterSublist_vitalSigns_RN > 0) {
                for (i = 0; i < counterSublist_vitalSigns_RN; i++) {
                    custrecord417 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord417', line: i }) || '';
                    custrecord418 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord418', line: i }) || '';
                    custrecord419 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord419', line: i }) || '';
                    custrecord420 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord416', fieldId: 'custrecord420', line: i }) || '';

                    arr_vitalSigns_RN.push({
                        "medical_t": custrecord417,
                        "FC": custrecord418,
                        "TA": custrecord419,
                        "SPO2": custrecord420
                    });
                }
            } else {
                arr_vitalSigns_RN.push("NO DATA");
            }

            /************** RECOVERY NOTE
             * Evolution Sublist
             */
            var arr_evolution_RN = [];
            var counterSublist_evolution_RN = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord421' });
            if (counterSublist_evolution_RN > 0) {
                for (i = 0; i < counterSublist_evolution_RN; i++) {
                    custrecord422 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord422', line: i }) || '';
                    custrecord423 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord423', line: i }) || '';
                    custrecord424 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord424', line: i }) || '';
                    custrecord425 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord425', line: i }) || '';
                    custrecord426 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord421', fieldId: 'custrecord426', line: i }) || '';

                    arr_evolution_RN.push({
                        "aldreteScale1": custrecord422,
                        "aldreteScale2": custrecord423,
                        "score": custrecord424,
                        "entry": custrecord425,
                        "discharge": custrecord426
                    });
                }
            } else {
                arr_evolution_RN.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Vital signs HS
             */
            var arr_vitalSigns_HS = [];
            var counterSublist_vitalSigns_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord311' });
            if (counterSublist_vitalSigns_HS > 0) {
                for (i = 0; i < counterSublist_vitalSigns_HS; i++) {
                    custrecord409 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord409', line: i }) || '';
                    custrecord410 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord410', line: i }) || '';
                    custrecord411 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord411', line: i }) || '';
                    custrecord412 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord412', line: i }) || '';
                    custrecord413 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord413', line: i }) || '';
                    custrecord414 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord414', line: i }) || '';
                    custrecord415 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord311', fieldId: 'custrecord415', line: i }) || '';
                    
                    arr_vitalSigns_HS.push({
                        "hour": custrecord409,
                        "FC": custrecord410,
                        "TC": custrecord411,
                        "bloodPressure": custrecord412,
                        "SPO2": custrecord413,
                        "painScale": custrecord414,
                        "breathingFrecuency": custrecord415
                    });
                }
            } else {
                arr_vitalSigns_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Medicines HS
             */
            var arr_medicines_HS = [];
            var counterSublist_medicines_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord317' });
            if (counterSublist_medicines_HS > 0) {
                for (i = 0; i < counterSublist_medicines_HS; i++) {
                    custrecord312 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord312', line: i }) || '';
                    custrecord313 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord313', line: i }) || '';
                    custrecord314 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord314', line: i }) || '';
                    custrecord315 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord315', line: i }) || '';
                    custrecord316 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord317', fieldId: 'custrecord316', line: i }) || '';
                    
                    arr_medicines_HS.push({
                        "medicines": custrecord312,
                        "dose": custrecord313,
                        "frecuency": custrecord314,
                        "via": custrecord315,
                        "hour": custrecord316
                    });
                }
            } else {
                arr_medicines_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Solutions HS
             */
            var arr_solutions_HS = [];
            var counterSublist_solutions_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord325' });
            if (counterSublist_solutions_HS > 0) {
                for (i = 0; i < counterSublist_solutions_HS; i++) {
                    custrecord318 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord318', line: i }) || '';
                    custrecord319 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord319', line: i }) || '';
                    custrecord320 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord320', line: i }) || '';
                    custrecord321 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord321', line: i }) || '';
                    custrecord322 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord322', line: i }) || '';
                    custrecord323 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord323', line: i }) || '';
                    custrecord324 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord325', fieldId: 'custrecord324', line: i }) || '';
                    
                    arr_solutions_HS.push({
                        "no": custrecord318,
                        "solutions": custrecord319,
                        "duration": custrecord320,
                        "start": custrecord321,
                        "finished": custrecord322,
                        "hour": custrecord323,
                        "FXP": custrecord324
                    });
                }
            } else {
                arr_solutions_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Nursing interventions HS
             */
            var arr_nursingInterventions_HS = [];
            var counterSublist_nursingInterventions_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord352' });
            if (counterSublist_nursingInterventions_HS > 0) {
                for (i = 0; i < counterSublist_nursingInterventions_HS; i++) {
                    custrecord349 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord352', fieldId: 'custrecord349', line: i }) || '';
                    custrecord350 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord352', fieldId: 'custrecord350', line: i }) || '';
                    custrecord351 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord352', fieldId: 'custrecord351', line: i }) || '';
                    
                    arr_nursingInterventions_HS.push({
                        "morningShift": custrecord349,
                        "afternoonShift": custrecord350,
                        "nightShift": custrecord351
                    });
                }
            } else {
                arr_nursingInterventions_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Risk of falls HS
             */
            var arr_riskFalls_HS = [];
            var counterSublist_riskFalls_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord337' });
            if (counterSublist_riskFalls_HS > 0) {
                for (i = 0; i < counterSublist_riskFalls_HS; i++) {
                    custrecord331 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord331', line: i }) || '';
                    custrecord332 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord332', line: i }) || '';
                    custrecord333 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord333', line: i }) || '';
                    custrecord334 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord334', line: i }) || '';
                    custrecord335 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord335', line: i }) || '';
                    custrecord336 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord337', fieldId: 'custrecord336', line: i }) || '';
                    
                    arr_riskFalls_HS.push({
                        "judgment": custrecord331,
                        "variables": custrecord332,
                        "score": custrecord333,
                        "TM": custrecord334,
                        "TV": custrecord335,
                        "TN": custrecord336
                    });
                }
            } else {
                arr_riskFalls_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Pressure ulcera HS
             */
            var arr_pressureUlcera_HS = [];
            var counterSublist_pressureUlcera_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord344' });
            if (counterSublist_pressureUlcera_HS > 0) {
                for (i = 0; i < counterSublist_pressureUlcera_HS; i++) {
                    custrecord338 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord338', line: i }) || '';
                    custrecord339 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord339', line: i }) || '';
                    custrecord340 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord340', line: i }) || '';
                    custrecord341 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord341', line: i }) || '';
                    custrecord342 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord342', line: i }) || '';
                    custrecord343 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord344', fieldId: 'custrecord343', line: i }) || '';
                    
                    arr_pressureUlcera_HS.push({
                        "evaluationCriteria": custrecord338,
                        "variables": custrecord339,
                        "score": custrecord340,
                        "TM": custrecord341,
                        "TV": custrecord342,
                        "TN": custrecord343 
                    });
                }
            } else {
                arr_pressureUlcera_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Nursing notes HS
             */
            var arr_nursingNotes_HS = [];
            var counterSublist_nursingNotes_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord348' });
            if (counterSublist_nursingNotes_HS > 0) {
                for (i = 0; i < counterSublist_nursingNotes_HS; i++) {
                    custrecord345 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord348', fieldId: 'custrecord345', line: i }) || '';
                    custrecord346 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord348', fieldId: 'custrecord346', line: i }) || '';
                    custrecord347 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord348', fieldId: 'custrecord347', line: i }) || '';
                    
                    arr_nursingNotes_HS.push({
                        "morningShift": custrecord345,
                        "afternoonShift": custrecord346,
                        "nightShift": custrecord347
                    });
                }
            } else {
                arr_nursingNotes_HS.push("NO DATA");
            }

            /************** HOSPITALIZATION SHEET
             * Cat, drains, probes HS
             */
            var arr_catDrainsProbe_HS = [];
            var counterSublist_catDrainsProbe_HS = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord330' });
            if (counterSublist_catDrainsProbe_HS > 0) {
                for (i = 0; i < counterSublist_catDrainsProbe_HS; i++) {
                    custrecord326 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord326', line: i }) || '';
                    custrecord327 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord327', line: i }) || '';
                    custrecord328 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord328', line: i }) || '';
                    custrecord329 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord330', fieldId: 'custrecord329', line: i }) || '';
                    
                    arr_catDrainsProbe_HS.push({
                        "device": custrecord326,
                        "caliber": custrecord327,
                        "insertionSite": custrecord328,
                        "insertionDate": custrecord329
                    });
                }
            } else {
                arr_catDrainsProbe_HS.push("NO DATA");
            }


            /************** pre-anesthetic evaluation
             * Symbols-Agents
             */
            var arr_symbols_agents= [];
            var counterSublist_symbols_agents = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord408' });
            if (counterSublist_symbols_agents > 0) {
                for (i = 0; i < counterSublist_symbols_agents; i++) {
                    custrecord383 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord383', line: i }) || '';
                    custrecord384 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord384', line: i }) || '';
                    custrecord385 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord385', line: i }) || '';
                    custrecord386 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord386', line: i }) || '';
                    custrecord387 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord387', line: i }) || '';
                    custrecord388 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord388', line: i }) || '';
                    custrecord389 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord389', line: i }) || '';
                    custrecord390 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord390', line: i }) || '';
                    custrecord391 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord391', line: i }) || '';
                    custrecord392 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord392', line: i }) || '';
                    custrecord393 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord393', line: i }) || '';
                    custrecord394 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord394', line: i }) || '';
                    custrecord395 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord395', line: i }) || '';
                    custrecord396 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord396', line: i }) || '';
                    custrecord397 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord397', line: i }) || '';
                    custrecord398 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord398', line: i }) || '';
                    custrecord399 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord399', line: i }) || '';
                    custrecord400 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord400', line: i }) || '';
                    custrecord401=  obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord401', line: i }) || '';
                    custrecord402 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord402', line: i }) || '';
                    custrecord403 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord403', line: i }) || '';
                    custrecord404 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord404', line: i }) || '';
                    custrecord405 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord405', line: i }) || '';
                    custrecord406 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord406', line: i }) || '';
                    custrecord407 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord408', fieldId: 'custrecord407', line: i }) || '';

                    arr_symbols_agents.push({
                        "drugs_solutions": custrecord383,
                        "t08": custrecord384,
                        "t09": custrecord385,
                        "t10": custrecord386,
                        "t11": custrecord387,
                        "t12": custrecord388,
                        "t13": custrecord389,
                        "t14": custrecord390,
                        "t15": custrecord391,
                        "t16": custrecord392,
                        "t17": custrecord393,
                        "t18": custrecord394,
                        "t19": custrecord395,
                        "t20": custrecord396,
                        "t21": custrecord397,
                        "t22": custrecord398,
                        "t23": custrecord399,
                        "t00": custrecord400,
                        "t01": custrecord401,
                        "t02": custrecord402,
                        "t03": custrecord403,
                        "t04": custrecord404,
                        "t05": custrecord405,
                        "t06": custrecord406,
                        "t07": custrecord407

                        

                    });
                }
            } else {
                arr_symbols_agents.push("NO DATA");
            }

/************** pre-anesthetic evaluation
             *times_parameters_signs
             */
            var arr_times_parameters_signs = [];
            var counterSublist_times_parameters_signs = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord382' });
            if (counterSublist_times_parameters_signs > 0) {
                for (i = 0; i < counterSublist_times_parameters_signs; i++) {
                    custrecord357 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord357', line: i }) || '';
                    custrecord358 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord358', line: i }) || '';
                    custrecord359 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord359', line: i }) || '';
                    custrecord360 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord360', line: i }) || '';
                    custrecord361 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord361', line: i }) || '';
                    custrecord362 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord362', line: i }) || '';
                    custrecord363 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord363', line: i }) || '';
                    custrecord364 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord364', line: i }) || '';
                    custrecord365 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord365', line: i }) || '';
                    custrecord366 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord366', line: i }) || '';
                    custrecord367 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord367', line: i }) || '';
                    custrecord368 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord368', line: i }) || '';
                    custrecord369 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord369', line: i }) || '';
                    custrecord370 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord370', line: i }) || '';
                    custrecord371 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord371', line: i }) || '';
                    custrecord372 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord372', line: i }) || '';
                    custrecord373 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord373', line: i }) || '';
                    custrecord374 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord374', line: i }) || '';
                    custrecord375 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord375', line: i }) || '';
                    custrecord376 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord376', line: i }) || '';
                    custrecord377 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord377', line: i }) || '';
                    custrecord378 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord378', line: i }) || '';
                    custrecord379 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord379', line: i }) || '';
                    custrecord380 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord380', line: i }) || '';
                    custrecord381 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord382', fieldId: 'custrecord381', line: i }) || '';
                    
                    arr_times_parameters_signs.push({
                        "parameters_signs": custrecord357,
                        "t08": custrecord358,
                        "t09": custrecord359,
                        "t10": custrecord360,
                        "t11": custrecord361,
                        "t12": custrecord362,
                        "t13": custrecord363,
                        "t14": custrecord364,
                        "t15": custrecord365,
                        "t16": custrecord366,
                        "t17": custrecord367,
                        "t18": custrecord368,
                        "t19": custrecord369,
                        "t20": custrecord370,
                        "t21": custrecord371,
                        "t22": custrecord372,
                        "t23": custrecord373,
                        "t00": custrecord374,
                        "t01": custrecord375,
                        "t02": custrecord376,
                        "t03": custrecord377,
                        "t04": custrecord378,
                        "t05": custrecord379,
                        "t06": custrecord380,
                        "t07": custrecord381
                    });
                }
            } else {
                arr_times_parameters_signs.push("NO DATA");
            }

     
/************** Liquid control
             * Diet
             */
            var arr_diet_LQ = [];
            var counterSublist_diet_LQ = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord182' });
            if (counterSublist_diet_LQ > 0) {
                for (i = 0; i < counterSublist_diet_LQ; i++) {
                    custrecord183 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord182', fieldId: 'custrecord183', line: i }) || '';
                    custrecord180 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord182', fieldId: 'custrecord180', line: i }) || '';
                    custrecord181 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord182', fieldId: 'custrecord181', line: i }) || '';
                    
                    arr_diet_LQ.push({
                        "morning_shift": custrecord183,
                        "afternoon_shift": custrecord180,
                        "night_shift": custrecord181
                    });
                }
            } else {
                arr_diet_LQ.push("NO DATA");
            }
       
/************** Liquid control
             * income
             */
            var arr_income_LQ = [];
            var counterSublist_income_LQ = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord185' });
            if (counterSublist_income_LQ > 0) {
                for (i = 0; i < counterSublist_income_LQ; i++) {
                    custrecord184 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord184', line: i }) || '';
                    custrecord186 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord186', line: i }) || '';
                    custrecord187 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord187', line: i }) || '';
                    custrecord188 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord188', line: i }) || '';
                    custrecord189 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord189', line: i }) || '';
                    custrecord190 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord190', line: i }) || '';
                    custrecord191 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord191', line: i }) || '';
                    custrecord192 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord192', line: i }) || '';
                    custrecord193 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord193', line: i }) || '';
                    custrecord194 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord194', line: i }) || '';
                    custrecord195 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord195', line: i }) || '';
                    custrecord196 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord196', line: i }) || '';
                    custrecord197 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord197', line: i }) || '';
                    custrecord198 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord198', line: i }) || '';
                    custrecord199 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord199', line: i }) || '';
                    custrecord200 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord200', line: i }) || '';
                    custrecord201 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord201', line: i }) || '';
                    custrecord202 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord202', line: i }) || '';
                    custrecord203 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord203', line: i }) || '';
                    custrecord204 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord204', line: i }) || '';
                    custrecord205 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord205', line: i }) || '';
                    custrecord206 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord206', line: i }) || '';
                    custrecord207 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord207', line: i }) || '';
                    custrecord208 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord208', line: i }) || '';
                    custrecord209 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord209', line: i }) || '';
                    custrecord210 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord210', line: i }) || '';
                    custrecord211 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord211', line: i }) || '';
                    custrecord212 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord185', fieldId: 'custrecord212', line: i }) || '';

                    
                    arr_income_LQ.push({
                        "medication_solutions": custrecord184,
                        "t08": custrecord186,
                        "t09": custrecord187,
                        "t10": custrecord188,
                        "t11": custrecord189,
                        "t12": custrecord190,
                        "t13": custrecord191,
                        "t14": custrecord192,
                        "t15": custrecord193,
                        "total1":custrecord194,
                        "t16": custrecord195,
                        "t17": custrecord196,
                        "t18": custrecord197,
                        "t19": custrecord198,
                        "t20": custrecord199,
                        "t21": custrecord200,
                        "t22": custrecord201,
                        "t23": custrecord202,
                        "total2": custrecord203,
                        "t00": custrecord204,
                        "t01": custrecord205,
                        "t02": custrecord206,
                        "t03": custrecord207,
                        "t04": custrecord208,
                        "t05": custrecord209,
                        "t06": custrecord210,
                        "t07": custrecord211,
                        "total3": custrecord212
                    });
                }
            } else {
                arr_income_LQ.push("NO DATA");
            }
            
/************** Liquid control
             * receipts
             */
            var arr_receipts_LQ = [];
            var counterSublist_receipts_LQ = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord214' });
            if (counterSublist_receipts_LQ > 0) {
                for (i = 0; i < counterSublist_receipts_LQ; i++) {
                    custrecord213 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord213', line: i }) || '';
                    custrecord215 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord215', line: i }) || '';
                    custrecord216 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord216', line: i }) || '';
                    custrecord217 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord217', line: i }) || '';
                    custrecord218 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord218', line: i }) || '';
                    custrecord219 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord219', line: i }) || '';
                    custrecord220 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord220', line: i }) || '';
                    custrecord221 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord221', line: i }) || '';
                    custrecord222 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord222', line: i }) || '';
                    custrecord223 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord223', line: i }) || '';
                    custrecord224 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord224', line: i }) || '';
                    custrecord225 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord225', line: i }) || '';
                    custrecord226 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord226', line: i }) || '';
                    custrecord227 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord227', line: i }) || '';
                    custrecord228 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord228', line: i }) || '';
                    custrecord229 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord229', line: i }) || '';
                    custrecord230 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord230', line: i }) || '';
                    custrecord231 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord231', line: i }) || '';
                    custrecord232 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord232', line: i }) || '';
                    custrecord233 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord233', line: i }) || '';
                    custrecord234 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord234', line: i }) || '';
                    custrecord235 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord235', line: i }) || '';
                    custrecord236 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord236', line: i }) || '';
                    custrecord237 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord237', line: i }) || '';
                    custrecord238 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord238', line: i }) || '';
                    custrecord239 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord239', line: i }) || '';
                    custrecord240 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord240', line: i }) || '';
                    custrecord241 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord214', fieldId: 'custrecord241', line: i }) || '';

                    
                    arr_receipts_LQ.push({
                        "receipts": custrecord213,
                        "t08": custrecord215,
                        "t09": custrecord216,
                        "t10": custrecord217,
                        "t11": custrecord218,
                        "t12": custrecord219,
                        "t13": custrecord220,
                        "t14": custrecord221,
                        "t15": custrecord222,
                        "total1":custrecord223,
                        "t16": custrecord224,
                        "t17": custrecord225,
                        "t18": custrecord226,
                        "t19": custrecord227,
                        "t20": custrecord228,
                        "t21": custrecord229,
                        "t22": custrecord230,
                        "t23": custrecord231,
                        "total2": custrecord232,
                        "t00": custrecord233,
                        "t01": custrecord234,
                        "t02": custrecord235,
                        "t03": custrecord236,
                        "t04": custrecord237,
                        "t05": custrecord238,
                        "t06": custrecord239,
                        "t07": custrecord240,
                        "total3": custrecord241
                    });
                }
            } else {
                arr_receipts_LQ.push("NO DATA");
            }


            
/************** Liquid control
             * observations_relevant_data
             */
            var arr_observations_relevant_data_LQ = [];
            var counterSublist_observations_relevant_data_LQ = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord245' });
            if (counterSublist_observations_relevant_data_LQ > 0) {
                for (i = 0; i < counterSublist_observations_relevant_data_LQ; i++) {
                    custrecord242 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord245', fieldId: 'custrecord242', line: i }) || '';
                    custrecord243 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord245', fieldId: 'custrecord243', line: i }) || '';
                    custrecord244 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord245', fieldId: 'custrecord244', line: i }) || '';
                    
                    arr_observations_relevant_data_LQ.push({
                        "morning_shift": custrecord242,
                        "afternoon_shift": custrecord243,
                        "night_shift": custrecord244
                    });
                }
            } else {
                arr_observations_relevant_data_LQ.push("NO DATA");
            }

/************** Liquid control
             * responsable
             */
            var arr_responsable_LQ = [];
            var counterSublist_responsable_LQ = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord250' });
            if (counterSublist_responsable_LQ > 0) {
                for (i = 0; i < counterSublist_responsable_LQ; i++) {
                    custrecord246 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord246', line: i }) || '';
                    custrecord247 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord247', line: i }) || '';
                    custrecord248 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord248', line: i }) || '';
                    custrecord249 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord250', fieldId: 'custrecord249', line: i }) || '';
                    
                    arr_responsable_LQ.push({
                        "responsable": custrecord246,
                        "morning_shift": custrecord247,
                        "afternoon_shift": custrecord248,
                        "night_shift": custrecord249
                    });
                }
            } else {
                arr_responsable_LQ.push("NO DATA");
            }

/************** Evolution Notes
             * arr_evolution_notes
             */
            var arr_evolution_notes = [];
            var counterSublist_evolution_notes = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord431' });
            if (counterSublist_evolution_notes > 0) {
                for (i = 0; i < counterSublist_evolution_notes; i++) {
                    custrecord432 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord432', line: i }) || '';
                    custrecord433 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord433', line: i }) || '';
                    custrecord434 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord434', line: i }) || '';
                    custrecord435 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord431', fieldId: 'custrecord435', line: i }) || '';
                    
                    arr_evolution_notes.push({
                        "date_evolution": custrecord432,
                        "time_evolution": custrecord433,
                        "observations_evolution": custrecord434,
                        "responsable_evolution": custrecord435
                    });
                }
            } else {
                arr_evolution_notes.push("NO DATA");
            }
            

            response_cases.push({
                "typeProcedure": param_typeProcedure,
                "internalid": idProcedure,
                "dateprocedure": dateprocedure,
                "casenumber": field_case_procedure_casenumber,
                "values": [{
                    "startdate": field_case_procedure_startdate,
                    "starttime": field_case_procedure_starttime,
                    "custevent550": field_case_procedure_custevent550,
                    "custevent551": field_case_procedure_custevent551,
                    "custevent552": field_case_procedure_custevent552,
                    "custevent553": field_case_procedure_custevent553,
                    "custevent556": field_case_procedure_custevent556,
                    "custevent557": field_case_procedure_custevent557,
                    "custevent722": field_case_procedure_custevent722,
                    "custevent560": field_case_procedure_custevent560,
                    "custevent725": field_case_procedure_custevent725,
                    "custevent726": field_case_procedure_custevent726,
                    "custevent727": field_case_procedure_custevent727,
                    "custevent723": field_case_procedure_custevent723,
                    "custevent724": field_case_procedure_custevent724,
                    "custevent728": field_case_procedure_custevent728,
                    "custevent729": field_case_procedure_custevent729,
                    "custevent565": field_case_procedure_custevent565,
                    "custevent564": field_case_procedure_custevent564,
                    "custevent730": field_case_procedure_custevent730,
                    "custevent567": field_case_procedure_custevent567,
                    "custevent840": file_content_image_1,
                    "custevent841": file_content_image_2,
                    "custevent842": file_content_image_3,
                    "custevent843": file_content_image_4,
                    "custevent844": file_content_image_5,
                    "custevent845": file_content_image_6,
                    "custevent846": file_content_image_7,
                    "custevent847": file_content_image_8,
                    "custevent848": file_content_image_9,
                    "custevent849": file_content_image_10,
                    "custevent850": file_content_image_11,
                    "custevent851": file_content_image_12,
                    "custevent852": file_content_image_13,
                    "custevent853": file_content_image_14,
                    "custevent854": file_content_image_15,
                    "custevent269": field_case_procedure_custevent269,
                    "custevent731": field_case_procedure_custevent731,
                    "custevent732": field_case_procedure_custevent732,
                    "custevent733": field_case_procedure_custevent733,
                    "custevent734": field_case_procedure_custevent734,
                    "custevent735": field_case_procedure_custevent735,
                    "custevent736": field_case_procedure_custevent736,
                    "custevent737": field_case_procedure_custevent737,
                    "custevent738": field_case_procedure_custevent738,
                    "custevent739": field_case_procedure_custevent739,
                    "custevent740": field_case_procedure_custevent740,
                    "custevent741": field_case_procedure_custevent741,
                    "custevent742": field_case_procedure_custevent742,
                    "custevent743": field_case_procedure_custevent743,
                    "custevent744": field_case_procedure_custevent744,
                    "custevent745": field_case_procedure_custevent745,
                    "custevent746": field_case_procedure_custevent746,
                    "custevent747": field_case_procedure_custevent747,
                    "custevent748": field_case_procedure_custevent748,
                    "custevent749": field_case_procedure_custevent749,
                    "custevent750": field_case_procedure_custevent750,
                    "custevent751": field_case_procedure_custevent751,
                    "custevent752": field_case_procedure_custevent752,
                    "custevent753": field_case_procedure_custevent753,
                    "custevent754": field_case_procedure_custevent754,
                    "custevent755": field_case_procedure_custevent755,
                    "custevent756": field_case_procedure_custevent756,
                    "custevent757": field_case_procedure_custevent757,
                    "custevent758": field_case_procedure_custevent758,
                    "custevent759": field_case_procedure_custevent759,
                    "custevent760": field_case_procedure_custevent760,
                    "custevent761": field_case_procedure_custevent761,
                    "custevent762": field_case_procedure_custevent762,
                    "custevent763": field_case_procedure_custevent763,
                    "custevent764": field_case_procedure_custevent764,
                    "custevent765": field_case_procedure_custevent765,
                    "custevent766": field_case_procedure_custevent766,
                    "custevent767": field_case_procedure_custevent767,
                    "custevent768": field_case_procedure_custevent768,
                    "custevent769": field_case_procedure_custevent769,
                    "custevent770": field_case_procedure_custevent770,
                    "custevent771": field_case_procedure_custevent771,
                    "custevent772": field_case_procedure_custevent772,
                    "custevent773": field_case_procedure_custevent773,
                    "custevent774": field_case_procedure_custevent774,
                    "custevent775": field_case_procedure_custevent775,
                    "custevent776": field_case_procedure_custevent776,
                    "custevent777": field_case_procedure_custevent777,
                    "custevent778": field_case_procedure_custevent778,
                    "custevent779": field_case_procedure_custevent779,
                    "custevent780": field_case_procedure_custevent780,
                    "custevent781": field_case_procedure_custevent781,
                    "custevent782": field_case_procedure_custevent782,
                    "custevent783": field_case_procedure_custevent783,
                    "custevent784": field_case_procedure_custevent784,
                    "custevent792": field_case_procedure_custevent792,
                    "custevent793": field_case_procedure_custevent793,
                    "custevent785": field_case_procedure_custevent785,
                    "custevent786": field_case_procedure_custevent786,
                    "custevent787": field_case_procedure_custevent787,
                    "custevent788": field_case_procedure_custevent788,
                    "custevent789": field_case_procedure_custevent789,
                    "custevent790": field_case_procedure_custevent790,
                    "custevent791": field_case_procedure_custevent791,
                    "custevent796": field_case_procedure_custevent796,
                    "custevent797": field_case_procedure_custevent797,
                    "custevent798": field_case_procedure_custevent798,
                    "custevent799": field_case_procedure_custevent799,
                    "custevent663": field_case_procedure_custevent663,
                    "custevent664": field_case_procedure_custevent664,
                    "custevent665": field_case_procedure_custevent665,
                    "custevent666": field_case_procedure_custevent666,
                    "custevent667": field_case_procedure_custevent667,
                    "custevent668": field_case_procedure_custevent668,
                    "custevent669": field_case_procedure_custevent669,
                    "custevent670": field_case_procedure_custevent670,
                    "custevent671": field_case_procedure_custevent671,
                    "custevent672": field_case_procedure_custevent672,
                    "custevent673": field_case_procedure_custevent673,
                    "custevent674": field_case_procedure_custevent674,
                    "custevent675": field_case_procedure_custevent675,
                    "custevent676": field_case_procedure_custevent676,
                    "custevent677": field_case_procedure_custevent677,
                    "custevent681": field_case_procedure_custevent681,
                    "custevent678": field_case_procedure_custevent678,
                    "custevent679": field_case_procedure_custevent679,
                    "custevent685": field_case_procedure_custevent685,
                    "custevent686": field_case_procedure_custevent686,
                    "custevent687": field_case_procedure_custevent687,
                    "custevent688": field_case_procedure_custevent688,
                    "custevent689": field_case_procedure_custevent689,
                    "custevent690": field_case_procedure_custevent690,
                    "custevent694": field_case_procedure_custevent694,
                    "custevent691": field_case_procedure_custevent691,
                    "custevent692": field_case_procedure_custevent692,
                    "custevent693": field_case_procedure_custevent693,
                    "custevent695": field_case_procedure_custevent695,
                    "custevent696": field_case_procedure_custevent696,
                    "custevent697": field_case_procedure_custevent697,
                    "custevent698": field_case_procedure_custevent698,
                    "custevent699": field_case_procedure_custevent699,
                    "custevent700": field_case_procedure_custevent700,
                    "custevent701": field_case_procedure_custevent701,
                    "custevent702": field_case_procedure_custevent702,
                    "custevent703": field_case_procedure_custevent703,
                    "custevent704": field_case_procedure_custevent704,
                    "custevent705": field_case_procedure_custevent705,
                    "custevent706": field_case_procedure_custevent706,
                    "custevent707": field_case_procedure_custevent707,
                    "custevent708": field_case_procedure_custevent708,
                    "custevent709": field_case_procedure_custevent709,
                    "custevent710": field_case_procedure_custevent710,
                    "custevent711": field_case_procedure_custevent711,
                    "custevent712": field_case_procedure_custevent712,
                    "custevent713": field_case_procedure_custevent713,
                    "custevent714": field_case_procedure_custevent714,
                    "custevent715": field_case_procedure_custevent715,
                    "custevent716": field_case_procedure_custevent716,
                    "custevent717": field_case_procedure_custevent717,
                    "custevent718": field_case_procedure_custevent718,
                    "custevent719": field_case_procedure_custevent719,
                    "custevent720": field_case_procedure_custevent720,
                    "custevent721": field_case_procedure_custevent721,
                    "custevent655": field_case_procedure_custevent655,
                    "custevent656": field_case_procedure_custevent656,
                    "custevent657": field_case_procedure_custevent657,
                    "custevent658": field_case_procedure_custevent658,
                    "custevent659": field_case_procedure_custevent659,
                    "custevent660": field_case_procedure_custevent660,
                    "custevent661": field_case_procedure_custevent661,
                    "custevent576": field_case_procedure_custevent576,
                    "custevent577": field_case_procedure_custevent577,
                    "custevent662": field_case_procedure_custevent662,
                    "custevent794": field_case_procedure_custevent794,
                    "custevent795": field_case_procedure_custevent795,
                    "custevent570": field_case_procedure_custevent570,
                    "custevent573": field_case_procedure_custevent573,
                    "custevent574": field_case_procedure_custevent574,
                    "custevent572": field_case_procedure_custevent572,
                    "custevent575": field_case_procedure_custevent575,
                    "custevent202": field_case_procedure_custevent202,
                    "custevent197": field_case_procedure_custevent197,
                    "custevent857": field_case_procedure_custevent857,
                    "custevent803": field_case_procedure_custevent803,
                    "custevent804": field_case_procedure_custevent804,
                    "custevent805": field_case_procedure_custevent805,
                    "custevent806": field_case_procedure_custevent806,
                    "custevent807": field_case_procedure_custevent807,
                    "custevent808": field_case_procedure_custevent808,
                    "sublists": [
                        {
                            "medicalIndications": arr_medicalIndications
                        },
                        {
                            "medication": arr_medication
                        },
                        {
                            "intravenousSolutions": arr_intravenousSolutions
                        },
                        {
                            "vitalSigns": arr_vitalSigns
                        },
                        {
                            "catProbesDrains": arr_catProbesDrains_SNS
                        },
                        {
                            "intravenousTherapySolutions_RN": arr_intravenousTherapySolutions
                        },
                        {
                            "catProbesDrains_RN": arr_catProbesDrains_RN
                        },
                        {
                            "medication_RN": arr_medication_RN
                        },
                        {
                            "vitalSigns_RN": arr_vitalSigns_RN
                        },
                        {
                            "evolution_RN": arr_evolution_RN
                        },
                        {
                            "vitalSigns_HS": arr_vitalSigns_HS
                        },
                        {
                            "medicines_HS": arr_medicines_HS
                        },
                        {
                            "solutions_HS": arr_solutions_HS
                        },
                        {
                            "nursingInterventions_HS": arr_nursingInterventions_HS
                        },
                        {
                            "riskFalls_HS": arr_riskFalls_HS
                        },
                        {
                            "pressureUlcera_HS": arr_pressureUlcera_HS
                        },
                        {
                            "nursingNotes_HS": arr_nursingNotes_HS
                        },
                        {
                            "catDrainsProbe_HS": arr_catDrainsProbe_HS
                        },
                        {
                            "symbols_agents": arr_symbols_agents
                        },
                        {
                            "times_parameters_signs": arr_times_parameters_signs
                        },
                        {
                            "diet_LQ": arr_diet_LQ
                        },
                        {
                            "income_LQ": arr_income_LQ
                        },
                        {
                            "receipts_LQ": arr_receipts_LQ
                        },
                        {
                            "observations_relevant_data_LQ": arr_observations_relevant_data_LQ
                        },
                        {
                            "responsable_LQ": arr_responsable_LQ
                        },
                        {
                            "evolution_notes": arr_evolution_notes
                        }
                         
                        
                    ]
                }]
            });

            log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());

            response_cutomer = [{
                procedureValues: response_cases
            }];

        } else if (param_typeProcedure == "noQx") {
            // PARAMETROS de APARATOLOGIA
            var param_custevent648 = objJson.custevent648; // "area texto" // "Observaciones y hallazgos"
            var param_custevent649 = objJson.custevent649; // "texto" // "Responsable de la aplicación"
            var param_custevent650 = objJson.custevent650; // "area texto" // "Recomendaciones específicas"
            var param_custevent651 = objJson.custevent651; // "texto" // "Responsable de toma de fotografías"
            var param_custevent652 = objJson.custevent652; // "multilista" // "Área a tratar"
            var param_custevent653 = objJson.custevent653; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent654 = objJson.custevent654; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent506 = objJson.custevent506; // "numero" // "Peso"
            var param_custevent507 = objJson.custevent507; // "numero" // "Talla"
            var param_custevent541 = objJson.custevent541; // "calculado" // "Indice de masa corporal"
            var param_custevent636 = objJson.custevent636; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent637 = objJson.custevent637; // "multilista" // "Área a tratar"
            var param_custevent639 = objJson.custevent639; // "numero" // "Abdominal"
            var param_custevent640 = objJson.custevent640; // "numero" // "Cadera"
            var param_custevent641 = objJson.custevent641; // "numero" // "Muslo"
            var param_custevent642 = objJson.custevent642; // "numero" // "Brazo"
            var param_custevent643 = objJson.custevent643; // "numero" // "Bicipital"
            var param_custevent644 = objJson.custevent644; // "numero" // "Tricipital"
            var param_custevent645 = objJson.custevent645; // "numero" // "Supraileaco"
            var param_custevent646 = objJson.custevent646; // "numero" // "Subescapular"
            var param_custevent647 = objJson.custevent647; // "numero" // "Abdominal"
            var param_custevent1056 = objJson.custevent1056; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1069 = objJson.custevent1069; // "textlong" // "pintarImagen"
            var param_custevent1020 = objJson.custevent1020; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1038 = objJson.custevent1038; // "texto" // "Responsable de la aplicación"
            var param_custevent1029 = objJson.custevent1029; // "area texto" // "Recomendaciones específicas"
            var param_custevent1047 = objJson.custevent1047; // "texto" // "Responsable de toma de fotografías"
            var param_custevent867 = objJson.custevent867; // "multilista" // "Área a tratar"
            var param_custevent876 = objJson.custevent876; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent858 = objJson.custevent858; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent912 = objJson.custevent912; // "numero" // "Peso"
            var param_custevent921 = objJson.custevent921; // "numero" // "Talla"
            var param_custevent930 = objJson.custevent930; // "calculado" // "Indice de masa corporal"
            var param_custevent885 = objJson.custevent885; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent894 = objJson.custevent894; // "multilista" // "Área a tratar"
            var param_custevent939 = objJson.custevent939; // "numero" // "Abdominal"
            var param_custevent957 = objJson.custevent957; // "numero" // "Cadera"
            var param_custevent966 = objJson.custevent966; // "numero" // "Muslo"
            var param_custevent948 = objJson.custevent948; // "numero" // "Brazo"
            var param_custevent975 = objJson.custevent975; // "numero" // "Bicipital"
            var param_custevent984 = objJson.custevent984; // "numero" // "Tricipital"
            var param_custevent993 = objJson.custevent993; // "numero" // "Supraileaco"
            var param_custevent1002 = objJson.custevent1002; // "numero" // "Subescapular"
            var param_custevent1011 = objJson.custevent1011; // "numero" // "Abdominal"
            var param_custevent1057 = objJson.custevent1057; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1070 = objJson.custevent1070; // "textlong" // "pintarImagen"
            var param_custevent1021 = objJson.custevent1021; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1039 = objJson.custevent1039; // "texto" // "Responsable de la aplicación"
            var param_custevent1030 = objJson.custevent1030; // "area texto" // "Recomendaciones específicas"
            var param_custevent1048 = objJson.custevent1048; // "texto" // "Responsable de toma de fotografías"
            var param_custevent868 = objJson.custevent868; // "multilista" // "Área a tratar"
            var param_custevent877 = objJson.custevent877; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent859 = objJson.custevent859; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent913 = objJson.custevent913; // "numero" // "Peso"
            var param_custevent922 = objJson.custevent922; // "numero" // "Talla"
            var param_custevent931 = objJson.custevent931; // "calculado" // "Indice de masa corporal"
            var param_custevent886 = objJson.custevent886; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent895 = objJson.custevent895; // "multilista" // "Área a tratar"
            var param_custevent940 = objJson.custevent940; // "numero" // "Abdominal"
            var param_custevent958 = objJson.custevent958; // "numero" // "Cadera"
            var param_custevent967 = objJson.custevent967; // "numero" // "Muslo"
            var param_custevent949 = objJson.custevent949; // "numero" // "Brazo"
            var param_custevent976 = objJson.custevent976; // "numero" // "Bicipital"
            var param_custevent985 = objJson.custevent985; // "numero" // "Tricipital"
            var param_custevent994 = objJson.custevent994; // "numero" // "Supraileaco"
            var param_custevent1003 = objJson.custevent1003; // "numero" // "Subescapular"
            var param_custevent1012 = objJson.custevent1012; // "numero" // "Abdominal"
            var param_custevent1058 = objJson.custevent1058; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1071 = objJson.custevent1071; // "textlong" // "pintarImagen"
            var param_custevent1022 = objJson.custevent1022; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1040 = objJson.custevent1040; // "texto" // "Responsable de la aplicación"
            var param_custevent1031 = objJson.custevent1031; // "area texto" // "Recomendaciones específicas"
            var param_custevent1049 = objJson.custevent1049; // "texto" // "Responsable de toma de fotografías"
            var param_custevent869 = objJson.custevent869; // "multilista" // "Área a tratar"
            var param_custevent878 = objJson.custevent878; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent860 = objJson.custevent860; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent914 = objJson.custevent914; // "numero" // "Peso"
            var param_custevent923 = objJson.custevent923; // "numero" // "Talla"
            var param_custevent932 = objJson.custevent932; // "calculado" // "Indice de masa corporal"
            var param_custevent887 = objJson.custevent887; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent896 = objJson.custevent896; // "multilista" // "Área a tratar"
            var param_custevent941 = objJson.custevent941; // "numero" // "Abdominal"
            var param_custevent959 = objJson.custevent959; // "numero" // "Cadera"
            var param_custevent968 = objJson.custevent968; // "numero" // "Muslo"
            var param_custevent950 = objJson.custevent950; // "numero" // "Brazo"
            var param_custevent977 = objJson.custevent977; // "numero" // "Bicipital"
            var param_custevent986 = objJson.custevent986; // "numero" // "Tricipital"
            var param_custevent995 = objJson.custevent995; // "numero" // "Supraileaco"
            var param_custevent1004 = objJson.custevent1004; // "numero" // "Subescapular"
            var param_custevent1013 = objJson.custevent1013; // "numero" // "Abdominal"
            var param_custevent1059 = objJson.custevent1059; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1072 = objJson.custevent1072; // "textlong" // "pintarImagen"
            var param_custevent1023 = objJson.custevent1023; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1041 = objJson.custevent1041; // "texto" // "Responsable de la aplicación"
            var param_custevent1032 = objJson.custevent1032; // "area texto" // "Recomendaciones específicas"
            var param_custevent1050 = objJson.custevent1050; // "texto" // "Responsable de toma de fotografías"
            var param_custevent870 = objJson.custevent870; // "multilista" // "Área a tratar"
            var param_custevent879 = objJson.custevent879; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent861 = objJson.custevent861; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent915 = objJson.custevent915; // "numero" // "Peso"
            var param_custevent924 = objJson.custevent924; // "numero" // "Talla"
            var param_custevent933 = objJson.custevent933; // "calculado" // "Indice de masa corporal"
            var param_custevent888 = objJson.custevent888; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent897 = objJson.custevent897; // "multilista" // "Área a tratar"
            var param_custevent942 = objJson.custevent942; // "numero" // "Abdominal"
            var param_custevent960 = objJson.custevent960; // "numero" // "Cadera"
            var param_custevent969 = objJson.custevent969; // "numero" // "Muslo"
            var param_custevent951 = objJson.custevent951; // "numero" // "Brazo"
            var param_custevent978 = objJson.custevent978; // "numero" // "Bicipital"
            var param_custevent987 = objJson.custevent987; // "numero" // "Tricipital"
            var param_custevent996 = objJson.custevent996; // "numero" // "Supraileaco"
            var param_custevent1005 = objJson.custevent1005; // "numero" // "Subescapular"
            var param_custevent1014 = objJson.custevent1014; // "numero" // "Abdominal"
            var param_custevent1060 = objJson.custevent1060; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1073 = objJson.custevent1073; // "textlong" // "pintarImagen"
            var param_custevent1024 = objJson.custevent1024; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1042 = objJson.custevent1042; // "texto" // "Responsable de la aplicación"
            var param_custevent1033 = objJson.custevent1033; // "area texto" // "Recomendaciones específicas"
            var param_custevent1051 = objJson.custevent1051; // "texto" // "Responsable de toma de fotografías"
            var param_custevent871 = objJson.custevent871; // "multilista" // "Área a tratar"
            var param_custevent880 = objJson.custevent880; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent862 = objJson.custevent862; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent916 = objJson.custevent916; // "numero" // "Peso"
            var param_custevent925 = objJson.custevent925; // "numero" // "Talla"
            var param_custevent934 = objJson.custevent934; // "calculado" // "Indice de masa corporal"
            var param_custevent889 = objJson.custevent889; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent898 = objJson.custevent898; // "multilista" // "Área a tratar"
            var param_custevent943 = objJson.custevent943; // "numero" // "Abdominal"
            var param_custevent961 = objJson.custevent961; // "numero" // "Cadera"
            var param_custevent970 = objJson.custevent970; // "numero" // "Muslo"
            var param_custevent952 = objJson.custevent952; // "numero" // "Brazo"
            var param_custevent979 = objJson.custevent979; // "numero" // "Bicipital"
            var param_custevent988 = objJson.custevent988; // "numero" // "Tricipital"
            var param_custevent997 = objJson.custevent997; // "numero" // "Supraileaco"
            var param_custevent1006 = objJson.custevent1006; // "numero" // "Subescapular"
            var param_custevent1015 = objJson.custevent1015; // "numero" // "Abdominal"
            var param_custevent1061 = objJson.custevent1061; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1074 = objJson.custevent1074; // "textlong" // "pintarImagen"
            var param_custevent1025 = objJson.custevent1025; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1043 = objJson.custevent1043; // "texto" // "Responsable de la aplicación"
            var param_custevent1034 = objJson.custevent1034; // "area texto" // "Recomendaciones específicas"
            var param_custevent1052 = objJson.custevent1052; // "texto" // "Responsable de toma de fotografías"
            var param_custevent872 = objJson.custevent872; // "multilista" // "Área a tratar"
            var param_custevent881 = objJson.custevent881; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent863 = objJson.custevent863; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent917 = objJson.custevent917; // "numero" // "Peso"
            var param_custevent926 = objJson.custevent926; // "numero" // "Talla"
            var param_custevent935 = objJson.custevent935; // "calculado" // "Indice de masa corporal"
            var param_custevent890 = objJson.custevent890; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent899 = objJson.custevent899; // "multilista" // "Área a tratar"
            var param_custevent944 = objJson.custevent944; // "numero" // "Abdominal"
            var param_custevent962 = objJson.custevent962; // "numero" // "Cadera"
            var param_custevent971 = objJson.custevent971; // "numero" // "Muslo"
            var param_custevent953 = objJson.custevent953; // "numero" // "Brazo"
            var param_custevent980 = objJson.custevent980; // "numero" // "Bicipital"
            var param_custevent989 = objJson.custevent989; // "numero" // "Tricipital"
            var param_custevent998 = objJson.custevent998; // "numero" // "Supraileaco"
            var param_custevent1007 = objJson.custevent1007; // "numero" // "Subescapular"
            var param_custevent1016 = objJson.custevent1016; // "numero" // "Abdominal"
            var param_custevent1062 = objJson.custevent1062; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1075 = objJson.custevent1075; // "textlong" // "pintarImagen"
            var param_custevent1026 = objJson.custevent1026; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1044 = objJson.custevent1044; // "texto" // "Responsable de la aplicación"
            var param_custevent1035 = objJson.custevent1035; // "area texto" // "Recomendaciones específicas"
            var param_custevent1053 = objJson.custevent1053; // "texto" // "Responsable de toma de fotografías"
            var param_custevent873 = objJson.custevent873; // "multilista" // "Área a tratar"
            var param_custevent882 = objJson.custevent882; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent864 = objJson.custevent864; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent918 = objJson.custevent918; // "numero" // "Peso"
            var param_custevent927 = objJson.custevent927; // "numero" // "Talla"
            var param_custevent936 = objJson.custevent936; // "calculado" // "Indice de masa corporal"
            var param_custevent891 = objJson.custevent891; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent900 = objJson.custevent900; // "multilista" // "Área a tratar"
            var param_custevent945 = objJson.custevent945; // "numero" // "Abdominal"
            var param_custevent963 = objJson.custevent963; // "numero" // "Cadera"
            var param_custevent972 = objJson.custevent972; // "numero" // "Muslo"
            var param_custevent954 = objJson.custevent954; // "numero" // "Brazo"
            var param_custevent981 = objJson.custevent981; // "numero" // "Bicipital"
            var param_custevent990 = objJson.custevent990; // "numero" // "Tricipital"
            var param_custevent999 = objJson.custevent999; // "numero" // "Supraileaco"
            var param_custevent1008 = objJson.custevent1008; // "numero" // "Subescapular"
            var param_custevent1017 = objJson.custevent1017; // "numero" // "Abdominal"
            var param_custevent1063 = objJson.custevent1063; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1076 = objJson.custevent1076; // "textlong" // "pintarImagen"
            var param_custevent1027 = objJson.custevent1027; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1045 = objJson.custevent1045; // "texto" // "Responsable de la aplicación"
            var param_custevent1036 = objJson.custevent1036; // "area texto" // "Recomendaciones específicas"
            var param_custevent1054 = objJson.custevent1054; // "texto" // "Responsable de toma de fotografías"
            var param_custevent874 = objJson.custevent874; // "multilista" // "Área a tratar"
            var param_custevent883 = objJson.custevent883; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent865 = objJson.custevent865; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent919 = objJson.custevent919; // "numero" // "Peso"
            var param_custevent928 = objJson.custevent928; // "numero" // "Talla"
            var param_custevent937 = objJson.custevent937; // "calculado" // "Indice de masa corporal"
            var param_custevent892 = objJson.custevent892; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent901 = objJson.custevent901; // "multilista" // "Área a tratar"
            var param_custevent946 = objJson.custevent946; // "numero" // "Abdominal"
            var param_custevent964 = objJson.custevent964; // "numero" // "Cadera"
            var param_custevent973 = objJson.custevent973; // "numero" // "Muslo"
            var param_custevent955 = objJson.custevent955; // "numero" // "Brazo"
            var param_custevent982 = objJson.custevent982; // "numero" // "Bicipital"
            var param_custevent991 = objJson.custevent991; // "numero" // "Tricipital"
            var param_custevent1000 = objJson.custevent1000; // "numero" // "Supraileaco"
            var param_custevent1009 = objJson.custevent1009; // "numero" // "Subescapular"
            var param_custevent1018 = objJson.custevent1018; // "numero" // "Abdominal"
            var param_custevent1064 = objJson.custevent1064; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1077 = objJson.custevent1077; // "textlong" // "pintarImagen"
            var param_custevent1028 = objJson.custevent1028; // "area texto" // "Observaciones y hallazgos"
            var param_custevent1046 = objJson.custevent1046; // "texto" // "Responsable de la aplicación"
            var param_custevent1037 = objJson.custevent1037; // "area texto" // "Recomendaciones específicas"
            var param_custevent1055 = objJson.custevent1055; // "texto" // "Responsable de toma de fotografías"
            var param_custevent875 = objJson.custevent875; // "multilista" // "Área a tratar"
            var param_custevent884 = objJson.custevent884; // "multilista" // "Productos adicionales para el tratamiento"
            var param_custevent866 = objJson.custevent866; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent920 = objJson.custevent920; // "numero" // "Peso"
            var param_custevent929 = objJson.custevent929; // "numero" // "Talla"
            var param_custevent938 = objJson.custevent938; // "calculado" // "Indice de masa corporal"
            var param_custevent893 = objJson.custevent893; // "multilista" // "Tratamiento/procedimiento"
            var param_custevent902 = objJson.custevent902; // "multilista" // "Área a tratar"
            var param_custevent947 = objJson.custevent947; // "numero" // "Abdominal"
            var param_custevent965 = objJson.custevent965; // "numero" // "Cadera"
            var param_custevent974 = objJson.custevent974; // "numero" // "Muslo"
            var param_custevent956 = objJson.custevent956; // "numero" // "Brazo"
            var param_custevent983 = objJson.custevent983; // "numero" // "Bicipital"
            var param_custevent992 = objJson.custevent992; // "numero" // "Tricipital"
            var param_custevent1001 = objJson.custevent1001; // "numero" // "Supraileaco"
            var param_custevent1010 = objJson.custevent1010; // "numero" // "Subescapular"
            var param_custevent1019 = objJson.custevent1019; // "numero" // "Abdominal"
            var param_custevent1065 = objJson.custevent1065; // "fecha" // "FECHA DE PROCEDIMIENTO Y APLICACIÓN"
            var param_custevent1078 = objJson.custevent1078; // "textlong" // "pintarImagen"
            var param_custevent269 = objJson.custevent269; // text // "FIRMA DEL CLIENTE DE CONSENTIMIENTO INFORMADO"

            var file_content_firmaCliente = "";

            var obj_case_appliance = record.load({
                type: "supportcase",
                id: idProcedure
            });

            //APARATOLOGIA ALBYA
            var field_case_appliance_casenumber = obj_case_appliance.getText({
                fieldId: "casenumber"
            });
            var field_case_appliance_typeInternal = obj_case_appliance.getText({
                fieldId: "customform"
            });
            var typeInternal = "";
            if (field_case_appliance_typeInternal == "147") {
                typeInternal = "rostro"
            } else if (field_case_appliance_typeInternal == "33") {
                typeInternal = "cuerpo"
            }
            var field_case_appliance_custevent648 = obj_case_appliance.getText({
                fieldId: "custevent648"
            }) || "";
            var field_case_appliance_custevent649 = obj_case_appliance.getText({
                fieldId: "custevent649"
            }) || "";
            var field_case_appliance_custevent650 = obj_case_appliance.getText({
                fieldId: "custevent650"
            }) || "";
            var field_case_appliance_custevent651 = obj_case_appliance.getText({
                fieldId: "custevent651"
            }) || "";
            var field_case_appliance_custevent652 = obj_case_appliance.getValue({
                fieldId: "custevent652"
            }) || "";
            var field_case_appliance_custevent653 = obj_case_appliance.getValue({
                fieldId: "custevent653"
            }) || "";
            var field_case_appliance_custevent654 = obj_case_appliance.getValue({
                fieldId: "custevent654"
            }) || "";
            var field_case_appliance_custevent506 = obj_case_appliance.getText({
                fieldId: "custevent506"
            }) || "";
            var field_case_appliance_custevent507 = obj_case_appliance.getText({
                fieldId: "custevent507"
            }) || "";
            var field_case_appliance_custevent541 = obj_case_appliance.getText({
                fieldId: "custevent541"
            }) || "";
            var field_case_appliance_custevent636 = obj_case_appliance.getValue({
                fieldId: "custevent636"
            }) || "";
            var field_case_appliance_custevent637 = obj_case_appliance.getValue({
                fieldId: "custevent637"
            }) || "";
            var field_case_appliance_custevent639 = obj_case_appliance.getText({
                fieldId: "custevent639"
            }) || "";
            var field_case_appliance_custevent640 = obj_case_appliance.getText({
                fieldId: "custevent640"
            }) || "";
            var field_case_appliance_custevent641 = obj_case_appliance.getText({
                fieldId: "custevent641"
            }) || "";
            var field_case_appliance_custevent642 = obj_case_appliance.getText({
                fieldId: "custevent642"
            }) || "";
            var field_case_appliance_custevent643 = obj_case_appliance.getText({
                fieldId: "custevent643"
            }) || "";
            var field_case_appliance_custevent644 = obj_case_appliance.getText({
                fieldId: "custevent644"
            }) || "";
            var field_case_appliance_custevent645 = obj_case_appliance.getText({
                fieldId: "custevent645"
            }) || "";
            var field_case_appliance_custevent646 = obj_case_appliance.getText({
                fieldId: "custevent646"
            }) || "";
            var field_case_appliance_custevent647 = obj_case_appliance.getText({
                fieldId: "custevent647"
            }) || "";
            var field_case_appliance_custevent1056 = obj_case_appliance.getText({
                fieldId: "custevent1056"
            }) || "";
            var field_case_appliance_custevent1069 = obj_case_appliance.getText({
                fieldId: "custevent1069"
            }) || "";
            var field_case_appliance_custevent1020 = obj_case_appliance.getText({
                fieldId: "custevent1020"
            }) || "";
            var field_case_appliance_custevent1038 = obj_case_appliance.getText({
                fieldId: "custevent1038"
            }) || "";
            var field_case_appliance_custevent1029 = obj_case_appliance.getText({
                fieldId: "custevent1029"
            }) || "";
            var field_case_appliance_custevent1047 = obj_case_appliance.getText({
                fieldId: "custevent1047"
            }) || "";
            var field_case_appliance_custevent867 = obj_case_appliance.getValue({
                fieldId: "custevent867"
            }) || "";
            var field_case_appliance_custevent876 = obj_case_appliance.getValue({
                fieldId: "custevent876"
            }) || "";
            var field_case_appliance_custevent858 = obj_case_appliance.getValue({
                fieldId: "custevent858"
            }) || "";
            var field_case_appliance_custevent912 = obj_case_appliance.getText({
                fieldId: "custevent912"
            }) || "";
            var field_case_appliance_custevent921 = obj_case_appliance.getText({
                fieldId: "custevent921"
            }) || "";
            var field_case_appliance_custevent930 = obj_case_appliance.getText({
                fieldId: "custevent930"
            }) || "";
            var field_case_appliance_custevent885 = obj_case_appliance.getValue({
                fieldId: "custevent885"
            }) || "";
            var field_case_appliance_custevent894 = obj_case_appliance.getValue({
                fieldId: "custevent894"
            }) || "";
            var field_case_appliance_custevent939 = obj_case_appliance.getText({
                fieldId: "custevent939"
            }) || "";
            var field_case_appliance_custevent957 = obj_case_appliance.getText({
                fieldId: "custevent957"
            }) || "";
            var field_case_appliance_custevent966 = obj_case_appliance.getText({
                fieldId: "custevent966"
            }) || "";
            var field_case_appliance_custevent948 = obj_case_appliance.getText({
                fieldId: "custevent948"
            }) || "";
            var field_case_appliance_custevent975 = obj_case_appliance.getText({
                fieldId: "custevent975"
            }) || "";
            var field_case_appliance_custevent984 = obj_case_appliance.getText({
                fieldId: "custevent984"
            }) || "";
            var field_case_appliance_custevent993 = obj_case_appliance.getText({
                fieldId: "custevent993"
            }) || "";
            var field_case_appliance_custevent1002 = obj_case_appliance.getText({
                fieldId: "custevent1002"
            }) || "";
            var field_case_appliance_custevent1011 = obj_case_appliance.getText({
                fieldId: "custevent1011"
            }) || "";
            var field_case_appliance_custevent1057 = obj_case_appliance.getText({
                fieldId: "custevent1057"
            }) || "";
            var field_case_appliance_custevent1070 = obj_case_appliance.getText({
                fieldId: "custevent1070"
            }) || "";
            var field_case_appliance_custevent1021 = obj_case_appliance.getText({
                fieldId: "custevent1021"
            }) || "";
            var field_case_appliance_custevent1039 = obj_case_appliance.getText({
                fieldId: "custevent1039"
            }) || "";
            var field_case_appliance_custevent1030 = obj_case_appliance.getText({
                fieldId: "custevent1030"
            }) || "";
            var field_case_appliance_custevent1048 = obj_case_appliance.getText({
                fieldId: "custevent1048"
            }) || "";
            var field_case_appliance_custevent868 = obj_case_appliance.getValue({
                fieldId: "custevent868"
            }) || "";
            var field_case_appliance_custevent877 = obj_case_appliance.getValue({
                fieldId: "custevent877"
            }) || "";
            var field_case_appliance_custevent859 = obj_case_appliance.getValue({
                fieldId: "custevent859"
            }) || "";
            var field_case_appliance_custevent913 = obj_case_appliance.getText({
                fieldId: "custevent913"
            }) || "";
            var field_case_appliance_custevent922 = obj_case_appliance.getText({
                fieldId: "custevent922"
            }) || "";
            var field_case_appliance_custevent931 = obj_case_appliance.getText({
                fieldId: "custevent931"
            }) || "";
            var field_case_appliance_custevent886 = obj_case_appliance.getValue({
                fieldId: "custevent886"
            }) || "";
            var field_case_appliance_custevent895 = obj_case_appliance.getValue({
                fieldId: "custevent895"
            }) || "";
            var field_case_appliance_custevent940 = obj_case_appliance.getText({
                fieldId: "custevent940"
            }) || "";
            var field_case_appliance_custevent958 = obj_case_appliance.getText({
                fieldId: "custevent958"
            }) || "";
            var field_case_appliance_custevent967 = obj_case_appliance.getText({
                fieldId: "custevent967"
            }) || "";
            var field_case_appliance_custevent949 = obj_case_appliance.getText({
                fieldId: "custevent949"
            }) || "";
            var field_case_appliance_custevent976 = obj_case_appliance.getText({
                fieldId: "custevent976"
            }) || "";
            var field_case_appliance_custevent985 = obj_case_appliance.getText({
                fieldId: "custevent985"
            }) || "";
            var field_case_appliance_custevent994 = obj_case_appliance.getText({
                fieldId: "custevent994"
            }) || "";
            var field_case_appliance_custevent1003 = obj_case_appliance.getText({
                fieldId: "custevent1003"
            }) || "";
            var field_case_appliance_custevent1012 = obj_case_appliance.getText({
                fieldId: "custevent1012"
            }) || "";
            var field_case_appliance_custevent1058 = obj_case_appliance.getText({
                fieldId: "custevent1058"
            }) || "";
            var field_case_appliance_custevent1071 = obj_case_appliance.getText({
                fieldId: "custevent1071"
            }) || "";
            var field_case_appliance_custevent1022 = obj_case_appliance.getText({
                fieldId: "custevent1022"
            }) || "";
            var field_case_appliance_custevent1040 = obj_case_appliance.getText({
                fieldId: "custevent1040"
            }) || "";
            var field_case_appliance_custevent1031 = obj_case_appliance.getText({
                fieldId: "custevent1031"
            }) || "";
            var field_case_appliance_custevent1049 = obj_case_appliance.getText({
                fieldId: "custevent1049"
            }) || "";
            var field_case_appliance_custevent869 = obj_case_appliance.getValue({
                fieldId: "custevent869"
            }) || "";
            var field_case_appliance_custevent878 = obj_case_appliance.getValue({
                fieldId: "custevent878"
            }) || "";
            var field_case_appliance_custevent860 = obj_case_appliance.getValue({
                fieldId: "custevent860"
            }) || "";
            var field_case_appliance_custevent914 = obj_case_appliance.getText({
                fieldId: "custevent914"
            }) || "";
            var field_case_appliance_custevent923 = obj_case_appliance.getText({
                fieldId: "custevent923"
            }) || "";
            var field_case_appliance_custevent932 = obj_case_appliance.getText({
                fieldId: "custevent932"
            }) || "";
            var field_case_appliance_custevent887 = obj_case_appliance.getValue({
                fieldId: "custevent887"
            }) || "";
            var field_case_appliance_custevent896 = obj_case_appliance.getValue({
                fieldId: "custevent896"
            }) || "";
            var field_case_appliance_custevent941 = obj_case_appliance.getText({
                fieldId: "custevent941"
            }) || "";
            var field_case_appliance_custevent959 = obj_case_appliance.getText({
                fieldId: "custevent959"
            }) || "";
            var field_case_appliance_custevent968 = obj_case_appliance.getText({
                fieldId: "custevent968"
            }) || "";
            var field_case_appliance_custevent950 = obj_case_appliance.getText({
                fieldId: "custevent950"
            }) || "";
            var field_case_appliance_custevent977 = obj_case_appliance.getText({
                fieldId: "custevent977"
            }) || "";
            var field_case_appliance_custevent986 = obj_case_appliance.getText({
                fieldId: "custevent986"
            }) || "";
            var field_case_appliance_custevent995 = obj_case_appliance.getText({
                fieldId: "custevent995"
            }) || "";
            var field_case_appliance_custevent1004 = obj_case_appliance.getText({
                fieldId: "custevent1004"
            }) || "";
            var field_case_appliance_custevent1013 = obj_case_appliance.getText({
                fieldId: "custevent1013"
            }) || "";
            var field_case_appliance_custevent1059 = obj_case_appliance.getText({
                fieldId: "custevent1059"
            }) || "";
            var field_case_appliance_custevent1072 = obj_case_appliance.getText({
                fieldId: "custevent1072"
            }) || "";
            var field_case_appliance_custevent1023 = obj_case_appliance.getText({
                fieldId: "custevent1023"
            }) || "";
            var field_case_appliance_custevent1041 = obj_case_appliance.getText({
                fieldId: "custevent1041"
            }) || "";
            var field_case_appliance_custevent1032 = obj_case_appliance.getText({
                fieldId: "custevent1032"
            }) || "";
            var field_case_appliance_custevent1050 = obj_case_appliance.getText({
                fieldId: "custevent1050"
            }) || "";
            var field_case_appliance_custevent870 = obj_case_appliance.getValue({
                fieldId: "custevent870"
            }) || "";
            var field_case_appliance_custevent879 = obj_case_appliance.getValue({
                fieldId: "custevent879"
            }) || "";
            var field_case_appliance_custevent861 = obj_case_appliance.getValue({
                fieldId: "custevent861"
            }) || "";
            var field_case_appliance_custevent915 = obj_case_appliance.getText({
                fieldId: "custevent915"
            }) || "";
            var field_case_appliance_custevent924 = obj_case_appliance.getText({
                fieldId: "custevent924"
            }) || "";
            var field_case_appliance_custevent933 = obj_case_appliance.getText({
                fieldId: "custevent933"
            }) || "";
            var field_case_appliance_custevent888 = obj_case_appliance.getValue({
                fieldId: "custevent888"
            }) || "";
            var field_case_appliance_custevent897 = obj_case_appliance.getValue({
                fieldId: "custevent897"
            }) || "";
            var field_case_appliance_custevent942 = obj_case_appliance.getText({
                fieldId: "custevent942"
            }) || "";
            var field_case_appliance_custevent960 = obj_case_appliance.getText({
                fieldId: "custevent960"
            }) || "";
            var field_case_appliance_custevent969 = obj_case_appliance.getText({
                fieldId: "custevent969"
            }) || "";
            var field_case_appliance_custevent951 = obj_case_appliance.getText({
                fieldId: "custevent951"
            }) || "";
            var field_case_appliance_custevent978 = obj_case_appliance.getText({
                fieldId: "custevent978"
            }) || "";
            var field_case_appliance_custevent987 = obj_case_appliance.getText({
                fieldId: "custevent987"
            }) || "";
            var field_case_appliance_custevent996 = obj_case_appliance.getText({
                fieldId: "custevent996"
            }) || "";
            var field_case_appliance_custevent1005 = obj_case_appliance.getText({
                fieldId: "custevent1005"
            }) || "";
            var field_case_appliance_custevent1014 = obj_case_appliance.getText({
                fieldId: "custevent1014"
            }) || "";
            var field_case_appliance_custevent1060 = obj_case_appliance.getText({
                fieldId: "custevent1060"
            }) || "";
            var field_case_appliance_custevent1073 = obj_case_appliance.getText({
                fieldId: "custevent1073"
            }) || "";
            var field_case_appliance_custevent1024 = obj_case_appliance.getText({
                fieldId: "custevent1024"
            }) || "";
            var field_case_appliance_custevent1042 = obj_case_appliance.getText({
                fieldId: "custevent1042"
            }) || "";
            var field_case_appliance_custevent1033 = obj_case_appliance.getText({
                fieldId: "custevent1033"
            }) || "";
            var field_case_appliance_custevent1051 = obj_case_appliance.getText({
                fieldId: "custevent1051"
            }) || "";
            var field_case_appliance_custevent871 = obj_case_appliance.getValue({
                fieldId: "custevent871"
            }) || "";
            var field_case_appliance_custevent880 = obj_case_appliance.getValue({
                fieldId: "custevent880"
            }) || "";
            var field_case_appliance_custevent862 = obj_case_appliance.getValue({
                fieldId: "custevent862"
            }) || "";
            var field_case_appliance_custevent916 = obj_case_appliance.getText({
                fieldId: "custevent916"
            }) || "";
            var field_case_appliance_custevent925 = obj_case_appliance.getText({
                fieldId: "custevent925"
            }) || "";
            var field_case_appliance_custevent934 = obj_case_appliance.getText({
                fieldId: "custevent934"
            }) || "";
            var field_case_appliance_custevent889 = obj_case_appliance.getValue({
                fieldId: "custevent889"
            }) || "";
            var field_case_appliance_custevent898 = obj_case_appliance.getValue({
                fieldId: "custevent898"
            }) || "";
            var field_case_appliance_custevent943 = obj_case_appliance.getText({
                fieldId: "custevent943"
            }) || "";
            var field_case_appliance_custevent961 = obj_case_appliance.getText({
                fieldId: "custevent961"
            }) || "";
            var field_case_appliance_custevent970 = obj_case_appliance.getText({
                fieldId: "custevent970"
            }) || "";
            var field_case_appliance_custevent952 = obj_case_appliance.getText({
                fieldId: "custevent952"
            }) || "";
            var field_case_appliance_custevent979 = obj_case_appliance.getText({
                fieldId: "custevent979"
            }) || "";
            var field_case_appliance_custevent988 = obj_case_appliance.getText({
                fieldId: "custevent988"
            }) || "";
            var field_case_appliance_custevent997 = obj_case_appliance.getText({
                fieldId: "custevent997"
            }) || "";
            var field_case_appliance_custevent1006 = obj_case_appliance.getText({
                fieldId: "custevent1006"
            }) || "";
            var field_case_appliance_custevent1015 = obj_case_appliance.getText({
                fieldId: "custevent1015"
            }) || "";
            var field_case_appliance_custevent1061 = obj_case_appliance.getText({
                fieldId: "custevent1061"
            }) || "";
            var field_case_appliance_custevent1074 = obj_case_appliance.getText({
                fieldId: "custevent1074"
            }) || "";
            var field_case_appliance_custevent1025 = obj_case_appliance.getText({
                fieldId: "custevent1025"
            }) || "";
            var field_case_appliance_custevent1043 = obj_case_appliance.getText({
                fieldId: "custevent1043"
            }) || "";
            var field_case_appliance_custevent1034 = obj_case_appliance.getText({
                fieldId: "custevent1034"
            }) || "";
            var field_case_appliance_custevent1052 = obj_case_appliance.getText({
                fieldId: "custevent1052"
            }) || "";
            var field_case_appliance_custevent872 = obj_case_appliance.getValue({
                fieldId: "custevent872"
            }) || "";
            var field_case_appliance_custevent881 = obj_case_appliance.getValue({
                fieldId: "custevent881"
            }) || "";
            var field_case_appliance_custevent863 = obj_case_appliance.getValue({
                fieldId: "custevent863"
            }) || "";
            var field_case_appliance_custevent917 = obj_case_appliance.getText({
                fieldId: "custevent917"
            }) || "";
            var field_case_appliance_custevent926 = obj_case_appliance.getText({
                fieldId: "custevent926"
            }) || "";
            var field_case_appliance_custevent935 = obj_case_appliance.getText({
                fieldId: "custevent935"
            }) || "";
            var field_case_appliance_custevent890 = obj_case_appliance.getValue({
                fieldId: "custevent890"
            }) || "";
            var field_case_appliance_custevent899 = obj_case_appliance.getValue({
                fieldId: "custevent899"
            }) || "";
            var field_case_appliance_custevent944 = obj_case_appliance.getText({
                fieldId: "custevent944"
            }) || "";
            var field_case_appliance_custevent962 = obj_case_appliance.getText({
                fieldId: "custevent962"
            }) || "";
            var field_case_appliance_custevent971 = obj_case_appliance.getText({
                fieldId: "custevent971"
            }) || "";
            var field_case_appliance_custevent953 = obj_case_appliance.getText({
                fieldId: "custevent953"
            }) || "";
            var field_case_appliance_custevent980 = obj_case_appliance.getText({
                fieldId: "custevent980"
            }) || "";
            var field_case_appliance_custevent989 = obj_case_appliance.getText({
                fieldId: "custevent989"
            }) || "";
            var field_case_appliance_custevent998 = obj_case_appliance.getText({
                fieldId: "custevent998"
            }) || "";
            var field_case_appliance_custevent1007 = obj_case_appliance.getText({
                fieldId: "custevent1007"
            }) || "";
            var field_case_appliance_custevent1016 = obj_case_appliance.getText({
                fieldId: "custevent1016"
            }) || "";
            var field_case_appliance_custevent1062 = obj_case_appliance.getText({
                fieldId: "custevent1062"
            }) || "";
            var field_case_appliance_custevent1075 = obj_case_appliance.getText({
                fieldId: "custevent1075"
            }) || "";
            var field_case_appliance_custevent1026 = obj_case_appliance.getText({
                fieldId: "custevent1026"
            }) || "";
            var field_case_appliance_custevent1044 = obj_case_appliance.getText({
                fieldId: "custevent1044"
            }) || "";
            var field_case_appliance_custevent1035 = obj_case_appliance.getText({
                fieldId: "custevent1035"
            }) || "";
            var field_case_appliance_custevent1053 = obj_case_appliance.getText({
                fieldId: "custevent1053"
            }) || "";
            var field_case_appliance_custevent873 = obj_case_appliance.getValue({
                fieldId: "custevent873"
            }) || "";
            var field_case_appliance_custevent882 = obj_case_appliance.getValue({
                fieldId: "custevent882"
            }) || "";
            var field_case_appliance_custevent864 = obj_case_appliance.getValue({
                fieldId: "custevent864"
            }) || "";
            var field_case_appliance_custevent918 = obj_case_appliance.getText({
                fieldId: "custevent918"
            }) || "";
            var field_case_appliance_custevent927 = obj_case_appliance.getText({
                fieldId: "custevent927"
            }) || "";
            var field_case_appliance_custevent936 = obj_case_appliance.getText({
                fieldId: "custevent936"
            }) || "";
            var field_case_appliance_custevent891 = obj_case_appliance.getValue({
                fieldId: "custevent891"
            }) || "";
            var field_case_appliance_custevent900 = obj_case_appliance.getValue({
                fieldId: "custevent900"
            }) || "";
            var field_case_appliance_custevent945 = obj_case_appliance.getText({
                fieldId: "custevent945"
            }) || "";
            var field_case_appliance_custevent963 = obj_case_appliance.getText({
                fieldId: "custevent963"
            }) || "";
            var field_case_appliance_custevent972 = obj_case_appliance.getText({
                fieldId: "custevent972"
            }) || "";
            var field_case_appliance_custevent954 = obj_case_appliance.getText({
                fieldId: "custevent954"
            }) || "";
            var field_case_appliance_custevent981 = obj_case_appliance.getText({
                fieldId: "custevent981"
            }) || "";
            var field_case_appliance_custevent990 = obj_case_appliance.getText({
                fieldId: "custevent990"
            }) || "";
            var field_case_appliance_custevent999 = obj_case_appliance.getText({
                fieldId: "custevent999"
            }) || "";
            var field_case_appliance_custevent1008 = obj_case_appliance.getText({
                fieldId: "custevent1008"
            }) || "";
            var field_case_appliance_custevent1017 = obj_case_appliance.getText({
                fieldId: "custevent1017"
            }) || "";
            var field_case_appliance_custevent1063 = obj_case_appliance.getText({
                fieldId: "custevent1063"
            }) || "";
            var field_case_appliance_custevent1076 = obj_case_appliance.getText({
                fieldId: "custevent1076"
            }) || "";
            var field_case_appliance_custevent1027 = obj_case_appliance.getText({
                fieldId: "custevent1027"
            }) || "";
            var field_case_appliance_custevent1045 = obj_case_appliance.getText({
                fieldId: "custevent1045"
            }) || "";
            var field_case_appliance_custevent1036 = obj_case_appliance.getText({
                fieldId: "custevent1036"
            }) || "";
            var field_case_appliance_custevent1054 = obj_case_appliance.getText({
                fieldId: "custevent1054"
            }) || "";
            var field_case_appliance_custevent874 = obj_case_appliance.getValue({
                fieldId: "custevent874"
            }) || "";
            var field_case_appliance_custevent883 = obj_case_appliance.getValue({
                fieldId: "custevent883"
            }) || "";
            var field_case_appliance_custevent865 = obj_case_appliance.getValue({
                fieldId: "custevent865"
            }) || "";
            var field_case_appliance_custevent919 = obj_case_appliance.getText({
                fieldId: "custevent919"
            }) || "";
            var field_case_appliance_custevent928 = obj_case_appliance.getText({
                fieldId: "custevent928"
            }) || "";
            var field_case_appliance_custevent937 = obj_case_appliance.getText({
                fieldId: "custevent937"
            }) || "";
            var field_case_appliance_custevent892 = obj_case_appliance.getValue({
                fieldId: "custevent892"
            }) || "";
            var field_case_appliance_custevent901 = obj_case_appliance.getValue({
                fieldId: "custevent901"
            }) || "";
            var field_case_appliance_custevent946 = obj_case_appliance.getText({
                fieldId: "custevent946"
            }) || "";
            var field_case_appliance_custevent964 = obj_case_appliance.getText({
                fieldId: "custevent964"
            }) || "";
            var field_case_appliance_custevent973 = obj_case_appliance.getText({
                fieldId: "custevent973"
            }) || "";
            var field_case_appliance_custevent955 = obj_case_appliance.getText({
                fieldId: "custevent955"
            }) || "";
            var field_case_appliance_custevent982 = obj_case_appliance.getText({
                fieldId: "custevent982"
            }) || "";
            var field_case_appliance_custevent991 = obj_case_appliance.getText({
                fieldId: "custevent991"
            }) || "";
            var field_case_appliance_custevent1000 = obj_case_appliance.getText({
                fieldId: "custevent1000"
            }) || "";
            var field_case_appliance_custevent1009 = obj_case_appliance.getText({
                fieldId: "custevent1009"
            }) || "";
            var field_case_appliance_custevent1018 = obj_case_appliance.getText({
                fieldId: "custevent1018"
            }) || "";
            var field_case_appliance_custevent1064 = obj_case_appliance.getText({
                fieldId: "custevent1064"
            }) || "";
            var field_case_appliance_custevent1077 = obj_case_appliance.getText({
                fieldId: "custevent1077"
            }) || "";
            var field_case_appliance_custevent1028 = obj_case_appliance.getText({
                fieldId: "custevent1028"
            }) || "";
            var field_case_appliance_custevent1046 = obj_case_appliance.getText({
                fieldId: "custevent1046"
            }) || "";
            var field_case_appliance_custevent1037 = obj_case_appliance.getText({
                fieldId: "custevent1037"
            }) || "";
            var field_case_appliance_custevent1055 = obj_case_appliance.getText({
                fieldId: "custevent1055"
            }) || "";
            var field_case_appliance_custevent875 = obj_case_appliance.getValue({
                fieldId: "custevent875"
            }) || "";
            var field_case_appliance_custevent884 = obj_case_appliance.getValue({
                fieldId: "custevent884"
            }) || "";
            var field_case_appliance_custevent866 = obj_case_appliance.getValue({
                fieldId: "custevent866"
            }) || "";
            var field_case_appliance_custevent920 = obj_case_appliance.getText({
                fieldId: "custevent920"
            }) || "";
            var field_case_appliance_custevent929 = obj_case_appliance.getText({
                fieldId: "custevent929"
            }) || "";
            var field_case_appliance_custevent938 = obj_case_appliance.getText({
                fieldId: "custevent938"
            }) || "";
            var field_case_appliance_custevent893 = obj_case_appliance.getValue({
                fieldId: "custevent893"
            }) || "";
            var field_case_appliance_custevent902 = obj_case_appliance.getValue({
                fieldId: "custevent902"
            }) || "";
            var field_case_appliance_custevent947 = obj_case_appliance.getText({
                fieldId: "custevent947"
            }) || "";
            var field_case_appliance_custevent965 = obj_case_appliance.getText({
                fieldId: "custevent965"
            }) || "";
            var field_case_appliance_custevent974 = obj_case_appliance.getText({
                fieldId: "custevent974"
            }) || "";
            var field_case_appliance_custevent956 = obj_case_appliance.getText({
                fieldId: "custevent956"
            }) || "";
            var field_case_appliance_custevent983 = obj_case_appliance.getText({
                fieldId: "custevent983"
            }) || "";
            var field_case_appliance_custevent992 = obj_case_appliance.getText({
                fieldId: "custevent992"
            }) || "";
            var field_case_appliance_custevent1001 = obj_case_appliance.getText({
                fieldId: "custevent1001"
            }) || "";
            var field_case_appliance_custevent1010 = obj_case_appliance.getText({
                fieldId: "custevent1010"
            }) || "";
            var field_case_appliance_custevent1019 = obj_case_appliance.getText({
                fieldId: "custevent1019"
            }) || "";
            var field_case_appliance_custevent1065 = obj_case_appliance.getText({
                fieldId: "custevent1065"
            }) || "";
            var field_case_appliance_custevent1078 = obj_case_appliance.getText({
                fieldId: "custevent1078"
            }) || "";
            var field_case_procedure_custevent269 = obj_case_appliance.getText({
                fieldId: "custevent269"
            }) || "";


            response_cases.push({
                "typeProcedure": param_typeProcedure,
                "internalid": idProcedure,
                "dateprocedure": dateprocedure,
                "casenumber": field_case_procedure_casenumber,
                "typeInternal": typeInternal,
                "values": [{
                    "custevent648": field_case_appliance_custevent648,
                    "custevent649": field_case_appliance_custevent649,
                    "custevent650": field_case_appliance_custevent650,
                    "custevent651": field_case_appliance_custevent651,
                    "custevent652": field_case_appliance_custevent652,
                    "custevent653": field_case_appliance_custevent653,
                    "custevent654": field_case_appliance_custevent654,
                    "custevent506": field_case_appliance_custevent506,
                    "custevent507": field_case_appliance_custevent507,
                    "custevent541": field_case_appliance_custevent541,
                    "custevent636": field_case_appliance_custevent636,
                    "custevent637": field_case_appliance_custevent637,
                    "custevent639": field_case_appliance_custevent639,
                    "custevent640": field_case_appliance_custevent640,
                    "custevent641": field_case_appliance_custevent641,
                    "custevent642": field_case_appliance_custevent642,
                    "custevent643": field_case_appliance_custevent643,
                    "custevent644": field_case_appliance_custevent644,
                    "custevent645": field_case_appliance_custevent645,
                    "custevent646": field_case_appliance_custevent646,
                    "custevent647": field_case_appliance_custevent647,
                    "custevent1056": field_case_appliance_custevent1056,
                    "custevent1069": field_case_appliance_custevent1069,
                    "custevent1020": field_case_appliance_custevent1020,
                    "custevent1038": field_case_appliance_custevent1038,
                    "custevent1029": field_case_appliance_custevent1029,
                    "custevent1047": field_case_appliance_custevent1047,
                    "custevent867": field_case_appliance_custevent867,
                    "custevent876": field_case_appliance_custevent876,
                    "custevent858": field_case_appliance_custevent858,
                    "custevent912": field_case_appliance_custevent912,
                    "custevent921": field_case_appliance_custevent921,
                    "custevent930": field_case_appliance_custevent930,
                    "custevent885": field_case_appliance_custevent885,
                    "custevent894": field_case_appliance_custevent894,
                    "custevent939": field_case_appliance_custevent939,
                    "custevent957": field_case_appliance_custevent957,
                    "custevent966": field_case_appliance_custevent966,
                    "custevent948": field_case_appliance_custevent948,
                    "custevent975": field_case_appliance_custevent975,
                    "custevent984": field_case_appliance_custevent984,
                    "custevent993": field_case_appliance_custevent993,
                    "custevent1002": field_case_appliance_custevent1002,
                    "custevent1011": field_case_appliance_custevent1011,
                    "custevent1057": field_case_appliance_custevent1057,
                    "custevent1070": field_case_appliance_custevent1070,
                    "custevent1021": field_case_appliance_custevent1021,
                    "custevent1039": field_case_appliance_custevent1039,
                    "custevent1030": field_case_appliance_custevent1030,
                    "custevent1048": field_case_appliance_custevent1048,
                    "custevent868": field_case_appliance_custevent868,
                    "custevent877": field_case_appliance_custevent877,
                    "custevent859": field_case_appliance_custevent859,
                    "custevent913": field_case_appliance_custevent913,
                    "custevent922": field_case_appliance_custevent922,
                    "custevent931": field_case_appliance_custevent931,
                    "custevent886": field_case_appliance_custevent886,
                    "custevent895": field_case_appliance_custevent895,
                    "custevent940": field_case_appliance_custevent940,
                    "custevent958": field_case_appliance_custevent958,
                    "custevent967": field_case_appliance_custevent967,
                    "custevent949": field_case_appliance_custevent949,
                    "custevent976": field_case_appliance_custevent976,
                    "custevent985": field_case_appliance_custevent985,
                    "custevent994": field_case_appliance_custevent994,
                    "custevent1003": field_case_appliance_custevent1003,
                    "custevent1012": field_case_appliance_custevent1012,
                    "custevent1058": field_case_appliance_custevent1058,
                    "custevent1071": field_case_appliance_custevent1071,
                    "custevent1022": field_case_appliance_custevent1022,
                    "custevent1040": field_case_appliance_custevent1040,
                    "custevent1031": field_case_appliance_custevent1031,
                    "custevent1049": field_case_appliance_custevent1049,
                    "custevent869": field_case_appliance_custevent869,
                    "custevent878": field_case_appliance_custevent878,
                    "custevent860": field_case_appliance_custevent860,
                    "custevent914": field_case_appliance_custevent914,
                    "custevent923": field_case_appliance_custevent923,
                    "custevent932": field_case_appliance_custevent932,
                    "custevent887": field_case_appliance_custevent887,
                    "custevent896": field_case_appliance_custevent896,
                    "custevent941": field_case_appliance_custevent941,
                    "custevent959": field_case_appliance_custevent959,
                    "custevent968": field_case_appliance_custevent968,
                    "custevent950": field_case_appliance_custevent950,
                    "custevent977": field_case_appliance_custevent977,
                    "custevent986": field_case_appliance_custevent986,
                    "custevent995": field_case_appliance_custevent995,
                    "custevent1004": field_case_appliance_custevent1004,
                    "custevent1013": field_case_appliance_custevent1013,
                    "custevent1059": field_case_appliance_custevent1059,
                    "custevent1072": field_case_appliance_custevent1072,
                    "custevent1023": field_case_appliance_custevent1023,
                    "custevent1041": field_case_appliance_custevent1041,
                    "custevent1032": field_case_appliance_custevent1032,
                    "custevent1050": field_case_appliance_custevent1050,
                    "custevent870": field_case_appliance_custevent870,
                    "custevent879": field_case_appliance_custevent879,
                    "custevent861": field_case_appliance_custevent861,
                    "custevent915": field_case_appliance_custevent915,
                    "custevent924": field_case_appliance_custevent924,
                    "custevent933": field_case_appliance_custevent933,
                    "custevent888": field_case_appliance_custevent888,
                    "custevent897": field_case_appliance_custevent897,
                    "custevent942": field_case_appliance_custevent942,
                    "custevent960": field_case_appliance_custevent960,
                    "custevent969": field_case_appliance_custevent969,
                    "custevent951": field_case_appliance_custevent951,
                    "custevent978": field_case_appliance_custevent978,
                    "custevent987": field_case_appliance_custevent987,
                    "custevent996": field_case_appliance_custevent996,
                    "custevent1005": field_case_appliance_custevent1005,
                    "custevent1014": field_case_appliance_custevent1014,
                    "custevent1060": field_case_appliance_custevent1060,
                    "custevent1073": field_case_appliance_custevent1073,
                    "custevent1024": field_case_appliance_custevent1024,
                    "custevent1042": field_case_appliance_custevent1042,
                    "custevent1033": field_case_appliance_custevent1033,
                    "custevent1051": field_case_appliance_custevent1051,
                    "custevent871": field_case_appliance_custevent871,
                    "custevent880": field_case_appliance_custevent880,
                    "custevent862": field_case_appliance_custevent862,
                    "custevent916": field_case_appliance_custevent916,
                    "custevent925": field_case_appliance_custevent925,
                    "custevent934": field_case_appliance_custevent934,
                    "custevent889": field_case_appliance_custevent889,
                    "custevent898": field_case_appliance_custevent898,
                    "custevent943": field_case_appliance_custevent943,
                    "custevent961": field_case_appliance_custevent961,
                    "custevent970": field_case_appliance_custevent970,
                    "custevent952": field_case_appliance_custevent952,
                    "custevent979": field_case_appliance_custevent979,
                    "custevent988": field_case_appliance_custevent988,
                    "custevent997": field_case_appliance_custevent997,
                    "custevent1006": field_case_appliance_custevent1006,
                    "custevent1015": field_case_appliance_custevent1015,
                    "custevent1061": field_case_appliance_custevent1061,
                    "custevent1074": field_case_appliance_custevent1074,
                    "custevent1025": field_case_appliance_custevent1025,
                    "custevent1043": field_case_appliance_custevent1043,
                    "custevent1034": field_case_appliance_custevent1034,
                    "custevent1052": field_case_appliance_custevent1052,
                    "custevent872": field_case_appliance_custevent872,
                    "custevent881": field_case_appliance_custevent881,
                    "custevent863": field_case_appliance_custevent863,
                    "custevent917": field_case_appliance_custevent917,
                    "custevent926": field_case_appliance_custevent926,
                    "custevent935": field_case_appliance_custevent935,
                    "custevent890": field_case_appliance_custevent890,
                    "custevent899": field_case_appliance_custevent899,
                    "custevent944": field_case_appliance_custevent944,
                    "custevent962": field_case_appliance_custevent962,
                    "custevent971": field_case_appliance_custevent971,
                    "custevent953": field_case_appliance_custevent953,
                    "custevent980": field_case_appliance_custevent980,
                    "custevent989": field_case_appliance_custevent989,
                    "custevent998": field_case_appliance_custevent998,
                    "custevent1007": field_case_appliance_custevent1007,
                    "custevent1016": field_case_appliance_custevent1016,
                    "custevent1062": field_case_appliance_custevent1062,
                    "custevent1075": field_case_appliance_custevent1075,
                    "custevent1026": field_case_appliance_custevent1026,
                    "custevent1044": field_case_appliance_custevent1044,
                    "custevent1035": field_case_appliance_custevent1035,
                    "custevent1053": field_case_appliance_custevent1053,
                    "custevent873": field_case_appliance_custevent873,
                    "custevent882": field_case_appliance_custevent882,
                    "custevent864": field_case_appliance_custevent864,
                    "custevent918": field_case_appliance_custevent918,
                    "custevent927": field_case_appliance_custevent927,
                    "custevent936": field_case_appliance_custevent936,
                    "custevent891": field_case_appliance_custevent891,
                    "custevent900": field_case_appliance_custevent900,
                    "custevent945": field_case_appliance_custevent945,
                    "custevent963": field_case_appliance_custevent963,
                    "custevent972": field_case_appliance_custevent972,
                    "custevent954": field_case_appliance_custevent954,
                    "custevent981": field_case_appliance_custevent981,
                    "custevent990": field_case_appliance_custevent990,
                    "custevent999": field_case_appliance_custevent999,
                    "custevent1008": field_case_appliance_custevent1008,
                    "custevent1017": field_case_appliance_custevent1017,
                    "custevent1063": field_case_appliance_custevent1063,
                    "custevent1076": field_case_appliance_custevent1076,
                    "custevent1027": field_case_appliance_custevent1027,
                    "custevent1045": field_case_appliance_custevent1045,
                    "custevent1036": field_case_appliance_custevent1036,
                    "custevent1054": field_case_appliance_custevent1054,
                    "custevent874": field_case_appliance_custevent874,
                    "custevent883": field_case_appliance_custevent883,
                    "custevent865": field_case_appliance_custevent865,
                    "custevent919": field_case_appliance_custevent919,
                    "custevent928": field_case_appliance_custevent928,
                    "custevent937": field_case_appliance_custevent937,
                    "custevent892": field_case_appliance_custevent892,
                    "custevent901": field_case_appliance_custevent901,
                    "custevent946": field_case_appliance_custevent946,
                    "custevent964": field_case_appliance_custevent964,
                    "custevent973": field_case_appliance_custevent973,
                    "custevent955": field_case_appliance_custevent955,
                    "custevent982": field_case_appliance_custevent982,
                    "custevent991": field_case_appliance_custevent991,
                    "custevent1000": field_case_appliance_custevent1000,
                    "custevent1009": field_case_appliance_custevent1009,
                    "custevent1018": field_case_appliance_custevent1018,
                    "custevent1064": field_case_appliance_custevent1064,
                    "custevent1077": field_case_appliance_custevent1077,
                    "custevent1028": field_case_appliance_custevent1028,
                    "custevent1046": field_case_appliance_custevent1046,
                    "custevent1037": field_case_appliance_custevent1037,
                    "custevent1055": field_case_appliance_custevent1055,
                    "custevent875": field_case_appliance_custevent875,
                    "custevent884": field_case_appliance_custevent884,
                    "custevent866": field_case_appliance_custevent866,
                    "custevent920": field_case_appliance_custevent920,
                    "custevent929": field_case_appliance_custevent929,
                    "custevent938": field_case_appliance_custevent938,
                    "custevent893": field_case_appliance_custevent893,
                    "custevent902": field_case_appliance_custevent902,
                    "custevent947": field_case_appliance_custevent947,
                    "custevent965": field_case_appliance_custevent965,
                    "custevent974": field_case_appliance_custevent974,
                    "custevent956": field_case_appliance_custevent956,
                    "custevent983": field_case_appliance_custevent983,
                    "custevent992": field_case_appliance_custevent992,
                    "custevent1001": field_case_appliance_custevent1001,
                    "custevent1010": field_case_appliance_custevent1010,
                    "custevent1019": field_case_appliance_custevent1019,
                    "custevent1065": field_case_appliance_custevent1065,
                    "custevent1078": field_case_appliance_custevent1078,
                    "custevent269": field_case_procedure_custevent269
                }]
            });

            log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());

            response_cutomer = [{
                procedureValues: response_cases
            }];
        } else {
            response_cases.push({
                "typeProcedure": param_typeProcedure,
                "internalid": param_idProcedure,
                "dateprocedure": "",
                "casenumber": "",
                "typeInternal": "",
                "values": "no values"
            });
            response_cutomer = [{
                procedureValues: response_cases
            }];
        }

        return response_cutomer;
    }

    return {
        get: doGet,
        post: doPost
    };
});