/**
 * BEFORELOAD
 * @param {object} type object Type
 * @param {object} form object Form
 */

function beforeLoad(type, form) {

    //ACTION: MAIN BEFORELOAD -> create custom fields in frontend and load the values from backend fields in custom fields
    var customform = null;
    if (type == 'view' || type == 'quickview' || type == 'edit') {
        var recId = nlapiGetRecordId(); // id current record
        var record = nlapiLoadRecord('supportcase', recId); // load record supportcase with their id and retunr object record
        customform = record.getFieldValue('customform'); // Id custom form
        companyText = record.getFieldValue('company'); // Text id company
        var role = nlapiGetRole();
        var user = nlapiGetUser();

        // Id custom form -> 14 -> 'PROCEDIMIENTO MICROINJERTO'
        if (customform == 14 || customform == 148) {
            //nlapiLogExecution('DEBUG', 'Formulario', 'Id Form Edit and View: ' + idFormEditAndView + ' Id Form Create: ' + idFomrCreate);
            //ACTION: CREATE tab 'Revisiones'
            var tabSesiones = form.addTab('custpage_revisiones_injerto', 'Revisiones');
            form.insertTab(tabSesiones, 'interactions');

            //VARIABLES: get the label fields from filed objects in backend netsuite
            var etiqueta_campo_lav_24h = nlapiGetField('custevent138').getLabel();
            var etiqueta_campo_tx_24h = nlapiGetField('custevent140').getLabel();
            var etiqueta_campo_resp_24h = nlapiGetField('custevent141').getLabel();
            var etiqueta_campo_nota_24h = nlapiGetField('custevent139').getLabel();
            var etiqueta_campo_lav_10d = nlapiGetField('custevent142').getLabel();
            var etiqueta_campo_tx_10d = nlapiGetField('custevent144').getLabel();
            var etiqueta_campo_resp_10d = nlapiGetField('custevent145').getLabel();
            var etiqueta_campo_nota_10d = nlapiGetField('custevent143').getLabel();
            var etiqueta_campo_lav_1m = nlapiGetField('custevent146').getLabel();
            var etiqueta_campo_tx_1m = nlapiGetField('custevent148').getLabel();
            var etiqueta_campo_resp_1m = nlapiGetField('custevent149').getLabel();
            var etiqueta_campo_nota_1m = nlapiGetField('custevent147').getLabel();
            var etiqueta_campo_lav_2m = nlapiGetField('custevent811').getLabel();
            var etiqueta_campo_tx_2m = nlapiGetField('custevent813').getLabel();
            var etiqueta_campo_resp_2m = nlapiGetField('custevent814').getLabel();
            var etiqueta_campo_nota_2m = nlapiGetField('custevent812').getLabel();
            var etiqueta_campo_lav_3m = nlapiGetField('custevent150').getLabel();
            var etiqueta_campo_tx_3m = nlapiGetField('custevent152').getLabel();
            var etiqueta_campo_resp_3m = nlapiGetField('custevent153').getLabel();
            var etiqueta_campo_nota_3m = nlapiGetField('custevent151').getLabel();
            var etiqueta_campo_lav_4m = nlapiGetField('custevent815').getLabel();
            var etiqueta_campo_tx_4m = nlapiGetField('custevent817').getLabel();
            var etiqueta_campo_resp_4m = nlapiGetField('custevent818').getLabel();
            var etiqueta_campo_nota_4m = nlapiGetField('custevent816').getLabel();
            var etiqueta_campo_lav_5m = nlapiGetField('custevent154').getLabel();
            var etiqueta_campo_tx_5m = nlapiGetField('custevent156').getLabel();
            var etiqueta_campo_resp_5m = nlapiGetField('custevent157').getLabel();
            var etiqueta_campo_nota_5m = nlapiGetField('custevent155').getLabel();
            var etiqueta_campo_lav_6m = nlapiGetField('custevent819').getLabel();
            var etiqueta_campo_tx_6m = nlapiGetField('custevent821').getLabel();
            var etiqueta_campo_resp_6m = nlapiGetField('custevent822').getLabel();
            var etiqueta_campo_nota_6m = nlapiGetField('custevent820').getLabel();
            var etiqueta_campo_lav_7m = nlapiGetField('custevent158').getLabel();
            var etiqueta_campo_tx_7m = nlapiGetField('custevent160').getLabel();
            var etiqueta_campo_resp_7m = nlapiGetField('custevent163').getLabel();
            var etiqueta_campo_nota_7m = nlapiGetField('custevent159').getLabel();
            var etiqueta_campo_lav_8m = nlapiGetField('custevent823').getLabel();
            var etiqueta_campo_tx_8m = nlapiGetField('custevent835').getLabel();
            var etiqueta_campo_resp_8m = nlapiGetField('custevent830').getLabel();
            var etiqueta_campo_nota_8m = nlapiGetField('custevent826').getLabel();
            var etiqueta_campo_lav_9m = nlapiGetField('custevent164').getLabel();
            var etiqueta_campo_tx_9m = nlapiGetField('custevent166').getLabel();
            var etiqueta_campo_resp_9m = nlapiGetField('custevent167').getLabel();
            var etiqueta_campo_nota_9m = nlapiGetField('custevent165').getLabel();
            var etiqueta_campo_lav_10m = nlapiGetField('custevent824').getLabel();
            var etiqueta_campo_tx_10m = nlapiGetField('custevent834').getLabel();
            var etiqueta_campo_resp_10m = nlapiGetField('custevent831').getLabel();
            var etiqueta_campo_nota_10m = nlapiGetField('custevent827').getLabel();
            var etiqueta_campo_lav_11m = nlapiGetField('custevent825').getLabel();
            var etiqueta_campo_tx_11m = nlapiGetField('custevent838').getLabel();
            var etiqueta_campo_resp_11m = nlapiGetField('custevent832').getLabel();
            var etiqueta_campo_nota_11m = nlapiGetField('custevent828').getLabel();
            var etiqueta_campo_lav_12m = nlapiGetField('custevent168').getLabel();
            var etiqueta_campo_tx_12m = nlapiGetField('custevent170').getLabel();
            var etiqueta_campo_resp_12m = nlapiGetField('custevent171').getLabel();
            var etiqueta_campo_nota_12m = nlapiGetField('custevent169').getLabel();
            var etiqueta_campo_lav_13m = nlapiGetField('custevent836').getLabel();
            var etiqueta_campo_tx_13m = nlapiGetField('custevent833').getLabel();
            var etiqueta_campo_resp_13m = nlapiGetField('custevent837').getLabel();
            var etiqueta_campo_nota_13m = nlapiGetField('custevent829').getLabel();
            var etiqueta_campo_lav_14m = nlapiGetField('custevent172').getLabel();
            var etiqueta_campo_tx_14m = nlapiGetField('custevent174').getLabel();
            var etiqueta_campo_resp_14m = nlapiGetField('custevent175').getLabel();
            var etiqueta_campo_nota_14m = nlapiGetField('custevent173').getLabel();

            //VARIABLES: get the field values from backend netsuite
            var campo_lav_24h = nlapiGetFieldValue('custevent138');
            var campo_tx_24h = nlapiGetFieldValue('custevent140');
            var campo_resp_24h = nlapiGetFieldValue('custevent141');
            var campo_nota_24h = nlapiGetFieldValue('custevent139');
            var campo_lav_10d = nlapiGetFieldValue('custevent142');
            var campo_tx_10d = nlapiGetFieldValue('custevent144');
            var campo_resp_10d = nlapiGetFieldValue('custevent145');
            var campo_nota_10d = nlapiGetFieldValue('custevent143');
            var campo_lav_1m = nlapiGetFieldValue('custevent146');
            var campo_tx_1m = nlapiGetFieldValue('custevent148');
            var campo_resp_1m = nlapiGetFieldValue('custevent149');
            var campo_nota_1m = nlapiGetFieldValue('custevent147');
            var campo_lav_2m = nlapiGetFieldValue('custevent811');
            var campo_tx_2m = nlapiGetFieldValue('custevent813');
            var campo_resp_2m = nlapiGetFieldValue('custevent814');
            var campo_nota_2m = nlapiGetFieldValue('custevent812');
            var campo_lav_3m = nlapiGetFieldValue('custevent150');
            var campo_tx_3m = nlapiGetFieldValue('custevent152');
            var campo_resp_3m = nlapiGetFieldValue('custevent153');
            var campo_nota_3m = nlapiGetFieldValue('custevent151');
            var campo_lav_4m = nlapiGetFieldValue('custevent815');
            var campo_tx_4m = nlapiGetFieldValue('custevent817');
            var campo_resp_4m = nlapiGetFieldValue('custevent818');
            var campo_nota_4m = nlapiGetFieldValue('custevent816');
            var campo_lav_5m = nlapiGetFieldValue('custevent154');
            var campo_tx_5m = nlapiGetFieldValue('custevent156');
            var campo_resp_5m = nlapiGetFieldValue('custevent157');
            var campo_nota_5m = nlapiGetFieldValue('custevent155');
            var campo_lav_6m = nlapiGetFieldValue('custevent819');
            var campo_tx_6m = nlapiGetFieldValue('custevent821');
            var campo_resp_6m = nlapiGetFieldValue('custevent822');
            var campo_nota_6m = nlapiGetFieldValue('custevent820');
            var campo_lav_7m = nlapiGetFieldValue('custevent158');
            var campo_tx_7m = nlapiGetFieldValue('custevent160');
            var campo_resp_7m = nlapiGetFieldValue('custevent163');
            var campo_nota_7m = nlapiGetFieldValue('custevent159');
            var campo_lav_8m = nlapiGetFieldValue('custevent823');
            var campo_tx_8m = nlapiGetFieldValue('custevent835');
            var campo_resp_8m = nlapiGetFieldValue('custevent830');
            var campo_nota_8m = nlapiGetFieldValue('custevent826');
            var campo_lav_9m = nlapiGetFieldValue('custevent164');
            var campo_tx_9m = nlapiGetFieldValue('custevent166');
            var campo_resp_9m = nlapiGetFieldValue('custevent167');
            var campo_nota_9m = nlapiGetFieldValue('custevent165');
            var campo_lav_10m = nlapiGetFieldValue('custevent824');
            var campo_tx_10m = nlapiGetFieldValue('custevent834');
            var campo_resp_10m = nlapiGetFieldValue('custevent831');
            var campo_nota_10m = nlapiGetFieldValue('custevent827');
            var campo_lav_11m = nlapiGetFieldValue('custevent825');
            var campo_tx_11m = nlapiGetFieldValue('custevent838');
            var campo_resp_11m = nlapiGetFieldValue('custevent832');
            var campo_nota_11m = nlapiGetFieldValue('custevent828');
            var campo_lav_12m = nlapiGetFieldValue('custevent168');
            var campo_tx_12m = nlapiGetFieldValue('custevent170');
            var campo_resp_12m = nlapiGetFieldValue('custevent171');
            var campo_nota_12m = nlapiGetFieldValue('custevent169');
            var campo_lav_13m = nlapiGetFieldValue('custevent836');
            var campo_tx_13m = nlapiGetFieldValue('custevent833');
            var campo_resp_13m = nlapiGetFieldValue('custevent837');
            var campo_nota_13m = nlapiGetFieldValue('custevent829');
            var campo_lav_14m = nlapiGetFieldValue('custevent172');
            var campo_tx_14m = nlapiGetFieldValue('custevent174');
            var campo_resp_14m = nlapiGetFieldValue('custevent175');
            var campo_nota_14m = nlapiGetFieldValue('custevent173');

            //ACTION: Create custom groups
            form.addFieldGroup('group_24h', 'Lavadado de 24 Horas', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_10d', 'Revisión de 10 días', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_1m', 'Revisión de 1 Mes', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_2m', 'Revisión de 2 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_3m', 'Revisión de 3 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_4m', 'Revisión de 4 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_5m', 'Revisión de 5 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_6m', 'Revisión de 6 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_7m', 'Revisión de 7 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_8m', 'Revisión de 8 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_9m', 'Revisión de 9 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_10m', 'Revisión de 10 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_11m', 'Revisión de 11 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_12m', 'Revisión de 12 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_13m', 'Revisión de 13 Meses', 'custpage_revisiones_injerto');
            form.addFieldGroup('group_14m', 'Revisión de 14 Meses', 'custpage_revisiones_injerto');

            //NOTE: button that redirect to suitlet that let load review images and save it in cabinet
            var button_load_reviewImages_openStatement = '<button id="printIamges" name="printImages" style="margin:2px;" class="btn btn-primary" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.loadimagesReviews(';
            var button_load_reviewImages_closeStatement = ');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><b>Tomar fotografías de revisión</b></button>';

            //NOTE: button that redirect to suitelet that let visulize the review images
            var button_view_reviewImages_openStatement = '<button id="printIamges" name="printImages" style="margin:2px;" class="btn btn-primary" onclick="var rConfig = JSON.parse( \'{}\' ) ; rConfig[\'context\'] = \'/SuiteScripts/cs_DiagnosticoCorporal\'; var entryPointRequire = require.config(rConfig); entryPointRequire([\'/SuiteScripts/cs_DiagnosticoCorporal\'], function(mod){ try{ if (!!window) { var origScriptIdForLogging = window.NLScriptIdForLogging; var origDeploymentIdForLogging = window.NLDeploymentIdForLogging; window.NLScriptIdForLogging = \'customscript1179\'; window.NLDeploymentIdForLogging = \'customdeploy1\'; }mod.viewimagesReviews(';
            var button_view_reviewImages_closeStatement = ');}finally{ if (!!window) { window.NLScriptIdForLogging = origScriptIdForLogging; window.NLDeploymentIdForLogging = origDeploymentIdForLogging; }} }); return false;"><b>Ver fotografías</b></button>';

            //ACTION: Create custom fields
            form.addField('custpage_campo_lav_24h', 'date', etiqueta_campo_lav_24h, null, 'group_24h');
            form.addField('custpage_campo_tx_24h', 'longtext', etiqueta_campo_tx_24h, null, 'group_24h');
            form.addField('custpage_campo_resp_24h', 'textarea', etiqueta_campo_resp_24h, null, 'group_24h');
            form.addField('custpage_campo_nota_24h', 'longtext', etiqueta_campo_nota_24h, null, 'group_24h');
            form.addField('custpage_campo_lav_10d', 'date', etiqueta_campo_lav_10d, null, 'group_10d');
            form.addField('custpage_campo_tx_10d', 'longtext', etiqueta_campo_tx_10d, null, 'group_10d');
            form.addField('custpage_campo_resp_10d', 'textarea', etiqueta_campo_resp_10d, null, 'group_10d');
            form.addField('custpage_campo_nota_10d', 'longtext', etiqueta_campo_nota_10d, null, 'group_10d');
            form.addField('custpage_campo_lav_1m', 'date', etiqueta_campo_lav_1m, null, 'group_1m');
            form.addField('custpage_campo_tx_1m', 'longtext', etiqueta_campo_tx_1m, null, 'group_1m');
            form.addField('custpage_campo_resp_1m', 'textarea', etiqueta_campo_resp_1m, null, 'group_1m');
            form.addField('custpage_campo_nota_1m', 'longtext', etiqueta_campo_nota_1m, null, 'group_1m');
            form.addField('custpage_campo_lav_2m', 'date', etiqueta_campo_lav_2m, null, 'group_2m');
            form.addField('custpage_campo_tx_2m', 'longtext', etiqueta_campo_tx_2m, null, 'group_2m');
            form.addField('custpage_campo_resp_2m', 'textarea', etiqueta_campo_resp_2m, null, 'group_2m');
            form.addField('custpage_campo_nota_2m', 'longtext', etiqueta_campo_nota_2m, null, 'group_2m');
            form.addField('custpage_campo_lav_3m', 'date', etiqueta_campo_lav_3m, null, 'group_3m');
            form.addField('custpage_campo_tx_3m', 'longtext', etiqueta_campo_tx_3m, null, 'group_3m');
            form.addField('custpage_campo_resp_3m', 'textarea', etiqueta_campo_resp_3m, null, 'group_3m');
            form.addField('custpage_campo_nota_3m', 'longtext', etiqueta_campo_nota_3m, null, 'group_3m');
            form.addField('custpage_campo_lav_4m', 'date', etiqueta_campo_lav_4m, null, 'group_4m');
            form.addField('custpage_campo_tx_4m', 'longtext', etiqueta_campo_tx_4m, null, 'group_4m');
            form.addField('custpage_campo_resp_4m', 'textarea', etiqueta_campo_resp_4m, null, 'group_4m');
            form.addField('custpage_campo_nota_4m', 'longtext', etiqueta_campo_nota_4m, null, 'group_4m');
            form.addField('custpage_campo_lav_5m', 'date', etiqueta_campo_lav_5m, null, 'group_5m');
            form.addField('custpage_campo_tx_5m', 'longtext', etiqueta_campo_tx_5m, null, 'group_5m');
            form.addField('custpage_campo_resp_5m', 'textarea', etiqueta_campo_resp_5m, null, 'group_5m');
            form.addField('custpage_campo_nota_5m', 'longtext', etiqueta_campo_nota_5m, null, 'group_5m');
            form.addField('custpage_campo_lav_6m', 'date', etiqueta_campo_lav_6m, null, 'group_6m');
            form.addField('custpage_campo_tx_6m', 'longtext', etiqueta_campo_tx_6m, null, 'group_6m');
            form.addField('custpage_campo_resp_6m', 'textarea', etiqueta_campo_resp_6m, null, 'group_6m');
            form.addField('custpage_campo_nota_6m', 'longtext', etiqueta_campo_nota_6m, null, 'group_6m');
            form.addField('custpage_campo_lav_7m', 'date', etiqueta_campo_lav_7m, null, 'group_7m');
            form.addField('custpage_campo_tx_7m', 'longtext', etiqueta_campo_tx_7m, null, 'group_7m');
            form.addField('custpage_campo_resp_7m', 'textarea', etiqueta_campo_resp_7m, null, 'group_7m');
            form.addField('custpage_campo_nota_7m', 'longtext', etiqueta_campo_nota_7m, null, 'group_7m');
            form.addField('custpage_campo_lav_8m', 'date', etiqueta_campo_lav_8m, null, 'group_8m');
            form.addField('custpage_campo_tx_8m', 'longtext', etiqueta_campo_tx_8m, null, 'group_8m');
            form.addField('custpage_campo_resp_8m', 'textarea', etiqueta_campo_resp_8m, null, 'group_8m');
            form.addField('custpage_campo_nota_8m', 'longtext', etiqueta_campo_nota_8m, null, 'group_8m');
            form.addField('custpage_campo_lav_9m', 'date', etiqueta_campo_lav_9m, null, 'group_9m');
            form.addField('custpage_campo_tx_9m', 'longtext', etiqueta_campo_tx_9m, null, 'group_9m');
            form.addField('custpage_campo_resp_9m', 'textarea', etiqueta_campo_resp_9m, null, 'group_9m');
            form.addField('custpage_campo_nota_9m', 'longtext', etiqueta_campo_nota_9m, null, 'group_9m');
            form.addField('custpage_campo_lav_10m', 'date', etiqueta_campo_lav_10m, null, 'group_10m');
            form.addField('custpage_campo_tx_10m', 'longtext', etiqueta_campo_tx_10m, null, 'group_10m');
            form.addField('custpage_campo_resp_10m', 'textarea', etiqueta_campo_resp_10m, null, 'group_10m');
            form.addField('custpage_campo_nota_10m', 'longtext', etiqueta_campo_nota_10m, null, 'group_10m');
            form.addField('custpage_campo_lav_11m', 'date', etiqueta_campo_lav_11m, null, 'group_11m');
            form.addField('custpage_campo_tx_11m', 'longtext', etiqueta_campo_tx_11m, null, 'group_11m');
            form.addField('custpage_campo_resp_11m', 'textarea', etiqueta_campo_resp_11m, null, 'group_11m');
            form.addField('custpage_campo_nota_11m', 'longtext', etiqueta_campo_nota_11m, null, 'group_11m');
            form.addField('custpage_campo_lav_12m', 'date', etiqueta_campo_lav_12m, null, 'group_12m');
            form.addField('custpage_campo_tx_12m', 'longtext', etiqueta_campo_tx_12m, null, 'group_12m');
            form.addField('custpage_campo_resp_12m', 'textarea', etiqueta_campo_resp_12m, null, 'group_12m');
            form.addField('custpage_campo_nota_12m', 'longtext', etiqueta_campo_nota_12m, null, 'group_12m');
            form.addField('custpage_campo_lav_13m', 'date', etiqueta_campo_lav_13m, null, 'group_13m');
            form.addField('custpage_campo_tx_13m', 'longtext', etiqueta_campo_tx_13m, null, 'group_13m');
            form.addField('custpage_campo_resp_13m', 'textarea', etiqueta_campo_resp_13m, null, 'group_13m');
            form.addField('custpage_campo_nota_13m', 'longtext', etiqueta_campo_nota_13m, null, 'group_13m');
            form.addField('custpage_campo_lav_14m', 'date', etiqueta_campo_lav_14m, null, 'group_14m');
            form.addField('custpage_campo_tx_14m', 'longtext', etiqueta_campo_tx_14m, null, 'group_14m');
            form.addField('custpage_campo_resp_14m', 'textarea', etiqueta_campo_resp_14m, null, 'group_14m');
            form.addField('custpage_campo_nota_14m', 'longtext', etiqueta_campo_nota_14m, null, 'group_14m');

            //ACTION: Create the button to load images in edit view
            if (type == 'view' && (role == 1102 || role == 1111 || role == 1174 || role == 1124 || role == 1196 || role == 1126 || role == 1129 || role == 3 || user == 123405 || role == 1117 || role == 1098 || role == 1195 || role == 1125 || role == 1128 || role == 1187)) {
                form.addField('custpage_button_24h_load', 'inlinehtml', '', null, 'group_24h').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 1 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_10d_load', 'inlinehtml', '', null, 'group_10d').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 2 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_1m_load', 'inlinehtml', '', null, 'group_1m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 3 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_2m_load', 'inlinehtml', '', null, 'group_2m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 4 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_3m_load', 'inlinehtml', '', null, 'group_3m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 5 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_4m_load', 'inlinehtml', '', null, 'group_4m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 6 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_5m_load', 'inlinehtml', '', null, 'group_5m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 7 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_6m_load', 'inlinehtml', '', null, 'group_6m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 8 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_7m_load', 'inlinehtml', '', null, 'group_7m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 9 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_8m_load', 'inlinehtml', '', null, 'group_8m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 10 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_9m_load', 'inlinehtml', '', null, 'group_9m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 11 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_10m_load', 'inlinehtml', '', null, 'group_10m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 12 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_11m_load', 'inlinehtml', '', null, 'group_11m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 13 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_12m_load', 'inlinehtml', '', null, 'group_12m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 14 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_13m_load', 'inlinehtml', '', null, 'group_13m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 15 + button_load_reviewImages_closeStatement);
                form.addField('custpage_button_14m_load', 'inlinehtml', '', null, 'group_14m').setDisplayType('inline').setDefaultValue(button_load_reviewImages_openStatement + 16 + button_load_reviewImages_closeStatement);
            //ACTION: create the button to visualize images in mode view
            }
            if (type == 'view' && (role == 1102 || role == 1111 || role == 1174 || role == 1124 || role == 1196 || role == 1126 || role == 1129 || role == 3 || user == 123405 || role == 1117 || role == 1098 || role == 1195 || role == 1125 || role == 1128 || role == 1187)) {
                form.addField('custpage_button_24h_view', 'inlinehtml', '', null, 'group_24h').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 1 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_10d_view', 'inlinehtml', '', null, 'group_10d').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 2 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_1m_view', 'inlinehtml', '', null, 'group_1m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 3 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_2m_view', 'inlinehtml', '', null, 'group_2m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 4 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_3m_view', 'inlinehtml', '', null, 'group_3m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 5 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_4m_view', 'inlinehtml', '', null, 'group_4m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 6 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_5m_view', 'inlinehtml', '', null, 'group_5m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 7 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_6m_view', 'inlinehtml', '', null, 'group_6m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 8 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_7m_view', 'inlinehtml', '', null, 'group_7m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 9 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_8m_view', 'inlinehtml', '', null, 'group_8m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 10 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_9m_view', 'inlinehtml', '', null, 'group_9m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 11 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_10m_view', 'inlinehtml', '', null, 'group_10m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 12 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_11m_view', 'inlinehtml', '', null, 'group_11m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 13 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_12m_view', 'inlinehtml', '', null, 'group_12m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 14 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_13m_view', 'inlinehtml', '', null, 'group_13m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 15 + button_view_reviewImages_closeStatement);
                form.addField('custpage_button_14m_view', 'inlinehtml', '', null, 'group_14m').setDisplayType('inline').setDefaultValue(button_view_reviewImages_openStatement + 16 + button_view_reviewImages_closeStatement);
            }

            //VARIABLES: array of name custom fileds in frontend view
            var arr_reviews_nameFields = ['custpage_campo_lav_24h', 'custpage_campo_tx_24h', 'custpage_campo_resp_24h', 'custpage_campo_nota_24h', 'custpage_campo_lav_10d', 'custpage_campo_tx_10d', 'custpage_campo_resp_10d', 'custpage_campo_nota_10d', 'custpage_campo_lav_1m', 'custpage_campo_tx_1m', 'custpage_campo_resp_1m', 'custpage_campo_nota_1m', 'custpage_campo_lav_2m', 'custpage_campo_tx_2m', 'custpage_campo_resp_2m', 'custpage_campo_nota_2m', 'custpage_campo_lav_3m', 'custpage_campo_tx_3m', 'custpage_campo_resp_3m', 'custpage_campo_nota_3m', 'custpage_campo_lav_4m', 'custpage_campo_tx_4m', 'custpage_campo_resp_4m', 'custpage_campo_nota_4m', 'custpage_campo_lav_5m', 'custpage_campo_tx_5m', 'custpage_campo_resp_5m', 'custpage_campo_nota_5m', 'custpage_campo_lav_6m', 'custpage_campo_tx_6m', 'custpage_campo_resp_6m', 'custpage_campo_nota_6m', 'custpage_campo_lav_7m', 'custpage_campo_tx_7m', 'custpage_campo_resp_7m', 'custpage_campo_nota_7m', 'custpage_campo_lav_8m', 'custpage_campo_tx_8m', 'custpage_campo_resp_8m', 'custpage_campo_nota_8m', 'custpage_campo_lav_9m', 'custpage_campo_tx_9m', 'custpage_campo_resp_9m', 'custpage_campo_nota_9m', 'custpage_campo_lav_10m', 'custpage_campo_tx_10m', 'custpage_campo_resp_10m', 'custpage_campo_nota_10m', 'custpage_campo_lav_11m', 'custpage_campo_tx_11m', 'custpage_campo_resp_11m', 'custpage_campo_nota_11m', 'custpage_campo_lav_12m', 'custpage_campo_tx_12m', 'custpage_campo_resp_12m', 'custpage_campo_nota_12m', 'custpage_campo_lav_13m', 'custpage_campo_tx_13m', 'custpage_campo_resp_13m', 'custpage_campo_nota_13m', 'custpage_campo_lav_14m', 'custpage_campo_tx_14m', 'custpage_campo_resp_14m', 'custpage_campo_nota_14m'];
            //VARIABLES: array with field values from backend netsuite
            var arr_reviews_valueFields = [campo_lav_24h, campo_tx_24h, campo_resp_24h, campo_nota_24h, campo_lav_10d, campo_tx_10d, campo_resp_10d, campo_nota_10d, campo_lav_1m, campo_tx_1m, campo_resp_1m, campo_nota_1m, campo_lav_2m, campo_tx_2m, campo_resp_2m, campo_nota_2m, campo_lav_3m, campo_tx_3m, campo_resp_3m, campo_nota_3m, campo_lav_4m, campo_tx_4m, campo_resp_4m, campo_nota_4m, campo_lav_5m, campo_tx_5m, campo_resp_5m, campo_nota_5m, campo_lav_6m, campo_tx_6m, campo_resp_6m, campo_nota_6m, campo_lav_7m, campo_tx_7m, campo_resp_7m, campo_nota_7m, campo_lav_8m, campo_tx_8m, campo_resp_8m, campo_nota_8m, campo_lav_9m, campo_tx_9m, campo_resp_9m, campo_nota_9m, campo_lav_10m, campo_tx_10m, campo_resp_10m, campo_nota_10m, campo_lav_11m, campo_tx_11m, campo_resp_11m, campo_nota_11m, campo_lav_12m, campo_tx_12m, campo_resp_12m, campo_nota_12m, campo_lav_13m, campo_tx_13m, campo_resp_13m, campo_nota_13m, campo_lav_14m, campo_tx_14m, campo_resp_14m, campo_nota_14m];

            try {
                //ACTION: Setting the custom fields in frontend with the field values in backend netsuite
                for (var revCount = 0; revCount < arr_reviews_nameFields.length; revCount++) {
                    if (arr_reviews_valueFields[revCount] != null) {
                        nlapiSetFieldValue(arr_reviews_nameFields[revCount], arr_reviews_valueFields[revCount]);
                    }
                }
                //ACTION: Setting the custom fields with property inline when the field value in backend is different to null only to users non admin
                for (var i in arr_reviews_nameFields) {
                    elementoBlockear_closed = nlapiGetField(arr_reviews_nameFields[i]);
                    elementoBlockear_value = arr_reviews_valueFields[i];
                    if (elementoBlockear_value !== null && role !== 3) {
                        elementoBlockear_closed.setDisplayType('inline');
                    }
                }
            } catch (error) {
                nlapiLogExecution('ERROR', 'Error beforeLoad', error);
                nlapiLogExecution('ERROR', 'Error from load field values: ', arr_reviews_valueFields);
                nlapiLogExecution('ERROR', 'Data error: ' + 'ROLE: ' + role + ' USER: ' + user + ' ID TEXT CLIENT: ' + companyText);
            }
        }
    }
}


/**
 * AFTERSUBMIT
 * @param {object} type object Type
 * @param {object} form object Form 
 * save the load images in suitelet fields
 */
function afterSubmit(type, form) {
    var recId = nlapiGetRecordId();
    var formulario = nlapiGetFieldValue('customform');

    var imagen = nlapiGetFieldValue('mediafile_image1');

    if (type == 'view' || type == 'quickview' || type == 'edit') {
        if (formulario == 14 || formulario == 148) {

            //VARIABLES: get names form filed objects in netsuite backend
            var field_campo_lav_24h = nlapiGetField('custevent138').getName();
            var field_campo_tx_24h = nlapiGetField('custevent140').getName();
            var field_campo_resp_24h = nlapiGetField('custevent141').getName();
            var field_campo_nota_24h = nlapiGetField('custevent139').getName();
            var field_campo_lav_10d = nlapiGetField('custevent142').getName();
            var field_campo_tx_10d = nlapiGetField('custevent144').getName();
            var field_campo_resp_10d = nlapiGetField('custevent145').getName();
            var field_campo_nota_10d = nlapiGetField('custevent143').getName();
            var field_campo_lav_1m = nlapiGetField('custevent146').getName();
            var field_campo_tx_1m = nlapiGetField('custevent148').getName();
            var field_campo_resp_1m = nlapiGetField('custevent149').getName();
            var field_campo_nota_1m = nlapiGetField('custevent147').getName();
            var field_campo_lav_2m = nlapiGetField('custevent811').getName();
            var field_campo_tx_2m = nlapiGetField('custevent813').getName();
            var field_campo_resp_2m = nlapiGetField('custevent814').getName();
            var field_campo_nota_2m = nlapiGetField('custevent812').getName();
            var field_campo_lav_3m = nlapiGetField('custevent150').getName();
            var field_campo_tx_3m = nlapiGetField('custevent152').getName();
            var field_campo_resp_3m = nlapiGetField('custevent153').getName();
            var field_campo_nota_3m = nlapiGetField('custevent151').getName();
            var field_campo_lav_4m = nlapiGetField('custevent815').getName();
            var field_campo_tx_4m = nlapiGetField('custevent817').getName();
            var field_campo_resp_4m = nlapiGetField('custevent818').getName();
            var field_campo_nota_4m = nlapiGetField('custevent816').getName();
            var field_campo_lav_5m = nlapiGetField('custevent154').getName();
            var field_campo_tx_5m = nlapiGetField('custevent156').getName();
            var field_campo_resp_5m = nlapiGetField('custevent157').getName();
            var field_campo_nota_5m = nlapiGetField('custevent155').getName();
            var field_campo_lav_6m = nlapiGetField('custevent819').getName();
            var field_campo_tx_6m = nlapiGetField('custevent821').getName();
            var field_campo_resp_6m = nlapiGetField('custevent822').getName();
            var field_campo_nota_6m = nlapiGetField('custevent820').getName();
            var field_campo_lav_7m = nlapiGetField('custevent158').getName();
            var field_campo_tx_7m = nlapiGetField('custevent160').getName();
            var field_campo_resp_7m = nlapiGetField('custevent163').getName();
            var field_campo_nota_7m = nlapiGetField('custevent159').getName();
            var field_campo_lav_8m = nlapiGetField('custevent823').getName();
            var field_campo_tx_8m = nlapiGetField('custevent835').getName();
            var field_campo_resp_8m = nlapiGetField('custevent830').getName();
            var field_campo_nota_8m = nlapiGetField('custevent826').getName();
            var field_campo_lav_9m = nlapiGetField('custevent164').getName();
            var field_campo_tx_9m = nlapiGetField('custevent166').getName();
            var field_campo_resp_9m = nlapiGetField('custevent167').getName();
            var field_campo_nota_9m = nlapiGetField('custevent165').getName();
            var field_campo_lav_10m = nlapiGetField('custevent824').getName();
            var field_campo_tx_10m = nlapiGetField('custevent834').getName();
            var field_campo_resp_10m = nlapiGetField('custevent831').getName();
            var field_campo_nota_10m = nlapiGetField('custevent827').getName();
            var field_campo_lav_11m = nlapiGetField('custevent825').getName();
            var field_campo_tx_11m = nlapiGetField('custevent838').getName();
            var field_campo_resp_11m = nlapiGetField('custevent832').getName();
            var field_campo_nota_11m = nlapiGetField('custevent828').getName();
            var field_campo_lav_12m = nlapiGetField('custevent168').getName();
            var field_campo_tx_12m = nlapiGetField('custevent170').getName();
            var field_campo_resp_12m = nlapiGetField('custevent171').getName();
            var field_campo_nota_12m = nlapiGetField('custevent169').getName();
            var field_campo_lav_13m = nlapiGetField('custevent836').getName();
            var field_campo_tx_13m = nlapiGetField('custevent833').getName();
            var field_campo_resp_13m = nlapiGetField('custevent837').getName();
            var field_campo_nota_13m = nlapiGetField('custevent829').getName();
            var field_campo_lav_14m = nlapiGetField('custevent172').getName();
            var field_campo_tx_14m = nlapiGetField('custevent174').getName();
            var field_campo_resp_14m = nlapiGetField('custevent175').getName();
            var field_campo_nota_14m = nlapiGetField('custevent173').getName();

            //VARIABLES: get the field values from custom fields
            var campo_lav_24h = nlapiGetFieldValue('custpage_campo_lav_24h');
            var campo_tx_24h = nlapiGetFieldValue('custpage_campo_tx_24h');
            var campo_resp_24h = nlapiGetFieldValue('custpage_campo_resp_24h');
            var campo_nota_24h = nlapiGetFieldValue('custpage_campo_nota_24h');
            var campo_lav_10d = nlapiGetFieldValue('custpage_campo_lav_10d');
            var campo_tx_10d = nlapiGetFieldValue('custpage_campo_tx_10d');
            var campo_resp_10d = nlapiGetFieldValue('custpage_campo_resp_10d');
            var campo_nota_10d = nlapiGetFieldValue('custpage_campo_nota_10d');
            var campo_lav_1m = nlapiGetFieldValue('custpage_campo_lav_1m');
            var campo_tx_1m = nlapiGetFieldValue('custpage_campo_tx_1m');
            var campo_resp_1m = nlapiGetFieldValue('custpage_campo_resp_1m');
            var campo_nota_1m = nlapiGetFieldValue('custpage_campo_nota_1m');
            var campo_lav_2m = nlapiGetFieldValue('custpage_campo_lav_2m');
            var campo_tx_2m = nlapiGetFieldValue('custpage_campo_tx_2m');
            var campo_resp_2m = nlapiGetFieldValue('custpage_campo_resp_2m');
            var campo_nota_2m = nlapiGetFieldValue('custpage_campo_nota_2m');
            var campo_lav_3m = nlapiGetFieldValue('custpage_campo_lav_3m');
            var campo_tx_3m = nlapiGetFieldValue('custpage_campo_tx_3m');
            var campo_resp_3m = nlapiGetFieldValue('custpage_campo_resp_3m');
            var campo_nota_3m = nlapiGetFieldValue('custpage_campo_nota_3m');
            var campo_lav_4m = nlapiGetFieldValue('custpage_campo_lav_4m');
            var campo_tx_4m = nlapiGetFieldValue('custpage_campo_tx_4m');
            var campo_resp_4m = nlapiGetFieldValue('custpage_campo_resp_4m');
            var campo_nota_4m = nlapiGetFieldValue('custpage_campo_nota_4m');
            var campo_lav_5m = nlapiGetFieldValue('custpage_campo_lav_5m');
            var campo_tx_5m = nlapiGetFieldValue('custpage_campo_tx_5m');
            var campo_resp_5m = nlapiGetFieldValue('custpage_campo_resp_5m');
            var campo_nota_5m = nlapiGetFieldValue('custpage_campo_nota_5m');
            var campo_lav_6m = nlapiGetFieldValue('custpage_campo_lav_6m');
            var campo_tx_6m = nlapiGetFieldValue('custpage_campo_tx_6m');
            var campo_resp_6m = nlapiGetFieldValue('custpage_campo_resp_6m');
            var campo_nota_6m = nlapiGetFieldValue('custpage_campo_nota_6m');
            var campo_lav_7m = nlapiGetFieldValue('custpage_campo_lav_7m');
            var campo_tx_7m = nlapiGetFieldValue('custpage_campo_tx_7m');
            var campo_resp_7m = nlapiGetFieldValue('custpage_campo_resp_7m');
            var campo_nota_7m = nlapiGetFieldValue('custpage_campo_nota_7m');
            var campo_lav_8m = nlapiGetFieldValue('custpage_campo_lav_8m');
            var campo_tx_8m = nlapiGetFieldValue('custpage_campo_tx_8m');
            var campo_resp_8m = nlapiGetFieldValue('custpage_campo_resp_8m');
            var campo_nota_8m = nlapiGetFieldValue('custpage_campo_nota_8m');
            var campo_lav_9m = nlapiGetFieldValue('custpage_campo_lav_9m');
            var campo_tx_9m = nlapiGetFieldValue('custpage_campo_tx_9m');
            var campo_resp_9m = nlapiGetFieldValue('custpage_campo_resp_9m');
            var campo_nota_9m = nlapiGetFieldValue('custpage_campo_nota_9m');
            var campo_lav_10m = nlapiGetFieldValue('custpage_campo_lav_10m');
            var campo_tx_10m = nlapiGetFieldValue('custpage_campo_tx_10m');
            var campo_resp_10m = nlapiGetFieldValue('custpage_campo_resp_10m');
            var campo_nota_10m = nlapiGetFieldValue('custpage_campo_nota_10m');
            var campo_lav_11m = nlapiGetFieldValue('custpage_campo_lav_11m');
            var campo_tx_11m = nlapiGetFieldValue('custpage_campo_tx_11m');
            var campo_resp_11m = nlapiGetFieldValue('custpage_campo_resp_11m');
            var campo_nota_11m = nlapiGetFieldValue('custpage_campo_nota_11m');
            var campo_lav_12m = nlapiGetFieldValue('custpage_campo_lav_12m');
            var campo_tx_12m = nlapiGetFieldValue('custpage_campo_tx_12m');
            var campo_resp_12m = nlapiGetFieldValue('custpage_campo_resp_12m');
            var campo_nota_12m = nlapiGetFieldValue('custpage_campo_nota_12m');
            var campo_lav_13m = nlapiGetFieldValue('custpage_campo_lav_13m');
            var campo_tx_13m = nlapiGetFieldValue('custpage_campo_tx_13m');
            var campo_resp_13m = nlapiGetFieldValue('custpage_campo_resp_13m');
            var campo_nota_13m = nlapiGetFieldValue('custpage_campo_nota_13m');
            var campo_lav_14m = nlapiGetFieldValue('custpage_campo_lav_14m');
            var campo_tx_14m = nlapiGetFieldValue('custpage_campo_tx_14m');
            var campo_resp_14m = nlapiGetFieldValue('custpage_campo_resp_14m');
            var campo_nota_14m = nlapiGetFieldValue('custpage_campo_nota_14m');

            //ACTION: Submit values to backend fields in netsuite
            //VARIABLES: Array with the variables of field name from backend fields netsuite
            var arr_reviews_nameFields = [field_campo_lav_24h, field_campo_tx_24h, field_campo_resp_24h, field_campo_nota_24h, field_campo_lav_10d, field_campo_tx_10d, field_campo_resp_10d, field_campo_nota_10d, field_campo_lav_1m, field_campo_tx_1m, field_campo_resp_1m, field_campo_nota_1m, field_campo_lav_2m, field_campo_tx_2m, field_campo_resp_2m, field_campo_nota_2m, field_campo_lav_3m, field_campo_tx_3m, field_campo_resp_3m, field_campo_nota_3m, field_campo_lav_4m, field_campo_tx_4m, field_campo_resp_4m, field_campo_nota_4m, field_campo_lav_5m, field_campo_tx_5m, field_campo_resp_5m, field_campo_nota_5m, field_campo_lav_6m, field_campo_tx_6m, field_campo_resp_6m, field_campo_nota_6m, field_campo_lav_7m, field_campo_tx_7m, field_campo_resp_7m, field_campo_nota_7m, field_campo_lav_8m, field_campo_tx_8m, field_campo_resp_8m, field_campo_nota_8m, field_campo_lav_9m, field_campo_tx_9m, field_campo_resp_9m, field_campo_nota_9m, field_campo_lav_10m, field_campo_tx_10m, field_campo_resp_10m, field_campo_nota_10m, field_campo_lav_11m, field_campo_tx_11m, field_campo_resp_11m, field_campo_nota_11m, field_campo_lav_12m, field_campo_tx_12m, field_campo_resp_12m, field_campo_nota_12m, field_campo_lav_13m, field_campo_tx_13m, field_campo_resp_13m, field_campo_nota_13m, field_campo_lav_14m, field_campo_tx_14m, field_campo_resp_14m, field_campo_nota_14m];
            //VARIABLE: Array with de values from custom fields in frontend view
            var arr_reviews_valueFields = [campo_lav_24h, campo_tx_24h, campo_resp_24h, campo_nota_24h, campo_lav_10d, campo_tx_10d, campo_resp_10d, campo_nota_10d, campo_lav_1m, campo_tx_1m, campo_resp_1m, campo_nota_1m, campo_lav_2m, campo_tx_2m, campo_resp_2m, campo_nota_2m, campo_lav_3m, campo_tx_3m, campo_resp_3m, campo_nota_3m, campo_lav_4m, campo_tx_4m, campo_resp_4m, campo_nota_4m, campo_lav_5m, campo_tx_5m, campo_resp_5m, campo_nota_5m, campo_lav_6m, campo_tx_6m, campo_resp_6m, campo_nota_6m, campo_lav_7m, campo_tx_7m, campo_resp_7m, campo_nota_7m, campo_lav_8m, campo_tx_8m, campo_resp_8m, campo_nota_8m, campo_lav_9m, campo_tx_9m, campo_resp_9m, campo_nota_9m, campo_lav_10m, campo_tx_10m, campo_resp_10m, campo_nota_10m, campo_lav_11m, campo_tx_11m, campo_resp_11m, campo_nota_11m, campo_lav_12m, campo_tx_12m, campo_resp_12m, campo_nota_12m, campo_lav_13m, campo_tx_13m, campo_resp_13m, campo_nota_13m, campo_lav_14m, campo_tx_14m, campo_resp_14m, campo_nota_14m];

            try {
                //ACTION: range array values and setting with the array name fields to submit record case
                for (var sReviews = 0; sReviews < arr_reviews_nameFields.length; sReviews++) {
                    if (arr_reviews_valueFields[sReviews] != null) {
                        nlapiSubmitField('supportcase', recId, arr_reviews_nameFields[sReviews], arr_reviews_valueFields[sReviews]);
                    }
                }
            } catch (error) {
                nlapiLogExecution('ERROR', 'Values Array to submit: ', arr_reviews_valueFields);
            }


        }
    }
}