/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

   define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
      function doGet(params) { }
   
      function doPost(params) {
   
         var objJson, response;
         var response = [], arr_objResult = [];
         if (typeof params === "object") {
            objJson = params;
         } else {
            objJson = JSON.parse(params);
         }
         log.debug("params", objJson);
   
         var param_clinicName = objJson.clinicName;
         var param_startdate = objJson.startdate;
   
         var arr_startdate = param_startdate.split("/");
   
         var objDate_startdate = new Date(arr_startdate[2], arr_startdate[1] - 1, arr_startdate[0]);
   
         var startdate = objDate_startdate.getDate() + "/" + (objDate_startdate.getMonth() + 1) + "/" + objDate_startdate.getFullYear();
         var enddate = startdate;
   
         // GLOBALS
         var arr_events = [];
         var obj_Events = [];
         var arr_locations = [];
         var arr_horariosTotales = [
            "9:00 AM",
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 PM",
            "12:30 PM",
            "1:00 PM",
            "1:30 PM",
            "2:00 PM",
            "2:30 PM",
            "3:00 PM",
            "3:30 PM",
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
            "5:30 PM",
            "6:00 PM"
         ];
   
         var searchCreate_Events_Albya = search.create({
            type: search.Type.CALENDAR_EVENT,
            "filters": [
               {
                  "name": "custevent70",
                  "operator": "anyof",
                  "values": [
                     "11",
                     "1",
                     "8",
                     "12"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "date",
                  "operator": "within",
                  "values": [
                     startdate,
                     enddate
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "subsidiary",
                  "join": "attendeecustomer",
                  "operator": "anyof",
                  "values": [
                     "19"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               }
            ],
            "columns": [
               {
                  "name": "title",
                  "label": "Evento",
                  "type": "text",
                  "sortdir": "NONE"
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
               }
            ]
         });
   
         var pageData_Search_Events_Albya = searchCreate_Events_Albya.runPaged({
            pageSize: 1000
         });
   
         pageData_Search_Events_Albya.pageRanges.forEach(function (pageRange) {
            page = pageData_Search_Events_Albya.fetch({
               index: pageRange.index
            });
            page.data.forEach(function (result) {
               obj_result = JSON.parse(JSON.stringify(result));
               obj_Events.push(obj_result);
            });
         });
   
         objJSON_Search_Events_Albya = JSON.parse(JSON.stringify(obj_Events));
   
         var status;
   
         for (var key in objJSON_Search_Events_Albya) {
            statusValue = objJSON_Search_Events_Albya[key].values.status[0].value;
            if (statusValue === "CONFIRMED" || statusValue === "COMPLETE") {
               status = "busy";
               arr_events.push({
                  "branchName": objJSON_Search_Events_Albya[key].values.custevent2[0].text,
                  "startDate": objJSON_Search_Events_Albya[key].values.startdate,
                  "startTime": objJSON_Search_Events_Albya[key].values.starttime,
                  "endTime": objJSON_Search_Events_Albya[key].values.endtime
                  //"status": status
               });
            }
         }
   
         var searchCreate_Locations_Albya = search.create({
            type: search.Type.LOCATION,
            "filters": [
               {
                  "name": "subsidiary",
                  "operator": "anyof",
                  "values": [
                     "19"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               }
            ],
            "columns": [
               {
                  "name": "name",
                  "label": "Nombre",
                  "type": "text",
                  "sortdir": "NONE"
               }
            ]
         });
   
         var searchResult_Locations_Albya = searchCreate_Locations_Albya.run().getRange({
            start: 0,
            end: 1000
         });
   
         obj_Locations_Albya = JSON.parse(JSON.stringify(searchResult_Locations_Albya))
   
         for (var key in obj_Locations_Albya) {
            arr_locations.push(obj_Locations_Albya[key].values.name);
         }
   
         var arr_eventos = [];
         for (var ev in arr_events) {
            if (arr_events[ev].branchName==param_clinicName){
               arr_eventos[ev] = arr_events[ev].branchName;
            }
         }
   
         var arr_rango = rangoFechas(startdate, enddate);
   
         var objLocs = [];
         var objDays = {};
         var objTimes = [];
   
         for (var keyLoc in arr_locations) {
            if (arr_locations[keyLoc]==param_clinicName) {
               for (var keyDays in arr_rango) {
                  for (var keyTimes in arr_horariosTotales) {
                     objTimes.push(arr_horariosTotales[keyTimes]);
                  }
                  objDays[arr_rango[keyDays]] = objTimes;
                  objTimes = new Array();
               }
      
               objLocs.push({
                  "branchName": arr_locations[keyLoc],
                  "availability": true,
                  "shedule": objDays
               });
            }
         }
   
         objLocs = JSON.parse(JSON.stringify(objLocs));
   
         for (var u in arr_events) {
            for (var l in objLocs) {
               if (arr_events[u].branchName == objLocs[l].branchName) {
                  for (var d in objLocs[l].shedule) {
                     if (d == arr_events[u].startDate) {
                        for (var t in objLocs[l].shedule[d]) {
                           if (arr_events[u].startTime === objLocs[l].shedule[d][t]) {
                              objLocs[l].shedule[d].splice(t, 1);
                           }
                        }
                     }
                  }
               }
            }
         }
   
         for (var k in objLocs) {
            for (var l in objLocs[k].shedule) {
               if (objLocs[k].shedule[l].length === 0) {
                  delete objLocs[k].shedule[l];
               }
            }
         }
   
         for (var k in objLocs) {
            if (Object.keys(objLocs[k].shedule).length === 0) {
               objLocs[k].availability = false;
               delete objLocs[k].shedule;
            }
         }
   
         return objLocs;
   
         function rangoFechas(start, end) {
            var arr_rango = [];
            var obj_meses = {
               "normal": [{
                  "1": "31",
                  "2": "28",
                  "3": "31",
                  "4": "30",
                  "5": "31",
                  "6": "30",
                  "7": "31",
                  "8": "31",
                  "9": "30",
                  "10": "31",
                  "11": "30",
                  "12": "31"
               }],
               "bisiesto": [{
                  "1": "31",
                  "2": "29",
                  "3": "31",
                  "4": "30",
                  "5": "31",
                  "6": "30",
                  "7": "31",
                  "8": "31",
                  "9": "30",
                  "10": "31",
                  "11": "30",
                  "12": "31"
               }]
            }
   
            if (start !== null && start !== undefined && start !== "" && end !== null && end !== undefined && end !== "") {
               var arr_start = start.split("/");
               var arr_end = end.split("/");
   
               var isBisiesto = function (year) {
                  var flag = false;
                  if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                     flag = true;
                  }
                  return flag;
               };
   
               var limitStart = function (numMes, obj_meses) {
                  obj_meses = JSON.parse(JSON.stringify(obj_meses));
                  for (var l in obj_meses[0]) {
                     if (numMes === l) {
                        return obj_meses[0][l];
                     }
                  }
               }
   
               if (isBisiesto(arr_start[2])) {
                  obj_meses = obj_meses.bisiesto;
               } else {
                  obj_meses = obj_meses.normal;
               }
   
               if (arr_start[2] === arr_end[2]) {
                  if (arr_start[1] === arr_end[1]) {
                     for (var index = 0; index <= (arr_end[0] - arr_start[0]); index++) {
                        arr_rango[index] = (parseInt(arr_start[0]) + index) + "/" + arr_start[1] + "/" + arr_start[2];
                     }
                  } else if ((arr_end[1] - arr_start[1]) === 1) {
                     var l = limitStart(arr_start[1], obj_meses);
                     var largoStart = (l - arr_start[0]) + 1;
                     var largoEnd = (arr_end[0] - 1) + 1
   
                     for (var index = 0; index < largoStart; index++) {
                        arr_rango[index] = arr_rango[index] = (parseInt(arr_start[0]) + index) + "/" + arr_start[1] + "/" + arr_start[2];
                     }
                     for (var index = 0; index < largoEnd; index++) {
                        arr_rango[(largoStart) + index] = (1 + index) + "/" + arr_end[1] + "/" + arr_end[2];
                     }
                  }
               }
            }
            return arr_rango;
         }
      }
   
      return {
         post: doPost
      };
   });