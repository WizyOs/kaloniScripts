/**
 * BEFORELOAD
 * @param {object} type object Type
 * @param {object} form object Form
 */

function beforeLoad(type, form) {

    //ACTION: MAIN BEFORELOAD -> create custom fields in frontend and load the values from backend fields in custom fields
    var customform = null;
    var context = nlapiGetContext();
    var subsidiary = context.getSubsidiary();
    var role = nlapiGetRole();
    var user = nlapiGetUser();
    var titleTab_hmComplemento = '';
    var tabHmComplemento = '';

    if (type == 'create') {
        var newRecord = nlapiGetNewRecord();
        try {
            var objNewRecord = JSON.stringify(newRecord);
            var valuesNewRecord = JSON.parse(objNewRecord);
            customform = valuesNewRecord.customform.internalid;
            //nlapiLogExecution('DEBUG', 'beforeLoad - Create','Context on create new' + valuesNewRecord.customform.internalid + ' tipo ' + typeof valuesNewRecord.customform.internalid);
        } catch (error) {
            nlapiLogExecution('ERROR', 'beforeLoad - Create', 'Error on context on create new: ' + error);
        }

        if (customform == '138' || customform == '135') {
            if (role == '3' || subsidiary == '10') {
                //nlapiLogExecution('DEBUG', 'Formulario', 'Id Form Edit and View: ' + idFormEditAndView + ' Id Form Create: ' + idFomrCreate);
                //ACTION: CREATE tab 'Revisiones'
                titleTab_hmComplemento = 'HM Complemento';
                tabHmComplemento = form.addTab('custpage_hmcomplemento', titleTab_hmComplemento);

                if (customform == '138') {
                    form.insertTab(tabHmComplemento, 'custom227');
                } else if (customform == '135') {
                    form.insertTab(tabHmComplemento, 'custom214');
                }

                //VARIABLES: get the label fields from filed objects in backend netsuite
                fieldLabel_hmComplemento_enfermedadActual = nlapiGetField('custevent285').getLabel();
                fieldLabel_hmComplemento_revisionSistemas = nlapiGetField('custevent286').getLabel();
                fieldLabel_hmComplemento_antecedentes = nlapiGetField('custevent287').getLabel();
                fieldLabel_hmComplemento_signosVitales = nlapiGetField('custevent288').getLabel();
                fieldLabel_hmComplemento_examenFisico = nlapiGetField('custevent289').getLabel();
                fieldLabel_hmComplemento_cie10 = nlapiGetField('custevent290').getLabel();
                fieldLabel_hmComplemento_planTrabajo = nlapiGetField('custevent291').getLabel();
                fieldLabel_hmComplemento_principal = nlapiGetField('custevent292').getLabel();
                fieldLabel_hmComplemento_confimadoImpresionDiagnostica = nlapiGetField('custevent293').getLabel();

                //VARIABLES: get the field values from backend netsuite
                fieldValue_hmComplemento_enfermedadActual = nlapiGetFieldValue('custevent285');
                fieldValue_hmComplemento_revisionSistemas = nlapiGetFieldValue('custevent286');
                fieldValue_hmComplemento_antecedentes = nlapiGetFieldValue('custevent287');
                fieldValue_hmComplemento_signosVitales = nlapiGetFieldValue('custevent288');
                fieldValue_hmComplemento_examenFisico = nlapiGetFieldValue('custevent289');
                fieldValue_hmComplemento_cie10 = nlapiGetFieldValue('custevent290');
                fieldValue_hmComplemento_planTrabajo = nlapiGetFieldValue('custevent291');
                fieldValue_hmComplemento_principal = nlapiGetFieldValue('custevent292');
                fieldValue_hmComplemento_confimadoImpresionDiagnostica = nlapiGetFieldValue('custevent293');

                titleGroup_hmComplemento_1 = 'Enfermedad Actual';
                titleGroup_hmComplemento_2 = 'Revisión por Sistemas';
                titleGroup_hmComplemento_3 = 'Antecedentes';
                titleGroup_hmComplemento_4 = 'Signos Vitales';
                titleGroup_hmComplemento_5 = 'Examen Físico';
                titleGroup_hmComplemento_6 = 'CIE10';
                titleGroup_hmComplemento_7 = 'Plan de Trabajo';

                //ACTION: Create custom groups
                form.addFieldGroup('group_hmComplemento_1', titleGroup_hmComplemento_1, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_2', titleGroup_hmComplemento_2, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_3', titleGroup_hmComplemento_3, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_4', titleGroup_hmComplemento_4, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_5', titleGroup_hmComplemento_5, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_6', titleGroup_hmComplemento_6, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_7', titleGroup_hmComplemento_7, 'custpage_hmcomplemento');

                //ACTION: Create custom fields
                form.addField('custpage_hmcomplemento_enfermedadactual', 'longtext', fieldLabel_hmComplemento_enfermedadActual, null, 'group_hmComplemento_1');
                form.addField('custpage_hmcomplemento_revisionsistemas', 'longtext', fieldLabel_hmComplemento_revisionSistemas, null, 'group_hmComplemento_2');
                form.addField('custpage_hmcomplemento_antecedentes', 'longtext', fieldLabel_hmComplemento_antecedentes, null, 'group_hmComplemento_3');
                form.addField('custpage_hmcomplemento_signosvitales', 'longtext', fieldLabel_hmComplemento_signosVitales, null, 'group_hmComplemento_4');
                form.addField('custpage_hmcomplemento_examenfisico', 'longtext', fieldLabel_hmComplemento_examenFisico, null, 'group_hmComplemento_5');
                form.addField('custpage_hmcomplemento_cie10', 'select', fieldLabel_hmComplemento_cie10, 'customlist419', 'group_hmComplemento_6');
                form.addField('custpage_hmcomplemento_plantrabajo', 'longtext', fieldLabel_hmComplemento_planTrabajo, null, 'group_hmComplemento_7');
                form.addField('custpage_hmcomplemento_principal', 'checkbox', fieldLabel_hmComplemento_principal, null, 'group_hmComplemento_7').setDefaultValue('F');
                form.addField('custpage_hmcomplemento_confimadoimpresiondiagnostica', 'select', fieldLabel_hmComplemento_confimadoImpresionDiagnostica, 'customlist420', 'group_hmComplemento_7');
            }
        }
    }

    if (type == 'view' || type == 'quickview' || type == 'edit') {
        var recId = nlapiGetRecordId(); // id current record
        var record = nlapiLoadRecord('supportcase', recId); // load record supportcase with their id and retunr object record
        customform = record.getFieldValue('customform'); // Id custom form
        companyText = record.getFieldValue('company'); // Text id company

        if (customform == 138 || customform == 135) {
            if (role == '3' || subsidiary == '10') {
                //nlapiLogExecution('DEBUG', 'Formulario', 'Id Form Edit and View: ' + idFormEditAndView + ' Id Form Create: ' + idFomrCreate);
                //ACTION: CREATE tab 'Revisiones'
                titleTab_hmComplemento = 'HM Complemento';
                tabHmComplemento = form.addTab('custpage_hmcomplemento', titleTab_hmComplemento);

                if (customform == 138) {
                    form.insertTab(tabHmComplemento, 'custom227');
                } else if (customform == 135) {
                    form.insertTab(tabHmComplemento, 'custom214');
                }

                //VARIABLES: get the label fields from filed objects in backend netsuite
                fieldLabel_hmComplemento_enfermedadActual = nlapiGetField('custevent285').getLabel();
                fieldLabel_hmComplemento_revisionSistemas = nlapiGetField('custevent286').getLabel();
                fieldLabel_hmComplemento_antecedentes = nlapiGetField('custevent287').getLabel();
                fieldLabel_hmComplemento_signosVitales = nlapiGetField('custevent288').getLabel();
                fieldLabel_hmComplemento_examenFisico = nlapiGetField('custevent289').getLabel();
                fieldLabel_hmComplemento_cie10 = nlapiGetField('custevent290').getLabel();
                fieldLabel_hmComplemento_planTrabajo = nlapiGetField('custevent291').getLabel();
                fieldLabel_hmComplemento_principal = nlapiGetField('custevent292').getLabel();
                fieldLabel_hmComplemento_confimadoImpresionDiagnostica = nlapiGetField('custevent293').getLabel();

                //VARIABLES: get the field values from backend netsuite
                fieldValue_hmComplemento_enfermedadActual = nlapiGetFieldValue('custevent285');
                fieldValue_hmComplemento_revisionSistemas = nlapiGetFieldValue('custevent286');
                fieldValue_hmComplemento_antecedentes = nlapiGetFieldValue('custevent287');
                fieldValue_hmComplemento_signosVitales = nlapiGetFieldValue('custevent288');
                fieldValue_hmComplemento_examenFisico = nlapiGetFieldValue('custevent289');
                fieldValue_hmComplemento_cie10 = nlapiGetFieldValue('custevent290');
                fieldValue_hmComplemento_planTrabajo = nlapiGetFieldValue('custevent291');
                fieldValue_hmComplemento_principal = nlapiGetFieldValue('custevent292');
                fieldValue_hmComplemento_confimadoImpresionDiagnostica = nlapiGetFieldValue('custevent293');

                titleGroup_hmComplemento_1 = 'Enfermedad Actual';
                titleGroup_hmComplemento_2 = 'Revisión por Sistemas';
                titleGroup_hmComplemento_3 = 'Antecedentes';
                titleGroup_hmComplemento_4 = 'Signos Vitales';
                titleGroup_hmComplemento_5 = 'Examen Físico';
                titleGroup_hmComplemento_6 = 'CIE10';
                titleGroup_hmComplemento_7 = 'Plan de Trabajo';

                //ACTION: Create custom groups
                form.addFieldGroup('group_hmComplemento_1', titleGroup_hmComplemento_1, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_2', titleGroup_hmComplemento_2, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_3', titleGroup_hmComplemento_3, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_4', titleGroup_hmComplemento_4, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_5', titleGroup_hmComplemento_5, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_6', titleGroup_hmComplemento_6, 'custpage_hmcomplemento');
                form.addFieldGroup('group_hmComplemento_7', titleGroup_hmComplemento_7, 'custpage_hmcomplemento');

                //ACTION: Create custom fields
                form.addField('custpage_hmcomplemento_enfermedadactual', 'longtext', fieldLabel_hmComplemento_enfermedadActual, null, 'group_hmComplemento_1');
                form.addField('custpage_hmcomplemento_revisionsistemas', 'longtext', fieldLabel_hmComplemento_revisionSistemas, null, 'group_hmComplemento_2');
                form.addField('custpage_hmcomplemento_antecedentes', 'longtext', fieldLabel_hmComplemento_antecedentes, null, 'group_hmComplemento_3');
                form.addField('custpage_hmcomplemento_signosvitales', 'longtext', fieldLabel_hmComplemento_signosVitales, null, 'group_hmComplemento_4');
                form.addField('custpage_hmcomplemento_examenfisico', 'longtext', fieldLabel_hmComplemento_examenFisico, null, 'group_hmComplemento_5');
                form.addField('custpage_hmcomplemento_cie10', 'select', fieldLabel_hmComplemento_cie10, 'customlist419', 'group_hmComplemento_6');
                form.addField('custpage_hmcomplemento_plantrabajo', 'longtext', fieldLabel_hmComplemento_planTrabajo, null, 'group_hmComplemento_7');
                form.addField('custpage_hmcomplemento_principal', 'checkbox', fieldLabel_hmComplemento_principal, null, 'group_hmComplemento_7').setDefaultValue('F');
                form.addField('custpage_hmcomplemento_confimadoimpresiondiagnostica', 'select', fieldLabel_hmComplemento_confimadoImpresionDiagnostica, 'customlist420', 'group_hmComplemento_7');

                //VARIABLES: array of name custom fileds in frontend view
                arr_hmComplemento_nameFields = ['custpage_hmcomplemento_enfermedadactual', 'custpage_hmcomplemento_revisionsistemas', 'custpage_hmcomplemento_antecedentes', 'custpage_hmcomplemento_signosvitales', 'custpage_hmcomplemento_examenfisico', 'custpage_hmcomplemento_cie10', 'custpage_hmcomplemento_plantrabajo', 'custpage_hmcomplemento_principal', 'custpage_hmcomplemento_confimadoimpresiondiagnostica'];
                //VARIABLES: array with field values from backend netsuite
                arr_hmComplemento_valueFields = [fieldValue_hmComplemento_enfermedadActual, fieldValue_hmComplemento_revisionSistemas, fieldValue_hmComplemento_antecedentes, fieldValue_hmComplemento_signosVitales, fieldValue_hmComplemento_examenFisico, fieldValue_hmComplemento_cie10, fieldValue_hmComplemento_planTrabajo, fieldValue_hmComplemento_principal, fieldValue_hmComplemento_confimadoImpresionDiagnostica];

                try {
                    //ACTION: Setting the custom fields in frontend with the field values in backend netsuite
                    for (var revCount = 0; revCount < arr_hmComplemento_nameFields.length; revCount++) {
                        if (arr_hmComplemento_valueFields[revCount] != null) {
                            nlapiSetFieldValue(arr_hmComplemento_nameFields[revCount], arr_hmComplemento_valueFields[revCount]);
                        }
                    }
                    //ACTION: Setting the custom fields with property inline when the field value in backend is different to null
                    for (var j in arr_hmComplemento_nameFields) {
                        elementoBlockear_closed = nlapiGetField(arr_hmComplemento_nameFields[j]);
                        elementoBlockear_value = arr_hmComplemento_valueFields[j];
                        if (arr_hmComplemento_nameFields[j] != 'custpage_hmcomplemento_principal') {
                            if (elementoBlockear_value != null) {
                                elementoBlockear_closed.setDisplayType('inline');
                            }
                        }
                    }
                } catch (error) {
                    nlapiLogExecution('ERROR', 'beforeLoad - Edit, View', 'Error beforeLoad: ' + error);
                    nlapiLogExecution('ERROR', 'beforeLoad - Edit, View', 'Error from load field values: ' + arr_hmComplemento_valueFields);
                    nlapiLogExecution('ERROR', 'beforeLoad - Edit, View', 'Data error: ' + 'ROLE: ' + role + ' USER: ' + user + ' ID TEXT CLIENT: ' + companyText);
                }
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

    var role = nlapiGetRole();
    var recId = nlapiGetRecordId();
    var sReviews = 0;
    var context = nlapiGetContext();
    var subsidiary = context.getSubsidiary();

    if (type == 'create') {
        var newRecord = nlapiGetNewRecord();
        try {
            var objNewRecord = JSON.stringify(newRecord);
            var valuesNewRecord = JSON.parse(objNewRecord);
            customform = valuesNewRecord.customform.internalid;            
            //nlapiLogExecution('DEBUG', 'Mensaje en create nuevo Record', valuesNewRecord.customform.internalid);
            nlapiLogExecution('DEBUG', 'afterSubmit - Create', 'Id Record Mensaje en create ' + recId);
            nlapiLogExecution('DEBUG', 'afterSubmit - Create', 'Subsidiary Mensaje en create ' + subsidiary);
        } catch (error) {
            nlapiLogExecution('DEBUG', 'afterSubmit - Create', 'Error Mensaje en create ' + error);
        }
        if (customform == '138' || customform == '135') {
            if (role == '3' || subsidiary == '10') {
                //VARIABLES: get names form filed objects in netsuite backend
                fieldLabel_hmComplemento_enfermedadActual = nlapiGetField('custevent285').getName();
                fieldLabel_hmComplemento_revisionSistemas = nlapiGetField('custevent286').getName();
                fieldLabel_hmComplemento_antecedentes = nlapiGetField('custevent287').getName();
                fieldLabel_hmComplemento_signosVitales = nlapiGetField('custevent288').getName();
                fieldLabel_hmComplemento_examenFisico = nlapiGetField('custevent289').getName();
                fieldLabel_hmComplemento_cie10 = nlapiGetField('custevent290').getName();
                fieldLabel_hmComplemento_planTrabajo = nlapiGetField('custevent291').getName();
                fieldLabel_hmComplemento_principal = nlapiGetField('custevent292').getName();
                fieldLabel_hmComplemento_confimadoImpresionDiagnostica = nlapiGetField('custevent293').getName();

                //VARIABLES: get the field values from custom fields
                fieldValue_hmComplemento_enfermedadActual = nlapiGetFieldValue('custpage_hmcomplemento_enfermedadactual');
                fieldValue_hmComplemento_revisionSistemas = nlapiGetFieldValue('custpage_hmcomplemento_revisionsistemas');
                fieldValue_hmComplemento_antecedentes = nlapiGetFieldValue('custpage_hmcomplemento_antecedentes');
                fieldValue_hmComplemento_signosVitales = nlapiGetFieldValue('custpage_hmcomplemento_signosvitales');
                fieldValue_hmComplemento_examenFisico = nlapiGetFieldValue('custpage_hmcomplemento_examenfisico');
                fieldValue_hmComplemento_cie10 = nlapiGetFieldValue('custpage_hmcomplemento_cie10');
                fieldValue_hmComplemento_planTrabajo = nlapiGetFieldValue('custpage_hmcomplemento_plantrabajo');
                fieldValue_hmComplemento_principal = nlapiGetFieldValue('custpage_hmcomplemento_principal');
                fieldValue_hmComplemento_confimadoImpresionDiagnostica = nlapiGetFieldValue('custpage_hmcomplemento_confimadoimpresiondiagnostica');

                //ACTION: Submit values to backend fields in netsuite
                //VARIABLES: Array with the variables of field name from backend fields netsuite
                arr_hmComplemento_nameFields = [fieldLabel_hmComplemento_enfermedadActual, fieldLabel_hmComplemento_revisionSistemas, fieldLabel_hmComplemento_antecedentes, fieldLabel_hmComplemento_signosVitales, fieldLabel_hmComplemento_examenFisico, fieldLabel_hmComplemento_cie10, fieldLabel_hmComplemento_planTrabajo, fieldLabel_hmComplemento_principal, fieldLabel_hmComplemento_confimadoImpresionDiagnostica];
                //VARIABLE: Array with de values from custom fields in frontend view
                arr_hmComplemento_valueFields = [fieldValue_hmComplemento_enfermedadActual, fieldValue_hmComplemento_revisionSistemas, fieldValue_hmComplemento_antecedentes, fieldValue_hmComplemento_signosVitales, fieldValue_hmComplemento_examenFisico, fieldValue_hmComplemento_cie10, fieldValue_hmComplemento_planTrabajo, fieldValue_hmComplemento_principal, fieldValue_hmComplemento_confimadoImpresionDiagnostica];

                try {
                    //ACTION: range array values and setting with the array name fields to submit record case
                    for (sReviews = 0; sReviews < arr_hmComplemento_nameFields.length; sReviews++) {
                        if (arr_hmComplemento_valueFields[sReviews] != null) {
                            nlapiSubmitField('supportcase', recId, arr_hmComplemento_nameFields[sReviews], arr_hmComplemento_valueFields[sReviews]);
                        }
                    }
                } catch (error) {
                    nlapiLogExecution('ERROR', 'afterSubmit - Create', 'Values Array to submit: ' + arr_hmComplemento_valueFields);
                }
            }
        }

    }

    if (type == 'edit') {
        var record = nlapiLoadRecord('supportcase', recId); // load record supportcase with their id and retunr object record
        customform = record.getFieldValue('customform'); // Id custom form
        //nlapiLogExecution('DEBUG', 'recId Edif AfterSubmit', recId);
        if (customform == 138 || customform == 135) {
            if (role == '3' || subsidiary == '10') {
                //VARIABLES: get names form filed objects in netsuite backend
                fieldLabel_hmComplemento_enfermedadActual = nlapiGetField('custevent285').getName();
                fieldLabel_hmComplemento_revisionSistemas = nlapiGetField('custevent286').getName();
                fieldLabel_hmComplemento_antecedentes = nlapiGetField('custevent287').getName();
                fieldLabel_hmComplemento_signosVitales = nlapiGetField('custevent288').getName();
                fieldLabel_hmComplemento_examenFisico = nlapiGetField('custevent289').getName();
                fieldLabel_hmComplemento_cie10 = nlapiGetField('custevent290').getName();
                fieldLabel_hmComplemento_planTrabajo = nlapiGetField('custevent291').getName();
                fieldLabel_hmComplemento_principal = nlapiGetField('custevent292').getName();
                fieldLabel_hmComplemento_confimadoImpresionDiagnostica = nlapiGetField('custevent293').getName();

                //VARIABLES: get the field values from custom fields
                fieldValue_hmComplemento_enfermedadActual = nlapiGetFieldValue('custpage_hmcomplemento_enfermedadactual');
                fieldValue_hmComplemento_revisionSistemas = nlapiGetFieldValue('custpage_hmcomplemento_revisionsistemas');
                fieldValue_hmComplemento_antecedentes = nlapiGetFieldValue('custpage_hmcomplemento_antecedentes');
                fieldValue_hmComplemento_signosVitales = nlapiGetFieldValue('custpage_hmcomplemento_signosvitales');
                fieldValue_hmComplemento_examenFisico = nlapiGetFieldValue('custpage_hmcomplemento_examenfisico');
                fieldValue_hmComplemento_cie10 = nlapiGetFieldValue('custpage_hmcomplemento_cie10');
                fieldValue_hmComplemento_planTrabajo = nlapiGetFieldValue('custpage_hmcomplemento_plantrabajo');
                fieldValue_hmComplemento_principal = nlapiGetFieldValue('custpage_hmcomplemento_principal');
                fieldValue_hmComplemento_confimadoImpresionDiagnostica = nlapiGetFieldValue('custpage_hmcomplemento_confimadoimpresiondiagnostica');

                //ACTION: Submit values to backend fields in netsuite
                //VARIABLES: Array with the variables of field name from backend fields netsuite
                arr_hmComplemento_nameFields = [fieldLabel_hmComplemento_enfermedadActual, fieldLabel_hmComplemento_revisionSistemas, fieldLabel_hmComplemento_antecedentes, fieldLabel_hmComplemento_signosVitales, fieldLabel_hmComplemento_examenFisico, fieldLabel_hmComplemento_cie10, fieldLabel_hmComplemento_planTrabajo, fieldLabel_hmComplemento_principal, fieldLabel_hmComplemento_confimadoImpresionDiagnostica];
                //VARIABLE: Array with de values from custom fields in frontend view
                arr_hmComplemento_valueFields = [fieldValue_hmComplemento_enfermedadActual, fieldValue_hmComplemento_revisionSistemas, fieldValue_hmComplemento_antecedentes, fieldValue_hmComplemento_signosVitales, fieldValue_hmComplemento_examenFisico, fieldValue_hmComplemento_cie10, fieldValue_hmComplemento_planTrabajo, fieldValue_hmComplemento_principal, fieldValue_hmComplemento_confimadoImpresionDiagnostica];

                try {
                    //ACTION: range array values and setting with the array name fields to submit record case
                    for (sReviews = 0; sReviews < arr_hmComplemento_nameFields.length; sReviews++) {
                        if (arr_hmComplemento_valueFields[sReviews] != null) {
                            nlapiSubmitField('supportcase', recId, arr_hmComplemento_nameFields[sReviews], arr_hmComplemento_valueFields[sReviews]);
                        }
                    }
                } catch (error) {
                    nlapiLogExecution('ERROR', 'afterSubmit - Create', 'Values Array to submit: ' + arr_hmComplemento_valueFields);
                }
            }
        }
    }
}