/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    //log.debug("params", params);
    var objJson;
    if (typeof params === "object") {
      objJson = params;
    } else {
      objJson = JSON.parse(params);
    }
    
    var param_Sucursal = objJson.suc;
    var customerList = [];
    var response = [];

    var searchCreate_CalendarComplete = search.create({
      type: search.Type.CALENDAR_EVENT,
      /*columns: [{
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
          name: "startdate",
          sortdir: "DESC"
        },
        {
          name: "starttime"
        },
        {
          name: "endtime"
        },
        {
          name: "status"
        },
        {
          name: "altname",
          join: "attendeeCustomer"
        }, */
      "columns": [{
          "name": "title",
          "label": "Evento",
          "type": "text",
          "sortdir": "NONE"
        },
        {
          "name": "startdate",
          "label": "Fecha de inicio",
          "type": "date",
          "sortdir": "DESC"
        },
        {
          "name": "starttime",
          "label": "Hora de inicio",
          "type": "timeofday",
          "sortdir": "NONE"
        },
        {
          "name": "endtime",
          "label": "Hora de finalización",
          "type": "timeofday",
          "sortdir": "NONE"
        },
        {
          "name": "owner",
          "label": "Propietario",
          "type": "select",
          "sortdir": "NONE"
        },
        {
          "name": "status",
          "label": "Estado",
          "type": "select",
          "sortdir": "NONE"
        },
        {
          "name": "markdone",
          "label": "Marcar",
          "type": "text",
          "sortdir": "NONE"
        },
        {
          "name": "custevent1",
          "label": "Calificacion Evento",
          "type": "select",
          "sortdir": "NONE"
        },
        {
          "name": "custevent2",
          "label": "Sucursal",
          "type": "select",
          "sortdir": "NONE"
        },
        {
          "name": "custevent70",
          "label": "Prefijo Evento",
          "type": "select",
          "sortdir": "NONE"
        },
        {
          "name": "altname",
          "join": "attendee",
          "label": "Nombre",
          "type": "text",
          "sortdir": "NONE"
        },
        {
          "name": "custevent1197"
        },
        {
          "name": "custevent1198"
        }
      ],
      filters: [
        /* {
                  name: "subsidiary",
                  join: "attendeecontact",
                  operator: "anyof",
                  values: [
                    "19"
                  ],
                  isor: true,
                  isnot: false,
                  leftparens: 0,
                  rightparens: 0
                }, */
        {
          name: "subsidiary",
          join: "attendee",
          operator: "anyof",
          values: ["19"],
          isor: true,
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
          operator: "onorafter",
          values: [
            "startofthismonth"
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
            "8",
            "11"
          ],
          isor: false,
          isnot: false,
          leftparens: 0,
          rightparens: 0
        }
      ]
    });
    var searchPreview_CalendarComplete = searchCreate_CalendarComplete
      .run()
      .getRange({
        start: 0,
        end: 1000
      });
    var str_searchPreview_CalendarComplete = JSON.stringify(searchPreview_CalendarComplete);
    var obj_searchPreview_CalendarComplete = JSON.parse(str_searchPreview_CalendarComplete);

    for (var k in obj_searchPreview_CalendarComplete) {
      var field_custevent1 =
        obj_searchPreview_CalendarComplete[k].values.custevent1;

      if (field_custevent1.length > 0) {
        var idQualification =
          obj_searchPreview_CalendarComplete[k].values.custevent1[0].value;
        var testQualification =
          obj_searchPreview_CalendarComplete[k].values.custevent1[0].text;
      } else {
        var idQualification = 0;
        var testQualification = "No data";
      }

      idPrefix = obj_searchPreview_CalendarComplete[k].values.custevent70[0].value;
      name = obj_searchPreview_CalendarComplete[k].values["attendee.altname"];
      
      if (obj_searchPreview_CalendarComplete[k].values.custevent1197.length > 0) {
        tipoAgendaValue = obj_searchPreview_CalendarComplete[k].values.custevent1197[0].value;
        tipoAgendaText = obj_searchPreview_CalendarComplete[k].values.custevent1197[0].text;
      } else {
        tipoAgendaValue = "";
        tipoAgendaText = "";
      }


      if (idPrefix == "1") {
        valuePrefix = "PRO";
      } else if (idPrefix == "8") {
        valuePrefix = "REV";
      } else if (idPrefix == "12") {
        valuePrefix = "VAL";
      } else if (idPrefix == "11") {
        valuePrefix = "BQL";
        //log.debug(idPrefix);
      }

      if (name !== "") {
        customerList.push({
          "internalid": obj_searchPreview_CalendarComplete[k].id,
          "title": obj_searchPreview_CalendarComplete[k].values.title,
          "name": name,
          "idPrefix": idPrefix,
          "valuePrefix": valuePrefix,
          "idQualification": idQualification,
          "valueQualification": testQualification,
          "statusValue": obj_searchPreview_CalendarComplete[k].values.status[0].value,
          "statusText": obj_searchPreview_CalendarComplete[k].values.status[0].text,
          "startdate": obj_searchPreview_CalendarComplete[k].values.startdate,
          "starttime": obj_searchPreview_CalendarComplete[k].values.starttime,
          "endtime": obj_searchPreview_CalendarComplete[k].values.endtime,
          "tipoAgendaValue": tipoAgendaValue,
          "tipoAgendaText": tipoAgendaText,
          "costoAgenda": obj_searchPreview_CalendarComplete[k].values.custevent1198
        });
      }
      if (idPrefix === "11") {
        customerList.push({
          "internalid": obj_searchPreview_CalendarComplete[k].id,
          "title": obj_searchPreview_CalendarComplete[k].values.title,
          "name": name,
          "idPrefix": idPrefix,
          "valuePrefix": valuePrefix,
          "idQualification": idQualification,
          "valueQualification": testQualification,
          "statusValue": obj_searchPreview_CalendarComplete[k].values.status[0].value,
          "statusText": obj_searchPreview_CalendarComplete[k].values.status[0].text,
          "startdate": obj_searchPreview_CalendarComplete[k].values.startdate,
          "starttime": obj_searchPreview_CalendarComplete[k].values.starttime,
          "endtime": obj_searchPreview_CalendarComplete[k].values.endtime,
        });
      }
    }

    response = [{
      customerList: customerList
      //prueba: searchPreview_CalendarComplete
    }];

    return response; //searchPreview_CalendarComplete;
  }

  return {
    get: doGet,
    post: doPost
  };
});
