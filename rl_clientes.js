/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define([
    "N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"
  ],
  function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
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
      var totalPatient = 0;
      var ingresosTotal = 0;

      var searchLoad_CustomerList = search.create({
        type: search.Type.CUSTOMER,
        columns: [{
          name: 'internalid'
        }, {
          name: 'entityid'
        }, {
          name: 'altname'
        }, {
          name: 'email'
        }, {
          name: 'phone'
        }, {
          name: 'custentity25'
        }],
        filters: [{
          "name": "subsidiary",
          "operator": "anyof",
          "values": [
            "19"
          ],
          "isor": false,
          "isnot": false,
          "leftparens": 0,
          "rightparens": 0
        }, {
          "name": "custentity25",
          "operator": "anyof",
          "values": [
            param_Sucursal
          ],
          "isor": false,
          "isnot": false,
          "leftparens": 0,
          "rightparens": 0
        }]
      });

      var searchGhost = search.load({
        id: "customsearch7850"
      });
      log.debug('Search Ghost', searchGhost);

      var searchPreview_Home = searchGhost.run().getRange({
        start: 0,
        end: 1000
      });

      var str_searchHome = JSON.stringify(searchPreview_Home);
      var obj_searchHome = JSON.parse(str_searchHome);

      for (var j in obj_searchHome) {
        var pre_count = obj_searchHome[j].values['GROUP(attendeeCustomer.entityid)'];
        var prefix_pre_count = pre_count.substr(0, 2);
        if (prefix_pre_count == 'HG') {
          totalPatient += 1;
        }
      }

      var str_searchHome = JSON.stringify(searchPreview_Home);
      var obj_searchHome = JSON.parse(str_searchHome);

      var totalPatient = searchPreview_Home.length;

      var searchPreview = searchLoad_CustomerList.run().getRange({
        start: 0,
        end: 1000
      });

      var str_searchPreview = JSON.stringify(searchPreview);
      var obj_searchPreview = JSON.parse(str_searchPreview);

      for (var k in obj_searchPreview) {
        customerList.push({
          "internalid": obj_searchPreview[k].values.internalid[0].value,
          "altname": obj_searchPreview[k].values.altname,
          "email": obj_searchPreview[k].values.email
        });
      }

      var searchCreate_IngresosTransaction = search.load({
        id: "customsearch7332"
      });

      var filters = searchCreate_IngresosTransaction.filters;

      var myFilter = search.createFilter({
        "name": "location",
        "operator": "anyof",
        "values": [
          param_Sucursal
        ],
        "isor": false,
        "isnot": false,
        "leftparens": 0,
        "rightparens": 0
      });

      searchCreate_IngresosTransaction.filters.push(myFilter);

      var preview_IngresosTransaction = searchCreate_IngresosTransaction.run().getRange({
        start: 0,
        end: 1000
      });

      var str_preview_IngresosTransaction = JSON.stringify(preview_IngresosTransaction);
      var obj_preview_IngresosTransaction = JSON.parse(str_preview_IngresosTransaction);

      //ingresosTotal = obj_preview_IngresosTransaction[2].values["SUM(formulacurrency)"];

      for (var i in obj_preview_IngresosTransaction) {
        if (obj_preview_IngresosTransaction[i].values["SUM(formulacurrency)"] != ".00") {
          ingresosTotal += parseInt(obj_preview_IngresosTransaction[i].values["SUM(formulacurrency)"]);
        }
      }

      //ingresosTotal = new Intl.NumberFormat("es-MX").format(ingresosTotal);

      /* var formatterPeso = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      })
      var totalSales = formatterPeso.format(totalSales); */
      
      response = [{
        "totalCustomers": totalPatient,
        "customerList": customerList,
        "totalSales": ingresosTotal
      }];



      return response;
    }

    return {
      get: doGet,
      post: doPost
    };
  });
