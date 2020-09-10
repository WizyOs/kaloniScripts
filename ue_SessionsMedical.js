/**
 * BEFORELOAD
 * @param {object} type 
 * @param {object} form object Form
 */

function beforeLoad(type, form) {
  var idFormEditAndView = null;
  var idFomrCreate = null;
  var formulario = null;
  if (type == 'view' || type == 'quickview' || type == 'edit') {
    var recId = nlapiGetRecordId(); // id del registro actual
    var record = nlapiLoadRecord('supportcase', recId); // carga el registro actual en el objeto record
    idFormEditAndView = record.getFieldValue('customform'); // Id del formulario
  } else if (type == 'create') {
    idFomrCreate = nlapiGetFieldValue('customform');
  }

  if (idFormEditAndView != null && idFomrCreate == null) {
    formulario = idFormEditAndView;
  }
  if (idFormEditAndView == null && idFomrCreate != null) {
    formulario = idFomrCreate;
  }

  var sesion1 = '';
  var sesion2 = '';
  var sesion3 = '';
  var sesion4 = '';
  var sesion5 = '';
  var sesion6 = '';
  var sesion7 = '';
  var sesion8 = '';
  var sesion9 = '';
  var sesion10 = '';

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
  //var etiqueta_campo_13 = '';
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

  var field_campo_1 = '';
  var field_campo_2 = '';
  var field_campo_3 = '';
  var field_campo_4 = '';
  var field_campo_5 = '';
  var field_campo_6 = '';
  var field_campo_7 = '';
  var field_campo_8 = '';
  var field_campo_9 = '';
  var field_campo_10 = '';
  var field_campo_11 = '';
  var field_campo_12 = '';
  var field_campo_13 = '';
  var field_campo_14 = '';
  var field_campo_15 = '';
  var field_campo_16 = '';
  var field_campo_17 = '';
  var field_campo_18 = '';
  var field_campo_19 = '';
  var field_campo_20 = '';
  var field_campo_21 = '';
  var field_campo_22 = '';
  var field_campo_23 = '';
  var field_campo_24 = '';

  var button_pintaImagen_openStatement = '';
  var button_pintarImagen_closeStatement = '';
  var button_pintarGraficoRostro_openStatement = '';
  var button_pintarGraficoRostro_closeStatement = '';
  var button_pintarGraficoCuerpo_openStatement = '';
  var button_pintarGraficoCuerpo_closeStatement = '';

  //ACTION: Bloque de campos automatizado. Si fecha de sesion es mayor a 1 día de antiguedad se bloquean todos los campos, de lo contrario se bloquean solo aquellos campos que contengan un valor
  //NOTE: variables de crearcion de arreglos
  var tempSessions_closed = Array();
  var tempSessions_semiClosed = Array();
  var array_elementoBlockear_closed = Array();
  var array_elementoBlockear_semiClosed = Array();

  var array_datesLimit_values = Array();
  var array_blockFields_sessions = Array();


  var arr = [];

  if (type == 'view' || type == 'quickview' || type == 'edit' || type == 'create') {
    if (formulario == 33 || formulario == 147) {
      //nlapiLogExecution('DEBUG', 'Formulario', 'Id Form Edit and View: ' + idFormEditAndView + ' Id Form Create: ' + idFomrCreate);
      //ACTION: Creacion de ficha
      var tabSesiones = form.addTab('custpage_sesiones_medical', 'Procedimiento y Aplicación');
      form.insertTab(tabSesiones, 'interactions');

      //ACTION: Creacion de Subfichas
      sesion1 = form.addSubTab('custpage_sesiones_uno', 'Sesión 1', 'custpage_sesiones_medical');
      sesion2 = form.addSubTab('custpage_sesiones_dos', 'Sesión 2', 'custpage_sesiones_medical');
      sesion3 = form.addSubTab('custpage_sesiones_tres', 'Sesión 3', 'custpage_sesiones_medical');
      sesion4 = form.addSubTab('custpage_sesiones_cuatro', 'Sesión 4', 'custpage_sesiones_medical');
      sesion5 = form.addSubTab('custpage_sesiones_cinco', 'Sesión 5', 'custpage_sesiones_medical');
      sesion6 = form.addSubTab('custpage_sesiones_seis', 'Sesión 6', 'custpage_sesiones_medical');
      sesion7 = form.addSubTab('custpage_sesiones_siete', 'Sesión 7', 'custpage_sesiones_medical');
      sesion8 = form.addSubTab('custpage_sesiones_ocho', 'Sesión 8', 'custpage_sesiones_medical');
      sesion9 = form.addSubTab('custpage_sesiones_nueve', 'Sesión 9', 'custpage_sesiones_medical');
      sesion10 = form.addSubTab('custpage_sesiones_diez', 'Sesión 10', 'custpage_sesiones_medical');

      //VARIABLES: Obtencion de Etiquetas de campos Base
      //NOTE: obtención de etiquetas de campos base
      etiqueta_campo_1 = nlapiGetField('custevent648').getLabel();
      etiqueta_campo_2 = nlapiGetField('custevent649').getLabel();
      etiqueta_campo_3 = nlapiGetField('custevent650').getLabel();
      etiqueta_campo_4 = nlapiGetField('custevent651').getLabel();
      etiqueta_campo_5 = nlapiGetField('custevent652').getLabel();
      etiqueta_campo_6 = nlapiGetField('custevent653').getLabel();
      etiqueta_campo_7 = nlapiGetField('custevent654').getLabel();
      etiqueta_campo_8 = nlapiGetField('custevent506').getLabel();
      etiqueta_campo_9 = nlapiGetField('custevent507').getLabel();
      etiqueta_campo_10 = nlapiGetField('custevent541').getLabel();
      etiqueta_campo_11 = nlapiGetField('custevent636').getLabel();
      etiqueta_campo_12 = nlapiGetField('custevent637').getLabel();
      //etiqueta_campo_13 = nlapiGetField('custevent638').getLabel();
      etiqueta_campo_14 = nlapiGetField('custevent639').getLabel();
      etiqueta_campo_15 = nlapiGetField('custevent640').getLabel();
      etiqueta_campo_16 = nlapiGetField('custevent641').getLabel();
      etiqueta_campo_17 = nlapiGetField('custevent642').getLabel();
      etiqueta_campo_18 = nlapiGetField('custevent643').getLabel();
      etiqueta_campo_19 = nlapiGetField('custevent644').getLabel();
      etiqueta_campo_20 = nlapiGetField('custevent645').getLabel();
      etiqueta_campo_21 = nlapiGetField('custevent646').getLabel();
      etiqueta_campo_22 = nlapiGetField('custevent647').getLabel();
      etiqueta_campo_23 = nlapiGetField('custevent1056').getLabel();
      etiqueta_campo_24 = nlapiGetField('custevent1069').getLabel();

      //VARIABLES: Obtencion de Etiquetas de campos Base
      //NOTE: obtención de etiquetas de campos base
      field_campo_1 = nlapiGetField('custevent648');
      field_campo_2 = nlapiGetField('custevent649');
      field_campo_3 = nlapiGetField('custevent650');
      field_campo_4 = nlapiGetField('custevent651');
      field_campo_5 = nlapiGetField('custevent652');
      field_campo_6 = nlapiGetField('custevent653');
      field_campo_7 = nlapiGetField('custevent654');
      field_campo_8 = nlapiGetField('custevent506');
      field_campo_9 = nlapiGetField('custevent507');
      field_campo_10 = nlapiGetField('custevent541');
      field_campo_11 = nlapiGetField('custevent636');
      field_campo_12 = nlapiGetField('custevent637');
      //field_campo_13 = nlapiGetField('custevent638');
      field_campo_14 = nlapiGetField('custevent639');
      field_campo_15 = nlapiGetField('custevent640');
      field_campo_16 = nlapiGetField('custevent641');
      field_campo_17 = nlapiGetField('custevent642');
      field_campo_18 = nlapiGetField('custevent643');
      field_campo_19 = nlapiGetField('custevent644');
      field_campo_20 = nlapiGetField('custevent645');
      field_campo_21 = nlapiGetField('custevent646');
      field_campo_22 = nlapiGetField('custevent647');
      field_campo_23 = nlapiGetField('custevent1056');
      field_campo_24 = nlapiGetField('custevent1069');

      //VARIABLES: Obtencion de valores campos BackEnd
      //NOTE: Valores sesion 1
      var campo_1_sesion1 = nlapiGetFieldValue('custevent648') || null;
      var campo_2_sesion1 = nlapiGetFieldValue('custevent649') || null;
      var campo_3_sesion1 = nlapiGetFieldValue('custevent650') || null;
      var campo_4_sesion1 = nlapiGetFieldValue('custevent651') || null;
      var campo_5_sesion1 = nlapiGetFieldValues('custevent652') || null;
      var campo_6_sesion1 = nlapiGetFieldValues('custevent653') || null;
      var campo_7_sesion1 = nlapiGetFieldValues('custevent654') || null;
      var campo_8_sesion1 = nlapiGetFieldValue('custevent506') || null;
      var campo_9_sesion1 = nlapiGetFieldValue('custevent507') || null;
      var campo_10_sesion1 = nlapiGetFieldValue('custevent541') || null;
      var campo_11_sesion1 = nlapiGetFieldValues('custevent636') || null;
      var campo_12_sesion1 = nlapiGetFieldValues('custevent637') || null;
      //var campo_13_sesion1 = nlapiGetFieldValues('custevent638') || null;
      var campo_14_sesion1 = nlapiGetFieldValue('custevent639') || null;
      var campo_15_sesion1 = nlapiGetFieldValue('custevent640') || null;
      var campo_16_sesion1 = nlapiGetFieldValue('custevent641') || null;
      var campo_17_sesion1 = nlapiGetFieldValue('custevent642') || null;
      var campo_18_sesion1 = nlapiGetFieldValue('custevent643') || null;
      var campo_19_sesion1 = nlapiGetFieldValue('custevent644') || null;
      var campo_20_sesion1 = nlapiGetFieldValue('custevent645') || null;
      var campo_21_sesion1 = nlapiGetFieldValue('custevent646') || null;
      var campo_22_sesion1 = nlapiGetFieldValue('custevent647') || null;
      var campo_23_sesion1 = nlapiGetFieldValue('custevent1056') || null;
      var campo_24_sesion1 = nlapiGetFieldValue('custevent1069') || null;
      //NOTE: Valores sesion 2
      var campo_1_sesion2 = nlapiGetFieldValue('custevent1020') || null;
      var campo_2_sesion2 = nlapiGetFieldValue('custevent1038') || null;
      var campo_3_sesion2 = nlapiGetFieldValue('custevent1029') || null;
      var campo_4_sesion2 = nlapiGetFieldValue('custevent1047') || null;
      var campo_5_sesion2 = nlapiGetFieldValues('custevent867') || null;
      var campo_6_sesion2 = nlapiGetFieldValues('custevent876') || null;
      var campo_7_sesion2 = nlapiGetFieldValues('custevent858') || null;
      var campo_8_sesion2 = nlapiGetFieldValue('custevent912') || null;
      var campo_9_sesion2 = nlapiGetFieldValue('custevent921') || null;
      var campo_10_sesion2 = nlapiGetFieldValue('custevent930') || null;
      var campo_11_sesion2 = nlapiGetFieldValues('custevent885') || null;
      var campo_12_sesion2 = nlapiGetFieldValues('custevent894') || null;
      //var campo_13_sesion2 = nlapiGetFieldValues('custevent903') || null;
      var campo_14_sesion2 = nlapiGetFieldValue('custevent939') || null;
      var campo_15_sesion2 = nlapiGetFieldValue('custevent957') || null;
      var campo_16_sesion2 = nlapiGetFieldValue('custevent966') || null;
      var campo_17_sesion2 = nlapiGetFieldValue('custevent948') || null;
      var campo_18_sesion2 = nlapiGetFieldValue('custevent975') || null;
      var campo_19_sesion2 = nlapiGetFieldValue('custevent984') || null;
      var campo_20_sesion2 = nlapiGetFieldValue('custevent993') || null;
      var campo_21_sesion2 = nlapiGetFieldValue('custevent1002') || null;
      var campo_22_sesion2 = nlapiGetFieldValue('custevent1011') || null;
      var campo_23_sesion2 = nlapiGetFieldValue('custevent1057') || null;
      var campo_24_sesion2 = nlapiGetFieldValue('custevent1070') || null;
      //NOTE: Valores sesion 3
      var campo_1_sesion3 = nlapiGetFieldValue('custevent1021') || null;
      var campo_2_sesion3 = nlapiGetFieldValue('custevent1039') || null;
      var campo_3_sesion3 = nlapiGetFieldValue('custevent1030') || null;
      var campo_4_sesion3 = nlapiGetFieldValue('custevent1048') || null;
      var campo_5_sesion3 = nlapiGetFieldValues('custevent868') || null;
      var campo_6_sesion3 = nlapiGetFieldValues('custevent877') || null;
      var campo_7_sesion3 = nlapiGetFieldValues('custevent859') || null;
      var campo_8_sesion3 = nlapiGetFieldValue('custevent913') || null;
      var campo_9_sesion3 = nlapiGetFieldValue('custevent922') || null;
      var campo_10_sesion3 = nlapiGetFieldValue('custevent931') || null;
      var campo_11_sesion3 = nlapiGetFieldValues('custevent886') || null;
      var campo_12_sesion3 = nlapiGetFieldValues('custevent895') || null;
      //var campo_13_sesion3 = nlapiGetFieldValues('custevent904') || null;
      var campo_14_sesion3 = nlapiGetFieldValue('custevent940') || null;
      var campo_15_sesion3 = nlapiGetFieldValue('custevent958') || null;
      var campo_16_sesion3 = nlapiGetFieldValue('custevent967') || null;
      var campo_17_sesion3 = nlapiGetFieldValue('custevent949') || null;
      var campo_18_sesion3 = nlapiGetFieldValue('custevent976') || null;
      var campo_19_sesion3 = nlapiGetFieldValue('custevent985') || null;
      var campo_20_sesion3 = nlapiGetFieldValue('custevent994') || null;
      var campo_21_sesion3 = nlapiGetFieldValue('custevent1003') || null;
      var campo_22_sesion3 = nlapiGetFieldValue('custevent1012') || null;
      var campo_23_sesion3 = nlapiGetFieldValue('custevent1058') || null;
      var campo_24_sesion3 = nlapiGetFieldValue('custevent1071') || null;
      //NOTE: Valores sesion 4
      var campo_1_sesion4 = nlapiGetFieldValue('custevent1022') || null;
      var campo_2_sesion4 = nlapiGetFieldValue('custevent1040') || null;
      var campo_3_sesion4 = nlapiGetFieldValue('custevent1031') || null;
      var campo_4_sesion4 = nlapiGetFieldValue('custevent1049') || null;
      var campo_5_sesion4 = nlapiGetFieldValues('custevent869') || null;
      var campo_6_sesion4 = nlapiGetFieldValues('custevent878') || null;
      var campo_7_sesion4 = nlapiGetFieldValues('custevent860') || null;
      var campo_8_sesion4 = nlapiGetFieldValue('custevent914') || null;
      var campo_9_sesion4 = nlapiGetFieldValue('custevent923') || null;
      var campo_10_sesion4 = nlapiGetFieldValue('custevent932') || null;
      var campo_11_sesion4 = nlapiGetFieldValues('custevent887') || null;
      var campo_12_sesion4 = nlapiGetFieldValues('custevent896') || null;
      //var campo_13_sesion4 = nlapiGetFieldValues('custevent905') || null;
      var campo_14_sesion4 = nlapiGetFieldValue('custevent941') || null;
      var campo_15_sesion4 = nlapiGetFieldValue('custevent959') || null;
      var campo_16_sesion4 = nlapiGetFieldValue('custevent968') || null;
      var campo_17_sesion4 = nlapiGetFieldValue('custevent950') || null;
      var campo_18_sesion4 = nlapiGetFieldValue('custevent977') || null;
      var campo_19_sesion4 = nlapiGetFieldValue('custevent986') || null;
      var campo_20_sesion4 = nlapiGetFieldValue('custevent995') || null;
      var campo_21_sesion4 = nlapiGetFieldValue('custevent1004') || null;
      var campo_22_sesion4 = nlapiGetFieldValue('custevent1013') || null;
      var campo_23_sesion4 = nlapiGetFieldValue('custevent1059') || null;
      var campo_24_sesion4 = nlapiGetFieldValue('custevent1072') || null;
      //NOTE: Valores sesion 5
      var campo_1_sesion5 = nlapiGetFieldValue('custevent1023') || null;
      var campo_2_sesion5 = nlapiGetFieldValue('custevent1041') || null;
      var campo_3_sesion5 = nlapiGetFieldValue('custevent1032') || null;
      var campo_4_sesion5 = nlapiGetFieldValue('custevent1050') || null;
      var campo_5_sesion5 = nlapiGetFieldValues('custevent870') || null;
      var campo_6_sesion5 = nlapiGetFieldValues('custevent879') || null;
      var campo_7_sesion5 = nlapiGetFieldValues('custevent861') || null;
      var campo_8_sesion5 = nlapiGetFieldValue('custevent915') || null;
      var campo_9_sesion5 = nlapiGetFieldValue('custevent924') || null;
      var campo_10_sesion5 = nlapiGetFieldValue('custevent933') || null;
      var campo_11_sesion5 = nlapiGetFieldValues('custevent888') || null;
      var campo_12_sesion5 = nlapiGetFieldValues('custevent897') || null;
      //var campo_13_sesion5 = nlapiGetFieldValues('custevent906') || null;
      var campo_14_sesion5 = nlapiGetFieldValue('custevent942') || null;
      var campo_15_sesion5 = nlapiGetFieldValue('custevent960') || null;
      var campo_16_sesion5 = nlapiGetFieldValue('custevent969') || null;
      var campo_17_sesion5 = nlapiGetFieldValue('custevent951') || null;
      var campo_18_sesion5 = nlapiGetFieldValue('custevent978') || null;
      var campo_19_sesion5 = nlapiGetFieldValue('custevent987') || null;
      var campo_20_sesion5 = nlapiGetFieldValue('custevent996') || null;
      var campo_21_sesion5 = nlapiGetFieldValue('custevent1005') || null;
      var campo_22_sesion5 = nlapiGetFieldValue('custevent1014') || null;
      var campo_23_sesion5 = nlapiGetFieldValue('custevent1060') || null;
      var campo_24_sesion5 = nlapiGetFieldValue('custevent1073') || null;
      //NOTE: Valores sesion 6
      var campo_1_sesion6 = nlapiGetFieldValue('custevent1024') || null;
      var campo_2_sesion6 = nlapiGetFieldValue('custevent1042') || null;
      var campo_3_sesion6 = nlapiGetFieldValue('custevent1033') || null;
      var campo_4_sesion6 = nlapiGetFieldValue('custevent1051') || null;
      var campo_5_sesion6 = nlapiGetFieldValues('custevent871') || null;
      var campo_6_sesion6 = nlapiGetFieldValues('custevent880') || null;
      var campo_7_sesion6 = nlapiGetFieldValues('custevent862') || null;
      var campo_8_sesion6 = nlapiGetFieldValue('custevent916') || null;
      var campo_9_sesion6 = nlapiGetFieldValue('custevent925') || null;
      var campo_10_sesion6 = nlapiGetFieldValue('custevent934') || null;
      var campo_11_sesion6 = nlapiGetFieldValues('custevent889') || null;
      var campo_12_sesion6 = nlapiGetFieldValues('custevent898') || null;
      //var campo_13_sesion6 = nlapiGetFieldValues('custevent907') || null;
      var campo_14_sesion6 = nlapiGetFieldValue('custevent943') || null;
      var campo_15_sesion6 = nlapiGetFieldValue('custevent961') || null;
      var campo_16_sesion6 = nlapiGetFieldValue('custevent970') || null;
      var campo_17_sesion6 = nlapiGetFieldValue('custevent952') || null;
      var campo_18_sesion6 = nlapiGetFieldValue('custevent979') || null;
      var campo_19_sesion6 = nlapiGetFieldValue('custevent988') || null;
      var campo_20_sesion6 = nlapiGetFieldValue('custevent997') || null;
      var campo_21_sesion6 = nlapiGetFieldValue('custevent1006') || null;
      var campo_22_sesion6 = nlapiGetFieldValue('custevent1015') || null;
      var campo_23_sesion6 = nlapiGetFieldValue('custevent1061') || null;
      var campo_24_sesion6 = nlapiGetFieldValue('custevent1074') || null;
      //NOTE: Valores sesion 7
      var campo_1_sesion7 = nlapiGetFieldValue('custevent1025') || null;
      var campo_2_sesion7 = nlapiGetFieldValue('custevent1043') || null;
      var campo_3_sesion7 = nlapiGetFieldValue('custevent1034') || null;
      var campo_4_sesion7 = nlapiGetFieldValue('custevent1052') || null;
      var campo_5_sesion7 = nlapiGetFieldValues('custevent872') || null;
      var campo_6_sesion7 = nlapiGetFieldValues('custevent881') || null;
      var campo_7_sesion7 = nlapiGetFieldValues('custevent863') || null;
      var campo_8_sesion7 = nlapiGetFieldValue('custevent917') || null;
      var campo_9_sesion7 = nlapiGetFieldValue('custevent926') || null;
      var campo_10_sesion7 = nlapiGetFieldValue('custevent935') || null;
      var campo_11_sesion7 = nlapiGetFieldValues('custevent890') || null;
      var campo_12_sesion7 = nlapiGetFieldValues('custevent899') || null;
      //var campo_13_sesion7 = nlapiGetFieldValues('custevent908') || null;
      var campo_14_sesion7 = nlapiGetFieldValue('custevent944') || null;
      var campo_15_sesion7 = nlapiGetFieldValue('custevent962') || null;
      var campo_16_sesion7 = nlapiGetFieldValue('custevent971') || null;
      var campo_17_sesion7 = nlapiGetFieldValue('custevent953') || null;
      var campo_18_sesion7 = nlapiGetFieldValue('custevent980') || null;
      var campo_19_sesion7 = nlapiGetFieldValue('custevent989') || null;
      var campo_20_sesion7 = nlapiGetFieldValue('custevent998') || null;
      var campo_21_sesion7 = nlapiGetFieldValue('custevent1007') || null;
      var campo_22_sesion7 = nlapiGetFieldValue('custevent1016') || null;
      var campo_23_sesion7 = nlapiGetFieldValue('custevent1062') || null;
      var campo_24_sesion7 = nlapiGetFieldValue('custevent1075') || null;
      //NOTE: Valores sesion 8
      var campo_1_sesion8 = nlapiGetFieldValue('custevent1026') || null;
      var campo_2_sesion8 = nlapiGetFieldValue('custevent1044') || null;
      var campo_3_sesion8 = nlapiGetFieldValue('custevent1035') || null;
      var campo_4_sesion8 = nlapiGetFieldValue('custevent1053') || null;
      var campo_5_sesion8 = nlapiGetFieldValues('custevent873') || null;
      var campo_6_sesion8 = nlapiGetFieldValues('custevent882') || null;
      var campo_7_sesion8 = nlapiGetFieldValues('custevent864') || null;
      var campo_8_sesion8 = nlapiGetFieldValue('custevent918') || null;
      var campo_9_sesion8 = nlapiGetFieldValue('custevent927') || null;
      var campo_10_sesion8 = nlapiGetFieldValue('custevent936') || null;
      var campo_11_sesion8 = nlapiGetFieldValues('custevent891') || null;
      var campo_12_sesion8 = nlapiGetFieldValues('custevent900') || null;
      //var campo_13_sesion8 = nlapiGetFieldValues('custevent909') || null;
      var campo_14_sesion8 = nlapiGetFieldValue('custevent945') || null;
      var campo_15_sesion8 = nlapiGetFieldValue('custevent963') || null;
      var campo_16_sesion8 = nlapiGetFieldValue('custevent972') || null;
      var campo_17_sesion8 = nlapiGetFieldValue('custevent954') || null;
      var campo_18_sesion8 = nlapiGetFieldValue('custevent981') || null;
      var campo_19_sesion8 = nlapiGetFieldValue('custevent990') || null;
      var campo_20_sesion8 = nlapiGetFieldValue('custevent999') || null;
      var campo_21_sesion8 = nlapiGetFieldValue('custevent1008') || null;
      var campo_22_sesion8 = nlapiGetFieldValue('custevent1017') || null;
      var campo_23_sesion8 = nlapiGetFieldValue('custevent1063') || null;
      var campo_24_sesion8 = nlapiGetFieldValue('custevent1076') || null;
      //NOTE: Valores sesion 9
      var campo_1_sesion9 = nlapiGetFieldValue('custevent1027') || null;
      var campo_2_sesion9 = nlapiGetFieldValue('custevent1045') || null;
      var campo_3_sesion9 = nlapiGetFieldValue('custevent1036') || null;
      var campo_4_sesion9 = nlapiGetFieldValue('custevent1054') || null;
      var campo_5_sesion9 = nlapiGetFieldValues('custevent874') || null;
      var campo_6_sesion9 = nlapiGetFieldValues('custevent883') || null;
      var campo_7_sesion9 = nlapiGetFieldValues('custevent865') || null;
      var campo_8_sesion9 = nlapiGetFieldValue('custevent919') || null;
      var campo_9_sesion9 = nlapiGetFieldValue('custevent928') || null;
      var campo_10_sesion9 = nlapiGetFieldValue('custevent937') || null;
      var campo_11_sesion9 = nlapiGetFieldValues('custevent892') || null;
      var campo_12_sesion9 = nlapiGetFieldValues('custevent901') || null;
      //var campo_13_sesion9 = nlapiGetFieldValues('custevent910') || null;
      var campo_14_sesion9 = nlapiGetFieldValue('custevent946') || null;
      var campo_15_sesion9 = nlapiGetFieldValue('custevent964') || null;
      var campo_16_sesion9 = nlapiGetFieldValue('custevent973') || null;
      var campo_17_sesion9 = nlapiGetFieldValue('custevent955') || null;
      var campo_18_sesion9 = nlapiGetFieldValue('custevent982') || null;
      var campo_19_sesion9 = nlapiGetFieldValue('custevent991') || null;
      var campo_20_sesion9 = nlapiGetFieldValue('custevent1000') || null;
      var campo_21_sesion9 = nlapiGetFieldValue('custevent1009') || null;
      var campo_22_sesion9 = nlapiGetFieldValue('custevent1018') || null;
      var campo_23_sesion9 = nlapiGetFieldValue('custevent1064') || null;
      var campo_24_sesion9 = nlapiGetFieldValue('custevent1077') || null;
      //NOTE: Valores sesion 10
      var campo_1_sesion10 = nlapiGetFieldValue('custevent1028') || null;
      var campo_2_sesion10 = nlapiGetFieldValue('custevent1046') || null;
      var campo_3_sesion10 = nlapiGetFieldValue('custevent1037') || null;
      var campo_4_sesion10 = nlapiGetFieldValue('custevent1055') || null;
      var campo_5_sesion10 = nlapiGetFieldValues('custevent875') || null;
      var campo_6_sesion10 = nlapiGetFieldValues('custevent884') || null;
      var campo_7_sesion10 = nlapiGetFieldValues('custevent866') || null;
      var campo_8_sesion10 = nlapiGetFieldValue('custevent920') || null;
      var campo_9_sesion10 = nlapiGetFieldValue('custevent929') || null;
      var campo_10_sesion10 = nlapiGetFieldValue('custevent938') || null;
      var campo_11_sesion10 = nlapiGetFieldValues('custevent893') || null;
      var campo_12_sesion10 = nlapiGetFieldValues('custevent902') || null;
      //var campo_13_sesion10 = nlapiGetFieldValues('custevent911') || null;
      var campo_14_sesion10 = nlapiGetFieldValue('custevent947') || null;
      var campo_15_sesion10 = nlapiGetFieldValue('custevent965') || null;
      var campo_16_sesion10 = nlapiGetFieldValue('custevent974') || null;
      var campo_17_sesion10 = nlapiGetFieldValue('custevent956') || null;
      var campo_18_sesion10 = nlapiGetFieldValue('custevent983') || null;
      var campo_19_sesion10 = nlapiGetFieldValue('custevent992') || null;
      var campo_20_sesion10 = nlapiGetFieldValue('custevent1001') || null;
      var campo_21_sesion10 = nlapiGetFieldValue('custevent1010') || null;
      var campo_22_sesion10 = nlapiGetFieldValue('custevent1019') || null;
      var campo_23_sesion10 = nlapiGetFieldValue('custevent1065') || null;
      var campo_24_sesion10 = nlapiGetFieldValue('custevent1078') || null;

      //ACTION: GRUPOS PERSONALIZADOS
      //NOTE: grupo fecha
      form.addFieldGroup('group_fecha_de_sesion1', 'Fecha de Sesión', 'custpage_sesiones_uno');
      form.addFieldGroup('group_fecha_de_sesion2', 'Fecha de Sesión', 'custpage_sesiones_dos');
      form.addFieldGroup('group_fecha_de_sesion3', 'Fecha de Sesión', 'custpage_sesiones_tres');
      form.addFieldGroup('group_fecha_de_sesion4', 'Fecha de Sesión', 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_fecha_de_sesion5', 'Fecha de Sesión', 'custpage_sesiones_cinco');
      form.addFieldGroup('group_fecha_de_sesion6', 'Fecha de Sesión', 'custpage_sesiones_seis');
      form.addFieldGroup('group_fecha_de_sesion7', 'Fecha de Sesión', 'custpage_sesiones_siete');
      form.addFieldGroup('group_fecha_de_sesion8', 'Fecha de Sesión', 'custpage_sesiones_ocho');
      form.addFieldGroup('group_fecha_de_sesion9', 'Fecha de Sesión', 'custpage_sesiones_nueve');
      form.addFieldGroup('group_fecha_de_sesion10', 'Fecha de Sesión', 'custpage_sesiones_diez');
      //NOTE: grupo Imagenes
      form.addFieldGroup('group_printimages_sesion1', 'Imagen gráfica', 'custpage_sesiones_uno');
      form.addFieldGroup('group_printimages_sesion2', 'Imagen gráfica', 'custpage_sesiones_dos');
      form.addFieldGroup('group_printimages_sesion3', 'Imagen gráfica', 'custpage_sesiones_tres');
      form.addFieldGroup('group_printimages_sesion4', 'Imagen gráfica', 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_printimages_sesion5', 'Imagen gráfica', 'custpage_sesiones_cinco');
      form.addFieldGroup('group_printimages_sesion6', 'Imagen gráfica', 'custpage_sesiones_seis');
      form.addFieldGroup('group_printimages_sesion7', 'Imagen gráfica', 'custpage_sesiones_siete');
      form.addFieldGroup('group_printimages_sesion8', 'Imagen gráfica', 'custpage_sesiones_ocho');
      form.addFieldGroup('group_printimages_sesion9', 'Imagen gráfica', 'custpage_sesiones_nueve');
      form.addFieldGroup('group_printimages_sesion10', 'Imagen gráfica', 'custpage_sesiones_diez');
      //NOTE: grupo sin titulo
      form.addFieldGroup('group_sin_titulo_sesion1', ' ', 'custpage_sesiones_uno');
      form.addFieldGroup('group_sin_titulo_sesion2', ' ', 'custpage_sesiones_dos');
      form.addFieldGroup('group_sin_titulo_sesion3', ' ', 'custpage_sesiones_tres');
      form.addFieldGroup('group_sin_titulo_sesion4', ' ', 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_sin_titulo_sesion5', ' ', 'custpage_sesiones_cinco');
      form.addFieldGroup('group_sin_titulo_sesion6', ' ', 'custpage_sesiones_seis');
      form.addFieldGroup('group_sin_titulo_sesion7', ' ', 'custpage_sesiones_siete');
      form.addFieldGroup('group_sin_titulo_sesion8', ' ', 'custpage_sesiones_ocho');
      form.addFieldGroup('group_sin_titulo_sesion9', ' ', 'custpage_sesiones_nueve');
      form.addFieldGroup('group_sin_titulo_sesion10', ' ', 'custpage_sesiones_diez');
      //NOTE: grupo info general
      var titleGroup_informacionGeneral = 'Información general (si aplica)';
      form.addFieldGroup('group_info_general_sesion1', titleGroup_informacionGeneral, 'custpage_sesiones_uno');
      form.addFieldGroup('group_info_general_sesion2', titleGroup_informacionGeneral, 'custpage_sesiones_dos');
      form.addFieldGroup('group_info_general_sesion3', titleGroup_informacionGeneral, 'custpage_sesiones_tres');
      form.addFieldGroup('group_info_general_sesion4', titleGroup_informacionGeneral, 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_info_general_sesion5', titleGroup_informacionGeneral, 'custpage_sesiones_cinco');
      form.addFieldGroup('group_info_general_sesion6', titleGroup_informacionGeneral, 'custpage_sesiones_seis');
      form.addFieldGroup('group_info_general_sesion7', titleGroup_informacionGeneral, 'custpage_sesiones_siete');
      form.addFieldGroup('group_info_general_sesion8', titleGroup_informacionGeneral, 'custpage_sesiones_ocho');
      form.addFieldGroup('group_info_general_sesion9', titleGroup_informacionGeneral, 'custpage_sesiones_nueve');
      form.addFieldGroup('group_info_general_sesion10', titleGroup_informacionGeneral, 'custpage_sesiones_diez');
      //NOTE: grupo perimetro
      var titleGroup_perimetros = 'Perímetros (si aplica)';
      form.addFieldGroup('group_perimetros_sesion1', titleGroup_perimetros, 'custpage_sesiones_uno');
      form.addFieldGroup('group_perimetros_sesion2', titleGroup_perimetros, 'custpage_sesiones_dos');
      form.addFieldGroup('group_perimetros_sesion3', titleGroup_perimetros, 'custpage_sesiones_tres');
      form.addFieldGroup('group_perimetros_sesion4', titleGroup_perimetros, 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_perimetros_sesion5', titleGroup_perimetros, 'custpage_sesiones_cinco');
      form.addFieldGroup('group_perimetros_sesion6', titleGroup_perimetros, 'custpage_sesiones_seis');
      form.addFieldGroup('group_perimetros_sesion7', titleGroup_perimetros, 'custpage_sesiones_siete');
      form.addFieldGroup('group_perimetros_sesion8', titleGroup_perimetros, 'custpage_sesiones_ocho');
      form.addFieldGroup('group_perimetros_sesion9', titleGroup_perimetros, 'custpage_sesiones_nueve');
      form.addFieldGroup('group_perimetros_sesion10', titleGroup_perimetros, 'custpage_sesiones_diez');
      //NOTE: grupo pliegues cutaneos
      var titleGroup_plieguesCuataneos = 'Pliegues cutáneos (si aplica)';
      form.addFieldGroup('group_pliegues_cutaneos_sesion1', titleGroup_plieguesCuataneos, 'custpage_sesiones_uno');
      form.addFieldGroup('group_pliegues_cutaneos_sesion2', titleGroup_plieguesCuataneos, 'custpage_sesiones_dos');
      form.addFieldGroup('group_pliegues_cutaneos_sesion3', titleGroup_plieguesCuataneos, 'custpage_sesiones_tres');
      form.addFieldGroup('group_pliegues_cutaneos_sesion4', titleGroup_plieguesCuataneos, 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_pliegues_cutaneos_sesion5', titleGroup_plieguesCuataneos, 'custpage_sesiones_cinco');
      form.addFieldGroup('group_pliegues_cutaneos_sesion6', titleGroup_plieguesCuataneos, 'custpage_sesiones_seis');
      form.addFieldGroup('group_pliegues_cutaneos_sesion7', titleGroup_plieguesCuataneos, 'custpage_sesiones_siete');
      form.addFieldGroup('group_pliegues_cutaneos_sesion8', titleGroup_plieguesCuataneos, 'custpage_sesiones_ocho');
      form.addFieldGroup('group_pliegues_cutaneos_sesion9', titleGroup_plieguesCuataneos, 'custpage_sesiones_nueve');
      form.addFieldGroup('group_pliegues_cutaneos_sesion10', titleGroup_plieguesCuataneos, 'custpage_sesiones_diez');
      //NOTE: grupo observaciones
      form.addFieldGroup('group_observaciones_sesion1', 'Observaciones', 'custpage_sesiones_uno');
      form.addFieldGroup('group_observaciones_sesion2', 'Observaciones', 'custpage_sesiones_dos');
      form.addFieldGroup('group_observaciones_sesion3', 'Observaciones', 'custpage_sesiones_tres');
      form.addFieldGroup('group_observaciones_sesion4', 'Observaciones', 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_observaciones_sesion5', 'Observaciones', 'custpage_sesiones_cinco');
      form.addFieldGroup('group_observaciones_sesion6', 'Observaciones', 'custpage_sesiones_seis');
      form.addFieldGroup('group_observaciones_sesion7', 'Observaciones', 'custpage_sesiones_siete');
      form.addFieldGroup('group_observaciones_sesion8', 'Observaciones', 'custpage_sesiones_ocho');
      form.addFieldGroup('group_observaciones_sesion9', 'Observaciones', 'custpage_sesiones_nueve');
      form.addFieldGroup('group_observaciones_sesion10', 'Observaciones', 'custpage_sesiones_diez');
      //NOTE: grupo responsables
      form.addFieldGroup('group_responsables_sesion1', 'Responsables', 'custpage_sesiones_uno');
      form.addFieldGroup('group_responsables_sesion2', 'Responsables', 'custpage_sesiones_dos');
      form.addFieldGroup('group_responsables_sesion3', 'Responsables', 'custpage_sesiones_tres');
      form.addFieldGroup('group_responsables_sesion4', 'Responsables', 'custpage_sesiones_cuatro');
      form.addFieldGroup('group_responsables_sesion5', 'Responsables', 'custpage_sesiones_cinco');
      form.addFieldGroup('group_responsables_sesion6', 'Responsables', 'custpage_sesiones_seis');
      form.addFieldGroup('group_responsables_sesion7', 'Responsables', 'custpage_sesiones_siete');
      form.addFieldGroup('group_responsables_sesion8', 'Responsables', 'custpage_sesiones_ocho');
      form.addFieldGroup('group_responsables_sesion9', 'Responsables', 'custpage_sesiones_nueve');
      form.addFieldGroup('group_responsables_sesion10', 'Responsables', 'custpage_sesiones_diez');
      //NOTE: boton que abre el suitelet para pintar el gráfico de procedimiento
      button_pintarGraficoCuerpo_openStatement = '<button id="printGraficoCuerpo" name="printGraficoCuerpo" style="width:220px; height:240px; margin-top:5px; border-radius: 0px !important;" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.pintarImagenes_aparatologia(';
      button_pintarGraficoCuerpo_closeStatement = ',\'b\');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><img style="width:200px; height:200px;" src=\'https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030\'><b>Clic</b></button>';

      button_pintarGraficoRostro_openStatement = '<button id="printGraficoRostro" name="printGraficoRostro" style="width:220px; height:240px; margin-top:5px; border-radius: 0px !important;: 0px;" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.pintarImagenes_aparatologia(';
      button_pintarGraficoRostro_closeStatement = ',\'s\');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><img style="width:200px; height:200px;" src=\'https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4\'><b>Clic</b></button>';

      //ACTION: Creacion de Campos personalizados          
      //NOTE: Campos Sesion 1
      if (campo_23_sesion1 != null) {
        form.addField('custpage_field_sesion_uno_custevent1056', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion1');
      } else {
        form.addField('custpage_field_sesion_uno_custevent1056', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion1').setMandatory(true);
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_uno_custevent654', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion1');
        form.addField('custpage_field_sesion_uno_custevent652', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion1');
        form.addField('custpage_field_sesion_uno_custevent653', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion1');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_uno_custevent636', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion1');
        form.addField('custpage_field_sesion_uno_custevent637', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion1');
        //form.addField('custpage_field_sesion_uno_custevent638', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion1');
        form.addField('custpage_field_sesion_uno_custevent506', 'float', etiqueta_campo_8, null, 'group_info_general_sesion1');
        form.addField('custpage_field_sesion_uno_custevent507', 'float', etiqueta_campo_9, null, 'group_info_general_sesion1');
        form.addField('custpage_field_sesion_uno_custevent541', 'float', etiqueta_campo_10, null, 'group_info_general_sesion1').setDisplayType('inline');
        form.addField('custpage_field_sesion_uno_custevent639', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion1');
        form.addField('custpage_field_sesion_uno_custevent640', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion1');
        form.addField('custpage_field_sesion_uno_custevent641', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion1');
        form.addField('custpage_field_sesion_uno_custevent642', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion1');
        form.addField('custpage_field_sesion_uno_custevent643', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion1');
        form.addField('custpage_field_sesion_uno_custevent644', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion1');
        form.addField('custpage_field_sesion_uno_custevent645', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion1');
        form.addField('custpage_field_sesion_uno_custevent646', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion1');
        form.addField('custpage_field_sesion_uno_custevent647', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion1');
      }
      form.addField('custpage_field_sesion_uno_custevent648', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion1');
      form.addField('custpage_field_sesion_uno_custevent649', 'text', etiqueta_campo_2, null, 'group_responsables_sesion1');
      form.addField('custpage_field_sesion_uno_custevent650', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion1');
      form.addField('custpage_field_sesion_uno_custevent651', 'text', etiqueta_campo_4, null, 'group_responsables_sesion1');
      if (type == 'view') {
        if (campo_24_sesion1 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_1_custevent1069', 'inlinehtml', '', null, 'group_printimages_sesion1').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 1 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_1_custevent1069', 'inlinehtml', '', null, 'group_printimages_sesion1').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 1 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_1_custevent1069', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion1').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion1) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 2         
      if (campo_23_sesion1 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion1) === 'false') {
          form.addField('custpage_field_sesion_dos_custevent1057', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion2');
        } else {
          form.addField('custpage_field_sesion_dos_custevent1057', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion2').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_dos_custevent1057', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion2');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_dos_custevent858', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion2');
        form.addField('custpage_field_sesion_dos_custevent867', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion2');
        form.addField('custpage_field_sesion_dos_custevent876', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion2');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_dos_custevent885', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion2');
        form.addField('custpage_field_sesion_dos_custevent894', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion2');
        //form.addField('custpage_field_sesion_dos_custevent903', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion2');
        form.addField('custpage_field_sesion_dos_custevent912', 'float', etiqueta_campo_8, null, 'group_info_general_sesion2');
        form.addField('custpage_field_sesion_dos_custevent921', 'float', etiqueta_campo_9, null, 'group_info_general_sesion2');
        form.addField('custpage_field_sesion_dos_custevent930', 'float', etiqueta_campo_10, null, 'group_info_general_sesion2').setDisplayType('inline');
        form.addField('custpage_field_sesion_dos_custevent939', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion2');
        form.addField('custpage_field_sesion_dos_custevent957', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion2');
        form.addField('custpage_field_sesion_dos_custevent966', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion2');
        form.addField('custpage_field_sesion_dos_custevent948', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion2');
        form.addField('custpage_field_sesion_dos_custevent975', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion2');
        form.addField('custpage_field_sesion_dos_custevent984', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion2');
        form.addField('custpage_field_sesion_dos_custevent993', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion2');
        form.addField('custpage_field_sesion_dos_custevent1002', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion2');
        form.addField('custpage_field_sesion_dos_custevent1011', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion2');
      }
      form.addField('custpage_field_sesion_dos_custevent1020', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion2');
      form.addField('custpage_field_sesion_dos_custevent1038', 'text', etiqueta_campo_2, null, 'group_responsables_sesion2');
      form.addField('custpage_field_sesion_dos_custevent1029', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion2');
      form.addField('custpage_field_sesion_dos_custevent1047', 'text', etiqueta_campo_4, null, 'group_responsables_sesion2');
      if (type == 'view') {
        if (campo_24_sesion2 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_2_custevent1070', 'inlinehtml', '', null, 'group_printimages_sesion2').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 2 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_2_custevent1070', 'inlinehtml', '', null, 'group_printimages_sesion2').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 2 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_2_custevent1070', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion2').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion2) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 3
      if (campo_23_sesion2 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion2) === 'false') {
          form.addField('custpage_field_sesion_tres_custevent1058', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion3');
        } else {
          form.addField('custpage_field_sesion_tres_custevent1058', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion3').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_tres_custevent1058', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion3');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_tres_custevent859', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion3');
        form.addField('custpage_field_sesion_tres_custevent868', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion3');
        form.addField('custpage_field_sesion_tres_custevent877', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion3');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_tres_custevent886', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion3');
        form.addField('custpage_field_sesion_tres_custevent895', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion3');
        //form.addField('custpage_field_sesion_tres_custevent904', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion3');
        form.addField('custpage_field_sesion_tres_custevent913', 'float', etiqueta_campo_8, null, 'group_info_general_sesion3');
        form.addField('custpage_field_sesion_tres_custevent922', 'float', etiqueta_campo_9, null, 'group_info_general_sesion3');
        form.addField('custpage_field_sesion_tres_custevent931', 'float', etiqueta_campo_10, null, 'group_info_general_sesion3').setDisplayType('inline');
        form.addField('custpage_field_sesion_tres_custevent940', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion3');
        form.addField('custpage_field_sesion_tres_custevent949', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion3');
        form.addField('custpage_field_sesion_tres_custevent958', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion3');
        form.addField('custpage_field_sesion_tres_custevent967', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion3');
        form.addField('custpage_field_sesion_tres_custevent976', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion3');
        form.addField('custpage_field_sesion_tres_custevent985', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion3');
        form.addField('custpage_field_sesion_tres_custevent994', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion3');
        form.addField('custpage_field_sesion_tres_custevent1003', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion3');
        form.addField('custpage_field_sesion_tres_custevent1012', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion3');
      }
      form.addField('custpage_field_sesion_tres_custevent1021', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion3');
      form.addField('custpage_field_sesion_tres_custevent1030', 'text', etiqueta_campo_2, null, 'group_responsables_sesion3');
      form.addField('custpage_field_sesion_tres_custevent1039', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion3');
      form.addField('custpage_field_sesion_tres_custevent1048', 'text', etiqueta_campo_4, null, 'group_responsables_sesion3');
      if (type == 'view') {
        if (campo_24_sesion3 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_3_custevent1071', 'inlinehtml', '', null, 'group_printimages_sesion3').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 3 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_3_custevent1071', 'inlinehtml', '', null, 'group_printimages_sesion3').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 3 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_3_custevent1071', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion3').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion3) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 4
      if (campo_23_sesion3 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion3) === 'false') {
          form.addField('custpage_field_sesion_cuatro_custevent1059', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion4');
        } else {
          form.addField('custpage_field_sesion_cuatro_custevent1059', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion4').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_cuatro_custevent1059', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion4');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_cuatro_custevent860', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent869', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent878', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion4');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_cuatro_custevent887', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent896', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion4');
        //form.addField('custpage_field_sesion_cuatro_custevent905', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent914', 'float', etiqueta_campo_8, null, 'group_info_general_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent923', 'float', etiqueta_campo_9, null, 'group_info_general_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent932', 'float', etiqueta_campo_10, null, 'group_info_general_sesion4').setDisplayType('inline');
        form.addField('custpage_field_sesion_cuatro_custevent941', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent950', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent959', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent968', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent977', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent986', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent995', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent1004', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion4');
        form.addField('custpage_field_sesion_cuatro_custevent1013', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion4');
      }
      form.addField('custpage_field_sesion_cuatro_custevent1022', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion4');
      form.addField('custpage_field_sesion_cuatro_custevent1031', 'text', etiqueta_campo_2, null, 'group_responsables_sesion4');
      form.addField('custpage_field_sesion_cuatro_custevent1040', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion4');
      form.addField('custpage_field_sesion_cuatro_custevent1049', 'text', etiqueta_campo_4, null, 'group_responsables_sesion4');
      if (type == 'view') {
        if (campo_24_sesion4 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_4_custevent1072', 'inlinehtml', '', null, 'group_printimages_sesion4').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 4 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_4_custevent1072', 'inlinehtml', '', null, 'group_printimages_sesion4').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 4 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_4_custevent1072', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion4').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion4) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 5
      if (campo_23_sesion4 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion4) === 'false') {
          form.addField('custpage_field_sesion_cinco_custevent1060', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion5');
        } else {
          form.addField('custpage_field_sesion_cinco_custevent1060', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion5').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_cinco_custevent1060', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion5');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_cinco_custevent861', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent870', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent879', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion5');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_cinco_custevent888', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent897', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion5');
        //form.addField('custpage_field_sesion_cinco_custevent906', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent915', 'float', etiqueta_campo_8, null, 'group_info_general_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent924', 'float', etiqueta_campo_9, null, 'group_info_general_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent933', 'float', etiqueta_campo_10, null, 'group_info_general_sesion5').setDisplayType('inline');
        form.addField('custpage_field_sesion_cinco_custevent942', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent951', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent960', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent969', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent978', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent987', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent996', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent1005', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion5');
        form.addField('custpage_field_sesion_cinco_custevent1014', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion5');
      }
      form.addField('custpage_field_sesion_cinco_custevent1023', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion5');
      form.addField('custpage_field_sesion_cinco_custevent1032', 'text', etiqueta_campo_2, null, 'group_responsables_sesion5');
      form.addField('custpage_field_sesion_cinco_custevent1041', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion5');
      form.addField('custpage_field_sesion_cinco_custevent1050', 'text', etiqueta_campo_4, null, 'group_responsables_sesion5');
      if (type == 'view') {
        if (campo_24_sesion5 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_5_custevent1073', 'inlinehtml', '', null, 'group_printimages_sesion5').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 5 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_5_custevent1073', 'inlinehtml', '', null, 'group_printimages_sesion5').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 5 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_5_custevent1073', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion5').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion5) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 6
      if (campo_23_sesion5 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion5) === 'false') {
          form.addField('custpage_field_sesion_seis_custevent1061', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion6');
        } else {
          form.addField('custpage_field_sesion_seis_custevent1061', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion6').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_seis_custevent1061', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion6');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_seis_custevent862', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion6');
        form.addField('custpage_field_sesion_seis_custevent871', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion6');
        form.addField('custpage_field_sesion_seis_custevent880', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion6');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_seis_custevent889', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion6');
        form.addField('custpage_field_sesion_seis_custevent898', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion6');
        //form.addField('custpage_field_sesion_seis_custevent907', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion6');
        form.addField('custpage_field_sesion_seis_custevent916', 'float', etiqueta_campo_8, null, 'group_info_general_sesion6');
        form.addField('custpage_field_sesion_seis_custevent925', 'float', etiqueta_campo_9, null, 'group_info_general_sesion6');
        form.addField('custpage_field_sesion_seis_custevent934', 'float', etiqueta_campo_10, null, 'group_info_general_sesion6').setDisplayType('inline');
        form.addField('custpage_field_sesion_seis_custevent943', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion6');
        form.addField('custpage_field_sesion_seis_custevent952', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion6');
        form.addField('custpage_field_sesion_seis_custevent961', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion6');
        form.addField('custpage_field_sesion_seis_custevent970', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion6');
        form.addField('custpage_field_sesion_seis_custevent979', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion6');
        form.addField('custpage_field_sesion_seis_custevent988', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion6');
        form.addField('custpage_field_sesion_seis_custevent997', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion6');
        form.addField('custpage_field_sesion_seis_custevent1006', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion6');
        form.addField('custpage_field_sesion_seis_custevent1015', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion6');
      }
      form.addField('custpage_field_sesion_seis_custevent1024', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion6');
      form.addField('custpage_field_sesion_seis_custevent1033', 'text', etiqueta_campo_2, null, 'group_responsables_sesion6');
      form.addField('custpage_field_sesion_seis_custevent1042', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion6');
      form.addField('custpage_field_sesion_seis_custevent1051', 'text', etiqueta_campo_4, null, 'group_responsables_sesion6');
      if (type == 'view') {
        if (campo_24_sesion6 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_6_custevent1074', 'inlinehtml', '', null, 'group_printimages_sesion6').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 6 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_6_custevent1074', 'inlinehtml', '', null, 'group_printimages_sesion6').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 6 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_6_custevent1074', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion6').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion6) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 7
      if (campo_23_sesion6 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion6) === 'false') {
          form.addField('custpage_field_sesion_siete_custevent1062', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion7');
        } else {
          form.addField('custpage_field_sesion_siete_custevent1062', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion7').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_siete_custevent1062', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion7');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_siete_custevent863', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion7');
        form.addField('custpage_field_sesion_siete_custevent872', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion7');
        form.addField('custpage_field_sesion_siete_custevent881', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion7');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_siete_custevent890', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion7');
        form.addField('custpage_field_sesion_siete_custevent899', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion7');
        //form.addField('custpage_field_sesion_siete_custevent908', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion7');
        form.addField('custpage_field_sesion_siete_custevent917', 'float', etiqueta_campo_8, null, 'group_info_general_sesion7');
        form.addField('custpage_field_sesion_siete_custevent926', 'float', etiqueta_campo_9, null, 'group_info_general_sesion7');
        form.addField('custpage_field_sesion_siete_custevent935', 'float', etiqueta_campo_10, null, 'group_info_general_sesion7').setDisplayType('inline');
        form.addField('custpage_field_sesion_siete_custevent944', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion7');
        form.addField('custpage_field_sesion_siete_custevent953', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion7');
        form.addField('custpage_field_sesion_siete_custevent962', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion7');
        form.addField('custpage_field_sesion_siete_custevent971', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion7');
        form.addField('custpage_field_sesion_siete_custevent980', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion7');
        form.addField('custpage_field_sesion_siete_custevent989', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion7');
        form.addField('custpage_field_sesion_siete_custevent998', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion7');
        form.addField('custpage_field_sesion_siete_custevent1007', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion7');
        form.addField('custpage_field_sesion_siete_custevent1016', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion7');
      }
      form.addField('custpage_field_sesion_siete_custevent1025', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion7');
      form.addField('custpage_field_sesion_siete_custevent1034', 'text', etiqueta_campo_2, null, 'group_responsables_sesion7');
      form.addField('custpage_field_sesion_siete_custevent1043', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion7');
      form.addField('custpage_field_sesion_siete_custevent1052', 'text', etiqueta_campo_4, null, 'group_responsables_sesion7');
      if (type == 'view') {
        if (campo_24_sesion7 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_7_custevent1075', 'inlinehtml', '', null, 'group_printimages_sesion7').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 7 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_7_custevent1075', 'inlinehtml', '', null, 'group_printimages_sesion7').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 7 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_7_custevent1075', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion7').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion7) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 8
      if (campo_23_sesion7 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion7) === 'false') {
          form.addField('custpage_field_sesion_ocho_custevent1063', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion8');
        } else {
          form.addField('custpage_field_sesion_ocho_custevent1063', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion8').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_ocho_custevent1063', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion8');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_ocho_custevent864', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent873', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent882', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion8');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_ocho_custevent891', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent900', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion8');
        //form.addField('custpage_field_sesion_ocho_custevent909', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent918', 'float', etiqueta_campo_8, null, 'group_info_general_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent927', 'float', etiqueta_campo_9, null, 'group_info_general_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent936', 'float', etiqueta_campo_10, null, 'group_info_general_sesion8').setDisplayType('inline');
        form.addField('custpage_field_sesion_ocho_custevent945', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent954', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent963', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent972', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent981', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent990', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent999', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent1008', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion8');
        form.addField('custpage_field_sesion_ocho_custevent1017', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion8');
      }
      form.addField('custpage_field_sesion_ocho_custevent1026', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion8');
      form.addField('custpage_field_sesion_ocho_custevent1035', 'text', etiqueta_campo_2, null, 'group_responsables_sesion8');
      form.addField('custpage_field_sesion_ocho_custevent1044', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion8');
      form.addField('custpage_field_sesion_ocho_custevent1053', 'text', etiqueta_campo_4, null, 'group_responsables_sesion8');
      if (type == 'view') {
        if (campo_24_sesion8 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_8_custevent1076', 'inlinehtml', '', null, 'group_printimages_sesion8').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 8 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_8_custevent1076', 'inlinehtml', '', null, 'group_printimages_sesion8').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 8 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_8_custevent1076', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion8').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion8) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 9
      if (campo_23_sesion8 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion8) === 'false') {
          form.addField('custpage_field_sesion_nueve_custevent1064', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion9');
        } else {
          form.addField('custpage_field_sesion_nueve_custevent1064', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion9').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_nueve_custevent1064', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion9');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_nueve_custevent865', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent874', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent883', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion9');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_nueve_custevent892', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent901', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion9');
        //form.addField('custpage_field_sesion_nueve_custevent910', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent919', 'float', etiqueta_campo_8, null, 'group_info_general_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent928', 'float', etiqueta_campo_9, null, 'group_info_general_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent937', 'float', etiqueta_campo_10, null, 'group_info_general_sesion9').setDisplayType('inline');
        form.addField('custpage_field_sesion_nueve_custevent946', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent955', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent964', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent973', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent982', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent991', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent1000', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent1009', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion9');
        form.addField('custpage_field_sesion_nueve_custevent1018', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion9');
      }
      form.addField('custpage_field_sesion_nueve_custevent1027', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion9');
      form.addField('custpage_field_sesion_nueve_custevent1036', 'text', etiqueta_campo_2, null, 'group_responsables_sesion9');
      form.addField('custpage_field_sesion_nueve_custevent1045', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion9');
      form.addField('custpage_field_sesion_nueve_custevent1054', 'text', etiqueta_campo_4, null, 'group_responsables_sesion9');
      if (type == 'view') {
        if (campo_24_sesion9 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_9_custevent1077', 'inlinehtml', '', null, 'group_printimages_sesion9').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 9 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_9_custevent1077', 'inlinehtml', '', null, 'group_printimages_sesion9').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 9 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_9_custevent1077', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion9').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion9) + '" alt="" width="280px" />');
        }
      }
      //NOTE: Campos Sesion 10
      if (campo_23_sesion9 != null) {
        if (blockFieldsTroughtDay(campo_23_sesion9) === 'false') {
          form.addField('custpage_field_sesion_diez_custevent1065', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion10');
        } else {
          form.addField('custpage_field_sesion_diez_custevent1065', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion10').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_sesion_diez_custevent1065', 'date', etiqueta_campo_23, null, 'group_fecha_de_sesion10');
      }
      if (formulario == 147) {
        form.addField('custpage_field_sesion_diez_custevent866', 'multiselect', etiqueta_campo_7, 'customlist702', 'group_sin_titulo_sesion10');
        form.addField('custpage_field_sesion_diez_custevent875', 'multiselect', etiqueta_campo_5, 'customlist700', 'group_sin_titulo_sesion10');
        form.addField('custpage_field_sesion_diez_custevent884', 'multiselect', etiqueta_campo_6, 'customlist701', 'group_sin_titulo_sesion10');
      }
      if (formulario == 33) {
        form.addField('custpage_field_sesion_diez_custevent893', 'multiselect', etiqueta_campo_11, 'customlist694', 'group_sin_titulo_sesion10');
        form.addField('custpage_field_sesion_diez_custevent902', 'multiselect', etiqueta_campo_12, 'customlist695', 'group_sin_titulo_sesion10');
        //form.addField('custpage_field_sesion_diez_custevent911', 'multiselect', etiqueta_campo_13, 'customlist696', 'group_sin_titulo_sesion10');
        form.addField('custpage_field_sesion_diez_custevent920', 'float', etiqueta_campo_8, null, 'group_info_general_sesion10');
        form.addField('custpage_field_sesion_diez_custevent929', 'float', etiqueta_campo_9, null, 'group_info_general_sesion10');
        form.addField('custpage_field_sesion_diez_custevent938', 'float', etiqueta_campo_10, null, 'group_info_general_sesion10').setDisplayType('inline');
        form.addField('custpage_field_sesion_diez_custevent947', 'float', etiqueta_campo_14, null, 'group_perimetros_sesion10');
        form.addField('custpage_field_sesion_diez_custevent956', 'float', etiqueta_campo_15, null, 'group_perimetros_sesion10');
        form.addField('custpage_field_sesion_diez_custevent965', 'float', etiqueta_campo_16, null, 'group_perimetros_sesion10');
        form.addField('custpage_field_sesion_diez_custevent974', 'float', etiqueta_campo_17, null, 'group_perimetros_sesion10');
        form.addField('custpage_field_sesion_diez_custevent983', 'float', etiqueta_campo_18, null, 'group_pliegues_cutaneos_sesion10');
        form.addField('custpage_field_sesion_diez_custevent992', 'float', etiqueta_campo_19, null, 'group_pliegues_cutaneos_sesion10');
        form.addField('custpage_field_sesion_diez_custevent1001', 'float', etiqueta_campo_20, null, 'group_pliegues_cutaneos_sesion10');
        form.addField('custpage_field_sesion_diez_custevent1010', 'float', etiqueta_campo_21, null, 'group_pliegues_cutaneos_sesion10');
        form.addField('custpage_field_sesion_diez_custevent1019', 'float', etiqueta_campo_22, null, 'group_pliegues_cutaneos_sesion10');
      }
      form.addField('custpage_field_sesion_diez_custevent1028', 'longtext', etiqueta_campo_1, null, 'group_observaciones_sesion10');
      form.addField('custpage_field_sesion_diez_custevent1037', 'text', etiqueta_campo_2, null, 'group_responsables_sesion10');
      form.addField('custpage_field_sesion_diez_custevent1046', 'longtext', etiqueta_campo_3, null, 'group_observaciones_sesion10');
      form.addField('custpage_field_sesion_diez_custevent1055', 'text', etiqueta_campo_4, null, 'group_responsables_sesion10');
      if (type == 'view') {
        if (campo_24_sesion10 == null) {
          form.addField('custpage_button_printgraficocuerpo_sesion_10_custevent1078', 'inlinehtml', '', null, 'group_printimages_sesion10').setDisplayType('inline').setDefaultValue(button_pintarGraficoCuerpo_openStatement + 10 + button_pintarGraficoCuerpo_closeStatement);
          form.addField('custpage_button_printgraficorostro_sesion_10_custevent1078', 'inlinehtml', '', null, 'group_printimages_sesion10').setDisplayType('inline').setDefaultValue(button_pintarGraficoRostro_openStatement + 10 + button_pintarGraficoRostro_closeStatement);
        } else {
          form.addField('custpage_field_printgrafico_sesion_10_custevent1078', 'inlinehtml', etiqueta_campo_24, null, 'group_printimages_sesion10').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_24_sesion10) + '" alt="" width="280px" />');
        }
      }

      //ACTION: Recupera valor de campos sesion 1 y los despliega
      var sesion1_array_nameFields = ['custpage_field_sesion_uno_custevent648', 'custpage_field_sesion_uno_custevent649', 'custpage_field_sesion_uno_custevent650', 'custpage_field_sesion_uno_custevent651', 'custpage_field_sesion_uno_custevent652', 'custpage_field_sesion_uno_custevent653', 'custpage_field_sesion_uno_custevent654', 'custpage_field_sesion_uno_custevent506', 'custpage_field_sesion_uno_custevent507', 'custpage_field_sesion_uno_custevent541', 'custpage_field_sesion_uno_custevent636', 'custpage_field_sesion_uno_custevent637', /* 'custpage_field_sesion_uno_custevent638', */ 'custpage_field_sesion_uno_custevent639', 'custpage_field_sesion_uno_custevent640', 'custpage_field_sesion_uno_custevent641', 'custpage_field_sesion_uno_custevent642', 'custpage_field_sesion_uno_custevent643', 'custpage_field_sesion_uno_custevent644', 'custpage_field_sesion_uno_custevent645', 'custpage_field_sesion_uno_custevent646', 'custpage_field_sesion_uno_custevent647', 'custpage_field_sesion_uno_custevent1056'];

      var sesion1_array_valueFields = [campo_1_sesion1, campo_2_sesion1, campo_3_sesion1, campo_4_sesion1, campo_5_sesion1, campo_6_sesion1, campo_7_sesion1, campo_8_sesion1, campo_9_sesion1, campo_10_sesion1, campo_11_sesion1, campo_12_sesion1, /* campo_13_sesion1, */ campo_14_sesion1, campo_15_sesion1, campo_16_sesion1, campo_17_sesion1, campo_18_sesion1, campo_19_sesion1, campo_20_sesion1, campo_21_sesion1, campo_22_sesion1, campo_23_sesion1];

      for (var sUno = 0; sUno < sesion1_array_nameFields.length; sUno++) {
        if (sesion1_array_valueFields[sUno] != null) {
          nlapiSetFieldValue(sesion1_array_nameFields[sUno], sesion1_array_valueFields[sUno]);
        }
      }

      //ACTION: Recupera valor de campos sesion 2 y los despliega
      var sesion2_array_nameFields = ['custpage_field_sesion_dos_custevent1020', 'custpage_field_sesion_dos_custevent1038', 'custpage_field_sesion_dos_custevent1029', 'custpage_field_sesion_dos_custevent1047', 'custpage_field_sesion_dos_custevent867', 'custpage_field_sesion_dos_custevent876', 'custpage_field_sesion_dos_custevent858', 'custpage_field_sesion_dos_custevent912', 'custpage_field_sesion_dos_custevent921', 'custpage_field_sesion_dos_custevent930', 'custpage_field_sesion_dos_custevent885', 'custpage_field_sesion_dos_custevent894', /* 'custpage_field_sesion_dos_custevent903', */ 'custpage_field_sesion_dos_custevent939', 'custpage_field_sesion_dos_custevent957', 'custpage_field_sesion_dos_custevent966', 'custpage_field_sesion_dos_custevent948', 'custpage_field_sesion_dos_custevent975', 'custpage_field_sesion_dos_custevent984', 'custpage_field_sesion_dos_custevent993', 'custpage_field_sesion_dos_custevent1002', 'custpage_field_sesion_dos_custevent1011', 'custpage_field_sesion_dos_custevent1057'];

      var sesion2_array_valueFields = [campo_1_sesion2, campo_2_sesion2, campo_3_sesion2, campo_4_sesion2, campo_5_sesion2, campo_6_sesion2, campo_7_sesion2, campo_8_sesion2, campo_9_sesion2, campo_10_sesion2, campo_11_sesion2, campo_12_sesion2, /* campo_13_sesion2, */ campo_14_sesion2, campo_15_sesion2, campo_16_sesion2, campo_17_sesion2, campo_18_sesion2, campo_19_sesion2, campo_20_sesion2, campo_21_sesion2, campo_22_sesion2, campo_23_sesion2];

      for (var sDos = 0; sDos < sesion2_array_nameFields.length; sDos++) {
        if (sesion2_array_valueFields[sDos] != null) {
          nlapiSetFieldValue(sesion2_array_nameFields[sDos], sesion2_array_valueFields[sDos]);
        }
      }

      //ACTION: Recupera valor de campos sesion 3 y los despliega
      var sesion3_array_nameFields = ['custpage_field_sesion_tres_custevent1021', 'custpage_field_sesion_tres_custevent1039', 'custpage_field_sesion_tres_custevent1030', 'custpage_field_sesion_tres_custevent1048', 'custpage_field_sesion_tres_custevent868', 'custpage_field_sesion_tres_custevent877', 'custpage_field_sesion_tres_custevent859', 'custpage_field_sesion_tres_custevent913', 'custpage_field_sesion_tres_custevent922', 'custpage_field_sesion_tres_custevent931', 'custpage_field_sesion_tres_custevent886', 'custpage_field_sesion_tres_custevent895', /* 'custpage_field_sesion_tres_custevent904', */ 'custpage_field_sesion_tres_custevent940', 'custpage_field_sesion_tres_custevent958', 'custpage_field_sesion_tres_custevent967', 'custpage_field_sesion_tres_custevent949', 'custpage_field_sesion_tres_custevent976', 'custpage_field_sesion_tres_custevent985', 'custpage_field_sesion_tres_custevent994', 'custpage_field_sesion_tres_custevent1003', 'custpage_field_sesion_tres_custevent1012', 'custpage_field_sesion_tres_custevent1058'];

      var sesion3_array_valueFields = [campo_1_sesion3, campo_2_sesion3, campo_3_sesion3, campo_4_sesion3, campo_5_sesion3, campo_6_sesion3, campo_7_sesion3, campo_8_sesion3, campo_9_sesion3, campo_10_sesion3, campo_11_sesion3, campo_12_sesion3, /* campo_13_sesion3, */ campo_14_sesion3, campo_15_sesion3, campo_16_sesion3, campo_17_sesion3, campo_18_sesion3, campo_19_sesion3, campo_20_sesion3, campo_21_sesion3, campo_22_sesion3, campo_23_sesion3];

      for (var sTres = 0; sTres < sesion3_array_nameFields.length; sTres++) {
        if (sesion3_array_valueFields[sTres] != null) {
          nlapiSetFieldValue(sesion3_array_nameFields[sTres], sesion3_array_valueFields[sTres]);
        }
      }

      //ACTION: Recupera valor de campos sesion 4 y los despliega
      var sesion4_array_nameFields = ['custpage_field_sesion_cuatro_custevent1022', 'custpage_field_sesion_cuatro_custevent1040', 'custpage_field_sesion_cuatro_custevent1031', 'custpage_field_sesion_cuatro_custevent1049', 'custpage_field_sesion_cuatro_custevent869', 'custpage_field_sesion_cuatro_custevent878', 'custpage_field_sesion_cuatro_custevent860', 'custpage_field_sesion_cuatro_custevent914', 'custpage_field_sesion_cuatro_custevent923', 'custpage_field_sesion_cuatro_custevent932', 'custpage_field_sesion_cuatro_custevent887', 'custpage_field_sesion_cuatro_custevent896', /* 'custpage_field_sesion_cuatro_custevent905', */ 'custpage_field_sesion_cuatro_custevent941', 'custpage_field_sesion_cuatro_custevent959', 'custpage_field_sesion_cuatro_custevent968', 'custpage_field_sesion_cuatro_custevent950', 'custpage_field_sesion_cuatro_custevent977', 'custpage_field_sesion_cuatro_custevent986', 'custpage_field_sesion_cuatro_custevent995', 'custpage_field_sesion_cuatro_custevent1004', 'custpage_field_sesion_cuatro_custevent1013', 'custpage_field_sesion_cuatro_custevent1059'];

      var sesion4_array_valueFields = [campo_1_sesion4, campo_2_sesion4, campo_3_sesion4, campo_4_sesion4, campo_5_sesion4, campo_6_sesion4, campo_7_sesion4, campo_8_sesion4, campo_9_sesion4, campo_10_sesion4, campo_11_sesion4, campo_12_sesion4, /* campo_13_sesion4, */ campo_14_sesion4, campo_15_sesion4, campo_16_sesion4, campo_17_sesion4, campo_18_sesion4, campo_19_sesion4, campo_20_sesion4, campo_21_sesion4, campo_22_sesion4, campo_23_sesion4];

      for (var sCuatro = 0; sCuatro < sesion4_array_nameFields.length; sCuatro++) {
        if (sesion4_array_valueFields[sCuatro] != null) {
          nlapiSetFieldValue(sesion4_array_nameFields[sCuatro], sesion4_array_valueFields[sCuatro]);
        }
      }

      //ACTION: Recupera valor de campos sesion 5 y los despliega
      var sesion5_array_nameFields = ['custpage_field_sesion_cinco_custevent1023', 'custpage_field_sesion_cinco_custevent1041', 'custpage_field_sesion_cinco_custevent1032', 'custpage_field_sesion_cinco_custevent1050', 'custpage_field_sesion_cinco_custevent870', 'custpage_field_sesion_cinco_custevent879', 'custpage_field_sesion_cinco_custevent861', 'custpage_field_sesion_cinco_custevent915', 'custpage_field_sesion_cinco_custevent924', 'custpage_field_sesion_cinco_custevent933', 'custpage_field_sesion_cinco_custevent888', 'custpage_field_sesion_cinco_custevent897', /* 'custpage_field_sesion_cinco_custevent906', */ 'custpage_field_sesion_cinco_custevent942', 'custpage_field_sesion_cinco_custevent960', 'custpage_field_sesion_cinco_custevent969', 'custpage_field_sesion_cinco_custevent951', 'custpage_field_sesion_cinco_custevent978', 'custpage_field_sesion_cinco_custevent987', 'custpage_field_sesion_cinco_custevent996', 'custpage_field_sesion_cinco_custevent1005', 'custpage_field_sesion_cinco_custevent1014', 'custpage_field_sesion_cinco_custevent1060'];

      var sesion5_array_valueFields = [campo_1_sesion5, campo_2_sesion5, campo_3_sesion5, campo_4_sesion5, campo_5_sesion5, campo_6_sesion5, campo_7_sesion5, campo_8_sesion5, campo_9_sesion5, campo_10_sesion5, campo_11_sesion5, campo_12_sesion5, /* campo_13_sesion5, */ campo_14_sesion5, campo_15_sesion5, campo_16_sesion5, campo_17_sesion5, campo_18_sesion5, campo_19_sesion5, campo_20_sesion5, campo_21_sesion5, campo_22_sesion5, campo_23_sesion5];

      for (var sCinco = 0; sCinco < sesion5_array_nameFields.length; sCinco++) {
        if (sesion5_array_valueFields[sCinco] != null) {
          nlapiSetFieldValue(sesion5_array_nameFields[sCinco], sesion5_array_valueFields[sCinco]);
        }
      }

      //ACTION: Recupera valor de campos sesion 6 y los despliega
      var sesion6_array_nameFields = ['custpage_field_sesion_seis_custevent1024', 'custpage_field_sesion_seis_custevent1042', 'custpage_field_sesion_seis_custevent1033', 'custpage_field_sesion_seis_custevent1051', 'custpage_field_sesion_seis_custevent871', 'custpage_field_sesion_seis_custevent880', 'custpage_field_sesion_seis_custevent862', 'custpage_field_sesion_seis_custevent916', 'custpage_field_sesion_seis_custevent925', 'custpage_field_sesion_seis_custevent934', 'custpage_field_sesion_seis_custevent889', 'custpage_field_sesion_seis_custevent898', /* 'custpage_field_sesion_seis_custevent907', */ 'custpage_field_sesion_seis_custevent943', 'custpage_field_sesion_seis_custevent961', 'custpage_field_sesion_seis_custevent970', 'custpage_field_sesion_seis_custevent952', 'custpage_field_sesion_seis_custevent979', 'custpage_field_sesion_seis_custevent988', 'custpage_field_sesion_seis_custevent997', 'custpage_field_sesion_seis_custevent1006', 'custpage_field_sesion_seis_custevent1015', 'custpage_field_sesion_seis_custevent1061'];

      var sesion6_array_valueFields = [campo_1_sesion6, campo_2_sesion6, campo_3_sesion6, campo_4_sesion6, campo_5_sesion6, campo_6_sesion6, campo_7_sesion6, campo_8_sesion6, campo_9_sesion6, campo_10_sesion6, campo_11_sesion6, campo_12_sesion6, /* campo_13_sesion6, */ campo_14_sesion6, campo_15_sesion6, campo_16_sesion6, campo_17_sesion6, campo_18_sesion6, campo_19_sesion6, campo_20_sesion6, campo_21_sesion6, campo_22_sesion6, campo_23_sesion6];

      for (var sSeis = 0; sSeis < sesion6_array_nameFields.length; sSeis++) {
        if (sesion6_array_valueFields[sSeis] != null) {
          nlapiSetFieldValue(sesion6_array_nameFields[sSeis], sesion6_array_valueFields[sSeis]);
        }
      }

      //ACTION: Recupera valor de campos sesion 7 y los despliega
      var sesion7_array_nameFields = ['custpage_field_sesion_siete_custevent1025', 'custpage_field_sesion_siete_custevent1043', 'custpage_field_sesion_siete_custevent1034', 'custpage_field_sesion_siete_custevent1052', 'custpage_field_sesion_siete_custevent872', 'custpage_field_sesion_siete_custevent881', 'custpage_field_sesion_siete_custevent863', 'custpage_field_sesion_siete_custevent917', 'custpage_field_sesion_siete_custevent926', 'custpage_field_sesion_siete_custevent935', 'custpage_field_sesion_siete_custevent890', 'custpage_field_sesion_siete_custevent899', /* 'custpage_field_sesion_siete_custevent908', */ 'custpage_field_sesion_siete_custevent944', 'custpage_field_sesion_siete_custevent962', 'custpage_field_sesion_siete_custevent971', 'custpage_field_sesion_siete_custevent953', 'custpage_field_sesion_siete_custevent980', 'custpage_field_sesion_siete_custevent989', 'custpage_field_sesion_siete_custevent998', 'custpage_field_sesion_siete_custevent1007', 'custpage_field_sesion_siete_custevent1016', 'custpage_field_sesion_siete_custevent1062'];

      var sesion7_array_valueFields = [campo_1_sesion7, campo_2_sesion7, campo_3_sesion7, campo_4_sesion7, campo_5_sesion7, campo_6_sesion7, campo_7_sesion7, campo_8_sesion7, campo_9_sesion7, campo_10_sesion7, campo_11_sesion7, campo_12_sesion7, /* campo_13_sesion7, */ campo_14_sesion7, campo_15_sesion7, campo_16_sesion7, campo_17_sesion7, campo_18_sesion7, campo_19_sesion7, campo_20_sesion7, campo_21_sesion7, campo_22_sesion7, campo_23_sesion7];

      for (var sSiete = 0; sSiete < sesion7_array_nameFields.length; sSiete++) {
        if (sesion7_array_valueFields[sSiete] != null) {
          nlapiSetFieldValue(sesion7_array_nameFields[sSiete], sesion7_array_valueFields[sSiete]);
        }
      }

      //ACTION: Recupera valor de campos sesion 8 y los despliega
      var sesion8_array_nameFields = ['custpage_field_sesion_ocho_custevent1026', 'custpage_field_sesion_ocho_custevent1044', 'custpage_field_sesion_ocho_custevent1035', 'custpage_field_sesion_ocho_custevent1053', 'custpage_field_sesion_ocho_custevent873', 'custpage_field_sesion_ocho_custevent882', 'custpage_field_sesion_ocho_custevent864', 'custpage_field_sesion_ocho_custevent918', 'custpage_field_sesion_ocho_custevent927', 'custpage_field_sesion_ocho_custevent936', 'custpage_field_sesion_ocho_custevent891', 'custpage_field_sesion_ocho_custevent900', /* 'custpage_field_sesion_ocho_custevent909', */ 'custpage_field_sesion_ocho_custevent945', 'custpage_field_sesion_ocho_custevent963', 'custpage_field_sesion_ocho_custevent972', 'custpage_field_sesion_ocho_custevent954', 'custpage_field_sesion_ocho_custevent981', 'custpage_field_sesion_ocho_custevent990', 'custpage_field_sesion_ocho_custevent999', 'custpage_field_sesion_ocho_custevent1008', 'custpage_field_sesion_ocho_custevent1017', 'custpage_field_sesion_ocho_custevent1063'];

      var sesion8_array_valueFields = [campo_1_sesion8, campo_2_sesion8, campo_3_sesion8, campo_4_sesion8, campo_5_sesion8, campo_6_sesion8, campo_7_sesion8, campo_8_sesion8, campo_9_sesion8, campo_10_sesion8, campo_11_sesion8, campo_12_sesion8, /* campo_13_sesion8, */ campo_14_sesion8, campo_15_sesion8, campo_16_sesion8, campo_17_sesion8, campo_18_sesion8, campo_19_sesion8, campo_20_sesion8, campo_21_sesion8, campo_22_sesion8, campo_23_sesion8];

      for (var sOcho = 0; sOcho < sesion8_array_nameFields.length; sOcho++) {
        if (sesion8_array_valueFields[sOcho] != null) {
          nlapiSetFieldValue(sesion8_array_nameFields[sOcho], sesion8_array_valueFields[sOcho]);
        }
      }

      //ACTION: Recupera valor de campos sesion 9 y los despliega
      var sesion9_array_nameFields = ['custpage_field_sesion_nueve_custevent1027', 'custpage_field_sesion_nueve_custevent1045', 'custpage_field_sesion_nueve_custevent1036', 'custpage_field_sesion_nueve_custevent1054', 'custpage_field_sesion_nueve_custevent874', 'custpage_field_sesion_nueve_custevent883', 'custpage_field_sesion_nueve_custevent865', 'custpage_field_sesion_nueve_custevent919', 'custpage_field_sesion_nueve_custevent928', 'custpage_field_sesion_nueve_custevent937', 'custpage_field_sesion_nueve_custevent892', 'custpage_field_sesion_nueve_custevent901', /* 'custpage_field_sesion_nueve_custevent910', */ 'custpage_field_sesion_nueve_custevent946', 'custpage_field_sesion_nueve_custevent964', 'custpage_field_sesion_nueve_custevent973', 'custpage_field_sesion_nueve_custevent955', 'custpage_field_sesion_nueve_custevent982', 'custpage_field_sesion_nueve_custevent991', 'custpage_field_sesion_nueve_custevent1000', 'custpage_field_sesion_nueve_custevent1009', 'custpage_field_sesion_nueve_custevent1018', 'custpage_field_sesion_nueve_custevent1064'];

      var sesion9_array_valueFields = [campo_1_sesion9, campo_2_sesion9, campo_3_sesion9, campo_4_sesion9, campo_5_sesion9, campo_6_sesion9, campo_7_sesion9, campo_8_sesion9, campo_9_sesion9, campo_10_sesion9, campo_11_sesion9, campo_12_sesion9, /* campo_13_sesion9, */ campo_14_sesion9, campo_15_sesion9, campo_16_sesion9, campo_17_sesion9, campo_18_sesion9, campo_19_sesion9, campo_20_sesion9, campo_21_sesion9, campo_22_sesion9, campo_23_sesion9];

      for (var sNueve = 0; sNueve < sesion9_array_nameFields.length; sNueve++) {
        if (sesion9_array_valueFields[sNueve] != null) {
          nlapiSetFieldValue(sesion9_array_nameFields[sNueve], sesion9_array_valueFields[sNueve]);
        }
      }

      //ACTION: Recupera valor de campos sesion 10 y los despliega
      var sesion10_array_nameFields = ['custpage_field_sesion_diez_custevent1028', 'custpage_field_sesion_diez_custevent1046', 'custpage_field_sesion_diez_custevent1037', 'custpage_field_sesion_diez_custevent1055', 'custpage_field_sesion_diez_custevent875', 'custpage_field_sesion_diez_custevent884', 'custpage_field_sesion_diez_custevent866', 'custpage_field_sesion_diez_custevent920', 'custpage_field_sesion_diez_custevent929', 'custpage_field_sesion_diez_custevent938', 'custpage_field_sesion_diez_custevent893', 'custpage_field_sesion_diez_custevent902', /* 'custpage_field_sesion_diez_custevent911', */ 'custpage_field_sesion_diez_custevent947', 'custpage_field_sesion_diez_custevent965', 'custpage_field_sesion_diez_custevent974', 'custpage_field_sesion_diez_custevent956', 'custpage_field_sesion_diez_custevent983', 'custpage_field_sesion_diez_custevent992', 'custpage_field_sesion_diez_custevent1001', 'custpage_field_sesion_diez_custevent1010', 'custpage_field_sesion_diez_custevent1019', 'custpage_field_sesion_diez_custevent1065'];

      var sesion10_array_valueFields = [campo_1_sesion10, campo_2_sesion10, campo_3_sesion10, campo_4_sesion10, campo_5_sesion10, campo_6_sesion10, campo_7_sesion10, campo_8_sesion10, campo_9_sesion10, campo_10_sesion10, campo_11_sesion10, campo_12_sesion10, /* campo_13_sesion10, */ campo_14_sesion10, campo_15_sesion10, campo_16_sesion10, campo_17_sesion10, campo_18_sesion10, campo_19_sesion10, campo_20_sesion10, campo_21_sesion10, campo_22_sesion10, campo_23_sesion10];

      for (var sDiez = 0; sDiez < sesion10_array_nameFields.length; sDiez++) {
        if (sesion10_array_valueFields[sDiez] != null) {
          nlapiSetFieldValue(sesion10_array_nameFields[sDiez], sesion10_array_valueFields[sDiez]);
        }
      }

      //NOTE: Arreglo de los campos personalizados de la sesion 1
      var array_blockFields_sesion1 = ['custpage_field_sesion_uno_custevent648', 'custpage_field_sesion_uno_custevent649', 'custpage_field_sesion_uno_custevent650', 'custpage_field_sesion_uno_custevent651', 'custpage_field_sesion_uno_custevent652', 'custpage_field_sesion_uno_custevent653', 'custpage_field_sesion_uno_custevent654', 'custpage_field_sesion_uno_custevent506', 'custpage_field_sesion_uno_custevent507', 'custpage_field_sesion_uno_custevent541', 'custpage_field_sesion_uno_custevent636', 'custpage_field_sesion_uno_custevent637', /* 'custpage_field_sesion_uno_custevent638', */ 'custpage_field_sesion_uno_custevent639', 'custpage_field_sesion_uno_custevent640', 'custpage_field_sesion_uno_custevent641', 'custpage_field_sesion_uno_custevent642', 'custpage_field_sesion_uno_custevent643', 'custpage_field_sesion_uno_custevent644', 'custpage_field_sesion_uno_custevent645', 'custpage_field_sesion_uno_custevent646', 'custpage_field_sesion_uno_custevent647', 'custpage_field_sesion_uno_custevent1056'];
      //NOTE: Arreglo de los campos personalizados de la sesion 2
      var array_blockFields_sesion2 = ['custpage_field_sesion_dos_custevent1020', 'custpage_field_sesion_dos_custevent1038', 'custpage_field_sesion_dos_custevent1029', 'custpage_field_sesion_dos_custevent1047', 'custpage_field_sesion_dos_custevent867', 'custpage_field_sesion_dos_custevent876', 'custpage_field_sesion_dos_custevent858', 'custpage_field_sesion_dos_custevent912', 'custpage_field_sesion_dos_custevent921', 'custpage_field_sesion_dos_custevent930', 'custpage_field_sesion_dos_custevent885', 'custpage_field_sesion_dos_custevent894', /* 'custpage_field_sesion_dos_custevent903', */ 'custpage_field_sesion_dos_custevent939', 'custpage_field_sesion_dos_custevent957', 'custpage_field_sesion_dos_custevent966', 'custpage_field_sesion_dos_custevent948', 'custpage_field_sesion_dos_custevent975', 'custpage_field_sesion_dos_custevent984', 'custpage_field_sesion_dos_custevent993', 'custpage_field_sesion_dos_custevent1002', 'custpage_field_sesion_dos_custevent1011', 'custpage_field_sesion_dos_custevent1057'];
      //NOTE: Arreglo de los campos personalizados de la sesion 3
      var array_blockFields_sesion3 = ['custpage_field_sesion_tres_custevent1021', 'custpage_field_sesion_tres_custevent1039', 'custpage_field_sesion_tres_custevent1030', 'custpage_field_sesion_tres_custevent1048', 'custpage_field_sesion_tres_custevent868', 'custpage_field_sesion_tres_custevent877', 'custpage_field_sesion_tres_custevent859', 'custpage_field_sesion_tres_custevent913', 'custpage_field_sesion_tres_custevent922', 'custpage_field_sesion_tres_custevent931', 'custpage_field_sesion_tres_custevent886', 'custpage_field_sesion_tres_custevent895', /* 'custpage_field_sesion_tres_custevent904', */ 'custpage_field_sesion_tres_custevent940', 'custpage_field_sesion_tres_custevent958', 'custpage_field_sesion_tres_custevent967', 'custpage_field_sesion_tres_custevent949', 'custpage_field_sesion_tres_custevent976', 'custpage_field_sesion_tres_custevent985', 'custpage_field_sesion_tres_custevent994', 'custpage_field_sesion_tres_custevent1003', 'custpage_field_sesion_tres_custevent1012', 'custpage_field_sesion_tres_custevent1058'];
      //NOTE: Arreglo de los campos personalizados de la sesion 4
      var array_blockFields_sesion4 = ['custpage_field_sesion_cuatro_custevent1022', 'custpage_field_sesion_cuatro_custevent1040', 'custpage_field_sesion_cuatro_custevent1031', 'custpage_field_sesion_cuatro_custevent1049', 'custpage_field_sesion_cuatro_custevent869', 'custpage_field_sesion_cuatro_custevent878', 'custpage_field_sesion_cuatro_custevent860', 'custpage_field_sesion_cuatro_custevent914', 'custpage_field_sesion_cuatro_custevent923', 'custpage_field_sesion_cuatro_custevent932', 'custpage_field_sesion_cuatro_custevent887', 'custpage_field_sesion_cuatro_custevent896', /* 'custpage_field_sesion_cuatro_custevent905', */ 'custpage_field_sesion_cuatro_custevent941', 'custpage_field_sesion_cuatro_custevent959', 'custpage_field_sesion_cuatro_custevent968', 'custpage_field_sesion_cuatro_custevent950', 'custpage_field_sesion_cuatro_custevent977', 'custpage_field_sesion_cuatro_custevent986', 'custpage_field_sesion_cuatro_custevent995', 'custpage_field_sesion_cuatro_custevent1004', 'custpage_field_sesion_cuatro_custevent1013', 'custpage_field_sesion_cuatro_custevent1059'];
      //NOTE: Arreglo de los campos personalizados de la sesion 5
      var array_blockFields_sesion5 = ['custpage_field_sesion_cinco_custevent1023', 'custpage_field_sesion_cinco_custevent1041', 'custpage_field_sesion_cinco_custevent1032', 'custpage_field_sesion_cinco_custevent1050', 'custpage_field_sesion_cinco_custevent870', 'custpage_field_sesion_cinco_custevent879', 'custpage_field_sesion_cinco_custevent861', 'custpage_field_sesion_cinco_custevent915', 'custpage_field_sesion_cinco_custevent924', 'custpage_field_sesion_cinco_custevent933', 'custpage_field_sesion_cinco_custevent888', 'custpage_field_sesion_cinco_custevent897', /* 'custpage_field_sesion_cinco_custevent906', */ 'custpage_field_sesion_cinco_custevent942', 'custpage_field_sesion_cinco_custevent960', 'custpage_field_sesion_cinco_custevent969', 'custpage_field_sesion_cinco_custevent951', 'custpage_field_sesion_cinco_custevent978', 'custpage_field_sesion_cinco_custevent987', 'custpage_field_sesion_cinco_custevent996', 'custpage_field_sesion_cinco_custevent1005', 'custpage_field_sesion_cinco_custevent1014', 'custpage_field_sesion_cinco_custevent1060'];
      //NOTE: Arreglo de los campos personalizados de la sesion 6
      var array_blockFields_sesion6 = ['custpage_field_sesion_seis_custevent1024', 'custpage_field_sesion_seis_custevent1042', 'custpage_field_sesion_seis_custevent1033', 'custpage_field_sesion_seis_custevent1051', 'custpage_field_sesion_seis_custevent871', 'custpage_field_sesion_seis_custevent880', 'custpage_field_sesion_seis_custevent862', 'custpage_field_sesion_seis_custevent916', 'custpage_field_sesion_seis_custevent925', 'custpage_field_sesion_seis_custevent934', 'custpage_field_sesion_seis_custevent889', 'custpage_field_sesion_seis_custevent898', /* 'custpage_field_sesion_seis_custevent907', */ 'custpage_field_sesion_seis_custevent943', 'custpage_field_sesion_seis_custevent961', 'custpage_field_sesion_seis_custevent970', 'custpage_field_sesion_seis_custevent952', 'custpage_field_sesion_seis_custevent979', 'custpage_field_sesion_seis_custevent988', 'custpage_field_sesion_seis_custevent997', 'custpage_field_sesion_seis_custevent1006', 'custpage_field_sesion_seis_custevent1015', 'custpage_field_sesion_seis_custevent1061'];
      //NOTE: Arreglo de los campos personalizados de la sesion 7
      var array_blockFields_sesion7 = ['custpage_field_sesion_siete_custevent1025', 'custpage_field_sesion_siete_custevent1043', 'custpage_field_sesion_siete_custevent1034', 'custpage_field_sesion_siete_custevent1052', 'custpage_field_sesion_siete_custevent872', 'custpage_field_sesion_siete_custevent881', 'custpage_field_sesion_siete_custevent863', 'custpage_field_sesion_siete_custevent917', 'custpage_field_sesion_siete_custevent926', 'custpage_field_sesion_siete_custevent935', 'custpage_field_sesion_siete_custevent890', 'custpage_field_sesion_siete_custevent899', /* 'custpage_field_sesion_siete_custevent908', */ 'custpage_field_sesion_siete_custevent944', 'custpage_field_sesion_siete_custevent962', 'custpage_field_sesion_siete_custevent971', 'custpage_field_sesion_siete_custevent953', 'custpage_field_sesion_siete_custevent980', 'custpage_field_sesion_siete_custevent989', 'custpage_field_sesion_siete_custevent998', 'custpage_field_sesion_siete_custevent1007', 'custpage_field_sesion_siete_custevent1016', 'custpage_field_sesion_siete_custevent1062'];
      //NOTE: Arreglo de los campos personalizados de la sesion 8
      var array_blockFields_sesion8 = ['custpage_field_sesion_ocho_custevent1026', 'custpage_field_sesion_ocho_custevent1044', 'custpage_field_sesion_ocho_custevent1035', 'custpage_field_sesion_ocho_custevent1053', 'custpage_field_sesion_ocho_custevent873', 'custpage_field_sesion_ocho_custevent882', 'custpage_field_sesion_ocho_custevent864', 'custpage_field_sesion_ocho_custevent918', 'custpage_field_sesion_ocho_custevent927', 'custpage_field_sesion_ocho_custevent936', 'custpage_field_sesion_ocho_custevent891', 'custpage_field_sesion_ocho_custevent900', /* 'custpage_field_sesion_ocho_custevent909', */ 'custpage_field_sesion_ocho_custevent945', 'custpage_field_sesion_ocho_custevent963', 'custpage_field_sesion_ocho_custevent972', 'custpage_field_sesion_ocho_custevent954', 'custpage_field_sesion_ocho_custevent981', 'custpage_field_sesion_ocho_custevent990', 'custpage_field_sesion_ocho_custevent999', 'custpage_field_sesion_ocho_custevent1008', 'custpage_field_sesion_ocho_custevent1017', 'custpage_field_sesion_ocho_custevent1063'];
      //NOTE: Arreglo de los campos personalizados de la sesion 9
      var array_blockFields_sesion9 = ['custpage_field_sesion_nueve_custevent1027', 'custpage_field_sesion_nueve_custevent1045', 'custpage_field_sesion_nueve_custevent1036', 'custpage_field_sesion_nueve_custevent1054', 'custpage_field_sesion_nueve_custevent874', 'custpage_field_sesion_nueve_custevent883', 'custpage_field_sesion_nueve_custevent865', 'custpage_field_sesion_nueve_custevent919', 'custpage_field_sesion_nueve_custevent928', 'custpage_field_sesion_nueve_custevent937', 'custpage_field_sesion_nueve_custevent892', 'custpage_field_sesion_nueve_custevent901', /* 'custpage_field_sesion_nueve_custevent910', */ 'custpage_field_sesion_nueve_custevent946', 'custpage_field_sesion_nueve_custevent964', 'custpage_field_sesion_nueve_custevent973', 'custpage_field_sesion_nueve_custevent955', 'custpage_field_sesion_nueve_custevent982', 'custpage_field_sesion_nueve_custevent991', 'custpage_field_sesion_nueve_custevent1000', 'custpage_field_sesion_nueve_custevent1009', 'custpage_field_sesion_nueve_custevent1018', 'custpage_field_sesion_nueve_custevent1064'];
      //NOTE: Arreglo de los campos personalizados de la sesion 10
      var array_blockFields_sesion10 = ['custpage_field_sesion_diez_custevent1028', 'custpage_field_sesion_diez_custevent1046', 'custpage_field_sesion_diez_custevent1037', 'custpage_field_sesion_diez_custevent1055', 'custpage_field_sesion_diez_custevent875', 'custpage_field_sesion_diez_custevent884', 'custpage_field_sesion_diez_custevent866', 'custpage_field_sesion_diez_custevent920', 'custpage_field_sesion_diez_custevent929', 'custpage_field_sesion_diez_custevent938', 'custpage_field_sesion_diez_custevent893', 'custpage_field_sesion_diez_custevent902', /* 'custpage_field_sesion_diez_custevent911', */ 'custpage_field_sesion_diez_custevent947', 'custpage_field_sesion_diez_custevent965', 'custpage_field_sesion_diez_custevent974', 'custpage_field_sesion_diez_custevent956', 'custpage_field_sesion_diez_custevent983', 'custpage_field_sesion_diez_custevent992', 'custpage_field_sesion_diez_custevent1001', 'custpage_field_sesion_diez_custevent1010', 'custpage_field_sesion_diez_custevent1019', 'custpage_field_sesion_diez_custevent1065'];
      //NOTE: Arreglo de los campos que contienen la fecha de la sesion
      array_datesLimit_values = ['custevent1056', 'custevent1057', 'custevent1058', 'custevent1059', 'custevent1060', 'custevent1061', 'custevent1062', 'custevent1063', 'custevent1064', 'custevent1065'];
      //NOTE: Arreglo de los arreglos de los campos personalizados por conjunto de sesion
      array_blockFields_sessions = [array_blockFields_sesion1, array_blockFields_sesion2, array_blockFields_sesion3, array_blockFields_sesion4, array_blockFields_sesion5, array_blockFields_sesion6, array_blockFields_sesion7, array_blockFields_sesion8, array_blockFields_sesion9, array_blockFields_sesion10];

      //ACTION: configura dos arreglos con los valores de posicion dentro del arrelo 'array_blockFields_sessions' que deberan ser completamente bloqueados o parcialmente bloqueados
      for (var i in array_datesLimit_values) {
        dateSessions = nlapiGetFieldValue(array_datesLimit_values[i]) || 'null';
        if (dateSessions != 'null') {
          if (blockFieldsTroughtDay(dateSessions) === 'true') {
            tempSessions_closed.push(i);
          } else {
            tempSessions_semiClosed.push(i);
          }
        } else {
          tempSessions_semiClosed.push(i);
        }
      }
      //ACTION: Configura el bloqued de campos dentro de los arrelgos de campos de la o las sesiones que seran completamente bloqueados
      for (var j in tempSessions_closed) {
        array_elementoBlockear_closed.push(array_blockFields_sessions[tempSessions_closed[j]]);
        for (var a in array_blockClosed = array_elementoBlockear_closed[j]) {
          //nlapiLogExecution('DEBUG', 'Array Closed', array_blockClocsed[a]);
          //nlapiLogExecution('DEBUG', 'Array Closed Values', nlapiGetFieldValue(array_blockClosed[a]));
          //nlapiLogExecution('DEBUG', 'Array Closed', array_blockClosed[a] + ': ' + elementoBlockear_closed);
          elementoBlockear_closed = nlapiGetField(array_blockClosed[a]);
          if (elementoBlockear_closed != null) {
            elementoBlockear_closed.setDisplayType('inline');
          }
        }
      }
      //ACTION: Configura el bloqued de campos dentro de los arrelgos de campos de la o las sesiones que seran bloqueados parcialmente
      for (var k in tempSessions_semiClosed) {
        array_elementoBlockear_semiClosed.push(array_blockFields_sessions[tempSessions_semiClosed[k]]);
        for (var b in array_blockSemiClosed = array_elementoBlockear_semiClosed[k]) {
          //nlapiLogExecution('DEBUG', 'Array SemiClosed', array_blockSemiClosed[b]);
          //nlapiLogExecution('DEBUG', 'Array SemiClosed values', nlapiGetFieldValue(array_blockSemiClosed[b]));
          elementoBlockear_semiClosed_field = nlapiGetField(array_blockSemiClosed[b]);
          if (elementoBlockear_semiClosed_field != null) {
            elementoBlockear_semiClosed = nlapiGetFieldValue(array_blockSemiClosed[b]) || null;
            if (elementoBlockear_semiClosed != null) {
              elementoBlockear_semiClosed_field.setDisplayType('inline');
            }
          }
        }
      }
    }

    if (formulario == 151) {
      //nlapiLogExecution('DEBUG', 'Formulario', 'Id Form Edit and View: ' + idFormEditAndView + ' Id Form Create: ' + idFomrCreate);
      //ACTION: Creacion de ficha
      var tabhair = form.addTab('custpage_complementarios_hair', 'Procedimiento y Aplicación');
      form.insertTab(tabhair, 'interactions');

      //ACTION: Creacion de Subfichas
      complementarios1 = form.addSubTab('custpage_complementarios_uno', 'Sesión 1', 'custpage_complementarios_hair');
      complementarios2 = form.addSubTab('custpage_complementarios_dos', 'Sesión 2', 'custpage_complementarios_hair');
      complementarios3 = form.addSubTab('custpage_complementarios_tres', 'Sesión 3', 'custpage_complementarios_hair');
      complementarios4 = form.addSubTab('custpage_complementarios_cuatro', 'Sesión 4', 'custpage_complementarios_hair');
      complementarios5 = form.addSubTab('custpage_complementarios_cinco', 'Sesión 5', 'custpage_complementarios_hair');
      complementarios6 = form.addSubTab('custpage_complementarios_seis', 'Sesión 6', 'custpage_complementarios_hair');
      complementarios7 = form.addSubTab('custpage_complementarios_siete', 'Sesión 7', 'custpage_complementarios_hair');
      complementarios8 = form.addSubTab('custpage_complementarios_ocho', 'Sesión 8', 'custpage_complementarios_hair');
      complementarios9 = form.addSubTab('custpage_complementarios_nueve', 'Sesión 9', 'custpage_complementarios_hair');
      complementarios10 = form.addSubTab('custpage_complementarios_diez', 'Sesión 10', 'custpage_complementarios_hair');

      //VARIABLES: Obtencion de Etiquetas de campos Base
      //NOTE: obtención de etiquetas de campos base
      etiqueta_campo_1 = nlapiGetField('custevent1079').getLabel();
      etiqueta_campo_2 = nlapiGetField('custevent1056').getLabel();
      etiqueta_campo_3 = nlapiGetField('custevent1080').getLabel();
      etiqueta_campo_4 = nlapiGetField('custevent1090').getLabel();
      etiqueta_campo_5 = nlapiGetField('custevent1100').getLabel();
      etiqueta_campo_6 = nlapiGetField('custevent1110').getLabel();
      etiqueta_campo_7 = nlapiGetField('custevent1120').getLabel();
      etiqueta_campo_8 = nlapiGetField('custevent1130').getLabel();
      etiqueta_campo_9 = nlapiGetField('custevent1140').getLabel();
      etiqueta_campo_10 = nlapiGetField('custevent1150').getLabel();
      etiqueta_campo_11 = nlapiGetField('custevent1160').getLabel();
      etiqueta_campo_12 = nlapiGetField('custevent1170').getLabel();
      etiqueta_campo_13 = nlapiGetField('custevent650').getLabel();
      etiqueta_campo_14 = nlapiGetField('custevent649').getLabel();
      etiqueta_campo_15 = nlapiGetField('custevent651').getLabel();
      etiqueta_campo_16 = nlapiGetField('custevent1069').getLabel();

      //VARIABLES: Obtencion de Etiquetas de campos Base
      //NOTE: obtención de etiquetas de campos base
      field_campo_1 = nlapiGetField('custevent1079');
      field_campo_2 = nlapiGetField('custevent1056');
      field_campo_3 = nlapiGetField('custevent1080');
      field_campo_4 = nlapiGetField('custevent1090');
      field_campo_5 = nlapiGetField('custevent1100');
      field_campo_6 = nlapiGetField('custevent1110');
      field_campo_7 = nlapiGetField('custevent1120');
      field_campo_8 = nlapiGetField('custevent1130');
      field_campo_9 = nlapiGetField('custevent1140');
      field_campo_10 = nlapiGetField('custevent1150');
      field_campo_11 = nlapiGetField('custevent1160');
      field_campo_12 = nlapiGetField('custevent1170');
      field_campo_13 = nlapiGetField('custevent650');
      field_campo_14 = nlapiGetField('custevent649');
      field_campo_15 = nlapiGetField('custevent651');
      field_campo_16 = nlapiGetField('custevent1069');

      //VARIABLES: Obtencion de valores campos BackEnd
      //NOTE: Valores complementarios 1
      var campo_1_complementarios1 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios1 = nlapiGetFieldValue('custevent1056') || null;
      var campo_3_complementarios1 = nlapiGetFieldValue('custevent1080') || null;
      var campo_4_complementarios1 = nlapiGetFieldValue('custevent1090') || null;
      var campo_5_complementarios1 = nlapiGetFieldValues('custevent1100') || null;
      var campo_6_complementarios1 = nlapiGetFieldValues('custevent1110') || null;
      var campo_7_complementarios1 = nlapiGetFieldValues('custevent1120') || null;
      var campo_8_complementarios1 = nlapiGetFieldValue('custevent1130') || null;
      var campo_9_complementarios1 = nlapiGetFieldValue('custevent1140') || null;
      var campo_10_complementarios1 = nlapiGetFieldValue('custevent1150') || null;
      var campo_11_complementarios1 = nlapiGetFieldValues('custevent1160') || null;
      var campo_12_complementarios1 = nlapiGetFieldValues('custevent1170') || null;
      var campo_13_complementarios1 = nlapiGetFieldValues('custevent650') || null;
      var campo_14_complementarios1 = nlapiGetFieldValue('custevent649') || null;
      var campo_15_complementarios1 = nlapiGetFieldValue('custevent651') || null;
      var campo_16_complementarios1 = nlapiGetFieldValue('custevent1069') || null;
      //NOTE: Valores complementarios 2
      var campo_1_complementarios2 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios2 = nlapiGetFieldValue('custevent1057') || null;
      var campo_3_complementarios2 = nlapiGetFieldValue('custevent1081') || null;
      var campo_4_complementarios2 = nlapiGetFieldValue('custevent1091') || null;
      var campo_5_complementarios2 = nlapiGetFieldValues('custevent1101') || null;
      var campo_6_complementarios2 = nlapiGetFieldValues('custevent1111') || null;
      var campo_7_complementarios2 = nlapiGetFieldValues('custevent1121') || null;
      var campo_8_complementarios2 = nlapiGetFieldValue('custevent1131') || null;
      var campo_9_complementarios2 = nlapiGetFieldValue('custevent1141') || null;
      var campo_10_complementarios2 = nlapiGetFieldValue('custevent1151') || null;
      var campo_11_complementarios2 = nlapiGetFieldValues('custevent1161') || null;
      var campo_12_complementarios2 = nlapiGetFieldValues('custevent1171') || null;
      var campo_13_complementarios2 = nlapiGetFieldValues('custevent1029') || null;
      var campo_14_complementarios2 = nlapiGetFieldValue('custevent1038') || null;
      var campo_15_complementarios2 = nlapiGetFieldValue('custevent1047') || null;
      var campo_16_complementarios2 = nlapiGetFieldValue('custevent1070') || null;
      //NOTE: Valores complementarios 3
      var campo_1_complementarios3 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios3 = nlapiGetFieldValue('custevent1058') || null;
      var campo_3_complementarios3 = nlapiGetFieldValue('custevent1082') || null;
      var campo_4_complementarios3 = nlapiGetFieldValue('custevent1092') || null;
      var campo_5_complementarios3 = nlapiGetFieldValues('custevent1102') || null;
      var campo_6_complementarios3 = nlapiGetFieldValues('custevent1112') || null;
      var campo_7_complementarios3 = nlapiGetFieldValues('custevent1122') || null;
      var campo_8_complementarios3 = nlapiGetFieldValue('custevent1132') || null;
      var campo_9_complementarios3 = nlapiGetFieldValue('custevent1142') || null;
      var campo_10_complementarios3 = nlapiGetFieldValue('custevent1152') || null;
      var campo_11_complementarios3 = nlapiGetFieldValues('custevent1162') || null;
      var campo_12_complementarios3 = nlapiGetFieldValues('custevent1172') || null;
      var campo_13_complementarios3 = nlapiGetFieldValues('custevent1030') || null;
      var campo_14_complementarios3 = nlapiGetFieldValue('custevent1039') || null;
      var campo_15_complementarios3 = nlapiGetFieldValue('custevent1048') || null;
      var campo_16_complementarios3 = nlapiGetFieldValue('custevent1071') || null;
      //NOTE: Valores complementarios 4
      var campo_1_complementarios4 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios4 = nlapiGetFieldValue('custevent1059') || null;
      var campo_3_complementarios4 = nlapiGetFieldValue('custevent1083') || null;
      var campo_4_complementarios4 = nlapiGetFieldValue('custevent1093') || null;
      var campo_5_complementarios4 = nlapiGetFieldValues('custevent1103') || null;
      var campo_6_complementarios4 = nlapiGetFieldValues('custevent1113') || null;
      var campo_7_complementarios4 = nlapiGetFieldValues('custevent1123') || null;
      var campo_8_complementarios4 = nlapiGetFieldValue('custevent1133') || null;
      var campo_9_complementarios4 = nlapiGetFieldValue('custevent1143') || null;
      var campo_10_complementarios4 = nlapiGetFieldValue('custevent1153') || null;
      var campo_11_complementarios4 = nlapiGetFieldValues('custevent1163') || null;
      var campo_12_complementarios4 = nlapiGetFieldValues('custevent1173') || null;
      var campo_13_complementarios4 = nlapiGetFieldValues('custevent1031') || null;
      var campo_14_complementarios4 = nlapiGetFieldValue('custevent1040') || null;
      var campo_15_complementarios4 = nlapiGetFieldValue('custevent1049') || null;
      var campo_16_complementarios4 = nlapiGetFieldValue('custevent1072') || null;
      //NOTE: Valores complementarios 5
      var campo_1_complementarios5 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios5 = nlapiGetFieldValue('custevent1060') || null;
      var campo_3_complementarios5 = nlapiGetFieldValue('custevent1084') || null;
      var campo_4_complementarios5 = nlapiGetFieldValue('custevent1094') || null;
      var campo_5_complementarios5 = nlapiGetFieldValues('custevent1104') || null;
      var campo_6_complementarios5 = nlapiGetFieldValues('custevent1114') || null;
      var campo_7_complementarios5 = nlapiGetFieldValues('custevent1124') || null;
      var campo_8_complementarios5 = nlapiGetFieldValue('custevent1134') || null;
      var campo_9_complementarios5 = nlapiGetFieldValue('custevent1144') || null;
      var campo_10_complementarios5 = nlapiGetFieldValue('custevent1154') || null;
      var campo_11_complementarios5 = nlapiGetFieldValues('custevent1164') || null;
      var campo_12_complementarios5 = nlapiGetFieldValues('custevent1174') || null;
      var campo_13_complementarios5 = nlapiGetFieldValues('custevent1032') || null;
      var campo_14_complementarios5 = nlapiGetFieldValue('custevent1041') || null;
      var campo_15_complementarios5 = nlapiGetFieldValue('custevent1050') || null;
      var campo_16_complementarios5 = nlapiGetFieldValue('custevent1073') || null;
      //NOTE: Valores complementarios 6
      var campo_1_complementarios6 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios6 = nlapiGetFieldValue('custevent1061') || null;
      var campo_3_complementarios6 = nlapiGetFieldValue('custevent1085') || null;
      var campo_4_complementarios6 = nlapiGetFieldValue('custevent1095') || null;
      var campo_5_complementarios6 = nlapiGetFieldValues('custevent1105') || null;
      var campo_6_complementarios6 = nlapiGetFieldValues('custevent1115') || null;
      var campo_7_complementarios6 = nlapiGetFieldValues('custevent1125') || null;
      var campo_8_complementarios6 = nlapiGetFieldValue('custevent1135') || null;
      var campo_9_complementarios6 = nlapiGetFieldValue('custevent1145') || null;
      var campo_10_complementarios6 = nlapiGetFieldValue('custevent1155') || null;
      var campo_11_complementarios6 = nlapiGetFieldValues('custevent1165') || null;
      var campo_12_complementarios6 = nlapiGetFieldValues('custevent1175') || null;
      var campo_13_complementarios6 = nlapiGetFieldValues('custevent1033') || null;
      var campo_14_complementarios6 = nlapiGetFieldValue('custevent1042') || null;
      var campo_15_complementarios6 = nlapiGetFieldValue('custevent1051') || null;
      var campo_16_complementarios6 = nlapiGetFieldValue('custevent1074') || null;
      //NOTE: Valores complementarios 7
      var campo_1_complementarios7 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios7 = nlapiGetFieldValue('custevent1062') || null;
      var campo_3_complementarios7 = nlapiGetFieldValue('custevent1086') || null;
      var campo_4_complementarios7 = nlapiGetFieldValue('custevent1096') || null;
      var campo_5_complementarios7 = nlapiGetFieldValues('custevent1106') || null;
      var campo_6_complementarios7 = nlapiGetFieldValues('custevent1116') || null;
      var campo_7_complementarios7 = nlapiGetFieldValues('custevent1126') || null;
      var campo_8_complementarios7 = nlapiGetFieldValue('custevent1136') || null;
      var campo_9_complementarios7 = nlapiGetFieldValue('custevent1146') || null;
      var campo_10_complementarios7 = nlapiGetFieldValue('custevent1156') || null;
      var campo_11_complementarios7 = nlapiGetFieldValues('custevent1166') || null;
      var campo_12_complementarios7 = nlapiGetFieldValues('custevent1176') || null;
      var campo_13_complementarios7 = nlapiGetFieldValues('custevent1034') || null;
      var campo_14_complementarios7 = nlapiGetFieldValue('custevent1043') || null;
      var campo_15_complementarios7 = nlapiGetFieldValue('custevent1052') || null;
      var campo_16_complementarios7 = nlapiGetFieldValue('custevent1075') || null;
      //NOTE: Valores complementarios 8
      var campo_1_complementarios8 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios8 = nlapiGetFieldValue('custevent1063') || null;
      var campo_3_complementarios8 = nlapiGetFieldValue('custevent1087') || null;
      var campo_4_complementarios8 = nlapiGetFieldValue('custevent1097') || null;
      var campo_5_complementarios8 = nlapiGetFieldValues('custevent1107') || null;
      var campo_6_complementarios8 = nlapiGetFieldValues('custevent1117') || null;
      var campo_7_complementarios8 = nlapiGetFieldValues('custevent1127') || null;
      var campo_8_complementarios8 = nlapiGetFieldValue('custevent1137') || null;
      var campo_9_complementarios8 = nlapiGetFieldValue('custevent1147') || null;
      var campo_10_complementarios8 = nlapiGetFieldValue('custevent1157') || null;
      var campo_11_complementarios8 = nlapiGetFieldValues('custevent1167') || null;
      var campo_12_complementarios8 = nlapiGetFieldValues('custevent1177') || null;
      var campo_13_complementarios8 = nlapiGetFieldValues('custevent1035') || null;
      var campo_14_complementarios8 = nlapiGetFieldValue('custevent1044') || null;
      var campo_15_complementarios8 = nlapiGetFieldValue('custevent1053') || null;
      var campo_16_complementarios8 = nlapiGetFieldValue('custevent1076') || null;
      //NOTE: Valores complementarios 9
      var campo_1_complementarios9 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios9 = nlapiGetFieldValue('custevent1064') || null;
      var campo_3_complementarios9 = nlapiGetFieldValue('custevent1088') || null;
      var campo_4_complementarios9 = nlapiGetFieldValue('custevent1098') || null;
      var campo_5_complementarios9 = nlapiGetFieldValues('custevent1108') || null;
      var campo_6_complementarios9 = nlapiGetFieldValues('custevent1118') || null;
      var campo_7_complementarios9 = nlapiGetFieldValues('custevent1128') || null;
      var campo_8_complementarios9 = nlapiGetFieldValue('custevent1138') || null;
      var campo_9_complementarios9 = nlapiGetFieldValue('custevent1148') || null;
      var campo_10_complementarios9 = nlapiGetFieldValue('custevent1158') || null;
      var campo_11_complementarios9 = nlapiGetFieldValues('custevent1168') || null;
      var campo_12_complementarios9 = nlapiGetFieldValues('custevent1178') || null;
      var campo_13_complementarios9 = nlapiGetFieldValues('custevent1036') || null;
      var campo_14_complementarios9 = nlapiGetFieldValue('custevent1045') || null;
      var campo_15_complementarios9 = nlapiGetFieldValue('custevent1054') || null;
      var campo_16_complementarios9 = nlapiGetFieldValue('custevent1077') || null;
      //NOTE: Valores complementarios 10
      var campo_1_complementarios10 = nlapiGetFieldValue('custevent1079') || null;
      var campo_2_complementarios10 = nlapiGetFieldValue('custevent1065') || null;
      var campo_3_complementarios10 = nlapiGetFieldValue('custevent1089') || null;
      var campo_4_complementarios10 = nlapiGetFieldValue('custevent1099') || null;
      var campo_5_complementarios10 = nlapiGetFieldValues('custevent1109') || null;
      var campo_6_complementarios10 = nlapiGetFieldValues('custevent1119') || null;
      var campo_7_complementarios10 = nlapiGetFieldValues('custevent1129') || null;
      var campo_8_complementarios10 = nlapiGetFieldValue('custevent1139') || null;
      var campo_9_complementarios10 = nlapiGetFieldValue('custevent1149') || null;
      var campo_10_complementarios10 = nlapiGetFieldValue('custevent1159') || null;
      var campo_11_complementarios10 = nlapiGetFieldValues('custevent1169') || null;
      var campo_12_complementarios10 = nlapiGetFieldValues('custevent1179') || null;
      var campo_13_complementarios10 = nlapiGetFieldValues('custevent1037') || null;
      var campo_14_complementarios10 = nlapiGetFieldValue('custevent1046') || null;
      var campo_15_complementarios10 = nlapiGetFieldValue('custevent1055') || null;
      var campo_16_complementarios10 = nlapiGetFieldValue('custevent1078') || null;

      if (type == 'view') {
        var tabSignatures = form.addTab('custpage_sessiones_signatures', 'Firmas');
        form.insertTab(tabSignatures, 'interactions');

        //NOTE: get labels from signatures fields
        label_signature_1 = nlapiGetField('custevent201').getLabel();
        label_signature_2 = nlapiGetField('custevent486').getLabel();
        label_signature_3 = nlapiGetField('custevent513').getLabel();
        label_signature_4 = nlapiGetField('custevent514').getLabel();
        //NOTE: Valores firmas
        var field_firma1 = nlapiGetFieldValue('custevent201') || null;
        var field_firma2 = nlapiGetFieldValue('custevent486') || null;
        var field_firma3 = nlapiGetFieldValue('custevent513') || null;
        var field_firma4 = nlapiGetFieldValue('custevent514') || null;

        //ACTION: Creacion de Campos personalizados
        //NOTE: Field Signatures
        form.addField('custpage_field_signature_uno', 'url', label_signature_1, null, 'custpage_sessiones_signatures');
        form.addField('custpage_field_signature_dos', 'url', label_signature_2, null, 'custpage_sessiones_signatures');
        form.addField('custpage_field_signature_tres', 'url', label_signature_3, null, 'custpage_sessiones_signatures');
        form.addField('custpage_field_signature_cuatro', 'url', label_signature_4, null, 'custpage_sessiones_signatures');

        var arr_signatures_value_fields = [field_firma1, field_firma2, field_firma3, field_firma4];
        var arr_signatures_name_fields = ['custpage_field_signature_uno', 'custpage_field_signature_dos', 'custpage_field_signature_tres', 'custpage_field_signature_cuatro'];

        for (var signaturesCount = 0; signaturesCount < arr_signatures_name_fields.length; signaturesCount++) {
          if (arr_signatures_value_fields[signaturesCount] != null) {
            nlapiSetFieldValue(arr_signatures_name_fields[signaturesCount], arr_signatures_value_fields[signaturesCount]);
          }
        }
      }

      //ACTION: GRUPOS PERSONALIZADOS
      //NOTE: grupo fecha
      form.addFieldGroup('group_fecha_de_complementarios1', 'Fecha de Sesión', 'custpage_complementarios_uno');
      form.addFieldGroup('group_fecha_de_complementarios2', 'Fecha de Sesión', 'custpage_complementarios_dos');
      form.addFieldGroup('group_fecha_de_complementarios3', 'Fecha de Sesión', 'custpage_complementarios_tres');
      form.addFieldGroup('group_fecha_de_complementarios4', 'Fecha de Sesión', 'custpage_complementarios_cuatro');
      form.addFieldGroup('group_fecha_de_complementarios5', 'Fecha de Sesión', 'custpage_complementarios_cinco');
      form.addFieldGroup('group_fecha_de_complementarios6', 'Fecha de Sesión', 'custpage_complementarios_seis');
      form.addFieldGroup('group_fecha_de_complementarios7', 'Fecha de Sesión', 'custpage_complementarios_siete');
      form.addFieldGroup('group_fecha_de_complementarios8', 'Fecha de Sesión', 'custpage_complementarios_ocho');
      form.addFieldGroup('group_fecha_de_complementarios9', 'Fecha de Sesión', 'custpage_complementarios_nueve');
      form.addFieldGroup('group_fecha_de_complementarios10', 'Fecha de Sesión', 'custpage_complementarios_diez');
      //NOTE: grupo Imagenes
      form.addFieldGroup('group_printimages_complementarios1', 'Imagen gráfica', 'custpage_complementarios_uno');
      form.addFieldGroup('group_printimages_complementarios2', 'Imagen gráfica', 'custpage_complementarios_dos');
      form.addFieldGroup('group_printimages_complementarios3', 'Imagen gráfica', 'custpage_complementarios_tres');
      form.addFieldGroup('group_printimages_complementarios4', 'Imagen gráfica', 'custpage_complementarios_cuatro');
      form.addFieldGroup('group_printimages_complementarios5', 'Imagen gráfica', 'custpage_complementarios_cinco');
      form.addFieldGroup('group_printimages_complementarios6', 'Imagen gráfica', 'custpage_complementarios_seis');
      form.addFieldGroup('group_printimages_complementarios7', 'Imagen gráfica', 'custpage_complementarios_siete');
      form.addFieldGroup('group_printimages_complementarios8', 'Imagen gráfica', 'custpage_complementarios_ocho');
      form.addFieldGroup('group_printimages_complementarios9', 'Imagen gráfica', 'custpage_complementarios_nueve');
      form.addFieldGroup('group_printimages_complementarios10', 'Imagen gráfica', 'custpage_complementarios_diez');
      //NOTE: grupo procedimiento
      form.addFieldGroup('group_signos_vitales_complementarios1', 'Signos vitales', 'custpage_complementarios_uno');
      form.addFieldGroup('group_signos_vitales_complementarios2', 'Signos vitales', 'custpage_complementarios_dos');
      form.addFieldGroup('group_signos_vitales_complementarios3', 'Signos vitales', 'custpage_complementarios_tres');
      form.addFieldGroup('group_signos_vitales_complementarios4', 'Signos vitales', 'custpage_complementarios_cuatro');
      form.addFieldGroup('group_signos_vitales_complementarios5', 'Signos vitales', 'custpage_complementarios_cinco');
      form.addFieldGroup('group_signos_vitales_complementarios6', 'Signos vitales', 'custpage_complementarios_seis');
      form.addFieldGroup('group_signos_vitales_complementarios7', 'Signos vitales', 'custpage_complementarios_siete');
      form.addFieldGroup('group_signos_vitales_complementarios8', 'Signos vitales', 'custpage_complementarios_ocho');
      form.addFieldGroup('group_signos_vitales_complementarios9', 'Signos vitales', 'custpage_complementarios_nueve');
      form.addFieldGroup('group_signos_vitales_complementarios10', 'Signos vitales', 'custpage_complementarios_diez');
      //NOTE: grupo procedimiento
      form.addFieldGroup('group_procedimiento_complementarios1', 'Proceso de aplicación', 'custpage_complementarios_uno');
      form.addFieldGroup('group_procedimiento_complementarios2', 'Proceso de aplicación', 'custpage_complementarios_dos');
      form.addFieldGroup('group_procedimiento_complementarios3', 'Proceso de aplicación', 'custpage_complementarios_tres');
      form.addFieldGroup('group_procedimiento_complementarios4', 'Proceso de aplicación', 'custpage_complementarios_cuatro');
      form.addFieldGroup('group_procedimiento_complementarios5', 'Proceso de aplicación', 'custpage_complementarios_cinco');
      form.addFieldGroup('group_procedimiento_complementarios6', 'Proceso de aplicación', 'custpage_complementarios_seis');
      form.addFieldGroup('group_procedimiento_complementarios7', 'Proceso de aplicación', 'custpage_complementarios_siete');
      form.addFieldGroup('group_procedimiento_complementarios8', 'Proceso de aplicación', 'custpage_complementarios_ocho');
      form.addFieldGroup('group_procedimiento_complementarios9', 'Proceso de aplicación', 'custpage_complementarios_nueve');
      form.addFieldGroup('group_procedimiento_complementarios10', 'Proceso de aplicación', 'custpage_complementarios_diez');
      //NOTE: grupo observaciones
      form.addFieldGroup('group_observaciones_complementarios1', 'Observaciones', 'custpage_complementarios_uno');
      form.addFieldGroup('group_observaciones_complementarios2', 'Observaciones', 'custpage_complementarios_dos');
      form.addFieldGroup('group_observaciones_complementarios3', 'Observaciones', 'custpage_complementarios_tres');
      form.addFieldGroup('group_observaciones_complementarios4', 'Observaciones', 'custpage_complementarios_cuatro');
      form.addFieldGroup('group_observaciones_complementarios5', 'Observaciones', 'custpage_complementarios_cinco');
      form.addFieldGroup('group_observaciones_complementarios6', 'Observaciones', 'custpage_complementarios_seis');
      form.addFieldGroup('group_observaciones_complementarios7', 'Observaciones', 'custpage_complementarios_siete');
      form.addFieldGroup('group_observaciones_complementarios8', 'Observaciones', 'custpage_complementarios_ocho');
      form.addFieldGroup('group_observaciones_complementarios9', 'Observaciones', 'custpage_complementarios_nueve');
      form.addFieldGroup('group_observaciones_complementarios10', 'Observaciones', 'custpage_complementarios_diez');
      //NOTE: grupo responsables
      form.addFieldGroup('group_responsables_complementarios1', 'Responsables', 'custpage_complementarios_uno');
      form.addFieldGroup('group_responsables_complementarios2', 'Responsables', 'custpage_complementarios_dos');
      form.addFieldGroup('group_responsables_complementarios3', 'Responsables', 'custpage_complementarios_tres');
      form.addFieldGroup('group_responsables_complementarios4', 'Responsables', 'custpage_complementarios_cuatro');
      form.addFieldGroup('group_responsables_complementarios5', 'Responsables', 'custpage_complementarios_cinco');
      form.addFieldGroup('group_responsables_complementarios6', 'Responsables', 'custpage_complementarios_seis');
      form.addFieldGroup('group_responsables_complementarios7', 'Responsables', 'custpage_complementarios_siete');
      form.addFieldGroup('group_responsables_complementarios8', 'Responsables', 'custpage_complementarios_ocho');
      form.addFieldGroup('group_responsables_complementarios9', 'Responsables', 'custpage_complementarios_nueve');
      form.addFieldGroup('group_responsables_complementarios10', 'Responsables', 'custpage_complementarios_diez');
      //NOTE: boton que abre el suitelet para pintar el gráfico de procedimiento
      button_pintaImagen_openStatement = '<button id="printIamges" name="printImages" class="btn btn-primary" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.pintarImagenes_aparatologia(';
      button_pintarImagen_closeStatement = ');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><b>Pintar Imagen</b></button>';

      //NOTE: button that redirect to suitlet that let load review images and save it in cabinet
      var button_load_reviewImages_openStatement = '<button id="printIamges" name="printImages" style="margin:2px;" class="btn btn-primary" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.loadimagesSessions(';
      var button_load_reviewImages_closeStatement = ');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><b>Tomar fotografías de revisión</b></button>';

      //NOTE: button that redirect to suitelet that let visulize the review images
      var button_view_reviewImages_openStatement = '<button id="printIamges" name="printImages" style="margin:2px;" class="btn btn-primary" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.viewimagesSessions(';
      var button_view_reviewImages_closeStatement = ');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><b>Ver fotografías</b></button>';

      //ACTION: Creacion de Campos personalizados
      //NOTE: Campos complementarios 1
      if (campo_2_complementarios1 != null) {
        form.addField('custpage_field_complementarios_uno_custevent1056', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios1');
      } else {
        form.addField('custpage_field_complementarios_uno_custevent1056', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios1').setMandatory(true);
      }
      form.addField('custpage_field_complementarios_uno_custevent1080', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1090', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1100', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1110', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1120', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1130', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1140', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1150', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1160', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent1170', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent650', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent649', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios1');
      form.addField('custpage_field_complementarios_uno_custevent651', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios1');
      if (type == 'view') {
        if (campo_16_complementarios1 == null) {
          form.addField('custpage_button_printimage_complementarios_1_custevent1069', 'inlinehtml', '', null, 'group_printimages_complementarios1').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 1 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_1_custevent1069', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios1').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios1) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_1', 'inlinehtml', '', null, 'group_responsables_complementarios1').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 1 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_1', 'inlinehtml', '', null, 'group_responsables_complementarios1').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 1 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 2         
      if (campo_2_complementarios1 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios1) === 'false') {
          form.addField('custpage_field_complementarios_dos_custevent1057', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios2');
        } else {
          form.addField('custpage_field_complementarios_dos_custevent1057', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios2').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_dos_custevent1057', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios2');
      }
      form.addField('custpage_field_complementarios_dos_custevent1081', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1091', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1101', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1111', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1121', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1131', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1141', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1151', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1161', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1171', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1029', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1038', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios2');
      form.addField('custpage_field_complementarios_dos_custevent1047', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios2');
      if (type == 'view') {
        if (campo_16_complementarios2 == null) {
          form.addField('custpage_button_printimage_complementarios_2_custevent1070', 'inlinehtml', '', null, 'group_printimages_complementarios2').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 2 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_2_custevent1070', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios2').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios2) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_2', 'inlinehtml', '', null, 'group_responsables_complementarios2').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 2 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_2', 'inlinehtml', '', null, 'group_responsables_complementarios2').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 2 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 3
      if (campo_2_complementarios2 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios2) === 'false') {
          form.addField('custpage_field_complementarios_tres_custevent1058', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios3');
        } else {
          form.addField('custpage_field_complementarios_tres_custevent1058', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios3').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_tres_custevent1058', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios3');
      }
      form.addField('custpage_field_complementarios_tres_custevent1082', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1092', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1102', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1112', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1122', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1132', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1142', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1152', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1162', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1172', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1030', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1039', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios3');
      form.addField('custpage_field_complementarios_tres_custevent1048', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios3');
      if (type == 'view') {
        if (campo_16_complementarios3 == null) {
          form.addField('custpage_button_printimage_complementarios_3_custevent1071', 'inlinehtml', '', null, 'group_printimages_complementarios3').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 3 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_3_custevent1071', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios3').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios3) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_3', 'inlinehtml', '', null, 'group_responsables_complementarios3').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 3 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_3', 'inlinehtml', '', null, 'group_responsables_complementarios3').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 3 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 4
      if (campo_2_complementarios3 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios3) === 'false') {
          form.addField('custpage_field_complementarios_cuatro_custevent1059', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios4');
        } else {
          form.addField('custpage_field_complementarios_cuatro_custevent1059', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios4').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_cuatro_custevent1059', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios4');
      }
      form.addField('custpage_field_complementarios_cuatro_custevent1083', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1093', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1103', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1113', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1123', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1133', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1143', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1153', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1163', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1173', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1031', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1040', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios4');
      form.addField('custpage_field_complementarios_cuatro_custevent1049', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios4');
      if (type == 'view') {
        if (campo_16_complementarios4 == null) {
          form.addField('custpage_button_printimage_complementarios_4_custevent1072', 'inlinehtml', '', null, 'group_printimages_complementarios4').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 4 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_4_custevent1072', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios4').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios4) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_4', 'inlinehtml', '', null, 'group_responsables_complementarios4').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 4 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_4', 'inlinehtml', '', null, 'group_responsables_complementarios4').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 4 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 5
      if (campo_2_complementarios4 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios4) === 'false') {
          form.addField('custpage_field_complementarios_cinco_custevent1060', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios5');
        } else {
          form.addField('custpage_field_complementarios_cinco_custevent1060', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios5').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_cinco_custevent1060', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios5');
      }
      form.addField('custpage_field_complementarios_cinco_custevent1084', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1094', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1104', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1114', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1124', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1134', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1144', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1154', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1164', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1174', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1032', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1041', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios5');
      form.addField('custpage_field_complementarios_cinco_custevent1050', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios5');
      if (type == 'view') {
        if (campo_16_complementarios5 == null) {
          form.addField('custpage_button_printimage_complementarios_5_custevent1073', 'inlinehtml', '', null, 'group_printimages_complementarios5').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 5 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_5_custevent1073', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios5').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios5) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_5', 'inlinehtml', '', null, 'group_responsables_complementarios5').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 5 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_5', 'inlinehtml', '', null, 'group_responsables_complementarios5').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 5 + button_view_reviewImages_closeStatement);
      }
      //NOTE: Campos complementarios 6
      if (campo_2_complementarios5 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios5) === 'false') {
          form.addField('custpage_field_complementarios_seis_custevent1061', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios6');
        } else {
          form.addField('custpage_field_complementarios_seis_custevent1061', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios6').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_seis_custevent1061', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios6');
      }
      form.addField('custpage_field_complementarios_seis_custevent1085', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1095', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1105', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1115', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1125', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1135', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1145', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1155', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1165', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1175', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1033', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1042', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios6');
      form.addField('custpage_field_complementarios_seis_custevent1051', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios6');
      if (type == 'view') {
        if (campo_16_complementarios6 == null) {
          form.addField('custpage_button_printimage_complementarios_6_custevent1074', 'inlinehtml', '', null, 'group_printimages_complementarios6').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 6 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_6_custevent1074', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios6').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios6) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_6', 'inlinehtml', '', null, 'group_responsables_complementarios6').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 6 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_6', 'inlinehtml', '', null, 'group_responsables_complementarios6').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 6 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 7
      if (campo_2_complementarios6 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios6) === 'false') {
          form.addField('custpage_field_complementarios_siete_custevent1062', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios7');
        } else {
          form.addField('custpage_field_complementarios_siete_custevent1062', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios7').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_siete_custevent1062', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios7');
      }
      form.addField('custpage_field_complementarios_siete_custevent1086', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1096', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1106', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1116', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1126', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1136', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1146', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1156', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1166', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1176', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1034', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1043', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios7');
      form.addField('custpage_field_complementarios_siete_custevent1052', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios7');
      if (type == 'view') {
        if (campo_16_complementarios7 == null) {
          form.addField('custpage_button_printimage_complementarios_7_custevent1075', 'inlinehtml', '', null, 'group_printimages_complementarios7').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 7 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_7_custevent1075', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios7').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios7) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_7', 'inlinehtml', '', null, 'group_responsables_complementarios7').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 7 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_7', 'inlinehtml', '', null, 'group_responsables_complementarios7').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 7 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 8
      if (campo_2_complementarios7 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios7) === 'false') {
          form.addField('custpage_field_complementarios_ocho_custevent1063', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios8');
        } else {
          form.addField('custpage_field_complementarios_ocho_custevent1063', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios8').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_ocho_custevent1063', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios8');
      }
      form.addField('custpage_field_complementarios_ocho_custevent1087', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1097', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1107', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1117', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1127', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1137', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1147', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1157', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1167', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1177', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1035', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1044', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios8');
      form.addField('custpage_field_complementarios_ocho_custevent1053', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios8');
      if (type == 'view') {
        if (campo_16_complementarios8 == null) {
          form.addField('custpage_button_printimage_complementarios_8_custevent1076', 'inlinehtml', '', null, 'group_printimages_complementarios8').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 8 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_8_custevent1076', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios8').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios8) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_8', 'inlinehtml', '', null, 'group_responsables_complementarios8').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 8 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_8', 'inlinehtml', '', null, 'group_responsables_complementarios8').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 8 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 9
      if (campo_2_complementarios8 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios8) === 'false') {
          form.addField('custpage_field_complementarios_nueve_custevent1064', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios9');
        } else {
          form.addField('custpage_field_complementarios_nueve_custevent1064', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios9').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_nueve_custevent1064', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios9');
      }
      form.addField('custpage_field_complementarios_nueve_custevent1088', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1098', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1108', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1118', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1128', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1138', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1148', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1158', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1168', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1178', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1036', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1045', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios9');
      form.addField('custpage_field_complementarios_nueve_custevent1054', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios9');
      if (type == 'view') {
        if (campo_16_complementarios9 == null) {
          form.addField('custpage_button_printimage_complementarios_9_custevent1077', 'inlinehtml', '', null, 'group_printimages_complementarios9').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 9 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_9_custevent1077', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios9').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios9) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_9', 'inlinehtml', '', null, 'group_responsables_complementarios9').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 9 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_9', 'inlinehtml', '', null, 'group_responsables_complementarios9').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 9 + button_view_reviewImages_closeStatement);
      }

      //NOTE: Campos complementarios 10
      if (campo_2_complementarios9 != null) {
        if (blockFieldsTroughtDay(campo_2_complementarios9) === 'false') {
          form.addField('custpage_field_complementarios_diez_custevent1065', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios10');
        } else {
          form.addField('custpage_field_complementarios_diez_custevent1065', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios10').setMandatory(true);
        }
      } else {
        form.addField('custpage_field_complementarios_diez_custevent1065', 'date', etiqueta_campo_2, null, 'group_fecha_de_complementarios10');
      }
      form.addField('custpage_field_complementarios_diez_custevent1089', 'integer', etiqueta_campo_3, null, 'group_signos_vitales_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1099', 'integer', etiqueta_campo_4, null, 'group_signos_vitales_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1109', 'text', etiqueta_campo_5, null, 'group_signos_vitales_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1119', 'text', etiqueta_campo_6, null, 'group_signos_vitales_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1129', 'text', etiqueta_campo_7, null, 'group_procedimiento_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1139', 'text', etiqueta_campo_8, null, 'group_procedimiento_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1149', 'text', etiqueta_campo_9, null, 'group_procedimiento_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1159', 'text', etiqueta_campo_10, null, 'group_procedimiento_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1169', 'text', etiqueta_campo_11, null, 'group_procedimiento_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1179', 'text', etiqueta_campo_12, null, 'group_procedimiento_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1037', 'textarea', etiqueta_campo_13, null, 'group_observaciones_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1046', 'text', etiqueta_campo_14, null, 'group_responsables_complementarios10');
      form.addField('custpage_field_complementarios_diez_custevent1055', 'text', etiqueta_campo_15, null, 'group_responsables_complementarios10');
      if (type == 'view') {
        if (campo_16_complementarios10 == null) {
          form.addField('custpage_button_printimage_complementarios_10_custevent1078', 'inlinehtml', '', null, 'group_printimages_complementarios10').setDisplayType('inline').setDefaultValue(button_pintaImagen_openStatement + 10 + button_pintarImagen_closeStatement);
        } else {
          form.addField('custpage_field_printimage_complementarios_10_custevent1078', 'inlinehtml', etiqueta_campo_16, null, 'group_printimages_complementarios10').setDisplayType('inline').setDisplayType('readonly').setDefaultValue('<img src="' + nlapiEscapeXML(campo_16_complementarios10) + '" alt="" width="280px" />');
        }
        form.addField('custpage_button_take_snapshot_complementarios_10', 'inlinehtml', '', null, 'group_responsables_complementarios10').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 10 + button_load_reviewImages_closeStatement);
        form.addField('custpage_button_view_snapshot_complementarios_10', 'inlinehtml', '', null, 'group_responsables_complementarios10').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 1 + button_view_reviewImages_closeStatement);
      }

      //ACTION: Recupera valor de campos complementarios 1 y los despliega
      var complementarios1_array_nameFields = ['custpage_field_complementarios_uno_custevent1056', 'custpage_field_complementarios_uno_custevent1080', 'custpage_field_complementarios_uno_custevent1090', 'custpage_field_complementarios_uno_custevent1100', 'custpage_field_complementarios_uno_custevent1110', 'custpage_field_complementarios_uno_custevent1120', 'custpage_field_complementarios_uno_custevent1130', 'custpage_field_complementarios_uno_custevent1140', 'custpage_field_complementarios_uno_custevent1150', 'custpage_field_complementarios_uno_custevent1160', 'custpage_field_complementarios_uno_custevent1170', 'custpage_field_complementarios_uno_custevent650', 'custpage_field_complementarios_uno_custevent649', 'custpage_field_complementarios_uno_custevent651'];

      var complementarios1_array_valueFields = [campo_2_complementarios1, campo_3_complementarios1, campo_4_complementarios1, campo_5_complementarios1, campo_6_complementarios1, campo_7_complementarios1, campo_8_complementarios1, campo_9_complementarios1, campo_10_complementarios1, campo_11_complementarios1, campo_12_complementarios1, campo_13_complementarios1, campo_14_complementarios1, campo_15_complementarios1];

      for (var cUno = 0; cUno < complementarios1_array_nameFields.length; cUno++) {
        if (complementarios1_array_valueFields[cUno] != null) {
          nlapiSetFieldValue(complementarios1_array_nameFields[cUno], complementarios1_array_valueFields[cUno]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 2 y los despliega
      var complementarios2_array_nameFields = ['custpage_field_complementarios_dos_custevent1057', 'custpage_field_complementarios_dos_custevent1081', 'custpage_field_complementarios_dos_custevent1091', 'custpage_field_complementarios_dos_custevent1101', 'custpage_field_complementarios_dos_custevent1111', 'custpage_field_complementarios_dos_custevent1121', 'custpage_field_complementarios_dos_custevent1131', 'custpage_field_complementarios_dos_custevent1141', 'custpage_field_complementarios_dos_custevent1151', 'custpage_field_complementarios_dos_custevent1161', 'custpage_field_complementarios_dos_custevent1171', 'custpage_field_complementarios_dos_custevent1029', 'custpage_field_complementarios_dos_custevent1038', 'custpage_field_complementarios_dos_custevent1047'];

      var complementarios2_array_valueFields = [campo_2_complementarios2, campo_3_complementarios2, campo_4_complementarios2, campo_5_complementarios2, campo_6_complementarios2, campo_7_complementarios2, campo_8_complementarios2, campo_9_complementarios2, campo_10_complementarios2, campo_11_complementarios2, campo_12_complementarios2, campo_13_complementarios2, campo_14_complementarios2, campo_15_complementarios2];

      for (var cDos = 0; cDos < complementarios2_array_nameFields.length; cDos++) {
        if (complementarios2_array_valueFields[cDos] != null) {
          nlapiSetFieldValue(complementarios2_array_nameFields[cDos], complementarios2_array_valueFields[cDos]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 3 y los despliega
      var complementarios3_array_nameFields = ['custpage_field_complementarios_tres_custevent1058', 'custpage_field_complementarios_tres_custevent1082', 'custpage_field_complementarios_tres_custevent1092', 'custpage_field_complementarios_tres_custevent1102', 'custpage_field_complementarios_tres_custevent1112', 'custpage_field_complementarios_tres_custevent1122', 'custpage_field_complementarios_tres_custevent1132', 'custpage_field_complementarios_tres_custevent1142', 'custpage_field_complementarios_tres_custevent1152', 'custpage_field_complementarios_tres_custevent1162', 'custpage_field_complementarios_tres_custevent1172', 'custpage_field_complementarios_tres_custevent1030', 'custpage_field_complementarios_tres_custevent1039', 'custpage_field_complementarios_tres_custevent1048'];

      var complementarios3_array_valueFields = [campo_2_complementarios3, campo_3_complementarios3, campo_4_complementarios3, campo_5_complementarios3, campo_6_complementarios3, campo_7_complementarios3, campo_8_complementarios3, campo_9_complementarios3, campo_10_complementarios3, campo_11_complementarios3, campo_12_complementarios3, campo_13_complementarios3, campo_14_complementarios3, campo_15_complementarios3];

      for (var cTres = 0; cTres < complementarios3_array_nameFields.length; cTres++) {
        if (complementarios3_array_valueFields[cTres] != null) {
          nlapiSetFieldValue(complementarios3_array_nameFields[cTres], complementarios3_array_valueFields[cTres]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 4 y los despliega
      var complementarios4_array_nameFields = ['custpage_field_complementarios_cuatro_custevent1059', 'custpage_field_complementarios_cuatro_custevent1083', 'custpage_field_complementarios_cuatro_custevent1093', 'custpage_field_complementarios_cuatro_custevent1103', 'custpage_field_complementarios_cuatro_custevent1113', 'custpage_field_complementarios_cuatro_custevent1123', 'custpage_field_complementarios_cuatro_custevent1133', 'custpage_field_complementarios_cuatro_custevent1143', 'custpage_field_complementarios_cuatro_custevent1153', 'custpage_field_complementarios_cuatro_custevent1163', 'custpage_field_complementarios_cuatro_custevent1173', 'custpage_field_complementarios_cuatro_custevent1031', 'custpage_field_complementarios_cuatro_custevent1040', 'custpage_field_complementarios_cuatro_custevent1049'];

      var complementarios4_array_valueFields = [campo_2_complementarios4, campo_3_complementarios4, campo_4_complementarios4, campo_5_complementarios4, campo_6_complementarios4, campo_7_complementarios4, campo_8_complementarios4, campo_9_complementarios4, campo_10_complementarios4, campo_11_complementarios4, campo_12_complementarios4, campo_13_complementarios4, campo_14_complementarios4, campo_15_complementarios4];

      for (var cCuatro = 0; cCuatro < complementarios4_array_nameFields.length; cCuatro++) {
        if (complementarios4_array_valueFields[cCuatro] != null) {
          nlapiSetFieldValue(complementarios4_array_nameFields[cCuatro], complementarios4_array_valueFields[cCuatro]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 5 y los despliega
      var complementarios5_array_nameFields = ['custpage_field_complementarios_cinco_custevent1060', 'custpage_field_complementarios_cinco_custevent1084', 'custpage_field_complementarios_cinco_custevent1094', 'custpage_field_complementarios_cinco_custevent1104', 'custpage_field_complementarios_cinco_custevent1114', 'custpage_field_complementarios_cinco_custevent1124', 'custpage_field_complementarios_cinco_custevent1134', 'custpage_field_complementarios_cinco_custevent1144', 'custpage_field_complementarios_cinco_custevent1154', 'custpage_field_complementarios_cinco_custevent1164', 'custpage_field_complementarios_cinco_custevent1174', 'custpage_field_complementarios_cinco_custevent1032', 'custpage_field_complementarios_cinco_custevent1041', 'custpage_field_complementarios_cinco_custevent1050'];

      var complementarios5_array_valueFields = [campo_2_complementarios5, campo_3_complementarios5, campo_4_complementarios5, campo_5_complementarios5, campo_6_complementarios5, campo_7_complementarios5, campo_8_complementarios5, campo_9_complementarios5, campo_10_complementarios5, campo_11_complementarios5, campo_12_complementarios5, campo_13_complementarios5, campo_14_complementarios5, campo_15_complementarios5];

      for (var cCinco = 0; cCinco < complementarios5_array_nameFields.length; cCinco++) {
        if (complementarios5_array_valueFields[cCinco] != null) {
          nlapiSetFieldValue(complementarios5_array_nameFields[cCinco], complementarios5_array_valueFields[cCinco]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 6 y los despliega
      var complementarios6_array_nameFields = ['custpage_field_complementarios_seis_custevent1061', 'custpage_field_complementarios_seis_custevent1085', 'custpage_field_complementarios_seis_custevent1095', 'custpage_field_complementarios_seis_custevent1105', 'custpage_field_complementarios_seis_custevent1115', 'custpage_field_complementarios_seis_custevent1125', 'custpage_field_complementarios_seis_custevent1135', 'custpage_field_complementarios_seis_custevent1145', 'custpage_field_complementarios_seis_custevent1155', 'custpage_field_complementarios_seis_custevent1165', 'custpage_field_complementarios_seis_custevent1175', 'custpage_field_complementarios_seis_custevent1033', 'custpage_field_complementarios_seis_custevent1042', 'custpage_field_complementarios_seis_custevent1051'];

      var complementarios6_array_valueFields = [campo_2_complementarios6, campo_3_complementarios6, campo_4_complementarios6, campo_5_complementarios6, campo_6_complementarios6, campo_7_complementarios6, campo_8_complementarios6, campo_9_complementarios6, campo_10_complementarios6, campo_11_complementarios6, campo_12_complementarios6, campo_13_complementarios6, campo_14_complementarios6, campo_15_complementarios6];

      for (var cSeis = 0; cSeis < complementarios6_array_nameFields.length; cSeis++) {
        if (complementarios6_array_valueFields[cSeis] != null) {
          nlapiSetFieldValue(complementarios6_array_nameFields[cSeis], complementarios6_array_valueFields[cSeis]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 7 y los despliega
      var complementarios7_array_nameFields = ['custpage_field_complementarios_siete_custevent1062', 'custpage_field_complementarios_siete_custevent1086', 'custpage_field_complementarios_siete_custevent1096', 'custpage_field_complementarios_siete_custevent1106', 'custpage_field_complementarios_siete_custevent1116', 'custpage_field_complementarios_siete_custevent1126', 'custpage_field_complementarios_siete_custevent1136', 'custpage_field_complementarios_siete_custevent1146', 'custpage_field_complementarios_siete_custevent1156', 'custpage_field_complementarios_siete_custevent1166', 'custpage_field_complementarios_siete_custevent1176', 'custpage_field_complementarios_siete_custevent1034', 'custpage_field_complementarios_siete_custevent1043', 'custpage_field_complementarios_siete_custevent1052'];

      var complementarios7_array_valueFields = [campo_2_complementarios7, campo_3_complementarios7, campo_4_complementarios7, campo_5_complementarios7, campo_6_complementarios7, campo_7_complementarios7, campo_8_complementarios7, campo_9_complementarios7, campo_10_complementarios7, campo_11_complementarios7, campo_12_complementarios7, campo_13_complementarios7, campo_14_complementarios7, campo_15_complementarios7];

      for (var cSiete = 0; cSiete < complementarios7_array_nameFields.length; cSiete++) {
        if (complementarios7_array_valueFields[cSiete] != null) {
          nlapiSetFieldValue(complementarios7_array_nameFields[cSiete], complementarios7_array_valueFields[cSiete]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 8 y los despliega
      var complementarios8_array_nameFields = ['custpage_field_complementarios_ocho_custevent1063', 'custpage_field_complementarios_ocho_custevent1087', 'custpage_field_complementarios_ocho_custevent1097', 'custpage_field_complementarios_ocho_custevent1107', 'custpage_field_complementarios_ocho_custevent1117', 'custpage_field_complementarios_ocho_custevent1127', 'custpage_field_complementarios_ocho_custevent1137', 'custpage_field_complementarios_ocho_custevent1147', 'custpage_field_complementarios_ocho_custevent1157', 'custpage_field_complementarios_ocho_custevent1167', 'custpage_field_complementarios_ocho_custevent1177', 'custpage_field_complementarios_ocho_custevent1035', 'custpage_field_complementarios_ocho_custevent1044', 'custpage_field_complementarios_ocho_custevent1053'];

      var complementarios8_array_valueFields = [campo_2_complementarios8, campo_3_complementarios8, campo_4_complementarios8, campo_5_complementarios8, campo_6_complementarios8, campo_7_complementarios8, campo_8_complementarios8, campo_9_complementarios8, campo_10_complementarios8, campo_11_complementarios8, campo_12_complementarios8, campo_13_complementarios8, campo_14_complementarios8, campo_15_complementarios8];

      for (var cOcho = 0; cOcho < complementarios8_array_nameFields.length; cOcho++) {
        if (complementarios8_array_valueFields[cOcho] != null) {
          nlapiSetFieldValue(complementarios8_array_nameFields[cOcho], complementarios8_array_valueFields[cOcho]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 9 y los despliega
      var complementarios9_array_nameFields = ['custpage_field_complementarios_nueve_custevent1064', 'custpage_field_complementarios_nueve_custevent1088', 'custpage_field_complementarios_nueve_custevent1098', 'custpage_field_complementarios_nueve_custevent1108', 'custpage_field_complementarios_nueve_custevent1118', 'custpage_field_complementarios_nueve_custevent1128', 'custpage_field_complementarios_nueve_custevent1138', 'custpage_field_complementarios_nueve_custevent1148', 'custpage_field_complementarios_nueve_custevent1158', 'custpage_field_complementarios_nueve_custevent1168', 'custpage_field_complementarios_nueve_custevent1178', 'custpage_field_complementarios_nueve_custevent1036', 'custpage_field_complementarios_nueve_custevent1045', 'custpage_field_complementarios_nueve_custevent1054'];

      var complementarios9_array_valueFields = [campo_2_complementarios9, campo_3_complementarios9, campo_4_complementarios9, campo_5_complementarios9, campo_6_complementarios9, campo_7_complementarios9, campo_8_complementarios9, campo_9_complementarios9, campo_10_complementarios9, campo_11_complementarios9, campo_12_complementarios9, campo_13_complementarios9, campo_14_complementarios9, campo_15_complementarios9];

      for (var cNueve = 0; cNueve < complementarios9_array_nameFields.length; cNueve++) {
        if (complementarios9_array_valueFields[cNueve] != null) {
          nlapiSetFieldValue(complementarios9_array_nameFields[cNueve], complementarios9_array_valueFields[cNueve]);
        }
      }

      //ACTION: Recupera valor de campos complementarios 10 y los despliega
      var complementarios10_array_nameFields = ['custpage_field_complementarios_diez_custevent1065', 'custpage_field_complementarios_diez_custevent1089', 'custpage_field_complementarios_diez_custevent1099', 'custpage_field_complementarios_diez_custevent1109', 'custpage_field_complementarios_diez_custevent1119', 'custpage_field_complementarios_diez_custevent1129', 'custpage_field_complementarios_diez_custevent1139', 'custpage_field_complementarios_diez_custevent1149', 'custpage_field_complementarios_diez_custevent1159', 'custpage_field_complementarios_diez_custevent1169', 'custpage_field_complementarios_diez_custevent1179', 'custpage_field_complementarios_diez_custevent1037', 'custpage_field_complementarios_diez_custevent1046', 'custpage_field_complementarios_diez_custevent1055'];

      var complementarios10_array_valueFields = [campo_2_complementarios10, campo_3_complementarios10, campo_4_complementarios10, campo_5_complementarios10, campo_6_complementarios10, campo_7_complementarios10, campo_8_complementarios10, campo_9_complementarios10, campo_10_complementarios10, campo_11_complementarios10, campo_12_complementarios10, campo_13_complementarios10, campo_14_complementarios10, campo_15_complementarios10];

      for (var cDiez = 0; cDiez < complementarios10_array_nameFields.length; cDiez++) {
        if (complementarios10_array_valueFields[cDiez] != null) {
          nlapiSetFieldValue(complementarios10_array_nameFields[cDiez], complementarios10_array_valueFields[cDiez]);
        }
      }

      //NOTE: Arreglo de los campos personalizados de la complementarios 1
      var array_blockFields_complementarios1 = ['custpage_field_complementarios_uno_custevent1056', 'custpage_field_complementarios_uno_custevent1080', 'custpage_field_complementarios_uno_custevent1090', 'custpage_field_complementarios_uno_custevent1100', 'custpage_field_complementarios_uno_custevent1110', 'custpage_field_complementarios_uno_custevent1120', 'custpage_field_complementarios_uno_custevent1130', 'custpage_field_complementarios_uno_custevent1140', 'custpage_field_complementarios_uno_custevent1150', 'custpage_field_complementarios_uno_custevent1160', 'custpage_field_complementarios_uno_custevent1170', 'custpage_field_complementarios_uno_custevent650', 'custpage_field_complementarios_uno_custevent649', 'custpage_field_complementarios_uno_custevent651'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 2
      var array_blockFields_complementarios2 = ['custpage_field_complementarios_dos_custevent1057', 'custpage_field_complementarios_dos_custevent1081', 'custpage_field_complementarios_dos_custevent1091', 'custpage_field_complementarios_dos_custevent1101', 'custpage_field_complementarios_dos_custevent1111', 'custpage_field_complementarios_dos_custevent1121', 'custpage_field_complementarios_dos_custevent1131', 'custpage_field_complementarios_dos_custevent1141', 'custpage_field_complementarios_dos_custevent1151', 'custpage_field_complementarios_dos_custevent1161', 'custpage_field_complementarios_dos_custevent1171', 'custpage_field_complementarios_dos_custevent1029', 'custpage_field_complementarios_dos_custevent1038', 'custpage_field_complementarios_dos_custevent1047'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 3
      var array_blockFields_complementarios3 = ['custpage_field_complementarios_tres_custevent1058', 'custpage_field_complementarios_tres_custevent1082', 'custpage_field_complementarios_tres_custevent1092', 'custpage_field_complementarios_tres_custevent1102', 'custpage_field_complementarios_tres_custevent1112', 'custpage_field_complementarios_tres_custevent1122', 'custpage_field_complementarios_tres_custevent1132', 'custpage_field_complementarios_tres_custevent1142', 'custpage_field_complementarios_tres_custevent1152', 'custpage_field_complementarios_tres_custevent1162', 'custpage_field_complementarios_tres_custevent1172', 'custpage_field_complementarios_tres_custevent1030', 'custpage_field_complementarios_tres_custevent1039', 'custpage_field_complementarios_tres_custevent1048'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 4
      var array_blockFields_complementarios4 = ['custpage_field_complementarios_cuatro_custevent1059', 'custpage_field_complementarios_cuatro_custevent1083', 'custpage_field_complementarios_cuatro_custevent1093', 'custpage_field_complementarios_cuatro_custevent1103', 'custpage_field_complementarios_cuatro_custevent1113', 'custpage_field_complementarios_cuatro_custevent1123', 'custpage_field_complementarios_cuatro_custevent1133', 'custpage_field_complementarios_cuatro_custevent1143', 'custpage_field_complementarios_cuatro_custevent1153', 'custpage_field_complementarios_cuatro_custevent1163', 'custpage_field_complementarios_cuatro_custevent1173', 'custpage_field_complementarios_cuatro_custevent1031', 'custpage_field_complementarios_cuatro_custevent1040', 'custpage_field_complementarios_cuatro_custevent1049'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 5
      var array_blockFields_complementarios5 = ['custpage_field_complementarios_cinco_custevent1060', 'custpage_field_complementarios_cinco_custevent1084', 'custpage_field_complementarios_cinco_custevent1094', 'custpage_field_complementarios_cinco_custevent1104', 'custpage_field_complementarios_cinco_custevent1114', 'custpage_field_complementarios_cinco_custevent1124', 'custpage_field_complementarios_cinco_custevent1134', 'custpage_field_complementarios_cinco_custevent1144', 'custpage_field_complementarios_cinco_custevent1154', 'custpage_field_complementarios_cinco_custevent1164', 'custpage_field_complementarios_cinco_custevent1174', 'custpage_field_complementarios_cinco_custevent1032', 'custpage_field_complementarios_cinco_custevent1041', 'custpage_field_complementarios_cinco_custevent1050'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 6
      var array_blockFields_complementarios6 = ['custpage_field_complementarios_seis_custevent1061', 'custpage_field_complementarios_seis_custevent1085', 'custpage_field_complementarios_seis_custevent1095', 'custpage_field_complementarios_seis_custevent1105', 'custpage_field_complementarios_seis_custevent1115', 'custpage_field_complementarios_seis_custevent1125', 'custpage_field_complementarios_seis_custevent1135', 'custpage_field_complementarios_seis_custevent1145', 'custpage_field_complementarios_seis_custevent1155', 'custpage_field_complementarios_seis_custevent1165', 'custpage_field_complementarios_seis_custevent1175', 'custpage_field_complementarios_seis_custevent1033', 'custpage_field_complementarios_seis_custevent1042', 'custpage_field_complementarios_seis_custevent1051'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 7
      var array_blockFields_complementarios7 = ['custpage_field_complementarios_siete_custevent1062', 'custpage_field_complementarios_siete_custevent1086', 'custpage_field_complementarios_siete_custevent1096', 'custpage_field_complementarios_siete_custevent1106', 'custpage_field_complementarios_siete_custevent1116', 'custpage_field_complementarios_siete_custevent1126', 'custpage_field_complementarios_siete_custevent1136', 'custpage_field_complementarios_siete_custevent1146', 'custpage_field_complementarios_siete_custevent1156', 'custpage_field_complementarios_siete_custevent1166', 'custpage_field_complementarios_siete_custevent1176', 'custpage_field_complementarios_siete_custevent1034', 'custpage_field_complementarios_siete_custevent1043', 'custpage_field_complementarios_siete_custevent1052'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 8
      var array_blockFields_complementarios8 = ['custpage_field_complementarios_ocho_custevent1063', 'custpage_field_complementarios_ocho_custevent1087', 'custpage_field_complementarios_ocho_custevent1097', 'custpage_field_complementarios_ocho_custevent1107', 'custpage_field_complementarios_ocho_custevent1117', 'custpage_field_complementarios_ocho_custevent1127', 'custpage_field_complementarios_ocho_custevent1137', 'custpage_field_complementarios_ocho_custevent1147', 'custpage_field_complementarios_ocho_custevent1157', 'custpage_field_complementarios_ocho_custevent1167', 'custpage_field_complementarios_ocho_custevent1177', 'custpage_field_complementarios_ocho_custevent1035', 'custpage_field_complementarios_ocho_custevent1044', 'custpage_field_complementarios_ocho_custevent1053'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 9
      var array_blockFields_complementarios9 = ['custpage_field_complementarios_nueve_custevent1064', 'custpage_field_complementarios_nueve_custevent1088', 'custpage_field_complementarios_nueve_custevent1098', 'custpage_field_complementarios_nueve_custevent1108', 'custpage_field_complementarios_nueve_custevent1118', 'custpage_field_complementarios_nueve_custevent1128', 'custpage_field_complementarios_nueve_custevent1138', 'custpage_field_complementarios_nueve_custevent1148', 'custpage_field_complementarios_nueve_custevent1158', 'custpage_field_complementarios_nueve_custevent1168', 'custpage_field_complementarios_nueve_custevent1178', 'custpage_field_complementarios_nueve_custevent1036', 'custpage_field_complementarios_nueve_custevent1045', 'custpage_field_complementarios_nueve_custevent1054'];
      //NOTE: Arreglo de los campos personalizados de la complementarios 10
      var array_blockFields_complementarios10 = ['custpage_field_complementarios_diez_custevent1065', 'custpage_field_complementarios_diez_custevent1089', 'custpage_field_complementarios_diez_custevent1099', 'custpage_field_complementarios_diez_custevent1109', 'custpage_field_complementarios_diez_custevent1119', 'custpage_field_complementarios_diez_custevent1129', 'custpage_field_complementarios_diez_custevent1139', 'custpage_field_complementarios_diez_custevent1149', 'custpage_field_complementarios_diez_custevent1159', 'custpage_field_complementarios_diez_custevent1169', 'custpage_field_complementarios_diez_custevent1179', 'custpage_field_complementarios_diez_custevent1037', 'custpage_field_complementarios_diez_custevent1046', 'custpage_field_complementarios_diez_custevent1055'];
      //NOTE: Arreglo de los campos que contienen la fecha de la complementarios
      array_datesLimit_values = ['custevent1056', 'custevent1057', 'custevent1058', 'custevent1059', 'custevent1060', 'custevent1061', 'custevent1062', 'custevent1063', 'custevent1064', 'custevent1065'];
      //NOTE: Arreglo de los arreglos de los campos personalizados por conjunto de complementarios
      array_blockFields_sessions = [array_blockFields_complementarios1, array_blockFields_complementarios2, array_blockFields_complementarios3, array_blockFields_complementarios4, array_blockFields_complementarios5, array_blockFields_complementarios6, array_blockFields_complementarios7, array_blockFields_complementarios8, array_blockFields_complementarios9, array_blockFields_complementarios10];

      //ACTION: configura dos arreglos con los valores de posicion dentro del arrelo 'array_blockFields_sessions' que deberan ser completamente bloqueados o parcialmente bloqueados
      for (var l in array_datesLimit_values) {
        dateSessions = nlapiGetFieldValue(array_datesLimit_values[l]) || 'null';
        if (dateSessions != 'null') {
          if (blockFieldsTroughtDay(dateSessions) === 'true') {
            tempSessions_closed.push(l);
          } else {
            tempSessions_semiClosed.push(l);
          }
        } else {
          tempSessions_semiClosed.push(l);
        }
      }
      //ACTION: Configura el bloqued de campos dentro de los arrelgos de campos de la o las complementarios que seran completamente bloqueados
      for (var m in tempSessions_closed) {
        array_elementoBlockear_closed.push(array_blockFields_sessions[tempSessions_closed[m]]);
        for (var d in array_blockClosed = array_elementoBlockear_closed[m]) {
          //nlapiLogExecution('DEBUG', 'Array Closed', array_blockClocsed[a]);
          //nlapiLogExecution('DEBUG', 'Array Closed Values', nlapiGetFieldValue(array_blockClosed[a]));
          //nlapiLogExecution('DEBUG', 'Array Closed', array_blockClosed[a] + ': ' + elementoBlockear_closed);
          elementoBlockear_closed = nlapiGetField(array_blockClosed[d]);
          if (elementoBlockear_closed != null) {
            elementoBlockear_closed.setDisplayType('inline');
          }
        }
      }
      //ACTION: Configura el bloqued de campos dentro de los arrelgos de campos de la o las complementarios que seran bloqueados parcialmente
      for (var n in tempSessions_semiClosed) {
        array_elementoBlockear_semiClosed.push(array_blockFields_sessions[tempSessions_semiClosed[n]]);
        for (var e in array_blockSemiClosed = array_elementoBlockear_semiClosed[n]) {
          //nlapiLogExecution('DEBUG', 'Array SemiClosed', array_blockSemiClosed[b]);
          //nlapiLogExecution('DEBUG', 'Array SemiClosed values', nlapiGetFieldValue(array_blockSemiClosed[b]));
          elementoBlockear_semiClosed_field = nlapiGetField(array_blockSemiClosed[e]);
          if (elementoBlockear_semiClosed_field != null) {
            elementoBlockear_semiClosed = nlapiGetFieldValue(array_blockSemiClosed[e]) || null;
            if (elementoBlockear_semiClosed != null) {
              elementoBlockear_semiClosed_field.setDisplayType('inline');
            }
          }
        }
      }
    }
  }
}


/**
 * AFTERSUBMIT
 * @param {object} type 
 * @param {object} form object Form 
 */
function afterSubmit(type, form) {
  var recId = nlapiGetRecordId();
  var formulario = nlapiGetFieldValue('customform');

  var imagen = nlapiGetFieldValue('mediafile_image1');
  nlapiLogExecution('DEBUG', 'VALOR IMAGEN', imagen);

  if (type == 'edit' || type == 'create') {
    if (formulario == 33 || formulario == 147) {

      //NOTE: variables que recuperan el id de campo de la sesion 1
      var name_campo_1_sesion1 = nlapiGetField('custevent648').getName();
      var name_campo_2_sesion1 = nlapiGetField('custevent649').getName();
      var name_campo_3_sesion1 = nlapiGetField('custevent650').getName();
      var name_campo_4_sesion1 = nlapiGetField('custevent651').getName();
      var name_campo_5_sesion1 = nlapiGetField('custevent652').getName();
      var name_campo_6_sesion1 = nlapiGetField('custevent653').getName();
      var name_campo_7_sesion1 = nlapiGetField('custevent654').getName();
      var name_campo_8_sesion1 = nlapiGetField('custevent506').getName();
      var name_campo_9_sesion1 = nlapiGetField('custevent507').getName();
      var name_campo_10_sesion1 = nlapiGetField('custevent541').getName();
      var name_campo_11_sesion1 = nlapiGetField('custevent636').getName();
      var name_campo_12_sesion1 = nlapiGetField('custevent637').getName();
      //var name_campo_13_sesion1 = nlapiGetField('custevent638').getName();
      var name_campo_14_sesion1 = nlapiGetField('custevent639').getName();
      var name_campo_15_sesion1 = nlapiGetField('custevent640').getName();
      var name_campo_16_sesion1 = nlapiGetField('custevent641').getName();
      var name_campo_17_sesion1 = nlapiGetField('custevent642').getName();
      var name_campo_18_sesion1 = nlapiGetField('custevent643').getName();
      var name_campo_19_sesion1 = nlapiGetField('custevent644').getName();
      var name_campo_20_sesion1 = nlapiGetField('custevent645').getName();
      var name_campo_21_sesion1 = nlapiGetField('custevent646').getName();
      var name_campo_22_sesion1 = nlapiGetField('custevent647').getName();
      var name_campo_23_sesion1 = nlapiGetField('custevent1056').getName();
      var name_campo_24_sesion1 = nlapiGetField('custevent1069').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 2
      var name_campo_1_sesion2 = nlapiGetField('custevent1020').getName();
      var name_campo_2_sesion2 = nlapiGetField('custevent1038').getName();
      var name_campo_3_sesion2 = nlapiGetField('custevent1029').getName();
      var name_campo_4_sesion2 = nlapiGetField('custevent1047').getName();
      var name_campo_5_sesion2 = nlapiGetField('custevent867').getName();
      var name_campo_6_sesion2 = nlapiGetField('custevent876').getName();
      var name_campo_7_sesion2 = nlapiGetField('custevent858').getName();
      var name_campo_8_sesion2 = nlapiGetField('custevent912').getName();
      var name_campo_9_sesion2 = nlapiGetField('custevent921').getName();
      var name_campo_10_sesion2 = nlapiGetField('custevent930').getName();
      var name_campo_11_sesion2 = nlapiGetField('custevent885').getName();
      var name_campo_12_sesion2 = nlapiGetField('custevent894').getName();
      //var name_campo_13_sesion2 = nlapiGetField('custevent903').getName();
      var name_campo_14_sesion2 = nlapiGetField('custevent939').getName();
      var name_campo_15_sesion2 = nlapiGetField('custevent957').getName();
      var name_campo_16_sesion2 = nlapiGetField('custevent966').getName();
      var name_campo_17_sesion2 = nlapiGetField('custevent948').getName();
      var name_campo_18_sesion2 = nlapiGetField('custevent975').getName();
      var name_campo_19_sesion2 = nlapiGetField('custevent984').getName();
      var name_campo_20_sesion2 = nlapiGetField('custevent993').getName();
      var name_campo_21_sesion2 = nlapiGetField('custevent1002').getName();
      var name_campo_22_sesion2 = nlapiGetField('custevent1011').getName();
      var name_campo_23_sesion2 = nlapiGetField('custevent1057').getName();
      var name_campo_24_sesion2 = nlapiGetField('custevent1070').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 3
      var name_campo_1_sesion3 = nlapiGetField('custevent1021').getName();
      var name_campo_2_sesion3 = nlapiGetField('custevent1039').getName();
      var name_campo_3_sesion3 = nlapiGetField('custevent1030').getName();
      var name_campo_4_sesion3 = nlapiGetField('custevent1048').getName();
      var name_campo_5_sesion3 = nlapiGetField('custevent868').getName();
      var name_campo_6_sesion3 = nlapiGetField('custevent877').getName();
      var name_campo_7_sesion3 = nlapiGetField('custevent859').getName();
      var name_campo_8_sesion3 = nlapiGetField('custevent913').getName();
      var name_campo_9_sesion3 = nlapiGetField('custevent922').getName();
      var name_campo_10_sesion3 = nlapiGetField('custevent931').getName();
      var name_campo_11_sesion3 = nlapiGetField('custevent886').getName();
      var name_campo_12_sesion3 = nlapiGetField('custevent895').getName();
      //var name_campo_13_sesion3 = nlapiGetField('custevent904').getName();
      var name_campo_14_sesion3 = nlapiGetField('custevent940').getName();
      var name_campo_15_sesion3 = nlapiGetField('custevent958').getName();
      var name_campo_16_sesion3 = nlapiGetField('custevent967').getName();
      var name_campo_17_sesion3 = nlapiGetField('custevent949').getName();
      var name_campo_18_sesion3 = nlapiGetField('custevent976').getName();
      var name_campo_19_sesion3 = nlapiGetField('custevent985').getName();
      var name_campo_20_sesion3 = nlapiGetField('custevent994').getName();
      var name_campo_21_sesion3 = nlapiGetField('custevent1003').getName();
      var name_campo_22_sesion3 = nlapiGetField('custevent1012').getName();
      var name_campo_23_sesion3 = nlapiGetField('custevent1058').getName();
      var name_campo_24_sesion3 = nlapiGetField('custevent1071').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 4
      var name_campo_1_sesion4 = nlapiGetField('custevent1022').getName();
      var name_campo_2_sesion4 = nlapiGetField('custevent1040').getName();
      var name_campo_3_sesion4 = nlapiGetField('custevent1031').getName();
      var name_campo_4_sesion4 = nlapiGetField('custevent1049').getName();
      var name_campo_5_sesion4 = nlapiGetField('custevent869').getName();
      var name_campo_6_sesion4 = nlapiGetField('custevent878').getName();
      var name_campo_7_sesion4 = nlapiGetField('custevent860').getName();
      var name_campo_8_sesion4 = nlapiGetField('custevent914').getName();
      var name_campo_9_sesion4 = nlapiGetField('custevent923').getName();
      var name_campo_10_sesion4 = nlapiGetField('custevent932').getName();
      var name_campo_11_sesion4 = nlapiGetField('custevent887').getName();
      var name_campo_12_sesion4 = nlapiGetField('custevent896').getName();
      //var name_campo_13_sesion4 = nlapiGetField('custevent905').getName();
      var name_campo_14_sesion4 = nlapiGetField('custevent941').getName();
      var name_campo_15_sesion4 = nlapiGetField('custevent959').getName();
      var name_campo_16_sesion4 = nlapiGetField('custevent968').getName();
      var name_campo_17_sesion4 = nlapiGetField('custevent950').getName();
      var name_campo_18_sesion4 = nlapiGetField('custevent977').getName();
      var name_campo_19_sesion4 = nlapiGetField('custevent986').getName();
      var name_campo_20_sesion4 = nlapiGetField('custevent995').getName();
      var name_campo_21_sesion4 = nlapiGetField('custevent1004').getName();
      var name_campo_22_sesion4 = nlapiGetField('custevent1013').getName();
      var name_campo_23_sesion4 = nlapiGetField('custevent1059').getName();
      var name_campo_24_sesion4 = nlapiGetField('custevent1072').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 5
      var name_campo_1_sesion5 = nlapiGetField('custevent1023').getName();
      var name_campo_2_sesion5 = nlapiGetField('custevent1041').getName();
      var name_campo_3_sesion5 = nlapiGetField('custevent1032').getName();
      var name_campo_4_sesion5 = nlapiGetField('custevent1050').getName();
      var name_campo_5_sesion5 = nlapiGetField('custevent870').getName();
      var name_campo_6_sesion5 = nlapiGetField('custevent879').getName();
      var name_campo_7_sesion5 = nlapiGetField('custevent861').getName();
      var name_campo_8_sesion5 = nlapiGetField('custevent915').getName();
      var name_campo_9_sesion5 = nlapiGetField('custevent924').getName();
      var name_campo_10_sesion5 = nlapiGetField('custevent933').getName();
      var name_campo_11_sesion5 = nlapiGetField('custevent888').getName();
      var name_campo_12_sesion5 = nlapiGetField('custevent897').getName();
      //var name_campo_13_sesion5 = nlapiGetField('custevent906').getName();
      var name_campo_14_sesion5 = nlapiGetField('custevent942').getName();
      var name_campo_15_sesion5 = nlapiGetField('custevent960').getName();
      var name_campo_16_sesion5 = nlapiGetField('custevent969').getName();
      var name_campo_17_sesion5 = nlapiGetField('custevent951').getName();
      var name_campo_18_sesion5 = nlapiGetField('custevent978').getName();
      var name_campo_19_sesion5 = nlapiGetField('custevent987').getName();
      var name_campo_20_sesion5 = nlapiGetField('custevent996').getName();
      var name_campo_21_sesion5 = nlapiGetField('custevent1005').getName();
      var name_campo_22_sesion5 = nlapiGetField('custevent1014').getName();
      var name_campo_23_sesion5 = nlapiGetField('custevent1060').getName();
      var name_campo_24_sesion5 = nlapiGetField('custevent1073').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 6
      var name_campo_1_sesion6 = nlapiGetField('custevent1024').getName();
      var name_campo_2_sesion6 = nlapiGetField('custevent1042').getName();
      var name_campo_3_sesion6 = nlapiGetField('custevent1033').getName();
      var name_campo_4_sesion6 = nlapiGetField('custevent1051').getName();
      var name_campo_5_sesion6 = nlapiGetField('custevent871').getName();
      var name_campo_6_sesion6 = nlapiGetField('custevent880').getName();
      var name_campo_7_sesion6 = nlapiGetField('custevent862').getName();
      var name_campo_8_sesion6 = nlapiGetField('custevent916').getName();
      var name_campo_9_sesion6 = nlapiGetField('custevent925').getName();
      var name_campo_10_sesion6 = nlapiGetField('custevent934').getName();
      var name_campo_11_sesion6 = nlapiGetField('custevent889').getName();
      var name_campo_12_sesion6 = nlapiGetField('custevent898').getName();
      //var name_campo_13_sesion6 = nlapiGetField('custevent907').getName();
      var name_campo_14_sesion6 = nlapiGetField('custevent943').getName();
      var name_campo_15_sesion6 = nlapiGetField('custevent961').getName();
      var name_campo_16_sesion6 = nlapiGetField('custevent970').getName();
      var name_campo_17_sesion6 = nlapiGetField('custevent952').getName();
      var name_campo_18_sesion6 = nlapiGetField('custevent979').getName();
      var name_campo_19_sesion6 = nlapiGetField('custevent988').getName();
      var name_campo_20_sesion6 = nlapiGetField('custevent997').getName();
      var name_campo_21_sesion6 = nlapiGetField('custevent1006').getName();
      var name_campo_22_sesion6 = nlapiGetField('custevent1015').getName();
      var name_campo_23_sesion6 = nlapiGetField('custevent1061').getName();
      var name_campo_24_sesion6 = nlapiGetField('custevent1074').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 7
      var name_campo_1_sesion7 = nlapiGetField('custevent1025').getName();
      var name_campo_2_sesion7 = nlapiGetField('custevent1043').getName();
      var name_campo_3_sesion7 = nlapiGetField('custevent1034').getName();
      var name_campo_4_sesion7 = nlapiGetField('custevent1052').getName();
      var name_campo_5_sesion7 = nlapiGetField('custevent872').getName();
      var name_campo_6_sesion7 = nlapiGetField('custevent881').getName();
      var name_campo_7_sesion7 = nlapiGetField('custevent863').getName();
      var name_campo_8_sesion7 = nlapiGetField('custevent917').getName();
      var name_campo_9_sesion7 = nlapiGetField('custevent926').getName();
      var name_campo_10_sesion7 = nlapiGetField('custevent935').getName();
      var name_campo_11_sesion7 = nlapiGetField('custevent890').getName();
      var name_campo_12_sesion7 = nlapiGetField('custevent899').getName();
      //var name_campo_13_sesion7 = nlapiGetField('custevent908').getName();
      var name_campo_14_sesion7 = nlapiGetField('custevent944').getName();
      var name_campo_15_sesion7 = nlapiGetField('custevent962').getName();
      var name_campo_16_sesion7 = nlapiGetField('custevent971').getName();
      var name_campo_17_sesion7 = nlapiGetField('custevent953').getName();
      var name_campo_18_sesion7 = nlapiGetField('custevent980').getName();
      var name_campo_19_sesion7 = nlapiGetField('custevent989').getName();
      var name_campo_20_sesion7 = nlapiGetField('custevent998').getName();
      var name_campo_21_sesion7 = nlapiGetField('custevent1007').getName();
      var name_campo_22_sesion7 = nlapiGetField('custevent1016').getName();
      var name_campo_23_sesion7 = nlapiGetField('custevent1062').getName();
      var name_campo_24_sesion7 = nlapiGetField('custevent1075').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 8
      var name_campo_1_sesion8 = nlapiGetField('custevent1026').getName();
      var name_campo_2_sesion8 = nlapiGetField('custevent1044').getName();
      var name_campo_3_sesion8 = nlapiGetField('custevent1035').getName();
      var name_campo_4_sesion8 = nlapiGetField('custevent1053').getName();
      var name_campo_5_sesion8 = nlapiGetField('custevent873').getName();
      var name_campo_6_sesion8 = nlapiGetField('custevent882').getName();
      var name_campo_7_sesion8 = nlapiGetField('custevent864').getName();
      var name_campo_8_sesion8 = nlapiGetField('custevent918').getName();
      var name_campo_9_sesion8 = nlapiGetField('custevent927').getName();
      var name_campo_10_sesion8 = nlapiGetField('custevent936').getName();
      var name_campo_11_sesion8 = nlapiGetField('custevent891').getName();
      var name_campo_12_sesion8 = nlapiGetField('custevent900').getName();
      //var name_campo_13_sesion8 = nlapiGetField('custevent909').getName();
      var name_campo_14_sesion8 = nlapiGetField('custevent945').getName();
      var name_campo_15_sesion8 = nlapiGetField('custevent963').getName();
      var name_campo_16_sesion8 = nlapiGetField('custevent972').getName();
      var name_campo_17_sesion8 = nlapiGetField('custevent954').getName();
      var name_campo_18_sesion8 = nlapiGetField('custevent981').getName();
      var name_campo_19_sesion8 = nlapiGetField('custevent990').getName();
      var name_campo_20_sesion8 = nlapiGetField('custevent999').getName();
      var name_campo_21_sesion8 = nlapiGetField('custevent1008').getName();
      var name_campo_22_sesion8 = nlapiGetField('custevent1017').getName();
      var name_campo_23_sesion8 = nlapiGetField('custevent1063').getName();
      var name_campo_24_sesion8 = nlapiGetField('custevent1076').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 9
      var name_campo_1_sesion9 = nlapiGetField('custevent1027').getName();
      var name_campo_2_sesion9 = nlapiGetField('custevent1045').getName();
      var name_campo_3_sesion9 = nlapiGetField('custevent1036').getName();
      var name_campo_4_sesion9 = nlapiGetField('custevent1054').getName();
      var name_campo_5_sesion9 = nlapiGetField('custevent874').getName();
      var name_campo_6_sesion9 = nlapiGetField('custevent883').getName();
      var name_campo_7_sesion9 = nlapiGetField('custevent865').getName();
      var name_campo_8_sesion9 = nlapiGetField('custevent919').getName();
      var name_campo_9_sesion9 = nlapiGetField('custevent928').getName();
      var name_campo_10_sesion9 = nlapiGetField('custevent937').getName();
      var name_campo_11_sesion9 = nlapiGetField('custevent892').getName();
      var name_campo_12_sesion9 = nlapiGetField('custevent901').getName();
      //var name_campo_13_sesion9 = nlapiGetField('custevent910').getName();
      var name_campo_14_sesion9 = nlapiGetField('custevent946').getName();
      var name_campo_15_sesion9 = nlapiGetField('custevent964').getName();
      var name_campo_16_sesion9 = nlapiGetField('custevent973').getName();
      var name_campo_17_sesion9 = nlapiGetField('custevent955').getName();
      var name_campo_18_sesion9 = nlapiGetField('custevent982').getName();
      var name_campo_19_sesion9 = nlapiGetField('custevent991').getName();
      var name_campo_20_sesion9 = nlapiGetField('custevent1000').getName();
      var name_campo_21_sesion9 = nlapiGetField('custevent1009').getName();
      var name_campo_22_sesion9 = nlapiGetField('custevent1018').getName();
      var name_campo_23_sesion9 = nlapiGetField('custevent1064').getName();
      var name_campo_24_sesion9 = nlapiGetField('custevent1077').getName();
      //NOTE: variables que recuperan el id de campo de la sesion 10
      var name_campo_1_sesion10 = nlapiGetField('custevent1028').getName();
      var name_campo_2_sesion10 = nlapiGetField('custevent1046').getName();
      var name_campo_3_sesion10 = nlapiGetField('custevent1037').getName();
      var name_campo_4_sesion10 = nlapiGetField('custevent1055').getName();
      var name_campo_5_sesion10 = nlapiGetField('custevent875').getName();
      var name_campo_6_sesion10 = nlapiGetField('custevent884').getName();
      var name_campo_7_sesion10 = nlapiGetField('custevent866').getName();
      var name_campo_8_sesion10 = nlapiGetField('custevent920').getName();
      var name_campo_9_sesion10 = nlapiGetField('custevent929').getName();
      var name_campo_10_sesion10 = nlapiGetField('custevent938').getName();
      var name_campo_11_sesion10 = nlapiGetField('custevent893').getName();
      var name_campo_12_sesion10 = nlapiGetField('custevent902').getName();
      //var name_campo_13_sesion10 = nlapiGetField('custevent911').getName();
      var name_campo_14_sesion10 = nlapiGetField('custevent947').getName();
      var name_campo_15_sesion10 = nlapiGetField('custevent965').getName();
      var name_campo_16_sesion10 = nlapiGetField('custevent974').getName();
      var name_campo_17_sesion10 = nlapiGetField('custevent956').getName();
      var name_campo_18_sesion10 = nlapiGetField('custevent983').getName();
      var name_campo_19_sesion10 = nlapiGetField('custevent992').getName();
      var name_campo_20_sesion10 = nlapiGetField('custevent1001').getName();
      var name_campo_21_sesion10 = nlapiGetField('custevent1010').getName();
      var name_campo_22_sesion10 = nlapiGetField('custevent1019').getName();
      var name_campo_23_sesion10 = nlapiGetField('custevent1065').getName();
      var name_campo_24_sesion10 = nlapiGetField('custevent1078').getName();
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 1
      var campo_1_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent648') || null;
      var campo_2_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent649') || null;
      var campo_3_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent650') || null;
      var campo_4_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent651') || null;
      var campo_5_sesion1 = nlapiGetFieldValues('custpage_field_sesion_uno_custevent652') || null;
      var campo_6_sesion1 = nlapiGetFieldValues('custpage_field_sesion_uno_custevent653') || null;
      var campo_7_sesion1 = nlapiGetFieldValues('custpage_field_sesion_uno_custevent654') || null;
      var campo_8_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent506') || null;
      var campo_9_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent507') || null;
      var campo_10_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent541') || null;
      var campo_11_sesion1 = nlapiGetFieldValues('custpage_field_sesion_uno_custevent636') || null;
      var campo_12_sesion1 = nlapiGetFieldValues('custpage_field_sesion_uno_custevent637') || null;
      //var campo_13_sesion1 = nlapiGetFieldValues('custpage_field_sesion_uno_custevent638') || null;
      var campo_14_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent639') || null;
      var campo_15_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent640') || null;
      var campo_16_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent641') || null;
      var campo_17_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent642') || null;
      var campo_18_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent643') || null;
      var campo_19_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent644') || null;
      var campo_20_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent645') || null;
      var campo_21_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent646') || null;
      var campo_22_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent647') || null;
      var campo_23_sesion1 = nlapiGetFieldValue('custpage_field_sesion_uno_custevent1056') || null;
      var campo_24_sesion1 = nlapiGetFieldValue('custevent1069') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 2
      var campo_1_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1020') || null;
      var campo_2_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1038') || null;
      var campo_3_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1029') || null;
      var campo_4_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1047') || null;
      var campo_5_sesion2 = nlapiGetFieldValues('custpage_field_sesion_dos_custevent867') || null;
      var campo_6_sesion2 = nlapiGetFieldValues('custpage_field_sesion_dos_custevent876') || null;
      var campo_7_sesion2 = nlapiGetFieldValues('custpage_field_sesion_dos_custevent858') || null;
      var campo_8_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent912') || null;
      var campo_9_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent921') || null;
      var campo_10_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent930') || null;
      var campo_11_sesion2 = nlapiGetFieldValues('custpage_field_sesion_dos_custevent885') || null;
      var campo_12_sesion2 = nlapiGetFieldValues('custpage_field_sesion_dos_custevent894') || null;
      //var campo_13_sesion2 = nlapiGetFieldValues('custpage_field_sesion_dos_custevent903') || null;
      var campo_14_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent939') || null;
      var campo_15_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent957') || null;
      var campo_16_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent966') || null;
      var campo_17_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent948') || null;
      var campo_18_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent975') || null;
      var campo_19_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent984') || null;
      var campo_20_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent993') || null;
      var campo_21_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1002') || null;
      var campo_22_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1011') || null;
      var campo_23_sesion2 = nlapiGetFieldValue('custpage_field_sesion_dos_custevent1057') || null;
      var campo_24_sesion2 = nlapiGetFieldValue('custevent1070') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 3
      var campo_1_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1021') || null;
      var campo_2_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1039') || null;
      var campo_3_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1030') || null;
      var campo_4_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1048') || null;
      var campo_5_sesion3 = nlapiGetFieldValues('custpage_field_sesion_tres_custevent868') || null;
      var campo_6_sesion3 = nlapiGetFieldValues('custpage_field_sesion_tres_custevent877') || null;
      var campo_7_sesion3 = nlapiGetFieldValues('custpage_field_sesion_tres_custevent859') || null;
      var campo_8_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent913') || null;
      var campo_9_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent922') || null;
      var campo_10_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent931') || null;
      var campo_11_sesion3 = nlapiGetFieldValues('custpage_field_sesion_tres_custevent886') || null;
      var campo_12_sesion3 = nlapiGetFieldValues('custpage_field_sesion_tres_custevent895') || null;
      //var campo_13_sesion3 = nlapiGetFieldValues('custpage_field_sesion_tres_custevent904') || null;
      var campo_14_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent940') || null;
      var campo_15_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent958') || null;
      var campo_16_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent967') || null;
      var campo_17_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent949') || null;
      var campo_18_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent976') || null;
      var campo_19_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent985') || null;
      var campo_20_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent994') || null;
      var campo_21_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1003') || null;
      var campo_22_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1012') || null;
      var campo_23_sesion3 = nlapiGetFieldValue('custpage_field_sesion_tres_custevent1058') || null;
      var campo_24_sesion3 = nlapiGetFieldValue('custevent1071') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 4
      var campo_1_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1022') || null;
      var campo_2_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1040') || null;
      var campo_3_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1031') || null;
      var campo_4_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1049') || null;
      var campo_5_sesion4 = nlapiGetFieldValues('custpage_field_sesion_cuatro_custevent869') || null;
      var campo_6_sesion4 = nlapiGetFieldValues('custpage_field_sesion_cuatro_custevent878') || null;
      var campo_7_sesion4 = nlapiGetFieldValues('custpage_field_sesion_cuatro_custevent860') || null;
      var campo_8_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent914') || null;
      var campo_9_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent923') || null;
      var campo_10_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent932') || null;
      var campo_11_sesion4 = nlapiGetFieldValues('custpage_field_sesion_cuatro_custevent887') || null;
      var campo_12_sesion4 = nlapiGetFieldValues('custpage_field_sesion_cuatro_custevent896') || null;
      //var campo_13_sesion4 = nlapiGetFieldValues('custpage_field_sesion_cuatro_custevent905') || null;
      var campo_14_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent941') || null;
      var campo_15_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent959') || null;
      var campo_16_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent968') || null;
      var campo_17_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent950') || null;
      var campo_18_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent977') || null;
      var campo_19_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent986') || null;
      var campo_20_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent995') || null;
      var campo_21_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1004') || null;
      var campo_22_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1013') || null;
      var campo_23_sesion4 = nlapiGetFieldValue('custpage_field_sesion_cuatro_custevent1059') || null;
      var campo_24_sesion4 = nlapiGetFieldValue('custevent1072') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 5
      var campo_1_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1023') || null;
      var campo_2_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1041') || null;
      var campo_3_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1032') || null;
      var campo_4_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1050') || null;
      var campo_5_sesion5 = nlapiGetFieldValues('custpage_field_sesion_cinco_custevent870') || null;
      var campo_6_sesion5 = nlapiGetFieldValues('custpage_field_sesion_cinco_custevent879') || null;
      var campo_7_sesion5 = nlapiGetFieldValues('custpage_field_sesion_cinco_custevent861') || null;
      var campo_8_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent915') || null;
      var campo_9_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent924') || null;
      var campo_10_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent933') || null;
      var campo_11_sesion5 = nlapiGetFieldValues('custpage_field_sesion_cinco_custevent888') || null;
      var campo_12_sesion5 = nlapiGetFieldValues('custpage_field_sesion_cinco_custevent897') || null;
      //var campo_13_sesion5 = nlapiGetFieldValues('custpage_field_sesion_cinco_custevent906') || null;
      var campo_14_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent942') || null;
      var campo_15_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent960') || null;
      var campo_16_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent969') || null;
      var campo_17_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent951') || null;
      var campo_18_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent978') || null;
      var campo_19_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent987') || null;
      var campo_20_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent996') || null;
      var campo_21_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1005') || null;
      var campo_22_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1014') || null;
      var campo_23_sesion5 = nlapiGetFieldValue('custpage_field_sesion_cinco_custevent1060') || null;
      var campo_24_sesion5 = nlapiGetFieldValue('custevent1073') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 6
      var campo_1_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1024') || null;
      var campo_2_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1042') || null;
      var campo_3_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1033') || null;
      var campo_4_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1051') || null;
      var campo_5_sesion6 = nlapiGetFieldValues('custpage_field_sesion_seis_custevent871') || null;
      var campo_6_sesion6 = nlapiGetFieldValues('custpage_field_sesion_seis_custevent880') || null;
      var campo_7_sesion6 = nlapiGetFieldValues('custpage_field_sesion_seis_custevent862') || null;
      var campo_8_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent916') || null;
      var campo_9_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent925') || null;
      var campo_10_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent934') || null;
      var campo_11_sesion6 = nlapiGetFieldValues('custpage_field_sesion_seis_custevent889') || null;
      var campo_12_sesion6 = nlapiGetFieldValues('custpage_field_sesion_seis_custevent898') || null;
      //var campo_13_sesion6 = nlapiGetFieldValues('custpage_field_sesion_seis_custevent907') || null;
      var campo_14_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent943') || null;
      var campo_15_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent961') || null;
      var campo_16_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent970') || null;
      var campo_17_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent952') || null;
      var campo_18_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent979') || null;
      var campo_19_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent988') || null;
      var campo_20_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent997') || null;
      var campo_21_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1006') || null;
      var campo_22_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1015') || null;
      var campo_23_sesion6 = nlapiGetFieldValue('custpage_field_sesion_seis_custevent1061') || null;
      var campo_24_sesion6 = nlapiGetFieldValue('custevent1074') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 7
      var campo_1_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1025') || null;
      var campo_2_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1043') || null;
      var campo_3_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1034') || null;
      var campo_4_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1052') || null;
      var campo_5_sesion7 = nlapiGetFieldValues('custpage_field_sesion_siete_custevent872') || null;
      var campo_6_sesion7 = nlapiGetFieldValues('custpage_field_sesion_siete_custevent881') || null;
      var campo_7_sesion7 = nlapiGetFieldValues('custpage_field_sesion_siete_custevent863') || null;
      var campo_8_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent917') || null;
      var campo_9_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent926') || null;
      var campo_10_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent935') || null;
      var campo_11_sesion7 = nlapiGetFieldValues('custpage_field_sesion_siete_custevent890') || null;
      var campo_12_sesion7 = nlapiGetFieldValues('custpage_field_sesion_siete_custevent899') || null;
      //var campo_13_sesion7 = nlapiGetFieldValues('custpage_field_sesion_siete_custevent908') || null;
      var campo_14_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent944') || null;
      var campo_15_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent962') || null;
      var campo_16_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent971') || null;
      var campo_17_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent953') || null;
      var campo_18_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent980') || null;
      var campo_19_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent989') || null;
      var campo_20_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent998') || null;
      var campo_21_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1007') || null;
      var campo_22_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1016') || null;
      var campo_23_sesion7 = nlapiGetFieldValue('custpage_field_sesion_siete_custevent1062') || null;
      var campo_24_sesion7 = nlapiGetFieldValue('custevent1075') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 8
      var campo_1_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1026') || null;
      var campo_2_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1044') || null;
      var campo_3_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1035') || null;
      var campo_4_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1053') || null;
      var campo_5_sesion8 = nlapiGetFieldValues('custpage_field_sesion_ocho_custevent873') || null;
      var campo_6_sesion8 = nlapiGetFieldValues('custpage_field_sesion_ocho_custevent882') || null;
      var campo_7_sesion8 = nlapiGetFieldValues('custpage_field_sesion_ocho_custevent864') || null;
      var campo_8_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent918') || null;
      var campo_9_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent927') || null;
      var campo_10_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent936') || null;
      var campo_11_sesion8 = nlapiGetFieldValues('custpage_field_sesion_ocho_custevent891') || null;
      var campo_12_sesion8 = nlapiGetFieldValues('custpage_field_sesion_ocho_custevent900') || null;
      //var campo_13_sesion8 = nlapiGetFieldValues('custpage_field_sesion_ocho_custevent909') || null;
      var campo_14_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent945') || null;
      var campo_15_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent963') || null;
      var campo_16_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent972') || null;
      var campo_17_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent954') || null;
      var campo_18_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent981') || null;
      var campo_19_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent990') || null;
      var campo_20_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent999') || null;
      var campo_21_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1008') || null;
      var campo_22_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1017') || null;
      var campo_23_sesion8 = nlapiGetFieldValue('custpage_field_sesion_ocho_custevent1063') || null;
      var campo_24_sesion8 = nlapiGetFieldValue('custevent1076') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 9
      var campo_1_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1027') || null;
      var campo_2_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1045') || null;
      var campo_3_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1036') || null;
      var campo_4_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1054') || null;
      var campo_5_sesion9 = nlapiGetFieldValues('custpage_field_sesion_nueve_custevent874') || null;
      var campo_6_sesion9 = nlapiGetFieldValues('custpage_field_sesion_nueve_custevent883') || null;
      var campo_7_sesion9 = nlapiGetFieldValues('custpage_field_sesion_nueve_custevent865') || null;
      var campo_8_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent919') || null;
      var campo_9_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent928') || null;
      var campo_10_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent937') || null;
      var campo_11_sesion9 = nlapiGetFieldValues('custpage_field_sesion_nueve_custevent892') || null;
      var campo_12_sesion9 = nlapiGetFieldValues('custpage_field_sesion_nueve_custevent901') || null;
      //var campo_13_sesion9 = nlapiGetFieldValues('custpage_field_sesion_nueve_custevent910') || null;
      var campo_14_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent946') || null;
      var campo_15_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent964') || null;
      var campo_16_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent973') || null;
      var campo_17_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent955') || null;
      var campo_18_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent982') || null;
      var campo_19_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent991') || null;
      var campo_20_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1000') || null;
      var campo_21_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1009') || null;
      var campo_22_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1018') || null;
      var campo_23_sesion9 = nlapiGetFieldValue('custpage_field_sesion_nueve_custevent1064') || null;
      var campo_24_sesion9 = nlapiGetFieldValue('custevent1077') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la sesion 10
      var campo_1_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1028') || null;
      var campo_2_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1046') || null;
      var campo_3_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1037') || null;
      var campo_4_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1055') || null;
      var campo_5_sesion10 = nlapiGetFieldValues('custpage_field_sesion_diez_custevent875') || null;
      var campo_6_sesion10 = nlapiGetFieldValues('custpage_field_sesion_diez_custevent884') || null;
      var campo_7_sesion10 = nlapiGetFieldValues('custpage_field_sesion_diez_custevent866') || null;
      var campo_8_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent920') || null;
      var campo_9_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent929') || null;
      var campo_10_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent938') || null;
      var campo_11_sesion10 = nlapiGetFieldValues('custpage_field_sesion_diez_custevent893') || null;
      var campo_12_sesion10 = nlapiGetFieldValues('custpage_field_sesion_diez_custevent902') || null;
      //var campo_13_sesion10 = nlapiGetFieldValues('custpage_field_sesion_diez_custevent911') || null;
      var campo_14_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent947') || null;
      var campo_15_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent965') || null;
      var campo_16_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent974') || null;
      var campo_17_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent956') || null;
      var campo_18_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent983') || null;
      var campo_19_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent992') || null;
      var campo_20_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1001') || null;
      var campo_21_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1010') || null;
      var campo_22_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1019') || null;
      var campo_23_sesion10 = nlapiGetFieldValue('custpage_field_sesion_diez_custevent1065') || null;
      var campo_24_sesion10 = nlapiGetFieldValue('custevent1078') || null;

      //ACTION: Guarda los campos SESION 1 en el registro
      var sesion1_array_nameFields = [name_campo_1_sesion1, name_campo_2_sesion1, name_campo_3_sesion1, name_campo_4_sesion1, name_campo_5_sesion1, name_campo_6_sesion1, name_campo_7_sesion1, name_campo_8_sesion1, name_campo_9_sesion1, name_campo_10_sesion1, name_campo_11_sesion1, name_campo_12_sesion1, /* name_campo_13_sesion1, */ name_campo_14_sesion1, name_campo_15_sesion1, name_campo_16_sesion1, name_campo_17_sesion1, name_campo_18_sesion1, name_campo_19_sesion1, name_campo_20_sesion1, name_campo_21_sesion1, name_campo_22_sesion1, name_campo_23_sesion1];

      var sesion1_array_valueFields = [campo_1_sesion1, campo_2_sesion1, campo_3_sesion1, campo_4_sesion1, campo_5_sesion1, campo_6_sesion1, campo_7_sesion1, campo_8_sesion1, campo_9_sesion1, campo_10_sesion1, campo_11_sesion1, campo_12_sesion1, /* campo_13_sesion1, */ campo_14_sesion1, campo_15_sesion1, campo_16_sesion1, campo_17_sesion1, campo_18_sesion1, campo_19_sesion1, campo_20_sesion1, campo_21_sesion1, campo_22_sesion1, campo_23_sesion1];

      for (var sUno = 0; sUno < sesion1_array_nameFields.length; sUno++) {
        if (sesion1_array_valueFields[sUno] != null) {
          nlapiSubmitField('supportcase', recId, sesion1_array_nameFields[sUno], sesion1_array_valueFields[sUno]);
        }
      }

      //ACTION: Guarda los campos SESION 2 en el registro
      var sesion2_array_nameFields = [name_campo_1_sesion2, name_campo_2_sesion2, name_campo_3_sesion2, name_campo_4_sesion2, name_campo_5_sesion2, name_campo_6_sesion2, name_campo_7_sesion2, name_campo_8_sesion2, name_campo_9_sesion2, name_campo_10_sesion2, name_campo_11_sesion2, name_campo_12_sesion2, /* name_campo_13_sesion2, */ name_campo_14_sesion2, name_campo_15_sesion2, name_campo_16_sesion2, name_campo_17_sesion2, name_campo_18_sesion2, name_campo_19_sesion2, name_campo_20_sesion2, name_campo_21_sesion2, name_campo_22_sesion2, name_campo_23_sesion2];

      var sesion2_array_valueFields = [campo_1_sesion2, campo_2_sesion2, campo_3_sesion2, campo_4_sesion2, campo_5_sesion2, campo_6_sesion2, campo_7_sesion2, campo_8_sesion2, campo_9_sesion2, campo_10_sesion2, campo_11_sesion2, campo_12_sesion2, /* campo_13_sesion2, */ campo_14_sesion2, campo_15_sesion2, campo_16_sesion2, campo_17_sesion2, campo_18_sesion2, campo_19_sesion2, campo_20_sesion2, campo_21_sesion2, campo_22_sesion2, campo_23_sesion2];

      for (var sDos = 0; sDos < sesion2_array_nameFields.length; sDos++) {
        if (sesion2_array_valueFields[sDos] != null) {
          nlapiSubmitField('supportcase', recId, sesion2_array_nameFields[sDos], sesion2_array_valueFields[sDos]);
        }
      }

      //ACTION: Guarda los campos SESION 3 en el registro
      var sesion3_array_nameFields = [name_campo_1_sesion3, name_campo_2_sesion3, name_campo_3_sesion3, name_campo_4_sesion3, name_campo_5_sesion3, name_campo_6_sesion3, name_campo_7_sesion3, name_campo_8_sesion3, name_campo_9_sesion3, name_campo_10_sesion3, name_campo_11_sesion3, name_campo_12_sesion3, /* name_campo_13_sesion3, */ name_campo_14_sesion3, name_campo_15_sesion3, name_campo_16_sesion3, name_campo_17_sesion3, name_campo_18_sesion3, name_campo_19_sesion3, name_campo_20_sesion3, name_campo_21_sesion3, name_campo_22_sesion3, name_campo_23_sesion3];

      var sesion3_array_valueFields = [campo_1_sesion3, campo_2_sesion3, campo_3_sesion3, campo_4_sesion3, campo_5_sesion3, campo_6_sesion3, campo_7_sesion3, campo_8_sesion3, campo_9_sesion3, campo_10_sesion3, campo_11_sesion3, campo_12_sesion3, /* campo_13_sesion3, */ campo_14_sesion3, campo_15_sesion3, campo_16_sesion3, campo_17_sesion3, campo_18_sesion3, campo_19_sesion3, campo_20_sesion3, campo_21_sesion3, campo_22_sesion3, campo_23_sesion3];

      for (var sTres = 0; sTres < sesion3_array_nameFields.length; sTres++) {
        if (sesion3_array_valueFields[sTres] != null) {
          nlapiSubmitField('supportcase', recId, sesion3_array_nameFields[sTres], sesion3_array_valueFields[sTres]);
        }
      }

      //ACTION: Guarda los campos SESION 4 en el registro
      var sesion4_array_nameFields = [name_campo_1_sesion4, name_campo_2_sesion4, name_campo_3_sesion4, name_campo_4_sesion4, name_campo_5_sesion4, name_campo_6_sesion4, name_campo_7_sesion4, name_campo_8_sesion4, name_campo_9_sesion4, name_campo_10_sesion4, name_campo_11_sesion4, name_campo_12_sesion4, /* name_campo_13_sesion4, */ name_campo_14_sesion4, name_campo_15_sesion4, name_campo_16_sesion4, name_campo_17_sesion4, name_campo_18_sesion4, name_campo_19_sesion4, name_campo_20_sesion4, name_campo_21_sesion4, name_campo_22_sesion4, name_campo_23_sesion4];

      var sesion4_array_valueFields = [campo_1_sesion4, campo_2_sesion4, campo_3_sesion4, campo_4_sesion4, campo_5_sesion4, campo_6_sesion4, campo_7_sesion4, campo_8_sesion4, campo_9_sesion4, campo_10_sesion4, campo_11_sesion4, campo_12_sesion4, /* campo_13_sesion4, */ campo_14_sesion4, campo_15_sesion4, campo_16_sesion4, campo_17_sesion4, campo_18_sesion4, campo_19_sesion4, campo_20_sesion4, campo_21_sesion4, campo_22_sesion4, campo_23_sesion4];

      for (var sCuatro = 0; sCuatro < sesion4_array_nameFields.length; sCuatro++) {
        if (sesion4_array_valueFields[sCuatro] != null) {
          nlapiSubmitField('supportcase', recId, sesion4_array_nameFields[sCuatro], sesion4_array_valueFields[sCuatro]);
        }
      }

      //ACTION: Guarda los campos SESION 5 en el registro
      var sesion5_array_nameFields = [name_campo_1_sesion5, name_campo_2_sesion5, name_campo_3_sesion5, name_campo_4_sesion5, name_campo_5_sesion5, name_campo_6_sesion5, name_campo_7_sesion5, name_campo_8_sesion5, name_campo_9_sesion5, name_campo_10_sesion5, name_campo_11_sesion5, name_campo_12_sesion5, /* name_campo_13_sesion5, */ name_campo_14_sesion5, name_campo_15_sesion5, name_campo_16_sesion5, name_campo_17_sesion5, name_campo_18_sesion5, name_campo_19_sesion5, name_campo_20_sesion5, name_campo_21_sesion5, name_campo_22_sesion5, name_campo_23_sesion5];

      var sesion5_array_valueFields = [campo_1_sesion5, campo_2_sesion5, campo_3_sesion5, campo_4_sesion5, campo_5_sesion5, campo_6_sesion5, campo_7_sesion5, campo_8_sesion5, campo_9_sesion5, campo_10_sesion5, campo_11_sesion5, campo_12_sesion5, /* campo_13_sesion5, */ campo_14_sesion5, campo_15_sesion5, campo_16_sesion5, campo_17_sesion5, campo_18_sesion5, campo_19_sesion5, campo_20_sesion5, campo_21_sesion5, campo_22_sesion5, campo_23_sesion5];

      for (var sCinco = 0; sCinco < sesion5_array_nameFields.length; sCinco++) {
        if (sesion5_array_valueFields[sCinco] != null) {
          nlapiSubmitField('supportcase', recId, sesion5_array_nameFields[sCinco], sesion5_array_valueFields[sCinco]);
        }
      }

      //ACTION: Guarda los campos SESION 6 en el registro
      var sesion6_array_nameFields = [name_campo_1_sesion6, name_campo_2_sesion6, name_campo_3_sesion6, name_campo_4_sesion6, name_campo_5_sesion6, name_campo_6_sesion6, name_campo_7_sesion6, name_campo_8_sesion6, name_campo_9_sesion6, name_campo_10_sesion6, name_campo_11_sesion6, name_campo_12_sesion6, /* name_campo_13_sesion6, */ name_campo_14_sesion6, name_campo_15_sesion6, name_campo_16_sesion6, name_campo_17_sesion6, name_campo_18_sesion6, name_campo_19_sesion6, name_campo_20_sesion6, name_campo_21_sesion6, name_campo_22_sesion6, name_campo_23_sesion6];

      var sesion6_array_valueFields = [campo_1_sesion6, campo_2_sesion6, campo_3_sesion6, campo_4_sesion6, campo_5_sesion6, campo_6_sesion6, campo_7_sesion6, campo_8_sesion6, campo_9_sesion6, campo_10_sesion6, campo_11_sesion6, campo_12_sesion6, /* campo_13_sesion6, */ campo_14_sesion6, campo_15_sesion6, campo_16_sesion6, campo_17_sesion6, campo_18_sesion6, campo_19_sesion6, campo_20_sesion6, campo_21_sesion6, campo_22_sesion6, campo_23_sesion6];

      for (var sSeis = 0; sSeis < sesion6_array_nameFields.length; sSeis++) {
        if (sesion6_array_valueFields[sSeis] != null) {
          nlapiSubmitField('supportcase', recId, sesion6_array_nameFields[sSeis], sesion6_array_valueFields[sSeis]);
        }
      }

      //ACTION: Guarda los campos SESION 7 en el registro
      var sesion7_array_nameFields = [name_campo_1_sesion7, name_campo_2_sesion7, name_campo_3_sesion7, name_campo_4_sesion7, name_campo_5_sesion7, name_campo_6_sesion7, name_campo_7_sesion7, name_campo_8_sesion7, name_campo_9_sesion7, name_campo_10_sesion7, name_campo_11_sesion7, name_campo_12_sesion7, /* name_campo_13_sesion7, */ name_campo_14_sesion7, name_campo_15_sesion7, name_campo_16_sesion7, name_campo_17_sesion7, name_campo_18_sesion7, name_campo_19_sesion7, name_campo_20_sesion7, name_campo_21_sesion7, name_campo_22_sesion7, name_campo_23_sesion7];

      var sesion7_array_valueFields = [campo_1_sesion7, campo_2_sesion7, campo_3_sesion7, campo_4_sesion7, campo_5_sesion7, campo_6_sesion7, campo_7_sesion7, campo_8_sesion7, campo_9_sesion7, campo_10_sesion7, campo_11_sesion7, campo_12_sesion7, /* campo_13_sesion7, */ campo_14_sesion7, campo_15_sesion7, campo_16_sesion7, campo_17_sesion7, campo_18_sesion7, campo_19_sesion7, campo_20_sesion7, campo_21_sesion7, campo_22_sesion7, campo_23_sesion7];

      for (var sSiete = 0; sSiete < sesion7_array_nameFields.length; sSiete++) {
        if (sesion7_array_valueFields[sSiete] != null) {
          nlapiSubmitField('supportcase', recId, sesion7_array_nameFields[sSiete], sesion7_array_valueFields[sSiete]);
        }
      }

      //ACTION: Guarda los campos SESION 8 en el registro
      var sesion8_array_nameFields = [name_campo_1_sesion8, name_campo_2_sesion8, name_campo_3_sesion8, name_campo_4_sesion8, name_campo_5_sesion8, name_campo_6_sesion8, name_campo_7_sesion8, name_campo_8_sesion8, name_campo_9_sesion8, name_campo_10_sesion8, name_campo_11_sesion8, name_campo_12_sesion8, /* name_campo_13_sesion8, */ name_campo_14_sesion8, name_campo_15_sesion8, name_campo_16_sesion8, name_campo_17_sesion8, name_campo_18_sesion8, name_campo_19_sesion8, name_campo_20_sesion8, name_campo_21_sesion8, name_campo_22_sesion8, name_campo_23_sesion8];

      var sesion8_array_valueFields = [campo_1_sesion8, campo_2_sesion8, campo_3_sesion8, campo_4_sesion8, campo_5_sesion8, campo_6_sesion8, campo_7_sesion8, campo_8_sesion8, campo_9_sesion8, campo_10_sesion8, campo_11_sesion8, campo_12_sesion8, /* campo_13_sesion8, */ campo_14_sesion8, campo_15_sesion8, campo_16_sesion8, campo_17_sesion8, campo_18_sesion8, campo_19_sesion8, campo_20_sesion8, campo_21_sesion8, campo_22_sesion8, campo_23_sesion8];

      for (var sOcho = 0; sOcho < sesion8_array_nameFields.length; sOcho++) {
        if (sesion8_array_valueFields[sOcho] != null) {
          nlapiSubmitField('supportcase', recId, sesion8_array_nameFields[sOcho], sesion8_array_valueFields[sOcho]);
        }
      }

      //ACTION: Guarda los campos SESION 9 en el registro
      var sesion9_array_nameFields = [name_campo_1_sesion9, name_campo_2_sesion9, name_campo_3_sesion9, name_campo_4_sesion9, name_campo_5_sesion9, name_campo_6_sesion9, name_campo_7_sesion9, name_campo_8_sesion9, name_campo_9_sesion9, name_campo_10_sesion9, name_campo_11_sesion9, name_campo_12_sesion9, /* name_campo_13_sesion9, */ name_campo_14_sesion9, name_campo_15_sesion9, name_campo_16_sesion9, name_campo_17_sesion9, name_campo_18_sesion9, name_campo_19_sesion9, name_campo_20_sesion9, name_campo_21_sesion9, name_campo_22_sesion9, name_campo_23_sesion9];

      var sesion9_array_valueFields = [campo_1_sesion9, campo_2_sesion9, campo_3_sesion9, campo_4_sesion9, campo_5_sesion9, campo_6_sesion9, campo_7_sesion9, campo_8_sesion9, campo_9_sesion9, campo_10_sesion9, campo_11_sesion9, campo_12_sesion9, /* campo_13_sesion9, */ campo_14_sesion9, campo_15_sesion9, campo_16_sesion9, campo_17_sesion9, campo_18_sesion9, campo_19_sesion9, campo_20_sesion9, campo_21_sesion9, campo_22_sesion9, campo_23_sesion9];

      for (var sNueve = 0; sNueve < sesion9_array_nameFields.length; sNueve++) {
        if (sesion9_array_valueFields[sNueve] != null) {
          nlapiSubmitField('supportcase', recId, sesion9_array_nameFields[sNueve], sesion9_array_valueFields[sNueve]);
        }
      }

      //ACTION: Guarda los campos SESION 10 en el registro
      var sesion10_array_nameFields = [name_campo_1_sesion10, name_campo_2_sesion10, name_campo_3_sesion10, name_campo_4_sesion10, name_campo_5_sesion10, name_campo_6_sesion10, name_campo_7_sesion10, name_campo_8_sesion10, name_campo_9_sesion10, name_campo_10_sesion10, name_campo_11_sesion10, name_campo_12_sesion10, /* name_campo_13_sesion10, */ name_campo_14_sesion10, name_campo_15_sesion10, name_campo_16_sesion10, name_campo_17_sesion10, name_campo_18_sesion10, name_campo_19_sesion10, name_campo_20_sesion10, name_campo_21_sesion10, name_campo_22_sesion10, name_campo_23_sesion10];

      var sesion10_array_valueFields = [campo_1_sesion10, campo_2_sesion10, campo_3_sesion10, campo_4_sesion10, campo_5_sesion10, campo_6_sesion10, campo_7_sesion10, campo_8_sesion10, campo_9_sesion10, campo_10_sesion10, campo_11_sesion10, campo_12_sesion10, /* campo_13_sesion10, */ campo_14_sesion10, campo_15_sesion10, campo_16_sesion10, campo_17_sesion10, campo_18_sesion10, campo_19_sesion10, campo_20_sesion10, campo_21_sesion10, campo_22_sesion10, campo_23_sesion10];

      for (var sDiez = 0; sDiez < sesion10_array_nameFields.length; sDiez++) {
        if (sesion10_array_valueFields[sDiez] != null) {
          nlapiSubmitField('supportcase', recId, sesion10_array_nameFields[sDiez], sesion10_array_valueFields[sDiez]);
        }
      }
    }

    if (formulario == 151) {

      //NOTE: variables que recuperan el id de campo de la complementarios 1
      var name_campo_1_complementarios1 = nlapiGetField('custevent1056').getName();
      var name_campo_2_complementarios1 = nlapiGetField('custevent1080').getName();
      var name_campo_3_complementarios1 = nlapiGetField('custevent1090').getName();
      var name_campo_4_complementarios1 = nlapiGetField('custevent1100').getName();
      var name_campo_5_complementarios1 = nlapiGetField('custevent1110').getName();
      var name_campo_6_complementarios1 = nlapiGetField('custevent1120').getName();
      var name_campo_7_complementarios1 = nlapiGetField('custevent1130').getName();
      var name_campo_8_complementarios1 = nlapiGetField('custevent1140').getName();
      var name_campo_9_complementarios1 = nlapiGetField('custevent1150').getName();
      var name_campo_10_complementarios1 = nlapiGetField('custevent1160').getName();
      var name_campo_11_complementarios1 = nlapiGetField('custevent1170').getName();
      var name_campo_12_complementarios1 = nlapiGetField('custevent650').getName();
      var name_campo_13_complementarios1 = nlapiGetField('custevent649').getName();
      var name_campo_14_complementarios1 = nlapiGetField('custevent651').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 2
      var name_campo_1_complementarios2 = nlapiGetField('custevent1057').getName();
      var name_campo_2_complementarios2 = nlapiGetField('custevent1081').getName();
      var name_campo_3_complementarios2 = nlapiGetField('custevent1091').getName();
      var name_campo_4_complementarios2 = nlapiGetField('custevent1101').getName();
      var name_campo_5_complementarios2 = nlapiGetField('custevent1111').getName();
      var name_campo_6_complementarios2 = nlapiGetField('custevent1121').getName();
      var name_campo_7_complementarios2 = nlapiGetField('custevent1131').getName();
      var name_campo_8_complementarios2 = nlapiGetField('custevent1141').getName();
      var name_campo_9_complementarios2 = nlapiGetField('custevent1151').getName();
      var name_campo_10_complementarios2 = nlapiGetField('custevent1161').getName();
      var name_campo_11_complementarios2 = nlapiGetField('custevent1171').getName();
      var name_campo_12_complementarios2 = nlapiGetField('custevent1029').getName();
      var name_campo_13_complementarios2 = nlapiGetField('custevent1038').getName();
      var name_campo_14_complementarios2 = nlapiGetField('custevent1047').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 3
      var name_campo_1_complementarios3 = nlapiGetField('custevent1058').getName();
      var name_campo_2_complementarios3 = nlapiGetField('custevent1082').getName();
      var name_campo_3_complementarios3 = nlapiGetField('custevent1092').getName();
      var name_campo_4_complementarios3 = nlapiGetField('custevent1102').getName();
      var name_campo_5_complementarios3 = nlapiGetField('custevent1112').getName();
      var name_campo_6_complementarios3 = nlapiGetField('custevent1122').getName();
      var name_campo_7_complementarios3 = nlapiGetField('custevent1132').getName();
      var name_campo_8_complementarios3 = nlapiGetField('custevent1142').getName();
      var name_campo_9_complementarios3 = nlapiGetField('custevent1152').getName();
      var name_campo_10_complementarios3 = nlapiGetField('custevent1162').getName();
      var name_campo_11_complementarios3 = nlapiGetField('custevent1172').getName();
      var name_campo_12_complementarios3 = nlapiGetField('custevent1030').getName();
      var name_campo_13_complementarios3 = nlapiGetField('custevent1039').getName();
      var name_campo_14_complementarios3 = nlapiGetField('custevent1048').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 4
      var name_campo_1_complementarios4 = nlapiGetField('custevent1059').getName();
      var name_campo_2_complementarios4 = nlapiGetField('custevent1083').getName();
      var name_campo_3_complementarios4 = nlapiGetField('custevent1093').getName();
      var name_campo_4_complementarios4 = nlapiGetField('custevent1103').getName();
      var name_campo_5_complementarios4 = nlapiGetField('custevent1113').getName();
      var name_campo_6_complementarios4 = nlapiGetField('custevent1123').getName();
      var name_campo_7_complementarios4 = nlapiGetField('custevent1133').getName();
      var name_campo_8_complementarios4 = nlapiGetField('custevent1143').getName();
      var name_campo_9_complementarios4 = nlapiGetField('custevent1153').getName();
      var name_campo_10_complementarios4 = nlapiGetField('custevent1163').getName();
      var name_campo_11_complementarios4 = nlapiGetField('custevent1173').getName();
      var name_campo_12_complementarios4 = nlapiGetField('custevent1031').getName();
      var name_campo_13_complementarios4 = nlapiGetField('custevent1040').getName();
      var name_campo_14_complementarios4 = nlapiGetField('custevent1049').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 5
      var name_campo_1_complementarios5 = nlapiGetField('custevent1060').getName();
      var name_campo_2_complementarios5 = nlapiGetField('custevent1084').getName();
      var name_campo_3_complementarios5 = nlapiGetField('custevent1094').getName();
      var name_campo_4_complementarios5 = nlapiGetField('custevent1104').getName();
      var name_campo_5_complementarios5 = nlapiGetField('custevent1114').getName();
      var name_campo_6_complementarios5 = nlapiGetField('custevent1124').getName();
      var name_campo_7_complementarios5 = nlapiGetField('custevent1134').getName();
      var name_campo_8_complementarios5 = nlapiGetField('custevent1144').getName();
      var name_campo_9_complementarios5 = nlapiGetField('custevent1154').getName();
      var name_campo_10_complementarios5 = nlapiGetField('custevent1164').getName();
      var name_campo_11_complementarios5 = nlapiGetField('custevent1174').getName();
      var name_campo_12_complementarios5 = nlapiGetField('custevent1032').getName();
      var name_campo_13_complementarios5 = nlapiGetField('custevent1041').getName();
      var name_campo_14_complementarios5 = nlapiGetField('custevent1050').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 6
      var name_campo_1_complementarios6 = nlapiGetField('custevent1061').getName();
      var name_campo_2_complementarios6 = nlapiGetField('custevent1085').getName();
      var name_campo_3_complementarios6 = nlapiGetField('custevent1095').getName();
      var name_campo_4_complementarios6 = nlapiGetField('custevent1105').getName();
      var name_campo_5_complementarios6 = nlapiGetField('custevent1115').getName();
      var name_campo_6_complementarios6 = nlapiGetField('custevent1125').getName();
      var name_campo_7_complementarios6 = nlapiGetField('custevent1135').getName();
      var name_campo_8_complementarios6 = nlapiGetField('custevent1145').getName();
      var name_campo_9_complementarios6 = nlapiGetField('custevent1155').getName();
      var name_campo_10_complementarios6 = nlapiGetField('custevent1165').getName();
      var name_campo_11_complementarios6 = nlapiGetField('custevent1175').getName();
      var name_campo_12_complementarios6 = nlapiGetField('custevent1033').getName();
      var name_campo_13_complementarios6 = nlapiGetField('custevent1042').getName();
      var name_campo_14_complementarios6 = nlapiGetField('custevent1051').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 7
      var name_campo_1_complementarios7 = nlapiGetField('custevent1062').getName();
      var name_campo_2_complementarios7 = nlapiGetField('custevent1086').getName();
      var name_campo_3_complementarios7 = nlapiGetField('custevent1096').getName();
      var name_campo_4_complementarios7 = nlapiGetField('custevent1106').getName();
      var name_campo_5_complementarios7 = nlapiGetField('custevent1116').getName();
      var name_campo_6_complementarios7 = nlapiGetField('custevent1126').getName();
      var name_campo_7_complementarios7 = nlapiGetField('custevent1136').getName();
      var name_campo_8_complementarios7 = nlapiGetField('custevent1146').getName();
      var name_campo_9_complementarios7 = nlapiGetField('custevent1156').getName();
      var name_campo_10_complementarios7 = nlapiGetField('custevent1166').getName();
      var name_campo_11_complementarios7 = nlapiGetField('custevent1176').getName();
      var name_campo_12_complementarios7 = nlapiGetField('custevent1034').getName();
      var name_campo_13_complementarios7 = nlapiGetField('custevent1043').getName();
      var name_campo_14_complementarios7 = nlapiGetField('custevent1052').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 8
      var name_campo_1_complementarios8 = nlapiGetField('custevent1063').getName();
      var name_campo_2_complementarios8 = nlapiGetField('custevent1087').getName();
      var name_campo_3_complementarios8 = nlapiGetField('custevent1097').getName();
      var name_campo_4_complementarios8 = nlapiGetField('custevent1107').getName();
      var name_campo_5_complementarios8 = nlapiGetField('custevent1117').getName();
      var name_campo_6_complementarios8 = nlapiGetField('custevent1127').getName();
      var name_campo_7_complementarios8 = nlapiGetField('custevent1137').getName();
      var name_campo_8_complementarios8 = nlapiGetField('custevent1147').getName();
      var name_campo_9_complementarios8 = nlapiGetField('custevent1157').getName();
      var name_campo_10_complementarios8 = nlapiGetField('custevent1167').getName();
      var name_campo_11_complementarios8 = nlapiGetField('custevent1177').getName();
      var name_campo_12_complementarios8 = nlapiGetField('custevent1035').getName();
      var name_campo_13_complementarios8 = nlapiGetField('custevent1044').getName();
      var name_campo_14_complementarios8 = nlapiGetField('custevent1053').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 9
      var name_campo_1_complementarios9 = nlapiGetField('custevent1064').getName();
      var name_campo_2_complementarios9 = nlapiGetField('custevent1088').getName();
      var name_campo_3_complementarios9 = nlapiGetField('custevent1098').getName();
      var name_campo_4_complementarios9 = nlapiGetField('custevent1108').getName();
      var name_campo_5_complementarios9 = nlapiGetField('custevent1118').getName();
      var name_campo_6_complementarios9 = nlapiGetField('custevent1128').getName();
      var name_campo_7_complementarios9 = nlapiGetField('custevent1138').getName();
      var name_campo_8_complementarios9 = nlapiGetField('custevent1148').getName();
      var name_campo_9_complementarios9 = nlapiGetField('custevent1158').getName();
      var name_campo_10_complementarios9 = nlapiGetField('custevent1168').getName();
      var name_campo_11_complementarios9 = nlapiGetField('custevent1178').getName();
      var name_campo_12_complementarios9 = nlapiGetField('custevent1036').getName();
      var name_campo_13_complementarios9 = nlapiGetField('custevent1045').getName();
      var name_campo_14_complementarios9 = nlapiGetField('custevent1054').getName();
      //NOTE: variables que recuperan el id de campo de la complementarios 10
      var name_campo_1_complementarios10 = nlapiGetField('custevent1065').getName();
      var name_campo_2_complementarios10 = nlapiGetField('custevent1089').getName();
      var name_campo_3_complementarios10 = nlapiGetField('custevent1099').getName();
      var name_campo_4_complementarios10 = nlapiGetField('custevent1109').getName();
      var name_campo_5_complementarios10 = nlapiGetField('custevent1119').getName();
      var name_campo_6_complementarios10 = nlapiGetField('custevent1129').getName();
      var name_campo_7_complementarios10 = nlapiGetField('custevent1139').getName();
      var name_campo_8_complementarios10 = nlapiGetField('custevent1149').getName();
      var name_campo_9_complementarios10 = nlapiGetField('custevent1159').getName();
      var name_campo_10_complementarios10 = nlapiGetField('custevent1169').getName();
      var name_campo_11_complementarios10 = nlapiGetField('custevent1179').getName();
      var name_campo_12_complementarios10 = nlapiGetField('custevent1037').getName();
      var name_campo_13_complementarios10 = nlapiGetField('custevent1046').getName();
      var name_campo_14_complementarios10 = nlapiGetField('custevent1055').getName();
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 1
      var campo_1_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1056') || null;
      var campo_2_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1080') || null;
      var campo_3_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1090') || null;
      var campo_4_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1100') || null;
      var campo_5_complementarios1 = nlapiGetFieldValues('custpage_field_complementarios_uno_custevent1110') || null;
      var campo_6_complementarios1 = nlapiGetFieldValues('custpage_field_complementarios_uno_custevent1120') || null;
      var campo_7_complementarios1 = nlapiGetFieldValues('custpage_field_complementarios_uno_custevent1130') || null;
      var campo_8_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1140') || null;
      var campo_9_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1150') || null;
      var campo_10_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent1160') || null;
      var campo_11_complementarios1 = nlapiGetFieldValues('custpage_field_complementarios_uno_custevent1170') || null;
      var campo_12_complementarios1 = nlapiGetFieldValues('custpage_field_complementarios_uno_custevent650') || null;
      var campo_13_complementarios1 = nlapiGetFieldValues('custpage_field_complementarios_uno_custevent649') || null;
      var campo_14_complementarios1 = nlapiGetFieldValue('custpage_field_complementarios_uno_custevent651') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 2
      var campo_1_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1057') || null;
      var campo_2_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1081') || null;
      var campo_3_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1091') || null;
      var campo_4_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1101') || null;
      var campo_5_complementarios2 = nlapiGetFieldValues('custpage_field_complementarios_dos_custevent1111') || null;
      var campo_6_complementarios2 = nlapiGetFieldValues('custpage_field_complementarios_dos_custevent1121') || null;
      var campo_7_complementarios2 = nlapiGetFieldValues('custpage_field_complementarios_dos_custevent1131') || null;
      var campo_8_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1141') || null;
      var campo_9_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1151') || null;
      var campo_10_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1161') || null;
      var campo_11_complementarios2 = nlapiGetFieldValues('custpage_field_complementarios_dos_custevent1171') || null;
      var campo_12_complementarios2 = nlapiGetFieldValues('custpage_field_complementarios_dos_custevent1029') || null;
      var campo_13_complementarios2 = nlapiGetFieldValues('custpage_field_complementarios_dos_custevent1038') || null;
      var campo_14_complementarios2 = nlapiGetFieldValue('custpage_field_complementarios_dos_custevent1047') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 3
      var campo_1_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1058') || null;
      var campo_2_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1082') || null;
      var campo_3_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1092') || null;
      var campo_4_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1102') || null;
      var campo_5_complementarios3 = nlapiGetFieldValues('custpage_field_complementarios_tres_custevent1112') || null;
      var campo_6_complementarios3 = nlapiGetFieldValues('custpage_field_complementarios_tres_custevent1122') || null;
      var campo_7_complementarios3 = nlapiGetFieldValues('custpage_field_complementarios_tres_custevent1132') || null;
      var campo_8_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1142') || null;
      var campo_9_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1152') || null;
      var campo_10_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1162') || null;
      var campo_11_complementarios3 = nlapiGetFieldValues('custpage_field_complementarios_tres_custevent1172') || null;
      var campo_12_complementarios3 = nlapiGetFieldValues('custpage_field_complementarios_tres_custevent1030') || null;
      var campo_13_complementarios3 = nlapiGetFieldValues('custpage_field_complementarios_tres_custevent1039') || null;
      var campo_14_complementarios3 = nlapiGetFieldValue('custpage_field_complementarios_tres_custevent1048') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 4
      var campo_1_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1059') || null;
      var campo_2_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1083') || null;
      var campo_3_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1093') || null;
      var campo_4_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1103') || null;
      var campo_5_complementarios4 = nlapiGetFieldValues('custpage_field_complementarios_cuatro_custevent1113') || null;
      var campo_6_complementarios4 = nlapiGetFieldValues('custpage_field_complementarios_cuatro_custevent1123') || null;
      var campo_7_complementarios4 = nlapiGetFieldValues('custpage_field_complementarios_cuatro_custevent1133') || null;
      var campo_8_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1143') || null;
      var campo_9_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1153') || null;
      var campo_10_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1163') || null;
      var campo_11_complementarios4 = nlapiGetFieldValues('custpage_field_complementarios_cuatro_custevent1173') || null;
      var campo_12_complementarios4 = nlapiGetFieldValues('custpage_field_complementarios_cuatro_custevent1031') || null;
      var campo_13_complementarios4 = nlapiGetFieldValues('custpage_field_complementarios_cuatro_custevent1040') || null;
      var campo_14_complementarios4 = nlapiGetFieldValue('custpage_field_complementarios_cuatro_custevent1049') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 5
      var campo_1_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1060') || null;
      var campo_2_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1084') || null;
      var campo_3_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1094') || null;
      var campo_4_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1104') || null;
      var campo_5_complementarios5 = nlapiGetFieldValues('custpage_field_complementarios_cinco_custevent1114') || null;
      var campo_6_complementarios5 = nlapiGetFieldValues('custpage_field_complementarios_cinco_custevent1124') || null;
      var campo_7_complementarios5 = nlapiGetFieldValues('custpage_field_complementarios_cinco_custevent1134') || null;
      var campo_8_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1144') || null;
      var campo_9_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1154') || null;
      var campo_10_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1164') || null;
      var campo_11_complementarios5 = nlapiGetFieldValues('custpage_field_complementarios_cinco_custevent1174') || null;
      var campo_12_complementarios5 = nlapiGetFieldValues('custpage_field_complementarios_cinco_custevent1032') || null;
      var campo_13_complementarios5 = nlapiGetFieldValues('custpage_field_complementarios_cinco_custevent1041') || null;
      var campo_14_complementarios5 = nlapiGetFieldValue('custpage_field_complementarios_cinco_custevent1050') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 6
      var campo_1_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1061') || null;
      var campo_2_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1085') || null;
      var campo_3_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1095') || null;
      var campo_4_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1105') || null;
      var campo_5_complementarios6 = nlapiGetFieldValues('custpage_field_complementarios_seis_custevent1115') || null;
      var campo_6_complementarios6 = nlapiGetFieldValues('custpage_field_complementarios_seis_custevent1125') || null;
      var campo_7_complementarios6 = nlapiGetFieldValues('custpage_field_complementarios_seis_custevent1135') || null;
      var campo_8_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1145') || null;
      var campo_9_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1155') || null;
      var campo_10_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1165') || null;
      var campo_11_complementarios6 = nlapiGetFieldValues('custpage_field_complementarios_seis_custevent1175') || null;
      var campo_12_complementarios6 = nlapiGetFieldValues('custpage_field_complementarios_seis_custevent1033') || null;
      var campo_13_complementarios6 = nlapiGetFieldValues('custpage_field_complementarios_seis_custevent1042') || null;
      var campo_14_complementarios6 = nlapiGetFieldValue('custpage_field_complementarios_seis_custevent1051') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 7
      var campo_1_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1062') || null;
      var campo_2_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1086') || null;
      var campo_3_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1096') || null;
      var campo_4_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1106') || null;
      var campo_5_complementarios7 = nlapiGetFieldValues('custpage_field_complementarios_siete_custevent1116') || null;
      var campo_6_complementarios7 = nlapiGetFieldValues('custpage_field_complementarios_siete_custevent1126') || null;
      var campo_7_complementarios7 = nlapiGetFieldValues('custpage_field_complementarios_siete_custevent1136') || null;
      var campo_8_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1146') || null;
      var campo_9_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1156') || null;
      var campo_10_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1166') || null;
      var campo_11_complementarios7 = nlapiGetFieldValues('custpage_field_complementarios_siete_custevent1176') || null;
      var campo_12_complementarios7 = nlapiGetFieldValues('custpage_field_complementarios_siete_custevent1034') || null;
      var campo_13_complementarios7 = nlapiGetFieldValues('custpage_field_complementarios_siete_custevent1043') || null;
      var campo_14_complementarios7 = nlapiGetFieldValue('custpage_field_complementarios_siete_custevent1052') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 8
      var campo_1_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1063') || null;
      var campo_2_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1087') || null;
      var campo_3_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1097') || null;
      var campo_4_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1107') || null;
      var campo_5_complementarios8 = nlapiGetFieldValues('custpage_field_complementarios_ocho_custevent1117') || null;
      var campo_6_complementarios8 = nlapiGetFieldValues('custpage_field_complementarios_ocho_custevent1127') || null;
      var campo_7_complementarios8 = nlapiGetFieldValues('custpage_field_complementarios_ocho_custevent1137') || null;
      var campo_8_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1147') || null;
      var campo_9_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1157') || null;
      var campo_10_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1167') || null;
      var campo_11_complementarios8 = nlapiGetFieldValues('custpage_field_complementarios_ocho_custevent1177') || null;
      var campo_12_complementarios8 = nlapiGetFieldValues('custpage_field_complementarios_ocho_custevent1035') || null;
      var campo_13_complementarios8 = nlapiGetFieldValues('custpage_field_complementarios_ocho_custevent1044') || null;
      var campo_14_complementarios8 = nlapiGetFieldValue('custpage_field_complementarios_ocho_custevent1053') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 9
      var campo_1_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1064') || null;
      var campo_2_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1088') || null;
      var campo_3_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1098') || null;
      var campo_4_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1108') || null;
      var campo_5_complementarios9 = nlapiGetFieldValues('custpage_field_complementarios_nueve_custevent1118') || null;
      var campo_6_complementarios9 = nlapiGetFieldValues('custpage_field_complementarios_nueve_custevent1128') || null;
      var campo_7_complementarios9 = nlapiGetFieldValues('custpage_field_complementarios_nueve_custevent1138') || null;
      var campo_8_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1148') || null;
      var campo_9_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1158') || null;
      var campo_10_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1168') || null;
      var campo_11_complementarios9 = nlapiGetFieldValues('custpage_field_complementarios_nueve_custevent1178') || null;
      var campo_12_complementarios9 = nlapiGetFieldValues('custpage_field_complementarios_nueve_custevent1036') || null;
      var campo_13_complementarios9 = nlapiGetFieldValues('custpage_field_complementarios_nueve_custevent1045') || null;
      var campo_14_complementarios9 = nlapiGetFieldValue('custpage_field_complementarios_nueve_custevent1054') || null;
      //NOTE: variables que recuperan el valor de campos personalizados de la complementarios 10
      var campo_1_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1065') || null;
      var campo_2_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1089') || null;
      var campo_3_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1099') || null;
      var campo_4_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1109') || null;
      var campo_5_complementarios10 = nlapiGetFieldValues('custpage_field_complementarios_diez_custevent1119') || null;
      var campo_6_complementarios10 = nlapiGetFieldValues('custpage_field_complementarios_diez_custevent1129') || null;
      var campo_7_complementarios10 = nlapiGetFieldValues('custpage_field_complementarios_diez_custevent1139') || null;
      var campo_8_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1149') || null;
      var campo_9_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1159') || null;
      var campo_10_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1169') || null;
      var campo_11_complementarios10 = nlapiGetFieldValues('custpage_field_complementarios_diez_custevent1179') || null;
      var campo_12_complementarios10 = nlapiGetFieldValues('custpage_field_complementarios_diez_custevent1037') || null;
      var campo_13_complementarios10 = nlapiGetFieldValues('custpage_field_complementarios_diez_custevent1046') || null;
      var campo_14_complementarios10 = nlapiGetFieldValue('custpage_field_complementarios_diez_custevent1055') || null;

      //ACTION: Guarda los campos complementarios 1 en el registro
      var complementarios1_array_nameFields = [name_campo_1_complementarios1, name_campo_2_complementarios1, name_campo_3_complementarios1, name_campo_4_complementarios1, name_campo_5_complementarios1, name_campo_6_complementarios1, name_campo_7_complementarios1, name_campo_8_complementarios1, name_campo_9_complementarios1, name_campo_10_complementarios1, name_campo_11_complementarios1, name_campo_12_complementarios1, name_campo_13_complementarios1, name_campo_14_complementarios1];

      var complementarios1_array_valueFields = [campo_1_complementarios1, campo_2_complementarios1, campo_3_complementarios1, campo_4_complementarios1, campo_5_complementarios1, campo_6_complementarios1, campo_7_complementarios1, campo_8_complementarios1, campo_9_complementarios1, campo_10_complementarios1, campo_11_complementarios1, campo_12_complementarios1, campo_13_complementarios1, campo_14_complementarios1];

      for (var cUno = 0; cUno < complementarios1_array_nameFields.length; cUno++) {
        if (complementarios1_array_valueFields[cUno] != null) {
          nlapiSubmitField('supportcase', recId, complementarios1_array_nameFields[cUno], complementarios1_array_valueFields[cUno]);
        }
      }

      //ACTION: Guarda los campos complementarios 2 en el registro
      var complementarios2_array_nameFields = [name_campo_1_complementarios2, name_campo_2_complementarios2, name_campo_3_complementarios2, name_campo_4_complementarios2, name_campo_5_complementarios2, name_campo_6_complementarios2, name_campo_7_complementarios2, name_campo_8_complementarios2, name_campo_9_complementarios2, name_campo_10_complementarios2, name_campo_11_complementarios2, name_campo_12_complementarios2, name_campo_13_complementarios2, name_campo_14_complementarios2];

      var complementarios2_array_valueFields = [campo_1_complementarios2, campo_2_complementarios2, campo_3_complementarios2, campo_4_complementarios2, campo_5_complementarios2, campo_6_complementarios2, campo_7_complementarios2, campo_8_complementarios2, campo_9_complementarios2, campo_10_complementarios2, campo_11_complementarios2, campo_12_complementarios2, campo_13_complementarios2, campo_14_complementarios2];

      for (var cDos = 0; cDos < complementarios2_array_nameFields.length; cDos++) {
        if (complementarios2_array_valueFields[cDos] != null) {
          nlapiSubmitField('supportcase', recId, complementarios2_array_nameFields[cDos], complementarios2_array_valueFields[cDos]);
        }
      }

      //ACTION: Guarda los campos complementarios 3 en el registro
      var complementarios3_array_nameFields = [name_campo_1_complementarios3, name_campo_2_complementarios3, name_campo_3_complementarios3, name_campo_4_complementarios3, name_campo_5_complementarios3, name_campo_6_complementarios3, name_campo_7_complementarios3, name_campo_8_complementarios3, name_campo_9_complementarios3, name_campo_10_complementarios3, name_campo_11_complementarios3, name_campo_12_complementarios3, name_campo_13_complementarios3, name_campo_14_complementarios3];

      var complementarios3_array_valueFields = [campo_1_complementarios3, campo_2_complementarios3, campo_3_complementarios3, campo_4_complementarios3, campo_5_complementarios3, campo_6_complementarios3, campo_7_complementarios3, campo_8_complementarios3, campo_9_complementarios3, campo_10_complementarios3, campo_11_complementarios3, campo_12_complementarios3, campo_13_complementarios3, campo_14_complementarios3];

      for (var cTres = 0; cTres < complementarios3_array_nameFields.length; cTres++) {
        if (complementarios3_array_valueFields[cTres] != null) {
          nlapiSubmitField('supportcase', recId, complementarios3_array_nameFields[cTres], complementarios3_array_valueFields[cTres]);
        }
      }

      //ACTION: Guarda los campos complementarios 4 en el registro
      var complementarios4_array_nameFields = [name_campo_1_complementarios4, name_campo_2_complementarios4, name_campo_3_complementarios4, name_campo_4_complementarios4, name_campo_5_complementarios4, name_campo_6_complementarios4, name_campo_7_complementarios4, name_campo_8_complementarios4, name_campo_9_complementarios4, name_campo_10_complementarios4, name_campo_11_complementarios4, name_campo_12_complementarios4, name_campo_13_complementarios4, name_campo_14_complementarios4];

      var complementarios4_array_valueFields = [campo_1_complementarios4, campo_2_complementarios4, campo_3_complementarios4, campo_4_complementarios4, campo_5_complementarios4, campo_6_complementarios4, campo_7_complementarios4, campo_8_complementarios4, campo_9_complementarios4, campo_10_complementarios4, campo_11_complementarios4, campo_12_complementarios4, campo_13_complementarios4, campo_14_complementarios4];

      for (var cCuatro = 0; cCuatro < complementarios4_array_nameFields.length; cCuatro++) {
        if (complementarios4_array_valueFields[cCuatro] != null) {
          nlapiSubmitField('supportcase', recId, complementarios4_array_nameFields[cCuatro], complementarios4_array_valueFields[cCuatro]);
        }
      }

      //ACTION: Guarda los campos complementarios 5 en el registro
      var complementarios5_array_nameFields = [name_campo_1_complementarios5, name_campo_2_complementarios5, name_campo_3_complementarios5, name_campo_4_complementarios5, name_campo_5_complementarios5, name_campo_6_complementarios5, name_campo_7_complementarios5, name_campo_8_complementarios5, name_campo_9_complementarios5, name_campo_10_complementarios5, name_campo_11_complementarios5, name_campo_12_complementarios5, name_campo_13_complementarios5, name_campo_14_complementarios5];

      var complementarios5_array_valueFields = [campo_1_complementarios5, campo_2_complementarios5, campo_3_complementarios5, campo_4_complementarios5, campo_5_complementarios5, campo_6_complementarios5, campo_7_complementarios5, campo_8_complementarios5, campo_9_complementarios5, campo_10_complementarios5, campo_11_complementarios5, campo_12_complementarios5, campo_13_complementarios5, campo_14_complementarios5];

      for (var cCinco = 0; cCinco < complementarios5_array_nameFields.length; cCinco++) {
        if (complementarios5_array_valueFields[cCinco] != null) {
          nlapiSubmitField('supportcase', recId, complementarios5_array_nameFields[cCinco], complementarios5_array_valueFields[cCinco]);
        }
      }

      //ACTION: Guarda los campos complementarios 6 en el registro
      var complementarios6_array_nameFields = [name_campo_1_complementarios6, name_campo_2_complementarios6, name_campo_3_complementarios6, name_campo_4_complementarios6, name_campo_5_complementarios6, name_campo_6_complementarios6, name_campo_7_complementarios6, name_campo_8_complementarios6, name_campo_9_complementarios6, name_campo_10_complementarios6, name_campo_11_complementarios6, name_campo_12_complementarios6, name_campo_13_complementarios6, name_campo_14_complementarios6];

      var complementarios6_array_valueFields = [campo_1_complementarios6, campo_2_complementarios6, campo_3_complementarios6, campo_4_complementarios6, campo_5_complementarios6, campo_6_complementarios6, campo_7_complementarios6, campo_8_complementarios6, campo_9_complementarios6, campo_10_complementarios6, campo_11_complementarios6, campo_12_complementarios6, campo_13_complementarios6, campo_14_complementarios6];

      for (var cSeis = 0; cSeis < complementarios6_array_nameFields.length; cSeis++) {
        if (complementarios6_array_valueFields[cSeis] != null) {
          nlapiSubmitField('supportcase', recId, complementarios6_array_nameFields[cSeis], complementarios6_array_valueFields[cSeis]);
        }
      }

      //ACTION: Guarda los campos complementarios 7 en el registro
      var complementarios7_array_nameFields = [name_campo_1_complementarios7, name_campo_2_complementarios7, name_campo_3_complementarios7, name_campo_4_complementarios7, name_campo_5_complementarios7, name_campo_6_complementarios7, name_campo_7_complementarios7, name_campo_8_complementarios7, name_campo_9_complementarios7, name_campo_10_complementarios7, name_campo_11_complementarios7, name_campo_12_complementarios7, name_campo_13_complementarios7, name_campo_14_complementarios7];

      var complementarios7_array_valueFields = [campo_1_complementarios7, campo_2_complementarios7, campo_3_complementarios7, campo_4_complementarios7, campo_5_complementarios7, campo_6_complementarios7, campo_7_complementarios7, campo_8_complementarios7, campo_9_complementarios7, campo_10_complementarios7, campo_11_complementarios7, campo_12_complementarios7, campo_13_complementarios7, campo_14_complementarios7];

      for (var cSiete = 0; cSiete < complementarios7_array_nameFields.length; cSiete++) {
        if (complementarios7_array_valueFields[cSiete] != null) {
          nlapiSubmitField('supportcase', recId, complementarios7_array_nameFields[cSiete], complementarios7_array_valueFields[cSiete]);
        }
      }

      //ACTION: Guarda los campos complementarios 8 en el registro
      var complementarios8_array_nameFields = [name_campo_1_complementarios8, name_campo_2_complementarios8, name_campo_3_complementarios8, name_campo_4_complementarios8, name_campo_5_complementarios8, name_campo_6_complementarios8, name_campo_7_complementarios8, name_campo_8_complementarios8, name_campo_9_complementarios8, name_campo_10_complementarios8, name_campo_11_complementarios8, name_campo_12_complementarios8, name_campo_13_complementarios8, name_campo_14_complementarios8];

      var complementarios8_array_valueFields = [campo_1_complementarios8, campo_2_complementarios8, campo_3_complementarios8, campo_4_complementarios8, campo_5_complementarios8, campo_6_complementarios8, campo_7_complementarios8, campo_8_complementarios8, campo_9_complementarios8, campo_10_complementarios8, campo_11_complementarios8, campo_12_complementarios8, campo_13_complementarios8, campo_14_complementarios8];

      for (var cOcho = 0; cOcho < complementarios8_array_nameFields.length; cOcho++) {
        if (complementarios8_array_valueFields[cOcho] != null) {
          nlapiSubmitField('supportcase', recId, complementarios8_array_nameFields[cOcho], complementarios8_array_valueFields[cOcho]);
        }
      }

      //ACTION: Guarda los campos complementarios 9 en el registro
      var complementarios9_array_nameFields = [name_campo_1_complementarios9, name_campo_2_complementarios9, name_campo_3_complementarios9, name_campo_4_complementarios9, name_campo_5_complementarios9, name_campo_6_complementarios9, name_campo_7_complementarios9, name_campo_8_complementarios9, name_campo_9_complementarios9, name_campo_10_complementarios9, name_campo_11_complementarios9, name_campo_12_complementarios9, name_campo_13_complementarios9, name_campo_14_complementarios9];

      var complementarios9_array_valueFields = [campo_1_complementarios9, campo_2_complementarios9, campo_3_complementarios9, campo_4_complementarios9, campo_5_complementarios9, campo_6_complementarios9, campo_7_complementarios9, campo_8_complementarios9, campo_9_complementarios9, campo_10_complementarios9, campo_11_complementarios9, campo_12_complementarios9, campo_13_complementarios9, campo_14_complementarios9];

      for (var cNueve = 0; cNueve < complementarios9_array_nameFields.length; cNueve++) {
        if (complementarios9_array_valueFields[cNueve] != null) {
          nlapiSubmitField('supportcase', recId, complementarios9_array_nameFields[cNueve], complementarios9_array_valueFields[cNueve]);
        }
      }

      //ACTION: Guarda los campos complementarios 10 en el registro
      var complementarios10_array_nameFields = [name_campo_1_complementarios10, name_campo_2_complementarios10, name_campo_3_complementarios10, name_campo_4_complementarios10, name_campo_5_complementarios10, name_campo_6_complementarios10, name_campo_7_complementarios10, name_campo_8_complementarios10, name_campo_9_complementarios10, name_campo_10_complementarios10, name_campo_11_complementarios10, name_campo_12_complementarios10, name_campo_13_complementarios10, name_campo_14_complementarios10];

      var complementarios10_array_valueFields = [campo_1_complementarios10, campo_2_complementarios10, campo_3_complementarios10, campo_4_complementarios10, campo_5_complementarios10, campo_6_complementarios10, campo_7_complementarios10, campo_8_complementarios10, campo_9_complementarios10, campo_10_complementarios10, campo_11_complementarios10, campo_12_complementarios10, campo_13_complementarios10, campo_14_complementarios10];

      for (var cDiez = 0; cDiez < complementarios10_array_nameFields.length; cDiez++) {
        if (complementarios10_array_valueFields[cDiez] != null) {
          nlapiSubmitField('supportcase', recId, complementarios10_array_nameFields[cDiez], complementarios10_array_valueFields[cDiez]);
        }
      }
    }
  }
}

/**
 * 
 * @param {string} date Contiene una fecha de tipo cadena con el formato dd/mm/YYYY
 */
function blockFieldsTroughtDay(date, limit) {
  var objectdate = new Date();
  var today = objectdate.getDate() + '/' + (objectdate.getMonth() + 1) + '/' + objectdate.getFullYear();
  var fechaHoy = today.toString();
  var fechaSesion;
  var response = 'false';

  if (limit == null) {
    limit = 1;
  } else {
    limit = limit;
  }

  if (date == null) {
    fechaSesion = fechaHoy;
  } else {
    fechaSesion = date;
  }

  var fdate = fechaSesion.length;
  var ftoday = fechaHoy.length;

  //extraer dia, mes y año del caso analizado
  separador = fechaSesion.search('/');
  var diaSesion = fechaSesion.substring(0, separador);
  fechaSesion = fechaSesion.substring(separador + 1, fdate);
  fdate = fechaSesion.length;
  separador = fechaSesion.search('/');
  var mesSesion = fechaSesion.substring(0, separador);
  fechaSesion = fechaSesion.substring(separador + 1, fdate);
  var anioSesion = fechaSesion.substring(0, 4);

  //extraer dia, mes y año de la fecha de nacimiento del paciente
  separador = fechaHoy.search('/');
  var diaHoy = fechaHoy.substring(0, separador);
  fechaHoy = fechaHoy.substring(separador + 1, ftoday);
  ftoday = fechaHoy.length;
  separador = fechaHoy.search('/');
  var mesHoy = fechaHoy.substring(0, separador);
  fechaHoy = fechaHoy.substring(separador + 1, ftoday);
  var anioHoy = fechaHoy.substring(0, 4);

  //calculo de las variables para obtener los días transcurridos entre ambas fechas
  var intDiasHoy = (parseInt(anioHoy) * 365.25) + (parseInt(mesHoy) * 30) + (parseInt(diaHoy) * 1);
  var intDiasSesion = (parseInt(anioSesion) * 365.25) + (parseInt(mesSesion) * 30) + (parseInt(diaSesion) * 1);

  var diasTranscurridos = intDiasHoy - intDiasSesion;
  //nlapiLogExecution('DEBUG','Dias dif func',diasTranscurridos);
  if (diasTranscurridos > limit) {
    nlapiLogExecution('DEBUG', 'Verdadero', date);
    response = 'true';
    return response;
  } else {
    nlapiLogExecution('DEBUG', 'Falso', date);
    return response;
  }
}