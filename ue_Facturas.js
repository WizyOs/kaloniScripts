/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */
define(['N/record','N/search','N/log','N/format'], function(record,search,log,format) {
	var descriptionCurrentInvoice = [];

    var invoiceId = null;
  	var recompra = false;
    var postventa = false;
    var clientesNuevos = false;
    var myDescriptions = {};

    function beforeLoad(context)
    {
      if(context.type == "view")
      {
        var currentRec = context.newRecord;
        var currentInvoiceId = context.newRecord.id;
        var clasificacion = currentRec.getValue({fieldId: 'custbody74'});
        if(clasificacion == null || clasificacion == "")
        {
          log.debug("clasificacion: ", clasificacion);
          var invoice_entityText = currentRec.getText({fieldId: 'entity'});
          var indexOfVal = invoice_entityText.indexOf("Publico en general");
          if(indexOfVal != -1)
          {
            recompra = true;
            var currentRecord = record.load({type: 'invoice', id: currentInvoiceId, isDynamic: true});
            currentRecord.setValue({fieldId: "custbody74", value: 2});
            currentRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
            log.debug('Clasificación asignada:  ', 'Recompra');
          }
          else
          {
            var invoice_trandateText = currentRec.getText({fieldId: 'trandate'});
            log.debug("invoice_trandateText: ", invoice_trandateText);
            var invoice_trandateText_Split = invoice_trandateText.indexOf("/") > 0 ? invoice_trandateText.split('/') : invoice_trandateText.split('.');
            var dia_trandateText = invoice_trandateText_Split[0];
            var mes_trandateText = ('0' + invoice_trandateText_Split[1]).slice(-2);
            var anio_trandateText = invoice_trandateText_Split[2];
            var fechaText = anio_trandateText + "-" +  mes_trandateText + "-" + dia_trandateText;

            var dateMX = new Date();
            var mxCityDate = format.format({value: dateMX, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
            log.debug("mxCityDate: ", mxCityDate); // 21/8/2019 5:15:05 pm
            var mxCityDate_Split = mxCityDate.indexOf("/") > 0 ? mxCityDate.split('/') : mxCityDate.split('.');
            var dia_MX = mxCityDate_Split[0];
            var mes_MX = ('0' + mxCityDate_Split[1]).slice(-2);
            var anio_MX = mxCityDate_Split[2].substring(0, 4);
            var fechaMX = anio_MX + "-" +  mes_MX + "-" + dia_MX;
            log.debug("fechaText vs fechaMX: ", fechaText.substring(0, 7) +" vs "+ fechaMX.substring(0, 7)); // 21/8/2019 5:15:05 pm

            if(fechaText.substring(0, 7) == fechaMX.substring(0, 7))
            {
                var currentRecord = record.load({type: 'invoice', id: currentInvoiceId, isDynamic: true});
                var Idcliente = currentRecord.getValue({fieldId: 'entity'});

                var item_Lines1 = currentRecord.getLineCount({sublistId : 'item'});
                if(item_Lines1 > 0)
                {
                  for (var n = 0; n < item_Lines1; n++)
                  {
                     var currentRec_item_Description = currentRecord.getSublistValue({sublistId:'item', fieldId:'description', line:n});
                     log.debug("currentRec_item_Description: ", currentRec_item_Description);
                     myDescriptions[currentRec_item_Description] = 'notFound';
                  }
                }

              if(isEmpty(myDescriptions) == false)
              {
                var arrayInvoiceIds = [];
                var countAux = 0;
                search.create({
                      type: search.Type.INVOICE,
                      filters: [search.createFilter({name: 'entity', operator: search.Operator.IS, values: [Idcliente]})],
                      columns: ['internalid', 'tranid']
                }).run().each(function(result){
                      //var jsonString = JSON.stringify(result);	var obj = JSON.parse(jsonString);
                      if(countAux < 99)
                      {
                        invoiceId = result.getValue({name: 'internalid'});
                        var existIdInvoice = arrayInvoiceIds.filter(checkID);
                        if(existIdInvoice == null || existIdInvoice == "")
                        {
                          var tranId = result.getValue({name: 'tranid'});
                          if(currentInvoiceId != invoiceId)
                          {
                            log.debug('Invoice ID added to arrayInvoiceIds: ', invoiceId + " (" + tranId + ")");
                            arrayInvoiceIds.push(invoiceId);
                          }
                        }
                        else
                        {
                          //log.debug('arrayInvoiceIds ya tiene Invoice ID:  ', existIdInvoice);
                        }
                      }
                  	  countAux++;
                      return true;
                });

                if(arrayInvoiceIds.length > 0)
                {
                  for(var x = 0; x < arrayInvoiceIds.length; x++) // for(var x = 0; x < arrayInvoiceIds.length; x++)  && (x < 99)
                  {
                  	  var notFound_Val = false;
					  for(var key in myDescriptions)
                      {
                          if(myDescriptions[key] === "notFound")
                          {
                          	log.debug('myDescriptions: ', key + ' | ' + myDescriptions[key]);
                            notFound_Val = true;
                            break;
                          }
                      }
                      if(notFound_Val)
                      {
                      	log.debug('Estoy en Factura No.:  ', x + ', consultada en el bucle!!');
                        var facturaId = arrayInvoiceIds[x];
                        if(isNaN(facturaId) == false && facturaId != null && facturaId != "")
                        {
                          log.debug('facturaId to Load: ', facturaId);
                          var recordInvoice = record.load({type: 'INVOICE', id: facturaId, isDynamic: true});
                          var item_Lines = recordInvoice.getLineCount({sublistId : 'item'});
                          if(item_Lines > 0)
                          {
                             for (var i = 0; i < item_Lines; i++)
                             {
                                 var item_Description = recordInvoice.getSublistValue({sublistId:'item', fieldId:'description', line:i});
                                 if(myDescriptions.hasOwnProperty(item_Description))
                                 {
                                   log.debug('Invoice ID: ' + facturaId, 'El cliente ya ha comprado este producto o servicio: ' + item_Description);
                                   myDescriptions[item_Description] = "found";
                                   log.debug('myDescriptions change to found: ', myDescriptions[item_Description]);
                                 }
                                 else
                                 {
                                   log.debug('Invoice ID: ' + facturaId, "El cliente no ha comprado este producto o servicio: " + item_Description);
                                 }
                             }
                          }
                        }
                      }
                      else
                      {
                        break;
                      }
                  }

				  for(var key in myDescriptions)
                  {
                     if(myDescriptions[key] === "notFound")
                     {
                      	log.debug('definitivo notFound in myDescriptions: ', key + ' - ' + myDescriptions[key]);
                        postventa = true;
                        break;
                     }
                  }
                  if(postventa == false)
                     recompra = true;
                }
                else
                {
                  clientesNuevos = true;
                  log.debug('Cliente nuevo:  ', 'No se encontraron IDs de facturas para este cliente en arrayInvoiceIds Array!!');
                }

                if(postventa == true && recompra == false && clientesNuevos == false)
                {
                  currentRecord.setValue({fieldId: "custbody74", value: 3});
                  currentRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
                  log.debug('Clasificación asignada:  ', 'Postventa');
                }else if(recompra == true && postventa == false && clientesNuevos == false){
                  currentRecord.setValue({fieldId: "custbody74", value: 2});
                  currentRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
                  log.debug('Clasificación asignada:  ', 'Recompra');
                }else if(clientesNuevos == true && recompra == false && postventa == false){
                  currentRecord.setValue({fieldId: "custbody74", value: 1});
                  currentRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
                  log.debug('Clasificación asignada:  ', 'Clientes nuevos');
                }else{
                  log.debug("Factura no clasificada: ", "La factura no cumple con ninguna clasificación!! (postventa, recompra o clientesNuevos)");
                }
              }
              else
              {
                log.debug("Artículos ", "No hay artículos en la factura actual, Por lo tanto no se puede comparar con facturas anteriores!!");
              }
            }
            else
            {
              log.debug("fechaText vs fechaMX: ", "diferente mes y año, ya no se pueden editar facturas de meses pasados!!");
            }
          }
        }
        else
        {
          log.debug("Ya se clasificó esta Factura: ", clasificacion);
        }
      }
    }

    function checkID(id)
    {
	    return id == invoiceId;
  	}

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    return {
        beforeLoad: beforeLoad
    };
});


          /*for (var key in myDescriptions) {
            log.debug("Array Key Value: ", "key " + key + " has value " + myDescriptions[key]);
          }*/

          /*if(myDescriptions.length > 0)
          {
            for(var j = 0; j < myDescriptions.length; j++)
          	{
             log.error("Array Key Value: ", "ID: "  + myDescriptions[j].id + " Status: "  + myDescriptions[j].status);
            }
          }*/

/*
 var array1 = ['bar', 'cart'];

var found = array1.find(function(element) {
  return element === "barr";
});

console.log(found);
// expected output: 12
*/
            /*var mySearch = search.create({
                  type: search.Type.INVOICE,
                  filters: [search.createFilter({name: 'entity', operator: search.Operator.IS, values: [Idcliente]})],
                  columns: ['internalid']
            }).run().each(function(result){
              	  var jsonString = JSON.stringify(result);
                  //var obj = JSON.parse(jsonString);
                  log.debug('Result: ' + jsonString);
                  var invoiceId = result.getValue({name: 'internalid'}); // tranid
                  log.debug('Result Fact internalid: ' + invoiceId);
                  //return true;
            });*/

            /*var myPagedData = mySearch.runPaged({"pageSize": 5});
            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
                    var invoiceId = result.getValue({name: 'internalid'});
                    log.debug('Result Fact internalid: ' + invoiceId);
                    //return true;
                });
            });*/


         /*   var type = 'transaction';
            var columns = [];
            columns.push(SEARCHMODULE.createColumn({
                name: 'internalid'
            }));*/

          /*  var salesOrdersArray = [Idcliente];
            var filters = [];
            filters.push(['type', 'anyof', 'SalesOrd']);
            filters.push('and');
            filters.push(['entity', 'anyof', salesOrdersArray]);

            var mySearchObj = {};
            mySearchObj.type = type;
            mySearchObj.columns = columns;
            mySearchObj.filters = filters;


            var mySearch = SEARCHMODULE.create(mySearchObj);
            var resultset = mySearch.run();
            var results = resultset.getRange(0, 1000);
            // log.debug('Result is 1: ', mySearch); //result
            for(var i in results){
                var result = results[i];
                var row = {};
                for(var k in result.columns){
                    log.debug('Result SalesOrd ' + result.getValue(result.columns[k])); //result

                }
            }
*/