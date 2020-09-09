/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

   define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidset, format, https, url, xml, render, runtime) {
    function doset(params) {}


 function getSublist(sublist) {
    //   log.debug("sublist",sublist);
 }


    function doPost(params) {

        var scriptObj = runtime.getCurrentScript();
        var objJson;
     
      var sublist = params.sublist;
     
    
        // if (typeof params === "object") {
        //   objJson = params;
        // } else {
        //   objJson = JSON.parse(params);
        // }
   
        objJson = JSON.parse(params);
        log.debug("objJson",objJson);
        var param_idCustomer = objJson.idCustomer;
        var param_idProcedure = objJson.idProcedure;
        var param_typeProcedure = objJson.typeProcedure;
        var param_typeInternal = objJson.typeInternal;
        var param_nameDiagnostico = objJson.nameDiagnostico;
        var param_tracing = objJson.tracing;
        log.debug("param_tracing",param_tracing);
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
        log.debug("param_custevent731",param_custevent731);
        log.debug("param_custevent732",param_custevent732);
        log.debug("param_custevent733",param_custevent733);
        log.debug("param_custevent734",param_custevent734);
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
        var param_sublist =  objJson.sublist; // "array" // "sublist
        // log.debug("param_sublist",param_sublist);
      
        // SHARES
        var param_url_firma = objJson.custevent269; // Firma de consentimiento informado

        // GLOBALES
        var response_cutomer = [];
        var response_procedure = [];
        var idProcedure = "";
        //var id_recordCreate_Procedure = "";

        //IMAGENES
        var image_url_img_1;
        var image_url_img_2;
        var image_url_img_3;
        var image_url_img_4;
        var image_url_img_5;
        var image_url_img_6;
        var image_url_img_7;
        var image_url_img_8;
        var image_url_img_9;
        var image_url_img_10;
        var image_url_img_11;
        var image_url_img_12;
        var image_url_img_13;
        var image_url_img_14;
        var image_url_img_15;
        var image_url_img_firmaPx = "";

        // FOLDER CABINET IMAGES
        var folderImage = 2762933;

        if (param_custevent840 != "" && param_custevent840 != undefined) {
            image_url_img_1 = https.get({
                url: param_custevent840
            });
        };
        if (param_custevent841 != "" && param_custevent841 != undefined) {
            image_url_img_2 = https.get({
                url: param_custevent841
            });
        };
        if (param_custevent842 != "" && param_custevent842 != undefined) {
            image_url_img_3 = https.get({
                url: param_custevent842
            });
        };
        if (param_custevent843 != "" && param_custevent843 != undefined) {
            image_url_img_4 = https.get({
                url: param_custevent843
            });
        };
        if (param_custevent844 != "" && param_custevent844 != undefined) {
            image_url_img_5 = https.get({
                url: param_custevent844
            });
        };
        if (param_custevent845 != "" && param_custevent845 != undefined) {
            image_url_img_6 = https.get({
                url: param_custevent845
            });
        };
        if (param_custevent846 != "" && param_custevent846 != undefined) {
            image_url_img_7 = https.get({
                url: param_custevent846
            });
        };
        if (param_custevent847 != "" && param_custevent847 != undefined) {
            image_url_img_8 = https.get({
                url: param_custevent847
            });
        };
        if (param_custevent848 != "" && param_custevent848 != undefined) {
            image_url_img_9 = https.get({
                url: param_custevent848
            });
        };
        if (param_custevent849 != "" && param_custevent849 != undefined) {
            image_url_img_10 = https.get({
                url: param_custevent849
            });
        };
        if (param_custevent850 != "" && param_custevent850 != undefined) {
            image_url_img_11 = https.get({
                url: param_custevent850
            });
        };
        if (param_custevent851 != "" && param_custevent851 != undefined) {
            image_url_img_12 = https.get({
                url: param_custevent851
            });
        };
        if (param_custevent852 != "" && param_custevent852 != undefined) {
            image_url_img_13 = https.get({
                url: param_custevent852
            });
        };
        if (param_custevent853 != "" && param_custevent853 != undefined) {
            image_url_img_14 = https.get({
                url: param_custevent853
            });
        };
        if (param_custevent854 != "" && param_custevent854 != undefined) {
            image_url_img_15 = https.get({
                url: param_custevent854
            });
        };
        if (param_url_firma != "" && param_url_firma != undefined) {
            image_url_img_firmaPx = https.get({
                url: param_url_firma
            });
        }

        // Multilistas
        if (param_custevent652 != "" && param_custevent652 != undefined) {
            arr_custevent652 = param_custevent652.split(",");
            param_custevent652 = arr_custevent652.map(Number);
        }
        if (param_custevent653 != "" && param_custevent653 != undefined) {
            arr_custevent653 = param_custevent653.split(",");
            param_custevent653 = arr_custevent653.map(Number);
        }
        if (param_custevent654 != "" && param_custevent654 != undefined) {
            arr_custevent654 = param_custevent654.split(",");
            param_custevent654 = arr_custevent654.map(Number);
        }
        if (param_custevent636 != "" && param_custevent636 != undefined) {
            arr_custevent636 = param_custevent636.split(",");
            param_custevent636 = arr_custevent636.map(Number);
        }
        if (param_custevent637 != "" && param_custevent637 != undefined) {
            arr_custevent637 = param_custevent637.split(",");
            param_custevent637 = arr_custevent637.map(Number);
        }
        if (param_custevent867 != "" && param_custevent867 != undefined) {
            arr_custevent867 = param_custevent867.split(",");
            param_custevent867 = arr_custevent867.map(Number);
        }
        if (param_custevent876 != "" && param_custevent876 != undefined) {
            arr_custevent876 = param_custevent876.split(",");
            param_custevent876 = arr_custevent876.map(Number);
        }
        if (param_custevent858 != "" && param_custevent858 != undefined) {
            arr_custevent858 = param_custevent858.split(",");
            param_custevent858 = arr_custevent858.map(Number);
        }
        if (param_custevent885 != "" && param_custevent885 != undefined) {
            arr_custevent885 = param_custevent885.split(",");
            param_custevent885 = arr_custevent885.map(Number);
        }
        if (param_custevent894 != "" && param_custevent894 != undefined) {
            arr_custevent894 = param_custevent894.split(",");
            param_custevent894 = arr_custevent894.map(Number);
        }
        if (param_custevent868 != "" && param_custevent868 != undefined) {
            arr_custevent868 = param_custevent868.split(",");
            param_custevent868 = arr_custevent868.map(Number);
        }
        if (param_custevent877 != "" && param_custevent877 != undefined) {
            arr_custevent877 = param_custevent877.split(",");
            param_custevent877 = arr_custevent877.map(Number);
        }
        if (param_custevent859 != "" && param_custevent859 != undefined) {
            arr_custevent859 = param_custevent859.split(",");
            param_custevent859 = arr_custevent859.map(Number);
        }
        if (param_custevent886 != "" && param_custevent886 != undefined) {
            arr_custevent886 = param_custevent886.split(",");
            param_custevent886 = arr_custevent886.map(Number);
        }
        if (param_custevent895 != "" && param_custevent895 != undefined) {
            arr_custevent895 = param_custevent895.split(",");
            param_custevent895 = arr_custevent895.map(Number);
        }
        if (param_custevent869 != "" && param_custevent869 != undefined) {
            arr_custevent869 = param_custevent869.split(",");
            param_custevent869 = arr_custevent869.map(Number);
        }
        if (param_custevent878 != "" && param_custevent878 != undefined) {
            arr_custevent878 = param_custevent878.split(",");
            param_custevent878 = arr_custevent878.map(Number);
        }
        if (param_custevent860 != "" && param_custevent860 != undefined) {
            arr_custevent860 = param_custevent860.split(",");
            param_custevent860 = arr_custevent860.map(Number);
        }
        if (param_custevent887 != "" && param_custevent887 != undefined) {
            arr_custevent887 = param_custevent887.split(",");
            param_custevent887 = arr_custevent887.map(Number);
        }
        if (param_custevent896 != "" && param_custevent896 != undefined) {
            arr_custevent896 = param_custevent896.split(",");
            param_custevent896 = arr_custevent896.map(Number);
        }
        if (param_custevent870 != "" && param_custevent870 != undefined) {
            arr_custevent870 = param_custevent870.split(",");
            param_custevent870 = arr_custevent870.map(Number);
        }
        if (param_custevent879 != "" && param_custevent879 != undefined) {
            arr_custevent879 = param_custevent879.split(",");
            param_custevent879 = arr_custevent879.map(Number);
        }
        if (param_custevent861 != "" && param_custevent861 != undefined) {
            arr_custevent861 = param_custevent861.split(",");
            param_custevent861 = arr_custevent861.map(Number);
        }
        if (param_custevent888 != "" && param_custevent888 != undefined) {
            arr_custevent888 = param_custevent888.split(",");
            param_custevent888 = arr_custevent888.map(Number);
        }
        if (param_custevent897 != "" && param_custevent897 != undefined) {
            arr_custevent897 = param_custevent897.split(",");
            param_custevent897 = arr_custevent897.map(Number);
        }
        if (param_custevent871 != "" && param_custevent871 != undefined) {
            arr_custevent871 = param_custevent871.split(",");
            param_custevent871 = arr_custevent871.map(Number);
        }
        if (param_custevent880 != "" && param_custevent880 != undefined) {
            arr_custevent880 = param_custevent880.split(",");
            param_custevent880 = arr_custevent880.map(Number);
        }
        if (param_custevent862 != "" && param_custevent862 != undefined) {
            arr_custevent862 = param_custevent862.split(",");
            param_custevent862 = arr_custevent862.map(Number);
        }
        if (param_custevent889 != "" && param_custevent889 != undefined) {
            arr_custevent889 = param_custevent889.split(",");
            param_custevent889 = arr_custevent889.map(Number);
        }
        if (param_custevent898 != "" && param_custevent898 != undefined) {
            arr_custevent898 = param_custevent898.split(",");
            param_custevent898 = arr_custevent898.map(Number);
        }
        if (param_custevent872 != "" && param_custevent872 != undefined) {
            arr_custevent872 = param_custevent872.split(",");
            param_custevent872 = arr_custevent872.map(Number);
        }
        if (param_custevent881 != "" && param_custevent881 != undefined) {
            arr_custevent881 = param_custevent881.split(",");
            param_custevent881 = arr_custevent881.map(Number);
        }
        if (param_custevent863 != "" && param_custevent863 != undefined) {
            arr_custevent863 = param_custevent863.split(",");
            param_custevent863 = arr_custevent863.map(Number);
        }
        if (param_custevent890 != "" && param_custevent890 != undefined) {
            arr_custevent890 = param_custevent890.split(",");
            param_custevent890 = arr_custevent890.map(Number);
        }
        if (param_custevent899 != "" && param_custevent899 != undefined) {
            arr_custevent899 = param_custevent899.split(",");
            param_custevent899 = arr_custevent899.map(Number);
        }
        if (param_custevent873 != "" && param_custevent873 != undefined) {
            arr_custevent873 = param_custevent873.split(",");
            param_custevent873 = arr_custevent873.map(Number);
        }
        if (param_custevent882 != "" && param_custevent882 != undefined) {
            arr_custevent882 = param_custevent882.split(",");
            param_custevent882 = arr_custevent882.map(Number);
        }
        if (param_custevent864 != "" && param_custevent864 != undefined) {
            arr_custevent864 = param_custevent864.split(",");
            param_custevent864 = arr_custevent864.map(Number);
        }
        if (param_custevent891 != "" && param_custevent891 != undefined) {
            arr_custevent891 = param_custevent891.split(",");
            param_custevent891 = arr_custevent891.map(Number);
        }
        if (param_custevent900 != "" && param_custevent900 != undefined) {
            arr_custevent900 = param_custevent900.split(",");
            param_custevent900 = arr_custevent900.map(Number);
        }
        if (param_custevent874 != "" && param_custevent874 != undefined) {
            arr_custevent874 = param_custevent874.split(",");
            param_custevent874 = arr_custevent874.map(Number);
        }
        if (param_custevent883 != "" && param_custevent883 != undefined) {
            arr_custevent883 = param_custevent883.split(",");
            param_custevent883 = arr_custevent883.map(Number);
        }
        if (param_custevent865 != "" && param_custevent865 != undefined) {
            arr_custevent865 = param_custevent865.split(",");
            param_custevent865 = arr_custevent865.map(Number);
        }
        if (param_custevent892 != "" && param_custevent892 != undefined) {
            arr_custevent892 = param_custevent892.split(",");
            param_custevent892 = arr_custevent892.map(Number);
        }
        if (param_custevent901 != "" && param_custevent901 != undefined) {
            arr_custevent901 = param_custevent901.split(",");
            param_custevent901 = arr_custevent901.map(Number);
        }
        if (param_custevent875 != "" && param_custevent875 != undefined) {
            arr_custevent875 = param_custevent875.split(",");
            param_custevent875 = arr_custevent875.map(Number);
        }
        if (param_custevent884 != "" && param_custevent884 != undefined) {
            arr_custevent884 = param_custevent884.split(",");
            param_custevent884 = arr_custevent884.map(Number);
        }
        if (param_custevent866 != "" && param_custevent866 != undefined) {
            arr_custevent866 = param_custevent866.split(",");
            param_custevent866 = arr_custevent866.map(Number);
        }
        if (param_custevent893 != "" && param_custevent893 != undefined) {
            arr_custevent893 = param_custevent893.split(",");
            param_custevent893 = arr_custevent893.map(Number);
        }
        if (param_custevent902 != "" && param_custevent902 != undefined) {
            arr_custevent902 = param_custevent902.split(",");
            param_custevent902 = arr_custevent902.map(Number);
        }

        var clienteSeguimiento = record.load({
            type: 'customer',
            id: param_idCustomer
          });


        var seguimiento = record.load({
            type: 'supportcase',
            id: param_tracing
          });
          var fechaCaso = seguimiento.getText({
            fieldId: 'startdate'
          });
          var fechaDeNacimientoSeguimiento = seguimiento.getText({
            fieldId: 'custevent331'
          }); //se cambia el custevent205
          var edadSeguimiento = calcYearInt(fechaDeNacimientoSeguimiento, fechaCaso);
          var generoSeguimiento =clienteSeguimiento.getText({
            fieldId: 'custentity_sexo'
          }) || '';
          var identificacionSeguimiento = clienteSeguimiento.getText({
            fieldId: 'custentity234'
          }) || '';

          var telefonoClienteSeguimiento = clienteSeguimiento.getText({
            fieldId: 'mobilephone'
          });
          var edoCivilSeguimiento = seguimiento.getText({
            fieldId: 'custevent206'
          }) || '';



        if (param_idProcedure != "") {
            //seguimiento del historial clinico
           

            //Busqueda de id de caso procedimiento por id de caso
            var searchCreate_procedureCase = search.create({
                type: search.Type.SUPPORT_CASE,
                columns: [{
                    name: "internalid"
                }],
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
            });

            var obj_case_LoadProcedure = record.load({
                type: record.Type.SUPPORT_CASE,
                id: idProcedure,
                isDynamic: false
            })

            if (param_typeProcedure == "qx") {

                try {
                    var medicalIndications = param_sublist.medicalIndications;

                    log.debug("fechaDeNacimientoSeguimiento",fechaDeNacimientoSeguimiento);
                    log.debug("edadSeguimiento",edadSeguimiento);
                    log.debug("generoSeguimiento",generoSeguimiento);
                    log.debug("identificacionSeguimiento",identificacionSeguimiento);
                    log.debug("telefonoClienteSeguimiento",telefonoClienteSeguimiento);
                    log.debug("edoCivilSeguimiento",edoCivilSeguimiento);
          

                    if (fechaDeNacimientoSeguimiento != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent331",
                            text: fechaDeNacimientoSeguimiento,
                            ignoreFieldChange: true
                        });
                    }

                    
                    if (generoSeguimiento != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent634",
                            text: generoSeguimiento,
                            ignoreFieldChange: true
                        });
                    }
                    if (edoCivilSeguimiento != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent206",
                            text: edoCivilSeguimiento,
                            ignoreFieldChange: true
                        });
                    }



                    getSublist(param_sublist) ;
                    if (param_startdate != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "startdate",
                            text: param_startdate,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_starttime != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "starttime",
                            text: param_starttime,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent550 != "") {
                        if (param_custevent550 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent550",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent551 != "") {
                        if (param_custevent551 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent551",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent552 != "") {
                        if (param_custevent552 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent552",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent553 != "") {
                        if (param_custevent553 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent553",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent556 != "") {
                        if (param_custevent556 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent556",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent557 != "") {
                        if (param_custevent557 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent557",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent722 != "") {
                        if (param_custevent722 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent722",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent560 != "") {
                        if (param_custevent560 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent560",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent725 != "") {
                        if (param_custevent725 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent725",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent726 != "") {
                        if (param_custevent726 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent726",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent727 != "") {
                        if (param_custevent727 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent727",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent723 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent723",
                            value: param_custevent723,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent724 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent724",
                            value: param_custevent724,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent728 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent728",
                            value: param_custevent728,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent729 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent729",
                            value: param_custevent729,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent565 != "") {
                        if (param_custevent565 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent565",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent564 != "") {
                        if (param_custevent564 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent564",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent730 != "") {
                        if (param_custevent730 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent730",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent567 != "") {
                        if (param_custevent567 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent567",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent840 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_1",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_1.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent840",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent841 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_2",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_2.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent841",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent842 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_3",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_3.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent842",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent843 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_4",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_4.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent843",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent844 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_5",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_5.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent844",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent845 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_6",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_6.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent845",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent846 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_7",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_7.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent846",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent847 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_8",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_8.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent847",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent848 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_9",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_9.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent848",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent849 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_10",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_10.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent849",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent850 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_11",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_11.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent850",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent851 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_12",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_12.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent851",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent852 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_13",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_13.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent852",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent853 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_14",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_14.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent853",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent854 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + param_idProcedure + "_image_15",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_15.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent854",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }

                    if (param_url_firma != "") {
                        var objNew_img_firma = file.create({
                            name: param_idCustomer + "_" + idProcedure + "_image_firma",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_firmaPx.body,
                            encoding: file.Encoding.UTF8,
                            folder: -4
                        });
                        var idNew_img_firma = objNew_img_firma.save();
                        var obj_img_firma = file.load({
                            id: idNew_img_firma
                        });
                        var content_img_firma = obj_img_firma.getContents();
                        var url_img_firma = obj_img_firma.url;

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent201',
                            value: url_img_firma,
                            ignoreFieldChange: true
                        });

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent269',
                            value: "data:image/png;base64," + content_img_firma,
                            ignoreFieldChange: true
                        });
                    }
                    log.debug("param_custevent731",param_custevent731);
                    log.debug("param_custevent732",param_custevent732);
                    log.debug("param_custevent733",param_custevent733);
                    log.debug("param_custevent734",param_custevent734);
                    if (param_custevent731 != "") {
                        if (param_custevent731 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent731",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent732 != "") {
                        if (param_custevent732 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent732",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent733 != "") {
                        if (param_custevent733 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent733",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent734 != "") {
                        if (param_custevent734 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent734",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent735 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent735",
                            text: param_custevent735,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent736 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent736",
                            text: param_custevent736,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent737 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent737",
                            text: param_custevent737,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent738 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent738",
                            text: param_custevent738,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent739 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent739",
                            text: param_custevent739,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent740 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent740",
                            text: param_custevent740,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent741 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent741",
                            text: param_custevent741,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent742 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent742",
                            text: param_custevent742,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent743 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent743",
                            text: param_custevent743,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent744 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent744",
                            text: param_custevent744,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent745 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent745",
                            text: param_custevent745,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent746 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent746",
                            text: param_custevent746,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent747 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent747",
                            text: param_custevent747,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent748 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent748",
                            text: param_custevent748,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent749 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent749",
                            text: param_custevent749,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent750 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent750",
                            text: param_custevent750,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent751 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent751",
                            text: param_custevent751,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent752 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent752",
                            text: param_custevent752,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent753 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent753",
                            text: param_custevent753,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent754 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent754",
                            text: param_custevent754,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent755 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent755",
                            text: param_custevent755,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent756 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent756",
                            text: param_custevent756,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent757 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent757",
                            text: param_custevent757,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent758 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent758",
                            text: param_custevent758,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent759 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent759",
                            text: param_custevent759,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent760 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent760",
                            text: param_custevent760,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent761 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent761",
                            text: param_custevent761,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent762 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent762",
                            text: param_custevent762,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent763 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent763",
                            text: param_custevent763,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent764 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent764",
                            text: param_custevent764,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent765 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent765",
                            value: param_custevent765,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent766 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent766",
                            text: param_custevent766,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent767 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent767",
                            text: param_custevent767,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent768 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent768",
                            text: param_custevent768,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent769 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent769",
                            text: param_custevent769,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent770 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent770",
                            text: param_custevent770,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent771 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent771",
                            value: param_custevent771,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent772 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent772",
                            value: param_custevent772,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent773 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent773",
                            text: param_custevent773,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent774 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent774",
                            value: param_custevent774,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent775 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent775",
                            value: param_custevent775,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent776 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent776",
                            text: param_custevent776,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent777 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent777",
                            text: param_custevent777,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent778 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent778",
                            text: param_custevent778,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent779 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent779",
                            text: param_custevent779,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent780 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent780",
                            value: param_custevent780,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent781 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent781",
                            text: param_custevent781,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent782 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent782",
                            text: param_custevent782,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent783 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent783",
                            text: param_custevent783,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent784 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent784",
                            text: param_custevent784,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent792 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent792",
                            value: param_custevent792,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent793 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent793",
                            value: param_custevent793,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent785 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent785",
                            text: param_custevent785,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent786 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent786",
                            text: param_custevent786,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent787 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent787",
                            text: param_custevent787,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent788 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent788",
                            value: param_custevent788,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent789 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent789",
                            text: param_custevent789,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent790 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent790",
                            text: param_custevent790,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent791 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent791",
                            text: param_custevent791,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent796 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent796",
                            text: param_custevent796,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent797 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent797",
                            text: param_custevent797,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent798 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent798",
                            text: param_custevent798,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent799 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent799",
                            text: param_custevent799,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent663 != "") {
                        if (param_custevent663 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent663",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent664 != "") {
                        if (param_custevent664 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent664",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent665 != "") {
                        if (param_custevent665 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent665",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent666 != "") {
                        if (param_custevent666 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent666",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent667 != "") {
                        if (param_custevent667 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent667",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent668 != "") {
                        if (param_custevent668 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent668",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent669 != "") {
                        if (param_custevent669 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent669",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent670 != "") {
                        if (param_custevent670 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent670",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent671 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent671",
                            value: param_custevent671,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent672 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent672",
                            value: param_custevent672,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent673 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent673",
                            value: param_custevent673,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent674 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent674",
                            text: param_custevent674,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent675 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent675",
                            text: param_custevent675,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent676 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent676",
                            text: param_custevent676,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent677 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent677",
                            text: param_custevent677,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent681 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent681",
                            value: param_custevent681,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent678 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent678",
                            text: param_custevent678,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent679 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent679",
                            text: param_custevent679,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent685 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent685",
                            text: param_custevent685,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent686 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent686",
                            text: param_custevent686,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent687 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent687",
                            text: param_custevent687,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent688 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent688",
                            text: param_custevent688,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent689 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent689",
                            value: param_custevent689,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent690 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent690",
                            text: param_custevent690,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent694 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent694",
                            text: param_custevent694,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent691 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent691",
                            text: param_custevent691,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent692 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent692",
                            text: param_custevent692,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent693 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent693",
                            text: param_custevent693,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent695 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent695",
                            text: param_custevent695,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent696 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent696",
                            text: param_custevent696,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent697 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent697",
                            text: param_custevent697,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent698 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent698",
                            text: param_custevent698,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent699 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent699",
                            text: param_custevent699,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent700 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent700",
                            text: param_custevent700,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent701 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent701",
                            text: param_custevent701,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent702 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent702",
                            text: param_custevent702,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent703 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent703",
                            text: param_custevent703,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent704 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent704",
                            text: param_custevent704,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent705 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent705",
                            text: param_custevent705,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent706 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent706",
                            text: param_custevent706,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent707 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent707",
                            text: param_custevent707,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent708 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent708",
                            text: param_custevent708,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent709 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent709",
                            text: param_custevent709,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent710 != "") {
                        if (param_custevent710 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent710",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent711 != "") {
                        if (param_custevent711 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent711",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent712 != "") {
                        if (param_custevent712 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent712",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent713 != "") {
                        if (param_custevent713 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent713",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent714 != "") {
                        if (param_custevent714 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent714",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent715 != "") {
                        if (param_custevent715 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent715",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent716 != "") {
                        if (param_custevent716 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent716",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent717 != "") {
                        if (param_custevent717 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent717",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent718 != "") {
                        if (param_custevent718 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent718",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent719 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent719",
                            text: param_custevent719,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent720 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent720",
                            text: param_custevent720,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent721 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent721",
                            text: param_custevent721,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent655 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent655",
                            text: param_custevent655,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent656 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent656",
                            text: param_custevent656,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent657 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent657",
                            text: param_custevent657,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent658 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent658",
                            text: param_custevent658,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent659 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent659",
                            text: param_custevent659,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent660 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent660",
                            text: param_custevent660,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent661 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent661",
                            text: param_custevent661,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent576 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent576",
                            text: param_custevent576,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent577 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent577",
                            value: param_custevent577,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent662 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent662",
                            text: param_custevent662,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent794 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent794",
                            text: param_custevent794,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent795 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent795",
                            text: param_custevent795,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent570 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent570",
                            text: param_custevent570,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent573 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent573",
                            text: param_custevent573,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent574 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent574",
                            text: param_custevent574,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent572 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent572",
                            text: param_custevent572,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent575 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent575",
                            text: param_custevent575,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent202 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent202",
                            text: param_custevent202,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent197 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent197",
                            text: param_custevent197,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent857 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent857",
                            text: param_custevent857,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent803 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent803",
                            value: param_custevent803,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent804 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent804",
                            text: param_custevent804,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent805 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent805",
                            text: param_custevent805,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent806 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent806",
                            text: param_custevent806,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent807 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent807",
                            text: param_custevent807,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent808 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent808",
                            text: param_custevent808,
                            ignoreFieldChange: true
                        });
                    }
                    //Setear medicalIndications
                    if(param_sublist.medicalIndications.length != 0){
                        var subLength = param_sublist.medicalIndications.length;
                        for(var j = 0 ;j<subLength;j++){
                            var fecha = param_sublist.medicalIndications[j].textDate;
                            var indicaciones = param_sublist.medicalIndications[j].textIndications;
                            var responsable = param_sublist.medicalIndications[j].textResponsable;
                            var tiempo = param_sublist.medicalIndications[j].textTime;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord353",text:fecha,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord355",text:indicaciones,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord436",text:responsable,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord437",text:tiempo,line:j});
                        }
                    }
                    //Setear medication
                    if(param_sublist.medication.length != 0){
                        var subLength = param_sublist.medication.length;
                        for(var j = 0 ;j<subLength;j++){
                            var drug = param_sublist.medication[j].drug;
                            var dose = param_sublist.medication[j].dose;
                            var via = param_sublist.medication[j].via;
                            var medical_t = param_sublist.medication[j].medical_t;
                            var administer = param_sublist.medication[j].administer;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord251",text:drug,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord252",text:dose,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord253",text:via,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord254",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord255",text:administer,line:j});
                            
                        }


                    }
                     //Setear intravenousSolutions
                     if(param_sublist.intravenousSolutions.length != 0){
                        var subLength = param_sublist.intravenousSolutions.length;
                        for(var j = 0 ;j<subLength;j++){
                            var solution = param_sublist.intravenousSolutions[j].solution;
                            var volume = param_sublist.intravenousSolutions[j].volume;
                            var startTime = param_sublist.intravenousSolutions[j].startTime;
                            var preparedBy = param_sublist.intravenousSolutions[j].preparedBy;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord257",text:solution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord258",text:volume,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord259",text:startTime,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord260",text:preparedBy,line:j});
                        }
                    }
                    //Setear vitalSigns
                    if(param_sublist.vitalSigns.length != 0){
                        var subLength = param_sublist.vitalSigns.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medical_t = param_sublist.vitalSigns[j].medical_t;
                            var heartRate = param_sublist.vitalSigns[j].heartRate;
                            var SPO2 = param_sublist.vitalSigns[j].SPO2;
                            var TAMMHG = param_sublist.vitalSigns[j].TAMMHG;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord281",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord282",text:heartRate,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord283",text:SPO2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord284",text:TAMMHG,line:j});
                        }
                    }
                    //Setear catProbesDrains
                    if(param_sublist.catProbesDrains.length != 0){
                        var subLength = param_sublist.catProbesDrains.length;
                        for(var j = 0 ;j<subLength;j++){
                            var type = param_sublist.catProbesDrains[j].type;
                            var installedBy = param_sublist.catProbesDrains[j].installedBy;
                            var insertionSite = param_sublist.catProbesDrains[j].insertionSite;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord427",fieldId:"custrecord428",text:type,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord427",fieldId:"custrecord429",text:installedBy,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord427",fieldId:"custrecord430",text:insertionSite,line:j});
                        }
                    }
                    //Setear intravenousTherapySolutions_RN
                    if(param_sublist.intravenousTherapySolutions_RN.length != 0){
                        var subLength = param_sublist.intravenousTherapySolutions_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var solution = param_sublist.intravenousTherapySolutions_RN[j].solution;
                            var hour = param_sublist.intravenousTherapySolutions_RN[j].hour;
                            var MIH = param_sublist.intravenousTherapySolutions_RN[j].MIH;
                            var starting = param_sublist.intravenousTherapySolutions_RN[j].starting;
                            var ending = param_sublist.intravenousTherapySolutions_RN[j].ending;
                            var preparedBy = param_sublist.intravenousTherapySolutions_RN[j].preparedBy;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord266",text:solution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord267",text:hour,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord268",text:MIH,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord269",text:starting,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord270",text:ending,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord271",text:preparedBy,line:j});
                        }
                    }
                    //Setear catProbesDrains_RN
                    // log.debug("param_sublist.catProbesDrains_RN",param_sublist.catProbesDrains_RN);
                    if(param_sublist.catProbesDrains_RN.length != 0){
                     
                        var subLength = param_sublist.catProbesDrains_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var type = param_sublist.catProbesDrains_RN[j].type;
                            var insertionSite = param_sublist.catProbesDrains_RN[j].insertionSite;
                            var instalationDate = param_sublist.catProbesDrains_RN[j].instalationDate;
                            var instaledBy = param_sublist.catProbesDrains_RN[j].instaledBy;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord262",text:type,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord263",text:insertionSite,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord272",text:instalationDate,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord264",text:instaledBy,line:j});
                        }
                    }
                    //Setear medication_RN
                    if(param_sublist.medication_RN.length != 0){
                        var subLength = param_sublist.medication_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var drug = param_sublist.medication_RN[j].drug;
                            var dose = param_sublist.medication_RN[j].dose;
                            var presentation = param_sublist.medication_RN[j].presentation;
                            var medical_t = param_sublist.medication_RN[j].medical_t;
                            var administer = param_sublist.medication_RN[j].administer;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord274",text:drug,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord275",text:dose,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord277",text:presentation,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord278",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord279",text:administer,line:j}); 
                        }
                    }
                    //Setear vitalSigns_RN
                    if(param_sublist.vitalSigns_RN.length != 0){
                        var subLength = param_sublist.vitalSigns_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medical_t = param_sublist.vitalSigns_RN[j].medical_t;
                            var FC = param_sublist.vitalSigns_RN[j].FC;
                            var TA = param_sublist.vitalSigns_RN[j].TA;
                            var SPO2 = param_sublist.vitalSigns_RN[j].SPO2;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord417",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord418",text:FC,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord419",text:TA,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord420",text:SPO2,line:j});
                        }
                    }
                    //Setear evolution_RN
                    if(param_sublist.evolution_RN.length != 0){
                        var subLength = param_sublist.evolution_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var aldreteScale1 = param_sublist.evolution_RN[j].aldreteScale1;
                            var aldreteScale2 = param_sublist.evolution_RN[j].aldreteScale2;
                            var score = param_sublist.evolution_RN[j].score;
                            var entry = param_sublist.evolution_RN[j].entry;
                            var discharge = param_sublist.evolution_RN[j].discharge;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord422",text:aldreteScale1,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord423",text:aldreteScale2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord424",text:score,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord425",text:entry,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord426",text:discharge,line:j});
                        }
                    }
                    //Setear vitalSigns_HS
                    if(param_sublist.vitalSigns_HS.length != 0){
                        var subLength = param_sublist.vitalSigns_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var hour = param_sublist.vitalSigns_HS[j].hour;
                            var FC = param_sublist.vitalSigns_HS[j].FC;
                            var TC = param_sublist.vitalSigns_HS[j].TC;
                            var bloodPressure = param_sublist.vitalSigns_HS[j].bloodPressure;
                            var SPO2 = param_sublist.vitalSigns_HS[j].SPO2;
                            var painScale = param_sublist.vitalSigns_HS[j].painScale;
                            var breathingFrecuency = param_sublist.vitalSigns_HS[j].breathingFrecuency;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord409",text:hour,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord410",text:FC,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord411",text:TC,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord412",text:bloodPressure,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord413",text:SPO2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord414",text:painScale,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord415",text:breathingFrecuency,line:j});
                        }
                    }

                    //Setear medicines_HS
                    if(param_sublist.medicines_HS.length != 0){
                        var subLength = param_sublist.medicines_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medicines = param_sublist.medicines_HS[j].medicines;
                            var dose = param_sublist.medicines_HS[j].dose;
                            var frecuency = param_sublist.medicines_HS[j].frecuency;
                            var via = param_sublist.medicines_HS[j].via;
                            var hour = param_sublist.medicines_HS[j].hour;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord312",text:medicines,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord313",text:dose,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord314",text:frecuency,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord315",text:via,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord316",text:hour,line:j});
                        }
                    }
                    //Setear solutions_HS
                    if(param_sublist.solutions_HS.length != 0){
                        var subLength = param_sublist.solutions_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var no = param_sublist.solutions_HS[j].no;
                            var solutions = param_sublist.solutions_HS[j].solutions;
                            var duration = param_sublist.solutions_HS[j].duration;
                            var start = param_sublist.solutions_HS[j].start;
                            var finished = param_sublist.solutions_HS[j].finished;
                            var hour = param_sublist.solutions_HS[j].hour;
                            var FXP = param_sublist.solutions_HS[j].FXP;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord318",text:no,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord319",text:solutions,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord320",text:duration,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord321",text:start,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord322",text:finished,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord323",text:hour,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord324",text:FXP,line:j});
                        }
                    }
                     //Setear nursingInterventions_HS
                     if(param_sublist.nursingInterventions_HS.length != 0){
                        var subLength = param_sublist.nursingInterventions_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.nursingInterventions_HS[j].morningShift;
                            var afternoonShift = param_sublist.nursingInterventions_HS[j].afternoonShift;
                            var nightShift = param_sublist.nursingInterventions_HS[j].nightShift;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord352",fieldId:"custrecord349",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord352",fieldId:"custrecord350",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord352",fieldId:"custrecord351",text:nightShift,line:j});
                        }
                    }
                     //Setear riskFalls_HS
                     if(param_sublist.riskFalls_HS.length != 0){
                        var subLength = param_sublist.riskFalls_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var judgment = param_sublist.riskFalls_HS[j].judgment;
                            var variables = param_sublist.riskFalls_HS[j].variables;
                            var score = param_sublist.riskFalls_HS[j].score;
                            var TM = param_sublist.riskFalls_HS[j].TM;
                            var TV = param_sublist.riskFalls_HS[j].TV;
                            var TN = param_sublist.riskFalls_HS[j].TN;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord331",text:judgment,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord332",text:variables,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord333",text:score,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord334",text:TM,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord335",text:TV,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord336",text:TN,line:j});
                        }
                    }
                     //Setear pressureUlcera_HS
                     if(param_sublist.pressureUlcera_HS.length != 0){
                        var subLength = param_sublist.pressureUlcera_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var evaluationCriteria = param_sublist.pressureUlcera_HS[j].evaluationCriteria;
                            var variables = param_sublist.pressureUlcera_HS[j].variables;
                            var score = param_sublist.pressureUlcera_HS[j].score;
                            var TM = param_sublist.pressureUlcera_HS[j].TM;
                            var TV = param_sublist.pressureUlcera_HS[j].TV;
                            var TN = param_sublist.pressureUlcera_HS[j].TN;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord338",text:evaluationCriteria,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord339",text:variables,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord340",text:score,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord341",text:TM,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord342",text:TV,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord343",text:TN,line:j});
                        }
                    }


                    //Setear nursingNotes_HS
                    if(param_sublist.nursingNotes_HS.length != 0){
                        var subLength = param_sublist.nursingNotes_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.nursingNotes_HS[j].morningShift;
                            var afternoonShift = param_sublist.nursingNotes_HS[j].afternoonShift;
                            var nightShift = param_sublist.nursingNotes_HS[j].nightShift;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord348",fieldId:"custrecord345",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord348",fieldId:"custrecord346",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord348",fieldId:"custrecord347",text:nightShift,line:j});
                        }
                    }
                    //Setear catDrainsProbe_HS
                    if(param_sublist.catDrainsProbe_HS.length != 0){
                        var subLength = param_sublist.catDrainsProbe_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var device = param_sublist.catDrainsProbe_HS[j].device;
                            var caliber = param_sublist.catDrainsProbe_HS[j].caliber;
                            var insertionSite = param_sublist.catDrainsProbe_HS[j].insertionSite;
                            var insertionDate = param_sublist.catDrainsProbe_HS[j].insertionDate;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord326",text:device,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord327",text:caliber,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord328",text:insertionSite,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord329",text:insertionDate,line:j});
                        }
                    }
                    //Setear symbols_agents
                    if(param_sublist.symbols_agents.length != 0){
                        var subLength = param_sublist.symbols_agents.length;
                        for(var j = 0 ;j<subLength;j++){

                            var drugs_solutions = param_sublist.symbols_agents[j].drugs_solutions;
                            var t08 = param_sublist.symbols_agents[j].t08;
                            var t09 = param_sublist.symbols_agents[j].t09;
                            var t10 = param_sublist.symbols_agents[j].t10;
                            var t11 = param_sublist.symbols_agents[j].t11;
                            var t12 = param_sublist.symbols_agents[j].t12;
                            var t13 = param_sublist.symbols_agents[j].t13;
                            var t14 = param_sublist.symbols_agents[j].t14;
                            var t15 = param_sublist.symbols_agents[j].t15;
                            var t16 = param_sublist.symbols_agents[j].t16;
                            var t17 = param_sublist.symbols_agents[j].t17;
                            var t18 = param_sublist.symbols_agents[j].t18;
                            var t19 = param_sublist.symbols_agents[j].t19;
                            var t20 = param_sublist.symbols_agents[j].t20;
                            var t21 = param_sublist.symbols_agents[j].t21;
                            var t22 = param_sublist.symbols_agents[j].t22;
                            var t23 = param_sublist.symbols_agents[j].t23;
                            var t00 = param_sublist.symbols_agents[j].t00;
                            var t01 = param_sublist.symbols_agents[j].t01;
                            var t02 = param_sublist.symbols_agents[j].t02;
                            var t03 = param_sublist.symbols_agents[j].t03;
                            var t04 = param_sublist.symbols_agents[j].t04;
                            var t05 = param_sublist.symbols_agents[j].t05;
                            var t06 = param_sublist.symbols_agents[j].t06;
                            var t07 = param_sublist.symbols_agents[j].t07;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord383",text:drugs_solutions,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord384",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord385",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord386",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord387",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord388",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord389",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord390",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord391",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord392",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord393",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord394",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord395",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord396",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord397",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord398",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord399",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord400",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord401",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord402",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord403",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord404",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord405",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord406",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord407",text:t07,line:j});
                        }
                    }
                    //Setear times_parameters_signs
                    if(param_sublist.times_parameters_signs.length != 0){
                        var subLength = param_sublist.times_parameters_signs.length;
                        for(var j = 0 ;j<subLength;j++){

                            var parameters_signs = param_sublist.times_parameters_signs[j].parameters_signs;
                            var t08 = param_sublist.times_parameters_signs[j].t08;
                            var t09 = param_sublist.times_parameters_signs[j].t09;
                            var t10 = param_sublist.times_parameters_signs[j].t10;
                            var t11 = param_sublist.times_parameters_signs[j].t11;
                            var t12 = param_sublist.times_parameters_signs[j].t12;
                            var t13 = param_sublist.times_parameters_signs[j].t13;
                            var t14 = param_sublist.times_parameters_signs[j].t14;
                            var t15 = param_sublist.times_parameters_signs[j].t15;
                            var t16 = param_sublist.times_parameters_signs[j].t16;
                            var t17 = param_sublist.times_parameters_signs[j].t17;
                            var t18 = param_sublist.times_parameters_signs[j].t18;
                            var t19 = param_sublist.times_parameters_signs[j].t19;
                            var t20 = param_sublist.times_parameters_signs[j].t20;
                            var t21 = param_sublist.times_parameters_signs[j].t21;
                            var t22 = param_sublist.times_parameters_signs[j].t22;
                            var t23 = param_sublist.times_parameters_signs[j].t23;
                            var t00 = param_sublist.times_parameters_signs[j].t00;
                            var t01 = param_sublist.times_parameters_signs[j].t01;
                            var t02 = param_sublist.times_parameters_signs[j].t02;
                            var t03 = param_sublist.times_parameters_signs[j].t03;
                            var t04 = param_sublist.times_parameters_signs[j].t04;
                            var t05 = param_sublist.times_parameters_signs[j].t05;
                            var t06 = param_sublist.times_parameters_signs[j].t06;
                            var t07 = param_sublist.times_parameters_signs[j].t07;
                           
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord357",text:parameters_signs,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord358",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord359",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord360",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord361",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord362",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord363",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord364",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord365",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord366",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord367",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord368",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord369",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord370",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord371",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord372",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord373",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord374",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord375",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord376",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord377",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord378",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord379",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord380",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord381",text:t07,line:j});
                        }
                    }
                    //Setear diet_LQ
                    if(param_sublist.diet_LQ.length != 0){
                        var subLength = param_sublist.diet_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.diet_LQ[j].morningShift;
                            var afternoonShift = param_sublist.diet_LQ[j].afternoonShift;
                            var nightShift = param_sublist.diet_LQ[j].nightShift;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord182",fieldId:"custrecord183",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord182",fieldId:"custrecord180",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord182",fieldId:"custrecord181",text:nightShift,line:j});
                        }
                    }
                     //Setear income_LQ
                     if(param_sublist.income_LQ.length != 0){
                        var subLength = param_sublist.income_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medication_solutions = param_sublist.income_LQ[j].medication_solutions;
                            var t08 = param_sublist.income_LQ[j].t08;
                            var t09 = param_sublist.income_LQ[j].t09;
                            var t10 = param_sublist.income_LQ[j].t10;
                            var t11 = param_sublist.income_LQ[j].t11;
                            var t12 = param_sublist.income_LQ[j].t12;
                            var t13 = param_sublist.income_LQ[j].t13;
                            var t14 = param_sublist.income_LQ[j].t14;
                            var t15 = param_sublist.income_LQ[j].t15;
                            var total1 = param_sublist.income_LQ[j].total1;
                            var t16 = param_sublist.income_LQ[j].t16;
                            var t17 = param_sublist.income_LQ[j].t17;
                            var t18 = param_sublist.income_LQ[j].t18;
                            var t19 = param_sublist.income_LQ[j].t19;
                            var t20 = param_sublist.income_LQ[j].t20;
                            var t21 = param_sublist.income_LQ[j].t21;
                            var t22 = param_sublist.income_LQ[j].t22;
                            var t23 = param_sublist.income_LQ[j].t23;
                            var total2 = param_sublist.income_LQ[j].total2;
                            var t00 = param_sublist.income_LQ[j].t00;
                            var t01 = param_sublist.income_LQ[j].t01;
                            var t02 = param_sublist.income_LQ[j].t02;
                            var t03 = param_sublist.income_LQ[j].t03;
                            var t04 = param_sublist.income_LQ[j].t04;
                            var t05 = param_sublist.income_LQ[j].t05;
                            var t06 = param_sublist.income_LQ[j].t06;
                            var t07 = param_sublist.income_LQ[j].t07;
                            var total3 = param_sublist.income_LQ[j].total3;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord184",text:medication_solutions,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord186",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord187",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord188",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord189",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord190",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord191",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord192",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord193",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord194",text:total1,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord195",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord196",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord197",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord198",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord199",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord200",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord201",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord202",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord203",text:total2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord204",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord205",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord206",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord207",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord208",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord209",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord210",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord211",text:t07,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord212",text:total3,line:j});
                        }
                    }
                     //Setear receipts_LQ
                     if(param_sublist.receipts_LQ.length != 0){
                        var subLength = param_sublist.receipts_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var receipts = param_sublist.receipts_LQ[j].receipts;
                            var t08 = param_sublist.receipts_LQ[j].t08;
                            var t09 = param_sublist.receipts_LQ[j].t09;
                            var t10 = param_sublist.receipts_LQ[j].t10;
                            var t11 = param_sublist.receipts_LQ[j].t11;
                            var t12 = param_sublist.receipts_LQ[j].t12;
                            var t13 = param_sublist.receipts_LQ[j].t13;
                            var t14 = param_sublist.receipts_LQ[j].t14;
                            var t15 = param_sublist.receipts_LQ[j].t15;
                            var total1 = param_sublist.receipts_LQ[j].total1;
                            var t16 = param_sublist.receipts_LQ[j].t16;
                            var t17 = param_sublist.receipts_LQ[j].t17;
                            var t18 = param_sublist.receipts_LQ[j].t18;
                            var t19 = param_sublist.receipts_LQ[j].t19;
                            var t20 = param_sublist.receipts_LQ[j].t20;
                            var t21 = param_sublist.receipts_LQ[j].t21;
                            var t22 = param_sublist.receipts_LQ[j].t22;
                            var t23 = param_sublist.receipts_LQ[j].t23;
                            var total2 = param_sublist.receipts_LQ[j].total2;
                            var t00 = param_sublist.receipts_LQ[j].t00;
                            var t01 = param_sublist.receipts_LQ[j].t01;
                            var t02 = param_sublist.receipts_LQ[j].t02;
                            var t03 = param_sublist.receipts_LQ[j].t03;
                            var t04 = param_sublist.receipts_LQ[j].t04;
                            var t05 = param_sublist.receipts_LQ[j].t05;
                            var t06 = param_sublist.receipts_LQ[j].t06;
                            var t07 = param_sublist.receipts_LQ[j].t07;
                            var total3 = param_sublist.receipts_LQ[j].total3;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord213",text:receipts,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord215",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord216",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord217",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord218",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord219",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord220",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord221",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord222",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord223",text:total1,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord224",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord225",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord226",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord227",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord228",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord229",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord230",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord231",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord232",text:total2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord233",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord234",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord235",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord236",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord237",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord238",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord239",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord240",text:t07,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord241",text:total3,line:j});
                        }
                    }
                    //  observations_relevant_data_LQ
                    if(param_sublist.observations_relevant_data_LQ.length != 0){
                        var subLength = param_sublist.observations_relevant_data_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.observations_relevant_data_LQ[j].morningShift;
                            var afternoonShift = param_sublist.observations_relevant_data_LQ[j].afternoonShift;
                            var nightShift = param_sublist.observations_relevant_data_LQ[j].nightShift;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord245",fieldId:"custrecord242",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord245",fieldId:"custrecord243",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord245",fieldId:"custrecord244",text:nightShift,line:j});
                           
                        }
                    }


                    // responsable_LQ
                    if(param_sublist.responsable_LQ.length != 0){
                        var subLength = param_sublist.responsable_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var responsable = param_sublist.responsable_LQ[j].responsable;
                            var morningShift = param_sublist.responsable_LQ[j].morningShift;
                            var afternoonShift = param_sublist.responsable_LQ[j].afternoonShift;
                            var nightShift = param_sublist.responsable_LQ[j].nightShift;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord246",text:responsable,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord247",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord248",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord249",text:nightShift,line:j});                       
                        }
                    }
                    // evolution_notes
                    if(param_sublist.evolution_notes.length != 0){
                        var subLength = param_sublist.evolution_notes.length;
                        for(var j = 0 ;j<subLength;j++){
                            var date_evolution = param_sublist.evolution_notes[j].date_evolution;
                            var time_evolution = param_sublist.evolution_notes[j].time_evolution;
                            var observations_evolution = param_sublist.evolution_notes[j].observations_evolution;
                            var responsable_evolution = param_sublist.evolution_notes[j].responsable_evolution;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord432",text:date_evolution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord433",text:time_evolution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord434",text:observations_evolution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord435",text:responsable_evolution,line:j});
                            
                           
                        }
                    }

                    id_recordCreate_Procedure = obj_case_LoadProcedure.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": "procedure created"
                    });
                } catch (error) {
                    log.debug("Error", error);
                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": error
                    })
                }



            } else if (param_typeProcedure == "noQx") {
                log.debug("fechaDeNacimientoSeguimiento",fechaDeNacimientoSeguimiento);
                log.debug("edadSeguimiento",edadSeguimiento);
                log.debug("generoSeguimiento",generoSeguimiento);
                log.debug("identificacionSeguimiento",identificacionSeguimiento);
                log.debug("telefonoClienteSeguimiento",telefonoClienteSeguimiento);
                log.debug("edoCivilSeguimiento",edoCivilSeguimiento);
      

                if (fechaDeNacimientoSeguimiento != "") {
                    obj_case_LoadProcedure.setText({
                        fieldId: "custevent331",
                        text: fechaDeNacimientoSeguimiento,
                        ignoreFieldChange: true
                    });
                }

                
                if (generoSeguimiento != "") {
                    obj_case_LoadProcedure.setText({
                        fieldId: "custevent634",
                        text: generoSeguimiento,
                        ignoreFieldChange: true
                    });
                }
                if (edoCivilSeguimiento != "") {
                    obj_case_LoadProcedure.setText({
                        fieldId: "custevent206",
                        text: edoCivilSeguimiento,
                        ignoreFieldChange: true
                    });
                }


                try {
                    if (param_custevent648 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent648",
                            text: param_custevent648,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent649 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent649",
                            text: param_custevent649,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent650 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent650",
                            text: param_custevent650,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent651 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent651",
                            text: param_custevent651,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent652 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent652",
                            value: param_custevent652,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent653 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent653",
                            value: param_custevent653,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent654 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent654",
                            value: param_custevent654,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent506 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent506",
                            text: param_custevent506,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent507 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent507",
                            text: param_custevent507,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent541 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent541",
                            text: param_custevent541,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent636 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent636",
                            value: param_custevent636,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent637 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent637",
                            value: param_custevent637,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent639 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent639",
                            text: param_custevent639,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent640 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent640",
                            text: param_custevent640,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent641 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent641",
                            text: param_custevent641,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent642 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent642",
                            text: param_custevent642,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent643 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent643",
                            text: param_custevent643,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent644 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent644",
                            text: param_custevent644,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent645 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent645",
                            text: param_custevent645,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent646 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent646",
                            text: param_custevent646,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent647 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent647",
                            text: param_custevent647,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1056 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1056",
                            text: param_custevent1056,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1069 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1069",
                            text: param_custevent1069,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1020 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1020",
                            text: param_custevent1020,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1038 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1038",
                            text: param_custevent1038,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1029 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1029",
                            text: param_custevent1029,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1047 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1047",
                            text: param_custevent1047,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent867 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent867",
                            value: param_custevent867,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent876 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent876",
                            value: param_custevent876,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent858 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent858",
                            value: param_custevent858,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent912 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent912",
                            text: param_custevent912,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent921 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent921",
                            text: param_custevent921,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent930 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent930",
                            text: param_custevent930,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent885 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent885",
                            value: param_custevent885,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent894 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent894",
                            value: param_custevent894,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent939 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent939",
                            text: param_custevent939,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent957 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent957",
                            text: param_custevent957,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent966 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent966",
                            text: param_custevent966,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent948 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent948",
                            text: param_custevent948,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent975 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent975",
                            text: param_custevent975,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent984 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent984",
                            text: param_custevent984,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent993 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent993",
                            text: param_custevent993,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1002 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1002",
                            text: param_custevent1002,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1011 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1011",
                            text: param_custevent1011,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1057 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1057",
                            text: param_custevent1057,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1070 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1070",
                            text: param_custevent1070,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1021 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1021",
                            text: param_custevent1021,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1039 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1039",
                            text: param_custevent1039,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1030 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1030",
                            text: param_custevent1030,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1048 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1048",
                            text: param_custevent1048,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent868 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent868",
                            value: param_custevent868,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent877 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent877",
                            value: param_custevent877,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent859 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent859",
                            value: param_custevent859,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent913 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent913",
                            text: param_custevent913,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent922 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent922",
                            text: param_custevent922,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent931 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent931",
                            text: param_custevent931,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent886 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent886",
                            value: param_custevent886,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent895 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent895",
                            value: param_custevent895,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent940 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent940",
                            text: param_custevent940,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent958 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent958",
                            text: param_custevent958,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent967 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent967",
                            text: param_custevent967,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent949 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent949",
                            text: param_custevent949,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent976 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent976",
                            text: param_custevent976,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent985 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent985",
                            text: param_custevent985,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent994 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent994",
                            text: param_custevent994,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1003 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1003",
                            text: param_custevent1003,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1012 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1012",
                            text: param_custevent1012,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1058 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1058",
                            text: param_custevent1058,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1071 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1071",
                            text: param_custevent1071,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1022 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1022",
                            text: param_custevent1022,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1040 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1040",
                            text: param_custevent1040,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1031 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1031",
                            text: param_custevent1031,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1049 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1049",
                            text: param_custevent1049,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent869 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent869",
                            value: param_custevent869,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent878 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent878",
                            value: param_custevent878,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent860 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent860",
                            value: param_custevent860,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent914 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent914",
                            text: param_custevent914,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent923 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent923",
                            text: param_custevent923,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent932 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent932",
                            text: param_custevent932,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent887 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent887",
                            value: param_custevent887,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent896 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent896",
                            value: param_custevent896,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent941 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent941",
                            text: param_custevent941,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent959 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent959",
                            text: param_custevent959,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent968 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent968",
                            text: param_custevent968,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent950 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent950",
                            text: param_custevent950,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent977 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent977",
                            text: param_custevent977,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent986 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent986",
                            text: param_custevent986,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent995 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent995",
                            text: param_custevent995,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1004 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1004",
                            text: param_custevent1004,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1013 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1013",
                            text: param_custevent1013,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1059 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1059",
                            text: param_custevent1059,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1072 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1072",
                            text: param_custevent1072,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1023 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1023",
                            text: param_custevent1023,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1041 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1041",
                            text: param_custevent1041,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1032 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1032",
                            text: param_custevent1032,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1050 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1050",
                            text: param_custevent1050,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent870 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent870",
                            value: param_custevent870,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent879 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent879",
                            value: param_custevent879,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent861 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent861",
                            value: param_custevent861,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent915 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent915",
                            text: param_custevent915,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent924 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent924",
                            text: param_custevent924,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent933 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent933",
                            text: param_custevent933,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent888 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent888",
                            value: param_custevent888,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent897 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent897",
                            value: param_custevent897,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent942 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent942",
                            text: param_custevent942,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent960 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent960",
                            text: param_custevent960,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent969 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent969",
                            text: param_custevent969,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent951 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent951",
                            text: param_custevent951,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent978 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent978",
                            text: param_custevent978,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent987 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent987",
                            text: param_custevent987,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent996 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent996",
                            text: param_custevent996,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1005 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1005",
                            text: param_custevent1005,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1014 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1014",
                            text: param_custevent1014,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1060 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1060",
                            text: param_custevent1060,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1073 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1073",
                            text: param_custevent1073,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1024 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1024",
                            text: param_custevent1024,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1042 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1042",
                            text: param_custevent1042,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1033 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1033",
                            text: param_custevent1033,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1051 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1051",
                            text: param_custevent1051,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent871 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent871",
                            value: param_custevent871,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent880 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent880",
                            value: param_custevent880,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent862 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent862",
                            value: param_custevent862,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent916 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent916",
                            text: param_custevent916,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent925 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent925",
                            text: param_custevent925,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent934 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent934",
                            text: param_custevent934,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent889 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent889",
                            value: param_custevent889,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent898 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent898",
                            value: param_custevent898,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent943 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent943",
                            text: param_custevent943,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent961 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent961",
                            text: param_custevent961,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent970 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent970",
                            text: param_custevent970,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent952 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent952",
                            text: param_custevent952,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent979 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent979",
                            text: param_custevent979,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent988 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent988",
                            text: param_custevent988,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent997 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent997",
                            text: param_custevent997,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1006 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1006",
                            text: param_custevent1006,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1015 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1015",
                            text: param_custevent1015,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1061 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1061",
                            text: param_custevent1061,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1074 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1074",
                            text: param_custevent1074,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1025 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1025",
                            text: param_custevent1025,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1043 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1043",
                            text: param_custevent1043,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1034 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1034",
                            text: param_custevent1034,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1052 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1052",
                            text: param_custevent1052,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent872 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent872",
                            value: param_custevent872,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent881 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent881",
                            value: param_custevent881,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent863 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent863",
                            value: param_custevent863,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent917 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent917",
                            text: param_custevent917,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent926 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent926",
                            text: param_custevent926,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent935 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent935",
                            text: param_custevent935,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent890 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent890",
                            value: param_custevent890,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent899 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent899",
                            value: param_custevent899,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent944 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent944",
                            text: param_custevent944,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent962 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent962",
                            text: param_custevent962,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent971 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent971",
                            text: param_custevent971,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent953 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent953",
                            text: param_custevent953,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent980 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent980",
                            text: param_custevent980,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent989 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent989",
                            text: param_custevent989,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent998 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent998",
                            text: param_custevent998,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1007 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1007",
                            text: param_custevent1007,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1016 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1016",
                            text: param_custevent1016,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1062 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1062",
                            text: param_custevent1062,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1075 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1075",
                            text: param_custevent1075,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1026 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1026",
                            text: param_custevent1026,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1044 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1044",
                            text: param_custevent1044,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1035 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1035",
                            text: param_custevent1035,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1053 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1053",
                            text: param_custevent1053,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent873 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent873",
                            value: param_custevent873,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent882 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent882",
                            value: param_custevent882,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent864 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent864",
                            value: param_custevent864,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent918 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent918",
                            text: param_custevent918,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent927 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent927",
                            text: param_custevent927,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent936 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent936",
                            text: param_custevent936,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent891 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent891",
                            value: param_custevent891,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent900 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent900",
                            value: param_custevent900,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent945 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent945",
                            text: param_custevent945,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent963 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent963",
                            text: param_custevent963,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent972 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent972",
                            text: param_custevent972,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent954 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent954",
                            text: param_custevent954,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent981 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent981",
                            text: param_custevent981,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent990 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent990",
                            text: param_custevent990,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent999 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent999",
                            text: param_custevent999,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1008 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1008",
                            text: param_custevent1008,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1017 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1017",
                            text: param_custevent1017,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1063 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1063",
                            text: param_custevent1063,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1076 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1076",
                            text: param_custevent1076,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1027 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1027",
                            text: param_custevent1027,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1045 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1045",
                            text: param_custevent1045,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1036 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1036",
                            text: param_custevent1036,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1054 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1054",
                            text: param_custevent1054,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent874 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent874",
                            value: param_custevent874,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent883 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent883",
                            value: param_custevent883,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent865 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent865",
                            value: param_custevent865,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent919 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent919",
                            text: param_custevent919,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent928 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent928",
                            text: param_custevent928,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent937 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent937",
                            text: param_custevent937,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent892 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent892",
                            value: param_custevent892,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent901 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent901",
                            value: param_custevent901,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent946 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent946",
                            text: param_custevent946,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent964 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent964",
                            text: param_custevent964,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent973 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent973",
                            text: param_custevent973,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent955 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent955",
                            text: param_custevent955,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent982 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent982",
                            text: param_custevent982,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent991 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent991",
                            text: param_custevent991,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1000 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1000",
                            text: param_custevent1000,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1009 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1009",
                            text: param_custevent1009,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1018 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1018",
                            text: param_custevent1018,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1064 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1064",
                            text: param_custevent1064,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1077 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1077",
                            text: param_custevent1077,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1028 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1028",
                            text: param_custevent1028,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1046 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1046",
                            text: param_custevent1046,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1037 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1037",
                            text: param_custevent1037,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1055 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1055",
                            text: param_custevent1055,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent875 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent875",
                            value: param_custevent875,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent884 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent884",
                            value: param_custevent884,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent866 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent866",
                            value: param_custevent866,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent920 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent920",
                            text: param_custevent920,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent929 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent929",
                            text: param_custevent929,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent938 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent938",
                            text: param_custevent938,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent893 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent893",
                            value: param_custevent893,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent902 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent902",
                            value: param_custevent902,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent947 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent947",
                            text: param_custevent947,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent965 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent965",
                            text: param_custevent965,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent974 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent974",
                            text: param_custevent974,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent956 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent956",
                            text: param_custevent956,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent983 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent983",
                            text: param_custevent983,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent992 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent992",
                            text: param_custevent992,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1001 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1001",
                            text: param_custevent1001,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1010 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1010",
                            text: param_custevent1010,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1019 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1019",
                            text: param_custevent1019,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1065 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1065",
                            text: param_custevent1065,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1078 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1078",
                            text: param_custevent1078,
                            ignoreFieldChange: true
                        });
                    }

                    if (param_url_firma != "") {
                        var objNew_img_firma = file.create({
                            name: param_idCustomer + "_" + idProcedure + "_image_firma",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_firmaPx.body,
                            encoding: file.Encoding.UTF8,
                            folder: -4
                        });
                        var idNew_img_firma = objNew_img_firma.save();
                        var obj_img_firma = file.load({
                            id: idNew_img_firma
                        });
                        var content_img_firma = obj_img_firma.getContents();
                        var url_img_firma = obj_img_firma.url;

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent201',
                            value: url_img_firma,
                            ignoreFieldChange: true
                        });

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent269',
                            value: "data:image/png;base64," + content_img_firma,
                            ignoreFieldChange: true
                        });
                    }

                    id_recordCreate_Procedure = obj_case_LoadProcedure.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": "procedure created"
                    })
                } catch (error) {
                    log.debug("Error", error);
                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": error
                    })
                }
            }

        } else {
            // Creacion de procedimiento nuevo

            if (param_typeProcedure == "qx") {

                try {
                    var obj_case_CreateProcedure = record.create({
                        type: record.Type.SUPPORT_CASE,
                        isDynamic: false,
                    });

                    obj_case_CreateProcedure.setValue({
                        fieldId: 'customform', // Formulario Diagnostico Body & Skin 138
                        value: "148",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'company', // idCustomer
                        value: param_idCustomer,
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'title', // titulo del caso
                        value: param_nameDiagnostico,
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'custevent322', // Consutlor que valoro
                        value: "1171930",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'custevent207', // Ocupación del cliente por default empleado
                        value: "16",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'custevent208', // Como se entero de nosotros es App Web por default
                        value: "244",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'email', // email de cliente
                        value: "dale_mas@perro.com",
                        ignoreFieldChange: true
                    });

                    var id_recordCreate_Procedure = obj_case_CreateProcedure.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    var obj_case_LoadProcedure = record.load({
                        type: record.Type.SUPPORT_CASE,
                        id: id_recordCreate_Procedure,
                        isDynamic: false
                    });
                } catch (error) {
                    log.debug("error create qx", error)
                }


                try {

                    if (param_startdate != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "startdate",
                            text: param_startdate,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_starttime != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "starttime",
                            text: param_starttime,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent550 != "") {
                        if (param_custevent550 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent550",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent551 != "") {
                        if (param_custevent551 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent551",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent552 != "") {
                        if (param_custevent552 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent552",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent553 != "") {
                        if (param_custevent553 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent553",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent556 != "") {
                        if (param_custevent556 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent556",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent557 != "") {
                        if (param_custevent557 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent557",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent722 != "") {
                        if (param_custevent722 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent722",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent560 != "") {
                        if (param_custevent560 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent560",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent725 != "") {
                        if (param_custevent725 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent725",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent726 != "") {
                        if (param_custevent726 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent726",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent727 != "") {
                        if (param_custevent727 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent727",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent723 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent723",
                            value: param_custevent723,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent724 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent724",
                            value: param_custevent724,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent728 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent728",
                            value: param_custevent728,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent729 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent729",
                            value: param_custevent729,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent565 != "") {
                        if (param_custevent565 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent565",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent564 != "") {
                        if (param_custevent564 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent564",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent730 != "") {
                        if (param_custevent730 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent730",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent567 != "") {
                        if (param_custevent567 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent567",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent840 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_1",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_1.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent840",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent841 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_2",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_2.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent841",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent842 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_3",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_3.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent842",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent843 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_4",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_4.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent843",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent844 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_5",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_5.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent844",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent845 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_6",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_6.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent845",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent846 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_7",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_7.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent846",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent847 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_8",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_8.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent847",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent848 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_9",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_9.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent848",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent849 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_10",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_10.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent849",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent850 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_11",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_11.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent850",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent851 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_12",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_12.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent851",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent852 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_13",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_13.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent852",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent853 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_14",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_14.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent853",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent854 != "") {
                        var objNew = file.create({
                            name: param_idCustomer + "_" + id_recordCreate_Procedure + "_image_15",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_15.body,
                            encoding: file.Encoding.UTF8,
                            folder: folderImage
                        });
                        var idNew_img = objNew.save();

                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent854",
                            value: idNew_img,
                            ignoreFieldChange: true
                        });
                    }

                    if (param_url_firma != "") {
                        var objNew_img_firma = file.create({
                            name: param_idCustomer + "_" + idProcedure + "_image_firma",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_firmaPx.body,
                            encoding: file.Encoding.UTF8,
                            folder: -4
                        });
                        var idNew_img_firma = objNew_img_firma.save();
                        var obj_img_firma = file.load({
                            id: idNew_img_firma
                        });
                        var content_img_firma = obj_img_firma.getContents();
                        var url_img_firma = obj_img_firma.url;

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent201',
                            value: url_img_firma,
                            ignoreFieldChange: true
                        });

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent269',
                            value: "data:image/png;base64," + content_img_firma,
                            ignoreFieldChange: true
                        });
                    }
                    
                    if (param_custevent731 != "") {
                        if (param_custevent731 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent731",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent732 != "") {
                        if (param_custevent732 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent732",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent733 != "") {
                        if (param_custevent733 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent733",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent734 != "") {
                        if (param_custevent734 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent734",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent735 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent735",
                            text: param_custevent735,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent736 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent736",
                            text: param_custevent736,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent737 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent737",
                            text: param_custevent737,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent738 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent738",
                            text: param_custevent738,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent739 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent739",
                            text: param_custevent739,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent740 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent740",
                            text: param_custevent740,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent741 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent741",
                            text: param_custevent741,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent742 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent742",
                            text: param_custevent742,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent743 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent743",
                            text: param_custevent743,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent744 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent744",
                            text: param_custevent744,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent745 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent745",
                            text: param_custevent745,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent746 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent746",
                            text: param_custevent746,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent747 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent747",
                            text: param_custevent747,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent748 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent748",
                            text: param_custevent748,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent749 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent749",
                            text: param_custevent749,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent750 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent750",
                            text: param_custevent750,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent751 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent751",
                            text: param_custevent751,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent752 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent752",
                            text: param_custevent752,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent753 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent753",
                            text: param_custevent753,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent754 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent754",
                            text: param_custevent754,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent755 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent755",
                            text: param_custevent755,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent756 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent756",
                            text: param_custevent756,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent757 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent757",
                            text: param_custevent757,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent758 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent758",
                            text: param_custevent758,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent759 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent759",
                            text: param_custevent759,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent760 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent760",
                            text: param_custevent760,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent761 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent761",
                            text: param_custevent761,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent762 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent762",
                            text: param_custevent762,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent763 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent763",
                            text: param_custevent763,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent764 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent764",
                            text: param_custevent764,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent765 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent765",
                            value: param_custevent765,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent766 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent766",
                            text: param_custevent766,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent767 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent767",
                            text: param_custevent767,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent768 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent768",
                            text: param_custevent768,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent769 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent769",
                            text: param_custevent769,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent770 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent770",
                            text: param_custevent770,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent771 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent771",
                            value: param_custevent771,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent772 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent772",
                            value: param_custevent772,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent773 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent773",
                            text: param_custevent773,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent774 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent774",
                            value: param_custevent774,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent775 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent775",
                            value: param_custevent775,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent776 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent776",
                            text: param_custevent776,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent777 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent777",
                            text: param_custevent777,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent778 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent778",
                            text: param_custevent778,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent779 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent779",
                            text: param_custevent779,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent780 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent780",
                            value: param_custevent780,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent781 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent781",
                            text: param_custevent781,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent782 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent782",
                            text: param_custevent782,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent783 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent783",
                            text: param_custevent783,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent784 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent784",
                            text: param_custevent784,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent792 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent792",
                            value: param_custevent792,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent793 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent793",
                            value: param_custevent793,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent785 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent785",
                            text: param_custevent785,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent786 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent786",
                            text: param_custevent786,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent787 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent787",
                            text: param_custevent787,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent788 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent788",
                            value: param_custevent788,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent789 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent789",
                            text: param_custevent789,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent790 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent790",
                            text: param_custevent790,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent791 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent791",
                            text: param_custevent791,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent796 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent796",
                            text: param_custevent796,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent797 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent797",
                            text: param_custevent797,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent798 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent798",
                            text: param_custevent798,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent799 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent799",
                            text: param_custevent799,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent663 != "") {
                        if (param_custevent663 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent663",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent664 != "") {
                        if (param_custevent664 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent664",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent665 != "") {
                        if (param_custevent665 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent665",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent666 != "") {
                        if (param_custevent666 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent666",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent667 != "") {
                        if (param_custevent667 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent667",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent668 != "") {
                        if (param_custevent668 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent668",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent669 != "") {
                        if (param_custevent669 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent669",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent670 != "") {
                        if (param_custevent670 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent670",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent671 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent671",
                            value: param_custevent671,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent672 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent672",
                            value: param_custevent672,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent673 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent673",
                            value: param_custevent673,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent674 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent674",
                            text: param_custevent674,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent675 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent675",
                            text: param_custevent675,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent676 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent676",
                            text: param_custevent676,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent677 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent677",
                            text: param_custevent677,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent681 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent681",
                            value: param_custevent681,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent678 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent678",
                            text: param_custevent678,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent679 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent679",
                            text: param_custevent679,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent685 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent685",
                            text: param_custevent685,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent686 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent686",
                            text: param_custevent686,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent687 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent687",
                            text: param_custevent687,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent688 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent688",
                            text: param_custevent688,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent689 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent689",
                            value: param_custevent689,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent690 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent690",
                            text: param_custevent690,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent694 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent694",
                            text: param_custevent694,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent691 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent691",
                            text: param_custevent691,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent692 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent692",
                            text: param_custevent692,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent693 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent693",
                            text: param_custevent693,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent695 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent695",
                            text: param_custevent695,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent696 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent696",
                            text: param_custevent696,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent697 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent697",
                            text: param_custevent697,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent698 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent698",
                            text: param_custevent698,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent699 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent699",
                            text: param_custevent699,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent700 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent700",
                            text: param_custevent700,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent701 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent701",
                            text: param_custevent701,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent702 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent702",
                            text: param_custevent702,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent703 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent703",
                            text: param_custevent703,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent704 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent704",
                            text: param_custevent704,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent705 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent705",
                            text: param_custevent705,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent706 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent706",
                            text: param_custevent706,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent707 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent707",
                            text: param_custevent707,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent708 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent708",
                            text: param_custevent708,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent709 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent709",
                            text: param_custevent709,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent710 != "") {
                        if (param_custevent710 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent710",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent711 != "") {
                        if (param_custevent711 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent711",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent712 != "") {
                        if (param_custevent712 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent712",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent713 != "") {
                        if (param_custevent713 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent713",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent714 != "") {
                        if (param_custevent714 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent714",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent715 != "") {
                        if (param_custevent715 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent715",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent716 != "") {
                        if (param_custevent716 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent716",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent717 != "") {
                        if (param_custevent717 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent717",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent718 != "") {
                        if (param_custevent718 == "T") {
                            valBool = true;
                        } else {
                            valBool = false;
                        }
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent718",
                            value: valBool,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent719 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent719",
                            text: param_custevent719,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent720 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent720",
                            text: param_custevent720,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent721 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent721",
                            text: param_custevent721,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent655 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent655",
                            text: param_custevent655,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent656 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent656",
                            text: param_custevent656,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent657 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent657",
                            text: param_custevent657,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent658 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent658",
                            text: param_custevent658,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent659 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent659",
                            text: param_custevent659,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent660 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent660",
                            text: param_custevent660,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent661 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent661",
                            text: param_custevent661,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent576 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent576",
                            text: param_custevent576,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent577 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent577",
                            value: param_custevent577,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent662 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent662",
                            text: param_custevent662,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent794 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent794",
                            text: param_custevent794,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent795 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent795",
                            text: param_custevent795,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent570 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent570",
                            text: param_custevent570,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent573 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent573",
                            text: param_custevent573,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent574 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent574",
                            text: param_custevent574,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent572 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent572",
                            text: param_custevent572,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent575 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent575",
                            text: param_custevent575,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent202 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent202",
                            text: param_custevent202,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent197 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent197",
                            text: param_custevent197,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent857 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent857",
                            text: param_custevent857,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent803 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent803",
                            value: param_custevent803,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent804 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent804",
                            text: param_custevent804,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent805 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent805",
                            text: param_custevent805,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent806 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent806",
                            text: param_custevent806,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent807 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent807",
                            text: param_custevent807,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent808 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent808",
                            text: param_custevent808,
                            ignoreFieldChange: true
                        });
                    }
                    //Setear medicalIndications
                    // log.debug("param_sublist.medicalIndications",param_sublist);
                    if(param_sublist.medicalIndications.length != 0){
                        var subLength = param_sublist.medicalIndications.length;
                        for(var j = 0 ;j<subLength;j++){
                            var fecha = param_sublist.medicalIndications[j].textDate;
                            var indicaciones = param_sublist.medicalIndications[j].textIndications;
                            var responsable = param_sublist.medicalIndications[j].textResponsable;
                            var tiempo = param_sublist.medicalIndications[j].textTime;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord353",text:fecha,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord355",text:indicaciones,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord436",text:responsable,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord356",fieldId:"custrecord437",text:tiempo,line:j});
                        }
                    }
                    //Setear medication
                    // log.debug("param_sublist.medication",param_sublist.medication);
                    if(param_sublist.medication.length != 0){
                        var subLength = param_sublist.medication.length;
                        for(var j = 0 ;j<subLength;j++){
                            var drug = param_sublist.medication[j].drug;
                            var dose = param_sublist.medication[j].dose;
                            var via = param_sublist.medication[j].via;
                            var medical_t = param_sublist.medication[j].medical_t;
                            var administer = param_sublist.medication[j].administer;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord251",text:drug,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord252",text:dose,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord253",text:via,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord254",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord256",fieldId:"custrecord255",text:administer,line:j});
                        }


                    }
                        //Setear intravenousSolutions
                        if(param_sublist.intravenousSolutions.length != 0){
                        var subLength = param_sublist.intravenousSolutions.length;
                        for(var j = 0 ;j<subLength;j++){
                            var solution = param_sublist.intravenousSolutions[j].solution;
                            var volume = param_sublist.intravenousSolutions[j].volume;
                            var startTime = param_sublist.intravenousSolutions[j].startTime;
                            var preparedBy = param_sublist.intravenousSolutions[j].preparedBy;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord257",text:solution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord258",text:volume,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord259",text:startTime,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord261",fieldId:"custrecord260",text:preparedBy,line:j});
                        }
                    }
                    //Setear vitalSigns
                    if(param_sublist.vitalSigns.length != 0){
                        var subLength = param_sublist.vitalSigns.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medical_t = param_sublist.vitalSigns[j].medical_t;
                            var heartRate = param_sublist.vitalSigns[j].heartRate;
                            var SPO2 = param_sublist.vitalSigns[j].SPO2;
                            var TAMMHG = param_sublist.vitalSigns[j].TAMMHG;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord281",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord282",text:heartRate,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord283",text:SPO2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord285",fieldId:"custrecord284",text:TAMMHG,line:j});
                        }
                    }
                    //Setear catProbesDrains
                    if(param_sublist.catProbesDrains.length != 0){
                        var subLength = param_sublist.catProbesDrains.length;
                        for(var j = 0 ;j<subLength;j++){
                            var type = param_sublist.catProbesDrains[j].type;
                            var installedBy = param_sublist.catProbesDrains[j].installedBy;
                            var insertionSite = param_sublist.catProbesDrains[j].insertionSite;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord427",fieldId:"custrecord428",text:type,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord427",fieldId:"custrecord429",text:installedBy,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord427",fieldId:"custrecord430",text:insertionSite,line:j});
                        }
                    }
                    //Setear intravenousTherapySolutions_RN
                    if(param_sublist.intravenousTherapySolutions_RN.length != 0){
                        var subLength = param_sublist.intravenousTherapySolutions_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var solution = param_sublist.intravenousTherapySolutions_RN[j].solution;
                            var hour = param_sublist.intravenousTherapySolutions_RN[j].hour;
                            var MIH = param_sublist.intravenousTherapySolutions_RN[j].MIH;
                            var starting = param_sublist.intravenousTherapySolutions_RN[j].starting;
                            var ending = param_sublist.intravenousTherapySolutions_RN[j].ending;
                            var preparedBy = param_sublist.intravenousTherapySolutions_RN[j].preparedBy;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord266",text:solution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord267",text:hour,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord268",text:MIH,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord269",text:starting,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord270",text:ending,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord273",fieldId:"custrecord271",text:preparedBy,line:j});
                        }
                    }
                    //Setear catProbesDrains_RN
                    if(param_sublist.catProbesDrains_RN.length != 0){
                        var subLength = param_sublist.catProbesDrains_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var type = param_sublist.catProbesDrains_RN[j].type;
                            var insertionSite = param_sublist.catProbesDrains_RN[j].insertionSite;
                            var instalationDate = param_sublist.catProbesDrains_RN[j].instalationDate;
                            var instaledBy = param_sublist.catProbesDrains_RN[j].instaledBy;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord262",text:type,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord263",text:insertionSite,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord272",text:instalationDate,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord265",fieldId:"custrecord264",text:instaledBy,line:j});
                        }
                    }
                    //Setear medication_RN
                    if(param_sublist.medication_RN.length != 0){
                        var subLength = param_sublist.medication_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var drug = param_sublist.medication_RN[j].drug;
                            var dose = param_sublist.medication_RN[j].dose;
                            var presentation = param_sublist.medication_RN[j].presentation;
                            var medical_t = param_sublist.medication_RN[j].medical_t;
                            var administer = param_sublist.medication_RN[j].administer;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord274",text:drug,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord275",text:dose,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord277",text:presentation,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord278",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord280",fieldId:"custrecord279",text:administer,line:j});
                        }
                    }
                    //Setear vitalSigns_RN
                    if(param_sublist.vitalSigns_RN.length != 0){
                        var subLength = param_sublist.vitalSigns_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medical_t = param_sublist.vitalSigns_RN[j].medical_t;
                            var FC = param_sublist.vitalSigns_RN[j].FC;
                            var TA = param_sublist.vitalSigns_RN[j].TA;
                            var SPO2 = param_sublist.vitalSigns_RN[j].SPO2;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord417",text:medical_t,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord418",text:FC,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord419",text:TA,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord416",fieldId:"custrecord420",text:SPO2,line:j});
                        }
                    }
                    //Setear evolution_RN
                    if(param_sublist.evolution_RN.length != 0){
                        var subLength = param_sublist.evolution_RN.length;
                        for(var j = 0 ;j<subLength;j++){
                            var aldreteScale1 = param_sublist.evolution_RN[j].aldreteScale1;
                            var aldreteScale2 = param_sublist.evolution_RN[j].aldreteScale2;
                            var score = param_sublist.evolution_RN[j].score;
                            var entry = param_sublist.evolution_RN[j].entry;
                            var discharge = param_sublist.evolution_RN[j].discharge;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord422",text:aldreteScale1,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord423",text:aldreteScale2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord424",text:score,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord425",text:entry,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord421",fieldId:"custrecord426",text:discharge,line:j});
                        }
                    }
                    //Setear vitalSigns_HS
                    if(param_sublist.vitalSigns_HS.length != 0){
                        var subLength = param_sublist.vitalSigns_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var hour = param_sublist.vitalSigns_HS[j].hour;
                            var FC = param_sublist.vitalSigns_HS[j].FC;
                            var TC = param_sublist.vitalSigns_HS[j].TC;
                            var bloodPressure = param_sublist.vitalSigns_HS[j].bloodPressure;
                            var SPO2 = param_sublist.vitalSigns_HS[j].SPO2;
                            var painScale = param_sublist.vitalSigns_HS[j].painScale;
                            var breathingFrecuency = param_sublist.vitalSigns_HS[j].breathingFrecuency;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord409",text:hour,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord410",text:FC,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord411",text:TC,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord412",text:bloodPressure,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord413",text:SPO2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord414",text:painScale,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord311",fieldId:"custrecord415",text:breathingFrecuency,line:j});
                        }
                    }

                    //Setear medicines_HS
                    if(param_sublist.medicines_HS.length != 0){
                        var subLength = param_sublist.medicines_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medicines = param_sublist.medicines_HS[j].medicines;
                            var dose = param_sublist.medicines_HS[j].dose;
                            var frecuency = param_sublist.medicines_HS[j].frecuency;
                            var via = param_sublist.medicines_HS[j].via;
                            var hour = param_sublist.medicines_HS[j].hour;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord312",text:medicines,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord313",text:dose,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord314",text:frecuency,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord315",text:via,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord317",fieldId:"custrecord316",text:hour,line:j});
                        }
                    }
                    //Setear solutions_HS
                    if(param_sublist.solutions_HS.length != 0){
                        var subLength = param_sublist.solutions_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var no = param_sublist.solutions_HS[j].no;
                            var solutions = param_sublist.solutions_HS[j].solutions;
                            var duration = param_sublist.solutions_HS[j].duration;
                            var start = param_sublist.solutions_HS[j].start;
                            var finished = param_sublist.solutions_HS[j].finished;
                            var hour = param_sublist.solutions_HS[j].hour;
                            var FXP = param_sublist.solutions_HS[j].FXP;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord318",text:no,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord319",text:solutions,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord320",text:duration,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord321",text:start,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord322",text:finished,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord323",text:hour,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord325",fieldId:"custrecord324",text:FXP,line:j});
                        }
                    }
                        //Setear nursingInterventions_HS
                        if(param_sublist.nursingInterventions_HS.length != 0){
                        var subLength = param_sublist.nursingInterventions_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.nursingInterventions_HS[j].morningShift;
                            var afternoonShift = param_sublist.nursingInterventions_HS[j].afternoonShift;
                            var nightShift = param_sublist.nursingInterventions_HS[j].nightShift;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord352",fieldId:"custrecord349",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord352",fieldId:"custrecord350",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord352",fieldId:"custrecord351",text:nightShift,line:j});
                        }
                    }
                        //Setear riskFalls_HS
                        if(param_sublist.riskFalls_HS.length != 0){
                        var subLength = param_sublist.riskFalls_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var judgment = param_sublist.riskFalls_HS[j].judgment;
                            var variables = param_sublist.riskFalls_HS[j].variables;
                            var score = param_sublist.riskFalls_HS[j].score;
                            var TM = param_sublist.riskFalls_HS[j].TM;
                            var TV = param_sublist.riskFalls_HS[j].TV;
                            var TN = param_sublist.riskFalls_HS[j].TN;
                        //    obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord331",text:judgment,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord332",text:variables,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord333",text:score,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord334",text:TM,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord335",text:TV,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord337",fieldId:"custrecord336",text:TN,line:j});
                           obj_case_LoadProcedure.setSublistText({
                            sublistId: "recmachcustrecord337",
                            fieldId: "custrecord331",
                            text: judgment,
                            line: j
                        }), obj_case_LoadProcedure.setSublistText({
                            sublistId: "recmachcustrecord337",
                            fieldId: "custrecord332",
                            text: variables,
                            line: j
                        }), obj_case_LoadProcedure.setSublistText({
                            sublistId: "recmachcustrecord337",
                            fieldId: "custrecord333",
                            text: score,
                            line: j
                        }), obj_case_LoadProcedure.setSublistText({
                            sublistId: "recmachcustrecord337",
                            fieldId: "custrecord334",
                            text: TM,
                            line: j
                        }), obj_case_LoadProcedure.setSublistText({
                            sublistId: "recmachcustrecord337",
                            fieldId: "custrecord335",
                            text: TV,
                            line: j
                        }), obj_case_LoadProcedure.setSublistText({
                            sublistId: "recmachcustrecord337",
                            fieldId: "custrecord336",
                            text: TN,
                            line: j
                        });
                        }
                    }
                        //Setear pressureUlcera_HS
                        if(param_sublist.pressureUlcera_HS.length != 0){
                        var subLength = param_sublist.pressureUlcera_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var evaluationCriteria = param_sublist.pressureUlcera_HS[j].evaluationCriteria;
                            var variables = param_sublist.pressureUlcera_HS[j].variables;
                            var score = param_sublist.pressureUlcera_HS[j].score;
                            var TM = param_sublist.pressureUlcera_HS[j].TM;
                            var TV = param_sublist.pressureUlcera_HS[j].TV;
                            var TN = param_sublist.pressureUlcera_HS[j].TN;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord338",text:evaluationCriteria,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord339",text:variables,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord340",text:score,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord341",text:TM,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord342",text:TV,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord344",fieldId:"custrecord343",text:TN,line:j});
                        }
                    }


                    //Setear nursingNotes_HS
                    if(param_sublist.nursingNotes_HS.length != 0){
                        var subLength = param_sublist.nursingNotes_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.nursingNotes_HS[j].morningShift;
                            var afternoonShift = param_sublist.nursingNotes_HS[j].afternoonShift;
                            var nightShift = param_sublist.nursingNotes_HS[j].nightShift;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord348",fieldId:"custrecord345",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord348",fieldId:"custrecord346",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord348",fieldId:"custrecord347",text:nightShift,line:j});
                        }
                    }
                    //Setear catDrainsProbe_HS
                    if(param_sublist.catDrainsProbe_HS.length != 0){
                        var subLength = param_sublist.catDrainsProbe_HS.length;
                        for(var j = 0 ;j<subLength;j++){
                            var device = param_sublist.catDrainsProbe_HS[j].device;
                            var caliber = param_sublist.catDrainsProbe_HS[j].caliber;
                            var insertionSite = param_sublist.catDrainsProbe_HS[j].insertionSite;
                            var insertionDate = param_sublist.catDrainsProbe_HS[j].insertionDate;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord326",text:device,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord327",text:caliber,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord328",text:insertionSite,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord330",fieldId:"custrecord329",text:insertionDate,line:j});
                        }
                    }
                    //Setear symbols_agents
                    if(param_sublist.symbols_agents.length != 0){
                        var subLength = param_sublist.symbols_agents.length;
                        for(var j = 0 ;j<subLength;j++){

                            var drugs_solutions = param_sublist.symbols_agents[j].drugs_solutions;
                            var t08 = param_sublist.symbols_agents[j].t08;
                            var t09 = param_sublist.symbols_agents[j].t09;
                            var t10 = param_sublist.symbols_agents[j].t10;
                            var t11 = param_sublist.symbols_agents[j].t11;
                            var t12 = param_sublist.symbols_agents[j].t12;
                            var t13 = param_sublist.symbols_agents[j].t13;
                            var t14 = param_sublist.symbols_agents[j].t14;
                            var t15 = param_sublist.symbols_agents[j].t15;
                            var t16 = param_sublist.symbols_agents[j].t16;
                            var t17 = param_sublist.symbols_agents[j].t17;
                            var t18 = param_sublist.symbols_agents[j].t18;
                            var t19 = param_sublist.symbols_agents[j].t19;
                            var t20 = param_sublist.symbols_agents[j].t20;
                            var t21 = param_sublist.symbols_agents[j].t21;
                            var t22 = param_sublist.symbols_agents[j].t22;
                            var t23 = param_sublist.symbols_agents[j].t23;
                            var t00 = param_sublist.symbols_agents[j].t00;
                            var t01 = param_sublist.symbols_agents[j].t01;
                            var t02 = param_sublist.symbols_agents[j].t02;
                            var t03 = param_sublist.symbols_agents[j].t03;
                            var t04 = param_sublist.symbols_agents[j].t04;
                            var t05 = param_sublist.symbols_agents[j].t05;
                            var t06 = param_sublist.symbols_agents[j].t06;
                            var t07 = param_sublist.symbols_agents[j].t07;
                          obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord383",text:drugs_solutions,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord384",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord385",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord386",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord387",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord388",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord389",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord390",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord391",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord392",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord393",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord394",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord395",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord396",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord397",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord398",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord399",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord400",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord401",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord402",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord403",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord404",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord405",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord406",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord408",fieldId:"custrecord407",text:t07,line:j});
                        }
                    }
                    //Setear times_parameters_signs
                    if(param_sublist.times_parameters_signs.length != 0){
                        var subLength = param_sublist.times_parameters_signs.length;
                        for(var j = 0 ;j<subLength;j++){

                            var parameters_signs = param_sublist.times_parameters_signs[j].parameters_signs;
                            var t08 = param_sublist.times_parameters_signs[j].t08;
                            var t09 = param_sublist.times_parameters_signs[j].t09;
                            var t10 = param_sublist.times_parameters_signs[j].t10;
                            var t11 = param_sublist.times_parameters_signs[j].t11;
                            var t12 = param_sublist.times_parameters_signs[j].t12;
                            var t13 = param_sublist.times_parameters_signs[j].t13;
                            var t14 = param_sublist.times_parameters_signs[j].t14;
                            var t15 = param_sublist.times_parameters_signs[j].t15;
                            var t16 = param_sublist.times_parameters_signs[j].t16;
                            var t17 = param_sublist.times_parameters_signs[j].t17;
                            var t18 = param_sublist.times_parameters_signs[j].t18;
                            var t19 = param_sublist.times_parameters_signs[j].t19;
                            var t20 = param_sublist.times_parameters_signs[j].t20;
                            var t21 = param_sublist.times_parameters_signs[j].t21;
                            var t22 = param_sublist.times_parameters_signs[j].t22;
                            var t23 = param_sublist.times_parameters_signs[j].t23;
                            var t00 = param_sublist.times_parameters_signs[j].t00;
                            var t01 = param_sublist.times_parameters_signs[j].t01;
                            var t02 = param_sublist.times_parameters_signs[j].t02;
                            var t03 = param_sublist.times_parameters_signs[j].t03;
                            var t04 = param_sublist.times_parameters_signs[j].t04;
                            var t05 = param_sublist.times_parameters_signs[j].t05;
                            var t06 = param_sublist.times_parameters_signs[j].t06;
                            var t07 = param_sublist.times_parameters_signs[j].t07;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord357",text:parameters_signs,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord358",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord359",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord360",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord361",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord362",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord363",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord364",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord365",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord366",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord367",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord368",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord369",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord370",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord371",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord372",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord373",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord374",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord375",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord376",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord377",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord378",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord379",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord380",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord382",fieldId:"custrecord381",text:t07,line:j});
                        }
                    }
                    
                    //Setear diet_LQ
                    // log.debug("param_sublist.diet_LQ", param_sublist.diet_LQ);
                    if(param_sublist.diet_LQ.length != 0){
                        var subLength = param_sublist.diet_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.diet_LQ[j].morningShift;
                            var afternoonShift = param_sublist.diet_LQ[j].afternoonShift;
                            var nightShift = param_sublist.diet_LQ[j].nightShift;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord182",fieldId:"custrecord183",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord182",fieldId:"custrecord180",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord182",fieldId:"custrecord181",text:nightShift,line:j});
                        }
                    }
                        //Setear income_LQ
                        if(param_sublist.income_LQ.length != 0){
                        var subLength = param_sublist.income_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var medication_solutions = param_sublist.income_LQ[j].medication_solutions;
                            var t08 = param_sublist.income_LQ[j].t08;
                            var t09 = param_sublist.income_LQ[j].t09;
                            var t10 = param_sublist.income_LQ[j].t10;
                            var t11 = param_sublist.income_LQ[j].t11;
                            var t12 = param_sublist.income_LQ[j].t12;
                            var t13 = param_sublist.income_LQ[j].t13;
                            var t14 = param_sublist.income_LQ[j].t14;
                            var t15 = param_sublist.income_LQ[j].t15;
                            var total1 = param_sublist.income_LQ[j].total1;
                            var t16 = param_sublist.income_LQ[j].t16;
                            var t17 = param_sublist.income_LQ[j].t17;
                            var t18 = param_sublist.income_LQ[j].t18;
                            var t19 = param_sublist.income_LQ[j].t19;
                            var t20 = param_sublist.income_LQ[j].t20;
                            var t21 = param_sublist.income_LQ[j].t21;
                            var t22 = param_sublist.income_LQ[j].t22;
                            var t23 = param_sublist.income_LQ[j].t23;
                            var total2 = param_sublist.income_LQ[j].total2;
                            var t00 = param_sublist.income_LQ[j].t00;
                            var t01 = param_sublist.income_LQ[j].t01;
                            var t02 = param_sublist.income_LQ[j].t02;
                            var t03 = param_sublist.income_LQ[j].t03;
                            var t04 = param_sublist.income_LQ[j].t04;
                            var t05 = param_sublist.income_LQ[j].t05;
                            var t06 = param_sublist.income_LQ[j].t06;
                            var t07 = param_sublist.income_LQ[j].t07;
                            var total3 = param_sublist.income_LQ[j].total3;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord184",text:medication_solutions,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord186",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord187",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord188",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord189",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord190",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord191",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord192",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord193",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord194",text:total1,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord195",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord196",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord197",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord198",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord199",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord200",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord201",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord202",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord203",text:total2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord204",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord205",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord206",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord207",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord208",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord209",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord210",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord211",text:t07,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord185",fieldId:"custrecord212",text:total3,line:j});
                        }
                    }
                        //Setear receipts_LQ
                        if(param_sublist.receipts_LQ.length != 0){
                        var subLength = param_sublist.receipts_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var receipts = param_sublist.receipts_LQ[j].receipts;
                            var t08 = param_sublist.receipts_LQ[j].t08;
                            var t09 = param_sublist.receipts_LQ[j].t09;
                            var t10 = param_sublist.receipts_LQ[j].t10;
                            var t11 = param_sublist.receipts_LQ[j].t11;
                            var t12 = param_sublist.receipts_LQ[j].t12;
                            var t13 = param_sublist.receipts_LQ[j].t13;
                            var t14 = param_sublist.receipts_LQ[j].t14;
                            var t15 = param_sublist.receipts_LQ[j].t15;
                            var total1 = param_sublist.receipts_LQ[j].total1;
                            var t16 = param_sublist.receipts_LQ[j].t16;
                            var t17 = param_sublist.receipts_LQ[j].t17;
                            var t18 = param_sublist.receipts_LQ[j].t18;
                            var t19 = param_sublist.receipts_LQ[j].t19;
                            var t20 = param_sublist.receipts_LQ[j].t20;
                            var t21 = param_sublist.receipts_LQ[j].t21;
                            var t22 = param_sublist.receipts_LQ[j].t22;
                            var t23 = param_sublist.receipts_LQ[j].t23;
                            var total2 = param_sublist.receipts_LQ[j].total2;
                            var t00 = param_sublist.receipts_LQ[j].t00;
                            var t01 = param_sublist.receipts_LQ[j].t01;
                            var t02 = param_sublist.receipts_LQ[j].t02;
                            var t03 = param_sublist.receipts_LQ[j].t03;
                            var t04 = param_sublist.receipts_LQ[j].t04;
                            var t05 = param_sublist.receipts_LQ[j].t05;
                            var t06 = param_sublist.receipts_LQ[j].t06;
                            var t07 = param_sublist.receipts_LQ[j].t07;
                            var total3 = param_sublist.receipts_LQ[j].total3;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord213",text:receipts,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord215",text:t08,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord216",text:t09,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord217",text:t10,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord218",text:t11,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord219",text:t12,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord220",text:t13,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord221",text:t14,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord222",text:t15,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord223",text:total1,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord224",text:t16,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord225",text:t17,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord226",text:t18,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord227",text:t19,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord228",text:t20,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord229",text:t21,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord230",text:t22,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord231",text:t23,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord232",text:total2,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord233",text:t00,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord234",text:t01,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord235",text:t02,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord236",text:t03,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord237",text:t04,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord238",text:t05,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord239",text:t06,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord240",text:t07,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord214",fieldId:"custrecord241",text:total3,line:j});
                        }
                    }
                    //  observations_relevant_data_LQ
                    if(param_sublist.observations_relevant_data_LQ.length != 0){
                        var subLength = param_sublist.observations_relevant_data_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var morningShift = param_sublist.observations_relevant_data_LQ[j].morningShift;
                            var afternoonShift = param_sublist.observations_relevant_data_LQ[j].afternoonShift;
                            var nightShift = param_sublist.observations_relevant_data_LQ[j].nightShift;
                           obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord245",fieldId:"custrecord242",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord245",fieldId:"custrecord243",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord245",fieldId:"custrecord244",text:nightShift,line:j});
                        }
                    }


                    // responsable_LQ
                    if(param_sublist.responsable_LQ.length != 0){
                        var subLength = param_sublist.responsable_LQ.length;
                        for(var j = 0 ;j<subLength;j++){
                            var responsable = param_sublist.responsable_LQ[j].responsable;
                            var morningShift = param_sublist.responsable_LQ[j].morningShift;
                            var afternoonShift = param_sublist.responsable_LQ[j].afternoonShift;
                            var nightShift = param_sublist.responsable_LQ[j].nightShift;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord246",text:responsable,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord247",text:morningShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord248",text:afternoonShift,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord250",fieldId:"custrecord249",text:nightShift,line:j});
                        }
                    }
                    // evolution_notes
                    if(param_sublist.evolution_notes.length != 0){
                        var subLength = param_sublist.evolution_notes.length;
                        for(var j = 0 ;j<subLength;j++){
                            var date_evolution = param_sublist.evolution_notes[j].date_evolution;
                            var time_evolution = param_sublist.evolution_notes[j].time_evolution;
                            var observations_evolution = param_sublist.evolution_notes[j].observations_evolution;
                            var responsable_evolution = param_sublist.evolution_notes[j].responsable_evolution;
                            obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord432",text:date_evolution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord433",text:time_evolution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord434",text:observations_evolution,line:j}),obj_case_LoadProcedure.setSublistText({sublistId:"recmachcustrecord431",fieldId:"custrecord435",text:responsable_evolution,line:j});
                        }
                    }

                    id_recordCreate_Procedure = obj_case_LoadProcedure.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": "procedure created"
                    })
                } catch (error) {
                    log.debug("Error", error);
                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": error
                    })
                }


            } 
            else if (param_typeProcedure == "noQx") {

                var customform_createProcedure = "";

                if (param_typeInternal == "rostro") {
                    customform_createProcedure = "147";
                } else if (param_typeInternal == "cuerpo") {
                    customform_createProcedure = "33";
                }


                try {
                    var obj_case_CreateProcedure = record.create({
                        type: record.Type.SUPPORT_CASE,
                        isDynamic: true,
                    });

                    obj_case_CreateProcedure.setValue({
                        fieldId: 'customform', // Formulario Diagnostico Body & Skin 138
                        value: customform_createProcedure,
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'company', // idCustomer
                        value: param_idCustomer,
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'title', // titulo del caso
                        value: "NoQX-" + param_typeInternal,
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'custevent322', // Consutlor que valoro
                        value: "1171930",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'custevent207', // Ocupación del cliente por default empleado
                        value: "16",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'custevent208', // Como se entero de nosotros es App Web por default
                        value: "244",
                        ignoreFieldChange: true
                    });
                    obj_case_CreateProcedure.setValue({
                        fieldId: 'email', // email de cliente
                        value: "dale_mas@perro.com",
                        ignoreFieldChange: true
                    });

                    var id_recordCreate_Procedure = obj_case_CreateProcedure.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    var obj_case_LoadProcedure = record.load({
                        type: record.Type.SUPPORT_CASE,
                        id: id_recordCreate_Procedure,
                        isDynamic: true
                    });
                } catch (error) {
                    log.debug("error create qx", error)
                }

                try {

                    if (param_custevent648 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent648",
                            text: param_custevent648,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent649 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent649",
                            text: param_custevent649,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent650 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent650",
                            text: param_custevent650,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent651 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent651",
                            text: param_custevent651,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent652 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent652",
                            value: param_custevent652,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent653 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent653",
                            value: param_custevent653,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent654 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent654",
                            value: param_custevent654,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent506 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent506",
                            text: param_custevent506,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent507 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent507",
                            text: param_custevent507,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent541 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent541",
                            text: param_custevent541,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent636 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent636",
                            value: param_custevent636,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent637 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent637",
                            value: param_custevent637,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent639 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent639",
                            text: param_custevent639,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent640 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent640",
                            text: param_custevent640,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent641 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent641",
                            text: param_custevent641,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent642 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent642",
                            text: param_custevent642,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent643 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent643",
                            text: param_custevent643,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent644 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent644",
                            text: param_custevent644,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent645 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent645",
                            text: param_custevent645,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent646 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent646",
                            text: param_custevent646,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent647 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent647",
                            text: param_custevent647,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1056 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1056",
                            text: param_custevent1056,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1069 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1069",
                            text: param_custevent1069,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1020 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1020",
                            text: param_custevent1020,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1038 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1038",
                            text: param_custevent1038,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1029 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1029",
                            text: param_custevent1029,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1047 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1047",
                            text: param_custevent1047,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent867 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent867",
                            value: param_custevent867,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent876 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent876",
                            value: param_custevent876,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent858 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent858",
                            value: param_custevent858,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent912 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent912",
                            text: param_custevent912,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent921 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent921",
                            text: param_custevent921,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent930 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent930",
                            text: param_custevent930,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent885 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent885",
                            value: param_custevent885,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent894 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent894",
                            value: param_custevent894,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent939 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent939",
                            text: param_custevent939,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent957 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent957",
                            text: param_custevent957,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent966 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent966",
                            text: param_custevent966,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent948 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent948",
                            text: param_custevent948,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent975 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent975",
                            text: param_custevent975,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent984 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent984",
                            text: param_custevent984,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent993 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent993",
                            text: param_custevent993,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1002 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1002",
                            text: param_custevent1002,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1011 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1011",
                            text: param_custevent1011,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1057 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1057",
                            text: param_custevent1057,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1070 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1070",
                            text: param_custevent1070,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1021 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1021",
                            text: param_custevent1021,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1039 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1039",
                            text: param_custevent1039,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1030 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1030",
                            text: param_custevent1030,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1048 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1048",
                            text: param_custevent1048,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent868 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent868",
                            value: param_custevent868,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent877 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent877",
                            value: param_custevent877,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent859 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent859",
                            value: param_custevent859,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent913 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent913",
                            text: param_custevent913,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent922 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent922",
                            text: param_custevent922,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent931 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent931",
                            text: param_custevent931,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent886 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent886",
                            value: param_custevent886,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent895 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent895",
                            value: param_custevent895,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent940 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent940",
                            text: param_custevent940,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent958 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent958",
                            text: param_custevent958,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent967 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent967",
                            text: param_custevent967,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent949 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent949",
                            text: param_custevent949,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent976 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent976",
                            text: param_custevent976,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent985 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent985",
                            text: param_custevent985,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent994 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent994",
                            text: param_custevent994,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1003 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1003",
                            text: param_custevent1003,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1012 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1012",
                            text: param_custevent1012,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1058 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1058",
                            text: param_custevent1058,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1071 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1071",
                            text: param_custevent1071,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1022 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1022",
                            text: param_custevent1022,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1040 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1040",
                            text: param_custevent1040,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1031 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1031",
                            text: param_custevent1031,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1049 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1049",
                            text: param_custevent1049,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent869 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent869",
                            value: param_custevent869,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent878 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent878",
                            value: param_custevent878,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent860 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent860",
                            value: param_custevent860,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent914 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent914",
                            text: param_custevent914,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent923 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent923",
                            text: param_custevent923,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent932 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent932",
                            text: param_custevent932,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent887 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent887",
                            value: param_custevent887,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent896 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent896",
                            value: param_custevent896,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent941 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent941",
                            text: param_custevent941,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent959 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent959",
                            text: param_custevent959,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent968 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent968",
                            text: param_custevent968,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent950 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent950",
                            text: param_custevent950,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent977 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent977",
                            text: param_custevent977,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent986 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent986",
                            text: param_custevent986,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent995 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent995",
                            text: param_custevent995,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1004 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1004",
                            text: param_custevent1004,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1013 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1013",
                            text: param_custevent1013,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1059 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1059",
                            text: param_custevent1059,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1072 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1072",
                            text: param_custevent1072,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1023 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1023",
                            text: param_custevent1023,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1041 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1041",
                            text: param_custevent1041,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1032 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1032",
                            text: param_custevent1032,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1050 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1050",
                            text: param_custevent1050,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent870 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent870",
                            value: param_custevent870,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent879 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent879",
                            value: param_custevent879,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent861 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent861",
                            value: param_custevent861,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent915 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent915",
                            text: param_custevent915,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent924 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent924",
                            text: param_custevent924,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent933 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent933",
                            text: param_custevent933,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent888 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent888",
                            value: param_custevent888,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent897 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent897",
                            value: param_custevent897,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent942 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent942",
                            text: param_custevent942,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent960 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent960",
                            text: param_custevent960,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent969 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent969",
                            text: param_custevent969,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent951 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent951",
                            text: param_custevent951,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent978 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent978",
                            text: param_custevent978,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent987 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent987",
                            text: param_custevent987,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent996 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent996",
                            text: param_custevent996,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1005 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1005",
                            text: param_custevent1005,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1014 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1014",
                            text: param_custevent1014,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1060 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1060",
                            text: param_custevent1060,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1073 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1073",
                            text: param_custevent1073,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1024 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1024",
                            text: param_custevent1024,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1042 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1042",
                            text: param_custevent1042,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1033 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1033",
                            text: param_custevent1033,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1051 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1051",
                            text: param_custevent1051,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent871 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent871",
                            value: param_custevent871,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent880 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent880",
                            value: param_custevent880,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent862 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent862",
                            value: param_custevent862,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent916 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent916",
                            text: param_custevent916,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent925 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent925",
                            text: param_custevent925,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent934 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent934",
                            text: param_custevent934,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent889 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent889",
                            value: param_custevent889,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent898 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent898",
                            value: param_custevent898,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent943 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent943",
                            text: param_custevent943,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent961 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent961",
                            text: param_custevent961,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent970 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent970",
                            text: param_custevent970,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent952 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent952",
                            text: param_custevent952,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent979 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent979",
                            text: param_custevent979,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent988 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent988",
                            text: param_custevent988,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent997 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent997",
                            text: param_custevent997,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1006 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1006",
                            text: param_custevent1006,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1015 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1015",
                            text: param_custevent1015,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1061 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1061",
                            text: param_custevent1061,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1074 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1074",
                            text: param_custevent1074,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1025 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1025",
                            text: param_custevent1025,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1043 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1043",
                            text: param_custevent1043,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1034 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1034",
                            text: param_custevent1034,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1052 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1052",
                            text: param_custevent1052,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent872 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent872",
                            value: param_custevent872,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent881 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent881",
                            value: param_custevent881,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent863 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent863",
                            value: param_custevent863,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent917 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent917",
                            text: param_custevent917,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent926 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent926",
                            text: param_custevent926,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent935 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent935",
                            text: param_custevent935,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent890 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent890",
                            value: param_custevent890,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent899 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent899",
                            value: param_custevent899,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent944 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent944",
                            text: param_custevent944,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent962 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent962",
                            text: param_custevent962,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent971 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent971",
                            text: param_custevent971,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent953 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent953",
                            text: param_custevent953,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent980 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent980",
                            text: param_custevent980,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent989 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent989",
                            text: param_custevent989,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent998 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent998",
                            text: param_custevent998,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1007 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1007",
                            text: param_custevent1007,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1016 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1016",
                            text: param_custevent1016,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1062 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1062",
                            text: param_custevent1062,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1075 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1075",
                            text: param_custevent1075,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1026 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1026",
                            text: param_custevent1026,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1044 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1044",
                            text: param_custevent1044,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1035 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1035",
                            text: param_custevent1035,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1053 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1053",
                            text: param_custevent1053,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent873 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent873",
                            value: param_custevent873,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent882 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent882",
                            value: param_custevent882,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent864 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent864",
                            value: param_custevent864,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent918 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent918",
                            text: param_custevent918,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent927 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent927",
                            text: param_custevent927,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent936 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent936",
                            text: param_custevent936,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent891 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent891",
                            value: param_custevent891,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent900 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent900",
                            value: param_custevent900,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent945 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent945",
                            text: param_custevent945,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent963 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent963",
                            text: param_custevent963,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent972 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent972",
                            text: param_custevent972,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent954 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent954",
                            text: param_custevent954,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent981 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent981",
                            text: param_custevent981,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent990 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent990",
                            text: param_custevent990,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent999 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent999",
                            text: param_custevent999,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1008 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1008",
                            text: param_custevent1008,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1017 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1017",
                            text: param_custevent1017,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1063 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1063",
                            text: param_custevent1063,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1076 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1076",
                            text: param_custevent1076,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1027 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1027",
                            text: param_custevent1027,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1045 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1045",
                            text: param_custevent1045,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1036 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1036",
                            text: param_custevent1036,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1054 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1054",
                            text: param_custevent1054,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent874 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent874",
                            value: param_custevent874,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent883 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent883",
                            value: param_custevent883,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent865 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent865",
                            value: param_custevent865,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent919 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent919",
                            text: param_custevent919,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent928 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent928",
                            text: param_custevent928,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent937 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent937",
                            text: param_custevent937,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent892 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent892",
                            value: param_custevent892,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent901 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent901",
                            value: param_custevent901,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent946 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent946",
                            text: param_custevent946,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent964 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent964",
                            text: param_custevent964,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent973 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent973",
                            text: param_custevent973,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent955 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent955",
                            text: param_custevent955,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent982 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent982",
                            text: param_custevent982,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent991 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent991",
                            text: param_custevent991,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1000 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1000",
                            text: param_custevent1000,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1009 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1009",
                            text: param_custevent1009,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1018 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1018",
                            text: param_custevent1018,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1064 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1064",
                            text: param_custevent1064,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1077 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1077",
                            text: param_custevent1077,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1028 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1028",
                            text: param_custevent1028,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1046 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1046",
                            text: param_custevent1046,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1037 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1037",
                            text: param_custevent1037,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1055 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1055",
                            text: param_custevent1055,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent875 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent875",
                            value: param_custevent875,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent884 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent884",
                            value: param_custevent884,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent866 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent866",
                            value: param_custevent866,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent920 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent920",
                            text: param_custevent920,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent929 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent929",
                            text: param_custevent929,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent938 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent938",
                            text: param_custevent938,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent893 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent893",
                            value: param_custevent893,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent902 != "") {
                        obj_case_LoadProcedure.setValue({
                            fieldId: "custevent902",
                            value: param_custevent902,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent947 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent947",
                            text: param_custevent947,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent965 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent965",
                            text: param_custevent965,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent974 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent974",
                            text: param_custevent974,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent956 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent956",
                            text: param_custevent956,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent983 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent983",
                            text: param_custevent983,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent992 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent992",
                            text: param_custevent992,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1001 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1001",
                            text: param_custevent1001,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1010 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1010",
                            text: param_custevent1010,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1019 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1019",
                            text: param_custevent1019,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1065 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1065",
                            text: param_custevent1065,
                            ignoreFieldChange: true
                        });
                    }
                    if (param_custevent1078 != "") {
                        obj_case_LoadProcedure.setText({
                            fieldId: "custevent1078",
                            text: param_custevent1078,
                            ignoreFieldChange: true
                        });
                    }

                    if (param_url_firma != "") {
                        var objNew_img_firma = file.create({
                            name: param_idCustomer + "_" + idProcedure + "_image_firma",
                            fileType: "PNGIMAGE",
                            contents: image_url_img_firmaPx.body,
                            encoding: file.Encoding.UTF8,
                            folder: -4
                        });
                        var idNew_img_firma = objNew_img_firma.save();
                        var obj_img_firma = file.load({
                            id: idNew_img_firma
                        });
                        var content_img_firma = obj_img_firma.getContents();
                        var url_img_firma = obj_img_firma.url;

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent201',
                            value: url_img_firma,
                            ignoreFieldChange: true
                        });

                        obj_case_LoadProcedure.setValue({
                            fieldId: 'custevent269',
                            value: "data:image/png;base64," + content_img_firma,
                            ignoreFieldChange: true
                        });
                    }

                    id_recordCreate_Procedure = obj_case_LoadProcedure.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": "procedure created"
                    })
                } catch (error) {
                    log.debug("Error", error);
                    response_procedure.push({
                        "idProcedure": id_recordCreate_Procedure,
                        "status": error
                    })
                }


            }
        }

        return response_procedure;
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




    return {
        set: doset,
        post: doPost
    };
});