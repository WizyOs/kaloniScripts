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
      log.debug("param Dx", params);
      var scriptObj = runtime.getCurrentScript();
      var objJson = JSON.parse(params);
      var param_idCase = objJson.idCase;
      var param_idUser = objJson.idUser;
      var param_emailCustomer = objJson.emailCustomer;
      var param_idCustomer = objJson.idCustomer;
      var param_startdate = objJson.startDate;
      var param_custevent581 = objJson.custevent581;
      var param_custevent582 = objJson.custevent582;
      var param_custevent583 = objJson.custevent583;
      var param_custevent584 = objJson.custevent584;
      var param_custevent585 = objJson.custevent585;
      var param_custevent586 = objJson.custevent586;
      var param_custevent587 = objJson.custevent587;
      var param_custevent588 = objJson.custevent588;
      var param_custevent589 = objJson.custevent589;
      var param_custevent590 = objJson.custevent590;
      var param_custevent591 = objJson.custevent591;
      var param_custevent592 = objJson.custevent592;
      var param_custevent593 = objJson.custevent593;
      var param_custevent594 = objJson.custevent594;
      var param_custevent595 = objJson.custevent595;
      var param_custevent596 = objJson.custevent596;
      var param_custevent597 = objJson.custevent597;
      var param_custevent598 = objJson.custevent598;
      var param_custevent599 = objJson.custevent599;
      var param_custevent600 = objJson.custevent600;
      var param_custevent601 = objJson.custevent601;
      var param_custevent602 = objJson.custevent602;
      var param_custevent603 = objJson.custevent603;
      var param_custevent604 = objJson.custevent604;
      var param_custevent605 = objJson.custevent605;
      var param_custevent606 = objJson.custevent606;
      var param_custevent607 = objJson.custevent607;
      var param_custevent608 = objJson.custevent608;
      var param_custevent609 = objJson.custevent609;
      var param_custevent610 = objJson.custevent610;
      var param_custevent611 = objJson.custevent611;
      var param_custevent612 = objJson.custevent612;
      var param_custevent613 = objJson.custevent613;
      var param_custevent614 = objJson.custevent614;
      var param_custevent615 = objJson.custevent615;
      var param_custevent616 = objJson.custevent616;
      var param_custevent617 = objJson.custevent617;
      var param_custevent618 = objJson.custevent618;
      var param_custevent619 = objJson.custevent619;
      var param_custevent1190 = objJson.custevent1190;
      var param_custevent1191 = objJson.custevent1191;
      var param_custevent625 = objJson.custevent625;
      var param_custevent626 = objJson.custevent626;
      var param_custevent627 = objJson.custevent627;
      var param_custevent628 = objJson.custevent628;
      var param_custevent629 = objJson.custevent629;
      var param_custevent630 = objJson.custevent630;
      var param_custevent631 = objJson.custevent631;
      var param_custevent632 = objJson.custevent632;
      var param_custevent633 = objJson.custevent633;
      var param_custevent279 = objJson.custevent279;
      var param_custevent281 = objJson.custevent281;
      var param_custevent1196 = objJson.custevent1196;
      var param_custevent489 = objJson.custevent489;
      var param_url_img_1 = objJson.custevent313; // IMAGEN 1 
      var param_url_img_2 = objJson.custevent314; // IMAGEN 2
      var param_url_img_3 = objJson.custevent315; // IMAGEN 3 
      var param_url_img_4 = objJson.custevent316; // IMAGEN 4
      var param_url_img_5 = objJson.custevent317; // IMAGEN 5
      var param_url_img_6 = objJson.custevent318; // IMAGEN 6
      var param_url_img_7 = objJson.custevent543; // IMAGEN 7
      var param_url_img_8 = objJson.custevent544; // IMAGEN 8       
      var param_url_firma = objJson.custevent320; // IMAGEN FIRMA
      var param_url_custevent800 = objJson.custevent800; // IMAGEN ROSTRO
      var param_url_custevent809 = objJson.custevent809; // IMAGEN CUERPO
      var param_url_custevent1206 = objJson.custevent1206; // IMAGEN PECHOS
      var arr_param_custevent1196 = [];
      var param_tracing = objJson.tracing;
      log.debug("param_tracing", param_tracing);


      //
      var folderImage = 2762933;
      var folderPaints = 1572868;
      var image_url_img_firmaDx = "";

      //var newArr_param_custevent1196 = param_custevent1196.split(",");

      // MANEJO DE IMAGENES

      if (param_url_img_1 != "") {
        var image_url_img_1 = https.get({
          url: param_url_img_1
        });
        var preArr_img_1 = param_url_img_1.substr((param_url_img_1.indexOf("dx/", 0) + 3), param_url_img_1.length);
        var arr_img_1 = preArr_img_1.split("_");
      }
      if (param_url_img_2 != "") {
        var image_url_img_2 = https.get({
          url: param_url_img_2
        });
        var preArr_img_2 = param_url_img_2.substr((param_url_img_2.indexOf("dx/", 0) + 3), param_url_img_2.length);
        var arr_img_2 = preArr_img_2.split("_");
      }
      if (param_url_img_3 != "") {
        var image_url_img_3 = https.get({
          url: param_url_img_3
        });
        var preArr_img_3 = param_url_img_3.substr((param_url_img_3.indexOf("dx/", 0) + 3), param_url_img_3.length);
        var arr_img_3 = preArr_img_3.split("_");
      }
      if (param_url_img_4 != "") {
        var image_url_img_4 = https.get({
          url: param_url_img_4
        });
        var preArr_img_4 = param_url_img_4.substr((param_url_img_4.indexOf("dx/", 0) + 3), param_url_img_4.length);
        var arr_img_4 = preArr_img_4.split("_");
      }
      if (param_url_img_5 != "") {
        var image_url_img_5 = https.get({
          url: param_url_img_5
        });
        var preArr_img_5 = param_url_img_5.substr((param_url_img_5.indexOf("dx/", 0) + 3), param_url_img_5.length);
        var arr_img_5 = preArr_img_5.split("_");
      }
      if (param_url_img_6 != "") {
        var image_url_img_6 = https.get({
          url: param_url_img_6
        });
        var preArr_img_6 = param_url_img_6.substr((param_url_img_6.indexOf("dx/", 0) + 3), param_url_img_6.length);
        var arr_img_6 = preArr_img_6.split("_");
      }
      if (param_url_img_7 != "") {
        var image_url_img_7 = https.get({
          url: param_url_img_7
        });
        var preArr_img_7 = param_url_img_7.substr((param_url_img_7.indexOf("dx/", 0) + 3), param_url_img_7.length);
        var arr_img_7 = preArr_img_7.split("_");
      }
      if (param_url_img_8 != "") {
        var image_url_img_8 = https.get({
          url: param_url_img_8
        });
        var preArr_img_8 = param_url_img_8.substr((param_url_img_8.indexOf("dx/", 0) + 3), param_url_img_8.length);
        var arr_img_8 = preArr_img_8.split("_");
      }
      if (param_url_firma != "") {
        image_url_img_firmaDx = https.get({
          url: param_url_firma
        });
      }
      if (param_url_custevent800 != "") {
        var paint_url_rostro = https.get({
          url: param_url_custevent800
        });
      }
      if (param_url_custevent809 != "") {
        var paint_url_cuerpo = https.get({
          url: param_url_custevent809
        });
      }
      if (param_url_custevent1206 != "") {
        var paint_url_pechos = https.get({
          url: param_url_custevent1206
        });
      }


      var clienteSeguimiento = record.load({
        type: 'customer',
        id: param_idCustomer
      });


      var seguimiento = record.load({
        type: 'supportcase',
        id: param_tracing
      });
      var fechaCaso = seguimiento.getText({
        fieldId: 'startdate'
      });
      var fechaDeNacimientoSeguimiento = seguimiento.getText({
        fieldId: 'custevent331'
      }); //se cambia el custevent205
      var edadSeguimiento = calcYearInt(fechaDeNacimientoSeguimiento, fechaCaso);
      var generoSeguimiento = clienteSeguimiento.getText({
        fieldId: 'custentity_sexo'
      }) || '';
      var identificacionSeguimiento = clienteSeguimiento.getText({
        fieldId: 'custentity234'
      }) || '';

      var telefonoClienteSeguimiento = clienteSeguimiento.getText({
        fieldId: 'mobilephone'
      });
      var edoCivilSeguimiento = seguimiento.getText({
        fieldId: 'custevent206'
      }) || '';



      if (param_idCase == "") {
        if (param_idCustomer != "") {
          try {
            var obj_case_diagnostico = record.create({
              type: record.Type.SUPPORT_CASE,
              isDynamic: true,
            });

            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'customform', // Formulario Diagnostico Body & Skin 138
              value: "138",
              ignoreFieldChange: true
            });
            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'company', // idCustomer
              value: param_idCustomer,
              ignoreFieldChange: true
            });
            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'title', // titulo del caso
              value: "Diagnóstico Skin & Body",
              ignoreFieldChange: true
            });
            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'custevent322', // Consutlor que valoro
              value: "1171930",
              ignoreFieldChange: true
            });
            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'custevent207', // Ocupación del cliente por default empleado
              value: "16",
              ignoreFieldChange: true
            });
            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'custevent208', // Como se entero de nosotros es App Web por default
              value: "244",
              ignoreFieldChange: true
            });
            var field_caseHC_param_idCustomer = obj_case_diagnostico.setValue({
              fieldId: 'email', // email de cliente
              value: "dale_mas@perro.com",
              ignoreFieldChange: true
            });

            if (param_startdate != "") {
              var field_caseDX_custevent581 = obj_case_diagnostico.setText({
                fieldId: 'startdate',
                text: param_startdate,
                ignoreFieldChange: true
              });
            }
            if (param_custevent581 != "") {
              var field_caseDX_custevent581 = obj_case_diagnostico.setText({
                fieldId: 'custevent581',
                text: param_custevent581,
                ignoreFieldChange: true
              });
            }
            if (param_custevent582 != "") {
              var field_caseDX_custevent582 = obj_case_diagnostico.setText({
                fieldId: 'custevent582',
                text: param_custevent582,
                ignoreFieldChange: true
              });
            }
            if (param_custevent583 != "") {
              var field_caseDX_custevent583 = obj_case_diagnostico.setText({
                fieldId: 'custevent583',
                text: param_custevent583,
                ignoreFieldChange: true
              });
            }
            if (param_custevent584 != "") {
              var field_caseDX_custevent584 = obj_case_diagnostico.setText({
                fieldId: 'custevent584',
                text: param_custevent584,
                ignoreFieldChange: true
              });
            }
            if (param_custevent585 != "") {
              var field_caseDX_custevent585 = obj_case_diagnostico.setText({
                fieldId: 'custevent585',
                text: param_custevent585,
                ignoreFieldChange: true
              });
            }
            if (param_custevent586 != "") {
              var field_caseDX_custevent586 = obj_case_diagnostico.setText({
                fieldId: 'custevent586',
                text: param_custevent586,
                ignoreFieldChange: true
              });
            }
            if (param_custevent587 != "") {
              var field_caseDX_custevent587 = obj_case_diagnostico.setText({
                fieldId: 'custevent587',
                text: param_custevent587,
                ignoreFieldChange: true
              });
            }
            if (param_custevent588 != "") {
              var field_caseDX_custevent588 = obj_case_diagnostico.setText({
                fieldId: 'custevent588',
                text: param_custevent588,
                ignoreFieldChange: true
              });
            }
            if (param_custevent589 != "") {
              var field_caseDX_custevent589 = obj_case_diagnostico.setText({
                fieldId: 'custevent589',
                text: param_custevent589,
                ignoreFieldChange: true
              });
            }
            if (param_custevent590 != "") {
              var field_caseDX_custevent590 = obj_case_diagnostico.setText({
                fieldId: 'custevent590',
                text: param_custevent590,
                ignoreFieldChange: true
              });
            }
            if (param_custevent591 != "") {
              var field_caseDX_custevent591 = obj_case_diagnostico.setText({
                fieldId: 'custevent591',
                text: param_custevent591,
                ignoreFieldChange: true
              });
            }
            if (param_custevent592 != "") {
              var field_caseDX_custevent592 = obj_case_diagnostico.setText({
                fieldId: 'custevent592',
                text: param_custevent592,
                ignoreFieldChange: true
              });
            }
            if (param_custevent593 != "") {
              var field_caseDX_custevent593 = obj_case_diagnostico.setText({
                fieldId: 'custevent593',
                text: param_custevent593,
                ignoreFieldChange: true
              });
            }
            if (param_custevent594 != "") {
              var field_caseDX_custevent594 = obj_case_diagnostico.setText({
                fieldId: 'custevent594',
                text: param_custevent594,
                ignoreFieldChange: true
              });
            }
            if (param_custevent595 != "") {
              var field_caseDX_custevent595 = obj_case_diagnostico.setText({
                fieldId: 'custevent595',
                text: param_custevent595,
                ignoreFieldChange: true
              });
            }
            if (param_custevent596 != "") {
              var field_caseDX_custevent596 = obj_case_diagnostico.setText({
                fieldId: 'custevent596',
                text: param_custevent596,
                ignoreFieldChange: true
              });
            }
            if (param_custevent597 != "") {
              var field_caseDX_custevent597 = obj_case_diagnostico.setText({
                fieldId: 'custevent597',
                text: param_custevent597,
                ignoreFieldChange: true
              });
            }
            if (param_custevent598 != "") {
              var field_caseDX_custevent598 = obj_case_diagnostico.setText({
                fieldId: 'custevent598',
                text: param_custevent598,
                ignoreFieldChange: true
              });
            }
            if (param_custevent599 != "") {
              var field_caseDX_custevent599 = obj_case_diagnostico.setText({
                fieldId: 'custevent599',
                text: param_custevent599,
                ignoreFieldChange: true
              });
            }
            if (param_custevent600 != "") {
              var field_caseDX_custevent600 = obj_case_diagnostico.setText({
                fieldId: 'custevent600',
                text: param_custevent600,
                ignoreFieldChange: true
              });
            }
            if (param_custevent601 != "") {
              var field_caseDX_custevent601 = obj_case_diagnostico.setText({
                fieldId: 'custevent601',
                text: param_custevent601,
                ignoreFieldChange: true
              });
            }
            if (param_custevent602 != "") {
              var field_caseDX_custevent602 = obj_case_diagnostico.setText({
                fieldId: 'custevent602',
                text: param_custevent602,
                ignoreFieldChange: true
              });
            }
            if (param_custevent603 != "") {
              var field_caseDX_custevent603 = obj_case_diagnostico.setText({
                fieldId: 'custevent603',
                text: param_custevent603,
                ignoreFieldChange: true
              });
            }
            if (param_custevent604 != "") {
              var field_caseDX_custevent604 = obj_case_diagnostico.setText({
                fieldId: 'custevent604',
                text: param_custevent604,
                ignoreFieldChange: true
              });
            }
            if (param_custevent605 != "") {
              var field_caseDX_custevent605 = obj_case_diagnostico.setText({
                fieldId: 'custevent605',
                text: param_custevent605,
                ignoreFieldChange: true
              });
            }
            if (param_custevent606 != "") {
              var field_caseDX_custevent606 = obj_case_diagnostico.setText({
                fieldId: 'custevent606',
                text: param_custevent606,
                ignoreFieldChange: true
              });
            }
            if (param_custevent607 != "") {
              var field_caseDX_custevent607 = obj_case_diagnostico.setText({
                fieldId: 'custevent607',
                text: param_custevent607,
                ignoreFieldChange: true
              });
            }
            if (param_custevent608 != "") {
              var field_caseDX_custevent608 = obj_case_diagnostico.setText({
                fieldId: 'custevent608',
                text: param_custevent608,
                ignoreFieldChange: true
              });
            }
            if (param_custevent609 != "") {
              var field_caseDX_custevent609 = obj_case_diagnostico.setText({
                fieldId: 'custevent609',
                text: param_custevent609,
                ignoreFieldChange: true
              });
            }
            if (param_custevent610 != "") {
              var field_caseDX_custevent610 = obj_case_diagnostico.setText({
                fieldId: 'custevent610',
                text: param_custevent610,
                ignoreFieldChange: true
              });
            }
            if (param_custevent611 != "") {
              var field_caseDX_custevent611 = obj_case_diagnostico.setText({
                fieldId: 'custevent611',
                text: param_custevent611,
                ignoreFieldChange: true
              });
            }
            if (param_custevent612 != "") {
              var field_caseDX_custevent612 = obj_case_diagnostico.setText({
                fieldId: 'custevent612',
                text: param_custevent612,
                ignoreFieldChange: true
              });
            }
            if (param_custevent613 != "") {
              var field_caseDX_custevent613 = obj_case_diagnostico.setText({
                fieldId: 'custevent613',
                text: param_custevent613,
                ignoreFieldChange: true
              });
            }
            if (param_custevent614 != "") {
              var field_caseDX_custevent614 = obj_case_diagnostico.setText({
                fieldId: 'custevent614',
                text: param_custevent614,
                ignoreFieldChange: true
              });
            }
            if (param_custevent615 != "") {
              var field_caseDX_custevent615 = obj_case_diagnostico.setText({
                fieldId: 'custevent615',
                text: param_custevent615,
                ignoreFieldChange: true
              });
            }
            if (param_custevent616 != "") {
              var field_caseDX_custevent616 = obj_case_diagnostico.setText({
                fieldId: 'custevent616',
                text: param_custevent616,
                ignoreFieldChange: true
              });
            }
            if (param_custevent617 != "") {
              var field_caseDX_custevent617 = obj_case_diagnostico.setText({
                fieldId: 'custevent617',
                text: param_custevent617,
                ignoreFieldChange: true
              });
            }
            if (param_custevent618 != "") {
              var field_caseDX_custevent618 = obj_case_diagnostico.setText({
                fieldId: 'custevent618',
                text: param_custevent618,
                ignoreFieldChange: true
              });
            }
            if (param_custevent619 != "") {
              var field_caseDX_custevent619 = obj_case_diagnostico.setText({
                fieldId: 'custevent619',
                text: param_custevent619,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1190 != "") {
              var field_caseDX_custevent1190 = obj_case_diagnostico.setText({
                fieldId: 'custevent1190',
                text: param_custevent1190,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1191 != "") {
              var field_caseDX_custevent1191 = obj_case_diagnostico.setText({
                fieldId: 'custevent1191',
                text: param_custevent1191,
                ignoreFieldChange: true
              });
            }
            if (param_custevent625 != "") {
              var field_caseDX_custevent625 = obj_case_diagnostico.setText({
                fieldId: 'custevent625',
                text: param_custevent625,
                ignoreFieldChange: true
              });
            }
            if (param_custevent626 != "") {
              var field_caseDX_custevent626 = obj_case_diagnostico.setText({
                fieldId: 'custevent626',
                text: param_custevent626,
                ignoreFieldChange: true
              });
            }
            if (param_custevent627 != "") {
              var field_caseDX_custevent627 = obj_case_diagnostico.setText({
                fieldId: 'custevent627',
                text: param_custevent627,
                ignoreFieldChange: true
              });
            }
            if (param_custevent628 != "") {
              var field_caseDX_custevent628 = obj_case_diagnostico.setText({
                fieldId: 'custevent628',
                text: param_custevent628,
                ignoreFieldChange: true
              });
            }
            if (param_custevent629 != "") {
              var field_caseDX_custevent629 = obj_case_diagnostico.setText({
                fieldId: 'custevent629',
                text: param_custevent629,
                ignoreFieldChange: true
              });
            }
            if (param_custevent630 != "") {
              var field_caseDX_custevent630 = obj_case_diagnostico.setText({
                fieldId: 'custevent630',
                text: param_custevent630,
                ignoreFieldChange: true
              });
            }
            if (param_custevent631 != "") {
              var field_caseDX_custevent631 = obj_case_diagnostico.setText({
                fieldId: 'custevent631',
                text: param_custevent631,
                ignoreFieldChange: true
              });
            }
            if (param_custevent632 != "") {
              var field_caseDX_custevent632 = obj_case_diagnostico.setText({
                fieldId: 'custevent632',
                text: param_custevent632,
                ignoreFieldChange: true
              });
            }
            if (param_custevent633 != "") {
              var field_caseDX_custevent633 = obj_case_diagnostico.setText({
                fieldId: 'custevent633',
                text: param_custevent633,
                ignoreFieldChange: true
              });
            }
            if (param_custevent279 != "") {
              var field_caseDX_custevent279 = obj_case_diagnostico.setText({
                fieldId: 'custevent279',
                text: param_custevent279,
                ignoreFieldChange: true
              });
            }
            if (param_custevent281 != "") {
              var field_caseDX_custevent281 = obj_case_diagnostico.setText({
                fieldId: 'custevent281',
                text: param_custevent281,
                ignoreFieldChange: true
              });
            }
            if (param_custevent1196 != "") {
              var field_caseDX_custevent1196 = obj_case_diagnostico.setText({
                fieldId: 'custevent1196',
                text: param_custevent1196,
                ignoreFieldChange: true
              });
            }
            if (param_custevent489 != "") {
              var field_caseDX_custevent1196 = obj_case_diagnostico.setText({
                fieldId: 'custevent489',
                text: param_custevent489,
                ignoreFieldChange: true
              });
            }

            if (fechaDeNacimientoSeguimiento != "") {
              obj_case_diagnostico.setText({
                fieldId: "custevent331",
                text: fechaDeNacimientoSeguimiento,
                ignoreFieldChange: true
              });
            }


            if (generoSeguimiento != "") {
              obj_case_diagnostico.setText({
                fieldId: "custevent634",
                text: generoSeguimiento,
                ignoreFieldChange: true
              });
            }
            if (edoCivilSeguimiento != "") {
              obj_case_diagnostico.setText({
                fieldId: "custevent206",
                text: edoCivilSeguimiento,
                ignoreFieldChange: true
              });
            }




            var id_recordCreate_Diagnostic = obj_case_diagnostico.save({
              enableSourcing: true,
              ignoreMandatoryFields: true
            });

            var obj_case_diagnostico_LoadCreate = record.load({
              type: record.Type.SUPPORT_CASE,
              id: id_recordCreate_Diagnostic,
              isDynamic: true,
            });

            try {
              if (param_url_img_1 != "") {
                var objNew_img_1 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_1",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_1.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_1 = objNew_img_1.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent313',
                  value: idNew_img_1,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_2 != "") {
                var objNew_img_2 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_2",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_2.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_2 = objNew_img_2.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent314',
                  value: idNew_img_2,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_3 != "") {
                var objNew_img_3 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_3",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_3.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_3 = objNew_img_3.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent315',
                  value: idNew_img_3,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_4 != "") {
                var objNew_img_4 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_4",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_4.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_4 = objNew_img_4.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent316',
                  value: idNew_img_4,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_5 != "") {
                var objNew_img_5 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_5",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_5.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_5 = objNew_img_5.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent317',
                  value: idNew_img_5,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_6 != "") {
                var objNew_img_6 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_6",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_6.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_6 = objNew_img_6.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent318',
                  value: idNew_img_6,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_7 != "") {
                var objNew_img_7 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_7",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_7.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_7 = objNew_img_7.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent543',
                  value: idNew_img_7,
                  ignoreFieldChange: true
                });
              }

              if (param_url_img_8 != "") {
                var objNew_img_8 = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_image_8",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_8.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderImage
                });
                var idNew_img_8 = objNew_img_8.save();

                var field_caseDX_custevent1196 = obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent544',
                  value: idNew_img_8,
                  ignoreFieldChange: true
                });
              }

              if (param_url_custevent800 != "") {
                var objNew_paint_rostro = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_ImagenZonasRostroFull.png",
                  fileType: "PNGIMAGE",
                  contents: paint_url_rostro.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderPaints
                });
                var idNew_paint_rostro = objNew_paint_rostro.save();

                var obj_paint_rostro = file.load({
                  id: idNew_paint_rostro
                });

                var content_paint_rostro = obj_paint_rostro.getContents();
                var url_paint_rostro = obj_paint_rostro.url;

                obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent800',
                  value: url_paint_rostro,
                  ignoreFieldChange: true
                });

                obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent801',
                  value: "data:image/png;base64," + content_paint_rostro,
                  ignoreFieldChange: true
                });
              }

              if (param_url_custevent809 != "") {
                var objNew_paint_cuerpo = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_ImagenZonasCuerpoFull.png",
                  fileType: "PNGIMAGE",
                  contents: paint_url_cuerpo.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderPaints
                });
                var idNew_paint_cuerpo = objNew_paint_cuerpo.save();

                var obj_paint_cuerpo = file.load({
                  id: idNew_paint_cuerpo
                });

                var content_paint_cuerpo = obj_paint_cuerpo.getContents();
                var url_paint_cuerpo = obj_paint_cuerpo.url;

                obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent809',
                  value: url_paint_cuerpo,
                  ignoreFieldChange: true
                });

                obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent810',
                  value: "data:image/png;base64," + content_paint_cuerpo,
                  ignoreFieldChange: true
                });
              }

              if (param_url_custevent1206 != "") {
                var objNew_paint_pechos = file.create({
                  name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_ImagenZonasPechosFull.png",
                  fileType: "PNGIMAGE",
                  contents: paint_url_pechos.body,
                  encoding: file.Encoding.UTF8,
                  folder: folderPaints
                });
                var idNew_paint_pechos = objNew_paint_pechos.save();

                var obj_paint_pechos = file.load({
                  id: idNew_paint_pechos
                });

                var content_paint_pechos = obj_paint_pechos.getContents();
                var url_paint_pechos = obj_paint_pechos.url;

                obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent1206',
                  value: url_paint_pechos,
                  ignoreFieldChange: true
                });

                obj_case_diagnostico_LoadCreate.setValue({
                  fieldId: 'custevent1207',
                  value: "data:image/png;base64," + content_paint_pechos,
                  ignoreFieldChange: true
                });
              }

              if (param_url_firma != "") {
                var objNew_img_firma = file.create({
                  name: name_images + "_image_firma",
                  fileType: "PNGIMAGE",
                  contents: image_url_img_firmaDx.body,
                  encoding: file.Encoding.UTF8,
                  folder: -4
                });
                var idNew_img_firma = objNew_img_firma.save();
                var obj_img_firma = file.load({
                  id: idNew_img_firma
                });
                var content_img_firma = obj_img_firma.getContents();
                var url_img_firma = obj_img_firma.url;

                obj_case_diagnostico.setValue({
                  fieldId: 'custevent320',
                  value: url_img_firma,
                  ignoreFieldChange: true
                });

                obj_case_diagnostico.setValue({
                  fieldId: 'custevent325',
                  value: content_img_firma,
                  ignoreFieldChange: true
                });
              }

              id_recordCreate_Diagnostic = obj_case_diagnostico_LoadCreate.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
              });

            } catch (error) {
              log.error("imagen 1", error);
            }

            return {
              idCustomer: id_recordCreate_Diagnostic,
              success: "OK"
            }
          } catch (error) {
            return {
              "ERR_CREATE_HISTORY_DIAGNOSTIC": error //+ ' ' + arr_param_custevent1196
            }
          }
        }
      } else {
        try {
          var name_images = param_idCustomer + "_" + param_idCase;

          var obj_case_diagnostico = record.load({
            type: record.Type.SUPPORT_CASE,
            id: param_idCase,
            isDynamic: true,
          });
          if (param_startdate != "") {
            var field_caseDX_custevent581 = obj_case_diagnostico.setText({
              fieldId: 'startdate',
              text: param_startdate,
              ignoreFieldChange: true
            });
          }
          if (param_custevent581 != "") {
            var field_caseDX_custevent581 = obj_case_diagnostico.setText({
              fieldId: 'custevent581',
              text: param_custevent581,
              ignoreFieldChange: true
            });
          }
          if (param_custevent582 != "") {
            var field_caseDX_custevent582 = obj_case_diagnostico.setText({
              fieldId: 'custevent582',
              text: param_custevent582,
              ignoreFieldChange: true
            });
          }
          if (param_custevent583 != "") {
            var field_caseDX_custevent583 = obj_case_diagnostico.setText({
              fieldId: 'custevent583',
              text: param_custevent583,
              ignoreFieldChange: true
            });
          }
          if (param_custevent584 != "") {
            var field_caseDX_custevent584 = obj_case_diagnostico.setText({
              fieldId: 'custevent584',
              text: param_custevent584,
              ignoreFieldChange: true
            });
          }
          if (param_custevent585 != "") {
            var field_caseDX_custevent585 = obj_case_diagnostico.setText({
              fieldId: 'custevent585',
              text: param_custevent585,
              ignoreFieldChange: true
            });
          }
          if (param_custevent586 != "") {
            var field_caseDX_custevent586 = obj_case_diagnostico.setText({
              fieldId: 'custevent586',
              text: param_custevent586,
              ignoreFieldChange: true
            });
          }
          if (param_custevent587 != "") {
            var field_caseDX_custevent587 = obj_case_diagnostico.setText({
              fieldId: 'custevent587',
              text: param_custevent587,
              ignoreFieldChange: true
            });
          }
          if (param_custevent588 != "") {
            var field_caseDX_custevent588 = obj_case_diagnostico.setText({
              fieldId: 'custevent588',
              text: param_custevent588,
              ignoreFieldChange: true
            });
          }
          if (param_custevent589 != "") {
            var field_caseDX_custevent589 = obj_case_diagnostico.setText({
              fieldId: 'custevent589',
              text: param_custevent589,
              ignoreFieldChange: true
            });
          }
          if (param_custevent590 != "") {
            var field_caseDX_custevent590 = obj_case_diagnostico.setText({
              fieldId: 'custevent590',
              text: param_custevent590,
              ignoreFieldChange: true
            });
          }
          if (param_custevent591 != "") {
            var field_caseDX_custevent591 = obj_case_diagnostico.setText({
              fieldId: 'custevent591',
              text: param_custevent591,
              ignoreFieldChange: true
            });
          }
          if (param_custevent592 != "") {
            var field_caseDX_custevent592 = obj_case_diagnostico.setText({
              fieldId: 'custevent592',
              text: param_custevent592,
              ignoreFieldChange: true
            });
          }
          if (param_custevent593 != "") {
            var field_caseDX_custevent593 = obj_case_diagnostico.setText({
              fieldId: 'custevent593',
              text: param_custevent593,
              ignoreFieldChange: true
            });
          }
          if (param_custevent594 != "") {
            var field_caseDX_custevent594 = obj_case_diagnostico.setText({
              fieldId: 'custevent594',
              text: param_custevent594,
              ignoreFieldChange: true
            });
          }
          if (param_custevent595 != "") {
            var field_caseDX_custevent595 = obj_case_diagnostico.setText({
              fieldId: 'custevent595',
              text: param_custevent595,
              ignoreFieldChange: true
            });
          }
          if (param_custevent596 != "") {
            var field_caseDX_custevent596 = obj_case_diagnostico.setText({
              fieldId: 'custevent596',
              text: param_custevent596,
              ignoreFieldChange: true
            });
          }
          if (param_custevent597 != "") {
            var field_caseDX_custevent597 = obj_case_diagnostico.setText({
              fieldId: 'custevent597',
              text: param_custevent597,
              ignoreFieldChange: true
            });
          }
          if (param_custevent598 != "") {
            var field_caseDX_custevent598 = obj_case_diagnostico.setText({
              fieldId: 'custevent598',
              text: param_custevent598,
              ignoreFieldChange: true
            });
          }
          if (param_custevent599 != "") {
            var field_caseDX_custevent599 = obj_case_diagnostico.setText({
              fieldId: 'custevent599',
              text: param_custevent599,
              ignoreFieldChange: true
            });
          }
          if (param_custevent600 != "") {
            var field_caseDX_custevent600 = obj_case_diagnostico.setText({
              fieldId: 'custevent600',
              text: param_custevent600,
              ignoreFieldChange: true
            });
          }
          if (param_custevent601 != "") {
            var field_caseDX_custevent601 = obj_case_diagnostico.setText({
              fieldId: 'custevent601',
              text: param_custevent601,
              ignoreFieldChange: true
            });
          }
          if (param_custevent602 != "") {
            var field_caseDX_custevent602 = obj_case_diagnostico.setText({
              fieldId: 'custevent602',
              text: param_custevent602,
              ignoreFieldChange: true
            });
          }
          if (param_custevent603 != "") {
            var field_caseDX_custevent603 = obj_case_diagnostico.setText({
              fieldId: 'custevent603',
              text: param_custevent603,
              ignoreFieldChange: true
            });
          }
          if (param_custevent604 != "") {
            var field_caseDX_custevent604 = obj_case_diagnostico.setText({
              fieldId: 'custevent604',
              text: param_custevent604,
              ignoreFieldChange: true
            });
          }
          if (param_custevent605 != "") {
            var field_caseDX_custevent605 = obj_case_diagnostico.setText({
              fieldId: 'custevent605',
              text: param_custevent605,
              ignoreFieldChange: true
            });
          }
          if (param_custevent606 != "") {
            var field_caseDX_custevent606 = obj_case_diagnostico.setText({
              fieldId: 'custevent606',
              text: param_custevent606,
              ignoreFieldChange: true
            });
          }
          if (param_custevent607 != "") {
            var field_caseDX_custevent607 = obj_case_diagnostico.setText({
              fieldId: 'custevent607',
              text: param_custevent607,
              ignoreFieldChange: true
            });
          }
          if (param_custevent608 != "") {
            var field_caseDX_custevent608 = obj_case_diagnostico.setText({
              fieldId: 'custevent608',
              text: param_custevent608,
              ignoreFieldChange: true
            });
          }
          if (param_custevent609 != "") {
            var field_caseDX_custevent609 = obj_case_diagnostico.setText({
              fieldId: 'custevent609',
              text: param_custevent609,
              ignoreFieldChange: true
            });
          }
          if (param_custevent610 != "") {
            var field_caseDX_custevent610 = obj_case_diagnostico.setText({
              fieldId: 'custevent610',
              text: param_custevent610,
              ignoreFieldChange: true
            });
          }
          if (param_custevent611 != "") {
            var field_caseDX_custevent611 = obj_case_diagnostico.setText({
              fieldId: 'custevent611',
              text: param_custevent611,
              ignoreFieldChange: true
            });
          }
          if (param_custevent612 != "") {
            var field_caseDX_custevent612 = obj_case_diagnostico.setText({
              fieldId: 'custevent612',
              text: param_custevent612,
              ignoreFieldChange: true
            });
          }
          if (param_custevent613 != "") {
            var field_caseDX_custevent613 = obj_case_diagnostico.setText({
              fieldId: 'custevent613',
              text: param_custevent613,
              ignoreFieldChange: true
            });
          }
          if (param_custevent614 != "") {
            var field_caseDX_custevent614 = obj_case_diagnostico.setText({
              fieldId: 'custevent614',
              text: param_custevent614,
              ignoreFieldChange: true
            });
          }
          if (param_custevent615 != "") {
            var field_caseDX_custevent615 = obj_case_diagnostico.setText({
              fieldId: 'custevent615',
              text: param_custevent615,
              ignoreFieldChange: true
            });
          }
          if (param_custevent616 != "") {
            var field_caseDX_custevent616 = obj_case_diagnostico.setText({
              fieldId: 'custevent616',
              text: param_custevent616,
              ignoreFieldChange: true
            });
          }
          if (param_custevent617 != "") {
            var field_caseDX_custevent617 = obj_case_diagnostico.setText({
              fieldId: 'custevent617',
              text: param_custevent617,
              ignoreFieldChange: true
            });
          }
          if (param_custevent618 != "") {
            var field_caseDX_custevent618 = obj_case_diagnostico.setText({
              fieldId: 'custevent618',
              text: param_custevent618,
              ignoreFieldChange: true
            });
          }
          if (param_custevent619 != "") {
            var field_caseDX_custevent619 = obj_case_diagnostico.setText({
              fieldId: 'custevent619',
              text: param_custevent619,
              ignoreFieldChange: true
            });
          }
          if (param_custevent1190 != "") {
            var field_caseDX_custevent1190 = obj_case_diagnostico.setText({
              fieldId: 'custevent1190',
              text: param_custevent1190,
              ignoreFieldChange: true
            });
          }
          if (param_custevent1191 != "") {
            var field_caseDX_custevent1191 = obj_case_diagnostico.setText({
              fieldId: 'custevent1191',
              text: param_custevent1191,
              ignoreFieldChange: true
            });
          }
          if (param_custevent625 != "") {
            var field_caseDX_custevent625 = obj_case_diagnostico.setText({
              fieldId: 'custevent625',
              text: param_custevent625,
              ignoreFieldChange: true
            });
          }
          if (param_custevent626 != "") {
            var field_caseDX_custevent626 = obj_case_diagnostico.setText({
              fieldId: 'custevent626',
              text: param_custevent626,
              ignoreFieldChange: true
            });
          }
          if (param_custevent627 != "") {
            var field_caseDX_custevent627 = obj_case_diagnostico.setText({
              fieldId: 'custevent627',
              text: param_custevent627,
              ignoreFieldChange: true
            });
          }
          if (param_custevent628 != "") {
            var field_caseDX_custevent628 = obj_case_diagnostico.setText({
              fieldId: 'custevent628',
              text: param_custevent628,
              ignoreFieldChange: true
            });
          }
          if (param_custevent629 != "") {
            var field_caseDX_custevent629 = obj_case_diagnostico.setText({
              fieldId: 'custevent629',
              text: param_custevent629,
              ignoreFieldChange: true
            });
          }
          if (param_custevent630 != "") {
            var field_caseDX_custevent630 = obj_case_diagnostico.setText({
              fieldId: 'custevent630',
              text: param_custevent630,
              ignoreFieldChange: true
            });
          }
          if (param_custevent631 != "") {
            var field_caseDX_custevent631 = obj_case_diagnostico.setText({
              fieldId: 'custevent631',
              text: param_custevent631,
              ignoreFieldChange: true
            });
          }
          if (param_custevent632 != "") {
            var field_caseDX_custevent632 = obj_case_diagnostico.setText({
              fieldId: 'custevent632',
              text: param_custevent632,
              ignoreFieldChange: true
            });
          }
          if (param_custevent633 != "") {
            var field_caseDX_custevent633 = obj_case_diagnostico.setText({
              fieldId: 'custevent633',
              text: param_custevent633,
              ignoreFieldChange: true
            });
          }
          if (param_custevent279 != "") {
            var field_caseDX_custevent279 = obj_case_diagnostico.setText({
              fieldId: 'custevent279',
              text: param_custevent279,
              ignoreFieldChange: true
            });
          }
          if (param_custevent281 != "") {
            var field_caseDX_custevent281 = obj_case_diagnostico.setText({
              fieldId: 'custevent281',
              text: param_custevent281,
              ignoreFieldChange: true
            });
          }
          if (param_custevent1196 != "") {
            var field_caseDX_custevent1196 = obj_case_diagnostico.setText({
              fieldId: 'custevent1196',
              text: param_custevent1196,
              ignoreFieldChange: true
            });
          }
          if (param_custevent489 != "") {
            var field_caseDX_custevent1196 = obj_case_diagnostico.setText({
              fieldId: 'custevent489',
              text: param_custevent489,
              ignoreFieldChange: true
            });
          }

          try {
            if (param_url_img_1 != "") {
              var objNew_img_1 = file.create({
                name: name_images + "_image_1",
                fileType: "PNGIMAGE",
                contents: image_url_img_1.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_1 = objNew_img_1.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent313',
                value: idNew_img_1,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_2 != "") {
              var objNew_img_2 = file.create({
                name: name_images + "_image_2",
                fileType: "PNGIMAGE",
                contents: image_url_img_2.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_2 = objNew_img_2.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent314',
                value: idNew_img_2,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_3 != "") {
              var objNew_img_3 = file.create({
                name: name_images + "_image_3",
                fileType: "PNGIMAGE",
                contents: image_url_img_3.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_3 = objNew_img_3.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent315',
                value: idNew_img_3,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_4 != "") {
              var objNew_img_4 = file.create({
                name: name_images + "_image_4",
                fileType: "PNGIMAGE",
                contents: image_url_img_4.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_4 = objNew_img_4.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent316',
                value: idNew_img_4,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_5 != "") {
              var objNew_img_5 = file.create({
                name: name_images + "_image_5",
                fileType: "PNGIMAGE",
                contents: image_url_img_5.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_5 = objNew_img_5.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent317',
                value: idNew_img_5,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_6 != "") {
              var objNew_img_6 = file.create({
                name: name_images + "_image_6",
                fileType: "PNGIMAGE",
                contents: image_url_img_6.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_6 = objNew_img_6.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent318',
                value: idNew_img_6,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_7 != "") {
              var objNew_img_7 = file.create({
                name: name_images + "_image_7",
                fileType: "PNGIMAGE",
                contents: image_url_img_7.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_7 = objNew_img_7.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent543',
                value: idNew_img_7,
                ignoreFieldChange: true
              });
            }

            if (param_url_img_8 != "") {
              var objNew_img_8 = file.create({
                name: name_images + "_image_8",
                fileType: "PNGIMAGE",
                contents: image_url_img_8.body,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              var idNew_img_8 = objNew_img_8.save();

              var field_caseDX_custevent1196 = obj_case_diagnostico.setValue({
                fieldId: 'custevent544',
                value: idNew_img_8,
                ignoreFieldChange: true
              });
            }

            if (param_url_custevent800 != "") {
              var objNew_paint_rostro = file.create({
                name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_ImagenZonasRostroFull.png",
                fileType: "PNGIMAGE",
                contents: paint_url_rostro.body,
                encoding: file.Encoding.UTF8,
                folder: folderPaints
              });
              var idNew_paint_rostro = objNew_paint_rostro.save();
              var obj_paint_rostro = file.load({
                id: idNew_paint_rostro
              });
              var content_paint_rostro = obj_paint_rostro.getContents();
              var url_paint_rostro = obj_paint_rostro.url;

              obj_case_diagnostico.setValue({
                fieldId: 'custevent800',
                value: url_paint_rostro,
                ignoreFieldChange: true
              });

              obj_case_diagnostico.setValue({
                fieldId: 'custevent801',
                value: "data:image/png;base64," + content_paint_rostro,
                ignoreFieldChange: true
              });
            }

            if (param_url_custevent809 != "") {
              var objNew_paint_cuerpo = file.create({
                name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_ImagenZonasCuerpoFull.png",
                fileType: "PNGIMAGE",
                contents: paint_url_cuerpo.body,
                encoding: file.Encoding.UTF8,
                folder: folderPaints
              });
              var idNew_paint_cuerpo = objNew_paint_cuerpo.save();
              var obj_paint_cuerpo = file.load({
                id: idNew_paint_cuerpo
              });
              var content_paint_cuerpo = obj_paint_cuerpo.getContents();
              var url_paint_cuerpo = obj_paint_cuerpo.url;

              obj_case_diagnostico.setValue({
                fieldId: 'custevent809',
                value: url_paint_cuerpo,
                ignoreFieldChange: true
              });

              obj_case_diagnostico.setValue({
                fieldId: 'custevent810',
                value: "data:image/png;base64," + content_paint_cuerpo,
                ignoreFieldChange: true
              });
            }

            if (param_url_custevent1206 != "") {
              var objNew_paint_pechos = file.create({
                name: param_idCustomer + "_" + id_recordCreate_Diagnostic + "_ImagenZonasPechosFull.png",
                fileType: "PNGIMAGE",
                contents: paint_url_pechos.body,
                encoding: file.Encoding.UTF8,
                folder: folderPaints
              });
              var idNew_paint_pechos = objNew_paint_pechos.save();

              var obj_paint_pechos = file.load({
                id: idNew_paint_pechos
              });

              var content_paint_pechos = obj_paint_pechos.getContents();
              var url_paint_pechos = obj_paint_pechos.url;

              obj_case_diagnostico.setValue({
                fieldId: 'custevent1206',
                value: url_paint_pechos,
                ignoreFieldChange: true
              });

              obj_case_diagnostico.setValue({
                fieldId: 'custevent1207',
                value: "data:image/png;base64," + content_paint_pechos,
                ignoreFieldChange: true
              });
            }

            if (param_url_firma != "") {
              var objNew_img_firma = file.create({
                name: name_images + "_image_firma",
                fileType: "PNGIMAGE",
                contents: image_url_img_firmaDx.body,
                encoding: file.Encoding.UTF8,
                folder: -4
              });
              var idNew_img_firma = objNew_img_firma.save();
              var obj_img_firma = file.load({
                id: idNew_img_firma
              });
              var content_img_firma = obj_img_firma.getContents();
              var url_img_firma = obj_img_firma.url;

              obj_case_diagnostico.setValue({
                fieldId: 'custevent320',
                value: url_img_firma,
                ignoreFieldChange: true
              });

              obj_case_diagnostico.setValue({
                fieldId: 'custevent325',
                value: content_img_firma,
                ignoreFieldChange: true
              });
            }

            if (fechaDeNacimientoSeguimiento != "") {
              obj_case_diagnostico.setText({
                fieldId: "custevent331",
                text: fechaDeNacimientoSeguimiento,
                ignoreFieldChange: true
              });
            }


            if (generoSeguimiento != "") {
              obj_case_diagnostico.setText({
                fieldId: "custevent634",
                text: generoSeguimiento,
                ignoreFieldChange: true
              });
            }
            if (edoCivilSeguimiento != "") {
              obj_case_diagnostico.setText({
                fieldId: "custevent206",
                text: edoCivilSeguimiento,
                ignoreFieldChange: true
              });
            }

          } catch (error) {
            log.error("imagen 1", error);
          }

          var id_recordUpdate_Diagnostic = obj_case_diagnostico.save({
            enableSourcing: true,
            ignoreMandatoryFields: true
          });

          return {
            idCustomer: id_recordUpdate_Diagnostic,
            success: "OK"
          }
        } catch (error) {
          return {
            "ERR_UPDATE_DIAGNOSTIC": error
          }
        }
      }
      log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());


      function calcYearInt(fechaAntigua, fechaReciente) {
        var edad = 0;
        var separador = '';
        var fR = fechaReciente.length;
        var fA = fechaAntigua.length;

        //extraer dia, mes y año del caso analizado
        separador = fechaReciente.search('/');
        var diaCaso = fechaReciente.substring(0, separador);
        fechaReciente = fechaReciente.substring(separador + 1, fR);
        fR = fechaReciente.length;
        separador = fechaReciente.search('/');
        var mesCaso = fechaReciente.substring(0, separador);
        fechaReciente = fechaReciente.substring(separador + 1, fR);
        var anioCaso = fechaReciente.substring(0, 4);

        //extraer dia, mes y año de la fecha de nacimiento del paciente
        separador = fechaAntigua.search('/');
        var diaNac = fechaAntigua.substring(0, separador);
        fechaAntigua = fechaAntigua.substring(separador + 1, fA);
        fA = fechaAntigua.length;
        separador = fechaAntigua.search('/');
        var mesNac = fechaAntigua.substring(0, separador);
        fechaAntigua = fechaAntigua.substring(separador + 1, fA);
        var anioNac = fechaAntigua.substring(0, 4);

        //calculo de las variables para obtener los días transcurridos entre ambas fechas
        var calcAnio = (parseInt(anioCaso) - parseInt(anioNac)) * 365.25;
        var calcMes = (parseInt(mesCaso) - parseInt(mesNac)) * 30;
        var calcDia = (parseInt(diaCaso) - parseInt(diaNac)) * 1;
        var calcEdad = (calcAnio + calcMes + calcDia) / 365.25;

        //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
        //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
        edad = Math.floor(calcEdad);

        edad = (isNaN(edad) == true) ? "" : edad;

        return edad;
      }
    }

    return {
      get: doGet,
      post: doPost
    };

  });