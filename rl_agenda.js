/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    var objJson = JSON.parse(params);
    log.debug("params", objJson);
    var length_objJson = Object.keys(objJson).length;
    var param_Sucursal;
    var param_filter_date;
    var param_idCustomer;
    log.debug("largo params", Object.keys(objJson).length);

    if (length_objJson === 2) {
      param_Sucursal = objJson.suc;
      param_filter_date = objJson.within; // || "today";
    } else if (length_objJson === 3) {
      param_Sucursal = objJson.suc;
      param_filter_date = objJson.within; // || "today";
      param_idCustomer = objJson.idCustomer;
    }

    var totalEffective = 0;
    var totalValuations = 0;
    var totalProcedures = 0;
    var totalRevisions = 0;
    var idQualification = "";
    var textQualification = "";
    var customerList = [];
    var response = [];
    var sheduleByCustomer = [];
    log.debug("Params", 'suc ' + param_Sucursal + ' date ' + param_filter_date);

    var searchGhost = search.load({
      id: "customsearch7854"
    });
    //log.debug('Search Ghost', searchGhost);

    var searchResult_Ghots = searchGhost.run().getRange({
      start: 0,
      end: 1000
    });

    var searchLoad_AgendaList = search.create({
      type: search.Type.CALENDAR_EVENT,
      columns: [{
          name: "title"
        },
        {
          name: "custevent2"
        },
        {
          name: "custevent70"
        },
        {
          name: "custevent1"
        },
        {
          name: "startdate"
        },
        {
          name: "starttime"
        },
        {
          name: "altname",
          join: "attendeeCustomer"
        }
      ],
      filters: [{
          name: "subsidiary",
          join: "attendeecustomer",
          operator: "anyof",
          values: ["19"],
          isor: false,
          isnot: false,
          leftparens: 0,
          rightparens: 0
        },
        {
          name: "custevent2",
          operator: "is",
          values: [param_Sucursal],
          isor: false,
          isnot: false,
          leftparens: 0,
          rightparens: 0
        },
        {
          name: "date",
          operator: "within",
          values: [param_filter_date],
          isor: false,
          isnot: false,
          leftparens: 0,
          rightparens: 0
        },
        {
          name: "custevent70",
          operator: "anyof",
          values: [
            "12",
            "1",
            "8"
          ],
          isor: false,
          isnot: false,
          leftparens: 0,
          rightparens: 0
        }
      ]
    });
    var searchPreview = searchLoad_AgendaList.run().getRange({
      start: 0,
      end: 1000
    });

    var str_searchPreview = JSON.stringify(searchPreview);
    var obj_searchPreview = JSON.parse(str_searchPreview);

    log.debug('objJson', obj_searchPreview);

    var searchLoad_AgendaList_total = search.create({
      type: search.Type.CALENDAR_EVENT,
      columns: [{
          name: "custevent70"
        },
        {
          name: "custevent1"
        }
      ],
      filters: [{
        name: "custevent2",
        operator: "anyof",
        values: [param_Sucursal],
        isor: false,
        isnot: false,
        leftparens: 0,
        rightparens: 0
      }]
    });
    var searchPreview_total = searchLoad_AgendaList_total.run().getRange({
      start: 0,
      end: 1000
    });

    var str_searchPreview_SheduleList = JSON.stringify(searchPreview_total);
    var obj_searchPreview_SheduleList = JSON.parse(str_searchPreview_SheduleList);

    for (var t in obj_searchPreview_SheduleList) {
      if (obj_searchPreview_SheduleList[t].values.custevent1.length > 0) {
        if (obj_searchPreview_SheduleList[t].values.custevent1[0].value == "4") {
          totalEffective += 1;
        }
      }
    }

    for (var k in obj_searchPreview) {
      var field_custevent1 = obj_searchPreview[k].values.custevent1;
      var field_prefix = obj_searchPreview[k].values.custevent70;

      if (field_custevent1.length > 0) {
        idQualification = obj_searchPreview[k].values.custevent1[0].value;
        textQualification = obj_searchPreview[k].values.custevent1[0].text;
      } else {
        idQualification = 0;
        textQualification = "No data";
      }

      if (field_prefix.length > 0) {
        var text_prefix = obj_searchPreview[k].values.custevent70[0].text;
        var prefix_text_prefix = text_prefix.substring(0, 3);

        if (prefix_text_prefix == "VAL" && (field_custevent1.length == 0 || idQualification == "5" || idQualification == "4")) {
          totalValuations += 1;
        }
        if (prefix_text_prefix == "REV" && (field_custevent1.length == 0 || idQualification == "5" || idQualification == "4")) {
          totalRevisions += 1;
        }
        if (prefix_text_prefix == "PRO" && (field_custevent1.length == 0 || idQualification == "5" || idQualification == "4")) {
          totalProcedures += 1;
        }
      }

      customerList.push({
        "internalid": obj_searchPreview[k].id,
        "title": obj_searchPreview[k].values.title,
        "altname": obj_searchPreview[k].values["attendeeCustomer.altname"],
        "idPrefix": obj_searchPreview[k].values.custevent70[0].value,
        "valuePrefix": obj_searchPreview[k].values.custevent70[0].text,
        "idQualification": idQualification,
        "valueQualification": textQualification,
        "startdate": obj_searchPreview[k].values.startdate,
        "starttime": obj_searchPreview[k].values.starttime
      });
    }

    if (length_objJson == 3 && param_idCustomer != "") {
      var searchLoad_AgendaList_Customer = search.create({
        type: search.Type.CALENDAR_EVENT,
        columns: [{
            name: "title"
          },
          {
            name: "custevent2"
          },
          {
            name: "custevent70"
          },
          {
            name: "custevent1"
          },
          {
            name: "startdate"
          },
          {
            name: "starttime"
          },
          {
            name: "altname",
            join: "attendeeCustomer"
          },
          {
            name: "internalid",
            join: "attendeeCustomer"
          }
        ],
        filters: [
          {
            name: "custevent2",
            operator: "is",
            values: [
              param_Sucursal
            ],
            isor: false,
            isnot: false,
            leftparens: 0,
            rightparens: 0
          },
          {
            name: "custevent70",
            operator: "anyof",
            values: [
              "12",
              "1",
              "8"
            ],
            isor: false,
            isnot: false,
            leftparens: 0,
            rightparens: 0
          },
          {
            name: "internalidnumber",
            join: "attendee",
            operator: "equalto",
            values: [
              param_idCustomer
            ],
            isor: false,
            isnot: false,
            leftparens: 0,
            rightparens: 0
          }
        ]
      });
      var searchPreview_Customer = searchLoad_AgendaList_Customer.run().getRange({
        start: 0,
        end: 1000
      });

      var str_searchPreview_Customer = JSON.stringify(searchPreview_Customer);
      var obj_searchPreview_Customer = JSON.parse(str_searchPreview_Customer);

      //log.debug('SearchPreview', searchPreview);

      for (var c in obj_searchPreview_Customer) {
        var field_custevent1 = obj_searchPreview_Customer[c].values.custevent1;
        if (field_custevent1.length > 0) {
          var idQualification = obj_searchPreview_Customer[c].values.custevent1[0].value;
          var textQualification = obj_searchPreview_Customer[c].values.custevent1[0].text;
        } else {
          var idQualification = 0;
          var textQualification = "No data";
        }

        sheduleByCustomer.push({
          "internalid": obj_searchPreview_Customer[c].id,
          "title": obj_searchPreview_Customer[c].values.title,
          "altname": obj_searchPreview_Customer[c].values["attendeeCustomer.altname"],
          "idPrefix": obj_searchPreview_Customer[c].values.custevent70[0].value,
          "valuePrefix": obj_searchPreview_Customer[c].values.custevent70[0].text,
          "idQualification": idQualification,
          "valueQualification": textQualification,
          "startdate": obj_searchPreview_Customer[c].values.startdate,
          "starttime": obj_searchPreview_Customer[c].values.starttime
        });
      }
    }

    response = [{
      'totalShedules': searchPreview_total.length,
      'totalEffective': totalEffective,
      'totalValuations': totalValuations,
      'totalRevisions': totalRevisions,
      'totalProcedures': totalProcedures,
      'totalMeet': parseInt(totalValuations) + parseInt(totalRevisions) + parseInt(totalProcedures),
      'customerList': customerList,
      'sheduleByCustomer': sheduleByCustomer
      //'pruebaBusqueda': searchPreview
    }]

    return response;
  }

  return {
    get: doGet,
    post: doPost
  };
});
