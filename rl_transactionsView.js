/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {

    var objJson;
    if (typeof params === "object") {
      objJson = params;
    } else {
      objJson = JSON.parse(params);
    }
    log.debug("params", objJson);

    // FIXME: PARAMS JSON object
    var param_idCustomer = objJson.idCustomer;
    var param_test = objJson.test;

    // GLOABAL VARIABLES
    var arr_objResult = [];
    var preData = [];
    var preProd = [];
    var productos = new Array();
    var preproductos = [];
    var factura = [];
    var data = [];
    var ids = [];

    var searchLoad_Transactions = search.load({
      id: "customsearch7872",
      type: search.Type.TRANSACTION
    });
    //log.debug('Search Ghost', searchGhost);

    var filters = searchLoad_Transactions.filters;

    var myFilter = search.createFilter({
      "name": "internalidnumber",
      "join": "customermain",
      "operator": "equalto",
      "values": [
        param_idCustomer
      ],
      "isor": false,
      "isnot": false,
      "leftparens": 0,
      "rightparens": 0
    });

    searchLoad_Transactions.filters.push(myFilter);

    var pageData_searchGhost = searchLoad_Transactions.runPaged({
      pageSize: 10
    });

    pageData_searchGhost.pageRanges.forEach(function (pageRange) {
      page = pageData_searchGhost.fetch({
        index: pageRange.index
      });
      page.data.forEach(function (result) {
        obj_result = JSON.parse(JSON.stringify(result));

        arr_objResult.push(obj_result);

      })
    });

    objResult = JSON.parse(JSON.stringify(arr_objResult));

    for (var key in objResult) {
      ids.push(objResult[key].id);
    }

    var preParentIdTransaction;
    var preParentIdTransactionText;
    var location;
    var locationText;

    for (var t in objResult) {

      if (objResult[t].values.createdfrom.length > 0) {
        preParentIdTransaction = objResult[t].values.createdfrom[0].value;
        preParentIdTransactionText = objResult[t].values.createdfrom[0].text;
      } else {
        preParentIdTransaction = "";
        preParentIdTransactionText = "";
      }

      if (objResult[t].values.location.length > 0) {
        location = objResult[t].values.location[0].value;
        locationText = objResult[t].values.location[0].text;
      } else {
        location = "";
        locationText = "";
      }

      idTransaction = objResult[t].id;

      typeTransaction = objResult[t].recordType;
      tranid = objResult[t].values.tranid || "";
      createdfrom = preParentIdTransaction;
      createdfromText = preParentIdTransactionText;
      mainlineTransaction = objResult[t].values.mainline;
      trandateTransaction = objResult[t].values.trandate;
      amountTransaction = objResult[t].values.amount;
      nameItemTransaction = objResult[t].values["item.itemid"];
      priceItemTransaction = objResult[t].values["item.baseprice"];
      currencyTransaction = objResult[t].values.currency[0].text;
      statusrefTransaction = objResult[t].values.statusref[0].text;
      locationTransaction = location;
      locationTransactionText = locationText;
      departmentTransaction = objResult[t].values.department[0].value;
      notesTransaction = objResult[t].values["custbody_especificaciones"];
      quantityTransaction = objResult[t].values.quantity;

      //if (typeTransaction == "estimate") { // || typeTransaction == "salesord"
      if (mainlineTransaction === "*") {
        preData.push([idTransaction, typeTransaction, trandateTransaction, amountTransaction, currencyTransaction, statusrefTransaction, locationTransaction, departmentTransaction, notesTransaction, createdfrom, createdfromText, tranid, locationTransactionText])
      }

      if (mainlineTransaction !== "*" && priceItemTransaction !== "") {
        if (objResult[t].values["item.internalid"].length > 0) {
          var idItemTransaction = objResult[t].values["item.internalid"][0].value;
          preProd.push({
            "idTransaction": idTransaction,
            "item": idItemTransaction,
            "itemText": nameItemTransaction,
            "price": priceItemTransaction,
            "quantity": quantityTransaction
          });
        }
      }
      // }
    }

    preproductos = JSON.parse(JSON.stringify(preProd));

    y = 0;

    for (var x = 0; x < preData.length; x++) {
      productos[x] = [];
    }

    for (var d = 0; d < preData.length; d++) {
      idTransaction = preData[d][0];
      typeTransaction = preData[d][1];
      trandate = preData[d][2];
      amount = preData[d][3];
      currency = preData[d][4];
      idStatus = preData[d][5];
      location = preData[d][6];
      idDepartment = preData[d][7];
      note = preData[d][8];
      createdfrom = preData[d][9];
      createdfromText = preData[d][10];
      tranid = preData[d][11];
      locationText = preData[d][12];


      for (var p = 0; p < preProd.length; p++) {
        idTransaction_p = preProd[p].idTransaction;
        //log.debug("comparacion", idTransaction + ' - ' + idTransaction_p + ' y ' + y);
        if (idTransaction === idTransaction_p) {
          productos[d][y] = preproductos[p];
          y++;
        }
      }

      y = 0;

      if (typeTransaction === "invoice") {
        var recordLoad_TransactionInvoice = record.load({
          "type": record.Type.INVOICE,
          "id": idTransaction
        });

        var idInvoice = idTransaction; /*recordLoad_TransactionInvoice.getValue({
          fieldId: "id"
        });*/
        var numInvoice = recordLoad_TransactionInvoice.getValue({
          fieldId: "tranid"
        });
        var rfcCustomer = recordLoad_TransactionInvoice.getValue({
          fieldId: "custbody_cfdi_rfc"
        });
        var addressCustomer = recordLoad_TransactionInvoice.getValue({
          fieldId: "billaddress"
        });
        var nameCustomer = recordLoad_TransactionInvoice.getValue({
          fieldId: "entityname"
        });
        var pre_dateInvoice = recordLoad_TransactionInvoice.getText({
          fieldId: "trandate"
        });
        pre_dateInvoice = pre_dateInvoice.split("/");
        dateInvoice = pre_dateInvoice[2] + "-" + pre_dateInvoice[1] + "-" + pre_dateInvoice[0];
        var amountPaid = recordLoad_TransactionInvoice.getValue({
          fieldId: "amountpaid"
        });
        var UUID = recordLoad_TransactionInvoice.getValue({
          fieldId: "custbody_uuid"
        });
        var doctorProcedure = recordLoad_TransactionInvoice.getValue({
          fieldId: "custbody15"
        });
        var doctorProcedureName = recordLoad_TransactionInvoice.getText({
          fieldId: "custbody15"
        });
        var billaddress = recordLoad_TransactionInvoice.getValue({
          fieldId: "billaddress"
        });
        var salesrep = recordLoad_TransactionInvoice.getText({ fieldId: "salesrep" });
        var paymentMethod = recordLoad_TransactionInvoice.getValue({
          fieldId: "custbody_cfdi_metpago_sat"
        });
        var paymentMethodText = recordLoad_TransactionInvoice.getText({
          fieldId: "custbody_cfdi_metpago_sat"
        });
        var status = recordLoad_TransactionInvoice.getValue({
          fieldId: "status"
        });

        factura = [{
          "idInvoice": idInvoice,
          "numInvoice": numInvoice,
          "status": status,
          "rfcCustomer": rfcCustomer,
          "addressCustomer": addressCustomer,
          "nameCustomer": nameCustomer,
          "dateInvoice": dateInvoice,
          "amountPaid": amountPaid,
          "UUID": UUID,
          "doctorProcedure": doctorProcedure,
          "doctorProcedureName": doctorProcedureName,
          "billaddress": billaddress,
          "salesrep": salesrep,
          "paymentMethod": paymentMethod,
          "paymentMethodText": paymentMethodText
        }];
      } else {
        factura = [""];
      }

      data.push({
        "idTransaction": idTransaction,
        "tranid": tranid,
        "typeTransaction": typeTransaction,
        "trandate": trandate,
        "amount": amount,
        "currency": currency,
        "textStatus": idStatus,
        "location": location,
        "locationText": locationText,
        "idDepartment": idDepartment,
        "notes": note,
        "parentIdTransaction": createdfrom,
        "parentIdTransactionText": createdfromText,
        "products": productos[d],
        "detailsInvoice": factura
      });
    }

    if (param_test === "test") {
      return preData;
    } else {
      return data;
    }

    
  }

  return {
    get: doGet,
    post: doPost
  };
});