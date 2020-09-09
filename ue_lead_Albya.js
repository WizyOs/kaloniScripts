/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope Public
*/

define(['N/record', 'N/log', 'N/runtime', 'N/ui/serverWidget'], function (record, log, runtime, widget) {

    function beforeLoad(context) {
        var arr_objFields = [];
        var arr_objFields_values = [];
        var arr_objCustomFields = [];

        if (context.type == 'view' || context.type == 'quickview' || context.type == 'edit') {
            //ACTION: Carga el objeto Cliente
            var customer = record.load({ type: 'customer', id: context.request.parameters.id, isDynamic: true });
            var subsidiaria = customer.getValue({ fieldId: 'subsidiary' });

            //VARIABLES: Labels for custom fields (can be translated)
            //Questions for Lipo
            var questLipo_a = '¿Qué zona quieres disminuir?';
            var questLipo_b = '¿Cuánto pesa?';
            var questLipo_c = '¿Cuánto mide?';
            var questLipo_d = '¿Qué edad tiene?';
            var questLipo_e = '¿Que tanta definición quiere tener? Sin grasa, natural, marcado, peso deseado';
            //Questions for Mamoplastía
            //increase
            var questMamoIncrease_a = '¿Que tamaño de sostén utiliza?';
            var questMamoIncrease_b = '¿Que tamaño de sostén desea utilizar?';
            var questMamoIncrease_c = '¿Qué edad tiene?';
            //reduction
            var questMamoReduction_a = '¿Que talla eres? Peso. Altura. Tamaño de sostén';
            var questMamoReduction_b = '¿A que tallas quieres llegar? Tamaño de sostén.';
            var questMamoReduction_c = '¿Qué edad tiene?';
            //Questions for Rinoplastia
            var questRino_a = '¿Qué tipo de nariz tiene?';
            var questRino_b = '¿Qué no te gusta de tu nariz?';
            var questRino_c = '¿Cómo quisieras tener la nariz?';
            var questRino_d = '¿Tiene problemas de respiración?';
            var questRino_e = '¿Ronca?';
            //Question for Blefaroplastia
            var questBlefa_a = '¿Tiene vista cansada?';
            var questBlefa_b = '¿Te vas mayor a tu edad?';
            var questBlefa_c = ' ¿Qué color de piel tienes?';
            var questBlefa_d = '¿Qué tipo de cutis tiene? Graso, seco, normal';
            var questBlefa_e = '¿Qué zona de los ojos quieres mejorar? Parpados, bolsas, ojeras, patas de gallo';
            var questBlefa_f = '¿Tiene párpados caídos?';

            //VARIABLES: backend fields values
            var field_value_category = customer.getValue({ fieldId: 'category' });
            var filed_custentity_valoracion_online = customer.getValue({ fieldId: 'custentity_valoracion_online' });
            var field_value_custentity297 = customer.getValue({ fieldId: 'custentity297' });
            var field_value_custentity301 = customer.getValue({ fieldId: 'custentity301' });
            var field_value_custentity300 = customer.getValue({ fieldId: 'custentity300' });
            var field_value_custentity303 = customer.getValue({ fieldId: 'custentity303' });
            var field_value_custentity299 = customer.getValue({ fieldId: 'custentity299' });
            var field_value_custentity295 = customer.getValue({ fieldId: 'custentity295' });
            var field_value_custentity336 = customer.getValue({ fieldId: 'custentity336' });
            var field_value_custentity337 = customer.getValue({ fieldId: 'custentity337' });
            var field_value_custentity338 = customer.getValue({ fieldId: 'custentity338' });
            var field_value_custentity302 = customer.getValue({ fieldId: 'custentity302' });
            var field_value_custentity298 = customer.getValue({ fieldId: 'custentity298' });

            //FIXME: Groups UI through serverWidget with its fields
            //ACTION: Se elige un grupo o el otro dependiendo de la subsidiaria del lead, si es 19 (albya) entra group_perfilAlbya cualquier otra entra group_perfilKaloni
            if (subsidiaria == '19') {
                var group_perfilAlbya = context.form.addFieldGroup({ id: 'custpage_perfil_albya', label: 'Prueba Grupo preguntas basicas procedimientos albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity1', label: questLipo_a, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity2', label: questLipo_b, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity3', label: questLipo_c, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity4', label: questLipo_d, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity5', label: questLipo_e, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity6', label: questMamoIncrease_a, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity7', label: questMamoIncrease_b, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity8', label: questMamoIncrease_c, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity9', label: questMamoReduction_a, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity10', label: questMamoReduction_b, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity11', label: questMamoReduction_c, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity12', label: questRino_a, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity13', label: questRino_b, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity14', label: questRino_c, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity15', label: questRino_d, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity16', label: questRino_e, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity17', label: questBlefa_a, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity18', label: questBlefa_b, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity19', label: questBlefa_c, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity20', label: questBlefa_d, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity21', label: questBlefa_e, type: 'text', container: 'custpage_perfil_albya' });
                context.form.addField({ id: 'custpage_perfilalbya_custentity22', label: questBlefa_f, type: 'text', container: 'custpage_perfil_albya' });
            } else {
                var group_perfilKaloni = context.form.addFieldGroup({ id: 'custpage_perfil_kaloni', label: 'Perfilamiento K-Center' });
                var frontend_field_category = context.form.addField({ id: 'custpage_perfilkaloni_category', label: 'CATEGORÍA', type: 'select', source: '', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity_valoracion_online = context.form.addField({ id: 'custpage_perfilkaloni_custentity_valoracion_online', label: 'VALORACIÓN ON-LINE', type: 'checkbox', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity297 = context.form.addField({ id: 'custpage_perfilkaloni_custentity297', label: 'ÁREA DE INTERÉS', type: 'select', source: 'customlist490', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity301 = context.form.addField({ id: 'custpage_perfilkaloni_custentity301', label: '¿HACE CUANTO QUE NOTO LA PERDIDA?', type: 'text', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity300 = context.form.addField({ id: 'custpage_perfilkaloni_custentity300', label: '¿HA HECHO ALGO AL RESPECTO?', type: 'checkbox', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity303 = context.form.addField({ id: 'custpage_perfilkaloni_custentity303', label: '¿A QUE SE DEDICA?', type: 'text', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity299 = context.form.addField({ id: 'custpage_perfilkaloni_custentity299', label: 'EDAD', type: 'select', source: '', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity295 = context.form.addField({ id: 'custpage_perfilkaloni_custentity295', label: 'COMENTARIO K-CENTER', type: 'text', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity336 = context.form.addField({ id: 'custpage_perfilkaloni_custentity336', label: 'PRIMER NIVEL', type: 'select', source: 'customlist569', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity337 = context.form.addField({ id: 'custpage_perfilkaloni_custentity337', label: 'SEGUNDO NIVEL', type: 'select', source: 'customlist570', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity338 = context.form.addField({ id: 'custpage_perfilkaloni_custentity338', label: 'TERCER NIVEL', type: 'select', source: 'customlist571', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity302 = context.form.addField({ id: 'custpage_perfilkaloni_custentity302', label: 'MEDIO DE CONTACTO', type: 'select', source: 'customlist571', container: 'custpage_perfil_kaloni' });
                var frontend_field_custentity298 = context.form.addField({ id: 'custpage_perfilkaloni_custentity298', label: 'HORA DE CONTACTO', type: 'text', container: 'custpage_perfil_kaloni' });

                try {
                    customer.setValue({ fieldId: 'custpage_perfilkaloni_custentity301', value: 'Valor' });                   
                } catch (error) {
                    log.error('error', error);
                }
            }
        }
    }

    function beforeSubmit(context) {
        var typeOfContext = context.type;
        var recId = '';
        var arr_objFields = [];
        var arr_objFields_values = [];

        if (typeOfContext == 'edit') {

        } else if (typeOfContext == 'view') {

        }

        log.debug('Context de beforeSubmit', context);
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
    };
});