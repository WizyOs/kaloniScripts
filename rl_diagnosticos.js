/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    var scriptObj = runtime.getCurrentScript();

    var objJson;
    if (typeof params === "object") {
      objJson = params;
    } else {
      objJson = JSON.parse(params);
    }
    log.debug("params", objJson);
    
    var param_idDiagnostic = objJson.idCase;
    
    //Busqueda de id de caso por id de cliente y filtrado por historia clinica
    var searchCreate_DiagnosticCase = search.create({
      type: search.Type.SUPPORT_CASE,
      columns: [{
          name: "internalid"
        },
        {
          name: "date"
        }
      ],
      filters: [{
        name: "internalid",
        operator: "is",
        values: param_idDiagnostic
      }]
    });

    var searchPreview_DiagnosticCase = searchCreate_DiagnosticCase.run().each(function (result) {
      idDiagnostic = result.getValue({
        name: 'internalid'
      });
      dateDiagnostic = result.getValue({
        name: 'date'
      })
    });


    // VARIABLES GLOBALES
    var file_content_image_1 = "";
    var file_content_image_2 = "";
    var file_content_image_3 = "";
    var file_content_image_4 = "";
    var file_content_image_5 = "";
    var file_content_image_6 = "";
    var file_content_image_7 = "";
    var file_content_image_8 = "";
    var file_content_rostro = "";
    var file_content_cuerpo = "";
    var file_content_pechos = "";
    var file_content_firma = "";


    //DATOS DIAGNOSTICOS
    var response_cases = [];

    var obj_case_diagnostic = record.load({
      type: "supportcase",
      id: idDiagnostic
    });

    var field_case_diagnostic_casenumber = obj_case_diagnostic.getText({
      fieldId: "casenumber"
    });
    var field_case_diagnostic_customform = obj_case_diagnostic.getValue({
      fieldId: "customform"
    });

    if (field_case_diagnostic_customform === "135") {
      //DIAGNOSTICO CAPILAR
      var field_case_diagnostic_customform_Text = obj_case_diagnostic.getText({
        fieldId: "customform"
      });
      var field_case_diagnostic_custevent309 = obj_case_diagnostic.getText({
        fieldId: "custevent309"
      });
      var field_case_diagnostic_custevent311 = obj_case_diagnostic.getText({
        fieldId: "custevent311"
      });
      var field_case_diagnostic_custevent310 = obj_case_diagnostic.getText({
        fieldId: "custevent310"
      });
      var field_case_diagnostic_custevent294 = obj_case_diagnostic.getText({
        fieldId: "custevent294"
      });
      var field_case_diagnostic_custevent303 = obj_case_diagnostic.getText({
        fieldId: "custevent303"
      });
      var field_case_diagnostic_custevent302 = obj_case_diagnostic.getText({
        fieldId: "custevent302"
      });
      var field_case_diagnostic_custevent301 = obj_case_diagnostic.getText({
        fieldId: "custevent301"
      });
      var field_case_diagnostic_custevent300 = obj_case_diagnostic.getText({
        fieldId: "custevent300"
      });
      var field_case_diagnostic_custevent299 = obj_case_diagnostic.getText({
        fieldId: "custevent299"
      });
      var field_case_diagnostic_custevent298 = obj_case_diagnostic.getText({
        fieldId: "custevent298"
      });
      var field_case_diagnostic_custevent297 = obj_case_diagnostic.getText({
        fieldId: "custevent297"
      });
      var field_case_diagnostic_custevent296 = obj_case_diagnostic.getText({
        fieldId: "custevent296"
      });
      var field_case_diagnostic_custevent620 = obj_case_diagnostic.getText({
        fieldId: "custevent620"
      });
      var field_case_diagnostic_custevent621 = obj_case_diagnostic.getText({
        fieldId: "custevent621"
      });
      var field_case_diagnostic_custevent622 = obj_case_diagnostic.getText({
        fieldId: "custevent622"
      });
      var field_case_diagnostic_custevent623 = obj_case_diagnostic.getText({
        fieldId: "custevent623"
      });
      var field_case_diagnostic_custevent624 = obj_case_diagnostic.getText({
        fieldId: "custevent624"
      });
      var field_case_diagnostic_custevent304 = obj_case_diagnostic.getText({
        fieldId: "custevent304"
      });
      var field_case_diagnostic_custevent305 = obj_case_diagnostic.getText({
        fieldId: "custevent305"
      });
      var field_case_diagnostic_custevent306 = obj_case_diagnostic.getText({
        fieldId: "custevent306"
      });
      var field_case_diagnostic_custevent307 = obj_case_diagnostic.getText({
        fieldId: "custevent307"
      });
      var field_case_diagnostic_custevent308 = obj_case_diagnostic.getText({
        fieldId: "custevent308"
      });
      var field_case_diagnostic_custevent313 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent313"
        }) || null;
      if (field_case_diagnostic_custevent313 != null) {
        var fileObj_image_1 = file.load({
          id: field_case_diagnostic_custevent313
        });
        file_content_image_1 = fileObj_image_1.getContents();
      } else {
        file_content_image_1 = "";
      }
      var field_case_diagnostic_custevent314 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent314"
        }) || null;
      if (field_case_diagnostic_custevent314 != null) {
        var fileObj_image_2 = file.load({
          id: field_case_diagnostic_custevent314
        });
        file_content_image_2 = fileObj_image_2.getContents();
      } else {
        file_content_image_2 = "";
      }
      var field_case_diagnostic_custevent315 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent315"
        }) || null;
      if (field_case_diagnostic_custevent315 != null) {
        var fileObj_image_3 = file.load({
          id: field_case_diagnostic_custevent315
        });
        file_content_image_3 = fileObj_image_3.getContents();
      } else {
        file_content_image_3 = "";
      }
      var field_case_diagnostic_custevent316 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent316"
        }) || null;
      if (field_case_diagnostic_custevent316 != null) {
        var fileObj_image_4 = file.load({
          id: field_case_diagnostic_custevent316
        });
        file_content_image_4 = fileObj_image_4.getContents();
      } else {
        file_content_image_4 = null;
      }
      var field_case_diagnostic_custevent317 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent317"
        }) || null;
      if (field_case_diagnostic_custevent317 != null) {
        var fileObj_image_5 = file.load({
          id: field_case_diagnostic_custevent317
        });
        file_content_image_5 = fileObj_image_5.getContents();
      } else {
        file_content_image_5 = null;
      }
      var field_case_diagnostic_custevent318 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent318"
        }) || null;
      if (field_case_diagnostic_custevent318 != null) {
        var fileObj_image_6 = file.load({
          id: field_case_diagnostic_custevent318
        });
        file_content_image_6 = fileObj_image_6.getContents();
      } else {
        file_content_image_6 = null;
      }
      var field_case_diagnostic_custevent333 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent333"
        }) || null;
      if (field_case_diagnostic_custevent333 != null) {
        var fileObj_image_7 = file.load({
          id: field_case_diagnostic_custevent333
        });
        file_content_image_7 = fileObj_image_7.getContents();
      } else {
        file_content_image_7 = null;
      }
      var field_case_diagnostic_custevent334 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent334"
        }) || null;
      if (field_case_diagnostic_custevent334 != null) {
        var fileObj_image_8 = file.load({
          id: field_case_diagnostic_custevent334
        });
        file_content_image_8 = fileObj_image_8.getContents();
      } else {
        file_content_image_8 = null;
      }
      var field_case_diagnostic_custevent335 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent335"
        }) || null;
      if (field_case_diagnostic_custevent335 != null) {
        var fileObj_image_9 = file.load({
          id: field_case_diagnostic_custevent335
        });
        file_content_image_9 = fileObj_image_9.getContents();
      } else {
        file_content_image_9 = null;
      }
      var field_case_diagnostic_custevent336 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent336"
        }) || null;
      if (field_case_diagnostic_custevent336 != null) {
        var fileObj_image_10 = file.load({
          id: field_case_diagnostic_custevent336
        });
        file_content_image_10 = fileObj_image_10.getContents();
      } else {
        file_content_image_10 = null;
      }
      var field_case_diagnostic_custevent511 =
        obj_case_diagnostic.getText({
          fieldId: "custevent511"
        }) || null;
      var field_case_diagnostic_custevent801 =
        obj_case_diagnostic.getText({
          fieldId: "custevent801"
        }) || null;

      field_case_diagnostic_custevent511 = "";
      field_case_diagnostic_custevent801 = "";

      var field_case_diagnostic_startdate = obj_case_diagnostic.getText({
        fieldId: "startdate"
      });
      var field_case_diagnostic_custevent277 = obj_case_diagnostic.getText({
        fieldId: "custevent277"
      });
      var field_case_diagnostic_custevent278 = obj_case_diagnostic.getText({
        fieldId: "custevent278"
      });
      var field_case_diagnostic_custevent279 = obj_case_diagnostic.getText({
        fieldId: "custevent279"
      });
      var field_case_diagnostic_custevent281 = obj_case_diagnostic.getText({
        fieldId: "custevent281"
      });
      var field_case_diagnostic_custevent280 = obj_case_diagnostic.getText({
        fieldId: "custevent280"
      });
      var field_case_diagnostic_custevent320 = obj_case_diagnostic.getText({
        fieldId: "custevent320"
      });

      response_cases.push({
        "typeDiagnostic": "capilar",
        "internalid": idDiagnostic,
        "dateDiagnostic": dateDiagnostic,
        "casenumber": field_case_diagnostic_casenumber,
        "customform": field_case_diagnostic_customform_Text,
        "values": [{
          "custevent309": field_case_diagnostic_custevent309,
          "custevent311": field_case_diagnostic_custevent311,
          "custevent310": field_case_diagnostic_custevent310,
          "custevent294": field_case_diagnostic_custevent294,
          "custevent303": field_case_diagnostic_custevent303,
          "custevent302": field_case_diagnostic_custevent302,
          "custevent301": field_case_diagnostic_custevent301,
          "custevent300": field_case_diagnostic_custevent300,
          "custevent299": field_case_diagnostic_custevent299,
          "custevent298": field_case_diagnostic_custevent298,
          "custevent297": field_case_diagnostic_custevent297,
          "custevent296": field_case_diagnostic_custevent296,
          "custevent620": field_case_diagnostic_custevent620,
          "custevent621": field_case_diagnostic_custevent621,
          "custevent622": field_case_diagnostic_custevent622,
          "custevent623": field_case_diagnostic_custevent623,
          "custevent624": field_case_diagnostic_custevent624,
          "custevent304": field_case_diagnostic_custevent304,
          "custevent305": field_case_diagnostic_custevent305,
          "custevent306": field_case_diagnostic_custevent306,
          "custevent307": field_case_diagnostic_custevent307,
          "custevent308": field_case_diagnostic_custevent308,
          "custevent313": file_content_image_1,
          "custevent314": file_content_image_2,
          "custevent315": file_content_image_3,
          "custevent316": file_content_image_4,
          "custevent317": file_content_image_5,
          "custevent318": file_content_image_6,
          "custevent333": file_content_image_7,
          "custevent334": file_content_image_8,
          "custevent335": file_content_image_9,
          "custevent336": file_content_image_10,
          "custevent511": field_case_diagnostic_custevent511,
          "custevent801": field_case_diagnostic_custevent801,
          "startdate": field_case_diagnostic_startdate,
          "custevent277": field_case_diagnostic_custevent277,
          "custevent278": field_case_diagnostic_custevent278,
          "custevent279": field_case_diagnostic_custevent279,
          "custevent281": field_case_diagnostic_custevent281,
          "custevent280": field_case_diagnostic_custevent280,
          "custevent320": field_case_diagnostic_custevent320
        }]
      });
    } else if (field_case_diagnostic_customform === "138") {
      //DIAGNOSTICO ALBYA
      var field_case_diagnostic_customform_Text = obj_case_diagnostic.getText({
        fieldId: "customform"
      });
      var field_case_diagnostic_custevent279 = obj_case_diagnostic.getText({
        fieldId: "custevent279"
      });
      var field_case_diagnostic_custevent281 = obj_case_diagnostic.getText({
        fieldId: "custevent281"
      });
      var field_case_diagnostic_custevent1196 = obj_case_diagnostic.getText({
        fieldId: "custevent1196"
      });
      var field_case_diagnostic_custevent313 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent313"
        }) || null;
      if (field_case_diagnostic_custevent313 != null) {
        var fileObj_image_1 = file.load({
          id: field_case_diagnostic_custevent313
        });
        file_content_image_1 = fileObj_image_1.getContents();
      } else {
        file_content_image_1 = "";
      }
      var field_case_diagnostic_custevent314 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent314"
        }) || null;
      if (field_case_diagnostic_custevent314 != null) {
        var fileObj_image_2 = file.load({
          id: field_case_diagnostic_custevent314
        });
        file_content_image_2 = fileObj_image_2.getContents();
      } else {
        file_content_image_2 = "";
      }
      var field_case_diagnostic_custevent315 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent315"
        }) || null;
      if (field_case_diagnostic_custevent315 != null) {
        var fileObj_image_3 = file.load({
          id: field_case_diagnostic_custevent315
        });
        file_content_image_3 = fileObj_image_3.getContents();
      } else {
        file_content_image_3 = "";
      }
      var field_case_diagnostic_custevent316 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent316"
        }) || null;
      if (field_case_diagnostic_custevent316 != null) {
        var fileObj_image_4 = file.load({
          id: field_case_diagnostic_custevent316
        });
        file_content_image_4 = fileObj_image_4.getContents();
      } else {
        file_content_image_4 = null;
      }
      var field_case_diagnostic_custevent317 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent317"
        }) || null;
      if (field_case_diagnostic_custevent317 != null) {
        var fileObj_image_5 = file.load({
          id: field_case_diagnostic_custevent317
        });
        file_content_image_5 = fileObj_image_5.getContents();
      } else {
        file_content_image_5 = null;
      }
      var field_case_diagnostic_custevent318 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent318"
        }) || null;
      if (field_case_diagnostic_custevent318 != null) {
        var fileObj_image_6 = file.load({
          id: field_case_diagnostic_custevent318
        });
        file_content_image_6 = fileObj_image_6.getContents();
      } else {
        file_content_image_6 = null;
      }
      var field_case_diagnostic_custevent543 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent543"
        }) || null;
      if (field_case_diagnostic_custevent543 != null) {
        var fileObj_image_7 = file.load({
          id: field_case_diagnostic_custevent543
        });
        file_content_image_7 = fileObj_image_7.getContents();
      } else {
        file_content_image_7 = null;
      }
      var field_case_diagnostic_custevent544 =
        obj_case_diagnostic.getValue({
          fieldId: "custevent544"
        }) || null;
      if (field_case_diagnostic_custevent544 != null) {
        var fileObj_image_8 = file.load({
          id: field_case_diagnostic_custevent544
        });
        file_content_image_8 = fileObj_image_8.getContents();
      } else {
        file_content_image_8 = null;
      }
      var field_case_diagnostic_custevent320 = obj_case_diagnostic.getValue({
        fieldId: "custevent320"
      }) || null;
      if (field_case_diagnostic_custevent320 != null) {
        var cadena1 = field_case_diagnostic_custevent320.substr(0, field_case_diagnostic_custevent320.indexOf("&c"));
        var idFirma = cadena1.substr((cadena1.indexOf("=")) + 1, cadena1.length);
        log.debug("id", idFirma);
        var fileObj_image_firma = file.load({
          id: idFirma
        });
        file_content_firma = fileObj_image_firma.getContents();
      } else {
        file_content_firma = null;
      }

      var field_case_diagnostic_custevent801 = obj_case_diagnostic.getText({
        fieldId: "custevent801"
      }) || null;
      if (field_case_diagnostic_custevent801 != null) {
        file_content_rostro = field_case_diagnostic_custevent801;
      }
      var field_case_diagnostic_custevent810 = obj_case_diagnostic.getText({
        fieldId: "custevent810"
      }) || null;
      if (field_case_diagnostic_custevent810 != null) {
        file_content_cuerpo = field_case_diagnostic_custevent810;
      }
      var field_case_diagnostic_custevent1207 = obj_case_diagnostic.getText({
        fieldId: "custevent1207"
      }) || null;
      if (field_case_diagnostic_custevent1207 != null) {
        file_content_pechos = field_case_diagnostic_custevent1207;
      }

      var field_case_diagnostic_custevent581 = obj_case_diagnostic.getText({
        fieldId: "custevent581"
      });
      var field_case_diagnostic_custevent582 = obj_case_diagnostic.getText({
        fieldId: "custevent582"
      });
      var field_case_diagnostic_custevent583 = obj_case_diagnostic.getText({
        fieldId: "custevent583"
      });
      var field_case_diagnostic_custevent584 = obj_case_diagnostic.getText({
        fieldId: "custevent584"
      });
      var field_case_diagnostic_custevent585 = obj_case_diagnostic.getText({
        fieldId: "custevent585"
      });
      var field_case_diagnostic_custevent586 = obj_case_diagnostic.getText({
        fieldId: "custevent586"
      });
      var field_case_diagnostic_custevent587 = obj_case_diagnostic.getText({
        fieldId: "custevent587"
      });
      var field_case_diagnostic_custevent588 = obj_case_diagnostic.getText({
        fieldId: "custevent588"
      });
      var field_case_diagnostic_custevent589 = obj_case_diagnostic.getText({
        fieldId: "custevent589"
      });
      var field_case_diagnostic_custevent590 = obj_case_diagnostic.getText({
        fieldId: "custevent590"
      });
      var field_case_diagnostic_custevent591 = obj_case_diagnostic.getText({
        fieldId: "custevent591"
      });
      var field_case_diagnostic_custevent592 = obj_case_diagnostic.getText({
        fieldId: "custevent592"
      });
      var field_case_diagnostic_custevent593 = obj_case_diagnostic.getText({
        fieldId: "custevent593"
      });
      var field_case_diagnostic_custevent594 = obj_case_diagnostic.getText({
        fieldId: "custevent594"
      });
      var field_case_diagnostic_custevent595 = obj_case_diagnostic.getText({
        fieldId: "custevent595"
      });
      var field_case_diagnostic_custevent596 = obj_case_diagnostic.getText({
        fieldId: "custevent596"
      });
      var field_case_diagnostic_custevent597 = obj_case_diagnostic.getText({
        fieldId: "custevent597"
      });
      var field_case_diagnostic_custevent598 = obj_case_diagnostic.getText({
        fieldId: "custevent598"
      });
      var field_case_diagnostic_custevent599 = obj_case_diagnostic.getText({
        fieldId: "custevent599"
      });
      var field_case_diagnostic_custevent600 = obj_case_diagnostic.getText({
        fieldId: "custevent600"
      });
      var field_case_diagnostic_custevent601 = obj_case_diagnostic.getText({
        fieldId: "custevent601"
      });
      var field_case_diagnostic_custevent602 = obj_case_diagnostic.getText({
        fieldId: "custevent602"
      });
      var field_case_diagnostic_custevent603 = obj_case_diagnostic.getText({
        fieldId: "custevent603"
      });
      var field_case_diagnostic_custevent604 = obj_case_diagnostic.getText({
        fieldId: "custevent604"
      });
      var field_case_diagnostic_custevent605 = obj_case_diagnostic.getText({
        fieldId: "custevent605"
      });
      var field_case_diagnostic_custevent606 = obj_case_diagnostic.getText({
        fieldId: "custevent606"
      });
      var field_case_diagnostic_custevent607 = obj_case_diagnostic.getText({
        fieldId: "custevent607"
      });
      var field_case_diagnostic_custevent608 = obj_case_diagnostic.getText({
        fieldId: "custevent608"
      });
      var field_case_diagnostic_custevent609 = obj_case_diagnostic.getText({
        fieldId: "custevent609"
      });
      var field_case_diagnostic_custevent610 = obj_case_diagnostic.getText({
        fieldId: "custevent610"
      });
      var field_case_diagnostic_custevent611 = obj_case_diagnostic.getText({
        fieldId: "custevent611"
      });
      var field_case_diagnostic_custevent612 = obj_case_diagnostic.getText({
        fieldId: "custevent612"
      });
      var field_case_diagnostic_custevent613 = obj_case_diagnostic.getText({
        fieldId: "custevent613"
      });
      var field_case_diagnostic_custevent614 = obj_case_diagnostic.getText({
        fieldId: "custevent614"
      });
      var field_case_diagnostic_custevent615 = obj_case_diagnostic.getText({
        fieldId: "custevent615"
      });
      var field_case_diagnostic_custevent616 = obj_case_diagnostic.getText({
        fieldId: "custevent616"
      });
      var field_case_diagnostic_custevent617 = obj_case_diagnostic.getText({
        fieldId: "custevent617"
      });
      var field_case_diagnostic_custevent618 = obj_case_diagnostic.getText({
        fieldId: "custevent618"
      });
      var field_case_diagnostic_custevent619 = obj_case_diagnostic.getText({
        fieldId: "custevent619"
      });
      var field_case_diagnostic_custevent1190 = obj_case_diagnostic.getText({
        fieldId: "custevent1190"
      });
      var field_case_diagnostic_custevent1191 = obj_case_diagnostic.getText({
        fieldId: "custevent1191"
      });
      var field_case_diagnostic_custevent625 = obj_case_diagnostic.getText({
        fieldId: "custevent625"
      });
      var field_case_diagnostic_custevent626 = obj_case_diagnostic.getText({
        fieldId: "custevent626"
      });
      var field_case_diagnostic_custevent627 = obj_case_diagnostic.getText({
        fieldId: "custevent627"
      });
      var field_case_diagnostic_custevent628 = obj_case_diagnostic.getText({
        fieldId: "custevent628"
      });
      var field_case_diagnostic_custevent629 = obj_case_diagnostic.getText({
        fieldId: "custevent629"
      });
      var field_case_diagnostic_custevent630 = obj_case_diagnostic.getText({
        fieldId: "custevent630"
      });
      var field_case_diagnostic_custevent631 = obj_case_diagnostic.getText({
        fieldId: "custevent631"
      });
      var field_case_diagnostic_custevent632 = obj_case_diagnostic.getText({
        fieldId: "custevent632"
      });
      var field_case_diagnostic_custevent633 = obj_case_diagnostic.getText({
        fieldId: "custevent633"
      });

      response_cases.push({
        "typeDiagnostic": "albya",
        "internalid": idDiagnostic,
        "titleDiangostic": "TItulo del diagnostico",
        "dateDiagnostic": dateDiagnostic,
        "casenumber": field_case_diagnostic_casenumber,
        "customform": field_case_diagnostic_customform_Text,
        "values": [{
          "customform": field_case_diagnostic_customform_Text,
          "custevent279": field_case_diagnostic_custevent279,
          "custevent281": field_case_diagnostic_custevent281,
          "custevent1196": field_case_diagnostic_custevent1196,
          "custevent581": field_case_diagnostic_custevent581,
          "custevent582": field_case_diagnostic_custevent582,
          "custevent583": field_case_diagnostic_custevent583,
          "custevent584": field_case_diagnostic_custevent584,
          "custevent585": field_case_diagnostic_custevent585,
          "custevent586": field_case_diagnostic_custevent586,
          "custevent587": field_case_diagnostic_custevent587,
          "custevent588": field_case_diagnostic_custevent588,
          "custevent589": field_case_diagnostic_custevent589,
          "custevent590": field_case_diagnostic_custevent590,
          "custevent591": field_case_diagnostic_custevent591,
          "custevent592": field_case_diagnostic_custevent592,
          "custevent593": field_case_diagnostic_custevent593,
          "custevent594": field_case_diagnostic_custevent594,
          "custevent595": field_case_diagnostic_custevent595,
          "custevent596": field_case_diagnostic_custevent596,
          "custevent597": field_case_diagnostic_custevent597,
          "custevent598": field_case_diagnostic_custevent598,
          "custevent599": field_case_diagnostic_custevent599,
          "custevent600": field_case_diagnostic_custevent600,
          "custevent601": field_case_diagnostic_custevent601,
          "custevent602": field_case_diagnostic_custevent602,
          "custevent603": field_case_diagnostic_custevent603,
          "custevent604": field_case_diagnostic_custevent604,
          "custevent605": field_case_diagnostic_custevent605,
          "custevent606": field_case_diagnostic_custevent606,
          "custevent607": field_case_diagnostic_custevent607,
          "custevent608": field_case_diagnostic_custevent608,
          "custevent609": field_case_diagnostic_custevent609,
          "custevent610": field_case_diagnostic_custevent610,
          "custevent611": field_case_diagnostic_custevent611,
          "custevent612": field_case_diagnostic_custevent612,
          "custevent613": field_case_diagnostic_custevent613,
          "custevent614": field_case_diagnostic_custevent614,
          "custevent615": field_case_diagnostic_custevent615,
          "custevent616": field_case_diagnostic_custevent616,
          "custevent617": field_case_diagnostic_custevent617,
          "custevent618": field_case_diagnostic_custevent618,
          "custevent619": field_case_diagnostic_custevent619,
          "custevent1190": field_case_diagnostic_custevent1190, //DESDE AQUI
          "custevent1191": field_case_diagnostic_custevent1191,
          "custevent625": field_case_diagnostic_custevent625,
          "custevent626": field_case_diagnostic_custevent626,
          "custevent627": field_case_diagnostic_custevent627,
          "custevent628": field_case_diagnostic_custevent628,
          "custevent629": field_case_diagnostic_custevent629,
          "custevent630": field_case_diagnostic_custevent630,
          "custevent631": field_case_diagnostic_custevent631,
          "custevent632": field_case_diagnostic_custevent632,
          "custevent633": field_case_diagnostic_custevent633,
          "custevent313": file_content_image_1,
          "custevent314": file_content_image_2,
          "custevent315": file_content_image_3,
          "custevent316": file_content_image_4,
          "custevent317": file_content_image_5,
          "custevent318": file_content_image_6,
          "custevent543": file_content_image_7,
          "custevent544": file_content_image_8,
          "custevent800": file_content_rostro,
          "custevent809": file_content_cuerpo,
          "custevent320": file_content_firma,
          "custevent1206": file_content_pechos
          //"imagen1_obj": fileObj_image_1
        }]
      });
    };

    log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());

    var response_cutomer = [{
      diagnosticValues: response_cases
    }];

    return response_cutomer;
  }

  return {
    get: doGet,
    post: doPost
  };
});
