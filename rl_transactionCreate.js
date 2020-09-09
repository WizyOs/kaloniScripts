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

    // VARIABLES PARAMETERS POST
    var param_typeTransaction = objJson.typeTransaction;
    var param_idEstimate = objJson.idEstimate;
    var param_idCustomer = objJson.idCustomer;
    var param_startDate = objJson.startDate;
    var param_status = objJson.status;
    var param_location = objJson.location;
    var param_department = objJson.department;
    var param_notes = objJson.notes;
    var param_subsidiary = 19;
    var param_products = objJson.products;
    // Exclusive of Invoice
    var param_idSalesOrd = objJson.idSalesOrd;
    var param_rfcCustomer = objJson.rfcCustomer;
    var param_dateInvoice;
    var param_amountPaid = objJson.amountPaid;
    var param_doctorProcedure = objJson.doctorProcedure;
    var param_paymentMethod = objJson.paymentMethod;
    var param_billAddress = objJson.billAddress;
    var param_nameCustomer = objJson.nameCustomer;

    //log.debug('params', param_products);
    // VARIABLES BLOBALES
    var response = [];

    if (param_typeTransaction == "Estimate") { //TODO: BLOQUE PARA CREAR ESTIMACION
      try {
        var obj_newRecord_Estimate = record.create({
          type: record.Type.ESTIMATE,
          isDynamic: true,
        });
        obj_newRecord_Estimate.setValue({ // Set Nombre
          fieldId: "entity",
          value: param_idCustomer
        });
        obj_newRecord_Estimate.setText({ // Set Nombre
          fieldId: "trandate",
          text: param_startDate
        });
        obj_newRecord_Estimate.setValue({ // Set Nombre
          fieldId: "entitystatus",
          value: "51"
        });
        obj_newRecord_Estimate.setValue({ // Set Nombre
          fieldId: "location",
          value: param_location
        });
        obj_newRecord_Estimate.setValue({ // Set Nombre
          fieldId: "department",
          value: param_department
        });
        obj_newRecord_Estimate.setText({ // Set Nombre
          fieldId: "custbody_especificaciones",
          text: param_notes
        });


        //TODO: Se recorren todos los productos para capturarlos en la sublista item
        for (var pr = 0; pr < param_products.length; pr++) {

          obj_newRecord_Estimate.insertLine({
            sublistId: "item",
            line: pr
          });
          obj_newRecord_Estimate.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "item",
            value: param_products[pr].item
          });
          obj_newRecord_Estimate.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "quantity",
            value: param_products[pr].quantity
          });
          obj_newRecord_Estimate.selectLine({
            sublistId: "item",
            line: pr
          });
          obj_newRecord_Estimate.commitLine({
            sublistId: "item"
          });
        }

        obj_newRecord_Estimate_id = obj_newRecord_Estimate.save({
          enableSourcing: false,
          ignoreMandatoryFields: true
        });
        response.push({
          "code": 200,
          "status": "OK",
          "idEstimate": obj_newRecord_Estimate_id
        })
      } catch (error) {
        log.error("ERR_ESTIMATE_NO_CREATE", error);
        response.push({
          "ERR_ESTIMATE_NO_CREATE": error
        })
      }
    } else if (param_typeTransaction == "SalesOrd") {
      if (param_idEstimate == "" || param_idEstimate == null || param_idEstimate == undefined) {
        try {
          var obj_newRecord_SalesOrd = record.create({
            type: record.Type.SALES_ORDER,
            isDynamic: true,
          });
          obj_newRecord_SalesOrd.setValue({ // Set Nombre
            fieldId: "entity",
            value: param_idCustomer
          });
          obj_newRecord_SalesOrd.setText({ // Set Nombre
            fieldId: "trandate",
            text: param_startDate
          });
          obj_newRecord_SalesOrd.setValue({ // Set Nombre
            fieldId: "orderstatus",
            value: "B"
          });
          obj_newRecord_SalesOrd.setValue({ // Set Nombre
            fieldId: "location",
            value: param_location
          });
          obj_newRecord_SalesOrd.setValue({ // Set Nombre
            fieldId: "department",
            value: "36"
          });


          //TODO: Se recorren todos los productos para capturarlos en la sublista item
          for (var pr = 0; pr < param_products.length; pr++) {
            obj_newRecord_SalesOrd.insertLine({
              sublistId: "item",
              line: pr
            });
            obj_newRecord_SalesOrd.setCurrentSublistValue({
              sublistId: "item",
              fieldId: "item",
              value: param_products[pr].item
            });
            obj_newRecord_SalesOrd.setCurrentSublistValue({
              sublistId: "item",
              fieldId: "quantity",
              value: param_products[pr].quantity
            });
            obj_newRecord_SalesOrd.selectLine({
              sublistId: "item",
              line: pr
            });
            obj_newRecord_SalesOrd.commitLine({
              sublistId: "item"
            });
          }

          obj_newRecord_SalesOrd_id = obj_newRecord_SalesOrd.save({
            enableSourcing: false,
            ignoreMandatoryFields: true
          });
          response.push({
            "code": 200,
            "status": "OK",
            "idSelesOrd": obj_newRecord_SalesOrd_id
          })
        } catch (error) {
          log.error("ERR_SALES_ORDER_NO_CREATE", error);
          response.push({
            "ERR_SALES_ORDER_NO_CREATE": error
          })
        }
      } else {
        try {

          //TODO: Transforma una estimacion en una orden de venta
          var obj_transformRecord_SalesOrd = record.transform({
            fromType: record.Type.ESTIMATE,
            fromId: param_idEstimate,
            toType: record.Type.SALES_ORDER,
            isDynamic: true
          });

          var obj_transformRecord_SalesOrd_id = obj_transformRecord_SalesOrd.save({
            enableSourcing: false,
            ignoreMandatoryFields: true
          });

          response.push({
            "code": 200,
            "status": "OK",
            "idSelesOrd": obj_transformRecord_SalesOrd_id
          })
        } catch (error) {
          log.error("ERR_SALES_ORDER_NO_CREATE", error);
          response.push({
            "ERR_SALES_ORDER_NO_CREATE": error
          })
        }
      }
    } else if (param_typeTransaction === "invoice") {
            
      c = objJson.dateInvoice.split("/");
      param_dateInvoice = new Date(parseInt(c[2]),parseInt(c[1]) - 1,parseInt(c[0]));
      
      try {
      //TODO: Transforma una orden de venta en una factura
      var obj_transformRecord_Invoice = record.transform({
        fromType: record.Type.SALES_ORDER,
        fromId: param_idSalesOrd,
        toType: record.Type.INVOICE,
        isDynamic: true
      });

      obj_transformRecord_Invoice.setValue({ // Field formulario 148 para todo México
        fieldId: "customform",
        value: "148"
      });

      obj_transformRecord_Invoice.setValue({ // Field RFC cliente
        fieldId: "custbody_cfdi_rfc",
        value: param_rfcCustomer
      });

      obj_transformRecord_Invoice.setValue({ // Field Fecha de factura
        fieldId: "trandate",
        value: param_dateInvoice
      });

      obj_transformRecord_Invoice.setValue({ // Field monto pagado
        fieldId: "amountpaid",
        value: param_amountPaid
      });

      obj_transformRecord_Invoice.setValue({ // field Doctor Procedimiento
        fieldId: "custbody15",
        value: "20" // param_doctorProcedure
      });

      obj_transformRecord_Invoice.setValue({ // Field Metodo de pago
        fieldId: "custbody_cfdi_metpago_sat",
        value: param_paymentMethod
      });

/*       obj_transformRecord_Invoice.setValue({
        fieldId: "",
        value: param_billAddress
      }); */

/*       obj_transformRecord_Invoice.setValue({
        fieldId: "",
        value: param_nameCustomer
      }); */

      obj_transformRecord_Invoice.setValue({ // Field Cliente Trabajo
        fieldId: "entity",
        value: param_idCustomer
      });

      var obj_transformRecord_Invoice_id = obj_transformRecord_Invoice.save({
        enableSourcing: false,
        ignoreMandatoryFields: true
      });

      response.push({
        "code": 200,
        "status": "OK",
        "idInvoice": obj_transformRecord_Invoice_id
      })
    } catch (error) {
      log.error("ERR_INVOICE_NO_CREATE", error);
      response.push({
        "ERR_INVOICE_NO_CREATE": error
      })
    }
  }

  return {
    "Transactions": response
  }
}

return {
  get: doGet,
  post: doPost
};
});