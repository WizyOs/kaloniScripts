  /**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

  define(['N/record', 'N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format', 'N/https', 'N/url', 'N/xml', 'N/render', 'N/runtime'],

    function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {

      function doGet(params) {

      }

      function doPost(params) {
        
        var objJson;
        if (typeof params === "object") {
          objJson = params;
        } else {
          objJson = JSON.parse(params);
        }
        log.debug("params", objJson);
        
        var param_Email = objJson.param;
        var idHistoriaClinica = 0;
        var id;
        var entityid;
        var diagnosticList = [];
        var procedureList = [];
        var errores = "";
        var typeInternal = "";

        // VARIABLES GLOBALES
        var file_content_firma_ap = "";
        var field_caseHC_custevent255 = false;
        var field_caseHC_custevent256 = false;
        var field_caseHC_custevent258 = false;

        //Busqueda de  id de cliente por medio de correo electronico
        var searchCustomer = search.create({
          type: search.Type.CUSTOMER,
          columns: [{
            name: 'internalid'
          }, {
            name: 'email'
          }, {
            name: 'entityid'
          }],
          filters: [{
            name: 'email',
            operator: 'is',
            values: param_Email
          }]
        });
        var id = 0;
        var resultCustomer = searchCustomer.run().each(function (result) {
          id = result.getValue({
            name: 'internalid'
          });
          entityid = result.getValue({
            name: 'entityid'
          })
        });

        //log.debug("param id", id);

        if (id != 0) {

          //Busqueda de id de caso por id de cliente y filtrado por historia clinica
          var searchHistory = search.create({
            type: search.Type.SUPPORT_CASE,
            columns: [{
              name: 'internalid',
              "sortdir": "DESC"
            }],
            filters: [{
              name: 'internalid',
              join: 'customer',
              operator: 'is',
              values: id
            }, {
              name: 'title',
              operator: 'startswith',
              values: 'Histor'
            }]
          });

          var result_searchHistory = searchHistory.run().each(function (result) {
            idHistoriaClinica = result.getValue({
              name: 'internalid'
            });
          });

          log.debug('Resultado Historia Clinica', id);

          //
          //
          //Busqueda de id de caso por id de cliente y filtrado por Diagnostico
          var searchCreate_DiagnosticList = search.create({
            type: search.Type.SUPPORT_CASE,
            columns: [{
                name: "internalid"
              },
              {
                name: 'title'
              },
              {
                name: 'custevent284'
              },
              {
                name: "custevent1196"
              }
            ],
            filters: [{
                name: "internalid",
                join: "customer",
                operator: "is",
                values: id
              },
              {
                name: "title",
                operator: "contains",
                values: "Skin & Body"
              }
            ]
          });

          var searchPreview_DiagnosticList = searchCreate_DiagnosticList.run().getRange({
            start: 0,
            end: 1000
          });

          var str_searchPreview_DiagnosticList = JSON.stringify(searchPreview_DiagnosticList);
          var obj_searchPreview_DiagnosticList = JSON.parse(str_searchPreview_DiagnosticList);

          if (searchPreview_DiagnosticList.length > 0) {
            for (var k in obj_searchPreview_DiagnosticList) {

              if (obj_searchPreview_DiagnosticList[k].values.custevent284.length > 0) {
                typeValuation = obj_searchPreview_DiagnosticList[k].values.custevent284[0].text;
              } else {
                typeValuation = "";
              }
              diagnosticList.push({
                "internalId": obj_searchPreview_DiagnosticList[k].id,
                "titleDiagnostic": obj_searchPreview_DiagnosticList[k].values.custevent1196,
                //"titleDiagnostic": obj_searchPreview_DiagnosticList[k].values.title,
                "typeValuation": typeValuation
              });
            };
          } else {
            /* diagnosticList.push({
              "success": 204,
              "internalId": "No Content",
              "details": [{
                "ERR_SEARCH_DIAGNOSTICS": "Diagnostics not exist",
                "NetSuite_idCustomer": entityid
              }]
            }) */
            diagnosticList = {
              dxValue: "No Content"
            };
          }

          //
          //
          //Busqueda de id de caso por id de cliente y filtrado por Procedimientos
          var searchCreate_ProcedureList = search.create({
            type: search.Type.SUPPORT_CASE,
            columns: [{
                "name": "internalid"
              },
              {
                "name": "title"
              },
              {
                name: "custevent1079"
              }
            ],
            filters: [{
                "name": "internalidnumber",
                "join": "customer",
                "operator": "equalto",
                "values": [
                  id
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
              },
              {
                "name": "title",
                "operator": "doesnotcontain",
                "values": [
                  "Historia"
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
              },
              {
                "name": "title",
                "operator": "doesnotcontain",
                "values": [
                  "Skin & Body"
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
              },
              {
                "name": "title",
                "operator": "doesnotcontain",
                "values": [
                  "Diagn"
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
              },
              {
                "name": "title",
                "operator": "doesnotcontain",
                "values": [
                  "Procedimiento"
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
              }
            ]
          });

          var searchPreview_ProcedureList = searchCreate_ProcedureList.run().getRange({
            start: 0,
            end: 1000
          });

          var str_searchPreview_ProcedureList = JSON.stringify(searchPreview_ProcedureList);
          var obj_searchPreview_ProcedureList = JSON.parse(str_searchPreview_ProcedureList);

          if (searchPreview_ProcedureList.length > 0) {
            for (var k in obj_searchPreview_ProcedureList) {

              if (obj_searchPreview_ProcedureList[k].values.custevent1079.length == 0) {
                titleProcedure = obj_searchPreview_ProcedureList[k].values.title;
                titleProcedure_sub = titleProcedure.substr(0,7);
                typeRostro = titleProcedure.substr(-6,6);
                typeBody = titleProcedure.substr(-4,4);
      
                if (typeRostro === "Rostro") {
                  typeInternal = "rostro";
                } else if (typeBody === "Body") {
                  typeInternal = "cuerpo";
                } else {
                  typeInternal = "";
                }
      
                if (titleProcedure_sub == "Aparato") {
                  typeProcedure = "noQx";
                } else {
                  typeProcedure = "Qx";
                }
      
                procedureList.push({
                  "idProcedure": obj_searchPreview_ProcedureList[k].id,
                  "titleProcedure": obj_searchPreview_ProcedureList[k].values.title,
                  "typeProcedure": typeProcedure,
                  "typeInternal": typeInternal
                });
              }
            }
          } else {
            procedureList = {
              prValue: "No Content"
            };
          }

          //DATOS CLIENTE
          var obj_customer = record.load({
            type: 'customer',
            id: id
          });
          var idCustomer = id;
          var field_customer_entityid = obj_customer.getText({
            fieldId: 'entityid'
          });
          var field_customer_altname = obj_customer.getText({
            fieldId: 'altname'
          });
          var field_customer_custentity_sexo = obj_customer.getValue({
            fieldId: 'custentity_sexo'
          });
          var field_customer_defaultaddress = obj_customer.getText({
            fieldId: 'defaultaddress'
          });
          var field_customer_mobilephone = obj_customer.getValue({
            fieldId: 'mobilephone'
          });
          var field_customer_custentity25 = obj_customer.getText({
            fieldId: 'custentity25'
          });
          var field_customer_custentity234 = obj_customer.getText({
            fieldId: 'custentity234'
          });


          try {
            //DATOS CASO HISTORIA CLINICA
            var obj_case_historiaClinica = record.load({
              type: 'supportcase',
              id: idHistoriaClinica
            });
            var field_caseHC_custevent341 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent341'
            });
            var field_caseHC_custevent332 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent332'
            });
            var field_caseHC_custevent253 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent253'
            });
            var field_caseHC_custevent223 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent223'
            });
            var field_caseHC_custevent233 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent233'
            });
            var field_caseHC_custevent226 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent226'
            });
            var field_caseHC_custevent240 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent240'
            });
            var field_caseHC_custevent1199 = obj_case_historiaClinica.getText({
              fieldId: 'custevent1199'
            });
            var field_caseHC_custevent252 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent252'
            });
            var field_caseHC_custevent222 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent222'
            });
            var field_caseHC_custevent517 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent517'
            });
            var field_caseHC_custevent518 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent518'
            });
            var field_caseHC_custevent519 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent519'
            });
            var field_caseHC_custevent520 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent520'
            });
            var field_caseHC_custevent232 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent232'
            });
            var field_caseHC_custevent227 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent227'
            });
            var field_caseHC_custevent521 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent521'
            });
            var field_caseHC_custevent522 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent522'
            });
            var field_caseHC_custevent523 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent523'
            });
            var field_caseHC_custevent524 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent524'
            });
            var field_caseHC_custevent525 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent525'
            });
            var field_caseHC_custevent526 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent526'
            });
            var field_caseHC_custevent527 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent527'
            });
            var field_caseHC_custevent528 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent528'
            });
            var field_caseHC_custevent529 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent529'
            });
            var field_caseHC_custevent530 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent530'
            });
            var field_caseHC_custevent225 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent225'
            });
            var field_caseHC_custevent236 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent236'
            });
            var field_caseHC_custevent1200 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent1200'
            });
            var field_caseHC_custevent531 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent531'
            });
            var field_caseHC_custevent1201 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent1201'
            });
            var field_caseHC_custevent533 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent533'
            });
            var field_caseHC_custevent534 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent534'
            });
            var field_caseHC_custevent535 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent535'
            });
            var field_caseHC_custevent536 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent536'
            });
            var field_caseHC_custevent479 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent479'
            });
            var field_caseHC_custevent235 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent235'
            });
            var field_caseHC_custevent238 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent238'
            });
            var field_caseHC_custevent228 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent228'
            });
            var field_caseHC_custevent537 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent537'
            });
            var field_caseHC_custevent538 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent538'
            });
            var field_caseHC_custevent229 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent229'
            });
            var field_caseHC_custevent539 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent539'
            });
            var field_caseHC_custevent540 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent540'
            });
            var field_caseHC_custevent331 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent331'
            });
            var field_caseHC_custevent206 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent206'
            });
            var field_caseHC_custevent489 = obj_case_historiaClinica.getText({
              fieldId: 'custevent489'
            });
            field_caseHC_custevent255 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent255'
            });
            if (field_caseHC_custevent255 == 1) {
              field_caseHC_custevent255 = true;
            }
            var field_caseHC_custevent257 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent257'
            });
            field_caseHC_custevent258 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent258'
            });
            if (field_caseHC_custevent258 == 1) {
              field_caseHC_custevent258 = true;
            }
            var field_caseHC_custevent260 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent260'
            });
            field_caseHC_custevent256 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent256'
            });
            if (field_caseHC_custevent256 == 1) {
              field_caseHC_custevent256 = true;
            }
            var field_caseHC_custevent259 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent259'
            });
            var field_caseHC_custevent264 = obj_case_historiaClinica.getText({
              fieldId: 'custevent264'
            });
            var field_caseHC_custevent265 = obj_case_historiaClinica.getText({
              fieldId: 'custevent265'
            });
            var field_caseHC_custevent266 = obj_case_historiaClinica.getText({
              fieldId: 'custevent266'
            });
            var field_caseHC_custevent267 = obj_case_historiaClinica.getText({
              fieldId: 'custevent267'
            });
            var field_caseHC_custevent261 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent261'
            });
            var field_caseHC_custevent262 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent262'
            });
            var field_caseHC_custevent502 = obj_case_historiaClinica.getText({
              fieldId: 'custevent502'
            });
            var field_caseHC_custevent503 = obj_case_historiaClinica.getText({
              fieldId: 'custevent503'
            });
            var field_caseHC_custevent504 = obj_case_historiaClinica.getText({
              fieldId: 'custevent504'
            });
            var field_caseHC_custevent505 = obj_case_historiaClinica.getText({
              fieldId: 'custevent505'
            });
            var field_caseHC_custevent506 = obj_case_historiaClinica.getText({
              fieldId: 'custevent506'
            });
            var field_caseHC_custevent507 = obj_case_historiaClinica.getText({
              fieldId: 'custevent507'
            });
            var field_caseHC_custevent541 = obj_case_historiaClinica.getText({
              fieldId: 'custevent541'
            });
            var field_caseHC_custevent495 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent495'
            });
            var field_caseHC_custevent492 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent492'
            });
            var field_caseHC_custevent493 = obj_case_historiaClinica.getText({
              fieldId: 'custevent493'
            });
            var field_caseHC_custevent494 = obj_case_historiaClinica.getText({
              fieldId: 'custevent494'
            });
            var field_caseHC_custevent508 = obj_case_historiaClinica.getText({
              fieldId: 'custevent508'
            });
            var field_caseHC_custevent542 = obj_case_historiaClinica.getText({
              fieldId: 'custevent542'
            });
            var field_caseHC_custevent1202 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent1202'
            });
            var field_caseHC_custevent1203 = obj_case_historiaClinica.getText({
              fieldId: 'custevent1203'
            });
            var field_caseHC_custevent1204 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent1204'
            });
            var field_caseHC_custevent1205 = obj_case_historiaClinica.getText({
              fieldId: 'custevent1205'
            });
            var field_caseHC_custevent1192 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent1192'
            });
            var field_caseHC_custevent1193 = obj_case_historiaClinica.getText({
              fieldId: 'custevent1193'
            });
            var field_caseHC_custevent1194 = obj_case_historiaClinica.getValue({
              fieldId: 'custevent1194'
            });
            var field_caseHC_custevent1195 = obj_case_historiaClinica.getText({
              fieldId: 'custevent1195'
            });

            var field_caseHC_custevent312 = obj_case_historiaClinica.getValue({
              fieldId: "custevent312"
            }) || null;
            if (field_caseHC_custevent312 != null) {
              var cadena1 = field_caseHC_custevent312.substr(0, field_caseHC_custevent312.indexOf("&c"));
              var idFirma_ap = cadena1.substr((cadena1.indexOf("=")) + 1, cadena1.length);
              //log.debug("id", idFirma);        
              var fileObj_image_firma_ap = file.load({
                id: idFirma_ap
              });
              file_content_firma_ap = fileObj_image_firma_ap.getContents();
            }

            var response_case = {
              "internalid": idCustomer,
              "entityid": field_customer_entityid,
              "altname": field_customer_altname,
              "custentity_sexo": field_customer_custentity_sexo,
              "defaultaddress": field_customer_defaultaddress,
              "mobilephone": field_customer_mobilephone,
              "custentity25": field_customer_custentity25,
              "custentity234": field_customer_custentity234,
              "custevent332": field_caseHC_custevent332,
              "custevent341": field_caseHC_custevent341,
              "custevent253": field_caseHC_custevent253,
              "custevent223": field_caseHC_custevent223,
              "custevent233": field_caseHC_custevent233,
              "custevent226": field_caseHC_custevent226,
              "custevent240": field_caseHC_custevent240,
              "custevent1199": field_caseHC_custevent1199,
              "custevent252": field_caseHC_custevent252,
              "custevent222": field_caseHC_custevent222,
              "custevent517": field_caseHC_custevent517,
              "custevent518": field_caseHC_custevent518,
              "custevent519": field_caseHC_custevent519,
              "custevent520": field_caseHC_custevent520,
              "custevent232": field_caseHC_custevent232,
              "custevent227": field_caseHC_custevent227,
              "custevent521": field_caseHC_custevent521,
              "custevent522": field_caseHC_custevent522,
              "custevent523": field_caseHC_custevent523,
              "custevent524": field_caseHC_custevent524,
              "custevent525": field_caseHC_custevent525,
              "custevent526": field_caseHC_custevent526,
              "custevent527": field_caseHC_custevent527,
              "custevent528": field_caseHC_custevent528,
              "custevent529": field_caseHC_custevent529,
              "custevent530": field_caseHC_custevent530,
              "custevent225": field_caseHC_custevent225,
              "custevent236": field_caseHC_custevent236,
              "custevent1200": field_caseHC_custevent1200,
              "custevent531": field_caseHC_custevent531,
              "custevent1201": field_caseHC_custevent1201,
              "custevent533": field_caseHC_custevent533,
              "custevent534": field_caseHC_custevent534,
              "custevent535": field_caseHC_custevent535,
              "custevent536": field_caseHC_custevent536,
              "custevent479": field_caseHC_custevent479,
              "custevent235": field_caseHC_custevent235,
              "custevent238": field_caseHC_custevent238,
              "custevent228": field_caseHC_custevent228,
              "custevent537": field_caseHC_custevent537,
              "custevent538": field_caseHC_custevent538,
              "custevent229": field_caseHC_custevent229,
              "custevent539": field_caseHC_custevent539,
              "custevent540": field_caseHC_custevent540,
              "custevent331": field_caseHC_custevent331,
              "custevent206": field_caseHC_custevent206,
              "custevent489": field_caseHC_custevent489,
              "custevent255": field_caseHC_custevent255,
              "custevent257": field_caseHC_custevent257,
              "custevent258": field_caseHC_custevent258,
              "custevent260": field_caseHC_custevent260,
              "custevent256": field_caseHC_custevent256,
              "custevent259": field_caseHC_custevent259,
              "custevent264": field_caseHC_custevent264,
              "custevent265": field_caseHC_custevent265,
              "custevent266": field_caseHC_custevent266,
              "custevent267": field_caseHC_custevent267,
              "custevent261": field_caseHC_custevent261,
              "custevent262": field_caseHC_custevent262,
              "custevent502": field_caseHC_custevent502,
              "custevent503": field_caseHC_custevent503,
              "custevent504": field_caseHC_custevent504,
              "custevent505": field_caseHC_custevent505,
              "custevent506": field_caseHC_custevent506,
              "custevent507": field_caseHC_custevent507,
              "custevent541": field_caseHC_custevent541,
              "custevent495": field_caseHC_custevent495,
              "custevent492": field_caseHC_custevent492,
              "custevent493": field_caseHC_custevent493,
              "custevent494": field_caseHC_custevent494,
              "custevent508": field_caseHC_custevent508,
              "custevent542": field_caseHC_custevent542,
              "custevent1202": field_caseHC_custevent1202,
              "custevent1203": field_caseHC_custevent1203,
              "custevent1204": field_caseHC_custevent1204,
              "custevent1205": field_caseHC_custevent1205,
              "custevent1192": field_caseHC_custevent1192,
              "custevent1193": field_caseHC_custevent1193,
              "custevent1194": field_caseHC_custevent1194,
              "custevent1195": field_caseHC_custevent1195,
              "custevent312": file_content_firma_ap,
              "historyClinic": {
                "internalId": idHistoriaClinica
              },
              "diagnosticList": diagnosticList,
              "procedureList": procedureList
            };
            return response_case;
          } catch (error) {
            //log.error("ERR_LOAD_HITORY_CLINIC", error)
            var response_case = {
              "internalid": idCustomer,
              "entityid": field_customer_entityid,
              "altname": field_customer_altname,
              "custentity_sexo": field_customer_custentity_sexo,
              "defaultaddress": field_customer_defaultaddress,
              "mobilephone": field_customer_mobilephone,
              "custentity25": field_customer_custentity25,
              "custentity234": field_customer_custentity234,
              "custevent332": "",
              "custevent341": "",
              "custevent253": "",
              "custevent223": "",
              "custevent233": "",
              "custevent226": "",
              "custevent240": "",
              "custevent1199": "",
              "custevent252": "",
              "custevent222": "",
              "custevent517": "",
              "custevent518": "",
              "custevent519": "",
              "custevent520": "",
              "custevent232": "",
              "custevent227": "",
              "custevent521": "",
              "custevent522": "",
              "custevent523": "",
              "custevent524": "",
              "custevent525": "",
              "custevent526": "",
              "custevent527": "",
              "custevent528": "",
              "custevent529": "",
              "custevent530": "",
              "custevent225": "",
              "custevent236": "",
              "custevent1200": "",
              "custevent531": "",
              "custevent1201": "",
              "custevent533": "",
              "custevent534": "",
              "custevent535": "",
              "custevent536": "",
              "custevent479": "",
              "custevent235": "",
              "custevent238": "",
              "custevent228": "",
              "custevent537": "",
              "custevent538": "",
              "custevent229": "",
              "custevent539": "",
              "custevent540": "",
              "custevent331": "",
              "custevent206": "",
              "custevent489": "",
              "custevent255": "",
              "custevent257": "",
              "custevent258": "",
              "custevent260": "",
              "custevent256": "",
              "custevent259": "",
              "custevent264": "",
              "custevent265": "",
              "custevent266": "",
              "custevent267": "",
              "custevent261": "",
              "custevent262": "",
              "custevent502": "",
              "custevent503": "",
              "custevent504": "",
              "custevent505": "",
              "custevent506": "",
              "custevent507": "",
              "custevent541": "",
              "custevent495": "",
              "custevent492": "",
              "custevent493": "",
              "custevent494": "",
              "custevent508": "",
              "custevent542": "",
              "custevent312": "",
              "custevent1202": "",
              "custevent1203": "",
              "custevent1204": "",
              "custevent1205": "",
              "custevent1192": "",
              "custevent1193": "",
              "custevent1194": "",
              "custevent1195": "",
              "historyClinic": {
                "dxHistory": "No Content",
                "internalId": ""
              },
              "diagnosticList": diagnosticList,
              "procedureList": procedureList
            }
            return response_case;
          }
        } else {
          return {
            "success": 204,
            "value": "No Content",
            "details": [{
              "ERR_SEARCH_CUSTOMER": "Customer not exist",
              "NetSuite_idCustomer": param_Email
            }]
          }
        }
        log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());
      }

      return {
        get: doGet,
        post: doPost
      };

    });