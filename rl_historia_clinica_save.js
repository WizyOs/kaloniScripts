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
        var objJson = JSON.parse(params);
        var param_idCase = objJson.idCase;
        var param_idCustomer = objJson.idCustomer;
        var param_idEmpleado = objJson.idEmpleado;
        var param_idSucursal = objJson.idSucursal;
        var param_emailEmpleado = objJson.emailEmpleado;
        var param_emailCustomer = objJson.emailCustomer;
        var param_custevent341 = objJson.custevent341;
        var param_custevent253 = objJson.custevent253;
        var param_custevent223 = objJson.custevent223;
        var param_custevent233 = objJson.custevent233;
        var param_custevent226 = objJson.custevent226;
        var param_custevent240 = objJson.custevent240;
        //var param_custevent230 = objJson.custevent230; // DIABETES VIEJO
        var param_custevent1199 = objJson.custevent1199; // DIABETES NUEVO
        var param_custevent252 = objJson.custevent252;
        var param_custevent222 = objJson.custevent222;
        var param_custevent517 = objJson.custevent517;
        var param_custevent518 = objJson.custevent518;
        var param_custevent519 = objJson.custevent519;
        var param_custevent520 = objJson.custevent520;
        var param_custevent232 = objJson.custevent232;
        var param_custevent227 = objJson.custevent227;
        var param_custevent521 = objJson.custevent521;
        var param_custevent522 = objJson.custevent522;
        var param_custevent523 = objJson.custevent523;
        var param_custevent524 = objJson.custevent524;
        var param_custevent525 = objJson.custevent525;
        var param_custevent526 = objJson.custevent526;
        var param_custevent527 = objJson.custevent527;
        var param_custevent528 = objJson.custevent528;
        var param_custevent529 = objJson.custevent529;
        var param_custevent530 = objJson.custevent530;
        var param_custevent225 = objJson.custevent225;
        var param_custevent236 = objJson.custevent236;
        //var param_custevent237 = objJson.custevent237; // VIH Resultado VIEJO - Lista
        var param_custevent1200 = objJson.custevent1200; // VIH Especifique NUEVO - Texto
        var param_custevent531 = objJson.custevent531;
        //var param_custevent532 = objJson.custevent532; // Hepatitis Resultado VIEJO - Lista
        var param_custevent1201 = objJson.custevent1201; // Hepatitis Resultado NUEVO - Texto
        var param_custevent533 = objJson.custevent533;
        var param_custevent534 = objJson.custevent534;
        var param_custevent535 = objJson.custevent535;
        var param_custevent536 = objJson.custevent536;
        var param_custevent479 = objJson.custevent479;
        var param_custevent235 = objJson.custevent235;
        var param_custevent238 = objJson.custevent238;
        var param_custevent228 = objJson.custevent228;
        var param_custevent537 = objJson.custevent537;
        var param_custevent538 = objJson.custevent538;
        var param_custevent229 = objJson.custevent229;
        var param_custevent539 = objJson.custevent539;
        var param_custevent540 = objJson.custevent540;
        var param_custevent331 = objJson.custevent331;
        var param_custevent206 = objJson.custevent206;
        var param_custevent489 = objJson.custevent489;
        var param_custevent255 = objJson.custevent255;
        var param_custevent257 = objJson.custevent257;
        var param_custevent258 = objJson.custevent258;
        var param_custevent260 = objJson.custevent260;
        var param_custevent256 = objJson.custevent256;
        var param_custevent259 = objJson.custevent259;
        var param_custevent264 = objJson.custevent264;
        var param_custevent265 = objJson.custevent265;
        var param_custevent266 = objJson.custevent266;
        var param_custevent267 = objJson.custevent267;
        var param_custevent261 = objJson.custevent261;
        var param_custevent262 = objJson.custevent262;
        var param_custevent502 = objJson.custevent502;
        var param_custevent503 = objJson.custevent503;
        var param_custevent504 = objJson.custevent504;
        var param_custevent505 = objJson.custevent505;
        var param_custevent506 = objJson.custevent506;
        var param_custevent507 = objJson.custevent507;
        var param_custevent541 = objJson.custevent541;
        var param_custevent495 = objJson.custevent495;
        var param_custevent492 = objJson.custevent492;
        var param_custevent493 = objJson.custevent493;
        var param_custevent494 = objJson.custevent494;
        var param_custevent542 = objJson.custevent542;
        var param_custevent312 = objJson.custevent312;
        var param_custevent1202 = objJson.custevent1202;
        var param_custevent1203 = objJson.custevent1203;
        var param_custevent1204 = objJson.custevent1204;
        var param_custevent1205 = objJson.custevent1205;
        var param_custevent1192 = objJson.custevent1192;
        var param_custevent1193 = objJson.custevent1193;
        var param_custevent1194 = objJson.custevent1194;
        var param_custevent1195 = objJson.custevent1195;

        log.debug(" params", params);

