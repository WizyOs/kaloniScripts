/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    
    var objJson;
    if (typeof params === "object") {
      objJson = params;
    } else {
      objJson = JSON.parse(params);
    }
    log.debug("params", objJson);

    var param_idEmpleado = objJson.idEmpleado;
    var param_idSucursal = objJson.idSucursal;
    var param_emailEmpleado = objJson.emailEmpleado;
    var param_emailCustomer = objJson.emailCustomer;

    var idEvent = objJson.idEvent;
    var idQualification = objJson.idQualification;
    var param_email = objJson.email;
    var param_firstName = objJson.firstName;
    var param_secondName = objJson.secondName;
    var param_phone = objJson.phone;
    var param_sheduleType = objJson.sheduleType;
    var param_startDate = objJson.startDate;
    var param_startTime = objJson.startTime;
    var param_endTime = objJson.endTime;
    var param_sucursalAgenda = objJson.sucursalAgenda;
    var param_serviceAgenda = objJson.serviceAgenda;
    var param_allDay = objJson.allDay;
    var param_costoAgenda = objJson.costoAgenda;
    var param_tipoConsulta = objJson.tipoConsulta;
    //var param_importeConsulta = objJson.importeConsulta; // Campo no enviado
    //idQualification = parseInt(idQualification);

    //GLOBAL VARIABLES
    var objRecord_newEvent;
    var objRecord_newProspect;
    var objRecord_updateProspect;
    var objRecord_SaveProspect_id
    var objRecord_newEvent_id;
    var objRecord_LoadProspect;
    var internalId;
    var email;
    var resourceId;
    var param_entityid;
    var idAsunto;
    var idsheduleType;
    var prefixTitle;
    var idStatus;

    var endDate = [
      "0000",
      "0030",
      "0100",
      "0130",
      "0200",
      "0230",
      "0300",
      "0330",
      "0400",
      "0430",
      "0500",
      "0530",
      "0600",
      "0630",
      "0700",
      "0730",
      "0800",
      "0830",
      "0900",
      "0930",
      "1000",
      "1030",
      "1100",
      "1130",
      "1200",
      "1230",
      "1300",
      "1330",
      "1400",
      "1430",
      "1500",
      "1530",
      "1600",
      "1630",
      "1700",
      "1730",
      "1800",
      "1830",
      "1900",
      "1930",
      "2000",
      "2030",
      "2100",
      "2130",
      "2200",
      "2230",
      "2300",
      "2330"
    ];

    if (param_endTime == "") {
      for (var t in endDate) {
        if (param_startTime == endDate[t]) {
          param_endTime = endDate[parseInt(t) + 1];
        }
      }
    }

    var resourcesVal = [{
        "sucursal": "57",
        "value": "229",
        "text": "Valoraciones Anatole (Albya)"
      },
      {
        "sucursal": "52",
        "value": "224",
        "text": "Valoraciones Guadalajara (Albya)"
      },
      {
        "sucursal": "54",
        "value": "231",
        "text": "Valoraciones Cancún (Albya)"
      },
      {
        "sucursal": "53",
        "value": "232",
        "text": "Valoraciones Chihuahua (Albya)"
      }
    ];

    var resourcesPro = [{
        "sucursal": "54",
        "value": "234",
        "text": "Sala Cancun (Albya)"
      },
      {
        "sucursal": "53",
        "value": "235",
        "text": "Sala Chihuahua (Albya)"
      },
      {
        "sucursal": "52",
        "value": "236",
        "text": "Sala Guadalajara (Albya)"
      },
      {
        "sucursal": "57",
        "value": "233",
        "text": "Sala Polanco Albya"
      }
    ];

    var resourcesRev = [{
        "sucursal": "52",
        "value": "240",
        "text": "Revisiones Guadalajara (Albya)"
      },
      {
        "sucursal": "53",
        "value": "239",
        "text": "Revisiones Chihuahua (Albya)"
      },
      {
        "sucursal": "54",
        "value": "238",
        "text": "Revisiones Cancun (Albya)"
      },
      {
        "sucursal": "57",
        "value": "237",
        "text": "Revisiones Polanco (Albya)"
      }
    ];

    if (idQualification == "5" || idQualification == "4") {
      idStatus = "COMPLETE";
    } else if (idQualification == "2" || idQualification == "3" || idQualification == "6" || idQualification == "8" || idQualification == "9") {
      idStatus = "CANCELLED";
    }

    log.debug("calificacion", idQualification + " " + idStatus);

    var str_resourcesVal = JSON.stringify(resourcesVal);
    var obj_resourcesVal = JSON.parse(str_resourcesVal);
    var str_resourcesPro = JSON.stringify(resourcesPro);
    var obj_resourcesPro = JSON.parse(str_resourcesPro);
    var str_resourcesRev = JSON.stringify(resourcesRev);
    var obj_resourcesRev = JSON.parse(str_resourcesRev);

    if (param_sheduleType == 'val') {
      for (var r in obj_resourcesVal) {
        if (obj_resourcesVal[r].sucursal == param_sucursalAgenda) {
          resourceId = obj_resourcesVal[r].value;
        }
      };
      idsheduleType = "12";
      idAsunto = "Cita de Valoración";
      prefixTitle = "VAL_";
    };

    if (param_sheduleType == 'pro') {
      for (var r in obj_resourcesPro) {
        if (obj_resourcesPro[r].sucursal == param_sucursalAgenda) {
          resourceId = obj_resourcesPro[r].value;
        }
      };
      idsheduleType = "1";
      idAsunto = "Cita de Procedimiento";
      prefixTitle = "PRO_";
    };

    if (param_sheduleType == 'rev') {
      for (var r in obj_resourcesRev) {
        if (obj_resourcesRev[r].sucursal == param_sucursalAgenda) {
          resourceId = obj_resourcesRev[r].value;
        }
      };
      idsheduleType = "8"
      idAsunto = "Cita de Revisión";
      prefixTitle = "REV_";
    };

    if (param_sheduleType == 'bql') {
      for (var r in obj_resourcesVal) {
        if (obj_resourcesVal[r].sucursal == param_sucursalAgenda) {
          resourceId = obj_resourcesVal[r].value;
        }
      };
      idsheduleType = "11"
      idAsunto = "BLOQUEO DE AGENDA";
      prefixTitle = "BQL_";
    };

    

    //var searchGhost = search.load({ id: "customsearch7851" });
    //log.debug("searchGhost", searchGhost.filters);
    if (idsheduleType === "11") {

      try {
        // BLOQUEO de AGENDA
        objRecord_newEvent = record.create({ // Crea objeto Calendar Event
          type: record.Type.CALENDAR_EVENT,
          isDynamic: true
        });
        objRecord_newEvent.setValue({ // Set id Emeplado en el campo owner por necesidad de NetSuite
          fieldId: "owner",
          value: param_idEmpleado
        });
        objRecord_newEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
          fieldId: "custevent70",
          value: idsheduleType
        });
        objRecord_newEvent.setValue({ // Set titulo del evento
          fieldId: "title",
          value: idAsunto
        });
        objRecord_newEvent.setValue({ // Set Sucursal del evento misma que del doctor
          fieldId: "custevent2",
          value: param_sucursalAgenda
        });
        objRecord_newEvent.setValue({ // Set Asunto
          fieldId: "custevent79",
          value: idAsunto
        });
        objRecord_newEvent.setValue({ // Set organizador siempre es Promo Albya
          fieldId: "organizer",
          value: "1133783"
        });
        objRecord_newEvent.setText({ // Set fecha de evento
          fieldId: "startdate",
          text: param_startDate
        });
        if (param_allDay == "T") {
          valueAllDay = true;
          objRecord_newEvent.setValue({ // Set evento de todo el día de
            fieldId: "alldayevent",
            value: valueAllDay
          });
        } else {
          objRecord_newEvent.setText({ // Set hora inicial del evento
            fieldId: "starttime",
            text: param_startTime
          });
          objRecord_newEvent.setText({ // Set hora final del evento
            fieldId: "endtime",
            text: param_endTime
          });
        }
        objRecord_newEvent.insertLine({
          sublistId: "resource",
          line: 0
        });
        objRecord_newEvent.setCurrentSublistValue({
          sublistId: "resource",
          fieldId: "resource",
          value: resourceId
        });
        objRecord_newEvent.commitLine({
          sublistId: "resource"
        });
        objRecord_newEvent.insertLine({
          sublistId: "attendee",
          line: 0
        });
        objRecord_newEvent.setCurrentSublistValue({
          sublistId: "attendee",
          fieldId: "attendee",
          value: param_idCustomer
        });
        objRecord_newEvent.commitLine({
          sublistId: "attendee"
        });
        objRecord_newEvent_id = objRecord_newEvent.save({
          enableSourcing: false,
          ignoreMandatoryFields: true
        });
        log.debug("error doble", "error 1");
        return {
          idEvent: objRecord_newEvent_id,
          event: objRecord_newEvent
        };
      } catch (error) {
        log.error('Error Bloqueo Agenda', error);
      }

    } else {
      if (idEvent == "") {
        var searchCreacte_CustomerLeadOrProspect = search.create({
          type: search.Type.CUSTOMER,
          columns: [{
              name: "internalid"
            },
            {
              name: "entityid"
            },
            {
              name: "altname"
            },
            {
              name: "email"
            },
            {
              name: "phone"
            },
            {
              name: "custentity25"
            }
          ],
          filters: [{
            name: "email",
            operator: "is",
            values: [param_email],
            isor: false,
            isnot: false,
            leftparens: 0,
            rightparens: 0
          }]
        });
        var searchPreview_CustomerLeadOrProspect = searchCreacte_CustomerLeadOrProspect
          .run()
          .getRange({
            start: 0,
            end: 1
          });

        if (searchPreview_CustomerLeadOrProspect.length > 0) {
          var str_searchPreview_CustomerLeadOrProspect = JSON.stringify(
            searchPreview_CustomerLeadOrProspect
          );
          var obj_searchPreview_CustomerLeadOrProspect = JSON.parse(
            str_searchPreview_CustomerLeadOrProspect
          );

          internalId =
            obj_searchPreview_CustomerLeadOrProspect[0].values.internalid[0].value;
          email = obj_searchPreview_CustomerLeadOrProspect[0].values.email;
          param_entityid =
            obj_searchPreview_CustomerLeadOrProspect[0].values.entityid;
          log.debug("dataSearch", "internalId " + internalId + " email " + email);
        } else {
          internalId = null;
          email = null;
        }

        if (internalId !== null) { // internalId es el ID del CLIENTE PROSPECTO O LEAD

          // SI EL CLIENTE EXISTE SOLO SE CREA EL EVENTO
          try {
            //FIXME:Actualiza los datos del lead existente y lo pasa a prospecto

            // ACTUALIZACION DE DATOS LEAD A PROSPECTO
            objRecord_updateProspect = record.load({ // Carga objeto CUSTOMER
              type: record.Type.CUSTOMER,
              id: internalId,
              isDynamic: true
            });
            objRecord_updateProspect.setText({ // Set NOMBRE
              fieldId: 'firstname',
              text: param_firstName
            });
            objRecord_updateProspect.setText({ // Set APELLIDOS
              fieldId: 'lastname',
              text: param_secondName
            });
            objRecord_updateProspect.setText({ // Set CELULAR
              fieldId: 'mobilephone',
              text: param_phone
            });
            objRecord_updateProspect.setValue({ // Set Subsidiaria a Albya
              fieldId: "subsidiary",
              value: "19"
            });
            objRecord_updateProspect.setValue({ // Set PAIS a Mexico
              fieldId: "custentity137",
              value: "1"
            });
            objRecord_updateProspect.setValue({ // Set Tipo de cliente a Prospecto
              fieldId: "entitystatus",
              value: "26"
            });
            objRecord_updateProspect.setValue({ // Set Sucursal
              fieldId: "custentity25",
              value: param_sucursalAgenda
            });

            objRecord_SaveProspect_id = objRecord_updateProspect.save({
              enableSourcing: false,
              ignoreMandatoryFields: true
            });

            try {
              // NUEVO EVENTO de AGENDA
              objRecord_newEvent = record.create({ // Crea objeto Calendar Event
                type: record.Type.CALENDAR_EVENT,
                isDynamic: true
              });
              objRecord_newEvent.setValue({ // Set id Customer en el campo company por necesidad de NetSuite
                fieldId: "company",
                value: internalId
              });
              objRecord_newEvent.setValue({ // Set id Empleado en el campo owner por necesidad de NetSuite
                fieldId: "owner",
                value: param_idEmpleado
              });
              objRecord_newEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
                fieldId: "custevent70",
                value: idsheduleType
              });
              objRecord_newEvent.setValue({ // Set titulo del evento
                fieldId: "title",
                value: prefixTitle + param_entityid + " / " + param_serviceAgenda
              });
              objRecord_newEvent.setValue({ // Set Sucursal del evento misma que del doctor
                fieldId: "custevent2",
                value: param_sucursalAgenda
              });
              objRecord_newEvent.setValue({ // Set Asunto
                fieldId: "custevent79",
                value: idAsunto
              });
              objRecord_newEvent.setValue({ // Set organizador siempre es Promo Albya
                fieldId: "organizer",
                value: "1133783"
              });
              objRecord_newEvent.setText({ // Set fecha de evento
                fieldId: "startdate",
                text: param_startDate
              });
              objRecord_newEvent.setText({ // Set hora inicial del evento
                fieldId: "starttime",
                text: param_startTime
              });
              objRecord_newEvent.setText({ // Set hora final del evento
                fieldId: "endtime",
                text: param_endTime
              });
              objRecord_newEvent.setValue({ // Set Tipo de Consulta
                fieldId: "custevent1197",
                text: param_tipoConsulta
              });
              objRecord_newEvent.setText({ // Set costo de consulta si, no, no aplica
                fieldId: "custevent1198",
                text: param_costoAgenda
              });
              
              objRecord_newEvent.insertLine({
                sublistId: "resource",
                line: 0
              });
              objRecord_newEvent.setCurrentSublistValue({
                sublistId: "resource",
                fieldId: "resource",
                value: resourceId
              });
              objRecord_newEvent.commitLine({
                sublistId: "resource"
              });
              objRecord_newEvent.insertLine({
                sublistId: "attendee",
                line: 0
              });
              objRecord_newEvent.setCurrentSublistValue({
                sublistId: "attendee",
                fieldId: "attendee",
                value: internalId
              });
              objRecord_newEvent.commitLine({
                sublistId: "attendee"
              });
              objRecord_newEvent_id = objRecord_newEvent.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
              });
            } catch (error) {
              log.error('Error new event si el cliente existe', error);
            }
            log.debug("error doble", "error 2");
            return {
              idEvent: objRecord_newEvent_id,
              event: objRecord_newEvent
            };
          } catch (error) {
            return {
              ERR_CREATE_onlyEVENT: error
            };
          }

        } else if (internalId === null) { // internalId es el ID del CLIENTE PROSPECTO O LEAD
          // SI EL CLIENTE NO EXISTE, SE CREA PROSPECTO PRIMERO
          try {
            var objRecord_newProspect = record.create({
              type: record.Type.PROSPECT,
              isDynamic: true
            });
            objRecord_newProspect.setValue({ // Set Nombre
              fieldId: "customform",
              value: "150"
            });
            objRecord_newProspect.setText({ // Set Nombre
              fieldId: "firstname",
              text: param_firstName
            });
            objRecord_newProspect.setText({ // Set Apelllido
              fieldId: "lastname",
              text: param_secondName
            });
            objRecord_newProspect.setValue({ // Set
              fieldId: "custentity434",
              value: "219"
            });
            objRecord_newProspect.setValue({ // Set Subsidiaria
              fieldId: "subsidiary",
              value: "19"
            });
            objRecord_newProspect.setValue({ // Set Tipo de CLiente a LEAD
              fieldId: "entitystatus",
              value: "26"
            });
            objRecord_newProspect.setValue({ // Set Sucursal
              fieldId: "custentity25",
              value: param_sucursalAgenda
            });
            objRecord_newProspect.setValue({ // Set PAISES
              fieldId: "custentity137",
              value: "1"
            });
            objRecord_newProspect.setValue({ // Set Ejecutivo K-Center
              fieldId: "custentity143",
              value: "262"
            });
            objRecord_newProspect.setValue({ // Set Celular
              fieldId: "mobilephone",
              value: param_phone
            });
            objRecord_newProspect.setValue({ // Set email
              fieldId: "email",
              value: param_email
            });
            objRecord_newProspect.setValue({ // Set MEDIOS
              fieldId: "custentity38",
              value: "219"
            });
            objRecord_newProspect.setValue({ // Set UTM Source
              fieldId: "custentity133",
              value: "APP Médico"
            });

            objRecord_newProspect.insertLine({
              sublistId: "salesteam",
              line: 0
            });
            objRecord_newProspect.setCurrentSublistValue({
              sublistId: "salesteam",
              fieldId: "employee",
              value: param_idEmpleado
            });
            objRecord_newProspect.setCurrentSublistValue({
              sublistId: "salesteam",
              fieldId: "contribution",
              value: "100.0"
            });
            objRecord_newProspect.setCurrentSublistValue({
              sublistId: "salesteam",
              fieldId: "isprimary",
              value: true
            });
            objRecord_newProspect.setCurrentSublistValue({
              sublistId: "salesteam",
              fieldId: "issalesrep",
              value: true
            });
            objRecord_newProspect.commitLine({
              sublistId: "salesteam"
            });

            objRecord_SaveProspect_id = objRecord_newProspect.save({
              enableSourcing: false,
              ignoreMandatoryFields: true
            });

            log.debug("idProspecto", objRecord_SaveProspect_id);

            objRecord_LoadProspect = record.load({
              type: record.Type.CUSTOMER,
              id: objRecord_SaveProspect_id
            });

            var field_entityId_Prospect = objRecord_LoadProspect.getValue({
              fieldId: 'entityid'
            });

            try {
              // NUEVO EVENTO de AGENDA
              objRecord_newEvent = record.create({ // Crea objeto Calendar Event
                type: record.Type.CALENDAR_EVENT,
                isDynamic: true
              });
              objRecord_newEvent.setValue({ // Set id Customer en el campo company por necesidad de NetSuite
                fieldId: "company",
                value: objRecord_SaveProspect_id
              });
              objRecord_newEvent.setValue({ // Set id Empleado en el campo owner por necesidad de NetSuite
                fieldId: "owner",
                value: param_idEmpleado
              });
              objRecord_newEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
                fieldId: "custevent70",
                value: idsheduleType
              });
              objRecord_newEvent.setValue({ // Set titulo del evento
                fieldId: "title",
                value: prefixTitle + field_entityId_Prospect + " / " + param_serviceAgenda
              });
              objRecord_newEvent.setValue({ // Set Sucursal del evento misma que del doctor
                fieldId: "custevent2",
                value: param_sucursalAgenda
              });
              objRecord_newEvent.setValue({ // Set Asunto
                fieldId: "custevent79",
                value: idAsunto
              });
              objRecord_newEvent.setValue({ // Set organizador siempre es Promo Albya
                fieldId: "organizer",
                value: "1133783"
              });
              objRecord_newEvent.setText({ // Set fecha de evento
                fieldId: "startdate",
                text: param_startDate
              });
              objRecord_newEvent.setText({ // Set hora inicial del evento
                fieldId: "starttime",
                text: param_startTime
              });
              objRecord_newEvent.setText({ // Set hora final del evento
                fieldId: "endtime",
                text: param_endTime
              });
              objRecord_newEvent.setValue({ // Set Tipo de Consulta
                fieldId: "custevent1197",
                text: param_tipoConsulta
              });
              objRecord_newEvent.setText({ // Set costo de consulta si, no, no aplica
                fieldId: "custevent1198",
                text: param_costoAgenda
              });

              objRecord_newEvent.insertLine({
                sublistId: "resource",
                line: 0
              });
              objRecord_newEvent.setCurrentSublistValue({
                sublistId: "resource",
                fieldId: "resource",
                value: resourceId
              });
              objRecord_newEvent.commitLine({
                sublistId: "resource"
              });
              objRecord_newEvent.insertLine({
                sublistId: "attendee",
                line: 0
              });
              objRecord_newEvent.setCurrentSublistValue({
                sublistId: "attendee",
                fieldId: "attendee",
                value: objRecord_SaveProspect_id
              });
              objRecord_newEvent.commitLine({
                sublistId: "attendee"
              });
              objRecord_newEvent_id = objRecord_newEvent.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
              });
            } catch (error) {
              log.error('Error new event si el cliente NO existe', error);
            }

            log.debug("error doble", "error 3");
            return [{
              idProstect: objRecord_SaveProspect_id,
              idEvent: objRecord_newEvent_id
            }];
          } catch (error) {
            log.error("ERR_CREATE_PROSPECT_EVENT", error);
            return {
              ERR_CREATE_PROSPECT_EVENT: error
            };
          }
        }
      } else {
        //
        // SI EL ID EXISTE SE EDITA LA AGENDA ACTUALIZAE EVENTO POR CALIFICACION O POR FECHA
        //
        try {
          // ACTUALIZA EVENTO de AGENDA por Calificacion
          if (idQualification != "") {
            log.debug("")
            objRecord_updateEvent = record.load({ // Crea objeto Calendar Event
              type: record.Type.CALENDAR_EVENT,
              id: idEvent
            });
            objRecord_updateEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
              fieldId: "custevent1",
              value: idQualification
            });
            objRecord_updateEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
              fieldId: "status",
              value: idStatus
            });
            objRecord_updateEvent_id = objRecord_updateEvent.save({
              enableSourcing: false,
              ignoreMandatoryFields: true
            });
          } else {
            // ACTUALIZA EVENTO de AGENDA por fecha
            objRecord_updateEvent = record.load({ // Crea objeto Calendar Event
              type: record.Type.CALENDAR_EVENT,
              id: idEvent
            });
            objRecord_updateEvent.setText({ // Set fecha de evento
              fieldId: "startdate",
              text: param_startDate
            });
            objRecord_updateEvent.setText({ // Set hora inicial del evento
              fieldId: "starttime",
              text: param_startTime
            });
            objRecord_updateEvent.setText({ // Set hora final del evento
              fieldId: "endtime",
              text: param_endTime
            });
            /*             objRecord_updateEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
                          fieldId: "alldayevent",
                          value: param_alldayevent
                        }); */
            objRecord_updateEvent_id = objRecord_updateEvent.save({
              enableSourcing: false,
              ignoreMandatoryFields: true
            });
          }
          log.debug("error doble", "error 4");
          return {
            idEvent: objRecord_updateEvent_id
          };
        } catch (error) {
          log.debug("error de actualizcion y calificacion agenda", error);
          return {
            ERR_CREATE_onlyEVENT: error
          };
        }
      }
    }


  }

  return {
    get: doGet,
    post: doPost
  };
});
