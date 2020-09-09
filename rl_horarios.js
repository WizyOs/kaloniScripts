/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

 define([
    "N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], 
    function(record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) {}
  
    function doPost(params) {
      var objJson = JSON.parse(params);
      var param_sheduleType = objJson.sheduleType;
      var param_branchOffice = objJson.branchOffice;
      var param_date = objJson.date;
      log.debug("params", objJson);
      
      //GLOBAL VARIABLES
      var idPrefix;
      var idResource;
      var date;
      var shedules =[];
      var response =[];

/*       if (param_sheduleType == 'val') {
         idPrefix = ["12", "11"];
         if (param_branchOffice == '52') {
            idResource = "224";
         } else if (param_branchOffice == '53') {
            idResource = "232";
         } else if (param_branchOffice == '54') {
            idResource = "231";
         } else if (param_branchOffice == '57') {
            idResource = "229";
         }
      } else if (param_sheduleType == 'pro') {
         idPrefix = ["1", "11"];
         if (param_branchOffice == '52') {
            idResource = "236";
         } else if (param_branchOffice == '53') {
            idResource = "235";
         } else if (param_branchOffice == '54') {
            idResource = "234";
         } else if (param_branchOffice == '57') {
            idResource = "233";
         }
      } else if (param_sheduleType == 'rev') {
         idPrefix = ["8", "11"];
         if (param_branchOffice == '52') {
            idResource = "240";
         } else if (param_branchOffice == '53') {
            idResource = "239";
         } else if (param_branchOffice == '54') {
            idResource = "238";
         } else if (param_branchOffice == '57') {
            idResource = "237";
         }
      } */

      if (param_sheduleType == 'val' || param_sheduleType == 'pro' || param_sheduleType == 'rev') {
         idPrefix = ["1","8","11","12"];
         if (param_branchOffice == '52') {
            idResource = ["224","236","240"];
         } else if (param_branchOffice == '53') {
            idResource = ["232","235","239"];
         } else if (param_branchOffice == '54') {
            idResource = ["231","234","238"];
         } else if (param_branchOffice == '57') {
            idResource = ["229","233","237"];
         }
      }

      //var searchGhost = search.load({ id: "customsearch7297" });
      //log.debug('Search Ghost', searchGhost);
      
      var searchCreate_EventsTimetable = search.create({
        type: search.Type.CALENDAR_EVENT,
        "columns":[
            {
               "name":"status",
               "label":"Status",
               "type":"select",
               "sortdir":"NONE"
            },
            {
               "name":"custevent70",
               "label":"Prefijo Evento",
               "type":"select",
               "sortdir":"NONE"
            },
            {
               "name":"startdate",
               "label":"Start Date",
               "type":"date",
               "sortdir":"NONE"
            },
            {
               "name":"starttime",
               "label":"Start Time",
               "type":"timeofday",
               "sortdir":"NONE"
            },
            {
               "name":"altname",
               "join":"attendeeCustomer",
               "label":"Name",
               "type":"text",
               "sortdir":"NONE"
            },
            {
               "name":"title",
               "label":"Event",
               "type":"text",
               "sortdir":"NONE"
            }
         ],
         "filters":[
            {
               "name":"entityid",
               "join":"attendeecustomer",
               "operator":"isnotempty",
               "values":[
      
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"custevent70",
               "operator":"anyof",
               "values":[
                  idPrefix,
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"resource",
               "operator":"anyof",
               "values":[
                  idResource
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"custevent1",
               "operator":"noneof",
               "values":[
                  "5"
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"date",
               "operator":"within",
               "values":[
                  param_date, param_date
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
/*             {
               "name":"subsidiary",
               "join":"attendeecustomer",
               "operator":"anyof",
               "values":[
                  "19"
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            }, */
            {
               "name":"status",
               "operator":"anyof",
               "values":[
                  "CONFIRMED",
                  "TENTATIVE"
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"custevent2",
               "operator":"anyof",
               "values":[
                  param_branchOffice
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            }
         ]
      });

      var searchPreview_EventsTimetable = searchCreate_EventsTimetable.run().getRange({ start: 0, end: 1000 });

      log.debug('Search Ghost', searchCreate_EventsTimetable);

      var str_searchPreview_EventsTimetable = JSON.stringify(searchPreview_EventsTimetable);
      var obj_searchPreview_EventsTimetable = JSON.parse(str_searchPreview_EventsTimetable);

      for (var k in obj_searchPreview_EventsTimetable) {
         shedules.push({
            "statusEvent": obj_searchPreview_EventsTimetable[k].values.status[0].value,
            "custevent70": obj_searchPreview_EventsTimetable[k].values.custevent70[0].text,
            "startDate": obj_searchPreview_EventsTimetable[k].values.startdate,
            "startTime": obj_searchPreview_EventsTimetable[k].values.starttime,
            "attendee": obj_searchPreview_EventsTimetable[k].values["attendeeCustomer.altname"],
            "titleEvent": obj_searchPreview_EventsTimetable[k].values.title
         });
      }

      log.debug("shedules", shedules);

      return response = [{
         "values": shedules
      }];
    }
  
    return {
      post: doPost
    };
  });
  


