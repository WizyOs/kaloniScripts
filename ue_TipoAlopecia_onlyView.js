/**
 * BEFORELOAD
 * @param {object} type object Type
 * @param {object} form object Form
 */

function beforeLoad(type, form) {

    //ACTION: MAIN BEFORELOAD -> create custom fields in frontend and load the values from backend fields in custom fields
    var customform = null;

    if (type == 'view' || type == 'quickview' || type == 'edit') {
        var role = nlapiGetRole();
        if (role == '1258' || role == '3') {
            var recId = nlapiGetRecordId(); // id current record
            var record = nlapiLoadRecord('customer', recId); // load record supportcase with their id and retunr object record
            customform = record.getFieldValue('customform'); // Id custom form

            if (customform == 50) {

                //nlapiLogExecution('DEBUG', 'Formulario', 'Id Form Edit and View: ' + idFormEditAndView + ' Id Form Create: ' + idFomrCreate);
                //ACTION: CREATE tab 'Revisiones'
                var titleTab_tipoAlopecia = 'Tipo Alopecia';
                var tabtipoalopecia = form.addTab('custpage_tipoalopecia', titleTab_tipoAlopecia);

                form.insertTab(tabtipoalopecia, 'support');

                //VARIABLES: get the label fields from filed objects in backend netsuite
                var fieldLabel_tipoAlopecia_1 = nlapiGetField('custentity168').getLabel();
                var fieldLabel_tipoAlopecia_2 = nlapiGetField('custentity185').getLabel();
                var fieldLabel_tipoAlopecia_3 = nlapiGetField('custentity293').getLabel();
                var fieldLabel_tipoAlopecia_4 = nlapiGetField('custentity179').getLabel();
                var fieldLabel_tipoAlopecia_5 = nlapiGetField('custentity178').getLabel();
                var fieldLabel_tipoAlopecia_6 = nlapiGetField('custentity177').getLabel();
                var fieldLabel_tipoAlopecia_7 = nlapiGetField('custentity176').getLabel();
                var fieldLabel_tipoAlopecia_8 = nlapiGetField('custentity175').getLabel();
                var fieldLabel_tipoAlopecia_9 = nlapiGetField('custentity174').getLabel();
                var fieldLabel_tipoAlopecia_10 = nlapiGetField('custentity173').getLabel();
                var fieldLabel_tipoAlopecia_11 = nlapiGetField('custentity171').getLabel();
                var fieldLabel_tipoAlopecia_12 = nlapiGetField('custentity172').getLabel();
                var fieldLabel_tipoAlopecia_13 = nlapiGetField('custentity180').getLabel();
                var fieldLabel_tipoAlopecia_14 = nlapiGetField('custentity181').getLabel();
                var fieldLabel_tipoAlopecia_15 = nlapiGetField('custentity182').getLabel();
                var fieldLabel_tipoAlopecia_16 = nlapiGetField('custentity183').getLabel();
                var fieldLabel_tipoAlopecia_17 = nlapiGetField('custentity77').getLabel();
                var fieldLabel_tipoAlopecia_18 = nlapiGetField('custentity74').getLabel();
                var fieldLabel_tipoAlopecia_19 = nlapiGetField('custentity184').getLabel();
                var fieldLabel_tipoAlopecia_20 = nlapiGetField('custentity274').getLabel();
                var fieldLabel_tipoAlopecia_21 = nlapiGetField('custentity275').getLabel();
                var fieldLabel_tipoAlopecia_22 = nlapiGetField('custentity276').getLabel();
                var fieldLabel_tipoAlopecia_23 = nlapiGetField('custentity291').getLabel();
                var fieldLabel_tipoAlopecia_24 = nlapiGetField('custentity315').getLabel();
                var fieldLabel_tipoAlopecia_25 = nlapiGetField('custentity316').getLabel();
                var fieldLabel_tipoAlopecia_26 = nlapiGetField('custentity186').getLabel();
                var fieldLabel_tipoAlopecia_27 = nlapiGetField('custentity187').getLabel();
                var fieldLabel_tipoAlopecia_28 = nlapiGetField('custentity278').getLabel();
                var fieldLabel_tipoAlopecia_29 = nlapiGetField('custentity189').getLabel();
                var fieldLabel_tipoAlopecia_30 = nlapiGetField('custentity272').getLabel();
                var fieldLabel_tipoAlopecia_31 = nlapiGetField('custentity361').getLabel();
                var fieldLabel_tipoAlopecia_32 = nlapiGetField('custentity281').getLabel();
                var fieldLabel_tipoAlopecia_33 = nlapiGetField('custentity282').getLabel();
                var fieldLabel_tipoAlopecia_34 = nlapiGetField('custentity284').getLabel();
                var fieldLabel_tipoAlopecia_35 = nlapiGetField('custentity358').getLabel();
                var fieldLabel_tipoAlopecia_36 = nlapiGetField('custentity353').getLabel();
                var fieldLabel_tipoAlopecia_37 = nlapiGetField('custentity362').getLabel();
                var fieldLabel_tipoAlopecia_38 = nlapiGetField('custentity285').getLabel();
                var fieldLabel_tipoAlopecia_39 = nlapiGetField('custentity294').getLabel();
                var fieldLabel_tipoAlopecia_40 = nlapiGetField('custentity359').getLabel();
                var fieldLabel_tipoAlopecia_41 = nlapiGetField('custentity360').getLabel();
                var fieldLabel_tipoAlopecia_42 = nlapiGetField('custentity363').getLabel();

                //VARIABLES: get the field values from backend netsuite
                var fieldValue_tipoAlopecia_1 = nlapiGetFieldText('custentity168');
                var fieldValue_tipoAlopecia_2 = nlapiGetFieldValue('custentity185');
                var fieldValue_tipoAlopecia_3 = nlapiGetFieldValue('custentity293');
                var fieldValue_tipoAlopecia_4 = nlapiGetFieldValue('custentity179');
                var fieldValue_tipoAlopecia_5 = nlapiGetFieldValue('custentity178');
                var fieldValue_tipoAlopecia_6 = nlapiGetFieldValue('custentity177');
                var fieldValue_tipoAlopecia_7 = nlapiGetFieldValue('custentity176');
                var fieldValue_tipoAlopecia_8 = nlapiGetFieldValue('custentity175');
                var fieldValue_tipoAlopecia_9 = nlapiGetFieldValue('custentity174');
                var fieldValue_tipoAlopecia_10 = nlapiGetFieldValue('custentity173');
                var fieldValue_tipoAlopecia_11 = nlapiGetFieldValue('custentity171');
                var fieldValue_tipoAlopecia_12 = nlapiGetFieldValue('custentity172');
                var fieldValue_tipoAlopecia_13 = nlapiGetFieldValue('custentity180');
                var fieldValue_tipoAlopecia_14 = nlapiGetFieldValue('custentity181');
                var fieldValue_tipoAlopecia_15 = nlapiGetFieldValue('custentity182');
                var fieldValue_tipoAlopecia_16 = nlapiGetFieldValue('custentity183');
                var fieldValue_tipoAlopecia_17 = nlapiGetFieldText('custentity77');
                var fieldValue_tipoAlopecia_18 = nlapiGetFieldValue('custentity74');
                var fieldValue_tipoAlopecia_19 = nlapiGetFieldText('custentity184');
                var fieldValue_tipoAlopecia_20 = nlapiGetFieldValue('custentity274');
                var fieldValue_tipoAlopecia_21 = nlapiGetFieldValue('custentity275');
                var fieldValue_tipoAlopecia_22 = nlapiGetFieldValue('custentity276');
                var fieldValue_tipoAlopecia_23 = nlapiGetFieldValue('custentity291');
                var fieldValue_tipoAlopecia_24 = nlapiGetFieldValue('custentity315');
                var fieldValue_tipoAlopecia_25 = nlapiGetFieldValue('custentity316');
                var fieldValue_tipoAlopecia_26 = nlapiGetFieldValue('custentity186');
                var fieldValue_tipoAlopecia_27 = nlapiGetFieldValue('custentity187');
                var fieldValue_tipoAlopecia_28 = nlapiGetFieldValue('custentity278');
                var fieldValue_tipoAlopecia_29 = nlapiGetFieldValue('custentity189');
                var fieldValue_tipoAlopecia_30 = nlapiGetFieldValue('custentity272');
                var fieldValue_tipoAlopecia_31 = nlapiGetFieldValue('custentity361');
                var fieldValue_tipoAlopecia_32 = nlapiGetFieldText('custentity281');
                var fieldValue_tipoAlopecia_33 = nlapiGetFieldValue('custentity282');
                var fieldValue_tipoAlopecia_34 = nlapiGetFieldValue('custentity284');
                var fieldValue_tipoAlopecia_35 = nlapiGetFieldText('custentity358');
                var fieldValue_tipoAlopecia_36 = nlapiGetFieldText('custentity353');
                var fieldValue_tipoAlopecia_37 = nlapiGetFieldValue('custentity362');
                var fieldValue_tipoAlopecia_38 = nlapiGetFieldValue('custentity285');
                var fieldValue_tipoAlopecia_39 = nlapiGetFieldValue('custentity294');
                var fieldValue_tipoAlopecia_40 = nlapiGetFieldValue('custentity359');
                var fieldValue_tipoAlopecia_41 = nlapiGetFieldValue('custentity360');
                var fieldValue_tipoAlopecia_42 = nlapiGetFieldValue('custentity363');

                var titleGroup_tipoAlopecia_1 = 'Diagramas de clasificación por tipo AA';
                var titleGroup_tipoAlopecia_2 = 'Registros de evaluación de Densidad';
                var titleGroup_tipoAlopecia_3 = 'Área de Medición';
                var titleGroup_tipoAlopecia_4 = 'Tipos de Alopecia';
                var titleGroup_tipoAlopecia_5 = 'Fotos de Valoración.';
                var titleGroup_tipoAlopecia_6 = 'Presupuesto';

                //ACTION: Create custom groups
                form.addFieldGroup('group_tipoalopecia_1', titleGroup_tipoAlopecia_1, 'custpage_tipoalopecia');
                form.addFieldGroup('group_tipoalopecia_2', titleGroup_tipoAlopecia_2, 'custpage_tipoalopecia');
                form.addFieldGroup('group_tipoalopecia_3', titleGroup_tipoAlopecia_3, 'custpage_tipoalopecia');
                form.addFieldGroup('group_tipoalopecia_4', titleGroup_tipoAlopecia_4, 'custpage_tipoalopecia');
                form.addFieldGroup('group_tipoalopecia_5', titleGroup_tipoAlopecia_5, 'custpage_tipoalopecia');
                form.addFieldGroup('group_tipoalopecia_6', titleGroup_tipoAlopecia_6, 'custpage_tipoalopecia');

                //ACTION: Create custom fields
                form.addField('custpage_tipoalopecia_1', 'text', fieldLabel_tipoAlopecia_1, null, 'group_tipoalopecia_1');
                form.addField('custpage_tipoalopecia_2', 'text', fieldLabel_tipoAlopecia_2, null, 'group_tipoalopecia_1');
                form.addField('custpage_tipoalopecia_3', 'text', fieldLabel_tipoAlopecia_3, null, 'group_tipoalopecia_1');
                form.addField('custpage_tipoalopecia_4', 'text', fieldLabel_tipoAlopecia_4, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_5', 'text', fieldLabel_tipoAlopecia_5, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_6', 'text', fieldLabel_tipoAlopecia_6, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_7', 'text', fieldLabel_tipoAlopecia_7, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_8', 'text', fieldLabel_tipoAlopecia_8, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_9', 'text', fieldLabel_tipoAlopecia_9, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_10', 'text', fieldLabel_tipoAlopecia_10, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_11', 'text', fieldLabel_tipoAlopecia_11, null, 'group_tipoalopecia_2');
                form.addField('custpage_tipoalopecia_12', 'text', fieldLabel_tipoAlopecia_12, null, 'group_tipoalopecia_3');
                form.addField('custpage_tipoalopecia_13', 'text', fieldLabel_tipoAlopecia_13, null, 'group_tipoalopecia_3');
                form.addField('custpage_tipoalopecia_14', 'text', fieldLabel_tipoAlopecia_14, null, 'group_tipoalopecia_3');
                form.addField('custpage_tipoalopecia_15', 'text', fieldLabel_tipoAlopecia_15, null, 'group_tipoalopecia_3');
                form.addField('custpage_tipoalopecia_16', 'text', fieldLabel_tipoAlopecia_16, null, 'group_tipoalopecia_3');
                form.addField('custpage_tipoalopecia_17', 'text', fieldLabel_tipoAlopecia_17, null, 'group_tipoalopecia_4');
                form.addField('custpage_tipoalopecia_18', 'text', fieldLabel_tipoAlopecia_18, null, 'group_tipoalopecia_4');
                form.addField('custpage_tipoalopecia_19', 'text', fieldLabel_tipoAlopecia_19, null, 'group_tipoalopecia_4');
                form.addField('custpage_tipoalopecia_20', 'text', fieldLabel_tipoAlopecia_20, null, 'group_tipoalopecia_5');
                form.addField('custpage_tipoalopecia_21', 'text', fieldLabel_tipoAlopecia_21, null, 'group_tipoalopecia_5');
                form.addField('custpage_tipoalopecia_22', 'text', fieldLabel_tipoAlopecia_22, null, 'group_tipoalopecia_5');
                form.addField('custpage_tipoalopecia_23', 'text', fieldLabel_tipoAlopecia_23, null, 'group_tipoalopecia_5');
                form.addField('custpage_tipoalopecia_24', 'text', fieldLabel_tipoAlopecia_24, null, 'group_tipoalopecia_5');
                form.addField('custpage_tipoalopecia_25', 'text', fieldLabel_tipoAlopecia_25, null, 'group_tipoalopecia_5');
                form.addField('custpage_tipoalopecia_26', 'text', fieldLabel_tipoAlopecia_26, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_27', 'text', fieldLabel_tipoAlopecia_27, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_28', 'text', fieldLabel_tipoAlopecia_28, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_29', 'text', fieldLabel_tipoAlopecia_29, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_30', 'text', fieldLabel_tipoAlopecia_30, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_31', 'text', fieldLabel_tipoAlopecia_31, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_32', 'text', fieldLabel_tipoAlopecia_32, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_33', 'text', fieldLabel_tipoAlopecia_33, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_34', 'text', fieldLabel_tipoAlopecia_34, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_35', 'text', fieldLabel_tipoAlopecia_35, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_36', 'text', fieldLabel_tipoAlopecia_36, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_37', 'text', fieldLabel_tipoAlopecia_37, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_38', 'text', fieldLabel_tipoAlopecia_38, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_39', 'text', fieldLabel_tipoAlopecia_39, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_40', 'text', fieldLabel_tipoAlopecia_40, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_41', 'text', fieldLabel_tipoAlopecia_41, null, 'group_tipoalopecia_6');
                form.addField('custpage_tipoalopecia_42', 'text', fieldLabel_tipoAlopecia_42, null, 'group_tipoalopecia_6');

                //VARIABLES: array of name custom fileds in frontend view
                var arr_hmComplemento_nameFields = ['custpage_tipoalopecia_1', 'custpage_tipoalopecia_2', 'custpage_tipoalopecia_3', 'custpage_tipoalopecia_4', 'custpage_tipoalopecia_5', 'custpage_tipoalopecia_6', 'custpage_tipoalopecia_7', 'custpage_tipoalopecia_8', 'custpage_tipoalopecia_9', 'custpage_tipoalopecia_10', 'custpage_tipoalopecia_11', 'custpage_tipoalopecia_12', 'custpage_tipoalopecia_13', 'custpage_tipoalopecia_14', 'custpage_tipoalopecia_15', 'custpage_tipoalopecia_16', 'custpage_tipoalopecia_17', 'custpage_tipoalopecia_18', 'custpage_tipoalopecia_19', 'custpage_tipoalopecia_20', 'custpage_tipoalopecia_21', 'custpage_tipoalopecia_22', 'custpage_tipoalopecia_23', 'custpage_tipoalopecia_24', 'custpage_tipoalopecia_25', 'custpage_tipoalopecia_26', 'custpage_tipoalopecia_27', 'custpage_tipoalopecia_28', 'custpage_tipoalopecia_29', 'custpage_tipoalopecia_30', 'custpage_tipoalopecia_31', 'custpage_tipoalopecia_32', 'custpage_tipoalopecia_33', 'custpage_tipoalopecia_34', 'custpage_tipoalopecia_35', 'custpage_tipoalopecia_36', 'custpage_tipoalopecia_37', 'custpage_tipoalopecia_38', 'custpage_tipoalopecia_39', 'custpage_tipoalopecia_40', 'custpage_tipoalopecia_41', 'custpage_tipoalopecia_42'];
                //VARIABLES: array with field values from backend netsuite
                var arr_hmComplemento_valueFields = [fieldValue_tipoAlopecia_1, fieldValue_tipoAlopecia_2, fieldValue_tipoAlopecia_3, fieldValue_tipoAlopecia_4, fieldValue_tipoAlopecia_5, fieldValue_tipoAlopecia_6, fieldValue_tipoAlopecia_7, fieldValue_tipoAlopecia_8, fieldValue_tipoAlopecia_9, fieldValue_tipoAlopecia_10, fieldValue_tipoAlopecia_11, fieldValue_tipoAlopecia_12, fieldValue_tipoAlopecia_13, fieldValue_tipoAlopecia_14, fieldValue_tipoAlopecia_15, fieldValue_tipoAlopecia_16, fieldValue_tipoAlopecia_17, fieldValue_tipoAlopecia_18, fieldValue_tipoAlopecia_19, fieldValue_tipoAlopecia_20, fieldValue_tipoAlopecia_21, fieldValue_tipoAlopecia_22, fieldValue_tipoAlopecia_23, fieldValue_tipoAlopecia_24, fieldValue_tipoAlopecia_25, fieldValue_tipoAlopecia_26, fieldValue_tipoAlopecia_27, fieldValue_tipoAlopecia_28, fieldValue_tipoAlopecia_29, fieldValue_tipoAlopecia_30, fieldValue_tipoAlopecia_31, fieldValue_tipoAlopecia_32, fieldValue_tipoAlopecia_33, fieldValue_tipoAlopecia_34, fieldValue_tipoAlopecia_35, fieldValue_tipoAlopecia_36, fieldValue_tipoAlopecia_37, fieldValue_tipoAlopecia_38, fieldValue_tipoAlopecia_39, fieldValue_tipoAlopecia_40, fieldValue_tipoAlopecia_41, fieldValue_tipoAlopecia_42];

                try {
                    //ACTION: Setting the custom fields in frontend with the field values in backend netsuite
                    for (var revCount = 0; revCount < arr_hmComplemento_nameFields.length; revCount++) {
                        if (arr_hmComplemento_valueFields[revCount] != null) {
                            nlapiSetFieldValue(arr_hmComplemento_nameFields[revCount], arr_hmComplemento_valueFields[revCount]);
                        }
                    }
                    //ACTION: Setting the custom fields with property inline when the field value in backend is different to null
                    for (var i in arr_hmComplemento_nameFields) {
                        elementoBlockear_closed = nlapiGetField(arr_hmComplemento_nameFields[i]);
                        elementoBlockear_value = arr_hmComplemento_valueFields[i];
                        //if (elementoBlockear_value != null) {
                        elementoBlockear_closed.setDisplayType('inline');
                        //}
                    }
                } catch (error) {
                    nlapiLogExecution('ERROR', 'Error beforeLoad', error);
                    nlapiLogExecution('ERROR', 'Error from load field values: ', arr_hmComplemento_valueFields);
                    //nlapiLogExecution('ERROR', 'Data error: ' + 'ROLE: ' + role + ' USER: ' + user + ' ID TEXT CLIENT: ' + companyText);
                }
            }
        }
    }
}