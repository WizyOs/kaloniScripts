/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
   function doGet(params) { }

   function doPost(params) {

      var objJson;
      if (typeof params === "object") {
         objJson = params;
      } else {
         objJson = JSON.parse(params);
      }
      log.debug("params", objJson);

      var param_idCustomer = objJson.idCustomer;
      var param_firstname = objJson.firstname;
      var param_lastname = objJson.lastname;
      var param_institute = objJson.institute;
      var param_dateOfBirth = objJson.dateOfBirth;
      var param_gender = objJson.gender;
      var param_phone = objJson.phone;
      var param_speciality = objJson.speciality;
      var param_professionalLicense = objJson.professionalLicense;
      var param_rfc = objJson.rfc;
      var param_review = objJson.review;
      var param_pass = objJson.pass;
      var param_typeChange = objJson.typeChange;

      var  arr_speciality = param_speciality.split(",");
      log.debug("arr_speciality", arr_speciality);

      // GLOBALS
      var response = [];

      if (param_idCustomer !== "" && param_idCustomer !== null && param_idCustomer !== undefined) {

         try {
            var objRecord_LoadEmployee = record.load({
               type: record.Type.EMPLOYEE,
               id: param_idCustomer
            });

            if (param_typeChange === "perfil") {
               objRecord_LoadEmployee.setValue({ fieldId: "firstname", value: param_firstname });
               objRecord_LoadEmployee.setValue({ fieldId: "lastname", value: param_lastname });
               objRecord_LoadEmployee.setValue({ fieldId: "custentity393", value: param_institute });
               objRecord_LoadEmployee.setText({ fieldId: "birthdate", text: param_dateOfBirth });
               objRecord_LoadEmployee.setValue({ fieldId: "custentity350", value: param_gender });
               objRecord_LoadEmployee.setValue({ fieldId: "phone", value: param_phone });
               objRecord_LoadEmployee.setValue({ fieldId: "custentity435", value: arr_speciality });
               objRecord_LoadEmployee.setValue({ fieldId: "custentity392", value: param_professionalLicense });
               objRecord_LoadEmployee.setValue({ fieldId: "custentity_rfc", value: param_rfc });
               objRecord_LoadEmployee.setValue({ fieldId: "custentity441", value: param_review });
            } else if (param_typeChange === "pass") {
               objRecord_LoadEmployee.setValue({ fieldId: "custentity440", value: param_pass });
            }

            var objRecord_SaveId = objRecord_LoadEmployee.save({
               enableSourcing: false,
               ignoreMandatoryFields: true
            });

            response.push({
               "idEmployee": objRecord_SaveId,
               "UPDATE_RECORD_EMPLOYEE": "OK"
            });
         } catch (error) {
            log.error("ERR_UPDATE_RECORD_EMPLOYEE", error);
            response.push({
               "idEmployee": objRecord_SaveId,
               "ERR_UPDATE_RECORD_EMPLOYEE": error
            });
         }
      }

      return response;
   }

   return {
      get: doGet,
      post: doPost
   };
});