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

        // FIXME: Params in JSON object
        var param_action = objJson.action;
        var param_branchName = objJson.branchName;
        var param_emailCustomer = objJson.emailCustomer;
        var param_firstName = objJson.firstName;
        var param_secondName = objJson.secondName;
        var param_phone = objJson.phone;
        var param_startDate = objJson.startDate;
        var param_startTime = objJson.startTime;
        var param_endTime = objJson.endTime;
        var param_areaOfIinterest = objJson.areaOfIinterest;
        var param_comments = objJson.comments;
        var param_checkNoticePrivacy = objJson.checkNoticePrivacy; //Check aviso privavidad: custentity155
        var param_checkAdvertising = objJson.Advertising; //Check aviso privavidad: custentity155
        var param_sheduleType = objJson.sheduleType;

        //Check de Publicidad: custentity156
        

        // FIXME: GLOBAL VARIABLES
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
        var subject;
        var idSheduleType;
        var prefixTitle;
        var idStatus;
        var branchId;

        // FIXME: CONSTANTS
        const SHEDULE_TYPE = "12" // Type to "VALORACION"
        const OWNER_EMPLOYEE = "1133783" // event owner employee id

        // SUPPORT ARRAYS
        var arr_endTime = [ // schedule arrangement set to 30 minutes
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

        var arr_resourcesByLocation = [ // arrangement of resources by branch
            {
                "recordType": "location",
                "id": "61",
                "values": {
                    "name": "ALB Altavista",
                    "phone": "",
                    "city": "Ciudad de México",
                    "state": "CDMX (custom)",
                    "country": "MX",
                    "address.address": "ALB Altavista\r\nAltavista No. 160\r\nCol. San Angel-Inn\r\nAlcaldía Álvaro Obregón\r\nCiudad de México CDMX (custom) 01000\r\nMéxico"
                },
                "resources": [{
                    "value": "244",
                    "text": "Valoraciones Altavista Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "62",
                "values": {
                    "name": "ALB Can-Cún",
                    "phone": "",
                    "city": "Cancún",
                    "state": "QROO",
                    "country": "MX",
                    "address.address": "ALB Can-Cún \r\nAv,Sayil Lote 2, Manzana 5, Supermanzana 6, Locales 307 y 308\r\nMunicipio de Benito Juárez QROO\r\nCancún  QROO Municipio de Benito Juárez QROO\r\nMéxico"
                },
                "resources": [{
                    "value": "247",
                    "text": "Valoraciones Can-Cun Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "63",
                "values": {
                    "name": "ALB Chihuahua",
                    "phone": "",
                    "city": "Chihuahua",
                    "state": "CHIH",
                    "country": "MX",
                    "address.address": "ALB Chihuahua\r\nCalle Vía Trentino No. 5710 1er Piso Local 106 Edificio Vetro Plaza Citadela Desarrollo El Saucito Sector 49\r\nChihuahua CHIH 31115\r\nMéxico"
                },
                "resources": [{
                    "value": "250",
                    "text": "Valoraciones Chihuahua Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "64",
                "values": {
                    "name": "ALB Guadalajara",
                    "phone": "",
                    "city": "Zapopan",
                    "state": "JAL",
                    "country": "MX",
                    "address.address": "ALB Guadalajara\r\nBoulevard Puerta de Hierro Num 5150 Torre Medica C Piso 4 Plaza Corporativa\r\nZapopan JAL 45116\r\nMéxico"
                },
                "resources": [{
                    "value": "255",
                    "text": "Valoraciones Guadalajara Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "65",
                "values": {
                    "name": "ALB Monterrey",
                    "phone": "",
                    "city": "Monterrey",
                    "state": "NL",
                    "country": "MX",
                    "address.address": "ALB Monterrey\r\nCalz del Valle Alberto Santos 201 2do Piso, Local D Col Del Valle 66220\r\nMonterrey NL 66220\r\nMéxico"
                },
                "resources": [{
                    "value": "258",
                    "text": "Valoraciones Monterrey Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "66",
                "values": {
                    "name": "ALB Polanco",
                    "phone": "",
                    "city": "Ciudad de México",
                    "state": "CDMX (custom)",
                    "country": "MX",
                    "address.address": "ALB Polanco\r\nAnatole France 145, Polanco,  Polanco III Secc, Miguel Hidalgo\r\nCiudad de México  CDMX (custom) 11550\r\nMéxico"
                },
                "resources": [{
                    "value": "259",
                    "text": "Valoraciones Polanco Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "67",
                "values": {
                    "name": "ALB Puebla",
                    "phone": "",
                    "city": "Puebla",
                    "state": "PUE",
                    "country": "MX",
                    "address.address": "ALB Puebla\r\nLa Plaza Sonata Towers Boulevard  Europa No. 17 Int. L2N1 Zona Comercial Fracc. Residencial Lomas de Angelópolis San Andrés Cholula\r\nPuebla  PUE 72830\r\nMéxico"
                },
                "resources": [{
                    "value": "262",
                    "text": "Valoraciones Puebla Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "68",
                "values": {
                    "name": "ALB Santa Fé",
                    "phone": "",
                    "city": "Ciudad de México",
                    "state": "CDMX (custom)",
                    "country": "MX",
                    "address.address": "ALB Santa Fé\r\nAv Vasco De Quiroga No. 3900 Torre B Piso 4 Col. Lomas de Santa Fe Cuajimalpa de Morelos\r\nCiudad de México CDMX (custom) 05348\r\nMéxico"
                },
                "resources": [{
                    "value": "265",
                    "text": "Valoraciones Santa Fe Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "69",
                "values": {
                    "name": "ALB Satélite",
                    "phone": "",
                    "city": "Estado de México",
                    "state": "MEX",
                    "country": "MX",
                    "address.address": "ALB Satélite \r\nPafnuncio Padilla No. 10 Cd. Satélite Naucalpan de Juárez\r\nEstado de México  MEX 53100\r\nMéxico"
                },
                "resources": [{
                    "value": "268",
                    "text": "Valoraciones Satelite Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "70",
                "values": {
                    "name": "ALB Tijuana",
                    "phone": "",
                    "city": "Tijuana",
                    "state": "BC",
                    "country": "MX",
                    "address.address": "ALB Tijuana\r\nMision San Javier 10643 Via Corporativa int 101 Zona Urbana Rio\r\nTijuana BC 22010\r\nMéxico"
                },
                "resources": [{
                    "value": "273",
                    "text": "Valoraciones Tijuana Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "71",
                "values": {
                    "name": "ALB Veracruz",
                    "phone": "",
                    "city": "Veracruz",
                    "state": "VER",
                    "country": "MX",
                    "address.address": "ALB Veracruz\r\nAv. Juan Pablo II No 390 Piso 5 B Fracc Costa de Oro Boca del Rio\r\nVeracruz VER 94299\r\nMéxico"
                },
                "resources": [{
                    "value": "274",
                    "text": "Valoraciones Veracruz Alb"
                }]
            },
            {
                "recordType": "location",
                "id": "54",
                "values": {
                    "name": "Cancún",
                    "phone": "",
                    "city": "Ciudad de México",
                    "state": "",
                    "country": "MX",
                    "address.address": "Cancún\r\nAdolfo L. Mateos\r\nAv. 25\r\nPoniente 134\r\nCiudad de México  \r\nMéxico"
                },
                "resources": [{
                    "value": "231",
                    "text": "Valoraciones Cancún (Albya)"
                }]
            },
            {
                "recordType": "location",
                "id": "53",
                "values": {
                    "name": "Chihuahua",
                    "phone": "",
                    "city": "",
                    "state": "",
                    "country": "MX",
                    "address.address": "XAXX010101000\r\nChihuahua\r\nAv. 85\r\nCol. Benito Juarez\r\nCiudad de México\r\nMéxico"
                },
                "resources": [{
                    "value": "232",
                    "text": "Valoraciones Chihuahua (Albya)"
                }]
            },
            {
                "recordType": "location",
                "id": "52",
                "values": {
                    "name": "Guadalajara",
                    "phone": "",
                    "city": "",
                    "state": "",
                    "country": "MX",
                    "address.address": "Guadalajara\r\nMéxico"
                },
                "resources": [{
                    "value": "224",
                    "text": "Valoraciones Guadalajara (Albya)"
                }]
            },
            {
                "recordType": "location",
                "id": "60",
                "values": {
                    "name": "Guadalajara Arboledas Uno",
                    "phone": "",
                    "city": "ZAPOPAN",
                    "state": "JAL",
                    "country": "MX",
                    "address.address": "Guadalajara Arboledas Uno\r\nCARNERO 53951\r\nCOL. ARBOLEDAS\r\nZAPOPAN JAL 45070\r\nMéxico"
                },
                "resources": [{
                    "value": "243",
                    "text": "Valoraciones Guadalajara Arboledas"
                }]
            },
            {
                "recordType": "location",
                "id": "57",
                "values": {
                    "name": "Polanco",
                    "phone": "",
                    "city": "Ciudad de México",
                    "state": "",
                    "country": "MX",
                    "address.address": "Polanco\r\nAnatole France 145\r\nPolanco\r\nPolanco III Secc, Miguel Hidalgo\r\nCiudad de México  11550\r\nMéxico"
                },
                "resources": [{
                    "value": "229",
                    "text": "Valoraciones Anatole (Albya)"
                }]
            }
        ];


        // FIXME: SUPPORT SETS
        // TODO: Get and set resource id, shedule type id, subject, prefix of title 
        var objJson_resources = JSON.parse(JSON.stringify(arr_resourcesByLocation));

        if (SHEDULE_TYPE == '12') {
            for (var r in objJson_resources) {
                if (objJson_resources[r].values.name == param_branchName) {
                    resourceId = objJson_resources[r].resources[0].value;
                    branchId = objJson_resources[r].id;
                    log.debug("resources", "rec " + resourceId + " suc " + branchId)
                }
            };
            idSheduleType = "12";
            subject = "Cita de Valoración";
            prefixTitle = "VAL_";
        };

        // TODO: calculate end time of date
        if (param_endTime == "" || param_endTime == undefined) {
            for (var t in arr_endTime) {
                if (param_startTime == arr_endTime[t]) {
                    param_endTime = arr_endTime[parseInt(t) + 1];
                }
            }
        }

        // TODO: convert date in string to date in object
        var c = objJson.startDate.split("/");
        param_startDate = parseInt(c[0]) + "/" + (parseInt(c[1]) + 1) + "/" + parseInt(c[2]);
        log.debug("fecha",param_startDate);

        // FIXME: SUPPORT SEARCHES
        var searchCreacte_CustomerLeadOrProspect = search.create({
            type: search.Type.CUSTOMER,
            filters: [{
                name: "email",
                operator: "is",
                values: [param_emailCustomer],
                isor: false,
                isnot: false,
                leftparens: 0,
                rightparens: 0
            }],
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
            ]
        });
        var searchPreview_CustomerLeadOrProspect = searchCreacte_CustomerLeadOrProspect
            .run()
            .getRange({
                start: 0,
                end: 1
            });

        if (searchPreview_CustomerLeadOrProspect.length > 0) {
            var obj_searchPreview_CustomerLeadOrProspect = JSON.parse(JSON.stringify(searchPreview_CustomerLeadOrProspect));

            internalId = obj_searchPreview_CustomerLeadOrProspect[0].values.internalid[0].value;
            email = obj_searchPreview_CustomerLeadOrProspect[0].values.email;
            param_entityid = obj_searchPreview_CustomerLeadOrProspect[0].values.entityid;
            log.debug("dataSearch", "internalId " + internalId + " email " + email);
        } else {
            internalId = null;
            email = null;
        }



        // FIXME: CREATE SHEDULE
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
                value: branchId
              });
/*               objRecord_updateProspect.setValue({ // Set Area de interes
                fieldId: "custentity297",
                value: param_areaOfIinterest
              }); */
              objRecord_updateProspect.setValue({ // Set Comentarios
                fieldId: "comments",
                value: param_comments
              });
              objRecord_updateProspect.setValue({ // Set Comentarios
                fieldId: "custentity155",
                value: param_checkNoticePrivacy
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
                  value: OWNER_EMPLOYEE
                });
                objRecord_newEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
                  fieldId: "custevent70",
                  value: idSheduleType
                });
                objRecord_newEvent.setValue({ // Set titulo del evento
                  fieldId: "title",
                  value: prefixTitle + param_entityid + " / " + param_areaOfIinterest
                });
                objRecord_newEvent.setValue({ // Set Sucursal del evento misma que del doctor
                  fieldId: "custevent2",
                  value: branchId
                });
                objRecord_newEvent.setValue({ // Set Asunto
                  fieldId: "custevent79",
                  value: subject
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
/*                 objRecord_newEvent.setValue({ // Set Tipo de Consulta
                  fieldId: "custevent1197",
                  text: param_tipoConsulta
                });
                objRecord_newEvent.setText({ // Set costo de consulta si, no, no aplica
                  fieldId: "custevent1198",
                  text: param_costoAgenda
                }); */
                
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
                return {
                    "idProstect": objRecord_SaveProspect_id,
                    "idEvent": objRecord_newEvent_id,
                    //"event": objRecord_newEvent
                  };
              } catch (error) {
                log.error('Error new event si el cliente existe', error);
                return {
                    "ERR_CREATE_EVENT": error
                  };
              }
            } catch (error) {
              return {
                "ERR_UPDATE_CUSTOMER": error
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
                value: branchId
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
                value: param_emailCustomer
              });
              objRecord_newProspect.setValue({ // Set MEDIOS
                fieldId: "custentity38",
                value: "219"
              });
              objRecord_newProspect.setValue({ // Set UTM Source
                fieldId: "custentity133",
                value: "APP Médico"
              });
/*               objRecord_newProspect.setValue({ // Set Area de interes
                fieldId: "custentity297",
                value: param_areaOfIinterest
              }); */
              objRecord_newProspect.setValue({ // Set Comentarios
                fieldId: "comments",
                value: param_comments
              });
              objRecord_newProspect.setValue({ // Set Comentarios
                fieldId: "custentity155",
                value: param_checkNoticePrivacy
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
                  value: OWNER_EMPLOYEE
                });
                objRecord_newEvent.setValue({ // Set Tipo de Servicio Valoracion Procedimiento o Revisión
                  fieldId: "custevent70",
                  value: idSheduleType
                });
                objRecord_newEvent.setValue({ // Set titulo del evento
                  fieldId: "title",
                  value: prefixTitle + field_entityId_Prospect + " / " + param_areaOfIinterest
                });
                objRecord_newEvent.setValue({ // Set Sucursal del evento misma que del doctor
                  fieldId: "custevent2",
                  value: branchId
                });
                objRecord_newEvent.setValue({ // Set Asunto
                  fieldId: "custevent79",
                  value: subject
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
/*                 objRecord_newEvent.setValue({ // Set Tipo de Consulta
                  fieldId: "custevent1197",
                  text: param_tipoConsulta
                });
                objRecord_newEvent.setText({ // Set costo de consulta si, no, no aplica
                  fieldId: "custevent1198",
                  text: param_costoAgenda
                }); */
  
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
                return [{
                    "idProstect": objRecord_SaveProspect_id,
                    "idEvent": objRecord_newEvent_id
                  }];
              } catch (error) {
                log.error('Error new event si el cliente NO existe', error);
                return {
                    "ERR_CREATE_EVENT": error
                  };
              }
            } catch (error) {
              return {
                "ERR_CREATE_PROSPECT": error
              };
            }
          }
    }

    return {
        post: doPost
    };
});