/*         if (param_custevent257 != "") {
          param_custevent257 = param_custevent257.split(",");
          newArr_param_custevent257 = param_custevent257.map(Number);
        }
        if (param_custevent259 != "") {
          param_custevent259 = param_custevent259.split(",");
          newArr_param_custevent259 = param_custevent259.map(Number);
        }
        if (param_custevent260 != "") {
          param_custevent260 = param_custevent260.split(",");
          newArr_param_custevent260 = param_custevent260.map(Number);
        } */

        if (param_custevent312 != "") {
          var image_url_img_firmaHc = https.get({
            url: param_custevent312
          });
        }


        if (param_custevent341 != "") {
          if (param_custevent341 == "true") {
            param_custevent341 = "T";
          } else if (param_custevent341 == "false") {
            param_custevent341 = "F";
          }
        }
        if (param_custevent223 != "") {
          if (param_custevent223 == "true") {
            param_custevent223 = "T";
          } else if (param_custevent223 == "false") {
            param_custevent223 = "F";
          }
        }
        if (param_custevent226 != "") {
          if (param_custevent226 == "true") {
            param_custevent226 = "T";
          } else if (param_custevent226 == "false") {
            param_custevent226 = "F";
          }
        }
        if (param_custevent252 != "") {
          if (param_custevent252 == "true") {
            param_custevent252 = "T";
          } else if (param_custevent252 == "false") {
            param_custevent252 = "F";
          }
        }
        if (param_custevent255 != "") {
          if (param_custevent255 == "true") {
            param_custevent255 = 1;
          } else if (param_custevent255 == "false") {
            param_custevent255 = 2;
          }
        }
        if (param_custevent258 != "") {
          if (param_custevent258 == "true") {
            param_custevent258 = 1;
          } else if (param_custevent258 == "false") {
            param_custevent258 = 2;
          }
        }
        if (param_custevent256 != "") {
          if (param_custevent256 == "true") {
            param_custevent256 = 1;
          } else if (param_custevent256 == "false") {
            param_custevent256 = 2;
          }
        }

        if (param_custevent517 != "") {
          if (param_custevent517 == "true") {
            param_custevent517 = "T";
          } else if (param_custevent517 == "false") {
            param_custevent517 = "F";
          }
        }
        if (param_custevent519 != "") {
          if (param_custevent519 == "true") {
            param_custevent519 = "T";
          } else if (param_custevent519 == "false") {
            param_custevent519 = "F";
          }
        }
        if (param_custevent232 != "") {
          if (param_custevent232 == "true") {
            param_custevent232 = "T";
          } else if (param_custevent232 == "false") {
            param_custevent232 = "F";
          }
        }
        if (param_custevent521 != "") {
          if (param_custevent521 == "true") {
            param_custevent521 = "T";
          } else if (param_custevent521 == "false") {
            param_custevent521 = "F";
          }
        }
        if (param_custevent523 != "") {
          if (param_custevent523 == "true") {
            param_custevent523 = "T";
          } else if (param_custevent523 == "false") {
            param_custevent523 = "F";
          }
        }
        if (param_custevent525 != "") {
          if (param_custevent525 == "true") {
            param_custevent525 = "T";
          } else if (param_custevent525 == "false") {
            param_custevent525 = "F";
          }
        }
        if (param_custevent527 != "") {
          if (param_custevent527 == "true") {
            param_custevent527 = "T";
          } else if (param_custevent527 == "false") {
            param_custevent527 = "F";
          }
        }
        if (param_custevent529 != "") {
          if (param_custevent529 == "true") {
            param_custevent529 = "T";
          } else if (param_custevent529 == "false") {
            param_custevent529 = "F";
          }
        }
        if (param_custevent236 != "") {
          if (param_custevent236 == "true") {
            param_custevent236 = "T";
          } else if (param_custevent236 == "false") {
            param_custevent236 = "F";
          }
        }
        if (param_custevent531 != "") {
          if (param_custevent531 == "true") {
            param_custevent531 = "T";
          } else if (param_custevent531 == "false") {
            param_custevent531 = "F";
          }
        }
        if (param_custevent533 != "") {
          if (param_custevent533 == "true") {
            param_custevent533 = "T";
          } else if (param_custevent533 == "false") {
            param_custevent533 = "F";
          }
        }
        if (param_custevent535 != "") {
          if (param_custevent535 == "true") {
            param_custevent535 = "T";
          } else if (param_custevent535 == "false") {
            param_custevent535 = "F";
          }
        }
        if (param_custevent535 != "") {
          if (param_custevent535 == "true") {
            param_custevent535 = "T";
          } else if (param_custevent535 == "false") {
            param_custevent535 = "F";
          }
        }
        if (param_custevent479 != "") {
          if (param_custevent479 == "true") {
            param_custevent479 = "T";
          } else if (param_custevent479 == "false") {
            param_custevent479 = "F";
          }
        }
        if (param_custevent238 != "") {
          if (param_custevent238 == "true") {
            param_custevent238 = "T";
          } else if (param_custevent238 == "false") {
            param_custevent238 = "F";
          }
        }
        if (param_custevent537 != "") {
          if (param_custevent537 == "true") {
            param_custevent537 = "T";
          } else if (param_custevent537 == "false") {
            param_custevent537 = "F";
          }
        }
        if (param_custevent539 != "") {
          if (param_custevent539 == "true") {
            param_custevent539 = "T";
          } else if (param_custevent539 == "false") {
            param_custevent539 = "F";
          }
        }
        if (param_custevent1202 != "") {
          if (param_custevent1202 == "true") {
            param_custevent1202 = true;
          } else if (param_custevent1202 == "false") {
            param_custevent1202 = false;
          }
        }
        if (param_custevent1204 != "") {
          if (param_custevent1204 == "true") {
            param_custevent1204 = true;
          } else if (param_custevent1204 == "false") {
            param_custevent1204 = false;
          }
        }  
        if (param_custevent1192 != "") {
          if (param_custevent1192 == "true") {
            param_custevent1192 = "T";
          } else if (param_custevent1192 == "false") {
            param_custevent1192 = "F";
          }
        }
        if (param_custevent1194 != "") {
          if (param_custevent1194 == "true") {
            param_custevent1194 = "T";
          } else if (param_custevent1194 == "false") {
            param_custevent1194 = "F";
          }
        }   


        if (param_idCase == "") {
          //log.debug('NUEVO');
          if (param_idCustomer != "") {

            var id_recordCreate_HistoryClinic = "";
            try {
              var obj_case_historiaClinica = record.create({
                type: record.Type.SUPPORT_CASE,
                isDynamic: true,
              });

              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'customform', // Formulario Historial Clinico 134
                value: "134",
                ignoreFieldChange: true
              });
              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'company', // idCustomer
                value: param_idCustomer,
                ignoreFieldChange: true
              });
              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'title', // titulo del caso
                value: "Historia Clínica",
                ignoreFieldChange: true
              });
