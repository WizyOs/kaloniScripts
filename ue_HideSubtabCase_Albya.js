/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/log', 'N/record'], function(serverWidget, log, record) {

    function beforeLoad(context)
    {
       if(context.type == "edit" || context.type == "view")
       {
         try
         {
            var currentCaseId = context.newRecord.id;
            var rec = record.load({type: 'supportcase', id: currentCaseId, isDynamic: true});
            var subsidiary_Val = rec.getValue({fieldId: 'subsidiary'});
            log.debug('edit & view - subsidiary_Val: ', subsidiary_Val);
            if(subsidiary_Val == "19")
            {
              // \ \ Creates a variable containing the current form
              var currentForm = context.form;
              //create an inline html field
              var hideSubTab = currentForm.addField({id:'custpage_hide_subtab', label:'not shown - subtab', type: serverWidget.FieldType.INLINEHTML});
              //for every button you want to hide, modify the scr += line
              var scr = "";
              scr += 'jQuery("#custom243lnk").hide();';
              //push the script into the field so that it fires and does its handy work
              hideSubTab.defaultValue = "<script>jQuery(function($){require([], function(){" + scr + ";})})</script>"
            }

         }catch(e){
           log.debug('edit & view - Exception log:', e);
         }
       }

       if(context.type == "create")
       {
         try
         {
            var subsidiary_Val = context.form.getField({id:'subsidiary'}).defaultValue;
            log.debug('create - subsidiary_Val: ', subsidiary_Val);
            if(subsidiary_Val == "19")
            {
               // \ \ Creates a variable containing the current form
               var currentForm = context.form;
               //create an inline html field
               var hideSubTab = currentForm.addField({id:'custpage_hide_subtab', label:'not shown - subtab', type: serverWidget.FieldType.INLINEHTML});
               //for every button you want to hide, modify the scr += line
               var scr = "";
               scr += 'jQuery("#custom243lnk").hide();';
               //push the script into the field so that it fires and does its handy work
               hideSubTab.defaultValue = "<script>jQuery(function($){require([], function(){" + scr + ";})})</script>"
            }

         }catch(e){
           log.debug('create - Exception log:', e);
         }
       }
    }

    return {
        beforeLoad: beforeLoad
    };
});
