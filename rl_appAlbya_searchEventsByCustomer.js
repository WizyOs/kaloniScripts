/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
   function doGet(params) { }

   function doPost(params) {

      var objJson, searchResult_EventsByCustomer;
      var response = [],
         arr_objResult = [];
      if (typeof params === "object") {
         objJson = params;
      } else {
         objJson = JSON.parse(params);
      }
      log.debug("params", objJson);

      var param_idCustomer = objJson.idCustomer;

      var searchCreate_searchEventsByCustomer = search.create({
         "type": search.Type.CALENDAR_EVENT,
         "filters": [{
            "name": "internalidnumber",
            "join": "attendeecustomer",
            "operator": "equalto",
            "values": [
               param_idCustomer
            ],
            "isor": false,
            "isnot": false,
            "leftparens": 0,
            "rightparens": 0
         },
         {
            "name": "date",
            "operator": "notbefore",
            "values": [
               "today"
            ],
            "isor": false,
            "isnot": false,
            "leftparens": 0,
            "rightparens": 0
         }
         ],
         "columns": [{
            "name": "internalid",
            "label": "Id interno",
            "type": "text",
            "sortdir": "NONE"
         },
         {
            "name": "title",
            "label": "Evento",
            "type": "text",
            "sortdir": "ASC"
         },
         {
            "name": "startdate",
            "label": "Fecha de inicio",
            "type": "date",
            "sort": "ASC"
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
            "name": "custevent2",
            "label": "Sucursal",
            "type": "select",
            "sortdir": "NONE"
         },
         {
            "name": "custevent176",
            "label": "Tipo de servicio",
            "type": "select",
            "sortdir": "NONE"
         },
         {
            "name": "custevent198",
            "label": "Costo",
            "type": "select",
            "sortdir": "NONE"
         },
         {
            "name": "custevent337",
            "label": "Medio de contacto",
            "type": "select",
            "sortdir": "NONE"
         },
         {
            "name": "custevent481",
            "label": "NP1",
            "type": "integer",
            "sortdir": "NONE"
         },
         {
            "name": "custevent482",
            "label": "NP2",
            "type": "text",
            "sortdir": "NONE"
         }
         ]
      });

      var pageData_Search_EventsByCustomer = searchCreate_searchEventsByCustomer.runPaged({
         pageSize: 1000
      });

      pageData_Search_EventsByCustomer.pageRanges.forEach(function (pageRange) {
         page = pageData_Search_EventsByCustomer.fetch({
            index: pageRange.index
         });
         page.data.forEach(function (result) {
            obj_result = JSON.parse(JSON.stringify(result));
            arr_objResult.push(obj_result);
         });
      });

      objJSON_Search_EventsByCustomer = JSON.parse(JSON.stringify(arr_objResult));

      for (var key in objJSON_Search_EventsByCustomer) {
         response.push({
            "idEvent": objJSON_Search_EventsByCustomer[key].values.internalid[0].value,
            "branchName": objJSON_Search_EventsByCustomer[key].values.custevent2[0].text,
            "startdate": objJSON_Search_EventsByCustomer[key].values.startdate,
            "starttime": objJSON_Search_EventsByCustomer[key].values.starttime,
         })
      }

      return response;

   }

   return {
      post: doPost
   };
});