/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    var scriptObj = runtime.getCurrentScript();
    var objJson = JSON.parse(params);
    log.debug("params", params);
    var param_idTransaction = objJson.idTransaction; // save or get
    var param_idCustomer = objJson.idCustomer; // id Customer in netsuite
    var param_custrecord443 = objJson.fechaReceta; // date // fecha de creación de receta
    var param_custrecord444 = objJson.medicamentosPaciente; // textarea // Medicamentos
    var param_custrecord446 = objJson.observacionesPaciente; // textarea // Observaciones medicas
    var param_custrecord445 = objJson.vencimientoReceta; // date // fecha de vencimiento de receta
    //var param_custrecord447 = objJson.nombreDoctor; // texto // nombre del doctor
    var param_custrecord449 = objJson.firmaMed; // documento // firma del doctor
    var param_custrecord447 = objJson.nacimientoPaciente; // fecha de nacimiento del paciente

    log.debug("idCustomer", param_idCustomer);
    // CONSTANTS
    var idSublista = "recmachcustrecord442";
    var errorLoad = false;

    // GLOBALS
    var responseData = [];
    var file_content_FirmaMedico;
    var customerAge;

    try {
      var objRecord_LoadCustomer = record.load({
        type: record.Type.CUSTOMER,
        id: param_idCustomer,
        isDynamic: true
      });

      var nameCustomer = objRecord_LoadCustomer.getText({
        fieldId: "altname"
      });

      var numLines = objRecord_LoadCustomer.getLineCount({
        sublistId: idSublista
      });
    } catch (error) {
      errorLoad = true;
      log.error("Error Load Sublist Recetas", error);
    }

    //TODO: Send Data List from "Recetas"
    if (param_idTransaction == "get" && errorLoad == false) {
      log.debug("numLines", numLines);
      if (numLines > 0) {
        for (var i = 0; i < numLines; i++) {
          var sublistField_custrecord443 = objRecord_LoadCustomer.getSublistValue({
            sublistId: idSublista,
            fieldId: "custrecord443",
            line: i
          }) || "";
          var sublistField_custrecord445 = objRecord_LoadCustomer.getSublistValue({
            sublistId: idSublista,
            fieldId: "custrecord445",
            line: i
          }) || "";
          var sublistField_custrecord444 = objRecord_LoadCustomer.getSublistText({
            sublistId: idSublista,
            fieldId: "custrecord444",
            line: i
          }) || "";
          var sublistField_custrecord446 = objRecord_LoadCustomer.getSublistText({
            sublistId: idSublista,
            fieldId: "custrecord446",
            line: i
          }) || "";
          var sublistField_custrecord447 = objRecord_LoadCustomer.getSublistValue({
            sublistId: idSublista,
            fieldId: "custrecord447",
            line: i
          }) || "";
          if (sublistField_custrecord447 != "") {
            customerAge = getAge(sublistField_custrecord447)
          } else {
            customerAge = "";
          }
          var sublistField_custrecord449 = objRecord_LoadCustomer.getSublistValue({
            sublistId: idSublista,
            fieldId: "custrecord449",
            line: i
          }) || null;
          if (sublistField_custrecord449 != null) {
            var obj_FirmaMedico = file.load({
              id: sublistField_custrecord449
            });
            file_content_FirmaMedico = "data:image/png;base64," + obj_FirmaMedico.getContents();
          } else {
            file_content_FirmaMedico = "";
          }
          var daysExpirationPrescription = getExpirationDays(sublistField_custrecord443, sublistField_custrecord445);

          responseData[i] = {
            "idReceta": parseInt(i) + 1,
            "data": [{
              "nombrePaciente": nameCustomer,
              "nacimientoPaciente": sublistField_custrecord447,
              "edadPaciente": customerAge,
              "fechaReceta": sublistField_custrecord443,
              "vencimientoRecetaFecha": sublistField_custrecord445,
              "vencimientoReceta": daysExpirationPrescription,
              "medicamentosPaciente": sublistField_custrecord444,
              "observacionesPaciente": sublistField_custrecord446,
              "firmaMed": file_content_FirmaMedico
            }]
          };
        }
      }
      return responseData;
      //TODO: Save Data on "Receta"
    } else if (param_idTransaction == "save" && errorLoad == false) {
      if (param_custrecord443 != "" && param_custrecord445 != "") {
        var expirationDate = getExpirationDate(param_custrecord443, param_custrecord445); // obtener fecha de validez
      }
      objRecord_LoadCustomer.selectNewLine({
        sublistId: idSublista
      });
      if (param_custrecord447 != "") { // Fecha de Nacimiento del Cliente
        preDate = param_custrecord447.replace("-","/");
        preDate = preDate.replace("-","/");
        bornDate = new Date(preDate);
        param_custrecord447 = bornDate.getDate() + "/" + (bornDate.getMonth() + 1) + "/" + bornDate.getFullYear();
        objRecord_LoadCustomer.setCurrentSublistText({
          sublistId: idSublista,
          fieldId: 'custrecord447',
          text: param_custrecord447
        });
      }
      if (param_custrecord443 != "") { // Fecha de creación de la receta
        preDate = param_custrecord443.replace("-","/");
        preDate = preDate.replace("-","/");
        prescriptionDate = preDate.substring(0,10);
        prescriptionDate = new Date(prescriptionDate);
        param_custrecord443 = prescriptionDate.getDate() + "/" + (prescriptionDate.getMonth() + 1) + "/" + prescriptionDate.getFullYear();
        objRecord_LoadCustomer.setCurrentSublistText({
          sublistId: idSublista,
          fieldId: 'custrecord443',
          text: param_custrecord443
        });
      }
      if (expirationDate != "") { // Fecha de vigencia de la receta
        param_custrecord445 = new Date(expirationDate);
        log.debug("445", expirationDate);
        objRecord_LoadCustomer.setCurrentSublistValue({
          sublistId: idSublista,
          fieldId: 'custrecord445',
          value: param_custrecord445
        });
      }
      if (param_custrecord444 != "") { // Medicamentos
        objRecord_LoadCustomer.setCurrentSublistValue({
          sublistId: idSublista,
          fieldId: 'custrecord444',
          value: param_custrecord444
        });
      }
      if (param_custrecord446 != "") { // Observaciones/indicaciones
        objRecord_LoadCustomer.setCurrentSublistValue({
          sublistId: idSublista,
          fieldId: 'custrecord446',
          value: param_custrecord446
        });
      }
      if (param_custrecord449 != "") { // Firma del medico para esta receta
        var image_url_img_firmaRx = https.get({
          url: param_custrecord449
        });
        var objNew_img_firma = file.create({
          name: param_idCustomer + "_" + new Date() + "_image_firma",
          fileType: "PNGIMAGE",
          contents: image_url_img_firmaRx.body,
          encoding: file.Encoding.UTF8,
          folder: 5478419
        });
        var idNew_img_firma = objNew_img_firma.save();
        objRecord_LoadCustomer.setCurrentSublistValue({
          sublistId: idSublista,
          fieldId: 'custrecord449',
          value: idNew_img_firma
        });
      }
      objRecord_LoadCustomer.commitLine({
        sublistId: idSublista
      });
      
      try {
        var idLoadCustomer = objRecord_LoadCustomer.save({
          enableSourcing: true,
          ignoreMandatoryFields: true
        });

        return {
          "SUCCESS_CREATE_PRESCRIPTION": idLoadCustomer
        }
      } catch (error) {
        return {
          "ERROR_CREATE_PRESCRIPTION": error
        }
      }
      //TODO: ERROR in get or save method
    } else {
      return {
        "error": 'Please fill the param "idTransaction" with values "get" or "save"'
      }
    }
  }

  /**
   * Funcion que devuelve la fecha de vencimiento a partir de la fecha de creación de receta y los días de validez
   * @param {date} dateCreation Fecha de creación de la recetas
   * @param {int} daysExpiration Dias de validez de la receta
   */
  function getExpirationDate(dateCreation, daysExpiration) {
    preDate = dateCreation.replace("-","/");
    preDate = preDate.replace("-","/");
    prescriptionDate = preDate.substring(0,10);
    var fecha = new Date(prescriptionDate);
    var dias = parseInt(daysExpiration);
    fecha.setDate(fecha.getDate() + dias);
    newMonth = parseInt(fecha.getMonth()) + 1;
    var expiration = fecha.getFullYear() + "/" + newMonth + "/" + fecha.getDate();

    return expiration;
  }

  /**
   * Funcion que devuelve los dias de validez de una receta a partir de la fecha de creación de la receta y la fecha de vencimiento
   * @param {date} dateCreation Fecha de creación de la recetas
   * @param {int} daysExpiration Dias de validez de la receta
   */
  function getExpirationDays(dateCreation, dateExpiration) {
    var dC = new Date(dateCreation);
    var dE = new Date(dateExpiration);

    var intC = parseInt(dC.getDate()) + (parseInt(dC.getMonth() + 1) * 30) + (parseInt(dC.getFullYear()) * 365.25);
    var intE = parseInt(dE.getDate()) + (parseInt(dE.getMonth() + 1) * 30) + (parseInt(dE.getFullYear()) * 365.25);

    var daysExpiration = intE - intC;

    return daysExpiration;
  }

  /**
   * Funcion que retorna la los años enteros transcurridos entre dos fechas
   * @param {date} fechaNacimiento - se ingresa la fecha inicial desde la que se quiere calcular, por ejemplo: una fecha de nacimiento  
   */
  function getAge(fechaNacimiento) {
    var edad;

    if (fechaNacimiento == "") {
      edad = 0;
    } else {
      var fN = new Date(fechaNacimiento);
      var bornDay = fN.getDate();
      var bornMonth = fN.getMonth() + 1;
      var bornYear = fN.getFullYear();

      var d = new Date();
      var currentDay = d.getDate();
      var currentMonth = d.getMonth() + 1;
      var currentYear = d.getFullYear();

      //calculo de las variables para obtener los días transcurridos entre ambas fechas
      var calcAnio = (parseInt(currentYear) - parseInt(bornYear)) * 365.25;
      var calcMes = (parseInt(currentMonth) - parseInt(bornMonth)) * 30;
      var calcDia = (parseInt(currentDay) - parseInt(bornDay)) * 1;
      var calcEdad = (calcAnio + calcMes + calcDia) / 365.25;

      //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
      //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
      edad = Math.floor(calcEdad);

      edad = (isNaN(edad) == true) ? "" : edad;
    }

    return edad;
  }



  return {
    get: doGet,
    post: doPost
  };
});