  /**
   * @NApiVersion 2.x
   * @NScriptType Restlet
   * @NModuleScope SameAccount
   */

  define(['N/record', 'N/search', 'N/format'],

    function (record, search, format) {

      function _get(context) {}

      function _post(params) {
        //log.debug("params", params);
        var objJson;
        if (typeof params === "object") {
          objJson = params;
        } else {
          objJson = JSON.parse(params);
        }

        var param_email = objJson.email;
        var param_firstName = objJson.firstName;
        var param_secondName = objJson.secondName;
        var param_sucursalAgenda = objJson.suc;
        var param_phone = objJson.phone;


        var internalId = 0;

        var searchCreacte_CustomerLeadOrLead = search.create({
          type: search.Type.CUSTOMER,
          columns: [{
            name: "internalid"
          }, {
            name: "entityid"
          }],
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
        var searchPreview_CustomerLeadOrLead = searchCreacte_CustomerLeadOrLead.run().getRange({
          start: 0,
          end: 1
        });
        if (searchPreview_CustomerLeadOrLead.length > 0) {
          var str_searchPreview_CustomerLeadOrLead = JSON.stringify(searchPreview_CustomerLeadOrLead);
          var obj_searchPreview_CustomerLeadOrLead = JSON.parse(str_searchPreview_CustomerLeadOrLead);
          internalId = obj_searchPreview_CustomerLeadOrLead[0].values.internalid[0].value;
        }

        if (internalId == 0) {
          try {
            var objRecord_newLead = record.create({
              type: record.Type.LEAD,
              isDynamic: true
            });
            objRecord_newLead.setText({ // Set Nombre
              fieldId: "firstname",
              text: param_firstName
            });
            objRecord_newLead.setText({ // Set Apelllido
              fieldId: "lastname",
              text: param_secondName
            });
            objRecord_newLead.setValue({ // Set
              fieldId: "custentity434",
              value: "219"
            });
            objRecord_newLead.setValue({ // Set Subsidiaria
              fieldId: "subsidiary",
              value: "19"
            });
            objRecord_newLead.setValue({ // Set Tipo de CLiente a LEAD
              fieldId: "entitystatus",
              value: "17"
            });
            objRecord_newLead.setValue({ // Set Sucursal
              fieldId: "custentity25",
              value: param_sucursalAgenda
            });
            objRecord_newLead.setValue({ // Set PAISES
              fieldId: "custentity137",
              value: "1"
            });
            objRecord_newLead.setValue({ // Set Ejecutivo K-Center
              fieldId: "custentity143",
              value: "262"
            });
            objRecord_newLead.setValue({ // Set Celular
              fieldId: "mobilephone",
              value: param_phone
            });
            objRecord_newLead.setValue({ // Set email
              fieldId: "email",
              value: param_email
            });
            objRecord_newLead.setValue({ // Set MEDIOS
              fieldId: "custentity38",
              value: "219"
            });
            objRecord_newLead.setValue({ // Set UTM Source
              fieldId: "custentity133",
              value: "APP Médico"
            });

            objRecord_SaveLead_id = objRecord_newLead.save({
              enableSourcing: false,
              ignoreMandatoryFields: true
            });

            objRecord_LoadLead = record.load({
              type: record.Type.CUSTOMER,
              id: objRecord_SaveLead_id
            });

            var field_entityId_Lead = objRecord_LoadLead.getValue({
              fieldId: 'entityid'
            });

            return [{
              idLead: objRecord_SaveLead_id,
              idExpediente: field_entityId_Lead
            }]
          } catch (error) {
            return [{
              "ERR_CREATE_LEAD": error,
              "dxLead": "No Content"
            }]
          }
        } else {

          try {
            // ACTUALIZACION DE DATOS LEAD A LEADO
            objRecord_updateLead = record.load({ // Carga objeto CUSTOMER
              type: record.Type.CUSTOMER,
              id: internalId,
              isDynamic: true
            });
            objRecord_updateLead.setText({ // Set NOMBRE
              fieldId: 'firstname',
              text: param_firstName
            });
            objRecord_updateLead.setText({ // Set APELLIDOS
              fieldId: 'lastname',
              text: param_secondName
            });
            objRecord_updateLead.setText({ // Set CELULAR
              fieldId: 'mobilephone',
              text: param_phone
            });
            objRecord_updateLead.setValue({ // Set Subsidiaria a Albya
              fieldId: "subsidiary",
              value: "19"
            });
            objRecord_updateLead.setValue({ // Set PAIS a Mexico
              fieldId: "custentity137",
              value: "1"
            });
            objRecord_updateLead.setValue({ // Set Sucursal
              fieldId: "custentity25",
              value: param_sucursalAgenda
            });

            objRecord_SaveLead_id = objRecord_updateLead.save({
              enableSourcing: false,
              ignoreMandatoryFields: true
            });

            var field_entityId_Lead = objRecord_updateLead.getValue({
              fieldId: 'entityid'
            });

            return [{
              idLead: objRecord_SaveLead_id,
              idExpediente: field_entityId_Lead
            }]
          } catch (error) {
            return [{
              "ERR_CREATE_LEAD": error,
              "dxLead": "No Content"
            }]
          }
        }
      }

      return {
        get: _get,
        post: _post
      };

    })
