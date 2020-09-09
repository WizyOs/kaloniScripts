/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/log','N/format', 'N/runtime'], function(record,log,format,runtime) {

    function beforeLoad(context)
    {
      var userObj = runtime.getCurrentUser();
      var subsidiary = userObj.subsidiary;

      if(context.type == "view")
      {
        var currentRec = context.newRecord;
        var currentInvoiceId = context.newRecord.id;

        var rec = record.load({type: 'supportcase', id: currentInvoiceId});
      	var customform = rec.getValue({fieldId: 'customform'});
        log.debug('customform: ', customform);
        var customformText = rec.getText({fieldId: 'customform'});
        log.debug('customformText: ', customformText);

        if(customform == "134") // (customformText.indexOf("Hist Clinica") != -1 || customformText.indexOf("F-Historia Clinica") != -1) && 
        {
          context.form.clientScriptFileId = 3227068;
          context.form.addButton({id:'custpage_button_diagnostico_capilar', label:'Dx Capilar', functionName:'diagCap'});
          context.form.addButton({id:'custpage_button_skin', label:'Dx Qx/no Qx', functionName:'diagSkin'});
        }

        if(customform == "138") // (customformText.indexOf("skin & body") != -1 || customformText.indexOf("skin & body") != -1) &&
        {
          context.form.clientScriptFileId = 3227068;
          //context.form.addButton({id:'custpage_button_btnskin', label:'Skin', functionName:'btnSkin'});
          context.form.addButton({id:'custpage_button_btnbody', label:'No QX', functionName:'btnBody'});
          context.form.addButton({id:'custpage_button_btnqx', label:'QX', functionName:'btnQx'});
        }

        if(customform == "135") // if Diagnostico Capilar
        {
          var field_validate_custevent856 = rec.getValue({ fieldId: 'custevent856' });
          log.debug(field_validate_custevent856);
          if ((field_validate_custevent856 == true && subsidiary == 6) || userObj.role == 3 || userObj.role == 1258 || userObj.role == 1173) {
            context.form.clientScriptFileId = 3227068;
            context.form.addButton({id:'custpage_button_diagnostico_capilar', label:'Procedimiento', functionName:'diagCap2'});
          } else if (subsidiary != 6) {
            context.form.clientScriptFileId = 3227068;
            context.form.addButton({id:'custpage_button_diagnostico_capilar', label:'Procedimiento', functionName:'diagCap2'});
          }
        }

      }

     if(context.type == "edit")
     {
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        var customform_id = objRecord.getValue({fieldId: 'customform'});
        log.debug('Recetas customform_id: ', customform_id);
        
        log.debug('Recetas userObj: ', userObj);
        if(customform_id == "14" || customform_id == "148" || customform_id == "26" || customform_id == "-100" || customform_id == "-102" || customform_id == "-102")
        {
           if(userObj.role != "1187" && userObj.role != "1012" && userObj.role != "3" && userObj.role != "1098") // && userObj.role != "3" 
           {
             try
             {
               context.form.getField('custevent202').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent197').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent203').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent484').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent177').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent180').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent178').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent181').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent179').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent182').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent183').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent187').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent184').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent188').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent185').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent189').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent186').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent190').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent196').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent204').updateDisplayType({displayType:'disabled'});
               context.form.getField('custevent857').updateDisplayType({displayType:'disabled'});
               log.debug('Recetas bloquear campos donde userObj.role sea diferente de: ', '(1187, 1012, 3, 1098)');
             }catch(e){
               log.debug('Exception: ', e);
             }
           }
        }
     }

      /*if(context.type == "create")
      {
        log.debug('beforeLoad context.type: ', context.type);
        var currentRec = context.newRecord;
        log.debug('beforeLoad currentRec: ', currentRec);
      }*/
    }

    return {
        beforeLoad: beforeLoad
    };
});
