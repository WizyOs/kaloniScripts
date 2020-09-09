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
                var titleTab_hm = 'H.M';
                var tabhm = form.addTab('custpage_hm', titleTab_hm);

                form.insertTab(tabhm, 'support');

                //VARIABLES: get the label fields from filed objects in backend netsuite
                var fieldLabel_hm_enfermedadAbuelos = nlapiGetField('custentity18').getLabel();
                var fieldLabel_hm_enfermedadAbuelos_cual = nlapiGetField('custentity42').getLabel();
                var fieldLabel_hm_cirugiaPrevia = nlapiGetField('custentity19').getLabel();
                var fieldLabel_hm_cirugiaPrevia_cual = nlapiGetField('custentity43').getLabel();
                var fieldLabel_hm_aplicadoAnestesia = nlapiGetField('custentity20').getLabel();
                var fieldLabel_hm_alergia = nlapiGetField('custentity21').getLabel();
                var fieldLabel_hm_alergia_cual = nlapiGetField('custentity44').getLabel();
                var fieldLabel_hm_sangradoGinNasal = nlapiGetField('custentity45').getLabel();
                var fieldLabel_hm_cicatrizacion = nlapiGetField('custentity46').getLabel();
                var fieldLabel_hm_diabetes = nlapiGetField('custentity47').getLabel();
                var fieldLabel_hm_diabetes_tratamiento = nlapiGetField('custentity48').getLabel();
                var fieldLabel_hm_renal = nlapiGetField('custentity52').getLabel();
                var fieldLabel_hm_renal_tratamiento = nlapiGetField('custentity53').getLabel();
                var fieldLabel_hm_neurologico = nlapiGetField('custentity54').getLabel();
                var fieldLabel_hm_neurologico_tratamiento = nlapiGetField('custentity55').getLabel();
                var fieldLabel_hm_vihHepatitis = nlapiGetField('custentity56').getLabel();
                var fieldLabel_hm_vihHepatitis_resultado = nlapiGetField('custentity57').getLabel();
                var fieldLabel_hm_alcohol = nlapiGetField('custentity71').getLabel();
                var fieldLabel_hm_medicamento = nlapiGetField('custentity73').getLabel();
                var fieldLabel_hm_medicamento_cual = nlapiGetField('custentity75').getLabel();
                var fieldLabel_hm_fuma = nlapiGetField('custentity70').getLabel();
                var fieldLabel_hm_artritis = nlapiGetField('custentity58').getLabel();
                var fieldLabel_hm_asma = nlapiGetField('custentity59').getLabel();
                var fieldLabel_hm_cancer = nlapiGetField('custentity60').getLabel();
                var fieldLabel_hm_claustrofobia = nlapiGetField('custentity61').getLabel();
                var fieldLabel_hm_colitis = nlapiGetField('custentity62').getLabel();
                var fieldLabel_hm_eczema = nlapiGetField('custentity63').getLabel();
                var fieldLabel_hm_epilepsia = nlapiGetField('custentity64').getLabel();
                var fieldLabel_hm_hipotiroidismo = nlapiGetField('custentity65').getLabel();
                var fieldLabel_hm_gastritis = nlapiGetField('custentity66').getLabel();
                var fieldLabel_hm_hipertiroidismo = nlapiGetField('custentity67').getLabel();
                var fieldLabel_hm_psoriasis = nlapiGetField('custentity68').getLabel();
                var fieldLabel_hm_hipertension = nlapiGetField('custentity50').getLabel();
                var fieldLabel_hm_hipertension_tratamiento = nlapiGetField('custentity51').getLabel();
                var fieldLabel_hm_sindromeMetabolico = nlapiGetField('custentity269').getLabel();
                var fieldLabel_hm_diabetes2 = nlapiGetField('custentity370').getLabel();
                var fieldLabel_hm_diabetes2_especifique = nlapiGetField('custentity373').getLabel();
                var fieldLabel_hm_hipertension2 = nlapiGetField('custentity374').getLabel();
                var fieldLabel_hm_hipertension2_especifique = nlapiGetField('custentity375').getLabel();
                var fieldLabel_hm_cancer2 = nlapiGetField('custentity376').getLabel();
                var fieldLabel_hm_cancer2_especifique = nlapiGetField('custentity377').getLabel();
                var fieldLabel_hm_menarca = nlapiGetField('custentity378').getLabel();
                var fieldLabel_hm_menstruacion = nlapiGetField('custentity379').getLabel();
                var fieldLabel_hm_embarazos = nlapiGetField('custentity380').getLabel();
                var fieldLabel_hm_g = nlapiGetField('custentity381').getLabel();
                var fieldLabel_hm_p = nlapiGetField('custentity382').getLabel();
                var fieldLabel_hm_c = nlapiGetField('custentity383').getLabel();
                var fieldLabel_hm_a = nlapiGetField('custentity384').getLabel();
                var fieldLabel_hm_motivoProcedimiento = nlapiGetField('custentity78').getLabel();
                var fieldLabel_hm_seguimientoMedical = nlapiGetField('custentity385').getLabel();
                var fieldLabel_hm_referenciasImportantes = nlapiGetField('custentity167').getLabel();
                var fieldLabel_hm_diagnostico = nlapiGetField('custentity292').getLabel();
                var fieldLabel_hm_fechaProc = nlapiGetField('custentity157').getLabel();
                var fieldLabel_hm_otroDatoImportante = nlapiGetField('custentity79').getLabel();
                var fieldLabel_hm_enfermedadPadres = nlapiGetField('custentity17').getLabel();
                var fieldLabel_hm_procedimientos = nlapiGetField('custentity158').getLabel();
                var fieldLabel_hm_tx = nlapiGetField('custentity170').getLabel();
                var fieldLabel_hm_tiras = nlapiGetField('custentity159').getLabel();
                var fieldLabel_hm_idx = nlapiGetField('custentity169').getLabel();
                var fieldLabel_hm_considerarProyeccion = nlapiGetField('custentity357').getLabel();

                //VARIABLES: get the field values from backend netsuite
                var fieldValue_hm_enfermedadAbuelos = nlapiGetFieldValue('custentity18');
                var fieldValue_hm_enfermedadAbuelos_cual = nlapiGetFieldValue('custentity42');
                var fieldValue_hm_cirugiaPrevia = nlapiGetFieldValue('custentity19');
                var fieldValue_hm_cirugiaPrevia_cual = nlapiGetFieldValue('custentity43');
                var fieldValue_hm_aplicadoAnestesia = nlapiGetFieldText('custentity20');
                var fieldValue_hm_alergia = nlapiGetFieldValue('custentity21');
                var fieldValue_hm_alergia_cual = nlapiGetFieldValue('custentity44');
                var fieldValue_hm_sangradoGinNasal = nlapiGetFieldValue('custentity45');
                var fieldValue_hm_cicatrizacion = nlapiGetFieldText('custentity46');
                var fieldValue_hm_diabetes = nlapiGetFieldText('custentity47');
                var fieldValue_hm_diabetes_tratamiento = nlapiGetFieldValue('custentity48');
                var fieldValue_hm_renal = nlapiGetFieldValue('custentity52');
                var fieldValue_hm_renal_tratamiento = nlapiGetFieldValue('custentity53');
                var fieldValue_hm_neurologico = nlapiGetFieldValue('custentity54');
                var fieldValue_hm_neurologico_tratamiento = nlapiGetFieldValue('custentity55');
                var fieldValue_hm_vihHepatitis = nlapiGetFieldValue('custentity56');
                var fieldValue_hm_vihHepatitis_resultado = nlapiGetFieldValue('custentity57');
                var fieldValue_hm_alcohol = nlapiGetFieldValue('custentity71');
                var fieldValue_hm_medicamento = nlapiGetFieldValue('custentity73');
                var fieldValue_hm_medicamento_cual = nlapiGetFieldValue('custentity75');
                var fieldValue_hm_fuma = nlapiGetFieldValue('custentity70');
                var fieldValue_hm_artritis = nlapiGetFieldValue('custentity58');
                var fieldValue_hm_asma = nlapiGetFieldValue('custentity59');
                var fieldValue_hm_cancer = nlapiGetFieldValue('custentity60');
                var fieldValue_hm_claustrofobia = nlapiGetFieldValue('custentity61');
                var fieldValue_hm_colitis = nlapiGetFieldValue('custentity62');
                var fieldValue_hm_eczema = nlapiGetFieldValue('custentity63');
                var fieldValue_hm_epilepsia = nlapiGetFieldValue('custentity64');
                var fieldValue_hm_hipotiroidismo = nlapiGetFieldValue('custentity65');
                var fieldValue_hm_gastritis = nlapiGetFieldValue('custentity66');
                var fieldValue_hm_hipertiroidismo = nlapiGetFieldValue('custentity67');
                var fieldValue_hm_psoriasis = nlapiGetFieldValue('custentity68');
                var fieldValue_hm_hipertension = nlapiGetFieldValue('custentity50');
                var fieldValue_hm_hipertension_tratamiento = nlapiGetFieldValue('custentity51');
                var fieldValue_hm_sindromeMetabolico = nlapiGetFieldValue('custentity269');
                var fieldValue_hm_diabetes2 = nlapiGetFieldText('custentity370');
                var fieldValue_hm_diabetes2_especifique = nlapiGetFieldValue('custentity373');
                var fieldValue_hm_hipertension2 = nlapiGetFieldText('custentity374');
                var fieldValue_hm_hipertension2_especifique = nlapiGetFieldValue('custentity375');
                var fieldValue_hm_cancer2 = nlapiGetFieldText('custentity376');
                var fieldValue_hm_cancer2_especifique = nlapiGetFieldValue('custentity377');
                var fieldValue_hm_menarca = nlapiGetFieldValue('custentity378');
                var fieldValue_hm_menstruacion = nlapiGetFieldValue('custentity379');
                var fieldValue_hm_embarazos = nlapiGetFieldValue('custentity380');
                var fieldValue_hm_g = nlapiGetFieldValue('custentity381');
                var fieldValue_hm_p = nlapiGetFieldValue('custentity382');
                var fieldValue_hm_c = nlapiGetFieldValue('custentity383');
                var fieldValue_hm_a = nlapiGetFieldValue('custentity384');
                var fieldValue_hm_motivoProcedimiento = nlapiGetFieldText('custentity78');
                var fieldValue_hm_seguimientoMedical = nlapiGetFieldText('custentity385');
                var fieldValue_hm_referenciasImportantes = nlapiGetFieldValue('custentity167');
                var fieldValue_hm_diagnostico = nlapiGetFieldValue('custentity292');
                var fieldValue_hm_fechaProc = nlapiGetFieldValue('custentity157');
                var fieldValue_hm_otroDatoImportante = nlapiGetFieldValue('custentity79');
                var fieldValue_hm_enfermedadPadres = nlapiGetFieldValue('custentity17');
                var fieldValue_hm_procedimientos = nlapiGetFieldText('custentity158');
                var fieldValue_hm_tx = nlapiGetFieldValue('custentity170');
                var fieldValue_hm_tiras = nlapiGetFieldText('custentity159');
                var fieldValue_hm_idx = nlapiGetFieldValue('custentity169');
                var fieldValue_hm_considerarProyeccion = nlapiGetFieldValue('custentity357');

                var titleGroup_hmComplemento_1 = 'Historia Clinica';
                var titleGroup_hmComplemento_2 = 'Marque con una "x" sipadece algunas de estas enfermedades.';
                var titleGroup_hmComplemento_3 = 'Antecedentes Heredofamiliares';
                var titleGroup_hmComplemento_4 = 'Antecedentes ginecoobstetricos (si aplica)';
                var titleGroup_hmComplemento_5 = 'Motivo de Procedimiento(SI/NO)';
                var titleGroup_hmComplemento_6 = 'Diagnostico microcamara';
                var titleGroup_hmComplemento_7 = 'Fecha de Procedimiento Agendado';

                //ACTION: Create custom groups
                form.addFieldGroup('group_hm_1', titleGroup_hmComplemento_1, 'custpage_hm');
                form.addFieldGroup('group_hm_2', titleGroup_hmComplemento_2, 'custpage_hm');
                form.addFieldGroup('group_hm_3', titleGroup_hmComplemento_3, 'custpage_hm');
                form.addFieldGroup('group_hm_4', titleGroup_hmComplemento_4, 'custpage_hm');
                form.addFieldGroup('group_hm_5', titleGroup_hmComplemento_5, 'custpage_hm');
                form.addFieldGroup('group_hm_6', titleGroup_hmComplemento_6, 'custpage_hm');
                form.addFieldGroup('group_hm_7', titleGroup_hmComplemento_7, 'custpage_hm');

                //ACTION: Create custom fields
                form.addField('custpage_hm_1', 'checkbox', fieldLabel_hm_enfermedadAbuelos, null, 'group_hm_1');
                form.addField('custpage_hm_2', 'text', fieldLabel_hm_enfermedadAbuelos_cual, null, 'group_hm_1');
                form.addField('custpage_hm_3', 'checkbox', fieldLabel_hm_cirugiaPrevia, null, 'group_hm_1');
                form.addField('custpage_hm_4', 'text', fieldLabel_hm_cirugiaPrevia_cual, null, 'group_hm_1');
                form.addField('custpage_hm_5', 'text', fieldLabel_hm_aplicadoAnestesia, null, 'group_hm_1');
                form.addField('custpage_hm_6', 'checkbox', fieldLabel_hm_alergia, null, 'group_hm_1');
                form.addField('custpage_hm_7', 'text', fieldLabel_hm_alergia_cual, null, 'group_hm_1');
                form.addField('custpage_hm_8', 'checkbox', fieldLabel_hm_sangradoGinNasal, null, 'group_hm_1');
                form.addField('custpage_hm_9', 'text', fieldLabel_hm_cicatrizacion, null, 'group_hm_1');
                form.addField('custpage_hm_10', 'text', fieldLabel_hm_diabetes, null, 'group_hm_1');
                form.addField('custpage_hm_11', 'text', fieldLabel_hm_diabetes_tratamiento, null, 'group_hm_1');
                form.addField('custpage_hm_12', 'checkbox', fieldLabel_hm_renal, null, 'group_hm_1');
                form.addField('custpage_hm_13', 'text', fieldLabel_hm_renal_tratamiento, null, 'group_hm_1');
                form.addField('custpage_hm_14', 'checkbox', fieldLabel_hm_neurologico, null, 'group_hm_1');
                form.addField('custpage_hm_15', 'text', fieldLabel_hm_neurologico_tratamiento, null, 'group_hm_1');
                form.addField('custpage_hm_16', 'text', fieldLabel_hm_vihHepatitis, null, 'group_hm_1');
                form.addField('custpage_hm_17', 'text', fieldLabel_hm_vihHepatitis_resultado, null, 'group_hm_1');
                form.addField('custpage_hm_18', 'checkbox', fieldLabel_hm_alcohol, null, 'group_hm_1');
                form.addField('custpage_hm_19', 'checkbox', fieldLabel_hm_medicamento, null, 'group_hm_1');
                form.addField('custpage_hm_20', 'text', fieldLabel_hm_medicamento_cual, null, 'group_hm_1');
                form.addField('custpage_hm_21', 'checkbox', fieldLabel_hm_fuma, null, 'group_hm_1');
                form.addField('custpage_hm_22', 'checkbox', fieldLabel_hm_artritis, null, 'group_hm_2');
                form.addField('custpage_hm_23', 'checkbox', fieldLabel_hm_asma, null, 'group_hm_2');
                form.addField('custpage_hm_24', 'checkbox', fieldLabel_hm_cancer, null, 'group_hm_2');
                form.addField('custpage_hm_25', 'checkbox', fieldLabel_hm_claustrofobia, null, 'group_hm_2');
                form.addField('custpage_hm_26', 'checkbox', fieldLabel_hm_colitis, null, 'group_hm_2');
                form.addField('custpage_hm_27', 'checkbox', fieldLabel_hm_eczema, null, 'group_hm_2');
                form.addField('custpage_hm_28', 'checkbox', fieldLabel_hm_epilepsia, null, 'group_hm_2');
                form.addField('custpage_hm_29', 'checkbox', fieldLabel_hm_hipotiroidismo, null, 'group_hm_2');
                form.addField('custpage_hm_30', 'checkbox', fieldLabel_hm_gastritis, null, 'group_hm_2');
                form.addField('custpage_hm_31', 'checkbox', fieldLabel_hm_hipertiroidismo, null, 'group_hm_2');
                form.addField('custpage_hm_32', 'checkbox', fieldLabel_hm_psoriasis, null, 'group_hm_2');
                form.addField('custpage_hm_33', 'checkbox', fieldLabel_hm_hipertension, null, 'group_hm_2');
                form.addField('custpage_hm_34', 'text', fieldLabel_hm_hipertension_tratamiento, null, 'group_hm_2');
                form.addField('custpage_hm_35', 'checkbox', fieldLabel_hm_sindromeMetabolico, null, 'group_hm_2');
                form.addField('custpage_hm_36', 'text', fieldLabel_hm_diabetes2, null, 'group_hm_3');
                form.addField('custpage_hm_37', 'text', fieldLabel_hm_diabetes2_especifique, null, 'group_hm_3');
                form.addField('custpage_hm_38', 'text', fieldLabel_hm_hipertension2, null, 'group_hm_3');
                form.addField('custpage_hm_39', 'text', fieldLabel_hm_hipertension2_especifique, null, 'group_hm_3');
                form.addField('custpage_hm_40', 'text', fieldLabel_hm_cancer2, null, 'group_hm_3');
                form.addField('custpage_hm_41', 'text', fieldLabel_hm_cancer2_especifique, null, 'group_hm_3');
                form.addField('custpage_hm_42', 'text', fieldLabel_hm_menarca, null, 'group_hm_4');
                form.addField('custpage_hm_43', 'text', fieldLabel_hm_menstruacion, null, 'group_hm_4');
                form.addField('custpage_hm_44', 'text', fieldLabel_hm_embarazos, null, 'group_hm_4');
                form.addField('custpage_hm_45', 'checkbox', fieldLabel_hm_g, null, 'group_hm_4');
                form.addField('custpage_hm_46', 'checkbox', fieldLabel_hm_p, null, 'group_hm_4');
                form.addField('custpage_hm_47', 'checkbox', fieldLabel_hm_c, null, 'group_hm_4');
                form.addField('custpage_hm_48', 'checkbox', fieldLabel_hm_a, null, 'group_hm_4');
                form.addField('custpage_hm_49', 'text', fieldLabel_hm_motivoProcedimiento, null, 'group_hm_5');
                form.addField('custpage_hm_50', 'text', fieldLabel_hm_seguimientoMedical, null, 'group_hm_5');
                form.addField('custpage_hm_51', 'text', fieldLabel_hm_referenciasImportantes, null, 'group_hm_5');
                form.addField('custpage_hm_52', 'text', fieldLabel_hm_diagnostico, null, 'group_hm_6');
                form.addField('custpage_hm_53', 'text', fieldLabel_hm_fechaProc, null, 'group_hm_7');
                form.addField('custpage_hm_54', 'text', fieldLabel_hm_otroDatoImportante, null, 'group_hm_7');
                form.addField('custpage_hm_55', 'checkbox', fieldLabel_hm_enfermedadPadres, null, 'group_hm_7');
                form.addField('custpage_hm_56', 'text', fieldLabel_hm_procedimientos, null, 'group_hm_7');
                form.addField('custpage_hm_57', 'text', fieldLabel_hm_tx, null, 'group_hm_7');
                form.addField('custpage_hm_58', 'text', fieldLabel_hm_tiras, null, 'group_hm_7');
                form.addField('custpage_hm_59', 'text', fieldLabel_hm_idx, null, 'group_hm_7');
                form.addField('custpage_hm_60', 'text', fieldLabel_hm_considerarProyeccion, null, 'group_hm_7');

                //VARIABLES: array of name custom fileds in frontend view
                var arr_hmComplemento_nameFields = ['custpage_hm_1', 'custpage_hm_2', 'custpage_hm_3', 'custpage_hm_4', 'custpage_hm_5', 'custpage_hm_6', 'custpage_hm_7', 'custpage_hm_8', 'custpage_hm_9', 'custpage_hm_10', 'custpage_hm_11', 'custpage_hm_12', 'custpage_hm_13', 'custpage_hm_14', 'custpage_hm_15', 'custpage_hm_16', 'custpage_hm_17', 'custpage_hm_18', 'custpage_hm_19', 'custpage_hm_20', 'custpage_hm_21', 'custpage_hm_22', 'custpage_hm_23', 'custpage_hm_24', 'custpage_hm_25', 'custpage_hm_26', 'custpage_hm_27', 'custpage_hm_28', 'custpage_hm_29', 'custpage_hm_30', 'custpage_hm_31', 'custpage_hm_32', 'custpage_hm_33', 'custpage_hm_34', 'custpage_hm_35', 'custpage_hm_36', 'custpage_hm_37', 'custpage_hm_38', 'custpage_hm_39', 'custpage_hm_40', 'custpage_hm_41', 'custpage_hm_42', 'custpage_hm_43', 'custpage_hm_44', 'custpage_hm_45', 'custpage_hm_46', 'custpage_hm_47', 'custpage_hm_48', 'custpage_hm_49', 'custpage_hm_50', 'custpage_hm_51', 'custpage_hm_52', 'custpage_hm_53', 'custpage_hm_54', 'custpage_hm_55', 'custpage_hm_56', 'custpage_hm_57', 'custpage_hm_58', 'custpage_hm_59', 'custpage_hm_60'];
                //VARIABLES: array with field values from backend netsuite
                var arr_hmComplemento_valueFields = [fieldValue_hm_enfermedadAbuelos, fieldValue_hm_enfermedadAbuelos_cual, fieldValue_hm_cirugiaPrevia, fieldValue_hm_cirugiaPrevia_cual, fieldValue_hm_aplicadoAnestesia, fieldValue_hm_alergia, fieldValue_hm_alergia_cual, fieldValue_hm_sangradoGinNasal, fieldValue_hm_cicatrizacion, fieldValue_hm_diabetes, fieldValue_hm_diabetes_tratamiento, fieldValue_hm_renal, fieldValue_hm_renal_tratamiento, fieldValue_hm_neurologico, fieldValue_hm_neurologico_tratamiento, fieldValue_hm_vihHepatitis, fieldValue_hm_vihHepatitis_resultado, fieldValue_hm_alcohol, fieldValue_hm_medicamento, fieldValue_hm_medicamento_cual, fieldValue_hm_fuma, fieldValue_hm_artritis, fieldValue_hm_asma, fieldValue_hm_cancer, fieldValue_hm_claustrofobia, fieldValue_hm_colitis, fieldValue_hm_eczema, fieldValue_hm_epilepsia, fieldValue_hm_hipotiroidismo, fieldValue_hm_gastritis, fieldValue_hm_hipertiroidismo, fieldValue_hm_psoriasis, fieldValue_hm_hipertension, fieldValue_hm_hipertension_tratamiento, fieldValue_hm_sindromeMetabolico, fieldValue_hm_diabetes2, fieldValue_hm_diabetes2_especifique, fieldValue_hm_hipertension2, fieldValue_hm_hipertension2_especifique, fieldValue_hm_cancer2, fieldValue_hm_cancer2_especifique, fieldValue_hm_menarca, fieldValue_hm_menstruacion, fieldValue_hm_embarazos, fieldValue_hm_g, fieldValue_hm_p, fieldValue_hm_c, fieldValue_hm_a, fieldValue_hm_motivoProcedimiento, fieldValue_hm_seguimientoMedical, fieldValue_hm_referenciasImportantes, fieldValue_hm_diagnostico, fieldValue_hm_fechaProc, fieldValue_hm_otroDatoImportante, fieldValue_hm_enfermedadPadres, fieldValue_hm_procedimientos, fieldValue_hm_tx, fieldValue_hm_tiras, fieldValue_hm_idx, fieldValue_hm_considerarProyeccion];

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