/*               var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'custevent634',
                value: "1",
                ignoreFieldChange: true
              }); */
/*               var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'custevent206',
                value: "1",
                ignoreFieldChange: true
              }); */
              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'custevent322', // Consultor que valoro
                value: "1171930",
                ignoreFieldChange: true
              });
              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'custevent207', // Ocupacion del cliente por default empleado
                value: "16",
                ignoreFieldChange: true
              });
              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'custevent208', // Como se entero de nosotros es App Web por default
                value: "244", 
                ignoreFieldChange: true
              });
              var field_caseHC_param_idCustomer = obj_case_historiaClinica.setValue({
                fieldId: 'email',
                value: "dale_mas@perro.com",
                ignoreFieldChange: true
              });




              if (param_custevent341 != "") {
                var field_caseHC_custevent341 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent341',
                  text: param_custevent341,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent522 != "") {
                var field_caseHC_custevent522 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent522',
                  text: param_custevent522,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent341 != "") {
                var field_caseHC_custevent341 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent341',
                  text: param_custevent341,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent253 != "") {
                var field_caseHC_custevent253 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent253',
                  text: param_custevent253,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent223 != "") {
                var field_caseHC_custevent223 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent223',
                  text: param_custevent223,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent233 != "") {
                var field_caseHC_custevent233 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent233',
                  text: param_custevent233,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent226 != "") {
                var field_caseHC_custevent226 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent226',
                  text: param_custevent226,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent240 != "") {
                var field_caseHC_custevent240 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent240',
                  text: param_custevent240,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1199 != "") {
                var field_caseHC_custevent230 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1199',
                  text: param_custevent1199,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent252 != "") {
                var field_caseHC_custevent252 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent252',
                  text: param_custevent252,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent222 != "") {
                var field_caseHC_custevent222 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent222',
                  text: param_custevent222,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent517 != "") {
                var field_caseHC_custevent517 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent517',
                  text: param_custevent517,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent518 != "") {
                var field_caseHC_custevent518 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent518',
                  text: param_custevent518,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent519 != "") {
                var field_caseHC_custevent519 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent519',
                  text: param_custevent519,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent520 != "") {
                var field_caseHC_custevent520 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent520',
                  text: param_custevent520,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent232 != "") {
                var field_caseHC_custevent232 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent232',
                  text: param_custevent232,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent227 != "") {
                var field_caseHC_custevent227 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent227',
                  text: param_custevent227,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent521 != "") {
                var field_caseHC_custevent521 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent521',
                  text: param_custevent521,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent522 != "") {
                var field_caseHC_custevent522 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent522',
                  text: param_custevent522,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent523 != "") {
                var field_caseHC_custevent523 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent523',
                  text: param_custevent523,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent524 != "") {
                var field_caseHC_custevent524 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent524',
                  text: param_custevent524,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent525 != "") {
                var field_caseHC_custevent525 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent525',
                  text: param_custevent525,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent526 != "") {
                var field_caseHC_custevent526 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent526',
                  text: param_custevent526,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent527 != "") {
                var field_caseHC_custevent527 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent527',
                  text: param_custevent527,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent528 != "") {
                var field_caseHC_custevent528 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent528',
                  text: param_custevent528,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent529 != "") {
                var field_caseHC_custevent529 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent529',
                  text: param_custevent529,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent530 != "") {
                var field_caseHC_custevent530 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent530',
                  text: param_custevent530,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent225 != "") {
                var field_caseHC_custevent225 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent225',
                  value: param_custevent225,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent236 != "") {
                var field_caseHC_custevent236 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent236',
                  text: param_custevent236,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1200 != "") {
                var field_caseHC_custevent237 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1200',
                  text: param_custevent1200,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent531 != "") {
                var field_caseHC_custevent531 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent531',
                  text: param_custevent531,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1201 != "") {
                var field_caseHC_custevent532 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent1201',
                  value: param_custevent1201,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent533 != "") {
                var field_caseHC_custevent533 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent533',
                  text: param_custevent533,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent534 != "") {
                var field_caseHC_custevent534 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent534',
                  text: param_custevent534,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent535 != "") {
                var field_caseHC_custevent535 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent535',
                  text: param_custevent535,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent536 != "") {
                var field_caseHC_custevent536 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent536',
                  text: param_custevent536,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent479 != "") {
                var field_caseHC_custevent479 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent479',
                  text: param_custevent479,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent235 != "") {
                var field_caseHC_custevent235 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent235',
                  text: param_custevent235,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent238 != "") {
                var field_caseHC_custevent238 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent238',
                  text: param_custevent238,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent228 != "") {
                var field_caseHC_custevent228 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent228',
                  text: param_custevent228,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent537 != "") {
                var field_caseHC_custevent537 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent537',
                  text: param_custevent537,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent538 != "") {
                var field_caseHC_custevent538 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent538',
                  text: param_custevent538,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent229 != "") {
                var field_caseHC_custevent229 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent229',
                  value: param_custevent229,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent539 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent539',
                  text: param_custevent539,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent540 != "") {
                var field_caseHC_custevent540 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent540',
                  text: param_custevent540,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent331 != "") {
                var field_caseHC_custevent331 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent331',
                  text: param_custevent331,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent206 != "") {
                var field_caseHC_custevent206 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent206',
                  value: param_custevent206,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent489 != "") {
                var field_caseHC_custevent489 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent489',
                  text: param_custevent489,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent255 != "") {
                var field_caseHC_custevent255 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent255',
                  value: param_custevent255,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent257 != "") {
                var field_caseHC_custevent257 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent257',
                  value: param_custevent257,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent258 != "") {
                var field_caseHC_custevent258 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent258',
                  value: param_custevent258,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent260 != "") {
                var field_caseHC_custevent260 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent260',
                  value: param_custevent260,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent256 != "") {
                var field_caseHC_custevent256 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent256',
                  value: param_custevent256,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent259 != "") {
                var field_caseHC_custevent259 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent259',
                  value: param_custevent259,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent264 != "") {
                var field_caseHC_custevent264 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent264',
                  text: param_custevent264,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent265 != "") {
                var field_caseHC_custevent265 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent265',
                  text: param_custevent265,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent266 != "") {
                var field_caseHC_custevent266 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent266',
                  text: param_custevent266,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent267 != "") {
                var field_caseHC_custevent267 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent267',
                  text: param_custevent267,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent261 != "") {
                var field_caseHC_custevent261 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent261',
                  text: param_custevent261,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent262 != "") {
                var field_caseHC_custevent262 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent262',
                  text: param_custevent262,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent502 != "") {
                var field_caseHC_custevent502 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent502',
                  text: param_custevent502,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent503 != "") {
                var field_caseHC_custevent503 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent503',
                  text: param_custevent503,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent504 != "") {
                var field_caseHC_custevent504 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent504',
                  text: param_custevent504,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent505 != "") {
                var field_caseHC_custevent505 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent505',
                  text: param_custevent505,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent506 != "") {
                var field_caseHC_custevent506 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent506',
                  text: param_custevent506,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent507 != "") {
                var field_caseHC_custevent507 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent507',
                  text: param_custevent507,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent541 != "") {
                var field_caseHC_custevent541 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent541',
                  text: param_custevent541,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent495 != "") {
                var field_caseHC_custevent495 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent495',
                  value: param_custevent495,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent492 != "") {
                var field_caseHC_custevent492 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent492',
                  value: param_custevent492,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent493 != "") {
                var field_caseHC_custevent493 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent493',
                  text: param_custevent493,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent494 != "") {
                var field_caseHC_custevent494 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent494',
                  text: param_custevent494,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent542 != "") {
                var field_caseHC_custevent542 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent542',
                  text: param_custevent542,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1202 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent1202',
                  value: param_custevent1202,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1204 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setValue({
                  fieldId: 'custevent1204',
                  value: param_custevent1204,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1203 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1203',
                  text: param_custevent1203,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1205 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1205',
                  text: param_custevent1205,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1192 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1192',
                  text: param_custevent1192,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1194 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1194',
                  text: param_custevent1194,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1193 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1193',
                  text: param_custevent1193,
                  ignoreFieldChange: true
                });
              }
              if (param_custevent1195 != "") {
                var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                  fieldId: 'custevent1195',
                  text: param_custevent1195,
                  ignoreFieldChange: true
                });
              }
              id_recordCreate_HistoryClinic = obj_case_historiaClinica.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
              });

              var obj_case_historiaClinica_loadCreate = record.load({
                type: record.Type.SUPPORT_CASE,
                id: id_recordCreate_HistoryClinic,
                isDynamic: true,
              });

              if (param_custevent312 != "") {
                var objNew_img_firma = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_HistoryClinic + "_image_firma_ap",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_firmaHc.body,
                  encoding: file.Encoding.UTF8,
                  folder: -4
                });
                var idNew_img_firma = objNew_img_firma.save();
                var obj_img_firma = file.load({
                  id: idNew_img_firma
                });
                var field_caseDX_custevent1066 = obj_case_historiaClinica_loadCreate.setValue({
                  fieldId: 'custevent312',
                  value: obj_img_firma.url,
                  ignoreFieldChange: true
                });
              }

              var field_caseHC_param_idCustomer = obj_case_historiaClinica_loadCreate.setValue({
                fieldId: 'custevent2',
                value: "52",
                ignoreFieldChange: true
              });

              id_recordCreate_HistoryClinic = obj_case_historiaClinica_loadCreate.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
              });

              return {
                idCase: id_recordCreate_HistoryClinic,
                success: "OK"
              }
            } catch (error) {
              log.error("ERR_CREATE_HISTORY_CLINIC", error);
              return {
                "ERR_CREATE_HISTORY_CLINIC": error
              }
            }
          }
        } else {
          try {
            //log.debug('update record');
            var obj_case_historiaClinica = record.load({
              type: record.Type.SUPPORT_CASE,
              id: param_idCase,
              isDynamic: true,
            });

            if (param_custevent341 != "") {
              var field_caseHC_custevent341 = obj_case_historiaClinica.setText({
                fieldId: 'custevent341',
                text: param_custevent341,
                ignoreFieldChange: true
              });
            }
            if (param_custevent253 != "") {
              var field_caseHC_custevent253 = obj_case_historiaClinica.setText({
                fieldId: 'custevent253',
                text: param_custevent253,
                ignoreFieldChange: true
              });
            }
            if (param_custevent223 != "") {
              var field_caseHC_custevent223 = obj_case_historiaClinica.setText({
                fieldId: 'custevent223',
                text: param_custevent223,
                ignoreFieldChange: true
              });
            }
            if (param_custevent233 != "") {
              var field_caseHC_custevent233 = obj_case_historiaClinica.setText({
                fieldId: 'custevent233',
                text: param_custevent233,
                ignoreFieldChange: true
              });
            }
            if (param_custevent226 != "") {
              var field_caseHC_custevent226 = obj_case_historiaClinica.setText({
                fieldId: 'custevent226',
                text: param_custevent226,
                ignoreFieldChange: true
              });
            }
            if (param_custevent240 != "") {
              var field_caseHC_custevent240 = obj_case_historiaClinica.setText({
                fieldId: 'custevent240',
                text: param_custevent240,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1199 != "") {
              var field_caseHC_custevent230 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1199',
                text: param_custevent1199,
                ignoreFieldChange: true
              });
            }
            if (param_custevent252 != "") {
              var field_caseHC_custevent252 = obj_case_historiaClinica.setText({
                fieldId: 'custevent252',
                text: param_custevent252,
                ignoreFieldChange: true
              });
            }
            if (param_custevent222 != "") {
              var field_caseHC_custevent222 = obj_case_historiaClinica.setText({
                fieldId: 'custevent222',
                text: param_custevent222,
                ignoreFieldChange: true
              });
            }
            if (param_custevent517 != "") {
              var field_caseHC_custevent517 = obj_case_historiaClinica.setText({
                fieldId: 'custevent517',
                text: param_custevent517,
                ignoreFieldChange: true
              });
            }
            if (param_custevent518 != "") {
              var field_caseHC_custevent518 = obj_case_historiaClinica.setText({
                fieldId: 'custevent518',
                text: param_custevent518,
                ignoreFieldChange: true
              });
            }
            if (param_custevent519 != "") {
              var field_caseHC_custevent519 = obj_case_historiaClinica.setText({
                fieldId: 'custevent519',
                text: param_custevent519,
                ignoreFieldChange: true
              });
            }
            if (param_custevent520 != "") {
              var field_caseHC_custevent520 = obj_case_historiaClinica.setText({
                fieldId: 'custevent520',
                text: param_custevent520,
                ignoreFieldChange: true
              });
            }
            if (param_custevent232 != "") {
              var field_caseHC_custevent232 = obj_case_historiaClinica.setText({
                fieldId: 'custevent232',
                text: param_custevent232,
                ignoreFieldChange: true
              });
            }
            if (param_custevent227 != "") {
              var field_caseHC_custevent227 = obj_case_historiaClinica.setText({
                fieldId: 'custevent227',
                text: param_custevent227,
                ignoreFieldChange: true
              });
            }
            if (param_custevent521 != "") {
              var field_caseHC_custevent521 = obj_case_historiaClinica.setText({
                fieldId: 'custevent521',
                text: param_custevent521,
                ignoreFieldChange: true
              });
            }
            if (param_custevent522 != "") {
              var field_caseHC_custevent522 = obj_case_historiaClinica.setText({
                fieldId: 'custevent522',
                text: param_custevent522,
                ignoreFieldChange: true
              });
            }
            if (param_custevent523 != "") {
              var field_caseHC_custevent523 = obj_case_historiaClinica.setText({
                fieldId: 'custevent523',
                text: param_custevent523,
                ignoreFieldChange: true
              });
            }
            if (param_custevent524 != "") {
              var field_caseHC_custevent524 = obj_case_historiaClinica.setText({
                fieldId: 'custevent524',
                text: param_custevent524,
                ignoreFieldChange: true
              });
            }
            if (param_custevent525 != "") {
              var field_caseHC_custevent525 = obj_case_historiaClinica.setText({
                fieldId: 'custevent525',
                text: param_custevent525,
                ignoreFieldChange: true
              });
            }
            if (param_custevent526 != "") {
              var field_caseHC_custevent526 = obj_case_historiaClinica.setText({
                fieldId: 'custevent526',
                text: param_custevent526,
                ignoreFieldChange: true
              });
            }
            if (param_custevent527 != "") {
              var field_caseHC_custevent527 = obj_case_historiaClinica.setText({
                fieldId: 'custevent527',
                text: param_custevent527,
                ignoreFieldChange: true
              });
            }
            if (param_custevent528 != "") {
              var field_caseHC_custevent528 = obj_case_historiaClinica.setText({
                fieldId: 'custevent528',
                text: param_custevent528,
                ignoreFieldChange: true
              });
            }
            if (param_custevent529 != "") {
              var field_caseHC_custevent529 = obj_case_historiaClinica.setText({
                fieldId: 'custevent529',
                text: param_custevent529,
                ignoreFieldChange: true
              });
            }
            if (param_custevent530 != "") {
              var field_caseHC_custevent530 = obj_case_historiaClinica.setText({
                fieldId: 'custevent530',
                text: param_custevent530,
                ignoreFieldChange: true
              });
            }
            if (param_custevent225 != "") {
              var field_caseHC_custevent225 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent225',
                value: param_custevent225,
                ignoreFieldChange: true
              });
            }
            if (param_custevent236 != "") {
              var field_caseHC_custevent236 = obj_case_historiaClinica.setText({
                fieldId: 'custevent236',
                text: param_custevent236,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1200 != "") {
              var field_caseHC_custevent237 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1200',
                text: param_custevent1200,
                ignoreFieldChange: true
              });
            }
            if (param_custevent531 != "") {
              var field_caseHC_custevent531 = obj_case_historiaClinica.setText({
                fieldId: 'custevent531',
                text: param_custevent531,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1201 != "") {
              var field_caseHC_custevent532 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent1201',
                value: param_custevent1201,
                ignoreFieldChange: true
              });
            }
            if (param_custevent533 != "") {
              var field_caseHC_custevent533 = obj_case_historiaClinica.setText({
                fieldId: 'custevent533',
                text: param_custevent533,
                ignoreFieldChange: true
              });
            }
            if (param_custevent534 != "") {
              var field_caseHC_custevent534 = obj_case_historiaClinica.setText({
                fieldId: 'custevent534',
                text: param_custevent534,
                ignoreFieldChange: true
              });
            }
            if (param_custevent535 != "") {
              var field_caseHC_custevent535 = obj_case_historiaClinica.setText({
                fieldId: 'custevent535',
                text: param_custevent535,
                ignoreFieldChange: true
              });
            }
            if (param_custevent536 != "") {
              var field_caseHC_custevent536 = obj_case_historiaClinica.setText({
                fieldId: 'custevent536',
                text: param_custevent536,
                ignoreFieldChange: true
              });
            }
            if (param_custevent479 != "") {
              var field_caseHC_custevent479 = obj_case_historiaClinica.setText({
                fieldId: 'custevent479',
                text: param_custevent479,
                ignoreFieldChange: true
              });
            }
            if (param_custevent235 != "") {
              var field_caseHC_custevent235 = obj_case_historiaClinica.setText({
                fieldId: 'custevent235',
                text: param_custevent235,
                ignoreFieldChange: true
              });
            }
            if (param_custevent238 != "") {
              var field_caseHC_custevent238 = obj_case_historiaClinica.setText({
                fieldId: 'custevent238',
                text: param_custevent238,
                ignoreFieldChange: true
              });
            }
            if (param_custevent228 != "") {
              var field_caseHC_custevent228 = obj_case_historiaClinica.setText({
                fieldId: 'custevent228',
                text: param_custevent228,
                ignoreFieldChange: true
              });
            }
            if (param_custevent537 != "") {
              var field_caseHC_custevent537 = obj_case_historiaClinica.setText({
                fieldId: 'custevent537',
                text: param_custevent537,
                ignoreFieldChange: true
              });
            }
            if (param_custevent538 != "") {
              var field_caseHC_custevent538 = obj_case_historiaClinica.setText({
                fieldId: 'custevent538',
                text: param_custevent538,
                ignoreFieldChange: true
              });
            }
            if (param_custevent229 != "") {
              var field_caseHC_custevent229 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent229',
                value: param_custevent229,
                ignoreFieldChange: true
              });
            }
            if (param_custevent539 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent539',
                text: param_custevent539,
                ignoreFieldChange: true
              });
            }
            if (param_custevent540 != "") {
              var field_caseHC_custevent540 = obj_case_historiaClinica.setText({
                fieldId: 'custevent540',
                text: param_custevent540,
                ignoreFieldChange: true
              });
            }
            if (param_custevent331 != "") {
              var field_caseHC_custevent331 = obj_case_historiaClinica.setText({
                fieldId: 'custevent331',
                text: param_custevent331,
                ignoreFieldChange: true
              });
            }
            if (param_custevent206 != "") {
              var field_caseHC_custevent206 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent206',
                value: param_custevent206,
                ignoreFieldChange: true
              });
            }
            if (param_custevent489 != "") {
              var field_caseHC_custevent489 = obj_case_historiaClinica.setText({
                fieldId: 'custevent489',
                text: param_custevent489,
                ignoreFieldChange: true
              });
            }
            if (param_custevent255 != "") {
              var field_caseHC_custevent255 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent255',
                value: param_custevent255,
                ignoreFieldChange: true
              });
            }
            if (param_custevent257 != "") {
              var field_caseHC_custevent257 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent257',
                value: param_custevent257,
                ignoreFieldChange: true
              });
            }
            if (param_custevent258 != "") {
              var field_caseHC_custevent258 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent258',
                value: param_custevent258,
                ignoreFieldChange: true
              });
            }
            if (param_custevent260 != "") {
              var field_caseHC_custevent260 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent260',
                value: param_custevent260,
                ignoreFieldChange: true
              });
            }
            if (param_custevent256 != "") {
              var field_caseHC_custevent256 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent256',
                value: param_custevent256,
                ignoreFieldChange: true
              });
            }
            if (param_custevent259 != "") {
              var field_caseHC_custevent259 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent259',
                value: param_custevent259,
                ignoreFieldChange: true
              });
            }
            if (param_custevent264 != "") {
              var field_caseHC_custevent264 = obj_case_historiaClinica.setText({
                fieldId: 'custevent264',
                text: param_custevent264,
                ignoreFieldChange: true
              });
            }
            if (param_custevent265 != "") {
              var field_caseHC_custevent265 = obj_case_historiaClinica.setText({
                fieldId: 'custevent265',
                text: param_custevent265,
                ignoreFieldChange: true
              });
            }
            if (param_custevent266 != "") {
              var field_caseHC_custevent266 = obj_case_historiaClinica.setText({
                fieldId: 'custevent266',
                text: param_custevent266,
                ignoreFieldChange: true
              });
            }
            if (param_custevent267 != "") {
              var field_caseHC_custevent267 = obj_case_historiaClinica.setText({
                fieldId: 'custevent267',
                text: param_custevent267,
                ignoreFieldChange: true
              });
            }
            if (param_custevent261 != "") {
              var field_caseHC_custevent261 = obj_case_historiaClinica.setText({
                fieldId: 'custevent261',
                text: param_custevent261,
                ignoreFieldChange: true
              });
            }
            if (param_custevent262 != "") {
              var field_caseHC_custevent262 = obj_case_historiaClinica.setText({
                fieldId: 'custevent262',
                text: param_custevent262,
                ignoreFieldChange: true
              });
            }
            if (param_custevent502 != "") {
              var field_caseHC_custevent502 = obj_case_historiaClinica.setText({
                fieldId: 'custevent502',
                text: param_custevent502,
                ignoreFieldChange: true
              });
            }
            if (param_custevent503 != "") {
              var field_caseHC_custevent503 = obj_case_historiaClinica.setText({
                fieldId: 'custevent503',
                text: param_custevent503,
                ignoreFieldChange: true
              });
            }
            if (param_custevent504 != "") {
              var field_caseHC_custevent504 = obj_case_historiaClinica.setText({
                fieldId: 'custevent504',
                text: param_custevent504,
                ignoreFieldChange: true
              });
            }
            if (param_custevent505 != "") {
              var field_caseHC_custevent505 = obj_case_historiaClinica.setText({
                fieldId: 'custevent505',
                text: param_custevent505,
                ignoreFieldChange: true
              });
            }
            if (param_custevent506 != "") {
              var field_caseHC_custevent506 = obj_case_historiaClinica.setText({
                fieldId: 'custevent506',
                text: param_custevent506,
                ignoreFieldChange: true
              });
            }
            if (param_custevent507 != "") {
              var field_caseHC_custevent507 = obj_case_historiaClinica.setText({
                fieldId: 'custevent507',
                text: param_custevent507,
                ignoreFieldChange: true
              });
            }
            if (param_custevent541 != "") {
              var field_caseHC_custevent541 = obj_case_historiaClinica.setText({
                fieldId: 'custevent541',
                text: param_custevent541,
                ignoreFieldChange: true
              });
            }
            if (param_custevent495 != "") {
              var field_caseHC_custevent495 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent495',
                value: param_custevent495,
                ignoreFieldChange: true
              });
            }
            if (param_custevent492 != "") {
              var field_caseHC_custevent492 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent492',
                value: param_custevent492,
                ignoreFieldChange: true
              });
            }
            if (param_custevent493 != "") {
              var field_caseHC_custevent493 = obj_case_historiaClinica.setText({
                fieldId: 'custevent493',
                text: param_custevent493,
                ignoreFieldChange: true
              });
            }
            if (param_custevent494 != "") {
              var field_caseHC_custevent494 = obj_case_historiaClinica.setText({
                fieldId: 'custevent494',
                text: param_custevent494,
                ignoreFieldChange: true
              });
            }
            if (param_custevent542 != "") {
              var field_caseHC_custevent542 = obj_case_historiaClinica.setText({
                fieldId: 'custevent542',
                text: param_custevent542,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1202 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent1202',
                value: param_custevent1202,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1204 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent1204',
                value: param_custevent1204,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1203 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1203',
                text: param_custevent1203,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1205 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1205',
                text: param_custevent1205,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1192 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1192',
                text: param_custevent1192,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1194 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1194',
                text: param_custevent1194,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1193 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1193',
                text: param_custevent1193,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1195 != "") {
              var field_caseHC_custevent539 = obj_case_historiaClinica.setText({
                fieldId: 'custevent1195',
                text: param_custevent1195,
                ignoreFieldChange: true
              });
            }

            if (param_custevent312 != "") {
              var objNew_img_firma = file.create({
                name: param_idCustomer + "_" + param_idCase + "_image_firma_ap",
                fileType: "PNGIMAGE",
                contents: image_url_img_firmaHc.body,
                encoding: file.Encoding.UTF8,
                folder: -4
              });
              var idNew_img_firma = objNew_img_firma.save();
              var obj_img_firma = file.load({
                id: idNew_img_firma
              });
              var field_caseDX_custevent1066 = obj_case_historiaClinica.setValue({
                fieldId: 'custevent312',
                value: obj_img_firma.url,
                ignoreFieldChange: true
              });
            }

            var id_recordUpdate_HistoryClinic = obj_case_historiaClinica.save({
              enableSourcing: true,
              ignoreMandatoryFields: true
            });

            return {
              idCase: id_recordUpdate_HistoryClinic,
              success: "OK"
            }
          } catch (error) {
            log.error("ERR_UPDATE_HISTORY_CLINIC", error);
            return {
              "ERR_UPDATE_HISTORY_CLINIC": error
            }
          }
        }
        log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());
      }

      return {
        get: doGet,
        post: doPost
      };

    });