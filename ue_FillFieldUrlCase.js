/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope SameAccount
*/
define(['N/record', 'N/url', 'N/runtime', 'N/log'], function (record, url, runtime, log) {

    function beforeLoad(context) {
        var currentRecord = context.newRecord;
        var caseId = currentRecord.id;
        //var companyId = currentRecord.getValue({fieldId: 'company'});

        // Condition that will run the codes only on View.
        if (context.type == 'view' && caseId != null && caseId != "")
        {
          try
          {
            var caseURL = url.resolveRecord({ recordType: 'supportcase', recordId: caseId, isEditMode: false });
            var caseRecord = record.load({type:'supportcase', id:caseId, isDynamic:true});
            //var subsidiary = caseRecord.getValue({fieldId: 'subsidiary'});
            caseRecord.setValue({ fieldId: 'custevent480', value: caseURL });
            caseRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
          }catch(error){
              log.debug('Error on Save custevent480 caseURL', error);
          }
        }

        if (context.type == 'view' || context.type == 'edit') {
            var userObj = runtime.getCurrentUser();
            //log.error('userObj.role: ', userObj.role);
            if (userObj.role != "3")
                context.form.getField('custevent480').updateDisplayType({ displayType: 'hidden' });
        }
    }

	function afterSubmit(context)
    {
       if(context.type == "create")
       {
         try
         {
         	log.debug("context.type: ", context.type);
            var rec = context.newRecord;
            var recordId = rec.id;
            log.debug("recordId: ", recordId);
            var caseRecord = record.load({type:'supportcase', id:recordId, isDynamic: true});
            var customform = caseRecord.getValue({fieldId: 'customform'});
         	log.debug("customform: ", customform);
            if(customform == "134")
            {
              var company = caseRecord.getValue({fieldId: 'company'});
          	  log.debug("company: ", company);
              var comoSeEnteroDeNosotros = caseRecord.getValue({fieldId: 'custevent208'});
          	  log.debug("comoSeEnteroDeNosotros: ", comoSeEnteroDeNosotros);
              var comoSeEnteroDeNosotrosText = caseRecord.getText({fieldId: 'custevent208'});
          	  log.debug("comoSeEnteroDeNosotrosText: ", comoSeEnteroDeNosotrosText);
              if(company != "" && company != null && comoSeEnteroDeNosotros != "" && comoSeEnteroDeNosotros != null)
              {
                var customerRecord = record.load({type:'customer', id:company, isDynamic: true});
                var subsidiary = customerRecord.getValue({fieldId: 'subsidiary'});
                log.debug("subsidiary: ", subsidiary);
                if(subsidiary != "19") // 19 = Albya
                {
                  if(subsidiary == "6" || subsidiary == "12" || subsidiary == "11" || subsidiary == "10" || subsidiary == "16" || subsidiary == "15" || subsidiary == "17" || subsidiary == "13")
                  {
                     if(comoSeEnteroDeNosotrosText.indexOf("App Web") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Chat Pagina Web") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Google Busqueda") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Google Display") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Pagina Web") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Skin") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Youtube") >= 0){

                       customerRecord.setValue({fieldId:'custentity38', value:comoSeEnteroDeNosotros});
                       //Marketing Campaigns
                       if(subsidiary == "6") // Mexico
                          customerRecord.setValue({fieldId:'leadsource', value:"156219"}); // Campaña Google Mx
                       if(subsidiary == "12") // España
                          customerRecord.setValue({fieldId:'leadsource', value:"8060459"}); // Campaña Google Es
                       if(subsidiary == "11") // Brasil
                          customerRecord.setValue({fieldId:'leadsource', value:"8078154"}); // Campaña Google Br
                       if(subsidiary == "10") // Colombia
                          customerRecord.setValue({fieldId:'leadsource', value:"8092695"}); // Campaña Google Col
                       if(subsidiary == "16") // Republica Dominicana
                          customerRecord.setValue({fieldId:'leadsource', value:"10357889"}); // CAMPAÑA GOOGLE STO
                       if(subsidiary == "15") // Kaloni USA
                          customerRecord.setValue({fieldId:'leadsource', value:"10697536"}); // Campaña Google USA
                       if(subsidiary == "17") // Alemania
                          customerRecord.setValue({fieldId:'leadsource', value:"10706906"}); // Campaña Google Alemania
                       if(subsidiary == "13") // Austria
                          customerRecord.setValue({fieldId:'leadsource', value:"11973834"}); // Campaña Google Austria

                       customerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                       log.debug("CHANGED FIELD CUSTOMER: ", "MEDIOS * & LEAD SOURCE");

                     }else if(comoSeEnteroDeNosotrosText.indexOf("K-Sell") >= 0){

                        customerRecord.setValue({fieldId:'custentity38', value:comoSeEnteroDeNosotros});
                        customerRecord.setValue({fieldId:'leadsource', value:"76614"}); // ?? Campaña Afiliados
                        customerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                        log.debug("CHANGED FIELD CUSTOMER: ", "MEDIOS * & LEAD SOURCE");

                     }else if(comoSeEnteroDeNosotrosText.indexOf("Chat Facebook") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Cine") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Facebook") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Instagram") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Transmisión en Vivo") >= 0){
                        customerRecord.setValue({fieldId:'custentity38', value:comoSeEnteroDeNosotros});
                        if(subsidiary == "6") // Mexico
                           customerRecord.setValue({fieldId:'leadsource', value:"156218"}); // Campaña Facebook Mx
                        if(subsidiary == "12") // España
                           customerRecord.setValue({fieldId:'leadsource', value:"8058843"}); // Campaña Facebook Es
                        if(subsidiary == "11") // Brasil
                          customerRecord.setValue({fieldId:'leadsource', value:"8078255"}); // Campaña Facebook Br
                        if(subsidiary == "10") // Colombia
                          customerRecord.setValue({fieldId:'leadsource', value:"8092897"}); // Campaña Facebook Col
                        if(subsidiary == "16") // Republica Dominicana
                          customerRecord.setValue({fieldId:'leadsource', value:"10357895"}); // CAMPAÑA FACEBOOK STO
                        if(subsidiary == "15") // Kaloni USA
                          customerRecord.setValue({fieldId:'leadsource', value:"10697380"}); // Campaña Facebook USA
                        if(subsidiary == "17") // Alemania
                          customerRecord.setValue({fieldId:'leadsource', value:"10706905"}); // Campaña Facebook Alemania
                        if(subsidiary == "13") // Austria
                          customerRecord.setValue({fieldId:'leadsource', value:"11973835"}); // Campaña Facebook Austria

                        customerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                        log.debug("CHANGED FIELD CUSTOMER: ", "MEDIOS * & LEAD SOURCE");

                     }else if(comoSeEnteroDeNosotrosText.indexOf("Backlightsb") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Biocarrera Satèlite") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Convenio Corporativo") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Crisalix") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Espectacular") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Espectacular  Satelite") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Espectacular Satelite") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Espectacular Borderline") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Espectacular GDL") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Excelsior") >= 0 || comoSeEnteroDeNosotrosText.indexOf("FasTrack") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Folleto") >= 0 || comoSeEnteroDeNosotrosText.indexOf("G. Imagen Radio") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Libro Kaloni") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Life and Style digital") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Luxe and Class") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Mar FM Veracruz") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Mundo Ejecutivo") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Periodico El Norte") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Periodico el Universal") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Periodico Img del Golfo en Veracruz") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Periodico Reforma") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Radio Veracruz 96.5 FM") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Recomendacion (paciente)") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Air-Europa") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Aire Aeromexico") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Avianca") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Club de Corredores") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Fiestas Alcobendas") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Health and Fitness Satèlite") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Iberia") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Masoneria") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Revista Pozuelo-Inn") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Robot Artas") >= 0 || comoSeEnteroDeNosotrosText.indexOf("T.V.") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Torneo de Golf") >= 0){

                        customerRecord.setValue({fieldId:'custentity38', value:comoSeEnteroDeNosotros});
                        if(subsidiary == "6") // Mexico
                           customerRecord.setValue({fieldId:'leadsource', value:"157655"}); // Campaña OFF-LINE
                        if(subsidiary == "12") // España
                           customerRecord.setValue({fieldId:'leadsource', value:"8062877"}); // Campaña Offline Es
                        /*if(subsidiary == "11") // Brasil
                          customerRecord.setValue({fieldId:'leadsource', value:""}); // */
                        if(subsidiary == "10") // Colombia
                          customerRecord.setValue({fieldId:'leadsource', value:"8092898"}); // Campaña Offline Col
                        if(subsidiary == "16") // Republica Dominicana
                          customerRecord.setValue({fieldId:'leadsource', value:"10357898"}); // CAMPAÑA OFFLINE STO
                        if(subsidiary == "15") // Kaloni USA
                          customerRecord.setValue({fieldId:'leadsource', value:"10697547"}); // Campaña Offline USA
                        if(subsidiary == "17") // Alemania
                          customerRecord.setValue({fieldId:'leadsource', value:"10706917"}); // Campaña Offline Alemania
                        /*if(subsidiary == "13") // Austria
                          customerRecord.setValue({fieldId:'leadsource', value:""}); // */

                        customerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                        log.debug("CHANGED FIELD CUSTOMER: ", "MEDIOS * & LEAD SOURCE");

                     }else if(comoSeEnteroDeNosotrosText.indexOf("Migrados") >= 0){

                        customerRecord.setValue({fieldId:'custentity38', value:comoSeEnteroDeNosotros});
                        customerRecord.setValue({fieldId:'leadsource', value:"159891"}); // ?? Campaña Migrados
                        customerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                        log.debug("CHANGED FIELD CUSTOMER: ", "MEDIOS * & LEAD SOURCE");

                     }else if(comoSeEnteroDeNosotrosText.indexOf("Enrique Guajardo") >= 0 || comoSeEnteroDeNosotrosText.indexOf("Influencers") >= 0){

                        customerRecord.setValue({fieldId:'custentity38', value:comoSeEnteroDeNosotros});
                        if(subsidiary == "6") // Mexico
                           customerRecord.setValue({fieldId:'leadsource', value:"333882"}); // Campaña Intercambios
                        if(subsidiary == "12") // España
                           customerRecord.setValue({fieldId:'leadsource', value:"8069673"}); // Campaña Intercambio Es
                        /*if(subsidiary == "11") // Brasil
                          customerRecord.setValue({fieldId:'leadsource', value:""}); // */
                        if(subsidiary == "10") // Colombia
                          customerRecord.setValue({fieldId:'leadsource', value:"8092900"}); // Campaña Intercambio Col
                        if(subsidiary == "16") // Republica Dominicana
                          customerRecord.setValue({fieldId:'leadsource', value:"10357899"}); // CAMPAÑA INTERCAMBIO STO
                        if(subsidiary == "15") // Kaloni USA
                          customerRecord.setValue({fieldId:'leadsource', value:"10697542"}); // Campaña Intercambio USA
                        if(subsidiary == "17") // Alemania
                          customerRecord.setValue({fieldId:'leadsource', value:"10706919"}); // Campaña Intercambio Alemania
                        /*if(subsidiary == "13") // Austria
                          customerRecord.setValue({fieldId:'leadsource', value:""}); // */

                        customerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
                        log.debug("CHANGED FIELD CUSTOMER: ", "MEDIOS * & LEAD SOURCE");

                     }else{
                       log.debug("CHANGED FIELD CUSTOMER: ", "NO COINCIDE MEDIOS * " + comoSeEnteroDeNosotrosText);
                     }
                  }
                }
              }
            }
         }catch(e){
           log.debug("Exception afterSubmit: ", e);
         }
       }
	}

    return {
      beforeLoad: beforeLoad,
      afterSubmit: afterSubmit
    }
});