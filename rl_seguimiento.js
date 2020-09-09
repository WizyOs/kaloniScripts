/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    var objJson = JSON.parse(params);
    
    var param_suc = objJson.suc;
    var param_idCustomer = objJson.idCustomer || "";
    var response = [];

/*     var searchGhost = search.load({
      id: "customsearch7905",
      type: search.Type.CUSTOMER
    }); */

    if (param_idCustomer == "") {
      var searchCreate_Seguimiento = search.create({
         type: search.Type.CUSTOMER,
         "filters":[
            {
               "name":"subsidiary",
               "operator":"anyof",
               "values":[
                  "19"
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"custentity25",
               "operator":"anyof",
               "values":[
                  param_suc
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            }
         ],
        "columns":[
           {
              "name":"entityid",
              "label":"ID",
              "type":"text",
              "sortdir":"NONE"
           },
           {
              "name":"altname",
              "label":"Nombre",
              "type":"text",
              "sortdir":"NONE"
           },
           {
              "name":"email",
              "label":"Correo electrónico",
              "type":"email",
              "sortdir":"NONE"
           },
           {
              "name":"mobilephone",
              "label":"Teléfono móvil",
              "type":"phone",
              "sortdir":"NONE"
           },
           {
              "name":"internalid",
              "join":"call",
              "label":"ID interno",
              "type":"select",
              "sortdir":"NONE"
           },
           {
              "name":"status",
              "join":"call",
              "label":"Estado",
              "type":"select",
              "sortdir":"NONE"
           },
           {
              "name":"createddate",
              "join":"call",
              "label":"Fecha de creación",
              "type":"datetime",
              "sortdir":"NONE"
           },
           {
              "name":"startdate",
              "join":"call",
              "label":"Fecha de llamada telefónica",
              "type":"date",
              "sortdir":"NONE"
           },
           {
              "name":"phone",
              "join":"call",
              "label":"Número telefónico",
              "type":"phone",
              "sortdir":"NONE"
           },
           {
              "name":"starttime",
              "join":"call",
              "label":"Hora de inicio",
              "type":"timeofday",
              "sortdir":"NONE"
           },
           {
              "name":"internalid",
              "join":"messages",
              "label":"ID interno",
              "type":"select",
              "sortdir":"NONE"
           },
           {
              "name":"subject",
              "join":"messages",
              "label":"Asunto",
              "type":"text",
              "sortdir":"NONE"
           },
           {
              "name":"isemailed",
              "join":"messages",
              "label":"Correo electrónico enviado",
              "type":"checkbox",
              "sortdir":"NONE"
           },
           {
              "name":"messagedate",
              "join":"messages",
              "label":"Fecha",
              "type":"datetime",
              "sortdir":"DESC"
           }
        ]
       });
   
       var searchResult_Seguimiento = searchCreate_Seguimiento.run().getRange({
         start: 0,
         end: 1000
       });
   
       var obj_result_Seguimiento = JSON.parse(JSON.stringify(searchResult_Seguimiento));
   
       for (var s in obj_result_Seguimiento) {
          if (obj_result_Seguimiento[s].values["call.status"].length > 0) {
             callStatus = obj_result_Seguimiento[s].values["call.status"][0].text;
          } else {
             callStatus = "";
          }
         response.push({
           idCustomer: obj_result_Seguimiento[s].id,
           entityid: obj_result_Seguimiento[s].values.entityid,
           altname: obj_result_Seguimiento[s].values.altname,
           email: obj_result_Seguimiento[s].values.email,
           mobilephone: obj_result_Seguimiento[s].values.mobilephone,
           call_status: callStatus,
           call_createddate: obj_result_Seguimiento[s].values["call.createddate"],
           message_subject: obj_result_Seguimiento[s].values["messages.subject"],
           message_isemailed: obj_result_Seguimiento[s].values["messages.isemailed"],
           message_senddate: obj_result_Seguimiento[s].values["messages.messagedate"]
         });
       }
   
       return response;
    } else {
      var searchCreate_Seguimiento = search.create({
         type: search.Type.CUSTOMER,
         "filters":[
            {
               "name":"subsidiary",
               "operator":"anyof",
               "values":[
                  "19"
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"custentity25",
               "operator":"anyof",
               "values":[
                  param_suc
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            },
            {
               "name":"internalId",
               "operator":"is",
               "values":[
                  param_idCustomer
               ],
               "isor":false,
               "isnot":false,
               "leftparens":0,
               "rightparens":0
            }
         ],
        "columns":[
           {
              "name":"entityid",
              "label":"ID",
              "type":"text",
              "sortdir":"NONE"
           },
           {
              "name":"altname",
              "label":"Nombre",
              "type":"text",
              "sortdir":"NONE"
           },
           {
              "name":"email",
              "label":"Correo electrónico",
              "type":"email",
              "sortdir":"NONE"
           },
           {
              "name":"mobilephone",
              "label":"Teléfono móvil",
              "type":"phone",
              "sortdir":"NONE"
           },
           {
              "name":"internalid",
              "join":"call",
              "label":"ID interno",
              "type":"select",
              "sortdir":"NONE"
           },
           {
              "name":"status",
              "join":"call",
              "label":"Estado",
              "type":"select",
              "sortdir":"NONE"
           },
           {
              "name":"createddate",
              "join":"call",
              "label":"Fecha de creación",
              "type":"datetime",
              "sortdir":"NONE"
           },
           {
              "name":"startdate",
              "join":"call",
              "label":"Fecha de llamada telefónica",
              "type":"date",
              "sortdir":"NONE"
           },
           {
              "name":"phone",
              "join":"call",
              "label":"Número telefónico",
              "type":"phone",
              "sortdir":"NONE"
           },
           {
              "name":"starttime",
              "join":"call",
              "label":"Hora de inicio",
              "type":"timeofday",
              "sortdir":"NONE"
           },
           {
              "name":"internalid",
              "join":"messages",
              "label":"ID interno",
              "type":"select",
              "sortdir":"NONE"
           },
           {
              "name":"subject",
              "join":"messages",
              "label":"Asunto",
              "type":"text",
              "sortdir":"NONE"
           },
           {
              "name":"isemailed",
              "join":"messages",
              "label":"Correo electrónico enviado",
              "type":"checkbox",
              "sortdir":"NONE"
           },
           {
              "name":"messagedate",
              "join":"messages",
              "label":"Fecha",
              "type":"datetime",
              "sortdir":"DESC"
           }
        ]
       });
   
       var searchResult_Seguimiento = searchCreate_Seguimiento.run().getRange({
         start: 0,
         end: 1000
       });
   
       var obj_result_Seguimiento = JSON.parse(JSON.stringify(searchResult_Seguimiento));
   
       for (var s in obj_result_Seguimiento) {
          if (obj_result_Seguimiento[s].values["call.status"].length > 0) {
             callStatus = obj_result_Seguimiento[s].values["call.status"][0].text;
          } else {
             callStatus = "";
          }
         response.push({
           idCustomer: obj_result_Seguimiento[s].id,
           entityid: obj_result_Seguimiento[s].values.entityid,
           altname: obj_result_Seguimiento[s].values.altname,
           email: obj_result_Seguimiento[s].values.email,
           mobilephone: obj_result_Seguimiento[s].values.mobilephone,
           call_status: callStatus,
           call_createddate: obj_result_Seguimiento[s].values["call.createddate"],
           message_subject: obj_result_Seguimiento[s].values["messages.subject"],
           message_isemailed: obj_result_Seguimiento[s].values["messages.isemailed"],
           message_senddate: obj_result_Seguimiento[s].values["messages.messagedate"]
         });
       }
   
       return response;
    }
  }

  return {
    get: doGet,
    post: doPost
  };
});
