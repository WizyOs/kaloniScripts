/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime", "N/query"],
   function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime, query) {
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

         var idCustomer = objJson.idCustomer;
         var totalAmount = 0;

         var searchCreate_VentaKaloni = search.create({
            "type": "transaction",
            "filters": [{
                  "name": "type",
                  "operator": "anyof",
                  "values": [
                     "CustInvc",
                     "CustCred"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "status",
                  "operator": "anyof",
                  "values": [
                     "@ALL@"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "mainline",
                  "operator": "is",
                  "values": [
                     "T"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "class",
                  "operator": "noneof",
                  "values": [
                     "16"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "location",
                  "operator": "noneof",
                  "values": [
                     "20",
                     "18"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "subsidiary",
                  "operator": "anyof",
                  "values": [
                     "@ALL@"
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               },
               {
                  "name": "internalidnumber",
                  "join": "customermain",
                  "operator": "equalto",
                  "values": [
                     idCustomer
                  ],
                  "isor": false,
                  "isnot": false,
                  "leftparens": 0,
                  "rightparens": 0
               }
            ],
            "columns": [{
                  "name": "trandate",
                  "summary": "GROUP",
                  "label": "Date",
                  "type": "date",
                  "function": "month",
                  "sortdir": "ASC"
               },
               {
                  "name": "netamountnotax",
                  "summary": "SUM",
                  "label": "Amount (Net of Tax)",
                  "type": "currency",
                  "sortdir": "NONE"
               },
               {
                  "name": "grossamount",
                  "summary": "SUM",
                  "label": "Importe (bruto)",
                  "type": "currency",
                  "sortdir": "NONE"
               },
               {
                  "name": "internalid",
                  "summary": "COUNT",
                  "label": "Internal ID",
                  "type": "select",
                  "sortdir": "NONE"
               }
            ],
            "settings": [{
               "name": "consolidationtype",
               "value": "ACCTTYPE"
            }],
            "title": null
         });

         var searchResult_ventaKaloni = searchCreate_VentaKaloni.run().getRange({
            start: 0,
            end: 1000
         });

         var obj_searchResult_ventaKaloni = JSON.parse(JSON.stringify(searchResult_ventaKaloni));

         for (var si in obj_searchResult_ventaKaloni) {
            if (obj_searchResult_ventaKaloni[si].values["SUM(grossamount)"] !== ".00") {
               totalAmount += parseFloat(obj_searchResult_ventaKaloni[si].values["SUM(grossamount)"]);
            }
         }

         return {
            "response": obj_searchResult_ventaKaloni
         }


      }

      return {
         get: doGet,
         post: doPost
      };
   });