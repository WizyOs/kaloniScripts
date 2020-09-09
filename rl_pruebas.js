/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
   function doGet(params) { }

   function doPost(params) {

      var objJson, response;
      var response = [], arr_objResult = [];
      if (typeof params === "object") {
         objJson = params;
      } else {
         objJson = JSON.parse(params);
      }
      log.debug("params", objJson);

      /*       var param_idCustomer = objJson.idCustomer;
           
            var objRecord_Customer = record.load({
               type: record.Type.CUSTOMER,
               id: param_idCustomer,
               isDynamic: true
            });
       */

      var param_idCase = objJson.idCase;

      var obj_case_procedure = record.load({
         type: record.Type.SUPPORT_CASE,
         id: param_idCase,
         isDynamic: true
      });

      // SUBLISTS
      // ARRAYS TO RESPONSE SUBLISTS

      /**************
       * Medical Indications Sublist
       */
      var arr_medicalIndications = [];
      var counterSublist_medicalIndications = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord356' });
      if (counterSublist_medicalIndications > 0) {
         for (i = 0; i < counterSublist_medicalIndications; i++) {
            custrecord353 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord353', line: i }) || '';
            custrecord355 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord355', line: i }) || '';
            custrecord436 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord436', line: i }) || '';
            custrecord437 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord356', fieldId: 'custrecord437', line: i }) || '';

            arr_medicalIndications.push({
               "datem": custrecord353,
               "timem": custrecord355,
               "indications": custrecord436,
               "responsable": custrecord437
            });
         }
      } else {
         arr_medicalIndications.push("NO DATA");
      }

      /**************
       * Medication
       */
      var arr_medication = [];
      var counterSublist_medication = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord256' });
      if (counterSublist_medication > 0) {
         for (i = 0; i < counterSublist_medication; i++) {
            custrecord251 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord251', line: i }) || '';
            custrecord252 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord252', line: i }) || '';
            custrecord253 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord253', line: i }) || '';
            custrecord254 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord254', line: i }) || '';
            custrecord255 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord256', fieldId: 'custrecord255', line: i }) || '';

            arr_medication.push({
               "drug": custrecord251,
               "dose": custrecord252,
               "via": custrecord253,
               "time": custrecord254,
               "administer": custrecord255,
            });
         }
      } else {
         arr_medication.push("NO DATA");
      }

      /**************
       * Intravenous solutions
       */
      var arr_intravenousSolutions = [];
      var counterSublist_intravenousSolutions = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord261' });
      if (counterSublist_intravenousSolutions > 0) {
         for (i = 0; i < counterSublist_intravenousSolutions; i++) {
            custrecord257 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord257', line: i }) || '';
            custrecord258 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord258', line: i }) || '';
            custrecord259 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord259', line: i }) || '';
            custrecord260 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord261', fieldId: 'custrecord260', line: i }) || '';

            arr_intravenousSolutions.push({
               "solution": custrecord257,
               "volume": custrecord258,
               "startTime": custrecord259,
               "preparedBy": custrecord260
            });
         }
      } else {
         arr_intravenousSolutions.push("NO DATA");
      }

      /**************
       * Vital signs
       */
      var arr_vitalSigns = [];
      var counterSublist_vitalSigns = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord285' });
      if (counterSublist_vitalSigns > 0) {
         for (i = 0; i < counterSublist_vitalSigns; i++) {
            custrecord281 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord281', line: i }) || '';
            custrecord282 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord282', line: i }) || '';
            custrecord283 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord283', line: i }) || '';
            custrecord284 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord285', fieldId: 'custrecord284', line: i }) || '';

            arr_vitalSigns.push({
               "heartRate": custrecord281,
               "volume": custrecord282,
               "SPO2": custrecord283,
               "T/AMMHG": custrecord284
            });
         }
      } else {
         arr_vitalSigns.push("NO DATA");
      }

      /**************
       * Cat, probes, drains
       */
      var arr_catProbesDrains = [];
      var counterSublist_catProbesDrains = obj_case_procedure.getLineCount({ sublistId: 'recmachcustrecord427' });
      if (counterSublist_catProbesDrains > 0) {
         for (i = 0; i < counterSublist_catProbesDrains; i++) {
            custrecord428 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord428', line: i }) || '';
            custrecord429 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord429', line: i }) || '';
            custrecord430 = obj_case_procedure.getSublistText({ sublistId: 'recmachcustrecord427', fieldId: 'custrecord430', line: i }) || '';

            arr_catProbesDrains.push({
               "type": custrecord428,
               "installedBy": custrecord429,
               "insertionSite": custrecord430
            });
         }
      } else {
         arr_catProbesDrains.push("NO DATA");
      }

      return {
         "sublists": [
            {
               "medicalIndications": arr_medicalIndications
            },
            {
               "medication": arr_medication
            },
            {
               "intravenousSolutions": arr_intravenousSolutions
            },
            {
               "vitalSigns": arr_vitalSigns
            },
            {
               "catProbesDrains": arr_catProbesDrains
            }
         ]
      }

   }

   return {
      post: doPost
   };
});